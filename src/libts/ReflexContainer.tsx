///////////////////////////////////////////////////////////
// ReflexContainer
// By Philippe Leefsma
// December 2016
//
///////////////////////////////////////////////////////////
import ReflexSplitter from './ReflexSplitter'
import ReflexEvents from './ReflexEvents'
import { getDataProps, getPointerPosition } from './utilities'
import React from 'react'
import type {
  Orientation,
  FlexDataEntry,
  ReflexChildElement,
  ReflexInternalProps,
  ReflexRawChildElement
} from './types'

export interface ReflexContainerProps {
  orientation?: Orientation
  windowResizeAware?: boolean
  maxRecDepth?: number
  className?: string
  style?: React.CSSProperties
  children?: React.ReactNode
  [key: `data-${string}`]: unknown
}

interface ReflexContainerState {
  flexData: FlexDataEntry[]
  windowResizeAware?: boolean
  resizing?: boolean
}

interface StartResizeEventData {
  index: number
  event: React.MouseEvent | React.TouchEvent
}

interface ResizeEventData {
  index: number
  domElement: Element | null
  event: MouseEvent | TouchEvent
}

interface ElementSizeEventData {
  index: number
  size?: number
  direction: 1 | -1
}

// Intermediate shape used while computing initial flex
// values; every child (element or splitter) is mapped to
// one of these, and splitters are just passed through
// unchanged by the recursive constraint solver
interface FlexDataInitEntry {
  maxFlex: number
  sizeFlex: number
  minFlex: number
  constrained: boolean
  flex: number
  // only ever compared via ReflexSplitter.isA(), never rendered
  type: unknown
}

