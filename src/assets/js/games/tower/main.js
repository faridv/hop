!function (t) {
    var e = {};

    function n(i) {
        if (e[i]) return e[i].exports;
        var r = e[i] = {i: i, l: !1, exports: {}};
        return t[i].call(r.exports, r, r.exports, n), r.l = !0, r.exports
    }

    n.m = t, n.c = e, n.d = function (t, e, i) {
        n.o(t, e) || Object.defineProperty(t, e, {enumerable: !0, get: i})
    }, n.r = function (t) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(t, "__esModule", {value: !0})
    }, n.t = function (t, e) {
        if (1 & e && (t = n(t)), 8 & e) return t;
        if (4 & e && "object" == typeof t && t && t.__esModule) return t;
        var i = Object.create(null);
        if (n.r(i), Object.defineProperty(i, "default", {enumerable: !0, value: t}), 2 & e && "string" != typeof t) for (var r in t) n.d(i, r, function (e) {
            return t[e]
        }.bind(null, r));
        return i
    }, n.n = function (t) {
        var e = t && t.__esModule ? function () {
            return t.default
        } : function () {
            return t
        };
        return n.d(e, "a", e), e
    }, n.o = function (t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }, n.p = "", n(n.s = 1)
}([function (t, e, n) {
    var i, r;
    r = this, void 0 === (i = function () {
        return function (t) {
            var e, n = function () {
                var e, n, i, r, a, o = [], s = o.concat, u = o.filter, c = o.slice, l = document, h = {}, f = {}, d = {"column-count": 1, columns: 1, "font-weight": 1, "line-height": 1, opacity: 1, "z-index": 1, zoom: 1},
                    p = /^\s*<(\w+|!)[^>]*>/, g = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, v = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, m = /^(?:body|html)$/i, y = /([A-Z])/g,
                    b = ["val", "css", "html", "text", "data", "width", "height", "offset"], E = l.createElement("table"), x = l.createElement("tr"),
                    T = {tr: l.createElement("tbody"), tbody: E, thead: E, tfoot: E, td: x, th: x, "*": l.createElement("div")}, O = /complete|loaded|interactive/, w = /^[\w-]*$/, A = {}, _ = A.toString, k = {}, M = l.createElement("div"),
                    I = {
                        tabindex: "tabIndex",
                        readonly: "readOnly",
                        for: "htmlFor",
                        class: "className",
                        maxlength: "maxLength",
                        cellspacing: "cellSpacing",
                        cellpadding: "cellPadding",
                        rowspan: "rowSpan",
                        colspan: "colSpan",
                        usemap: "useMap",
                        frameborder: "frameBorder",
                        contenteditable: "contentEditable"
                    }, S = Array.isArray || function (t) {
                        return t instanceof Array
                    };

                function N(t) {
                    return null == t ? String(t) : A[_.call(t)] || "object"
                }

                function C(t) {
                    return "function" == N(t)
                }

                function L(t) {
                    return null != t && t == t.window
                }

                function V(t) {
                    return null != t && t.nodeType == document_NODE
                }

                function P(t) {
                    return "object" == N(t)
                }

                function R(t) {
                    return P(t) && !L(t) && Object.getPrototypeOf(t) == Object.prototype
                }

                function D(t) {
                    var e = !!t && "length" in t && t.length, i = n.type(t);
                    return "function" != i && !L(t) && ("array" == i || 0 === e || "number" == typeof e && e > 0 && e - 1 in t)
                }

                function F(t) {
                    return t.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase()
                }

                function j(t) {
                    return t in f ? f[t] : f[t] = new RegExp("(^|\\s)" + t + "(\\s|$)")
                }

                function H(t, e) {
                    return "number" != typeof e || d[F(t)] ? e : e + "px"
                }

                function U(t) {
                    return "children" in t ? c.call(t.children) : n.map(t.childNodes, (function (t) {
                        if (1 == t.nodeType) return t
                    }))
                }

                function G(t, e) {
                    var n, i = t ? t.length : 0;
                    for (n = 0; n < i; n++) this[n] = t[n];
                    this.length = i, this.selector = e || ""
                }

                function W(t, n, i) {
                    for (e in n) i && (R(n[e]) || S(n[e])) ? (R(n[e]) && !R(t[e]) && (t[e] = {}), S(n[e]) && !S(t[e]) && (t[e] = []), W(t[e], n[e], i)) : void 0 !== n[e] && (t[e] = n[e])
                }

                function B(t, e) {
                    return null == e ? n(t) : n(t).filter(e)
                }

                function K(t, e, n, i) {
                    return C(e) ? e.call(t, n, i) : e
                }

                function X(t, e, n) {
                    null == n ? t.removeAttribute(e) : t.setAttribute(e, n)
                }

                function $(t, e) {
                    var n = t.className || "", i = n && void 0 !== n.baseVal;
                    if (void 0 === e) return i ? n.baseVal : n;
                    i ? n.baseVal = e : t.className = e
                }

                function z(t) {
                    try {
                        return t ? "true" == t || "false" != t && ("null" == t ? null : +t + "" == t ? +t : /^[\[\{]/.test(t) ? n.parseJSON(t) : t) : t
                    } catch (e) {
                        return t
                    }
                }

                function Z(t, e) {
                    e(t);
                    for (var n = 0, i = t.childNodes.length; n < i; n++) Z(t.childNodes[n], e)
                }

                return k.matches = function (t, e) {
                    if (!e || !t || 1 !== t.nodeType) return !1;
                    var n = t.matches || t.webkitMatchesSelector || t.mozMatchesSelector || t.oMatchesSelector || t.matchesSelector;
                    if (n) return n.call(t, e);
                    var i, r = t.parentNode, a = !r;
                    return a && (r = M).appendChild(t), i = ~k.qsa(r, e).indexOf(t), a && M.removeChild(t), i
                }, r = function (t) {
                    return t.replace(/-+(.)?/g, (function (t, e) {
                        return e ? e.toUpperCase() : ""
                    }))
                }, a = function (t) {
                    return u.call(t, (function (e, n) {
                        return t.indexOf(e) == n
                    }))
                }, k.fragment = function (t, e, i) {
                    var r, a, o;
                    return g.test(t) && (r = n(l.createElement(RegExp.$1))), r || (t.replace && (t = t.replace(v, "<$1></$2>")), void 0 === e && (e = p.test(t) && RegExp.$1), e in T || (e = "*"), (o = T[e]).innerHTML = "" + t, r = n.each(c.call(o.childNodes), (function () {
                        o.removeChild(this)
                    }))), R(i) && (a = n(r), n.each(i, (function (t, e) {
                        b.indexOf(t) > -1 ? a[t](e) : a.attr(t, e)
                    }))), r
                }, k.Z = function (t, e) {
                    return new G(t, e)
                }, k.isZ = function (t) {
                    return t instanceof k.Z
                }, k.init = function (t, e) {
                    var i, r;
                    if (!t) return k.Z();
                    if ("string" == typeof t) if ("<" == (t = t.trim())[0] && p.test(t)) i = k.fragment(t, RegExp.$1, e), t = null; else {
                        if (void 0 !== e) return n(e).find(t);
                        i = k.qsa(l, t)
                    } else {
                        if (C(t)) return n(l).ready(t);
                        if (k.isZ(t)) return t;
                        if (S(t)) r = t, i = u.call(r, (function (t) {
                            return null != t
                        })); else if (P(t)) i = [t], t = null; else if (p.test(t)) i = k.fragment(t.trim(), RegExp.$1, e), t = null; else {
                            if (void 0 !== e) return n(e).find(t);
                            i = k.qsa(l, t)
                        }
                    }
                    return k.Z(i, t)
                }, (n = function (t, e) {
                    return k.init(t, e)
                }).extend = function (t) {
                    var e, n = c.call(arguments, 1);
                    return "boolean" == typeof t && (e = t, t = n.shift()), n.forEach((function (n) {
                        W(t, n, e)
                    })), t
                }, k.qsa = function (t, e) {
                    var n, i = "#" == e[0], r = !i && "." == e[0], a = i || r ? e.slice(1) : e, o = w.test(a);
                    return t.getElementById && o && i ? (n = t.getElementById(a)) ? [n] : [] : 1 !== t.nodeType && 9 !== t.nodeType && 11 !== t.nodeType ? [] : c.call(o && !i && t.getElementsByClassName ? r ? t.getElementsByClassName(a) : t.getElementsByTagName(e) : t.querySelectorAll(e))
                }, n.contains = l.documentElement.contains ? function (t, e) {
                    return t !== e && t.contains(e)
                } : function (t, e) {
                    for (; e && (e = e.parentNode);) if (e === t) return !0;
                    return !1
                }, n.type = N, n.isFunction = C, n.isWindow = L, n.isArray = S, n.isPlainObject = R, n.isEmptyObject = function (t) {
                    var e;
                    for (e in t) return !1;
                    return !0
                }, n.isNumeric = function (t) {
                    var e = Number(t), n = typeof t;
                    return null != t && "boolean" != n && ("string" != n || t.length) && !isNaN(e) && isFinite(e) || !1
                }, n.inArray = function (t, e, n) {
                    return o.indexOf.call(e, t, n)
                }, n.camelCase = r, n.trim = function (t) {
                    return null == t ? "" : String.prototype.trim.call(t)
                }, n.uuid = 0, n.support = {}, n.expr = {}, n.noop = function () {
                }, n.map = function (t, e) {
                    var i, r, a, o, s = [];
                    if (D(t)) for (r = 0; r < t.length; r++) null != (i = e(t[r], r)) && s.push(i); else for (a in t) null != (i = e(t[a], a)) && s.push(i);
                    return (o = s).length > 0 ? n.fn.concat.apply([], o) : o
                }, n.each = function (t, e) {
                    var n, i;
                    if (D(t)) {
                        for (n = 0; n < t.length; n++) if (!1 === e.call(t[n], n, t[n])) return t
                    } else for (i in t) if (!1 === e.call(t[i], i, t[i])) return t;
                    return t
                }, n.grep = function (t, e) {
                    return u.call(t, e)
                }, t.JSON && (n.parseJSON = JSON.parse), n.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), (function (t, e) {
                    A["[object " + e + "]"] = e.toLowerCase()
                })), n.fn = {
                    constructor: k.Z, length: 0, forEach: o.forEach, reduce: o.reduce, push: o.push, sort: o.sort, splice: o.splice, indexOf: o.indexOf, concat: function () {
                        var t, e, n = [];
                        for (t = 0; t < arguments.length; t++) e = arguments[t], n[t] = k.isZ(e) ? e.toArray() : e;
                        return s.apply(k.isZ(this) ? this.toArray() : this, n)
                    }, map: function (t) {
                        return n(n.map(this, (function (e, n) {
                            return t.call(e, n, e)
                        })))
                    }, slice: function () {
                        return n(c.apply(this, arguments))
                    }, ready: function (t) {
                        return O.test(l.readyState) && l.body ? t(n) : l.addEventListener("DOMContentLoaded", (function () {
                            t(n)
                        }), !1), this
                    }, get: function (t) {
                        return void 0 === t ? c.call(this) : this[t >= 0 ? t : t + this.length]
                    }, toArray: function () {
                        return this.get()
                    }, size: function () {
                        return this.length
                    }, remove: function () {
                        return this.each((function () {
                            null != this.parentNode && this.parentNode.removeChild(this)
                        }))
                    }, each: function (t) {
                        return o.every.call(this, (function (e, n) {
                            return !1 !== t.call(e, n, e)
                        })), this
                    }, filter: function (t) {
                        return C(t) ? this.not(this.not(t)) : n(u.call(this, (function (e) {
                            return k.matches(e, t)
                        })))
                    }, add: function (t, e) {
                        return n(a(this.concat(n(t, e))))
                    }, is: function (t) {
                        return this.length > 0 && k.matches(this[0], t)
                    }, not: function (t) {
                        var e = [];
                        if (C(t) && void 0 !== t.call) this.each((function (n) {
                            t.call(this, n) || e.push(this)
                        })); else {
                            var i = "string" == typeof t ? this.filter(t) : D(t) && C(t.item) ? c.call(t) : n(t);
                            this.forEach((function (t) {
                                i.indexOf(t) < 0 && e.push(t)
                            }))
                        }
                        return n(e)
                    }, has: function (t) {
                        return this.filter((function () {
                            return P(t) ? n.contains(this, t) : n(this).find(t).size()
                        }))
                    }, eq: function (t) {
                        return -1 === t ? this.slice(t) : this.slice(t, +t + 1)
                    }, first: function () {
                        var t = this[0];
                        return t && !P(t) ? t : n(t)
                    }, last: function () {
                        var t = this[this.length - 1];
                        return t && !P(t) ? t : n(t)
                    }, find: function (t) {
                        var e = this;
                        return t ? "object" == typeof t ? n(t).filter((function () {
                            var t = this;
                            return o.some.call(e, (function (e) {
                                return n.contains(e, t)
                            }))
                        })) : 1 == this.length ? n(k.qsa(this[0], t)) : this.map((function () {
                            return k.qsa(this, t)
                        })) : n()
                    }, closest: function (t, e) {
                        var i = [], r = "object" == typeof t && n(t);
                        return this.each((function (n, a) {
                            for (; a && !(r ? r.indexOf(a) >= 0 : k.matches(a, t));) a = a !== e && !V(a) && a.parentNode;
                            a && i.indexOf(a) < 0 && i.push(a)
                        })), n(i)
                    }, parents: function (t) {
                        for (var e = [], i = this; i.length > 0;) i = n.map(i, (function (t) {
                            if ((t = t.parentNode) && !V(t) && e.indexOf(t) < 0) return e.push(t), t
                        }));
                        return B(e, t)
                    }, parent: function (t) {
                        return B(a(this.pluck("parentNode")), t)
                    }, children: function (t) {
                        return B(this.map((function () {
                            return U(this)
                        })), t)
                    }, contents: function () {
                        return this.map((function () {
                            return this.contentDocument || c.call(this.childNodes)
                        }))
                    }, siblings: function (t) {
                        return B(this.map((function (t, e) {
                            return u.call(U(e.parentNode), (function (t) {
                                return t !== e
                            }))
                        })), t)
                    }, empty: function () {
                        return this.each((function () {
                            this.innerHTML = ""
                        }))
                    }, pluck: function (t) {
                        return n.map(this, (function (e) {
                            return e[t]
                        }))
                    }, show: function () {
                        return this.each((function () {
                            var t, e, n;
                            "none" == this.style.display && (this.style.display = ""), "none" == getComputedStyle(this, "").getPropertyValue("display") && (this.style.display = (t = this.nodeName, h[t] || (e = l.createElement(t), l.body.appendChild(e), n = getComputedStyle(e, "").getPropertyValue("display"), e.parentNode.removeChild(e), "none" == n && (n = "block"), h[t] = n), h[t]))
                        }))
                    }, replaceWith: function (t) {
                        return this.before(t).remove()
                    }, wrap: function (t) {
                        var e = C(t);
                        if (this[0] && !e) var i = n(t).get(0), r = i.parentNode || this.length > 1;
                        return this.each((function (a) {
                            n(this).wrapAll(e ? t.call(this, a) : r ? i.cloneNode(!0) : i)
                        }))
                    }, wrapAll: function (t) {
                        if (this[0]) {
                            var e;
                            for (n(this[0]).before(t = n(t)); (e = t.children()).length;) t = e.first();
                            n(t).append(this)
                        }
                        return this
                    }, wrapInner: function (t) {
                        var e = C(t);
                        return this.each((function (i) {
                            var r = n(this), a = r.contents(), o = e ? t.call(this, i) : t;
                            a.length ? a.wrapAll(o) : r.append(o)
                        }))
                    }, unwrap: function () {
                        return this.parent().each((function () {
                            n(this).replaceWith(n(this).children())
                        })), this
                    }, clone: function () {
                        return this.map((function () {
                            return this.cloneNode(!0)
                        }))
                    }, hide: function () {
                        return this.css("display", "none")
                    }, toggle: function (t) {
                        return this.each((function () {
                            var e = n(this);
                            (void 0 === t ? "none" == e.css("display") : t) ? e.show() : e.hide()
                        }))
                    }, prev: function (t) {
                        return n(this.pluck("previousElementSibling")).filter(t || "*")
                    }, next: function (t) {
                        return n(this.pluck("nextElementSibling")).filter(t || "*")
                    }, html: function (t) {
                        return 0 in arguments ? this.each((function (e) {
                            var i = this.innerHTML;
                            n(this).empty().append(K(this, t, e, i))
                        })) : 0 in this ? this[0].innerHTML : null
                    }, text: function (t) {
                        return 0 in arguments ? this.each((function (e) {
                            var n = K(this, t, e, this.textContent);
                            this.textContent = null == n ? "" : "" + n
                        })) : 0 in this ? this.pluck("textContent").join("") : null
                    }, attr: function (t, n) {
                        var i;
                        return "string" != typeof t || 1 in arguments ? this.each((function (i) {
                            if (1 === this.nodeType) if (P(t)) for (e in t) X(this, e, t[e]); else X(this, t, K(this, n, i, this.getAttribute(t)))
                        })) : 0 in this && 1 == this[0].nodeType && null != (i = this[0].getAttribute(t)) ? i : void 0
                    }, removeAttr: function (t) {
                        return this.each((function () {
                            1 === this.nodeType && t.split(" ").forEach((function (t) {
                                X(this, t)
                            }), this)
                        }))
                    }, prop: function (t, e) {
                        return t = I[t] || t, 1 in arguments ? this.each((function (n) {
                            this[t] = K(this, e, n, this[t])
                        })) : this[0] && this[0][t]
                    }, removeProp: function (t) {
                        return t = I[t] || t, this.each((function () {
                            delete this[t]
                        }))
                    }, data: function (t, e) {
                        var n = "data-" + t.replace(y, "-$1").toLowerCase(), i = 1 in arguments ? this.attr(n, e) : this.attr(n);
                        return null !== i ? z(i) : void 0
                    }, val: function (t) {
                        return 0 in arguments ? (null == t && (t = ""), this.each((function (e) {
                            this.value = K(this, t, e, this.value)
                        }))) : this[0] && (this[0].multiple ? n(this[0]).find("option").filter((function () {
                            return this.selected
                        })).pluck("value") : this[0].value)
                    }, offset: function (e) {
                        if (e) return this.each((function (t) {
                            var i = n(this), r = K(this, e, t, i.offset()), a = i.offsetParent().offset(), o = {top: r.top - a.top, left: r.left - a.left};
                            "static" == i.css("position") && (o.position = "relative"), i.css(o)
                        }));
                        if (!this.length) return null;
                        if (l.documentElement !== this[0] && !n.contains(l.documentElement, this[0])) return {top: 0, left: 0};
                        var i = this[0].getBoundingClientRect();
                        return {left: i.left + t.pageXOffset, top: i.top + t.pageYOffset, width: Math.round(i.width), height: Math.round(i.height)}
                    }, css: function (t, i) {
                        if (arguments.length < 2) {
                            var a = this[0];
                            if ("string" == typeof t) {
                                if (!a) return;
                                return a.style[r(t)] || getComputedStyle(a, "").getPropertyValue(t)
                            }
                            if (S(t)) {
                                if (!a) return;
                                var o = {}, s = getComputedStyle(a, "");
                                return n.each(t, (function (t, e) {
                                    o[e] = a.style[r(e)] || s.getPropertyValue(e)
                                })), o
                            }
                        }
                        var u = "";
                        if ("string" == N(t)) i || 0 === i ? u = F(t) + ":" + H(t, i) : this.each((function () {
                            this.style.removeProperty(F(t))
                        })); else for (e in t) t[e] || 0 === t[e] ? u += F(e) + ":" + H(e, t[e]) + ";" : this.each((function () {
                            this.style.removeProperty(F(e))
                        }));
                        return this.each((function () {
                            this.style.cssText += ";" + u
                        }))
                    }, index: function (t) {
                        return t ? this.indexOf(n(t)[0]) : this.parent().children().indexOf(this[0])
                    }, hasClass: function (t) {
                        return !!t && o.some.call(this, (function (t) {
                            return this.test($(t))
                        }), j(t))
                    }, addClass: function (t) {
                        return t ? this.each((function (e) {
                            if ("className" in this) {
                                i = [];
                                var r = $(this);
                                K(this, t, e, r).split(/\s+/g).forEach((function (t) {
                                    n(this).hasClass(t) || i.push(t)
                                }), this), i.length && $(this, r + (r ? " " : "") + i.join(" "))
                            }
                        })) : this
                    }, removeClass: function (t) {
                        return this.each((function (e) {
                            if ("className" in this) {
                                if (void 0 === t) return $(this, "");
                                i = $(this), K(this, t, e, i).split(/\s+/g).forEach((function (t) {
                                    i = i.replace(j(t), " ")
                                })), $(this, i.trim())
                            }
                        }))
                    }, toggleClass: function (t, e) {
                        return t ? this.each((function (i) {
                            var r = n(this);
                            K(this, t, i, $(this)).split(/\s+/g).forEach((function (t) {
                                (void 0 === e ? !r.hasClass(t) : e) ? r.addClass(t) : r.removeClass(t)
                            }))
                        })) : this
                    }, scrollTop: function (t) {
                        if (this.length) {
                            var e = "scrollTop" in this[0];
                            return void 0 === t ? e ? this[0].scrollTop : this[0].pageYOffset : this.each(e ? function () {
                                this.scrollTop = t
                            } : function () {
                                this.scrollTo(this.scrollX, t)
                            })
                        }
                    }, scrollLeft: function (t) {
                        if (this.length) {
                            var e = "scrollLeft" in this[0];
                            return void 0 === t ? e ? this[0].scrollLeft : this[0].pageXOffset : this.each(e ? function () {
                                this.scrollLeft = t
                            } : function () {
                                this.scrollTo(t, this.scrollY)
                            })
                        }
                    }, position: function () {
                        if (this.length) {
                            var t = this[0], e = this.offsetParent(), i = this.offset(), r = m.test(e[0].nodeName) ? {top: 0, left: 0} : e.offset();
                            return i.top -= parseFloat(n(t).css("margin-top")) || 0, i.left -= parseFloat(n(t).css("margin-left")) || 0, r.top += parseFloat(n(e[0]).css("border-top-width")) || 0, r.left += parseFloat(n(e[0]).css("border-left-width")) || 0, {
                                top: i.top - r.top,
                                left: i.left - r.left
                            }
                        }
                    }, offsetParent: function () {
                        return this.map((function () {
                            for (var t = this.offsetParent || l.body; t && !m.test(t.nodeName) && "static" == n(t).css("position");) t = t.offsetParent;
                            return t
                        }))
                    }
                }, n.fn.detach = n.fn.remove, ["width", "height"].forEach((function (t) {
                    var e = t.replace(/./, (function (t) {
                        return t[0].toUpperCase()
                    }));
                    n.fn[t] = function (i) {
                        var r, a = this[0];
                        return void 0 === i ? L(a) ? a["inner" + e] : V(a) ? a.documentElement["scroll" + e] : (r = this.offset()) && r[t] : this.each((function (e) {
                            (a = n(this)).css(t, K(this, i, e, a[t]()))
                        }))
                    }
                })), ["after", "prepend", "before", "append"].forEach((function (e, i) {
                    var r = i % 2;
                    n.fn[e] = function () {
                        var e, a, o = n.map(arguments, (function (t) {
                            var i = [];
                            return "array" == (e = N(t)) ? (t.forEach((function (t) {
                                return void 0 !== t.nodeType ? i.push(t) : n.zepto.isZ(t) ? i = i.concat(t.get()) : void (i = i.concat(k.fragment(t)))
                            })), i) : "object" == e || null == t ? t : k.fragment(t)
                        })), s = this.length > 1;
                        return o.length < 1 ? this : this.each((function (e, u) {
                            a = r ? u : u.parentNode, u = 0 == i ? u.nextSibling : 1 == i ? u.firstChild : 2 == i ? u : null;
                            var c = n.contains(l.documentElement, a);
                            o.forEach((function (e) {
                                if (s) e = e.cloneNode(!0); else if (!a) return n(e).remove();
                                a.insertBefore(e, u), c && Z(e, (function (e) {
                                    if (!(null == e.nodeName || "SCRIPT" !== e.nodeName.toUpperCase() || e.type && "text/javascript" !== e.type || e.src)) {
                                        var n = e.ownerDocument ? e.ownerDocument.defaultView : t;
                                        n.eval.call(n, e.innerHTML)
                                    }
                                }))
                            }))
                        }))
                    }, n.fn[r ? e + "To" : "insert" + (i ? "Before" : "After")] = function (t) {
                        return n(t)[e](this), this
                    }
                })), k.Z.prototype = G.prototype = n.fn, k.uniq = a, k.deserializeValue = z, n.zepto = k, n
            }();
            return t.Zepto = n, void 0 === t.$ && (t.$ = n), function (e) {
                var n = 1, i = Array.prototype.slice, r = e.isFunction, a = function (t) {
                    return "string" == typeof t
                }, o = {}, s = {}, u = "onfocusin" in t, c = {focus: "focusin", blur: "focusout"}, l = {mouseenter: "mouseover", mouseleave: "mouseout"};

                function h(t) {
                    return t._zid || (t._zid = n++)
                }

                function f(t, e, n, i) {
                    if ((e = d(e)).ns) var r = (a = e.ns, new RegExp("(?:^| )" + a.replace(" ", " .* ?") + "(?: |$)"));
                    var a;
                    return (o[h(t)] || []).filter((function (t) {
                        return t && (!e.e || t.e == e.e) && (!e.ns || r.test(t.ns)) && (!n || h(t.fn) === h(n)) && (!i || t.sel == i)
                    }))
                }

                function d(t) {
                    var e = ("" + t).split(".");
                    return {e: e[0], ns: e.slice(1).sort().join(" ")}
                }

                function p(t, e) {
                    return t.del && !u && t.e in c || !!e
                }

                function g(t) {
                    return l[t] || u && c[t] || t
                }

                function v(t, n, i, r, a, s, u) {
                    var c = h(t), f = o[c] || (o[c] = []);
                    n.split(/\s/).forEach((function (n) {
                        if ("ready" == n) return e(document).ready(i);
                        var o = d(n);
                        o.fn = i, o.sel = a, o.e in l && (i = function (t) {
                            var n = t.relatedTarget;
                            if (!n || n !== this && !e.contains(this, n)) return o.fn.apply(this, arguments)
                        }), o.del = s;
                        var c = s || i;
                        o.proxy = function (e) {
                            if (!(e = T(e)).isImmediatePropagationStopped()) {
                                e.data = r;
                                var n = c.apply(t, null == e._args ? [e] : [e].concat(e._args));
                                return !1 === n && (e.preventDefault(), e.stopPropagation()), n
                            }
                        }, o.i = f.length, f.push(o), "addEventListener" in t && t.addEventListener(g(o.e), o.proxy, p(o, u))
                    }))
                }

                function m(t, e, n, i, r) {
                    var a = h(t);
                    (e || "").split(/\s/).forEach((function (e) {
                        f(t, e, n, i).forEach((function (e) {
                            delete o[a][e.i], "removeEventListener" in t && t.removeEventListener(g(e.e), e.proxy, p(e, r))
                        }))
                    }))
                }

                s.click = s.mousedown = s.mouseup = s.mousemove = "MouseEvents", e.event = {add: v, remove: m}, e.proxy = function (t, n) {
                    var o = 2 in arguments && i.call(arguments, 2);
                    if (r(t)) {
                        var s = function () {
                            return t.apply(n, o ? o.concat(i.call(arguments)) : arguments)
                        };
                        return s._zid = h(t), s
                    }
                    if (a(n)) return o ? (o.unshift(t[n], t), e.proxy.apply(null, o)) : e.proxy(t[n], t);
                    throw new TypeError("expected function")
                }, e.fn.bind = function (t, e, n) {
                    return this.on(t, e, n)
                }, e.fn.unbind = function (t, e) {
                    return this.off(t, e)
                }, e.fn.one = function (t, e, n, i) {
                    return this.on(t, e, n, i, 1)
                };
                var y = function () {
                    return !0
                }, b = function () {
                    return !1
                }, E = /^([A-Z]|returnValue$|layer[XY]$|webkitMovement[XY]$)/, x = {preventDefault: "isDefaultPrevented", stopImmediatePropagation: "isImmediatePropagationStopped", stopPropagation: "isPropagationStopped"};

                function T(t, n) {
                    return !n && t.isDefaultPrevented || (n || (n = t), e.each(x, (function (e, i) {
                        var r = n[e];
                        t[e] = function () {
                            return this[i] = y, r && r.apply(n, arguments)
                        }, t[i] = b
                    })), t.timeStamp || (t.timeStamp = Date.now()), (void 0 !== n.defaultPrevented ? n.defaultPrevented : "returnValue" in n ? !1 === n.returnValue : n.getPreventDefault && n.getPreventDefault()) && (t.isDefaultPrevented = y)), t
                }

                function O(t) {
                    var e, n = {originalEvent: t};
                    for (e in t) E.test(e) || void 0 === t[e] || (n[e] = t[e]);
                    return T(n, t)
                }

                e.fn.delegate = function (t, e, n) {
                    return this.on(e, t, n)
                }, e.fn.undelegate = function (t, e, n) {
                    return this.off(e, t, n)
                }, e.fn.live = function (t, n) {
                    return e(document.body).delegate(this.selector, t, n), this
                }, e.fn.die = function (t, n) {
                    return e(document.body).undelegate(this.selector, t, n), this
                }, e.fn.on = function (t, n, o, s, u) {
                    var c, l, h = this;
                    return t && !a(t) ? (e.each(t, (function (t, e) {
                        h.on(t, n, o, e, u)
                    })), h) : (a(n) || r(s) || !1 === s || (s = o, o = n, n = void 0), void 0 !== s && !1 !== o || (s = o, o = void 0), !1 === s && (s = b), h.each((function (r, a) {
                        u && (c = function (t) {
                            return m(a, t.type, s), s.apply(this, arguments)
                        }), n && (l = function (t) {
                            var r, o = e(t.target).closest(n, a).get(0);
                            if (o && o !== a) return r = e.extend(O(t), {currentTarget: o, liveFired: a}), (c || s).apply(o, [r].concat(i.call(arguments, 1)))
                        }), v(a, t, s, o, n, l || c)
                    })))
                }, e.fn.off = function (t, n, i) {
                    var o = this;
                    return t && !a(t) ? (e.each(t, (function (t, e) {
                        o.off(t, n, e)
                    })), o) : (a(n) || r(i) || !1 === i || (i = n, n = void 0), !1 === i && (i = b), o.each((function () {
                        m(this, t, i, n)
                    })))
                }, e.fn.trigger = function (t, n) {
                    return (t = a(t) || e.isPlainObject(t) ? e.Event(t) : T(t))._args = n, this.each((function () {
                        t.type in c && "function" == typeof this[t.type] ? this[t.type]() : "dispatchEvent" in this ? this.dispatchEvent(t) : e(this).triggerHandler(t, n)
                    }))
                }, e.fn.triggerHandler = function (t, n) {
                    var i, r;
                    return this.each((function (o, s) {
                        (i = O(a(t) ? e.Event(t) : t))._args = n, i.target = s, e.each(f(s, t.type || t), (function (t, e) {
                            if (r = e.proxy(i), i.isImmediatePropagationStopped()) return !1
                        }))
                    })), r
                }, "focusin focusout focus blur load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach((function (t) {
                    e.fn[t] = function (e) {
                        return 0 in arguments ? this.bind(t, e) : this.trigger(t)
                    }
                })), e.Event = function (t, e) {
                    a(t) || (t = (e = t).type);
                    var n = document.createEvent(s[t] || "Events"), i = !0;
                    if (e) for (var r in e) "bubbles" == r ? i = !!e[r] : n[r] = e[r];
                    return n.initEvent(t, i, !0), T(n)
                }
            }(n), function (e) {
                var n, i, r = +new Date, a = document, o = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, s = /^(?:text|application)\/javascript/i, u = /^(?:text|application)\/xml/i, c = /^\s*$/, l = a.createElement("a");

                function h(t, n, i, r) {
                    if (t.global) return function (t, n, i) {
                        var r = e.Event(n);
                        return e(t).trigger(r, i), !r.isDefaultPrevented()
                    }(n || a, i, r)
                }

                function f(t, e) {
                    var n = e.context;
                    if (!1 === e.beforeSend.call(n, t, e) || !1 === h(e, n, "ajaxBeforeSend", [t, e])) return !1;
                    h(e, n, "ajaxSend", [t, e])
                }

                function d(t, e, n, i) {
                    var r = n.context;
                    n.success.call(r, t, "success", e), i && i.resolveWith(r, [t, "success", e]), h(n, r, "ajaxSuccess", [e, n, t]), g("success", e, n)
                }

                function p(t, e, n, i, r) {
                    var a = i.context;
                    i.error.call(a, n, e, t), r && r.rejectWith(a, [n, e, t]), h(i, a, "ajaxError", [n, i, t || e]), g(e, n, i)
                }

                function g(t, n, i) {
                    var r = i.context;
                    i.complete.call(r, n, t), h(i, r, "ajaxComplete", [n, i]), function (t) {
                        t.global && !--e.active && h(t, null, "ajaxStop")
                    }(i)
                }

                function v() {
                }

                function m(t, e) {
                    return "" == e ? t : (t + "&" + e).replace(/[&?]{1,2}/, "?")
                }

                function y(t, n, i, r) {
                    return e.isFunction(n) && (r = i, i = n, n = void 0), e.isFunction(i) || (r = i, i = void 0), {url: t, data: n, success: i, dataType: r}
                }

                l.href = location.href, e.active = 0, e.ajaxJSONP = function (n, i) {
                    if (!("type" in n)) return e.ajax(n);
                    var o, s, u = n.jsonpCallback, c = (e.isFunction(u) ? u() : u) || "Zepto" + r++, l = a.createElement("script"), h = t[c], g = function (t) {
                        e(l).triggerHandler("error", t || "abort")
                    }, v = {abort: g};
                    return i && i.promise(v), e(l).on("load error", (function (r, a) {
                        clearTimeout(s), e(l).off().remove(), "error" != r.type && o ? d(o[0], v, n, i) : p(null, a || "error", v, n, i), t[c] = h, o && e.isFunction(h) && h(o[0]), h = o = void 0
                    })), !1 === f(v, n) ? (g("abort"), v) : (t[c] = function () {
                        o = arguments
                    }, l.src = n.url.replace(/\?(.+)=\?/, "?$1=" + c), a.head.appendChild(l), n.timeout > 0 && (s = setTimeout((function () {
                        g("timeout")
                    }), n.timeout)), v)
                }, e.ajaxSettings = {
                    type: "GET",
                    beforeSend: v,
                    success: v,
                    error: v,
                    complete: v,
                    context: null,
                    global: !0,
                    xhr: function () {
                        return new t.XMLHttpRequest
                    },
                    accepts: {script: "text/javascript, application/javascript, application/x-javascript", json: "application/json", xml: "application/xml, text/xml", html: "text/html", text: "text/plain"},
                    crossDomain: !1,
                    timeout: 0,
                    processData: !0,
                    cache: !0,
                    dataFilter: v
                }, e.ajax = function (r) {
                    var o, g, y = e.extend({}, r || {}), b = e.Deferred && e.Deferred();
                    for (n in e.ajaxSettings) void 0 === y[n] && (y[n] = e.ajaxSettings[n]);
                    !function (t) {
                        t.global && 0 == e.active++ && h(t, null, "ajaxStart")
                    }(y), y.crossDomain || ((o = a.createElement("a")).href = y.url, o.href = o.href, y.crossDomain = l.protocol + "//" + l.host != o.protocol + "//" + o.host), y.url || (y.url = location.toString()), (g = y.url.indexOf("#")) > -1 && (y.url = y.url.slice(0, g)), function (t) {
                        t.processData && t.data && "string" != e.type(t.data) && (t.data = e.param(t.data, t.traditional)), !t.data || t.type && "GET" != t.type.toUpperCase() && "jsonp" != t.dataType || (t.url = m(t.url, t.data), t.data = void 0)
                    }(y);
                    var E = y.dataType, x = /\?.+=\?/.test(y.url);
                    if (x && (E = "jsonp"), !1 !== y.cache && (r && !0 === r.cache || "script" != E && "jsonp" != E) || (y.url = m(y.url, "_=" + Date.now())), "jsonp" == E) return x || (y.url = m(y.url, y.jsonp ? y.jsonp + "=?" : !1 === y.jsonp ? "" : "callback=?")), e.ajaxJSONP(y, b);
                    var T, O = y.accepts[E], w = {}, A = function (t, e) {
                        w[t.toLowerCase()] = [t, e]
                    }, _ = /^([\w-]+:)\/\//.test(y.url) ? RegExp.$1 : location.protocol, k = y.xhr(), M = k.setRequestHeader;
                    if (b && b.promise(k), y.crossDomain || A("X-Requested-With", "XMLHttpRequest"), A("Accept", O || "*/*"), (O = y.mimeType || O) && (O.indexOf(",") > -1 && (O = O.split(",", 2)[0]), k.overrideMimeType && k.overrideMimeType(O)), (y.contentType || !1 !== y.contentType && y.data && "GET" != y.type.toUpperCase()) && A("Content-Type", y.contentType || "application/x-www-form-urlencoded"), y.headers) for (i in y.headers) A(i, y.headers[i]);
                    if (k.setRequestHeader = A, k.onreadystatechange = function () {
                        if (4 == k.readyState) {
                            k.onreadystatechange = v, clearTimeout(T);
                            var t, n = !1;
                            if (k.status >= 200 && k.status < 300 || 304 == k.status || 0 == k.status && "file:" == _) {
                                if (E = E || function (t) {
                                    return t && (t = t.split(";", 2)[0]), t && ("text/html" == t ? "html" : "application/json" == t ? "json" : s.test(t) ? "script" : u.test(t) && "xml") || "text"
                                }(y.mimeType || k.getResponseHeader("content-type")), "arraybuffer" == k.responseType || "blob" == k.responseType) t = k.response; else {
                                    t = k.responseText;
                                    try {
                                        t = function (t, e, n) {
                                            if (n.dataFilter == v) return t;
                                            var i = n.context;
                                            return n.dataFilter.call(i, t, e)
                                        }(t, E, y), "script" == E ? (0, eval)(t) : "xml" == E ? t = k.responseXML : "json" == E && (t = c.test(t) ? null : e.parseJSON(t))
                                    } catch (t) {
                                        n = t
                                    }
                                    if (n) return p(n, "parsererror", k, y, b)
                                }
                                d(t, k, y, b)
                            } else p(k.statusText || null, k.status ? "error" : "abort", k, y, b)
                        }
                    }, !1 === f(k, y)) return k.abort(), p(null, "abort", k, y, b), k;
                    var I = !("async" in y) || y.async;
                    if (k.open(y.type, y.url, I, y.username, y.password), y.xhrFields) for (i in y.xhrFields) k[i] = y.xhrFields[i];
                    for (i in w) M.apply(k, w[i]);
                    return y.timeout > 0 && (T = setTimeout((function () {
                        k.onreadystatechange = v, k.abort(), p(null, "timeout", k, y, b)
                    }), y.timeout)), k.send(y.data ? y.data : null), k
                }, e.get = function () {
                    return e.ajax(y.apply(null, arguments))
                }, e.post = function () {
                    var t = y.apply(null, arguments);
                    return t.type = "POST", e.ajax(t)
                }, e.getJSON = function () {
                    var t = y.apply(null, arguments);
                    return t.dataType = "json", e.ajax(t)
                }, e.fn.load = function (t, n, i) {
                    if (!this.length) return this;
                    var r, a = this, s = t.split(/\s/), u = y(t, n, i), c = u.success;
                    return s.length > 1 && (u.url = s[0], r = s[1]), u.success = function (t) {
                        a.html(r ? e("<div>").html(t.replace(o, "")).find(r) : t), c && c.apply(a, arguments)
                    }, e.ajax(u), this
                };
                var b = encodeURIComponent;
                e.param = function (t, n) {
                    var i = [];
                    return i.add = function (t, n) {
                        e.isFunction(n) && (n = n()), null == n && (n = ""), this.push(b(t) + "=" + b(n))
                    }, function t(n, i, r, a) {
                        var o, s = e.isArray(i), u = e.isPlainObject(i);
                        e.each(i, (function (i, c) {
                            o = e.type(c), a && (i = r ? a : a + "[" + (u || "object" == o || "array" == o ? i : "") + "]"), !a && s ? n.add(c.name, c.value) : "array" == o || !r && "object" == o ? t(n, c, r, i) : n.add(i, c)
                        }))
                    }(i, t, n), i.join("&").replace(/%20/g, "+")
                }
            }(n), (e = n).fn.serializeArray = function () {
                var t, n, i = [], r = function (e) {
                    if (e.forEach) return e.forEach(r);
                    i.push({name: t, value: e})
                };
                return this[0] && e.each(this[0].elements, (function (i, a) {
                    n = a.type, (t = a.name) && "fieldset" != a.nodeName.toLowerCase() && !a.disabled && "submit" != n && "reset" != n && "button" != n && "file" != n && ("radio" != n && "checkbox" != n || a.checked) && r(e(a).val())
                })), i
            }, e.fn.serialize = function () {
                var t = [];
                return this.serializeArray().forEach((function (e) {
                    t.push(encodeURIComponent(e.name) + "=" + encodeURIComponent(e.value))
                })), t.join("&")
            }, e.fn.submit = function (t) {
                if (0 in arguments) this.bind("submit", t); else if (this.length) {
                    var n = e.Event("submit");
                    this.eq(0).trigger(n), n.isDefaultPrevented() || this.get(0).submit()
                }
                return this
            }, function () {
                try {
                    getComputedStyle(void 0)
                } catch (n) {
                    var e = getComputedStyle;
                    t.getComputedStyle = function (t, n) {
                        try {
                            return e(t, n)
                        } catch (t) {
                            return null
                        }
                    }
                }
            }(), n
        }(r)
    }.call(e, n, e, t)) || (t.exports = i)
}, function (t, e, n) {
    "use strict";
    n.r(e);
    var i = {};
    n.r(i), n.d(i, "getCurrentTime", (function () {
        return a
    })), n.d(i, "random", (function () {
        return o
    })), n.d(i, "randomPositiveNegative", (function () {
        return s
    })), n.d(i, "isFunction", (function () {
        return u
    })), n.d(i, "isTouchDevice", (function () {
        return c
    })), n.d(i, "requestAnimationFrameTool", (function () {
        return l
    })), n.d(i, "arraySwap", (function () {
        return h
    }));
    var r, a = function () {
        return performance.now()
    }, o = function (t, e) {
        return Math.random() * (e - t) + t
    }, s = function () {
        return Math.random() < .5 ? -1 : 1
    }, u = function (t) {
        return "function" == typeof t
    }, c = function () {
        return "ontouchstart" in window || window.navigator.msMaxTouchPoints
    }, l = (r = 1e3 / 60, window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (t) {
        window.setTimeout((function () {
            var e = a();
            t(e);
            var n = a();
            r = 1e3 / 60 - (n - e)
        }), r)
    }), h = function (t, e, n) {
        var i = t[n];
        t[n] = t[e], t[e] = i
    }, f = {
        linear: function (t, e, n, i) {
            return n * t / i + e
        }, easeIn: function (t, e, n, i) {
            return n * (t /= i) * t + e
        }, easeOut: function (t, e, n, i) {
            return -n * (t /= i) * (t - 2) + e
        }, easeInOut: function (t, e, n, i) {
            return (t /= i / 2) < 1 ? n / 2 * t * t + e : -n / 2 * (--t * (t - 2) - 1) + e
        }
    };

    function d(t) {
        return function (t) {
            if (Array.isArray(t)) return p(t)
        }(t) || function (t) {
            if ("undefined" != typeof Symbol && Symbol.iterator in Object(t)) return Array.from(t)
        }(t) || function (t, e) {
            if (!t) return;
            if ("string" == typeof t) return p(t, e);
            var n = Object.prototype.toString.call(t).slice(8, -1);
            "Object" === n && t.constructor && (n = t.constructor.name);
            if ("Map" === n || "Set" === n) return Array.from(t);
            if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return p(t, e)
        }(t) || function () {
            throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }()
    }

    function p(t, e) {
        (null == e || e > t.length) && (e = t.length);
        for (var n = 0, i = new Array(e); n < e; n++) i[n] = t[n];
        return i
    }

    function g(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function v(t, e) {
        for (var n = 0; n < e.length; n++) {
            var i = e[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
        }
    }

    var m = l, y = u, b = c, E = function () {
        function t() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            if (g(this, t), document.createElement("canvas").getContext) {
                var n = e.canvasId, r = e.debug, a = e.width, o = e.height, s = e.highResolution, u = e.loadLimit, c = e.soundOn, l = a || window.innerWidth, h = o || window.innerHeight;
                this.canvas = document.getElementById(n), s && (this.canvas.style.width = "".concat(l, "px"), this.canvas.style.height = "".concat(h, "px"), l *= 2, h *= 2), this.highResolution = s, this.canvas.width = l, this.canvas.height = h, this.width = this.canvas.width, this.height = this.canvas.height, this.calWidth = .5 * this.width, this.calHeight = .5 * this.height, this.debug = !!r, this.ctx = this.canvas.getContext("2d"), this.defaultLayer = "default", this.layerArr = [this.defaultLayer], this.instancesObj = {}, this.instancesObj[this.defaultLayer] = [], this.instancesReactionArr = [], this.utils = i, this.customVariable = {};
                var f = this;
                this.isTouchDevice = b(), this.debugArr = [], this.assetsObj = {image: {}, audio: {}}, this.assetsCount = {
                    image: 0,
                    audio: 0
                }, this.assetsErrorQueue = [], this.assetsErrorCount = 0, this.loadLimit = u || 3, this.soundOn = !!c, this.fps = 0, this.lastTime = 0, this.lastPausedAt = 0, this.pausedTime = 0, this.paused = !1, this.timeMovement = {}, this.timeMovementStartArr = [], this.timeMovementFinishArr = [], this.keyUpListeners = {}, this.keyDownListeners = {}, this.keyPressListeners = {}, this.startAnimate = function () {
                }, this.paintUnderInstance = function () {
                }, this.paintAboveInstance = function () {
                }, this.endAnimate = function () {
                }, this.touchStartListener = function () {
                }, this.touchEndListener = function () {
                }, this.touchMoveListener = function () {
                }, document.addEventListener("keyup", (function (t) {
                    f.keyListener(t, "keyup")
                }), !1), document.addEventListener("keydown", (function (t) {
                    f.keyListener(t, "keydown")
                }), !1), document.addEventListener("keypress", (function (t) {
                    f.keyListener(t, "keypress")
                }), !1), this.isTouchDevice ? (document.addEventListener("touchstart", (function (t) {
                    f.touchStartListener(t)
                }), !1), document.addEventListener("touchend", (function (t) {
                    f.touchEndListener(t)
                }), !1), document.addEventListener("touchmove", (function (t) {
                    f.touchMoveListener(t)
                }), !1)) : (document.addEventListener("keydown", (function (t) {
                    13 === t.which && f.touchStartListener(t)
                }), !1), document.addEventListener("mousedown", (function (t) {
                    f.touchStartListener(t)
                }), !1), document.addEventListener("mouseup", (function (t) {
                    f.touchEndListener(t)
                }), !1), document.addEventListener("mousemove", (function (t) {
                    f.touchMoveListener(t)
                }), !1))
            } else window.alert("HTML5 Canvas is not supported in your browser.")
        }

        var e, n, r;
        return e = t, (n = [{
            key: "triggerReaction", value: function (t, e) {
                var n = this, i = t, r = e;
                this.highResolution && (i *= 2, r *= 2), this.instancesReactionArr.forEach((function (t) {
                    t.visible && i >= t.x && i <= t.x + t.width && r >= t.y && r <= t.y + t.height && t.trigger(t, n)
                }))
            }
        }, {
            key: "addAudio", value: function (t, e) {
                var n = this, i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0;
                if (this.soundOn) {
                    i || (this.assetsCount.audio += 1);
                    var r = new window.Audio;
                    r.src = e, this.assetsObj.audio[t] = r, r.addEventListener("error", (function () {
                        n.assetsErrorQueue.push({name: t, src: e, retry: i + 1, type: "audio"})
                    }), !1), r.load()
                }
            }
        }, {
            key: "getAudio", value: function (t) {
                return this.assetsObj.audio[t]
            }
        }, {
            key: "playAudio", value: function (t) {
                var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                if (this.soundOn) {
                    var n = this.getAudio(t);
                    if (n) {
                        if (n.play(), !e) return;
                        n.addEventListener("ended", (function () {
                            n.currentTime = 0, n.play()
                        }), !1)
                    }
                }
            }
        }, {
            key: "pauseAudio", value: function (t) {
                var e = this.getAudio(t);
                e && e.pause()
            }
        }, {
            key: "setVariable", value: function (t, e) {
                this.customVariable[t] = e
            }
        }, {
            key: "getVariable", value: function (t) {
                var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null, n = this.customVariable[t];
                return n || (null !== e ? (this.setVariable(t, e), e) : null)
            }
        }, {
            key: "addImg", value: function (t, e) {
                var n = this, i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0;
                i || (this.assetsCount.image += 1);
                var r = new window.Image;
                r.src = e, r.onload = function () {
                    n.assetsObj.image[t] = r
                }, r.onerror = function () {
                    n.assetsErrorQueue.push({name: t, src: e, retry: i + 1, type: "image"})
                }
            }
        }, {
            key: "getImg", value: function (t) {
                return this.assetsObj.image[t]
            }
        }, {
            key: "animate", value: function (t) {
                var e = this, n = t - this.pausedTime, i = this;
                this.paused ? setTimeout((function () {
                    e.animate.call(i, n)
                }), 100) : (this.tick(n), this.clean(), this.startAnimate(this, n), this.paintUnderInstance(this), this.updateInstances(n), this.paintInstances(), this.paintAboveInstance(), this.endAnimate(this, n), this.tickTimeMovement(), this.debug && this.showFps(), this.debug && this.drawDebug(), m((function (t) {
                    e.animate.call(i, t)
                })))
            }
        }, {
            key: "showFps", value: function () {
                this.ctx.save(), this.ctx.fillStyle = "red", this.ctx.font = "".concat(this.highResolution ? 32 : 16, "px Arial"), this.ctx.fillText("FPS: ".concat(this.fps.toFixed()), 5, this.highResolution ? 40 : 20), this.ctx.restore()
            }
        }, {
            key: "debugLineX", value: function (t) {
                this.debugArr.push({type: "lineX", y: t})
            }
        }, {
            key: "debugLineY", value: function (t) {
                this.debugArr.push({type: "lineY", x: t})
            }
        }, {
            key: "debugDot", value: function (t, e) {
                this.debugArr.push({type: "dot", x: t, y: e})
            }
        }, {
            key: "drawDebug", value: function () {
                var t = this;
                this.debugArr.forEach((function (e) {
                    var n = e.type, i = e.x, r = e.y;
                    switch (n) {
                        case"dot":
                            t.drawDebugDot(i, r);
                            break;
                        case"lineX":
                            t.drawDebugLine(null, r);
                            break;
                        case"lineY":
                            t.drawDebugLine(i, null)
                    }
                })), this.instancesReactionArr.forEach((function (e) {
                    e.visible && (t.ctx.strokeStyle = "red", t.ctx.beginPath(), t.ctx.rect(e.x, e.y, e.width, e.height), t.ctx.stroke())
                }))
            }
        }, {
            key: "drawDebugLine", value: function (t, e) {
                var n, i, r = [0, e], a = [this.width, e];
                t && (r = [t, 0], a = [t, this.height]), this.ctx.save(), this.ctx.strokeStyle = "red", this.ctx.beginPath(), (n = this.ctx).moveTo.apply(n, d(r)), (i = this.ctx).lineTo.apply(i, d(a)), this.ctx.stroke(), this.ctx.restore()
            }
        }, {
            key: "drawDebugDot", value: function (t, e) {
                this.ctx.save(), this.ctx.fillStyle = "red", this.ctx.beginPath(), this.ctx.arc(t, e, 2, 0, 2 * Math.PI, !0), this.ctx.fill(), this.ctx.fillStyle = "white", this.ctx.beginPath(), this.ctx.arc(t, e, 1, 0, 2 * Math.PI, !0), this.ctx.fill(), this.ctx.restore()
            }
        }, {
            key: "tick", value: function (t) {
                this.updateFps(t), this.lastTime = t
            }
        }, {
            key: "updateFps", value: function (t) {
                0 === this.lastTime ? this.fps = 60 : this.fps = 1e3 / (t - this.lastTime)
            }
        }, {
            key: "pixelsPerFrame", value: function (t) {
                return t / this.fps
            }
        }, {
            key: "tickTimeMovement", value: function () {
                var t = this;
                this.timeMovementStartArr.forEach((function (e) {
                    t.timeMovement[e].processing = !0
                })), this.timeMovementStartArr = [], this.timeMovementFinishArr.forEach((function (e) {
                    delete t.timeMovement[e]
                })), this.timeMovementFinishArr = []
            }
        }, {
            key: "getTimeMovement", value: function (t, e, n) {
                var i = this, r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {}, a = r.before, o = r.after, s = f[r.easing || "linear"], u = r.name || "default", c = this.timeMovement[t];
                if (c) {
                    c.processing || (this.timeMovementStartArr.push(t), c.store[u] = [], e.forEach((function (t) {
                        c.store[u].push({start: parseFloat(t[0]), end: parseFloat(t[1])})
                    })), a && a());
                    var l = function () {
                        var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0], e = c.duration, r = e;
                        if (!t) {
                            var a = i.utils.getCurrentTime(), o = c.startTime;
                            r = a - o
                        }
                        var l = c.store[u].map((function (t) {
                            return s(r, t.start, t.end - t.start, e)
                        }));
                        n.apply(i, l)
                    };
                    this.checkTimeMovement(t) ? l() : (this.timeMovementFinishArr.push(t), l(!0), o && o())
                }
            }
        }, {
            key: "checkTimeMovement", value: function (t) {
                var e = this.timeMovement[t] || {};
                return this.utils.getCurrentTime() <= e.endTime
            }
        }, {
            key: "setTimeMovement", value: function (t, e) {
                var n = this.utils.getCurrentTime();
                this.timeMovement[t] = {startTime: n, endTime: n + e, duration: e, store: {}}
            }
        }, {
            key: "clean", value: function () {
                this.ctx.clearRect(0, 0, this.width, this.height), this.debugArr = []
            }
        }, {
            key: "addLayer", value: function (t) {
                this.layerArr.push(t), this.instancesObj[t] = []
            }
        }, {
            key: "removeLayer", value: function (t) {
                this.layerArr = this.layerArr.filter((function (e) {
                    return e !== t
                })), delete this.instancesObj[t]
            }
        }, {
            key: "swapLayer", value: function (t, e) {
                this.utils.arraySwap(this.layerArr, t, e)
            }
        }, {
            key: "addInstance", value: function (t) {
                var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.defaultLayer;
                this.instancesObj[e].push(t), t.trigger && this.instancesReactionArr.push(t)
            }
        }, {
            key: "getInstance", value: function (t) {
                var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.defaultLayer;
                return this.instancesObj[e].filter((function (e) {
                    return e.name === t
                }))[0]
            }
        }, {
            key: "removeInstance", value: function (t) {
                var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.defaultLayer, n = this.getInstance(t, e);
                n && (this.instancesObj[e] = this.instancesObj[e].filter((function (e) {
                    return e.name !== t
                })), n.trigger && (this.instancesReactionArr = this.instancesReactionArr.filter((function (e) {
                    return e.name !== t
                }))))
            }
        }, {
            key: "updateInstances", value: function (t) {
                var e = this;
                this.layerArr.forEach((function (n) {
                    e.instancesObj[n].forEach((function (n) {
                        n.update && n.update(e, t)
                    }))
                }))
            }
        }, {
            key: "paintInstances", value: function () {
                var t = this;
                this.layerArr.forEach((function (e) {
                    t.instancesObj[e].forEach((function (e) {
                        e.paint && e.paint(t)
                    }))
                }))
            }
        }, {
            key: "togglePaused", value: function () {
                var t = this.utils.getCurrentTime();
                this.paused = !this.paused, this.paused ? this.lastPausedAt = t : this.pausedTime += t - this.lastPausedAt
            }
        }, {
            key: "addKeyUpListener", value: function (t, e) {
                this.keyUpListeners[t] = e
            }
        }, {
            key: "addKeyDownListener", value: function (t, e) {
                this.keyDownListeners[t] = e
            }
        }, {
            key: "addKeyPressListener", value: function (t, e) {
                this.keyPressListeners[t] = e
            }
        }, {
            key: "findKeyListener", value: function (t, e) {
                return "keyup" === e ? this.keyUpListeners[t] : "keydown" === e ? this.keyDownListeners[t] : this.keyPressListeners[t]
            }
        }, {
            key: "keyListener", value: function (t, e) {
                var n;
                switch (t.keyCode) {
                    case 13:
                        n = "enter";
                        break;
                    case 32:
                        n = "space";
                        break;
                    case 37:
                        n = "leftArrow";
                        break;
                    case 39:
                        n = "rightArrow";
                        break;
                    case 38:
                        n = "upArrow";
                        break;
                    case 40:
                        n = "downArrow";
                        break;
                    default:
                        n = t.keyCode
                }
                var i = this.findKeyListener(n, e);
                i && i()
            }
        }, {
            key: "load", value: function (t, e) {
                var n = this, i = setInterval((function () {
                    var r = n.assetsCount.image + n.assetsCount.audio, a = Object.keys(n.assetsObj.image).length + Object.keys(n.assetsObj.audio).length;
                    e && y(e) && e({success: a, failed: n.assetsErrorCount, total: r}), n.assetsErrorQueue.length > 0 && (n.assetsErrorQueue.forEach((function (t) {
                        var e = t.retry, i = t.name, r = t.src, a = t.type;
                        e >= n.loadLimit ? n.assetsErrorCount += 1 : "image" === a ? n.addImg(i, r, e) : n.addAudio(i, r, e)
                    })), n.assetsErrorQueue = []), a === r && (t && y(t) ? t() : n.init(), clearInterval(i))
                }), 200)
            }
        }, {
            key: "init", value: function () {
                var t = this, e = this;
                m((function (n) {
                    t.animate.call(e, n)
                }))
            }
        }]) && v(e.prototype, n), r && v(e, r), t
    }();

    function x(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function T(t, e) {
        for (var n = 0; n < e.length; n++) {
            var i = e[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
        }
    }

    var O = function () {
        function t() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            x(this, t);
            var n = e.name, i = e.painter, r = e.action, a = e.trigger;
            this.name = n, this.x = 0, this.y = 0, this.width = 0, this.height = 0, this.ax = 0, this.ay = 0, this.vx = 0, this.vy = 0, this.visible = !0, this.painter = i || null, this.action = r || null, this.trigger = a || null, this.ready = !1
        }

        var e, n, i;
        return e = t, (n = [{
            key: "paint", value: function (t) {
                null !== this.painter && this.visible && this.painter(this, t)
            }
        }, {
            key: "update", value: function (t, e) {
                null !== this.action && this.action(this, t, e)
            }
        }, {
            key: "updateWidth", value: function (t) {
                this.width = t, this.calWidth = t / 2
            }
        }, {
            key: "updateHeight", value: function (t) {
                this.height = t, this.calHeight = t / 2
            }
        }]) && T(e.prototype, n), i && T(e, i), t
    }(), w = "LAND", A = "OUT", _ = function (t) {
        return t.checkTimeMovement("MOVE_DOWN_MOVEMENT")
    }, k = function (t, e) {
        var n = e ? e.pixelsPerFrame : t.pixelsPerFrame.bind(t), i = t.getVariable("SUCCESS_COUNT"), r = 2 * t.getVariable("BLOCK_HEIGHT");
        return n(i <= 4 ? 1.25 * r : r)
    }, M = function (t, e) {
        var n, i = t.getVariable("SUCCESS_COUNT"), r = t.getVariable("GAME_SCORE"), a = t.getVariable("GAME_USER_OPTION").hookSpeed;
        if (a) return a(i, r);
        switch (!0) {
            case i < 1:
                n = 0;
                break;
            case i < 10:
                n = 1;
                break;
            case i < 20:
                n = .8;
                break;
            case i < 30:
                n = .7;
                break;
            default:
                n = .74
        }
        return t.getVariable("HARD_MODE") && (n = 1.1), Math.sin(e / (200 / n))
    }, I = function (t, e) {
        var n = t.getVariable("SUCCESS_COUNT"), i = t.getVariable("GAME_SCORE"), r = t.getVariable("GAME_USER_OPTION").landBlockSpeed;
        if (r) return r(n, i);
        var a, o = t.width;
        switch (!0) {
            case n < 5:
                a = 0;
                break;
            case n < 13:
                a = .001;
                break;
            case n < 23:
                a = .002;
                break;
            default:
                a = .003
        }
        return Math.cos(e / 200) * a * o
    }, S = function (t) {
        return t.checkTimeMovement("HOOK_DOWN_MOVEMENT") ? "HOOK_DOWN" : t.checkTimeMovement("HOOK_UP_MOVEMENT") ? "HOOK_UP" : "HOOK_NORMAL"
    }, N = function (t) {
        if (t.getVariable("GAME_START_NOW") && !(t.debug && t.paused || "HOOK_NORMAL" !== S(t))) {
            t.removeInstance("tutorial"), t.removeInstance("tutorial-arrow");
            var e = t.getInstance("block_".concat(t.getVariable("BLOCK_COUNT")));
            e && "SWING" === e.status && (t.setTimeMovement("HOOK_UP_MOVEMENT", 500), e.status = "BEFORE_DROP")
        }
    }, C = function (t) {
        var e = t.getVariable("GAME_USER_OPTION").setGameFailed, n = t.getVariable("FAILED_COUNT") + 1;
        t.setVariable("FAILED_COUNT", n), t.setVariable("PERFECT_COUNT", 0), e && e(n), n >= 3 && (t.pauseAudio("bgm"), t.playAudio("game-over"), t.setVariable("GAME_START_NOW", !1))
    }, L = function (t, e) {
        var n = t.getVariable("GAME_USER_OPTION"), i = n.setGameScore, r = n.successScore, a = n.perfectScore, o = t.getVariable("PERFECT_COUNT", 0), s = e ? o + 1 : 0, u = t.getVariable("GAME_SCORE") + (r || 25) + (a || 25) * s;
        t.setVariable("GAME_SCORE", u), t.setVariable("PERFECT_COUNT", s), i && i(u)
    }, V = function (t, e) {
        var n = e.string, i = e.size, r = e.x, a = e.y, o = e.textAlign, s = t.ctx, u = i, c = .1 * u;
        s.save(), s.beginPath();
        var l = s.createLinearGradient(0, 0, 0, a);
        l.addColorStop(0, "#FAD961"), l.addColorStop(1, "#F76B1C"), s.fillStyle = l, s.lineWidth = c, s.strokeStyle = "#FFF", s.textAlign = o || "center", s.font = "".concat(u, "px ").concat("Vazir"), s.strokeText(n, r, a), s.fillText(n, r, a), s.restore()
    }, P = function (t, e, n) {
        var i = e + 1 >= t.length ? t.length - 1 : e, r = t[i], a = t[i + 1 >= t.length - 1 ? i : i + 1], o = function (t) {
            var e = r[t], i = a[t];
            return Math.round(e + (i - e) * n)
        };
        return "rgb(".concat(o(0), ", ").concat(o(1), ", ").concat(o(2), ")")
    }, R = function (t) {
        !function (t) {
            var e = t.ctx.createLinearGradient(0, 0, 0, t.height), n = [[200, 255, 150], [105, 230, 240], [90, 190, 240], [85, 100, 190], [55, 20, 35], [75, 25, 35], [25, 0, 10]],
                i = t.getVariable("BACKGROUND_LINEAR_GRADIENT_OFFSET_HEIGHT", 0);
            _(t) && t.setVariable("BACKGROUND_LINEAR_GRADIENT_OFFSET_HEIGHT", i + 1.5 * k(t));
            var r = parseInt(i / t.height, 10), a = i % t.height / t.height, o = P(n, r, a), s = P(n, r + 1, a);
            e.addColorStop(0, s), e.addColorStop(1, o), t.ctx.fillStyle = e, t.ctx.beginPath(), t.ctx.rect(0, 0, t.width, t.height), t.ctx.fill();
            var u = function () {
                t.ctx.fillStyle = "rgba(255, 255, 255, 0.7)", t.ctx.fillRect(0, 0, t.width, t.height)
            };
            t.getTimeMovement("LIGHTNING_MOVEMENT", [], (function () {
            }), {before: u, after: u})
        }(t), function (t) {
            var e = t.getImg("background"), n = e.width, i = e.height * t.width / n, r = t.getVariable("BACKGROUND_IMG_OFFSET_HEIGHT", t.height - i);
            r > t.height || (t.getTimeMovement("MOVE_DOWN_MOVEMENT", [[r, r + k(t, {
                pixelsPerFrame: function (t) {
                    return t / 2
                }
            })]], (function (t) {
                r = t
            }), {name: "background"}), t.getTimeMovement("BG_INIT_MOVEMENT", [[r, r + i / 4]], (function (t) {
                r = t
            })), t.setVariable("BACKGROUND_IMG_OFFSET_HEIGHT", r), t.setVariable("LINE_INITIAL_OFFSET", t.height - .394 * i), t.ctx.drawImage(e, 0, r, t.width, i))
        }(t)
    }, D = function (t, e, n) {
        var i = t;
        i.ready || (i.y = e.getVariable("LINE_INITIAL_OFFSET"), i.ready = !0, i.collisionX = e.width - e.getVariable("BLOCK_WIDTH")), e.getTimeMovement("MOVE_DOWN_MOVEMENT", [[t.y, t.y + k(e, {
            pixelsPerFrame: function (t) {
                return t / 2
            }
        })]], (function (e) {
            t.y = e
        }), {name: "line"});
        var r = I(e, n);
        t.x += r, t.collisionX += r
    }, F = function (t, e) {
        var n = e.ctx;
        e.debug && (n.save(), n.beginPath(), n.strokeStyle = "red", n.moveTo(t.x, t.y), n.lineTo(t.collisionX, t.y), n.lineWidth = 1, n.stroke(), n.restore())
    }, j = function (t) {
        var e = t.count, n = function (t) {
            return t[Math.floor(Math.random() * t.length)]
        };
        t.imgName = n(e > 6 ? ["c4", "c5", "c6", "c7", "c8"] : ["c1", "c2", "c3"])
    }, H = function (t, e) {
        if (!t.ready) {
            t.ready = !0, j(t), t.width = e.getVariable("CLOUD_SIZE"), t.height = e.getVariable("CLOUD_SIZE");
            var n = e.width, i = e.height, r = [{x: .1 * n, y: .66 * -i}, {x: .65 * n, y: .33 * -i}, {x: .1 * n, y: 0}, {x: .65 * n, y: .33 * i}][t.index - 1];
            t.x = e.utils.random(r.x, 1.2 * r.x), t.originX = t.x, t.ax = e.pixelsPerFrame(t.width * e.utils.random(.05, .08) * e.utils.randomPositiveNegative()), t.y = e.utils.random(r.y, 1.2 * r.y)
        }
        t.x += t.ax, (t.x >= t.originX + t.width || t.x <= t.originX - t.width) && (t.ax *= -1), _(e) && (t.y += 1.2 * k(e)), t.y >= e.height && (t.y = .66 * -e.height, t.count += 4, j(t))
    }, U = function (t, e) {
        var n = e.ctx, i = e.getImg(t.imgName);
        n.drawImage(i, t.x, t.y, t.width, t.height)
    }, G = function (t, e, n) {
        var i = e.getVariable("ROPE_HEIGHT");
        t.ready || (t.x = e.width / 2, t.y = -1.5 * i, t.ready = !0), e.getTimeMovement("HOOK_UP_MOVEMENT", [[t.y, t.y - i]], (function (e) {
            t.y = e
        }), {
            after: function () {
                t.y = -1.5 * i
            }
        }), e.getTimeMovement("HOOK_DOWN_MOVEMENT", [[t.y, t.y + i]], (function (e) {
            t.y = e
        }), {name: "hook"});
        var r = e.getVariable("INITIAL_ANGLE");
        t.angle = r * M(e, n), t.weightX = t.x + Math.sin(t.angle) * i, t.weightY = t.y + Math.cos(t.angle) * i
    }, W = function (t, e) {
        var n = e.ctx, i = e.getVariable("ROPE_HEIGHT"), r = .1 * i, a = e.getImg("hook");
        n.save(), n.translate(t.x, t.y), n.rotate(2 * Math.PI - t.angle), n.translate(-t.x, -t.y), e.ctx.drawImage(a, t.x - r / 2, t.y, r, i + 5), n.restore()
    }, B = function (t, e, n) {
        var i = e.width, r = e.height, a = t.name;
        if (!t.ready) {
            t.ready = !0;
            var o = .2 * i;
            t.updateWidth(o), t.height = .46 * o, t.x = e.calWidth - t.calWidth, t.y = .45 * r, "tutorial" !== a && (t.y += 1.2 * t.height)
        }
        "tutorial" !== a && (t.y += Math.cos(n / 200) * t.height * .01)
    }, K = function (t, e) {
        if (!e.checkTimeMovement("TUTORIAL_MOVEMENT") && "HOOK_NORMAL" === S(e)) {
            var n = e.ctx, i = t.name, r = e.getImg(i);
            n.drawImage(r, t.x, t.y, t.width, t.height)
        }
    }, X = function (t, e) {
        "ROTATE_LEFT" === t.status ? t.y - t.width >= e.height && (t.visible = !1, t.status = A, C(e)) : t.y >= e.height && (t.visible = !1, t.status = A, C(e))
    }, $ = function (t, e, n) {
        var i = t, r = e.getVariable("ROPE_HEIGHT");
        if (i.visible) {
            i.ready || (i.ready = !0, i.status = "SWING", t.updateWidth(e.getVariable("BLOCK_WIDTH")), t.updateHeight(e.getVariable("BLOCK_HEIGHT")), t.x = e.width / 2, t.y = -1.5 * r);
            var a = e.getInstance("line");
            switch (i.status) {
                case"SWING":
                    e.getTimeMovement("HOOK_DOWN_MOVEMENT", [[t.y, t.y + r]], (function (e) {
                        t.y = e
                    }), {name: "block"}), function (t, e, n) {
                        var i = e.getVariable("ROPE_HEIGHT");
                        if ("SWING" === t.status) {
                            var r = t, a = e.getVariable("INITIAL_ANGLE");
                            r.angle = a * M(e, n), r.weightX = r.x + Math.sin(r.angle) * i, r.weightY = r.y + Math.cos(r.angle) * i
                        }
                    }(t, e, n);
                    break;
                case"BEFORE_DROP":
                    i.x = t.weightX - t.calWidth, i.y = t.weightY + .3 * t.height, i.rotate = 0, i.ay = e.pixelsPerFrame(3e-4 * e.height), i.startDropTime = n, i.status = "DROP";
                    break;
                case"DROP":
                    var o = n - i.startDropTime;
                    i.startDropTime = n, i.vy += i.ay * o, i.y += i.vy * o + .5 * i.ay * Math.pow(o, 2);
                    var s = function (t, e) {
                        return t.y + t.height >= e.y ? t.x < e.x - t.calWidth || t.x > e.collisionX + t.calWidth ? 1 : t.x < e.x ? 2 : t.x > e.collisionX ? 3 : t.x > e.x + .8 * t.calWidth && t.x < e.x + 1.2 * t.calWidth ? 5 : 4 : 0
                    }(t, a), u = a.y - t.height, c = function (t) {
                        t.originOutwardAngle = Math.atan(t.height / t.outwardOffset), t.originHypotenuse = Math.sqrt(Math.pow(t.height, 2) + Math.pow(t.outwardOffset, 2)), e.playAudio("rotate")
                    };
                    switch (s) {
                        case 1:
                            X(t, e);
                            break;
                        case 2:
                            i.status = "ROTATE_LEFT", t.y = u, t.outwardOffset = a.x + t.calWidth - t.x, c(t);
                            break;
                        case 3:
                            i.status = "ROTATE_RIGHT", t.y = u, t.outwardOffset = a.collisionX + t.calWidth - t.x, c(t);
                            break;
                        case 4:
                        case 5:
                            i.status = w;
                            var l = e.getVariable("SUCCESS_COUNT");
                            !function (t) {
                                var e = t.getVariable("GAME_USER_OPTION").setGameSuccess, n = t.getVariable("SUCCESS_COUNT") + 1;
                                t.setVariable("SUCCESS_COUNT", n), t.getVariable("HARD_MODE") && t.setVariable("ROPE_HEIGHT", t.height * t.utils.random(.35, .55)), e && e(n)
                            }(e), e.setTimeMovement("MOVE_DOWN_MOVEMENT", 500), 10 !== l && 15 !== l || e.setTimeMovement("LIGHTNING_MOVEMENT", 150), t.y = u, a.y = u, a.x = i.x - i.calWidth, a.collisionX = a.x + i.width;
                            var h = .3 * i.width;
                            (i.x > e.width - 2 * h || i.x < -h) && e.setVariable("HARD_MODE", !0), 5 === s ? (t.perfect = !0, L(e, !0), e.playAudio("drop-perfect")) : (L(e), e.playAudio("drop"))
                    }
                    break;
                case w:
                    e.getTimeMovement("MOVE_DOWN_MOVEMENT", [[t.y, t.y + k(e, {
                        pixelsPerFrame: function (t) {
                            return t / 2
                        }
                    })]], (function (n) {
                        t.visible && (t.y = n, t.y > e.height && (t.visible = !1))
                    }), {name: t.name}), t.x += I(e, n);
                    break;
                case"ROTATE_LEFT":
                case"ROTATE_RIGHT":
                    var f = "ROTATE_RIGHT" === i.status, d = e.pixelsPerFrame(4 * Math.PI), p = f ? 1 : -1;
                    if (f ? t.rotate > 1.3 : t.rotate < -1.3) t.rotate += d / 8 * p, t.y += e.pixelsPerFrame(.7 * e.height), t.x += e.pixelsPerFrame(.3 * e.width) * p; else {
                        var g = (t.calWidth - t.outwardOffset) / t.calWidth;
                        g = g > .5 ? g : .5, t.rotate += d * g * p;
                        var v = t.originOutwardAngle + t.rotate, m = f ? a.collisionX + t.calWidth : a.x + t.calWidth, y = a.y;
                        t.x = m - Math.cos(v) * t.originHypotenuse, t.y = y - Math.sin(v) * t.originHypotenuse
                    }
                    X(t, e)
            }
        }
    }, z = function (t, e) {
        var n = t.perfect, i = e.getImg(n ? "block-perfect" : "block");
        e.ctx.drawImage(i, t.x, t.y, t.width, t.height)
    }, Z = function (t, e) {
        switch (t.status) {
            case"SWING":
                !function (t, e) {
                    var n = e.getImg("blockRope");
                    e.ctx.drawImage(n, t.weightX - t.calWidth, t.weightY, t.width, 1.3 * t.height);
                    var i = t.weightX - t.calWidth;
                    e.debugLineY(i)
                }(t, e);
                break;
            case"DROP":
            case w:
                z(t, e);
                break;
            case"ROTATE_LEFT":
            case"ROTATE_RIGHT":
                !function (t, e) {
                    var n = e.ctx;
                    n.save(), n.translate(t.x, t.y), n.rotate(t.rotate), n.translate(-t.x, -t.y), z(t, e), n.restore()
                }(t, e)
        }
    }, q = function (t, e) {
        var n = t.visible, i = t.ready, r = t.type;
        if (n) {
            var a = e.getVariable("CLOUD_SIZE");
            if (!i) {
                var o = function (t, e) {
                    var n = t.width, i = t.height, r = t.utils.random, a = t.getVariable("CLOUD_SIZE");
                    return {
                        bottomToTop: {x: n * r(.3, .7), y: i, vx: 0, vy: .7 * t.pixelsPerFrame(i) * -1},
                        leftToRight: {x: -1 * a, y: i * r(.3, .6), vx: .4 * t.pixelsPerFrame(n), vy: .1 * t.pixelsPerFrame(i) * -1},
                        rightToLeft: {x: n, y: i * r(.2, .5), vx: .4 * t.pixelsPerFrame(n) * -1, vy: .1 * t.pixelsPerFrame(i)},
                        rightTopToLeft: {x: n, y: 0, vx: .6 * t.pixelsPerFrame(n) * -1, vy: .5 * t.pixelsPerFrame(i)}
                    }[e]
                }(e, r);
                t.ready = !0, t.width = a, t.height = a, t.x = o.x, t.y = o.y, t.vx = o.vx, t.vy = o.vy
            }
            t.x += t.vx, t.y += t.vy, (t.y + a < 0 || t.y > e.height || t.x + a < 0 || t.x > e.width) && (t.visible = !1)
        }
    }, Y = function (t, e) {
        var n = e.ctx, i = e.getImg(t.imgName);
        n.drawImage(i, t.x, t.y, t.width, t.height)
    }, J = function (t, e, n) {
        if (t.getVariable("FLIGHT_COUNT") !== e) {
            var i = new O({name: "flight_".concat(e), action: q, painter: Y});
            i.imgName = "f".concat(e), i.type = n, t.addInstance(i, "FLIGHT_LAYER"), t.setVariable("FLIGHT_COUNT", e)
        }
    }, Q = function (t) {
        if (t.getVariable("GAME_START_NOW")) {
            var e = t.getVariable("SUCCESS_COUNT", 0), n = t.getVariable("FAILED_COUNT"), i = t.getVariable("GAME_SCORE", 0), r = Number(e) > 99 ? .1 * t.width : 0;
            V(t, {string: "طبقه", size: .06 * t.width, x: .24 * t.width + r, y: .12 * t.width, textAlign: "left"}), V(t, {string: e, size: .17 * t.width, x: .22 * t.width + r, y: .2 * t.width, textAlign: "right"});
            var a = t.getImg("score"), o = a.width, s = a.height, u = .35 * t.width, c = s * u / o;
            t.ctx.drawImage(a, .61 * t.width, .038 * t.width, u, c), V(t, {string: i, size: .06 * t.width, x: .9 * t.width, y: .11 * t.width, textAlign: "right"});
            for (var l = t.ctx, h = t.getImg("heart"), f = h.width, d = h.height, p = .08 * t.width, g = d * p / f, v = 1; v <= 3; v += 1) l.save(), v <= n && (l.globalAlpha = .2), l.drawImage(h, .66 * t.width + (v - 1) * p, .16 * t.width, p, g), l.restore()
        }
    }, tt = function (t) {
        if (t.getVariable("GAME_START_NOW")) {
            var e = t.getInstance("block_".concat(t.getVariable("BLOCK_COUNT")));
            if (!e || [w, A].indexOf(e.status) > -1) {
                if (_(t) && k(t)) return;
                if (t.checkTimeMovement("HOOK_UP_MOVEMENT")) return;
                var n = function (t) {
                    var e = t.getVariable("SUCCESS_COUNT"), n = t.getVariable("GAME_SCORE"), i = t.getVariable("GAME_USER_OPTION").hookAngle;
                    if (i) return i(e, n);
                    if (t.getVariable("HARD_MODE")) return 90;
                    switch (!0) {
                        case e < 10:
                            return 30;
                        case e < 20:
                            return 60;
                        default:
                            return 80
                    }
                }(t), i = Math.PI * t.utils.random(n, n + 5) * t.utils.randomPositiveNegative() / 180;
                t.setVariable("BLOCK_COUNT", t.getVariable("BLOCK_COUNT") + 1), t.setVariable("INITIAL_ANGLE", i), t.setTimeMovement("HOOK_DOWN_MOVEMENT", 500);
                var r = new O({name: "block_".concat(t.getVariable("BLOCK_COUNT")), action: $, painter: Z});
                t.addInstance(r)
            }
            switch (Number(t.getVariable("SUCCESS_COUNT", 0))) {
                case 2:
                    J(t, 1, "leftToRight");
                    break;
                case 6:
                    J(t, 2, "rightToLeft");
                    break;
                case 8:
                    J(t, 3, "leftToRight");
                    break;
                case 14:
                    J(t, 4, "bottomToTop");
                    break;
                case 18:
                    J(t, 5, "bottomToTop");
                    break;
                case 22:
                    J(t, 6, "bottomToTop");
                    break;
                case 25:
                    J(t, 7, "rightTopToLeft")
            }
        }
    };
    n(0);
    window.TowerGameJS = function () {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, e = t.width, n = t.height, i = t.canvasId, r = t.soundOn, a = new E({canvasId: i, highResolution: !0, width: e, height: n, soundOn: r}), o = function (t) {
            return "./assets/img/games/tower/".concat(t)
        };
        a.addImg("background", o("background.png")), a.addImg("hook", o("hook.png")), a.addImg("blockRope", o("block-rope.png")), a.addImg("block", o("block.png")), a.addImg("block-perfect", o("block-perfect.png"));
        for (var s = 1; s <= 8; s += 1) a.addImg("c".concat(s), o("c".concat(s, ".png")));
        a.addLayer("FLIGHT_LAYER");
        for (var u = 1; u <= 7; u += 1) a.addImg("f".concat(u), o("f".concat(u, ".png")));
        a.swapLayer(0, 1), a.addImg("tutorial-arrow", o("tutorial-arrow.png")), a.addImg("heart", o("heart.png")), a.addImg("score", o("score.png")), a.addAudio("drop-perfect", o("drop-perfect.mp3")), a.addAudio("drop", o("drop.mp3")), a.addAudio("game-over", o("game-over.mp3")), a.addAudio("rotate", o("rotate.mp3")), a.addAudio("bgm", o("bgm.mp3")), a.setVariable("BLOCK_WIDTH", .25 * a.width), a.setVariable("BLOCK_HEIGHT", .71 * a.getVariable("BLOCK_WIDTH")), a.setVariable("CLOUD_SIZE", .3 * a.width), a.setVariable("ROPE_HEIGHT", .4 * a.height), a.setVariable("BLOCK_COUNT", 0), a.setVariable("SUCCESS_COUNT", 0), a.setVariable("FAILED_COUNT", 0), a.setVariable("GAME_SCORE", 0), a.setVariable("HARD_MODE", !1), a.setVariable("GAME_USER_OPTION", t);
        for (var c = 1; c <= 4; c += 1) {
            var l = new O({name: "cloud_".concat(c), action: H, painter: U});
            l.index = c, l.count = 5 - c, a.addInstance(l)
        }
        var h = new O({name: "line", action: D, painter: F});
        a.addInstance(h);
        var f = new O({name: "hook", action: G, painter: W});
        return a.addInstance(f), a.startAnimate = tt, a.endAnimate = Q, a.paintUnderInstance = R, a.addKeyDownListener("enter", (function () {
            a.debug && a.togglePaused()
        })), a.touchStartListener = function () {
            N(a)
        }, a.playBgm = function () {
            a.playAudio("bgm", !0)
        }, a.pauseBgm = function () {
            a.pauseAudio("bgm")
        }, a.start = function () {
            var t = new O({name: "tutorial-arrow", action: B, painter: K});
            a.addInstance(t), a.setTimeMovement("BG_INIT_MOVEMENT", 500), a.setTimeMovement("TUTORIAL_MOVEMENT", 500), a.setVariable("GAME_START_NOW", !0)
        }, a
    }
}]);
