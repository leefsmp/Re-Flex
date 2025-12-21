import React, { Component, createElement } from "react";
import { jsx } from "react/jsx-runtime";
var __create = Object.create, __defProp = Object.defineProperty, __getOwnPropDesc = Object.getOwnPropertyDescriptor, __getOwnPropNames = Object.getOwnPropertyNames, __getProtoOf = Object.getPrototypeOf, __hasOwnProp = Object.prototype.hasOwnProperty, __commonJSMin = (r, o) => () => (o || r((o = { exports: {} }).exports, o), o.exports), __copyProps = (r, o, s, c) => {
	if (o && typeof o == "object" || typeof o == "function") for (var l = __getOwnPropNames(o), p = 0, h = l.length, g; p < h; p++) g = l[p], !__hasOwnProp.call(r, g) && g !== s && __defProp(r, g, {
		get: ((r) => o[r]).bind(null, g),
		enumerable: !(c = __getOwnPropDesc(o, g)) || c.enumerable
	});
	return r;
}, __toESM = (r, o, s) => (s = r == null ? {} : __create(__getProtoOf(r)), __copyProps(o || !r || !r.__esModule ? __defProp(s, "default", {
	value: r,
	enumerable: !0
}) : s, r)), Browser = class r {
	static isBrowser() {
		return typeof window < "u";
	}
	static isOpera() {
		return r.isBrowser() && (!!window.opera || navigator.userAgent.indexOf(" OPR/") >= 0);
	}
	static isFirefox() {
		return r.isBrowser() && typeof InstallTrigger < "u";
	}
	static isSafari() {
		return r.isBrowser() ? /^((?!chrome|android).)*safari/i.test(navigator.userAgent) : !1;
	}
	static isIE() {
		return r.isBrowser() && !!document.documentMode;
	}
	static isEdge() {
		return r.isBrowser() && !r.isIE() && !!window.StyleMedia;
	}
	static isChrome() {
		return r.isBrowser() && !!window.chrome && !!window.chrome.webstore;
	}
	static isBlink() {
		return r.isBrowser() && (r.isChrome() || r.isOpera()) && !!window.CSS;
	}
	static getUserAgent() {
		return typeof navigator > "u" ? "" : navigator.userAgent;
	}
	static isAndroid() {
		return r.isBrowser() && r.getUserAgent().match(/Android/i);
	}
	static isBlackBerry() {
		return r.isBrowser() && r.getUserAgent().match(/BlackBerry/i);
	}
	static isIOS() {
		return r.isBrowser() && r.getUserAgent().match(/iPhone|iPad|iPod/i);
	}
	static isOpera() {
		return r.isBrowser() && r.getUserAgent().match(/Opera Mini/i);
	}
	static isWindows() {
		return r.isBrowser() && r.isWindowsDesktop() || r.isWindowsMobile();
	}
	static isWindowsMobile() {
		return r.isBrowser() && r.getUserAgent().match(/IEMobile/i);
	}
	static isWindowsDesktop() {
		return r.isBrowser() && r.getUserAgent().match(/WPDesktop/i);
	}
	static isMobile() {
		return r.isBrowser() && (r.isWindowsMobile() || r.isBlackBerry() || r.isAndroid() || r.isIOS());
	}
}, getDataProps = (r) => Object.keys(r).reduce((o, s) => s.substr(0, 5) === "data-" ? {
	...o,
	[s]: r[s]
} : o, {}), require_react_is_production_min = /* @__PURE__ */ __commonJSMin(((r) => {
	var o = typeof Symbol == "function" && Symbol.for, s = o ? Symbol.for("react.element") : 60103, c = o ? Symbol.for("react.portal") : 60106, l = o ? Symbol.for("react.fragment") : 60107, u = o ? Symbol.for("react.strict_mode") : 60108, d = o ? Symbol.for("react.profiler") : 60114, f = o ? Symbol.for("react.provider") : 60109, p = o ? Symbol.for("react.context") : 60110, m = o ? Symbol.for("react.async_mode") : 60111, h = o ? Symbol.for("react.concurrent_mode") : 60111, g = o ? Symbol.for("react.forward_ref") : 60112, _ = o ? Symbol.for("react.suspense") : 60113, v = o ? Symbol.for("react.suspense_list") : 60120, y = o ? Symbol.for("react.memo") : 60115, b = o ? Symbol.for("react.lazy") : 60116, x = o ? Symbol.for("react.block") : 60121, S = o ? Symbol.for("react.fundamental") : 60117, C = o ? Symbol.for("react.responder") : 60118, w = o ? Symbol.for("react.scope") : 60119;
	function T(r) {
		if (typeof r == "object" && r) {
			var o = r.$$typeof;
			switch (o) {
				case s: switch (r = r.type, r) {
					case m:
					case h:
					case l:
					case d:
					case u:
					case _: return r;
					default: switch (r &&= r.$$typeof, r) {
						case p:
						case g:
						case b:
						case y:
						case f: return r;
						default: return o;
					}
				}
				case c: return o;
			}
		}
	}
	function E(r) {
		return T(r) === h;
	}
	r.AsyncMode = m, r.ConcurrentMode = h, r.ContextConsumer = p, r.ContextProvider = f, r.Element = s, r.ForwardRef = g, r.Fragment = l, r.Lazy = b, r.Memo = y, r.Portal = c, r.Profiler = d, r.StrictMode = u, r.Suspense = _, r.isAsyncMode = function(r) {
		return E(r) || T(r) === m;
	}, r.isConcurrentMode = E, r.isContextConsumer = function(r) {
		return T(r) === p;
	}, r.isContextProvider = function(r) {
		return T(r) === f;
	}, r.isElement = function(r) {
		return typeof r == "object" && !!r && r.$$typeof === s;
	}, r.isForwardRef = function(r) {
		return T(r) === g;
	}, r.isFragment = function(r) {
		return T(r) === l;
	}, r.isLazy = function(r) {
		return T(r) === b;
	}, r.isMemo = function(r) {
		return T(r) === y;
	}, r.isPortal = function(r) {
		return T(r) === c;
	}, r.isProfiler = function(r) {
		return T(r) === d;
	}, r.isStrictMode = function(r) {
		return T(r) === u;
	}, r.isSuspense = function(r) {
		return T(r) === _;
	}, r.isValidElementType = function(r) {
		return typeof r == "string" || typeof r == "function" || r === l || r === h || r === d || r === u || r === _ || r === v || typeof r == "object" && !!r && (r.$$typeof === b || r.$$typeof === y || r.$$typeof === f || r.$$typeof === p || r.$$typeof === g || r.$$typeof === S || r.$$typeof === C || r.$$typeof === w || r.$$typeof === x);
	}, r.typeOf = T;
})), require_react_is_development = /* @__PURE__ */ __commonJSMin(((r) => {
	process.env.NODE_ENV !== "production" && (function() {
		var o = typeof Symbol == "function" && Symbol.for, s = o ? Symbol.for("react.element") : 60103, c = o ? Symbol.for("react.portal") : 60106, l = o ? Symbol.for("react.fragment") : 60107, u = o ? Symbol.for("react.strict_mode") : 60108, d = o ? Symbol.for("react.profiler") : 60114, f = o ? Symbol.for("react.provider") : 60109, p = o ? Symbol.for("react.context") : 60110, m = o ? Symbol.for("react.async_mode") : 60111, h = o ? Symbol.for("react.concurrent_mode") : 60111, g = o ? Symbol.for("react.forward_ref") : 60112, _ = o ? Symbol.for("react.suspense") : 60113, v = o ? Symbol.for("react.suspense_list") : 60120, y = o ? Symbol.for("react.memo") : 60115, b = o ? Symbol.for("react.lazy") : 60116, x = o ? Symbol.for("react.block") : 60121, S = o ? Symbol.for("react.fundamental") : 60117, C = o ? Symbol.for("react.responder") : 60118, w = o ? Symbol.for("react.scope") : 60119;
		function T(r) {
			return typeof r == "string" || typeof r == "function" || r === l || r === h || r === d || r === u || r === _ || r === v || typeof r == "object" && !!r && (r.$$typeof === b || r.$$typeof === y || r.$$typeof === f || r.$$typeof === p || r.$$typeof === g || r.$$typeof === S || r.$$typeof === C || r.$$typeof === w || r.$$typeof === x);
		}
		function E(r) {
			if (typeof r == "object" && r) {
				var o = r.$$typeof;
				switch (o) {
					case s:
						var v = r.type;
						switch (v) {
							case m:
							case h:
							case l:
							case d:
							case u:
							case _: return v;
							default:
								var x = v && v.$$typeof;
								switch (x) {
									case p:
									case g:
									case b:
									case y:
									case f: return x;
									default: return o;
								}
						}
					case c: return o;
				}
			}
		}
		var D = m, O = h, k = p, A = f, j = s, M = g, N = l, P = b, F = y, I = c, L = d, R = u, z = _, B = !1;
		function V(r) {
			return B || (B = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), H(r) || E(r) === m;
		}
		function H(r) {
			return E(r) === h;
		}
		function U(r) {
			return E(r) === p;
		}
		function W(r) {
			return E(r) === f;
		}
		function G(r) {
			return typeof r == "object" && !!r && r.$$typeof === s;
		}
		function K(r) {
			return E(r) === g;
		}
		function q(r) {
			return E(r) === l;
		}
		function J(r) {
			return E(r) === b;
		}
		function Y(r) {
			return E(r) === y;
		}
		function X(r) {
			return E(r) === c;
		}
		function Z(r) {
			return E(r) === d;
		}
		function Q(r) {
			return E(r) === u;
		}
		function $(r) {
			return E(r) === _;
		}
		r.AsyncMode = D, r.ConcurrentMode = O, r.ContextConsumer = k, r.ContextProvider = A, r.Element = j, r.ForwardRef = M, r.Fragment = N, r.Lazy = P, r.Memo = F, r.Portal = I, r.Profiler = L, r.StrictMode = R, r.Suspense = z, r.isAsyncMode = V, r.isConcurrentMode = H, r.isContextConsumer = U, r.isContextProvider = W, r.isElement = G, r.isForwardRef = K, r.isFragment = q, r.isLazy = J, r.isMemo = Y, r.isPortal = X, r.isProfiler = Z, r.isStrictMode = Q, r.isSuspense = $, r.isValidElementType = T, r.typeOf = E;
	})();
})), require_react_is = /* @__PURE__ */ __commonJSMin(((r, o) => {
	process.env.NODE_ENV === "production" ? o.exports = require_react_is_production_min() : o.exports = require_react_is_development();
})), require_object_assign = /* @__PURE__ */ __commonJSMin(((r, o) => {
	var s = Object.getOwnPropertySymbols, c = Object.prototype.hasOwnProperty, l = Object.prototype.propertyIsEnumerable;
	function u(r) {
		if (r == null) throw TypeError("Object.assign cannot be called with null or undefined");
		return Object(r);
	}
	function d() {
		try {
			if (!Object.assign) return !1;
			var r = /* @__PURE__ */ new String("abc");
			if (r[5] = "de", Object.getOwnPropertyNames(r)[0] === "5") return !1;
			for (var o = {}, s = 0; s < 10; s++) o["_" + String.fromCharCode(s)] = s;
			if (Object.getOwnPropertyNames(o).map(function(r) {
				return o[r];
			}).join("") !== "0123456789") return !1;
			var c = {};
			return "abcdefghijklmnopqrst".split("").forEach(function(r) {
				c[r] = r;
			}), Object.keys(Object.assign({}, c)).join("") === "abcdefghijklmnopqrst";
		} catch {
			return !1;
		}
	}
	o.exports = d() ? Object.assign : function(r, o) {
		for (var d, f = u(r), p, m = 1; m < arguments.length; m++) {
			for (var h in d = Object(arguments[m]), d) c.call(d, h) && (f[h] = d[h]);
			if (s) {
				p = s(d);
				for (var g = 0; g < p.length; g++) l.call(d, p[g]) && (f[p[g]] = d[p[g]]);
			}
		}
		return f;
	};
})), require_ReactPropTypesSecret = /* @__PURE__ */ __commonJSMin(((r, o) => {
	o.exports = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
})), require_has = /* @__PURE__ */ __commonJSMin(((r, o) => {
	o.exports = Function.call.bind(Object.prototype.hasOwnProperty);
})), require_checkPropTypes = /* @__PURE__ */ __commonJSMin(((r, o) => {
	var s = function() {};
	if (process.env.NODE_ENV !== "production") {
		var c = require_ReactPropTypesSecret(), l = {}, u = require_has();
		s = function(r) {
			var o = "Warning: " + r;
			typeof console < "u" && console.error(o);
			try {
				throw Error(o);
			} catch {}
		};
	}
	function d(r, o, d, f, p) {
		if (process.env.NODE_ENV !== "production") {
			for (var m in r) if (u(r, m)) {
				var h;
				try {
					if (typeof r[m] != "function") {
						var g = Error((f || "React class") + ": " + d + " type `" + m + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof r[m] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
						throw g.name = "Invariant Violation", g;
					}
					h = r[m](o, m, f, d, null, c);
				} catch (r) {
					h = r;
				}
				if (h && !(h instanceof Error) && s((f || "React class") + ": type specification of " + d + " `" + m + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof h + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."), h instanceof Error && !(h.message in l)) {
					l[h.message] = !0;
					var _ = p ? p() : "";
					s("Failed " + d + " type: " + h.message + (_ ?? ""));
				}
			}
		}
	}
	d.resetWarningCache = function() {
		process.env.NODE_ENV !== "production" && (l = {});
	}, o.exports = d;
})), require_factoryWithTypeCheckers = /* @__PURE__ */ __commonJSMin(((r, o) => {
	var s = require_react_is(), c = require_object_assign(), l = require_ReactPropTypesSecret(), u = require_has(), d = require_checkPropTypes(), f = function() {};
	process.env.NODE_ENV !== "production" && (f = function(r) {
		var o = "Warning: " + r;
		typeof console < "u" && console.error(o);
		try {
			throw Error(o);
		} catch {}
	});
	function p() {
		return null;
	}
	o.exports = function(r, o) {
		var m = typeof Symbol == "function" && Symbol.iterator, h = "@@iterator";
		function g(r) {
			var o = r && (m && r[m] || r[h]);
			if (typeof o == "function") return o;
		}
		var _ = "<<anonymous>>", v = {
			array: S("array"),
			bigint: S("bigint"),
			bool: S("boolean"),
			func: S("function"),
			number: S("number"),
			object: S("object"),
			string: S("string"),
			symbol: S("symbol"),
			any: C(),
			arrayOf: w,
			element: T(),
			elementType: E(),
			instanceOf: D,
			node: j(),
			objectOf: k,
			oneOf: O,
			oneOfType: A,
			shape: N,
			exact: P
		};
		function y(r, o) {
			return r === o ? r !== 0 || 1 / r == 1 / o : r !== r && o !== o;
		}
		function b(r, o) {
			this.message = r, this.data = o && typeof o == "object" ? o : {}, this.stack = "";
		}
		b.prototype = Error.prototype;
		function x(r) {
			if (process.env.NODE_ENV !== "production") var s = {}, c = 0;
			function u(u, d, p, m, h, g, v) {
				if (m ||= _, g ||= p, v !== l) {
					if (o) {
						var y = /* @__PURE__ */ Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");
						throw y.name = "Invariant Violation", y;
					} else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
						var x = m + ":" + p;
						!s[x] && c < 3 && (f("You are manually calling a React.PropTypes validation function for the `" + g + "` prop on `" + m + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."), s[x] = !0, c++);
					}
				}
				return d[p] == null ? u ? d[p] === null ? new b("The " + h + " `" + g + "` is marked as required " + ("in `" + m + "`, but its value is `null`.")) : new b("The " + h + " `" + g + "` is marked as required in " + ("`" + m + "`, but its value is `undefined`.")) : null : r(d, p, m, h, g);
			}
			var d = u.bind(null, !1);
			return d.isRequired = u.bind(null, !0), d;
		}
		function S(r) {
			function o(o, s, c, l, u, d) {
				var f = o[s];
				if (L(f) !== r) {
					var p = R(f);
					return new b("Invalid " + l + " `" + u + "` of type " + ("`" + p + "` supplied to `" + c + "`, expected ") + ("`" + r + "`."), { expectedType: r });
				}
				return null;
			}
			return x(o);
		}
		function C() {
			return x(p);
		}
		function w(r) {
			function o(o, s, c, u, d) {
				if (typeof r != "function") return new b("Property `" + d + "` of component `" + c + "` has invalid PropType notation inside arrayOf.");
				var f = o[s];
				if (!Array.isArray(f)) {
					var p = L(f);
					return new b("Invalid " + u + " `" + d + "` of type " + ("`" + p + "` supplied to `" + c + "`, expected an array."));
				}
				for (var m = 0; m < f.length; m++) {
					var h = r(f, m, c, u, d + "[" + m + "]", l);
					if (h instanceof Error) return h;
				}
				return null;
			}
			return x(o);
		}
		function T() {
			function o(o, s, c, l, u) {
				var d = o[s];
				if (!r(d)) {
					var f = L(d);
					return new b("Invalid " + l + " `" + u + "` of type " + ("`" + f + "` supplied to `" + c + "`, expected a single ReactElement."));
				}
				return null;
			}
			return x(o);
		}
		function E() {
			function r(r, o, c, l, u) {
				var d = r[o];
				if (!s.isValidElementType(d)) {
					var f = L(d);
					return new b("Invalid " + l + " `" + u + "` of type " + ("`" + f + "` supplied to `" + c + "`, expected a single ReactElement type."));
				}
				return null;
			}
			return x(r);
		}
		function D(r) {
			function o(o, s, c, l, u) {
				if (!(o[s] instanceof r)) {
					var d = r.name || _, f = B(o[s]);
					return new b("Invalid " + l + " `" + u + "` of type " + ("`" + f + "` supplied to `" + c + "`, expected ") + ("instance of `" + d + "`."));
				}
				return null;
			}
			return x(o);
		}
		function O(r) {
			if (!Array.isArray(r)) return process.env.NODE_ENV !== "production" && (arguments.length > 1 ? f("Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).") : f("Invalid argument supplied to oneOf, expected an array.")), p;
			function o(o, s, c, l, u) {
				for (var d = o[s], f = 0; f < r.length; f++) if (y(d, r[f])) return null;
				var p = JSON.stringify(r, function(r, o) {
					return R(o) === "symbol" ? String(o) : o;
				});
				return new b("Invalid " + l + " `" + u + "` of value `" + String(d) + "` " + ("supplied to `" + c + "`, expected one of " + p + "."));
			}
			return x(o);
		}
		function k(r) {
			function o(o, s, c, d, f) {
				if (typeof r != "function") return new b("Property `" + f + "` of component `" + c + "` has invalid PropType notation inside objectOf.");
				var p = o[s], m = L(p);
				if (m !== "object") return new b("Invalid " + d + " `" + f + "` of type " + ("`" + m + "` supplied to `" + c + "`, expected an object."));
				for (var h in p) if (u(p, h)) {
					var g = r(p, h, c, d, f + "." + h, l);
					if (g instanceof Error) return g;
				}
				return null;
			}
			return x(o);
		}
		function A(r) {
			if (!Array.isArray(r)) return process.env.NODE_ENV !== "production" && f("Invalid argument supplied to oneOfType, expected an instance of array."), p;
			for (var o = 0; o < r.length; o++) {
				var s = r[o];
				if (typeof s != "function") return f("Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + z(s) + " at index " + o + "."), p;
			}
			function c(o, s, c, d, f) {
				for (var p = [], m = 0; m < r.length; m++) {
					var h = r[m], g = h(o, s, c, d, f, l);
					if (g == null) return null;
					g.data && u(g.data, "expectedType") && p.push(g.data.expectedType);
				}
				var _ = p.length > 0 ? ", expected one of type [" + p.join(", ") + "]" : "";
				return new b("Invalid " + d + " `" + f + "` supplied to " + ("`" + c + "`" + _ + "."));
			}
			return x(c);
		}
		function j() {
			function r(r, o, s, c, l) {
				return F(r[o]) ? null : new b("Invalid " + c + " `" + l + "` supplied to " + ("`" + s + "`, expected a ReactNode."));
			}
			return x(r);
		}
		function M(r, o, s, c, l) {
			return new b((r || "React class") + ": " + o + " type `" + s + "." + c + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + l + "`.");
		}
		function N(r) {
			function o(o, s, c, u, d) {
				var f = o[s], p = L(f);
				if (p !== "object") return new b("Invalid " + u + " `" + d + "` of type `" + p + "` " + ("supplied to `" + c + "`, expected `object`."));
				for (var m in r) {
					var h = r[m];
					if (typeof h != "function") return M(c, u, d, m, R(h));
					var g = h(f, m, c, u, d + "." + m, l);
					if (g) return g;
				}
				return null;
			}
			return x(o);
		}
		function P(r) {
			function o(o, s, d, f, p) {
				var m = o[s], h = L(m);
				if (h !== "object") return new b("Invalid " + f + " `" + p + "` of type `" + h + "` " + ("supplied to `" + d + "`, expected `object`."));
				for (var g in c({}, o[s], r)) {
					var _ = r[g];
					if (u(r, g) && typeof _ != "function") return M(d, f, p, g, R(_));
					if (!_) return new b("Invalid " + f + " `" + p + "` key `" + g + "` supplied to `" + d + "`.\nBad object: " + JSON.stringify(o[s], null, "  ") + "\nValid keys: " + JSON.stringify(Object.keys(r), null, "  "));
					var v = _(m, g, d, f, p + "." + g, l);
					if (v) return v;
				}
				return null;
			}
			return x(o);
		}
		function F(o) {
			switch (typeof o) {
				case "number":
				case "string":
				case "undefined": return !0;
				case "boolean": return !o;
				case "object":
					if (Array.isArray(o)) return o.every(F);
					if (o === null || r(o)) return !0;
					var s = g(o);
					if (s) {
						var c = s.call(o), l;
						if (s !== o.entries) {
							for (; !(l = c.next()).done;) if (!F(l.value)) return !1;
						} else for (; !(l = c.next()).done;) {
							var u = l.value;
							if (u && !F(u[1])) return !1;
						}
					} else return !1;
					return !0;
				default: return !1;
			}
		}
		function I(r, o) {
			return r === "symbol" ? !0 : o ? o["@@toStringTag"] === "Symbol" || typeof Symbol == "function" && o instanceof Symbol : !1;
		}
		function L(r) {
			var o = typeof r;
			return Array.isArray(r) ? "array" : r instanceof RegExp ? "object" : I(o, r) ? "symbol" : o;
		}
		function R(r) {
			if (r == null) return "" + r;
			var o = L(r);
			if (o === "object") {
				if (r instanceof Date) return "date";
				if (r instanceof RegExp) return "regexp";
			}
			return o;
		}
		function z(r) {
			var o = R(r);
			switch (o) {
				case "array":
				case "object": return "an " + o;
				case "boolean":
				case "date":
				case "regexp": return "a " + o;
				default: return o;
			}
		}
		function B(r) {
			return !r.constructor || !r.constructor.name ? _ : r.constructor.name;
		}
		return v.checkPropTypes = d, v.resetWarningCache = d.resetWarningCache, v.PropTypes = v, v;
	};
})), require_factoryWithThrowingShims = /* @__PURE__ */ __commonJSMin(((r, o) => {
	var s = require_ReactPropTypesSecret();
	function c() {}
	function l() {}
	l.resetWarningCache = c, o.exports = function() {
		function r(r, o, c, l, u, d) {
			if (d !== s) {
				var f = /* @__PURE__ */ Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");
				throw f.name = "Invariant Violation", f;
			}
		}
		r.isRequired = r;
		function o() {
			return r;
		}
		var u = {
			array: r,
			bigint: r,
			bool: r,
			func: r,
			number: r,
			object: r,
			string: r,
			symbol: r,
			any: r,
			arrayOf: o,
			element: r,
			elementType: r,
			instanceOf: o,
			node: r,
			objectOf: o,
			oneOf: o,
			oneOfType: o,
			shape: o,
			exact: o,
			checkPropTypes: l,
			resetWarningCache: c
		};
		return u.PropTypes = u, u;
	};
})), require_prop_types = /* @__PURE__ */ __commonJSMin(((r, o) => {
	if (process.env.NODE_ENV !== "production") {
		var s = require_react_is();
		o.exports = require_factoryWithTypeCheckers()(s.isElement, !0);
	} else o.exports = require_factoryWithThrowingShims()();
})), import_prop_types$4 = /* @__PURE__ */ __toESM(require_prop_types(), 1), ReflexSplitter = class o extends React.Component {
	ref = React.createRef();
	static propTypes = {
		children: import_prop_types$4.default.oneOfType([import_prop_types$4.default.arrayOf(import_prop_types$4.default.node), import_prop_types$4.default.node]),
		onStartResize: import_prop_types$4.default.func,
		onStopResize: import_prop_types$4.default.func,
		className: import_prop_types$4.default.string,
		propagate: import_prop_types$4.default.bool,
		onResize: import_prop_types$4.default.func,
		style: import_prop_types$4.default.object
	};
	static defaultProps = {
		document: typeof document < "u" ? document : null,
		onStartResize: null,
		onStopResize: null,
		propagate: !1,
		onResize: null,
		className: "",
		style: {}
	};
	static isA(r) {
		return r ? process.env.NODE_ENV === "development" ? r.type === (/* @__PURE__ */ jsx(o, {})).type : r.type === o : !1;
	}
	constructor(r) {
		super(r), this.state = { active: !1 }, this.document = r.document;
	}
	componentDidMount() {
		this.document && (this.document.addEventListener("touchend", this.onMouseUp), this.document.addEventListener("mouseup", this.onMouseUp), this.document.addEventListener("mousemove", this.onMouseMove, { passive: !1 }), this.document.addEventListener("touchmove", this.onMouseMove, { passive: !1 }));
	}
	componentWillUnmount() {
		this.document && (this.document.removeEventListener("mouseup", this.onMouseUp), this.document.removeEventListener("touchend", this.onMouseUp), this.document.removeEventListener("mousemove", this.onMouseMove), this.document.removeEventListener("touchmove", this.onMouseMove), this.state.active && this.props.events.emit("stopResize", {
			index: this.props.index,
			event: null
		}));
	}
	onMouseMove = (r) => {
		if (this.state.active) {
			let o = this.ref.current;
			this.props.events.emit("resize", {
				index: this.props.index,
				domElement: o,
				event: r
			}), this.props.onResize && this.props.onResize({
				component: this,
				domElement: o
			}), r.stopPropagation(), r.preventDefault();
		}
	};
	onMouseDown = (r) => {
		this.setState({ active: !0 }), !(this.props.onStartResize && this.props.onStartResize({
			domElement: this.ref.current,
			component: this
		})) && this.props.events.emit("startResize", {
			index: this.props.index,
			event: r
		});
	};
	onMouseUp = (r) => {
		this.state.active && (this.setState({ active: !1 }), this.props.onStopResize && this.props.onStopResize({
			domElement: this.ref.current,
			component: this
		}), this.props.events.emit("stopResize", {
			index: this.props.index,
			event: r
		}));
	};
	render() {
		let r = [
			Browser.isMobile() ? "reflex-thin" : "",
			...this.props.className.split(" "),
			this.state.active ? "active" : "",
			"reflex-splitter"
		].join(" ").trim();
		return /* @__PURE__ */ jsx("div", {
			...getDataProps(this.props),
			onTouchStart: this.onMouseDown,
			onMouseDown: this.onMouseDown,
			style: this.props.style,
			className: r,
			id: this.props.id,
			ref: this.ref,
			children: this.props.children
		});
	}
}, ReflexEvents_default = class {
	constructor() {
		this._events = {};
	}
	on(r, o) {
		return r.split(" ").forEach((r) => {
			this._events[r] = this._events[r] || [], this._events[r].push(o);
		}), this;
	}
	off(r, o) {
		if (r == null) {
			this._events = {};
			return;
		}
		return r.split(" ").forEach((r) => {
			r in this._events && (o ? this._events[r].splice(this._events[r].indexOf(o), 1) : this._events[r] = []);
		}), this;
	}
	emit(r) {
		if (this._events[r] !== void 0) for (var o = this._events[r].slice(), s = 0; s < o.length; ++s) {
			var c = o[s].apply(this, Array.prototype.slice.call(arguments, 1));
			if (c !== void 0) return c;
		}
	}
};
Array.prototype.includes || Object.defineProperty(Array.prototype, "includes", { value: function(r, o) {
	if (this == null) throw TypeError("\"this\" is null or not defined");
	var s = Object(this), c = s.length >>> 0;
	if (c === 0) return !1;
	var l = o | 0, u = Math.max(l >= 0 ? l : c - Math.abs(l), 0);
	function d(r, o) {
		return r === o || typeof r == "number" && typeof o == "number" && isNaN(r) && isNaN(o);
	}
	for (; u < c;) {
		if (d(s[u], r)) return !0;
		u++;
	}
	return !1;
} }), Math.sign || (Math.sign = function(r) {
	return (r > 0) - (r < 0) || +r;
});
var import_prop_types$3 = /* @__PURE__ */ __toESM(require_prop_types(), 1), ReflexContainer = class extends React.Component {
	static propTypes = {
		windowResizeAware: import_prop_types$3.default.bool,
		orientation: import_prop_types$3.default.oneOf(["horizontal", "vertical"]),
		maxRecDepth: import_prop_types$3.default.number,
		className: import_prop_types$3.default.string,
		style: import_prop_types$3.default.object
	};
	static defaultProps = {
		orientation: "horizontal",
		windowResizeAware: !1,
		maxRecDepth: 100,
		className: "",
		style: {}
	};
	constructor(o) {
		super(o), this.events = new ReflexEvents_default(), this.children = [], this.state = { flexData: [] }, this.ref = React.createRef();
	}
	componentDidMount() {
		let r = this.computeFlexData(), { windowResizeAware: o } = this.props;
		o && window.addEventListener("resize", this.onWindowResize), this.setState({
			windowResizeAware: o,
			flexData: r
		}), this.events.on("element.size", this.onElementSize), this.events.on("startResize", this.onStartResize), this.events.on("stopResize", this.onStopResize), this.events.on("resize", this.onResize);
	}
	componentWillUnmount() {
		this.events.off(), window.removeEventListener("resize", this.onWindowResize);
	}
	getValidChildren(r = this.props) {
		return this.toArray(r.children).filter((r) => !!r);
	}
	componentDidUpdate(r, o) {
		let s = this.getValidChildren(this.props);
		if (s.length !== this.state.flexData.length || r.orientation !== this.props.orientation || this.flexHasChanged(r)) {
			let r = this.computeFlexData(s, this.props);
			this.setState({ flexData: r });
		}
		this.props.windowResizeAware !== this.state.windowResizeAware && (this.props.windowResizeAware ? window.addEventListener("resize", this.onWindowResize) : window.removeEventListener("resize", this.onWindowResize), this.setState({ windowResizeAware: this.props.windowResizeAware }));
	}
	onWindowResize = () => {
		this.setState({ flexData: this.computeFlexData() });
	};
	flexHasChanged(r) {
		let o = this.getValidChildren(r).map((r) => r.props.flex || 0);
		return !this.getValidChildren().map((r) => r.props.flex || 0).every((r, s) => r === o[s]);
	}
	getSize(r) {
		let o = r?.ref?.current;
		switch (this.props.orientation) {
			case "horizontal": return o?.offsetHeight ?? 0;
			case "vertical":
			default: return o?.offsetWidth ?? 0;
		}
	}
	getOffset(r, o) {
		let { top: s, bottom: c, left: l, right: u } = o.getBoundingClientRect();
		switch (this.props.orientation) {
			case "horizontal": {
				let o = r.clientY - this.previousPos;
				if (o > 0) {
					if (r.clientY >= s) return o;
				} else if (r.clientY <= c) return o;
				break;
			}
			case "vertical":
			default:
				{
					let o = r.clientX - this.previousPos;
					if (o > 0) {
						if (r.clientX > l) return o;
					} else if (r.clientX < u) return o;
				}
				break;
		}
		return 0;
	}
	onStartResize = (r) => {
		let o = r.event.changedTouches ? r.event.changedTouches[0] : r.event;
		switch (this.props.orientation) {
			case "horizontal":
				document.body.classList.add("reflex-row-resize"), this.previousPos = o.clientY;
				break;
			case "vertical":
			default:
				document.body.classList.add("reflex-col-resize"), this.previousPos = o.clientX;
				break;
		}
		this.elements = [this.children[r.index - 1], this.children[r.index + 1]], this.emitElementsEvent(this.elements, "onStartResize");
	};
	onResize = (r) => {
		let o = r.event.changedTouches ? r.event.changedTouches[0] : r.event, s = this.getOffset(o, r.domElement);
		switch (this.props.orientation) {
			case "horizontal":
				this.previousPos = o.clientY;
				break;
			case "vertical":
			default:
				this.previousPos = o.clientX;
				break;
		}
		if (s) {
			let o = this.computeAvailableOffset(r.index, s);
			o && (this.elements = this.dispatchOffset(r.index, o), this.adjustFlex(this.elements), this.setState({ resizing: !0 }, () => {
				this.emitElementsEvent(this.elements, "onResize");
			}));
		}
	};
	onStopResize = (r) => {
		document.body.classList.remove("reflex-row-resize"), document.body.classList.remove("reflex-col-resize");
		let o = this.elements ? this.elements.map((r) => r.props.ref || r.ref) : [], s = this.children.filter((r) => !ReflexSplitter.isA(r) && o.includes(r.ref));
		this.emitElementsEvent(s, "onStopResize"), this.setState({ resizing: !1 });
	};
	onElementSize = (r) => new Promise((o) => {
		try {
			let s = r.index, c = this.getSize(this.children[s]), l = r.size - c, u = r.direction, d = s + u, f = this.computeAvailableOffset(d, u * l);
			this.elements = null, f && (this.elements = this.dispatchOffset(d, f), this.adjustFlex(this.elements)), this.setState(this.state, () => {
				this.emitElementsEvent(this.elements, "onResize"), o();
			});
		} catch (r) {
			console.log(r);
		}
	});
	adjustFlex(r) {
		let o = r.reduce((o, s) => {
			let c = s.props.index;
			return o + (s.props.flex - this.state.flexData[c].flex) / r.length;
		}, 0);
		r.forEach((r) => {
			this.state.flexData[r.props.index].flex += o;
		});
	}
	computeAvailableOffset(r, o) {
		let s = this.computeAvailableStretch(r, o), c = this.computeAvailableShrink(r, o);
		return Math.min(s, c) * Math.sign(o);
	}
	checkPropagate(r, o) {
		if (o > 0) {
			if (r < this.children.length - 2) {
				let o = this.children[r + 2];
				return ReflexSplitter.isA(o) && o.props.propagate;
			}
		} else if (r > 2) {
			let o = this.children[r - 2];
			return ReflexSplitter.isA(o) && o.props.propagate;
		}
		return !1;
	}
	computeAvailableStretch(r, o) {
		let s = o < 0 ? r + 1 : r - 1, c = this.children[s], l = this.getSize(c), u = (c?.props.maxSize ?? 0) - l;
		if (u < Math.abs(o) && this.checkPropagate(r, -1 * o)) {
			let s = Math.sign(o) * (Math.abs(o) - u);
			return u + this.computeAvailableStretch(o < 0 ? r + 2 : r - 2, s);
		}
		return Math.min(u, Math.abs(o));
	}
	computeAvailableShrink(r, o) {
		let s = o > 0 ? r + 1 : r - 1, c = this.children[s], l = this.getSize(c) - Math.max(c?.props.minSize ?? 0, 0);
		if (l < Math.abs(o) && this.checkPropagate(r, o)) {
			let s = Math.sign(o) * (Math.abs(o) - l);
			return l + this.computeAvailableShrink(o > 0 ? r + 2 : r - 2, s);
		}
		return Math.min(l, Math.abs(o));
	}
	computePixelFlex(r = this.props.orientation) {
		if (!this.ref.current) return console.warn("Unable to locate ReflexContainer dom node"), 0;
		switch (r) {
			case "horizontal": return this.ref.current.offsetHeight === 0 ? (console.warn("Found ReflexContainer with height=0, this will cause invalid behavior..."), console.warn(this.ref.current), 0) : 1 / this.ref.current.offsetHeight;
			case "vertical":
			default: return this.ref.current.offsetWidth === 0 ? (console.warn("Found ReflexContainer with width=0, this will cause invalid behavior..."), console.warn(this.ref.current), 0) : 1 / this.ref.current.offsetWidth;
		}
	}
	addOffset(r, o) {
		let s = this.getSize(r), c = r.props.index, l = Math.max(s + o, 0), u = this.state.flexData[c].flex, d = u > 0 ? u * l / s : this.computePixelFlex() * l;
		this.state.flexData[c].flex = !isFinite(d) || isNaN(d) ? 0 : d;
	}
	dispatchStretch(r, o) {
		let s = o < 0 ? r + 1 : r - 1;
		if (s < 0 || s > this.children.length - 1) return [];
		let c = this.children[s], l = this.getSize(c), u = Math.min(c.props.maxSize, l + Math.abs(o)) - l;
		if (this.addOffset(c, u), u < Math.abs(o)) {
			let s = r - Math.sign(o) * 2, l = Math.sign(o) * (Math.abs(o) - u);
			return [c, ...this.dispatchStretch(s, l)];
		}
		return [c];
	}
	dispatchShrink(r, o) {
		let s = o > 0 ? r + 1 : r - 1;
		if (s < 0 || s > this.children.length - 1) return [];
		let c = this.children[s], l = this.getSize(c), u = Math.max(c.props.minSize, l - Math.abs(o)) - l;
		if (this.addOffset(c, u), Math.abs(u) < Math.abs(o)) {
			let s = r + Math.sign(o) * 2, l = Math.sign(o) * (Math.abs(o) + u);
			return [c, ...this.dispatchShrink(s, l)];
		}
		return [c];
	}
	dispatchOffset(r, o) {
		return [...this.dispatchStretch(r, o), ...this.dispatchShrink(r, o)];
	}
	emitElementsEvent(r, o) {
		this.toArray(r).forEach((r) => {
			r.props[o] && r.props[o]({
				domElement: r.ref.current,
				component: r
			});
		});
	}
	computeFlexData(o = this.getValidChildren(), s = this.props) {
		let c = this.computePixelFlex(s.orientation), l = (r) => r.reduce((r, o) => !ReflexSplitter.isA(o) && o.constrained ? r - o.flex : r, 1), u = (r) => r.reduce((r, o) => !ReflexSplitter.isA(o) && !o.constrained ? r + 1 : r, 0), d = o.map((r) => {
			let o = r.props;
			return {
				maxFlex: (o.maxSize || Number.MAX_VALUE) * c,
				sizeFlex: (o.size || Number.MAX_VALUE) * c,
				minFlex: (o.minSize || 1) * c,
				constrained: o.flex !== void 0,
				flex: o.flex || 0,
				type: r.type
			};
		}), f = (r, o = 0) => {
			let s = !1, c = u(r), d = l(r), p = r.map((r) => {
				if (ReflexSplitter.isA(r)) return r;
				let o = r.constrained ? r.flex : d / c, l = Math.min(r.sizeFlex, Math.min(r.maxFlex, Math.max(r.minFlex, o))), u = r.constrained || l !== o;
				return s ||= u, {
					...r,
					flex: l,
					constrained: u
				};
			});
			return s && o < this.props.maxRecDepth ? f(p, o + 1) : p;
		};
		return f(d).map((o) => ({
			flex: ReflexSplitter.isA(o) ? 0 : o.flex,
			ref: React.createRef()
		}));
	}
	toArray(r) {
		return r ? Array.isArray(r) ? r : [r] : [];
	}
	render() {
		let o = [
			this.state.resizing ? "reflex-resizing" : "",
			...this.props.className.split(" "),
			this.props.orientation,
			"reflex-container"
		].join(" ").trim();
		return this.children = React.Children.map(this.getValidChildren(), (o, s) => {
			if (s > this.state.flexData.length - 1) return /* @__PURE__ */ jsx("div", {});
			let l = this.state.flexData[s], u = {
				...o.props,
				maxSize: o.props.maxSize || Number.MAX_VALUE,
				orientation: this.props.orientation,
				minSize: o.props.minSize || 1,
				events: this.events,
				flex: l.flex,
				ref: l.ref,
				index: s
			};
			return React.cloneElement(o, u);
		}), /* @__PURE__ */ jsx("div", {
			...getDataProps(this.props),
			style: this.props.style,
			className: o,
			ref: this.ref,
			children: this.children
		});
	}
}, import_prop_types$2 = /* @__PURE__ */ __toESM(require_prop_types(), 1), ReflexHandle = class o extends React.Component {
	ref = React.createRef();
	static propTypes = {
		children: import_prop_types$2.default.oneOfType([import_prop_types$2.default.arrayOf(import_prop_types$2.default.node), import_prop_types$2.default.node]),
		onStartResize: import_prop_types$2.default.func,
		onStopResize: import_prop_types$2.default.func,
		className: import_prop_types$2.default.string,
		propagate: import_prop_types$2.default.bool,
		onResize: import_prop_types$2.default.func,
		style: import_prop_types$2.default.object
	};
	static defaultProps = {
		document: typeof document > "u" ? null : document,
		onStartResize: null,
		onStopResize: null,
		propagate: !1,
		onResize: null,
		className: "",
		style: {}
	};
	static isA(r) {
		return r ? process.env.NODE_ENV === "development" ? r.type === (/* @__PURE__ */ jsx(o, {})).type : r.type === o : !1;
	}
	constructor(r) {
		super(r), this.state = { active: !1 }, this.document = r.document;
	}
	componentDidMount() {
		this.document && (this.document.addEventListener("touchend", this.onMouseUp), this.document.addEventListener("mouseup", this.onMouseUp), this.document.addEventListener("mousemove", this.onMouseMove, { passive: !1 }), this.document.addEventListener("touchmove", this.onMouseMove, { passive: !1 }));
	}
	componentWillUnmount() {
		this.document && (this.document.removeEventListener("mouseup", this.onMouseUp), this.document.removeEventListener("touchend", this.onMouseUp), this.document.removeEventListener("mousemove", this.onMouseMove), this.document.removeEventListener("touchmove", this.onMouseMove), this.state.active && this.props.events.emit("stopResize", {
			index: this.props.index,
			event: null
		}));
	}
	onMouseMove = (r) => {
		if (this.state.active) {
			let o = this.ref.current;
			this.props.events.emit("resize", {
				index: this.props.index,
				domElement: o,
				event: r
			}), this.props.onResize && this.props.onResize({
				component: this,
				domElement: o
			}), r.stopPropagation(), r.preventDefault();
		}
	};
	onMouseDown = (r) => {
		this.setState({ active: !0 }), !(this.props.onStartResize && this.props.onStartResize({
			domElement: this.ref.current,
			component: this
		})) && this.props.events.emit("startResize", {
			index: this.props.index,
			event: r
		});
	};
	onMouseUp = (r) => {
		this.state.active && (this.setState({ active: !1 }), this.props.onStopResize && this.props.onStopResize({
			domElement: this.ref.current,
			component: this
		}), this.props.events.emit("stopResize", {
			index: this.props.index,
			event: r
		}));
	};
	render() {
		let r = [
			...this.props.className.split(" "),
			this.state.active ? "active" : "",
			"reflex-handle"
		].join(" ").trim();
		return /* @__PURE__ */ jsx("div", {
			...getDataProps(this.props),
			onTouchStart: this.onMouseDown,
			onMouseDown: this.onMouseDown,
			style: this.props.style,
			className: r,
			id: this.props.id,
			ref: this.ref,
			children: this.props.children
		});
	}
}, import_lodash = /* @__PURE__ */ __toESM((/* @__PURE__ */ __commonJSMin(((r, o) => {
	var s = "Expected a function", c = NaN, l = "[object Symbol]", u = /^\s+|\s+$/g, d = /^[-+]0x[0-9a-f]+$/i, f = /^0b[01]+$/i, p = /^0o[0-7]+$/i, m = parseInt, h = typeof global == "object" && global && global.Object === Object && global, g = typeof self == "object" && self && self.Object === Object && self, _ = h || g || Function("return this")(), v = Object.prototype.toString, y = Math.max, b = Math.min, x = function() {
		return _.Date.now();
	};
	function S(r, o, c) {
		var l, u, d, f, p, m, h = 0, g = !1, _ = !1, v = !0;
		if (typeof r != "function") throw TypeError(s);
		o = D(o) || 0, w(c) && (g = !!c.leading, _ = "maxWait" in c, d = _ ? y(D(c.maxWait) || 0, o) : d, v = "trailing" in c ? !!c.trailing : v);
		function S(o) {
			var s = l, c = u;
			return l = u = void 0, h = o, f = r.apply(c, s), f;
		}
		function C(r) {
			return h = r, p = setTimeout(O, o), g ? S(r) : f;
		}
		function T(r) {
			var s = r - m, c = r - h, l = o - s;
			return _ ? b(l, d - c) : l;
		}
		function E(r) {
			var s = r - m, c = r - h;
			return m === void 0 || s >= o || s < 0 || _ && c >= d;
		}
		function O() {
			var r = x();
			if (E(r)) return k(r);
			p = setTimeout(O, T(r));
		}
		function k(r) {
			return p = void 0, v && l ? S(r) : (l = u = void 0, f);
		}
		function A() {
			p !== void 0 && clearTimeout(p), h = 0, l = m = u = p = void 0;
		}
		function j() {
			return p === void 0 ? f : k(x());
		}
		function M() {
			var r = x(), s = E(r);
			if (l = arguments, u = this, m = r, s) {
				if (p === void 0) return C(m);
				if (_) return p = setTimeout(O, o), S(m);
			}
			return p === void 0 && (p = setTimeout(O, o)), f;
		}
		return M.cancel = A, M.flush = j, M;
	}
	function C(r, o, c) {
		var l = !0, u = !0;
		if (typeof r != "function") throw TypeError(s);
		return w(c) && (l = "leading" in c ? !!c.leading : l, u = "trailing" in c ? !!c.trailing : u), S(r, o, {
			leading: l,
			maxWait: o,
			trailing: u
		});
	}
	function w(r) {
		var o = typeof r;
		return !!r && (o == "object" || o == "function");
	}
	function T(r) {
		return !!r && typeof r == "object";
	}
	function E(r) {
		return typeof r == "symbol" || T(r) && v.call(r) == l;
	}
	function D(r) {
		if (typeof r == "number") return r;
		if (E(r)) return c;
		if (w(r)) {
			var o = typeof r.valueOf == "function" ? r.valueOf() : r;
			r = w(o) ? o + "" : o;
		}
		if (typeof r != "string") return r === 0 ? r : +r;
		r = r.replace(u, "");
		var s = f.test(r);
		return s || p.test(r) ? m(r.slice(2), s ? 2 : 8) : d.test(r) ? c : +r;
	}
	o.exports = C;
})))(), 1);
function _extends() {
	return _extends = Object.assign ? Object.assign.bind() : function(r) {
		for (var o = 1; o < arguments.length; o++) {
			var s = arguments[o];
			for (var c in s) ({}).hasOwnProperty.call(s, c) && (r[c] = s[c]);
		}
		return r;
	}, _extends.apply(null, arguments);
}
function _objectWithoutPropertiesLoose(r, o) {
	if (r == null) return {};
	var s = {};
	for (var c in r) if ({}.hasOwnProperty.call(r, c)) {
		if (o.indexOf(c) !== -1) continue;
		s[c] = r[c];
	}
	return s;
}
function _setPrototypeOf(r, o) {
	return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, o) {
		return r.__proto__ = o, r;
	}, _setPrototypeOf(r, o);
}
function _inheritsLoose(r, o) {
	r.prototype = Object.create(o.prototype), r.prototype.constructor = r, _setPrototypeOf(r, o);
}
var MapShim = (function() {
	if (typeof Map < "u") return Map;
	function r(r, o) {
		var s = -1;
		return r.some(function(r, c) {
			return r[0] === o ? (s = c, !0) : !1;
		}), s;
	}
	return function() {
		function o() {
			this.__entries__ = [];
		}
		return Object.defineProperty(o.prototype, "size", {
			get: function() {
				return this.__entries__.length;
			},
			enumerable: !0,
			configurable: !0
		}), o.prototype.get = function(o) {
			var s = r(this.__entries__, o), c = this.__entries__[s];
			return c && c[1];
		}, o.prototype.set = function(o, s) {
			var c = r(this.__entries__, o);
			~c ? this.__entries__[c][1] = s : this.__entries__.push([o, s]);
		}, o.prototype.delete = function(o) {
			var s = this.__entries__, c = r(s, o);
			~c && s.splice(c, 1);
		}, o.prototype.has = function(o) {
			return !!~r(this.__entries__, o);
		}, o.prototype.clear = function() {
			this.__entries__.splice(0);
		}, o.prototype.forEach = function(r, o) {
			o === void 0 && (o = null);
			for (var s = 0, c = this.__entries__; s < c.length; s++) {
				var l = c[s];
				r.call(o, l[1], l[0]);
			}
		}, o;
	}();
})(), isBrowser = typeof window < "u" && typeof document < "u" && window.document === document, global$1 = (function() {
	return typeof global < "u" && global.Math === Math ? global : typeof self < "u" && self.Math === Math ? self : typeof window < "u" && window.Math === Math ? window : Function("return this")();
})(), requestAnimationFrame$1 = (function() {
	return typeof requestAnimationFrame == "function" ? requestAnimationFrame.bind(global$1) : function(r) {
		return setTimeout(function() {
			return r(Date.now());
		}, 1e3 / 60);
	};
})(), trailingTimeout = 2;
function throttle$1(r, o) {
	var s = !1, c = !1, l = 0;
	function u() {
		s && (s = !1, r()), c && f();
	}
	function d() {
		requestAnimationFrame$1(u);
	}
	function f() {
		var r = Date.now();
		if (s) {
			if (r - l < trailingTimeout) return;
			c = !0;
		} else s = !0, c = !1, setTimeout(d, o);
		l = r;
	}
	return f;
}
var REFRESH_DELAY = 20, transitionKeys = [
	"top",
	"right",
	"bottom",
	"left",
	"width",
	"height",
	"size",
	"weight"
], mutationObserverSupported = typeof MutationObserver < "u", ResizeObserverController = function() {
	function r() {
		this.connected_ = !1, this.mutationEventsAdded_ = !1, this.mutationsObserver_ = null, this.observers_ = [], this.onTransitionEnd_ = this.onTransitionEnd_.bind(this), this.refresh = throttle$1(this.refresh.bind(this), REFRESH_DELAY);
	}
	return r.prototype.addObserver = function(r) {
		~this.observers_.indexOf(r) || this.observers_.push(r), this.connected_ || this.connect_();
	}, r.prototype.removeObserver = function(r) {
		var o = this.observers_, s = o.indexOf(r);
		~s && o.splice(s, 1), !o.length && this.connected_ && this.disconnect_();
	}, r.prototype.refresh = function() {
		this.updateObservers_() && this.refresh();
	}, r.prototype.updateObservers_ = function() {
		var r = this.observers_.filter(function(r) {
			return r.gatherActive(), r.hasActive();
		});
		return r.forEach(function(r) {
			return r.broadcastActive();
		}), r.length > 0;
	}, r.prototype.connect_ = function() {
		!isBrowser || this.connected_ || (document.addEventListener("transitionend", this.onTransitionEnd_), window.addEventListener("resize", this.refresh), mutationObserverSupported ? (this.mutationsObserver_ = new MutationObserver(this.refresh), this.mutationsObserver_.observe(document, {
			attributes: !0,
			childList: !0,
			characterData: !0,
			subtree: !0
		})) : (document.addEventListener("DOMSubtreeModified", this.refresh), this.mutationEventsAdded_ = !0), this.connected_ = !0);
	}, r.prototype.disconnect_ = function() {
		!isBrowser || !this.connected_ || (document.removeEventListener("transitionend", this.onTransitionEnd_), window.removeEventListener("resize", this.refresh), this.mutationsObserver_ && this.mutationsObserver_.disconnect(), this.mutationEventsAdded_ && document.removeEventListener("DOMSubtreeModified", this.refresh), this.mutationsObserver_ = null, this.mutationEventsAdded_ = !1, this.connected_ = !1);
	}, r.prototype.onTransitionEnd_ = function(r) {
		var o = r.propertyName, s = o === void 0 ? "" : o;
		transitionKeys.some(function(r) {
			return !!~s.indexOf(r);
		}) && this.refresh();
	}, r.getInstance = function() {
		return this.instance_ ||= new r(), this.instance_;
	}, r.instance_ = null, r;
}(), defineConfigurable = (function(r, o) {
	for (var s = 0, c = Object.keys(o); s < c.length; s++) {
		var l = c[s];
		Object.defineProperty(r, l, {
			value: o[l],
			enumerable: !1,
			writable: !1,
			configurable: !0
		});
	}
	return r;
}), getWindowOf$1 = (function(r) {
	return r && r.ownerDocument && r.ownerDocument.defaultView || global$1;
}), emptyRect = createRectInit(0, 0, 0, 0);
function toFloat(r) {
	return parseFloat(r) || 0;
}
function getBordersSize(r) {
	return [...arguments].slice(1).reduce(function(o, s) {
		var c = r["border-" + s + "-width"];
		return o + toFloat(c);
	}, 0);
}
function getPaddings(r) {
	for (var o = [
		"top",
		"right",
		"bottom",
		"left"
	], s = {}, c = 0, l = o; c < l.length; c++) {
		var u = l[c], d = r["padding-" + u];
		s[u] = toFloat(d);
	}
	return s;
}
function getSVGContentRect(r) {
	var o = r.getBBox();
	return createRectInit(0, 0, o.width, o.height);
}
function getHTMLElementContentRect(r) {
	var o = r.clientWidth, s = r.clientHeight;
	if (!o && !s) return emptyRect;
	var c = getWindowOf$1(r).getComputedStyle(r), l = getPaddings(c), u = l.left + l.right, d = l.top + l.bottom, f = toFloat(c.width), p = toFloat(c.height);
	if (c.boxSizing === "border-box" && (Math.round(f + u) !== o && (f -= getBordersSize(c, "left", "right") + u), Math.round(p + d) !== s && (p -= getBordersSize(c, "top", "bottom") + d)), !isDocumentElement(r)) {
		var m = Math.round(f + u) - o, h = Math.round(p + d) - s;
		Math.abs(m) !== 1 && (f -= m), Math.abs(h) !== 1 && (p -= h);
	}
	return createRectInit(l.left, l.top, f, p);
}
var isSVGGraphicsElement = (function() {
	return typeof SVGGraphicsElement < "u" ? function(r) {
		return r instanceof getWindowOf$1(r).SVGGraphicsElement;
	} : function(r) {
		return r instanceof getWindowOf$1(r).SVGElement && typeof r.getBBox == "function";
	};
})();
function isDocumentElement(r) {
	return r === getWindowOf$1(r).document.documentElement;
}
function getContentRect$1(r) {
	return isBrowser ? isSVGGraphicsElement(r) ? getSVGContentRect(r) : getHTMLElementContentRect(r) : emptyRect;
}
function createReadOnlyRect(r) {
	var o = r.x, s = r.y, c = r.width, l = r.height, u = typeof DOMRectReadOnly < "u" ? DOMRectReadOnly : Object, d = Object.create(u.prototype);
	return defineConfigurable(d, {
		x: o,
		y: s,
		width: c,
		height: l,
		top: s,
		right: o + c,
		bottom: l + s,
		left: o
	}), d;
}
function createRectInit(r, o, s, c) {
	return {
		x: r,
		y: o,
		width: s,
		height: c
	};
}
var ResizeObservation = function() {
	function r(r) {
		this.broadcastWidth = 0, this.broadcastHeight = 0, this.contentRect_ = createRectInit(0, 0, 0, 0), this.target = r;
	}
	return r.prototype.isActive = function() {
		var r = getContentRect$1(this.target);
		return this.contentRect_ = r, r.width !== this.broadcastWidth || r.height !== this.broadcastHeight;
	}, r.prototype.broadcastRect = function() {
		var r = this.contentRect_;
		return this.broadcastWidth = r.width, this.broadcastHeight = r.height, r;
	}, r;
}(), ResizeObserverEntry = function() {
	function r(r, o) {
		var s = createReadOnlyRect(o);
		defineConfigurable(this, {
			target: r,
			contentRect: s
		});
	}
	return r;
}(), ResizeObserverSPI = function() {
	function r(r, o, s) {
		if (this.activeObservations_ = [], this.observations_ = new MapShim(), typeof r != "function") throw TypeError("The callback provided as parameter 1 is not a function.");
		this.callback_ = r, this.controller_ = o, this.callbackCtx_ = s;
	}
	return r.prototype.observe = function(r) {
		if (!arguments.length) throw TypeError("1 argument required, but only 0 present.");
		if (!(typeof Element > "u" || !(Element instanceof Object))) {
			if (!(r instanceof getWindowOf$1(r).Element)) throw TypeError("parameter 1 is not of type \"Element\".");
			var o = this.observations_;
			o.has(r) || (o.set(r, new ResizeObservation(r)), this.controller_.addObserver(this), this.controller_.refresh());
		}
	}, r.prototype.unobserve = function(r) {
		if (!arguments.length) throw TypeError("1 argument required, but only 0 present.");
		if (!(typeof Element > "u" || !(Element instanceof Object))) {
			if (!(r instanceof getWindowOf$1(r).Element)) throw TypeError("parameter 1 is not of type \"Element\".");
			var o = this.observations_;
			o.has(r) && (o.delete(r), o.size || this.controller_.removeObserver(this));
		}
	}, r.prototype.disconnect = function() {
		this.clearActive(), this.observations_.clear(), this.controller_.removeObserver(this);
	}, r.prototype.gatherActive = function() {
		var r = this;
		this.clearActive(), this.observations_.forEach(function(o) {
			o.isActive() && r.activeObservations_.push(o);
		});
	}, r.prototype.broadcastActive = function() {
		if (this.hasActive()) {
			var r = this.callbackCtx_, o = this.activeObservations_.map(function(r) {
				return new ResizeObserverEntry(r.target, r.broadcastRect());
			});
			this.callback_.call(r, o, r), this.clearActive();
		}
	}, r.prototype.clearActive = function() {
		this.activeObservations_.splice(0);
	}, r.prototype.hasActive = function() {
		return this.activeObservations_.length > 0;
	}, r;
}(), observers = typeof WeakMap < "u" ? /* @__PURE__ */ new WeakMap() : new MapShim(), ResizeObserver = function() {
	function r(o) {
		if (!(this instanceof r)) throw TypeError("Cannot call a class as a function.");
		if (!arguments.length) throw TypeError("1 argument required, but only 0 present.");
		var s = new ResizeObserverSPI(o, ResizeObserverController.getInstance(), this);
		observers.set(this, s);
	}
	return r;
}();
[
	"observe",
	"unobserve",
	"disconnect"
].forEach(function(r) {
	ResizeObserver.prototype[r] = function() {
		var o;
		return (o = observers.get(this))[r].apply(o, arguments);
	};
});
var ResizeObserver_es_default = (function() {
	return global$1.ResizeObserver === void 0 ? ResizeObserver : global$1.ResizeObserver;
})(), import_prop_types$1 = /* @__PURE__ */ __toESM(require_prop_types()), types = [
	"client",
	"offset",
	"scroll",
	"bounds",
	"margin"
];
function getTypes(r) {
	var o = [];
	return types.forEach(function(s) {
		r[s] && o.push(s);
	}), o;
}
function getContentRect(r, o) {
	var s = {};
	if (o.indexOf("client") > -1 && (s.client = {
		top: r.clientTop,
		left: r.clientLeft,
		width: r.clientWidth,
		height: r.clientHeight
	}), o.indexOf("offset") > -1 && (s.offset = {
		top: r.offsetTop,
		left: r.offsetLeft,
		width: r.offsetWidth,
		height: r.offsetHeight
	}), o.indexOf("scroll") > -1 && (s.scroll = {
		top: r.scrollTop,
		left: r.scrollLeft,
		width: r.scrollWidth,
		height: r.scrollHeight
	}), o.indexOf("bounds") > -1) {
		var c = r.getBoundingClientRect();
		s.bounds = {
			top: c.top,
			right: c.right,
			bottom: c.bottom,
			left: c.left,
			width: c.width,
			height: c.height
		};
	}
	if (o.indexOf("margin") > -1) {
		var l = getComputedStyle(r);
		s.margin = {
			top: l ? parseInt(l.marginTop) : 0,
			right: l ? parseInt(l.marginRight) : 0,
			bottom: l ? parseInt(l.marginBottom) : 0,
			left: l ? parseInt(l.marginLeft) : 0
		};
	}
	return s;
}
function getWindowOf(r) {
	return r && r.ownerDocument && r.ownerDocument.defaultView || window;
}
function withContentRect(r) {
	return function(c) {
		var l, u;
		return u = l = /* @__PURE__ */ function(o) {
			_inheritsLoose(l, o);
			function l() {
				var s, c = [...arguments];
				return s = o.call.apply(o, [this].concat(c)) || this, s.state = { contentRect: {
					entry: {},
					client: {},
					offset: {},
					scroll: {},
					bounds: {},
					margin: {}
				} }, s._animationFrameID = null, s._resizeObserver = null, s._node = null, s._window = null, s.measure = function(o) {
					var c = getContentRect(s._node, r || getTypes(s.props));
					o && (c.entry = o[0].contentRect), s._animationFrameID = s._window.requestAnimationFrame(function() {
						s._resizeObserver !== null && (s.setState({ contentRect: c }), typeof s.props.onResize == "function" && s.props.onResize(c));
					});
				}, s._handleRef = function(r) {
					s._resizeObserver !== null && s._node !== null && s._resizeObserver.unobserve(s._node), s._node = r, s._window = getWindowOf(s._node);
					var o = s.props.innerRef;
					o && (typeof o == "function" ? o(s._node) : o.current = s._node), s._resizeObserver !== null && s._node !== null && s._resizeObserver.observe(s._node);
				}, s;
			}
			var u = l.prototype;
			return u.componentDidMount = function() {
				this._resizeObserver = this._window !== null && this._window.ResizeObserver ? new this._window.ResizeObserver(this.measure) : new ResizeObserver_es_default(this.measure), this._node !== null && (this._resizeObserver.observe(this._node), typeof this.props.onResize == "function" && this.props.onResize(getContentRect(this._node, r || getTypes(this.props))));
			}, u.componentWillUnmount = function() {
				this._window !== null && this._window.cancelAnimationFrame(this._animationFrameID), this._resizeObserver !== null && (this._resizeObserver.disconnect(), this._resizeObserver = null);
			}, u.render = function() {
				var r = this.props;
				return r.innerRef, r.onResize, createElement(c, _extends({}, _objectWithoutPropertiesLoose(r, ["innerRef", "onResize"]), {
					measureRef: this._handleRef,
					measure: this.measure,
					contentRect: this.state.contentRect
				}));
			}, l;
		}(Component), l.propTypes = {
			client: import_prop_types$1.default.bool,
			offset: import_prop_types$1.default.bool,
			scroll: import_prop_types$1.default.bool,
			bounds: import_prop_types$1.default.bool,
			margin: import_prop_types$1.default.bool,
			innerRef: import_prop_types$1.default.oneOfType([import_prop_types$1.default.object, import_prop_types$1.default.func]),
			onResize: import_prop_types$1.default.func
		}, u;
	};
}
var Measure = withContentRect()(function(r) {
	var o = r.measure, s = r.measureRef, c = r.contentRect, l = r.children;
	return l({
		measure: o,
		measureRef: s,
		contentRect: c
	});
});
Measure.displayName = "Measure", Measure.propTypes.children = import_prop_types$1.default.func;
var index_esm_default = Measure, import_prop_types = /* @__PURE__ */ __toESM(require_prop_types(), 1), toArray = (r) => r ? Array.isArray(r) ? r : [r] : [], SizeAwareReflexElement = class extends React.Component {
	constructor(r) {
		super(r), this.setDimensions = (0, import_lodash.default)((r) => {
			this.setState(r);
		}, this.props.propagateDimensionsRate / 1e3), this.state = {
			height: "100%",
			width: "100%"
		};
	}
	onResize = (r) => {
		let { resizeHeight: o, resizeWidth: s } = this.props, { height: c, width: l } = r.bounds;
		this.setDimensions({
			...o && { height: c },
			...s && { width: l }
		});
	};
	renderChildren() {
		let { propagateDimensions: o } = this.props, s = toArray(this.props.children).filter((r) => !!r);
		return React.Children.map(s, (s) => this.props.withHandle || ReflexHandle.isA(s) ? React.cloneElement(s, {
			dimensions: o && this.state,
			...s.props,
			index: this.props.index - 1,
			events: this.props.events
		}) : o ? React.cloneElement(s, {
			...s.props,
			dimensions: this.state
		}) : s);
	}
	render() {
		return /* @__PURE__ */ jsx(index_esm_default, {
			bounds: !0,
			onResize: this.onResize,
			children: ({ measureRef: r }) => /* @__PURE__ */ jsx("div", {
				ref: r,
				className: "reflex-size-aware",
				children: /* @__PURE__ */ jsx("div", {
					style: this.state,
					children: this.renderChildren()
				})
			})
		});
	}
}, ReflexElement = class extends React.Component {
	static propTypes = {
		propagateDimensions: import_prop_types.default.bool,
		resizeHeight: import_prop_types.default.bool,
		resizeWidth: import_prop_types.default.bool,
		className: import_prop_types.default.string,
		size: import_prop_types.default.number
	};
	static defaultProps = {
		propagateDimensionsRate: 100,
		propagateDimensions: !1,
		resizeHeight: !0,
		resizeWidth: !0,
		direction: [1],
		className: ""
	};
	constructor(r) {
		super(r), this.state = { size: r.size };
	}
	static getDerivedStateFromProps(r, o) {
		return r.size === o.size ? null : {
			...o,
			size: r.size
		};
	}
	async componentDidUpdate(r, o, s) {
		if (o.size !== this.state.size) {
			let r = toArray(this.props.direction);
			for (let o of r) await this.props.events.emit("element.size", {
				index: this.props.index,
				size: this.props.size,
				direction: o
			});
		}
	}
	renderChildren() {
		let o = toArray(this.props.children).filter((r) => !!r);
		return React.Children.map(o, (o) => this.props.withHandle || ReflexHandle.isA(o) ? React.cloneElement(o, {
			...o.props,
			index: this.props.index - 1,
			events: this.props.events
		}) : o);
	}
	render() {
		let r = [
			...this.props.className.split(" "),
			this.props.orientation,
			"reflex-element"
		].join(" ").trim(), o = {
			...this.props.style,
			flexGrow: this.props.flex,
			flexShrink: 1,
			flexBasis: "0%"
		};
		return /* @__PURE__ */ jsx("div", {
			...getDataProps(this.props),
			ref: this.props.innerRef,
			className: r,
			style: o,
			children: this.props.propagateDimensions ? /* @__PURE__ */ jsx(SizeAwareReflexElement, { ...this.props }) : this.renderChildren()
		});
	}
}, ReflexElement_default = React.forwardRef((r, o) => /* @__PURE__ */ jsx(ReflexElement, {
	innerRef: o,
	...r
}));
export { ReflexContainer, ReflexElement_default as ReflexElement, ReflexHandle, ReflexSplitter };
