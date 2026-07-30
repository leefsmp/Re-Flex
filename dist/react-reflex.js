import React from "react";
import { jsx } from "react/jsx-runtime";
var __create = Object.create, __defProp = Object.defineProperty, __getOwnPropDesc = Object.getOwnPropertyDescriptor, __getOwnPropNames = Object.getOwnPropertyNames, __getProtoOf = Object.getPrototypeOf, __hasOwnProp = Object.prototype.hasOwnProperty, __commonJSMin = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports), __copyProps = (e, t, n, o) => {
	if (t && typeof t == "object" || typeof t == "function") for (var c = __getOwnPropNames(t), l = 0, u = c.length, d; l < u; l++) d = c[l], !__hasOwnProp.call(e, d) && d !== n && __defProp(e, d, {
		get: ((e) => t[e]).bind(null, d),
		enumerable: !(o = __getOwnPropDesc(t, d)) || o.enumerable
	});
	return e;
}, __toESM = (e, t, i) => (i = e == null ? {} : __create(__getProtoOf(e)), __copyProps(t || !e || !e.__esModule ? __defProp(i, "default", {
	value: e,
	enumerable: !0
}) : i, e)), Browser = class e {
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
const getDataProps = (e) => Object.keys(e).reduce((t, n) => n.startsWith("data-") ? {
	...t,
	[n]: e[n]
} : t, {}), getPointerPosition = (e) => "changedTouches" in e ? e.changedTouches[0] : e;
var ReflexSplitter = class n extends React.Component {
	ref = React.createRef();
	document;
	static defaultProps = {
		document: typeof document < "u" ? document : null,
		onStartResize: null,
		onStopResize: null,
		propagate: !1,
		onResize: null,
		className: "",
		style: {}
	};
	static isA(e) {
		return e ? process.env.NODE_ENV === "development" ? e.type === (/* @__PURE__ */ jsx(n, {})).type : e.type === n : !1;
	}
	constructor(e) {
		super(e), this.state = { active: !1 }, this.document = e.document ?? null;
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
	onMouseMove = (e) => {
		if (this.state.active) {
			let t = this.ref.current;
			this.internalProps.events.emit("resize", {
				index: this.internalProps.index,
				domElement: t,
				event: e
			}), this.props.onResize && this.props.onResize({
				component: this,
				domElement: t
			}), e.stopPropagation(), e.preventDefault();
		}
	};
	onMouseDown = (e) => {
		this.setState({ active: !0 }), !(this.props.onStartResize && this.props.onStartResize({
			domElement: this.ref.current,
			component: this
		})) && this.internalProps.events.emit("startResize", {
			index: this.internalProps.index,
			event: e
		});
	};
	onMouseUp = (e) => {
		this.state.active && (this.setState({ active: !1 }), this.props.onStopResize && this.props.onStopResize({
			domElement: this.ref.current,
			component: this
		}), this.internalProps.events.emit("stopResize", {
			index: this.internalProps.index,
			event: e
		}));
	};
	render() {
		let e = [
			Browser.isMobile() ? "reflex-thin" : "",
			...(this.props.className ?? "").split(" "),
			this.state.active ? "active" : "",
			"reflex-splitter"
		].join(" ").trim();
		return /* @__PURE__ */ jsx("div", {
			...getDataProps(this.props),
			onTouchStart: this.onMouseDown,
			onMouseDown: this.onMouseDown,
			style: this.props.style,
			className: e,
			id: this.props.id,
			ref: this.ref,
			children: this.props.children
		});
	}
}, ReflexEvents_default = class {
	_events = {};
	on(e, t) {
		return e.split(" ").forEach((e) => {
			this._events[e] = this._events[e] || [], this._events[e].push(t);
		}), this;
	}
	off(e, t) {
		return e === void 0 ? (this._events = {}, this) : (e.split(" ").forEach((e) => {
			if (e in this._events) if (t) {
				let n = this._events[e].indexOf(t);
				n !== -1 && this._events[e].splice(n, 1);
			} else this._events[e] = [];
		}), this);
	}
	emit(e, ...t) {
		let n = this._events[e];
		if (n === void 0) return;
		let r = n.slice();
		for (let e of r) {
			let n = e.apply(this, t);
			if (n !== void 0) return n;
		}
	}
}, ReflexContainer = class extends React.Component {
	static defaultProps = {
		orientation: "horizontal",
		windowResizeAware: !1,
		maxRecDepth: 100,
		className: "",
		style: {}
	};
	events;
	children;
	elements = null;
	previousPos = 0;
	ref;
	constructor(t) {
		super(t), this.events = new ReflexEvents_default(), this.children = [], this.state = { flexData: [] }, this.ref = React.createRef();
	}
	componentDidMount() {
		let e = this.computeFlexData(), { windowResizeAware: t } = this.props;
		t && window.addEventListener("resize", this.onWindowResize), this.setState({
			windowResizeAware: t,
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
		let t = this.getValidChildren(this.props);
		if (t.length !== this.state.flexData.length || e.orientation !== this.props.orientation || this.flexHasChanged(e)) {
			let e = this.computeFlexData(t, this.props);
			this.setState({ flexData: e });
		}
		this.props.windowResizeAware !== this.state.windowResizeAware && (this.props.windowResizeAware ? window.addEventListener("resize", this.onWindowResize) : window.removeEventListener("resize", this.onWindowResize), this.setState({ windowResizeAware: this.props.windowResizeAware }));
	}
	onWindowResize = () => {
		this.setState({ flexData: this.computeFlexData() });
	};
	flexHasChanged(e) {
		let t = this.getValidChildren(e).map((e) => e.props.flex || 0);
		return !this.getValidChildren().map((e) => e.props.flex || 0).every((e, n) => e === t[n]);
	}
	getChildRef(e) {
		let t = e;
		return e?.props.ref ?? t?.ref;
	}
	getSize(e) {
		let t = this.getChildRef(e)?.current;
		switch (this.props.orientation) {
			case "horizontal": return t?.offsetHeight ?? 0;
			case "vertical":
			default: return t?.offsetWidth ?? 0;
		}
	}
	getOffset(e, t) {
		let { top: n, bottom: r, left: i, right: a } = t.getBoundingClientRect();
		switch (this.props.orientation) {
			case "horizontal": {
				let t = e.clientY - this.previousPos;
				if (t > 0) {
					if (e.clientY >= n) return t;
				} else if (e.clientY <= r) return t;
				break;
			}
			case "vertical":
			default:
				{
					let t = e.clientX - this.previousPos;
					if (t > 0) {
						if (e.clientX > i) return t;
					} else if (e.clientX < a) return t;
				}
				break;
		}
		return 0;
	}
	onStartResize = (e) => {
		let t = getPointerPosition(e.event);
		switch (this.props.orientation) {
			case "horizontal":
				document.body.classList.add("reflex-row-resize"), this.previousPos = t.clientY;
				break;
			case "vertical":
			default:
				document.body.classList.add("reflex-col-resize"), this.previousPos = t.clientX;
				break;
		}
		this.elements = [this.children[e.index - 1], this.children[e.index + 1]], this.emitElementsEvent(this.elements, "onStartResize");
	};
	onResize = (e) => {
		let t = getPointerPosition(e.event), n = this.getOffset(t, e.domElement);
		switch (this.props.orientation) {
			case "horizontal":
				this.previousPos = t.clientY;
				break;
			case "vertical":
			default:
				this.previousPos = t.clientX;
				break;
		}
		if (n) {
			let t = this.computeAvailableOffset(e.index, n);
			if (t) {
				let n = this.cloneFlexData(this.state.flexData);
				this.elements = this.dispatchOffset(e.index, t, n), this.adjustFlex(this.elements, n), this.setState({
					flexData: n,
					resizing: !0
				}, () => {
					this.emitElementsEvent(this.elements, "onResize");
				});
			}
		}
	};
	onStopResize = () => {
		document.body.classList.remove("reflex-row-resize"), document.body.classList.remove("reflex-col-resize");
		let e = this.elements ? this.elements.map((e) => this.getChildRef(e)) : [], t = this.children.filter((t) => !ReflexSplitter.isA(t) && e.includes(this.getChildRef(t)));
		this.emitElementsEvent(t, "onStopResize"), this.setState({ resizing: !1 });
	};
	onElementSize = (e) => new Promise((t) => {
		try {
			let n = e.index, r = this.getSize(this.children[n]), i = e.size - r, a = e.direction, o = n + a, s = this.computeAvailableOffset(o, a * i);
			this.elements = null;
			let c = this.state.flexData;
			s && (c = this.cloneFlexData(this.state.flexData), this.elements = this.dispatchOffset(o, s, c), this.adjustFlex(this.elements, c)), this.setState({ flexData: c }, () => {
				this.emitElementsEvent(this.elements, "onResize"), t();
			});
		} catch (e) {
			console.error("ReflexContainer: failed to process element.size event", e), t();
		}
	});
	adjustFlex(e, t) {
		let n = e.reduce((n, r) => {
			let i = r.props.index;
			return n + (r.props.flex - t[i].flex) / e.length;
		}, 0);
		e.forEach((e) => {
			let r = e.props.index;
			t[r] = {
				...t[r],
				flex: t[r].flex + n
			};
		});
	}
	computeAvailableOffset(e, t) {
		let n = this.computeAvailableStretch(e, t), r = this.computeAvailableShrink(e, t);
		return Math.min(n, r) * Math.sign(t);
	}
	checkPropagate(e, t) {
		let n = t > 0 ? e < this.children.length - 2 ? this.children[e + 2] : void 0 : e > 2 ? this.children[e - 2] : void 0;
		return !!n && ReflexSplitter.isA(n) && !!n.props.propagate;
	}
	computeAvailableStretch(e, t) {
		let n = t < 0 ? e + 1 : e - 1, r = this.children[n], i = this.getSize(r), a = (r?.props.maxSize ?? 0) - i;
		if (a < Math.abs(t) && this.checkPropagate(e, -1 * t)) {
			let n = Math.sign(t) * (Math.abs(t) - a);
			return a + this.computeAvailableStretch(t < 0 ? e + 2 : e - 2, n);
		}
		return Math.min(a, Math.abs(t));
	}
	computeAvailableShrink(e, t) {
		let n = t > 0 ? e + 1 : e - 1, r = this.children[n], i = this.getSize(r) - Math.max(r?.props.minSize ?? 0, 0);
		if (i < Math.abs(t) && this.checkPropagate(e, t)) {
			let n = Math.sign(t) * (Math.abs(t) - i);
			return i + this.computeAvailableShrink(t > 0 ? e + 2 : e - 2, n);
		}
		return Math.min(i, Math.abs(t));
	}
	computePixelFlex(e = this.props.orientation ?? "horizontal") {
		if (!this.ref.current) return console.warn("Unable to locate ReflexContainer dom node"), 0;
		switch (e) {
			case "horizontal": return this.ref.current.offsetHeight === 0 ? (console.warn("Found ReflexContainer with height=0, this will cause invalid behavior..."), console.warn(this.ref.current), 0) : 1 / this.ref.current.offsetHeight;
			case "vertical":
			default: return this.ref.current.offsetWidth === 0 ? (console.warn("Found ReflexContainer with width=0, this will cause invalid behavior..."), console.warn(this.ref.current), 0) : 1 / this.ref.current.offsetWidth;
		}
	}
	addOffset(e, t, n) {
		let r = this.getSize(e), i = e.props.index, a = Math.max(r + t, 0), o = n[i].flex, s = o > 0 ? o * a / r : this.computePixelFlex() * a;
		n[i] = {
			...n[i],
			flex: !isFinite(s) || isNaN(s) ? 0 : s
		};
	}
	dispatchStretch(e, t, n) {
		let r = t < 0 ? e + 1 : e - 1;
		if (r < 0 || r > this.children.length - 1) return [];
		let i = this.children[r], a = this.getSize(i), o = Math.min(i.props.maxSize, a + Math.abs(t)) - a;
		if (this.addOffset(i, o, n), o < Math.abs(t)) {
			let r = e - Math.sign(t) * 2, a = Math.sign(t) * (Math.abs(t) - o);
			return [i, ...this.dispatchStretch(r, a, n)];
		}
		return [i];
	}
	dispatchShrink(e, t, n) {
		let r = t > 0 ? e + 1 : e - 1;
		if (r < 0 || r > this.children.length - 1) return [];
		let i = this.children[r], a = this.getSize(i), o = Math.max(i.props.minSize, a - Math.abs(t)) - a;
		if (this.addOffset(i, o, n), Math.abs(o) < Math.abs(t)) {
			let r = e + Math.sign(t) * 2, a = Math.sign(t) * (Math.abs(t) + o);
			return [i, ...this.dispatchShrink(r, a, n)];
		}
		return [i];
	}
	dispatchOffset(e, t, n) {
		return [...this.dispatchStretch(e, t, n), ...this.dispatchShrink(e, t, n)];
	}
	cloneFlexData(e) {
		return e.map((e) => ({ ...e }));
	}
	emitElementsEvent(e, t) {
		this.toArray(e).forEach((e) => {
			let n = e.props[t];
			n && n({
				domElement: this.getChildRef(e)?.current ?? null,
				component: e
			});
		});
	}
	computeFlexData(t = this.getValidChildren(), n = this.props) {
		let r = this.computePixelFlex(n.orientation), i = (e) => e.reduce((e, t) => !ReflexSplitter.isA(t) && t.constrained ? e - t.flex : e, 1), a = (e) => e.reduce((e, t) => !ReflexSplitter.isA(t) && !t.constrained ? e + 1 : e, 0), o = t.map((e) => {
			let t = e.props;
			return {
				maxFlex: (t.maxSize || Number.MAX_VALUE) * r,
				sizeFlex: (t.size || Number.MAX_VALUE) * r,
				minFlex: (t.minSize || 1) * r,
				constrained: t.flex !== void 0,
				flex: t.flex || 0,
				type: e.type
			};
		}), s = (e, t = 0) => {
			let n = !1, r = a(e), o = i(e), c = e.map((e) => {
				if (ReflexSplitter.isA(e)) return e;
				let t = e.constrained ? e.flex : o / r, i = Math.min(e.sizeFlex, Math.min(e.maxFlex, Math.max(e.minFlex, t))), a = e.constrained || i !== t;
				return n ||= a, {
					...e,
					flex: i,
					constrained: a
				};
			});
			return n && t < (this.props.maxRecDepth ?? 100) ? s(c, t + 1) : c;
		};
		return s(o).map((t) => ({
			flex: ReflexSplitter.isA(t) ? 0 : t.flex,
			ref: React.createRef()
		}));
	}
	toArray(e) {
		return e ? Array.isArray(e) ? e : [e] : [];
	}
	render() {
		let n = [
			this.state.resizing ? "reflex-resizing" : "",
			...(this.props.className ?? "").split(" "),
			this.props.orientation,
			"reflex-container"
		].join(" ").trim();
		return this.children = React.Children.map(this.getValidChildren(), (n, r) => {
			if (r > this.state.flexData.length - 1) return /* @__PURE__ */ jsx("div", {});
			let i = this.state.flexData[r], a = {
				...n.props,
				maxSize: n.props.maxSize || Number.MAX_VALUE,
				orientation: this.props.orientation ?? "horizontal",
				minSize: n.props.minSize || 1,
				events: this.events,
				flex: i.flex,
				ref: i.ref,
				index: r
			};
			return React.cloneElement(n, a);
		}) ?? [], /* @__PURE__ */ jsx("div", {
			...getDataProps(this.props),
			style: this.props.style,
			className: n,
			ref: this.ref,
			children: this.children
		});
	}
}, ReflexHandle = class n extends React.Component {
	ref = React.createRef();
	document;
	static defaultProps = {
		document: typeof document > "u" ? null : document,
		onStartResize: null,
		onStopResize: null,
		propagate: !1,
		onResize: null,
		className: "",
		style: {}
	};
	static isA(e) {
		return !e || typeof e != "object" || !("type" in e) ? !1 : process.env.NODE_ENV === "development" ? e.type === (/* @__PURE__ */ jsx(n, {})).type : e.type === n;
	}
	constructor(e) {
		super(e), this.state = { active: !1 }, this.document = e.document ?? null;
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
	onMouseMove = (e) => {
		if (this.state.active) {
			let t = this.ref.current;
			this.internalProps.events.emit("resize", {
				index: this.internalProps.index,
				domElement: t,
				event: e
			}), this.props.onResize && this.props.onResize({
				component: this,
				domElement: t
			}), e.stopPropagation(), e.preventDefault();
		}
	};
	onMouseDown = (e) => {
		this.setState({ active: !0 }), !(this.props.onStartResize && this.props.onStartResize({
			domElement: this.ref.current,
			component: this
		})) && this.internalProps.events.emit("startResize", {
			index: this.internalProps.index,
			event: e
		});
	};
	onMouseUp = (e) => {
		this.state.active && (this.setState({ active: !1 }), this.props.onStopResize && this.props.onStopResize({
			domElement: this.ref.current,
			component: this
		}), this.internalProps.events.emit("stopResize", {
			index: this.internalProps.index,
			event: e
		}));
	};
	render() {
		let e = [
			...(this.props.className ?? "").split(" "),
			this.state.active ? "active" : "",
			"reflex-handle"
		].join(" ").trim();
		return /* @__PURE__ */ jsx("div", {
			...getDataProps(this.props),
			onTouchStart: this.onMouseDown,
			onMouseDown: this.onMouseDown,
			style: this.props.style,
			className: e,
			id: this.props.id,
			ref: this.ref,
			children: this.props.children
		});
	}
}, import_lodash = /* @__PURE__ */ __toESM((/* @__PURE__ */ __commonJSMin(((e, t) => {
	var n = "Expected a function", r = NaN, i = "[object Symbol]", a = /^\s+|\s+$/g, o = /^[-+]0x[0-9a-f]+$/i, s = /^0b[01]+$/i, c = /^0o[0-7]+$/i, l = parseInt, u = typeof global == "object" && global && global.Object === Object && global, d = typeof self == "object" && self && self.Object === Object && self, f = u || d || Function("return this")(), p = Object.prototype.toString, m = Math.max, h = Math.min, g = function() {
		return f.Date.now();
	};
	function _(e, t, r) {
		var i, a, o, s, c, l, u = 0, d = !1, f = !1, p = !0;
		if (typeof e != "function") throw TypeError(n);
		t = S(t) || 0, y(r) && (d = !!r.leading, f = "maxWait" in r, o = f ? m(S(r.maxWait) || 0, t) : o, p = "trailing" in r ? !!r.trailing : p);
		function _(t) {
			var n = i, r = a;
			return i = a = void 0, u = t, s = e.apply(r, n), s;
		}
		function v(e) {
			return u = e, c = setTimeout(C, t), d ? _(e) : s;
		}
		function b(e) {
			var n = e - l, r = e - u, i = t - n;
			return f ? h(i, o - r) : i;
		}
		function x(e) {
			var n = e - l, r = e - u;
			return l === void 0 || n >= t || n < 0 || f && r >= o;
		}
		function C() {
			var e = g();
			if (x(e)) return w(e);
			c = setTimeout(C, b(e));
		}
		function w(e) {
			return c = void 0, p && i ? _(e) : (i = a = void 0, s);
		}
		function T() {
			c !== void 0 && clearTimeout(c), u = 0, i = l = a = c = void 0;
		}
		function E() {
			return c === void 0 ? s : w(g());
		}
		function D() {
			var e = g(), n = x(e);
			if (i = arguments, a = this, l = e, n) {
				if (c === void 0) return v(l);
				if (f) return c = setTimeout(C, t), _(l);
			}
			return c === void 0 && (c = setTimeout(C, t)), s;
		}
		return D.cancel = T, D.flush = E, D;
	}
	function v(e, t, r) {
		var i = !0, a = !0;
		if (typeof e != "function") throw TypeError(n);
		return y(r) && (i = "leading" in r ? !!r.leading : i, a = "trailing" in r ? !!r.trailing : a), _(e, t, {
			leading: i,
			maxWait: t,
			trailing: a
		});
	}
	function y(e) {
		var t = typeof e;
		return !!e && (t == "object" || t == "function");
	}
	function b(e) {
		return !!e && typeof e == "object";
	}
	function x(e) {
		return typeof e == "symbol" || b(e) && p.call(e) == i;
	}
	function S(e) {
		if (typeof e == "number") return e;
		if (x(e)) return r;
		if (y(e)) {
			var t = typeof e.valueOf == "function" ? e.valueOf() : e;
			e = y(t) ? t + "" : t;
		}
		if (typeof e != "string") return e === 0 ? e : +e;
		e = e.replace(a, "");
		var n = s.test(e);
		return n || c.test(e) ? l(e.slice(2), n ? 2 : 8) : o.test(e) ? r : +e;
	}
	t.exports = v;
})))(), 1), toArray = (e) => e ? Array.isArray(e) ? e : [e] : [], SizeAwareReflexElement = class extends React.Component {
	measureRef = React.createRef();
	resizeObserver;
	setDimensions;
	constructor(e) {
		super(e), this.setDimensions = (0, import_lodash.default)((e) => {
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
		this.resizeObserver?.disconnect();
	}
	onResize = ({ height: e, width: t }) => {
		let { resizeHeight: n, resizeWidth: r } = this.props;
		this.setDimensions({
			...n && { height: e },
			...r && { width: t }
		});
	};
	renderChildren() {
		let { propagateDimensions: t } = this.props, n = toArray(this.props.children).filter((e) => !!e);
		return React.Children.map(n, (n) => this.props.withHandle || ReflexHandle.isA(n) ? React.cloneElement(n, {
			dimensions: t && this.state,
			...n.props,
			index: this.props.index - 1,
			events: this.props.events
		}) : t ? React.cloneElement(n, {
			...n.props,
			dimensions: this.state
		}) : n);
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
	static defaultProps = {
		propagateDimensionsRate: 100,
		propagateDimensions: !1,
		resizeHeight: !0,
		resizeWidth: !0,
		direction: [1],
		className: ""
	};
	constructor(e) {
		super(e), this.state = { size: e.size };
	}
	static getDerivedStateFromProps(e, t) {
		return e.size === t.size ? null : {
			...t,
			size: e.size
		};
	}
	async componentDidUpdate(e, t) {
		if (t.size !== this.state.size) {
			let e = this.props.direction, t = Array.isArray(e) ? e : e === void 0 ? [] : [e];
			for (let e of t) await this.props.events.emit("element.size", {
				index: this.props.index,
				size: this.props.size,
				direction: e
			});
		}
	}
	renderChildren() {
		let t = toArray(this.props.children).filter((e) => !!e);
		return React.Children.map(t, (t) => this.props.withHandle || ReflexHandle.isA(t) ? React.cloneElement(t, {
			...t.props,
			index: this.props.index - 1,
			events: this.props.events
		}) : t);
	}
	render() {
		let e = [
			...(this.props.className ?? "").split(" "),
			this.props.orientation,
			"reflex-element"
		].join(" ").trim(), n = {
			...this.props.style,
			flexGrow: this.props.flex,
			flexShrink: 1,
			flexBasis: "0%"
		};
		return /* @__PURE__ */ jsx("div", {
			...getDataProps(this.props),
			ref: this.props.innerRef,
			className: e,
			style: n,
			children: this.props.propagateDimensions ? /* @__PURE__ */ jsx(SizeAwareReflexElement, { ...this.props }) : this.renderChildren()
		});
	}
}, ReflexElement_default = React.forwardRef((e, n) => /* @__PURE__ */ jsx(ReflexElement, {
	innerRef: n,
	...e
}));
export { ReflexContainer, ReflexElement_default as ReflexElement, ReflexHandle, ReflexSplitter };