export default class ReflexContainer
  extends React.Component<ReflexContainerProps, ReflexContainerState> {

  /////////////////////////////////////////////////////////
  // orientation: Orientation of the layout container
  //              valid values are ['horizontal', 'vertical']
  // maxRecDepth: Maximun recursion depth to solve initial flex
  //              of layout elements based on user provided values
  // className: Space separated classnames to apply custom styles
  //            to the layout container
  // style: allows passing inline style to the container
  /////////////////////////////////////////////////////////
  static defaultProps = {
    orientation: 'horizontal',
    windowResizeAware: false,
    maxRecDepth: 100,
    className: '',
    style: {}
  }

  events: ReflexEvents
  children: ReflexChildElement[]
  elements: ReflexChildElement[] | null = null
  previousPos = 0
  ref: React.RefObject<HTMLDivElement | null>

  constructor (props: ReflexContainerProps) {
    super (props)
    this.events = new ReflexEvents()
    this.children = []
    this.state = {
      flexData: []
    }
    this.ref = React.createRef()
  }

  componentDidMount () {

    const flexData = this.computeFlexData()

    const { windowResizeAware } = this.props

    if (windowResizeAware) {
      window.addEventListener(
        'resize', this.onWindowResize)
    }

    this.setState ({
      windowResizeAware,
      flexData
    })

    this.events.on(
      'element.size', this.onElementSize)

    this.events.on(
      'startResize', this.onStartResize)

    this.events.on(
      'stopResize', this.onStopResize)

    this.events.on(
      'resize', this.onResize)
  }

  componentWillUnmount () {

    this.events.off()

    window.removeEventListener(
      'resize', this.onWindowResize)
  }

  getValidChildren (props: ReflexContainerProps = this.props): ReflexRawChildElement[] {
    return this.toArray(
      props.children as ReflexRawChildElement | ReflexRawChildElement[]
    ).filter((child) => {
      return !!child
    })
  }

  componentDidUpdate (prevProps: ReflexContainerProps) {

    const children = this.getValidChildren(this.props)

    if ((children.length !== this.state.flexData.length) ||
        (prevProps.orientation !== this.props.orientation) ||
        this.flexHasChanged(prevProps)) {

      const flexData = this.computeFlexData(
        children, this.props)

      this.setState({
        flexData
      })
    }

    if (this.props.windowResizeAware !== this.state.windowResizeAware) {
      if (this.props.windowResizeAware) {
        window.addEventListener('resize', this.onWindowResize)
      } else {
        window.removeEventListener('resize', this.onWindowResize)
      }
      this.setState({
        windowResizeAware: this.props.windowResizeAware
      })
    }
  }

  /////////////////////////////////////////////////////////
  // attempts to preserve current flex on window resize
  //
  /////////////////////////////////////////////////////////
  onWindowResize = () => {

    this.setState({
      flexData: this.computeFlexData()
    })
  }

  /////////////////////////////////////////////////////////
  // Check if flex has changed: this allows updating the
  // component when different flex is passed as property
  // to one or several children
  //
  /////////////////////////////////////////////////////////
  flexHasChanged (prevProps: ReflexContainerProps): boolean {

    const prevChildrenFlex =
      this.getValidChildren(prevProps).map((child) => {
        return child.props.flex || 0
      })

    const childrenFlex =
      this.getValidChildren().map((child) => {
        return child.props.flex || 0
      })

    return !childrenFlex.every((flex, idx) => {
      return flex === prevChildrenFlex[idx]
    })
  }

  /////////////////////////////////////////////////////////
  // Returns the ref stashed on a cloned child, whichever
  // shape it comes in (props.ref, or a legacy element.ref)
  //
  /////////////////////////////////////////////////////////
  getChildRef (element?: ReflexChildElement | null): React.RefObject<unknown> | undefined {
    const legacyRef = element as unknown as { ref?: React.RefObject<unknown> } | null | undefined
    return element?.props.ref ?? legacyRef?.ref
  }

  /////////////////////////////////////////////////////////
  // Returns size of a ReflexElement
  //
  /////////////////////////////////////////////////////////
  getSize (element?: ReflexChildElement | null): number {

    const ref = this.getChildRef(element)

    const domElement = ref?.current as HTMLElement | null | undefined

    switch (this.props.orientation) {
      case 'horizontal':
        return domElement?.offsetHeight ?? 0
      case 'vertical':
      default:
        return domElement?.offsetWidth ?? 0
    }
  }

  /////////////////////////////////////////////////////////
  // Computes offset from pointer position
  //
  /////////////////////////////////////////////////////////
  getOffset (pos: { clientX: number; clientY: number }, domElement: Element): number {

    const {
      top, bottom,
      left, right
    } = domElement.getBoundingClientRect()

    switch (this.props.orientation) {
      case 'horizontal': {
        const offset = pos.clientY - this.previousPos
        if (offset > 0) {
          if (pos.clientY >= top) {
            return offset
          }
        } else {
          if (pos.clientY <= bottom) {
            return offset
          }
        }
        break
      }
      case 'vertical':
      default: {
        const offset = pos.clientX - this.previousPos
        if (offset > 0) {
          if (pos.clientX > left) {
            return offset
          }
        } else {
          if (pos.clientX < right) {
            return offset
          }
        }
      }
      break
    }
    return 0
  }

  /////////////////////////////////////////////////////////
  // Handles startResize event
  //
  /////////////////////////////////////////////////////////
  onStartResize = (data: StartResizeEventData) => {

    const pos = getPointerPosition(data.event)

    switch (this.props.orientation) {

      case 'horizontal':
        document.body.classList.add('reflex-row-resize')
        this.previousPos = pos.clientY
        break

      case 'vertical':
      default:
        document.body.classList.add('reflex-col-resize')
        this.previousPos = pos.clientX
        break
    }

    this.elements = [
      this.children[data.index - 1],
      this.children[data.index + 1]
    ]

    this.emitElementsEvent(
      this.elements,
      'onStartResize')
  }

  /////////////////////////////////////////////////////////
  // Handles splitter resize event
  //
  /////////////////////////////////////////////////////////
  onResize = (data: ResizeEventData) => {

    const pos = getPointerPosition(data.event)

    const offset = this.getOffset(
      pos, data.domElement as Element)

    switch (this.props.orientation) {
      case 'horizontal':
        this.previousPos = pos.clientY
        break
      case 'vertical':
      default:
        this.previousPos = pos.clientX
        break
    }

    if (offset) {

      const availableOffset =
        this.computeAvailableOffset(
          data.index, offset)

      if (availableOffset) {

        const flexData = this.cloneFlexData(
          this.state.flexData)

        this.elements = this.dispatchOffset(
          data.index, availableOffset, flexData)

        this.adjustFlex(this.elements, flexData)

        this.setState({
          flexData,
          resizing: true
        }, () => {
          this.emitElementsEvent(
            this.elements, 'onResize')
        })
      }
    }
  }

  /////////////////////////////////////////////////////////
  // Handles stopResize event
  //
  /////////////////////////////////////////////////////////
  onStopResize = () => {

    document.body.classList.remove('reflex-row-resize')
    document.body.classList.remove('reflex-col-resize')

    const resizedRefs = this.elements ? this.elements.map((element) => {
      return this.getChildRef(element)
    }) : []

    const elements = this.children.filter((child) => {
      return !ReflexSplitter.isA(child) &&
        resizedRefs.includes(this.getChildRef(child))
    })

    this.emitElementsEvent(
      elements, 'onStopResize')

    this.setState({
      resizing: false
    })
  }

  /////////////////////////////////////////////////////////
  // Handles element size modified event
  //
  /////////////////////////////////////////////////////////
  onElementSize = (data: ElementSizeEventData) => {

    return new Promise<void>((resolve) => {

      try {

        const idx = data.index

        const size = this.getSize(this.children[idx])

        const offset = (data.size as number) - size

        const dir = data.direction

        const splitterIdx = idx + dir

        const availableOffset =
          this.computeAvailableOffset(
            splitterIdx, dir * offset)

        this.elements = null

        let flexData = this.state.flexData

        if (availableOffset) {

          flexData = this.cloneFlexData(
            this.state.flexData)

          this.elements = this.dispatchOffset(
            splitterIdx, availableOffset, flexData)

          this.adjustFlex(this.elements, flexData)
        }

        this.setState({ flexData }, () => {
          this.emitElementsEvent(
            this.elements, 'onResize')
          resolve()
        })

      } catch (ex) {

        console.error(
          'ReflexContainer: failed to process element.size event', ex)

        resolve()
      }
    })
  }

  /////////////////////////////////////////////////////////
  // Adjusts flex after a dispatch to make sure
  // total flex of modified elements remains the same
  // Mutates the given flexData draft, not this.state
  //
  /////////////////////////////////////////////////////////
  adjustFlex (elements: ReflexChildElement[], flexData: FlexDataEntry[]) {

    const diffFlex = elements.reduce((sum, element) => {

      const idx = element.props.index

      const previousFlex = element.props.flex

      const nextFlex = flexData[idx].flex

      return sum +
        (previousFlex - nextFlex) / elements.length

    }, 0)

    elements.forEach((element) => {
      const idx = element.props.index
      flexData[idx] = {
        ...flexData[idx],
        flex: flexData[idx].flex + diffFlex
      }
    })
  }

  /////////////////////////////////////////////////////////
  // Returns available offset for a given raw offset value
  // This checks how much the panes can be stretched and
  // shrink, then returns the min
  //
  /////////////////////////////////////////////////////////
  computeAvailableOffset (idx: number, offset: number): number {

    const stretch = this.computeAvailableStretch(
      idx, offset)

    const shrink = this.computeAvailableShrink(
      idx, offset)

    const availableOffset =
      Math.min(stretch, shrink) *
      Math.sign(offset)

    return availableOffset
  }

  /////////////////////////////////////////////////////////
  // Returns true if the next splitter than the one at idx
  // can propagate the drag. This can happen if that
  // next element is actually a splitter and it has
  // propagate=true property set
  //
  /////////////////////////////////////////////////////////
  checkPropagate (idx: number, direction: number): boolean {

    const child = direction > 0
      ? (idx < this.children.length - 2 ? this.children[idx + 2] : undefined)
      : (idx > 2 ? this.children[idx - 2] : undefined)

    return !!child && ReflexSplitter.isA(child) && !!child.props.propagate
  }

  /////////////////////////////////////////////////////////
  // Recursively computes available stretch at splitter
  // idx for given raw offset
  //
  /////////////////////////////////////////////////////////
  computeAvailableStretch (idx: number, offset: number): number {

    const childIdx = offset < 0 ? idx + 1 : idx - 1

    const child = this.children[childIdx]

    const size = this.getSize(child)

    const maxSize = child?.props.maxSize ?? 0

    const availableStretch = maxSize - size

    if (availableStretch < Math.abs(offset)) {

      if (this.checkPropagate(idx, -1 * offset)) {

        const nextOffset = Math.sign(offset) *
          (Math.abs(offset) - availableStretch)

        return availableStretch +
          this.computeAvailableStretch(
            offset < 0 ? idx + 2 : idx - 2,
            nextOffset)
      }
    }

    return Math.min(availableStretch, Math.abs(offset))
  }

  /////////////////////////////////////////////////////////
  // Recursively computes available shrink at splitter
  // idx for given raw offset
  //
  /////////////////////////////////////////////////////////
  computeAvailableShrink (idx: number, offset: number): number {

    const childIdx = offset > 0 ? idx + 1 : idx -1

    const child = this.children[childIdx]

    const size = this.getSize(child)

    const minSize = Math.max(
      child?.props.minSize ?? 0, 0)

    const availableShrink = size - minSize

    if (availableShrink < Math.abs(offset)) {

      if (this.checkPropagate(idx, offset)) {

        const nextOffset = Math.sign(offset) *
          (Math.abs(offset) - availableShrink)

        return availableShrink +
          this.computeAvailableShrink(
            offset > 0 ? idx + 2 : idx - 2,
            nextOffset)
      }
    }

    return Math.min(availableShrink, Math.abs(offset))
  }

  /////////////////////////////////////////////////////////
  // Returns flex value for unit pixel
  //
  /////////////////////////////////////////////////////////
  computePixelFlex (orientation: Orientation = this.props.orientation ?? 'horizontal'): number {
    if (!this.ref.current) {
      console.warn('Unable to locate ReflexContainer dom node');
      return 0.0;
    }

    switch (orientation) {

      case 'horizontal':

        if (this.ref.current.offsetHeight === 0.0) {
          console.warn(
            'Found ReflexContainer with height=0, ' +
            'this will cause invalid behavior...')
          console.warn(this.ref.current)
          return 0.0
        }

        return 1.0 / this.ref.current.offsetHeight

      case 'vertical':
      default:

        if (this.ref.current.offsetWidth === 0.0) {
          console.warn(
            'Found ReflexContainer with width=0, ' +
            'this will cause invalid behavior...')
          console.warn(this.ref.current)
          return 0.0
        }

        return 1.0 / this.ref.current.offsetWidth
    }
  }

  /////////////////////////////////////////////////////////
  // Adds offset to a given ReflexElement
  // Mutates the given flexData draft, not this.state
  //
  /////////////////////////////////////////////////////////
  addOffset (element: ReflexChildElement, offset: number, flexData: FlexDataEntry[]) {

    const size = this.getSize(element)

    const idx = element.props.index

    const newSize = Math.max(size + offset, 0)

    const currentFlex = flexData[idx].flex

    const newFlex = (currentFlex > 0)
        ? currentFlex * newSize / size
        : this.computePixelFlex () * newSize

    flexData[idx] = {
      ...flexData[idx],
      flex: (!isFinite(newFlex) || isNaN(newFlex))
        ? 0 : newFlex
    }
  }

  /////////////////////////////////////////////////////////
  // Recursively dispatches stretch offset across
  // children elements starting at splitter idx
  // Mutates the given flexData draft, not this.state
  //
  /////////////////////////////////////////////////////////
  dispatchStretch (idx: number, offset: number, flexData: FlexDataEntry[]): ReflexChildElement[] {

    const childIdx = offset < 0 ? idx + 1 : idx - 1

    if (childIdx < 0 || childIdx > this.children.length-1) {

      return []
    }

    const child = this.children[childIdx]

    const size = this.getSize(child)

    const newSize = Math.min(
      child.props.maxSize,
      size + Math.abs(offset))

    const dispatchedStretch = newSize - size

    this.addOffset(child, dispatchedStretch, flexData)

    if (dispatchedStretch < Math.abs(offset)) {

      const nextIdx = idx - Math.sign(offset) * 2

      const nextOffset = Math.sign(offset) *
        (Math.abs(offset) - dispatchedStretch)

      return [
        child,
        ...this.dispatchStretch(nextIdx, nextOffset, flexData)
      ]
    }

    return [child]
  }

  /////////////////////////////////////////////////////////
  // Recursively dispatches shrink offset across
  // children elements starting at splitter idx
  // Mutates the given flexData draft, not this.state
  //
  /////////////////////////////////////////////////////////
  dispatchShrink (idx: number, offset: number, flexData: FlexDataEntry[]): ReflexChildElement[] {

    const childIdx = offset > 0 ? idx + 1 : idx - 1

    if (childIdx < 0 || childIdx > this.children.length-1) {

      return []
    }

    const child = this.children[childIdx]

    const size = this.getSize(child)

    const newSize = Math.max(
      child.props.minSize,
      size - Math.abs(offset))

    const dispatchedShrink = newSize - size

    this.addOffset(child, dispatchedShrink, flexData)

    if (Math.abs(dispatchedShrink) < Math.abs(offset)) {

      const nextIdx = idx + Math.sign(offset) * 2

      const nextOffset = Math.sign(offset) *
        (Math.abs(offset) + dispatchedShrink)

      return [
        child,
        ...this.dispatchShrink(nextIdx, nextOffset, flexData)
      ]
    }

    return [child]
  }

  /////////////////////////////////////////////////////////
  // Dispatch offset at splitter idx
  //
  /////////////////////////////////////////////////////////
  dispatchOffset (idx: number, offset: number, flexData: FlexDataEntry[]): ReflexChildElement[] {
    return [
      ...this.dispatchStretch(idx, offset, flexData),
      ...this.dispatchShrink(idx, offset, flexData)
    ]
  }

  /////////////////////////////////////////////////////////
  // Returns a shallow copy of flexData: same ref objects,
  // new entry objects, so it can be safely mutated as a
  // draft before being committed via setState
  //
  /////////////////////////////////////////////////////////
  cloneFlexData (flexData: FlexDataEntry[]): FlexDataEntry[] {
    return flexData.map((entry) => ({ ...entry }))
  }

  /////////////////////////////////////////////////////////
  // Emits given if event for each given element
  // if present in the component props
  //
  /////////////////////////////////////////////////////////
  emitElementsEvent (
    elements: ReflexChildElement[] | ReflexChildElement | null,
    event: 'onStartResize' | 'onStopResize' | 'onResize'
  ) {
    this.toArray(elements).forEach((component) => {
      const handler = component.props[event]
      if (handler) {
        const compRef = this.getChildRef(component)
        handler({
          domElement: (compRef?.current as Element | null | undefined) ?? null,
          component
        })
      }
    })
  }

  /////////////////////////////////////////////////////////
  // Computes initial flex data based on provided flex
  // properties. By default each ReflexElement gets
  // evenly arranged within its container
  //
  /////////////////////////////////////////////////////////
  computeFlexData (
    children: ReflexRawChildElement[] = this.getValidChildren(),
    props: ReflexContainerProps = this.props
  ): FlexDataEntry[] {

    const pixelFlex = this.computePixelFlex(props.orientation)

    const computeFreeFlex = (flexData: FlexDataInitEntry[]): number => {
      return flexData.reduce((sum, entry) => {
        if (!ReflexSplitter.isA(entry)
          && entry.constrained) {
          return sum - entry.flex
        }
        return sum
      }, 1.0)
    }

    const computeFreeElements = (flexData: FlexDataInitEntry[]): number => {
      return flexData.reduce((sum, entry) => {
        if (!ReflexSplitter.isA(entry)
          && !entry.constrained) {
          return sum + 1
        }
        return sum
      }, 0.0)
    }

    const flexDataInit: FlexDataInitEntry[] = children.map((child) => {
      const childProps = child.props
      return {
        maxFlex: (childProps.maxSize || Number.MAX_VALUE) * pixelFlex,
        sizeFlex: (childProps.size || Number.MAX_VALUE) * pixelFlex,
        minFlex: (childProps.minSize || 1) * pixelFlex,
        constrained: childProps.flex !== undefined,
        flex: childProps.flex || 0,
        type: child.type
      }
    })

    const computeFlexDataRec = (
      flexDataIn: FlexDataInitEntry[],
      depth = 0
    ): FlexDataInitEntry[] => {

      let hasContrain = false

      const freeElements = computeFreeElements(flexDataIn)

      const freeFlex = computeFreeFlex(flexDataIn)

      const flexDataOut = flexDataIn.map((entry) => {

        if (ReflexSplitter.isA(entry)) {
          return entry
        }

        const proposedFlex = !entry.constrained
          ? freeFlex/freeElements
          : entry.flex

        const constrainedFlex =
          Math.min(entry.sizeFlex,
            Math.min(entry.maxFlex,
              Math.max(entry.minFlex,
                proposedFlex)))

        const constrained = entry.constrained ||
          (constrainedFlex !== proposedFlex)

        hasContrain = hasContrain || constrained

        return {
          ...entry,
          flex: constrainedFlex,
          constrained
        }
      })

      return (hasContrain && depth < (this.props.maxRecDepth ?? 100))
        ? computeFlexDataRec(flexDataOut, depth+1)
        : flexDataOut
    }

    const flexData = computeFlexDataRec(flexDataInit)

    return flexData.map((entry) => {
      return {
          flex: !ReflexSplitter.isA(entry)
            ? entry.flex
            : 0.0,
          ref: React.createRef<unknown>()
       }
    })
  }

  /////////////////////////////////////////////////////////
  // Utility method to ensure given argument is
  // returned as an array
  //
  /////////////////////////////////////////////////////////
  toArray<T> (obj: T | T[] | null | undefined): T[] {
    if (!obj) {
      return []
    }
    return Array.isArray(obj) ? obj : [obj]
  }

  /////////////////////////////////////////////////////////
  // Render container. This will clone all original child
  // components in order to pass some internal properties
  // used to handle resizing logic
  //
  /////////////////////////////////////////////////////////
  render () {

    const className = [
      this.state.resizing ? 'reflex-resizing':'',
      ...(this.props.className ?? '').split(' '),
      this.props.orientation,
      'reflex-container'
    ].join(' ').trim()

    this.children = (React.Children.map(
      this.getValidChildren(), (child, index) => {

        if (index > this.state.flexData.length - 1) {
          return <div/>
        }

        const flexDataEntry = this.state.flexData[index]

        const newProps: Partial<ReflexInternalProps> = {
          ...child.props,
          maxSize: child.props.maxSize || Number.MAX_VALUE,
          orientation: this.props.orientation ?? 'horizontal',
          minSize: child.props.minSize || 1,
          events: this.events,
          flex: flexDataEntry.flex,
          ref: flexDataEntry.ref,
          index
        }

        return React.cloneElement(child, newProps)
      }
    ) ?? []) as ReflexChildElement[]

    return (
      <div
        {...getDataProps(this.props)}
        style={this.props.style}
        className={className}
        ref={this.ref}>
        { this.children }
      </div>
    )
  }
}
