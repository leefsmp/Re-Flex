import React from "react";
import { jsx } from "react/jsx-runtime";
var __create = Object.create, __defProp = Object.defineProperty, __getOwnPropDesc = Object.getOwnPropertyDescriptor, __getOwnPropNames = Object.getOwnPropertyNames, __getProtoOf = Object.getPrototypeOf, __hasOwnProp = Object.prototype.hasOwnProperty, __commonJSMin = (e, n) => () => (n || e((n = { exports: {} }).exports, n), n.exports), __copyProps = (e, n, r, s) => {
	if (n && typeof n == "object" || typeof n == "function") for (var l = __getOwnPropNames(n), u = 0, d = l.length, f; u < d; u++) f = l[u], !__hasOwnProp.call(e, f) && f !== r && __defProp(e, f, {
		get: ((e) => n[e]).bind(null, f),
		enumerable: !(s = __getOwnPropDesc(n, f)) || s.enumerable
	});
	return e;
}, __toESM = (e, n, a) => (a = e == null ? {} : __create(__getProtoOf(e)), __copyProps(n || !e || !e.__esModule ? __defProp(a, "default", {
	value: e,
	enumerable: !0
}) : a, e));
function _typeof(e) {
	"@babel/helpers - typeof";
	return _typeof = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
		return typeof e;
	} : function(e) {
		return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
	}, _typeof(e);
}
function toPrimitive(e, n) {
	if (_typeof(e) != "object" || !e) return e;
	var r = e[Symbol.toPrimitive];
	if (r !== void 0) {
		var i = r.call(e, n || "default");
		if (_typeof(i) != "object") return i;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (n === "string" ? String : Number)(e);
}
function toPropertyKey(e) {
	var n = toPrimitive(e, "string");
	return _typeof(n) == "symbol" ? n : n + "";
}
function _defineProperty(e, n, r) {
	return (n = toPropertyKey(n)) in e ? Object.defineProperty(e, n, {
		value: r,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[n] = r, e;
}
function ownKeys(e, n) {
	var r = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var i = Object.getOwnPropertySymbols(e);
		n && (i = i.filter(function(n) {
			return Object.getOwnPropertyDescriptor(e, n).enumerable;
		})), r.push.apply(r, i);
	}
	return r;
}
function _objectSpread2(e) {
	for (var n = 1; n < arguments.length; n++) {
		var r = arguments[n] == null ? {} : arguments[n];
		n % 2 ? ownKeys(Object(r), !0).forEach(function(n) {
			_defineProperty(e, n, r[n]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : ownKeys(Object(r)).forEach(function(n) {
			Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
		});
	}
	return e;
}
var Browser = class e {
	static isBrowser() {
		return typeof window < "u";
	}
	static getUserAgent() {
		return typeof navigator > "u" ? "" : navigator.userAgent;
	}
	static isAndroid() {
		return e.isBrowser() && /Android/i.test(e.getUserAgent());
	}
	static isBlackBerry() {
		return e.isBrowser() && /BlackBerry/i.test(e.getUserAgent());
	}
	static isIOS() {
		return e.isBrowser() && /iPhone|iPad|iPod/i.test(e.getUserAgent());
	}
	static isWindowsMobile() {
		return e.isBrowser() && /IEMobile/i.test(e.getUserAgent());
	}
	static isMobile() {
		return e.isBrowser() && (e.isWindowsMobile() || e.isBlackBerry() || e.isAndroid() || e.isIOS());
	}
};
const getDataProps = (e) => Object.keys(e).reduce((n, r) => r.startsWith("data-") ? _objectSpread2(_objectSpread2({}, n), {}, { [r]: e[r] }) : n, {}), getPointerPosition = (e) => "changedTouches" in e ? e.changedTouches[0] : e;
var ReflexSplitter = class r extends React.Component {
	static isA(e) {
		return e ? process.env.NODE_ENV === "development" ? e.type === (/* @__PURE__ */ jsx(r, {})).type : e.type === r : !1;
	}
	constructor(n) {
		var r;
		super(n), _defineProperty(this, "ref", React.createRef()), _defineProperty(this, "document", void 0), _defineProperty(this, "onMouseMove", (e) => {
			if (this.state.active) {
				let n = this.ref.current;
				this.internalProps.events.emit("resize", {
					index: this.internalProps.index,
					domElement: n,
					event: e
				}), this.props.onResize && this.props.onResize({
					component: this,
					domElement: n
				}), e.stopPropagation(), e.preventDefault();
			}
		}), _defineProperty(this, "onMouseDown", (e) => {
			this.setState({ active: !0 }), !(this.props.onStartResize && this.props.onStartResize({
				domElement: this.ref.current,
				component: this
			})) && this.internalProps.events.emit("startResize", {
				index: this.internalProps.index,
				event: e
			});
		}), _defineProperty(this, "onMouseUp", (e) => {
			this.state.active && (this.setState({ active: !1 }), this.props.onStopResize && this.props.onStopResize({
				domElement: this.ref.current,
				component: this
			}), this.internalProps.events.emit("stopResize", {
				index: this.internalProps.index,
				event: e
			}));
		}), this.state = { active: !1 }, this.document = (r = n.document) == null ? null : r;
	}
	get internalProps() {
		return this.props;
	}
	componentDidMount() {
		this.document && (this.document.addEventListener("touchend", this.onMouseUp), this.document.addEventListener("mouseup", this.onMouseUp), this.document.addEventListener("mousemove", this.onMouseMove, { passive: !1 }), this.document.addEventListener("touchmove", this.onMouseMove, { passive: !1 }));
	}
	componentWillUnmount() {
		this.document && (this.document.removeEventListener("mouseup", this.onMouseUp), this.document.removeEventListener("touchend", this.onMouseUp), this.document.removeEventListener("mousemove", this.onMouseMove), this.document.removeEventListener("touchmove", this.onMouseMove), this.state.active && this.internalProps.events.emit("stopResize", {
			index: this.internalProps.index,
			event: null
		}));
	}
	render() {
		var e;
		let r = [
			Browser.isMobile() ? "reflex-thin" : "",
			...((e = this.props.className) == null ? "" : e).split(" "),
			this.state.active ? "active" : "",
			"reflex-splitter"
		].join(" ").trim();
		return /* @__PURE__ */ jsx("div", _objectSpread2(_objectSpread2({}, getDataProps(this.props)), {}, {
			onTouchStart: this.onMouseDown,
			onMouseDown: this.onMouseDown,
			style: this.props.style,
			className: r,
			id: this.props.id,
			ref: this.ref,
			children: this.props.children
		}));
	}
};
_defineProperty(ReflexSplitter, "defaultProps", {
	document: typeof document < "u" ? document : null,
	onStartResize: null,
	onStopResize: null,
	propagate: !1,
	onResize: null,
	className: "",
	style: {}
});
var ReflexEvents_default = class {
	constructor() {
		_defineProperty(this, "_events", {});
	}
	on(e, n) {
		return e.split(" ").forEach((e) => {
			this._events[e] = this._events[e] || [], this._events[e].push(n);
		}), this;
	}
	off(e, n) {
		return e === void 0 ? (this._events = {}, this) : (e.split(" ").forEach((e) => {
			if (e in this._events) if (n) {
				let r = this._events[e].indexOf(n);
				r !== -1 && this._events[e].splice(r, 1);
			} else this._events[e] = [];
		}), this);
	}
	emit(e, ...n) {
		let r = this._events[e];
		if (r === void 0) return;
		let i = r.slice();
		for (let e of i) {
			let r = e.apply(this, n);
			if (r !== void 0) return r;
		}
	}
}, ReflexContainer = class extends React.Component {
	constructor(n) {
		super(n), _defineProperty(this, "events", void 0), _defineProperty(this, "children", void 0), _defineProperty(this, "elements", null), _defineProperty(this, "previousPos", 0), _defineProperty(this, "ref", void 0), _defineProperty(this, "onWindowResize", () => {
			this.setState({ flexData: this.computeFlexData() });
		}), _defineProperty(this, "onStartResize", (e) => {
			let n = getPointerPosition(e.event);
			switch (this.props.orientation) {
				case "horizontal":
					document.body.classList.add("reflex-row-resize"), this.previousPos = n.clientY;
					break;
				case "vertical":
				default:
					document.body.classList.add("reflex-col-resize"), this.previousPos = n.clientX;
					break;
			}
			this.elements = [this.children[e.index - 1], this.children[e.index + 1]], this.emitElementsEvent(this.elements, "onStartResize");
		}), _defineProperty(this, "onResize", (e) => {
			let n = getPointerPosition(e.event), r = this.getOffset(n, e.domElement);
			switch (this.props.orientation) {
				case "horizontal":
					this.previousPos = n.clientY;
					break;
				case "vertical":
				default:
					this.previousPos = n.clientX;
					break;
			}
			if (r) {
				let n = this.computeAvailableOffset(e.index, r);
				if (n) {
					let r = this.cloneFlexData(this.state.flexData);
					this.elements = this.dispatchOffset(e.index, n, r), this.adjustFlex(this.elements, r), this.setState({
						flexData: r,
						resizing: !0
					}, () => {
						this.emitElementsEvent(this.elements, "onResize");
					});
				}
			}
		}), _defineProperty(this, "onStopResize", () => {
			document.body.classList.remove("reflex-row-resize"), document.body.classList.remove("reflex-col-resize");
			let e = this.elements ? this.elements.map((e) => this.getChildRef(e)) : [], n = this.children.filter((n) => !ReflexSplitter.isA(n) && e.includes(this.getChildRef(n)));
			this.emitElementsEvent(n, "onStopResize"), this.setState({ resizing: !1 });
		}), _defineProperty(this, "onElementSize", (e) => new Promise((n) => {
			try {
				let r = e.index, i = this.getSize(this.children[r]), a = e.size - i, o = e.direction, s = r + o, c = this.computeAvailableOffset(s, o * a);
				this.elements = null;
				let l = this.state.flexData;
				c && (l = this.cloneFlexData(this.state.flexData), this.elements = this.dispatchOffset(s, c, l), this.adjustFlex(this.elements, l)), this.setState({ flexData: l }, () => {
					this.emitElementsEvent(this.elements, "onResize"), n();
				});
			} catch (e) {
				console.error("ReflexContainer: failed to process element.size event", e), n();
			}
		})), this.events = new ReflexEvents_default(), this.children = [], this.state = { flexData: [] }, this.ref = React.createRef();
	}
	componentDidMount() {
		let e = this.computeFlexData(), { windowResizeAware: n } = this.props;
		n && window.addEventListener("resize", this.onWindowResize), this.setState({
			windowResizeAware: n,
			flexData: e
		}), this.events.on("element.size", this.onElementSize), this.events.on("startResize", this.onStartResize), this.events.on("stopResize", this.onStopResize), this.events.on("resize", this.onResize);
	}
	componentWillUnmount() {
		this.events.off(), window.removeEventListener("resize", this.onWindowResize);
	}
	getValidChildren(e = this.props) {
		return this.toArray(e.children).filter((e) => !!e);
	}
	componentDidUpdate(e) {
		let n = this.getValidChildren(this.props);
		if (n.length !== this.state.flexData.length || e.orientation !== this.props.orientation || this.flexHasChanged(e)) {
			let e = this.computeFlexData(n, this.props);
			this.setState({ flexData: e });
		}
		this.props.windowResizeAware !== this.state.windowResizeAware && (this.props.windowResizeAware ? window.addEventListener("resize", this.onWindowResize) : window.removeEventListener("resize", this.onWindowResize), this.setState({ windowResizeAware: this.props.windowResizeAware }));
	}
	flexHasChanged(e) {
		let n = this.getValidChildren(e).map((e) => e.props.flex || 0);
		return !this.getValidChildren().map((e) => e.props.flex || 0).every((e, r) => e === n[r]);
	}
	getChildRef(e) {
		var n;
		let r = e;
		return (n = e == null ? void 0 : e.props.ref) == null ? r == null ? void 0 : r.ref : n;
	}
	getSize(e) {
		let n = this.getChildRef(e), r = n == null ? void 0 : n.current;
		switch (this.props.orientation) {
			case "horizontal":
				var i;
				return (i = r == null ? void 0 : r.offsetHeight) == null ? 0 : i;
			case "vertical":
			default:
				var a;
				return (a = r == null ? void 0 : r.offsetWidth) == null ? 0 : a;
		}
	}
	getOffset(e, n) {
		let { top: r, bottom: i, left: a, right: o } = n.getBoundingClientRect();
		switch (this.props.orientation) {
			case "horizontal": {
				let n = e.clientY - this.previousPos;
				if (n > 0) {
					if (e.clientY >= r) return n;
				} else if (e.clientY <= i) return n;
				break;
			}
			case "vertical":
			default:
				{
					let n = e.clientX - this.previousPos;
					if (n > 0) {
						if (e.clientX > a) return n;
					} else if (e.clientX < o) return n;
				}
				break;
		}
		return 0;
	}
	adjustFlex(e, n) {
		let r = e.reduce((r, i) => {
			let a = i.props.index;
			return r + (i.props.flex - n[a].flex) / e.length;
		}, 0);
		e.forEach((e) => {
			let i = e.props.index;
			n[i] = _objectSpread2(_objectSpread2({}, n[i]), {}, { flex: n[i].flex + r });
		});
	}
	computeAvailableOffset(e, n) {
		let r = this.computeAvailableStretch(e, n), i = this.computeAvailableShrink(e, n);
		return Math.min(r, i) * Math.sign(n);
	}
	checkPropagate(e, n) {
		let r = n > 0 ? e < this.children.length - 2 ? this.children[e + 2] : void 0 : e > 2 ? this.children[e - 2] : void 0;
		return !!r && ReflexSplitter.isA(r) && !!r.props.propagate;
	}
	computeAvailableStretch(e, n) {
		var r;
		let i = n < 0 ? e + 1 : e - 1, a = this.children[i], o = this.getSize(a), s = ((r = a == null ? void 0 : a.props.maxSize) == null ? 0 : r) - o;
		if (s < Math.abs(n) && this.checkPropagate(e, -1 * n)) {
			let r = Math.sign(n) * (Math.abs(n) - s);
			return s + this.computeAvailableStretch(n < 0 ? e + 2 : e - 2, r);
		}
		return Math.min(s, Math.abs(n));
	}
	computeAvailableShrink(e, n) {
		var r;
		let i = n > 0 ? e + 1 : e - 1, a = this.children[i], o = this.getSize(a) - Math.max((r = a == null ? void 0 : a.props.minSize) == null ? 0 : r, 0);
		if (o < Math.abs(n) && this.checkPropagate(e, n)) {
			let r = Math.sign(n) * (Math.abs(n) - o);
			return o + this.computeAvailableShrink(n > 0 ? e + 2 : e - 2, r);
		}
		return Math.min(o, Math.abs(n));
	}
	computePixelFlex(e = ((e) => (e = this.props.orientation) == null ? "horizontal" : e)()) {
		if (!this.ref.current) return console.warn("Unable to locate ReflexContainer dom node"), 0;
		switch (e) {
			case "horizontal": return this.ref.current.offsetHeight === 0 ? (console.warn("Found ReflexContainer with height=0, this will cause invalid behavior..."), console.warn(this.ref.current), 0) : 1 / this.ref.current.offsetHeight;
			case "vertical":
			default: return this.ref.current.offsetWidth === 0 ? (console.warn("Found ReflexContainer with width=0, this will cause invalid behavior..."), console.warn(this.ref.current), 0) : 1 / this.ref.current.offsetWidth;
		}
	}
	addOffset(e, n, r) {
		let i = this.getSize(e), a = e.props.index, o = Math.max(i + n, 0), s = r[a].flex, c = s > 0 ? s * o / i : this.computePixelFlex() * o;
		r[a] = _objectSpread2(_objectSpread2({}, r[a]), {}, { flex: !isFinite(c) || isNaN(c) ? 0 : c });
	}
	dispatchStretch(e, n, r) {
		let i = n < 0 ? e + 1 : e - 1;
		if (i < 0 || i > this.children.length - 1) return [];
		let a = this.children[i], o = this.getSize(a), s = Math.min(a.props.maxSize, o + Math.abs(n)) - o;
		if (this.addOffset(a, s, r), s < Math.abs(n)) {
			let i = e - Math.sign(n) * 2, o = Math.sign(n) * (Math.abs(n) - s);
			return [a, ...this.dispatchStretch(i, o, r)];
		}
		return [a];
	}
	dispatchShrink(e, n, r) {
		let i = n > 0 ? e + 1 : e - 1;
		if (i < 0 || i > this.children.length - 1) return [];
		let a = this.children[i], o = this.getSize(a), s = Math.max(a.props.minSize, o - Math.abs(n)) - o;
		if (this.addOffset(a, s, r), Math.abs(s) < Math.abs(n)) {
			let i = e + Math.sign(n) * 2, o = Math.sign(n) * (Math.abs(n) + s);
			return [a, ...this.dispatchShrink(i, o, r)];
		}
		return [a];
	}
	dispatchOffset(e, n, r) {
		return [...this.dispatchStretch(e, n, r), ...this.dispatchShrink(e, n, r)];
	}
	cloneFlexData(e) {
		return e.map((e) => _objectSpread2({}, e));
	}
	emitElementsEvent(e, n) {
		this.toArray(e).forEach((e) => {
			let r = e.props[n];
			if (r) {
				var i;
				let n = this.getChildRef(e);
				r({
					domElement: (i = n == null ? void 0 : n.current) == null ? null : i,
					component: e
				});
			}
		});
	}
	computeFlexData(n = this.getValidChildren(), r = this.props) {
		let i = this.computePixelFlex(r.orientation), a = (e) => e.reduce((e, n) => !ReflexSplitter.isA(n) && n.constrained ? e - n.flex : e, 1), o = (e) => e.reduce((e, n) => !ReflexSplitter.isA(n) && !n.constrained ? e + 1 : e, 0), s = n.map((e) => {
			let n = e.props;
			return {
				maxFlex: (n.maxSize || Number.MAX_VALUE) * i,
				sizeFlex: (n.size || Number.MAX_VALUE) * i,
				minFlex: (n.minSize || 1) * i,
				constrained: n.flex !== void 0,
				flex: n.flex || 0,
				type: e.type
			};
		}), c = (e, n = 0) => {
			var r;
			let i = !1, s = o(e), l = a(e), u = e.map((e) => {
				if (ReflexSplitter.isA(e)) return e;
				let n = e.constrained ? e.flex : l / s, r = Math.min(e.sizeFlex, Math.min(e.maxFlex, Math.max(e.minFlex, n))), a = e.constrained || r !== n;
				return i = i || a, _objectSpread2(_objectSpread2({}, e), {}, {
					flex: r,
					constrained: a
				});
			});
			return i && n < ((r = this.props.maxRecDepth) == null ? 100 : r) ? c(u, n + 1) : u;
		};
		return c(s).map((n) => ({
			flex: ReflexSplitter.isA(n) ? 0 : n.flex,
			ref: React.createRef()
		}));
	}
	toArray(e) {
		return e ? Array.isArray(e) ? e : [e] : [];
	}
	render() {
		var r, i;
		let a = [
			this.state.resizing ? "reflex-resizing" : "",
			...((r = this.props.className) == null ? "" : r).split(" "),
			this.props.orientation,
			"reflex-container"
		].join(" ").trim();
		return this.children = (i = React.Children.map(this.getValidChildren(), (r, i) => {
			var a;
			if (i > this.state.flexData.length - 1) return /* @__PURE__ */ jsx("div", {});
			let o = this.state.flexData[i], s = _objectSpread2(_objectSpread2({}, r.props), {}, {
				maxSize: r.props.maxSize || Number.MAX_VALUE,
				orientation: (a = this.props.orientation) == null ? "horizontal" : a,
				minSize: r.props.minSize || 1,
				events: this.events,
				flex: o.flex,
				ref: o.ref,
				index: i
			});
			return React.cloneElement(r, s);
		})) == null ? [] : i, /* @__PURE__ */ jsx("div", _objectSpread2(_objectSpread2({}, getDataProps(this.props)), {}, {
			style: this.props.style,
			className: a,
			ref: this.ref,
			children: this.children
		}));
	}
};
_defineProperty(ReflexContainer, "defaultProps", {
	orientation: "horizontal",
	windowResizeAware: !1,
	maxRecDepth: 100,
	className: "",
	style: {}
});
var ReflexHandle = class r extends React.Component {
	static isA(e) {
		return !e || typeof e != "object" || !("type" in e) ? !1 : process.env.NODE_ENV === "development" ? e.type === (/* @__PURE__ */ jsx(r, {})).type : e.type === r;
	}
	constructor(n) {
		var r;
		super(n), _defineProperty(this, "ref", React.createRef()), _defineProperty(this, "document", void 0), _defineProperty(this, "onMouseMove", (e) => {
			if (this.state.active) {
				let n = this.ref.current;
				this.internalProps.events.emit("resize", {
					index: this.internalProps.index,
					domElement: n,
					event: e
				}), this.props.onResize && this.props.onResize({
					component: this,
					domElement: n
				}), e.stopPropagation(), e.preventDefault();
			}
		}), _defineProperty(this, "onMouseDown", (e) => {
			this.setState({ active: !0 }), !(this.props.onStartResize && this.props.onStartResize({
				domElement: this.ref.current,
				component: this
			})) && this.internalProps.events.emit("startResize", {
				index: this.internalProps.index,
				event: e
			});
		}), _defineProperty(this, "onMouseUp", (e) => {
			this.state.active && (this.setState({ active: !1 }), this.props.onStopResize && this.props.onStopResize({
				domElement: this.ref.current,
				component: this
			}), this.internalProps.events.emit("stopResize", {
				index: this.internalProps.index,
				event: e
			}));
		}), this.state = { active: !1 }, this.document = (r = n.document) == null ? null : r;
	}
	get internalProps() {
		return this.props;
	}
	componentDidMount() {
		this.document && (this.document.addEventListener("touchend", this.onMouseUp), this.document.addEventListener("mouseup", this.onMouseUp), this.document.addEventListener("mousemove", this.onMouseMove, { passive: !1 }), this.document.addEventListener("touchmove", this.onMouseMove, { passive: !1 }));
	}
	componentWillUnmount() {
		this.document && (this.document.removeEventListener("mouseup", this.onMouseUp), this.document.removeEventListener("touchend", this.onMouseUp), this.document.removeEventListener("mousemove", this.onMouseMove), this.document.removeEventListener("touchmove", this.onMouseMove), this.state.active && this.internalProps.events.emit("stopResize", {
			index: this.internalProps.index,
			event: null
		}));
	}
	render() {
		var e;
		let r = [
			...((e = this.props.className) == null ? "" : e).split(" "),
			this.state.active ? "active" : "",
			"reflex-handle"
		].join(" ").trim();
		return /* @__PURE__ */ jsx("div", _objectSpread2(_objectSpread2({}, getDataProps(this.props)), {}, {
			onTouchStart: this.onMouseDown,
			onMouseDown: this.onMouseDown,
			style: this.props.style,
			className: r,
			id: this.props.id,
			ref: this.ref,
			children: this.props.children
		}));
	}
};
_defineProperty(ReflexHandle, "defaultProps", {
	document: typeof document > "u" ? null : document,
	onStartResize: null,
	onStopResize: null,
	propagate: !1,
	onResize: null,
	className: "",
	style: {}
});
var import_lodash = /* @__PURE__ */ __toESM((/* @__PURE__ */ __commonJSMin(((e, n) => {
	var r = "Expected a function", i = NaN, a = "[object Symbol]", o = /^\s+|\s+$/g, s = /^[-+]0x[0-9a-f]+$/i, c = /^0b[01]+$/i, l = /^0o[0-7]+$/i, u = parseInt, d = typeof global == "object" && global && global.Object === Object && global, f = typeof self == "object" && self && self.Object === Object && self, p = d || f || Function("return this")(), m = Object.prototype.toString, h = Math.max, g = Math.min, _ = function() {
		return p.Date.now();
	};
	function v(e, n, i) {
		var a, o, s, c, l, u, d = 0, f = !1, p = !1, m = !0;
		if (typeof e != "function") throw TypeError(r);
		n = C(n) || 0, b(i) && (f = !!i.leading, p = "maxWait" in i, s = p ? h(C(i.maxWait) || 0, n) : s, m = "trailing" in i ? !!i.trailing : m);
		function v(n) {
			var r = a, i = o;
			return a = o = void 0, d = n, c = e.apply(i, r), c;
		}
		function y(e) {
			return d = e, l = setTimeout(w, n), f ? v(e) : c;
		}
		function x(e) {
			var r = e - u, i = e - d, a = n - r;
			return p ? g(a, s - i) : a;
		}
		function S(e) {
			var r = e - u, i = e - d;
			return u === void 0 || r >= n || r < 0 || p && i >= s;
		}
		function w() {
			var e = _();
			if (S(e)) return T(e);
			l = setTimeout(w, x(e));
		}
		function T(e) {
			return l = void 0, m && a ? v(e) : (a = o = void 0, c);
		}
		function E() {
			l !== void 0 && clearTimeout(l), d = 0, a = u = o = l = void 0;
		}
		function D() {
			return l === void 0 ? c : T(_());
		}
		function O() {
			var e = _(), r = S(e);
			if (a = arguments, o = this, u = e, r) {
				if (l === void 0) return y(u);
				if (p) return l = setTimeout(w, n), v(u);
			}
			return l === void 0 && (l = setTimeout(w, n)), c;
		}
		return O.cancel = E, O.flush = D, O;
	}
	function y(e, n, i) {
		var a = !0, o = !0;
		if (typeof e != "function") throw TypeError(r);
		return b(i) && (a = "leading" in i ? !!i.leading : a, o = "trailing" in i ? !!i.trailing : o), v(e, n, {
			leading: a,
			maxWait: n,
			trailing: o
		});
	}
	function b(e) {
		var n = typeof e;
		return !!e && (n == "object" || n == "function");
	}
	function x(e) {
		return !!e && typeof e == "object";
	}
	function S(e) {
		return typeof e == "symbol" || x(e) && m.call(e) == a;
	}
	function C(e) {
		if (typeof e == "number") return e;
		if (S(e)) return i;
		if (b(e)) {
			var n = typeof e.valueOf == "function" ? e.valueOf() : e;
			e = b(n) ? n + "" : n;
		}
		if (typeof e != "string") return e === 0 ? e : +e;
		e = e.replace(o, "");
		var r = c.test(e);
		return r || l.test(e) ? u(e.slice(2), r ? 2 : 8) : s.test(e) ? i : +e;
	}
	n.exports = y;
})))(), 1), toArray = (e) => e ? Array.isArray(e) ? e : [e] : [], SizeAwareReflexElement = class extends React.Component {
	constructor(n) {
		super(n), _defineProperty(this, "measureRef", React.createRef()), _defineProperty(this, "resizeObserver", void 0), _defineProperty(this, "setDimensions", void 0), _defineProperty(this, "onResize", ({ height: e, width: n }) => {
			let { resizeHeight: r, resizeWidth: i } = this.props;
			this.setDimensions(_objectSpread2(_objectSpread2({}, r && { height: e }), i && { width: n }));
		}), this.setDimensions = (0, import_lodash.default)((e) => {
			this.setState(e);
		}, this.props.propagateDimensionsRate / 1e3), this.state = {
			height: "100%",
			width: "100%"
		};
	}
	componentDidMount() {
		this.resizeObserver = new ResizeObserver((e) => {
			this.onResize(e[0].contentRect);
		}), this.measureRef.current && this.resizeObserver.observe(this.measureRef.current);
	}
	componentWillUnmount() {
		var e;
		(e = this.resizeObserver) == null || e.disconnect();
	}
	renderChildren() {
		let { propagateDimensions: n } = this.props, r = toArray(this.props.children).filter((e) => !!e);
		return React.Children.map(r, (r) => this.props.withHandle || ReflexHandle.isA(r) ? React.cloneElement(r, _objectSpread2(_objectSpread2({ dimensions: n && this.state }, r.props), {}, {
			index: this.props.index - 1,
			events: this.props.events
		})) : n ? React.cloneElement(r, _objectSpread2(_objectSpread2({}, r.props), {}, { dimensions: this.state })) : r);
	}
	render() {
		return /* @__PURE__ */ jsx("div", {
			ref: this.measureRef,
			className: "reflex-size-aware",
			children: /* @__PURE__ */ jsx("div", {
				style: this.state,
				children: this.renderChildren()
			})
		});
	}
}, ReflexElement = class extends React.Component {
	constructor(e) {
		super(e), this.state = { size: e.size };
	}
	static getDerivedStateFromProps(e, n) {
		return e.size === n.size ? null : _objectSpread2(_objectSpread2({}, n), {}, { size: e.size });
	}
	async componentDidUpdate(e, n) {
		var r = this;
		if (n.size !== r.state.size) {
			let e = r.props.direction, n = Array.isArray(e) ? e : e === void 0 ? [] : [e];
			for (let e of n) await r.props.events.emit("element.size", {
				index: r.props.index,
				size: r.props.size,
				direction: e
			});
		}
	}
	renderChildren() {
		let n = toArray(this.props.children).filter((e) => !!e);
		return React.Children.map(n, (n) => this.props.withHandle || ReflexHandle.isA(n) ? React.cloneElement(n, _objectSpread2(_objectSpread2({}, n.props), {}, {
			index: this.props.index - 1,
			events: this.props.events
		})) : n);
	}
	render() {
		var e;
		let r = [
			...((e = this.props.className) == null ? "" : e).split(" "),
			this.props.orientation,
			"reflex-element"
		].join(" ").trim(), i = _objectSpread2(_objectSpread2({}, this.props.style), {}, {
			flexGrow: this.props.flex,
			flexShrink: 1,
			flexBasis: "0%"
		});
		return /* @__PURE__ */ jsx("div", _objectSpread2(_objectSpread2({}, getDataProps(this.props)), {}, {
			ref: this.props.innerRef,
			className: r,
			style: i,
			children: this.props.propagateDimensions ? /* @__PURE__ */ jsx(SizeAwareReflexElement, _objectSpread2({}, this.props)) : this.renderChildren()
		}));
	}
};
_defineProperty(ReflexElement, "defaultProps", {
	propagateDimensionsRate: 100,
	propagateDimensions: !1,
	resizeHeight: !0,
	resizeWidth: !0,
	direction: [1],
	className: ""
});
var ReflexElement_default = React.forwardRef((e, r) => /* @__PURE__ */ jsx(ReflexElement, _objectSpread2({ innerRef: r }, e)));
export { ReflexContainer, ReflexElement_default as ReflexElement, ReflexHandle, ReflexSplitter };
