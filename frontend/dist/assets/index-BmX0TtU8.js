var Dp = (e) => {
  throw TypeError(e)
}
var tl = (e, t, r) => t.has(e) || Dp('Cannot ' + r)
var _ = (e, t, r) => (
    tl(e, t, 'read from private field'), r ? r.call(e) : t.get(e)
  ),
  ee = (e, t, r) =>
    t.has(e)
      ? Dp('Cannot add the same private member more than once')
      : t instanceof WeakSet
        ? t.add(e)
        : t.set(e, r),
  K = (e, t, r, n) => (
    tl(e, t, 'write to private field'), n ? n.call(e, r) : t.set(e, r), r
  ),
  ce = (e, t, r) => (tl(e, t, 'access private method'), r)
var cs = (e, t, r, n) => ({
  set _(i) {
    K(e, t, i, r)
  },
  get _() {
    return _(e, t, n)
  },
})
import {
  r as A,
  a as eA,
  g as me,
  R as E,
  b as ai,
  c as us,
  L as Ds,
  u as K0,
  d as tA,
  e as rA,
} from './vendor-BX--ECl8.js'
;(function () {
  const t = document.createElement('link').relList
  if (t && t.supports && t.supports('modulepreload')) return
  for (const i of document.querySelectorAll('link[rel="modulepreload"]')) n(i)
  new MutationObserver((i) => {
    for (const a of i)
      if (a.type === 'childList')
        for (const o of a.addedNodes)
          o.tagName === 'LINK' && o.rel === 'modulepreload' && n(o)
  }).observe(document, { childList: !0, subtree: !0 })
  function r(i) {
    const a = {}
    return (
      i.integrity && (a.integrity = i.integrity),
      i.referrerPolicy && (a.referrerPolicy = i.referrerPolicy),
      i.crossOrigin === 'use-credentials'
        ? (a.credentials = 'include')
        : i.crossOrigin === 'anonymous'
          ? (a.credentials = 'omit')
          : (a.credentials = 'same-origin'),
      a
    )
  }
  function n(i) {
    if (i.ep) return
    i.ep = !0
    const a = r(i)
    fetch(i.href, a)
  }
})()
var G0 = { exports: {} },
  Xc = {}
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var nA = A,
  iA = Symbol.for('react.element'),
  aA = Symbol.for('react.fragment'),
  oA = Object.prototype.hasOwnProperty,
  sA = nA.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
  cA = { key: !0, ref: !0, __self: !0, __source: !0 }
function V0(e, t, r) {
  var n,
    i = {},
    a = null,
    o = null
  r !== void 0 && (a = '' + r),
    t.key !== void 0 && (a = '' + t.key),
    t.ref !== void 0 && (o = t.ref)
  for (n in t) oA.call(t, n) && !cA.hasOwnProperty(n) && (i[n] = t[n])
  if (e && e.defaultProps)
    for (n in ((t = e.defaultProps), t)) i[n] === void 0 && (i[n] = t[n])
  return { $$typeof: iA, type: e, key: a, ref: o, props: i, _owner: sA.current }
}
Xc.Fragment = aA
Xc.jsx = V0
Xc.jsxs = V0
G0.exports = Xc
var O = G0.exports,
  Wl = {},
  Lp = eA
;(Wl.createRoot = Lp.createRoot), (Wl.hydrateRoot = Lp.hydrateRoot)
var ca = class {
    constructor() {
      ;(this.listeners = new Set()),
        (this.subscribe = this.subscribe.bind(this))
    }
    subscribe(e) {
      return (
        this.listeners.add(e),
        this.onSubscribe(),
        () => {
          this.listeners.delete(e), this.onUnsubscribe()
        }
      )
    }
    hasListeners() {
      return this.listeners.size > 0
    }
    onSubscribe() {}
    onUnsubscribe() {}
  },
  Mn = typeof window > 'u' || 'Deno' in globalThis
function _t() {}
function uA(e, t) {
  return typeof e == 'function' ? e(t) : e
}
function ql(e) {
  return typeof e == 'number' && e >= 0 && e !== 1 / 0
}
function X0(e, t) {
  return Math.max(e + (t || 0) - Date.now(), 0)
}
function li(e, t) {
  return typeof e == 'function' ? e(t) : e
}
function Ht(e, t) {
  return typeof e == 'function' ? e(t) : e
}
function Bp(e, t) {
  const {
    type: r = 'all',
    exact: n,
    fetchStatus: i,
    predicate: a,
    queryKey: o,
    stale: s,
  } = e
  if (o) {
    if (n) {
      if (t.queryHash !== Vd(o, t.options)) return !1
    } else if (!ro(t.queryKey, o)) return !1
  }
  if (r !== 'all') {
    const c = t.isActive()
    if ((r === 'active' && !c) || (r === 'inactive' && c)) return !1
  }
  return !(
    (typeof s == 'boolean' && t.isStale() !== s) ||
    (i && i !== t.state.fetchStatus) ||
    (a && !a(t))
  )
}
function Fp(e, t) {
  const { exact: r, status: n, predicate: i, mutationKey: a } = e
  if (a) {
    if (!t.options.mutationKey) return !1
    if (r) {
      if (Nn(t.options.mutationKey) !== Nn(a)) return !1
    } else if (!ro(t.options.mutationKey, a)) return !1
  }
  return !((n && t.state.status !== n) || (i && !i(t)))
}
function Vd(e, t) {
  return ((t == null ? void 0 : t.queryKeyHashFn) || Nn)(e)
}
function Nn(e) {
  return JSON.stringify(e, (t, r) =>
    Hl(r)
      ? Object.keys(r)
          .sort()
          .reduce((n, i) => ((n[i] = r[i]), n), {})
      : r,
  )
}
function ro(e, t) {
  return e === t
    ? !0
    : typeof e != typeof t
      ? !1
      : e && t && typeof e == 'object' && typeof t == 'object'
        ? !Object.keys(t).some((r) => !ro(e[r], t[r]))
        : !1
}
function Y0(e, t) {
  if (e === t) return e
  const r = Up(e) && Up(t)
  if (r || (Hl(e) && Hl(t))) {
    const n = r ? e : Object.keys(e),
      i = n.length,
      a = r ? t : Object.keys(t),
      o = a.length,
      s = r ? [] : {}
    let c = 0
    for (let u = 0; u < o; u++) {
      const l = r ? u : a[u]
      ;((!r && n.includes(l)) || r) && e[l] === void 0 && t[l] === void 0
        ? ((s[l] = void 0), c++)
        : ((s[l] = Y0(e[l], t[l])), s[l] === e[l] && e[l] !== void 0 && c++)
    }
    return i === o && c === i ? e : s
  }
  return t
}
function Ls(e, t) {
  if (!t || Object.keys(e).length !== Object.keys(t).length) return !1
  for (const r in e) if (e[r] !== t[r]) return !1
  return !0
}
function Up(e) {
  return Array.isArray(e) && e.length === Object.keys(e).length
}
function Hl(e) {
  if (!Wp(e)) return !1
  const t = e.constructor
  if (t === void 0) return !0
  const r = t.prototype
  return !(
    !Wp(r) ||
    !r.hasOwnProperty('isPrototypeOf') ||
    Object.getPrototypeOf(e) !== Object.prototype
  )
}
function Wp(e) {
  return Object.prototype.toString.call(e) === '[object Object]'
}
function lA(e) {
  return new Promise((t) => {
    setTimeout(t, e)
  })
}
function zl(e, t, r) {
  return typeof r.structuralSharing == 'function'
    ? r.structuralSharing(e, t)
    : r.structuralSharing !== !1
      ? Y0(e, t)
      : t
}
function fA(e, t, r = 0) {
  const n = [...e, t]
  return r && n.length > r ? n.slice(1) : n
}
function dA(e, t, r = 0) {
  const n = [t, ...e]
  return r && n.length > r ? n.slice(0, -1) : n
}
var Xd = Symbol()
function Q0(e, t) {
  return !e.queryFn && t != null && t.initialPromise
    ? () => t.initialPromise
    : !e.queryFn || e.queryFn === Xd
      ? () => Promise.reject(new Error(`Missing queryFn: '${e.queryHash}'`))
      : e.queryFn
}
var Sn,
  qr,
  vi,
  R0,
  hA =
    ((R0 = class extends ca {
      constructor() {
        super()
        ee(this, Sn)
        ee(this, qr)
        ee(this, vi)
        K(this, vi, (t) => {
          if (!Mn && window.addEventListener) {
            const r = () => t()
            return (
              window.addEventListener('visibilitychange', r, !1),
              () => {
                window.removeEventListener('visibilitychange', r)
              }
            )
          }
        })
      }
      onSubscribe() {
        _(this, qr) || this.setEventListener(_(this, vi))
      }
      onUnsubscribe() {
        var t
        this.hasListeners() ||
          ((t = _(this, qr)) == null || t.call(this), K(this, qr, void 0))
      }
      setEventListener(t) {
        var r
        K(this, vi, t),
          (r = _(this, qr)) == null || r.call(this),
          K(
            this,
            qr,
            t((n) => {
              typeof n == 'boolean' ? this.setFocused(n) : this.onFocus()
            }),
          )
      }
      setFocused(t) {
        _(this, Sn) !== t && (K(this, Sn, t), this.onFocus())
      }
      onFocus() {
        const t = this.isFocused()
        this.listeners.forEach((r) => {
          r(t)
        })
      }
      isFocused() {
        var t
        return typeof _(this, Sn) == 'boolean'
          ? _(this, Sn)
          : ((t = globalThis.document) == null ? void 0 : t.visibilityState) !==
              'hidden'
      }
    }),
    (Sn = new WeakMap()),
    (qr = new WeakMap()),
    (vi = new WeakMap()),
    R0),
  Yd = new hA(),
  yi,
  Hr,
  mi,
  D0,
  pA =
    ((D0 = class extends ca {
      constructor() {
        super()
        ee(this, yi, !0)
        ee(this, Hr)
        ee(this, mi)
        K(this, mi, (t) => {
          if (!Mn && window.addEventListener) {
            const r = () => t(!0),
              n = () => t(!1)
            return (
              window.addEventListener('online', r, !1),
              window.addEventListener('offline', n, !1),
              () => {
                window.removeEventListener('online', r),
                  window.removeEventListener('offline', n)
              }
            )
          }
        })
      }
      onSubscribe() {
        _(this, Hr) || this.setEventListener(_(this, mi))
      }
      onUnsubscribe() {
        var t
        this.hasListeners() ||
          ((t = _(this, Hr)) == null || t.call(this), K(this, Hr, void 0))
      }
      setEventListener(t) {
        var r
        K(this, mi, t),
          (r = _(this, Hr)) == null || r.call(this),
          K(this, Hr, t(this.setOnline.bind(this)))
      }
      setOnline(t) {
        _(this, yi) !== t &&
          (K(this, yi, t),
          this.listeners.forEach((n) => {
            n(t)
          }))
      }
      isOnline() {
        return _(this, yi)
      }
    }),
    (yi = new WeakMap()),
    (Hr = new WeakMap()),
    (mi = new WeakMap()),
    D0),
  Bs = new pA()
function Kl() {
  let e, t
  const r = new Promise((i, a) => {
    ;(e = i), (t = a)
  })
  ;(r.status = 'pending'), r.catch(() => {})
  function n(i) {
    Object.assign(r, i), delete r.resolve, delete r.reject
  }
  return (
    (r.resolve = (i) => {
      n({ status: 'fulfilled', value: i }), e(i)
    }),
    (r.reject = (i) => {
      n({ status: 'rejected', reason: i }), t(i)
    }),
    r
  )
}
function vA(e) {
  return Math.min(1e3 * 2 ** e, 3e4)
}
function Z0(e) {
  return (e ?? 'online') === 'online' ? Bs.isOnline() : !0
}
var J0 = class extends Error {
  constructor(e) {
    super('CancelledError'),
      (this.revert = e == null ? void 0 : e.revert),
      (this.silent = e == null ? void 0 : e.silent)
  }
}
function rl(e) {
  return e instanceof J0
}
function eb(e) {
  let t = !1,
    r = 0,
    n = !1,
    i
  const a = Kl(),
    o = (v) => {
      var p
      n || (d(new J0(v)), (p = e.abort) == null || p.call(e))
    },
    s = () => {
      t = !0
    },
    c = () => {
      t = !1
    },
    u = () =>
      Yd.isFocused() &&
      (e.networkMode === 'always' || Bs.isOnline()) &&
      e.canRun(),
    l = () => Z0(e.networkMode) && e.canRun(),
    f = (v) => {
      var p
      n ||
        ((n = !0),
        (p = e.onSuccess) == null || p.call(e, v),
        i == null || i(),
        a.resolve(v))
    },
    d = (v) => {
      var p
      n ||
        ((n = !0),
        (p = e.onError) == null || p.call(e, v),
        i == null || i(),
        a.reject(v))
    },
    h = () =>
      new Promise((v) => {
        var p
        ;(i = (x) => {
          ;(n || u()) && v(x)
        }),
          (p = e.onPause) == null || p.call(e)
      }).then(() => {
        var v
        ;(i = void 0), n || (v = e.onContinue) == null || v.call(e)
      }),
    y = () => {
      if (n) return
      let v
      const p = r === 0 ? e.initialPromise : void 0
      try {
        v = p ?? e.fn()
      } catch (x) {
        v = Promise.reject(x)
      }
      Promise.resolve(v)
        .then(f)
        .catch((x) => {
          var S
          if (n) return
          const b = e.retry ?? (Mn ? 0 : 3),
            w = e.retryDelay ?? vA,
            g = typeof w == 'function' ? w(r, x) : w,
            m =
              b === !0 ||
              (typeof b == 'number' && r < b) ||
              (typeof b == 'function' && b(r, x))
          if (t || !m) {
            d(x)
            return
          }
          r++,
            (S = e.onFail) == null || S.call(e, r, x),
            lA(g)
              .then(() => (u() ? void 0 : h()))
              .then(() => {
                t ? d(x) : y()
              })
        })
    }
  return {
    promise: a,
    cancel: o,
    continue: () => (i == null || i(), a),
    cancelRetry: s,
    continueRetry: c,
    canStart: l,
    start: () => (l() ? y() : h().then(y), a),
  }
}
function yA() {
  let e = [],
    t = 0,
    r = (s) => {
      s()
    },
    n = (s) => {
      s()
    },
    i = (s) => setTimeout(s, 0)
  const a = (s) => {
      t
        ? e.push(s)
        : i(() => {
            r(s)
          })
    },
    o = () => {
      const s = e
      ;(e = []),
        s.length &&
          i(() => {
            n(() => {
              s.forEach((c) => {
                r(c)
              })
            })
          })
    }
  return {
    batch: (s) => {
      let c
      t++
      try {
        c = s()
      } finally {
        t--, t || o()
      }
      return c
    },
    batchCalls:
      (s) =>
      (...c) => {
        a(() => {
          s(...c)
        })
      },
    schedule: a,
    setNotifyFunction: (s) => {
      r = s
    },
    setBatchNotifyFunction: (s) => {
      n = s
    },
    setScheduler: (s) => {
      i = s
    },
  }
}
var Fe = yA(),
  An,
  L0,
  tb =
    ((L0 = class {
      constructor() {
        ee(this, An)
      }
      destroy() {
        this.clearGcTimeout()
      }
      scheduleGc() {
        this.clearGcTimeout(),
          ql(this.gcTime) &&
            K(
              this,
              An,
              setTimeout(() => {
                this.optionalRemove()
              }, this.gcTime),
            )
      }
      updateGcTime(e) {
        this.gcTime = Math.max(
          this.gcTime || 0,
          e ?? (Mn ? 1 / 0 : 5 * 60 * 1e3),
        )
      }
      clearGcTimeout() {
        _(this, An) && (clearTimeout(_(this, An)), K(this, An, void 0))
      }
    }),
    (An = new WeakMap()),
    L0),
  gi,
  bi,
  Et,
  Ye,
  Wo,
  Pn,
  Ft,
  hr,
  B0,
  mA =
    ((B0 = class extends tb {
      constructor(t) {
        super()
        ee(this, Ft)
        ee(this, gi)
        ee(this, bi)
        ee(this, Et)
        ee(this, Ye)
        ee(this, Wo)
        ee(this, Pn)
        K(this, Pn, !1),
          K(this, Wo, t.defaultOptions),
          this.setOptions(t.options),
          (this.observers = []),
          K(this, Et, t.cache),
          (this.queryKey = t.queryKey),
          (this.queryHash = t.queryHash),
          K(this, gi, gA(this.options)),
          (this.state = t.state ?? _(this, gi)),
          this.scheduleGc()
      }
      get meta() {
        return this.options.meta
      }
      get promise() {
        var t
        return (t = _(this, Ye)) == null ? void 0 : t.promise
      }
      setOptions(t) {
        ;(this.options = { ..._(this, Wo), ...t }),
          this.updateGcTime(this.options.gcTime)
      }
      optionalRemove() {
        !this.observers.length &&
          this.state.fetchStatus === 'idle' &&
          _(this, Et).remove(this)
      }
      setData(t, r) {
        const n = zl(this.state.data, t, this.options)
        return (
          ce(this, Ft, hr).call(this, {
            data: n,
            type: 'success',
            dataUpdatedAt: r == null ? void 0 : r.updatedAt,
            manual: r == null ? void 0 : r.manual,
          }),
          n
        )
      }
      setState(t, r) {
        ce(this, Ft, hr).call(this, {
          type: 'setState',
          state: t,
          setStateOptions: r,
        })
      }
      cancel(t) {
        var n, i
        const r = (n = _(this, Ye)) == null ? void 0 : n.promise
        return (
          (i = _(this, Ye)) == null || i.cancel(t),
          r ? r.then(_t).catch(_t) : Promise.resolve()
        )
      }
      destroy() {
        super.destroy(), this.cancel({ silent: !0 })
      }
      reset() {
        this.destroy(), this.setState(_(this, gi))
      }
      isActive() {
        return this.observers.some((t) => Ht(t.options.enabled, this) !== !1)
      }
      isDisabled() {
        return this.getObserversCount() > 0
          ? !this.isActive()
          : this.options.queryFn === Xd ||
              this.state.dataUpdateCount + this.state.errorUpdateCount === 0
      }
      isStale() {
        return this.state.isInvalidated
          ? !0
          : this.getObserversCount() > 0
            ? this.observers.some((t) => t.getCurrentResult().isStale)
            : this.state.data === void 0
      }
      isStaleByTime(t = 0) {
        return (
          this.state.isInvalidated ||
          this.state.data === void 0 ||
          !X0(this.state.dataUpdatedAt, t)
        )
      }
      onFocus() {
        var r
        const t = this.observers.find((n) => n.shouldFetchOnWindowFocus())
        t == null || t.refetch({ cancelRefetch: !1 }),
          (r = _(this, Ye)) == null || r.continue()
      }
      onOnline() {
        var r
        const t = this.observers.find((n) => n.shouldFetchOnReconnect())
        t == null || t.refetch({ cancelRefetch: !1 }),
          (r = _(this, Ye)) == null || r.continue()
      }
      addObserver(t) {
        this.observers.includes(t) ||
          (this.observers.push(t),
          this.clearGcTimeout(),
          _(this, Et).notify({
            type: 'observerAdded',
            query: this,
            observer: t,
          }))
      }
      removeObserver(t) {
        this.observers.includes(t) &&
          ((this.observers = this.observers.filter((r) => r !== t)),
          this.observers.length ||
            (_(this, Ye) &&
              (_(this, Pn)
                ? _(this, Ye).cancel({ revert: !0 })
                : _(this, Ye).cancelRetry()),
            this.scheduleGc()),
          _(this, Et).notify({
            type: 'observerRemoved',
            query: this,
            observer: t,
          }))
      }
      getObserversCount() {
        return this.observers.length
      }
      invalidate() {
        this.state.isInvalidated ||
          ce(this, Ft, hr).call(this, { type: 'invalidate' })
      }
      fetch(t, r) {
        var c, u, l
        if (this.state.fetchStatus !== 'idle') {
          if (this.state.data !== void 0 && r != null && r.cancelRefetch)
            this.cancel({ silent: !0 })
          else if (_(this, Ye))
            return _(this, Ye).continueRetry(), _(this, Ye).promise
        }
        if ((t && this.setOptions(t), !this.options.queryFn)) {
          const f = this.observers.find((d) => d.options.queryFn)
          f && this.setOptions(f.options)
        }
        const n = new AbortController(),
          i = (f) => {
            Object.defineProperty(f, 'signal', {
              enumerable: !0,
              get: () => (K(this, Pn, !0), n.signal),
            })
          },
          a = () => {
            const f = Q0(this.options, r),
              d = { queryKey: this.queryKey, meta: this.meta }
            return (
              i(d),
              K(this, Pn, !1),
              this.options.persister ? this.options.persister(f, d, this) : f(d)
            )
          },
          o = {
            fetchOptions: r,
            options: this.options,
            queryKey: this.queryKey,
            state: this.state,
            fetchFn: a,
          }
        i(o),
          (c = this.options.behavior) == null || c.onFetch(o, this),
          K(this, bi, this.state),
          (this.state.fetchStatus === 'idle' ||
            this.state.fetchMeta !==
              ((u = o.fetchOptions) == null ? void 0 : u.meta)) &&
            ce(this, Ft, hr).call(this, {
              type: 'fetch',
              meta: (l = o.fetchOptions) == null ? void 0 : l.meta,
            })
        const s = (f) => {
          var d, h, y, v
          ;(rl(f) && f.silent) ||
            ce(this, Ft, hr).call(this, { type: 'error', error: f }),
            rl(f) ||
              ((h = (d = _(this, Et).config).onError) == null ||
                h.call(d, f, this),
              (v = (y = _(this, Et).config).onSettled) == null ||
                v.call(y, this.state.data, f, this)),
            this.scheduleGc()
        }
        return (
          K(
            this,
            Ye,
            eb({
              initialPromise: r == null ? void 0 : r.initialPromise,
              fn: o.fetchFn,
              abort: n.abort.bind(n),
              onSuccess: (f) => {
                var d, h, y, v
                if (f === void 0) {
                  s(new Error(`${this.queryHash} data is undefined`))
                  return
                }
                try {
                  this.setData(f)
                } catch (p) {
                  s(p)
                  return
                }
                ;(h = (d = _(this, Et).config).onSuccess) == null ||
                  h.call(d, f, this),
                  (v = (y = _(this, Et).config).onSettled) == null ||
                    v.call(y, f, this.state.error, this),
                  this.scheduleGc()
              },
              onError: s,
              onFail: (f, d) => {
                ce(this, Ft, hr).call(this, {
                  type: 'failed',
                  failureCount: f,
                  error: d,
                })
              },
              onPause: () => {
                ce(this, Ft, hr).call(this, { type: 'pause' })
              },
              onContinue: () => {
                ce(this, Ft, hr).call(this, { type: 'continue' })
              },
              retry: o.options.retry,
              retryDelay: o.options.retryDelay,
              networkMode: o.options.networkMode,
              canRun: () => !0,
            }),
          ),
          _(this, Ye).start()
        )
      }
    }),
    (gi = new WeakMap()),
    (bi = new WeakMap()),
    (Et = new WeakMap()),
    (Ye = new WeakMap()),
    (Wo = new WeakMap()),
    (Pn = new WeakMap()),
    (Ft = new WeakSet()),
    (hr = function (t) {
      const r = (n) => {
        switch (t.type) {
          case 'failed':
            return {
              ...n,
              fetchFailureCount: t.failureCount,
              fetchFailureReason: t.error,
            }
          case 'pause':
            return { ...n, fetchStatus: 'paused' }
          case 'continue':
            return { ...n, fetchStatus: 'fetching' }
          case 'fetch':
            return {
              ...n,
              ...rb(n.data, this.options),
              fetchMeta: t.meta ?? null,
            }
          case 'success':
            return {
              ...n,
              data: t.data,
              dataUpdateCount: n.dataUpdateCount + 1,
              dataUpdatedAt: t.dataUpdatedAt ?? Date.now(),
              error: null,
              isInvalidated: !1,
              status: 'success',
              ...(!t.manual && {
                fetchStatus: 'idle',
                fetchFailureCount: 0,
                fetchFailureReason: null,
              }),
            }
          case 'error':
            const i = t.error
            return rl(i) && i.revert && _(this, bi)
              ? { ..._(this, bi), fetchStatus: 'idle' }
              : {
                  ...n,
                  error: i,
                  errorUpdateCount: n.errorUpdateCount + 1,
                  errorUpdatedAt: Date.now(),
                  fetchFailureCount: n.fetchFailureCount + 1,
                  fetchFailureReason: i,
                  fetchStatus: 'idle',
                  status: 'error',
                }
          case 'invalidate':
            return { ...n, isInvalidated: !0 }
          case 'setState':
            return { ...n, ...t.state }
        }
      }
      ;(this.state = r(this.state)),
        Fe.batch(() => {
          this.observers.forEach((n) => {
            n.onQueryUpdate()
          }),
            _(this, Et).notify({ query: this, type: 'updated', action: t })
        })
    }),
    B0)
function rb(e, t) {
  return {
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchStatus: Z0(t.networkMode) ? 'fetching' : 'paused',
    ...(e === void 0 && { error: null, status: 'pending' }),
  }
}
function gA(e) {
  const t =
      typeof e.initialData == 'function' ? e.initialData() : e.initialData,
    r = t !== void 0,
    n = r
      ? typeof e.initialDataUpdatedAt == 'function'
        ? e.initialDataUpdatedAt()
        : e.initialDataUpdatedAt
      : 0
  return {
    data: t,
    dataUpdateCount: 0,
    dataUpdatedAt: r ? (n ?? Date.now()) : 0,
    error: null,
    errorUpdateCount: 0,
    errorUpdatedAt: 0,
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchMeta: null,
    isInvalidated: !1,
    status: r ? 'success' : 'pending',
    fetchStatus: 'idle',
  }
}
var Xt,
  F0,
  bA =
    ((F0 = class extends ca {
      constructor(t = {}) {
        super()
        ee(this, Xt)
        ;(this.config = t), K(this, Xt, new Map())
      }
      build(t, r, n) {
        const i = r.queryKey,
          a = r.queryHash ?? Vd(i, r)
        let o = this.get(a)
        return (
          o ||
            ((o = new mA({
              cache: this,
              queryKey: i,
              queryHash: a,
              options: t.defaultQueryOptions(r),
              state: n,
              defaultOptions: t.getQueryDefaults(i),
            })),
            this.add(o)),
          o
        )
      }
      add(t) {
        _(this, Xt).has(t.queryHash) ||
          (_(this, Xt).set(t.queryHash, t),
          this.notify({ type: 'added', query: t }))
      }
      remove(t) {
        const r = _(this, Xt).get(t.queryHash)
        r &&
          (t.destroy(),
          r === t && _(this, Xt).delete(t.queryHash),
          this.notify({ type: 'removed', query: t }))
      }
      clear() {
        Fe.batch(() => {
          this.getAll().forEach((t) => {
            this.remove(t)
          })
        })
      }
      get(t) {
        return _(this, Xt).get(t)
      }
      getAll() {
        return [..._(this, Xt).values()]
      }
      find(t) {
        const r = { exact: !0, ...t }
        return this.getAll().find((n) => Bp(r, n))
      }
      findAll(t = {}) {
        const r = this.getAll()
        return Object.keys(t).length > 0 ? r.filter((n) => Bp(t, n)) : r
      }
      notify(t) {
        Fe.batch(() => {
          this.listeners.forEach((r) => {
            r(t)
          })
        })
      }
      onFocus() {
        Fe.batch(() => {
          this.getAll().forEach((t) => {
            t.onFocus()
          })
        })
      }
      onOnline() {
        Fe.batch(() => {
          this.getAll().forEach((t) => {
            t.onOnline()
          })
        })
      }
    }),
    (Xt = new WeakMap()),
    F0),
  Yt,
  nt,
  $n,
  Qt,
  Br,
  U0,
  xA =
    ((U0 = class extends tb {
      constructor(t) {
        super()
        ee(this, Qt)
        ee(this, Yt)
        ee(this, nt)
        ee(this, $n)
        ;(this.mutationId = t.mutationId),
          K(this, nt, t.mutationCache),
          K(this, Yt, []),
          (this.state = t.state || nb()),
          this.setOptions(t.options),
          this.scheduleGc()
      }
      setOptions(t) {
        ;(this.options = t), this.updateGcTime(this.options.gcTime)
      }
      get meta() {
        return this.options.meta
      }
      addObserver(t) {
        _(this, Yt).includes(t) ||
          (_(this, Yt).push(t),
          this.clearGcTimeout(),
          _(this, nt).notify({
            type: 'observerAdded',
            mutation: this,
            observer: t,
          }))
      }
      removeObserver(t) {
        K(
          this,
          Yt,
          _(this, Yt).filter((r) => r !== t),
        ),
          this.scheduleGc(),
          _(this, nt).notify({
            type: 'observerRemoved',
            mutation: this,
            observer: t,
          })
      }
      optionalRemove() {
        _(this, Yt).length ||
          (this.state.status === 'pending'
            ? this.scheduleGc()
            : _(this, nt).remove(this))
      }
      continue() {
        var t
        return (
          ((t = _(this, $n)) == null ? void 0 : t.continue()) ??
          this.execute(this.state.variables)
        )
      }
      async execute(t) {
        var i, a, o, s, c, u, l, f, d, h, y, v, p, x, b, w, g, m, S, P
        K(
          this,
          $n,
          eb({
            fn: () =>
              this.options.mutationFn
                ? this.options.mutationFn(t)
                : Promise.reject(new Error('No mutationFn found')),
            onFail: ($, T) => {
              ce(this, Qt, Br).call(this, {
                type: 'failed',
                failureCount: $,
                error: T,
              })
            },
            onPause: () => {
              ce(this, Qt, Br).call(this, { type: 'pause' })
            },
            onContinue: () => {
              ce(this, Qt, Br).call(this, { type: 'continue' })
            },
            retry: this.options.retry ?? 0,
            retryDelay: this.options.retryDelay,
            networkMode: this.options.networkMode,
            canRun: () => _(this, nt).canRun(this),
          }),
        )
        const r = this.state.status === 'pending',
          n = !_(this, $n).canStart()
        try {
          if (!r) {
            ce(this, Qt, Br).call(this, {
              type: 'pending',
              variables: t,
              isPaused: n,
            }),
              await ((a = (i = _(this, nt).config).onMutate) == null
                ? void 0
                : a.call(i, t, this))
            const T = await ((s = (o = this.options).onMutate) == null
              ? void 0
              : s.call(o, t))
            T !== this.state.context &&
              ce(this, Qt, Br).call(this, {
                type: 'pending',
                context: T,
                variables: t,
                isPaused: n,
              })
          }
          const $ = await _(this, $n).start()
          return (
            await ((u = (c = _(this, nt).config).onSuccess) == null
              ? void 0
              : u.call(c, $, t, this.state.context, this)),
            await ((f = (l = this.options).onSuccess) == null
              ? void 0
              : f.call(l, $, t, this.state.context)),
            await ((h = (d = _(this, nt).config).onSettled) == null
              ? void 0
              : h.call(
                  d,
                  $,
                  null,
                  this.state.variables,
                  this.state.context,
                  this,
                )),
            await ((v = (y = this.options).onSettled) == null
              ? void 0
              : v.call(y, $, null, t, this.state.context)),
            ce(this, Qt, Br).call(this, { type: 'success', data: $ }),
            $
          )
        } catch ($) {
          try {
            throw (
              (await ((x = (p = _(this, nt).config).onError) == null
                ? void 0
                : x.call(p, $, t, this.state.context, this)),
              await ((w = (b = this.options).onError) == null
                ? void 0
                : w.call(b, $, t, this.state.context)),
              await ((m = (g = _(this, nt).config).onSettled) == null
                ? void 0
                : m.call(
                    g,
                    void 0,
                    $,
                    this.state.variables,
                    this.state.context,
                    this,
                  )),
              await ((P = (S = this.options).onSettled) == null
                ? void 0
                : P.call(S, void 0, $, t, this.state.context)),
              $)
            )
          } finally {
            ce(this, Qt, Br).call(this, { type: 'error', error: $ })
          }
        } finally {
          _(this, nt).runNext(this)
        }
      }
    }),
    (Yt = new WeakMap()),
    (nt = new WeakMap()),
    ($n = new WeakMap()),
    (Qt = new WeakSet()),
    (Br = function (t) {
      const r = (n) => {
        switch (t.type) {
          case 'failed':
            return {
              ...n,
              failureCount: t.failureCount,
              failureReason: t.error,
            }
          case 'pause':
            return { ...n, isPaused: !0 }
          case 'continue':
            return { ...n, isPaused: !1 }
          case 'pending':
            return {
              ...n,
              context: t.context,
              data: void 0,
              failureCount: 0,
              failureReason: null,
              error: null,
              isPaused: t.isPaused,
              status: 'pending',
              variables: t.variables,
              submittedAt: Date.now(),
            }
          case 'success':
            return {
              ...n,
              data: t.data,
              failureCount: 0,
              failureReason: null,
              error: null,
              status: 'success',
              isPaused: !1,
            }
          case 'error':
            return {
              ...n,
              data: void 0,
              error: t.error,
              failureCount: n.failureCount + 1,
              failureReason: t.error,
              isPaused: !1,
              status: 'error',
            }
        }
      }
      ;(this.state = r(this.state)),
        Fe.batch(() => {
          _(this, Yt).forEach((n) => {
            n.onMutationUpdate(t)
          }),
            _(this, nt).notify({ mutation: this, type: 'updated', action: t })
        })
    }),
    U0)
function nb() {
  return {
    context: void 0,
    data: void 0,
    error: null,
    failureCount: 0,
    failureReason: null,
    isPaused: !1,
    status: 'idle',
    variables: void 0,
    submittedAt: 0,
  }
}
var yt,
  qo,
  W0,
  wA =
    ((W0 = class extends ca {
      constructor(t = {}) {
        super()
        ee(this, yt)
        ee(this, qo)
        ;(this.config = t), K(this, yt, new Map()), K(this, qo, Date.now())
      }
      build(t, r, n) {
        const i = new xA({
          mutationCache: this,
          mutationId: ++cs(this, qo)._,
          options: t.defaultMutationOptions(r),
          state: n,
        })
        return this.add(i), i
      }
      add(t) {
        const r = ls(t),
          n = _(this, yt).get(r) ?? []
        n.push(t),
          _(this, yt).set(r, n),
          this.notify({ type: 'added', mutation: t })
      }
      remove(t) {
        var n
        const r = ls(t)
        if (_(this, yt).has(r)) {
          const i =
            (n = _(this, yt).get(r)) == null ? void 0 : n.filter((a) => a !== t)
          i && (i.length === 0 ? _(this, yt).delete(r) : _(this, yt).set(r, i))
        }
        this.notify({ type: 'removed', mutation: t })
      }
      canRun(t) {
        var n
        const r =
          (n = _(this, yt).get(ls(t))) == null
            ? void 0
            : n.find((i) => i.state.status === 'pending')
        return !r || r === t
      }
      runNext(t) {
        var n
        const r =
          (n = _(this, yt).get(ls(t))) == null
            ? void 0
            : n.find((i) => i !== t && i.state.isPaused)
        return (r == null ? void 0 : r.continue()) ?? Promise.resolve()
      }
      clear() {
        Fe.batch(() => {
          this.getAll().forEach((t) => {
            this.remove(t)
          })
        })
      }
      getAll() {
        return [..._(this, yt).values()].flat()
      }
      find(t) {
        const r = { exact: !0, ...t }
        return this.getAll().find((n) => Fp(r, n))
      }
      findAll(t = {}) {
        return this.getAll().filter((r) => Fp(t, r))
      }
      notify(t) {
        Fe.batch(() => {
          this.listeners.forEach((r) => {
            r(t)
          })
        })
      }
      resumePausedMutations() {
        const t = this.getAll().filter((r) => r.state.isPaused)
        return Fe.batch(() => Promise.all(t.map((r) => r.continue().catch(_t))))
      }
    }),
    (yt = new WeakMap()),
    (qo = new WeakMap()),
    W0)
function ls(e) {
  var t
  return ((t = e.options.scope) == null ? void 0 : t.id) ?? String(e.mutationId)
}
function qp(e) {
  return {
    onFetch: (t, r) => {
      var l, f, d, h, y
      const n = t.options,
        i =
          (d =
            (f = (l = t.fetchOptions) == null ? void 0 : l.meta) == null
              ? void 0
              : f.fetchMore) == null
            ? void 0
            : d.direction,
        a = ((h = t.state.data) == null ? void 0 : h.pages) || [],
        o = ((y = t.state.data) == null ? void 0 : y.pageParams) || []
      let s = { pages: [], pageParams: [] },
        c = 0
      const u = async () => {
        let v = !1
        const p = (w) => {
            Object.defineProperty(w, 'signal', {
              enumerable: !0,
              get: () => (
                t.signal.aborted
                  ? (v = !0)
                  : t.signal.addEventListener('abort', () => {
                      v = !0
                    }),
                t.signal
              ),
            })
          },
          x = Q0(t.options, t.fetchOptions),
          b = async (w, g, m) => {
            if (v) return Promise.reject()
            if (g == null && w.pages.length) return Promise.resolve(w)
            const S = {
              queryKey: t.queryKey,
              pageParam: g,
              direction: m ? 'backward' : 'forward',
              meta: t.options.meta,
            }
            p(S)
            const P = await x(S),
              { maxPages: $ } = t.options,
              T = m ? dA : fA
            return {
              pages: T(w.pages, P, $),
              pageParams: T(w.pageParams, g, $),
            }
          }
        if (i && a.length) {
          const w = i === 'backward',
            g = w ? OA : Hp,
            m = { pages: a, pageParams: o },
            S = g(n, m)
          s = await b(m, S, w)
        } else {
          const w = e ?? a.length
          do {
            const g = c === 0 ? (o[0] ?? n.initialPageParam) : Hp(n, s)
            if (c > 0 && g == null) break
            ;(s = await b(s, g)), c++
          } while (c < w)
        }
        return s
      }
      t.options.persister
        ? (t.fetchFn = () => {
            var v, p
            return (p = (v = t.options).persister) == null
              ? void 0
              : p.call(
                  v,
                  u,
                  {
                    queryKey: t.queryKey,
                    meta: t.options.meta,
                    signal: t.signal,
                  },
                  r,
                )
          })
        : (t.fetchFn = u)
    },
  }
}
function Hp(e, { pages: t, pageParams: r }) {
  const n = t.length - 1
  return t.length > 0 ? e.getNextPageParam(t[n], t, r[n], r) : void 0
}
function OA(e, { pages: t, pageParams: r }) {
  var n
  return t.length > 0
    ? (n = e.getPreviousPageParam) == null
      ? void 0
      : n.call(e, t[0], t, r[0], r)
    : void 0
}
var ke,
  zr,
  Kr,
  xi,
  wi,
  Gr,
  Oi,
  Si,
  q0,
  SA =
    ((q0 = class {
      constructor(e = {}) {
        ee(this, ke)
        ee(this, zr)
        ee(this, Kr)
        ee(this, xi)
        ee(this, wi)
        ee(this, Gr)
        ee(this, Oi)
        ee(this, Si)
        K(this, ke, e.queryCache || new bA()),
          K(this, zr, e.mutationCache || new wA()),
          K(this, Kr, e.defaultOptions || {}),
          K(this, xi, new Map()),
          K(this, wi, new Map()),
          K(this, Gr, 0)
      }
      mount() {
        cs(this, Gr)._++,
          _(this, Gr) === 1 &&
            (K(
              this,
              Oi,
              Yd.subscribe(async (e) => {
                e && (await this.resumePausedMutations(), _(this, ke).onFocus())
              }),
            ),
            K(
              this,
              Si,
              Bs.subscribe(async (e) => {
                e &&
                  (await this.resumePausedMutations(), _(this, ke).onOnline())
              }),
            ))
      }
      unmount() {
        var e, t
        cs(this, Gr)._--,
          _(this, Gr) === 0 &&
            ((e = _(this, Oi)) == null || e.call(this),
            K(this, Oi, void 0),
            (t = _(this, Si)) == null || t.call(this),
            K(this, Si, void 0))
      }
      isFetching(e) {
        return _(this, ke).findAll({ ...e, fetchStatus: 'fetching' }).length
      }
      isMutating(e) {
        return _(this, zr).findAll({ ...e, status: 'pending' }).length
      }
      getQueryData(e) {
        var r
        const t = this.defaultQueryOptions({ queryKey: e })
        return (r = _(this, ke).get(t.queryHash)) == null
          ? void 0
          : r.state.data
      }
      ensureQueryData(e) {
        const t = this.getQueryData(e.queryKey)
        if (t === void 0) return this.fetchQuery(e)
        {
          const r = this.defaultQueryOptions(e),
            n = _(this, ke).build(this, r)
          return (
            e.revalidateIfStale &&
              n.isStaleByTime(li(r.staleTime, n)) &&
              this.prefetchQuery(r),
            Promise.resolve(t)
          )
        }
      }
      getQueriesData(e) {
        return _(this, ke)
          .findAll(e)
          .map(({ queryKey: t, state: r }) => {
            const n = r.data
            return [t, n]
          })
      }
      setQueryData(e, t, r) {
        const n = this.defaultQueryOptions({ queryKey: e }),
          i = _(this, ke).get(n.queryHash),
          a = i == null ? void 0 : i.state.data,
          o = uA(t, a)
        if (o !== void 0)
          return _(this, ke)
            .build(this, n)
            .setData(o, { ...r, manual: !0 })
      }
      setQueriesData(e, t, r) {
        return Fe.batch(() =>
          _(this, ke)
            .findAll(e)
            .map(({ queryKey: n }) => [n, this.setQueryData(n, t, r)]),
        )
      }
      getQueryState(e) {
        var r
        const t = this.defaultQueryOptions({ queryKey: e })
        return (r = _(this, ke).get(t.queryHash)) == null ? void 0 : r.state
      }
      removeQueries(e) {
        const t = _(this, ke)
        Fe.batch(() => {
          t.findAll(e).forEach((r) => {
            t.remove(r)
          })
        })
      }
      resetQueries(e, t) {
        const r = _(this, ke),
          n = { type: 'active', ...e }
        return Fe.batch(
          () => (
            r.findAll(e).forEach((i) => {
              i.reset()
            }),
            this.refetchQueries(n, t)
          ),
        )
      }
      cancelQueries(e = {}, t = {}) {
        const r = { revert: !0, ...t },
          n = Fe.batch(() =>
            _(this, ke)
              .findAll(e)
              .map((i) => i.cancel(r)),
          )
        return Promise.all(n).then(_t).catch(_t)
      }
      invalidateQueries(e = {}, t = {}) {
        return Fe.batch(() => {
          if (
            (_(this, ke)
              .findAll(e)
              .forEach((n) => {
                n.invalidate()
              }),
            e.refetchType === 'none')
          )
            return Promise.resolve()
          const r = { ...e, type: e.refetchType ?? e.type ?? 'active' }
          return this.refetchQueries(r, t)
        })
      }
      refetchQueries(e = {}, t) {
        const r = {
            ...t,
            cancelRefetch: (t == null ? void 0 : t.cancelRefetch) ?? !0,
          },
          n = Fe.batch(() =>
            _(this, ke)
              .findAll(e)
              .filter((i) => !i.isDisabled())
              .map((i) => {
                let a = i.fetch(void 0, r)
                return (
                  r.throwOnError || (a = a.catch(_t)),
                  i.state.fetchStatus === 'paused' ? Promise.resolve() : a
                )
              }),
          )
        return Promise.all(n).then(_t)
      }
      fetchQuery(e) {
        const t = this.defaultQueryOptions(e)
        t.retry === void 0 && (t.retry = !1)
        const r = _(this, ke).build(this, t)
        return r.isStaleByTime(li(t.staleTime, r))
          ? r.fetch(t)
          : Promise.resolve(r.state.data)
      }
      prefetchQuery(e) {
        return this.fetchQuery(e).then(_t).catch(_t)
      }
      fetchInfiniteQuery(e) {
        return (e.behavior = qp(e.pages)), this.fetchQuery(e)
      }
      prefetchInfiniteQuery(e) {
        return this.fetchInfiniteQuery(e).then(_t).catch(_t)
      }
      ensureInfiniteQueryData(e) {
        return (e.behavior = qp(e.pages)), this.ensureQueryData(e)
      }
      resumePausedMutations() {
        return Bs.isOnline()
          ? _(this, zr).resumePausedMutations()
          : Promise.resolve()
      }
      getQueryCache() {
        return _(this, ke)
      }
      getMutationCache() {
        return _(this, zr)
      }
      getDefaultOptions() {
        return _(this, Kr)
      }
      setDefaultOptions(e) {
        K(this, Kr, e)
      }
      setQueryDefaults(e, t) {
        _(this, xi).set(Nn(e), { queryKey: e, defaultOptions: t })
      }
      getQueryDefaults(e) {
        const t = [..._(this, xi).values()]
        let r = {}
        return (
          t.forEach((n) => {
            ro(e, n.queryKey) && (r = { ...r, ...n.defaultOptions })
          }),
          r
        )
      }
      setMutationDefaults(e, t) {
        _(this, wi).set(Nn(e), { mutationKey: e, defaultOptions: t })
      }
      getMutationDefaults(e) {
        const t = [..._(this, wi).values()]
        let r = {}
        return (
          t.forEach((n) => {
            ro(e, n.mutationKey) && (r = { ...r, ...n.defaultOptions })
          }),
          r
        )
      }
      defaultQueryOptions(e) {
        if (e._defaulted) return e
        const t = {
          ..._(this, Kr).queries,
          ...this.getQueryDefaults(e.queryKey),
          ...e,
          _defaulted: !0,
        }
        return (
          t.queryHash || (t.queryHash = Vd(t.queryKey, t)),
          t.refetchOnReconnect === void 0 &&
            (t.refetchOnReconnect = t.networkMode !== 'always'),
          t.throwOnError === void 0 && (t.throwOnError = !!t.suspense),
          !t.networkMode && t.persister && (t.networkMode = 'offlineFirst'),
          t.enabled !== !0 && t.queryFn === Xd && (t.enabled = !1),
          t
        )
      }
      defaultMutationOptions(e) {
        return e != null && e._defaulted
          ? e
          : {
              ..._(this, Kr).mutations,
              ...((e == null ? void 0 : e.mutationKey) &&
                this.getMutationDefaults(e.mutationKey)),
              ...e,
              _defaulted: !0,
            }
      }
      clear() {
        _(this, ke).clear(), _(this, zr).clear()
      }
    }),
    (ke = new WeakMap()),
    (zr = new WeakMap()),
    (Kr = new WeakMap()),
    (xi = new WeakMap()),
    (wi = new WeakMap()),
    (Gr = new WeakMap()),
    (Oi = new WeakMap()),
    (Si = new WeakMap()),
    q0),
  ct,
  fe,
  Ho,
  it,
  En,
  Ai,
  Vr,
  Zt,
  zo,
  Pi,
  $i,
  _n,
  Cn,
  Xr,
  Ei,
  ye,
  Fa,
  Gl,
  Vl,
  Xl,
  Yl,
  Ql,
  Zl,
  Jl,
  ib,
  H0,
  AA =
    ((H0 = class extends ca {
      constructor(t, r) {
        super()
        ee(this, ye)
        ee(this, ct)
        ee(this, fe)
        ee(this, Ho)
        ee(this, it)
        ee(this, En)
        ee(this, Ai)
        ee(this, Vr)
        ee(this, Zt)
        ee(this, zo)
        ee(this, Pi)
        ee(this, $i)
        ee(this, _n)
        ee(this, Cn)
        ee(this, Xr)
        ee(this, Ei, new Set())
        ;(this.options = r),
          K(this, ct, t),
          K(this, Zt, null),
          K(this, Vr, Kl()),
          this.options.experimental_prefetchInRender ||
            _(this, Vr).reject(
              new Error(
                'experimental_prefetchInRender feature flag is not enabled',
              ),
            ),
          this.bindMethods(),
          this.setOptions(r)
      }
      bindMethods() {
        this.refetch = this.refetch.bind(this)
      }
      onSubscribe() {
        this.listeners.size === 1 &&
          (_(this, fe).addObserver(this),
          zp(_(this, fe), this.options)
            ? ce(this, ye, Fa).call(this)
            : this.updateResult(),
          ce(this, ye, Yl).call(this))
      }
      onUnsubscribe() {
        this.hasListeners() || this.destroy()
      }
      shouldFetchOnReconnect() {
        return ef(_(this, fe), this.options, this.options.refetchOnReconnect)
      }
      shouldFetchOnWindowFocus() {
        return ef(_(this, fe), this.options, this.options.refetchOnWindowFocus)
      }
      destroy() {
        ;(this.listeners = new Set()),
          ce(this, ye, Ql).call(this),
          ce(this, ye, Zl).call(this),
          _(this, fe).removeObserver(this)
      }
      setOptions(t, r) {
        const n = this.options,
          i = _(this, fe)
        if (
          ((this.options = _(this, ct).defaultQueryOptions(t)),
          this.options.enabled !== void 0 &&
            typeof this.options.enabled != 'boolean' &&
            typeof this.options.enabled != 'function' &&
            typeof Ht(this.options.enabled, _(this, fe)) != 'boolean')
        )
          throw new Error(
            'Expected enabled to be a boolean or a callback that returns a boolean',
          )
        ce(this, ye, Jl).call(this),
          _(this, fe).setOptions(this.options),
          n._defaulted &&
            !Ls(this.options, n) &&
            _(this, ct)
              .getQueryCache()
              .notify({
                type: 'observerOptionsUpdated',
                query: _(this, fe),
                observer: this,
              })
        const a = this.hasListeners()
        a && Kp(_(this, fe), i, this.options, n) && ce(this, ye, Fa).call(this),
          this.updateResult(r),
          a &&
            (_(this, fe) !== i ||
              Ht(this.options.enabled, _(this, fe)) !==
                Ht(n.enabled, _(this, fe)) ||
              li(this.options.staleTime, _(this, fe)) !==
                li(n.staleTime, _(this, fe))) &&
            ce(this, ye, Gl).call(this)
        const o = ce(this, ye, Vl).call(this)
        a &&
          (_(this, fe) !== i ||
            Ht(this.options.enabled, _(this, fe)) !==
              Ht(n.enabled, _(this, fe)) ||
            o !== _(this, Xr)) &&
          ce(this, ye, Xl).call(this, o)
      }
      getOptimisticResult(t) {
        const r = _(this, ct).getQueryCache().build(_(this, ct), t),
          n = this.createResult(r, t)
        return (
          $A(this, n) &&
            (K(this, it, n),
            K(this, Ai, this.options),
            K(this, En, _(this, fe).state)),
          n
        )
      }
      getCurrentResult() {
        return _(this, it)
      }
      trackResult(t, r) {
        const n = {}
        return (
          Object.keys(t).forEach((i) => {
            Object.defineProperty(n, i, {
              configurable: !1,
              enumerable: !0,
              get: () => (this.trackProp(i), r == null || r(i), t[i]),
            })
          }),
          n
        )
      }
      trackProp(t) {
        _(this, Ei).add(t)
      }
      getCurrentQuery() {
        return _(this, fe)
      }
      refetch({ ...t } = {}) {
        return this.fetch({ ...t })
      }
      fetchOptimistic(t) {
        const r = _(this, ct).defaultQueryOptions(t),
          n = _(this, ct).getQueryCache().build(_(this, ct), r)
        return n.fetch().then(() => this.createResult(n, r))
      }
      fetch(t) {
        return ce(this, ye, Fa)
          .call(this, { ...t, cancelRefetch: t.cancelRefetch ?? !0 })
          .then(() => (this.updateResult(), _(this, it)))
      }
      createResult(t, r) {
        var P
        const n = _(this, fe),
          i = this.options,
          a = _(this, it),
          o = _(this, En),
          s = _(this, Ai),
          u = t !== n ? t.state : _(this, Ho),
          { state: l } = t
        let f = { ...l },
          d = !1,
          h
        if (r._optimisticResults) {
          const $ = this.hasListeners(),
            T = !$ && zp(t, r),
            k = $ && Kp(t, n, r, i)
          ;(T || k) && (f = { ...f, ...rb(l.data, t.options) }),
            r._optimisticResults === 'isRestoring' && (f.fetchStatus = 'idle')
        }
        let { error: y, errorUpdatedAt: v, status: p } = f
        if (r.select && f.data !== void 0)
          if (
            a &&
            f.data === (o == null ? void 0 : o.data) &&
            r.select === _(this, zo)
          )
            h = _(this, Pi)
          else
            try {
              K(this, zo, r.select),
                (h = r.select(f.data)),
                (h = zl(a == null ? void 0 : a.data, h, r)),
                K(this, Pi, h),
                K(this, Zt, null)
            } catch ($) {
              K(this, Zt, $)
            }
        else h = f.data
        if (r.placeholderData !== void 0 && h === void 0 && p === 'pending') {
          let $
          if (
            a != null &&
            a.isPlaceholderData &&
            r.placeholderData === (s == null ? void 0 : s.placeholderData)
          )
            $ = a.data
          else if (
            (($ =
              typeof r.placeholderData == 'function'
                ? r.placeholderData(
                    (P = _(this, $i)) == null ? void 0 : P.state.data,
                    _(this, $i),
                  )
                : r.placeholderData),
            r.select && $ !== void 0)
          )
            try {
              ;($ = r.select($)), K(this, Zt, null)
            } catch (T) {
              K(this, Zt, T)
            }
          $ !== void 0 &&
            ((p = 'success'),
            (h = zl(a == null ? void 0 : a.data, $, r)),
            (d = !0))
        }
        _(this, Zt) &&
          ((y = _(this, Zt)),
          (h = _(this, Pi)),
          (v = Date.now()),
          (p = 'error'))
        const x = f.fetchStatus === 'fetching',
          b = p === 'pending',
          w = p === 'error',
          g = b && x,
          m = h !== void 0
        return {
          status: p,
          fetchStatus: f.fetchStatus,
          isPending: b,
          isSuccess: p === 'success',
          isError: w,
          isInitialLoading: g,
          isLoading: g,
          data: h,
          dataUpdatedAt: f.dataUpdatedAt,
          error: y,
          errorUpdatedAt: v,
          failureCount: f.fetchFailureCount,
          failureReason: f.fetchFailureReason,
          errorUpdateCount: f.errorUpdateCount,
          isFetched: f.dataUpdateCount > 0 || f.errorUpdateCount > 0,
          isFetchedAfterMount:
            f.dataUpdateCount > u.dataUpdateCount ||
            f.errorUpdateCount > u.errorUpdateCount,
          isFetching: x,
          isRefetching: x && !b,
          isLoadingError: w && !m,
          isPaused: f.fetchStatus === 'paused',
          isPlaceholderData: d,
          isRefetchError: w && m,
          isStale: Qd(t, r),
          refetch: this.refetch,
          promise: _(this, Vr),
        }
      }
      updateResult(t) {
        const r = _(this, it),
          n = this.createResult(_(this, fe), this.options)
        if (
          (K(this, En, _(this, fe).state),
          K(this, Ai, this.options),
          _(this, En).data !== void 0 && K(this, $i, _(this, fe)),
          Ls(n, r))
        )
          return
        if (this.options.experimental_prefetchInRender) {
          const o = (u) => {
              n.status === 'error'
                ? u.reject(n.error)
                : n.data !== void 0 && u.resolve(n.data)
            },
            s = () => {
              const u = K(this, Vr, (n.promise = Kl()))
              o(u)
            },
            c = _(this, Vr)
          switch (c.status) {
            case 'pending':
              o(c)
              break
            case 'fulfilled':
              ;(n.status === 'error' || n.data !== c.value) && s()
              break
            case 'rejected':
              ;(n.status !== 'error' || n.error !== c.reason) && s()
              break
          }
        }
        K(this, it, n)
        const i = {},
          a = () => {
            if (!r) return !0
            const { notifyOnChangeProps: o } = this.options,
              s = typeof o == 'function' ? o() : o
            if (s === 'all' || (!s && !_(this, Ei).size)) return !0
            const c = new Set(s ?? _(this, Ei))
            return (
              this.options.throwOnError && c.add('error'),
              Object.keys(_(this, it)).some((u) => {
                const l = u
                return _(this, it)[l] !== r[l] && c.has(l)
              })
            )
          }
        ;(t == null ? void 0 : t.listeners) !== !1 && a() && (i.listeners = !0),
          ce(this, ye, ib).call(this, { ...i, ...t })
      }
      onQueryUpdate() {
        this.updateResult(), this.hasListeners() && ce(this, ye, Yl).call(this)
      }
    }),
    (ct = new WeakMap()),
    (fe = new WeakMap()),
    (Ho = new WeakMap()),
    (it = new WeakMap()),
    (En = new WeakMap()),
    (Ai = new WeakMap()),
    (Vr = new WeakMap()),
    (Zt = new WeakMap()),
    (zo = new WeakMap()),
    (Pi = new WeakMap()),
    ($i = new WeakMap()),
    (_n = new WeakMap()),
    (Cn = new WeakMap()),
    (Xr = new WeakMap()),
    (Ei = new WeakMap()),
    (ye = new WeakSet()),
    (Fa = function (t) {
      ce(this, ye, Jl).call(this)
      let r = _(this, fe).fetch(this.options, t)
      return (t != null && t.throwOnError) || (r = r.catch(_t)), r
    }),
    (Gl = function () {
      ce(this, ye, Ql).call(this)
      const t = li(this.options.staleTime, _(this, fe))
      if (Mn || _(this, it).isStale || !ql(t)) return
      const n = X0(_(this, it).dataUpdatedAt, t) + 1
      K(
        this,
        _n,
        setTimeout(() => {
          _(this, it).isStale || this.updateResult()
        }, n),
      )
    }),
    (Vl = function () {
      return (
        (typeof this.options.refetchInterval == 'function'
          ? this.options.refetchInterval(_(this, fe))
          : this.options.refetchInterval) ?? !1
      )
    }),
    (Xl = function (t) {
      ce(this, ye, Zl).call(this),
        K(this, Xr, t),
        !(
          Mn ||
          Ht(this.options.enabled, _(this, fe)) === !1 ||
          !ql(_(this, Xr)) ||
          _(this, Xr) === 0
        ) &&
          K(
            this,
            Cn,
            setInterval(
              () => {
                ;(this.options.refetchIntervalInBackground || Yd.isFocused()) &&
                  ce(this, ye, Fa).call(this)
              },
              _(this, Xr),
            ),
          )
    }),
    (Yl = function () {
      ce(this, ye, Gl).call(this),
        ce(this, ye, Xl).call(this, ce(this, ye, Vl).call(this))
    }),
    (Ql = function () {
      _(this, _n) && (clearTimeout(_(this, _n)), K(this, _n, void 0))
    }),
    (Zl = function () {
      _(this, Cn) && (clearInterval(_(this, Cn)), K(this, Cn, void 0))
    }),
    (Jl = function () {
      const t = _(this, ct).getQueryCache().build(_(this, ct), this.options)
      if (t === _(this, fe)) return
      const r = _(this, fe)
      K(this, fe, t),
        K(this, Ho, t.state),
        this.hasListeners() &&
          (r == null || r.removeObserver(this), t.addObserver(this))
    }),
    (ib = function (t) {
      Fe.batch(() => {
        t.listeners &&
          this.listeners.forEach((r) => {
            r(_(this, it))
          }),
          _(this, ct)
            .getQueryCache()
            .notify({ query: _(this, fe), type: 'observerResultsUpdated' })
      })
    }),
    H0)
function PA(e, t) {
  return (
    Ht(t.enabled, e) !== !1 &&
    e.state.data === void 0 &&
    !(e.state.status === 'error' && t.retryOnMount === !1)
  )
}
function zp(e, t) {
  return PA(e, t) || (e.state.data !== void 0 && ef(e, t, t.refetchOnMount))
}
function ef(e, t, r) {
  if (Ht(t.enabled, e) !== !1) {
    const n = typeof r == 'function' ? r(e) : r
    return n === 'always' || (n !== !1 && Qd(e, t))
  }
  return !1
}
function Kp(e, t, r, n) {
  return (
    (e !== t || Ht(n.enabled, e) === !1) &&
    (!r.suspense || e.state.status !== 'error') &&
    Qd(e, r)
  )
}
function Qd(e, t) {
  return Ht(t.enabled, e) !== !1 && e.isStaleByTime(li(t.staleTime, e))
}
function $A(e, t) {
  return !Ls(e.getCurrentResult(), t)
}
var Yr,
  Qr,
  ut,
  yr,
  Pr,
  Ts,
  tf,
  z0,
  EA =
    ((z0 = class extends ca {
      constructor(r, n) {
        super()
        ee(this, Pr)
        ee(this, Yr)
        ee(this, Qr)
        ee(this, ut)
        ee(this, yr)
        K(this, Yr, r),
          this.setOptions(n),
          this.bindMethods(),
          ce(this, Pr, Ts).call(this)
      }
      bindMethods() {
        ;(this.mutate = this.mutate.bind(this)),
          (this.reset = this.reset.bind(this))
      }
      setOptions(r) {
        var i
        const n = this.options
        ;(this.options = _(this, Yr).defaultMutationOptions(r)),
          Ls(this.options, n) ||
            _(this, Yr)
              .getMutationCache()
              .notify({
                type: 'observerOptionsUpdated',
                mutation: _(this, ut),
                observer: this,
              }),
          n != null &&
          n.mutationKey &&
          this.options.mutationKey &&
          Nn(n.mutationKey) !== Nn(this.options.mutationKey)
            ? this.reset()
            : ((i = _(this, ut)) == null ? void 0 : i.state.status) ===
                'pending' && _(this, ut).setOptions(this.options)
      }
      onUnsubscribe() {
        var r
        this.hasListeners() ||
          (r = _(this, ut)) == null ||
          r.removeObserver(this)
      }
      onMutationUpdate(r) {
        ce(this, Pr, Ts).call(this), ce(this, Pr, tf).call(this, r)
      }
      getCurrentResult() {
        return _(this, Qr)
      }
      reset() {
        var r
        ;(r = _(this, ut)) == null || r.removeObserver(this),
          K(this, ut, void 0),
          ce(this, Pr, Ts).call(this),
          ce(this, Pr, tf).call(this)
      }
      mutate(r, n) {
        var i
        return (
          K(this, yr, n),
          (i = _(this, ut)) == null || i.removeObserver(this),
          K(
            this,
            ut,
            _(this, Yr).getMutationCache().build(_(this, Yr), this.options),
          ),
          _(this, ut).addObserver(this),
          _(this, ut).execute(r)
        )
      }
    }),
    (Yr = new WeakMap()),
    (Qr = new WeakMap()),
    (ut = new WeakMap()),
    (yr = new WeakMap()),
    (Pr = new WeakSet()),
    (Ts = function () {
      var n
      const r = ((n = _(this, ut)) == null ? void 0 : n.state) ?? nb()
      K(this, Qr, {
        ...r,
        isPending: r.status === 'pending',
        isSuccess: r.status === 'success',
        isError: r.status === 'error',
        isIdle: r.status === 'idle',
        mutate: this.mutate,
        reset: this.reset,
      })
    }),
    (tf = function (r) {
      Fe.batch(() => {
        var n, i, a, o, s, c, u, l
        if (_(this, yr) && this.hasListeners()) {
          const f = _(this, Qr).variables,
            d = _(this, Qr).context
          ;(r == null ? void 0 : r.type) === 'success'
            ? ((i = (n = _(this, yr)).onSuccess) == null ||
                i.call(n, r.data, f, d),
              (o = (a = _(this, yr)).onSettled) == null ||
                o.call(a, r.data, null, f, d))
            : (r == null ? void 0 : r.type) === 'error' &&
              ((c = (s = _(this, yr)).onError) == null ||
                c.call(s, r.error, f, d),
              (l = (u = _(this, yr)).onSettled) == null ||
                l.call(u, void 0, r.error, f, d))
        }
        this.listeners.forEach((f) => {
          f(_(this, Qr))
        })
      })
    }),
    z0),
  ab = A.createContext(void 0),
  ua = (e) => {
    const t = A.useContext(ab)
    if (!t)
      throw new Error('No QueryClient set, use QueryClientProvider to set one')
    return t
  },
  _A = ({ client: e, children: t }) => (
    A.useEffect(
      () => (
        e.mount(),
        () => {
          e.unmount()
        }
      ),
      [e],
    ),
    O.jsx(ab.Provider, { value: e, children: t })
  ),
  ob = A.createContext(!1),
  CA = () => A.useContext(ob)
ob.Provider
function jA() {
  let e = !1
  return {
    clearReset: () => {
      e = !1
    },
    reset: () => {
      e = !0
    },
    isReset: () => e,
  }
}
var TA = A.createContext(jA()),
  kA = () => A.useContext(TA)
function sb(e, t) {
  return typeof e == 'function' ? e(...t) : !!e
}
function cb() {}
var MA = (e, t) => {
    ;(e.suspense || e.throwOnError) && (t.isReset() || (e.retryOnMount = !1))
  },
  NA = (e) => {
    A.useEffect(() => {
      e.clearReset()
    }, [e])
  },
  IA = ({ result: e, errorResetBoundary: t, throwOnError: r, query: n }) =>
    e.isError && !t.isReset() && !e.isFetching && n && sb(r, [e.error, n]),
  RA = (e) => {
    e.suspense &&
      (typeof e.staleTime != 'number' && (e.staleTime = 1e3),
      typeof e.gcTime == 'number' && (e.gcTime = Math.max(e.gcTime, 1e3)))
  },
  DA = (e, t) => e.isLoading && e.isFetching && !t,
  LA = (e, t) => (e == null ? void 0 : e.suspense) && t.isPending,
  Gp = (e, t, r) =>
    t.fetchOptimistic(e).catch(() => {
      r.clearReset()
    })
function BA(e, t, r) {
  var l, f, d, h, y
  const n = ua(),
    i = CA(),
    a = kA(),
    o = n.defaultQueryOptions(e)
  ;(f =
    (l = n.getDefaultOptions().queries) == null
      ? void 0
      : l._experimental_beforeQuery) == null || f.call(l, o),
    (o._optimisticResults = i ? 'isRestoring' : 'optimistic'),
    RA(o),
    MA(o, a),
    NA(a)
  const s = !n.getQueryCache().get(o.queryHash),
    [c] = A.useState(() => new t(n, o)),
    u = c.getOptimisticResult(o)
  if (
    (A.useSyncExternalStore(
      A.useCallback(
        (v) => {
          const p = i ? () => {} : c.subscribe(Fe.batchCalls(v))
          return c.updateResult(), p
        },
        [c, i],
      ),
      () => c.getCurrentResult(),
      () => c.getCurrentResult(),
    ),
    A.useEffect(() => {
      c.setOptions(o, { listeners: !1 })
    }, [o, c]),
    LA(o, u))
  )
    throw Gp(o, c, a)
  if (
    IA({
      result: u,
      errorResetBoundary: a,
      throwOnError: o.throwOnError,
      query: n.getQueryCache().get(o.queryHash),
    })
  )
    throw u.error
  if (
    ((h =
      (d = n.getDefaultOptions().queries) == null
        ? void 0
        : d._experimental_afterQuery) == null || h.call(d, o, u),
    o.experimental_prefetchInRender && !Mn && DA(u, i))
  ) {
    const v = s
      ? Gp(o, c, a)
      : (y = n.getQueryCache().get(o.queryHash)) == null
        ? void 0
        : y.promise
    v == null ||
      v.catch(cb).finally(() => {
        c.hasListeners() || c.updateResult()
      })
  }
  return o.notifyOnChangeProps ? u : c.trackResult(u)
}
function _i(e, t) {
  return BA(e, AA)
}
function Ko(e, t) {
  const r = ua(),
    [n] = A.useState(() => new EA(r, e))
  A.useEffect(() => {
    n.setOptions(e)
  }, [n, e])
  const i = A.useSyncExternalStore(
      A.useCallback((o) => n.subscribe(Fe.batchCalls(o)), [n]),
      () => n.getCurrentResult(),
      () => n.getCurrentResult(),
    ),
    a = A.useCallback(
      (o, s) => {
        n.mutate(o, s).catch(cb)
      },
      [n],
    )
  if (i.error && sb(n.options.throwOnError, [i.error])) throw i.error
  return { ...i, mutate: a, mutateAsync: i.mutate }
}
var ub = { exports: {} }
/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/ ;(function (e) {
  ;(function () {
    var t = {}.hasOwnProperty
    function r() {
      for (var a = '', o = 0; o < arguments.length; o++) {
        var s = arguments[o]
        s && (a = i(a, n(s)))
      }
      return a
    }
    function n(a) {
      if (typeof a == 'string' || typeof a == 'number') return a
      if (typeof a != 'object') return ''
      if (Array.isArray(a)) return r.apply(null, a)
      if (
        a.toString !== Object.prototype.toString &&
        !a.toString.toString().includes('[native code]')
      )
        return a.toString()
      var o = ''
      for (var s in a) t.call(a, s) && a[s] && (o = i(o, s))
      return o
    }
    function i(a, o) {
      return o ? (a ? a + ' ' + o : a + o) : a
    }
    e.exports ? ((r.default = r), (e.exports = r)) : (window.classNames = r)
  })()
})(ub)
var FA = ub.exports
const Y = me(FA)
function rf() {
  return (
    (rf = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t]
            for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n])
          }
          return e
        }),
    rf.apply(null, arguments)
  )
}
function lb(e, t) {
  if (e == null) return {}
  var r = {}
  for (var n in e)
    if ({}.hasOwnProperty.call(e, n)) {
      if (t.includes(n)) continue
      r[n] = e[n]
    }
  return r
}
function Vp(e) {
  return 'default' + e.charAt(0).toUpperCase() + e.substr(1)
}
function UA(e) {
  var t = WA(e, 'string')
  return typeof t == 'symbol' ? t : String(t)
}
function WA(e, t) {
  if (typeof e != 'object' || e === null) return e
  var r = e[Symbol.toPrimitive]
  if (r !== void 0) {
    var n = r.call(e, t)
    if (typeof n != 'object') return n
    throw new TypeError('@@toPrimitive must return a primitive value.')
  }
  return String(e)
}
function qA(e, t, r) {
  var n = A.useRef(e !== void 0),
    i = A.useState(t),
    a = i[0],
    o = i[1],
    s = e !== void 0,
    c = n.current
  return (
    (n.current = s),
    !s && c && a !== t && o(t),
    [
      s ? e : a,
      A.useCallback(
        function (u) {
          for (
            var l = arguments.length, f = new Array(l > 1 ? l - 1 : 0), d = 1;
            d < l;
            d++
          )
            f[d - 1] = arguments[d]
          r && r.apply(void 0, [u].concat(f)), o(u)
        },
        [r],
      ),
    ]
  )
}
function Go(e, t) {
  return Object.keys(t).reduce(function (r, n) {
    var i,
      a = r,
      o = a[Vp(n)],
      s = a[n],
      c = lb(a, [Vp(n), n].map(UA)),
      u = t[n],
      l = qA(s, o, e[u]),
      f = l[0],
      d = l[1]
    return rf({}, c, ((i = {}), (i[n] = f), (i[u] = d), i))
  }, e)
}
function nf(e, t) {
  return (
    (nf = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (r, n) {
          return (r.__proto__ = n), r
        }),
    nf(e, t)
  )
}
function HA(e, t) {
  ;(e.prototype = Object.create(t.prototype)),
    (e.prototype.constructor = e),
    nf(e, t)
}
const zA = ['xxl', 'xl', 'lg', 'md', 'sm', 'xs'],
  KA = 'xs',
  Yc = A.createContext({ prefixes: {}, breakpoints: zA, minBreakpoint: KA })
function Z(e, t) {
  const { prefixes: r } = A.useContext(Yc)
  return e || r[t] || t
}
function fb() {
  const { breakpoints: e } = A.useContext(Yc)
  return e
}
function db() {
  const { minBreakpoint: e } = A.useContext(Yc)
  return e
}
function GA() {
  const { dir: e } = A.useContext(Yc)
  return e === 'rtl'
}
function Qc(e) {
  return (e && e.ownerDocument) || document
}
function VA(e) {
  var t = Qc(e)
  return (t && t.defaultView) || window
}
function XA(e, t) {
  return VA(e).getComputedStyle(e, t)
}
var YA = /([A-Z])/g
function QA(e) {
  return e.replace(YA, '-$1').toLowerCase()
}
var ZA = /^ms-/
function fs(e) {
  return QA(e).replace(ZA, '-ms-')
}
var JA =
  /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i
function e2(e) {
  return !!(e && JA.test(e))
}
function wr(e, t) {
  var r = '',
    n = ''
  if (typeof t == 'string')
    return e.style.getPropertyValue(fs(t)) || XA(e).getPropertyValue(fs(t))
  Object.keys(t).forEach(function (i) {
    var a = t[i]
    !a && a !== 0
      ? e.style.removeProperty(fs(i))
      : e2(i)
        ? (n += i + '(' + a + ') ')
        : (r += fs(i) + ': ' + a + ';')
  }),
    n && (r += 'transform: ' + n + ';'),
    (e.style.cssText += ';' + r)
}
var hb = { exports: {} },
  t2 = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED',
  r2 = t2,
  n2 = r2
function pb() {}
function vb() {}
vb.resetWarningCache = pb
var i2 = function () {
  function e(n, i, a, o, s, c) {
    if (c !== n2) {
      var u = new Error(
        'Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types',
      )
      throw ((u.name = 'Invariant Violation'), u)
    }
  }
  e.isRequired = e
  function t() {
    return e
  }
  var r = {
    array: e,
    bigint: e,
    bool: e,
    func: e,
    number: e,
    object: e,
    string: e,
    symbol: e,
    any: e,
    arrayOf: t,
    element: e,
    elementType: e,
    instanceOf: t,
    node: e,
    objectOf: t,
    oneOf: t,
    oneOfType: t,
    shape: t,
    exact: t,
    checkPropTypes: vb,
    resetWarningCache: pb,
  }
  return (r.PropTypes = r), r
}
hb.exports = i2()
var a2 = hb.exports
const X = me(a2),
  Xp = { disabled: !1 },
  yb = E.createContext(null)
var o2 = function (t) {
    return t.scrollTop
  },
  Ua = 'unmounted',
  Fr = 'exited',
  zt = 'entering',
  mr = 'entered',
  no = 'exiting',
  Mr = (function (e) {
    HA(t, e)
    function t(n, i) {
      var a
      a = e.call(this, n, i) || this
      var o = i,
        s = o && !o.isMounting ? n.enter : n.appear,
        c
      return (
        (a.appearStatus = null),
        n.in
          ? s
            ? ((c = Fr), (a.appearStatus = zt))
            : (c = mr)
          : n.unmountOnExit || n.mountOnEnter
            ? (c = Ua)
            : (c = Fr),
        (a.state = { status: c }),
        (a.nextCallback = null),
        a
      )
    }
    t.getDerivedStateFromProps = function (i, a) {
      var o = i.in
      return o && a.status === Ua ? { status: Fr } : null
    }
    var r = t.prototype
    return (
      (r.componentDidMount = function () {
        this.updateStatus(!0, this.appearStatus)
      }),
      (r.componentDidUpdate = function (i) {
        var a = null
        if (i !== this.props) {
          var o = this.state.status
          this.props.in
            ? o !== zt && o !== mr && (a = zt)
            : (o === zt || o === mr) && (a = no)
        }
        this.updateStatus(!1, a)
      }),
      (r.componentWillUnmount = function () {
        this.cancelNextCallback()
      }),
      (r.getTimeouts = function () {
        var i = this.props.timeout,
          a,
          o,
          s
        return (
          (a = o = s = i),
          i != null &&
            typeof i != 'number' &&
            ((a = i.exit),
            (o = i.enter),
            (s = i.appear !== void 0 ? i.appear : o)),
          { exit: a, enter: o, appear: s }
        )
      }),
      (r.updateStatus = function (i, a) {
        if ((i === void 0 && (i = !1), a !== null))
          if ((this.cancelNextCallback(), a === zt)) {
            if (this.props.unmountOnExit || this.props.mountOnEnter) {
              var o = this.props.nodeRef
                ? this.props.nodeRef.current
                : ai.findDOMNode(this)
              o && o2(o)
            }
            this.performEnter(i)
          } else this.performExit()
        else
          this.props.unmountOnExit &&
            this.state.status === Fr &&
            this.setState({ status: Ua })
      }),
      (r.performEnter = function (i) {
        var a = this,
          o = this.props.enter,
          s = this.context ? this.context.isMounting : i,
          c = this.props.nodeRef ? [s] : [ai.findDOMNode(this), s],
          u = c[0],
          l = c[1],
          f = this.getTimeouts(),
          d = s ? f.appear : f.enter
        if ((!i && !o) || Xp.disabled) {
          this.safeSetState({ status: mr }, function () {
            a.props.onEntered(u)
          })
          return
        }
        this.props.onEnter(u, l),
          this.safeSetState({ status: zt }, function () {
            a.props.onEntering(u, l),
              a.onTransitionEnd(d, function () {
                a.safeSetState({ status: mr }, function () {
                  a.props.onEntered(u, l)
                })
              })
          })
      }),
      (r.performExit = function () {
        var i = this,
          a = this.props.exit,
          o = this.getTimeouts(),
          s = this.props.nodeRef ? void 0 : ai.findDOMNode(this)
        if (!a || Xp.disabled) {
          this.safeSetState({ status: Fr }, function () {
            i.props.onExited(s)
          })
          return
        }
        this.props.onExit(s),
          this.safeSetState({ status: no }, function () {
            i.props.onExiting(s),
              i.onTransitionEnd(o.exit, function () {
                i.safeSetState({ status: Fr }, function () {
                  i.props.onExited(s)
                })
              })
          })
      }),
      (r.cancelNextCallback = function () {
        this.nextCallback !== null &&
          (this.nextCallback.cancel(), (this.nextCallback = null))
      }),
      (r.safeSetState = function (i, a) {
        ;(a = this.setNextCallback(a)), this.setState(i, a)
      }),
      (r.setNextCallback = function (i) {
        var a = this,
          o = !0
        return (
          (this.nextCallback = function (s) {
            o && ((o = !1), (a.nextCallback = null), i(s))
          }),
          (this.nextCallback.cancel = function () {
            o = !1
          }),
          this.nextCallback
        )
      }),
      (r.onTransitionEnd = function (i, a) {
        this.setNextCallback(a)
        var o = this.props.nodeRef
            ? this.props.nodeRef.current
            : ai.findDOMNode(this),
          s = i == null && !this.props.addEndListener
        if (!o || s) {
          setTimeout(this.nextCallback, 0)
          return
        }
        if (this.props.addEndListener) {
          var c = this.props.nodeRef
              ? [this.nextCallback]
              : [o, this.nextCallback],
            u = c[0],
            l = c[1]
          this.props.addEndListener(u, l)
        }
        i != null && setTimeout(this.nextCallback, i)
      }),
      (r.render = function () {
        var i = this.state.status
        if (i === Ua) return null
        var a = this.props,
          o = a.children
        a.in,
          a.mountOnEnter,
          a.unmountOnExit,
          a.appear,
          a.enter,
          a.exit,
          a.timeout,
          a.addEndListener,
          a.onEnter,
          a.onEntering,
          a.onEntered,
          a.onExit,
          a.onExiting,
          a.onExited,
          a.nodeRef
        var s = lb(a, [
          'children',
          'in',
          'mountOnEnter',
          'unmountOnExit',
          'appear',
          'enter',
          'exit',
          'timeout',
          'addEndListener',
          'onEnter',
          'onEntering',
          'onEntered',
          'onExit',
          'onExiting',
          'onExited',
          'nodeRef',
        ])
        return E.createElement(
          yb.Provider,
          { value: null },
          typeof o == 'function'
            ? o(i, s)
            : E.cloneElement(E.Children.only(o), s),
        )
      }),
      t
    )
  })(E.Component)
Mr.contextType = yb
Mr.propTypes = {}
function Zn() {}
Mr.defaultProps = {
  in: !1,
  mountOnEnter: !1,
  unmountOnExit: !1,
  appear: !1,
  enter: !0,
  exit: !0,
  onEnter: Zn,
  onEntering: Zn,
  onEntered: Zn,
  onExit: Zn,
  onExiting: Zn,
  onExited: Zn,
}
Mr.UNMOUNTED = Ua
Mr.EXITED = Fr
Mr.ENTERING = zt
Mr.ENTERED = mr
Mr.EXITING = no
const Zc = !!(
  typeof window < 'u' &&
  window.document &&
  window.document.createElement
)
var af = !1,
  of = !1
try {
  var nl = {
    get passive() {
      return (af = !0)
    },
    get once() {
      return (of = af = !0)
    },
  }
  Zc &&
    (window.addEventListener('test', nl, nl),
    window.removeEventListener('test', nl, !0))
} catch {}
function mb(e, t, r, n) {
  if (n && typeof n != 'boolean' && !of) {
    var i = n.once,
      a = n.capture,
      o = r
    !of &&
      i &&
      ((o =
        r.__once ||
        function s(c) {
          this.removeEventListener(t, s, a), r.call(this, c)
        }),
      (r.__once = o)),
      e.addEventListener(t, o, af ? n : a)
  }
  e.addEventListener(t, r, n)
}
function s2(e, t, r, n) {
  var i = n && typeof n != 'boolean' ? n.capture : n
  e.removeEventListener(t, r, i),
    r.__once && e.removeEventListener(t, r.__once, i)
}
function Zr(e, t, r, n) {
  return (
    mb(e, t, r, n),
    function () {
      s2(e, t, r, n)
    }
  )
}
function c2(e, t, r, n) {
  if ((n === void 0 && (n = !0), e)) {
    var i = document.createEvent('HTMLEvents')
    i.initEvent(t, r, n), e.dispatchEvent(i)
  }
}
function u2(e) {
  var t = wr(e, 'transitionDuration') || '',
    r = t.indexOf('ms') === -1 ? 1e3 : 1
  return parseFloat(t) * r
}
function l2(e, t, r) {
  r === void 0 && (r = 5)
  var n = !1,
    i = setTimeout(function () {
      n || c2(e, 'transitionend', !0)
    }, t + r),
    a = Zr(
      e,
      'transitionend',
      function () {
        n = !0
      },
      { once: !0 },
    )
  return function () {
    clearTimeout(i), a()
  }
}
function f2(e, t, r, n) {
  r == null && (r = u2(e) || 0)
  var i = l2(e, r, n),
    a = Zr(e, 'transitionend', t)
  return function () {
    i(), a()
  }
}
function Yp(e, t) {
  const r = wr(e, t) || '',
    n = r.indexOf('ms') === -1 ? 1e3 : 1
  return parseFloat(r) * n
}
function Zd(e, t) {
  const r = Yp(e, 'transitionDuration'),
    n = Yp(e, 'transitionDelay'),
    i = f2(
      e,
      (a) => {
        a.target === e && (i(), t(a))
      },
      r + n,
    )
}
function Ea(...e) {
  return e
    .filter((t) => t != null)
    .reduce((t, r) => {
      if (typeof r != 'function')
        throw new Error(
          'Invalid Argument Type, must only provide functions, undefined, or null.',
        )
      return t === null
        ? r
        : function (...i) {
            t.apply(this, i), r.apply(this, i)
          }
    }, null)
}
function gb(e) {
  e.offsetHeight
}
const Qp = (e) =>
  !e || typeof e == 'function'
    ? e
    : (t) => {
        e.current = t
      }
function d2(e, t) {
  const r = Qp(e),
    n = Qp(t)
  return (i) => {
    r && r(i), n && n(i)
  }
}
function qn(e, t) {
  return A.useMemo(() => d2(e, t), [e, t])
}
function h2(e) {
  return e && 'setState' in e ? ai.findDOMNode(e) : (e ?? null)
}
const Jd = E.forwardRef(
    (
      {
        onEnter: e,
        onEntering: t,
        onEntered: r,
        onExit: n,
        onExiting: i,
        onExited: a,
        addEndListener: o,
        children: s,
        childRef: c,
        ...u
      },
      l,
    ) => {
      const f = A.useRef(null),
        d = qn(f, c),
        h = (S) => {
          d(h2(S))
        },
        y = (S) => (P) => {
          S && f.current && S(f.current, P)
        },
        v = A.useCallback(y(e), [e]),
        p = A.useCallback(y(t), [t]),
        x = A.useCallback(y(r), [r]),
        b = A.useCallback(y(n), [n]),
        w = A.useCallback(y(i), [i]),
        g = A.useCallback(y(a), [a]),
        m = A.useCallback(y(o), [o])
      return O.jsx(Mr, {
        ref: l,
        ...u,
        onEnter: v,
        onEntered: x,
        onEntering: p,
        onExit: b,
        onExited: g,
        onExiting: w,
        addEndListener: m,
        nodeRef: f,
        children:
          typeof s == 'function'
            ? (S, P) => s(S, { ...P, ref: h })
            : E.cloneElement(s, { ref: h }),
      })
    },
  ),
  p2 = {
    height: ['marginTop', 'marginBottom'],
    width: ['marginLeft', 'marginRight'],
  }
function v2(e, t) {
  const r = `offset${e[0].toUpperCase()}${e.slice(1)}`,
    n = t[r],
    i = p2[e]
  return n + parseInt(wr(t, i[0]), 10) + parseInt(wr(t, i[1]), 10)
}
const y2 = {
    [Fr]: 'collapse',
    [no]: 'collapsing',
    [zt]: 'collapsing',
    [mr]: 'collapse show',
  },
  m2 = E.forwardRef(
    (
      {
        onEnter: e,
        onEntering: t,
        onEntered: r,
        onExit: n,
        onExiting: i,
        className: a,
        children: o,
        dimension: s = 'height',
        in: c = !1,
        timeout: u = 300,
        mountOnEnter: l = !1,
        unmountOnExit: f = !1,
        appear: d = !1,
        getDimensionValue: h = v2,
        ...y
      },
      v,
    ) => {
      const p = typeof s == 'function' ? s() : s,
        x = A.useMemo(
          () =>
            Ea((S) => {
              S.style[p] = '0'
            }, e),
          [p, e],
        ),
        b = A.useMemo(
          () =>
            Ea((S) => {
              const P = `scroll${p[0].toUpperCase()}${p.slice(1)}`
              S.style[p] = `${S[P]}px`
            }, t),
          [p, t],
        ),
        w = A.useMemo(
          () =>
            Ea((S) => {
              S.style[p] = null
            }, r),
          [p, r],
        ),
        g = A.useMemo(
          () =>
            Ea((S) => {
              ;(S.style[p] = `${h(p, S)}px`), gb(S)
            }, n),
          [n, h, p],
        ),
        m = A.useMemo(
          () =>
            Ea((S) => {
              S.style[p] = null
            }, i),
          [p, i],
        )
      return O.jsx(Jd, {
        ref: v,
        addEndListener: Zd,
        ...y,
        'aria-expanded': y.role ? c : null,
        onEnter: x,
        onEntering: b,
        onEntered: w,
        onExit: g,
        onExiting: m,
        childRef: o.ref,
        in: c,
        timeout: u,
        mountOnEnter: l,
        unmountOnExit: f,
        appear: d,
        children: (S, P) =>
          E.cloneElement(o, {
            ...P,
            className: Y(
              a,
              o.props.className,
              y2[S],
              p === 'width' && 'collapse-horizontal',
            ),
          }),
      })
    },
  )
function g2(e) {
  const t = A.useRef(e)
  return (
    A.useEffect(() => {
      t.current = e
    }, [e]),
    t
  )
}
function Te(e) {
  const t = g2(e)
  return A.useCallback(
    function (...r) {
      return t.current && t.current(...r)
    },
    [t],
  )
}
const Jc = (e) =>
    A.forwardRef((t, r) =>
      O.jsx('div', { ...t, ref: r, className: Y(t.className, e) }),
    ),
  bb = Jc('h4')
bb.displayName = 'DivStyledAsH4'
const xb = A.forwardRef(
  ({ className: e, bsPrefix: t, as: r = bb, ...n }, i) => (
    (t = Z(t, 'alert-heading')), O.jsx(r, { ref: i, className: Y(e, t), ...n })
  ),
)
xb.displayName = 'AlertHeading'
function b2() {
  return A.useState(null)
}
function x2(e, t, r, n = !1) {
  const i = Te(r)
  A.useEffect(() => {
    const a = typeof e == 'function' ? e() : e
    return a.addEventListener(t, i, n), () => a.removeEventListener(t, i, n)
  }, [e])
}
function wb() {
  const e = A.useRef(!0),
    t = A.useRef(() => e.current)
  return (
    A.useEffect(
      () => (
        (e.current = !0),
        () => {
          e.current = !1
        }
      ),
      [],
    ),
    t.current
  )
}
function Ob(e) {
  const t = A.useRef(null)
  return (
    A.useEffect(() => {
      t.current = e
    }),
    t.current
  )
}
const w2 =
    typeof global < 'u' &&
    global.navigator &&
    global.navigator.product === 'ReactNative',
  O2 = typeof document < 'u',
  Fs = O2 || w2 ? A.useLayoutEffect : A.useEffect,
  S2 = ['as', 'disabled']
function A2(e, t) {
  if (e == null) return {}
  var r = {}
  for (var n in e)
    if ({}.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue
      r[n] = e[n]
    }
  return r
}
function P2(e) {
  return !e || e.trim() === '#'
}
function eh({
  tagName: e,
  disabled: t,
  href: r,
  target: n,
  rel: i,
  role: a,
  onClick: o,
  tabIndex: s = 0,
  type: c,
}) {
  e || (r != null || n != null || i != null ? (e = 'a') : (e = 'button'))
  const u = { tagName: e }
  if (e === 'button') return [{ type: c || 'button', disabled: t }, u]
  const l = (d) => {
      if (((t || (e === 'a' && P2(r))) && d.preventDefault(), t)) {
        d.stopPropagation()
        return
      }
      o == null || o(d)
    },
    f = (d) => {
      d.key === ' ' && (d.preventDefault(), l(d))
    }
  return (
    e === 'a' && (r || (r = '#'), t && (r = void 0)),
    [
      {
        role: a ?? 'button',
        disabled: void 0,
        tabIndex: t ? void 0 : s,
        href: r,
        target: e === 'a' ? n : void 0,
        'aria-disabled': t || void 0,
        rel: e === 'a' ? i : void 0,
        onClick: l,
        onKeyDown: f,
      },
      u,
    ]
  )
}
const th = A.forwardRef((e, t) => {
  let { as: r, disabled: n } = e,
    i = A2(e, S2)
  const [a, { tagName: o }] = eh(Object.assign({ tagName: r, disabled: n }, i))
  return O.jsx(o, Object.assign({}, i, a, { ref: t }))
})
th.displayName = 'Button'
const $2 = ['onKeyDown']
function E2(e, t) {
  if (e == null) return {}
  var r = {}
  for (var n in e)
    if ({}.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue
      r[n] = e[n]
    }
  return r
}
function _2(e) {
  return !e || e.trim() === '#'
}
const eu = A.forwardRef((e, t) => {
  let { onKeyDown: r } = e,
    n = E2(e, $2)
  const [i] = eh(Object.assign({ tagName: 'a' }, n)),
    a = Te((o) => {
      i.onKeyDown(o), r == null || r(o)
    })
  return _2(n.href) || n.role === 'button'
    ? O.jsx('a', Object.assign({ ref: t }, n, i, { onKeyDown: a }))
    : O.jsx('a', Object.assign({ ref: t }, n, { onKeyDown: r }))
})
eu.displayName = 'Anchor'
const Sb = A.forwardRef(
  ({ className: e, bsPrefix: t, as: r = eu, ...n }, i) => (
    (t = Z(t, 'alert-link')), O.jsx(r, { ref: i, className: Y(e, t), ...n })
  ),
)
Sb.displayName = 'AlertLink'
function C2(e) {
  return e.code === 'Escape' || e.keyCode === 27
}
function Ab() {
  const e = A.version.split('.')
  return { major: +e[0], minor: +e[1], patch: +e[2] }
}
const j2 = { [zt]: 'show', [mr]: 'show' },
  Us = A.forwardRef(
    (
      {
        className: e,
        children: t,
        transitionClasses: r = {},
        onEnter: n,
        ...i
      },
      a,
    ) => {
      const o = {
          in: !1,
          timeout: 300,
          mountOnEnter: !1,
          unmountOnExit: !1,
          appear: !1,
          ...i,
        },
        s = A.useCallback(
          (l, f) => {
            gb(l), n == null || n(l, f)
          },
          [n],
        ),
        { major: c } = Ab(),
        u = c >= 19 ? t.props.ref : t.ref
      return O.jsx(Jd, {
        ref: a,
        addEndListener: Zd,
        ...o,
        onEnter: s,
        childRef: u,
        children: (l, f) =>
          A.cloneElement(t, {
            ...f,
            className: Y('fade', e, t.props.className, j2[l], r[l]),
          }),
      })
    },
  )
Us.displayName = 'Fade'
const T2 = {
    'aria-label': X.string,
    onClick: X.func,
    variant: X.oneOf(['white']),
  },
  tu = A.forwardRef(
    ({ className: e, variant: t, 'aria-label': r = 'Close', ...n }, i) =>
      O.jsx('button', {
        ref: i,
        type: 'button',
        className: Y('btn-close', t && `btn-close-${t}`, e),
        'aria-label': r,
        ...n,
      }),
  )
tu.displayName = 'CloseButton'
tu.propTypes = T2
const Pb = A.forwardRef((e, t) => {
  const {
      bsPrefix: r,
      show: n = !0,
      closeLabel: i = 'Close alert',
      closeVariant: a,
      className: o,
      children: s,
      variant: c = 'primary',
      onClose: u,
      dismissible: l,
      transition: f = Us,
      ...d
    } = Go(e, { show: 'onClose' }),
    h = Z(r, 'alert'),
    y = Te((x) => {
      u && u(!1, x)
    }),
    v = f === !0 ? Us : f,
    p = O.jsxs('div', {
      role: 'alert',
      ...(v ? void 0 : d),
      ref: t,
      className: Y(o, h, c && `${h}-${c}`, l && `${h}-dismissible`),
      children: [
        l && O.jsx(tu, { onClick: y, 'aria-label': i, variant: a }),
        s,
      ],
    })
  return v
    ? O.jsx(v, { unmountOnExit: !0, ...d, ref: void 0, in: n, children: p })
    : n
      ? p
      : null
})
Pb.displayName = 'Alert'
const rh = Object.assign(Pb, { Link: Sb, Heading: xb }),
  Xe = A.forwardRef(
    (
      {
        as: e,
        bsPrefix: t,
        variant: r = 'primary',
        size: n,
        active: i = !1,
        disabled: a = !1,
        className: o,
        ...s
      },
      c,
    ) => {
      const u = Z(t, 'btn'),
        [l, { tagName: f }] = eh({ tagName: e, disabled: a, ...s }),
        d = f
      return O.jsx(d, {
        ...l,
        ...s,
        ref: c,
        disabled: a,
        className: Y(
          o,
          u,
          i && 'active',
          r && `${u}-${r}`,
          n && `${u}-${n}`,
          s.href && a && 'disabled',
        ),
      })
    },
  )
Xe.displayName = 'Button'
const $b = A.forwardRef(
  (
    {
      bsPrefix: e,
      size: t,
      vertical: r = !1,
      className: n,
      role: i = 'group',
      as: a = 'div',
      ...o
    },
    s,
  ) => {
    const c = Z(e, 'btn-group')
    let u = c
    return (
      r && (u = `${c}-vertical`),
      O.jsx(a, { ...o, ref: s, role: i, className: Y(n, u, t && `${c}-${t}`) })
    )
  },
)
$b.displayName = 'ButtonGroup'
const nh = A.forwardRef(
  ({ className: e, bsPrefix: t, as: r = 'div', ...n }, i) => (
    (t = Z(t, 'card-body')), O.jsx(r, { ref: i, className: Y(e, t), ...n })
  ),
)
nh.displayName = 'CardBody'
const Eb = A.forwardRef(
  ({ className: e, bsPrefix: t, as: r = 'div', ...n }, i) => (
    (t = Z(t, 'card-footer')), O.jsx(r, { ref: i, className: Y(e, t), ...n })
  ),
)
Eb.displayName = 'CardFooter'
const ih = A.createContext(null)
ih.displayName = 'CardHeaderContext'
const _b = A.forwardRef(
  ({ bsPrefix: e, className: t, as: r = 'div', ...n }, i) => {
    const a = Z(e, 'card-header'),
      o = A.useMemo(() => ({ cardHeaderBsPrefix: a }), [a])
    return O.jsx(ih.Provider, {
      value: o,
      children: O.jsx(r, { ref: i, ...n, className: Y(t, a) }),
    })
  },
)
_b.displayName = 'CardHeader'
const Cb = A.forwardRef(
  ({ bsPrefix: e, className: t, variant: r, as: n = 'img', ...i }, a) => {
    const o = Z(e, 'card-img')
    return O.jsx(n, { ref: a, className: Y(r ? `${o}-${r}` : o, t), ...i })
  },
)
Cb.displayName = 'CardImg'
const jb = A.forwardRef(
  ({ className: e, bsPrefix: t, as: r = 'div', ...n }, i) => (
    (t = Z(t, 'card-img-overlay')),
    O.jsx(r, { ref: i, className: Y(e, t), ...n })
  ),
)
jb.displayName = 'CardImgOverlay'
const Tb = A.forwardRef(
  ({ className: e, bsPrefix: t, as: r = 'a', ...n }, i) => (
    (t = Z(t, 'card-link')), O.jsx(r, { ref: i, className: Y(e, t), ...n })
  ),
)
Tb.displayName = 'CardLink'
const k2 = Jc('h6'),
  kb = A.forwardRef(
    ({ className: e, bsPrefix: t, as: r = k2, ...n }, i) => (
      (t = Z(t, 'card-subtitle')),
      O.jsx(r, { ref: i, className: Y(e, t), ...n })
    ),
  )
kb.displayName = 'CardSubtitle'
const Mb = A.forwardRef(
  ({ className: e, bsPrefix: t, as: r = 'p', ...n }, i) => (
    (t = Z(t, 'card-text')), O.jsx(r, { ref: i, className: Y(e, t), ...n })
  ),
)
Mb.displayName = 'CardText'
const M2 = Jc('h5'),
  Nb = A.forwardRef(
    ({ className: e, bsPrefix: t, as: r = M2, ...n }, i) => (
      (t = Z(t, 'card-title')), O.jsx(r, { ref: i, className: Y(e, t), ...n })
    ),
  )
Nb.displayName = 'CardTitle'
const Ib = A.forwardRef(
  (
    {
      bsPrefix: e,
      className: t,
      bg: r,
      text: n,
      border: i,
      body: a = !1,
      children: o,
      as: s = 'div',
      ...c
    },
    u,
  ) => {
    const l = Z(e, 'card')
    return O.jsx(s, {
      ref: u,
      ...c,
      className: Y(t, l, r && `bg-${r}`, n && `text-${n}`, i && `border-${i}`),
      children: a ? O.jsx(nh, { children: o }) : o,
    })
  },
)
Ib.displayName = 'Card'
const Je = Object.assign(Ib, {
  Img: Cb,
  Title: Nb,
  Subtitle: kb,
  Body: nh,
  Link: Tb,
  Text: Mb,
  Header: _b,
  Footer: Eb,
  ImgOverlay: jb,
})
function N2(e) {
  const t = A.useRef(e)
  return (t.current = e), t
}
function I2(e) {
  const t = N2(e)
  A.useEffect(() => () => t.current(), [])
}
function R2(e, t) {
  return A.Children.toArray(e).some((r) => A.isValidElement(r) && r.type === t)
}
function D2({ as: e, bsPrefix: t, className: r, ...n }) {
  t = Z(t, 'col')
  const i = fb(),
    a = db(),
    o = [],
    s = []
  return (
    i.forEach((c) => {
      const u = n[c]
      delete n[c]
      let l, f, d
      typeof u == 'object' && u != null
        ? ({ span: l, offset: f, order: d } = u)
        : (l = u)
      const h = c !== a ? `-${c}` : ''
      l && o.push(l === !0 ? `${t}${h}` : `${t}${h}-${l}`),
        d != null && s.push(`order${h}-${d}`),
        f != null && s.push(`offset${h}-${f}`)
    }),
    [
      { ...n, className: Y(r, ...o, ...s) },
      { as: e, bsPrefix: t, spans: o },
    ]
  )
}
const $r = A.forwardRef((e, t) => {
  const [{ className: r, ...n }, { as: i = 'div', bsPrefix: a, spans: o }] =
    D2(e)
  return O.jsx(i, { ...n, ref: t, className: Y(r, !o.length && a) })
})
$r.displayName = 'Col'
const Er = A.forwardRef(
  ({ bsPrefix: e, fluid: t = !1, as: r = 'div', className: n, ...i }, a) => {
    const o = Z(e, 'container'),
      s = typeof t == 'string' ? `-${t}` : '-fluid'
    return O.jsx(r, { ref: a, ...i, className: Y(n, t ? `${o}${s}` : o) })
  },
)
Er.displayName = 'Container'
var L2 = Function.prototype.bind.call(Function.prototype.call, [].slice)
function vr(e, t) {
  return L2(e.querySelectorAll(t))
}
function B2(e, t, r) {
  const n = A.useRef(e !== void 0),
    [i, a] = A.useState(t),
    o = e !== void 0,
    s = n.current
  return (
    (n.current = o),
    !o && s && i !== t && a(t),
    [
      o ? e : i,
      A.useCallback(
        (...c) => {
          const [u, ...l] = c
          let f = r == null ? void 0 : r(u, ...l)
          return a(u), f
        },
        [r],
      ),
    ]
  )
}
function Rb() {
  const [, e] = A.useReducer((t) => !t, !1)
  return e
}
const ru = A.createContext(null)
var Zp = Object.prototype.hasOwnProperty
function Jp(e, t, r) {
  for (r of e.keys()) if (za(r, t)) return r
}
function za(e, t) {
  var r, n, i
  if (e === t) return !0
  if (e && t && (r = e.constructor) === t.constructor) {
    if (r === Date) return e.getTime() === t.getTime()
    if (r === RegExp) return e.toString() === t.toString()
    if (r === Array) {
      if ((n = e.length) === t.length) for (; n-- && za(e[n], t[n]); );
      return n === -1
    }
    if (r === Set) {
      if (e.size !== t.size) return !1
      for (n of e)
        if (
          ((i = n),
          (i && typeof i == 'object' && ((i = Jp(t, i)), !i)) || !t.has(i))
        )
          return !1
      return !0
    }
    if (r === Map) {
      if (e.size !== t.size) return !1
      for (n of e)
        if (
          ((i = n[0]),
          (i && typeof i == 'object' && ((i = Jp(t, i)), !i)) ||
            !za(n[1], t.get(i)))
        )
          return !1
      return !0
    }
    if (r === ArrayBuffer) (e = new Uint8Array(e)), (t = new Uint8Array(t))
    else if (r === DataView) {
      if ((n = e.byteLength) === t.byteLength)
        for (; n-- && e.getInt8(n) === t.getInt8(n); );
      return n === -1
    }
    if (ArrayBuffer.isView(e)) {
      if ((n = e.byteLength) === t.byteLength) for (; n-- && e[n] === t[n]; );
      return n === -1
    }
    if (!r || typeof e == 'object') {
      n = 0
      for (r in e)
        if (
          (Zp.call(e, r) && ++n && !Zp.call(t, r)) ||
          !(r in t) ||
          !za(e[r], t[r])
        )
          return !1
      return Object.keys(t).length === n
    }
  }
  return e !== e && t !== t
}
function F2(e) {
  const t = wb()
  return [
    e[0],
    A.useCallback(
      (r) => {
        if (t()) return e[1](r)
      },
      [t, e[1]],
    ),
  ]
}
var ft = 'top',
  Mt = 'bottom',
  Nt = 'right',
  dt = 'left',
  ah = 'auto',
  Vo = [ft, Mt, Nt, dt],
  Ci = 'start',
  io = 'end',
  U2 = 'clippingParents',
  Db = 'viewport',
  _a = 'popper',
  W2 = 'reference',
  ev = Vo.reduce(function (e, t) {
    return e.concat([t + '-' + Ci, t + '-' + io])
  }, []),
  Lb = [].concat(Vo, [ah]).reduce(function (e, t) {
    return e.concat([t, t + '-' + Ci, t + '-' + io])
  }, []),
  q2 = 'beforeRead',
  H2 = 'read',
  z2 = 'afterRead',
  K2 = 'beforeMain',
  G2 = 'main',
  V2 = 'afterMain',
  X2 = 'beforeWrite',
  Y2 = 'write',
  Q2 = 'afterWrite',
  Z2 = [q2, H2, z2, K2, G2, V2, X2, Y2, Q2]
function er(e) {
  return e.split('-')[0]
}
function Ot(e) {
  if (e == null) return window
  if (e.toString() !== '[object Window]') {
    var t = e.ownerDocument
    return (t && t.defaultView) || window
  }
  return e
}
function In(e) {
  var t = Ot(e).Element
  return e instanceof t || e instanceof Element
}
function tr(e) {
  var t = Ot(e).HTMLElement
  return e instanceof t || e instanceof HTMLElement
}
function oh(e) {
  if (typeof ShadowRoot > 'u') return !1
  var t = Ot(e).ShadowRoot
  return e instanceof t || e instanceof ShadowRoot
}
var jn = Math.max,
  Ws = Math.min,
  ji = Math.round
function sf() {
  var e = navigator.userAgentData
  return e != null && e.brands && Array.isArray(e.brands)
    ? e.brands
        .map(function (t) {
          return t.brand + '/' + t.version
        })
        .join(' ')
    : navigator.userAgent
}
function Bb() {
  return !/^((?!chrome|android).)*safari/i.test(sf())
}
function Ti(e, t, r) {
  t === void 0 && (t = !1), r === void 0 && (r = !1)
  var n = e.getBoundingClientRect(),
    i = 1,
    a = 1
  t &&
    tr(e) &&
    ((i = (e.offsetWidth > 0 && ji(n.width) / e.offsetWidth) || 1),
    (a = (e.offsetHeight > 0 && ji(n.height) / e.offsetHeight) || 1))
  var o = In(e) ? Ot(e) : window,
    s = o.visualViewport,
    c = !Bb() && r,
    u = (n.left + (c && s ? s.offsetLeft : 0)) / i,
    l = (n.top + (c && s ? s.offsetTop : 0)) / a,
    f = n.width / i,
    d = n.height / a
  return {
    width: f,
    height: d,
    top: l,
    right: u + f,
    bottom: l + d,
    left: u,
    x: u,
    y: l,
  }
}
function sh(e) {
  var t = Ti(e),
    r = e.offsetWidth,
    n = e.offsetHeight
  return (
    Math.abs(t.width - r) <= 1 && (r = t.width),
    Math.abs(t.height - n) <= 1 && (n = t.height),
    { x: e.offsetLeft, y: e.offsetTop, width: r, height: n }
  )
}
function Fb(e, t) {
  var r = t.getRootNode && t.getRootNode()
  if (e.contains(t)) return !0
  if (r && oh(r)) {
    var n = t
    do {
      if (n && e.isSameNode(n)) return !0
      n = n.parentNode || n.host
    } while (n)
  }
  return !1
}
function rn(e) {
  return e ? (e.nodeName || '').toLowerCase() : null
}
function _r(e) {
  return Ot(e).getComputedStyle(e)
}
function J2(e) {
  return ['table', 'td', 'th'].indexOf(rn(e)) >= 0
}
function on(e) {
  return ((In(e) ? e.ownerDocument : e.document) || window.document)
    .documentElement
}
function nu(e) {
  return rn(e) === 'html'
    ? e
    : e.assignedSlot || e.parentNode || (oh(e) ? e.host : null) || on(e)
}
function tv(e) {
  return !tr(e) || _r(e).position === 'fixed' ? null : e.offsetParent
}
function eP(e) {
  var t = /firefox/i.test(sf()),
    r = /Trident/i.test(sf())
  if (r && tr(e)) {
    var n = _r(e)
    if (n.position === 'fixed') return null
  }
  var i = nu(e)
  for (oh(i) && (i = i.host); tr(i) && ['html', 'body'].indexOf(rn(i)) < 0; ) {
    var a = _r(i)
    if (
      a.transform !== 'none' ||
      a.perspective !== 'none' ||
      a.contain === 'paint' ||
      ['transform', 'perspective'].indexOf(a.willChange) !== -1 ||
      (t && a.willChange === 'filter') ||
      (t && a.filter && a.filter !== 'none')
    )
      return i
    i = i.parentNode
  }
  return null
}
function Xo(e) {
  for (var t = Ot(e), r = tv(e); r && J2(r) && _r(r).position === 'static'; )
    r = tv(r)
  return r &&
    (rn(r) === 'html' || (rn(r) === 'body' && _r(r).position === 'static'))
    ? t
    : r || eP(e) || t
}
function ch(e) {
  return ['top', 'bottom'].indexOf(e) >= 0 ? 'x' : 'y'
}
function Ka(e, t, r) {
  return jn(e, Ws(t, r))
}
function tP(e, t, r) {
  var n = Ka(e, t, r)
  return n > r ? r : n
}
function Ub() {
  return { top: 0, right: 0, bottom: 0, left: 0 }
}
function Wb(e) {
  return Object.assign({}, Ub(), e)
}
function qb(e, t) {
  return t.reduce(function (r, n) {
    return (r[n] = e), r
  }, {})
}
var rP = function (t, r) {
  return (
    (t =
      typeof t == 'function'
        ? t(Object.assign({}, r.rects, { placement: r.placement }))
        : t),
    Wb(typeof t != 'number' ? t : qb(t, Vo))
  )
}
function nP(e) {
  var t,
    r = e.state,
    n = e.name,
    i = e.options,
    a = r.elements.arrow,
    o = r.modifiersData.popperOffsets,
    s = er(r.placement),
    c = ch(s),
    u = [dt, Nt].indexOf(s) >= 0,
    l = u ? 'height' : 'width'
  if (!(!a || !o)) {
    var f = rP(i.padding, r),
      d = sh(a),
      h = c === 'y' ? ft : dt,
      y = c === 'y' ? Mt : Nt,
      v =
        r.rects.reference[l] + r.rects.reference[c] - o[c] - r.rects.popper[l],
      p = o[c] - r.rects.reference[c],
      x = Xo(a),
      b = x ? (c === 'y' ? x.clientHeight || 0 : x.clientWidth || 0) : 0,
      w = v / 2 - p / 2,
      g = f[h],
      m = b - d[l] - f[y],
      S = b / 2 - d[l] / 2 + w,
      P = Ka(g, S, m),
      $ = c
    r.modifiersData[n] = ((t = {}), (t[$] = P), (t.centerOffset = P - S), t)
  }
}
function iP(e) {
  var t = e.state,
    r = e.options,
    n = r.element,
    i = n === void 0 ? '[data-popper-arrow]' : n
  i != null &&
    ((typeof i == 'string' && ((i = t.elements.popper.querySelector(i)), !i)) ||
      (Fb(t.elements.popper, i) && (t.elements.arrow = i)))
}
const aP = {
  name: 'arrow',
  enabled: !0,
  phase: 'main',
  fn: nP,
  effect: iP,
  requires: ['popperOffsets'],
  requiresIfExists: ['preventOverflow'],
}
function ki(e) {
  return e.split('-')[1]
}
var oP = { top: 'auto', right: 'auto', bottom: 'auto', left: 'auto' }
function sP(e, t) {
  var r = e.x,
    n = e.y,
    i = t.devicePixelRatio || 1
  return { x: ji(r * i) / i || 0, y: ji(n * i) / i || 0 }
}
function rv(e) {
  var t,
    r = e.popper,
    n = e.popperRect,
    i = e.placement,
    a = e.variation,
    o = e.offsets,
    s = e.position,
    c = e.gpuAcceleration,
    u = e.adaptive,
    l = e.roundOffsets,
    f = e.isFixed,
    d = o.x,
    h = d === void 0 ? 0 : d,
    y = o.y,
    v = y === void 0 ? 0 : y,
    p = typeof l == 'function' ? l({ x: h, y: v }) : { x: h, y: v }
  ;(h = p.x), (v = p.y)
  var x = o.hasOwnProperty('x'),
    b = o.hasOwnProperty('y'),
    w = dt,
    g = ft,
    m = window
  if (u) {
    var S = Xo(r),
      P = 'clientHeight',
      $ = 'clientWidth'
    if (
      (S === Ot(r) &&
        ((S = on(r)),
        _r(S).position !== 'static' &&
          s === 'absolute' &&
          ((P = 'scrollHeight'), ($ = 'scrollWidth'))),
      (S = S),
      i === ft || ((i === dt || i === Nt) && a === io))
    ) {
      g = Mt
      var T = f && S === m && m.visualViewport ? m.visualViewport.height : S[P]
      ;(v -= T - n.height), (v *= c ? 1 : -1)
    }
    if (i === dt || ((i === ft || i === Mt) && a === io)) {
      w = Nt
      var k = f && S === m && m.visualViewport ? m.visualViewport.width : S[$]
      ;(h -= k - n.width), (h *= c ? 1 : -1)
    }
  }
  var C = Object.assign({ position: s }, u && oP),
    j = l === !0 ? sP({ x: h, y: v }, Ot(r)) : { x: h, y: v }
  if (((h = j.x), (v = j.y), c)) {
    var M
    return Object.assign(
      {},
      C,
      ((M = {}),
      (M[g] = b ? '0' : ''),
      (M[w] = x ? '0' : ''),
      (M.transform =
        (m.devicePixelRatio || 1) <= 1
          ? 'translate(' + h + 'px, ' + v + 'px)'
          : 'translate3d(' + h + 'px, ' + v + 'px, 0)'),
      M),
    )
  }
  return Object.assign(
    {},
    C,
    ((t = {}),
    (t[g] = b ? v + 'px' : ''),
    (t[w] = x ? h + 'px' : ''),
    (t.transform = ''),
    t),
  )
}
function cP(e) {
  var t = e.state,
    r = e.options,
    n = r.gpuAcceleration,
    i = n === void 0 ? !0 : n,
    a = r.adaptive,
    o = a === void 0 ? !0 : a,
    s = r.roundOffsets,
    c = s === void 0 ? !0 : s,
    u = {
      placement: er(t.placement),
      variation: ki(t.placement),
      popper: t.elements.popper,
      popperRect: t.rects.popper,
      gpuAcceleration: i,
      isFixed: t.options.strategy === 'fixed',
    }
  t.modifiersData.popperOffsets != null &&
    (t.styles.popper = Object.assign(
      {},
      t.styles.popper,
      rv(
        Object.assign({}, u, {
          offsets: t.modifiersData.popperOffsets,
          position: t.options.strategy,
          adaptive: o,
          roundOffsets: c,
        }),
      ),
    )),
    t.modifiersData.arrow != null &&
      (t.styles.arrow = Object.assign(
        {},
        t.styles.arrow,
        rv(
          Object.assign({}, u, {
            offsets: t.modifiersData.arrow,
            position: 'absolute',
            adaptive: !1,
            roundOffsets: c,
          }),
        ),
      )),
    (t.attributes.popper = Object.assign({}, t.attributes.popper, {
      'data-popper-placement': t.placement,
    }))
}
const uP = {
  name: 'computeStyles',
  enabled: !0,
  phase: 'beforeWrite',
  fn: cP,
  data: {},
}
var ds = { passive: !0 }
function lP(e) {
  var t = e.state,
    r = e.instance,
    n = e.options,
    i = n.scroll,
    a = i === void 0 ? !0 : i,
    o = n.resize,
    s = o === void 0 ? !0 : o,
    c = Ot(t.elements.popper),
    u = [].concat(t.scrollParents.reference, t.scrollParents.popper)
  return (
    a &&
      u.forEach(function (l) {
        l.addEventListener('scroll', r.update, ds)
      }),
    s && c.addEventListener('resize', r.update, ds),
    function () {
      a &&
        u.forEach(function (l) {
          l.removeEventListener('scroll', r.update, ds)
        }),
        s && c.removeEventListener('resize', r.update, ds)
    }
  )
}
const fP = {
  name: 'eventListeners',
  enabled: !0,
  phase: 'write',
  fn: function () {},
  effect: lP,
  data: {},
}
var dP = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' }
function ks(e) {
  return e.replace(/left|right|bottom|top/g, function (t) {
    return dP[t]
  })
}
var hP = { start: 'end', end: 'start' }
function nv(e) {
  return e.replace(/start|end/g, function (t) {
    return hP[t]
  })
}
function uh(e) {
  var t = Ot(e),
    r = t.pageXOffset,
    n = t.pageYOffset
  return { scrollLeft: r, scrollTop: n }
}
function lh(e) {
  return Ti(on(e)).left + uh(e).scrollLeft
}
function pP(e, t) {
  var r = Ot(e),
    n = on(e),
    i = r.visualViewport,
    a = n.clientWidth,
    o = n.clientHeight,
    s = 0,
    c = 0
  if (i) {
    ;(a = i.width), (o = i.height)
    var u = Bb()
    ;(u || (!u && t === 'fixed')) && ((s = i.offsetLeft), (c = i.offsetTop))
  }
  return { width: a, height: o, x: s + lh(e), y: c }
}
function vP(e) {
  var t,
    r = on(e),
    n = uh(e),
    i = (t = e.ownerDocument) == null ? void 0 : t.body,
    a = jn(
      r.scrollWidth,
      r.clientWidth,
      i ? i.scrollWidth : 0,
      i ? i.clientWidth : 0,
    ),
    o = jn(
      r.scrollHeight,
      r.clientHeight,
      i ? i.scrollHeight : 0,
      i ? i.clientHeight : 0,
    ),
    s = -n.scrollLeft + lh(e),
    c = -n.scrollTop
  return (
    _r(i || r).direction === 'rtl' &&
      (s += jn(r.clientWidth, i ? i.clientWidth : 0) - a),
    { width: a, height: o, x: s, y: c }
  )
}
function fh(e) {
  var t = _r(e),
    r = t.overflow,
    n = t.overflowX,
    i = t.overflowY
  return /auto|scroll|overlay|hidden/.test(r + i + n)
}
function Hb(e) {
  return ['html', 'body', '#document'].indexOf(rn(e)) >= 0
    ? e.ownerDocument.body
    : tr(e) && fh(e)
      ? e
      : Hb(nu(e))
}
function Ga(e, t) {
  var r
  t === void 0 && (t = [])
  var n = Hb(e),
    i = n === ((r = e.ownerDocument) == null ? void 0 : r.body),
    a = Ot(n),
    o = i ? [a].concat(a.visualViewport || [], fh(n) ? n : []) : n,
    s = t.concat(o)
  return i ? s : s.concat(Ga(nu(o)))
}
function cf(e) {
  return Object.assign({}, e, {
    left: e.x,
    top: e.y,
    right: e.x + e.width,
    bottom: e.y + e.height,
  })
}
function yP(e, t) {
  var r = Ti(e, !1, t === 'fixed')
  return (
    (r.top = r.top + e.clientTop),
    (r.left = r.left + e.clientLeft),
    (r.bottom = r.top + e.clientHeight),
    (r.right = r.left + e.clientWidth),
    (r.width = e.clientWidth),
    (r.height = e.clientHeight),
    (r.x = r.left),
    (r.y = r.top),
    r
  )
}
function iv(e, t, r) {
  return t === Db ? cf(pP(e, r)) : In(t) ? yP(t, r) : cf(vP(on(e)))
}
function mP(e) {
  var t = Ga(nu(e)),
    r = ['absolute', 'fixed'].indexOf(_r(e).position) >= 0,
    n = r && tr(e) ? Xo(e) : e
  return In(n)
    ? t.filter(function (i) {
        return In(i) && Fb(i, n) && rn(i) !== 'body'
      })
    : []
}
function gP(e, t, r, n) {
  var i = t === 'clippingParents' ? mP(e) : [].concat(t),
    a = [].concat(i, [r]),
    o = a[0],
    s = a.reduce(
      function (c, u) {
        var l = iv(e, u, n)
        return (
          (c.top = jn(l.top, c.top)),
          (c.right = Ws(l.right, c.right)),
          (c.bottom = Ws(l.bottom, c.bottom)),
          (c.left = jn(l.left, c.left)),
          c
        )
      },
      iv(e, o, n),
    )
  return (
    (s.width = s.right - s.left),
    (s.height = s.bottom - s.top),
    (s.x = s.left),
    (s.y = s.top),
    s
  )
}
function zb(e) {
  var t = e.reference,
    r = e.element,
    n = e.placement,
    i = n ? er(n) : null,
    a = n ? ki(n) : null,
    o = t.x + t.width / 2 - r.width / 2,
    s = t.y + t.height / 2 - r.height / 2,
    c
  switch (i) {
    case ft:
      c = { x: o, y: t.y - r.height }
      break
    case Mt:
      c = { x: o, y: t.y + t.height }
      break
    case Nt:
      c = { x: t.x + t.width, y: s }
      break
    case dt:
      c = { x: t.x - r.width, y: s }
      break
    default:
      c = { x: t.x, y: t.y }
  }
  var u = i ? ch(i) : null
  if (u != null) {
    var l = u === 'y' ? 'height' : 'width'
    switch (a) {
      case Ci:
        c[u] = c[u] - (t[l] / 2 - r[l] / 2)
        break
      case io:
        c[u] = c[u] + (t[l] / 2 - r[l] / 2)
        break
    }
  }
  return c
}
function ao(e, t) {
  t === void 0 && (t = {})
  var r = t,
    n = r.placement,
    i = n === void 0 ? e.placement : n,
    a = r.strategy,
    o = a === void 0 ? e.strategy : a,
    s = r.boundary,
    c = s === void 0 ? U2 : s,
    u = r.rootBoundary,
    l = u === void 0 ? Db : u,
    f = r.elementContext,
    d = f === void 0 ? _a : f,
    h = r.altBoundary,
    y = h === void 0 ? !1 : h,
    v = r.padding,
    p = v === void 0 ? 0 : v,
    x = Wb(typeof p != 'number' ? p : qb(p, Vo)),
    b = d === _a ? W2 : _a,
    w = e.rects.popper,
    g = e.elements[y ? b : d],
    m = gP(In(g) ? g : g.contextElement || on(e.elements.popper), c, l, o),
    S = Ti(e.elements.reference),
    P = zb({ reference: S, element: w, strategy: 'absolute', placement: i }),
    $ = cf(Object.assign({}, w, P)),
    T = d === _a ? $ : S,
    k = {
      top: m.top - T.top + x.top,
      bottom: T.bottom - m.bottom + x.bottom,
      left: m.left - T.left + x.left,
      right: T.right - m.right + x.right,
    },
    C = e.modifiersData.offset
  if (d === _a && C) {
    var j = C[i]
    Object.keys(k).forEach(function (M) {
      var N = [Nt, Mt].indexOf(M) >= 0 ? 1 : -1,
        R = [ft, Mt].indexOf(M) >= 0 ? 'y' : 'x'
      k[M] += j[R] * N
    })
  }
  return k
}
function bP(e, t) {
  t === void 0 && (t = {})
  var r = t,
    n = r.placement,
    i = r.boundary,
    a = r.rootBoundary,
    o = r.padding,
    s = r.flipVariations,
    c = r.allowedAutoPlacements,
    u = c === void 0 ? Lb : c,
    l = ki(n),
    f = l
      ? s
        ? ev
        : ev.filter(function (y) {
            return ki(y) === l
          })
      : Vo,
    d = f.filter(function (y) {
      return u.indexOf(y) >= 0
    })
  d.length === 0 && (d = f)
  var h = d.reduce(function (y, v) {
    return (
      (y[v] = ao(e, { placement: v, boundary: i, rootBoundary: a, padding: o })[
        er(v)
      ]),
      y
    )
  }, {})
  return Object.keys(h).sort(function (y, v) {
    return h[y] - h[v]
  })
}
function xP(e) {
  if (er(e) === ah) return []
  var t = ks(e)
  return [nv(e), t, nv(t)]
}
function wP(e) {
  var t = e.state,
    r = e.options,
    n = e.name
  if (!t.modifiersData[n]._skip) {
    for (
      var i = r.mainAxis,
        a = i === void 0 ? !0 : i,
        o = r.altAxis,
        s = o === void 0 ? !0 : o,
        c = r.fallbackPlacements,
        u = r.padding,
        l = r.boundary,
        f = r.rootBoundary,
        d = r.altBoundary,
        h = r.flipVariations,
        y = h === void 0 ? !0 : h,
        v = r.allowedAutoPlacements,
        p = t.options.placement,
        x = er(p),
        b = x === p,
        w = c || (b || !y ? [ks(p)] : xP(p)),
        g = [p].concat(w).reduce(function (ne, he) {
          return ne.concat(
            er(he) === ah
              ? bP(t, {
                  placement: he,
                  boundary: l,
                  rootBoundary: f,
                  padding: u,
                  flipVariations: y,
                  allowedAutoPlacements: v,
                })
              : he,
          )
        }, []),
        m = t.rects.reference,
        S = t.rects.popper,
        P = new Map(),
        $ = !0,
        T = g[0],
        k = 0;
      k < g.length;
      k++
    ) {
      var C = g[k],
        j = er(C),
        M = ki(C) === Ci,
        N = [ft, Mt].indexOf(j) >= 0,
        R = N ? 'width' : 'height',
        I = ao(t, {
          placement: C,
          boundary: l,
          rootBoundary: f,
          altBoundary: d,
          padding: u,
        }),
        L = N ? (M ? Nt : dt) : M ? Mt : ft
      m[R] > S[R] && (L = ks(L))
      var B = ks(L),
        W = []
      if (
        (a && W.push(I[j] <= 0),
        s && W.push(I[L] <= 0, I[B] <= 0),
        W.every(function (ne) {
          return ne
        }))
      ) {
        ;(T = C), ($ = !1)
        break
      }
      P.set(C, W)
    }
    if ($)
      for (
        var G = y ? 3 : 1,
          z = function (he) {
            var Ge = g.find(function (je) {
              var Le = P.get(je)
              if (Le)
                return Le.slice(0, he).every(function (q) {
                  return q
                })
            })
            if (Ge) return (T = Ge), 'break'
          },
          H = G;
        H > 0;
        H--
      ) {
        var Q = z(H)
        if (Q === 'break') break
      }
    t.placement !== T &&
      ((t.modifiersData[n]._skip = !0), (t.placement = T), (t.reset = !0))
  }
}
const OP = {
  name: 'flip',
  enabled: !0,
  phase: 'main',
  fn: wP,
  requiresIfExists: ['offset'],
  data: { _skip: !1 },
}
function av(e, t, r) {
  return (
    r === void 0 && (r = { x: 0, y: 0 }),
    {
      top: e.top - t.height - r.y,
      right: e.right - t.width + r.x,
      bottom: e.bottom - t.height + r.y,
      left: e.left - t.width - r.x,
    }
  )
}
function ov(e) {
  return [ft, Nt, Mt, dt].some(function (t) {
    return e[t] >= 0
  })
}
function SP(e) {
  var t = e.state,
    r = e.name,
    n = t.rects.reference,
    i = t.rects.popper,
    a = t.modifiersData.preventOverflow,
    o = ao(t, { elementContext: 'reference' }),
    s = ao(t, { altBoundary: !0 }),
    c = av(o, n),
    u = av(s, i, a),
    l = ov(c),
    f = ov(u)
  ;(t.modifiersData[r] = {
    referenceClippingOffsets: c,
    popperEscapeOffsets: u,
    isReferenceHidden: l,
    hasPopperEscaped: f,
  }),
    (t.attributes.popper = Object.assign({}, t.attributes.popper, {
      'data-popper-reference-hidden': l,
      'data-popper-escaped': f,
    }))
}
const AP = {
  name: 'hide',
  enabled: !0,
  phase: 'main',
  requiresIfExists: ['preventOverflow'],
  fn: SP,
}
function PP(e, t, r) {
  var n = er(e),
    i = [dt, ft].indexOf(n) >= 0 ? -1 : 1,
    a = typeof r == 'function' ? r(Object.assign({}, t, { placement: e })) : r,
    o = a[0],
    s = a[1]
  return (
    (o = o || 0),
    (s = (s || 0) * i),
    [dt, Nt].indexOf(n) >= 0 ? { x: s, y: o } : { x: o, y: s }
  )
}
function $P(e) {
  var t = e.state,
    r = e.options,
    n = e.name,
    i = r.offset,
    a = i === void 0 ? [0, 0] : i,
    o = Lb.reduce(function (l, f) {
      return (l[f] = PP(f, t.rects, a)), l
    }, {}),
    s = o[t.placement],
    c = s.x,
    u = s.y
  t.modifiersData.popperOffsets != null &&
    ((t.modifiersData.popperOffsets.x += c),
    (t.modifiersData.popperOffsets.y += u)),
    (t.modifiersData[n] = o)
}
const EP = {
  name: 'offset',
  enabled: !0,
  phase: 'main',
  requires: ['popperOffsets'],
  fn: $P,
}
function _P(e) {
  var t = e.state,
    r = e.name
  t.modifiersData[r] = zb({
    reference: t.rects.reference,
    element: t.rects.popper,
    strategy: 'absolute',
    placement: t.placement,
  })
}
const CP = {
  name: 'popperOffsets',
  enabled: !0,
  phase: 'read',
  fn: _P,
  data: {},
}
function jP(e) {
  return e === 'x' ? 'y' : 'x'
}
function TP(e) {
  var t = e.state,
    r = e.options,
    n = e.name,
    i = r.mainAxis,
    a = i === void 0 ? !0 : i,
    o = r.altAxis,
    s = o === void 0 ? !1 : o,
    c = r.boundary,
    u = r.rootBoundary,
    l = r.altBoundary,
    f = r.padding,
    d = r.tether,
    h = d === void 0 ? !0 : d,
    y = r.tetherOffset,
    v = y === void 0 ? 0 : y,
    p = ao(t, { boundary: c, rootBoundary: u, padding: f, altBoundary: l }),
    x = er(t.placement),
    b = ki(t.placement),
    w = !b,
    g = ch(x),
    m = jP(g),
    S = t.modifiersData.popperOffsets,
    P = t.rects.reference,
    $ = t.rects.popper,
    T =
      typeof v == 'function'
        ? v(Object.assign({}, t.rects, { placement: t.placement }))
        : v,
    k =
      typeof T == 'number'
        ? { mainAxis: T, altAxis: T }
        : Object.assign({ mainAxis: 0, altAxis: 0 }, T),
    C = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null,
    j = { x: 0, y: 0 }
  if (S) {
    if (a) {
      var M,
        N = g === 'y' ? ft : dt,
        R = g === 'y' ? Mt : Nt,
        I = g === 'y' ? 'height' : 'width',
        L = S[g],
        B = L + p[N],
        W = L - p[R],
        G = h ? -$[I] / 2 : 0,
        z = b === Ci ? P[I] : $[I],
        H = b === Ci ? -$[I] : -P[I],
        Q = t.elements.arrow,
        ne = h && Q ? sh(Q) : { width: 0, height: 0 },
        he = t.modifiersData['arrow#persistent']
          ? t.modifiersData['arrow#persistent'].padding
          : Ub(),
        Ge = he[N],
        je = he[R],
        Le = Ka(0, P[I], ne[I]),
        q = w ? P[I] / 2 - G - Le - Ge - k.mainAxis : z - Le - Ge - k.mainAxis,
        te = w
          ? -P[I] / 2 + G + Le + je + k.mainAxis
          : H + Le + je + k.mainAxis,
        ae = t.elements.arrow && Xo(t.elements.arrow),
        F = ae ? (g === 'y' ? ae.clientTop || 0 : ae.clientLeft || 0) : 0,
        be = (M = C == null ? void 0 : C[g]) != null ? M : 0,
        le = L + q - be - F,
        oe = L + te - be,
        Oe = Ka(h ? Ws(B, le) : B, L, h ? jn(W, oe) : W)
      ;(S[g] = Oe), (j[g] = Oe - L)
    }
    if (s) {
      var Ne,
        Lt = g === 'x' ? ft : dt,
        Xn = g === 'x' ? Mt : Nt,
        et = S[m],
        St = m === 'y' ? 'height' : 'width',
        Yn = et + p[Lt],
        $a = et - p[Xn],
        Qn = [ft, dt].indexOf(x) !== -1,
        Mp = (Ne = C == null ? void 0 : C[m]) != null ? Ne : 0,
        Np = Qn ? Yn : et - P[St] - $[St] - Mp + k.altAxis,
        Ip = Qn ? et + P[St] + $[St] - Mp - k.altAxis : $a,
        Rp = h && Qn ? tP(Np, et, Ip) : Ka(h ? Np : Yn, et, h ? Ip : $a)
      ;(S[m] = Rp), (j[m] = Rp - et)
    }
    t.modifiersData[n] = j
  }
}
const kP = {
  name: 'preventOverflow',
  enabled: !0,
  phase: 'main',
  fn: TP,
  requiresIfExists: ['offset'],
}
function MP(e) {
  return { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop }
}
function NP(e) {
  return e === Ot(e) || !tr(e) ? uh(e) : MP(e)
}
function IP(e) {
  var t = e.getBoundingClientRect(),
    r = ji(t.width) / e.offsetWidth || 1,
    n = ji(t.height) / e.offsetHeight || 1
  return r !== 1 || n !== 1
}
function RP(e, t, r) {
  r === void 0 && (r = !1)
  var n = tr(t),
    i = tr(t) && IP(t),
    a = on(t),
    o = Ti(e, i, r),
    s = { scrollLeft: 0, scrollTop: 0 },
    c = { x: 0, y: 0 }
  return (
    (n || (!n && !r)) &&
      ((rn(t) !== 'body' || fh(a)) && (s = NP(t)),
      tr(t)
        ? ((c = Ti(t, !0)), (c.x += t.clientLeft), (c.y += t.clientTop))
        : a && (c.x = lh(a))),
    {
      x: o.left + s.scrollLeft - c.x,
      y: o.top + s.scrollTop - c.y,
      width: o.width,
      height: o.height,
    }
  )
}
function DP(e) {
  var t = new Map(),
    r = new Set(),
    n = []
  e.forEach(function (a) {
    t.set(a.name, a)
  })
  function i(a) {
    r.add(a.name)
    var o = [].concat(a.requires || [], a.requiresIfExists || [])
    o.forEach(function (s) {
      if (!r.has(s)) {
        var c = t.get(s)
        c && i(c)
      }
    }),
      n.push(a)
  }
  return (
    e.forEach(function (a) {
      r.has(a.name) || i(a)
    }),
    n
  )
}
function LP(e) {
  var t = DP(e)
  return Z2.reduce(function (r, n) {
    return r.concat(
      t.filter(function (i) {
        return i.phase === n
      }),
    )
  }, [])
}
function BP(e) {
  var t
  return function () {
    return (
      t ||
        (t = new Promise(function (r) {
          Promise.resolve().then(function () {
            ;(t = void 0), r(e())
          })
        })),
      t
    )
  }
}
function FP(e) {
  var t = e.reduce(function (r, n) {
    var i = r[n.name]
    return (
      (r[n.name] = i
        ? Object.assign({}, i, n, {
            options: Object.assign({}, i.options, n.options),
            data: Object.assign({}, i.data, n.data),
          })
        : n),
      r
    )
  }, {})
  return Object.keys(t).map(function (r) {
    return t[r]
  })
}
var sv = { placement: 'bottom', modifiers: [], strategy: 'absolute' }
function cv() {
  for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
    t[r] = arguments[r]
  return !t.some(function (n) {
    return !(n && typeof n.getBoundingClientRect == 'function')
  })
}
function UP(e) {
  e === void 0 && (e = {})
  var t = e,
    r = t.defaultModifiers,
    n = r === void 0 ? [] : r,
    i = t.defaultOptions,
    a = i === void 0 ? sv : i
  return function (s, c, u) {
    u === void 0 && (u = a)
    var l = {
        placement: 'bottom',
        orderedModifiers: [],
        options: Object.assign({}, sv, a),
        modifiersData: {},
        elements: { reference: s, popper: c },
        attributes: {},
        styles: {},
      },
      f = [],
      d = !1,
      h = {
        state: l,
        setOptions: function (x) {
          var b = typeof x == 'function' ? x(l.options) : x
          v(),
            (l.options = Object.assign({}, a, l.options, b)),
            (l.scrollParents = {
              reference: In(s)
                ? Ga(s)
                : s.contextElement
                  ? Ga(s.contextElement)
                  : [],
              popper: Ga(c),
            })
          var w = LP(FP([].concat(n, l.options.modifiers)))
          return (
            (l.orderedModifiers = w.filter(function (g) {
              return g.enabled
            })),
            y(),
            h.update()
          )
        },
        forceUpdate: function () {
          if (!d) {
            var x = l.elements,
              b = x.reference,
              w = x.popper
            if (cv(b, w)) {
              ;(l.rects = {
                reference: RP(b, Xo(w), l.options.strategy === 'fixed'),
                popper: sh(w),
              }),
                (l.reset = !1),
                (l.placement = l.options.placement),
                l.orderedModifiers.forEach(function (k) {
                  return (l.modifiersData[k.name] = Object.assign({}, k.data))
                })
              for (var g = 0; g < l.orderedModifiers.length; g++) {
                if (l.reset === !0) {
                  ;(l.reset = !1), (g = -1)
                  continue
                }
                var m = l.orderedModifiers[g],
                  S = m.fn,
                  P = m.options,
                  $ = P === void 0 ? {} : P,
                  T = m.name
                typeof S == 'function' &&
                  (l = S({ state: l, options: $, name: T, instance: h }) || l)
              }
            }
          }
        },
        update: BP(function () {
          return new Promise(function (p) {
            h.forceUpdate(), p(l)
          })
        }),
        destroy: function () {
          v(), (d = !0)
        },
      }
    if (!cv(s, c)) return h
    h.setOptions(u).then(function (p) {
      !d && u.onFirstUpdate && u.onFirstUpdate(p)
    })
    function y() {
      l.orderedModifiers.forEach(function (p) {
        var x = p.name,
          b = p.options,
          w = b === void 0 ? {} : b,
          g = p.effect
        if (typeof g == 'function') {
          var m = g({ state: l, name: x, instance: h, options: w }),
            S = function () {}
          f.push(m || S)
        }
      })
    }
    function v() {
      f.forEach(function (p) {
        return p()
      }),
        (f = [])
    }
    return h
  }
}
const WP = UP({ defaultModifiers: [AP, CP, uP, fP, EP, OP, kP, aP] }),
  qP = ['enabled', 'placement', 'strategy', 'modifiers']
function HP(e, t) {
  if (e == null) return {}
  var r = {}
  for (var n in e)
    if ({}.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue
      r[n] = e[n]
    }
  return r
}
const zP = {
    name: 'applyStyles',
    enabled: !1,
    phase: 'afterWrite',
    fn: () => {},
  },
  KP = {
    name: 'ariaDescribedBy',
    enabled: !0,
    phase: 'afterWrite',
    effect:
      ({ state: e }) =>
      () => {
        const { reference: t, popper: r } = e.elements
        if ('removeAttribute' in t) {
          const n = (t.getAttribute('aria-describedby') || '')
            .split(',')
            .filter((i) => i.trim() !== r.id)
          n.length
            ? t.setAttribute('aria-describedby', n.join(','))
            : t.removeAttribute('aria-describedby')
        }
      },
    fn: ({ state: e }) => {
      var t
      const { popper: r, reference: n } = e.elements,
        i = (t = r.getAttribute('role')) == null ? void 0 : t.toLowerCase()
      if (r.id && i === 'tooltip' && 'setAttribute' in n) {
        const a = n.getAttribute('aria-describedby')
        if (a && a.split(',').indexOf(r.id) !== -1) return
        n.setAttribute('aria-describedby', a ? `${a},${r.id}` : r.id)
      }
    },
  },
  GP = []
function VP(e, t, r = {}) {
  let {
      enabled: n = !0,
      placement: i = 'bottom',
      strategy: a = 'absolute',
      modifiers: o = GP,
    } = r,
    s = HP(r, qP)
  const c = A.useRef(o),
    u = A.useRef(),
    l = A.useCallback(() => {
      var p
      ;(p = u.current) == null || p.update()
    }, []),
    f = A.useCallback(() => {
      var p
      ;(p = u.current) == null || p.forceUpdate()
    }, []),
    [d, h] = F2(
      A.useState({
        placement: i,
        update: l,
        forceUpdate: f,
        attributes: {},
        styles: { popper: {}, arrow: {} },
      }),
    ),
    y = A.useMemo(
      () => ({
        name: 'updateStateModifier',
        enabled: !0,
        phase: 'write',
        requires: ['computeStyles'],
        fn: ({ state: p }) => {
          const x = {},
            b = {}
          Object.keys(p.elements).forEach((w) => {
            ;(x[w] = p.styles[w]), (b[w] = p.attributes[w])
          }),
            h({
              state: p,
              styles: x,
              attributes: b,
              update: l,
              forceUpdate: f,
              placement: p.placement,
            })
        },
      }),
      [l, f, h],
    ),
    v = A.useMemo(() => (za(c.current, o) || (c.current = o), c.current), [o])
  return (
    A.useEffect(() => {
      !u.current ||
        !n ||
        u.current.setOptions({
          placement: i,
          strategy: a,
          modifiers: [...v, y, zP],
        })
    }, [a, i, y, n, v]),
    A.useEffect(() => {
      if (!(!n || e == null || t == null))
        return (
          (u.current = WP(
            e,
            t,
            Object.assign({}, s, {
              placement: i,
              strategy: a,
              modifiers: [...v, KP, y],
            }),
          )),
          () => {
            u.current != null &&
              (u.current.destroy(),
              (u.current = void 0),
              h((p) =>
                Object.assign({}, p, {
                  attributes: {},
                  styles: { popper: {} },
                }),
              ))
          }
        )
    }, [n, e, t]),
    d
  )
}
function qs(e, t) {
  if (e.contains) return e.contains(t)
  if (e.compareDocumentPosition)
    return e === t || !!(e.compareDocumentPosition(t) & 16)
}
var XP = function () {},
  YP = XP
const QP = me(YP),
  uv = () => {}
function ZP(e) {
  return e.button === 0
}
function JP(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey)
}
const il = (e) => e && ('current' in e ? e.current : e),
  lv = { click: 'mousedown', mouseup: 'mousedown', pointerup: 'pointerdown' }
function e$(e, t = uv, { disabled: r, clickTrigger: n = 'click' } = {}) {
  const i = A.useRef(!1),
    a = A.useRef(!1),
    o = A.useCallback(
      (u) => {
        const l = il(e)
        QP(
          !!l,
          'ClickOutside captured a close event but does not have a ref to compare it to. useClickOutside(), should be passed a ref that resolves to a DOM node',
        ),
          (i.current = !l || JP(u) || !ZP(u) || !!qs(l, u.target) || a.current),
          (a.current = !1)
      },
      [e],
    ),
    s = Te((u) => {
      const l = il(e)
      l && qs(l, u.target) && (a.current = !0)
    }),
    c = Te((u) => {
      i.current || t(u)
    })
  A.useEffect(() => {
    var u, l
    if (r || e == null) return
    const f = Qc(il(e)),
      d = f.defaultView || window
    let h =
        (u = d.event) != null ? u : (l = d.parent) == null ? void 0 : l.event,
      y = null
    lv[n] && (y = Zr(f, lv[n], s, !0))
    const v = Zr(f, n, o, !0),
      p = Zr(f, n, (b) => {
        if (b === h) {
          h = void 0
          return
        }
        c(b)
      })
    let x = []
    return (
      'ontouchstart' in f.documentElement &&
        (x = [].slice.call(f.body.children).map((b) => Zr(b, 'mousemove', uv))),
      () => {
        y == null || y(), v(), p(), x.forEach((b) => b())
      }
    )
  }, [e, r, n, o, s, c])
}
function t$(e) {
  const t = {}
  return Array.isArray(e)
    ? (e == null ||
        e.forEach((r) => {
          t[r.name] = r
        }),
      t)
    : e || t
}
function r$(e = {}) {
  return Array.isArray(e)
    ? e
    : Object.keys(e).map((t) => ((e[t].name = t), e[t]))
}
function n$({
  enabled: e,
  enableEvents: t,
  placement: r,
  flip: n,
  offset: i,
  fixed: a,
  containerPadding: o,
  arrowElement: s,
  popperConfig: c = {},
}) {
  var u, l, f, d, h
  const y = t$(c.modifiers)
  return Object.assign({}, c, {
    placement: r,
    enabled: e,
    strategy: a ? 'fixed' : c.strategy,
    modifiers: r$(
      Object.assign({}, y, {
        eventListeners: {
          enabled: t,
          options: (u = y.eventListeners) == null ? void 0 : u.options,
        },
        preventOverflow: Object.assign({}, y.preventOverflow, {
          options: o
            ? Object.assign(
                { padding: o },
                (l = y.preventOverflow) == null ? void 0 : l.options,
              )
            : (f = y.preventOverflow) == null
              ? void 0
              : f.options,
        }),
        offset: {
          options: Object.assign(
            { offset: i },
            (d = y.offset) == null ? void 0 : d.options,
          ),
        },
        arrow: Object.assign({}, y.arrow, {
          enabled: !!s,
          options: Object.assign(
            {},
            (h = y.arrow) == null ? void 0 : h.options,
            { element: s },
          ),
        }),
        flip: Object.assign({ enabled: !!n }, y.flip),
      }),
    ),
  })
}
const i$ = ['children', 'usePopper']
function a$(e, t) {
  if (e == null) return {}
  var r = {}
  for (var n in e)
    if ({}.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue
      r[n] = e[n]
    }
  return r
}
const o$ = () => {}
function Kb(e = {}) {
  const t = A.useContext(ru),
    [r, n] = b2(),
    i = A.useRef(!1),
    {
      flip: a,
      offset: o,
      rootCloseEvent: s,
      fixed: c = !1,
      placement: u,
      popperConfig: l = {},
      enableEventListeners: f = !0,
      usePopper: d = !!t,
    } = e,
    h = (t == null ? void 0 : t.show) == null ? !!e.show : t.show
  h && !i.current && (i.current = !0)
  const y = (S) => {
      t == null || t.toggle(!1, S)
    },
    { placement: v, setMenu: p, menuElement: x, toggleElement: b } = t || {},
    w = VP(
      b,
      x,
      n$({
        placement: u || v || 'bottom-start',
        enabled: d,
        enableEvents: f ?? h,
        offset: o,
        flip: a,
        fixed: c,
        arrowElement: r,
        popperConfig: l,
      }),
    ),
    g = Object.assign(
      { ref: p || o$, 'aria-labelledby': b == null ? void 0 : b.id },
      w.attributes.popper,
      { style: w.styles.popper },
    ),
    m = {
      show: h,
      placement: v,
      hasShown: i.current,
      toggle: t == null ? void 0 : t.toggle,
      popper: d ? w : null,
      arrowProps: d
        ? Object.assign({ ref: n }, w.attributes.arrow, {
            style: w.styles.arrow,
          })
        : {},
    }
  return e$(x, y, { clickTrigger: s, disabled: !h }), [g, m]
}
function Gb(e) {
  let { children: t, usePopper: r = !0 } = e,
    n = a$(e, i$)
  const [i, a] = Kb(Object.assign({}, n, { usePopper: r }))
  return O.jsx(O.Fragment, { children: t(i, a) })
}
Gb.displayName = 'DropdownMenu'
const Hs = { prefix: String(Math.round(Math.random() * 1e10)), current: 0 },
  Vb = E.createContext(Hs),
  s$ = E.createContext(!1)
let c$ = !!(
    typeof window < 'u' &&
    window.document &&
    window.document.createElement
  ),
  al = new WeakMap()
function u$(e = !1) {
  let t = A.useContext(Vb),
    r = A.useRef(null)
  if (r.current === null && !e) {
    var n, i
    let a =
      (i = E.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED) === null ||
      i === void 0 ||
      (n = i.ReactCurrentOwner) === null ||
      n === void 0
        ? void 0
        : n.current
    if (a) {
      let o = al.get(a)
      o == null
        ? al.set(a, { id: t.current, state: a.memoizedState })
        : a.memoizedState !== o.state && ((t.current = o.id), al.delete(a))
    }
    r.current = ++t.current
  }
  return r.current
}
function l$(e) {
  let t = A.useContext(Vb)
  t === Hs &&
    !c$ &&
    console.warn(
      'When server rendering, you must wrap your application in an <SSRProvider> to ensure consistent ids are generated between the client and server.',
    )
  let r = u$(!!e),
    n = `react-aria${t.prefix}`
  return e || `${n}-${r}`
}
function f$(e) {
  let t = E.useId(),
    [r] = A.useState(y$()),
    n = r ? 'react-aria' : `react-aria${Hs.prefix}`
  return e || `${n}-${t}`
}
const d$ = typeof E.useId == 'function' ? f$ : l$
function h$() {
  return !1
}
function p$() {
  return !0
}
function v$(e) {
  return () => {}
}
function y$() {
  return typeof E.useSyncExternalStore == 'function'
    ? E.useSyncExternalStore(v$, h$, p$)
    : A.useContext(s$)
}
const Xb = (e) => {
    var t
    return (
      ((t = e.getAttribute('role')) == null ? void 0 : t.toLowerCase()) ===
      'menu'
    )
  },
  fv = () => {}
function Yb() {
  const e = d$(),
    {
      show: t = !1,
      toggle: r = fv,
      setToggle: n,
      menuElement: i,
    } = A.useContext(ru) || {},
    a = A.useCallback(
      (s) => {
        r(!t, s)
      },
      [t, r],
    ),
    o = { id: e, ref: n || fv, onClick: a, 'aria-expanded': !!t }
  return i && Xb(i) && (o['aria-haspopup'] = !0), [o, { show: t, toggle: r }]
}
function Qb({ children: e }) {
  const [t, r] = Yb()
  return O.jsx(O.Fragment, { children: e(t, r) })
}
Qb.displayName = 'DropdownToggle'
const Rn = A.createContext(null),
  Mi = (e, t = null) => (e != null ? String(e) : t || null),
  iu = A.createContext(null)
iu.displayName = 'NavContext'
const m$ = 'data-rr-ui-',
  g$ = 'rrUi'
function la(e) {
  return `${m$}${e}`
}
function b$(e) {
  return `${g$}${e}`
}
const x$ = ['eventKey', 'disabled', 'onClick', 'active', 'as']
function w$(e, t) {
  if (e == null) return {}
  var r = {}
  for (var n in e)
    if ({}.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue
      r[n] = e[n]
    }
  return r
}
function Zb({ key: e, href: t, active: r, disabled: n, onClick: i }) {
  const a = A.useContext(Rn),
    o = A.useContext(iu),
    { activeKey: s } = o || {},
    c = Mi(e, t),
    u = r == null && e != null ? Mi(s) === c : r
  return [
    {
      onClick: Te((f) => {
        n || (i == null || i(f), a && !f.isPropagationStopped() && a(c, f))
      }),
      'aria-disabled': n || void 0,
      'aria-selected': u,
      [la('dropdown-item')]: '',
    },
    { isActive: u },
  ]
}
const Jb = A.forwardRef((e, t) => {
  let { eventKey: r, disabled: n, onClick: i, active: a, as: o = th } = e,
    s = w$(e, x$)
  const [c] = Zb({ key: r, href: s.href, disabled: n, onClick: i, active: a })
  return O.jsx(o, Object.assign({}, s, { ref: t }, c))
})
Jb.displayName = 'DropdownItem'
const ex = A.createContext(Zc ? window : void 0)
ex.Provider
function au() {
  return A.useContext(ex)
}
function dv() {
  const e = Rb(),
    t = A.useRef(null),
    r = A.useCallback(
      (n) => {
        ;(t.current = n), e()
      },
      [e],
    )
  return [t, r]
}
function Yo({
  defaultShow: e,
  show: t,
  onSelect: r,
  onToggle: n,
  itemSelector: i = `* [${la('dropdown-item')}]`,
  focusFirstItemOnShow: a,
  placement: o = 'bottom-start',
  children: s,
}) {
  const c = au(),
    [u, l] = B2(t, e, n),
    [f, d] = dv(),
    h = f.current,
    [y, v] = dv(),
    p = y.current,
    x = Ob(u),
    b = A.useRef(null),
    w = A.useRef(!1),
    g = A.useContext(Rn),
    m = A.useCallback(
      (C, j, M = j == null ? void 0 : j.type) => {
        l(C, { originalEvent: j, source: M })
      },
      [l],
    ),
    S = Te((C, j) => {
      r == null || r(C, j),
        m(!1, j, 'select'),
        j.isPropagationStopped() || g == null || g(C, j)
    }),
    P = A.useMemo(
      () => ({
        toggle: m,
        placement: o,
        show: u,
        menuElement: h,
        toggleElement: p,
        setMenu: d,
        setToggle: v,
      }),
      [m, o, u, h, p, d, v],
    )
  h && x && !u && (w.current = h.contains(h.ownerDocument.activeElement))
  const $ = Te(() => {
      p && p.focus && p.focus()
    }),
    T = Te(() => {
      const C = b.current
      let j = a
      if (
        (j == null && (j = f.current && Xb(f.current) ? 'keyboard' : !1),
        j === !1 || (j === 'keyboard' && !/^key.+$/.test(C)))
      )
        return
      const M = vr(f.current, i)[0]
      M && M.focus && M.focus()
    })
  A.useEffect(() => {
    u ? T() : w.current && ((w.current = !1), $())
  }, [u, w, $, T]),
    A.useEffect(() => {
      b.current = null
    })
  const k = (C, j) => {
    if (!f.current) return null
    const M = vr(f.current, i)
    let N = M.indexOf(C) + j
    return (N = Math.max(0, Math.min(N, M.length))), M[N]
  }
  return (
    x2(
      A.useCallback(() => c.document, [c]),
      'keydown',
      (C) => {
        var j, M
        const { key: N } = C,
          R = C.target,
          I = (j = f.current) == null ? void 0 : j.contains(R),
          L = (M = y.current) == null ? void 0 : M.contains(R)
        if (
          (/input|textarea/i.test(R.tagName) &&
            (N === ' ' ||
              (N !== 'Escape' && I) ||
              (N === 'Escape' && R.type === 'search'))) ||
          (!I && !L) ||
          (N === 'Tab' && (!f.current || !u))
        )
          return
        b.current = C.type
        const W = { originalEvent: C, source: C.type }
        switch (N) {
          case 'ArrowUp': {
            const G = k(R, -1)
            G && G.focus && G.focus(), C.preventDefault()
            return
          }
          case 'ArrowDown':
            if ((C.preventDefault(), !u)) l(!0, W)
            else {
              const G = k(R, 1)
              G && G.focus && G.focus()
            }
            return
          case 'Tab':
            mb(
              R.ownerDocument,
              'keyup',
              (G) => {
                var z
                ;((G.key === 'Tab' && !G.target) ||
                  !((z = f.current) != null && z.contains(G.target))) &&
                  l(!1, W)
              },
              { once: !0 },
            )
            break
          case 'Escape':
            N === 'Escape' && (C.preventDefault(), C.stopPropagation()),
              l(!1, W)
            break
        }
      },
    ),
    O.jsx(Rn.Provider, {
      value: S,
      children: O.jsx(ru.Provider, { value: P, children: s }),
    })
  )
}
Yo.displayName = 'Dropdown'
Yo.Menu = Gb
Yo.Toggle = Qb
Yo.Item = Jb
const dh = A.createContext({})
dh.displayName = 'DropdownContext'
const tx = A.forwardRef(
  (
    { className: e, bsPrefix: t, as: r = 'hr', role: n = 'separator', ...i },
    a,
  ) => (
    (t = Z(t, 'dropdown-divider')),
    O.jsx(r, { ref: a, className: Y(e, t), role: n, ...i })
  ),
)
tx.displayName = 'DropdownDivider'
const rx = A.forwardRef(
  (
    { className: e, bsPrefix: t, as: r = 'div', role: n = 'heading', ...i },
    a,
  ) => (
    (t = Z(t, 'dropdown-header')),
    O.jsx(r, { ref: a, className: Y(e, t), role: n, ...i })
  ),
)
rx.displayName = 'DropdownHeader'
const nx = A.forwardRef(
  (
    {
      bsPrefix: e,
      className: t,
      eventKey: r,
      disabled: n = !1,
      onClick: i,
      active: a,
      as: o = eu,
      ...s
    },
    c,
  ) => {
    const u = Z(e, 'dropdown-item'),
      [l, f] = Zb({ key: r, href: s.href, disabled: n, onClick: i, active: a })
    return O.jsx(o, {
      ...s,
      ...l,
      ref: c,
      className: Y(t, u, f.isActive && 'active', n && 'disabled'),
    })
  },
)
nx.displayName = 'DropdownItem'
const ix = A.forwardRef(
  ({ className: e, bsPrefix: t, as: r = 'span', ...n }, i) => (
    (t = Z(t, 'dropdown-item-text')),
    O.jsx(r, { ref: i, className: Y(e, t), ...n })
  ),
)
ix.displayName = 'DropdownItemText'
const hh = A.createContext(null)
hh.displayName = 'InputGroupContext'
const Hn = A.createContext(null)
Hn.displayName = 'NavbarContext'
function ax(e, t) {
  return e
}
function ox(e, t, r) {
  const n = r ? 'top-end' : 'top-start',
    i = r ? 'top-start' : 'top-end',
    a = r ? 'bottom-end' : 'bottom-start',
    o = r ? 'bottom-start' : 'bottom-end',
    s = r ? 'right-start' : 'left-start',
    c = r ? 'right-end' : 'left-end',
    u = r ? 'left-start' : 'right-start',
    l = r ? 'left-end' : 'right-end'
  let f = e ? o : a
  return (
    t === 'up'
      ? (f = e ? i : n)
      : t === 'end'
        ? (f = e ? l : u)
        : t === 'start'
          ? (f = e ? c : s)
          : t === 'down-centered'
            ? (f = 'bottom')
            : t === 'up-centered' && (f = 'top'),
    f
  )
}
const sx = A.forwardRef(
  (
    {
      bsPrefix: e,
      className: t,
      align: r,
      rootCloseEvent: n,
      flip: i = !0,
      show: a,
      renderOnMount: o,
      as: s = 'div',
      popperConfig: c,
      variant: u,
      ...l
    },
    f,
  ) => {
    let d = !1
    const h = A.useContext(Hn),
      y = Z(e, 'dropdown-menu'),
      { align: v, drop: p, isRTL: x } = A.useContext(dh)
    r = r || v
    const b = A.useContext(hh),
      w = []
    if (r)
      if (typeof r == 'object') {
        const C = Object.keys(r)
        if (C.length) {
          const j = C[0],
            M = r[j]
          ;(d = M === 'start'), w.push(`${y}-${j}-${M}`)
        }
      } else r === 'end' && (d = !0)
    const g = ox(d, p, x),
      [m, { hasShown: S, popper: P, show: $, toggle: T }] = Kb({
        flip: i,
        rootCloseEvent: n,
        show: a,
        usePopper: !h && w.length === 0,
        offset: [0, 2],
        popperConfig: c,
        placement: g,
      })
    if (
      ((m.ref = qn(ax(f), m.ref)),
      Fs(() => {
        $ && (P == null || P.update())
      }, [$]),
      !S && !o && !b)
    )
      return null
    typeof s != 'string' &&
      ((m.show = $),
      (m.close = () => (T == null ? void 0 : T(!1))),
      (m.align = r))
    let k = l.style
    return (
      P != null &&
        P.placement &&
        ((k = { ...l.style, ...m.style }), (l['x-placement'] = P.placement)),
      O.jsx(s, {
        ...l,
        ...m,
        style: k,
        ...((w.length || h) && { 'data-bs-popper': 'static' }),
        className: Y(
          t,
          y,
          $ && 'show',
          d && `${y}-end`,
          u && `${y}-${u}`,
          ...w,
        ),
      })
    )
  },
)
sx.displayName = 'DropdownMenu'
const cx = A.forwardRef(
  (
    { bsPrefix: e, split: t, className: r, childBsPrefix: n, as: i = Xe, ...a },
    o,
  ) => {
    const s = Z(e, 'dropdown-toggle'),
      c = A.useContext(ru)
    n !== void 0 && (a.bsPrefix = n)
    const [u] = Yb()
    return (
      (u.ref = qn(u.ref, ax(o))),
      O.jsx(i, {
        className: Y(
          r,
          s,
          t && `${s}-split`,
          (c == null ? void 0 : c.show) && 'show',
        ),
        ...u,
        ...a,
      })
    )
  },
)
cx.displayName = 'DropdownToggle'
const ux = A.forwardRef((e, t) => {
  const {
      bsPrefix: r,
      drop: n = 'down',
      show: i,
      className: a,
      align: o = 'start',
      onSelect: s,
      onToggle: c,
      focusFirstItemOnShow: u,
      as: l = 'div',
      navbar: f,
      autoClose: d = !0,
      ...h
    } = Go(e, { show: 'onToggle' }),
    y = A.useContext(hh),
    v = Z(r, 'dropdown'),
    p = GA(),
    x = (P) =>
      d === !1
        ? P === 'click'
        : d === 'inside'
          ? P !== 'rootClose'
          : d === 'outside'
            ? P !== 'select'
            : !0,
    b = Te((P, $) => {
      var T
      ;(!((T = $.originalEvent) == null || (T = T.target) == null) &&
        T.classList.contains('dropdown-toggle') &&
        $.source === 'mousedown') ||
        ($.originalEvent.currentTarget === document &&
          ($.source !== 'keydown' || $.originalEvent.key === 'Escape') &&
          ($.source = 'rootClose'),
        x($.source) && (c == null || c(P, $)))
    }),
    g = ox(o === 'end', n, p),
    m = A.useMemo(() => ({ align: o, drop: n, isRTL: p }), [o, n, p]),
    S = {
      down: v,
      'down-centered': `${v}-center`,
      up: 'dropup',
      'up-centered': 'dropup-center dropup',
      end: 'dropend',
      start: 'dropstart',
    }
  return O.jsx(dh.Provider, {
    value: m,
    children: O.jsx(Yo, {
      placement: g,
      show: i,
      onSelect: s,
      onToggle: b,
      focusFirstItemOnShow: u,
      itemSelector: `.${v}-item:not(.disabled):not(:disabled)`,
      children: y
        ? h.children
        : O.jsx(l, { ...h, ref: t, className: Y(a, i && 'show', S[n]) }),
    }),
  })
})
ux.displayName = 'Dropdown'
const Jr = Object.assign(ux, {
  Toggle: cx,
  Menu: sx,
  Item: nx,
  ItemText: ix,
  Divider: tx,
  Header: rx,
})
X.string, X.bool, X.bool, X.bool, X.bool
const Ni = A.forwardRef(
  (
    {
      bsPrefix: e,
      className: t,
      fluid: r = !1,
      rounded: n = !1,
      roundedCircle: i = !1,
      thumbnail: a = !1,
      ...o
    },
    s,
  ) => (
    (e = Z(e, 'img')),
    O.jsx('img', {
      ref: s,
      ...o,
      className: Y(
        t,
        r && `${e}-fluid`,
        n && 'rounded',
        i && 'rounded-circle',
        a && `${e}-thumbnail`,
      ),
    })
  ),
)
Ni.displayName = 'Image'
const O$ = { type: X.string, tooltip: X.bool, as: X.elementType },
  ou = A.forwardRef(
    (
      { as: e = 'div', className: t, type: r = 'valid', tooltip: n = !1, ...i },
      a,
    ) =>
      O.jsx(e, {
        ...i,
        ref: a,
        className: Y(t, `${r}-${n ? 'tooltip' : 'feedback'}`),
      }),
  )
ou.displayName = 'Feedback'
ou.propTypes = O$
const Cr = A.createContext({}),
  ph = A.forwardRef(
    (
      {
        id: e,
        bsPrefix: t,
        className: r,
        type: n = 'checkbox',
        isValid: i = !1,
        isInvalid: a = !1,
        as: o = 'input',
        ...s
      },
      c,
    ) => {
      const { controlId: u } = A.useContext(Cr)
      return (
        (t = Z(t, 'form-check-input')),
        O.jsx(o, {
          ...s,
          ref: c,
          type: n,
          id: e || u,
          className: Y(r, t, i && 'is-valid', a && 'is-invalid'),
        })
      )
    },
  )
ph.displayName = 'FormCheckInput'
const zs = A.forwardRef(
  ({ bsPrefix: e, className: t, htmlFor: r, ...n }, i) => {
    const { controlId: a } = A.useContext(Cr)
    return (
      (e = Z(e, 'form-check-label')),
      O.jsx('label', { ...n, ref: i, htmlFor: r || a, className: Y(t, e) })
    )
  },
)
zs.displayName = 'FormCheckLabel'
const lx = A.forwardRef(
  (
    {
      id: e,
      bsPrefix: t,
      bsSwitchPrefix: r,
      inline: n = !1,
      reverse: i = !1,
      disabled: a = !1,
      isValid: o = !1,
      isInvalid: s = !1,
      feedbackTooltip: c = !1,
      feedback: u,
      feedbackType: l,
      className: f,
      style: d,
      title: h = '',
      type: y = 'checkbox',
      label: v,
      children: p,
      as: x = 'input',
      ...b
    },
    w,
  ) => {
    ;(t = Z(t, 'form-check')), (r = Z(r, 'form-switch'))
    const { controlId: g } = A.useContext(Cr),
      m = A.useMemo(() => ({ controlId: e || g }), [g, e]),
      S = (!p && v != null && v !== !1) || R2(p, zs),
      P = O.jsx(ph, {
        ...b,
        type: y === 'switch' ? 'checkbox' : y,
        ref: w,
        isValid: o,
        isInvalid: s,
        disabled: a,
        as: x,
      })
    return O.jsx(Cr.Provider, {
      value: m,
      children: O.jsx('div', {
        style: d,
        className: Y(
          f,
          S && t,
          n && `${t}-inline`,
          i && `${t}-reverse`,
          y === 'switch' && r,
        ),
        children:
          p ||
          O.jsxs(O.Fragment, {
            children: [
              P,
              S && O.jsx(zs, { title: h, children: v }),
              u && O.jsx(ou, { type: l, tooltip: c, children: u }),
            ],
          }),
      }),
    })
  },
)
lx.displayName = 'FormCheck'
const Ks = Object.assign(lx, { Input: ph, Label: zs }),
  fx = A.forwardRef(
    (
      {
        bsPrefix: e,
        type: t,
        size: r,
        htmlSize: n,
        id: i,
        className: a,
        isValid: o = !1,
        isInvalid: s = !1,
        plaintext: c,
        readOnly: u,
        as: l = 'input',
        ...f
      },
      d,
    ) => {
      const { controlId: h } = A.useContext(Cr)
      return (
        (e = Z(e, 'form-control')),
        O.jsx(l, {
          ...f,
          type: t,
          size: n,
          ref: d,
          readOnly: u,
          id: i || h,
          className: Y(
            a,
            c ? `${e}-plaintext` : e,
            r && `${e}-${r}`,
            t === 'color' && `${e}-color`,
            o && 'is-valid',
            s && 'is-invalid',
          ),
        })
      )
    },
  )
fx.displayName = 'FormControl'
const S$ = Object.assign(fx, { Feedback: ou }),
  dx = A.forwardRef(
    ({ className: e, bsPrefix: t, as: r = 'div', ...n }, i) => (
      (t = Z(t, 'form-floating')),
      O.jsx(r, { ref: i, className: Y(e, t), ...n })
    ),
  )
dx.displayName = 'FormFloating'
const vh = A.forwardRef(({ controlId: e, as: t = 'div', ...r }, n) => {
  const i = A.useMemo(() => ({ controlId: e }), [e])
  return O.jsx(Cr.Provider, { value: i, children: O.jsx(t, { ...r, ref: n }) })
})
vh.displayName = 'FormGroup'
const hx = A.forwardRef(
  (
    {
      as: e = 'label',
      bsPrefix: t,
      column: r = !1,
      visuallyHidden: n = !1,
      className: i,
      htmlFor: a,
      ...o
    },
    s,
  ) => {
    const { controlId: c } = A.useContext(Cr)
    t = Z(t, 'form-label')
    let u = 'col-form-label'
    typeof r == 'string' && (u = `${u} ${u}-${r}`)
    const l = Y(i, t, n && 'visually-hidden', r && u)
    return (
      (a = a || c),
      r
        ? O.jsx($r, { ref: s, as: 'label', className: l, htmlFor: a, ...o })
        : O.jsx(e, { ref: s, className: l, htmlFor: a, ...o })
    )
  },
)
hx.displayName = 'FormLabel'
const px = A.forwardRef(({ bsPrefix: e, className: t, id: r, ...n }, i) => {
  const { controlId: a } = A.useContext(Cr)
  return (
    (e = Z(e, 'form-range')),
    O.jsx('input', {
      ...n,
      type: 'range',
      ref: i,
      className: Y(t, e),
      id: r || a,
    })
  )
})
px.displayName = 'FormRange'
const vx = A.forwardRef(
  (
    {
      bsPrefix: e,
      size: t,
      htmlSize: r,
      className: n,
      isValid: i = !1,
      isInvalid: a = !1,
      id: o,
      ...s
    },
    c,
  ) => {
    const { controlId: u } = A.useContext(Cr)
    return (
      (e = Z(e, 'form-select')),
      O.jsx('select', {
        ...s,
        size: r,
        ref: c,
        className: Y(
          n,
          e,
          t && `${e}-${t}`,
          i && 'is-valid',
          a && 'is-invalid',
        ),
        id: o || u,
      })
    )
  },
)
vx.displayName = 'FormSelect'
const yx = A.forwardRef(
  ({ bsPrefix: e, className: t, as: r = 'small', muted: n, ...i }, a) => (
    (e = Z(e, 'form-text')),
    O.jsx(r, { ...i, ref: a, className: Y(t, e, n && 'text-muted') })
  ),
)
yx.displayName = 'FormText'
const mx = A.forwardRef((e, t) => O.jsx(Ks, { ...e, ref: t, type: 'switch' }))
mx.displayName = 'Switch'
const A$ = Object.assign(mx, { Input: Ks.Input, Label: Ks.Label }),
  gx = A.forwardRef(
    (
      { bsPrefix: e, className: t, children: r, controlId: n, label: i, ...a },
      o,
    ) => (
      (e = Z(e, 'form-floating')),
      O.jsxs(vh, {
        ref: o,
        className: Y(t, e),
        controlId: n,
        ...a,
        children: [r, O.jsx('label', { htmlFor: n, children: i })],
      })
    ),
  )
gx.displayName = 'FloatingLabel'
const P$ = { _ref: X.any, validated: X.bool, as: X.elementType },
  yh = A.forwardRef(({ className: e, validated: t, as: r = 'form', ...n }, i) =>
    O.jsx(r, { ...n, ref: i, className: Y(e, t && 'was-validated') }),
  )
yh.displayName = 'Form'
yh.propTypes = P$
const _e = Object.assign(yh, {
    Group: vh,
    Control: S$,
    Floating: dx,
    Check: Ks,
    Switch: A$,
    Label: hx,
    Text: yx,
    Range: px,
    Select: vx,
    FloatingLabel: gx,
  }),
  bx = A.createContext(null),
  $$ = ['as', 'active', 'eventKey']
function E$(e, t) {
  if (e == null) return {}
  var r = {}
  for (var n in e)
    if ({}.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue
      r[n] = e[n]
    }
  return r
}
function mh({ key: e, onClick: t, active: r, id: n, role: i, disabled: a }) {
  const o = A.useContext(Rn),
    s = A.useContext(iu),
    c = A.useContext(bx)
  let u = r
  const l = { role: i }
  if (s) {
    !i && s.role === 'tablist' && (l.role = 'tab')
    const f = s.getControllerId(e ?? null),
      d = s.getControlledId(e ?? null)
    ;(l[la('event-key')] = e),
      (l.id = f || n),
      (u = r == null && e != null ? s.activeKey === e : r),
      (u ||
        (!(c != null && c.unmountOnExit) && !(c != null && c.mountOnEnter))) &&
        (l['aria-controls'] = d)
  }
  return (
    l.role === 'tab' &&
      ((l['aria-selected'] = u),
      u || (l.tabIndex = -1),
      a && ((l.tabIndex = -1), (l['aria-disabled'] = !0))),
    (l.onClick = Te((f) => {
      a ||
        (t == null || t(f),
        e != null && o && !f.isPropagationStopped() && o(e, f))
    })),
    [l, { isActive: u }]
  )
}
const xx = A.forwardRef((e, t) => {
  let { as: r = th, active: n, eventKey: i } = e,
    a = E$(e, $$)
  const [o, s] = mh(Object.assign({ key: Mi(i, a.href), active: n }, a))
  return (
    (o[la('active')] = s.isActive),
    O.jsx(r, Object.assign({}, a, o, { ref: t }))
  )
})
xx.displayName = 'NavItem'
const _$ = ['as', 'onSelect', 'activeKey', 'role', 'onKeyDown']
function C$(e, t) {
  if (e == null) return {}
  var r = {}
  for (var n in e)
    if ({}.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue
      r[n] = e[n]
    }
  return r
}
const hv = () => {},
  pv = la('event-key'),
  wx = A.forwardRef((e, t) => {
    let { as: r = 'div', onSelect: n, activeKey: i, role: a, onKeyDown: o } = e,
      s = C$(e, _$)
    const c = Rb(),
      u = A.useRef(!1),
      l = A.useContext(Rn),
      f = A.useContext(bx)
    let d, h
    f &&
      ((a = a || 'tablist'),
      (i = f.activeKey),
      (d = f.getControlledId),
      (h = f.getControllerId))
    const y = A.useRef(null),
      v = (w) => {
        const g = y.current
        if (!g) return null
        const m = vr(g, `[${pv}]:not([aria-disabled=true])`),
          S = g.querySelector('[aria-selected=true]')
        if (!S || S !== document.activeElement) return null
        const P = m.indexOf(S)
        if (P === -1) return null
        let $ = P + w
        return $ >= m.length && ($ = 0), $ < 0 && ($ = m.length - 1), m[$]
      },
      p = (w, g) => {
        w != null && (n == null || n(w, g), l == null || l(w, g))
      },
      x = (w) => {
        if ((o == null || o(w), !f)) return
        let g
        switch (w.key) {
          case 'ArrowLeft':
          case 'ArrowUp':
            g = v(-1)
            break
          case 'ArrowRight':
          case 'ArrowDown':
            g = v(1)
            break
          default:
            return
        }
        g &&
          (w.preventDefault(),
          p(g.dataset[b$('EventKey')] || null, w),
          (u.current = !0),
          c())
      }
    A.useEffect(() => {
      if (y.current && u.current) {
        const w = y.current.querySelector(`[${pv}][aria-selected=true]`)
        w == null || w.focus()
      }
      u.current = !1
    })
    const b = qn(t, y)
    return O.jsx(Rn.Provider, {
      value: p,
      children: O.jsx(iu.Provider, {
        value: {
          role: a,
          activeKey: Mi(i),
          getControlledId: d || hv,
          getControllerId: h || hv,
        },
        children: O.jsx(
          r,
          Object.assign({}, s, { onKeyDown: x, ref: b, role: a }),
        ),
      }),
    })
  })
wx.displayName = 'Nav'
const Ox = Object.assign(wx, { Item: xx }),
  gh = A.forwardRef(
    (
      {
        bsPrefix: e,
        active: t,
        disabled: r,
        eventKey: n,
        className: i,
        variant: a,
        action: o,
        as: s,
        ...c
      },
      u,
    ) => {
      e = Z(e, 'list-group-item')
      const [l, f] = mh({ key: Mi(n, c.href), active: t, ...c }),
        d = Te((y) => {
          if (r) {
            y.preventDefault(), y.stopPropagation()
            return
          }
          l.onClick(y)
        })
      r &&
        c.tabIndex === void 0 &&
        ((c.tabIndex = -1), (c['aria-disabled'] = !0))
      const h = s || (o ? (c.href ? 'a' : 'button') : 'div')
      return O.jsx(h, {
        ref: u,
        ...c,
        ...l,
        onClick: d,
        className: Y(
          i,
          e,
          f.isActive && 'active',
          r && 'disabled',
          a && `${e}-${a}`,
          o && `${e}-action`,
        ),
      })
    },
  )
gh.displayName = 'ListGroupItem'
const Sx = A.forwardRef((e, t) => {
  const {
      className: r,
      bsPrefix: n,
      variant: i,
      horizontal: a,
      numbered: o,
      as: s = 'div',
      ...c
    } = Go(e, { activeKey: 'onSelect' }),
    u = Z(n, 'list-group')
  let l
  return (
    a && (l = a === !0 ? 'horizontal' : `horizontal-${a}`),
    O.jsx(Ox, {
      ref: t,
      ...c,
      as: s,
      className: Y(
        r,
        u,
        i && `${u}-${i}`,
        l && `${u}-${l}`,
        o && `${u}-numbered`,
      ),
    })
  )
})
Sx.displayName = 'ListGroup'
const nn = Object.assign(Sx, { Item: gh })
function ol(e) {
  e === void 0 && (e = Qc())
  try {
    var t = e.activeElement
    return !t || !t.nodeName ? null : t
  } catch {
    return e.body
  }
}
function j$(e = document) {
  const t = e.defaultView
  return Math.abs(t.innerWidth - e.documentElement.clientWidth)
}
const vv = la('modal-open')
class bh {
  constructor({
    ownerDocument: t,
    handleContainerOverflow: r = !0,
    isRTL: n = !1,
  } = {}) {
    ;(this.handleContainerOverflow = r),
      (this.isRTL = n),
      (this.modals = []),
      (this.ownerDocument = t)
  }
  getScrollbarWidth() {
    return j$(this.ownerDocument)
  }
  getElement() {
    return (this.ownerDocument || document).body
  }
  setModalAttributes(t) {}
  removeModalAttributes(t) {}
  setContainerStyle(t) {
    const r = { overflow: 'hidden' },
      n = this.isRTL ? 'paddingLeft' : 'paddingRight',
      i = this.getElement()
    ;(t.style = { overflow: i.style.overflow, [n]: i.style[n] }),
      t.scrollBarWidth &&
        (r[n] = `${parseInt(wr(i, n) || '0', 10) + t.scrollBarWidth}px`),
      i.setAttribute(vv, ''),
      wr(i, r)
  }
  reset() {
    ;[...this.modals].forEach((t) => this.remove(t))
  }
  removeContainerStyle(t) {
    const r = this.getElement()
    r.removeAttribute(vv), Object.assign(r.style, t.style)
  }
  add(t) {
    let r = this.modals.indexOf(t)
    return (
      r !== -1 ||
        ((r = this.modals.length),
        this.modals.push(t),
        this.setModalAttributes(t),
        r !== 0) ||
        ((this.state = { scrollBarWidth: this.getScrollbarWidth(), style: {} }),
        this.handleContainerOverflow && this.setContainerStyle(this.state)),
      r
    )
  }
  remove(t) {
    const r = this.modals.indexOf(t)
    r !== -1 &&
      (this.modals.splice(r, 1),
      !this.modals.length &&
        this.handleContainerOverflow &&
        this.removeContainerStyle(this.state),
      this.removeModalAttributes(t))
  }
  isTopModal(t) {
    return !!this.modals.length && this.modals[this.modals.length - 1] === t
  }
}
const sl = (e, t) =>
  Zc
    ? e == null
      ? (t || Qc()).body
      : (typeof e == 'function' && (e = e()),
        e && 'current' in e && (e = e.current),
        e && ('nodeType' in e || e.getBoundingClientRect) ? e : null)
    : null
function T$(e, t) {
  const r = au(),
    [n, i] = A.useState(() => sl(e, r == null ? void 0 : r.document))
  if (!n) {
    const a = sl(e)
    a && i(a)
  }
  return (
    A.useEffect(() => {}, [t, n]),
    A.useEffect(() => {
      const a = sl(e)
      a !== n && i(a)
    }, [e, n]),
    n
  )
}
function k$({
  children: e,
  in: t,
  onExited: r,
  mountOnEnter: n,
  unmountOnExit: i,
}) {
  const a = A.useRef(null),
    o = A.useRef(t),
    s = Te(r)
  A.useEffect(() => {
    t ? (o.current = !0) : s(a.current)
  }, [t, s])
  const c = qn(a, e.ref),
    u = A.cloneElement(e, { ref: c })
  return t ? u : i || (!o.current && n) ? null : u
}
const M$ = [
  'onEnter',
  'onEntering',
  'onEntered',
  'onExit',
  'onExiting',
  'onExited',
  'addEndListener',
  'children',
]
function N$(e, t) {
  if (e == null) return {}
  var r = {}
  for (var n in e)
    if ({}.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue
      r[n] = e[n]
    }
  return r
}
function I$(e) {
  let {
      onEnter: t,
      onEntering: r,
      onEntered: n,
      onExit: i,
      onExiting: a,
      onExited: o,
      addEndListener: s,
      children: c,
    } = e,
    u = N$(e, M$)
  const { major: l } = Ab(),
    f = l >= 19 ? c.props.ref : c.ref,
    d = A.useRef(null),
    h = qn(d, typeof c == 'function' ? null : f),
    y = (S) => (P) => {
      S && d.current && S(d.current, P)
    },
    v = A.useCallback(y(t), [t]),
    p = A.useCallback(y(r), [r]),
    x = A.useCallback(y(n), [n]),
    b = A.useCallback(y(i), [i]),
    w = A.useCallback(y(a), [a]),
    g = A.useCallback(y(o), [o]),
    m = A.useCallback(y(s), [s])
  return Object.assign(
    {},
    u,
    { nodeRef: d },
    t && { onEnter: v },
    r && { onEntering: p },
    n && { onEntered: x },
    i && { onExit: b },
    a && { onExiting: w },
    o && { onExited: g },
    s && { addEndListener: m },
    {
      children:
        typeof c == 'function'
          ? (S, P) => c(S, Object.assign({}, P, { ref: h }))
          : A.cloneElement(c, { ref: h }),
    },
  )
}
const R$ = ['component']
function D$(e, t) {
  if (e == null) return {}
  var r = {}
  for (var n in e)
    if ({}.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue
      r[n] = e[n]
    }
  return r
}
const L$ = A.forwardRef((e, t) => {
  let { component: r } = e,
    n = D$(e, R$)
  const i = I$(n)
  return O.jsx(r, Object.assign({ ref: t }, i))
})
function B$({ in: e, onTransition: t }) {
  const r = A.useRef(null),
    n = A.useRef(!0),
    i = Te(t)
  return (
    Fs(() => {
      if (!r.current) return
      let a = !1
      return (
        i({ in: e, element: r.current, initial: n.current, isStale: () => a }),
        () => {
          a = !0
        }
      )
    }, [e, i]),
    Fs(
      () => (
        (n.current = !1),
        () => {
          n.current = !0
        }
      ),
      [],
    ),
    r
  )
}
function F$({ children: e, in: t, onExited: r, onEntered: n, transition: i }) {
  const [a, o] = A.useState(!t)
  t && a && o(!1)
  const s = B$({
      in: !!t,
      onTransition: (u) => {
        const l = () => {
          u.isStale() ||
            (u.in
              ? n == null || n(u.element, u.initial)
              : (o(!0), r == null || r(u.element)))
        }
        Promise.resolve(i(u)).then(l, (f) => {
          throw (u.in || o(!0), f)
        })
      },
    }),
    c = qn(s, e.ref)
  return a && !t ? null : A.cloneElement(e, { ref: c })
}
function yv(e, t, r) {
  return e
    ? O.jsx(L$, Object.assign({}, r, { component: e }))
    : t
      ? O.jsx(F$, Object.assign({}, r, { transition: t }))
      : O.jsx(k$, Object.assign({}, r))
}
const U$ = [
  'show',
  'role',
  'className',
  'style',
  'children',
  'backdrop',
  'keyboard',
  'onBackdropClick',
  'onEscapeKeyDown',
  'transition',
  'runTransition',
  'backdropTransition',
  'runBackdropTransition',
  'autoFocus',
  'enforceFocus',
  'restoreFocus',
  'restoreFocusOptions',
  'renderDialog',
  'renderBackdrop',
  'manager',
  'container',
  'onShow',
  'onHide',
  'onExit',
  'onExited',
  'onExiting',
  'onEnter',
  'onEntering',
  'onEntered',
]
function W$(e, t) {
  if (e == null) return {}
  var r = {}
  for (var n in e)
    if ({}.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue
      r[n] = e[n]
    }
  return r
}
let cl
function q$(e) {
  return (
    cl || (cl = new bh({ ownerDocument: e == null ? void 0 : e.document })), cl
  )
}
function H$(e) {
  const t = au(),
    r = e || q$(t),
    n = A.useRef({ dialog: null, backdrop: null })
  return Object.assign(n.current, {
    add: () => r.add(n.current),
    remove: () => r.remove(n.current),
    isTopModal: () => r.isTopModal(n.current),
    setDialogRef: A.useCallback((i) => {
      n.current.dialog = i
    }, []),
    setBackdropRef: A.useCallback((i) => {
      n.current.backdrop = i
    }, []),
  })
}
const Ax = A.forwardRef((e, t) => {
  let {
      show: r = !1,
      role: n = 'dialog',
      className: i,
      style: a,
      children: o,
      backdrop: s = !0,
      keyboard: c = !0,
      onBackdropClick: u,
      onEscapeKeyDown: l,
      transition: f,
      runTransition: d,
      backdropTransition: h,
      runBackdropTransition: y,
      autoFocus: v = !0,
      enforceFocus: p = !0,
      restoreFocus: x = !0,
      restoreFocusOptions: b,
      renderDialog: w,
      renderBackdrop: g = (oe) => O.jsx('div', Object.assign({}, oe)),
      manager: m,
      container: S,
      onShow: P,
      onHide: $ = () => {},
      onExit: T,
      onExited: k,
      onExiting: C,
      onEnter: j,
      onEntering: M,
      onEntered: N,
    } = e,
    R = W$(e, U$)
  const I = au(),
    L = T$(S),
    B = H$(m),
    W = wb(),
    G = Ob(r),
    [z, H] = A.useState(!r),
    Q = A.useRef(null)
  A.useImperativeHandle(t, () => B, [B]),
    Zc && !G && r && (Q.current = ol(I == null ? void 0 : I.document)),
    r && z && H(!1)
  const ne = Te(() => {
      if (
        (B.add(),
        (te.current = Zr(document, 'keydown', Le)),
        (q.current = Zr(document, 'focus', () => setTimeout(Ge), !0)),
        P && P(),
        v)
      ) {
        var oe, Oe
        const Ne = ol(
          (oe = (Oe = B.dialog) == null ? void 0 : Oe.ownerDocument) != null
            ? oe
            : I == null
              ? void 0
              : I.document,
        )
        B.dialog &&
          Ne &&
          !qs(B.dialog, Ne) &&
          ((Q.current = Ne), B.dialog.focus())
      }
    }),
    he = Te(() => {
      if (
        (B.remove(),
        te.current == null || te.current(),
        q.current == null || q.current(),
        x)
      ) {
        var oe
        ;(oe = Q.current) == null || oe.focus == null || oe.focus(b),
          (Q.current = null)
      }
    })
  A.useEffect(() => {
    !r || !L || ne()
  }, [r, L, ne]),
    A.useEffect(() => {
      z && he()
    }, [z, he]),
    I2(() => {
      he()
    })
  const Ge = Te(() => {
      if (!p || !W() || !B.isTopModal()) return
      const oe = ol(I == null ? void 0 : I.document)
      B.dialog && oe && !qs(B.dialog, oe) && B.dialog.focus()
    }),
    je = Te((oe) => {
      oe.target === oe.currentTarget && (u == null || u(oe), s === !0 && $())
    }),
    Le = Te((oe) => {
      c &&
        C2(oe) &&
        B.isTopModal() &&
        (l == null || l(oe), oe.defaultPrevented || $())
    }),
    q = A.useRef(),
    te = A.useRef(),
    ae = (...oe) => {
      H(!0), k == null || k(...oe)
    }
  if (!L) return null
  const F = Object.assign(
    {
      role: n,
      ref: B.setDialogRef,
      'aria-modal': n === 'dialog' ? !0 : void 0,
    },
    R,
    { style: a, className: i, tabIndex: -1 },
  )
  let be = w
    ? w(F)
    : O.jsx(
        'div',
        Object.assign({}, F, {
          children: A.cloneElement(o, { role: 'document' }),
        }),
      )
  be = yv(f, d, {
    unmountOnExit: !0,
    mountOnEnter: !0,
    appear: !0,
    in: !!r,
    onExit: T,
    onExiting: C,
    onExited: ae,
    onEnter: j,
    onEntering: M,
    onEntered: N,
    children: be,
  })
  let le = null
  return (
    s &&
      ((le = g({ ref: B.setBackdropRef, onClick: je })),
      (le = yv(h, y, {
        in: !!r,
        appear: !0,
        mountOnEnter: !0,
        unmountOnExit: !0,
        children: le,
      }))),
    O.jsx(O.Fragment, {
      children: ai.createPortal(O.jsxs(O.Fragment, { children: [le, be] }), L),
    })
  )
})
Ax.displayName = 'Modal'
const z$ = Object.assign(Ax, { Manager: bh })
function K$(e, t) {
  return e.classList
    ? e.classList.contains(t)
    : (' ' + (e.className.baseVal || e.className) + ' ').indexOf(
        ' ' + t + ' ',
      ) !== -1
}
function G$(e, t) {
  e.classList
    ? e.classList.add(t)
    : K$(e, t) ||
      (typeof e.className == 'string'
        ? (e.className = e.className + ' ' + t)
        : e.setAttribute(
            'class',
            ((e.className && e.className.baseVal) || '') + ' ' + t,
          ))
}
function mv(e, t) {
  return e
    .replace(new RegExp('(^|\\s)' + t + '(?:\\s|$)', 'g'), '$1')
    .replace(/\s+/g, ' ')
    .replace(/^\s*|\s*$/g, '')
}
function V$(e, t) {
  e.classList
    ? e.classList.remove(t)
    : typeof e.className == 'string'
      ? (e.className = mv(e.className, t))
      : e.setAttribute(
          'class',
          mv((e.className && e.className.baseVal) || '', t),
        )
}
const Jn = {
  FIXED_CONTENT: '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top',
  STICKY_CONTENT: '.sticky-top',
  NAVBAR_TOGGLER: '.navbar-toggler',
}
class Px extends bh {
  adjustAndStore(t, r, n) {
    const i = r.style[t]
    ;(r.dataset[t] = i), wr(r, { [t]: `${parseFloat(wr(r, t)) + n}px` })
  }
  restore(t, r) {
    const n = r.dataset[t]
    n !== void 0 && (delete r.dataset[t], wr(r, { [t]: n }))
  }
  setContainerStyle(t) {
    super.setContainerStyle(t)
    const r = this.getElement()
    if ((G$(r, 'modal-open'), !t.scrollBarWidth)) return
    const n = this.isRTL ? 'paddingLeft' : 'paddingRight',
      i = this.isRTL ? 'marginLeft' : 'marginRight'
    vr(r, Jn.FIXED_CONTENT).forEach((a) =>
      this.adjustAndStore(n, a, t.scrollBarWidth),
    ),
      vr(r, Jn.STICKY_CONTENT).forEach((a) =>
        this.adjustAndStore(i, a, -t.scrollBarWidth),
      ),
      vr(r, Jn.NAVBAR_TOGGLER).forEach((a) =>
        this.adjustAndStore(i, a, t.scrollBarWidth),
      )
  }
  removeContainerStyle(t) {
    super.removeContainerStyle(t)
    const r = this.getElement()
    V$(r, 'modal-open')
    const n = this.isRTL ? 'paddingLeft' : 'paddingRight',
      i = this.isRTL ? 'marginLeft' : 'marginRight'
    vr(r, Jn.FIXED_CONTENT).forEach((a) => this.restore(n, a)),
      vr(r, Jn.STICKY_CONTENT).forEach((a) => this.restore(i, a)),
      vr(r, Jn.NAVBAR_TOGGLER).forEach((a) => this.restore(i, a))
  }
}
let ul
function X$(e) {
  return ul || (ul = new Px(e)), ul
}
const $x = A.createContext({ onHide() {} }),
  Y$ = A.forwardRef(
    (
      {
        closeLabel: e = 'Close',
        closeVariant: t,
        closeButton: r = !1,
        onHide: n,
        children: i,
        ...a
      },
      o,
    ) => {
      const s = A.useContext($x),
        c = Te(() => {
          s == null || s.onHide(), n == null || n()
        })
      return O.jsxs('div', {
        ref: o,
        ...a,
        children: [
          i,
          r && O.jsx(tu, { 'aria-label': e, variant: t, onClick: c }),
        ],
      })
    },
  )
var gv = { exports: {} },
  uf = { exports: {} }
;(function (e, t) {
  Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = r)
  function r(n) {
    function i(o, s, c, u, l, f) {
      var d = u || '<<anonymous>>',
        h = f || c
      if (s[c] == null)
        return o
          ? new Error(
              'Required ' +
                l +
                ' `' +
                h +
                '` was not specified ' +
                ('in `' + d + '`.'),
            )
          : null
      for (
        var y = arguments.length, v = Array(y > 6 ? y - 6 : 0), p = 6;
        p < y;
        p++
      )
        v[p - 6] = arguments[p]
      return n.apply(void 0, [s, c, d, l, h].concat(v))
    }
    var a = i.bind(null, !1)
    return (a.isRequired = i.bind(null, !0)), a
  }
  e.exports = t.default
})(uf, uf.exports)
var Q$ = uf.exports
;(function (e, t) {
  Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = a)
  var r = Q$,
    n = i(r)
  function i(o) {
    return o && o.__esModule ? o : { default: o }
  }
  function a() {
    for (var o = arguments.length, s = Array(o), c = 0; c < o; c++)
      s[c] = arguments[c]
    function u() {
      for (var l = arguments.length, f = Array(l), d = 0; d < l; d++)
        f[d] = arguments[d]
      var h = null
      return (
        s.forEach(function (y) {
          if (h == null) {
            var v = y.apply(void 0, f)
            v != null && (h = v)
          }
        }),
        h
      )
    }
    return (0, n.default)(u)
  }
  e.exports = t.default
})(gv, gv.exports)
const Ex = A.forwardRef(
  ({ className: e, bsPrefix: t, as: r = 'div', ...n }, i) => (
    (t = Z(t, 'nav-item')), O.jsx(r, { ref: i, className: Y(e, t), ...n })
  ),
)
Ex.displayName = 'NavItem'
const _x = A.forwardRef(
  (
    {
      bsPrefix: e,
      className: t,
      as: r = eu,
      active: n,
      eventKey: i,
      disabled: a = !1,
      ...o
    },
    s,
  ) => {
    e = Z(e, 'nav-link')
    const [c, u] = mh({ key: Mi(i, o.href), active: n, disabled: a, ...o })
    return O.jsx(r, {
      ...o,
      ...c,
      ref: s,
      disabled: a,
      className: Y(t, e, a && 'disabled', u.isActive && 'active'),
    })
  },
)
_x.displayName = 'NavLink'
const Cx = A.forwardRef((e, t) => {
  const {
      as: r = 'div',
      bsPrefix: n,
      variant: i,
      fill: a = !1,
      justify: o = !1,
      navbar: s,
      navbarScroll: c,
      className: u,
      activeKey: l,
      ...f
    } = Go(e, { activeKey: 'onSelect' }),
    d = Z(n, 'nav')
  let h,
    y,
    v = !1
  const p = A.useContext(Hn),
    x = A.useContext(ih)
  return (
    p
      ? ((h = p.bsPrefix), (v = s ?? !0))
      : x && ({ cardHeaderBsPrefix: y } = x),
    O.jsx(Ox, {
      as: r,
      ref: t,
      activeKey: l,
      className: Y(u, {
        [d]: !v,
        [`${h}-nav`]: v,
        [`${h}-nav-scroll`]: v && c,
        [`${y}-${i}`]: !!y,
        [`${d}-${i}`]: !!i,
        [`${d}-fill`]: a,
        [`${d}-justified`]: o,
      }),
      ...f,
    })
  )
})
Cx.displayName = 'Nav'
const bv = Object.assign(Cx, { Item: Ex, Link: _x }),
  jx = A.forwardRef(({ bsPrefix: e, className: t, as: r, ...n }, i) => {
    e = Z(e, 'navbar-brand')
    const a = r || (n.href ? 'a' : 'span')
    return O.jsx(a, { ...n, ref: i, className: Y(t, e) })
  })
jx.displayName = 'NavbarBrand'
const Tx = A.forwardRef(({ children: e, bsPrefix: t, ...r }, n) => {
  t = Z(t, 'navbar-collapse')
  const i = A.useContext(Hn)
  return O.jsx(m2, {
    in: !!(i && i.expanded),
    ...r,
    children: O.jsx('div', { ref: n, className: t, children: e }),
  })
})
Tx.displayName = 'NavbarCollapse'
const kx = A.forwardRef(
  (
    {
      bsPrefix: e,
      className: t,
      children: r,
      label: n = 'Toggle navigation',
      as: i = 'button',
      onClick: a,
      ...o
    },
    s,
  ) => {
    e = Z(e, 'navbar-toggler')
    const { onToggle: c, expanded: u } = A.useContext(Hn) || {},
      l = Te((f) => {
        a && a(f), c && c()
      })
    return (
      i === 'button' && (o.type = 'button'),
      O.jsx(i, {
        ...o,
        ref: s,
        onClick: l,
        'aria-label': n,
        className: Y(t, e, !u && 'collapsed'),
        children: r || O.jsx('span', { className: `${e}-icon` }),
      })
    )
  },
)
kx.displayName = 'NavbarToggle'
const lf = new WeakMap(),
  xv = (e, t) => {
    if (!e || !t) return
    const r = lf.get(t) || new Map()
    lf.set(t, r)
    let n = r.get(e)
    return n || ((n = t.matchMedia(e)), (n.refCount = 0), r.set(n.media, n)), n
  }
function Z$(e, t = typeof window > 'u' ? void 0 : window) {
  const r = xv(e, t),
    [n, i] = A.useState(() => (r ? r.matches : !1))
  return (
    Fs(() => {
      let a = xv(e, t)
      if (!a) return i(!1)
      let o = lf.get(t)
      const s = () => {
        i(a.matches)
      }
      return (
        a.refCount++,
        a.addListener(s),
        s(),
        () => {
          a.removeListener(s),
            a.refCount--,
            a.refCount <= 0 && (o == null || o.delete(a.media)),
            (a = void 0)
        }
      )
    }, [e]),
    n
  )
}
function J$(e) {
  const t = Object.keys(e)
  function r(s, c) {
    return s === c ? c : s ? `${s} and ${c}` : c
  }
  function n(s) {
    return t[Math.min(t.indexOf(s) + 1, t.length - 1)]
  }
  function i(s) {
    const c = n(s)
    let u = e[c]
    return (
      typeof u == 'number' ? (u = `${u - 0.2}px`) : (u = `calc(${u} - 0.2px)`),
      `(max-width: ${u})`
    )
  }
  function a(s) {
    let c = e[s]
    return typeof c == 'number' && (c = `${c}px`), `(min-width: ${c})`
  }
  function o(s, c, u) {
    let l
    typeof s == 'object'
      ? ((l = s), (u = c), (c = !0))
      : ((c = c || !0), (l = { [s]: c }))
    let f = A.useMemo(
      () =>
        Object.entries(l).reduce(
          (d, [h, y]) => (
            (y === 'up' || y === !0) && (d = r(d, a(h))),
            (y === 'down' || y === !0) && (d = r(d, i(h))),
            d
          ),
          '',
        ),
      [JSON.stringify(l)],
    )
    return Z$(f, u)
  }
  return o
}
const eE = J$({ xs: 0, sm: 576, md: 768, lg: 992, xl: 1200, xxl: 1400 }),
  Mx = A.forwardRef(
    ({ className: e, bsPrefix: t, as: r = 'div', ...n }, i) => (
      (t = Z(t, 'offcanvas-body')),
      O.jsx(r, { ref: i, className: Y(e, t), ...n })
    ),
  )
Mx.displayName = 'OffcanvasBody'
const tE = { [zt]: 'show', [mr]: 'show' },
  Nx = A.forwardRef(
    (
      {
        bsPrefix: e,
        className: t,
        children: r,
        in: n = !1,
        mountOnEnter: i = !1,
        unmountOnExit: a = !1,
        appear: o = !1,
        ...s
      },
      c,
    ) => (
      (e = Z(e, 'offcanvas')),
      O.jsx(Jd, {
        ref: c,
        addEndListener: Zd,
        in: n,
        mountOnEnter: i,
        unmountOnExit: a,
        appear: o,
        ...s,
        childRef: r.ref,
        children: (u, l) =>
          A.cloneElement(r, {
            ...l,
            className: Y(
              t,
              r.props.className,
              (u === zt || u === no) && `${e}-toggling`,
              tE[u],
            ),
          }),
      })
    ),
  )
Nx.displayName = 'OffcanvasToggling'
const Ix = A.forwardRef(
  (
    {
      bsPrefix: e,
      className: t,
      closeLabel: r = 'Close',
      closeButton: n = !1,
      ...i
    },
    a,
  ) => (
    (e = Z(e, 'offcanvas-header')),
    O.jsx(Y$, {
      ref: a,
      ...i,
      className: Y(t, e),
      closeLabel: r,
      closeButton: n,
    })
  ),
)
Ix.displayName = 'OffcanvasHeader'
const rE = Jc('h5'),
  Rx = A.forwardRef(
    ({ className: e, bsPrefix: t, as: r = rE, ...n }, i) => (
      (t = Z(t, 'offcanvas-title')),
      O.jsx(r, { ref: i, className: Y(e, t), ...n })
    ),
  )
Rx.displayName = 'OffcanvasTitle'
function nE(e) {
  return O.jsx(Nx, { ...e })
}
function iE(e) {
  return O.jsx(Us, { ...e })
}
const Dx = A.forwardRef(
  (
    {
      bsPrefix: e,
      className: t,
      children: r,
      'aria-labelledby': n,
      placement: i = 'start',
      responsive: a,
      show: o = !1,
      backdrop: s = !0,
      keyboard: c = !0,
      scroll: u = !1,
      onEscapeKeyDown: l,
      onShow: f,
      onHide: d,
      container: h,
      autoFocus: y = !0,
      enforceFocus: v = !0,
      restoreFocus: p = !0,
      restoreFocusOptions: x,
      onEntered: b,
      onExit: w,
      onExiting: g,
      onEnter: m,
      onEntering: S,
      onExited: P,
      backdropClassName: $,
      manager: T,
      renderStaticNode: k = !1,
      ...C
    },
    j,
  ) => {
    const M = A.useRef()
    e = Z(e, 'offcanvas')
    const [N, R] = A.useState(!1),
      I = Te(d),
      L = eE(a || 'xs', 'up')
    A.useEffect(() => {
      R(a ? o && !L : o)
    }, [o, a, L])
    const B = A.useMemo(() => ({ onHide: I }), [I])
    function W() {
      return (
        T ||
        (u
          ? (M.current || (M.current = new Px({ handleContainerOverflow: !1 })),
            M.current)
          : X$())
      )
    }
    const G = (ne, ...he) => {
        ne && (ne.style.visibility = 'visible'), m == null || m(ne, ...he)
      },
      z = (ne, ...he) => {
        ne && (ne.style.visibility = ''), P == null || P(...he)
      },
      H = A.useCallback(
        (ne) => O.jsx('div', { ...ne, className: Y(`${e}-backdrop`, $) }),
        [$, e],
      ),
      Q = (ne) =>
        O.jsx('div', {
          ...ne,
          ...C,
          className: Y(t, a ? `${e}-${a}` : e, `${e}-${i}`),
          'aria-labelledby': n,
          children: r,
        })
    return O.jsxs(O.Fragment, {
      children: [
        !N && (a || k) && Q({}),
        O.jsx($x.Provider, {
          value: B,
          children: O.jsx(z$, {
            show: N,
            ref: j,
            backdrop: s,
            container: h,
            keyboard: c,
            autoFocus: y,
            enforceFocus: v && !u,
            restoreFocus: p,
            restoreFocusOptions: x,
            onEscapeKeyDown: l,
            onShow: f,
            onHide: I,
            onEnter: G,
            onEntering: S,
            onEntered: b,
            onExit: w,
            onExiting: g,
            onExited: z,
            manager: W(),
            transition: nE,
            backdropTransition: iE,
            renderBackdrop: H,
            renderDialog: Q,
          }),
        }),
      ],
    })
  },
)
Dx.displayName = 'Offcanvas'
const rt = Object.assign(Dx, { Body: Mx, Header: Ix, Title: Rx }),
  Lx = A.forwardRef(({ onHide: e, ...t }, r) => {
    const n = A.useContext(Hn),
      i = Te(() => {
        n == null || n.onToggle == null || n.onToggle(), e == null || e()
      })
    return O.jsx(rt, {
      ref: r,
      show: !!(n != null && n.expanded),
      ...t,
      renderStaticNode: !0,
      onHide: i,
    })
  })
Lx.displayName = 'NavbarOffcanvas'
const Bx = A.forwardRef(
  ({ className: e, bsPrefix: t, as: r = 'span', ...n }, i) => (
    (t = Z(t, 'navbar-text')), O.jsx(r, { ref: i, className: Y(e, t), ...n })
  ),
)
Bx.displayName = 'NavbarText'
const Fx = A.forwardRef((e, t) => {
  const {
      bsPrefix: r,
      expand: n = !0,
      variant: i = 'light',
      bg: a,
      fixed: o,
      sticky: s,
      className: c,
      as: u = 'nav',
      expanded: l,
      onToggle: f,
      onSelect: d,
      collapseOnSelect: h = !1,
      ...y
    } = Go(e, { expanded: 'onToggle' }),
    v = Z(r, 'navbar'),
    p = A.useCallback(
      (...w) => {
        d == null || d(...w), h && l && (f == null || f(!1))
      },
      [d, h, l, f],
    )
  y.role === void 0 && u !== 'nav' && (y.role = 'navigation')
  let x = `${v}-expand`
  typeof n == 'string' && (x = `${x}-${n}`)
  const b = A.useMemo(
    () => ({
      onToggle: () => (f == null ? void 0 : f(!l)),
      bsPrefix: v,
      expanded: !!l,
      expand: n,
    }),
    [v, l, n, f],
  )
  return O.jsx(Hn.Provider, {
    value: b,
    children: O.jsx(Rn.Provider, {
      value: p,
      children: O.jsx(u, {
        ref: t,
        ...y,
        className: Y(
          c,
          v,
          n && x,
          i && `${v}-${i}`,
          a && `bg-${a}`,
          s && `sticky-${s}`,
          o && `fixed-${o}`,
        ),
      }),
    }),
  })
})
Fx.displayName = 'Navbar'
const wv = Object.assign(Fx, {
    Brand: jx,
    Collapse: Tx,
    Offcanvas: Lx,
    Text: Bx,
    Toggle: kx,
  }),
  Dn = A.forwardRef(({ bsPrefix: e, className: t, as: r = 'div', ...n }, i) => {
    const a = Z(e, 'row'),
      o = fb(),
      s = db(),
      c = `${a}-cols`,
      u = []
    return (
      o.forEach((l) => {
        const f = n[l]
        delete n[l]
        let d
        f != null && typeof f == 'object' ? ({ cols: d } = f) : (d = f)
        const h = l !== s ? `-${l}` : ''
        d != null && u.push(`${c}${h}-${d}`)
      }),
      O.jsx(r, { ref: i, ...n, className: Y(t, a, ...u) })
    )
  })
Dn.displayName = 'Row'
const Ux = A.forwardRef(
  (
    {
      bsPrefix: e,
      variant: t,
      animation: r = 'border',
      size: n,
      as: i = 'div',
      className: a,
      ...o
    },
    s,
  ) => {
    e = Z(e, 'spinner')
    const c = `${e}-${r}`
    return O.jsx(i, {
      ref: s,
      ...o,
      className: Y(a, c, n && `${c}-${n}`, t && `text-${t}`),
    })
  },
)
Ux.displayName = 'Spinner'
const aE = A.forwardRef(
    (
      {
        bsPrefix: e,
        className: t,
        striped: r,
        bordered: n,
        borderless: i,
        hover: a,
        size: o,
        variant: s,
        responsive: c,
        ...u
      },
      l,
    ) => {
      const f = Z(e, 'table'),
        d = Y(
          t,
          f,
          s && `${f}-${s}`,
          o && `${f}-${o}`,
          r && `${f}-${typeof r == 'string' ? `striped-${r}` : 'striped'}`,
          n && `${f}-bordered`,
          i && `${f}-borderless`,
          a && `${f}-hover`,
        ),
        h = O.jsx('table', { ...u, className: d, ref: l })
      if (c) {
        let y = `${f}-responsive`
        return (
          typeof c == 'string' && (y = `${y}-${c}`),
          O.jsx('div', { className: y, children: h })
        )
      }
      return h
    },
  ),
  Wx = A.createContext({ token: null, setToken: () => {} }),
  qx = ({ children: e }) => {
    const [t, r] = A.useState(null)
    return O.jsx(Wx.Provider, { value: { token: t, setToken: r }, children: e })
  }
qx.propTypes = { children: X.element.isRequired }
function ur() {
  const { token: e, setToken: t } = A.useContext(Wx)
  return [e, t]
}
const or = Object.create(null)
or.open = '0'
or.close = '1'
or.ping = '2'
or.pong = '3'
or.message = '4'
or.upgrade = '5'
or.noop = '6'
const Ms = Object.create(null)
Object.keys(or).forEach((e) => {
  Ms[or[e]] = e
})
const ff = { type: 'error', data: 'parser error' },
  Hx =
    typeof Blob == 'function' ||
    (typeof Blob < 'u' &&
      Object.prototype.toString.call(Blob) === '[object BlobConstructor]'),
  zx = typeof ArrayBuffer == 'function',
  Kx = (e) =>
    typeof ArrayBuffer.isView == 'function'
      ? ArrayBuffer.isView(e)
      : e && e.buffer instanceof ArrayBuffer,
  xh = ({ type: e, data: t }, r, n) =>
    Hx && t instanceof Blob
      ? r
        ? n(t)
        : Ov(t, n)
      : zx && (t instanceof ArrayBuffer || Kx(t))
        ? r
          ? n(t)
          : Ov(new Blob([t]), n)
        : n(or[e] + (t || '')),
  Ov = (e, t) => {
    const r = new FileReader()
    return (
      (r.onload = function () {
        const n = r.result.split(',')[1]
        t('b' + (n || ''))
      }),
      r.readAsDataURL(e)
    )
  }
function Sv(e) {
  return e instanceof Uint8Array
    ? e
    : e instanceof ArrayBuffer
      ? new Uint8Array(e)
      : new Uint8Array(e.buffer, e.byteOffset, e.byteLength)
}
let ll
function oE(e, t) {
  if (Hx && e.data instanceof Blob) return e.data.arrayBuffer().then(Sv).then(t)
  if (zx && (e.data instanceof ArrayBuffer || Kx(e.data))) return t(Sv(e.data))
  xh(e, !1, (r) => {
    ll || (ll = new TextEncoder()), t(ll.encode(r))
  })
}
const Av = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
  Wa = typeof Uint8Array > 'u' ? [] : new Uint8Array(256)
for (let e = 0; e < Av.length; e++) Wa[Av.charCodeAt(e)] = e
const sE = (e) => {
    let t = e.length * 0.75,
      r = e.length,
      n,
      i = 0,
      a,
      o,
      s,
      c
    e[e.length - 1] === '=' && (t--, e[e.length - 2] === '=' && t--)
    const u = new ArrayBuffer(t),
      l = new Uint8Array(u)
    for (n = 0; n < r; n += 4)
      (a = Wa[e.charCodeAt(n)]),
        (o = Wa[e.charCodeAt(n + 1)]),
        (s = Wa[e.charCodeAt(n + 2)]),
        (c = Wa[e.charCodeAt(n + 3)]),
        (l[i++] = (a << 2) | (o >> 4)),
        (l[i++] = ((o & 15) << 4) | (s >> 2)),
        (l[i++] = ((s & 3) << 6) | (c & 63))
    return u
  },
  cE = typeof ArrayBuffer == 'function',
  wh = (e, t) => {
    if (typeof e != 'string') return { type: 'message', data: Gx(e, t) }
    const r = e.charAt(0)
    return r === 'b'
      ? { type: 'message', data: uE(e.substring(1), t) }
      : Ms[r]
        ? e.length > 1
          ? { type: Ms[r], data: e.substring(1) }
          : { type: Ms[r] }
        : ff
  },
  uE = (e, t) => {
    if (cE) {
      const r = sE(e)
      return Gx(r, t)
    } else return { base64: !0, data: e }
  },
  Gx = (e, t) => {
    switch (t) {
      case 'blob':
        return e instanceof Blob ? e : new Blob([e])
      case 'arraybuffer':
      default:
        return e instanceof ArrayBuffer ? e : e.buffer
    }
  },
  Vx = '',
  lE = (e, t) => {
    const r = e.length,
      n = new Array(r)
    let i = 0
    e.forEach((a, o) => {
      xh(a, !1, (s) => {
        ;(n[o] = s), ++i === r && t(n.join(Vx))
      })
    })
  },
  fE = (e, t) => {
    const r = e.split(Vx),
      n = []
    for (let i = 0; i < r.length; i++) {
      const a = wh(r[i], t)
      if ((n.push(a), a.type === 'error')) break
    }
    return n
  }
function dE() {
  return new TransformStream({
    transform(e, t) {
      oE(e, (r) => {
        const n = r.length
        let i
        if (n < 126)
          (i = new Uint8Array(1)), new DataView(i.buffer).setUint8(0, n)
        else if (n < 65536) {
          i = new Uint8Array(3)
          const a = new DataView(i.buffer)
          a.setUint8(0, 126), a.setUint16(1, n)
        } else {
          i = new Uint8Array(9)
          const a = new DataView(i.buffer)
          a.setUint8(0, 127), a.setBigUint64(1, BigInt(n))
        }
        e.data && typeof e.data != 'string' && (i[0] |= 128),
          t.enqueue(i),
          t.enqueue(r)
      })
    },
  })
}
let fl
function hs(e) {
  return e.reduce((t, r) => t + r.length, 0)
}
function ps(e, t) {
  if (e[0].length === t) return e.shift()
  const r = new Uint8Array(t)
  let n = 0
  for (let i = 0; i < t; i++)
    (r[i] = e[0][n++]), n === e[0].length && (e.shift(), (n = 0))
  return e.length && n < e[0].length && (e[0] = e[0].slice(n)), r
}
function hE(e, t) {
  fl || (fl = new TextDecoder())
  const r = []
  let n = 0,
    i = -1,
    a = !1
  return new TransformStream({
    transform(o, s) {
      for (r.push(o); ; ) {
        if (n === 0) {
          if (hs(r) < 1) break
          const c = ps(r, 1)
          ;(a = (c[0] & 128) === 128),
            (i = c[0] & 127),
            i < 126 ? (n = 3) : i === 126 ? (n = 1) : (n = 2)
        } else if (n === 1) {
          if (hs(r) < 2) break
          const c = ps(r, 2)
          ;(i = new DataView(c.buffer, c.byteOffset, c.length).getUint16(0)),
            (n = 3)
        } else if (n === 2) {
          if (hs(r) < 8) break
          const c = ps(r, 8),
            u = new DataView(c.buffer, c.byteOffset, c.length),
            l = u.getUint32(0)
          if (l > Math.pow(2, 21) - 1) {
            s.enqueue(ff)
            break
          }
          ;(i = l * Math.pow(2, 32) + u.getUint32(4)), (n = 3)
        } else {
          if (hs(r) < i) break
          const c = ps(r, i)
          s.enqueue(wh(a ? c : fl.decode(c), t)), (n = 0)
        }
        if (i === 0 || i > e) {
          s.enqueue(ff)
          break
        }
      }
    },
  })
}
const Xx = 4
function Re(e) {
  if (e) return pE(e)
}
function pE(e) {
  for (var t in Re.prototype) e[t] = Re.prototype[t]
  return e
}
Re.prototype.on = Re.prototype.addEventListener = function (e, t) {
  return (
    (this._callbacks = this._callbacks || {}),
    (this._callbacks['$' + e] = this._callbacks['$' + e] || []).push(t),
    this
  )
}
Re.prototype.once = function (e, t) {
  function r() {
    this.off(e, r), t.apply(this, arguments)
  }
  return (r.fn = t), this.on(e, r), this
}
Re.prototype.off =
  Re.prototype.removeListener =
  Re.prototype.removeAllListeners =
  Re.prototype.removeEventListener =
    function (e, t) {
      if (((this._callbacks = this._callbacks || {}), arguments.length == 0))
        return (this._callbacks = {}), this
      var r = this._callbacks['$' + e]
      if (!r) return this
      if (arguments.length == 1) return delete this._callbacks['$' + e], this
      for (var n, i = 0; i < r.length; i++)
        if (((n = r[i]), n === t || n.fn === t)) {
          r.splice(i, 1)
          break
        }
      return r.length === 0 && delete this._callbacks['$' + e], this
    }
Re.prototype.emit = function (e) {
  this._callbacks = this._callbacks || {}
  for (
    var t = new Array(arguments.length - 1),
      r = this._callbacks['$' + e],
      n = 1;
    n < arguments.length;
    n++
  )
    t[n - 1] = arguments[n]
  if (r) {
    r = r.slice(0)
    for (var n = 0, i = r.length; n < i; ++n) r[n].apply(this, t)
  }
  return this
}
Re.prototype.emitReserved = Re.prototype.emit
Re.prototype.listeners = function (e) {
  return (
    (this._callbacks = this._callbacks || {}), this._callbacks['$' + e] || []
  )
}
Re.prototype.hasListeners = function (e) {
  return !!this.listeners(e).length
}
const jt =
  typeof self < 'u'
    ? self
    : typeof window < 'u'
      ? window
      : Function('return this')()
function Yx(e, ...t) {
  return t.reduce((r, n) => (e.hasOwnProperty(n) && (r[n] = e[n]), r), {})
}
const vE = jt.setTimeout,
  yE = jt.clearTimeout
function su(e, t) {
  t.useNativeTimers
    ? ((e.setTimeoutFn = vE.bind(jt)), (e.clearTimeoutFn = yE.bind(jt)))
    : ((e.setTimeoutFn = jt.setTimeout.bind(jt)),
      (e.clearTimeoutFn = jt.clearTimeout.bind(jt)))
}
const mE = 1.33
function gE(e) {
  return typeof e == 'string' ? bE(e) : Math.ceil((e.byteLength || e.size) * mE)
}
function bE(e) {
  let t = 0,
    r = 0
  for (let n = 0, i = e.length; n < i; n++)
    (t = e.charCodeAt(n)),
      t < 128
        ? (r += 1)
        : t < 2048
          ? (r += 2)
          : t < 55296 || t >= 57344
            ? (r += 3)
            : (n++, (r += 4))
  return r
}
function xE(e) {
  let t = ''
  for (let r in e)
    e.hasOwnProperty(r) &&
      (t.length && (t += '&'),
      (t += encodeURIComponent(r) + '=' + encodeURIComponent(e[r])))
  return t
}
function wE(e) {
  let t = {},
    r = e.split('&')
  for (let n = 0, i = r.length; n < i; n++) {
    let a = r[n].split('=')
    t[decodeURIComponent(a[0])] = decodeURIComponent(a[1])
  }
  return t
}
class OE extends Error {
  constructor(t, r, n) {
    super(t),
      (this.description = r),
      (this.context = n),
      (this.type = 'TransportError')
  }
}
class Oh extends Re {
  constructor(t) {
    super(),
      (this.writable = !1),
      su(this, t),
      (this.opts = t),
      (this.query = t.query),
      (this.socket = t.socket)
  }
  onError(t, r, n) {
    return super.emitReserved('error', new OE(t, r, n)), this
  }
  open() {
    return (this.readyState = 'opening'), this.doOpen(), this
  }
  close() {
    return (
      (this.readyState === 'opening' || this.readyState === 'open') &&
        (this.doClose(), this.onClose()),
      this
    )
  }
  send(t) {
    this.readyState === 'open' && this.write(t)
  }
  onOpen() {
    ;(this.readyState = 'open'),
      (this.writable = !0),
      super.emitReserved('open')
  }
  onData(t) {
    const r = wh(t, this.socket.binaryType)
    this.onPacket(r)
  }
  onPacket(t) {
    super.emitReserved('packet', t)
  }
  onClose(t) {
    ;(this.readyState = 'closed'), super.emitReserved('close', t)
  }
  pause(t) {}
  createUri(t, r = {}) {
    return (
      t +
      '://' +
      this._hostname() +
      this._port() +
      this.opts.path +
      this._query(r)
    )
  }
  _hostname() {
    const t = this.opts.hostname
    return t.indexOf(':') === -1 ? t : '[' + t + ']'
  }
  _port() {
    return this.opts.port &&
      ((this.opts.secure && +(this.opts.port !== 443)) ||
        (!this.opts.secure && Number(this.opts.port) !== 80))
      ? ':' + this.opts.port
      : ''
  }
  _query(t) {
    const r = xE(t)
    return r.length ? '?' + r : ''
  }
}
const Qx =
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_'.split(
      '',
    ),
  df = 64,
  SE = {}
let Pv = 0,
  vs = 0,
  $v
function Ev(e) {
  let t = ''
  do (t = Qx[e % df] + t), (e = Math.floor(e / df))
  while (e > 0)
  return t
}
function Zx() {
  const e = Ev(+new Date())
  return e !== $v ? ((Pv = 0), ($v = e)) : e + '.' + Ev(Pv++)
}
for (; vs < df; vs++) SE[Qx[vs]] = vs
let Jx = !1
try {
  Jx = typeof XMLHttpRequest < 'u' && 'withCredentials' in new XMLHttpRequest()
} catch {}
const AE = Jx
function e1(e) {
  const t = e.xdomain
  try {
    if (typeof XMLHttpRequest < 'u' && (!t || AE)) return new XMLHttpRequest()
  } catch {}
  if (!t)
    try {
      return new jt[['Active'].concat('Object').join('X')]('Microsoft.XMLHTTP')
    } catch {}
}
function PE() {}
const $E = (function () {
  return new e1({ xdomain: !1 }).responseType != null
})()
class EE extends Oh {
  constructor(t) {
    if ((super(t), (this.polling = !1), typeof location < 'u')) {
      const n = location.protocol === 'https:'
      let i = location.port
      i || (i = n ? '443' : '80'),
        (this.xd =
          (typeof location < 'u' && t.hostname !== location.hostname) ||
          i !== t.port)
    }
    const r = t && t.forceBase64
    ;(this.supportsBinary = $E && !r),
      this.opts.withCredentials && (this.cookieJar = void 0)
  }
  get name() {
    return 'polling'
  }
  doOpen() {
    this.poll()
  }
  pause(t) {
    this.readyState = 'pausing'
    const r = () => {
      ;(this.readyState = 'paused'), t()
    }
    if (this.polling || !this.writable) {
      let n = 0
      this.polling &&
        (n++,
        this.once('pollComplete', function () {
          --n || r()
        })),
        this.writable ||
          (n++,
          this.once('drain', function () {
            --n || r()
          }))
    } else r()
  }
  poll() {
    ;(this.polling = !0), this.doPoll(), this.emitReserved('poll')
  }
  onData(t) {
    const r = (n) => {
      if (
        (this.readyState === 'opening' && n.type === 'open' && this.onOpen(),
        n.type === 'close')
      )
        return (
          this.onClose({ description: 'transport closed by the server' }), !1
        )
      this.onPacket(n)
    }
    fE(t, this.socket.binaryType).forEach(r),
      this.readyState !== 'closed' &&
        ((this.polling = !1),
        this.emitReserved('pollComplete'),
        this.readyState === 'open' && this.poll())
  }
  doClose() {
    const t = () => {
      this.write([{ type: 'close' }])
    }
    this.readyState === 'open' ? t() : this.once('open', t)
  }
  write(t) {
    ;(this.writable = !1),
      lE(t, (r) => {
        this.doWrite(r, () => {
          ;(this.writable = !0), this.emitReserved('drain')
        })
      })
  }
  uri() {
    const t = this.opts.secure ? 'https' : 'http',
      r = this.query || {}
    return (
      this.opts.timestampRequests !== !1 &&
        (r[this.opts.timestampParam] = Zx()),
      !this.supportsBinary && !r.sid && (r.b64 = 1),
      this.createUri(t, r)
    )
  }
  request(t = {}) {
    return (
      Object.assign(t, { xd: this.xd, cookieJar: this.cookieJar }, this.opts),
      new rr(this.uri(), t)
    )
  }
  doWrite(t, r) {
    const n = this.request({ method: 'POST', data: t })
    n.on('success', r),
      n.on('error', (i, a) => {
        this.onError('xhr post error', i, a)
      })
  }
  doPoll() {
    const t = this.request()
    t.on('data', this.onData.bind(this)),
      t.on('error', (r, n) => {
        this.onError('xhr poll error', r, n)
      }),
      (this.pollXhr = t)
  }
}
class rr extends Re {
  constructor(t, r) {
    super(),
      su(this, r),
      (this.opts = r),
      (this.method = r.method || 'GET'),
      (this.uri = t),
      (this.data = r.data !== void 0 ? r.data : null),
      this.create()
  }
  create() {
    var t
    const r = Yx(
      this.opts,
      'agent',
      'pfx',
      'key',
      'passphrase',
      'cert',
      'ca',
      'ciphers',
      'rejectUnauthorized',
      'autoUnref',
    )
    r.xdomain = !!this.opts.xd
    const n = (this.xhr = new e1(r))
    try {
      n.open(this.method, this.uri, !0)
      try {
        if (this.opts.extraHeaders) {
          n.setDisableHeaderCheck && n.setDisableHeaderCheck(!0)
          for (let i in this.opts.extraHeaders)
            this.opts.extraHeaders.hasOwnProperty(i) &&
              n.setRequestHeader(i, this.opts.extraHeaders[i])
        }
      } catch {}
      if (this.method === 'POST')
        try {
          n.setRequestHeader('Content-type', 'text/plain;charset=UTF-8')
        } catch {}
      try {
        n.setRequestHeader('Accept', '*/*')
      } catch {}
      ;(t = this.opts.cookieJar) === null || t === void 0 || t.addCookies(n),
        'withCredentials' in n &&
          (n.withCredentials = this.opts.withCredentials),
        this.opts.requestTimeout && (n.timeout = this.opts.requestTimeout),
        (n.onreadystatechange = () => {
          var i
          n.readyState === 3 &&
            ((i = this.opts.cookieJar) === null ||
              i === void 0 ||
              i.parseCookies(n)),
            n.readyState === 4 &&
              (n.status === 200 || n.status === 1223
                ? this.onLoad()
                : this.setTimeoutFn(() => {
                    this.onError(typeof n.status == 'number' ? n.status : 0)
                  }, 0))
        }),
        n.send(this.data)
    } catch (i) {
      this.setTimeoutFn(() => {
        this.onError(i)
      }, 0)
      return
    }
    typeof document < 'u' &&
      ((this.index = rr.requestsCount++), (rr.requests[this.index] = this))
  }
  onError(t) {
    this.emitReserved('error', t, this.xhr), this.cleanup(!0)
  }
  cleanup(t) {
    if (!(typeof this.xhr > 'u' || this.xhr === null)) {
      if (((this.xhr.onreadystatechange = PE), t))
        try {
          this.xhr.abort()
        } catch {}
      typeof document < 'u' && delete rr.requests[this.index], (this.xhr = null)
    }
  }
  onLoad() {
    const t = this.xhr.responseText
    t !== null &&
      (this.emitReserved('data', t),
      this.emitReserved('success'),
      this.cleanup())
  }
  abort() {
    this.cleanup()
  }
}
rr.requestsCount = 0
rr.requests = {}
if (typeof document < 'u') {
  if (typeof attachEvent == 'function') attachEvent('onunload', _v)
  else if (typeof addEventListener == 'function') {
    const e = 'onpagehide' in jt ? 'pagehide' : 'unload'
    addEventListener(e, _v, !1)
  }
}
function _v() {
  for (let e in rr.requests)
    rr.requests.hasOwnProperty(e) && rr.requests[e].abort()
}
const Sh =
    typeof Promise == 'function' && typeof Promise.resolve == 'function'
      ? (t) => Promise.resolve().then(t)
      : (t, r) => r(t, 0),
  ys = jt.WebSocket || jt.MozWebSocket,
  Cv = !0,
  _E = 'arraybuffer',
  jv =
    typeof navigator < 'u' &&
    typeof navigator.product == 'string' &&
    navigator.product.toLowerCase() === 'reactnative'
class CE extends Oh {
  constructor(t) {
    super(t), (this.supportsBinary = !t.forceBase64)
  }
  get name() {
    return 'websocket'
  }
  doOpen() {
    if (!this.check()) return
    const t = this.uri(),
      r = this.opts.protocols,
      n = jv
        ? {}
        : Yx(
            this.opts,
            'agent',
            'perMessageDeflate',
            'pfx',
            'key',
            'passphrase',
            'cert',
            'ca',
            'ciphers',
            'rejectUnauthorized',
            'localAddress',
            'protocolVersion',
            'origin',
            'maxPayload',
            'family',
            'checkServerIdentity',
          )
    this.opts.extraHeaders && (n.headers = this.opts.extraHeaders)
    try {
      this.ws = Cv && !jv ? (r ? new ys(t, r) : new ys(t)) : new ys(t, r, n)
    } catch (i) {
      return this.emitReserved('error', i)
    }
    ;(this.ws.binaryType = this.socket.binaryType), this.addEventListeners()
  }
  addEventListeners() {
    ;(this.ws.onopen = () => {
      this.opts.autoUnref && this.ws._socket.unref(), this.onOpen()
    }),
      (this.ws.onclose = (t) =>
        this.onClose({
          description: 'websocket connection closed',
          context: t,
        })),
      (this.ws.onmessage = (t) => this.onData(t.data)),
      (this.ws.onerror = (t) => this.onError('websocket error', t))
  }
  write(t) {
    this.writable = !1
    for (let r = 0; r < t.length; r++) {
      const n = t[r],
        i = r === t.length - 1
      xh(n, this.supportsBinary, (a) => {
        const o = {}
        try {
          Cv && this.ws.send(a)
        } catch {}
        i &&
          Sh(() => {
            ;(this.writable = !0), this.emitReserved('drain')
          }, this.setTimeoutFn)
      })
    }
  }
  doClose() {
    typeof this.ws < 'u' && (this.ws.close(), (this.ws = null))
  }
  uri() {
    const t = this.opts.secure ? 'wss' : 'ws',
      r = this.query || {}
    return (
      this.opts.timestampRequests && (r[this.opts.timestampParam] = Zx()),
      this.supportsBinary || (r.b64 = 1),
      this.createUri(t, r)
    )
  }
  check() {
    return !!ys
  }
}
class jE extends Oh {
  get name() {
    return 'webtransport'
  }
  doOpen() {
    typeof WebTransport == 'function' &&
      ((this.transport = new WebTransport(
        this.createUri('https'),
        this.opts.transportOptions[this.name],
      )),
      this.transport.closed
        .then(() => {
          this.onClose()
        })
        .catch((t) => {
          this.onError('webtransport error', t)
        }),
      this.transport.ready.then(() => {
        this.transport.createBidirectionalStream().then((t) => {
          const r = hE(Number.MAX_SAFE_INTEGER, this.socket.binaryType),
            n = t.readable.pipeThrough(r).getReader(),
            i = dE()
          i.readable.pipeTo(t.writable), (this.writer = i.writable.getWriter())
          const a = () => {
            n.read()
              .then(({ done: s, value: c }) => {
                s || (this.onPacket(c), a())
              })
              .catch((s) => {})
          }
          a()
          const o = { type: 'open' }
          this.query.sid && (o.data = `{"sid":"${this.query.sid}"}`),
            this.writer.write(o).then(() => this.onOpen())
        })
      }))
  }
  write(t) {
    this.writable = !1
    for (let r = 0; r < t.length; r++) {
      const n = t[r],
        i = r === t.length - 1
      this.writer.write(n).then(() => {
        i &&
          Sh(() => {
            ;(this.writable = !0), this.emitReserved('drain')
          }, this.setTimeoutFn)
      })
    }
  }
  doClose() {
    var t
    ;(t = this.transport) === null || t === void 0 || t.close()
  }
}
const TE = { websocket: CE, webtransport: jE, polling: EE },
  kE =
    /^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
  ME = [
    'source',
    'protocol',
    'authority',
    'userInfo',
    'user',
    'password',
    'host',
    'port',
    'relative',
    'path',
    'directory',
    'file',
    'query',
    'anchor',
  ]
function hf(e) {
  if (e.length > 2e3) throw 'URI too long'
  const t = e,
    r = e.indexOf('['),
    n = e.indexOf(']')
  r != -1 &&
    n != -1 &&
    (e =
      e.substring(0, r) +
      e.substring(r, n).replace(/:/g, ';') +
      e.substring(n, e.length))
  let i = kE.exec(e || ''),
    a = {},
    o = 14
  for (; o--; ) a[ME[o]] = i[o] || ''
  return (
    r != -1 &&
      n != -1 &&
      ((a.source = t),
      (a.host = a.host.substring(1, a.host.length - 1).replace(/;/g, ':')),
      (a.authority = a.authority
        .replace('[', '')
        .replace(']', '')
        .replace(/;/g, ':')),
      (a.ipv6uri = !0)),
    (a.pathNames = NE(a, a.path)),
    (a.queryKey = IE(a, a.query)),
    a
  )
}
function NE(e, t) {
  const r = /\/{2,9}/g,
    n = t.replace(r, '/').split('/')
  return (
    (t.slice(0, 1) == '/' || t.length === 0) && n.splice(0, 1),
    t.slice(-1) == '/' && n.splice(n.length - 1, 1),
    n
  )
}
function IE(e, t) {
  const r = {}
  return (
    t.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function (n, i, a) {
      i && (r[i] = a)
    }),
    r
  )
}
let t1 = class ii extends Re {
  constructor(t, r = {}) {
    super(),
      (this.binaryType = _E),
      (this.writeBuffer = []),
      t && typeof t == 'object' && ((r = t), (t = null)),
      t
        ? ((t = hf(t)),
          (r.hostname = t.host),
          (r.secure = t.protocol === 'https' || t.protocol === 'wss'),
          (r.port = t.port),
          t.query && (r.query = t.query))
        : r.host && (r.hostname = hf(r.host).host),
      su(this, r),
      (this.secure =
        r.secure != null
          ? r.secure
          : typeof location < 'u' && location.protocol === 'https:'),
      r.hostname && !r.port && (r.port = this.secure ? '443' : '80'),
      (this.hostname =
        r.hostname ||
        (typeof location < 'u' ? location.hostname : 'localhost')),
      (this.port =
        r.port ||
        (typeof location < 'u' && location.port
          ? location.port
          : this.secure
            ? '443'
            : '80')),
      (this.transports = r.transports || [
        'polling',
        'websocket',
        'webtransport',
      ]),
      (this.writeBuffer = []),
      (this.prevBufferLen = 0),
      (this.opts = Object.assign(
        {
          path: '/engine.io',
          agent: !1,
          withCredentials: !1,
          upgrade: !0,
          timestampParam: 't',
          rememberUpgrade: !1,
          addTrailingSlash: !0,
          rejectUnauthorized: !0,
          perMessageDeflate: { threshold: 1024 },
          transportOptions: {},
          closeOnBeforeunload: !1,
        },
        r,
      )),
      (this.opts.path =
        this.opts.path.replace(/\/$/, '') +
        (this.opts.addTrailingSlash ? '/' : '')),
      typeof this.opts.query == 'string' &&
        (this.opts.query = wE(this.opts.query)),
      (this.id = null),
      (this.upgrades = null),
      (this.pingInterval = null),
      (this.pingTimeout = null),
      (this.pingTimeoutTimer = null),
      typeof addEventListener == 'function' &&
        (this.opts.closeOnBeforeunload &&
          ((this.beforeunloadEventListener = () => {
            this.transport &&
              (this.transport.removeAllListeners(), this.transport.close())
          }),
          addEventListener('beforeunload', this.beforeunloadEventListener, !1)),
        this.hostname !== 'localhost' &&
          ((this.offlineEventListener = () => {
            this.onClose('transport close', {
              description: 'network connection lost',
            })
          }),
          addEventListener('offline', this.offlineEventListener, !1))),
      this.open()
  }
  createTransport(t) {
    const r = Object.assign({}, this.opts.query)
    ;(r.EIO = Xx), (r.transport = t), this.id && (r.sid = this.id)
    const n = Object.assign(
      {},
      this.opts,
      {
        query: r,
        socket: this,
        hostname: this.hostname,
        secure: this.secure,
        port: this.port,
      },
      this.opts.transportOptions[t],
    )
    return new TE[t](n)
  }
  open() {
    let t
    if (
      this.opts.rememberUpgrade &&
      ii.priorWebsocketSuccess &&
      this.transports.indexOf('websocket') !== -1
    )
      t = 'websocket'
    else if (this.transports.length === 0) {
      this.setTimeoutFn(() => {
        this.emitReserved('error', 'No transports available')
      }, 0)
      return
    } else t = this.transports[0]
    this.readyState = 'opening'
    try {
      t = this.createTransport(t)
    } catch {
      this.transports.shift(), this.open()
      return
    }
    t.open(), this.setTransport(t)
  }
  setTransport(t) {
    this.transport && this.transport.removeAllListeners(),
      (this.transport = t),
      t
        .on('drain', this.onDrain.bind(this))
        .on('packet', this.onPacket.bind(this))
        .on('error', this.onError.bind(this))
        .on('close', (r) => this.onClose('transport close', r))
  }
  probe(t) {
    let r = this.createTransport(t),
      n = !1
    ii.priorWebsocketSuccess = !1
    const i = () => {
      n ||
        (r.send([{ type: 'ping', data: 'probe' }]),
        r.once('packet', (f) => {
          if (!n)
            if (f.type === 'pong' && f.data === 'probe') {
              if (
                ((this.upgrading = !0), this.emitReserved('upgrading', r), !r)
              )
                return
              ;(ii.priorWebsocketSuccess = r.name === 'websocket'),
                this.transport.pause(() => {
                  n ||
                    (this.readyState !== 'closed' &&
                      (l(),
                      this.setTransport(r),
                      r.send([{ type: 'upgrade' }]),
                      this.emitReserved('upgrade', r),
                      (r = null),
                      (this.upgrading = !1),
                      this.flush()))
                })
            } else {
              const d = new Error('probe error')
              ;(d.transport = r.name), this.emitReserved('upgradeError', d)
            }
        }))
    }
    function a() {
      n || ((n = !0), l(), r.close(), (r = null))
    }
    const o = (f) => {
      const d = new Error('probe error: ' + f)
      ;(d.transport = r.name), a(), this.emitReserved('upgradeError', d)
    }
    function s() {
      o('transport closed')
    }
    function c() {
      o('socket closed')
    }
    function u(f) {
      r && f.name !== r.name && a()
    }
    const l = () => {
      r.removeListener('open', i),
        r.removeListener('error', o),
        r.removeListener('close', s),
        this.off('close', c),
        this.off('upgrading', u)
    }
    r.once('open', i),
      r.once('error', o),
      r.once('close', s),
      this.once('close', c),
      this.once('upgrading', u),
      this.upgrades.indexOf('webtransport') !== -1 && t !== 'webtransport'
        ? this.setTimeoutFn(() => {
            n || r.open()
          }, 200)
        : r.open()
  }
  onOpen() {
    if (
      ((this.readyState = 'open'),
      (ii.priorWebsocketSuccess = this.transport.name === 'websocket'),
      this.emitReserved('open'),
      this.flush(),
      this.readyState === 'open' && this.opts.upgrade)
    ) {
      let t = 0
      const r = this.upgrades.length
      for (; t < r; t++) this.probe(this.upgrades[t])
    }
  }
  onPacket(t) {
    if (
      this.readyState === 'opening' ||
      this.readyState === 'open' ||
      this.readyState === 'closing'
    )
      switch (
        (this.emitReserved('packet', t),
        this.emitReserved('heartbeat'),
        this.resetPingTimeout(),
        t.type)
      ) {
        case 'open':
          this.onHandshake(JSON.parse(t.data))
          break
        case 'ping':
          this.sendPacket('pong'),
            this.emitReserved('ping'),
            this.emitReserved('pong')
          break
        case 'error':
          const r = new Error('server error')
          ;(r.code = t.data), this.onError(r)
          break
        case 'message':
          this.emitReserved('data', t.data),
            this.emitReserved('message', t.data)
          break
      }
  }
  onHandshake(t) {
    this.emitReserved('handshake', t),
      (this.id = t.sid),
      (this.transport.query.sid = t.sid),
      (this.upgrades = this.filterUpgrades(t.upgrades)),
      (this.pingInterval = t.pingInterval),
      (this.pingTimeout = t.pingTimeout),
      (this.maxPayload = t.maxPayload),
      this.onOpen(),
      this.readyState !== 'closed' && this.resetPingTimeout()
  }
  resetPingTimeout() {
    this.clearTimeoutFn(this.pingTimeoutTimer),
      (this.pingTimeoutTimer = this.setTimeoutFn(() => {
        this.onClose('ping timeout')
      }, this.pingInterval + this.pingTimeout)),
      this.opts.autoUnref && this.pingTimeoutTimer.unref()
  }
  onDrain() {
    this.writeBuffer.splice(0, this.prevBufferLen),
      (this.prevBufferLen = 0),
      this.writeBuffer.length === 0 ? this.emitReserved('drain') : this.flush()
  }
  flush() {
    if (
      this.readyState !== 'closed' &&
      this.transport.writable &&
      !this.upgrading &&
      this.writeBuffer.length
    ) {
      const t = this.getWritablePackets()
      this.transport.send(t),
        (this.prevBufferLen = t.length),
        this.emitReserved('flush')
    }
  }
  getWritablePackets() {
    if (
      !(
        this.maxPayload &&
        this.transport.name === 'polling' &&
        this.writeBuffer.length > 1
      )
    )
      return this.writeBuffer
    let r = 1
    for (let n = 0; n < this.writeBuffer.length; n++) {
      const i = this.writeBuffer[n].data
      if ((i && (r += gE(i)), n > 0 && r > this.maxPayload))
        return this.writeBuffer.slice(0, n)
      r += 2
    }
    return this.writeBuffer
  }
  write(t, r, n) {
    return this.sendPacket('message', t, r, n), this
  }
  send(t, r, n) {
    return this.sendPacket('message', t, r, n), this
  }
  sendPacket(t, r, n, i) {
    if (
      (typeof r == 'function' && ((i = r), (r = void 0)),
      typeof n == 'function' && ((i = n), (n = null)),
      this.readyState === 'closing' || this.readyState === 'closed')
    )
      return
    ;(n = n || {}), (n.compress = n.compress !== !1)
    const a = { type: t, data: r, options: n }
    this.emitReserved('packetCreate', a),
      this.writeBuffer.push(a),
      i && this.once('flush', i),
      this.flush()
  }
  close() {
    const t = () => {
        this.onClose('forced close'), this.transport.close()
      },
      r = () => {
        this.off('upgrade', r), this.off('upgradeError', r), t()
      },
      n = () => {
        this.once('upgrade', r), this.once('upgradeError', r)
      }
    return (
      (this.readyState === 'opening' || this.readyState === 'open') &&
        ((this.readyState = 'closing'),
        this.writeBuffer.length
          ? this.once('drain', () => {
              this.upgrading ? n() : t()
            })
          : this.upgrading
            ? n()
            : t()),
      this
    )
  }
  onError(t) {
    ;(ii.priorWebsocketSuccess = !1),
      this.emitReserved('error', t),
      this.onClose('transport error', t)
  }
  onClose(t, r) {
    ;(this.readyState === 'opening' ||
      this.readyState === 'open' ||
      this.readyState === 'closing') &&
      (this.clearTimeoutFn(this.pingTimeoutTimer),
      this.transport.removeAllListeners('close'),
      this.transport.close(),
      this.transport.removeAllListeners(),
      typeof removeEventListener == 'function' &&
        (removeEventListener(
          'beforeunload',
          this.beforeunloadEventListener,
          !1,
        ),
        removeEventListener('offline', this.offlineEventListener, !1)),
      (this.readyState = 'closed'),
      (this.id = null),
      this.emitReserved('close', t, r),
      (this.writeBuffer = []),
      (this.prevBufferLen = 0))
  }
  filterUpgrades(t) {
    const r = []
    let n = 0
    const i = t.length
    for (; n < i; n++) ~this.transports.indexOf(t[n]) && r.push(t[n])
    return r
  }
}
t1.protocol = Xx
function RE(e, t = '', r) {
  let n = e
  ;(r = r || (typeof location < 'u' && location)),
    e == null && (e = r.protocol + '//' + r.host),
    typeof e == 'string' &&
      (e.charAt(0) === '/' &&
        (e.charAt(1) === '/' ? (e = r.protocol + e) : (e = r.host + e)),
      /^(https?|wss?):\/\//.test(e) ||
        (typeof r < 'u' ? (e = r.protocol + '//' + e) : (e = 'https://' + e)),
      (n = hf(e))),
    n.port ||
      (/^(http|ws)$/.test(n.protocol)
        ? (n.port = '80')
        : /^(http|ws)s$/.test(n.protocol) && (n.port = '443')),
    (n.path = n.path || '/')
  const a = n.host.indexOf(':') !== -1 ? '[' + n.host + ']' : n.host
  return (
    (n.id = n.protocol + '://' + a + ':' + n.port + t),
    (n.href =
      n.protocol + '://' + a + (r && r.port === n.port ? '' : ':' + n.port)),
    n
  )
}
const DE = typeof ArrayBuffer == 'function',
  LE = (e) =>
    typeof ArrayBuffer.isView == 'function'
      ? ArrayBuffer.isView(e)
      : e.buffer instanceof ArrayBuffer,
  r1 = Object.prototype.toString,
  BE =
    typeof Blob == 'function' ||
    (typeof Blob < 'u' && r1.call(Blob) === '[object BlobConstructor]'),
  FE =
    typeof File == 'function' ||
    (typeof File < 'u' && r1.call(File) === '[object FileConstructor]')
function Ah(e) {
  return (
    (DE && (e instanceof ArrayBuffer || LE(e))) ||
    (BE && e instanceof Blob) ||
    (FE && e instanceof File)
  )
}
function Ns(e, t) {
  if (!e || typeof e != 'object') return !1
  if (Array.isArray(e)) {
    for (let r = 0, n = e.length; r < n; r++) if (Ns(e[r])) return !0
    return !1
  }
  if (Ah(e)) return !0
  if (e.toJSON && typeof e.toJSON == 'function' && arguments.length === 1)
    return Ns(e.toJSON(), !0)
  for (const r in e)
    if (Object.prototype.hasOwnProperty.call(e, r) && Ns(e[r])) return !0
  return !1
}
function UE(e) {
  const t = [],
    r = e.data,
    n = e
  return (
    (n.data = pf(r, t)), (n.attachments = t.length), { packet: n, buffers: t }
  )
}
function pf(e, t) {
  if (!e) return e
  if (Ah(e)) {
    const r = { _placeholder: !0, num: t.length }
    return t.push(e), r
  } else if (Array.isArray(e)) {
    const r = new Array(e.length)
    for (let n = 0; n < e.length; n++) r[n] = pf(e[n], t)
    return r
  } else if (typeof e == 'object' && !(e instanceof Date)) {
    const r = {}
    for (const n in e)
      Object.prototype.hasOwnProperty.call(e, n) && (r[n] = pf(e[n], t))
    return r
  }
  return e
}
function WE(e, t) {
  return (e.data = vf(e.data, t)), delete e.attachments, e
}
function vf(e, t) {
  if (!e) return e
  if (e && e._placeholder === !0) {
    if (typeof e.num == 'number' && e.num >= 0 && e.num < t.length)
      return t[e.num]
    throw new Error('illegal attachments')
  } else if (Array.isArray(e))
    for (let r = 0; r < e.length; r++) e[r] = vf(e[r], t)
  else if (typeof e == 'object')
    for (const r in e)
      Object.prototype.hasOwnProperty.call(e, r) && (e[r] = vf(e[r], t))
  return e
}
const qE = [
    'connect',
    'connect_error',
    'disconnect',
    'disconnecting',
    'newListener',
    'removeListener',
  ],
  HE = 5
var de
;(function (e) {
  ;(e[(e.CONNECT = 0)] = 'CONNECT'),
    (e[(e.DISCONNECT = 1)] = 'DISCONNECT'),
    (e[(e.EVENT = 2)] = 'EVENT'),
    (e[(e.ACK = 3)] = 'ACK'),
    (e[(e.CONNECT_ERROR = 4)] = 'CONNECT_ERROR'),
    (e[(e.BINARY_EVENT = 5)] = 'BINARY_EVENT'),
    (e[(e.BINARY_ACK = 6)] = 'BINARY_ACK')
})(de || (de = {}))
class zE {
  constructor(t) {
    this.replacer = t
  }
  encode(t) {
    return (t.type === de.EVENT || t.type === de.ACK) && Ns(t)
      ? this.encodeAsBinary({
          type: t.type === de.EVENT ? de.BINARY_EVENT : de.BINARY_ACK,
          nsp: t.nsp,
          data: t.data,
          id: t.id,
        })
      : [this.encodeAsString(t)]
  }
  encodeAsString(t) {
    let r = '' + t.type
    return (
      (t.type === de.BINARY_EVENT || t.type === de.BINARY_ACK) &&
        (r += t.attachments + '-'),
      t.nsp && t.nsp !== '/' && (r += t.nsp + ','),
      t.id != null && (r += t.id),
      t.data != null && (r += JSON.stringify(t.data, this.replacer)),
      r
    )
  }
  encodeAsBinary(t) {
    const r = UE(t),
      n = this.encodeAsString(r.packet),
      i = r.buffers
    return i.unshift(n), i
  }
}
function Tv(e) {
  return Object.prototype.toString.call(e) === '[object Object]'
}
class Ph extends Re {
  constructor(t) {
    super(), (this.reviver = t)
  }
  add(t) {
    let r
    if (typeof t == 'string') {
      if (this.reconstructor)
        throw new Error('got plaintext data when reconstructing a packet')
      r = this.decodeString(t)
      const n = r.type === de.BINARY_EVENT
      n || r.type === de.BINARY_ACK
        ? ((r.type = n ? de.EVENT : de.ACK),
          (this.reconstructor = new KE(r)),
          r.attachments === 0 && super.emitReserved('decoded', r))
        : super.emitReserved('decoded', r)
    } else if (Ah(t) || t.base64)
      if (this.reconstructor)
        (r = this.reconstructor.takeBinaryData(t)),
          r && ((this.reconstructor = null), super.emitReserved('decoded', r))
      else throw new Error('got binary data when not reconstructing a packet')
    else throw new Error('Unknown type: ' + t)
  }
  decodeString(t) {
    let r = 0
    const n = { type: Number(t.charAt(0)) }
    if (de[n.type] === void 0) throw new Error('unknown packet type ' + n.type)
    if (n.type === de.BINARY_EVENT || n.type === de.BINARY_ACK) {
      const a = r + 1
      for (; t.charAt(++r) !== '-' && r != t.length; );
      const o = t.substring(a, r)
      if (o != Number(o) || t.charAt(r) !== '-')
        throw new Error('Illegal attachments')
      n.attachments = Number(o)
    }
    if (t.charAt(r + 1) === '/') {
      const a = r + 1
      for (; ++r && !(t.charAt(r) === ',' || r === t.length); );
      n.nsp = t.substring(a, r)
    } else n.nsp = '/'
    const i = t.charAt(r + 1)
    if (i !== '' && Number(i) == i) {
      const a = r + 1
      for (; ++r; ) {
        const o = t.charAt(r)
        if (o == null || Number(o) != o) {
          --r
          break
        }
        if (r === t.length) break
      }
      n.id = Number(t.substring(a, r + 1))
    }
    if (t.charAt(++r)) {
      const a = this.tryParse(t.substr(r))
      if (Ph.isPayloadValid(n.type, a)) n.data = a
      else throw new Error('invalid payload')
    }
    return n
  }
  tryParse(t) {
    try {
      return JSON.parse(t, this.reviver)
    } catch {
      return !1
    }
  }
  static isPayloadValid(t, r) {
    switch (t) {
      case de.CONNECT:
        return Tv(r)
      case de.DISCONNECT:
        return r === void 0
      case de.CONNECT_ERROR:
        return typeof r == 'string' || Tv(r)
      case de.EVENT:
      case de.BINARY_EVENT:
        return (
          Array.isArray(r) &&
          (typeof r[0] == 'number' ||
            (typeof r[0] == 'string' && qE.indexOf(r[0]) === -1))
        )
      case de.ACK:
      case de.BINARY_ACK:
        return Array.isArray(r)
    }
  }
  destroy() {
    this.reconstructor &&
      (this.reconstructor.finishedReconstruction(), (this.reconstructor = null))
  }
}
class KE {
  constructor(t) {
    ;(this.packet = t), (this.buffers = []), (this.reconPack = t)
  }
  takeBinaryData(t) {
    if (
      (this.buffers.push(t), this.buffers.length === this.reconPack.attachments)
    ) {
      const r = WE(this.reconPack, this.buffers)
      return this.finishedReconstruction(), r
    }
    return null
  }
  finishedReconstruction() {
    ;(this.reconPack = null), (this.buffers = [])
  }
}
const GE = Object.freeze(
  Object.defineProperty(
    {
      __proto__: null,
      Decoder: Ph,
      Encoder: zE,
      get PacketType() {
        return de
      },
      protocol: HE,
    },
    Symbol.toStringTag,
    { value: 'Module' },
  ),
)
function Ut(e, t, r) {
  return (
    e.on(t, r),
    function () {
      e.off(t, r)
    }
  )
}
const VE = Object.freeze({
  connect: 1,
  connect_error: 1,
  disconnect: 1,
  disconnecting: 1,
  newListener: 1,
  removeListener: 1,
})
class n1 extends Re {
  constructor(t, r, n) {
    super(),
      (this.connected = !1),
      (this.recovered = !1),
      (this.receiveBuffer = []),
      (this.sendBuffer = []),
      (this._queue = []),
      (this._queueSeq = 0),
      (this.ids = 0),
      (this.acks = {}),
      (this.flags = {}),
      (this.io = t),
      (this.nsp = r),
      n && n.auth && (this.auth = n.auth),
      (this._opts = Object.assign({}, n)),
      this.io._autoConnect && this.open()
  }
  get disconnected() {
    return !this.connected
  }
  subEvents() {
    if (this.subs) return
    const t = this.io
    this.subs = [
      Ut(t, 'open', this.onopen.bind(this)),
      Ut(t, 'packet', this.onpacket.bind(this)),
      Ut(t, 'error', this.onerror.bind(this)),
      Ut(t, 'close', this.onclose.bind(this)),
    ]
  }
  get active() {
    return !!this.subs
  }
  connect() {
    return this.connected
      ? this
      : (this.subEvents(),
        this.io._reconnecting || this.io.open(),
        this.io._readyState === 'open' && this.onopen(),
        this)
  }
  open() {
    return this.connect()
  }
  send(...t) {
    return t.unshift('message'), this.emit.apply(this, t), this
  }
  emit(t, ...r) {
    if (VE.hasOwnProperty(t))
      throw new Error('"' + t.toString() + '" is a reserved event name')
    if (
      (r.unshift(t),
      this._opts.retries && !this.flags.fromQueue && !this.flags.volatile)
    )
      return this._addToQueue(r), this
    const n = { type: de.EVENT, data: r }
    if (
      ((n.options = {}),
      (n.options.compress = this.flags.compress !== !1),
      typeof r[r.length - 1] == 'function')
    ) {
      const o = this.ids++,
        s = r.pop()
      this._registerAckCallback(o, s), (n.id = o)
    }
    const i =
      this.io.engine &&
      this.io.engine.transport &&
      this.io.engine.transport.writable
    return (
      (this.flags.volatile && (!i || !this.connected)) ||
        (this.connected
          ? (this.notifyOutgoingListeners(n), this.packet(n))
          : this.sendBuffer.push(n)),
      (this.flags = {}),
      this
    )
  }
  _registerAckCallback(t, r) {
    var n
    const i =
      (n = this.flags.timeout) !== null && n !== void 0
        ? n
        : this._opts.ackTimeout
    if (i === void 0) {
      this.acks[t] = r
      return
    }
    const a = this.io.setTimeoutFn(() => {
      delete this.acks[t]
      for (let o = 0; o < this.sendBuffer.length; o++)
        this.sendBuffer[o].id === t && this.sendBuffer.splice(o, 1)
      r.call(this, new Error('operation has timed out'))
    }, i)
    this.acks[t] = (...o) => {
      this.io.clearTimeoutFn(a), r.apply(this, [null, ...o])
    }
  }
  emitWithAck(t, ...r) {
    const n = this.flags.timeout !== void 0 || this._opts.ackTimeout !== void 0
    return new Promise((i, a) => {
      r.push((o, s) => (n ? (o ? a(o) : i(s)) : i(o))), this.emit(t, ...r)
    })
  }
  _addToQueue(t) {
    let r
    typeof t[t.length - 1] == 'function' && (r = t.pop())
    const n = {
      id: this._queueSeq++,
      tryCount: 0,
      pending: !1,
      args: t,
      flags: Object.assign({ fromQueue: !0 }, this.flags),
    }
    t.push((i, ...a) =>
      n !== this._queue[0]
        ? void 0
        : (i !== null
            ? n.tryCount > this._opts.retries &&
              (this._queue.shift(), r && r(i))
            : (this._queue.shift(), r && r(null, ...a)),
          (n.pending = !1),
          this._drainQueue()),
    ),
      this._queue.push(n),
      this._drainQueue()
  }
  _drainQueue(t = !1) {
    if (!this.connected || this._queue.length === 0) return
    const r = this._queue[0]
    ;(r.pending && !t) ||
      ((r.pending = !0),
      r.tryCount++,
      (this.flags = r.flags),
      this.emit.apply(this, r.args))
  }
  packet(t) {
    ;(t.nsp = this.nsp), this.io._packet(t)
  }
  onopen() {
    typeof this.auth == 'function'
      ? this.auth((t) => {
          this._sendConnectPacket(t)
        })
      : this._sendConnectPacket(this.auth)
  }
  _sendConnectPacket(t) {
    this.packet({
      type: de.CONNECT,
      data: this._pid
        ? Object.assign({ pid: this._pid, offset: this._lastOffset }, t)
        : t,
    })
  }
  onerror(t) {
    this.connected || this.emitReserved('connect_error', t)
  }
  onclose(t, r) {
    ;(this.connected = !1),
      delete this.id,
      this.emitReserved('disconnect', t, r)
  }
  onpacket(t) {
    if (t.nsp === this.nsp)
      switch (t.type) {
        case de.CONNECT:
          t.data && t.data.sid
            ? this.onconnect(t.data.sid, t.data.pid)
            : this.emitReserved(
                'connect_error',
                new Error(
                  'It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)',
                ),
              )
          break
        case de.EVENT:
        case de.BINARY_EVENT:
          this.onevent(t)
          break
        case de.ACK:
        case de.BINARY_ACK:
          this.onack(t)
          break
        case de.DISCONNECT:
          this.ondisconnect()
          break
        case de.CONNECT_ERROR:
          this.destroy()
          const n = new Error(t.data.message)
          ;(n.data = t.data.data), this.emitReserved('connect_error', n)
          break
      }
  }
  onevent(t) {
    const r = t.data || []
    t.id != null && r.push(this.ack(t.id)),
      this.connected
        ? this.emitEvent(r)
        : this.receiveBuffer.push(Object.freeze(r))
  }
  emitEvent(t) {
    if (this._anyListeners && this._anyListeners.length) {
      const r = this._anyListeners.slice()
      for (const n of r) n.apply(this, t)
    }
    super.emit.apply(this, t),
      this._pid &&
        t.length &&
        typeof t[t.length - 1] == 'string' &&
        (this._lastOffset = t[t.length - 1])
  }
  ack(t) {
    const r = this
    let n = !1
    return function (...i) {
      n || ((n = !0), r.packet({ type: de.ACK, id: t, data: i }))
    }
  }
  onack(t) {
    const r = this.acks[t.id]
    typeof r == 'function' && (r.apply(this, t.data), delete this.acks[t.id])
  }
  onconnect(t, r) {
    ;(this.id = t),
      (this.recovered = r && this._pid === r),
      (this._pid = r),
      (this.connected = !0),
      this.emitBuffered(),
      this.emitReserved('connect'),
      this._drainQueue(!0)
  }
  emitBuffered() {
    this.receiveBuffer.forEach((t) => this.emitEvent(t)),
      (this.receiveBuffer = []),
      this.sendBuffer.forEach((t) => {
        this.notifyOutgoingListeners(t), this.packet(t)
      }),
      (this.sendBuffer = [])
  }
  ondisconnect() {
    this.destroy(), this.onclose('io server disconnect')
  }
  destroy() {
    this.subs && (this.subs.forEach((t) => t()), (this.subs = void 0)),
      this.io._destroy(this)
  }
  disconnect() {
    return (
      this.connected && this.packet({ type: de.DISCONNECT }),
      this.destroy(),
      this.connected && this.onclose('io client disconnect'),
      this
    )
  }
  close() {
    return this.disconnect()
  }
  compress(t) {
    return (this.flags.compress = t), this
  }
  get volatile() {
    return (this.flags.volatile = !0), this
  }
  timeout(t) {
    return (this.flags.timeout = t), this
  }
  onAny(t) {
    return (
      (this._anyListeners = this._anyListeners || []),
      this._anyListeners.push(t),
      this
    )
  }
  prependAny(t) {
    return (
      (this._anyListeners = this._anyListeners || []),
      this._anyListeners.unshift(t),
      this
    )
  }
  offAny(t) {
    if (!this._anyListeners) return this
    if (t) {
      const r = this._anyListeners
      for (let n = 0; n < r.length; n++)
        if (t === r[n]) return r.splice(n, 1), this
    } else this._anyListeners = []
    return this
  }
  listenersAny() {
    return this._anyListeners || []
  }
  onAnyOutgoing(t) {
    return (
      (this._anyOutgoingListeners = this._anyOutgoingListeners || []),
      this._anyOutgoingListeners.push(t),
      this
    )
  }
  prependAnyOutgoing(t) {
    return (
      (this._anyOutgoingListeners = this._anyOutgoingListeners || []),
      this._anyOutgoingListeners.unshift(t),
      this
    )
  }
  offAnyOutgoing(t) {
    if (!this._anyOutgoingListeners) return this
    if (t) {
      const r = this._anyOutgoingListeners
      for (let n = 0; n < r.length; n++)
        if (t === r[n]) return r.splice(n, 1), this
    } else this._anyOutgoingListeners = []
    return this
  }
  listenersAnyOutgoing() {
    return this._anyOutgoingListeners || []
  }
  notifyOutgoingListeners(t) {
    if (this._anyOutgoingListeners && this._anyOutgoingListeners.length) {
      const r = this._anyOutgoingListeners.slice()
      for (const n of r) n.apply(this, t.data)
    }
  }
}
function fa(e) {
  ;(e = e || {}),
    (this.ms = e.min || 100),
    (this.max = e.max || 1e4),
    (this.factor = e.factor || 2),
    (this.jitter = e.jitter > 0 && e.jitter <= 1 ? e.jitter : 0),
    (this.attempts = 0)
}
fa.prototype.duration = function () {
  var e = this.ms * Math.pow(this.factor, this.attempts++)
  if (this.jitter) {
    var t = Math.random(),
      r = Math.floor(t * this.jitter * e)
    e = Math.floor(t * 10) & 1 ? e + r : e - r
  }
  return Math.min(e, this.max) | 0
}
fa.prototype.reset = function () {
  this.attempts = 0
}
fa.prototype.setMin = function (e) {
  this.ms = e
}
fa.prototype.setMax = function (e) {
  this.max = e
}
fa.prototype.setJitter = function (e) {
  this.jitter = e
}
class yf extends Re {
  constructor(t, r) {
    var n
    super(),
      (this.nsps = {}),
      (this.subs = []),
      t && typeof t == 'object' && ((r = t), (t = void 0)),
      (r = r || {}),
      (r.path = r.path || '/socket.io'),
      (this.opts = r),
      su(this, r),
      this.reconnection(r.reconnection !== !1),
      this.reconnectionAttempts(r.reconnectionAttempts || 1 / 0),
      this.reconnectionDelay(r.reconnectionDelay || 1e3),
      this.reconnectionDelayMax(r.reconnectionDelayMax || 5e3),
      this.randomizationFactor(
        (n = r.randomizationFactor) !== null && n !== void 0 ? n : 0.5,
      ),
      (this.backoff = new fa({
        min: this.reconnectionDelay(),
        max: this.reconnectionDelayMax(),
        jitter: this.randomizationFactor(),
      })),
      this.timeout(r.timeout == null ? 2e4 : r.timeout),
      (this._readyState = 'closed'),
      (this.uri = t)
    const i = r.parser || GE
    ;(this.encoder = new i.Encoder()),
      (this.decoder = new i.Decoder()),
      (this._autoConnect = r.autoConnect !== !1),
      this._autoConnect && this.open()
  }
  reconnection(t) {
    return arguments.length
      ? ((this._reconnection = !!t), this)
      : this._reconnection
  }
  reconnectionAttempts(t) {
    return t === void 0
      ? this._reconnectionAttempts
      : ((this._reconnectionAttempts = t), this)
  }
  reconnectionDelay(t) {
    var r
    return t === void 0
      ? this._reconnectionDelay
      : ((this._reconnectionDelay = t),
        (r = this.backoff) === null || r === void 0 || r.setMin(t),
        this)
  }
  randomizationFactor(t) {
    var r
    return t === void 0
      ? this._randomizationFactor
      : ((this._randomizationFactor = t),
        (r = this.backoff) === null || r === void 0 || r.setJitter(t),
        this)
  }
  reconnectionDelayMax(t) {
    var r
    return t === void 0
      ? this._reconnectionDelayMax
      : ((this._reconnectionDelayMax = t),
        (r = this.backoff) === null || r === void 0 || r.setMax(t),
        this)
  }
  timeout(t) {
    return arguments.length ? ((this._timeout = t), this) : this._timeout
  }
  maybeReconnectOnOpen() {
    !this._reconnecting &&
      this._reconnection &&
      this.backoff.attempts === 0 &&
      this.reconnect()
  }
  open(t) {
    if (~this._readyState.indexOf('open')) return this
    this.engine = new t1(this.uri, this.opts)
    const r = this.engine,
      n = this
    ;(this._readyState = 'opening'), (this.skipReconnect = !1)
    const i = Ut(r, 'open', function () {
        n.onopen(), t && t()
      }),
      a = (s) => {
        this.cleanup(),
          (this._readyState = 'closed'),
          this.emitReserved('error', s),
          t ? t(s) : this.maybeReconnectOnOpen()
      },
      o = Ut(r, 'error', a)
    if (this._timeout !== !1) {
      const s = this._timeout,
        c = this.setTimeoutFn(() => {
          i(), a(new Error('timeout')), r.close()
        }, s)
      this.opts.autoUnref && c.unref(),
        this.subs.push(() => {
          this.clearTimeoutFn(c)
        })
    }
    return this.subs.push(i), this.subs.push(o), this
  }
  connect(t) {
    return this.open(t)
  }
  onopen() {
    this.cleanup(), (this._readyState = 'open'), this.emitReserved('open')
    const t = this.engine
    this.subs.push(
      Ut(t, 'ping', this.onping.bind(this)),
      Ut(t, 'data', this.ondata.bind(this)),
      Ut(t, 'error', this.onerror.bind(this)),
      Ut(t, 'close', this.onclose.bind(this)),
      Ut(this.decoder, 'decoded', this.ondecoded.bind(this)),
    )
  }
  onping() {
    this.emitReserved('ping')
  }
  ondata(t) {
    try {
      this.decoder.add(t)
    } catch (r) {
      this.onclose('parse error', r)
    }
  }
  ondecoded(t) {
    Sh(() => {
      this.emitReserved('packet', t)
    }, this.setTimeoutFn)
  }
  onerror(t) {
    this.emitReserved('error', t)
  }
  socket(t, r) {
    let n = this.nsps[t]
    return (
      n
        ? this._autoConnect && !n.active && n.connect()
        : ((n = new n1(this, t, r)), (this.nsps[t] = n)),
      n
    )
  }
  _destroy(t) {
    const r = Object.keys(this.nsps)
    for (const n of r) if (this.nsps[n].active) return
    this._close()
  }
  _packet(t) {
    const r = this.encoder.encode(t)
    for (let n = 0; n < r.length; n++) this.engine.write(r[n], t.options)
  }
  cleanup() {
    this.subs.forEach((t) => t()),
      (this.subs.length = 0),
      this.decoder.destroy()
  }
  _close() {
    ;(this.skipReconnect = !0),
      (this._reconnecting = !1),
      this.onclose('forced close'),
      this.engine && this.engine.close()
  }
  disconnect() {
    return this._close()
  }
  onclose(t, r) {
    this.cleanup(),
      this.backoff.reset(),
      (this._readyState = 'closed'),
      this.emitReserved('close', t, r),
      this._reconnection && !this.skipReconnect && this.reconnect()
  }
  reconnect() {
    if (this._reconnecting || this.skipReconnect) return this
    const t = this
    if (this.backoff.attempts >= this._reconnectionAttempts)
      this.backoff.reset(),
        this.emitReserved('reconnect_failed'),
        (this._reconnecting = !1)
    else {
      const r = this.backoff.duration()
      this._reconnecting = !0
      const n = this.setTimeoutFn(() => {
        t.skipReconnect ||
          (this.emitReserved('reconnect_attempt', t.backoff.attempts),
          !t.skipReconnect &&
            t.open((i) => {
              i
                ? ((t._reconnecting = !1),
                  t.reconnect(),
                  this.emitReserved('reconnect_error', i))
                : t.onreconnect()
            }))
      }, r)
      this.opts.autoUnref && n.unref(),
        this.subs.push(() => {
          this.clearTimeoutFn(n)
        })
    }
  }
  onreconnect() {
    const t = this.backoff.attempts
    ;(this._reconnecting = !1),
      this.backoff.reset(),
      this.emitReserved('reconnect', t)
  }
}
const Ca = {}
function Is(e, t) {
  typeof e == 'object' && ((t = e), (e = void 0)), (t = t || {})
  const r = RE(e, t.path || '/socket.io'),
    n = r.source,
    i = r.id,
    a = r.path,
    o = Ca[i] && a in Ca[i].nsps,
    s = t.forceNew || t['force new connection'] || t.multiplex === !1 || o
  let c
  return (
    s ? (c = new yf(n, t)) : (Ca[i] || (Ca[i] = new yf(n, t)), (c = Ca[i])),
    r.query && !t.query && (t.query = r.queryKey),
    c.socket(r.path, t)
  )
}
Object.assign(Is, { Manager: yf, Socket: n1, io: Is, connect: Is })
const i1 = A.createContext(),
  kv = 'https://drcdv-1.onrender.com',
  XE = ({ children: e }) => {
    const [t, r] = A.useState(null)
    return (
      A.useEffect(() => {
        const n = Is(kv, {
          withCredentials: !0,
          transports: ['websocket'],
          path: '/socket.io',
        })
        return (
          r(n),
          n.on('connect', () => {
            console.log('Connected to Socket.IO server:', kv)
          }),
          n.on('connect_error', (i) => {
            console.error('Socket.IO connect error:', i)
          }),
          () => {
            n.disconnect()
          }
        )
      }, []),
      O.jsx(i1.Provider, { value: t, children: e })
    )
  },
  a1 = () => A.useContext(i1)
class qa extends Error {}
qa.prototype.name = 'InvalidTokenError'
function YE(e) {
  return decodeURIComponent(
    atob(e).replace(/(.)/g, (t, r) => {
      let n = r.charCodeAt(0).toString(16).toUpperCase()
      return n.length < 2 && (n = '0' + n), '%' + n
    }),
  )
}
function QE(e) {
  let t = e.replace(/-/g, '+').replace(/_/g, '/')
  switch (t.length % 4) {
    case 0:
      break
    case 2:
      t += '=='
      break
    case 3:
      t += '='
      break
    default:
      throw new Error('base64 string is not of the correct length')
  }
  try {
    return YE(t)
  } catch {
    return atob(t)
  }
}
function Nr(e, t) {
  if (typeof e != 'string')
    throw new qa('Invalid token specified: must be a string')
  t || (t = {})
  const r = t.header === !0 ? 0 : 1,
    n = e.split('.')[r]
  if (typeof n != 'string')
    throw new qa(`Invalid token specified: missing part #${r + 1}`)
  let i
  try {
    i = QE(n)
  } catch (a) {
    throw new qa(
      `Invalid token specified: invalid base64 for part #${r + 1} (${a.message})`,
    )
  }
  try {
    return JSON.parse(i)
  } catch (a) {
    throw new qa(
      `Invalid token specified: invalid json for part #${r + 1} (${a.message})`,
    )
  }
}
function ZE({ channelId: e }) {
  const [t, r] = A.useState(''),
    [n, i] = A.useState([]),
    [a, o] = A.useState(!1),
    [s] = ur(),
    c = a1(),
    u = ua(),
    [l, f] = A.useState(null),
    [d, h] = A.useState(!1)
  A.useEffect(() => {
    if (s)
      try {
        const b = Nr(s)
        f(b.sub)
      } catch (b) {
        console.error('Invalid token:', b)
      }
  }, [s])
  const y = A.useCallback(
    (b) => {
      console.log('Message created:', b),
        u.invalidateQueries(['messages', e]),
        r(''),
        i([]),
        o(!0),
        h(!1),
        setTimeout(() => o(!1), 2e3)
    },
    [e, u],
  )
  A.useEffect(() => {
    if (c)
      return (
        c.on('messageCreated', y),
        console.log('Added socket listener for messageCreated'),
        () => {
          c.off('messageCreated', y),
            console.log('Removed socket listener for messageCreated')
        }
      )
  }, [c, y])
  const v = Ko({
      mutationFn: () => {
        c &&
          l &&
          !d &&
          (console.log('Emitting createMessage'),
          c.emit('createMessage', {
            userId: l,
            channelId: e,
            messageData: { text: t, attachments: n, channel: e },
          }),
          h(!0))
      },
      onError: () => {
        h(!1)
      },
      onSettled: () => {
        r(''), i([]), h(!1)
      },
    }),
    p = (b) => {
      b.preventDefault(), !d && !v.isPending && v.mutate()
    },
    x = (b) => {
      const g = Array.from(b.target.files).map(
        (m) =>
          new Promise((S, P) => {
            const $ = new FileReader()
            ;($.onload = () =>
              S({
                filename: m.name,
                contentType: m.type,
                data: $.result.split(',')[1],
              })),
              ($.onerror = P),
              $.readAsDataURL(m)
          }),
      )
      Promise.all(g)
        .then(i)
        .catch((m) => console.error('Error reading files:', m))
    }
  return O.jsx(Er, {
    className: 'p-4',
    children: O.jsxs(_e, {
      onSubmit: (b) => p(b),
      children: [
        O.jsx(_e.Group, {
          controlId: 'messageInput',
          className: 'mb-3',
          children: O.jsx(_e.Control, {
            type: 'text',
            placeholder: 'Type your message...',
            value: t,
            onChange: (b) => r(b.target.value),
          }),
        }),
        O.jsxs('div', {
          style: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          },
          children: [
            O.jsx(_e.Group, {
              controlId: 'fileInput',
              className: 'mb-3',
              children: O.jsx(_e.Control, {
                type: 'file',
                multiple: !0,
                onChange: x,
              }),
            }),
            O.jsx(Xe, {
              variant: 'primary',
              type: 'submit',
              disabled: !t || d || v.isPending,
              className: 'ml-2',
              style: { backgroundColor: 'black', color: 'white' },
              children: d ? 'Sending...' : 'Send',
            }),
          ],
        }),
        a &&
          O.jsx(rh, {
            variant: 'success',
            children: 'Message sent successfully!',
          }),
      ],
    }),
  })
}
const o1 = async (e) => {
    try {
      const t = new URLSearchParams(e).toString(),
        r = await fetch(`https://drcdv-1.onrender.com/channels?${t}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${e.token}`,
          },
        })
      if (!r.ok) throw new Error(`Error fetching channels: ${r.statusText}`)
      return await r.json()
    } catch (t) {
      throw (console.error('Error listing channels:', t), t)
    }
  },
  s1 = async (e, t) => {
    try {
      console.log('Sending to API:', t)
      const r = await fetch('https://drcdv-1.onrender.com/channels', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${e}`,
          },
          body: JSON.stringify(t),
        }),
        n = await r.json()
      if ((console.log('API Creating channel body:', n), !r.ok))
        throw new Error(`Error creating channel: ${r.statusText}`)
      return n
    } catch (r) {
      throw (console.error('Error creating channel:', r), r)
    }
  },
  c1 = async (e, t) => {
    try {
      const r = await fetch(`https://drcdv-1.onrender.com/channels/${e}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${t}`,
        },
      })
      if (!r.ok) throw new Error(`Error fetching channel: ${r.statusText}`)
      return await r.json()
    } catch (r) {
      throw (console.error('Error fetching channel:', r), r)
    }
  },
  JE = async (e, t) => {
    try {
      const r = await fetch(
        `https://drcdv-1.onrender.com/channels/${e}/messages`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${t}`,
          },
        },
      )
      if (!r.ok)
        throw new Error(`Error fetching channel messages: ${r.statusText}`)
      const n = await r.json()
      return console.log('Fetched channel messages:', n), n
    } catch (r) {
      throw (console.error('Error fetching channel messages:', r), r)
    }
  },
  Gs =
    "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3c!--%20Uploaded%20to:%20SVG%20Repo,%20www.svgrepo.com,%20Generator:%20SVG%20Repo%20Mixer%20Tools%20--%3e%3csvg%20width='800px'%20height='800px'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M16%207C16%209.20914%2014.2091%2011%2012%2011C9.79086%2011%208%209.20914%208%207C8%204.79086%209.79086%203%2012%203C14.2091%203%2016%204.79086%2016%207Z'%20stroke='%23000000'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M12%2014C8.13401%2014%205%2017.134%205%2021H19C19%2017.134%2015.866%2014%2012%2014Z'%20stroke='%23000000'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e",
  e_ = '/assets/startSending-DI7G6wlN.gif',
  t_ =
    "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3c!--%20Uploaded%20to:%20SVG%20Repo,%20www.svgrepo.com,%20Generator:%20SVG%20Repo%20Mixer%20Tools%20--%3e%3csvg%20width='800px'%20height='800px'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3ccircle%20cx='12'%20cy='8'%20r='3'%20stroke='%2333363F'%20stroke-width='2'%20stroke-linecap='round'/%3e%3cpath%20d='M15.2679%208C15.5332%207.54063%2015.97%207.20543%2016.4824%207.06815C16.9947%206.93086%2017.5406%207.00273%2018%207.26795C18.4594%207.53317%2018.7946%207.97%2018.9319%208.48236C19.0691%208.99472%2018.9973%209.54063%2018.7321%2010C18.4668%2010.4594%2018.03%2010.7946%2017.5176%2010.9319C17.0053%2011.0691%2016.4594%2010.9973%2016%2010.7321C15.5406%2010.4668%2015.2054%2010.03%2015.0681%209.51764C14.9309%209.00528%2015.0027%208.45937%2015.2679%208L15.2679%208Z'%20stroke='%2333363F'%20stroke-width='2'/%3e%3cpath%20d='M5.26795%208C5.53317%207.54063%205.97%207.20543%206.48236%207.06815C6.99472%206.93086%207.54063%207.00273%208%207.26795C8.45937%207.53317%208.79457%207.97%208.93185%208.48236C9.06914%208.99472%208.99727%209.54063%208.73205%2010C8.46683%2010.4594%208.03%2010.7946%207.51764%2010.9319C7.00528%2011.0691%206.45937%2010.9973%206%2010.7321C5.54063%2010.4668%205.20543%2010.03%205.06815%209.51764C4.93086%209.00528%205.00273%208.45937%205.26795%208L5.26795%208Z'%20stroke='%2333363F'%20stroke-width='2'/%3e%3cpath%20d='M16.8816%2018L15.9013%2018.1974L16.0629%2019H16.8816V18ZM20.7202%2016.9042L21.6627%2016.5699L20.7202%2016.9042ZM14.7808%2014.7105L14.176%2013.9142L13.0194%2014.7927L14.2527%2015.5597L14.7808%2014.7105ZM19.8672%2017H16.8816V19H19.8672V17ZM19.7777%2017.2384C19.7707%2017.2186%2019.7642%2017.181%2019.7725%2017.1354C19.7804%2017.0921%2019.7982%2017.0593%2019.8151%2017.0383C19.8474%2016.9982%2019.874%2017%2019.8672%2017V19C21.0132%2019%2022.1414%2017.9194%2021.6627%2016.5699L19.7777%2017.2384ZM17%2015C18.6416%2015%2019.4027%2016.1811%2019.7777%2017.2384L21.6627%2016.5699C21.1976%2015.2588%2019.9485%2013%2017%2013V15ZM15.3857%2015.5069C15.7702%2015.2148%2016.282%2015%2017%2015V13C15.8381%2013%2014.9028%2013.3622%2014.176%2013.9142L15.3857%2015.5069ZM14.2527%2015.5597C15.2918%2016.206%2015.7271%2017.3324%2015.9013%2018.1974L17.8619%2017.8026C17.644%2016.7204%2017.0374%2014.9364%2015.309%2013.8614L14.2527%2015.5597Z'%20fill='%2333363F'/%3e%3cpath%20d='M9.21918%2014.7105L9.7473%2015.5597L10.9806%2014.7927L9.82403%2013.9142L9.21918%2014.7105ZM3.2798%2016.9041L4.22227%2017.2384L4.22227%2017.2384L3.2798%2016.9041ZM7.11835%2018V19H7.93703L8.09867%2018.1974L7.11835%2018ZM7.00001%2015C7.71803%2015%208.22986%2015.2148%208.61433%2015.5069L9.82403%2013.9142C9.09723%2013.3621%208.1619%2013%207.00001%2013V15ZM4.22227%2017.2384C4.59732%2016.1811%205.35842%2015%207.00001%2015V13C4.0515%2013%202.80238%2015.2587%202.33733%2016.5699L4.22227%2017.2384ZM4.13278%2017C4.126%2017%204.15264%2016.9982%204.18486%2017.0383C4.20176%2017.0593%204.21961%2017.0921%204.22748%2017.1354C4.2358%2017.181%204.22931%2017.2186%204.22227%2017.2384L2.33733%2016.5699C1.85864%2017.9194%202.98677%2019%204.13278%2019V17ZM7.11835%2017H4.13278V19H7.11835V17ZM8.09867%2018.1974C8.27289%2017.3324%208.70814%2016.206%209.7473%2015.5597L8.69106%2013.8614C6.96257%2014.9363%206.356%2016.7203%206.13804%2017.8026L8.09867%2018.1974Z'%20fill='%2333363F'/%3e%3cpath%20d='M12%2014C15.5715%2014%2016.5919%2016.5512%2016.8834%2018.0089C16.9917%2018.5504%2016.5523%2019%2016%2019H8C7.44772%2019%207.00829%2018.5504%207.11659%2018.0089C7.4081%2016.5512%208.42846%2014%2012%2014Z'%20stroke='%2333363F'%20stroke-width='2'%20stroke-linecap='round'/%3e%3c/svg%3e"
function u1(e) {
  var t,
    r,
    n = ''
  if (typeof e == 'string' || typeof e == 'number') n += e
  else if (typeof e == 'object')
    if (Array.isArray(e)) {
      var i = e.length
      for (t = 0; t < i; t++)
        e[t] && (r = u1(e[t])) && (n && (n += ' '), (n += r))
    } else for (r in e) e[r] && (n && (n += ' '), (n += r))
  return n
}
function ue() {
  for (var e, t, r = 0, n = '', i = arguments.length; r < i; r++)
    (e = arguments[r]) && (t = u1(e)) && (n && (n += ' '), (n += t))
  return n
}
var r_ = Array.isArray,
  ht = r_,
  n_ = typeof us == 'object' && us && us.Object === Object && us,
  l1 = n_,
  i_ = l1,
  a_ = typeof self == 'object' && self && self.Object === Object && self,
  o_ = i_ || a_ || Function('return this')(),
  lr = o_,
  s_ = lr,
  c_ = s_.Symbol,
  Qo = c_,
  Mv = Qo,
  f1 = Object.prototype,
  u_ = f1.hasOwnProperty,
  l_ = f1.toString,
  ja = Mv ? Mv.toStringTag : void 0
function f_(e) {
  var t = u_.call(e, ja),
    r = e[ja]
  try {
    e[ja] = void 0
    var n = !0
  } catch {}
  var i = l_.call(e)
  return n && (t ? (e[ja] = r) : delete e[ja]), i
}
var d_ = f_,
  h_ = Object.prototype,
  p_ = h_.toString
function v_(e) {
  return p_.call(e)
}
var y_ = v_,
  Nv = Qo,
  m_ = d_,
  g_ = y_,
  b_ = '[object Null]',
  x_ = '[object Undefined]',
  Iv = Nv ? Nv.toStringTag : void 0
function w_(e) {
  return e == null
    ? e === void 0
      ? x_
      : b_
    : Iv && Iv in Object(e)
      ? m_(e)
      : g_(e)
}
var Ir = w_
function O_(e) {
  return e != null && typeof e == 'object'
}
var Rr = O_,
  S_ = Ir,
  A_ = Rr,
  P_ = '[object Symbol]'
function $_(e) {
  return typeof e == 'symbol' || (A_(e) && S_(e) == P_)
}
var da = $_,
  E_ = ht,
  __ = da,
  C_ = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
  j_ = /^\w*$/
function T_(e, t) {
  if (E_(e)) return !1
  var r = typeof e
  return r == 'number' || r == 'symbol' || r == 'boolean' || e == null || __(e)
    ? !0
    : j_.test(e) || !C_.test(e) || (t != null && e in Object(t))
}
var $h = T_
function k_(e) {
  var t = typeof e
  return e != null && (t == 'object' || t == 'function')
}
var sn = k_
const ha = me(sn)
var M_ = Ir,
  N_ = sn,
  I_ = '[object AsyncFunction]',
  R_ = '[object Function]',
  D_ = '[object GeneratorFunction]',
  L_ = '[object Proxy]'
function B_(e) {
  if (!N_(e)) return !1
  var t = M_(e)
  return t == R_ || t == D_ || t == I_ || t == L_
}
var Eh = B_
const ie = me(Eh)
var F_ = lr,
  U_ = F_['__core-js_shared__'],
  W_ = U_,
  dl = W_,
  Rv = (function () {
    var e = /[^.]+$/.exec((dl && dl.keys && dl.keys.IE_PROTO) || '')
    return e ? 'Symbol(src)_1.' + e : ''
  })()
function q_(e) {
  return !!Rv && Rv in e
}
var H_ = q_,
  z_ = Function.prototype,
  K_ = z_.toString
function G_(e) {
  if (e != null) {
    try {
      return K_.call(e)
    } catch {}
    try {
      return e + ''
    } catch {}
  }
  return ''
}
var d1 = G_,
  V_ = Eh,
  X_ = H_,
  Y_ = sn,
  Q_ = d1,
  Z_ = /[\\^$.*+?()[\]{}|]/g,
  J_ = /^\[object .+?Constructor\]$/,
  eC = Function.prototype,
  tC = Object.prototype,
  rC = eC.toString,
  nC = tC.hasOwnProperty,
  iC = RegExp(
    '^' +
      rC
        .call(nC)
        .replace(Z_, '\\$&')
        .replace(
          /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
          '$1.*?',
        ) +
      '$',
  )
function aC(e) {
  if (!Y_(e) || X_(e)) return !1
  var t = V_(e) ? iC : J_
  return t.test(Q_(e))
}
var oC = aC
function sC(e, t) {
  return e == null ? void 0 : e[t]
}
var cC = sC,
  uC = oC,
  lC = cC
function fC(e, t) {
  var r = lC(e, t)
  return uC(r) ? r : void 0
}
var zn = fC,
  dC = zn,
  hC = dC(Object, 'create'),
  cu = hC,
  Dv = cu
function pC() {
  ;(this.__data__ = Dv ? Dv(null) : {}), (this.size = 0)
}
var vC = pC
function yC(e) {
  var t = this.has(e) && delete this.__data__[e]
  return (this.size -= t ? 1 : 0), t
}
var mC = yC,
  gC = cu,
  bC = '__lodash_hash_undefined__',
  xC = Object.prototype,
  wC = xC.hasOwnProperty
function OC(e) {
  var t = this.__data__
  if (gC) {
    var r = t[e]
    return r === bC ? void 0 : r
  }
  return wC.call(t, e) ? t[e] : void 0
}
var SC = OC,
  AC = cu,
  PC = Object.prototype,
  $C = PC.hasOwnProperty
function EC(e) {
  var t = this.__data__
  return AC ? t[e] !== void 0 : $C.call(t, e)
}
var _C = EC,
  CC = cu,
  jC = '__lodash_hash_undefined__'
function TC(e, t) {
  var r = this.__data__
  return (
    (this.size += this.has(e) ? 0 : 1),
    (r[e] = CC && t === void 0 ? jC : t),
    this
  )
}
var kC = TC,
  MC = vC,
  NC = mC,
  IC = SC,
  RC = _C,
  DC = kC
function pa(e) {
  var t = -1,
    r = e == null ? 0 : e.length
  for (this.clear(); ++t < r; ) {
    var n = e[t]
    this.set(n[0], n[1])
  }
}
pa.prototype.clear = MC
pa.prototype.delete = NC
pa.prototype.get = IC
pa.prototype.has = RC
pa.prototype.set = DC
var LC = pa
function BC() {
  ;(this.__data__ = []), (this.size = 0)
}
var FC = BC
function UC(e, t) {
  return e === t || (e !== e && t !== t)
}
var _h = UC,
  WC = _h
function qC(e, t) {
  for (var r = e.length; r--; ) if (WC(e[r][0], t)) return r
  return -1
}
var uu = qC,
  HC = uu,
  zC = Array.prototype,
  KC = zC.splice
function GC(e) {
  var t = this.__data__,
    r = HC(t, e)
  if (r < 0) return !1
  var n = t.length - 1
  return r == n ? t.pop() : KC.call(t, r, 1), --this.size, !0
}
var VC = GC,
  XC = uu
function YC(e) {
  var t = this.__data__,
    r = XC(t, e)
  return r < 0 ? void 0 : t[r][1]
}
var QC = YC,
  ZC = uu
function JC(e) {
  return ZC(this.__data__, e) > -1
}
var ej = JC,
  tj = uu
function rj(e, t) {
  var r = this.__data__,
    n = tj(r, e)
  return n < 0 ? (++this.size, r.push([e, t])) : (r[n][1] = t), this
}
var nj = rj,
  ij = FC,
  aj = VC,
  oj = QC,
  sj = ej,
  cj = nj
function va(e) {
  var t = -1,
    r = e == null ? 0 : e.length
  for (this.clear(); ++t < r; ) {
    var n = e[t]
    this.set(n[0], n[1])
  }
}
va.prototype.clear = ij
va.prototype.delete = aj
va.prototype.get = oj
va.prototype.has = sj
va.prototype.set = cj
var lu = va,
  uj = zn,
  lj = lr,
  fj = uj(lj, 'Map'),
  Ch = fj,
  Lv = LC,
  dj = lu,
  hj = Ch
function pj() {
  ;(this.size = 0),
    (this.__data__ = {
      hash: new Lv(),
      map: new (hj || dj)(),
      string: new Lv(),
    })
}
var vj = pj
function yj(e) {
  var t = typeof e
  return t == 'string' || t == 'number' || t == 'symbol' || t == 'boolean'
    ? e !== '__proto__'
    : e === null
}
var mj = yj,
  gj = mj
function bj(e, t) {
  var r = e.__data__
  return gj(t) ? r[typeof t == 'string' ? 'string' : 'hash'] : r.map
}
var fu = bj,
  xj = fu
function wj(e) {
  var t = xj(this, e).delete(e)
  return (this.size -= t ? 1 : 0), t
}
var Oj = wj,
  Sj = fu
function Aj(e) {
  return Sj(this, e).get(e)
}
var Pj = Aj,
  $j = fu
function Ej(e) {
  return $j(this, e).has(e)
}
var _j = Ej,
  Cj = fu
function jj(e, t) {
  var r = Cj(this, e),
    n = r.size
  return r.set(e, t), (this.size += r.size == n ? 0 : 1), this
}
var Tj = jj,
  kj = vj,
  Mj = Oj,
  Nj = Pj,
  Ij = _j,
  Rj = Tj
function ya(e) {
  var t = -1,
    r = e == null ? 0 : e.length
  for (this.clear(); ++t < r; ) {
    var n = e[t]
    this.set(n[0], n[1])
  }
}
ya.prototype.clear = kj
ya.prototype.delete = Mj
ya.prototype.get = Nj
ya.prototype.has = Ij
ya.prototype.set = Rj
var jh = ya,
  h1 = jh,
  Dj = 'Expected a function'
function Th(e, t) {
  if (typeof e != 'function' || (t != null && typeof t != 'function'))
    throw new TypeError(Dj)
  var r = function () {
    var n = arguments,
      i = t ? t.apply(this, n) : n[0],
      a = r.cache
    if (a.has(i)) return a.get(i)
    var o = e.apply(this, n)
    return (r.cache = a.set(i, o) || a), o
  }
  return (r.cache = new (Th.Cache || h1)()), r
}
Th.Cache = h1
var p1 = Th
const Lj = me(p1)
var Bj = p1,
  Fj = 500
function Uj(e) {
  var t = Bj(e, function (n) {
      return r.size === Fj && r.clear(), n
    }),
    r = t.cache
  return t
}
var Wj = Uj,
  qj = Wj,
  Hj =
    /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
  zj = /\\(\\)?/g,
  Kj = qj(function (e) {
    var t = []
    return (
      e.charCodeAt(0) === 46 && t.push(''),
      e.replace(Hj, function (r, n, i, a) {
        t.push(i ? a.replace(zj, '$1') : n || r)
      }),
      t
    )
  }),
  Gj = Kj
function Vj(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length, i = Array(n); ++r < n; )
    i[r] = t(e[r], r, e)
  return i
}
var kh = Vj,
  Bv = Qo,
  Xj = kh,
  Yj = ht,
  Qj = da,
  Zj = 1 / 0,
  Fv = Bv ? Bv.prototype : void 0,
  Uv = Fv ? Fv.toString : void 0
function v1(e) {
  if (typeof e == 'string') return e
  if (Yj(e)) return Xj(e, v1) + ''
  if (Qj(e)) return Uv ? Uv.call(e) : ''
  var t = e + ''
  return t == '0' && 1 / e == -Zj ? '-0' : t
}
var Jj = v1,
  eT = Jj
function tT(e) {
  return e == null ? '' : eT(e)
}
var y1 = tT,
  rT = ht,
  nT = $h,
  iT = Gj,
  aT = y1
function oT(e, t) {
  return rT(e) ? e : nT(e, t) ? [e] : iT(aT(e))
}
var m1 = oT,
  sT = da,
  cT = 1 / 0
function uT(e) {
  if (typeof e == 'string' || sT(e)) return e
  var t = e + ''
  return t == '0' && 1 / e == -cT ? '-0' : t
}
var du = uT,
  lT = m1,
  fT = du
function dT(e, t) {
  t = lT(t, e)
  for (var r = 0, n = t.length; e != null && r < n; ) e = e[fT(t[r++])]
  return r && r == n ? e : void 0
}
var Mh = dT,
  hT = Mh
function pT(e, t, r) {
  var n = e == null ? void 0 : hT(e, t)
  return n === void 0 ? r : n
}
var g1 = pT
const xt = me(g1)
function vT(e) {
  return e == null
}
var yT = vT
const se = me(yT)
var mT = Ir,
  gT = ht,
  bT = Rr,
  xT = '[object String]'
function wT(e) {
  return typeof e == 'string' || (!gT(e) && bT(e) && mT(e) == xT)
}
var OT = wT
const Zo = me(OT)
var b1 = { exports: {} },
  ge = {}
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Nh = Symbol.for('react.element'),
  Ih = Symbol.for('react.portal'),
  hu = Symbol.for('react.fragment'),
  pu = Symbol.for('react.strict_mode'),
  vu = Symbol.for('react.profiler'),
  yu = Symbol.for('react.provider'),
  mu = Symbol.for('react.context'),
  ST = Symbol.for('react.server_context'),
  gu = Symbol.for('react.forward_ref'),
  bu = Symbol.for('react.suspense'),
  xu = Symbol.for('react.suspense_list'),
  wu = Symbol.for('react.memo'),
  Ou = Symbol.for('react.lazy'),
  AT = Symbol.for('react.offscreen'),
  x1
x1 = Symbol.for('react.module.reference')
function Rt(e) {
  if (typeof e == 'object' && e !== null) {
    var t = e.$$typeof
    switch (t) {
      case Nh:
        switch (((e = e.type), e)) {
          case hu:
          case vu:
          case pu:
          case bu:
          case xu:
            return e
          default:
            switch (((e = e && e.$$typeof), e)) {
              case ST:
              case mu:
              case gu:
              case Ou:
              case wu:
              case yu:
                return e
              default:
                return t
            }
        }
      case Ih:
        return t
    }
  }
}
ge.ContextConsumer = mu
ge.ContextProvider = yu
ge.Element = Nh
ge.ForwardRef = gu
ge.Fragment = hu
ge.Lazy = Ou
ge.Memo = wu
ge.Portal = Ih
ge.Profiler = vu
ge.StrictMode = pu
ge.Suspense = bu
ge.SuspenseList = xu
ge.isAsyncMode = function () {
  return !1
}
ge.isConcurrentMode = function () {
  return !1
}
ge.isContextConsumer = function (e) {
  return Rt(e) === mu
}
ge.isContextProvider = function (e) {
  return Rt(e) === yu
}
ge.isElement = function (e) {
  return typeof e == 'object' && e !== null && e.$$typeof === Nh
}
ge.isForwardRef = function (e) {
  return Rt(e) === gu
}
ge.isFragment = function (e) {
  return Rt(e) === hu
}
ge.isLazy = function (e) {
  return Rt(e) === Ou
}
ge.isMemo = function (e) {
  return Rt(e) === wu
}
ge.isPortal = function (e) {
  return Rt(e) === Ih
}
ge.isProfiler = function (e) {
  return Rt(e) === vu
}
ge.isStrictMode = function (e) {
  return Rt(e) === pu
}
ge.isSuspense = function (e) {
  return Rt(e) === bu
}
ge.isSuspenseList = function (e) {
  return Rt(e) === xu
}
ge.isValidElementType = function (e) {
  return (
    typeof e == 'string' ||
    typeof e == 'function' ||
    e === hu ||
    e === vu ||
    e === pu ||
    e === bu ||
    e === xu ||
    e === AT ||
    (typeof e == 'object' &&
      e !== null &&
      (e.$$typeof === Ou ||
        e.$$typeof === wu ||
        e.$$typeof === yu ||
        e.$$typeof === mu ||
        e.$$typeof === gu ||
        e.$$typeof === x1 ||
        e.getModuleId !== void 0))
  )
}
ge.typeOf = Rt
b1.exports = ge
var w1 = b1.exports,
  PT = Ir,
  $T = Rr,
  ET = '[object Number]'
function _T(e) {
  return typeof e == 'number' || ($T(e) && PT(e) == ET)
}
var O1 = _T
const CT = me(O1)
var jT = O1
function TT(e) {
  return jT(e) && e != +e
}
var kT = TT
const Jo = me(kT)
var at = function (t) {
    return t === 0 ? 0 : t > 0 ? 1 : -1
  },
  bn = function (t) {
    return Zo(t) && t.indexOf('%') === t.length - 1
  },
  U = function (t) {
    return CT(t) && !Jo(t)
  },
  We = function (t) {
    return U(t) || Zo(t)
  },
  MT = 0,
  ma = function (t) {
    var r = ++MT
    return ''.concat(t || '').concat(r)
  },
  ot = function (t, r) {
    var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0,
      i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1
    if (!U(t) && !Zo(t)) return n
    var a
    if (bn(t)) {
      var o = t.indexOf('%')
      a = (r * parseFloat(t.slice(0, o))) / 100
    } else a = +t
    return Jo(a) && (a = n), i && a > r && (a = r), a
  },
  Wr = function (t) {
    if (!t) return null
    var r = Object.keys(t)
    return r && r.length ? t[r[0]] : null
  },
  NT = function (t) {
    if (!Array.isArray(t)) return !1
    for (var r = t.length, n = {}, i = 0; i < r; i++)
      if (!n[t[i]]) n[t[i]] = !0
      else return !0
    return !1
  },
  gt = function (t, r) {
    return U(t) && U(r)
      ? function (n) {
          return t + n * (r - t)
        }
      : function () {
          return r
        }
  }
function Vs(e, t, r) {
  return !e || !e.length
    ? null
    : e.find(function (n) {
        return n && (typeof t == 'function' ? t(n) : xt(n, t)) === r
      })
}
function fi(e, t) {
  for (var r in e)
    if (
      {}.hasOwnProperty.call(e, r) &&
      (!{}.hasOwnProperty.call(t, r) || e[r] !== t[r])
    )
      return !1
  for (var n in t)
    if ({}.hasOwnProperty.call(t, n) && !{}.hasOwnProperty.call(e, n)) return !1
  return !0
}
function mf(e) {
  '@babel/helpers - typeof'
  return (
    (mf =
      typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
        ? function (t) {
            return typeof t
          }
        : function (t) {
            return t &&
              typeof Symbol == 'function' &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? 'symbol'
              : typeof t
          }),
    mf(e)
  )
}
var IT = ['viewBox', 'children'],
  RT = [
    'aria-activedescendant',
    'aria-atomic',
    'aria-autocomplete',
    'aria-busy',
    'aria-checked',
    'aria-colcount',
    'aria-colindex',
    'aria-colspan',
    'aria-controls',
    'aria-current',
    'aria-describedby',
    'aria-details',
    'aria-disabled',
    'aria-errormessage',
    'aria-expanded',
    'aria-flowto',
    'aria-haspopup',
    'aria-hidden',
    'aria-invalid',
    'aria-keyshortcuts',
    'aria-label',
    'aria-labelledby',
    'aria-level',
    'aria-live',
    'aria-modal',
    'aria-multiline',
    'aria-multiselectable',
    'aria-orientation',
    'aria-owns',
    'aria-placeholder',
    'aria-posinset',
    'aria-pressed',
    'aria-readonly',
    'aria-relevant',
    'aria-required',
    'aria-roledescription',
    'aria-rowcount',
    'aria-rowindex',
    'aria-rowspan',
    'aria-selected',
    'aria-setsize',
    'aria-sort',
    'aria-valuemax',
    'aria-valuemin',
    'aria-valuenow',
    'aria-valuetext',
    'className',
    'color',
    'height',
    'id',
    'lang',
    'max',
    'media',
    'method',
    'min',
    'name',
    'style',
    'target',
    'width',
    'role',
    'tabIndex',
    'accentHeight',
    'accumulate',
    'additive',
    'alignmentBaseline',
    'allowReorder',
    'alphabetic',
    'amplitude',
    'arabicForm',
    'ascent',
    'attributeName',
    'attributeType',
    'autoReverse',
    'azimuth',
    'baseFrequency',
    'baselineShift',
    'baseProfile',
    'bbox',
    'begin',
    'bias',
    'by',
    'calcMode',
    'capHeight',
    'clip',
    'clipPath',
    'clipPathUnits',
    'clipRule',
    'colorInterpolation',
    'colorInterpolationFilters',
    'colorProfile',
    'colorRendering',
    'contentScriptType',
    'contentStyleType',
    'cursor',
    'cx',
    'cy',
    'd',
    'decelerate',
    'descent',
    'diffuseConstant',
    'direction',
    'display',
    'divisor',
    'dominantBaseline',
    'dur',
    'dx',
    'dy',
    'edgeMode',
    'elevation',
    'enableBackground',
    'end',
    'exponent',
    'externalResourcesRequired',
    'fill',
    'fillOpacity',
    'fillRule',
    'filter',
    'filterRes',
    'filterUnits',
    'floodColor',
    'floodOpacity',
    'focusable',
    'fontFamily',
    'fontSize',
    'fontSizeAdjust',
    'fontStretch',
    'fontStyle',
    'fontVariant',
    'fontWeight',
    'format',
    'from',
    'fx',
    'fy',
    'g1',
    'g2',
    'glyphName',
    'glyphOrientationHorizontal',
    'glyphOrientationVertical',
    'glyphRef',
    'gradientTransform',
    'gradientUnits',
    'hanging',
    'horizAdvX',
    'horizOriginX',
    'href',
    'ideographic',
    'imageRendering',
    'in2',
    'in',
    'intercept',
    'k1',
    'k2',
    'k3',
    'k4',
    'k',
    'kernelMatrix',
    'kernelUnitLength',
    'kerning',
    'keyPoints',
    'keySplines',
    'keyTimes',
    'lengthAdjust',
    'letterSpacing',
    'lightingColor',
    'limitingConeAngle',
    'local',
    'markerEnd',
    'markerHeight',
    'markerMid',
    'markerStart',
    'markerUnits',
    'markerWidth',
    'mask',
    'maskContentUnits',
    'maskUnits',
    'mathematical',
    'mode',
    'numOctaves',
    'offset',
    'opacity',
    'operator',
    'order',
    'orient',
    'orientation',
    'origin',
    'overflow',
    'overlinePosition',
    'overlineThickness',
    'paintOrder',
    'panose1',
    'pathLength',
    'patternContentUnits',
    'patternTransform',
    'patternUnits',
    'pointerEvents',
    'pointsAtX',
    'pointsAtY',
    'pointsAtZ',
    'preserveAlpha',
    'preserveAspectRatio',
    'primitiveUnits',
    'r',
    'radius',
    'refX',
    'refY',
    'renderingIntent',
    'repeatCount',
    'repeatDur',
    'requiredExtensions',
    'requiredFeatures',
    'restart',
    'result',
    'rotate',
    'rx',
    'ry',
    'seed',
    'shapeRendering',
    'slope',
    'spacing',
    'specularConstant',
    'specularExponent',
    'speed',
    'spreadMethod',
    'startOffset',
    'stdDeviation',
    'stemh',
    'stemv',
    'stitchTiles',
    'stopColor',
    'stopOpacity',
    'strikethroughPosition',
    'strikethroughThickness',
    'string',
    'stroke',
    'strokeDasharray',
    'strokeDashoffset',
    'strokeLinecap',
    'strokeLinejoin',
    'strokeMiterlimit',
    'strokeOpacity',
    'strokeWidth',
    'surfaceScale',
    'systemLanguage',
    'tableValues',
    'targetX',
    'targetY',
    'textAnchor',
    'textDecoration',
    'textLength',
    'textRendering',
    'to',
    'transform',
    'u1',
    'u2',
    'underlinePosition',
    'underlineThickness',
    'unicode',
    'unicodeBidi',
    'unicodeRange',
    'unitsPerEm',
    'vAlphabetic',
    'values',
    'vectorEffect',
    'version',
    'vertAdvY',
    'vertOriginX',
    'vertOriginY',
    'vHanging',
    'vIdeographic',
    'viewTarget',
    'visibility',
    'vMathematical',
    'widths',
    'wordSpacing',
    'writingMode',
    'x1',
    'x2',
    'x',
    'xChannelSelector',
    'xHeight',
    'xlinkActuate',
    'xlinkArcrole',
    'xlinkHref',
    'xlinkRole',
    'xlinkShow',
    'xlinkTitle',
    'xlinkType',
    'xmlBase',
    'xmlLang',
    'xmlns',
    'xmlnsXlink',
    'xmlSpace',
    'y1',
    'y2',
    'y',
    'yChannelSelector',
    'z',
    'zoomAndPan',
    'ref',
    'key',
    'angle',
  ],
  Wv = ['points', 'pathLength'],
  hl = { svg: IT, polygon: Wv, polyline: Wv },
  Rh = [
    'dangerouslySetInnerHTML',
    'onCopy',
    'onCopyCapture',
    'onCut',
    'onCutCapture',
    'onPaste',
    'onPasteCapture',
    'onCompositionEnd',
    'onCompositionEndCapture',
    'onCompositionStart',
    'onCompositionStartCapture',
    'onCompositionUpdate',
    'onCompositionUpdateCapture',
    'onFocus',
    'onFocusCapture',
    'onBlur',
    'onBlurCapture',
    'onChange',
    'onChangeCapture',
    'onBeforeInput',
    'onBeforeInputCapture',
    'onInput',
    'onInputCapture',
    'onReset',
    'onResetCapture',
    'onSubmit',
    'onSubmitCapture',
    'onInvalid',
    'onInvalidCapture',
    'onLoad',
    'onLoadCapture',
    'onError',
    'onErrorCapture',
    'onKeyDown',
    'onKeyDownCapture',
    'onKeyPress',
    'onKeyPressCapture',
    'onKeyUp',
    'onKeyUpCapture',
    'onAbort',
    'onAbortCapture',
    'onCanPlay',
    'onCanPlayCapture',
    'onCanPlayThrough',
    'onCanPlayThroughCapture',
    'onDurationChange',
    'onDurationChangeCapture',
    'onEmptied',
    'onEmptiedCapture',
    'onEncrypted',
    'onEncryptedCapture',
    'onEnded',
    'onEndedCapture',
    'onLoadedData',
    'onLoadedDataCapture',
    'onLoadedMetadata',
    'onLoadedMetadataCapture',
    'onLoadStart',
    'onLoadStartCapture',
    'onPause',
    'onPauseCapture',
    'onPlay',
    'onPlayCapture',
    'onPlaying',
    'onPlayingCapture',
    'onProgress',
    'onProgressCapture',
    'onRateChange',
    'onRateChangeCapture',
    'onSeeked',
    'onSeekedCapture',
    'onSeeking',
    'onSeekingCapture',
    'onStalled',
    'onStalledCapture',
    'onSuspend',
    'onSuspendCapture',
    'onTimeUpdate',
    'onTimeUpdateCapture',
    'onVolumeChange',
    'onVolumeChangeCapture',
    'onWaiting',
    'onWaitingCapture',
    'onAuxClick',
    'onAuxClickCapture',
    'onClick',
    'onClickCapture',
    'onContextMenu',
    'onContextMenuCapture',
    'onDoubleClick',
    'onDoubleClickCapture',
    'onDrag',
    'onDragCapture',
    'onDragEnd',
    'onDragEndCapture',
    'onDragEnter',
    'onDragEnterCapture',
    'onDragExit',
    'onDragExitCapture',
    'onDragLeave',
    'onDragLeaveCapture',
    'onDragOver',
    'onDragOverCapture',
    'onDragStart',
    'onDragStartCapture',
    'onDrop',
    'onDropCapture',
    'onMouseDown',
    'onMouseDownCapture',
    'onMouseEnter',
    'onMouseLeave',
    'onMouseMove',
    'onMouseMoveCapture',
    'onMouseOut',
    'onMouseOutCapture',
    'onMouseOver',
    'onMouseOverCapture',
    'onMouseUp',
    'onMouseUpCapture',
    'onSelect',
    'onSelectCapture',
    'onTouchCancel',
    'onTouchCancelCapture',
    'onTouchEnd',
    'onTouchEndCapture',
    'onTouchMove',
    'onTouchMoveCapture',
    'onTouchStart',
    'onTouchStartCapture',
    'onPointerDown',
    'onPointerDownCapture',
    'onPointerMove',
    'onPointerMoveCapture',
    'onPointerUp',
    'onPointerUpCapture',
    'onPointerCancel',
    'onPointerCancelCapture',
    'onPointerEnter',
    'onPointerEnterCapture',
    'onPointerLeave',
    'onPointerLeaveCapture',
    'onPointerOver',
    'onPointerOverCapture',
    'onPointerOut',
    'onPointerOutCapture',
    'onGotPointerCapture',
    'onGotPointerCaptureCapture',
    'onLostPointerCapture',
    'onLostPointerCaptureCapture',
    'onScroll',
    'onScrollCapture',
    'onWheel',
    'onWheelCapture',
    'onAnimationStart',
    'onAnimationStartCapture',
    'onAnimationEnd',
    'onAnimationEndCapture',
    'onAnimationIteration',
    'onAnimationIterationCapture',
    'onTransitionEnd',
    'onTransitionEndCapture',
  ],
  Xs = function (t, r) {
    if (!t || typeof t == 'function' || typeof t == 'boolean') return null
    var n = t
    if ((A.isValidElement(t) && (n = t.props), !ha(n))) return null
    var i = {}
    return (
      Object.keys(n).forEach(function (a) {
        Rh.includes(a) &&
          (i[a] =
            r ||
            function (o) {
              return n[a](n, o)
            })
      }),
      i
    )
  },
  DT = function (t, r, n) {
    return function (i) {
      return t(r, n, i), null
    }
  },
  Ln = function (t, r, n) {
    if (!ha(t) || mf(t) !== 'object') return null
    var i = null
    return (
      Object.keys(t).forEach(function (a) {
        var o = t[a]
        Rh.includes(a) &&
          typeof o == 'function' &&
          (i || (i = {}), (i[a] = DT(o, r, n)))
      }),
      i
    )
  },
  LT = ['children'],
  BT = ['children']
function qv(e, t) {
  if (e == null) return {}
  var r = FT(e, t),
    n,
    i
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e)
    for (i = 0; i < a.length; i++)
      (n = a[i]),
        !(t.indexOf(n) >= 0) &&
          Object.prototype.propertyIsEnumerable.call(e, n) &&
          (r[n] = e[n])
  }
  return r
}
function FT(e, t) {
  if (e == null) return {}
  var r = {}
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue
      r[n] = e[n]
    }
  return r
}
function gf(e) {
  '@babel/helpers - typeof'
  return (
    (gf =
      typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
        ? function (t) {
            return typeof t
          }
        : function (t) {
            return t &&
              typeof Symbol == 'function' &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? 'symbol'
              : typeof t
          }),
    gf(e)
  )
}
var Hv = {
    click: 'onClick',
    mousedown: 'onMouseDown',
    mouseup: 'onMouseUp',
    mouseover: 'onMouseOver',
    mousemove: 'onMouseMove',
    mouseout: 'onMouseOut',
    mouseenter: 'onMouseEnter',
    mouseleave: 'onMouseLeave',
    touchcancel: 'onTouchCancel',
    touchend: 'onTouchEnd',
    touchmove: 'onTouchMove',
    touchstart: 'onTouchStart',
  },
  Or = function (t) {
    return typeof t == 'string'
      ? t
      : t
        ? t.displayName || t.name || 'Component'
        : ''
  },
  zv = null,
  pl = null,
  Dh = function e(t) {
    if (t === zv && Array.isArray(pl)) return pl
    var r = []
    return (
      A.Children.forEach(t, function (n) {
        se(n) ||
          (w1.isFragment(n) ? (r = r.concat(e(n.props.children))) : r.push(n))
      }),
      (pl = r),
      (zv = t),
      r
    )
  }
function wt(e, t) {
  var r = [],
    n = []
  return (
    Array.isArray(t)
      ? (n = t.map(function (i) {
          return Or(i)
        }))
      : (n = [Or(t)]),
    Dh(e).forEach(function (i) {
      var a = xt(i, 'type.displayName') || xt(i, 'type.name')
      n.indexOf(a) !== -1 && r.push(i)
    }),
    r
  )
}
function mt(e, t) {
  var r = wt(e, t)
  return r && r[0]
}
var Kv = function (t) {
    if (!t || !t.props) return !1
    var r = t.props,
      n = r.width,
      i = r.height
    return !(!U(n) || n <= 0 || !U(i) || i <= 0)
  },
  UT = [
    'a',
    'altGlyph',
    'altGlyphDef',
    'altGlyphItem',
    'animate',
    'animateColor',
    'animateMotion',
    'animateTransform',
    'circle',
    'clipPath',
    'color-profile',
    'cursor',
    'defs',
    'desc',
    'ellipse',
    'feBlend',
    'feColormatrix',
    'feComponentTransfer',
    'feComposite',
    'feConvolveMatrix',
    'feDiffuseLighting',
    'feDisplacementMap',
    'feDistantLight',
    'feFlood',
    'feFuncA',
    'feFuncB',
    'feFuncG',
    'feFuncR',
    'feGaussianBlur',
    'feImage',
    'feMerge',
    'feMergeNode',
    'feMorphology',
    'feOffset',
    'fePointLight',
    'feSpecularLighting',
    'feSpotLight',
    'feTile',
    'feTurbulence',
    'filter',
    'font',
    'font-face',
    'font-face-format',
    'font-face-name',
    'font-face-url',
    'foreignObject',
    'g',
    'glyph',
    'glyphRef',
    'hkern',
    'image',
    'line',
    'lineGradient',
    'marker',
    'mask',
    'metadata',
    'missing-glyph',
    'mpath',
    'path',
    'pattern',
    'polygon',
    'polyline',
    'radialGradient',
    'rect',
    'script',
    'set',
    'stop',
    'style',
    'svg',
    'switch',
    'symbol',
    'text',
    'textPath',
    'title',
    'tref',
    'tspan',
    'use',
    'view',
    'vkern',
  ],
  WT = function (t) {
    return t && t.type && Zo(t.type) && UT.indexOf(t.type) >= 0
  },
  qT = function (t) {
    return t && gf(t) === 'object' && 'clipDot' in t
  },
  HT = function (t, r, n, i) {
    var a,
      o = (a = hl == null ? void 0 : hl[i]) !== null && a !== void 0 ? a : []
    return (
      (!ie(t) && ((i && o.includes(r)) || RT.includes(r))) ||
      (n && Rh.includes(r))
    )
  },
  J = function (t, r, n) {
    if (!t || typeof t == 'function' || typeof t == 'boolean') return null
    var i = t
    if ((A.isValidElement(t) && (i = t.props), !ha(i))) return null
    var a = {}
    return (
      Object.keys(i).forEach(function (o) {
        var s
        HT((s = i) === null || s === void 0 ? void 0 : s[o], o, r, n) &&
          (a[o] = i[o])
      }),
      a
    )
  },
  bf = function e(t, r) {
    if (t === r) return !0
    var n = A.Children.count(t)
    if (n !== A.Children.count(r)) return !1
    if (n === 0) return !0
    if (n === 1)
      return Gv(Array.isArray(t) ? t[0] : t, Array.isArray(r) ? r[0] : r)
    for (var i = 0; i < n; i++) {
      var a = t[i],
        o = r[i]
      if (Array.isArray(a) || Array.isArray(o)) {
        if (!e(a, o)) return !1
      } else if (!Gv(a, o)) return !1
    }
    return !0
  },
  Gv = function (t, r) {
    if (se(t) && se(r)) return !0
    if (!se(t) && !se(r)) {
      var n = t.props || {},
        i = n.children,
        a = qv(n, LT),
        o = r.props || {},
        s = o.children,
        c = qv(o, BT)
      return i && s ? fi(a, c) && bf(i, s) : !i && !s ? fi(a, c) : !1
    }
    return !1
  },
  Vv = function (t, r) {
    var n = [],
      i = {}
    return (
      Dh(t).forEach(function (a, o) {
        if (WT(a)) n.push(a)
        else if (a) {
          var s = Or(a.type),
            c = r[s] || {},
            u = c.handler,
            l = c.once
          if (u && (!l || !i[s])) {
            var f = u(a, s, o)
            n.push(f), (i[s] = !0)
          }
        }
      }),
      n
    )
  },
  zT = function (t) {
    var r = t && t.type
    return r && Hv[r] ? Hv[r] : null
  },
  KT = function (t, r) {
    return Dh(r).indexOf(t)
  },
  GT = [
    'children',
    'width',
    'height',
    'viewBox',
    'className',
    'style',
    'title',
    'desc',
  ]
function xf() {
  return (
    (xf = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t]
            for (var n in r)
              Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
          }
          return e
        }),
    xf.apply(this, arguments)
  )
}
function VT(e, t) {
  if (e == null) return {}
  var r = XT(e, t),
    n,
    i
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e)
    for (i = 0; i < a.length; i++)
      (n = a[i]),
        !(t.indexOf(n) >= 0) &&
          Object.prototype.propertyIsEnumerable.call(e, n) &&
          (r[n] = e[n])
  }
  return r
}
function XT(e, t) {
  if (e == null) return {}
  var r = {}
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue
      r[n] = e[n]
    }
  return r
}
function wf(e) {
  var t = e.children,
    r = e.width,
    n = e.height,
    i = e.viewBox,
    a = e.className,
    o = e.style,
    s = e.title,
    c = e.desc,
    u = VT(e, GT),
    l = i || { width: r, height: n, x: 0, y: 0 },
    f = ue('recharts-surface', a)
  return E.createElement(
    'svg',
    xf({}, J(u, !0, 'svg'), {
      className: f,
      width: r,
      height: n,
      style: o,
      viewBox: ''
        .concat(l.x, ' ')
        .concat(l.y, ' ')
        .concat(l.width, ' ')
        .concat(l.height),
    }),
    E.createElement('title', null, s),
    E.createElement('desc', null, c),
    t,
  )
}
var YT = ['children', 'className']
function Of() {
  return (
    (Of = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t]
            for (var n in r)
              Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
          }
          return e
        }),
    Of.apply(this, arguments)
  )
}
function QT(e, t) {
  if (e == null) return {}
  var r = ZT(e, t),
    n,
    i
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e)
    for (i = 0; i < a.length; i++)
      (n = a[i]),
        !(t.indexOf(n) >= 0) &&
          Object.prototype.propertyIsEnumerable.call(e, n) &&
          (r[n] = e[n])
  }
  return r
}
function ZT(e, t) {
  if (e == null) return {}
  var r = {}
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue
      r[n] = e[n]
    }
  return r
}
var pe = E.forwardRef(function (e, t) {
    var r = e.children,
      n = e.className,
      i = QT(e, YT),
      a = ue('recharts-layer', n)
    return E.createElement('g', Of({ className: a }, J(i, !0), { ref: t }), r)
  }),
  Gt = function (t, r) {
    for (
      var n = arguments.length, i = new Array(n > 2 ? n - 2 : 0), a = 2;
      a < n;
      a++
    )
      i[a - 2] = arguments[a]
  }
function JT(e, t, r) {
  var n = -1,
    i = e.length
  t < 0 && (t = -t > i ? 0 : i + t),
    (r = r > i ? i : r),
    r < 0 && (r += i),
    (i = t > r ? 0 : (r - t) >>> 0),
    (t >>>= 0)
  for (var a = Array(i); ++n < i; ) a[n] = e[n + t]
  return a
}
var ek = JT,
  tk = ek
function rk(e, t, r) {
  var n = e.length
  return (r = r === void 0 ? n : r), !t && r >= n ? e : tk(e, t, r)
}
var nk = rk,
  ik = '\\ud800-\\udfff',
  ak = '\\u0300-\\u036f',
  ok = '\\ufe20-\\ufe2f',
  sk = '\\u20d0-\\u20ff',
  ck = ak + ok + sk,
  uk = '\\ufe0e\\ufe0f',
  lk = '\\u200d',
  fk = RegExp('[' + lk + ik + ck + uk + ']')
function dk(e) {
  return fk.test(e)
}
var S1 = dk
function hk(e) {
  return e.split('')
}
var pk = hk,
  A1 = '\\ud800-\\udfff',
  vk = '\\u0300-\\u036f',
  yk = '\\ufe20-\\ufe2f',
  mk = '\\u20d0-\\u20ff',
  gk = vk + yk + mk,
  bk = '\\ufe0e\\ufe0f',
  xk = '[' + A1 + ']',
  Sf = '[' + gk + ']',
  Af = '\\ud83c[\\udffb-\\udfff]',
  wk = '(?:' + Sf + '|' + Af + ')',
  P1 = '[^' + A1 + ']',
  $1 = '(?:\\ud83c[\\udde6-\\uddff]){2}',
  E1 = '[\\ud800-\\udbff][\\udc00-\\udfff]',
  Ok = '\\u200d',
  _1 = wk + '?',
  C1 = '[' + bk + ']?',
  Sk = '(?:' + Ok + '(?:' + [P1, $1, E1].join('|') + ')' + C1 + _1 + ')*',
  Ak = C1 + _1 + Sk,
  Pk = '(?:' + [P1 + Sf + '?', Sf, $1, E1, xk].join('|') + ')',
  $k = RegExp(Af + '(?=' + Af + ')|' + Pk + Ak, 'g')
function Ek(e) {
  return e.match($k) || []
}
var _k = Ek,
  Ck = pk,
  jk = S1,
  Tk = _k
function kk(e) {
  return jk(e) ? Tk(e) : Ck(e)
}
var Mk = kk,
  Nk = nk,
  Ik = S1,
  Rk = Mk,
  Dk = y1
function Lk(e) {
  return function (t) {
    t = Dk(t)
    var r = Ik(t) ? Rk(t) : void 0,
      n = r ? r[0] : t.charAt(0),
      i = r ? Nk(r, 1).join('') : t.slice(1)
    return n[e]() + i
  }
}
var Bk = Lk,
  Fk = Bk,
  Uk = Fk('toUpperCase'),
  Wk = Uk
const Su = me(Wk)
function Ae(e) {
  return function () {
    return e
  }
}
const j1 = Math.cos,
  Ys = Math.sin,
  Vt = Math.sqrt,
  Qs = Math.PI,
  Au = 2 * Qs,
  Pf = Math.PI,
  $f = 2 * Pf,
  vn = 1e-6,
  qk = $f - vn
function T1(e) {
  this._ += e[0]
  for (let t = 1, r = e.length; t < r; ++t) this._ += arguments[t] + e[t]
}
function Hk(e) {
  let t = Math.floor(e)
  if (!(t >= 0)) throw new Error(`invalid digits: ${e}`)
  if (t > 15) return T1
  const r = 10 ** t
  return function (n) {
    this._ += n[0]
    for (let i = 1, a = n.length; i < a; ++i)
      this._ += Math.round(arguments[i] * r) / r + n[i]
  }
}
class zk {
  constructor(t) {
    ;(this._x0 = this._y0 = this._x1 = this._y1 = null),
      (this._ = ''),
      (this._append = t == null ? T1 : Hk(t))
  }
  moveTo(t, r) {
    this._append`M${(this._x0 = this._x1 = +t)},${(this._y0 = this._y1 = +r)}`
  }
  closePath() {
    this._x1 !== null &&
      ((this._x1 = this._x0), (this._y1 = this._y0), this._append`Z`)
  }
  lineTo(t, r) {
    this._append`L${(this._x1 = +t)},${(this._y1 = +r)}`
  }
  quadraticCurveTo(t, r, n, i) {
    this._append`Q${+t},${+r},${(this._x1 = +n)},${(this._y1 = +i)}`
  }
  bezierCurveTo(t, r, n, i, a, o) {
    this._append`C${+t},${+r},${+n},${+i},${(this._x1 = +a)},${(this._y1 = +o)}`
  }
  arcTo(t, r, n, i, a) {
    if (((t = +t), (r = +r), (n = +n), (i = +i), (a = +a), a < 0))
      throw new Error(`negative radius: ${a}`)
    let o = this._x1,
      s = this._y1,
      c = n - t,
      u = i - r,
      l = o - t,
      f = s - r,
      d = l * l + f * f
    if (this._x1 === null) this._append`M${(this._x1 = t)},${(this._y1 = r)}`
    else if (d > vn)
      if (!(Math.abs(f * c - u * l) > vn) || !a)
        this._append`L${(this._x1 = t)},${(this._y1 = r)}`
      else {
        let h = n - o,
          y = i - s,
          v = c * c + u * u,
          p = h * h + y * y,
          x = Math.sqrt(v),
          b = Math.sqrt(d),
          w = a * Math.tan((Pf - Math.acos((v + d - p) / (2 * x * b))) / 2),
          g = w / b,
          m = w / x
        Math.abs(g - 1) > vn && this._append`L${t + g * l},${r + g * f}`,
          this
            ._append`A${a},${a},0,0,${+(f * h > l * y)},${(this._x1 = t + m * c)},${(this._y1 = r + m * u)}`
      }
  }
  arc(t, r, n, i, a, o) {
    if (((t = +t), (r = +r), (n = +n), (o = !!o), n < 0))
      throw new Error(`negative radius: ${n}`)
    let s = n * Math.cos(i),
      c = n * Math.sin(i),
      u = t + s,
      l = r + c,
      f = 1 ^ o,
      d = o ? i - a : a - i
    this._x1 === null
      ? this._append`M${u},${l}`
      : (Math.abs(this._x1 - u) > vn || Math.abs(this._y1 - l) > vn) &&
        this._append`L${u},${l}`,
      n &&
        (d < 0 && (d = (d % $f) + $f),
        d > qk
          ? this
              ._append`A${n},${n},0,1,${f},${t - s},${r - c}A${n},${n},0,1,${f},${(this._x1 = u)},${(this._y1 = l)}`
          : d > vn &&
            this
              ._append`A${n},${n},0,${+(d >= Pf)},${f},${(this._x1 = t + n * Math.cos(a))},${(this._y1 = r + n * Math.sin(a))}`)
  }
  rect(t, r, n, i) {
    this
      ._append`M${(this._x0 = this._x1 = +t)},${(this._y0 = this._y1 = +r)}h${(n = +n)}v${+i}h${-n}Z`
  }
  toString() {
    return this._
  }
}
function Lh(e) {
  let t = 3
  return (
    (e.digits = function (r) {
      if (!arguments.length) return t
      if (r == null) t = null
      else {
        const n = Math.floor(r)
        if (!(n >= 0)) throw new RangeError(`invalid digits: ${r}`)
        t = n
      }
      return e
    }),
    () => new zk(t)
  )
}
function Bh(e) {
  return typeof e == 'object' && 'length' in e ? e : Array.from(e)
}
function k1(e) {
  this._context = e
}
k1.prototype = {
  areaStart: function () {
    this._line = 0
  },
  areaEnd: function () {
    this._line = NaN
  },
  lineStart: function () {
    this._point = 0
  },
  lineEnd: function () {
    ;(this._line || (this._line !== 0 && this._point === 1)) &&
      this._context.closePath(),
      (this._line = 1 - this._line)
  },
  point: function (e, t) {
    switch (((e = +e), (t = +t), this._point)) {
      case 0:
        ;(this._point = 1),
          this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t)
        break
      case 1:
        this._point = 2
      default:
        this._context.lineTo(e, t)
        break
    }
  },
}
function Pu(e) {
  return new k1(e)
}
function M1(e) {
  return e[0]
}
function N1(e) {
  return e[1]
}
function I1(e, t) {
  var r = Ae(!0),
    n = null,
    i = Pu,
    a = null,
    o = Lh(s)
  ;(e = typeof e == 'function' ? e : e === void 0 ? M1 : Ae(e)),
    (t = typeof t == 'function' ? t : t === void 0 ? N1 : Ae(t))
  function s(c) {
    var u,
      l = (c = Bh(c)).length,
      f,
      d = !1,
      h
    for (n == null && (a = i((h = o()))), u = 0; u <= l; ++u)
      !(u < l && r((f = c[u]), u, c)) === d &&
        ((d = !d) ? a.lineStart() : a.lineEnd()),
        d && a.point(+e(f, u, c), +t(f, u, c))
    if (h) return (a = null), h + '' || null
  }
  return (
    (s.x = function (c) {
      return arguments.length
        ? ((e = typeof c == 'function' ? c : Ae(+c)), s)
        : e
    }),
    (s.y = function (c) {
      return arguments.length
        ? ((t = typeof c == 'function' ? c : Ae(+c)), s)
        : t
    }),
    (s.defined = function (c) {
      return arguments.length
        ? ((r = typeof c == 'function' ? c : Ae(!!c)), s)
        : r
    }),
    (s.curve = function (c) {
      return arguments.length ? ((i = c), n != null && (a = i(n)), s) : i
    }),
    (s.context = function (c) {
      return arguments.length
        ? (c == null ? (n = a = null) : (a = i((n = c))), s)
        : n
    }),
    s
  )
}
function ms(e, t, r) {
  var n = null,
    i = Ae(!0),
    a = null,
    o = Pu,
    s = null,
    c = Lh(u)
  ;(e = typeof e == 'function' ? e : e === void 0 ? M1 : Ae(+e)),
    (t = typeof t == 'function' ? t : Ae(t === void 0 ? 0 : +t)),
    (r = typeof r == 'function' ? r : r === void 0 ? N1 : Ae(+r))
  function u(f) {
    var d,
      h,
      y,
      v = (f = Bh(f)).length,
      p,
      x = !1,
      b,
      w = new Array(v),
      g = new Array(v)
    for (a == null && (s = o((b = c()))), d = 0; d <= v; ++d) {
      if (!(d < v && i((p = f[d]), d, f)) === x)
        if ((x = !x)) (h = d), s.areaStart(), s.lineStart()
        else {
          for (s.lineEnd(), s.lineStart(), y = d - 1; y >= h; --y)
            s.point(w[y], g[y])
          s.lineEnd(), s.areaEnd()
        }
      x &&
        ((w[d] = +e(p, d, f)),
        (g[d] = +t(p, d, f)),
        s.point(n ? +n(p, d, f) : w[d], r ? +r(p, d, f) : g[d]))
    }
    if (b) return (s = null), b + '' || null
  }
  function l() {
    return I1().defined(i).curve(o).context(a)
  }
  return (
    (u.x = function (f) {
      return arguments.length
        ? ((e = typeof f == 'function' ? f : Ae(+f)), (n = null), u)
        : e
    }),
    (u.x0 = function (f) {
      return arguments.length
        ? ((e = typeof f == 'function' ? f : Ae(+f)), u)
        : e
    }),
    (u.x1 = function (f) {
      return arguments.length
        ? ((n = f == null ? null : typeof f == 'function' ? f : Ae(+f)), u)
        : n
    }),
    (u.y = function (f) {
      return arguments.length
        ? ((t = typeof f == 'function' ? f : Ae(+f)), (r = null), u)
        : t
    }),
    (u.y0 = function (f) {
      return arguments.length
        ? ((t = typeof f == 'function' ? f : Ae(+f)), u)
        : t
    }),
    (u.y1 = function (f) {
      return arguments.length
        ? ((r = f == null ? null : typeof f == 'function' ? f : Ae(+f)), u)
        : r
    }),
    (u.lineX0 = u.lineY0 =
      function () {
        return l().x(e).y(t)
      }),
    (u.lineY1 = function () {
      return l().x(e).y(r)
    }),
    (u.lineX1 = function () {
      return l().x(n).y(t)
    }),
    (u.defined = function (f) {
      return arguments.length
        ? ((i = typeof f == 'function' ? f : Ae(!!f)), u)
        : i
    }),
    (u.curve = function (f) {
      return arguments.length ? ((o = f), a != null && (s = o(a)), u) : o
    }),
    (u.context = function (f) {
      return arguments.length
        ? (f == null ? (a = s = null) : (s = o((a = f))), u)
        : a
    }),
    u
  )
}
class R1 {
  constructor(t, r) {
    ;(this._context = t), (this._x = r)
  }
  areaStart() {
    this._line = 0
  }
  areaEnd() {
    this._line = NaN
  }
  lineStart() {
    this._point = 0
  }
  lineEnd() {
    ;(this._line || (this._line !== 0 && this._point === 1)) &&
      this._context.closePath(),
      (this._line = 1 - this._line)
  }
  point(t, r) {
    switch (((t = +t), (r = +r), this._point)) {
      case 0: {
        ;(this._point = 1),
          this._line ? this._context.lineTo(t, r) : this._context.moveTo(t, r)
        break
      }
      case 1:
        this._point = 2
      default: {
        this._x
          ? this._context.bezierCurveTo(
              (this._x0 = (this._x0 + t) / 2),
              this._y0,
              this._x0,
              r,
              t,
              r,
            )
          : this._context.bezierCurveTo(
              this._x0,
              (this._y0 = (this._y0 + r) / 2),
              t,
              this._y0,
              t,
              r,
            )
        break
      }
    }
    ;(this._x0 = t), (this._y0 = r)
  }
}
function Kk(e) {
  return new R1(e, !0)
}
function Gk(e) {
  return new R1(e, !1)
}
const Fh = {
    draw(e, t) {
      const r = Vt(t / Qs)
      e.moveTo(r, 0), e.arc(0, 0, r, 0, Au)
    },
  },
  Vk = {
    draw(e, t) {
      const r = Vt(t / 5) / 2
      e.moveTo(-3 * r, -r),
        e.lineTo(-r, -r),
        e.lineTo(-r, -3 * r),
        e.lineTo(r, -3 * r),
        e.lineTo(r, -r),
        e.lineTo(3 * r, -r),
        e.lineTo(3 * r, r),
        e.lineTo(r, r),
        e.lineTo(r, 3 * r),
        e.lineTo(-r, 3 * r),
        e.lineTo(-r, r),
        e.lineTo(-3 * r, r),
        e.closePath()
    },
  },
  D1 = Vt(1 / 3),
  Xk = D1 * 2,
  Yk = {
    draw(e, t) {
      const r = Vt(t / Xk),
        n = r * D1
      e.moveTo(0, -r),
        e.lineTo(n, 0),
        e.lineTo(0, r),
        e.lineTo(-n, 0),
        e.closePath()
    },
  },
  Qk = {
    draw(e, t) {
      const r = Vt(t),
        n = -r / 2
      e.rect(n, n, r, r)
    },
  },
  Zk = 0.8908130915292852,
  L1 = Ys(Qs / 10) / Ys((7 * Qs) / 10),
  Jk = Ys(Au / 10) * L1,
  eM = -j1(Au / 10) * L1,
  tM = {
    draw(e, t) {
      const r = Vt(t * Zk),
        n = Jk * r,
        i = eM * r
      e.moveTo(0, -r), e.lineTo(n, i)
      for (let a = 1; a < 5; ++a) {
        const o = (Au * a) / 5,
          s = j1(o),
          c = Ys(o)
        e.lineTo(c * r, -s * r), e.lineTo(s * n - c * i, c * n + s * i)
      }
      e.closePath()
    },
  },
  vl = Vt(3),
  rM = {
    draw(e, t) {
      const r = -Vt(t / (vl * 3))
      e.moveTo(0, r * 2),
        e.lineTo(-vl * r, -r),
        e.lineTo(vl * r, -r),
        e.closePath()
    },
  },
  At = -0.5,
  Pt = Vt(3) / 2,
  Ef = 1 / Vt(12),
  nM = (Ef / 2 + 1) * 3,
  iM = {
    draw(e, t) {
      const r = Vt(t / nM),
        n = r / 2,
        i = r * Ef,
        a = n,
        o = r * Ef + r,
        s = -a,
        c = o
      e.moveTo(n, i),
        e.lineTo(a, o),
        e.lineTo(s, c),
        e.lineTo(At * n - Pt * i, Pt * n + At * i),
        e.lineTo(At * a - Pt * o, Pt * a + At * o),
        e.lineTo(At * s - Pt * c, Pt * s + At * c),
        e.lineTo(At * n + Pt * i, At * i - Pt * n),
        e.lineTo(At * a + Pt * o, At * o - Pt * a),
        e.lineTo(At * s + Pt * c, At * c - Pt * s),
        e.closePath()
    },
  }
function aM(e, t) {
  let r = null,
    n = Lh(i)
  ;(e = typeof e == 'function' ? e : Ae(e || Fh)),
    (t = typeof t == 'function' ? t : Ae(t === void 0 ? 64 : +t))
  function i() {
    let a
    if (
      (r || (r = a = n()),
      e.apply(this, arguments).draw(r, +t.apply(this, arguments)),
      a)
    )
      return (r = null), a + '' || null
  }
  return (
    (i.type = function (a) {
      return arguments.length
        ? ((e = typeof a == 'function' ? a : Ae(a)), i)
        : e
    }),
    (i.size = function (a) {
      return arguments.length
        ? ((t = typeof a == 'function' ? a : Ae(+a)), i)
        : t
    }),
    (i.context = function (a) {
      return arguments.length ? ((r = a ?? null), i) : r
    }),
    i
  )
}
function Zs() {}
function Js(e, t, r) {
  e._context.bezierCurveTo(
    (2 * e._x0 + e._x1) / 3,
    (2 * e._y0 + e._y1) / 3,
    (e._x0 + 2 * e._x1) / 3,
    (e._y0 + 2 * e._y1) / 3,
    (e._x0 + 4 * e._x1 + t) / 6,
    (e._y0 + 4 * e._y1 + r) / 6,
  )
}
function B1(e) {
  this._context = e
}
B1.prototype = {
  areaStart: function () {
    this._line = 0
  },
  areaEnd: function () {
    this._line = NaN
  },
  lineStart: function () {
    ;(this._x0 = this._x1 = this._y0 = this._y1 = NaN), (this._point = 0)
  },
  lineEnd: function () {
    switch (this._point) {
      case 3:
        Js(this, this._x1, this._y1)
      case 2:
        this._context.lineTo(this._x1, this._y1)
        break
    }
    ;(this._line || (this._line !== 0 && this._point === 1)) &&
      this._context.closePath(),
      (this._line = 1 - this._line)
  },
  point: function (e, t) {
    switch (((e = +e), (t = +t), this._point)) {
      case 0:
        ;(this._point = 1),
          this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t)
        break
      case 1:
        this._point = 2
        break
      case 2:
        ;(this._point = 3),
          this._context.lineTo(
            (5 * this._x0 + this._x1) / 6,
            (5 * this._y0 + this._y1) / 6,
          )
      default:
        Js(this, e, t)
        break
    }
    ;(this._x0 = this._x1),
      (this._x1 = e),
      (this._y0 = this._y1),
      (this._y1 = t)
  },
}
function oM(e) {
  return new B1(e)
}
function F1(e) {
  this._context = e
}
F1.prototype = {
  areaStart: Zs,
  areaEnd: Zs,
  lineStart: function () {
    ;(this._x0 =
      this._x1 =
      this._x2 =
      this._x3 =
      this._x4 =
      this._y0 =
      this._y1 =
      this._y2 =
      this._y3 =
      this._y4 =
        NaN),
      (this._point = 0)
  },
  lineEnd: function () {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x2, this._y2), this._context.closePath()
        break
      }
      case 2: {
        this._context.moveTo(
          (this._x2 + 2 * this._x3) / 3,
          (this._y2 + 2 * this._y3) / 3,
        ),
          this._context.lineTo(
            (this._x3 + 2 * this._x2) / 3,
            (this._y3 + 2 * this._y2) / 3,
          ),
          this._context.closePath()
        break
      }
      case 3: {
        this.point(this._x2, this._y2),
          this.point(this._x3, this._y3),
          this.point(this._x4, this._y4)
        break
      }
    }
  },
  point: function (e, t) {
    switch (((e = +e), (t = +t), this._point)) {
      case 0:
        ;(this._point = 1), (this._x2 = e), (this._y2 = t)
        break
      case 1:
        ;(this._point = 2), (this._x3 = e), (this._y3 = t)
        break
      case 2:
        ;(this._point = 3),
          (this._x4 = e),
          (this._y4 = t),
          this._context.moveTo(
            (this._x0 + 4 * this._x1 + e) / 6,
            (this._y0 + 4 * this._y1 + t) / 6,
          )
        break
      default:
        Js(this, e, t)
        break
    }
    ;(this._x0 = this._x1),
      (this._x1 = e),
      (this._y0 = this._y1),
      (this._y1 = t)
  },
}
function sM(e) {
  return new F1(e)
}
function U1(e) {
  this._context = e
}
U1.prototype = {
  areaStart: function () {
    this._line = 0
  },
  areaEnd: function () {
    this._line = NaN
  },
  lineStart: function () {
    ;(this._x0 = this._x1 = this._y0 = this._y1 = NaN), (this._point = 0)
  },
  lineEnd: function () {
    ;(this._line || (this._line !== 0 && this._point === 3)) &&
      this._context.closePath(),
      (this._line = 1 - this._line)
  },
  point: function (e, t) {
    switch (((e = +e), (t = +t), this._point)) {
      case 0:
        this._point = 1
        break
      case 1:
        this._point = 2
        break
      case 2:
        this._point = 3
        var r = (this._x0 + 4 * this._x1 + e) / 6,
          n = (this._y0 + 4 * this._y1 + t) / 6
        this._line ? this._context.lineTo(r, n) : this._context.moveTo(r, n)
        break
      case 3:
        this._point = 4
      default:
        Js(this, e, t)
        break
    }
    ;(this._x0 = this._x1),
      (this._x1 = e),
      (this._y0 = this._y1),
      (this._y1 = t)
  },
}
function cM(e) {
  return new U1(e)
}
function W1(e) {
  this._context = e
}
W1.prototype = {
  areaStart: Zs,
  areaEnd: Zs,
  lineStart: function () {
    this._point = 0
  },
  lineEnd: function () {
    this._point && this._context.closePath()
  },
  point: function (e, t) {
    ;(e = +e),
      (t = +t),
      this._point
        ? this._context.lineTo(e, t)
        : ((this._point = 1), this._context.moveTo(e, t))
  },
}
function uM(e) {
  return new W1(e)
}
function Xv(e) {
  return e < 0 ? -1 : 1
}
function Yv(e, t, r) {
  var n = e._x1 - e._x0,
    i = t - e._x1,
    a = (e._y1 - e._y0) / (n || (i < 0 && -0)),
    o = (r - e._y1) / (i || (n < 0 && -0)),
    s = (a * i + o * n) / (n + i)
  return (
    (Xv(a) + Xv(o)) * Math.min(Math.abs(a), Math.abs(o), 0.5 * Math.abs(s)) || 0
  )
}
function Qv(e, t) {
  var r = e._x1 - e._x0
  return r ? ((3 * (e._y1 - e._y0)) / r - t) / 2 : t
}
function yl(e, t, r) {
  var n = e._x0,
    i = e._y0,
    a = e._x1,
    o = e._y1,
    s = (a - n) / 3
  e._context.bezierCurveTo(n + s, i + s * t, a - s, o - s * r, a, o)
}
function ec(e) {
  this._context = e
}
ec.prototype = {
  areaStart: function () {
    this._line = 0
  },
  areaEnd: function () {
    this._line = NaN
  },
  lineStart: function () {
    ;(this._x0 = this._x1 = this._y0 = this._y1 = this._t0 = NaN),
      (this._point = 0)
  },
  lineEnd: function () {
    switch (this._point) {
      case 2:
        this._context.lineTo(this._x1, this._y1)
        break
      case 3:
        yl(this, this._t0, Qv(this, this._t0))
        break
    }
    ;(this._line || (this._line !== 0 && this._point === 1)) &&
      this._context.closePath(),
      (this._line = 1 - this._line)
  },
  point: function (e, t) {
    var r = NaN
    if (((e = +e), (t = +t), !(e === this._x1 && t === this._y1))) {
      switch (this._point) {
        case 0:
          ;(this._point = 1),
            this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t)
          break
        case 1:
          this._point = 2
          break
        case 2:
          ;(this._point = 3), yl(this, Qv(this, (r = Yv(this, e, t))), r)
          break
        default:
          yl(this, this._t0, (r = Yv(this, e, t)))
          break
      }
      ;(this._x0 = this._x1),
        (this._x1 = e),
        (this._y0 = this._y1),
        (this._y1 = t),
        (this._t0 = r)
    }
  },
}
function q1(e) {
  this._context = new H1(e)
}
;(q1.prototype = Object.create(ec.prototype)).point = function (e, t) {
  ec.prototype.point.call(this, t, e)
}
function H1(e) {
  this._context = e
}
H1.prototype = {
  moveTo: function (e, t) {
    this._context.moveTo(t, e)
  },
  closePath: function () {
    this._context.closePath()
  },
  lineTo: function (e, t) {
    this._context.lineTo(t, e)
  },
  bezierCurveTo: function (e, t, r, n, i, a) {
    this._context.bezierCurveTo(t, e, n, r, a, i)
  },
}
function lM(e) {
  return new ec(e)
}
function fM(e) {
  return new q1(e)
}
function z1(e) {
  this._context = e
}
z1.prototype = {
  areaStart: function () {
    this._line = 0
  },
  areaEnd: function () {
    this._line = NaN
  },
  lineStart: function () {
    ;(this._x = []), (this._y = [])
  },
  lineEnd: function () {
    var e = this._x,
      t = this._y,
      r = e.length
    if (r)
      if (
        (this._line
          ? this._context.lineTo(e[0], t[0])
          : this._context.moveTo(e[0], t[0]),
        r === 2)
      )
        this._context.lineTo(e[1], t[1])
      else
        for (var n = Zv(e), i = Zv(t), a = 0, o = 1; o < r; ++a, ++o)
          this._context.bezierCurveTo(
            n[0][a],
            i[0][a],
            n[1][a],
            i[1][a],
            e[o],
            t[o],
          )
    ;(this._line || (this._line !== 0 && r === 1)) && this._context.closePath(),
      (this._line = 1 - this._line),
      (this._x = this._y = null)
  },
  point: function (e, t) {
    this._x.push(+e), this._y.push(+t)
  },
}
function Zv(e) {
  var t,
    r = e.length - 1,
    n,
    i = new Array(r),
    a = new Array(r),
    o = new Array(r)
  for (i[0] = 0, a[0] = 2, o[0] = e[0] + 2 * e[1], t = 1; t < r - 1; ++t)
    (i[t] = 1), (a[t] = 4), (o[t] = 4 * e[t] + 2 * e[t + 1])
  for (
    i[r - 1] = 2, a[r - 1] = 7, o[r - 1] = 8 * e[r - 1] + e[r], t = 1;
    t < r;
    ++t
  )
    (n = i[t] / a[t - 1]), (a[t] -= n), (o[t] -= n * o[t - 1])
  for (i[r - 1] = o[r - 1] / a[r - 1], t = r - 2; t >= 0; --t)
    i[t] = (o[t] - i[t + 1]) / a[t]
  for (a[r - 1] = (e[r] + i[r - 1]) / 2, t = 0; t < r - 1; ++t)
    a[t] = 2 * e[t + 1] - i[t + 1]
  return [i, a]
}
function dM(e) {
  return new z1(e)
}
function $u(e, t) {
  ;(this._context = e), (this._t = t)
}
$u.prototype = {
  areaStart: function () {
    this._line = 0
  },
  areaEnd: function () {
    this._line = NaN
  },
  lineStart: function () {
    ;(this._x = this._y = NaN), (this._point = 0)
  },
  lineEnd: function () {
    0 < this._t &&
      this._t < 1 &&
      this._point === 2 &&
      this._context.lineTo(this._x, this._y),
      (this._line || (this._line !== 0 && this._point === 1)) &&
        this._context.closePath(),
      this._line >= 0 &&
        ((this._t = 1 - this._t), (this._line = 1 - this._line))
  },
  point: function (e, t) {
    switch (((e = +e), (t = +t), this._point)) {
      case 0:
        ;(this._point = 1),
          this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t)
        break
      case 1:
        this._point = 2
      default: {
        if (this._t <= 0)
          this._context.lineTo(this._x, t), this._context.lineTo(e, t)
        else {
          var r = this._x * (1 - this._t) + e * this._t
          this._context.lineTo(r, this._y), this._context.lineTo(r, t)
        }
        break
      }
    }
    ;(this._x = e), (this._y = t)
  },
}
function hM(e) {
  return new $u(e, 0.5)
}
function pM(e) {
  return new $u(e, 0)
}
function vM(e) {
  return new $u(e, 1)
}
function Ii(e, t) {
  if ((o = e.length) > 1)
    for (var r = 1, n, i, a = e[t[0]], o, s = a.length; r < o; ++r)
      for (i = a, a = e[t[r]], n = 0; n < s; ++n)
        a[n][1] += a[n][0] = isNaN(i[n][1]) ? i[n][0] : i[n][1]
}
function _f(e) {
  for (var t = e.length, r = new Array(t); --t >= 0; ) r[t] = t
  return r
}
function yM(e, t) {
  return e[t]
}
function mM(e) {
  const t = []
  return (t.key = e), t
}
function gM() {
  var e = Ae([]),
    t = _f,
    r = Ii,
    n = yM
  function i(a) {
    var o = Array.from(e.apply(this, arguments), mM),
      s,
      c = o.length,
      u = -1,
      l
    for (const f of a)
      for (s = 0, ++u; s < c; ++s)
        (o[s][u] = [0, +n(f, o[s].key, u, a)]).data = f
    for (s = 0, l = Bh(t(o)); s < c; ++s) o[l[s]].index = s
    return r(o, l), o
  }
  return (
    (i.keys = function (a) {
      return arguments.length
        ? ((e = typeof a == 'function' ? a : Ae(Array.from(a))), i)
        : e
    }),
    (i.value = function (a) {
      return arguments.length
        ? ((n = typeof a == 'function' ? a : Ae(+a)), i)
        : n
    }),
    (i.order = function (a) {
      return arguments.length
        ? ((t =
            a == null ? _f : typeof a == 'function' ? a : Ae(Array.from(a))),
          i)
        : t
    }),
    (i.offset = function (a) {
      return arguments.length ? ((r = a ?? Ii), i) : r
    }),
    i
  )
}
function bM(e, t) {
  if ((n = e.length) > 0) {
    for (var r, n, i = 0, a = e[0].length, o; i < a; ++i) {
      for (o = r = 0; r < n; ++r) o += e[r][i][1] || 0
      if (o) for (r = 0; r < n; ++r) e[r][i][1] /= o
    }
    Ii(e, t)
  }
}
function xM(e, t) {
  if ((i = e.length) > 0) {
    for (var r = 0, n = e[t[0]], i, a = n.length; r < a; ++r) {
      for (var o = 0, s = 0; o < i; ++o) s += e[o][r][1] || 0
      n[r][1] += n[r][0] = -s / 2
    }
    Ii(e, t)
  }
}
function wM(e, t) {
  if (!(!((o = e.length) > 0) || !((a = (i = e[t[0]]).length) > 0))) {
    for (var r = 0, n = 1, i, a, o; n < a; ++n) {
      for (var s = 0, c = 0, u = 0; s < o; ++s) {
        for (
          var l = e[t[s]],
            f = l[n][1] || 0,
            d = l[n - 1][1] || 0,
            h = (f - d) / 2,
            y = 0;
          y < s;
          ++y
        ) {
          var v = e[t[y]],
            p = v[n][1] || 0,
            x = v[n - 1][1] || 0
          h += p - x
        }
        ;(c += f), (u += h * f)
      }
      ;(i[n - 1][1] += i[n - 1][0] = r), c && (r -= u / c)
    }
    ;(i[n - 1][1] += i[n - 1][0] = r), Ii(e, t)
  }
}
function oo(e) {
  '@babel/helpers - typeof'
  return (
    (oo =
      typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
        ? function (t) {
            return typeof t
          }
        : function (t) {
            return t &&
              typeof Symbol == 'function' &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? 'symbol'
              : typeof t
          }),
    oo(e)
  )
}
var OM = ['type', 'size', 'sizeType']
function Cf() {
  return (
    (Cf = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t]
            for (var n in r)
              Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
          }
          return e
        }),
    Cf.apply(this, arguments)
  )
}
function Jv(e, t) {
  var r = Object.keys(e)
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e)
    t &&
      (n = n.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable
      })),
      r.push.apply(r, n)
  }
  return r
}
function ey(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {}
    t % 2
      ? Jv(Object(r), !0).forEach(function (n) {
          SM(e, n, r[n])
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
        : Jv(Object(r)).forEach(function (n) {
            Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
          })
  }
  return e
}
function SM(e, t, r) {
  return (
    (t = AM(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  )
}
function AM(e) {
  var t = PM(e, 'string')
  return oo(t) == 'symbol' ? t : t + ''
}
function PM(e, t) {
  if (oo(e) != 'object' || !e) return e
  var r = e[Symbol.toPrimitive]
  if (r !== void 0) {
    var n = r.call(e, t || 'default')
    if (oo(n) != 'object') return n
    throw new TypeError('@@toPrimitive must return a primitive value.')
  }
  return (t === 'string' ? String : Number)(e)
}
function $M(e, t) {
  if (e == null) return {}
  var r = EM(e, t),
    n,
    i
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e)
    for (i = 0; i < a.length; i++)
      (n = a[i]),
        !(t.indexOf(n) >= 0) &&
          Object.prototype.propertyIsEnumerable.call(e, n) &&
          (r[n] = e[n])
  }
  return r
}
function EM(e, t) {
  if (e == null) return {}
  var r = {}
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue
      r[n] = e[n]
    }
  return r
}
var K1 = {
    symbolCircle: Fh,
    symbolCross: Vk,
    symbolDiamond: Yk,
    symbolSquare: Qk,
    symbolStar: tM,
    symbolTriangle: rM,
    symbolWye: iM,
  },
  _M = Math.PI / 180,
  CM = function (t) {
    var r = 'symbol'.concat(Su(t))
    return K1[r] || Fh
  },
  jM = function (t, r, n) {
    if (r === 'area') return t
    switch (n) {
      case 'cross':
        return (5 * t * t) / 9
      case 'diamond':
        return (0.5 * t * t) / Math.sqrt(3)
      case 'square':
        return t * t
      case 'star': {
        var i = 18 * _M
        return (
          1.25 *
          t *
          t *
          (Math.tan(i) - Math.tan(i * 2) * Math.pow(Math.tan(i), 2))
        )
      }
      case 'triangle':
        return (Math.sqrt(3) * t * t) / 4
      case 'wye':
        return ((21 - 10 * Math.sqrt(3)) * t * t) / 8
      default:
        return (Math.PI * t * t) / 4
    }
  },
  TM = function (t, r) {
    K1['symbol'.concat(Su(t))] = r
  },
  Uh = function (t) {
    var r = t.type,
      n = r === void 0 ? 'circle' : r,
      i = t.size,
      a = i === void 0 ? 64 : i,
      o = t.sizeType,
      s = o === void 0 ? 'area' : o,
      c = $M(t, OM),
      u = ey(ey({}, c), {}, { type: n, size: a, sizeType: s }),
      l = function () {
        var p = CM(n),
          x = aM()
            .type(p)
            .size(jM(a, s, n))
        return x()
      },
      f = u.className,
      d = u.cx,
      h = u.cy,
      y = J(u, !0)
    return d === +d && h === +h && a === +a
      ? E.createElement(
          'path',
          Cf({}, y, {
            className: ue('recharts-symbols', f),
            transform: 'translate('.concat(d, ', ').concat(h, ')'),
            d: l(),
          }),
        )
      : null
  }
Uh.registerSymbol = TM
function Ri(e) {
  '@babel/helpers - typeof'
  return (
    (Ri =
      typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
        ? function (t) {
            return typeof t
          }
        : function (t) {
            return t &&
              typeof Symbol == 'function' &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? 'symbol'
              : typeof t
          }),
    Ri(e)
  )
}
function jf() {
  return (
    (jf = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t]
            for (var n in r)
              Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
          }
          return e
        }),
    jf.apply(this, arguments)
  )
}
function ty(e, t) {
  var r = Object.keys(e)
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e)
    t &&
      (n = n.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable
      })),
      r.push.apply(r, n)
  }
  return r
}
function kM(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {}
    t % 2
      ? ty(Object(r), !0).forEach(function (n) {
          so(e, n, r[n])
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
        : ty(Object(r)).forEach(function (n) {
            Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
          })
  }
  return e
}
function MM(e, t) {
  if (!(e instanceof t))
    throw new TypeError('Cannot call a class as a function')
}
function NM(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r]
    ;(n.enumerable = n.enumerable || !1),
      (n.configurable = !0),
      'value' in n && (n.writable = !0),
      Object.defineProperty(e, V1(n.key), n)
  }
}
function IM(e, t, r) {
  return (
    t && NM(e.prototype, t),
    Object.defineProperty(e, 'prototype', { writable: !1 }),
    e
  )
}
function RM(e, t, r) {
  return (
    (t = tc(t)),
    DM(
      e,
      G1() ? Reflect.construct(t, r || [], tc(e).constructor) : t.apply(e, r),
    )
  )
}
function DM(e, t) {
  if (t && (Ri(t) === 'object' || typeof t == 'function')) return t
  if (t !== void 0)
    throw new TypeError(
      'Derived constructors may only return object or undefined',
    )
  return LM(e)
}
function LM(e) {
  if (e === void 0)
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called",
    )
  return e
}
function G1() {
  try {
    var e = !Boolean.prototype.valueOf.call(
      Reflect.construct(Boolean, [], function () {}),
    )
  } catch {}
  return (G1 = function () {
    return !!e
  })()
}
function tc(e) {
  return (
    (tc = Object.setPrototypeOf
      ? Object.getPrototypeOf.bind()
      : function (r) {
          return r.__proto__ || Object.getPrototypeOf(r)
        }),
    tc(e)
  )
}
function BM(e, t) {
  if (typeof t != 'function' && t !== null)
    throw new TypeError('Super expression must either be null or a function')
  ;(e.prototype = Object.create(t && t.prototype, {
    constructor: { value: e, writable: !0, configurable: !0 },
  })),
    Object.defineProperty(e, 'prototype', { writable: !1 }),
    t && Tf(e, t)
}
function Tf(e, t) {
  return (
    (Tf = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (n, i) {
          return (n.__proto__ = i), n
        }),
    Tf(e, t)
  )
}
function so(e, t, r) {
  return (
    (t = V1(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  )
}
function V1(e) {
  var t = FM(e, 'string')
  return Ri(t) == 'symbol' ? t : t + ''
}
function FM(e, t) {
  if (Ri(e) != 'object' || !e) return e
  var r = e[Symbol.toPrimitive]
  if (r !== void 0) {
    var n = r.call(e, t || 'default')
    if (Ri(n) != 'object') return n
    throw new TypeError('@@toPrimitive must return a primitive value.')
  }
  return (t === 'string' ? String : Number)(e)
}
var $t = 32,
  Wh = (function (e) {
    function t() {
      return MM(this, t), RM(this, t, arguments)
    }
    return (
      BM(t, e),
      IM(t, [
        {
          key: 'renderIcon',
          value: function (n) {
            var i = this.props.inactiveColor,
              a = $t / 2,
              o = $t / 6,
              s = $t / 3,
              c = n.inactive ? i : n.color
            if (n.type === 'plainline')
              return E.createElement('line', {
                strokeWidth: 4,
                fill: 'none',
                stroke: c,
                strokeDasharray: n.payload.strokeDasharray,
                x1: 0,
                y1: a,
                x2: $t,
                y2: a,
                className: 'recharts-legend-icon',
              })
            if (n.type === 'line')
              return E.createElement('path', {
                strokeWidth: 4,
                fill: 'none',
                stroke: c,
                d: 'M0,'
                  .concat(a, 'h')
                  .concat(
                    s,
                    `
            A`,
                  )
                  .concat(o, ',')
                  .concat(o, ',0,1,1,')
                  .concat(2 * s, ',')
                  .concat(
                    a,
                    `
            H`,
                  )
                  .concat($t, 'M')
                  .concat(2 * s, ',')
                  .concat(
                    a,
                    `
            A`,
                  )
                  .concat(o, ',')
                  .concat(o, ',0,1,1,')
                  .concat(s, ',')
                  .concat(a),
                className: 'recharts-legend-icon',
              })
            if (n.type === 'rect')
              return E.createElement('path', {
                stroke: 'none',
                fill: c,
                d: 'M0,'
                  .concat($t / 8, 'h')
                  .concat($t, 'v')
                  .concat(($t * 3) / 4, 'h')
                  .concat(-$t, 'z'),
                className: 'recharts-legend-icon',
              })
            if (E.isValidElement(n.legendIcon)) {
              var u = kM({}, n)
              return delete u.legendIcon, E.cloneElement(n.legendIcon, u)
            }
            return E.createElement(Uh, {
              fill: c,
              cx: a,
              cy: a,
              size: $t,
              sizeType: 'diameter',
              type: n.type,
            })
          },
        },
        {
          key: 'renderItems',
          value: function () {
            var n = this,
              i = this.props,
              a = i.payload,
              o = i.iconSize,
              s = i.layout,
              c = i.formatter,
              u = i.inactiveColor,
              l = { x: 0, y: 0, width: $t, height: $t },
              f = {
                display: s === 'horizontal' ? 'inline-block' : 'block',
                marginRight: 10,
              },
              d = {
                display: 'inline-block',
                verticalAlign: 'middle',
                marginRight: 4,
              }
            return a.map(function (h, y) {
              var v = h.formatter || c,
                p = ue(
                  so(
                    so(
                      { 'recharts-legend-item': !0 },
                      'legend-item-'.concat(y),
                      !0,
                    ),
                    'inactive',
                    h.inactive,
                  ),
                )
              if (h.type === 'none') return null
              var x = ie(h.value) ? null : h.value
              Gt(
                !ie(h.value),
                `The name property is also required when using a function for the dataKey of a chart's cartesian components. Ex: <Bar name="Name of my Data"/>`,
              )
              var b = h.inactive ? u : h.color
              return E.createElement(
                'li',
                jf(
                  { className: p, style: f, key: 'legend-item-'.concat(y) },
                  Ln(n.props, h, y),
                ),
                E.createElement(
                  wf,
                  { width: o, height: o, viewBox: l, style: d },
                  n.renderIcon(h),
                ),
                E.createElement(
                  'span',
                  {
                    className: 'recharts-legend-item-text',
                    style: { color: b },
                  },
                  v ? v(x, h, y) : x,
                ),
              )
            })
          },
        },
        {
          key: 'render',
          value: function () {
            var n = this.props,
              i = n.payload,
              a = n.layout,
              o = n.align
            if (!i || !i.length) return null
            var s = {
              padding: 0,
              margin: 0,
              textAlign: a === 'horizontal' ? o : 'left',
            }
            return E.createElement(
              'ul',
              { className: 'recharts-default-legend', style: s },
              this.renderItems(),
            )
          },
        },
      ])
    )
  })(A.PureComponent)
so(Wh, 'displayName', 'Legend')
so(Wh, 'defaultProps', {
  iconSize: 14,
  layout: 'horizontal',
  align: 'center',
  verticalAlign: 'middle',
  inactiveColor: '#ccc',
})
var UM = lu
function WM() {
  ;(this.__data__ = new UM()), (this.size = 0)
}
var qM = WM
function HM(e) {
  var t = this.__data__,
    r = t.delete(e)
  return (this.size = t.size), r
}
var zM = HM
function KM(e) {
  return this.__data__.get(e)
}
var GM = KM
function VM(e) {
  return this.__data__.has(e)
}
var XM = VM,
  YM = lu,
  QM = Ch,
  ZM = jh,
  JM = 200
function eN(e, t) {
  var r = this.__data__
  if (r instanceof YM) {
    var n = r.__data__
    if (!QM || n.length < JM - 1)
      return n.push([e, t]), (this.size = ++r.size), this
    r = this.__data__ = new ZM(n)
  }
  return r.set(e, t), (this.size = r.size), this
}
var tN = eN,
  rN = lu,
  nN = qM,
  iN = zM,
  aN = GM,
  oN = XM,
  sN = tN
function ga(e) {
  var t = (this.__data__ = new rN(e))
  this.size = t.size
}
ga.prototype.clear = nN
ga.prototype.delete = iN
ga.prototype.get = aN
ga.prototype.has = oN
ga.prototype.set = sN
var X1 = ga,
  cN = '__lodash_hash_undefined__'
function uN(e) {
  return this.__data__.set(e, cN), this
}
var lN = uN
function fN(e) {
  return this.__data__.has(e)
}
var dN = fN,
  hN = jh,
  pN = lN,
  vN = dN
function rc(e) {
  var t = -1,
    r = e == null ? 0 : e.length
  for (this.__data__ = new hN(); ++t < r; ) this.add(e[t])
}
rc.prototype.add = rc.prototype.push = pN
rc.prototype.has = vN
var Y1 = rc
function yN(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length; ++r < n; )
    if (t(e[r], r, e)) return !0
  return !1
}
var Q1 = yN
function mN(e, t) {
  return e.has(t)
}
var Z1 = mN,
  gN = Y1,
  bN = Q1,
  xN = Z1,
  wN = 1,
  ON = 2
function SN(e, t, r, n, i, a) {
  var o = r & wN,
    s = e.length,
    c = t.length
  if (s != c && !(o && c > s)) return !1
  var u = a.get(e),
    l = a.get(t)
  if (u && l) return u == t && l == e
  var f = -1,
    d = !0,
    h = r & ON ? new gN() : void 0
  for (a.set(e, t), a.set(t, e); ++f < s; ) {
    var y = e[f],
      v = t[f]
    if (n) var p = o ? n(v, y, f, t, e, a) : n(y, v, f, e, t, a)
    if (p !== void 0) {
      if (p) continue
      d = !1
      break
    }
    if (h) {
      if (
        !bN(t, function (x, b) {
          if (!xN(h, b) && (y === x || i(y, x, r, n, a))) return h.push(b)
        })
      ) {
        d = !1
        break
      }
    } else if (!(y === v || i(y, v, r, n, a))) {
      d = !1
      break
    }
  }
  return a.delete(e), a.delete(t), d
}
var J1 = SN,
  AN = lr,
  PN = AN.Uint8Array,
  $N = PN
function EN(e) {
  var t = -1,
    r = Array(e.size)
  return (
    e.forEach(function (n, i) {
      r[++t] = [i, n]
    }),
    r
  )
}
var _N = EN
function CN(e) {
  var t = -1,
    r = Array(e.size)
  return (
    e.forEach(function (n) {
      r[++t] = n
    }),
    r
  )
}
var qh = CN,
  ry = Qo,
  ny = $N,
  jN = _h,
  TN = J1,
  kN = _N,
  MN = qh,
  NN = 1,
  IN = 2,
  RN = '[object Boolean]',
  DN = '[object Date]',
  LN = '[object Error]',
  BN = '[object Map]',
  FN = '[object Number]',
  UN = '[object RegExp]',
  WN = '[object Set]',
  qN = '[object String]',
  HN = '[object Symbol]',
  zN = '[object ArrayBuffer]',
  KN = '[object DataView]',
  iy = ry ? ry.prototype : void 0,
  ml = iy ? iy.valueOf : void 0
function GN(e, t, r, n, i, a, o) {
  switch (r) {
    case KN:
      if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
        return !1
      ;(e = e.buffer), (t = t.buffer)
    case zN:
      return !(e.byteLength != t.byteLength || !a(new ny(e), new ny(t)))
    case RN:
    case DN:
    case FN:
      return jN(+e, +t)
    case LN:
      return e.name == t.name && e.message == t.message
    case UN:
    case qN:
      return e == t + ''
    case BN:
      var s = kN
    case WN:
      var c = n & NN
      if ((s || (s = MN), e.size != t.size && !c)) return !1
      var u = o.get(e)
      if (u) return u == t
      ;(n |= IN), o.set(e, t)
      var l = TN(s(e), s(t), n, i, a, o)
      return o.delete(e), l
    case HN:
      if (ml) return ml.call(e) == ml.call(t)
  }
  return !1
}
var VN = GN
function XN(e, t) {
  for (var r = -1, n = t.length, i = e.length; ++r < n; ) e[i + r] = t[r]
  return e
}
var ew = XN,
  YN = ew,
  QN = ht
function ZN(e, t, r) {
  var n = t(e)
  return QN(e) ? n : YN(n, r(e))
}
var JN = ZN
function eI(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length, i = 0, a = []; ++r < n; ) {
    var o = e[r]
    t(o, r, e) && (a[i++] = o)
  }
  return a
}
var tI = eI
function rI() {
  return []
}
var nI = rI,
  iI = tI,
  aI = nI,
  oI = Object.prototype,
  sI = oI.propertyIsEnumerable,
  ay = Object.getOwnPropertySymbols,
  cI = ay
    ? function (e) {
        return e == null
          ? []
          : ((e = Object(e)),
            iI(ay(e), function (t) {
              return sI.call(e, t)
            }))
      }
    : aI,
  uI = cI
function lI(e, t) {
  for (var r = -1, n = Array(e); ++r < e; ) n[r] = t(r)
  return n
}
var fI = lI,
  dI = Ir,
  hI = Rr,
  pI = '[object Arguments]'
function vI(e) {
  return hI(e) && dI(e) == pI
}
var yI = vI,
  oy = yI,
  mI = Rr,
  tw = Object.prototype,
  gI = tw.hasOwnProperty,
  bI = tw.propertyIsEnumerable,
  xI = oy(
    (function () {
      return arguments
    })(),
  )
    ? oy
    : function (e) {
        return mI(e) && gI.call(e, 'callee') && !bI.call(e, 'callee')
      },
  Hh = xI,
  nc = { exports: {} }
function wI() {
  return !1
}
var OI = wI
nc.exports
;(function (e, t) {
  var r = lr,
    n = OI,
    i = t && !t.nodeType && t,
    a = i && !0 && e && !e.nodeType && e,
    o = a && a.exports === i,
    s = o ? r.Buffer : void 0,
    c = s ? s.isBuffer : void 0,
    u = c || n
  e.exports = u
})(nc, nc.exports)
var rw = nc.exports,
  SI = 9007199254740991,
  AI = /^(?:0|[1-9]\d*)$/
function PI(e, t) {
  var r = typeof e
  return (
    (t = t ?? SI),
    !!t &&
      (r == 'number' || (r != 'symbol' && AI.test(e))) &&
      e > -1 &&
      e % 1 == 0 &&
      e < t
  )
}
var zh = PI,
  $I = 9007199254740991
function EI(e) {
  return typeof e == 'number' && e > -1 && e % 1 == 0 && e <= $I
}
var Kh = EI,
  _I = Ir,
  CI = Kh,
  jI = Rr,
  TI = '[object Arguments]',
  kI = '[object Array]',
  MI = '[object Boolean]',
  NI = '[object Date]',
  II = '[object Error]',
  RI = '[object Function]',
  DI = '[object Map]',
  LI = '[object Number]',
  BI = '[object Object]',
  FI = '[object RegExp]',
  UI = '[object Set]',
  WI = '[object String]',
  qI = '[object WeakMap]',
  HI = '[object ArrayBuffer]',
  zI = '[object DataView]',
  KI = '[object Float32Array]',
  GI = '[object Float64Array]',
  VI = '[object Int8Array]',
  XI = '[object Int16Array]',
  YI = '[object Int32Array]',
  QI = '[object Uint8Array]',
  ZI = '[object Uint8ClampedArray]',
  JI = '[object Uint16Array]',
  eR = '[object Uint32Array]',
  $e = {}
$e[KI] =
  $e[GI] =
  $e[VI] =
  $e[XI] =
  $e[YI] =
  $e[QI] =
  $e[ZI] =
  $e[JI] =
  $e[eR] =
    !0
$e[TI] =
  $e[kI] =
  $e[HI] =
  $e[MI] =
  $e[zI] =
  $e[NI] =
  $e[II] =
  $e[RI] =
  $e[DI] =
  $e[LI] =
  $e[BI] =
  $e[FI] =
  $e[UI] =
  $e[WI] =
  $e[qI] =
    !1
function tR(e) {
  return jI(e) && CI(e.length) && !!$e[_I(e)]
}
var rR = tR
function nR(e) {
  return function (t) {
    return e(t)
  }
}
var nw = nR,
  ic = { exports: {} }
ic.exports
;(function (e, t) {
  var r = l1,
    n = t && !t.nodeType && t,
    i = n && !0 && e && !e.nodeType && e,
    a = i && i.exports === n,
    o = a && r.process,
    s = (function () {
      try {
        var c = i && i.require && i.require('util').types
        return c || (o && o.binding && o.binding('util'))
      } catch {}
    })()
  e.exports = s
})(ic, ic.exports)
var iR = ic.exports,
  aR = rR,
  oR = nw,
  sy = iR,
  cy = sy && sy.isTypedArray,
  sR = cy ? oR(cy) : aR,
  iw = sR,
  cR = fI,
  uR = Hh,
  lR = ht,
  fR = rw,
  dR = zh,
  hR = iw,
  pR = Object.prototype,
  vR = pR.hasOwnProperty
function yR(e, t) {
  var r = lR(e),
    n = !r && uR(e),
    i = !r && !n && fR(e),
    a = !r && !n && !i && hR(e),
    o = r || n || i || a,
    s = o ? cR(e.length, String) : [],
    c = s.length
  for (var u in e)
    (t || vR.call(e, u)) &&
      !(
        o &&
        (u == 'length' ||
          (i && (u == 'offset' || u == 'parent')) ||
          (a && (u == 'buffer' || u == 'byteLength' || u == 'byteOffset')) ||
          dR(u, c))
      ) &&
      s.push(u)
  return s
}
var mR = yR,
  gR = Object.prototype
function bR(e) {
  var t = e && e.constructor,
    r = (typeof t == 'function' && t.prototype) || gR
  return e === r
}
var xR = bR
function wR(e, t) {
  return function (r) {
    return e(t(r))
  }
}
var aw = wR,
  OR = aw,
  SR = OR(Object.keys, Object),
  AR = SR,
  PR = xR,
  $R = AR,
  ER = Object.prototype,
  _R = ER.hasOwnProperty
function CR(e) {
  if (!PR(e)) return $R(e)
  var t = []
  for (var r in Object(e)) _R.call(e, r) && r != 'constructor' && t.push(r)
  return t
}
var jR = CR,
  TR = Eh,
  kR = Kh
function MR(e) {
  return e != null && kR(e.length) && !TR(e)
}
var es = MR,
  NR = mR,
  IR = jR,
  RR = es
function DR(e) {
  return RR(e) ? NR(e) : IR(e)
}
var Eu = DR,
  LR = JN,
  BR = uI,
  FR = Eu
function UR(e) {
  return LR(e, FR, BR)
}
var WR = UR,
  uy = WR,
  qR = 1,
  HR = Object.prototype,
  zR = HR.hasOwnProperty
function KR(e, t, r, n, i, a) {
  var o = r & qR,
    s = uy(e),
    c = s.length,
    u = uy(t),
    l = u.length
  if (c != l && !o) return !1
  for (var f = c; f--; ) {
    var d = s[f]
    if (!(o ? d in t : zR.call(t, d))) return !1
  }
  var h = a.get(e),
    y = a.get(t)
  if (h && y) return h == t && y == e
  var v = !0
  a.set(e, t), a.set(t, e)
  for (var p = o; ++f < c; ) {
    d = s[f]
    var x = e[d],
      b = t[d]
    if (n) var w = o ? n(b, x, d, t, e, a) : n(x, b, d, e, t, a)
    if (!(w === void 0 ? x === b || i(x, b, r, n, a) : w)) {
      v = !1
      break
    }
    p || (p = d == 'constructor')
  }
  if (v && !p) {
    var g = e.constructor,
      m = t.constructor
    g != m &&
      'constructor' in e &&
      'constructor' in t &&
      !(
        typeof g == 'function' &&
        g instanceof g &&
        typeof m == 'function' &&
        m instanceof m
      ) &&
      (v = !1)
  }
  return a.delete(e), a.delete(t), v
}
var GR = KR,
  VR = zn,
  XR = lr,
  YR = VR(XR, 'DataView'),
  QR = YR,
  ZR = zn,
  JR = lr,
  eD = ZR(JR, 'Promise'),
  tD = eD,
  rD = zn,
  nD = lr,
  iD = rD(nD, 'Set'),
  ow = iD,
  aD = zn,
  oD = lr,
  sD = aD(oD, 'WeakMap'),
  cD = sD,
  kf = QR,
  Mf = Ch,
  Nf = tD,
  If = ow,
  Rf = cD,
  sw = Ir,
  ba = d1,
  ly = '[object Map]',
  uD = '[object Object]',
  fy = '[object Promise]',
  dy = '[object Set]',
  hy = '[object WeakMap]',
  py = '[object DataView]',
  lD = ba(kf),
  fD = ba(Mf),
  dD = ba(Nf),
  hD = ba(If),
  pD = ba(Rf),
  yn = sw
;((kf && yn(new kf(new ArrayBuffer(1))) != py) ||
  (Mf && yn(new Mf()) != ly) ||
  (Nf && yn(Nf.resolve()) != fy) ||
  (If && yn(new If()) != dy) ||
  (Rf && yn(new Rf()) != hy)) &&
  (yn = function (e) {
    var t = sw(e),
      r = t == uD ? e.constructor : void 0,
      n = r ? ba(r) : ''
    if (n)
      switch (n) {
        case lD:
          return py
        case fD:
          return ly
        case dD:
          return fy
        case hD:
          return dy
        case pD:
          return hy
      }
    return t
  })
var vD = yn,
  gl = X1,
  yD = J1,
  mD = VN,
  gD = GR,
  vy = vD,
  yy = ht,
  my = rw,
  bD = iw,
  xD = 1,
  gy = '[object Arguments]',
  by = '[object Array]',
  gs = '[object Object]',
  wD = Object.prototype,
  xy = wD.hasOwnProperty
function OD(e, t, r, n, i, a) {
  var o = yy(e),
    s = yy(t),
    c = o ? by : vy(e),
    u = s ? by : vy(t)
  ;(c = c == gy ? gs : c), (u = u == gy ? gs : u)
  var l = c == gs,
    f = u == gs,
    d = c == u
  if (d && my(e)) {
    if (!my(t)) return !1
    ;(o = !0), (l = !1)
  }
  if (d && !l)
    return (
      a || (a = new gl()),
      o || bD(e) ? yD(e, t, r, n, i, a) : mD(e, t, c, r, n, i, a)
    )
  if (!(r & xD)) {
    var h = l && xy.call(e, '__wrapped__'),
      y = f && xy.call(t, '__wrapped__')
    if (h || y) {
      var v = h ? e.value() : e,
        p = y ? t.value() : t
      return a || (a = new gl()), i(v, p, r, n, a)
    }
  }
  return d ? (a || (a = new gl()), gD(e, t, r, n, i, a)) : !1
}
var SD = OD,
  AD = SD,
  wy = Rr
function cw(e, t, r, n, i) {
  return e === t
    ? !0
    : e == null || t == null || (!wy(e) && !wy(t))
      ? e !== e && t !== t
      : AD(e, t, r, n, cw, i)
}
var Gh = cw,
  PD = X1,
  $D = Gh,
  ED = 1,
  _D = 2
function CD(e, t, r, n) {
  var i = r.length,
    a = i,
    o = !n
  if (e == null) return !a
  for (e = Object(e); i--; ) {
    var s = r[i]
    if (o && s[2] ? s[1] !== e[s[0]] : !(s[0] in e)) return !1
  }
  for (; ++i < a; ) {
    s = r[i]
    var c = s[0],
      u = e[c],
      l = s[1]
    if (o && s[2]) {
      if (u === void 0 && !(c in e)) return !1
    } else {
      var f = new PD()
      if (n) var d = n(u, l, c, e, t, f)
      if (!(d === void 0 ? $D(l, u, ED | _D, n, f) : d)) return !1
    }
  }
  return !0
}
var jD = CD,
  TD = sn
function kD(e) {
  return e === e && !TD(e)
}
var uw = kD,
  MD = uw,
  ND = Eu
function ID(e) {
  for (var t = ND(e), r = t.length; r--; ) {
    var n = t[r],
      i = e[n]
    t[r] = [n, i, MD(i)]
  }
  return t
}
var RD = ID
function DD(e, t) {
  return function (r) {
    return r == null ? !1 : r[e] === t && (t !== void 0 || e in Object(r))
  }
}
var lw = DD,
  LD = jD,
  BD = RD,
  FD = lw
function UD(e) {
  var t = BD(e)
  return t.length == 1 && t[0][2]
    ? FD(t[0][0], t[0][1])
    : function (r) {
        return r === e || LD(r, e, t)
      }
}
var WD = UD
function qD(e, t) {
  return e != null && t in Object(e)
}
var HD = qD,
  zD = m1,
  KD = Hh,
  GD = ht,
  VD = zh,
  XD = Kh,
  YD = du
function QD(e, t, r) {
  t = zD(t, e)
  for (var n = -1, i = t.length, a = !1; ++n < i; ) {
    var o = YD(t[n])
    if (!(a = e != null && r(e, o))) break
    e = e[o]
  }
  return a || ++n != i
    ? a
    : ((i = e == null ? 0 : e.length),
      !!i && XD(i) && VD(o, i) && (GD(e) || KD(e)))
}
var ZD = QD,
  JD = HD,
  e3 = ZD
function t3(e, t) {
  return e != null && e3(e, t, JD)
}
var r3 = t3,
  n3 = Gh,
  i3 = g1,
  a3 = r3,
  o3 = $h,
  s3 = uw,
  c3 = lw,
  u3 = du,
  l3 = 1,
  f3 = 2
function d3(e, t) {
  return o3(e) && s3(t)
    ? c3(u3(e), t)
    : function (r) {
        var n = i3(r, e)
        return n === void 0 && n === t ? a3(r, e) : n3(t, n, l3 | f3)
      }
}
var h3 = d3
function p3(e) {
  return e
}
var xa = p3
function v3(e) {
  return function (t) {
    return t == null ? void 0 : t[e]
  }
}
var y3 = v3,
  m3 = Mh
function g3(e) {
  return function (t) {
    return m3(t, e)
  }
}
var b3 = g3,
  x3 = y3,
  w3 = b3,
  O3 = $h,
  S3 = du
function A3(e) {
  return O3(e) ? x3(S3(e)) : w3(e)
}
var P3 = A3,
  $3 = WD,
  E3 = h3,
  _3 = xa,
  C3 = ht,
  j3 = P3
function T3(e) {
  return typeof e == 'function'
    ? e
    : e == null
      ? _3
      : typeof e == 'object'
        ? C3(e)
          ? E3(e[0], e[1])
          : $3(e)
        : j3(e)
}
var fr = T3
function k3(e, t, r, n) {
  for (var i = e.length, a = r + (n ? 1 : -1); n ? a-- : ++a < i; )
    if (t(e[a], a, e)) return a
  return -1
}
var fw = k3
function M3(e) {
  return e !== e
}
var N3 = M3
function I3(e, t, r) {
  for (var n = r - 1, i = e.length; ++n < i; ) if (e[n] === t) return n
  return -1
}
var R3 = I3,
  D3 = fw,
  L3 = N3,
  B3 = R3
function F3(e, t, r) {
  return t === t ? B3(e, t, r) : D3(e, L3, r)
}
var U3 = F3,
  W3 = U3
function q3(e, t) {
  var r = e == null ? 0 : e.length
  return !!r && W3(e, t, 0) > -1
}
var H3 = q3
function z3(e, t, r) {
  for (var n = -1, i = e == null ? 0 : e.length; ++n < i; )
    if (r(t, e[n])) return !0
  return !1
}
var K3 = z3
function G3() {}
var V3 = G3,
  bl = ow,
  X3 = V3,
  Y3 = qh,
  Q3 = 1 / 0,
  Z3 =
    bl && 1 / Y3(new bl([, -0]))[1] == Q3
      ? function (e) {
          return new bl(e)
        }
      : X3,
  J3 = Z3,
  eL = Y1,
  tL = H3,
  rL = K3,
  nL = Z1,
  iL = J3,
  aL = qh,
  oL = 200
function sL(e, t, r) {
  var n = -1,
    i = tL,
    a = e.length,
    o = !0,
    s = [],
    c = s
  if (r) (o = !1), (i = rL)
  else if (a >= oL) {
    var u = t ? null : iL(e)
    if (u) return aL(u)
    ;(o = !1), (i = nL), (c = new eL())
  } else c = t ? [] : s
  e: for (; ++n < a; ) {
    var l = e[n],
      f = t ? t(l) : l
    if (((l = r || l !== 0 ? l : 0), o && f === f)) {
      for (var d = c.length; d--; ) if (c[d] === f) continue e
      t && c.push(f), s.push(l)
    } else i(c, f, r) || (c !== s && c.push(f), s.push(l))
  }
  return s
}
var cL = sL,
  uL = fr,
  lL = cL
function fL(e, t) {
  return e && e.length ? lL(e, uL(t)) : []
}
var dL = fL
const Oy = me(dL)
function dw(e, t, r) {
  return t === !0 ? Oy(e, r) : ie(t) ? Oy(e, t) : e
}
function Di(e) {
  '@babel/helpers - typeof'
  return (
    (Di =
      typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
        ? function (t) {
            return typeof t
          }
        : function (t) {
            return t &&
              typeof Symbol == 'function' &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? 'symbol'
              : typeof t
          }),
    Di(e)
  )
}
var hL = ['ref']
function Sy(e, t) {
  var r = Object.keys(e)
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e)
    t &&
      (n = n.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable
      })),
      r.push.apply(r, n)
  }
  return r
}
function dr(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {}
    t % 2
      ? Sy(Object(r), !0).forEach(function (n) {
          _u(e, n, r[n])
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
        : Sy(Object(r)).forEach(function (n) {
            Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
          })
  }
  return e
}
function pL(e, t) {
  if (!(e instanceof t))
    throw new TypeError('Cannot call a class as a function')
}
function Ay(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r]
    ;(n.enumerable = n.enumerable || !1),
      (n.configurable = !0),
      'value' in n && (n.writable = !0),
      Object.defineProperty(e, pw(n.key), n)
  }
}
function vL(e, t, r) {
  return (
    t && Ay(e.prototype, t),
    r && Ay(e, r),
    Object.defineProperty(e, 'prototype', { writable: !1 }),
    e
  )
}
function yL(e, t, r) {
  return (
    (t = ac(t)),
    mL(
      e,
      hw() ? Reflect.construct(t, r || [], ac(e).constructor) : t.apply(e, r),
    )
  )
}
function mL(e, t) {
  if (t && (Di(t) === 'object' || typeof t == 'function')) return t
  if (t !== void 0)
    throw new TypeError(
      'Derived constructors may only return object or undefined',
    )
  return gL(e)
}
function gL(e) {
  if (e === void 0)
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called",
    )
  return e
}
function hw() {
  try {
    var e = !Boolean.prototype.valueOf.call(
      Reflect.construct(Boolean, [], function () {}),
    )
  } catch {}
  return (hw = function () {
    return !!e
  })()
}
function ac(e) {
  return (
    (ac = Object.setPrototypeOf
      ? Object.getPrototypeOf.bind()
      : function (r) {
          return r.__proto__ || Object.getPrototypeOf(r)
        }),
    ac(e)
  )
}
function bL(e, t) {
  if (typeof t != 'function' && t !== null)
    throw new TypeError('Super expression must either be null or a function')
  ;(e.prototype = Object.create(t && t.prototype, {
    constructor: { value: e, writable: !0, configurable: !0 },
  })),
    Object.defineProperty(e, 'prototype', { writable: !1 }),
    t && Df(e, t)
}
function Df(e, t) {
  return (
    (Df = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (n, i) {
          return (n.__proto__ = i), n
        }),
    Df(e, t)
  )
}
function _u(e, t, r) {
  return (
    (t = pw(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  )
}
function pw(e) {
  var t = xL(e, 'string')
  return Di(t) == 'symbol' ? t : t + ''
}
function xL(e, t) {
  if (Di(e) != 'object' || !e) return e
  var r = e[Symbol.toPrimitive]
  if (r !== void 0) {
    var n = r.call(e, t || 'default')
    if (Di(n) != 'object') return n
    throw new TypeError('@@toPrimitive must return a primitive value.')
  }
  return (t === 'string' ? String : Number)(e)
}
function wL(e, t) {
  if (e == null) return {}
  var r = OL(e, t),
    n,
    i
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e)
    for (i = 0; i < a.length; i++)
      (n = a[i]),
        !(t.indexOf(n) >= 0) &&
          Object.prototype.propertyIsEnumerable.call(e, n) &&
          (r[n] = e[n])
  }
  return r
}
function OL(e, t) {
  if (e == null) return {}
  var r = {}
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue
      r[n] = e[n]
    }
  return r
}
function SL(e) {
  return e.value
}
function AL(e, t) {
  if (E.isValidElement(e)) return E.cloneElement(e, t)
  if (typeof e == 'function') return E.createElement(e, t)
  t.ref
  var r = wL(t, hL)
  return E.createElement(Wh, r)
}
var Py = 1,
  di = (function (e) {
    function t() {
      var r
      pL(this, t)
      for (var n = arguments.length, i = new Array(n), a = 0; a < n; a++)
        i[a] = arguments[a]
      return (
        (r = yL(this, t, [].concat(i))),
        _u(r, 'lastBoundingBox', { width: -1, height: -1 }),
        r
      )
    }
    return (
      bL(t, e),
      vL(
        t,
        [
          {
            key: 'componentDidMount',
            value: function () {
              this.updateBBox()
            },
          },
          {
            key: 'componentDidUpdate',
            value: function () {
              this.updateBBox()
            },
          },
          {
            key: 'getBBox',
            value: function () {
              if (this.wrapperNode && this.wrapperNode.getBoundingClientRect) {
                var n = this.wrapperNode.getBoundingClientRect()
                return (
                  (n.height = this.wrapperNode.offsetHeight),
                  (n.width = this.wrapperNode.offsetWidth),
                  n
                )
              }
              return null
            },
          },
          {
            key: 'updateBBox',
            value: function () {
              var n = this.props.onBBoxUpdate,
                i = this.getBBox()
              i
                ? (Math.abs(i.width - this.lastBoundingBox.width) > Py ||
                    Math.abs(i.height - this.lastBoundingBox.height) > Py) &&
                  ((this.lastBoundingBox.width = i.width),
                  (this.lastBoundingBox.height = i.height),
                  n && n(i))
                : (this.lastBoundingBox.width !== -1 ||
                    this.lastBoundingBox.height !== -1) &&
                  ((this.lastBoundingBox.width = -1),
                  (this.lastBoundingBox.height = -1),
                  n && n(null))
            },
          },
          {
            key: 'getBBoxSnapshot',
            value: function () {
              return this.lastBoundingBox.width >= 0 &&
                this.lastBoundingBox.height >= 0
                ? dr({}, this.lastBoundingBox)
                : { width: 0, height: 0 }
            },
          },
          {
            key: 'getDefaultPosition',
            value: function (n) {
              var i = this.props,
                a = i.layout,
                o = i.align,
                s = i.verticalAlign,
                c = i.margin,
                u = i.chartWidth,
                l = i.chartHeight,
                f,
                d
              if (
                !n ||
                ((n.left === void 0 || n.left === null) &&
                  (n.right === void 0 || n.right === null))
              )
                if (o === 'center' && a === 'vertical') {
                  var h = this.getBBoxSnapshot()
                  f = { left: ((u || 0) - h.width) / 2 }
                } else
                  f =
                    o === 'right'
                      ? { right: (c && c.right) || 0 }
                      : { left: (c && c.left) || 0 }
              if (
                !n ||
                ((n.top === void 0 || n.top === null) &&
                  (n.bottom === void 0 || n.bottom === null))
              )
                if (s === 'middle') {
                  var y = this.getBBoxSnapshot()
                  d = { top: ((l || 0) - y.height) / 2 }
                } else
                  d =
                    s === 'bottom'
                      ? { bottom: (c && c.bottom) || 0 }
                      : { top: (c && c.top) || 0 }
              return dr(dr({}, f), d)
            },
          },
          {
            key: 'render',
            value: function () {
              var n = this,
                i = this.props,
                a = i.content,
                o = i.width,
                s = i.height,
                c = i.wrapperStyle,
                u = i.payloadUniqBy,
                l = i.payload,
                f = dr(
                  dr(
                    {
                      position: 'absolute',
                      width: o || 'auto',
                      height: s || 'auto',
                    },
                    this.getDefaultPosition(c),
                  ),
                  c,
                )
              return E.createElement(
                'div',
                {
                  className: 'recharts-legend-wrapper',
                  style: f,
                  ref: function (h) {
                    n.wrapperNode = h
                  },
                },
                AL(a, dr(dr({}, this.props), {}, { payload: dw(l, u, SL) })),
              )
            },
          },
        ],
        [
          {
            key: 'getWithHeight',
            value: function (n, i) {
              var a = dr(dr({}, this.defaultProps), n.props),
                o = a.layout
              return o === 'vertical' && U(n.props.height)
                ? { height: n.props.height }
                : o === 'horizontal'
                  ? { width: n.props.width || i }
                  : null
            },
          },
        ],
      )
    )
  })(A.PureComponent)
_u(di, 'displayName', 'Legend')
_u(di, 'defaultProps', {
  iconSize: 14,
  layout: 'horizontal',
  align: 'center',
  verticalAlign: 'bottom',
})
var $y = Qo,
  PL = Hh,
  $L = ht,
  Ey = $y ? $y.isConcatSpreadable : void 0
function EL(e) {
  return $L(e) || PL(e) || !!(Ey && e && e[Ey])
}
var _L = EL,
  CL = ew,
  jL = _L
function vw(e, t, r, n, i) {
  var a = -1,
    o = e.length
  for (r || (r = jL), i || (i = []); ++a < o; ) {
    var s = e[a]
    t > 0 && r(s)
      ? t > 1
        ? vw(s, t - 1, r, n, i)
        : CL(i, s)
      : n || (i[i.length] = s)
  }
  return i
}
var yw = vw
function TL(e) {
  return function (t, r, n) {
    for (var i = -1, a = Object(t), o = n(t), s = o.length; s--; ) {
      var c = o[e ? s : ++i]
      if (r(a[c], c, a) === !1) break
    }
    return t
  }
}
var kL = TL,
  ML = kL,
  NL = ML(),
  IL = NL,
  RL = IL,
  DL = Eu
function LL(e, t) {
  return e && RL(e, t, DL)
}
var mw = LL,
  BL = es
function FL(e, t) {
  return function (r, n) {
    if (r == null) return r
    if (!BL(r)) return e(r, n)
    for (
      var i = r.length, a = t ? i : -1, o = Object(r);
      (t ? a-- : ++a < i) && n(o[a], a, o) !== !1;

    );
    return r
  }
}
var UL = FL,
  WL = mw,
  qL = UL,
  HL = qL(WL),
  Vh = HL,
  zL = Vh,
  KL = es
function GL(e, t) {
  var r = -1,
    n = KL(e) ? Array(e.length) : []
  return (
    zL(e, function (i, a, o) {
      n[++r] = t(i, a, o)
    }),
    n
  )
}
var gw = GL
function VL(e, t) {
  var r = e.length
  for (e.sort(t); r--; ) e[r] = e[r].value
  return e
}
var XL = VL,
  _y = da
function YL(e, t) {
  if (e !== t) {
    var r = e !== void 0,
      n = e === null,
      i = e === e,
      a = _y(e),
      o = t !== void 0,
      s = t === null,
      c = t === t,
      u = _y(t)
    if (
      (!s && !u && !a && e > t) ||
      (a && o && c && !s && !u) ||
      (n && o && c) ||
      (!r && c) ||
      !i
    )
      return 1
    if (
      (!n && !a && !u && e < t) ||
      (u && r && i && !n && !a) ||
      (s && r && i) ||
      (!o && i) ||
      !c
    )
      return -1
  }
  return 0
}
var QL = YL,
  ZL = QL
function JL(e, t, r) {
  for (
    var n = -1, i = e.criteria, a = t.criteria, o = i.length, s = r.length;
    ++n < o;

  ) {
    var c = ZL(i[n], a[n])
    if (c) {
      if (n >= s) return c
      var u = r[n]
      return c * (u == 'desc' ? -1 : 1)
    }
  }
  return e.index - t.index
}
var eB = JL,
  xl = kh,
  tB = Mh,
  rB = fr,
  nB = gw,
  iB = XL,
  aB = nw,
  oB = eB,
  sB = xa,
  cB = ht
function uB(e, t, r) {
  t.length
    ? (t = xl(t, function (a) {
        return cB(a)
          ? function (o) {
              return tB(o, a.length === 1 ? a[0] : a)
            }
          : a
      }))
    : (t = [sB])
  var n = -1
  t = xl(t, aB(rB))
  var i = nB(e, function (a, o, s) {
    var c = xl(t, function (u) {
      return u(a)
    })
    return { criteria: c, index: ++n, value: a }
  })
  return iB(i, function (a, o) {
    return oB(a, o, r)
  })
}
var lB = uB
function fB(e, t, r) {
  switch (r.length) {
    case 0:
      return e.call(t)
    case 1:
      return e.call(t, r[0])
    case 2:
      return e.call(t, r[0], r[1])
    case 3:
      return e.call(t, r[0], r[1], r[2])
  }
  return e.apply(t, r)
}
var dB = fB,
  hB = dB,
  Cy = Math.max
function pB(e, t, r) {
  return (
    (t = Cy(t === void 0 ? e.length - 1 : t, 0)),
    function () {
      for (
        var n = arguments, i = -1, a = Cy(n.length - t, 0), o = Array(a);
        ++i < a;

      )
        o[i] = n[t + i]
      i = -1
      for (var s = Array(t + 1); ++i < t; ) s[i] = n[i]
      return (s[t] = r(o)), hB(e, this, s)
    }
  )
}
var vB = pB
function yB(e) {
  return function () {
    return e
  }
}
var mB = yB,
  gB = zn,
  bB = (function () {
    try {
      var e = gB(Object, 'defineProperty')
      return e({}, '', {}), e
    } catch {}
  })(),
  bw = bB,
  xB = mB,
  jy = bw,
  wB = xa,
  OB = jy
    ? function (e, t) {
        return jy(e, 'toString', {
          configurable: !0,
          enumerable: !1,
          value: xB(t),
          writable: !0,
        })
      }
    : wB,
  SB = OB,
  AB = 800,
  PB = 16,
  $B = Date.now
function EB(e) {
  var t = 0,
    r = 0
  return function () {
    var n = $B(),
      i = PB - (n - r)
    if (((r = n), i > 0)) {
      if (++t >= AB) return arguments[0]
    } else t = 0
    return e.apply(void 0, arguments)
  }
}
var _B = EB,
  CB = SB,
  jB = _B,
  TB = jB(CB),
  kB = TB,
  MB = xa,
  NB = vB,
  IB = kB
function RB(e, t) {
  return IB(NB(e, t, MB), e + '')
}
var DB = RB,
  LB = _h,
  BB = es,
  FB = zh,
  UB = sn
function WB(e, t, r) {
  if (!UB(r)) return !1
  var n = typeof t
  return (n == 'number' ? BB(r) && FB(t, r.length) : n == 'string' && t in r)
    ? LB(r[t], e)
    : !1
}
var Cu = WB,
  qB = yw,
  HB = lB,
  zB = DB,
  Ty = Cu,
  KB = zB(function (e, t) {
    if (e == null) return []
    var r = t.length
    return (
      r > 1 && Ty(e, t[0], t[1])
        ? (t = [])
        : r > 2 && Ty(t[0], t[1], t[2]) && (t = [t[0]]),
      HB(e, qB(t, 1), [])
    )
  }),
  GB = KB
const Xh = me(GB)
function co(e) {
  '@babel/helpers - typeof'
  return (
    (co =
      typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
        ? function (t) {
            return typeof t
          }
        : function (t) {
            return t &&
              typeof Symbol == 'function' &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? 'symbol'
              : typeof t
          }),
    co(e)
  )
}
function Lf() {
  return (
    (Lf = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t]
            for (var n in r)
              Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
          }
          return e
        }),
    Lf.apply(this, arguments)
  )
}
function VB(e, t) {
  return ZB(e) || QB(e, t) || YB(e, t) || XB()
}
function XB() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}
function YB(e, t) {
  if (e) {
    if (typeof e == 'string') return ky(e, t)
    var r = Object.prototype.toString.call(e).slice(8, -1)
    if (
      (r === 'Object' && e.constructor && (r = e.constructor.name),
      r === 'Map' || r === 'Set')
    )
      return Array.from(e)
    if (r === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
      return ky(e, t)
  }
}
function ky(e, t) {
  ;(t == null || t > e.length) && (t = e.length)
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r]
  return n
}
function QB(e, t) {
  var r =
    e == null
      ? null
      : (typeof Symbol < 'u' && e[Symbol.iterator]) || e['@@iterator']
  if (r != null) {
    var n,
      i,
      a,
      o,
      s = [],
      c = !0,
      u = !1
    try {
      if (((a = (r = r.call(e)).next), t !== 0))
        for (
          ;
          !(c = (n = a.call(r)).done) && (s.push(n.value), s.length !== t);
          c = !0
        );
    } catch (l) {
      ;(u = !0), (i = l)
    } finally {
      try {
        if (!c && r.return != null && ((o = r.return()), Object(o) !== o))
          return
      } finally {
        if (u) throw i
      }
    }
    return s
  }
}
function ZB(e) {
  if (Array.isArray(e)) return e
}
function My(e, t) {
  var r = Object.keys(e)
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e)
    t &&
      (n = n.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable
      })),
      r.push.apply(r, n)
  }
  return r
}
function wl(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {}
    t % 2
      ? My(Object(r), !0).forEach(function (n) {
          JB(e, n, r[n])
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
        : My(Object(r)).forEach(function (n) {
            Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
          })
  }
  return e
}
function JB(e, t, r) {
  return (
    (t = e5(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  )
}
function e5(e) {
  var t = t5(e, 'string')
  return co(t) == 'symbol' ? t : t + ''
}
function t5(e, t) {
  if (co(e) != 'object' || !e) return e
  var r = e[Symbol.toPrimitive]
  if (r !== void 0) {
    var n = r.call(e, t || 'default')
    if (co(n) != 'object') return n
    throw new TypeError('@@toPrimitive must return a primitive value.')
  }
  return (t === 'string' ? String : Number)(e)
}
function r5(e) {
  return Array.isArray(e) && We(e[0]) && We(e[1]) ? e.join(' ~ ') : e
}
var n5 = function (t) {
  var r = t.separator,
    n = r === void 0 ? ' : ' : r,
    i = t.contentStyle,
    a = i === void 0 ? {} : i,
    o = t.itemStyle,
    s = o === void 0 ? {} : o,
    c = t.labelStyle,
    u = c === void 0 ? {} : c,
    l = t.payload,
    f = t.formatter,
    d = t.itemSorter,
    h = t.wrapperClassName,
    y = t.labelClassName,
    v = t.label,
    p = t.labelFormatter,
    x = t.accessibilityLayer,
    b = x === void 0 ? !1 : x,
    w = function () {
      if (l && l.length) {
        var j = { padding: 0, margin: 0 },
          M = (d ? Xh(l, d) : l).map(function (N, R) {
            if (N.type === 'none') return null
            var I = wl(
                {
                  display: 'block',
                  paddingTop: 4,
                  paddingBottom: 4,
                  color: N.color || '#000',
                },
                s,
              ),
              L = N.formatter || f || r5,
              B = N.value,
              W = N.name,
              G = B,
              z = W
            if (L && G != null && z != null) {
              var H = L(B, W, N, R, l)
              if (Array.isArray(H)) {
                var Q = VB(H, 2)
                ;(G = Q[0]), (z = Q[1])
              } else G = H
            }
            return E.createElement(
              'li',
              {
                className: 'recharts-tooltip-item',
                key: 'tooltip-item-'.concat(R),
                style: I,
              },
              We(z)
                ? E.createElement(
                    'span',
                    { className: 'recharts-tooltip-item-name' },
                    z,
                  )
                : null,
              We(z)
                ? E.createElement(
                    'span',
                    { className: 'recharts-tooltip-item-separator' },
                    n,
                  )
                : null,
              E.createElement(
                'span',
                { className: 'recharts-tooltip-item-value' },
                G,
              ),
              E.createElement(
                'span',
                { className: 'recharts-tooltip-item-unit' },
                N.unit || '',
              ),
            )
          })
        return E.createElement(
          'ul',
          { className: 'recharts-tooltip-item-list', style: j },
          M,
        )
      }
      return null
    },
    g = wl(
      {
        margin: 0,
        padding: 10,
        backgroundColor: '#fff',
        border: '1px solid #ccc',
        whiteSpace: 'nowrap',
      },
      a,
    ),
    m = wl({ margin: 0 }, u),
    S = !se(v),
    P = S ? v : '',
    $ = ue('recharts-default-tooltip', h),
    T = ue('recharts-tooltip-label', y)
  S && p && l !== void 0 && l !== null && (P = p(v, l))
  var k = b ? { role: 'status', 'aria-live': 'assertive' } : {}
  return E.createElement(
    'div',
    Lf({ className: $, style: g }, k),
    E.createElement(
      'p',
      { className: T, style: m },
      E.isValidElement(P) ? P : ''.concat(P),
    ),
    w(),
  )
}
function uo(e) {
  '@babel/helpers - typeof'
  return (
    (uo =
      typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
        ? function (t) {
            return typeof t
          }
        : function (t) {
            return t &&
              typeof Symbol == 'function' &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? 'symbol'
              : typeof t
          }),
    uo(e)
  )
}
function bs(e, t, r) {
  return (
    (t = i5(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  )
}
function i5(e) {
  var t = a5(e, 'string')
  return uo(t) == 'symbol' ? t : t + ''
}
function a5(e, t) {
  if (uo(e) != 'object' || !e) return e
  var r = e[Symbol.toPrimitive]
  if (r !== void 0) {
    var n = r.call(e, t || 'default')
    if (uo(n) != 'object') return n
    throw new TypeError('@@toPrimitive must return a primitive value.')
  }
  return (t === 'string' ? String : Number)(e)
}
var Ta = 'recharts-tooltip-wrapper',
  o5 = { visibility: 'hidden' }
function s5(e) {
  var t = e.coordinate,
    r = e.translateX,
    n = e.translateY
  return ue(
    Ta,
    bs(
      bs(
        bs(
          bs({}, ''.concat(Ta, '-right'), U(r) && t && U(t.x) && r >= t.x),
          ''.concat(Ta, '-left'),
          U(r) && t && U(t.x) && r < t.x,
        ),
        ''.concat(Ta, '-bottom'),
        U(n) && t && U(t.y) && n >= t.y,
      ),
      ''.concat(Ta, '-top'),
      U(n) && t && U(t.y) && n < t.y,
    ),
  )
}
function Ny(e) {
  var t = e.allowEscapeViewBox,
    r = e.coordinate,
    n = e.key,
    i = e.offsetTopLeft,
    a = e.position,
    o = e.reverseDirection,
    s = e.tooltipDimension,
    c = e.viewBox,
    u = e.viewBoxDimension
  if (a && U(a[n])) return a[n]
  var l = r[n] - s - i,
    f = r[n] + i
  if (t[n]) return o[n] ? l : f
  if (o[n]) {
    var d = l,
      h = c[n]
    return d < h ? Math.max(f, c[n]) : Math.max(l, c[n])
  }
  var y = f + s,
    v = c[n] + u
  return y > v ? Math.max(l, c[n]) : Math.max(f, c[n])
}
function c5(e) {
  var t = e.translateX,
    r = e.translateY,
    n = e.useTranslate3d
  return {
    transform: n
      ? 'translate3d('.concat(t, 'px, ').concat(r, 'px, 0)')
      : 'translate('.concat(t, 'px, ').concat(r, 'px)'),
  }
}
function u5(e) {
  var t = e.allowEscapeViewBox,
    r = e.coordinate,
    n = e.offsetTopLeft,
    i = e.position,
    a = e.reverseDirection,
    o = e.tooltipBox,
    s = e.useTranslate3d,
    c = e.viewBox,
    u,
    l,
    f
  return (
    o.height > 0 && o.width > 0 && r
      ? ((l = Ny({
          allowEscapeViewBox: t,
          coordinate: r,
          key: 'x',
          offsetTopLeft: n,
          position: i,
          reverseDirection: a,
          tooltipDimension: o.width,
          viewBox: c,
          viewBoxDimension: c.width,
        })),
        (f = Ny({
          allowEscapeViewBox: t,
          coordinate: r,
          key: 'y',
          offsetTopLeft: n,
          position: i,
          reverseDirection: a,
          tooltipDimension: o.height,
          viewBox: c,
          viewBoxDimension: c.height,
        })),
        (u = c5({ translateX: l, translateY: f, useTranslate3d: s })))
      : (u = o5),
    {
      cssProperties: u,
      cssClasses: s5({ translateX: l, translateY: f, coordinate: r }),
    }
  )
}
function Li(e) {
  '@babel/helpers - typeof'
  return (
    (Li =
      typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
        ? function (t) {
            return typeof t
          }
        : function (t) {
            return t &&
              typeof Symbol == 'function' &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? 'symbol'
              : typeof t
          }),
    Li(e)
  )
}
function Iy(e, t) {
  var r = Object.keys(e)
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e)
    t &&
      (n = n.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable
      })),
      r.push.apply(r, n)
  }
  return r
}
function Ry(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {}
    t % 2
      ? Iy(Object(r), !0).forEach(function (n) {
          Ff(e, n, r[n])
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
        : Iy(Object(r)).forEach(function (n) {
            Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
          })
  }
  return e
}
function l5(e, t) {
  if (!(e instanceof t))
    throw new TypeError('Cannot call a class as a function')
}
function f5(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r]
    ;(n.enumerable = n.enumerable || !1),
      (n.configurable = !0),
      'value' in n && (n.writable = !0),
      Object.defineProperty(e, ww(n.key), n)
  }
}
function d5(e, t, r) {
  return (
    t && f5(e.prototype, t),
    Object.defineProperty(e, 'prototype', { writable: !1 }),
    e
  )
}
function h5(e, t, r) {
  return (
    (t = oc(t)),
    p5(
      e,
      xw() ? Reflect.construct(t, r || [], oc(e).constructor) : t.apply(e, r),
    )
  )
}
function p5(e, t) {
  if (t && (Li(t) === 'object' || typeof t == 'function')) return t
  if (t !== void 0)
    throw new TypeError(
      'Derived constructors may only return object or undefined',
    )
  return v5(e)
}
function v5(e) {
  if (e === void 0)
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called",
    )
  return e
}
function xw() {
  try {
    var e = !Boolean.prototype.valueOf.call(
      Reflect.construct(Boolean, [], function () {}),
    )
  } catch {}
  return (xw = function () {
    return !!e
  })()
}
function oc(e) {
  return (
    (oc = Object.setPrototypeOf
      ? Object.getPrototypeOf.bind()
      : function (r) {
          return r.__proto__ || Object.getPrototypeOf(r)
        }),
    oc(e)
  )
}
function y5(e, t) {
  if (typeof t != 'function' && t !== null)
    throw new TypeError('Super expression must either be null or a function')
  ;(e.prototype = Object.create(t && t.prototype, {
    constructor: { value: e, writable: !0, configurable: !0 },
  })),
    Object.defineProperty(e, 'prototype', { writable: !1 }),
    t && Bf(e, t)
}
function Bf(e, t) {
  return (
    (Bf = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (n, i) {
          return (n.__proto__ = i), n
        }),
    Bf(e, t)
  )
}
function Ff(e, t, r) {
  return (
    (t = ww(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  )
}
function ww(e) {
  var t = m5(e, 'string')
  return Li(t) == 'symbol' ? t : t + ''
}
function m5(e, t) {
  if (Li(e) != 'object' || !e) return e
  var r = e[Symbol.toPrimitive]
  if (r !== void 0) {
    var n = r.call(e, t || 'default')
    if (Li(n) != 'object') return n
    throw new TypeError('@@toPrimitive must return a primitive value.')
  }
  return (t === 'string' ? String : Number)(e)
}
var Dy = 1,
  g5 = (function (e) {
    function t() {
      var r
      l5(this, t)
      for (var n = arguments.length, i = new Array(n), a = 0; a < n; a++)
        i[a] = arguments[a]
      return (
        (r = h5(this, t, [].concat(i))),
        Ff(r, 'state', {
          dismissed: !1,
          dismissedAtCoordinate: { x: 0, y: 0 },
          lastBoundingBox: { width: -1, height: -1 },
        }),
        Ff(r, 'handleKeyDown', function (o) {
          if (o.key === 'Escape') {
            var s, c, u, l
            r.setState({
              dismissed: !0,
              dismissedAtCoordinate: {
                x:
                  (s =
                    (c = r.props.coordinate) === null || c === void 0
                      ? void 0
                      : c.x) !== null && s !== void 0
                    ? s
                    : 0,
                y:
                  (u =
                    (l = r.props.coordinate) === null || l === void 0
                      ? void 0
                      : l.y) !== null && u !== void 0
                    ? u
                    : 0,
              },
            })
          }
        }),
        r
      )
    }
    return (
      y5(t, e),
      d5(t, [
        {
          key: 'updateBBox',
          value: function () {
            if (this.wrapperNode && this.wrapperNode.getBoundingClientRect) {
              var n = this.wrapperNode.getBoundingClientRect()
              ;(Math.abs(n.width - this.state.lastBoundingBox.width) > Dy ||
                Math.abs(n.height - this.state.lastBoundingBox.height) > Dy) &&
                this.setState({
                  lastBoundingBox: { width: n.width, height: n.height },
                })
            } else
              (this.state.lastBoundingBox.width !== -1 ||
                this.state.lastBoundingBox.height !== -1) &&
                this.setState({ lastBoundingBox: { width: -1, height: -1 } })
          },
        },
        {
          key: 'componentDidMount',
          value: function () {
            document.addEventListener('keydown', this.handleKeyDown),
              this.updateBBox()
          },
        },
        {
          key: 'componentWillUnmount',
          value: function () {
            document.removeEventListener('keydown', this.handleKeyDown)
          },
        },
        {
          key: 'componentDidUpdate',
          value: function () {
            var n, i
            this.props.active && this.updateBBox(),
              this.state.dismissed &&
                (((n = this.props.coordinate) === null || n === void 0
                  ? void 0
                  : n.x) !== this.state.dismissedAtCoordinate.x ||
                  ((i = this.props.coordinate) === null || i === void 0
                    ? void 0
                    : i.y) !== this.state.dismissedAtCoordinate.y) &&
                (this.state.dismissed = !1)
          },
        },
        {
          key: 'render',
          value: function () {
            var n = this,
              i = this.props,
              a = i.active,
              o = i.allowEscapeViewBox,
              s = i.animationDuration,
              c = i.animationEasing,
              u = i.children,
              l = i.coordinate,
              f = i.hasPayload,
              d = i.isAnimationActive,
              h = i.offset,
              y = i.position,
              v = i.reverseDirection,
              p = i.useTranslate3d,
              x = i.viewBox,
              b = i.wrapperStyle,
              w = u5({
                allowEscapeViewBox: o,
                coordinate: l,
                offsetTopLeft: h,
                position: y,
                reverseDirection: v,
                tooltipBox: this.state.lastBoundingBox,
                useTranslate3d: p,
                viewBox: x,
              }),
              g = w.cssClasses,
              m = w.cssProperties,
              S = Ry(
                Ry(
                  {
                    transition:
                      d && a ? 'transform '.concat(s, 'ms ').concat(c) : void 0,
                  },
                  m,
                ),
                {},
                {
                  pointerEvents: 'none',
                  visibility:
                    !this.state.dismissed && a && f ? 'visible' : 'hidden',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                },
                b,
              )
            return E.createElement(
              'div',
              {
                tabIndex: -1,
                className: g,
                style: S,
                ref: function ($) {
                  n.wrapperNode = $
                },
              },
              u,
            )
          },
        },
      ])
    )
  })(A.PureComponent),
  b5 = function () {
    return !(
      typeof window < 'u' &&
      window.document &&
      window.document.createElement &&
      window.setTimeout
    )
  },
  nr = {
    isSsr: b5(),
    get: function (t) {
      return nr[t]
    },
    set: function (t, r) {
      if (typeof t == 'string') nr[t] = r
      else {
        var n = Object.keys(t)
        n &&
          n.length &&
          n.forEach(function (i) {
            nr[i] = t[i]
          })
      }
    },
  }
function Bi(e) {
  '@babel/helpers - typeof'
  return (
    (Bi =
      typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
        ? function (t) {
            return typeof t
          }
        : function (t) {
            return t &&
              typeof Symbol == 'function' &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? 'symbol'
              : typeof t
          }),
    Bi(e)
  )
}
function Ly(e, t) {
  var r = Object.keys(e)
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e)
    t &&
      (n = n.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable
      })),
      r.push.apply(r, n)
  }
  return r
}
function By(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {}
    t % 2
      ? Ly(Object(r), !0).forEach(function (n) {
          Yh(e, n, r[n])
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
        : Ly(Object(r)).forEach(function (n) {
            Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
          })
  }
  return e
}
function x5(e, t) {
  if (!(e instanceof t))
    throw new TypeError('Cannot call a class as a function')
}
function w5(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r]
    ;(n.enumerable = n.enumerable || !1),
      (n.configurable = !0),
      'value' in n && (n.writable = !0),
      Object.defineProperty(e, Sw(n.key), n)
  }
}
function O5(e, t, r) {
  return (
    t && w5(e.prototype, t),
    Object.defineProperty(e, 'prototype', { writable: !1 }),
    e
  )
}
function S5(e, t, r) {
  return (
    (t = sc(t)),
    A5(
      e,
      Ow() ? Reflect.construct(t, r || [], sc(e).constructor) : t.apply(e, r),
    )
  )
}
function A5(e, t) {
  if (t && (Bi(t) === 'object' || typeof t == 'function')) return t
  if (t !== void 0)
    throw new TypeError(
      'Derived constructors may only return object or undefined',
    )
  return P5(e)
}
function P5(e) {
  if (e === void 0)
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called",
    )
  return e
}
function Ow() {
  try {
    var e = !Boolean.prototype.valueOf.call(
      Reflect.construct(Boolean, [], function () {}),
    )
  } catch {}
  return (Ow = function () {
    return !!e
  })()
}
function sc(e) {
  return (
    (sc = Object.setPrototypeOf
      ? Object.getPrototypeOf.bind()
      : function (r) {
          return r.__proto__ || Object.getPrototypeOf(r)
        }),
    sc(e)
  )
}
function $5(e, t) {
  if (typeof t != 'function' && t !== null)
    throw new TypeError('Super expression must either be null or a function')
  ;(e.prototype = Object.create(t && t.prototype, {
    constructor: { value: e, writable: !0, configurable: !0 },
  })),
    Object.defineProperty(e, 'prototype', { writable: !1 }),
    t && Uf(e, t)
}
function Uf(e, t) {
  return (
    (Uf = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (n, i) {
          return (n.__proto__ = i), n
        }),
    Uf(e, t)
  )
}
function Yh(e, t, r) {
  return (
    (t = Sw(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  )
}
function Sw(e) {
  var t = E5(e, 'string')
  return Bi(t) == 'symbol' ? t : t + ''
}
function E5(e, t) {
  if (Bi(e) != 'object' || !e) return e
  var r = e[Symbol.toPrimitive]
  if (r !== void 0) {
    var n = r.call(e, t || 'default')
    if (Bi(n) != 'object') return n
    throw new TypeError('@@toPrimitive must return a primitive value.')
  }
  return (t === 'string' ? String : Number)(e)
}
function _5(e) {
  return e.dataKey
}
function C5(e, t) {
  return E.isValidElement(e)
    ? E.cloneElement(e, t)
    : typeof e == 'function'
      ? E.createElement(e, t)
      : E.createElement(n5, t)
}
var Ct = (function (e) {
  function t() {
    return x5(this, t), S5(this, t, arguments)
  }
  return (
    $5(t, e),
    O5(t, [
      {
        key: 'render',
        value: function () {
          var n = this,
            i = this.props,
            a = i.active,
            o = i.allowEscapeViewBox,
            s = i.animationDuration,
            c = i.animationEasing,
            u = i.content,
            l = i.coordinate,
            f = i.filterNull,
            d = i.isAnimationActive,
            h = i.offset,
            y = i.payload,
            v = i.payloadUniqBy,
            p = i.position,
            x = i.reverseDirection,
            b = i.useTranslate3d,
            w = i.viewBox,
            g = i.wrapperStyle,
            m = y ?? []
          f &&
            m.length &&
            (m = dw(
              y.filter(function (P) {
                return (
                  P.value != null && (P.hide !== !0 || n.props.includeHidden)
                )
              }),
              v,
              _5,
            ))
          var S = m.length > 0
          return E.createElement(
            g5,
            {
              allowEscapeViewBox: o,
              animationDuration: s,
              animationEasing: c,
              isAnimationActive: d,
              active: a,
              coordinate: l,
              hasPayload: S,
              offset: h,
              position: p,
              reverseDirection: x,
              useTranslate3d: b,
              viewBox: w,
              wrapperStyle: g,
            },
            C5(u, By(By({}, this.props), {}, { payload: m })),
          )
        },
      },
    ])
  )
})(A.PureComponent)
Yh(Ct, 'displayName', 'Tooltip')
Yh(Ct, 'defaultProps', {
  accessibilityLayer: !1,
  allowEscapeViewBox: { x: !1, y: !1 },
  animationDuration: 400,
  animationEasing: 'ease',
  contentStyle: {},
  coordinate: { x: 0, y: 0 },
  cursor: !0,
  cursorStyle: {},
  filterNull: !0,
  isAnimationActive: !nr.isSsr,
  itemStyle: {},
  labelStyle: {},
  offset: 10,
  reverseDirection: { x: !1, y: !1 },
  separator: ' : ',
  trigger: 'hover',
  useTranslate3d: !1,
  viewBox: { x: 0, y: 0, height: 0, width: 0 },
  wrapperStyle: {},
})
var j5 = lr,
  T5 = function () {
    return j5.Date.now()
  },
  k5 = T5,
  M5 = /\s/
function N5(e) {
  for (var t = e.length; t-- && M5.test(e.charAt(t)); );
  return t
}
var I5 = N5,
  R5 = I5,
  D5 = /^\s+/
function L5(e) {
  return e && e.slice(0, R5(e) + 1).replace(D5, '')
}
var B5 = L5,
  F5 = B5,
  Fy = sn,
  U5 = da,
  Uy = NaN,
  W5 = /^[-+]0x[0-9a-f]+$/i,
  q5 = /^0b[01]+$/i,
  H5 = /^0o[0-7]+$/i,
  z5 = parseInt
function K5(e) {
  if (typeof e == 'number') return e
  if (U5(e)) return Uy
  if (Fy(e)) {
    var t = typeof e.valueOf == 'function' ? e.valueOf() : e
    e = Fy(t) ? t + '' : t
  }
  if (typeof e != 'string') return e === 0 ? e : +e
  e = F5(e)
  var r = q5.test(e)
  return r || H5.test(e) ? z5(e.slice(2), r ? 2 : 8) : W5.test(e) ? Uy : +e
}
var Aw = K5,
  G5 = sn,
  Ol = k5,
  Wy = Aw,
  V5 = 'Expected a function',
  X5 = Math.max,
  Y5 = Math.min
function Q5(e, t, r) {
  var n,
    i,
    a,
    o,
    s,
    c,
    u = 0,
    l = !1,
    f = !1,
    d = !0
  if (typeof e != 'function') throw new TypeError(V5)
  ;(t = Wy(t) || 0),
    G5(r) &&
      ((l = !!r.leading),
      (f = 'maxWait' in r),
      (a = f ? X5(Wy(r.maxWait) || 0, t) : a),
      (d = 'trailing' in r ? !!r.trailing : d))
  function h(S) {
    var P = n,
      $ = i
    return (n = i = void 0), (u = S), (o = e.apply($, P)), o
  }
  function y(S) {
    return (u = S), (s = setTimeout(x, t)), l ? h(S) : o
  }
  function v(S) {
    var P = S - c,
      $ = S - u,
      T = t - P
    return f ? Y5(T, a - $) : T
  }
  function p(S) {
    var P = S - c,
      $ = S - u
    return c === void 0 || P >= t || P < 0 || (f && $ >= a)
  }
  function x() {
    var S = Ol()
    if (p(S)) return b(S)
    s = setTimeout(x, v(S))
  }
  function b(S) {
    return (s = void 0), d && n ? h(S) : ((n = i = void 0), o)
  }
  function w() {
    s !== void 0 && clearTimeout(s), (u = 0), (n = c = i = s = void 0)
  }
  function g() {
    return s === void 0 ? o : b(Ol())
  }
  function m() {
    var S = Ol(),
      P = p(S)
    if (((n = arguments), (i = this), (c = S), P)) {
      if (s === void 0) return y(c)
      if (f) return clearTimeout(s), (s = setTimeout(x, t)), h(c)
    }
    return s === void 0 && (s = setTimeout(x, t)), o
  }
  return (m.cancel = w), (m.flush = g), m
}
var Z5 = Q5,
  J5 = Z5,
  e8 = sn,
  t8 = 'Expected a function'
function r8(e, t, r) {
  var n = !0,
    i = !0
  if (typeof e != 'function') throw new TypeError(t8)
  return (
    e8(r) &&
      ((n = 'leading' in r ? !!r.leading : n),
      (i = 'trailing' in r ? !!r.trailing : i)),
    J5(e, t, { leading: n, maxWait: t, trailing: i })
  )
}
var n8 = r8
const Pw = me(n8)
function lo(e) {
  '@babel/helpers - typeof'
  return (
    (lo =
      typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
        ? function (t) {
            return typeof t
          }
        : function (t) {
            return t &&
              typeof Symbol == 'function' &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? 'symbol'
              : typeof t
          }),
    lo(e)
  )
}
function qy(e, t) {
  var r = Object.keys(e)
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e)
    t &&
      (n = n.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable
      })),
      r.push.apply(r, n)
  }
  return r
}
function xs(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {}
    t % 2
      ? qy(Object(r), !0).forEach(function (n) {
          i8(e, n, r[n])
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
        : qy(Object(r)).forEach(function (n) {
            Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
          })
  }
  return e
}
function i8(e, t, r) {
  return (
    (t = a8(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  )
}
function a8(e) {
  var t = o8(e, 'string')
  return lo(t) == 'symbol' ? t : t + ''
}
function o8(e, t) {
  if (lo(e) != 'object' || !e) return e
  var r = e[Symbol.toPrimitive]
  if (r !== void 0) {
    var n = r.call(e, t || 'default')
    if (lo(n) != 'object') return n
    throw new TypeError('@@toPrimitive must return a primitive value.')
  }
  return (t === 'string' ? String : Number)(e)
}
function s8(e, t) {
  return f8(e) || l8(e, t) || u8(e, t) || c8()
}
function c8() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}
function u8(e, t) {
  if (e) {
    if (typeof e == 'string') return Hy(e, t)
    var r = Object.prototype.toString.call(e).slice(8, -1)
    if (
      (r === 'Object' && e.constructor && (r = e.constructor.name),
      r === 'Map' || r === 'Set')
    )
      return Array.from(e)
    if (r === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
      return Hy(e, t)
  }
}
function Hy(e, t) {
  ;(t == null || t > e.length) && (t = e.length)
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r]
  return n
}
function l8(e, t) {
  var r =
    e == null
      ? null
      : (typeof Symbol < 'u' && e[Symbol.iterator]) || e['@@iterator']
  if (r != null) {
    var n,
      i,
      a,
      o,
      s = [],
      c = !0,
      u = !1
    try {
      if (((a = (r = r.call(e)).next), t !== 0))
        for (
          ;
          !(c = (n = a.call(r)).done) && (s.push(n.value), s.length !== t);
          c = !0
        );
    } catch (l) {
      ;(u = !0), (i = l)
    } finally {
      try {
        if (!c && r.return != null && ((o = r.return()), Object(o) !== o))
          return
      } finally {
        if (u) throw i
      }
    }
    return s
  }
}
function f8(e) {
  if (Array.isArray(e)) return e
}
var d8 = A.forwardRef(function (e, t) {
    var r = e.aspect,
      n = e.initialDimension,
      i = n === void 0 ? { width: -1, height: -1 } : n,
      a = e.width,
      o = a === void 0 ? '100%' : a,
      s = e.height,
      c = s === void 0 ? '100%' : s,
      u = e.minWidth,
      l = u === void 0 ? 0 : u,
      f = e.minHeight,
      d = e.maxHeight,
      h = e.children,
      y = e.debounce,
      v = y === void 0 ? 0 : y,
      p = e.id,
      x = e.className,
      b = e.onResize,
      w = e.style,
      g = w === void 0 ? {} : w,
      m = A.useRef(null),
      S = A.useRef()
    ;(S.current = b),
      A.useImperativeHandle(t, function () {
        return Object.defineProperty(m.current, 'current', {
          get: function () {
            return (
              console.warn(
                'The usage of ref.current.current is deprecated and will no longer be supported.',
              ),
              m.current
            )
          },
          configurable: !0,
        })
      })
    var P = A.useState({ containerWidth: i.width, containerHeight: i.height }),
      $ = s8(P, 2),
      T = $[0],
      k = $[1],
      C = A.useCallback(function (M, N) {
        k(function (R) {
          var I = Math.round(M),
            L = Math.round(N)
          return R.containerWidth === I && R.containerHeight === L
            ? R
            : { containerWidth: I, containerHeight: L }
        })
      }, [])
    A.useEffect(
      function () {
        var M = function (W) {
          var G,
            z = W[0].contentRect,
            H = z.width,
            Q = z.height
          C(H, Q), (G = S.current) === null || G === void 0 || G.call(S, H, Q)
        }
        v > 0 && (M = Pw(M, v, { trailing: !0, leading: !1 }))
        var N = new ResizeObserver(M),
          R = m.current.getBoundingClientRect(),
          I = R.width,
          L = R.height
        return (
          C(I, L),
          N.observe(m.current),
          function () {
            N.disconnect()
          }
        )
      },
      [C, v],
    )
    var j = A.useMemo(
      function () {
        var M = T.containerWidth,
          N = T.containerHeight
        if (M < 0 || N < 0) return null
        Gt(
          bn(o) || bn(c),
          `The width(%s) and height(%s) are both fixed numbers,
       maybe you don't need to use a ResponsiveContainer.`,
          o,
          c,
        ),
          Gt(!r || r > 0, 'The aspect(%s) must be greater than zero.', r)
        var R = bn(o) ? M : o,
          I = bn(c) ? N : c
        r &&
          r > 0 &&
          (R ? (I = R / r) : I && (R = I * r), d && I > d && (I = d)),
          Gt(
            R > 0 || I > 0,
            `The width(%s) and height(%s) of chart should be greater than 0,
       please check the style of container, or the props width(%s) and height(%s),
       or add a minWidth(%s) or minHeight(%s) or use aspect(%s) to control the
       height and width.`,
            R,
            I,
            o,
            c,
            l,
            f,
            r,
          )
        var L = !Array.isArray(h) && Or(h.type).endsWith('Chart')
        return E.Children.map(h, function (B) {
          return w1.isElement(B)
            ? A.cloneElement(
                B,
                xs(
                  { width: R, height: I },
                  L
                    ? {
                        style: xs(
                          {
                            height: '100%',
                            width: '100%',
                            maxHeight: I,
                            maxWidth: R,
                          },
                          B.props.style,
                        ),
                      }
                    : {},
                ),
              )
            : B
        })
      },
      [r, h, c, d, f, l, T, o],
    )
    return E.createElement(
      'div',
      {
        id: p ? ''.concat(p) : void 0,
        className: ue('recharts-responsive-container', x),
        style: xs(
          xs({}, g),
          {},
          { width: o, height: c, minWidth: l, minHeight: f, maxHeight: d },
        ),
        ref: m,
      },
      j,
    )
  }),
  ju = function (t) {
    return null
  }
ju.displayName = 'Cell'
function fo(e) {
  '@babel/helpers - typeof'
  return (
    (fo =
      typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
        ? function (t) {
            return typeof t
          }
        : function (t) {
            return t &&
              typeof Symbol == 'function' &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? 'symbol'
              : typeof t
          }),
    fo(e)
  )
}
function zy(e, t) {
  var r = Object.keys(e)
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e)
    t &&
      (n = n.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable
      })),
      r.push.apply(r, n)
  }
  return r
}
function Wf(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {}
    t % 2
      ? zy(Object(r), !0).forEach(function (n) {
          h8(e, n, r[n])
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
        : zy(Object(r)).forEach(function (n) {
            Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
          })
  }
  return e
}
function h8(e, t, r) {
  return (
    (t = p8(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  )
}
function p8(e) {
  var t = v8(e, 'string')
  return fo(t) == 'symbol' ? t : t + ''
}
function v8(e, t) {
  if (fo(e) != 'object' || !e) return e
  var r = e[Symbol.toPrimitive]
  if (r !== void 0) {
    var n = r.call(e, t || 'default')
    if (fo(n) != 'object') return n
    throw new TypeError('@@toPrimitive must return a primitive value.')
  }
  return (t === 'string' ? String : Number)(e)
}
var ei = { widthCache: {}, cacheCount: 0 },
  y8 = 2e3,
  m8 = {
    position: 'absolute',
    top: '-20000px',
    left: 0,
    padding: 0,
    margin: 0,
    border: 'none',
    whiteSpace: 'pre',
  },
  Ky = 'recharts_measurement_span'
function g8(e) {
  var t = Wf({}, e)
  return (
    Object.keys(t).forEach(function (r) {
      t[r] || delete t[r]
    }),
    t
  )
}
var Va = function (t) {
    var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}
    if (t == null || nr.isSsr) return { width: 0, height: 0 }
    var n = g8(r),
      i = JSON.stringify({ text: t, copyStyle: n })
    if (ei.widthCache[i]) return ei.widthCache[i]
    try {
      var a = document.getElementById(Ky)
      a ||
        ((a = document.createElement('span')),
        a.setAttribute('id', Ky),
        a.setAttribute('aria-hidden', 'true'),
        document.body.appendChild(a))
      var o = Wf(Wf({}, m8), n)
      Object.assign(a.style, o), (a.textContent = ''.concat(t))
      var s = a.getBoundingClientRect(),
        c = { width: s.width, height: s.height }
      return (
        (ei.widthCache[i] = c),
        ++ei.cacheCount > y8 && ((ei.cacheCount = 0), (ei.widthCache = {})),
        c
      )
    } catch {
      return { width: 0, height: 0 }
    }
  },
  b8 = function (t) {
    return {
      top: t.top + window.scrollY - document.documentElement.clientTop,
      left: t.left + window.scrollX - document.documentElement.clientLeft,
    }
  }
function ho(e) {
  '@babel/helpers - typeof'
  return (
    (ho =
      typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
        ? function (t) {
            return typeof t
          }
        : function (t) {
            return t &&
              typeof Symbol == 'function' &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? 'symbol'
              : typeof t
          }),
    ho(e)
  )
}
function cc(e, t) {
  return S8(e) || O8(e, t) || w8(e, t) || x8()
}
function x8() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}
function w8(e, t) {
  if (e) {
    if (typeof e == 'string') return Gy(e, t)
    var r = Object.prototype.toString.call(e).slice(8, -1)
    if (
      (r === 'Object' && e.constructor && (r = e.constructor.name),
      r === 'Map' || r === 'Set')
    )
      return Array.from(e)
    if (r === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
      return Gy(e, t)
  }
}
function Gy(e, t) {
  ;(t == null || t > e.length) && (t = e.length)
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r]
  return n
}
function O8(e, t) {
  var r =
    e == null
      ? null
      : (typeof Symbol < 'u' && e[Symbol.iterator]) || e['@@iterator']
  if (r != null) {
    var n,
      i,
      a,
      o,
      s = [],
      c = !0,
      u = !1
    try {
      if (((a = (r = r.call(e)).next), t === 0)) {
        if (Object(r) !== r) return
        c = !1
      } else
        for (
          ;
          !(c = (n = a.call(r)).done) && (s.push(n.value), s.length !== t);
          c = !0
        );
    } catch (l) {
      ;(u = !0), (i = l)
    } finally {
      try {
        if (!c && r.return != null && ((o = r.return()), Object(o) !== o))
          return
      } finally {
        if (u) throw i
      }
    }
    return s
  }
}
function S8(e) {
  if (Array.isArray(e)) return e
}
function A8(e, t) {
  if (!(e instanceof t))
    throw new TypeError('Cannot call a class as a function')
}
function Vy(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r]
    ;(n.enumerable = n.enumerable || !1),
      (n.configurable = !0),
      'value' in n && (n.writable = !0),
      Object.defineProperty(e, $8(n.key), n)
  }
}
function P8(e, t, r) {
  return (
    t && Vy(e.prototype, t),
    r && Vy(e, r),
    Object.defineProperty(e, 'prototype', { writable: !1 }),
    e
  )
}
function $8(e) {
  var t = E8(e, 'string')
  return ho(t) == 'symbol' ? t : t + ''
}
function E8(e, t) {
  if (ho(e) != 'object' || !e) return e
  var r = e[Symbol.toPrimitive]
  if (r !== void 0) {
    var n = r.call(e, t)
    if (ho(n) != 'object') return n
    throw new TypeError('@@toPrimitive must return a primitive value.')
  }
  return String(e)
}
var Xy = /(-?\d+(?:\.\d+)?[a-zA-Z%]*)([*/])(-?\d+(?:\.\d+)?[a-zA-Z%]*)/,
  Yy = /(-?\d+(?:\.\d+)?[a-zA-Z%]*)([+-])(-?\d+(?:\.\d+)?[a-zA-Z%]*)/,
  _8 = /^px|cm|vh|vw|em|rem|%|mm|in|pt|pc|ex|ch|vmin|vmax|Q$/,
  C8 = /(-?\d+(?:\.\d+)?)([a-zA-Z%]+)?/,
  $w = {
    cm: 96 / 2.54,
    mm: 96 / 25.4,
    pt: 96 / 72,
    pc: 96 / 6,
    in: 96,
    Q: 96 / (2.54 * 40),
    px: 1,
  },
  j8 = Object.keys($w),
  oi = 'NaN'
function T8(e, t) {
  return e * $w[t]
}
var ws = (function () {
  function e(t, r) {
    A8(this, e),
      (this.num = t),
      (this.unit = r),
      (this.num = t),
      (this.unit = r),
      Number.isNaN(t) && (this.unit = ''),
      r !== '' && !_8.test(r) && ((this.num = NaN), (this.unit = '')),
      j8.includes(r) && ((this.num = T8(t, r)), (this.unit = 'px'))
  }
  return P8(
    e,
    [
      {
        key: 'add',
        value: function (r) {
          return this.unit !== r.unit
            ? new e(NaN, '')
            : new e(this.num + r.num, this.unit)
        },
      },
      {
        key: 'subtract',
        value: function (r) {
          return this.unit !== r.unit
            ? new e(NaN, '')
            : new e(this.num - r.num, this.unit)
        },
      },
      {
        key: 'multiply',
        value: function (r) {
          return this.unit !== '' && r.unit !== '' && this.unit !== r.unit
            ? new e(NaN, '')
            : new e(this.num * r.num, this.unit || r.unit)
        },
      },
      {
        key: 'divide',
        value: function (r) {
          return this.unit !== '' && r.unit !== '' && this.unit !== r.unit
            ? new e(NaN, '')
            : new e(this.num / r.num, this.unit || r.unit)
        },
      },
      {
        key: 'toString',
        value: function () {
          return ''.concat(this.num).concat(this.unit)
        },
      },
      {
        key: 'isNaN',
        value: function () {
          return Number.isNaN(this.num)
        },
      },
    ],
    [
      {
        key: 'parse',
        value: function (r) {
          var n,
            i = (n = C8.exec(r)) !== null && n !== void 0 ? n : [],
            a = cc(i, 3),
            o = a[1],
            s = a[2]
          return new e(parseFloat(o), s ?? '')
        },
      },
    ],
  )
})()
function Ew(e) {
  if (e.includes(oi)) return oi
  for (var t = e; t.includes('*') || t.includes('/'); ) {
    var r,
      n = (r = Xy.exec(t)) !== null && r !== void 0 ? r : [],
      i = cc(n, 4),
      a = i[1],
      o = i[2],
      s = i[3],
      c = ws.parse(a ?? ''),
      u = ws.parse(s ?? ''),
      l = o === '*' ? c.multiply(u) : c.divide(u)
    if (l.isNaN()) return oi
    t = t.replace(Xy, l.toString())
  }
  for (; t.includes('+') || /.-\d+(?:\.\d+)?/.test(t); ) {
    var f,
      d = (f = Yy.exec(t)) !== null && f !== void 0 ? f : [],
      h = cc(d, 4),
      y = h[1],
      v = h[2],
      p = h[3],
      x = ws.parse(y ?? ''),
      b = ws.parse(p ?? ''),
      w = v === '+' ? x.add(b) : x.subtract(b)
    if (w.isNaN()) return oi
    t = t.replace(Yy, w.toString())
  }
  return t
}
var Qy = /\(([^()]*)\)/
function k8(e) {
  for (var t = e; t.includes('('); ) {
    var r = Qy.exec(t),
      n = cc(r, 2),
      i = n[1]
    t = t.replace(Qy, Ew(i))
  }
  return t
}
function M8(e) {
  var t = e.replace(/\s+/g, '')
  return (t = k8(t)), (t = Ew(t)), t
}
function N8(e) {
  try {
    return M8(e)
  } catch {
    return oi
  }
}
function Sl(e) {
  var t = N8(e.slice(5, -1))
  return t === oi ? '' : t
}
var I8 = [
    'x',
    'y',
    'lineHeight',
    'capHeight',
    'scaleToFit',
    'textAnchor',
    'verticalAnchor',
    'fill',
  ],
  R8 = ['dx', 'dy', 'angle', 'className', 'breakAll']
function qf() {
  return (
    (qf = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t]
            for (var n in r)
              Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
          }
          return e
        }),
    qf.apply(this, arguments)
  )
}
function Zy(e, t) {
  if (e == null) return {}
  var r = D8(e, t),
    n,
    i
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e)
    for (i = 0; i < a.length; i++)
      (n = a[i]),
        !(t.indexOf(n) >= 0) &&
          Object.prototype.propertyIsEnumerable.call(e, n) &&
          (r[n] = e[n])
  }
  return r
}
function D8(e, t) {
  if (e == null) return {}
  var r = {}
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue
      r[n] = e[n]
    }
  return r
}
function Jy(e, t) {
  return U8(e) || F8(e, t) || B8(e, t) || L8()
}
function L8() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}
function B8(e, t) {
  if (e) {
    if (typeof e == 'string') return em(e, t)
    var r = Object.prototype.toString.call(e).slice(8, -1)
    if (
      (r === 'Object' && e.constructor && (r = e.constructor.name),
      r === 'Map' || r === 'Set')
    )
      return Array.from(e)
    if (r === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
      return em(e, t)
  }
}
function em(e, t) {
  ;(t == null || t > e.length) && (t = e.length)
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r]
  return n
}
function F8(e, t) {
  var r =
    e == null
      ? null
      : (typeof Symbol < 'u' && e[Symbol.iterator]) || e['@@iterator']
  if (r != null) {
    var n,
      i,
      a,
      o,
      s = [],
      c = !0,
      u = !1
    try {
      if (((a = (r = r.call(e)).next), t === 0)) {
        if (Object(r) !== r) return
        c = !1
      } else
        for (
          ;
          !(c = (n = a.call(r)).done) && (s.push(n.value), s.length !== t);
          c = !0
        );
    } catch (l) {
      ;(u = !0), (i = l)
    } finally {
      try {
        if (!c && r.return != null && ((o = r.return()), Object(o) !== o))
          return
      } finally {
        if (u) throw i
      }
    }
    return s
  }
}
function U8(e) {
  if (Array.isArray(e)) return e
}
var _w = /[ \f\n\r\t\v\u2028\u2029]+/,
  Cw = function (t) {
    var r = t.children,
      n = t.breakAll,
      i = t.style
    try {
      var a = []
      se(r) || (n ? (a = r.toString().split('')) : (a = r.toString().split(_w)))
      var o = a.map(function (c) {
          return { word: c, width: Va(c, i).width }
        }),
        s = n ? 0 : Va(' ', i).width
      return { wordsWithComputedWidth: o, spaceWidth: s }
    } catch {
      return null
    }
  },
  W8 = function (t, r, n, i, a) {
    var o = t.maxLines,
      s = t.children,
      c = t.style,
      u = t.breakAll,
      l = U(o),
      f = s,
      d = function () {
        var R =
          arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : []
        return R.reduce(function (I, L) {
          var B = L.word,
            W = L.width,
            G = I[I.length - 1]
          if (G && (i == null || a || G.width + W + n < Number(i)))
            G.words.push(B), (G.width += W + n)
          else {
            var z = { words: [B], width: W }
            I.push(z)
          }
          return I
        }, [])
      },
      h = d(r),
      y = function (R) {
        return R.reduce(function (I, L) {
          return I.width > L.width ? I : L
        })
      }
    if (!l) return h
    for (
      var v = '…',
        p = function (R) {
          var I = f.slice(0, R),
            L = Cw({
              breakAll: u,
              style: c,
              children: I + v,
            }).wordsWithComputedWidth,
            B = d(L),
            W = B.length > o || y(B).width > Number(i)
          return [W, B]
        },
        x = 0,
        b = f.length - 1,
        w = 0,
        g;
      x <= b && w <= f.length - 1;

    ) {
      var m = Math.floor((x + b) / 2),
        S = m - 1,
        P = p(S),
        $ = Jy(P, 2),
        T = $[0],
        k = $[1],
        C = p(m),
        j = Jy(C, 1),
        M = j[0]
      if ((!T && !M && (x = m + 1), T && M && (b = m - 1), !T && M)) {
        g = k
        break
      }
      w++
    }
    return g || h
  },
  tm = function (t) {
    var r = se(t) ? [] : t.toString().split(_w)
    return [{ words: r }]
  },
  q8 = function (t) {
    var r = t.width,
      n = t.scaleToFit,
      i = t.children,
      a = t.style,
      o = t.breakAll,
      s = t.maxLines
    if ((r || n) && !nr.isSsr) {
      var c,
        u,
        l = Cw({ breakAll: o, children: i, style: a })
      if (l) {
        var f = l.wordsWithComputedWidth,
          d = l.spaceWidth
        ;(c = f), (u = d)
      } else return tm(i)
      return W8({ breakAll: o, children: i, maxLines: s, style: a }, c, u, r, n)
    }
    return tm(i)
  },
  rm = '#808080',
  Bn = function (t) {
    var r = t.x,
      n = r === void 0 ? 0 : r,
      i = t.y,
      a = i === void 0 ? 0 : i,
      o = t.lineHeight,
      s = o === void 0 ? '1em' : o,
      c = t.capHeight,
      u = c === void 0 ? '0.71em' : c,
      l = t.scaleToFit,
      f = l === void 0 ? !1 : l,
      d = t.textAnchor,
      h = d === void 0 ? 'start' : d,
      y = t.verticalAnchor,
      v = y === void 0 ? 'end' : y,
      p = t.fill,
      x = p === void 0 ? rm : p,
      b = Zy(t, I8),
      w = A.useMemo(
        function () {
          return q8({
            breakAll: b.breakAll,
            children: b.children,
            maxLines: b.maxLines,
            scaleToFit: f,
            style: b.style,
            width: b.width,
          })
        },
        [b.breakAll, b.children, b.maxLines, f, b.style, b.width],
      ),
      g = b.dx,
      m = b.dy,
      S = b.angle,
      P = b.className,
      $ = b.breakAll,
      T = Zy(b, R8)
    if (!We(n) || !We(a)) return null
    var k = n + (U(g) ? g : 0),
      C = a + (U(m) ? m : 0),
      j
    switch (v) {
      case 'start':
        j = Sl('calc('.concat(u, ')'))
        break
      case 'middle':
        j = Sl(
          'calc('
            .concat((w.length - 1) / 2, ' * -')
            .concat(s, ' + (')
            .concat(u, ' / 2))'),
        )
        break
      default:
        j = Sl('calc('.concat(w.length - 1, ' * -').concat(s, ')'))
        break
    }
    var M = []
    if (f) {
      var N = w[0].width,
        R = b.width
      M.push('scale('.concat((U(R) ? R / N : 1) / N, ')'))
    }
    return (
      S && M.push('rotate('.concat(S, ', ').concat(k, ', ').concat(C, ')')),
      M.length && (T.transform = M.join(' ')),
      E.createElement(
        'text',
        qf({}, J(T, !0), {
          x: k,
          y: C,
          className: ue('recharts-text', P),
          textAnchor: h,
          fill: x.includes('url') ? rm : x,
        }),
        w.map(function (I, L) {
          var B = I.words.join($ ? '' : ' ')
          return E.createElement(
            'tspan',
            { x: k, dy: L === 0 ? j : s, key: ''.concat(B, '-').concat(L) },
            B,
          )
        }),
      )
    )
  }
function tn(e, t) {
  return e == null || t == null
    ? NaN
    : e < t
      ? -1
      : e > t
        ? 1
        : e >= t
          ? 0
          : NaN
}
function H8(e, t) {
  return e == null || t == null
    ? NaN
    : t < e
      ? -1
      : t > e
        ? 1
        : t >= e
          ? 0
          : NaN
}
function Qh(e) {
  let t, r, n
  e.length !== 2
    ? ((t = tn), (r = (s, c) => tn(e(s), c)), (n = (s, c) => e(s) - c))
    : ((t = e === tn || e === H8 ? e : z8), (r = e), (n = e))
  function i(s, c, u = 0, l = s.length) {
    if (u < l) {
      if (t(c, c) !== 0) return l
      do {
        const f = (u + l) >>> 1
        r(s[f], c) < 0 ? (u = f + 1) : (l = f)
      } while (u < l)
    }
    return u
  }
  function a(s, c, u = 0, l = s.length) {
    if (u < l) {
      if (t(c, c) !== 0) return l
      do {
        const f = (u + l) >>> 1
        r(s[f], c) <= 0 ? (u = f + 1) : (l = f)
      } while (u < l)
    }
    return u
  }
  function o(s, c, u = 0, l = s.length) {
    const f = i(s, c, u, l - 1)
    return f > u && n(s[f - 1], c) > -n(s[f], c) ? f - 1 : f
  }
  return { left: i, center: o, right: a }
}
function z8() {
  return 0
}
function jw(e) {
  return e === null ? NaN : +e
}
function* K8(e, t) {
  for (let r of e) r != null && (r = +r) >= r && (yield r)
}
const G8 = Qh(tn),
  ts = G8.right
Qh(jw).center
class nm extends Map {
  constructor(t, r = Y8) {
    if (
      (super(),
      Object.defineProperties(this, {
        _intern: { value: new Map() },
        _key: { value: r },
      }),
      t != null)
    )
      for (const [n, i] of t) this.set(n, i)
  }
  get(t) {
    return super.get(im(this, t))
  }
  has(t) {
    return super.has(im(this, t))
  }
  set(t, r) {
    return super.set(V8(this, t), r)
  }
  delete(t) {
    return super.delete(X8(this, t))
  }
}
function im({ _intern: e, _key: t }, r) {
  const n = t(r)
  return e.has(n) ? e.get(n) : r
}
function V8({ _intern: e, _key: t }, r) {
  const n = t(r)
  return e.has(n) ? e.get(n) : (e.set(n, r), r)
}
function X8({ _intern: e, _key: t }, r) {
  const n = t(r)
  return e.has(n) && ((r = e.get(n)), e.delete(n)), r
}
function Y8(e) {
  return e !== null && typeof e == 'object' ? e.valueOf() : e
}
function Q8(e = tn) {
  if (e === tn) return Tw
  if (typeof e != 'function') throw new TypeError('compare is not a function')
  return (t, r) => {
    const n = e(t, r)
    return n || n === 0 ? n : (e(r, r) === 0) - (e(t, t) === 0)
  }
}
function Tw(e, t) {
  return (
    (e == null || !(e >= e)) - (t == null || !(t >= t)) ||
    (e < t ? -1 : e > t ? 1 : 0)
  )
}
const Z8 = Math.sqrt(50),
  J8 = Math.sqrt(10),
  e6 = Math.sqrt(2)
function uc(e, t, r) {
  const n = (t - e) / Math.max(0, r),
    i = Math.floor(Math.log10(n)),
    a = n / Math.pow(10, i),
    o = a >= Z8 ? 10 : a >= J8 ? 5 : a >= e6 ? 2 : 1
  let s, c, u
  return (
    i < 0
      ? ((u = Math.pow(10, -i) / o),
        (s = Math.round(e * u)),
        (c = Math.round(t * u)),
        s / u < e && ++s,
        c / u > t && --c,
        (u = -u))
      : ((u = Math.pow(10, i) * o),
        (s = Math.round(e / u)),
        (c = Math.round(t / u)),
        s * u < e && ++s,
        c * u > t && --c),
    c < s && 0.5 <= r && r < 2 ? uc(e, t, r * 2) : [s, c, u]
  )
}
function Hf(e, t, r) {
  if (((t = +t), (e = +e), (r = +r), !(r > 0))) return []
  if (e === t) return [e]
  const n = t < e,
    [i, a, o] = n ? uc(t, e, r) : uc(e, t, r)
  if (!(a >= i)) return []
  const s = a - i + 1,
    c = new Array(s)
  if (n)
    if (o < 0) for (let u = 0; u < s; ++u) c[u] = (a - u) / -o
    else for (let u = 0; u < s; ++u) c[u] = (a - u) * o
  else if (o < 0) for (let u = 0; u < s; ++u) c[u] = (i + u) / -o
  else for (let u = 0; u < s; ++u) c[u] = (i + u) * o
  return c
}
function zf(e, t, r) {
  return (t = +t), (e = +e), (r = +r), uc(e, t, r)[2]
}
function Kf(e, t, r) {
  ;(t = +t), (e = +e), (r = +r)
  const n = t < e,
    i = n ? zf(t, e, r) : zf(e, t, r)
  return (n ? -1 : 1) * (i < 0 ? 1 / -i : i)
}
function am(e, t) {
  let r
  for (const n of e) n != null && (r < n || (r === void 0 && n >= n)) && (r = n)
  return r
}
function om(e, t) {
  let r
  for (const n of e) n != null && (r > n || (r === void 0 && n >= n)) && (r = n)
  return r
}
function kw(e, t, r = 0, n = 1 / 0, i) {
  if (
    ((t = Math.floor(t)),
    (r = Math.floor(Math.max(0, r))),
    (n = Math.floor(Math.min(e.length - 1, n))),
    !(r <= t && t <= n))
  )
    return e
  for (i = i === void 0 ? Tw : Q8(i); n > r; ) {
    if (n - r > 600) {
      const c = n - r + 1,
        u = t - r + 1,
        l = Math.log(c),
        f = 0.5 * Math.exp((2 * l) / 3),
        d = 0.5 * Math.sqrt((l * f * (c - f)) / c) * (u - c / 2 < 0 ? -1 : 1),
        h = Math.max(r, Math.floor(t - (u * f) / c + d)),
        y = Math.min(n, Math.floor(t + ((c - u) * f) / c + d))
      kw(e, t, h, y, i)
    }
    const a = e[t]
    let o = r,
      s = n
    for (ka(e, r, t), i(e[n], a) > 0 && ka(e, r, n); o < s; ) {
      for (ka(e, o, s), ++o, --s; i(e[o], a) < 0; ) ++o
      for (; i(e[s], a) > 0; ) --s
    }
    i(e[r], a) === 0 ? ka(e, r, s) : (++s, ka(e, s, n)),
      s <= t && (r = s + 1),
      t <= s && (n = s - 1)
  }
  return e
}
function ka(e, t, r) {
  const n = e[t]
  ;(e[t] = e[r]), (e[r] = n)
}
function t6(e, t, r) {
  if (((e = Float64Array.from(K8(e))), !(!(n = e.length) || isNaN((t = +t))))) {
    if (t <= 0 || n < 2) return om(e)
    if (t >= 1) return am(e)
    var n,
      i = (n - 1) * t,
      a = Math.floor(i),
      o = am(kw(e, a).subarray(0, a + 1)),
      s = om(e.subarray(a + 1))
    return o + (s - o) * (i - a)
  }
}
function r6(e, t, r = jw) {
  if (!(!(n = e.length) || isNaN((t = +t)))) {
    if (t <= 0 || n < 2) return +r(e[0], 0, e)
    if (t >= 1) return +r(e[n - 1], n - 1, e)
    var n,
      i = (n - 1) * t,
      a = Math.floor(i),
      o = +r(e[a], a, e),
      s = +r(e[a + 1], a + 1, e)
    return o + (s - o) * (i - a)
  }
}
function n6(e, t, r) {
  ;(e = +e),
    (t = +t),
    (r = (i = arguments.length) < 2 ? ((t = e), (e = 0), 1) : i < 3 ? 1 : +r)
  for (
    var n = -1, i = Math.max(0, Math.ceil((t - e) / r)) | 0, a = new Array(i);
    ++n < i;

  )
    a[n] = e + n * r
  return a
}
function Dt(e, t) {
  switch (arguments.length) {
    case 0:
      break
    case 1:
      this.range(e)
      break
    default:
      this.range(t).domain(e)
      break
  }
  return this
}
function Dr(e, t) {
  switch (arguments.length) {
    case 0:
      break
    case 1: {
      typeof e == 'function' ? this.interpolator(e) : this.range(e)
      break
    }
    default: {
      this.domain(e),
        typeof t == 'function' ? this.interpolator(t) : this.range(t)
      break
    }
  }
  return this
}
const Gf = Symbol('implicit')
function Zh() {
  var e = new nm(),
    t = [],
    r = [],
    n = Gf
  function i(a) {
    let o = e.get(a)
    if (o === void 0) {
      if (n !== Gf) return n
      e.set(a, (o = t.push(a) - 1))
    }
    return r[o % r.length]
  }
  return (
    (i.domain = function (a) {
      if (!arguments.length) return t.slice()
      ;(t = []), (e = new nm())
      for (const o of a) e.has(o) || e.set(o, t.push(o) - 1)
      return i
    }),
    (i.range = function (a) {
      return arguments.length ? ((r = Array.from(a)), i) : r.slice()
    }),
    (i.unknown = function (a) {
      return arguments.length ? ((n = a), i) : n
    }),
    (i.copy = function () {
      return Zh(t, r).unknown(n)
    }),
    Dt.apply(i, arguments),
    i
  )
}
function po() {
  var e = Zh().unknown(void 0),
    t = e.domain,
    r = e.range,
    n = 0,
    i = 1,
    a,
    o,
    s = !1,
    c = 0,
    u = 0,
    l = 0.5
  delete e.unknown
  function f() {
    var d = t().length,
      h = i < n,
      y = h ? i : n,
      v = h ? n : i
    ;(a = (v - y) / Math.max(1, d - c + u * 2)),
      s && (a = Math.floor(a)),
      (y += (v - y - a * (d - c)) * l),
      (o = a * (1 - c)),
      s && ((y = Math.round(y)), (o = Math.round(o)))
    var p = n6(d).map(function (x) {
      return y + a * x
    })
    return r(h ? p.reverse() : p)
  }
  return (
    (e.domain = function (d) {
      return arguments.length ? (t(d), f()) : t()
    }),
    (e.range = function (d) {
      return arguments.length ? (([n, i] = d), (n = +n), (i = +i), f()) : [n, i]
    }),
    (e.rangeRound = function (d) {
      return ([n, i] = d), (n = +n), (i = +i), (s = !0), f()
    }),
    (e.bandwidth = function () {
      return o
    }),
    (e.step = function () {
      return a
    }),
    (e.round = function (d) {
      return arguments.length ? ((s = !!d), f()) : s
    }),
    (e.padding = function (d) {
      return arguments.length ? ((c = Math.min(1, (u = +d))), f()) : c
    }),
    (e.paddingInner = function (d) {
      return arguments.length ? ((c = Math.min(1, d)), f()) : c
    }),
    (e.paddingOuter = function (d) {
      return arguments.length ? ((u = +d), f()) : u
    }),
    (e.align = function (d) {
      return arguments.length ? ((l = Math.max(0, Math.min(1, d))), f()) : l
    }),
    (e.copy = function () {
      return po(t(), [n, i]).round(s).paddingInner(c).paddingOuter(u).align(l)
    }),
    Dt.apply(f(), arguments)
  )
}
function Mw(e) {
  var t = e.copy
  return (
    (e.padding = e.paddingOuter),
    delete e.paddingInner,
    delete e.paddingOuter,
    (e.copy = function () {
      return Mw(t())
    }),
    e
  )
}
function Xa() {
  return Mw(po.apply(null, arguments).paddingInner(1))
}
function Jh(e, t, r) {
  ;(e.prototype = t.prototype = r), (r.constructor = e)
}
function Nw(e, t) {
  var r = Object.create(e.prototype)
  for (var n in t) r[n] = t[n]
  return r
}
function rs() {}
var vo = 0.7,
  lc = 1 / vo,
  hi = '\\s*([+-]?\\d+)\\s*',
  yo = '\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*',
  ir = '\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*',
  i6 = /^#([0-9a-f]{3,8})$/,
  a6 = new RegExp(`^rgb\\(${hi},${hi},${hi}\\)$`),
  o6 = new RegExp(`^rgb\\(${ir},${ir},${ir}\\)$`),
  s6 = new RegExp(`^rgba\\(${hi},${hi},${hi},${yo}\\)$`),
  c6 = new RegExp(`^rgba\\(${ir},${ir},${ir},${yo}\\)$`),
  u6 = new RegExp(`^hsl\\(${yo},${ir},${ir}\\)$`),
  l6 = new RegExp(`^hsla\\(${yo},${ir},${ir},${yo}\\)$`),
  sm = {
    aliceblue: 15792383,
    antiquewhite: 16444375,
    aqua: 65535,
    aquamarine: 8388564,
    azure: 15794175,
    beige: 16119260,
    bisque: 16770244,
    black: 0,
    blanchedalmond: 16772045,
    blue: 255,
    blueviolet: 9055202,
    brown: 10824234,
    burlywood: 14596231,
    cadetblue: 6266528,
    chartreuse: 8388352,
    chocolate: 13789470,
    coral: 16744272,
    cornflowerblue: 6591981,
    cornsilk: 16775388,
    crimson: 14423100,
    cyan: 65535,
    darkblue: 139,
    darkcyan: 35723,
    darkgoldenrod: 12092939,
    darkgray: 11119017,
    darkgreen: 25600,
    darkgrey: 11119017,
    darkkhaki: 12433259,
    darkmagenta: 9109643,
    darkolivegreen: 5597999,
    darkorange: 16747520,
    darkorchid: 10040012,
    darkred: 9109504,
    darksalmon: 15308410,
    darkseagreen: 9419919,
    darkslateblue: 4734347,
    darkslategray: 3100495,
    darkslategrey: 3100495,
    darkturquoise: 52945,
    darkviolet: 9699539,
    deeppink: 16716947,
    deepskyblue: 49151,
    dimgray: 6908265,
    dimgrey: 6908265,
    dodgerblue: 2003199,
    firebrick: 11674146,
    floralwhite: 16775920,
    forestgreen: 2263842,
    fuchsia: 16711935,
    gainsboro: 14474460,
    ghostwhite: 16316671,
    gold: 16766720,
    goldenrod: 14329120,
    gray: 8421504,
    green: 32768,
    greenyellow: 11403055,
    grey: 8421504,
    honeydew: 15794160,
    hotpink: 16738740,
    indianred: 13458524,
    indigo: 4915330,
    ivory: 16777200,
    khaki: 15787660,
    lavender: 15132410,
    lavenderblush: 16773365,
    lawngreen: 8190976,
    lemonchiffon: 16775885,
    lightblue: 11393254,
    lightcoral: 15761536,
    lightcyan: 14745599,
    lightgoldenrodyellow: 16448210,
    lightgray: 13882323,
    lightgreen: 9498256,
    lightgrey: 13882323,
    lightpink: 16758465,
    lightsalmon: 16752762,
    lightseagreen: 2142890,
    lightskyblue: 8900346,
    lightslategray: 7833753,
    lightslategrey: 7833753,
    lightsteelblue: 11584734,
    lightyellow: 16777184,
    lime: 65280,
    limegreen: 3329330,
    linen: 16445670,
    magenta: 16711935,
    maroon: 8388608,
    mediumaquamarine: 6737322,
    mediumblue: 205,
    mediumorchid: 12211667,
    mediumpurple: 9662683,
    mediumseagreen: 3978097,
    mediumslateblue: 8087790,
    mediumspringgreen: 64154,
    mediumturquoise: 4772300,
    mediumvioletred: 13047173,
    midnightblue: 1644912,
    mintcream: 16121850,
    mistyrose: 16770273,
    moccasin: 16770229,
    navajowhite: 16768685,
    navy: 128,
    oldlace: 16643558,
    olive: 8421376,
    olivedrab: 7048739,
    orange: 16753920,
    orangered: 16729344,
    orchid: 14315734,
    palegoldenrod: 15657130,
    palegreen: 10025880,
    paleturquoise: 11529966,
    palevioletred: 14381203,
    papayawhip: 16773077,
    peachpuff: 16767673,
    peru: 13468991,
    pink: 16761035,
    plum: 14524637,
    powderblue: 11591910,
    purple: 8388736,
    rebeccapurple: 6697881,
    red: 16711680,
    rosybrown: 12357519,
    royalblue: 4286945,
    saddlebrown: 9127187,
    salmon: 16416882,
    sandybrown: 16032864,
    seagreen: 3050327,
    seashell: 16774638,
    sienna: 10506797,
    silver: 12632256,
    skyblue: 8900331,
    slateblue: 6970061,
    slategray: 7372944,
    slategrey: 7372944,
    snow: 16775930,
    springgreen: 65407,
    steelblue: 4620980,
    tan: 13808780,
    teal: 32896,
    thistle: 14204888,
    tomato: 16737095,
    turquoise: 4251856,
    violet: 15631086,
    wheat: 16113331,
    white: 16777215,
    whitesmoke: 16119285,
    yellow: 16776960,
    yellowgreen: 10145074,
  }
Jh(rs, mo, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e)
  },
  displayable() {
    return this.rgb().displayable()
  },
  hex: cm,
  formatHex: cm,
  formatHex8: f6,
  formatHsl: d6,
  formatRgb: um,
  toString: um,
})
function cm() {
  return this.rgb().formatHex()
}
function f6() {
  return this.rgb().formatHex8()
}
function d6() {
  return Iw(this).formatHsl()
}
function um() {
  return this.rgb().formatRgb()
}
function mo(e) {
  var t, r
  return (
    (e = (e + '').trim().toLowerCase()),
    (t = i6.exec(e))
      ? ((r = t[1].length),
        (t = parseInt(t[1], 16)),
        r === 6
          ? lm(t)
          : r === 3
            ? new lt(
                ((t >> 8) & 15) | ((t >> 4) & 240),
                ((t >> 4) & 15) | (t & 240),
                ((t & 15) << 4) | (t & 15),
                1,
              )
            : r === 8
              ? Os(
                  (t >> 24) & 255,
                  (t >> 16) & 255,
                  (t >> 8) & 255,
                  (t & 255) / 255,
                )
              : r === 4
                ? Os(
                    ((t >> 12) & 15) | ((t >> 8) & 240),
                    ((t >> 8) & 15) | ((t >> 4) & 240),
                    ((t >> 4) & 15) | (t & 240),
                    (((t & 15) << 4) | (t & 15)) / 255,
                  )
                : null)
      : (t = a6.exec(e))
        ? new lt(t[1], t[2], t[3], 1)
        : (t = o6.exec(e))
          ? new lt(
              (t[1] * 255) / 100,
              (t[2] * 255) / 100,
              (t[3] * 255) / 100,
              1,
            )
          : (t = s6.exec(e))
            ? Os(t[1], t[2], t[3], t[4])
            : (t = c6.exec(e))
              ? Os(
                  (t[1] * 255) / 100,
                  (t[2] * 255) / 100,
                  (t[3] * 255) / 100,
                  t[4],
                )
              : (t = u6.exec(e))
                ? hm(t[1], t[2] / 100, t[3] / 100, 1)
                : (t = l6.exec(e))
                  ? hm(t[1], t[2] / 100, t[3] / 100, t[4])
                  : sm.hasOwnProperty(e)
                    ? lm(sm[e])
                    : e === 'transparent'
                      ? new lt(NaN, NaN, NaN, 0)
                      : null
  )
}
function lm(e) {
  return new lt((e >> 16) & 255, (e >> 8) & 255, e & 255, 1)
}
function Os(e, t, r, n) {
  return n <= 0 && (e = t = r = NaN), new lt(e, t, r, n)
}
function h6(e) {
  return (
    e instanceof rs || (e = mo(e)),
    e ? ((e = e.rgb()), new lt(e.r, e.g, e.b, e.opacity)) : new lt()
  )
}
function Vf(e, t, r, n) {
  return arguments.length === 1 ? h6(e) : new lt(e, t, r, n ?? 1)
}
function lt(e, t, r, n) {
  ;(this.r = +e), (this.g = +t), (this.b = +r), (this.opacity = +n)
}
Jh(
  lt,
  Vf,
  Nw(rs, {
    brighter(e) {
      return (
        (e = e == null ? lc : Math.pow(lc, e)),
        new lt(this.r * e, this.g * e, this.b * e, this.opacity)
      )
    },
    darker(e) {
      return (
        (e = e == null ? vo : Math.pow(vo, e)),
        new lt(this.r * e, this.g * e, this.b * e, this.opacity)
      )
    },
    rgb() {
      return this
    },
    clamp() {
      return new lt(Tn(this.r), Tn(this.g), Tn(this.b), fc(this.opacity))
    },
    displayable() {
      return (
        -0.5 <= this.r &&
        this.r < 255.5 &&
        -0.5 <= this.g &&
        this.g < 255.5 &&
        -0.5 <= this.b &&
        this.b < 255.5 &&
        0 <= this.opacity &&
        this.opacity <= 1
      )
    },
    hex: fm,
    formatHex: fm,
    formatHex8: p6,
    formatRgb: dm,
    toString: dm,
  }),
)
function fm() {
  return `#${xn(this.r)}${xn(this.g)}${xn(this.b)}`
}
function p6() {
  return `#${xn(this.r)}${xn(this.g)}${xn(this.b)}${xn((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`
}
function dm() {
  const e = fc(this.opacity)
  return `${e === 1 ? 'rgb(' : 'rgba('}${Tn(this.r)}, ${Tn(this.g)}, ${Tn(this.b)}${e === 1 ? ')' : `, ${e})`}`
}
function fc(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e))
}
function Tn(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0))
}
function xn(e) {
  return (e = Tn(e)), (e < 16 ? '0' : '') + e.toString(16)
}
function hm(e, t, r, n) {
  return (
    n <= 0
      ? (e = t = r = NaN)
      : r <= 0 || r >= 1
        ? (e = t = NaN)
        : t <= 0 && (e = NaN),
    new Kt(e, t, r, n)
  )
}
function Iw(e) {
  if (e instanceof Kt) return new Kt(e.h, e.s, e.l, e.opacity)
  if ((e instanceof rs || (e = mo(e)), !e)) return new Kt()
  if (e instanceof Kt) return e
  e = e.rgb()
  var t = e.r / 255,
    r = e.g / 255,
    n = e.b / 255,
    i = Math.min(t, r, n),
    a = Math.max(t, r, n),
    o = NaN,
    s = a - i,
    c = (a + i) / 2
  return (
    s
      ? (t === a
          ? (o = (r - n) / s + (r < n) * 6)
          : r === a
            ? (o = (n - t) / s + 2)
            : (o = (t - r) / s + 4),
        (s /= c < 0.5 ? a + i : 2 - a - i),
        (o *= 60))
      : (s = c > 0 && c < 1 ? 0 : o),
    new Kt(o, s, c, e.opacity)
  )
}
function v6(e, t, r, n) {
  return arguments.length === 1 ? Iw(e) : new Kt(e, t, r, n ?? 1)
}
function Kt(e, t, r, n) {
  ;(this.h = +e), (this.s = +t), (this.l = +r), (this.opacity = +n)
}
Jh(
  Kt,
  v6,
  Nw(rs, {
    brighter(e) {
      return (
        (e = e == null ? lc : Math.pow(lc, e)),
        new Kt(this.h, this.s, this.l * e, this.opacity)
      )
    },
    darker(e) {
      return (
        (e = e == null ? vo : Math.pow(vo, e)),
        new Kt(this.h, this.s, this.l * e, this.opacity)
      )
    },
    rgb() {
      var e = (this.h % 360) + (this.h < 0) * 360,
        t = isNaN(e) || isNaN(this.s) ? 0 : this.s,
        r = this.l,
        n = r + (r < 0.5 ? r : 1 - r) * t,
        i = 2 * r - n
      return new lt(
        Al(e >= 240 ? e - 240 : e + 120, i, n),
        Al(e, i, n),
        Al(e < 120 ? e + 240 : e - 120, i, n),
        this.opacity,
      )
    },
    clamp() {
      return new Kt(pm(this.h), Ss(this.s), Ss(this.l), fc(this.opacity))
    },
    displayable() {
      return (
        ((0 <= this.s && this.s <= 1) || isNaN(this.s)) &&
        0 <= this.l &&
        this.l <= 1 &&
        0 <= this.opacity &&
        this.opacity <= 1
      )
    },
    formatHsl() {
      const e = fc(this.opacity)
      return `${e === 1 ? 'hsl(' : 'hsla('}${pm(this.h)}, ${Ss(this.s) * 100}%, ${Ss(this.l) * 100}%${e === 1 ? ')' : `, ${e})`}`
    },
  }),
)
function pm(e) {
  return (e = (e || 0) % 360), e < 0 ? e + 360 : e
}
function Ss(e) {
  return Math.max(0, Math.min(1, e || 0))
}
function Al(e, t, r) {
  return (
    (e < 60
      ? t + ((r - t) * e) / 60
      : e < 180
        ? r
        : e < 240
          ? t + ((r - t) * (240 - e)) / 60
          : t) * 255
  )
}
const ep = (e) => () => e
function y6(e, t) {
  return function (r) {
    return e + r * t
  }
}
function m6(e, t, r) {
  return (
    (e = Math.pow(e, r)),
    (t = Math.pow(t, r) - e),
    (r = 1 / r),
    function (n) {
      return Math.pow(e + n * t, r)
    }
  )
}
function g6(e) {
  return (e = +e) == 1
    ? Rw
    : function (t, r) {
        return r - t ? m6(t, r, e) : ep(isNaN(t) ? r : t)
      }
}
function Rw(e, t) {
  var r = t - e
  return r ? y6(e, r) : ep(isNaN(e) ? t : e)
}
const vm = (function e(t) {
  var r = g6(t)
  function n(i, a) {
    var o = r((i = Vf(i)).r, (a = Vf(a)).r),
      s = r(i.g, a.g),
      c = r(i.b, a.b),
      u = Rw(i.opacity, a.opacity)
    return function (l) {
      return (
        (i.r = o(l)), (i.g = s(l)), (i.b = c(l)), (i.opacity = u(l)), i + ''
      )
    }
  }
  return (n.gamma = e), n
})(1)
function b6(e, t) {
  t || (t = [])
  var r = e ? Math.min(t.length, e.length) : 0,
    n = t.slice(),
    i
  return function (a) {
    for (i = 0; i < r; ++i) n[i] = e[i] * (1 - a) + t[i] * a
    return n
  }
}
function x6(e) {
  return ArrayBuffer.isView(e) && !(e instanceof DataView)
}
function w6(e, t) {
  var r = t ? t.length : 0,
    n = e ? Math.min(r, e.length) : 0,
    i = new Array(n),
    a = new Array(r),
    o
  for (o = 0; o < n; ++o) i[o] = wa(e[o], t[o])
  for (; o < r; ++o) a[o] = t[o]
  return function (s) {
    for (o = 0; o < n; ++o) a[o] = i[o](s)
    return a
  }
}
function O6(e, t) {
  var r = new Date()
  return (
    (e = +e),
    (t = +t),
    function (n) {
      return r.setTime(e * (1 - n) + t * n), r
    }
  )
}
function dc(e, t) {
  return (
    (e = +e),
    (t = +t),
    function (r) {
      return e * (1 - r) + t * r
    }
  )
}
function S6(e, t) {
  var r = {},
    n = {},
    i
  ;(e === null || typeof e != 'object') && (e = {}),
    (t === null || typeof t != 'object') && (t = {})
  for (i in t) i in e ? (r[i] = wa(e[i], t[i])) : (n[i] = t[i])
  return function (a) {
    for (i in r) n[i] = r[i](a)
    return n
  }
}
var Xf = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
  Pl = new RegExp(Xf.source, 'g')
function A6(e) {
  return function () {
    return e
  }
}
function P6(e) {
  return function (t) {
    return e(t) + ''
  }
}
function $6(e, t) {
  var r = (Xf.lastIndex = Pl.lastIndex = 0),
    n,
    i,
    a,
    o = -1,
    s = [],
    c = []
  for (e = e + '', t = t + ''; (n = Xf.exec(e)) && (i = Pl.exec(t)); )
    (a = i.index) > r &&
      ((a = t.slice(r, a)), s[o] ? (s[o] += a) : (s[++o] = a)),
      (n = n[0]) === (i = i[0])
        ? s[o]
          ? (s[o] += i)
          : (s[++o] = i)
        : ((s[++o] = null), c.push({ i: o, x: dc(n, i) })),
      (r = Pl.lastIndex)
  return (
    r < t.length && ((a = t.slice(r)), s[o] ? (s[o] += a) : (s[++o] = a)),
    s.length < 2
      ? c[0]
        ? P6(c[0].x)
        : A6(t)
      : ((t = c.length),
        function (u) {
          for (var l = 0, f; l < t; ++l) s[(f = c[l]).i] = f.x(u)
          return s.join('')
        })
  )
}
function wa(e, t) {
  var r = typeof t,
    n
  return t == null || r === 'boolean'
    ? ep(t)
    : (r === 'number'
        ? dc
        : r === 'string'
          ? (n = mo(t))
            ? ((t = n), vm)
            : $6
          : t instanceof mo
            ? vm
            : t instanceof Date
              ? O6
              : x6(t)
                ? b6
                : Array.isArray(t)
                  ? w6
                  : (typeof t.valueOf != 'function' &&
                        typeof t.toString != 'function') ||
                      isNaN(t)
                    ? S6
                    : dc)(e, t)
}
function tp(e, t) {
  return (
    (e = +e),
    (t = +t),
    function (r) {
      return Math.round(e * (1 - r) + t * r)
    }
  )
}
function E6(e, t) {
  t === void 0 && ((t = e), (e = wa))
  for (
    var r = 0, n = t.length - 1, i = t[0], a = new Array(n < 0 ? 0 : n);
    r < n;

  )
    a[r] = e(i, (i = t[++r]))
  return function (o) {
    var s = Math.max(0, Math.min(n - 1, Math.floor((o *= n))))
    return a[s](o - s)
  }
}
function _6(e) {
  return function () {
    return e
  }
}
function hc(e) {
  return +e
}
var ym = [0, 1]
function st(e) {
  return e
}
function Yf(e, t) {
  return (t -= e = +e)
    ? function (r) {
        return (r - e) / t
      }
    : _6(isNaN(t) ? NaN : 0.5)
}
function C6(e, t) {
  var r
  return (
    e > t && ((r = e), (e = t), (t = r)),
    function (n) {
      return Math.max(e, Math.min(t, n))
    }
  )
}
function j6(e, t, r) {
  var n = e[0],
    i = e[1],
    a = t[0],
    o = t[1]
  return (
    i < n ? ((n = Yf(i, n)), (a = r(o, a))) : ((n = Yf(n, i)), (a = r(a, o))),
    function (s) {
      return a(n(s))
    }
  )
}
function T6(e, t, r) {
  var n = Math.min(e.length, t.length) - 1,
    i = new Array(n),
    a = new Array(n),
    o = -1
  for (
    e[n] < e[0] && ((e = e.slice().reverse()), (t = t.slice().reverse()));
    ++o < n;

  )
    (i[o] = Yf(e[o], e[o + 1])), (a[o] = r(t[o], t[o + 1]))
  return function (s) {
    var c = ts(e, s, 1, n) - 1
    return a[c](i[c](s))
  }
}
function ns(e, t) {
  return t
    .domain(e.domain())
    .range(e.range())
    .interpolate(e.interpolate())
    .clamp(e.clamp())
    .unknown(e.unknown())
}
function Tu() {
  var e = ym,
    t = ym,
    r = wa,
    n,
    i,
    a,
    o = st,
    s,
    c,
    u
  function l() {
    var d = Math.min(e.length, t.length)
    return (
      o !== st && (o = C6(e[0], e[d - 1])),
      (s = d > 2 ? T6 : j6),
      (c = u = null),
      f
    )
  }
  function f(d) {
    return d == null || isNaN((d = +d))
      ? a
      : (c || (c = s(e.map(n), t, r)))(n(o(d)))
  }
  return (
    (f.invert = function (d) {
      return o(i((u || (u = s(t, e.map(n), dc)))(d)))
    }),
    (f.domain = function (d) {
      return arguments.length ? ((e = Array.from(d, hc)), l()) : e.slice()
    }),
    (f.range = function (d) {
      return arguments.length ? ((t = Array.from(d)), l()) : t.slice()
    }),
    (f.rangeRound = function (d) {
      return (t = Array.from(d)), (r = tp), l()
    }),
    (f.clamp = function (d) {
      return arguments.length ? ((o = d ? !0 : st), l()) : o !== st
    }),
    (f.interpolate = function (d) {
      return arguments.length ? ((r = d), l()) : r
    }),
    (f.unknown = function (d) {
      return arguments.length ? ((a = d), f) : a
    }),
    function (d, h) {
      return (n = d), (i = h), l()
    }
  )
}
function rp() {
  return Tu()(st, st)
}
function k6(e) {
  return Math.abs((e = Math.round(e))) >= 1e21
    ? e.toLocaleString('en').replace(/,/g, '')
    : e.toString(10)
}
function pc(e, t) {
  if (
    (r = (e = t ? e.toExponential(t - 1) : e.toExponential()).indexOf('e')) < 0
  )
    return null
  var r,
    n = e.slice(0, r)
  return [n.length > 1 ? n[0] + n.slice(2) : n, +e.slice(r + 1)]
}
function Fi(e) {
  return (e = pc(Math.abs(e))), e ? e[1] : NaN
}
function M6(e, t) {
  return function (r, n) {
    for (
      var i = r.length, a = [], o = 0, s = e[0], c = 0;
      i > 0 &&
      s > 0 &&
      (c + s + 1 > n && (s = Math.max(1, n - c)),
      a.push(r.substring((i -= s), i + s)),
      !((c += s + 1) > n));

    )
      s = e[(o = (o + 1) % e.length)]
    return a.reverse().join(t)
  }
}
function N6(e) {
  return function (t) {
    return t.replace(/[0-9]/g, function (r) {
      return e[+r]
    })
  }
}
var I6 =
  /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i
function go(e) {
  if (!(t = I6.exec(e))) throw new Error('invalid format: ' + e)
  var t
  return new np({
    fill: t[1],
    align: t[2],
    sign: t[3],
    symbol: t[4],
    zero: t[5],
    width: t[6],
    comma: t[7],
    precision: t[8] && t[8].slice(1),
    trim: t[9],
    type: t[10],
  })
}
go.prototype = np.prototype
function np(e) {
  ;(this.fill = e.fill === void 0 ? ' ' : e.fill + ''),
    (this.align = e.align === void 0 ? '>' : e.align + ''),
    (this.sign = e.sign === void 0 ? '-' : e.sign + ''),
    (this.symbol = e.symbol === void 0 ? '' : e.symbol + ''),
    (this.zero = !!e.zero),
    (this.width = e.width === void 0 ? void 0 : +e.width),
    (this.comma = !!e.comma),
    (this.precision = e.precision === void 0 ? void 0 : +e.precision),
    (this.trim = !!e.trim),
    (this.type = e.type === void 0 ? '' : e.type + '')
}
np.prototype.toString = function () {
  return (
    this.fill +
    this.align +
    this.sign +
    this.symbol +
    (this.zero ? '0' : '') +
    (this.width === void 0 ? '' : Math.max(1, this.width | 0)) +
    (this.comma ? ',' : '') +
    (this.precision === void 0 ? '' : '.' + Math.max(0, this.precision | 0)) +
    (this.trim ? '~' : '') +
    this.type
  )
}
function R6(e) {
  e: for (var t = e.length, r = 1, n = -1, i; r < t; ++r)
    switch (e[r]) {
      case '.':
        n = i = r
        break
      case '0':
        n === 0 && (n = r), (i = r)
        break
      default:
        if (!+e[r]) break e
        n > 0 && (n = 0)
        break
    }
  return n > 0 ? e.slice(0, n) + e.slice(i + 1) : e
}
var Dw
function D6(e, t) {
  var r = pc(e, t)
  if (!r) return e + ''
  var n = r[0],
    i = r[1],
    a = i - (Dw = Math.max(-8, Math.min(8, Math.floor(i / 3))) * 3) + 1,
    o = n.length
  return a === o
    ? n
    : a > o
      ? n + new Array(a - o + 1).join('0')
      : a > 0
        ? n.slice(0, a) + '.' + n.slice(a)
        : '0.' + new Array(1 - a).join('0') + pc(e, Math.max(0, t + a - 1))[0]
}
function mm(e, t) {
  var r = pc(e, t)
  if (!r) return e + ''
  var n = r[0],
    i = r[1]
  return i < 0
    ? '0.' + new Array(-i).join('0') + n
    : n.length > i + 1
      ? n.slice(0, i + 1) + '.' + n.slice(i + 1)
      : n + new Array(i - n.length + 2).join('0')
}
const gm = {
  '%': (e, t) => (e * 100).toFixed(t),
  b: (e) => Math.round(e).toString(2),
  c: (e) => e + '',
  d: k6,
  e: (e, t) => e.toExponential(t),
  f: (e, t) => e.toFixed(t),
  g: (e, t) => e.toPrecision(t),
  o: (e) => Math.round(e).toString(8),
  p: (e, t) => mm(e * 100, t),
  r: mm,
  s: D6,
  X: (e) => Math.round(e).toString(16).toUpperCase(),
  x: (e) => Math.round(e).toString(16),
}
function bm(e) {
  return e
}
var xm = Array.prototype.map,
  wm = [
    'y',
    'z',
    'a',
    'f',
    'p',
    'n',
    'µ',
    'm',
    '',
    'k',
    'M',
    'G',
    'T',
    'P',
    'E',
    'Z',
    'Y',
  ]
function L6(e) {
  var t =
      e.grouping === void 0 || e.thousands === void 0
        ? bm
        : M6(xm.call(e.grouping, Number), e.thousands + ''),
    r = e.currency === void 0 ? '' : e.currency[0] + '',
    n = e.currency === void 0 ? '' : e.currency[1] + '',
    i = e.decimal === void 0 ? '.' : e.decimal + '',
    a = e.numerals === void 0 ? bm : N6(xm.call(e.numerals, String)),
    o = e.percent === void 0 ? '%' : e.percent + '',
    s = e.minus === void 0 ? '−' : e.minus + '',
    c = e.nan === void 0 ? 'NaN' : e.nan + ''
  function u(f) {
    f = go(f)
    var d = f.fill,
      h = f.align,
      y = f.sign,
      v = f.symbol,
      p = f.zero,
      x = f.width,
      b = f.comma,
      w = f.precision,
      g = f.trim,
      m = f.type
    m === 'n'
      ? ((b = !0), (m = 'g'))
      : gm[m] || (w === void 0 && (w = 12), (g = !0), (m = 'g')),
      (p || (d === '0' && h === '=')) && ((p = !0), (d = '0'), (h = '='))
    var S =
        v === '$'
          ? r
          : v === '#' && /[boxX]/.test(m)
            ? '0' + m.toLowerCase()
            : '',
      P = v === '$' ? n : /[%p]/.test(m) ? o : '',
      $ = gm[m],
      T = /[defgprs%]/.test(m)
    w =
      w === void 0
        ? 6
        : /[gprs]/.test(m)
          ? Math.max(1, Math.min(21, w))
          : Math.max(0, Math.min(20, w))
    function k(C) {
      var j = S,
        M = P,
        N,
        R,
        I
      if (m === 'c') (M = $(C) + M), (C = '')
      else {
        C = +C
        var L = C < 0 || 1 / C < 0
        if (
          ((C = isNaN(C) ? c : $(Math.abs(C), w)),
          g && (C = R6(C)),
          L && +C == 0 && y !== '+' && (L = !1),
          (j = (L ? (y === '(' ? y : s) : y === '-' || y === '(' ? '' : y) + j),
          (M =
            (m === 's' ? wm[8 + Dw / 3] : '') +
            M +
            (L && y === '(' ? ')' : '')),
          T)
        ) {
          for (N = -1, R = C.length; ++N < R; )
            if (((I = C.charCodeAt(N)), 48 > I || I > 57)) {
              ;(M = (I === 46 ? i + C.slice(N + 1) : C.slice(N)) + M),
                (C = C.slice(0, N))
              break
            }
        }
      }
      b && !p && (C = t(C, 1 / 0))
      var B = j.length + C.length + M.length,
        W = B < x ? new Array(x - B + 1).join(d) : ''
      switch (
        (b && p && ((C = t(W + C, W.length ? x - M.length : 1 / 0)), (W = '')),
        h)
      ) {
        case '<':
          C = j + C + M + W
          break
        case '=':
          C = j + W + C + M
          break
        case '^':
          C = W.slice(0, (B = W.length >> 1)) + j + C + M + W.slice(B)
          break
        default:
          C = W + j + C + M
          break
      }
      return a(C)
    }
    return (
      (k.toString = function () {
        return f + ''
      }),
      k
    )
  }
  function l(f, d) {
    var h = u(((f = go(f)), (f.type = 'f'), f)),
      y = Math.max(-8, Math.min(8, Math.floor(Fi(d) / 3))) * 3,
      v = Math.pow(10, -y),
      p = wm[8 + y / 3]
    return function (x) {
      return h(v * x) + p
    }
  }
  return { format: u, formatPrefix: l }
}
var As, ip, Lw
B6({ thousands: ',', grouping: [3], currency: ['$', ''] })
function B6(e) {
  return (As = L6(e)), (ip = As.format), (Lw = As.formatPrefix), As
}
function F6(e) {
  return Math.max(0, -Fi(Math.abs(e)))
}
function U6(e, t) {
  return Math.max(
    0,
    Math.max(-8, Math.min(8, Math.floor(Fi(t) / 3))) * 3 - Fi(Math.abs(e)),
  )
}
function W6(e, t) {
  return (
    (e = Math.abs(e)), (t = Math.abs(t) - e), Math.max(0, Fi(t) - Fi(e)) + 1
  )
}
function Bw(e, t, r, n) {
  var i = Kf(e, t, r),
    a
  switch (((n = go(n ?? ',f')), n.type)) {
    case 's': {
      var o = Math.max(Math.abs(e), Math.abs(t))
      return (
        n.precision == null && !isNaN((a = U6(i, o))) && (n.precision = a),
        Lw(n, o)
      )
    }
    case '':
    case 'e':
    case 'g':
    case 'p':
    case 'r': {
      n.precision == null &&
        !isNaN((a = W6(i, Math.max(Math.abs(e), Math.abs(t))))) &&
        (n.precision = a - (n.type === 'e'))
      break
    }
    case 'f':
    case '%': {
      n.precision == null &&
        !isNaN((a = F6(i))) &&
        (n.precision = a - (n.type === '%') * 2)
      break
    }
  }
  return ip(n)
}
function cn(e) {
  var t = e.domain
  return (
    (e.ticks = function (r) {
      var n = t()
      return Hf(n[0], n[n.length - 1], r ?? 10)
    }),
    (e.tickFormat = function (r, n) {
      var i = t()
      return Bw(i[0], i[i.length - 1], r ?? 10, n)
    }),
    (e.nice = function (r) {
      r == null && (r = 10)
      var n = t(),
        i = 0,
        a = n.length - 1,
        o = n[i],
        s = n[a],
        c,
        u,
        l = 10
      for (
        s < o && ((u = o), (o = s), (s = u), (u = i), (i = a), (a = u));
        l-- > 0;

      ) {
        if (((u = zf(o, s, r)), u === c)) return (n[i] = o), (n[a] = s), t(n)
        if (u > 0) (o = Math.floor(o / u) * u), (s = Math.ceil(s / u) * u)
        else if (u < 0) (o = Math.ceil(o * u) / u), (s = Math.floor(s * u) / u)
        else break
        c = u
      }
      return e
    }),
    e
  )
}
function vc() {
  var e = rp()
  return (
    (e.copy = function () {
      return ns(e, vc())
    }),
    Dt.apply(e, arguments),
    cn(e)
  )
}
function Fw(e) {
  var t
  function r(n) {
    return n == null || isNaN((n = +n)) ? t : n
  }
  return (
    (r.invert = r),
    (r.domain = r.range =
      function (n) {
        return arguments.length ? ((e = Array.from(n, hc)), r) : e.slice()
      }),
    (r.unknown = function (n) {
      return arguments.length ? ((t = n), r) : t
    }),
    (r.copy = function () {
      return Fw(e).unknown(t)
    }),
    (e = arguments.length ? Array.from(e, hc) : [0, 1]),
    cn(r)
  )
}
function Uw(e, t) {
  e = e.slice()
  var r = 0,
    n = e.length - 1,
    i = e[r],
    a = e[n],
    o
  return (
    a < i && ((o = r), (r = n), (n = o), (o = i), (i = a), (a = o)),
    (e[r] = t.floor(i)),
    (e[n] = t.ceil(a)),
    e
  )
}
function Om(e) {
  return Math.log(e)
}
function Sm(e) {
  return Math.exp(e)
}
function q6(e) {
  return -Math.log(-e)
}
function H6(e) {
  return -Math.exp(-e)
}
function z6(e) {
  return isFinite(e) ? +('1e' + e) : e < 0 ? 0 : e
}
function K6(e) {
  return e === 10 ? z6 : e === Math.E ? Math.exp : (t) => Math.pow(e, t)
}
function G6(e) {
  return e === Math.E
    ? Math.log
    : (e === 10 && Math.log10) ||
        (e === 2 && Math.log2) ||
        ((e = Math.log(e)), (t) => Math.log(t) / e)
}
function Am(e) {
  return (t, r) => -e(-t, r)
}
function ap(e) {
  const t = e(Om, Sm),
    r = t.domain
  let n = 10,
    i,
    a
  function o() {
    return (
      (i = G6(n)),
      (a = K6(n)),
      r()[0] < 0 ? ((i = Am(i)), (a = Am(a)), e(q6, H6)) : e(Om, Sm),
      t
    )
  }
  return (
    (t.base = function (s) {
      return arguments.length ? ((n = +s), o()) : n
    }),
    (t.domain = function (s) {
      return arguments.length ? (r(s), o()) : r()
    }),
    (t.ticks = (s) => {
      const c = r()
      let u = c[0],
        l = c[c.length - 1]
      const f = l < u
      f && ([u, l] = [l, u])
      let d = i(u),
        h = i(l),
        y,
        v
      const p = s == null ? 10 : +s
      let x = []
      if (!(n % 1) && h - d < p) {
        if (((d = Math.floor(d)), (h = Math.ceil(h)), u > 0)) {
          for (; d <= h; ++d)
            for (y = 1; y < n; ++y)
              if (((v = d < 0 ? y / a(-d) : y * a(d)), !(v < u))) {
                if (v > l) break
                x.push(v)
              }
        } else
          for (; d <= h; ++d)
            for (y = n - 1; y >= 1; --y)
              if (((v = d > 0 ? y / a(-d) : y * a(d)), !(v < u))) {
                if (v > l) break
                x.push(v)
              }
        x.length * 2 < p && (x = Hf(u, l, p))
      } else x = Hf(d, h, Math.min(h - d, p)).map(a)
      return f ? x.reverse() : x
    }),
    (t.tickFormat = (s, c) => {
      if (
        (s == null && (s = 10),
        c == null && (c = n === 10 ? 's' : ','),
        typeof c != 'function' &&
          (!(n % 1) && (c = go(c)).precision == null && (c.trim = !0),
          (c = ip(c))),
        s === 1 / 0)
      )
        return c
      const u = Math.max(1, (n * s) / t.ticks().length)
      return (l) => {
        let f = l / a(Math.round(i(l)))
        return f * n < n - 0.5 && (f *= n), f <= u ? c(l) : ''
      }
    }),
    (t.nice = () =>
      r(
        Uw(r(), {
          floor: (s) => a(Math.floor(i(s))),
          ceil: (s) => a(Math.ceil(i(s))),
        }),
      )),
    t
  )
}
function Ww() {
  const e = ap(Tu()).domain([1, 10])
  return (e.copy = () => ns(e, Ww()).base(e.base())), Dt.apply(e, arguments), e
}
function Pm(e) {
  return function (t) {
    return Math.sign(t) * Math.log1p(Math.abs(t / e))
  }
}
function $m(e) {
  return function (t) {
    return Math.sign(t) * Math.expm1(Math.abs(t)) * e
  }
}
function op(e) {
  var t = 1,
    r = e(Pm(t), $m(t))
  return (
    (r.constant = function (n) {
      return arguments.length ? e(Pm((t = +n)), $m(t)) : t
    }),
    cn(r)
  )
}
function qw() {
  var e = op(Tu())
  return (
    (e.copy = function () {
      return ns(e, qw()).constant(e.constant())
    }),
    Dt.apply(e, arguments)
  )
}
function Em(e) {
  return function (t) {
    return t < 0 ? -Math.pow(-t, e) : Math.pow(t, e)
  }
}
function V6(e) {
  return e < 0 ? -Math.sqrt(-e) : Math.sqrt(e)
}
function X6(e) {
  return e < 0 ? -e * e : e * e
}
function sp(e) {
  var t = e(st, st),
    r = 1
  function n() {
    return r === 1 ? e(st, st) : r === 0.5 ? e(V6, X6) : e(Em(r), Em(1 / r))
  }
  return (
    (t.exponent = function (i) {
      return arguments.length ? ((r = +i), n()) : r
    }),
    cn(t)
  )
}
function cp() {
  var e = sp(Tu())
  return (
    (e.copy = function () {
      return ns(e, cp()).exponent(e.exponent())
    }),
    Dt.apply(e, arguments),
    e
  )
}
function Y6() {
  return cp.apply(null, arguments).exponent(0.5)
}
function _m(e) {
  return Math.sign(e) * e * e
}
function Q6(e) {
  return Math.sign(e) * Math.sqrt(Math.abs(e))
}
function Hw() {
  var e = rp(),
    t = [0, 1],
    r = !1,
    n
  function i(a) {
    var o = Q6(e(a))
    return isNaN(o) ? n : r ? Math.round(o) : o
  }
  return (
    (i.invert = function (a) {
      return e.invert(_m(a))
    }),
    (i.domain = function (a) {
      return arguments.length ? (e.domain(a), i) : e.domain()
    }),
    (i.range = function (a) {
      return arguments.length
        ? (e.range((t = Array.from(a, hc)).map(_m)), i)
        : t.slice()
    }),
    (i.rangeRound = function (a) {
      return i.range(a).round(!0)
    }),
    (i.round = function (a) {
      return arguments.length ? ((r = !!a), i) : r
    }),
    (i.clamp = function (a) {
      return arguments.length ? (e.clamp(a), i) : e.clamp()
    }),
    (i.unknown = function (a) {
      return arguments.length ? ((n = a), i) : n
    }),
    (i.copy = function () {
      return Hw(e.domain(), t).round(r).clamp(e.clamp()).unknown(n)
    }),
    Dt.apply(i, arguments),
    cn(i)
  )
}
function zw() {
  var e = [],
    t = [],
    r = [],
    n
  function i() {
    var o = 0,
      s = Math.max(1, t.length)
    for (r = new Array(s - 1); ++o < s; ) r[o - 1] = r6(e, o / s)
    return a
  }
  function a(o) {
    return o == null || isNaN((o = +o)) ? n : t[ts(r, o)]
  }
  return (
    (a.invertExtent = function (o) {
      var s = t.indexOf(o)
      return s < 0
        ? [NaN, NaN]
        : [s > 0 ? r[s - 1] : e[0], s < r.length ? r[s] : e[e.length - 1]]
    }),
    (a.domain = function (o) {
      if (!arguments.length) return e.slice()
      e = []
      for (let s of o) s != null && !isNaN((s = +s)) && e.push(s)
      return e.sort(tn), i()
    }),
    (a.range = function (o) {
      return arguments.length ? ((t = Array.from(o)), i()) : t.slice()
    }),
    (a.unknown = function (o) {
      return arguments.length ? ((n = o), a) : n
    }),
    (a.quantiles = function () {
      return r.slice()
    }),
    (a.copy = function () {
      return zw().domain(e).range(t).unknown(n)
    }),
    Dt.apply(a, arguments)
  )
}
function Kw() {
  var e = 0,
    t = 1,
    r = 1,
    n = [0.5],
    i = [0, 1],
    a
  function o(c) {
    return c != null && c <= c ? i[ts(n, c, 0, r)] : a
  }
  function s() {
    var c = -1
    for (n = new Array(r); ++c < r; )
      n[c] = ((c + 1) * t - (c - r) * e) / (r + 1)
    return o
  }
  return (
    (o.domain = function (c) {
      return arguments.length ? (([e, t] = c), (e = +e), (t = +t), s()) : [e, t]
    }),
    (o.range = function (c) {
      return arguments.length
        ? ((r = (i = Array.from(c)).length - 1), s())
        : i.slice()
    }),
    (o.invertExtent = function (c) {
      var u = i.indexOf(c)
      return u < 0
        ? [NaN, NaN]
        : u < 1
          ? [e, n[0]]
          : u >= r
            ? [n[r - 1], t]
            : [n[u - 1], n[u]]
    }),
    (o.unknown = function (c) {
      return arguments.length && (a = c), o
    }),
    (o.thresholds = function () {
      return n.slice()
    }),
    (o.copy = function () {
      return Kw().domain([e, t]).range(i).unknown(a)
    }),
    Dt.apply(cn(o), arguments)
  )
}
function Gw() {
  var e = [0.5],
    t = [0, 1],
    r,
    n = 1
  function i(a) {
    return a != null && a <= a ? t[ts(e, a, 0, n)] : r
  }
  return (
    (i.domain = function (a) {
      return arguments.length
        ? ((e = Array.from(a)), (n = Math.min(e.length, t.length - 1)), i)
        : e.slice()
    }),
    (i.range = function (a) {
      return arguments.length
        ? ((t = Array.from(a)), (n = Math.min(e.length, t.length - 1)), i)
        : t.slice()
    }),
    (i.invertExtent = function (a) {
      var o = t.indexOf(a)
      return [e[o - 1], e[o]]
    }),
    (i.unknown = function (a) {
      return arguments.length ? ((r = a), i) : r
    }),
    (i.copy = function () {
      return Gw().domain(e).range(t).unknown(r)
    }),
    Dt.apply(i, arguments)
  )
}
const $l = new Date(),
  El = new Date()
function qe(e, t, r, n) {
  function i(a) {
    return e((a = arguments.length === 0 ? new Date() : new Date(+a))), a
  }
  return (
    (i.floor = (a) => (e((a = new Date(+a))), a)),
    (i.ceil = (a) => (e((a = new Date(a - 1))), t(a, 1), e(a), a)),
    (i.round = (a) => {
      const o = i(a),
        s = i.ceil(a)
      return a - o < s - a ? o : s
    }),
    (i.offset = (a, o) => (
      t((a = new Date(+a)), o == null ? 1 : Math.floor(o)), a
    )),
    (i.range = (a, o, s) => {
      const c = []
      if (
        ((a = i.ceil(a)),
        (s = s == null ? 1 : Math.floor(s)),
        !(a < o) || !(s > 0))
      )
        return c
      let u
      do c.push((u = new Date(+a))), t(a, s), e(a)
      while (u < a && a < o)
      return c
    }),
    (i.filter = (a) =>
      qe(
        (o) => {
          if (o >= o) for (; e(o), !a(o); ) o.setTime(o - 1)
        },
        (o, s) => {
          if (o >= o)
            if (s < 0) for (; ++s <= 0; ) for (; t(o, -1), !a(o); );
            else for (; --s >= 0; ) for (; t(o, 1), !a(o); );
        },
      )),
    r &&
      ((i.count = (a, o) => (
        $l.setTime(+a), El.setTime(+o), e($l), e(El), Math.floor(r($l, El))
      )),
      (i.every = (a) => (
        (a = Math.floor(a)),
        !isFinite(a) || !(a > 0)
          ? null
          : a > 1
            ? i.filter(
                n ? (o) => n(o) % a === 0 : (o) => i.count(0, o) % a === 0,
              )
            : i
      ))),
    i
  )
}
const yc = qe(
  () => {},
  (e, t) => {
    e.setTime(+e + t)
  },
  (e, t) => t - e,
)
yc.every = (e) => (
  (e = Math.floor(e)),
  !isFinite(e) || !(e > 0)
    ? null
    : e > 1
      ? qe(
          (t) => {
            t.setTime(Math.floor(t / e) * e)
          },
          (t, r) => {
            t.setTime(+t + r * e)
          },
          (t, r) => (r - t) / e,
        )
      : yc
)
yc.range
const gr = 1e3,
  kt = gr * 60,
  br = kt * 60,
  jr = br * 24,
  up = jr * 7,
  Cm = jr * 30,
  _l = jr * 365,
  wn = qe(
    (e) => {
      e.setTime(e - e.getMilliseconds())
    },
    (e, t) => {
      e.setTime(+e + t * gr)
    },
    (e, t) => (t - e) / gr,
    (e) => e.getUTCSeconds(),
  )
wn.range
const lp = qe(
  (e) => {
    e.setTime(e - e.getMilliseconds() - e.getSeconds() * gr)
  },
  (e, t) => {
    e.setTime(+e + t * kt)
  },
  (e, t) => (t - e) / kt,
  (e) => e.getMinutes(),
)
lp.range
const fp = qe(
  (e) => {
    e.setUTCSeconds(0, 0)
  },
  (e, t) => {
    e.setTime(+e + t * kt)
  },
  (e, t) => (t - e) / kt,
  (e) => e.getUTCMinutes(),
)
fp.range
const dp = qe(
  (e) => {
    e.setTime(
      e - e.getMilliseconds() - e.getSeconds() * gr - e.getMinutes() * kt,
    )
  },
  (e, t) => {
    e.setTime(+e + t * br)
  },
  (e, t) => (t - e) / br,
  (e) => e.getHours(),
)
dp.range
const hp = qe(
  (e) => {
    e.setUTCMinutes(0, 0, 0)
  },
  (e, t) => {
    e.setTime(+e + t * br)
  },
  (e, t) => (t - e) / br,
  (e) => e.getUTCHours(),
)
hp.range
const is = qe(
  (e) => e.setHours(0, 0, 0, 0),
  (e, t) => e.setDate(e.getDate() + t),
  (e, t) => (t - e - (t.getTimezoneOffset() - e.getTimezoneOffset()) * kt) / jr,
  (e) => e.getDate() - 1,
)
is.range
const ku = qe(
  (e) => {
    e.setUTCHours(0, 0, 0, 0)
  },
  (e, t) => {
    e.setUTCDate(e.getUTCDate() + t)
  },
  (e, t) => (t - e) / jr,
  (e) => e.getUTCDate() - 1,
)
ku.range
const Vw = qe(
  (e) => {
    e.setUTCHours(0, 0, 0, 0)
  },
  (e, t) => {
    e.setUTCDate(e.getUTCDate() + t)
  },
  (e, t) => (t - e) / jr,
  (e) => Math.floor(e / jr),
)
Vw.range
function Kn(e) {
  return qe(
    (t) => {
      t.setDate(t.getDate() - ((t.getDay() + 7 - e) % 7)),
        t.setHours(0, 0, 0, 0)
    },
    (t, r) => {
      t.setDate(t.getDate() + r * 7)
    },
    (t, r) =>
      (r - t - (r.getTimezoneOffset() - t.getTimezoneOffset()) * kt) / up,
  )
}
const Mu = Kn(0),
  mc = Kn(1),
  Z6 = Kn(2),
  J6 = Kn(3),
  Ui = Kn(4),
  e4 = Kn(5),
  t4 = Kn(6)
Mu.range
mc.range
Z6.range
J6.range
Ui.range
e4.range
t4.range
function Gn(e) {
  return qe(
    (t) => {
      t.setUTCDate(t.getUTCDate() - ((t.getUTCDay() + 7 - e) % 7)),
        t.setUTCHours(0, 0, 0, 0)
    },
    (t, r) => {
      t.setUTCDate(t.getUTCDate() + r * 7)
    },
    (t, r) => (r - t) / up,
  )
}
const Nu = Gn(0),
  gc = Gn(1),
  r4 = Gn(2),
  n4 = Gn(3),
  Wi = Gn(4),
  i4 = Gn(5),
  a4 = Gn(6)
Nu.range
gc.range
r4.range
n4.range
Wi.range
i4.range
a4.range
const pp = qe(
  (e) => {
    e.setDate(1), e.setHours(0, 0, 0, 0)
  },
  (e, t) => {
    e.setMonth(e.getMonth() + t)
  },
  (e, t) =>
    t.getMonth() - e.getMonth() + (t.getFullYear() - e.getFullYear()) * 12,
  (e) => e.getMonth(),
)
pp.range
const vp = qe(
  (e) => {
    e.setUTCDate(1), e.setUTCHours(0, 0, 0, 0)
  },
  (e, t) => {
    e.setUTCMonth(e.getUTCMonth() + t)
  },
  (e, t) =>
    t.getUTCMonth() -
    e.getUTCMonth() +
    (t.getUTCFullYear() - e.getUTCFullYear()) * 12,
  (e) => e.getUTCMonth(),
)
vp.range
const Tr = qe(
  (e) => {
    e.setMonth(0, 1), e.setHours(0, 0, 0, 0)
  },
  (e, t) => {
    e.setFullYear(e.getFullYear() + t)
  },
  (e, t) => t.getFullYear() - e.getFullYear(),
  (e) => e.getFullYear(),
)
Tr.every = (e) =>
  !isFinite((e = Math.floor(e))) || !(e > 0)
    ? null
    : qe(
        (t) => {
          t.setFullYear(Math.floor(t.getFullYear() / e) * e),
            t.setMonth(0, 1),
            t.setHours(0, 0, 0, 0)
        },
        (t, r) => {
          t.setFullYear(t.getFullYear() + r * e)
        },
      )
Tr.range
const kr = qe(
  (e) => {
    e.setUTCMonth(0, 1), e.setUTCHours(0, 0, 0, 0)
  },
  (e, t) => {
    e.setUTCFullYear(e.getUTCFullYear() + t)
  },
  (e, t) => t.getUTCFullYear() - e.getUTCFullYear(),
  (e) => e.getUTCFullYear(),
)
kr.every = (e) =>
  !isFinite((e = Math.floor(e))) || !(e > 0)
    ? null
    : qe(
        (t) => {
          t.setUTCFullYear(Math.floor(t.getUTCFullYear() / e) * e),
            t.setUTCMonth(0, 1),
            t.setUTCHours(0, 0, 0, 0)
        },
        (t, r) => {
          t.setUTCFullYear(t.getUTCFullYear() + r * e)
        },
      )
kr.range
function Xw(e, t, r, n, i, a) {
  const o = [
    [wn, 1, gr],
    [wn, 5, 5 * gr],
    [wn, 15, 15 * gr],
    [wn, 30, 30 * gr],
    [a, 1, kt],
    [a, 5, 5 * kt],
    [a, 15, 15 * kt],
    [a, 30, 30 * kt],
    [i, 1, br],
    [i, 3, 3 * br],
    [i, 6, 6 * br],
    [i, 12, 12 * br],
    [n, 1, jr],
    [n, 2, 2 * jr],
    [r, 1, up],
    [t, 1, Cm],
    [t, 3, 3 * Cm],
    [e, 1, _l],
  ]
  function s(u, l, f) {
    const d = l < u
    d && ([u, l] = [l, u])
    const h = f && typeof f.range == 'function' ? f : c(u, l, f),
      y = h ? h.range(u, +l + 1) : []
    return d ? y.reverse() : y
  }
  function c(u, l, f) {
    const d = Math.abs(l - u) / f,
      h = Qh(([, , p]) => p).right(o, d)
    if (h === o.length) return e.every(Kf(u / _l, l / _l, f))
    if (h === 0) return yc.every(Math.max(Kf(u, l, f), 1))
    const [y, v] = o[d / o[h - 1][2] < o[h][2] / d ? h - 1 : h]
    return y.every(v)
  }
  return [s, c]
}
const [o4, s4] = Xw(kr, vp, Nu, Vw, hp, fp),
  [c4, u4] = Xw(Tr, pp, Mu, is, dp, lp)
function Cl(e) {
  if (0 <= e.y && e.y < 100) {
    var t = new Date(-1, e.m, e.d, e.H, e.M, e.S, e.L)
    return t.setFullYear(e.y), t
  }
  return new Date(e.y, e.m, e.d, e.H, e.M, e.S, e.L)
}
function jl(e) {
  if (0 <= e.y && e.y < 100) {
    var t = new Date(Date.UTC(-1, e.m, e.d, e.H, e.M, e.S, e.L))
    return t.setUTCFullYear(e.y), t
  }
  return new Date(Date.UTC(e.y, e.m, e.d, e.H, e.M, e.S, e.L))
}
function Ma(e, t, r) {
  return { y: e, m: t, d: r, H: 0, M: 0, S: 0, L: 0 }
}
function l4(e) {
  var t = e.dateTime,
    r = e.date,
    n = e.time,
    i = e.periods,
    a = e.days,
    o = e.shortDays,
    s = e.months,
    c = e.shortMonths,
    u = Na(i),
    l = Ia(i),
    f = Na(a),
    d = Ia(a),
    h = Na(o),
    y = Ia(o),
    v = Na(s),
    p = Ia(s),
    x = Na(c),
    b = Ia(c),
    w = {
      a: L,
      A: B,
      b: W,
      B: G,
      c: null,
      d: Im,
      e: Im,
      f: M4,
      g: q4,
      G: z4,
      H: j4,
      I: T4,
      j: k4,
      L: Yw,
      m: N4,
      M: I4,
      p: z,
      q: H,
      Q: Lm,
      s: Bm,
      S: R4,
      u: D4,
      U: L4,
      V: B4,
      w: F4,
      W: U4,
      x: null,
      X: null,
      y: W4,
      Y: H4,
      Z: K4,
      '%': Dm,
    },
    g = {
      a: Q,
      A: ne,
      b: he,
      B: Ge,
      c: null,
      d: Rm,
      e: Rm,
      f: Y4,
      g: o7,
      G: c7,
      H: G4,
      I: V4,
      j: X4,
      L: Zw,
      m: Q4,
      M: Z4,
      p: je,
      q: Le,
      Q: Lm,
      s: Bm,
      S: J4,
      u: e7,
      U: t7,
      V: r7,
      w: n7,
      W: i7,
      x: null,
      X: null,
      y: a7,
      Y: s7,
      Z: u7,
      '%': Dm,
    },
    m = {
      a: k,
      A: C,
      b: j,
      B: M,
      c: N,
      d: Mm,
      e: Mm,
      f: $4,
      g: km,
      G: Tm,
      H: Nm,
      I: Nm,
      j: O4,
      L: P4,
      m: w4,
      M: S4,
      p: T,
      q: x4,
      Q: _4,
      s: C4,
      S: A4,
      u: v4,
      U: y4,
      V: m4,
      w: p4,
      W: g4,
      x: R,
      X: I,
      y: km,
      Y: Tm,
      Z: b4,
      '%': E4,
    }
  ;(w.x = S(r, w)),
    (w.X = S(n, w)),
    (w.c = S(t, w)),
    (g.x = S(r, g)),
    (g.X = S(n, g)),
    (g.c = S(t, g))
  function S(q, te) {
    return function (ae) {
      var F = [],
        be = -1,
        le = 0,
        oe = q.length,
        Oe,
        Ne,
        Lt
      for (ae instanceof Date || (ae = new Date(+ae)); ++be < oe; )
        q.charCodeAt(be) === 37 &&
          (F.push(q.slice(le, be)),
          (Ne = jm[(Oe = q.charAt(++be))]) != null
            ? (Oe = q.charAt(++be))
            : (Ne = Oe === 'e' ? ' ' : '0'),
          (Lt = te[Oe]) && (Oe = Lt(ae, Ne)),
          F.push(Oe),
          (le = be + 1))
      return F.push(q.slice(le, be)), F.join('')
    }
  }
  function P(q, te) {
    return function (ae) {
      var F = Ma(1900, void 0, 1),
        be = $(F, q, (ae += ''), 0),
        le,
        oe
      if (be != ae.length) return null
      if ('Q' in F) return new Date(F.Q)
      if ('s' in F) return new Date(F.s * 1e3 + ('L' in F ? F.L : 0))
      if (
        (te && !('Z' in F) && (F.Z = 0),
        'p' in F && (F.H = (F.H % 12) + F.p * 12),
        F.m === void 0 && (F.m = 'q' in F ? F.q : 0),
        'V' in F)
      ) {
        if (F.V < 1 || F.V > 53) return null
        'w' in F || (F.w = 1),
          'Z' in F
            ? ((le = jl(Ma(F.y, 0, 1))),
              (oe = le.getUTCDay()),
              (le = oe > 4 || oe === 0 ? gc.ceil(le) : gc(le)),
              (le = ku.offset(le, (F.V - 1) * 7)),
              (F.y = le.getUTCFullYear()),
              (F.m = le.getUTCMonth()),
              (F.d = le.getUTCDate() + ((F.w + 6) % 7)))
            : ((le = Cl(Ma(F.y, 0, 1))),
              (oe = le.getDay()),
              (le = oe > 4 || oe === 0 ? mc.ceil(le) : mc(le)),
              (le = is.offset(le, (F.V - 1) * 7)),
              (F.y = le.getFullYear()),
              (F.m = le.getMonth()),
              (F.d = le.getDate() + ((F.w + 6) % 7)))
      } else
        ('W' in F || 'U' in F) &&
          ('w' in F || (F.w = 'u' in F ? F.u % 7 : 'W' in F ? 1 : 0),
          (oe =
            'Z' in F
              ? jl(Ma(F.y, 0, 1)).getUTCDay()
              : Cl(Ma(F.y, 0, 1)).getDay()),
          (F.m = 0),
          (F.d =
            'W' in F
              ? ((F.w + 6) % 7) + F.W * 7 - ((oe + 5) % 7)
              : F.w + F.U * 7 - ((oe + 6) % 7)))
      return 'Z' in F
        ? ((F.H += (F.Z / 100) | 0), (F.M += F.Z % 100), jl(F))
        : Cl(F)
    }
  }
  function $(q, te, ae, F) {
    for (var be = 0, le = te.length, oe = ae.length, Oe, Ne; be < le; ) {
      if (F >= oe) return -1
      if (((Oe = te.charCodeAt(be++)), Oe === 37)) {
        if (
          ((Oe = te.charAt(be++)),
          (Ne = m[Oe in jm ? te.charAt(be++) : Oe]),
          !Ne || (F = Ne(q, ae, F)) < 0)
        )
          return -1
      } else if (Oe != ae.charCodeAt(F++)) return -1
    }
    return F
  }
  function T(q, te, ae) {
    var F = u.exec(te.slice(ae))
    return F ? ((q.p = l.get(F[0].toLowerCase())), ae + F[0].length) : -1
  }
  function k(q, te, ae) {
    var F = h.exec(te.slice(ae))
    return F ? ((q.w = y.get(F[0].toLowerCase())), ae + F[0].length) : -1
  }
  function C(q, te, ae) {
    var F = f.exec(te.slice(ae))
    return F ? ((q.w = d.get(F[0].toLowerCase())), ae + F[0].length) : -1
  }
  function j(q, te, ae) {
    var F = x.exec(te.slice(ae))
    return F ? ((q.m = b.get(F[0].toLowerCase())), ae + F[0].length) : -1
  }
  function M(q, te, ae) {
    var F = v.exec(te.slice(ae))
    return F ? ((q.m = p.get(F[0].toLowerCase())), ae + F[0].length) : -1
  }
  function N(q, te, ae) {
    return $(q, t, te, ae)
  }
  function R(q, te, ae) {
    return $(q, r, te, ae)
  }
  function I(q, te, ae) {
    return $(q, n, te, ae)
  }
  function L(q) {
    return o[q.getDay()]
  }
  function B(q) {
    return a[q.getDay()]
  }
  function W(q) {
    return c[q.getMonth()]
  }
  function G(q) {
    return s[q.getMonth()]
  }
  function z(q) {
    return i[+(q.getHours() >= 12)]
  }
  function H(q) {
    return 1 + ~~(q.getMonth() / 3)
  }
  function Q(q) {
    return o[q.getUTCDay()]
  }
  function ne(q) {
    return a[q.getUTCDay()]
  }
  function he(q) {
    return c[q.getUTCMonth()]
  }
  function Ge(q) {
    return s[q.getUTCMonth()]
  }
  function je(q) {
    return i[+(q.getUTCHours() >= 12)]
  }
  function Le(q) {
    return 1 + ~~(q.getUTCMonth() / 3)
  }
  return {
    format: function (q) {
      var te = S((q += ''), w)
      return (
        (te.toString = function () {
          return q
        }),
        te
      )
    },
    parse: function (q) {
      var te = P((q += ''), !1)
      return (
        (te.toString = function () {
          return q
        }),
        te
      )
    },
    utcFormat: function (q) {
      var te = S((q += ''), g)
      return (
        (te.toString = function () {
          return q
        }),
        te
      )
    },
    utcParse: function (q) {
      var te = P((q += ''), !0)
      return (
        (te.toString = function () {
          return q
        }),
        te
      )
    },
  }
}
var jm = { '-': '', _: ' ', 0: '0' },
  Ke = /^\s*\d+/,
  f4 = /^%/,
  d4 = /[\\^$*+?|[\]().{}]/g
function ve(e, t, r) {
  var n = e < 0 ? '-' : '',
    i = (n ? -e : e) + '',
    a = i.length
  return n + (a < r ? new Array(r - a + 1).join(t) + i : i)
}
function h4(e) {
  return e.replace(d4, '\\$&')
}
function Na(e) {
  return new RegExp('^(?:' + e.map(h4).join('|') + ')', 'i')
}
function Ia(e) {
  return new Map(e.map((t, r) => [t.toLowerCase(), r]))
}
function p4(e, t, r) {
  var n = Ke.exec(t.slice(r, r + 1))
  return n ? ((e.w = +n[0]), r + n[0].length) : -1
}
function v4(e, t, r) {
  var n = Ke.exec(t.slice(r, r + 1))
  return n ? ((e.u = +n[0]), r + n[0].length) : -1
}
function y4(e, t, r) {
  var n = Ke.exec(t.slice(r, r + 2))
  return n ? ((e.U = +n[0]), r + n[0].length) : -1
}
function m4(e, t, r) {
  var n = Ke.exec(t.slice(r, r + 2))
  return n ? ((e.V = +n[0]), r + n[0].length) : -1
}
function g4(e, t, r) {
  var n = Ke.exec(t.slice(r, r + 2))
  return n ? ((e.W = +n[0]), r + n[0].length) : -1
}
function Tm(e, t, r) {
  var n = Ke.exec(t.slice(r, r + 4))
  return n ? ((e.y = +n[0]), r + n[0].length) : -1
}
function km(e, t, r) {
  var n = Ke.exec(t.slice(r, r + 2))
  return n ? ((e.y = +n[0] + (+n[0] > 68 ? 1900 : 2e3)), r + n[0].length) : -1
}
function b4(e, t, r) {
  var n = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(t.slice(r, r + 6))
  return n ? ((e.Z = n[1] ? 0 : -(n[2] + (n[3] || '00'))), r + n[0].length) : -1
}
function x4(e, t, r) {
  var n = Ke.exec(t.slice(r, r + 1))
  return n ? ((e.q = n[0] * 3 - 3), r + n[0].length) : -1
}
function w4(e, t, r) {
  var n = Ke.exec(t.slice(r, r + 2))
  return n ? ((e.m = n[0] - 1), r + n[0].length) : -1
}
function Mm(e, t, r) {
  var n = Ke.exec(t.slice(r, r + 2))
  return n ? ((e.d = +n[0]), r + n[0].length) : -1
}
function O4(e, t, r) {
  var n = Ke.exec(t.slice(r, r + 3))
  return n ? ((e.m = 0), (e.d = +n[0]), r + n[0].length) : -1
}
function Nm(e, t, r) {
  var n = Ke.exec(t.slice(r, r + 2))
  return n ? ((e.H = +n[0]), r + n[0].length) : -1
}
function S4(e, t, r) {
  var n = Ke.exec(t.slice(r, r + 2))
  return n ? ((e.M = +n[0]), r + n[0].length) : -1
}
function A4(e, t, r) {
  var n = Ke.exec(t.slice(r, r + 2))
  return n ? ((e.S = +n[0]), r + n[0].length) : -1
}
function P4(e, t, r) {
  var n = Ke.exec(t.slice(r, r + 3))
  return n ? ((e.L = +n[0]), r + n[0].length) : -1
}
function $4(e, t, r) {
  var n = Ke.exec(t.slice(r, r + 6))
  return n ? ((e.L = Math.floor(n[0] / 1e3)), r + n[0].length) : -1
}
function E4(e, t, r) {
  var n = f4.exec(t.slice(r, r + 1))
  return n ? r + n[0].length : -1
}
function _4(e, t, r) {
  var n = Ke.exec(t.slice(r))
  return n ? ((e.Q = +n[0]), r + n[0].length) : -1
}
function C4(e, t, r) {
  var n = Ke.exec(t.slice(r))
  return n ? ((e.s = +n[0]), r + n[0].length) : -1
}
function Im(e, t) {
  return ve(e.getDate(), t, 2)
}
function j4(e, t) {
  return ve(e.getHours(), t, 2)
}
function T4(e, t) {
  return ve(e.getHours() % 12 || 12, t, 2)
}
function k4(e, t) {
  return ve(1 + is.count(Tr(e), e), t, 3)
}
function Yw(e, t) {
  return ve(e.getMilliseconds(), t, 3)
}
function M4(e, t) {
  return Yw(e, t) + '000'
}
function N4(e, t) {
  return ve(e.getMonth() + 1, t, 2)
}
function I4(e, t) {
  return ve(e.getMinutes(), t, 2)
}
function R4(e, t) {
  return ve(e.getSeconds(), t, 2)
}
function D4(e) {
  var t = e.getDay()
  return t === 0 ? 7 : t
}
function L4(e, t) {
  return ve(Mu.count(Tr(e) - 1, e), t, 2)
}
function Qw(e) {
  var t = e.getDay()
  return t >= 4 || t === 0 ? Ui(e) : Ui.ceil(e)
}
function B4(e, t) {
  return (e = Qw(e)), ve(Ui.count(Tr(e), e) + (Tr(e).getDay() === 4), t, 2)
}
function F4(e) {
  return e.getDay()
}
function U4(e, t) {
  return ve(mc.count(Tr(e) - 1, e), t, 2)
}
function W4(e, t) {
  return ve(e.getFullYear() % 100, t, 2)
}
function q4(e, t) {
  return (e = Qw(e)), ve(e.getFullYear() % 100, t, 2)
}
function H4(e, t) {
  return ve(e.getFullYear() % 1e4, t, 4)
}
function z4(e, t) {
  var r = e.getDay()
  return (
    (e = r >= 4 || r === 0 ? Ui(e) : Ui.ceil(e)),
    ve(e.getFullYear() % 1e4, t, 4)
  )
}
function K4(e) {
  var t = e.getTimezoneOffset()
  return (
    (t > 0 ? '-' : ((t *= -1), '+')) +
    ve((t / 60) | 0, '0', 2) +
    ve(t % 60, '0', 2)
  )
}
function Rm(e, t) {
  return ve(e.getUTCDate(), t, 2)
}
function G4(e, t) {
  return ve(e.getUTCHours(), t, 2)
}
function V4(e, t) {
  return ve(e.getUTCHours() % 12 || 12, t, 2)
}
function X4(e, t) {
  return ve(1 + ku.count(kr(e), e), t, 3)
}
function Zw(e, t) {
  return ve(e.getUTCMilliseconds(), t, 3)
}
function Y4(e, t) {
  return Zw(e, t) + '000'
}
function Q4(e, t) {
  return ve(e.getUTCMonth() + 1, t, 2)
}
function Z4(e, t) {
  return ve(e.getUTCMinutes(), t, 2)
}
function J4(e, t) {
  return ve(e.getUTCSeconds(), t, 2)
}
function e7(e) {
  var t = e.getUTCDay()
  return t === 0 ? 7 : t
}
function t7(e, t) {
  return ve(Nu.count(kr(e) - 1, e), t, 2)
}
function Jw(e) {
  var t = e.getUTCDay()
  return t >= 4 || t === 0 ? Wi(e) : Wi.ceil(e)
}
function r7(e, t) {
  return (e = Jw(e)), ve(Wi.count(kr(e), e) + (kr(e).getUTCDay() === 4), t, 2)
}
function n7(e) {
  return e.getUTCDay()
}
function i7(e, t) {
  return ve(gc.count(kr(e) - 1, e), t, 2)
}
function a7(e, t) {
  return ve(e.getUTCFullYear() % 100, t, 2)
}
function o7(e, t) {
  return (e = Jw(e)), ve(e.getUTCFullYear() % 100, t, 2)
}
function s7(e, t) {
  return ve(e.getUTCFullYear() % 1e4, t, 4)
}
function c7(e, t) {
  var r = e.getUTCDay()
  return (
    (e = r >= 4 || r === 0 ? Wi(e) : Wi.ceil(e)),
    ve(e.getUTCFullYear() % 1e4, t, 4)
  )
}
function u7() {
  return '+0000'
}
function Dm() {
  return '%'
}
function Lm(e) {
  return +e
}
function Bm(e) {
  return Math.floor(+e / 1e3)
}
var ti, eO, tO
l7({
  dateTime: '%x, %X',
  date: '%-m/%-d/%Y',
  time: '%-I:%M:%S %p',
  periods: ['AM', 'PM'],
  days: [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ],
  shortDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  months: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  shortMonths: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],
})
function l7(e) {
  return (
    (ti = l4(e)),
    (eO = ti.format),
    ti.parse,
    (tO = ti.utcFormat),
    ti.utcParse,
    ti
  )
}
function f7(e) {
  return new Date(e)
}
function d7(e) {
  return e instanceof Date ? +e : +new Date(+e)
}
function yp(e, t, r, n, i, a, o, s, c, u) {
  var l = rp(),
    f = l.invert,
    d = l.domain,
    h = u('.%L'),
    y = u(':%S'),
    v = u('%I:%M'),
    p = u('%I %p'),
    x = u('%a %d'),
    b = u('%b %d'),
    w = u('%B'),
    g = u('%Y')
  function m(S) {
    return (
      c(S) < S
        ? h
        : s(S) < S
          ? y
          : o(S) < S
            ? v
            : a(S) < S
              ? p
              : n(S) < S
                ? i(S) < S
                  ? x
                  : b
                : r(S) < S
                  ? w
                  : g
    )(S)
  }
  return (
    (l.invert = function (S) {
      return new Date(f(S))
    }),
    (l.domain = function (S) {
      return arguments.length ? d(Array.from(S, d7)) : d().map(f7)
    }),
    (l.ticks = function (S) {
      var P = d()
      return e(P[0], P[P.length - 1], S ?? 10)
    }),
    (l.tickFormat = function (S, P) {
      return P == null ? m : u(P)
    }),
    (l.nice = function (S) {
      var P = d()
      return (
        (!S || typeof S.range != 'function') &&
          (S = t(P[0], P[P.length - 1], S ?? 10)),
        S ? d(Uw(P, S)) : l
      )
    }),
    (l.copy = function () {
      return ns(l, yp(e, t, r, n, i, a, o, s, c, u))
    }),
    l
  )
}
function h7() {
  return Dt.apply(
    yp(c4, u4, Tr, pp, Mu, is, dp, lp, wn, eO).domain([
      new Date(2e3, 0, 1),
      new Date(2e3, 0, 2),
    ]),
    arguments,
  )
}
function p7() {
  return Dt.apply(
    yp(o4, s4, kr, vp, Nu, ku, hp, fp, wn, tO).domain([
      Date.UTC(2e3, 0, 1),
      Date.UTC(2e3, 0, 2),
    ]),
    arguments,
  )
}
function Iu() {
  var e = 0,
    t = 1,
    r,
    n,
    i,
    a,
    o = st,
    s = !1,
    c
  function u(f) {
    return f == null || isNaN((f = +f))
      ? c
      : o(
          i === 0
            ? 0.5
            : ((f = (a(f) - r) * i), s ? Math.max(0, Math.min(1, f)) : f),
        )
  }
  ;(u.domain = function (f) {
    return arguments.length
      ? (([e, t] = f),
        (r = a((e = +e))),
        (n = a((t = +t))),
        (i = r === n ? 0 : 1 / (n - r)),
        u)
      : [e, t]
  }),
    (u.clamp = function (f) {
      return arguments.length ? ((s = !!f), u) : s
    }),
    (u.interpolator = function (f) {
      return arguments.length ? ((o = f), u) : o
    })
  function l(f) {
    return function (d) {
      var h, y
      return arguments.length ? (([h, y] = d), (o = f(h, y)), u) : [o(0), o(1)]
    }
  }
  return (
    (u.range = l(wa)),
    (u.rangeRound = l(tp)),
    (u.unknown = function (f) {
      return arguments.length ? ((c = f), u) : c
    }),
    function (f) {
      return (a = f), (r = f(e)), (n = f(t)), (i = r === n ? 0 : 1 / (n - r)), u
    }
  )
}
function un(e, t) {
  return t
    .domain(e.domain())
    .interpolator(e.interpolator())
    .clamp(e.clamp())
    .unknown(e.unknown())
}
function rO() {
  var e = cn(Iu()(st))
  return (
    (e.copy = function () {
      return un(e, rO())
    }),
    Dr.apply(e, arguments)
  )
}
function nO() {
  var e = ap(Iu()).domain([1, 10])
  return (
    (e.copy = function () {
      return un(e, nO()).base(e.base())
    }),
    Dr.apply(e, arguments)
  )
}
function iO() {
  var e = op(Iu())
  return (
    (e.copy = function () {
      return un(e, iO()).constant(e.constant())
    }),
    Dr.apply(e, arguments)
  )
}
function mp() {
  var e = sp(Iu())
  return (
    (e.copy = function () {
      return un(e, mp()).exponent(e.exponent())
    }),
    Dr.apply(e, arguments)
  )
}
function v7() {
  return mp.apply(null, arguments).exponent(0.5)
}
function aO() {
  var e = [],
    t = st
  function r(n) {
    if (n != null && !isNaN((n = +n)))
      return t((ts(e, n, 1) - 1) / (e.length - 1))
  }
  return (
    (r.domain = function (n) {
      if (!arguments.length) return e.slice()
      e = []
      for (let i of n) i != null && !isNaN((i = +i)) && e.push(i)
      return e.sort(tn), r
    }),
    (r.interpolator = function (n) {
      return arguments.length ? ((t = n), r) : t
    }),
    (r.range = function () {
      return e.map((n, i) => t(i / (e.length - 1)))
    }),
    (r.quantiles = function (n) {
      return Array.from({ length: n + 1 }, (i, a) => t6(e, a / n))
    }),
    (r.copy = function () {
      return aO(t).domain(e)
    }),
    Dr.apply(r, arguments)
  )
}
function Ru() {
  var e = 0,
    t = 0.5,
    r = 1,
    n = 1,
    i,
    a,
    o,
    s,
    c,
    u = st,
    l,
    f = !1,
    d
  function h(v) {
    return isNaN((v = +v))
      ? d
      : ((v = 0.5 + ((v = +l(v)) - a) * (n * v < n * a ? s : c)),
        u(f ? Math.max(0, Math.min(1, v)) : v))
  }
  ;(h.domain = function (v) {
    return arguments.length
      ? (([e, t, r] = v),
        (i = l((e = +e))),
        (a = l((t = +t))),
        (o = l((r = +r))),
        (s = i === a ? 0 : 0.5 / (a - i)),
        (c = a === o ? 0 : 0.5 / (o - a)),
        (n = a < i ? -1 : 1),
        h)
      : [e, t, r]
  }),
    (h.clamp = function (v) {
      return arguments.length ? ((f = !!v), h) : f
    }),
    (h.interpolator = function (v) {
      return arguments.length ? ((u = v), h) : u
    })
  function y(v) {
    return function (p) {
      var x, b, w
      return arguments.length
        ? (([x, b, w] = p), (u = E6(v, [x, b, w])), h)
        : [u(0), u(0.5), u(1)]
    }
  }
  return (
    (h.range = y(wa)),
    (h.rangeRound = y(tp)),
    (h.unknown = function (v) {
      return arguments.length ? ((d = v), h) : d
    }),
    function (v) {
      return (
        (l = v),
        (i = v(e)),
        (a = v(t)),
        (o = v(r)),
        (s = i === a ? 0 : 0.5 / (a - i)),
        (c = a === o ? 0 : 0.5 / (o - a)),
        (n = a < i ? -1 : 1),
        h
      )
    }
  )
}
function oO() {
  var e = cn(Ru()(st))
  return (
    (e.copy = function () {
      return un(e, oO())
    }),
    Dr.apply(e, arguments)
  )
}
function sO() {
  var e = ap(Ru()).domain([0.1, 1, 10])
  return (
    (e.copy = function () {
      return un(e, sO()).base(e.base())
    }),
    Dr.apply(e, arguments)
  )
}
function cO() {
  var e = op(Ru())
  return (
    (e.copy = function () {
      return un(e, cO()).constant(e.constant())
    }),
    Dr.apply(e, arguments)
  )
}
function gp() {
  var e = sp(Ru())
  return (
    (e.copy = function () {
      return un(e, gp()).exponent(e.exponent())
    }),
    Dr.apply(e, arguments)
  )
}
function y7() {
  return gp.apply(null, arguments).exponent(0.5)
}
const Fm = Object.freeze(
  Object.defineProperty(
    {
      __proto__: null,
      scaleBand: po,
      scaleDiverging: oO,
      scaleDivergingLog: sO,
      scaleDivergingPow: gp,
      scaleDivergingSqrt: y7,
      scaleDivergingSymlog: cO,
      scaleIdentity: Fw,
      scaleImplicit: Gf,
      scaleLinear: vc,
      scaleLog: Ww,
      scaleOrdinal: Zh,
      scalePoint: Xa,
      scalePow: cp,
      scaleQuantile: zw,
      scaleQuantize: Kw,
      scaleRadial: Hw,
      scaleSequential: rO,
      scaleSequentialLog: nO,
      scaleSequentialPow: mp,
      scaleSequentialQuantile: aO,
      scaleSequentialSqrt: v7,
      scaleSequentialSymlog: iO,
      scaleSqrt: Y6,
      scaleSymlog: qw,
      scaleThreshold: Gw,
      scaleTime: h7,
      scaleUtc: p7,
      tickFormat: Bw,
    },
    Symbol.toStringTag,
    { value: 'Module' },
  ),
)
var m7 = da
function g7(e, t, r) {
  for (var n = -1, i = e.length; ++n < i; ) {
    var a = e[n],
      o = t(a)
    if (o != null && (s === void 0 ? o === o && !m7(o) : r(o, s)))
      var s = o,
        c = a
  }
  return c
}
var Du = g7
function b7(e, t) {
  return e > t
}
var uO = b7,
  x7 = Du,
  w7 = uO,
  O7 = xa
function S7(e) {
  return e && e.length ? x7(e, O7, w7) : void 0
}
var A7 = S7
const Lu = me(A7)
function P7(e, t) {
  return e < t
}
var lO = P7,
  $7 = Du,
  E7 = lO,
  _7 = xa
function C7(e) {
  return e && e.length ? $7(e, _7, E7) : void 0
}
var j7 = C7
const Bu = me(j7)
var T7 = kh,
  k7 = fr,
  M7 = gw,
  N7 = ht
function I7(e, t) {
  var r = N7(e) ? T7 : M7
  return r(e, k7(t))
}
var R7 = I7,
  D7 = yw,
  L7 = R7
function B7(e, t) {
  return D7(L7(e, t), 1)
}
var F7 = B7
const U7 = me(F7)
var W7 = Gh
function q7(e, t) {
  return W7(e, t)
}
var H7 = q7
const as = me(H7)
var Oa = 1e9,
  z7 = {
    precision: 20,
    rounding: 4,
    toExpNeg: -7,
    toExpPos: 21,
    LN10: '2.302585092994045684017991454684364207601101488628772976033327900967572609677352480235997205089598298341967784042286',
  },
  xp,
  Ce = !0,
  It = '[DecimalError] ',
  kn = It + 'Invalid argument: ',
  bp = It + 'Exponent out of range: ',
  Sa = Math.floor,
  mn = Math.pow,
  K7 = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,
  bt,
  He = 1e7,
  Ee = 7,
  fO = 9007199254740991,
  bc = Sa(fO / Ee),
  V = {}
V.absoluteValue = V.abs = function () {
  var e = new this.constructor(this)
  return e.s && (e.s = 1), e
}
V.comparedTo = V.cmp = function (e) {
  var t,
    r,
    n,
    i,
    a = this
  if (((e = new a.constructor(e)), a.s !== e.s)) return a.s || -e.s
  if (a.e !== e.e) return (a.e > e.e) ^ (a.s < 0) ? 1 : -1
  for (n = a.d.length, i = e.d.length, t = 0, r = n < i ? n : i; t < r; ++t)
    if (a.d[t] !== e.d[t]) return (a.d[t] > e.d[t]) ^ (a.s < 0) ? 1 : -1
  return n === i ? 0 : (n > i) ^ (a.s < 0) ? 1 : -1
}
V.decimalPlaces = V.dp = function () {
  var e = this,
    t = e.d.length - 1,
    r = (t - e.e) * Ee
  if (((t = e.d[t]), t)) for (; t % 10 == 0; t /= 10) r--
  return r < 0 ? 0 : r
}
V.dividedBy = V.div = function (e) {
  return Sr(this, new this.constructor(e))
}
V.dividedToIntegerBy = V.idiv = function (e) {
  var t = this,
    r = t.constructor
  return we(Sr(t, new r(e), 0, 1), r.precision)
}
V.equals = V.eq = function (e) {
  return !this.cmp(e)
}
V.exponent = function () {
  return De(this)
}
V.greaterThan = V.gt = function (e) {
  return this.cmp(e) > 0
}
V.greaterThanOrEqualTo = V.gte = function (e) {
  return this.cmp(e) >= 0
}
V.isInteger = V.isint = function () {
  return this.e > this.d.length - 2
}
V.isNegative = V.isneg = function () {
  return this.s < 0
}
V.isPositive = V.ispos = function () {
  return this.s > 0
}
V.isZero = function () {
  return this.s === 0
}
V.lessThan = V.lt = function (e) {
  return this.cmp(e) < 0
}
V.lessThanOrEqualTo = V.lte = function (e) {
  return this.cmp(e) < 1
}
V.logarithm = V.log = function (e) {
  var t,
    r = this,
    n = r.constructor,
    i = n.precision,
    a = i + 5
  if (e === void 0) e = new n(10)
  else if (((e = new n(e)), e.s < 1 || e.eq(bt))) throw Error(It + 'NaN')
  if (r.s < 1) throw Error(It + (r.s ? 'NaN' : '-Infinity'))
  return r.eq(bt)
    ? new n(0)
    : ((Ce = !1), (t = Sr(bo(r, a), bo(e, a), a)), (Ce = !0), we(t, i))
}
V.minus = V.sub = function (e) {
  var t = this
  return (
    (e = new t.constructor(e)), t.s == e.s ? pO(t, e) : dO(t, ((e.s = -e.s), e))
  )
}
V.modulo = V.mod = function (e) {
  var t,
    r = this,
    n = r.constructor,
    i = n.precision
  if (((e = new n(e)), !e.s)) throw Error(It + 'NaN')
  return r.s
    ? ((Ce = !1), (t = Sr(r, e, 0, 1).times(e)), (Ce = !0), r.minus(t))
    : we(new n(r), i)
}
V.naturalExponential = V.exp = function () {
  return hO(this)
}
V.naturalLogarithm = V.ln = function () {
  return bo(this)
}
V.negated = V.neg = function () {
  var e = new this.constructor(this)
  return (e.s = -e.s || 0), e
}
V.plus = V.add = function (e) {
  var t = this
  return (
    (e = new t.constructor(e)), t.s == e.s ? dO(t, e) : pO(t, ((e.s = -e.s), e))
  )
}
V.precision = V.sd = function (e) {
  var t,
    r,
    n,
    i = this
  if (e !== void 0 && e !== !!e && e !== 1 && e !== 0) throw Error(kn + e)
  if (
    ((t = De(i) + 1), (n = i.d.length - 1), (r = n * Ee + 1), (n = i.d[n]), n)
  ) {
    for (; n % 10 == 0; n /= 10) r--
    for (n = i.d[0]; n >= 10; n /= 10) r++
  }
  return e && t > r ? t : r
}
V.squareRoot = V.sqrt = function () {
  var e,
    t,
    r,
    n,
    i,
    a,
    o,
    s = this,
    c = s.constructor
  if (s.s < 1) {
    if (!s.s) return new c(0)
    throw Error(It + 'NaN')
  }
  for (
    e = De(s),
      Ce = !1,
      i = Math.sqrt(+s),
      i == 0 || i == 1 / 0
        ? ((t = Jt(s.d)),
          (t.length + e) % 2 == 0 && (t += '0'),
          (i = Math.sqrt(t)),
          (e = Sa((e + 1) / 2) - (e < 0 || e % 2)),
          i == 1 / 0
            ? (t = '5e' + e)
            : ((t = i.toExponential()),
              (t = t.slice(0, t.indexOf('e') + 1) + e)),
          (n = new c(t)))
        : (n = new c(i.toString())),
      r = c.precision,
      i = o = r + 3;
    ;

  )
    if (
      ((a = n),
      (n = a.plus(Sr(s, a, o + 2)).times(0.5)),
      Jt(a.d).slice(0, o) === (t = Jt(n.d)).slice(0, o))
    ) {
      if (((t = t.slice(o - 3, o + 1)), i == o && t == '4999')) {
        if ((we(a, r + 1, 0), a.times(a).eq(s))) {
          n = a
          break
        }
      } else if (t != '9999') break
      o += 4
    }
  return (Ce = !0), we(n, r)
}
V.times = V.mul = function (e) {
  var t,
    r,
    n,
    i,
    a,
    o,
    s,
    c,
    u,
    l = this,
    f = l.constructor,
    d = l.d,
    h = (e = new f(e)).d
  if (!l.s || !e.s) return new f(0)
  for (
    e.s *= l.s,
      r = l.e + e.e,
      c = d.length,
      u = h.length,
      c < u && ((a = d), (d = h), (h = a), (o = c), (c = u), (u = o)),
      a = [],
      o = c + u,
      n = o;
    n--;

  )
    a.push(0)
  for (n = u; --n >= 0; ) {
    for (t = 0, i = c + n; i > n; )
      (s = a[i] + h[n] * d[i - n - 1] + t),
        (a[i--] = s % He | 0),
        (t = (s / He) | 0)
    a[i] = (a[i] + t) % He | 0
  }
  for (; !a[--o]; ) a.pop()
  return t ? ++r : a.shift(), (e.d = a), (e.e = r), Ce ? we(e, f.precision) : e
}
V.toDecimalPlaces = V.todp = function (e, t) {
  var r = this,
    n = r.constructor
  return (
    (r = new n(r)),
    e === void 0
      ? r
      : (sr(e, 0, Oa),
        t === void 0 ? (t = n.rounding) : sr(t, 0, 8),
        we(r, e + De(r) + 1, t))
  )
}
V.toExponential = function (e, t) {
  var r,
    n = this,
    i = n.constructor
  return (
    e === void 0
      ? (r = Fn(n, !0))
      : (sr(e, 0, Oa),
        t === void 0 ? (t = i.rounding) : sr(t, 0, 8),
        (n = we(new i(n), e + 1, t)),
        (r = Fn(n, !0, e + 1))),
    r
  )
}
V.toFixed = function (e, t) {
  var r,
    n,
    i = this,
    a = i.constructor
  return e === void 0
    ? Fn(i)
    : (sr(e, 0, Oa),
      t === void 0 ? (t = a.rounding) : sr(t, 0, 8),
      (n = we(new a(i), e + De(i) + 1, t)),
      (r = Fn(n.abs(), !1, e + De(n) + 1)),
      i.isneg() && !i.isZero() ? '-' + r : r)
}
V.toInteger = V.toint = function () {
  var e = this,
    t = e.constructor
  return we(new t(e), De(e) + 1, t.rounding)
}
V.toNumber = function () {
  return +this
}
V.toPower = V.pow = function (e) {
  var t,
    r,
    n,
    i,
    a,
    o,
    s = this,
    c = s.constructor,
    u = 12,
    l = +(e = new c(e))
  if (!e.s) return new c(bt)
  if (((s = new c(s)), !s.s)) {
    if (e.s < 1) throw Error(It + 'Infinity')
    return s
  }
  if (s.eq(bt)) return s
  if (((n = c.precision), e.eq(bt))) return we(s, n)
  if (((t = e.e), (r = e.d.length - 1), (o = t >= r), (a = s.s), o)) {
    if ((r = l < 0 ? -l : l) <= fO) {
      for (
        i = new c(bt), t = Math.ceil(n / Ee + 4), Ce = !1;
        r % 2 && ((i = i.times(s)), Wm(i.d, t)), (r = Sa(r / 2)), r !== 0;

      )
        (s = s.times(s)), Wm(s.d, t)
      return (Ce = !0), e.s < 0 ? new c(bt).div(i) : we(i, n)
    }
  } else if (a < 0) throw Error(It + 'NaN')
  return (
    (a = a < 0 && e.d[Math.max(t, r)] & 1 ? -1 : 1),
    (s.s = 1),
    (Ce = !1),
    (i = e.times(bo(s, n + u))),
    (Ce = !0),
    (i = hO(i)),
    (i.s = a),
    i
  )
}
V.toPrecision = function (e, t) {
  var r,
    n,
    i = this,
    a = i.constructor
  return (
    e === void 0
      ? ((r = De(i)), (n = Fn(i, r <= a.toExpNeg || r >= a.toExpPos)))
      : (sr(e, 1, Oa),
        t === void 0 ? (t = a.rounding) : sr(t, 0, 8),
        (i = we(new a(i), e, t)),
        (r = De(i)),
        (n = Fn(i, e <= r || r <= a.toExpNeg, e))),
    n
  )
}
V.toSignificantDigits = V.tosd = function (e, t) {
  var r = this,
    n = r.constructor
  return (
    e === void 0
      ? ((e = n.precision), (t = n.rounding))
      : (sr(e, 1, Oa), t === void 0 ? (t = n.rounding) : sr(t, 0, 8)),
    we(new n(r), e, t)
  )
}
V.toString =
  V.valueOf =
  V.val =
  V.toJSON =
  V[Symbol.for('nodejs.util.inspect.custom')] =
    function () {
      var e = this,
        t = De(e),
        r = e.constructor
      return Fn(e, t <= r.toExpNeg || t >= r.toExpPos)
    }
function dO(e, t) {
  var r,
    n,
    i,
    a,
    o,
    s,
    c,
    u,
    l = e.constructor,
    f = l.precision
  if (!e.s || !t.s) return t.s || (t = new l(e)), Ce ? we(t, f) : t
  if (
    ((c = e.d),
    (u = t.d),
    (o = e.e),
    (i = t.e),
    (c = c.slice()),
    (a = o - i),
    a)
  ) {
    for (
      a < 0
        ? ((n = c), (a = -a), (s = u.length))
        : ((n = u), (i = o), (s = c.length)),
        o = Math.ceil(f / Ee),
        s = o > s ? o + 1 : s + 1,
        a > s && ((a = s), (n.length = 1)),
        n.reverse();
      a--;

    )
      n.push(0)
    n.reverse()
  }
  for (
    s = c.length,
      a = u.length,
      s - a < 0 && ((a = s), (n = u), (u = c), (c = n)),
      r = 0;
    a;

  )
    (r = ((c[--a] = c[a] + u[a] + r) / He) | 0), (c[a] %= He)
  for (r && (c.unshift(r), ++i), s = c.length; c[--s] == 0; ) c.pop()
  return (t.d = c), (t.e = i), Ce ? we(t, f) : t
}
function sr(e, t, r) {
  if (e !== ~~e || e < t || e > r) throw Error(kn + e)
}
function Jt(e) {
  var t,
    r,
    n,
    i = e.length - 1,
    a = '',
    o = e[0]
  if (i > 0) {
    for (a += o, t = 1; t < i; t++)
      (n = e[t] + ''), (r = Ee - n.length), r && (a += Ur(r)), (a += n)
    ;(o = e[t]), (n = o + ''), (r = Ee - n.length), r && (a += Ur(r))
  } else if (o === 0) return '0'
  for (; o % 10 === 0; ) o /= 10
  return a + o
}
var Sr = (function () {
  function e(n, i) {
    var a,
      o = 0,
      s = n.length
    for (n = n.slice(); s--; )
      (a = n[s] * i + o), (n[s] = a % He | 0), (o = (a / He) | 0)
    return o && n.unshift(o), n
  }
  function t(n, i, a, o) {
    var s, c
    if (a != o) c = a > o ? 1 : -1
    else
      for (s = c = 0; s < a; s++)
        if (n[s] != i[s]) {
          c = n[s] > i[s] ? 1 : -1
          break
        }
    return c
  }
  function r(n, i, a) {
    for (var o = 0; a--; )
      (n[a] -= o), (o = n[a] < i[a] ? 1 : 0), (n[a] = o * He + n[a] - i[a])
    for (; !n[0] && n.length > 1; ) n.shift()
  }
  return function (n, i, a, o) {
    var s,
      c,
      u,
      l,
      f,
      d,
      h,
      y,
      v,
      p,
      x,
      b,
      w,
      g,
      m,
      S,
      P,
      $,
      T = n.constructor,
      k = n.s == i.s ? 1 : -1,
      C = n.d,
      j = i.d
    if (!n.s) return new T(n)
    if (!i.s) throw Error(It + 'Division by zero')
    for (
      c = n.e - i.e,
        P = j.length,
        m = C.length,
        h = new T(k),
        y = h.d = [],
        u = 0;
      j[u] == (C[u] || 0);

    )
      ++u
    if (
      (j[u] > (C[u] || 0) && --c,
      a == null
        ? (b = a = T.precision)
        : o
          ? (b = a + (De(n) - De(i)) + 1)
          : (b = a),
      b < 0)
    )
      return new T(0)
    if (((b = (b / Ee + 2) | 0), (u = 0), P == 1))
      for (l = 0, j = j[0], b++; (u < m || l) && b--; u++)
        (w = l * He + (C[u] || 0)), (y[u] = (w / j) | 0), (l = w % j | 0)
    else {
      for (
        l = (He / (j[0] + 1)) | 0,
          l > 1 &&
            ((j = e(j, l)), (C = e(C, l)), (P = j.length), (m = C.length)),
          g = P,
          v = C.slice(0, P),
          p = v.length;
        p < P;

      )
        v[p++] = 0
      ;($ = j.slice()), $.unshift(0), (S = j[0]), j[1] >= He / 2 && ++S
      do
        (l = 0),
          (s = t(j, v, P, p)),
          s < 0
            ? ((x = v[0]),
              P != p && (x = x * He + (v[1] || 0)),
              (l = (x / S) | 0),
              l > 1
                ? (l >= He && (l = He - 1),
                  (f = e(j, l)),
                  (d = f.length),
                  (p = v.length),
                  (s = t(f, v, d, p)),
                  s == 1 && (l--, r(f, P < d ? $ : j, d)))
                : (l == 0 && (s = l = 1), (f = j.slice())),
              (d = f.length),
              d < p && f.unshift(0),
              r(v, f, p),
              s == -1 &&
                ((p = v.length),
                (s = t(j, v, P, p)),
                s < 1 && (l++, r(v, P < p ? $ : j, p))),
              (p = v.length))
            : s === 0 && (l++, (v = [0])),
          (y[u++] = l),
          s && v[0] ? (v[p++] = C[g] || 0) : ((v = [C[g]]), (p = 1))
      while ((g++ < m || v[0] !== void 0) && b--)
    }
    return y[0] || y.shift(), (h.e = c), we(h, o ? a + De(h) + 1 : a)
  }
})()
function hO(e, t) {
  var r,
    n,
    i,
    a,
    o,
    s,
    c = 0,
    u = 0,
    l = e.constructor,
    f = l.precision
  if (De(e) > 16) throw Error(bp + De(e))
  if (!e.s) return new l(bt)
  for (
    t == null ? ((Ce = !1), (s = f)) : (s = t), o = new l(0.03125);
    e.abs().gte(0.1);

  )
    (e = e.times(o)), (u += 5)
  for (
    n = ((Math.log(mn(2, u)) / Math.LN10) * 2 + 5) | 0,
      s += n,
      r = i = a = new l(bt),
      l.precision = s;
    ;

  ) {
    if (
      ((i = we(i.times(e), s)),
      (r = r.times(++c)),
      (o = a.plus(Sr(i, r, s))),
      Jt(o.d).slice(0, s) === Jt(a.d).slice(0, s))
    ) {
      for (; u--; ) a = we(a.times(a), s)
      return (l.precision = f), t == null ? ((Ce = !0), we(a, f)) : a
    }
    a = o
  }
}
function De(e) {
  for (var t = e.e * Ee, r = e.d[0]; r >= 10; r /= 10) t++
  return t
}
function Tl(e, t, r) {
  if (t > e.LN10.sd())
    throw (
      ((Ce = !0),
      r && (e.precision = r),
      Error(It + 'LN10 precision limit exceeded'))
    )
  return we(new e(e.LN10), t)
}
function Ur(e) {
  for (var t = ''; e--; ) t += '0'
  return t
}
function bo(e, t) {
  var r,
    n,
    i,
    a,
    o,
    s,
    c,
    u,
    l,
    f = 1,
    d = 10,
    h = e,
    y = h.d,
    v = h.constructor,
    p = v.precision
  if (h.s < 1) throw Error(It + (h.s ? 'NaN' : '-Infinity'))
  if (h.eq(bt)) return new v(0)
  if ((t == null ? ((Ce = !1), (u = p)) : (u = t), h.eq(10)))
    return t == null && (Ce = !0), Tl(v, u)
  if (
    ((u += d),
    (v.precision = u),
    (r = Jt(y)),
    (n = r.charAt(0)),
    (a = De(h)),
    Math.abs(a) < 15e14)
  ) {
    for (; (n < 7 && n != 1) || (n == 1 && r.charAt(1) > 3); )
      (h = h.times(e)), (r = Jt(h.d)), (n = r.charAt(0)), f++
    ;(a = De(h)),
      n > 1 ? ((h = new v('0.' + r)), a++) : (h = new v(n + '.' + r.slice(1)))
  } else
    return (
      (c = Tl(v, u + 2, p).times(a + '')),
      (h = bo(new v(n + '.' + r.slice(1)), u - d).plus(c)),
      (v.precision = p),
      t == null ? ((Ce = !0), we(h, p)) : h
    )
  for (
    s = o = h = Sr(h.minus(bt), h.plus(bt), u), l = we(h.times(h), u), i = 3;
    ;

  ) {
    if (
      ((o = we(o.times(l), u)),
      (c = s.plus(Sr(o, new v(i), u))),
      Jt(c.d).slice(0, u) === Jt(s.d).slice(0, u))
    )
      return (
        (s = s.times(2)),
        a !== 0 && (s = s.plus(Tl(v, u + 2, p).times(a + ''))),
        (s = Sr(s, new v(f), u)),
        (v.precision = p),
        t == null ? ((Ce = !0), we(s, p)) : s
      )
    ;(s = c), (i += 2)
  }
}
function Um(e, t) {
  var r, n, i
  for (
    (r = t.indexOf('.')) > -1 && (t = t.replace('.', '')),
      (n = t.search(/e/i)) > 0
        ? (r < 0 && (r = n), (r += +t.slice(n + 1)), (t = t.substring(0, n)))
        : r < 0 && (r = t.length),
      n = 0;
    t.charCodeAt(n) === 48;

  )
    ++n
  for (i = t.length; t.charCodeAt(i - 1) === 48; ) --i
  if (((t = t.slice(n, i)), t)) {
    if (
      ((i -= n),
      (r = r - n - 1),
      (e.e = Sa(r / Ee)),
      (e.d = []),
      (n = (r + 1) % Ee),
      r < 0 && (n += Ee),
      n < i)
    ) {
      for (n && e.d.push(+t.slice(0, n)), i -= Ee; n < i; )
        e.d.push(+t.slice(n, (n += Ee)))
      ;(t = t.slice(n)), (n = Ee - t.length)
    } else n -= i
    for (; n--; ) t += '0'
    if ((e.d.push(+t), Ce && (e.e > bc || e.e < -bc))) throw Error(bp + r)
  } else (e.s = 0), (e.e = 0), (e.d = [0])
  return e
}
function we(e, t, r) {
  var n,
    i,
    a,
    o,
    s,
    c,
    u,
    l,
    f = e.d
  for (o = 1, a = f[0]; a >= 10; a /= 10) o++
  if (((n = t - o), n < 0)) (n += Ee), (i = t), (u = f[(l = 0)])
  else {
    if (((l = Math.ceil((n + 1) / Ee)), (a = f.length), l >= a)) return e
    for (u = a = f[l], o = 1; a >= 10; a /= 10) o++
    ;(n %= Ee), (i = n - Ee + o)
  }
  if (
    (r !== void 0 &&
      ((a = mn(10, o - i - 1)),
      (s = (u / a) % 10 | 0),
      (c = t < 0 || f[l + 1] !== void 0 || u % a),
      (c =
        r < 4
          ? (s || c) && (r == 0 || r == (e.s < 0 ? 3 : 2))
          : s > 5 ||
            (s == 5 &&
              (r == 4 ||
                c ||
                (r == 6 &&
                  (n > 0 ? (i > 0 ? u / mn(10, o - i) : 0) : f[l - 1]) % 10 &
                    1) ||
                r == (e.s < 0 ? 8 : 7))))),
    t < 1 || !f[0])
  )
    return (
      c
        ? ((a = De(e)),
          (f.length = 1),
          (t = t - a - 1),
          (f[0] = mn(10, (Ee - (t % Ee)) % Ee)),
          (e.e = Sa(-t / Ee) || 0))
        : ((f.length = 1), (f[0] = e.e = e.s = 0)),
      e
    )
  if (
    (n == 0
      ? ((f.length = l), (a = 1), l--)
      : ((f.length = l + 1),
        (a = mn(10, Ee - n)),
        (f[l] = i > 0 ? ((u / mn(10, o - i)) % mn(10, i) | 0) * a : 0)),
    c)
  )
    for (;;)
      if (l == 0) {
        ;(f[0] += a) == He && ((f[0] = 1), ++e.e)
        break
      } else {
        if (((f[l] += a), f[l] != He)) break
        ;(f[l--] = 0), (a = 1)
      }
  for (n = f.length; f[--n] === 0; ) f.pop()
  if (Ce && (e.e > bc || e.e < -bc)) throw Error(bp + De(e))
  return e
}
function pO(e, t) {
  var r,
    n,
    i,
    a,
    o,
    s,
    c,
    u,
    l,
    f,
    d = e.constructor,
    h = d.precision
  if (!e.s || !t.s)
    return t.s ? (t.s = -t.s) : (t = new d(e)), Ce ? we(t, h) : t
  if (
    ((c = e.d),
    (f = t.d),
    (n = t.e),
    (u = e.e),
    (c = c.slice()),
    (o = u - n),
    o)
  ) {
    for (
      l = o < 0,
        l
          ? ((r = c), (o = -o), (s = f.length))
          : ((r = f), (n = u), (s = c.length)),
        i = Math.max(Math.ceil(h / Ee), s) + 2,
        o > i && ((o = i), (r.length = 1)),
        r.reverse(),
        i = o;
      i--;

    )
      r.push(0)
    r.reverse()
  } else {
    for (i = c.length, s = f.length, l = i < s, l && (s = i), i = 0; i < s; i++)
      if (c[i] != f[i]) {
        l = c[i] < f[i]
        break
      }
    o = 0
  }
  for (
    l && ((r = c), (c = f), (f = r), (t.s = -t.s)),
      s = c.length,
      i = f.length - s;
    i > 0;
    --i
  )
    c[s++] = 0
  for (i = f.length; i > o; ) {
    if (c[--i] < f[i]) {
      for (a = i; a && c[--a] === 0; ) c[a] = He - 1
      --c[a], (c[i] += He)
    }
    c[i] -= f[i]
  }
  for (; c[--s] === 0; ) c.pop()
  for (; c[0] === 0; c.shift()) --n
  return c[0] ? ((t.d = c), (t.e = n), Ce ? we(t, h) : t) : new d(0)
}
function Fn(e, t, r) {
  var n,
    i = De(e),
    a = Jt(e.d),
    o = a.length
  return (
    t
      ? (r && (n = r - o) > 0
          ? (a = a.charAt(0) + '.' + a.slice(1) + Ur(n))
          : o > 1 && (a = a.charAt(0) + '.' + a.slice(1)),
        (a = a + (i < 0 ? 'e' : 'e+') + i))
      : i < 0
        ? ((a = '0.' + Ur(-i - 1) + a), r && (n = r - o) > 0 && (a += Ur(n)))
        : i >= o
          ? ((a += Ur(i + 1 - o)),
            r && (n = r - i - 1) > 0 && (a = a + '.' + Ur(n)))
          : ((n = i + 1) < o && (a = a.slice(0, n) + '.' + a.slice(n)),
            r && (n = r - o) > 0 && (i + 1 === o && (a += '.'), (a += Ur(n)))),
    e.s < 0 ? '-' + a : a
  )
}
function Wm(e, t) {
  if (e.length > t) return (e.length = t), !0
}
function vO(e) {
  var t, r, n
  function i(a) {
    var o = this
    if (!(o instanceof i)) return new i(a)
    if (((o.constructor = i), a instanceof i)) {
      ;(o.s = a.s), (o.e = a.e), (o.d = (a = a.d) ? a.slice() : a)
      return
    }
    if (typeof a == 'number') {
      if (a * 0 !== 0) throw Error(kn + a)
      if (a > 0) o.s = 1
      else if (a < 0) (a = -a), (o.s = -1)
      else {
        ;(o.s = 0), (o.e = 0), (o.d = [0])
        return
      }
      if (a === ~~a && a < 1e7) {
        ;(o.e = 0), (o.d = [a])
        return
      }
      return Um(o, a.toString())
    } else if (typeof a != 'string') throw Error(kn + a)
    if (
      (a.charCodeAt(0) === 45 ? ((a = a.slice(1)), (o.s = -1)) : (o.s = 1),
      K7.test(a))
    )
      Um(o, a)
    else throw Error(kn + a)
  }
  if (
    ((i.prototype = V),
    (i.ROUND_UP = 0),
    (i.ROUND_DOWN = 1),
    (i.ROUND_CEIL = 2),
    (i.ROUND_FLOOR = 3),
    (i.ROUND_HALF_UP = 4),
    (i.ROUND_HALF_DOWN = 5),
    (i.ROUND_HALF_EVEN = 6),
    (i.ROUND_HALF_CEIL = 7),
    (i.ROUND_HALF_FLOOR = 8),
    (i.clone = vO),
    (i.config = i.set = G7),
    e === void 0 && (e = {}),
    e)
  )
    for (
      n = ['precision', 'rounding', 'toExpNeg', 'toExpPos', 'LN10'], t = 0;
      t < n.length;

    )
      e.hasOwnProperty((r = n[t++])) || (e[r] = this[r])
  return i.config(e), i
}
function G7(e) {
  if (!e || typeof e != 'object') throw Error(It + 'Object expected')
  var t,
    r,
    n,
    i = [
      'precision',
      1,
      Oa,
      'rounding',
      0,
      8,
      'toExpNeg',
      -1 / 0,
      0,
      'toExpPos',
      0,
      1 / 0,
    ]
  for (t = 0; t < i.length; t += 3)
    if ((n = e[(r = i[t])]) !== void 0)
      if (Sa(n) === n && n >= i[t + 1] && n <= i[t + 2]) this[r] = n
      else throw Error(kn + r + ': ' + n)
  if ((n = e[(r = 'LN10')]) !== void 0)
    if (n == Math.LN10) this[r] = new this(n)
    else throw Error(kn + r + ': ' + n)
  return this
}
var xp = vO(z7)
bt = new xp(1)
const xe = xp
function V7(e) {
  return Z7(e) || Q7(e) || Y7(e) || X7()
}
function X7() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}
function Y7(e, t) {
  if (e) {
    if (typeof e == 'string') return Qf(e, t)
    var r = Object.prototype.toString.call(e).slice(8, -1)
    if (
      (r === 'Object' && e.constructor && (r = e.constructor.name),
      r === 'Map' || r === 'Set')
    )
      return Array.from(e)
    if (r === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
      return Qf(e, t)
  }
}
function Q7(e) {
  if (typeof Symbol < 'u' && Symbol.iterator in Object(e)) return Array.from(e)
}
function Z7(e) {
  if (Array.isArray(e)) return Qf(e)
}
function Qf(e, t) {
  ;(t == null || t > e.length) && (t = e.length)
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r]
  return n
}
var J7 = function (t) {
    return t
  },
  yO = { '@@functional/placeholder': !0 },
  mO = function (t) {
    return t === yO
  },
  qm = function (t) {
    return function r() {
      return arguments.length === 0 ||
        (arguments.length === 1 &&
          mO(arguments.length <= 0 ? void 0 : arguments[0]))
        ? r
        : t.apply(void 0, arguments)
    }
  },
  eF = function e(t, r) {
    return t === 1
      ? r
      : qm(function () {
          for (var n = arguments.length, i = new Array(n), a = 0; a < n; a++)
            i[a] = arguments[a]
          var o = i.filter(function (s) {
            return s !== yO
          }).length
          return o >= t
            ? r.apply(void 0, i)
            : e(
                t - o,
                qm(function () {
                  for (
                    var s = arguments.length, c = new Array(s), u = 0;
                    u < s;
                    u++
                  )
                    c[u] = arguments[u]
                  var l = i.map(function (f) {
                    return mO(f) ? c.shift() : f
                  })
                  return r.apply(void 0, V7(l).concat(c))
                }),
              )
        })
  },
  Fu = function (t) {
    return eF(t.length, t)
  },
  Zf = function (t, r) {
    for (var n = [], i = t; i < r; ++i) n[i - t] = i
    return n
  },
  tF = Fu(function (e, t) {
    return Array.isArray(t)
      ? t.map(e)
      : Object.keys(t)
          .map(function (r) {
            return t[r]
          })
          .map(e)
  }),
  rF = function () {
    for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++)
      r[n] = arguments[n]
    if (!r.length) return J7
    var i = r.reverse(),
      a = i[0],
      o = i.slice(1)
    return function () {
      return o.reduce(
        function (s, c) {
          return c(s)
        },
        a.apply(void 0, arguments),
      )
    }
  },
  Jf = function (t) {
    return Array.isArray(t) ? t.reverse() : t.split('').reverse.join('')
  },
  gO = function (t) {
    var r = null,
      n = null
    return function () {
      for (var i = arguments.length, a = new Array(i), o = 0; o < i; o++)
        a[o] = arguments[o]
      return (
        (r &&
          a.every(function (s, c) {
            return s === r[c]
          })) ||
          ((r = a), (n = t.apply(void 0, a))),
        n
      )
    }
  }
function nF(e) {
  var t
  return (
    e === 0
      ? (t = 1)
      : (t = Math.floor(new xe(e).abs().log(10).toNumber()) + 1),
    t
  )
}
function iF(e, t, r) {
  for (var n = new xe(e), i = 0, a = []; n.lt(t) && i < 1e5; )
    a.push(n.toNumber()), (n = n.add(r)), i++
  return a
}
var aF = Fu(function (e, t, r) {
    var n = +e,
      i = +t
    return n + r * (i - n)
  }),
  oF = Fu(function (e, t, r) {
    var n = t - +e
    return (n = n || 1 / 0), (r - e) / n
  }),
  sF = Fu(function (e, t, r) {
    var n = t - +e
    return (n = n || 1 / 0), Math.max(0, Math.min(1, (r - e) / n))
  })
const Uu = {
  rangeStep: iF,
  getDigitCount: nF,
  interpolateNumber: aF,
  uninterpolateNumber: oF,
  uninterpolateTruncation: sF,
}
function ed(e) {
  return lF(e) || uF(e) || bO(e) || cF()
}
function cF() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}
function uF(e) {
  if (typeof Symbol < 'u' && Symbol.iterator in Object(e)) return Array.from(e)
}
function lF(e) {
  if (Array.isArray(e)) return td(e)
}
function xo(e, t) {
  return hF(e) || dF(e, t) || bO(e, t) || fF()
}
function fF() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}
function bO(e, t) {
  if (e) {
    if (typeof e == 'string') return td(e, t)
    var r = Object.prototype.toString.call(e).slice(8, -1)
    if (
      (r === 'Object' && e.constructor && (r = e.constructor.name),
      r === 'Map' || r === 'Set')
    )
      return Array.from(e)
    if (r === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
      return td(e, t)
  }
}
function td(e, t) {
  ;(t == null || t > e.length) && (t = e.length)
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r]
  return n
}
function dF(e, t) {
  if (!(typeof Symbol > 'u' || !(Symbol.iterator in Object(e)))) {
    var r = [],
      n = !0,
      i = !1,
      a = void 0
    try {
      for (
        var o = e[Symbol.iterator](), s;
        !(n = (s = o.next()).done) && (r.push(s.value), !(t && r.length === t));
        n = !0
      );
    } catch (c) {
      ;(i = !0), (a = c)
    } finally {
      try {
        !n && o.return != null && o.return()
      } finally {
        if (i) throw a
      }
    }
    return r
  }
}
function hF(e) {
  if (Array.isArray(e)) return e
}
function xO(e) {
  var t = xo(e, 2),
    r = t[0],
    n = t[1],
    i = r,
    a = n
  return r > n && ((i = n), (a = r)), [i, a]
}
function wO(e, t, r) {
  if (e.lte(0)) return new xe(0)
  var n = Uu.getDigitCount(e.toNumber()),
    i = new xe(10).pow(n),
    a = e.div(i),
    o = n !== 1 ? 0.05 : 0.1,
    s = new xe(Math.ceil(a.div(o).toNumber())).add(r).mul(o),
    c = s.mul(i)
  return t ? c : new xe(Math.ceil(c))
}
function pF(e, t, r) {
  var n = 1,
    i = new xe(e)
  if (!i.isint() && r) {
    var a = Math.abs(e)
    a < 1
      ? ((n = new xe(10).pow(Uu.getDigitCount(e) - 1)),
        (i = new xe(Math.floor(i.div(n).toNumber())).mul(n)))
      : a > 1 && (i = new xe(Math.floor(e)))
  } else
    e === 0
      ? (i = new xe(Math.floor((t - 1) / 2)))
      : r || (i = new xe(Math.floor(e)))
  var o = Math.floor((t - 1) / 2),
    s = rF(
      tF(function (c) {
        return i.add(new xe(c - o).mul(n)).toNumber()
      }),
      Zf,
    )
  return s(0, t)
}
function OO(e, t, r, n) {
  var i = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 0
  if (!Number.isFinite((t - e) / (r - 1)))
    return { step: new xe(0), tickMin: new xe(0), tickMax: new xe(0) }
  var a = wO(new xe(t).sub(e).div(r - 1), n, i),
    o
  e <= 0 && t >= 0
    ? (o = new xe(0))
    : ((o = new xe(e).add(t).div(2)), (o = o.sub(new xe(o).mod(a))))
  var s = Math.ceil(o.sub(e).div(a).toNumber()),
    c = Math.ceil(new xe(t).sub(o).div(a).toNumber()),
    u = s + c + 1
  return u > r
    ? OO(e, t, r, n, i + 1)
    : (u < r && ((c = t > 0 ? c + (r - u) : c), (s = t > 0 ? s : s + (r - u))),
      {
        step: a,
        tickMin: o.sub(new xe(s).mul(a)),
        tickMax: o.add(new xe(c).mul(a)),
      })
}
function vF(e) {
  var t = xo(e, 2),
    r = t[0],
    n = t[1],
    i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 6,
    a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0,
    o = Math.max(i, 2),
    s = xO([r, n]),
    c = xo(s, 2),
    u = c[0],
    l = c[1]
  if (u === -1 / 0 || l === 1 / 0) {
    var f =
      l === 1 / 0
        ? [u].concat(
            ed(
              Zf(0, i - 1).map(function () {
                return 1 / 0
              }),
            ),
          )
        : [].concat(
            ed(
              Zf(0, i - 1).map(function () {
                return -1 / 0
              }),
            ),
            [l],
          )
    return r > n ? Jf(f) : f
  }
  if (u === l) return pF(u, i, a)
  var d = OO(u, l, o, a),
    h = d.step,
    y = d.tickMin,
    v = d.tickMax,
    p = Uu.rangeStep(y, v.add(new xe(0.1).mul(h)), h)
  return r > n ? Jf(p) : p
}
function yF(e, t) {
  var r = xo(e, 2),
    n = r[0],
    i = r[1],
    a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0,
    o = xO([n, i]),
    s = xo(o, 2),
    c = s[0],
    u = s[1]
  if (c === -1 / 0 || u === 1 / 0) return [n, i]
  if (c === u) return [c]
  var l = Math.max(t, 2),
    f = wO(new xe(u).sub(c).div(l - 1), a, 0),
    d = [].concat(
      ed(Uu.rangeStep(new xe(c), new xe(u).sub(new xe(0.99).mul(f)), f)),
      [u],
    )
  return n > i ? Jf(d) : d
}
var mF = gO(vF),
  gF = gO(yF),
  bF = 'Invariant failed'
function Un(e, t) {
  throw new Error(bF)
}
var xF = [
  'offset',
  'layout',
  'width',
  'dataKey',
  'data',
  'dataPointFormatter',
  'xAxis',
  'yAxis',
]
function qi(e) {
  '@babel/helpers - typeof'
  return (
    (qi =
      typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
        ? function (t) {
            return typeof t
          }
        : function (t) {
            return t &&
              typeof Symbol == 'function' &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? 'symbol'
              : typeof t
          }),
    qi(e)
  )
}
function xc() {
  return (
    (xc = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t]
            for (var n in r)
              Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
          }
          return e
        }),
    xc.apply(this, arguments)
  )
}
function wF(e, t) {
  return PF(e) || AF(e, t) || SF(e, t) || OF()
}
function OF() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}
function SF(e, t) {
  if (e) {
    if (typeof e == 'string') return Hm(e, t)
    var r = Object.prototype.toString.call(e).slice(8, -1)
    if (
      (r === 'Object' && e.constructor && (r = e.constructor.name),
      r === 'Map' || r === 'Set')
    )
      return Array.from(e)
    if (r === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
      return Hm(e, t)
  }
}
function Hm(e, t) {
  ;(t == null || t > e.length) && (t = e.length)
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r]
  return n
}
function AF(e, t) {
  var r =
    e == null
      ? null
      : (typeof Symbol < 'u' && e[Symbol.iterator]) || e['@@iterator']
  if (r != null) {
    var n,
      i,
      a,
      o,
      s = [],
      c = !0,
      u = !1
    try {
      if (((a = (r = r.call(e)).next), t !== 0))
        for (
          ;
          !(c = (n = a.call(r)).done) && (s.push(n.value), s.length !== t);
          c = !0
        );
    } catch (l) {
      ;(u = !0), (i = l)
    } finally {
      try {
        if (!c && r.return != null && ((o = r.return()), Object(o) !== o))
          return
      } finally {
        if (u) throw i
      }
    }
    return s
  }
}
function PF(e) {
  if (Array.isArray(e)) return e
}
function $F(e, t) {
  if (e == null) return {}
  var r = EF(e, t),
    n,
    i
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e)
    for (i = 0; i < a.length; i++)
      (n = a[i]),
        !(t.indexOf(n) >= 0) &&
          Object.prototype.propertyIsEnumerable.call(e, n) &&
          (r[n] = e[n])
  }
  return r
}
function EF(e, t) {
  if (e == null) return {}
  var r = {}
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue
      r[n] = e[n]
    }
  return r
}
function _F(e, t) {
  if (!(e instanceof t))
    throw new TypeError('Cannot call a class as a function')
}
function CF(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r]
    ;(n.enumerable = n.enumerable || !1),
      (n.configurable = !0),
      'value' in n && (n.writable = !0),
      Object.defineProperty(e, PO(n.key), n)
  }
}
function jF(e, t, r) {
  return (
    t && CF(e.prototype, t),
    Object.defineProperty(e, 'prototype', { writable: !1 }),
    e
  )
}
function TF(e, t, r) {
  return (
    (t = wc(t)),
    kF(
      e,
      SO() ? Reflect.construct(t, r || [], wc(e).constructor) : t.apply(e, r),
    )
  )
}
function kF(e, t) {
  if (t && (qi(t) === 'object' || typeof t == 'function')) return t
  if (t !== void 0)
    throw new TypeError(
      'Derived constructors may only return object or undefined',
    )
  return MF(e)
}
function MF(e) {
  if (e === void 0)
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called",
    )
  return e
}
function SO() {
  try {
    var e = !Boolean.prototype.valueOf.call(
      Reflect.construct(Boolean, [], function () {}),
    )
  } catch {}
  return (SO = function () {
    return !!e
  })()
}
function wc(e) {
  return (
    (wc = Object.setPrototypeOf
      ? Object.getPrototypeOf.bind()
      : function (r) {
          return r.__proto__ || Object.getPrototypeOf(r)
        }),
    wc(e)
  )
}
function NF(e, t) {
  if (typeof t != 'function' && t !== null)
    throw new TypeError('Super expression must either be null or a function')
  ;(e.prototype = Object.create(t && t.prototype, {
    constructor: { value: e, writable: !0, configurable: !0 },
  })),
    Object.defineProperty(e, 'prototype', { writable: !1 }),
    t && rd(e, t)
}
function rd(e, t) {
  return (
    (rd = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (n, i) {
          return (n.__proto__ = i), n
        }),
    rd(e, t)
  )
}
function AO(e, t, r) {
  return (
    (t = PO(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  )
}
function PO(e) {
  var t = IF(e, 'string')
  return qi(t) == 'symbol' ? t : t + ''
}
function IF(e, t) {
  if (qi(e) != 'object' || !e) return e
  var r = e[Symbol.toPrimitive]
  if (r !== void 0) {
    var n = r.call(e, t || 'default')
    if (qi(n) != 'object') return n
    throw new TypeError('@@toPrimitive must return a primitive value.')
  }
  return (t === 'string' ? String : Number)(e)
}
var os = (function (e) {
  function t() {
    return _F(this, t), TF(this, t, arguments)
  }
  return (
    NF(t, e),
    jF(t, [
      {
        key: 'render',
        value: function () {
          var n = this.props,
            i = n.offset,
            a = n.layout,
            o = n.width,
            s = n.dataKey,
            c = n.data,
            u = n.dataPointFormatter,
            l = n.xAxis,
            f = n.yAxis,
            d = $F(n, xF),
            h = J(d, !1)
          this.props.direction === 'x' && l.type !== 'number' && Un()
          var y = c.map(function (v) {
            var p = u(v, s),
              x = p.x,
              b = p.y,
              w = p.value,
              g = p.errorVal
            if (!g) return null
            var m = [],
              S,
              P
            if (Array.isArray(g)) {
              var $ = wF(g, 2)
              ;(S = $[0]), (P = $[1])
            } else S = P = g
            if (a === 'vertical') {
              var T = l.scale,
                k = b + i,
                C = k + o,
                j = k - o,
                M = T(w - S),
                N = T(w + P)
              m.push({ x1: N, y1: C, x2: N, y2: j }),
                m.push({ x1: M, y1: k, x2: N, y2: k }),
                m.push({ x1: M, y1: C, x2: M, y2: j })
            } else if (a === 'horizontal') {
              var R = f.scale,
                I = x + i,
                L = I - o,
                B = I + o,
                W = R(w - S),
                G = R(w + P)
              m.push({ x1: L, y1: G, x2: B, y2: G }),
                m.push({ x1: I, y1: W, x2: I, y2: G }),
                m.push({ x1: L, y1: W, x2: B, y2: W })
            }
            return E.createElement(
              pe,
              xc(
                {
                  className: 'recharts-errorBar',
                  key: 'bar-'.concat(
                    m.map(function (z) {
                      return ''
                        .concat(z.x1, '-')
                        .concat(z.x2, '-')
                        .concat(z.y1, '-')
                        .concat(z.y2)
                    }),
                  ),
                },
                h,
              ),
              m.map(function (z) {
                return E.createElement(
                  'line',
                  xc({}, z, {
                    key: 'line-'
                      .concat(z.x1, '-')
                      .concat(z.x2, '-')
                      .concat(z.y1, '-')
                      .concat(z.y2),
                  }),
                )
              }),
            )
          })
          return E.createElement(pe, { className: 'recharts-errorBars' }, y)
        },
      },
    ])
  )
})(E.Component)
AO(os, 'defaultProps', {
  stroke: 'black',
  strokeWidth: 1.5,
  width: 5,
  offset: 0,
  layout: 'horizontal',
})
AO(os, 'displayName', 'ErrorBar')
function wo(e) {
  '@babel/helpers - typeof'
  return (
    (wo =
      typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
        ? function (t) {
            return typeof t
          }
        : function (t) {
            return t &&
              typeof Symbol == 'function' &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? 'symbol'
              : typeof t
          }),
    wo(e)
  )
}
function zm(e, t) {
  var r = Object.keys(e)
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e)
    t &&
      (n = n.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable
      })),
      r.push.apply(r, n)
  }
  return r
}
function fn(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {}
    t % 2
      ? zm(Object(r), !0).forEach(function (n) {
          RF(e, n, r[n])
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
        : zm(Object(r)).forEach(function (n) {
            Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
          })
  }
  return e
}
function RF(e, t, r) {
  return (
    (t = DF(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  )
}
function DF(e) {
  var t = LF(e, 'string')
  return wo(t) == 'symbol' ? t : t + ''
}
function LF(e, t) {
  if (wo(e) != 'object' || !e) return e
  var r = e[Symbol.toPrimitive]
  if (r !== void 0) {
    var n = r.call(e, t || 'default')
    if (wo(n) != 'object') return n
    throw new TypeError('@@toPrimitive must return a primitive value.')
  }
  return (t === 'string' ? String : Number)(e)
}
var $O = function (t) {
  var r = t.children,
    n = t.formattedGraphicalItems,
    i = t.legendWidth,
    a = t.legendContent,
    o = mt(r, di)
  if (!o) return null
  var s = di.defaultProps,
    c = s !== void 0 ? fn(fn({}, s), o.props) : {},
    u
  return (
    o.props && o.props.payload
      ? (u = o.props && o.props.payload)
      : a === 'children'
        ? (u = (n || []).reduce(function (l, f) {
            var d = f.item,
              h = f.props,
              y = h.sectors || h.data || []
            return l.concat(
              y.map(function (v) {
                return {
                  type: o.props.iconType || d.props.legendType,
                  value: v.name,
                  color: v.fill,
                  payload: v,
                }
              }),
            )
          }, []))
        : (u = (n || []).map(function (l) {
            var f = l.item,
              d = f.type.defaultProps,
              h = d !== void 0 ? fn(fn({}, d), f.props) : {},
              y = h.dataKey,
              v = h.name,
              p = h.legendType,
              x = h.hide
            return {
              inactive: x,
              dataKey: y,
              type: c.iconType || p || 'square',
              color: wp(f),
              value: v || y,
              payload: h,
            }
          })),
    fn(fn(fn({}, c), di.getWithHeight(o, i)), {}, { payload: u, item: o })
  )
}
function Oo(e) {
  '@babel/helpers - typeof'
  return (
    (Oo =
      typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
        ? function (t) {
            return typeof t
          }
        : function (t) {
            return t &&
              typeof Symbol == 'function' &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? 'symbol'
              : typeof t
          }),
    Oo(e)
  )
}
function Km(e) {
  return WF(e) || UF(e) || FF(e) || BF()
}
function BF() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}
function FF(e, t) {
  if (e) {
    if (typeof e == 'string') return nd(e, t)
    var r = Object.prototype.toString.call(e).slice(8, -1)
    if (
      (r === 'Object' && e.constructor && (r = e.constructor.name),
      r === 'Map' || r === 'Set')
    )
      return Array.from(e)
    if (r === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
      return nd(e, t)
  }
}
function UF(e) {
  if (
    (typeof Symbol < 'u' && e[Symbol.iterator] != null) ||
    e['@@iterator'] != null
  )
    return Array.from(e)
}
function WF(e) {
  if (Array.isArray(e)) return nd(e)
}
function nd(e, t) {
  ;(t == null || t > e.length) && (t = e.length)
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r]
  return n
}
function Gm(e, t) {
  var r = Object.keys(e)
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e)
    t &&
      (n = n.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable
      })),
      r.push.apply(r, n)
  }
  return r
}
function Me(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {}
    t % 2
      ? Gm(Object(r), !0).forEach(function (n) {
          pi(e, n, r[n])
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
        : Gm(Object(r)).forEach(function (n) {
            Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
          })
  }
  return e
}
function pi(e, t, r) {
  return (
    (t = qF(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  )
}
function qF(e) {
  var t = HF(e, 'string')
  return Oo(t) == 'symbol' ? t : t + ''
}
function HF(e, t) {
  if (Oo(e) != 'object' || !e) return e
  var r = e[Symbol.toPrimitive]
  if (r !== void 0) {
    var n = r.call(e, t || 'default')
    if (Oo(n) != 'object') return n
    throw new TypeError('@@toPrimitive must return a primitive value.')
  }
  return (t === 'string' ? String : Number)(e)
}
function Ue(e, t, r) {
  return se(e) || se(t) ? r : We(t) ? xt(e, t, r) : ie(t) ? t(e) : r
}
function Ya(e, t, r, n) {
  var i = U7(e, function (s) {
    return Ue(s, t)
  })
  if (r === 'number') {
    var a = i.filter(function (s) {
      return U(s) || parseFloat(s)
    })
    return a.length ? [Bu(a), Lu(a)] : [1 / 0, -1 / 0]
  }
  var o = n
    ? i.filter(function (s) {
        return !se(s)
      })
    : i
  return o.map(function (s) {
    return We(s) || s instanceof Date ? s : ''
  })
}
var zF = function (t) {
    var r,
      n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [],
      i = arguments.length > 2 ? arguments[2] : void 0,
      a = arguments.length > 3 ? arguments[3] : void 0,
      o = -1,
      s = (r = n == null ? void 0 : n.length) !== null && r !== void 0 ? r : 0
    if (s <= 1) return 0
    if (
      a &&
      a.axisType === 'angleAxis' &&
      Math.abs(Math.abs(a.range[1] - a.range[0]) - 360) <= 1e-6
    )
      for (var c = a.range, u = 0; u < s; u++) {
        var l = u > 0 ? i[u - 1].coordinate : i[s - 1].coordinate,
          f = i[u].coordinate,
          d = u >= s - 1 ? i[0].coordinate : i[u + 1].coordinate,
          h = void 0
        if (at(f - l) !== at(d - f)) {
          var y = []
          if (at(d - f) === at(c[1] - c[0])) {
            h = d
            var v = f + c[1] - c[0]
            ;(y[0] = Math.min(v, (v + l) / 2)),
              (y[1] = Math.max(v, (v + l) / 2))
          } else {
            h = l
            var p = d + c[1] - c[0]
            ;(y[0] = Math.min(f, (p + f) / 2)),
              (y[1] = Math.max(f, (p + f) / 2))
          }
          var x = [Math.min(f, (h + f) / 2), Math.max(f, (h + f) / 2)]
          if ((t > x[0] && t <= x[1]) || (t >= y[0] && t <= y[1])) {
            o = i[u].index
            break
          }
        } else {
          var b = Math.min(l, d),
            w = Math.max(l, d)
          if (t > (b + f) / 2 && t <= (w + f) / 2) {
            o = i[u].index
            break
          }
        }
      }
    else
      for (var g = 0; g < s; g++)
        if (
          (g === 0 && t <= (n[g].coordinate + n[g + 1].coordinate) / 2) ||
          (g > 0 &&
            g < s - 1 &&
            t > (n[g].coordinate + n[g - 1].coordinate) / 2 &&
            t <= (n[g].coordinate + n[g + 1].coordinate) / 2) ||
          (g === s - 1 && t > (n[g].coordinate + n[g - 1].coordinate) / 2)
        ) {
          o = n[g].index
          break
        }
    return o
  },
  wp = function (t) {
    var r,
      n = t,
      i = n.type.displayName,
      a =
        (r = t.type) !== null && r !== void 0 && r.defaultProps
          ? Me(Me({}, t.type.defaultProps), t.props)
          : t.props,
      o = a.stroke,
      s = a.fill,
      c
    switch (i) {
      case 'Line':
        c = o
        break
      case 'Area':
      case 'Radar':
        c = o && o !== 'none' ? o : s
        break
      default:
        c = s
        break
    }
    return c
  },
  KF = function (t) {
    var r = t.barSize,
      n = t.totalSize,
      i = t.stackGroups,
      a = i === void 0 ? {} : i
    if (!a) return {}
    for (var o = {}, s = Object.keys(a), c = 0, u = s.length; c < u; c++)
      for (
        var l = a[s[c]].stackGroups, f = Object.keys(l), d = 0, h = f.length;
        d < h;
        d++
      ) {
        var y = l[f[d]],
          v = y.items,
          p = y.cateAxisId,
          x = v.filter(function (P) {
            return Or(P.type).indexOf('Bar') >= 0
          })
        if (x && x.length) {
          var b = x[0].type.defaultProps,
            w = b !== void 0 ? Me(Me({}, b), x[0].props) : x[0].props,
            g = w.barSize,
            m = w[p]
          o[m] || (o[m] = [])
          var S = se(g) ? r : g
          o[m].push({
            item: x[0],
            stackList: x.slice(1),
            barSize: se(S) ? void 0 : ot(S, n, 0),
          })
        }
      }
    return o
  },
  GF = function (t) {
    var r = t.barGap,
      n = t.barCategoryGap,
      i = t.bandSize,
      a = t.sizeList,
      o = a === void 0 ? [] : a,
      s = t.maxBarSize,
      c = o.length
    if (c < 1) return null
    var u = ot(r, i, 0, !0),
      l,
      f = []
    if (o[0].barSize === +o[0].barSize) {
      var d = !1,
        h = i / c,
        y = o.reduce(function (g, m) {
          return g + m.barSize || 0
        }, 0)
      ;(y += (c - 1) * u),
        y >= i && ((y -= (c - 1) * u), (u = 0)),
        y >= i && h > 0 && ((d = !0), (h *= 0.9), (y = c * h))
      var v = ((i - y) / 2) >> 0,
        p = { offset: v - u, size: 0 }
      l = o.reduce(function (g, m) {
        var S = {
            item: m.item,
            position: {
              offset: p.offset + p.size + u,
              size: d ? h : m.barSize,
            },
          },
          P = [].concat(Km(g), [S])
        return (
          (p = P[P.length - 1].position),
          m.stackList &&
            m.stackList.length &&
            m.stackList.forEach(function ($) {
              P.push({ item: $, position: p })
            }),
          P
        )
      }, f)
    } else {
      var x = ot(n, i, 0, !0)
      i - 2 * x - (c - 1) * u <= 0 && (u = 0)
      var b = (i - 2 * x - (c - 1) * u) / c
      b > 1 && (b >>= 0)
      var w = s === +s ? Math.min(b, s) : b
      l = o.reduce(function (g, m, S) {
        var P = [].concat(Km(g), [
          {
            item: m.item,
            position: { offset: x + (b + u) * S + (b - w) / 2, size: w },
          },
        ])
        return (
          m.stackList &&
            m.stackList.length &&
            m.stackList.forEach(function ($) {
              P.push({ item: $, position: P[P.length - 1].position })
            }),
          P
        )
      }, f)
    }
    return l
  },
  VF = function (t, r, n, i) {
    var a = n.children,
      o = n.width,
      s = n.margin,
      c = o - (s.left || 0) - (s.right || 0),
      u = $O({ children: a, legendWidth: c })
    if (u) {
      var l = i || {},
        f = l.width,
        d = l.height,
        h = u.align,
        y = u.verticalAlign,
        v = u.layout
      if (
        (v === 'vertical' || (v === 'horizontal' && y === 'middle')) &&
        h !== 'center' &&
        U(t[h])
      )
        return Me(Me({}, t), {}, pi({}, h, t[h] + (f || 0)))
      if (
        (v === 'horizontal' || (v === 'vertical' && h === 'center')) &&
        y !== 'middle' &&
        U(t[y])
      )
        return Me(Me({}, t), {}, pi({}, y, t[y] + (d || 0)))
    }
    return t
  },
  XF = function (t, r, n) {
    return se(r)
      ? !0
      : t === 'horizontal'
        ? r === 'yAxis'
        : t === 'vertical' || n === 'x'
          ? r === 'xAxis'
          : n === 'y'
            ? r === 'yAxis'
            : !0
  },
  EO = function (t, r, n, i, a) {
    var o = r.props.children,
      s = wt(o, os).filter(function (u) {
        return XF(i, a, u.props.direction)
      })
    if (s && s.length) {
      var c = s.map(function (u) {
        return u.props.dataKey
      })
      return t.reduce(
        function (u, l) {
          var f = Ue(l, n)
          if (se(f)) return u
          var d = Array.isArray(f) ? [Bu(f), Lu(f)] : [f, f],
            h = c.reduce(
              function (y, v) {
                var p = Ue(l, v, 0),
                  x = d[0] - Math.abs(Array.isArray(p) ? p[0] : p),
                  b = d[1] + Math.abs(Array.isArray(p) ? p[1] : p)
                return [Math.min(x, y[0]), Math.max(b, y[1])]
              },
              [1 / 0, -1 / 0],
            )
          return [Math.min(h[0], u[0]), Math.max(h[1], u[1])]
        },
        [1 / 0, -1 / 0],
      )
    }
    return null
  },
  YF = function (t, r, n, i, a) {
    var o = r
      .map(function (s) {
        return EO(t, s, n, a, i)
      })
      .filter(function (s) {
        return !se(s)
      })
    return o && o.length
      ? o.reduce(
          function (s, c) {
            return [Math.min(s[0], c[0]), Math.max(s[1], c[1])]
          },
          [1 / 0, -1 / 0],
        )
      : null
  },
  _O = function (t, r, n, i, a) {
    var o = r.map(function (c) {
      var u = c.props.dataKey
      return (n === 'number' && u && EO(t, c, u, i)) || Ya(t, u, n, a)
    })
    if (n === 'number')
      return o.reduce(
        function (c, u) {
          return [Math.min(c[0], u[0]), Math.max(c[1], u[1])]
        },
        [1 / 0, -1 / 0],
      )
    var s = {}
    return o.reduce(function (c, u) {
      for (var l = 0, f = u.length; l < f; l++)
        s[u[l]] || ((s[u[l]] = !0), c.push(u[l]))
      return c
    }, [])
  },
  CO = function (t, r) {
    return (
      (t === 'horizontal' && r === 'xAxis') ||
      (t === 'vertical' && r === 'yAxis') ||
      (t === 'centric' && r === 'angleAxis') ||
      (t === 'radial' && r === 'radiusAxis')
    )
  },
  jO = function (t, r, n, i) {
    if (i)
      return t.map(function (c) {
        return c.coordinate
      })
    var a,
      o,
      s = t.map(function (c) {
        return (
          c.coordinate === r && (a = !0),
          c.coordinate === n && (o = !0),
          c.coordinate
        )
      })
    return a || s.push(r), o || s.push(n), s
  },
  xr = function (t, r, n) {
    if (!t) return null
    var i = t.scale,
      a = t.duplicateDomain,
      o = t.type,
      s = t.range,
      c = t.realScaleType === 'scaleBand' ? i.bandwidth() / 2 : 2,
      u = (r || n) && o === 'category' && i.bandwidth ? i.bandwidth() / c : 0
    if (
      ((u =
        t.axisType === 'angleAxis' && (s == null ? void 0 : s.length) >= 2
          ? at(s[0] - s[1]) * 2 * u
          : u),
      r && (t.ticks || t.niceTicks))
    ) {
      var l = (t.ticks || t.niceTicks).map(function (f) {
        var d = a ? a.indexOf(f) : f
        return { coordinate: i(d) + u, value: f, offset: u }
      })
      return l.filter(function (f) {
        return !Jo(f.coordinate)
      })
    }
    return t.isCategorical && t.categoricalDomain
      ? t.categoricalDomain.map(function (f, d) {
          return { coordinate: i(f) + u, value: f, index: d, offset: u }
        })
      : i.ticks && !n
        ? i.ticks(t.tickCount).map(function (f) {
            return { coordinate: i(f) + u, value: f, offset: u }
          })
        : i.domain().map(function (f, d) {
            return {
              coordinate: i(f) + u,
              value: a ? a[f] : f,
              index: d,
              offset: u,
            }
          })
  },
  kl = new WeakMap(),
  Ps = function (t, r) {
    if (typeof r != 'function') return t
    kl.has(t) || kl.set(t, new WeakMap())
    var n = kl.get(t)
    if (n.has(r)) return n.get(r)
    var i = function () {
      t.apply(void 0, arguments), r.apply(void 0, arguments)
    }
    return n.set(r, i), i
  },
  TO = function (t, r, n) {
    var i = t.scale,
      a = t.type,
      o = t.layout,
      s = t.axisType
    if (i === 'auto')
      return o === 'radial' && s === 'radiusAxis'
        ? { scale: po(), realScaleType: 'band' }
        : o === 'radial' && s === 'angleAxis'
          ? { scale: vc(), realScaleType: 'linear' }
          : a === 'category' &&
              r &&
              (r.indexOf('LineChart') >= 0 ||
                r.indexOf('AreaChart') >= 0 ||
                (r.indexOf('ComposedChart') >= 0 && !n))
            ? { scale: Xa(), realScaleType: 'point' }
            : a === 'category'
              ? { scale: po(), realScaleType: 'band' }
              : { scale: vc(), realScaleType: 'linear' }
    if (Zo(i)) {
      var c = 'scale'.concat(Su(i))
      return { scale: (Fm[c] || Xa)(), realScaleType: Fm[c] ? c : 'point' }
    }
    return ie(i) ? { scale: i } : { scale: Xa(), realScaleType: 'point' }
  },
  Vm = 1e-4,
  kO = function (t) {
    var r = t.domain()
    if (!(!r || r.length <= 2)) {
      var n = r.length,
        i = t.range(),
        a = Math.min(i[0], i[1]) - Vm,
        o = Math.max(i[0], i[1]) + Vm,
        s = t(r[0]),
        c = t(r[n - 1])
      ;(s < a || s > o || c < a || c > o) && t.domain([r[0], r[n - 1]])
    }
  },
  QF = function (t, r) {
    if (!t) return null
    for (var n = 0, i = t.length; n < i; n++)
      if (t[n].item === r) return t[n].position
    return null
  },
  ZF = function (t, r) {
    if (!r || r.length !== 2 || !U(r[0]) || !U(r[1])) return t
    var n = Math.min(r[0], r[1]),
      i = Math.max(r[0], r[1]),
      a = [t[0], t[1]]
    return (
      (!U(t[0]) || t[0] < n) && (a[0] = n),
      (!U(t[1]) || t[1] > i) && (a[1] = i),
      a[0] > i && (a[0] = i),
      a[1] < n && (a[1] = n),
      a
    )
  },
  JF = function (t) {
    var r = t.length
    if (!(r <= 0))
      for (var n = 0, i = t[0].length; n < i; ++n)
        for (var a = 0, o = 0, s = 0; s < r; ++s) {
          var c = Jo(t[s][n][1]) ? t[s][n][0] : t[s][n][1]
          c >= 0
            ? ((t[s][n][0] = a), (t[s][n][1] = a + c), (a = t[s][n][1]))
            : ((t[s][n][0] = o), (t[s][n][1] = o + c), (o = t[s][n][1]))
        }
  },
  e9 = function (t) {
    var r = t.length
    if (!(r <= 0))
      for (var n = 0, i = t[0].length; n < i; ++n)
        for (var a = 0, o = 0; o < r; ++o) {
          var s = Jo(t[o][n][1]) ? t[o][n][0] : t[o][n][1]
          s >= 0
            ? ((t[o][n][0] = a), (t[o][n][1] = a + s), (a = t[o][n][1]))
            : ((t[o][n][0] = 0), (t[o][n][1] = 0))
        }
  },
  t9 = {
    sign: JF,
    expand: bM,
    none: Ii,
    silhouette: xM,
    wiggle: wM,
    positive: e9,
  },
  r9 = function (t, r, n) {
    var i = r.map(function (s) {
        return s.props.dataKey
      }),
      a = t9[n],
      o = gM()
        .keys(i)
        .value(function (s, c) {
          return +Ue(s, c, 0)
        })
        .order(_f)
        .offset(a)
    return o(t)
  },
  n9 = function (t, r, n, i, a, o) {
    if (!t) return null
    var s = o ? r.reverse() : r,
      c = {},
      u = s.reduce(function (f, d) {
        var h,
          y =
            (h = d.type) !== null && h !== void 0 && h.defaultProps
              ? Me(Me({}, d.type.defaultProps), d.props)
              : d.props,
          v = y.stackId,
          p = y.hide
        if (p) return f
        var x = y[n],
          b = f[x] || { hasStack: !1, stackGroups: {} }
        if (We(v)) {
          var w = b.stackGroups[v] || {
            numericAxisId: n,
            cateAxisId: i,
            items: [],
          }
          w.items.push(d), (b.hasStack = !0), (b.stackGroups[v] = w)
        } else
          b.stackGroups[ma('_stackId_')] = {
            numericAxisId: n,
            cateAxisId: i,
            items: [d],
          }
        return Me(Me({}, f), {}, pi({}, x, b))
      }, c),
      l = {}
    return Object.keys(u).reduce(function (f, d) {
      var h = u[d]
      if (h.hasStack) {
        var y = {}
        h.stackGroups = Object.keys(h.stackGroups).reduce(function (v, p) {
          var x = h.stackGroups[p]
          return Me(
            Me({}, v),
            {},
            pi({}, p, {
              numericAxisId: n,
              cateAxisId: i,
              items: x.items,
              stackedData: r9(t, x.items, a),
            }),
          )
        }, y)
      }
      return Me(Me({}, f), {}, pi({}, d, h))
    }, l)
  },
  MO = function (t, r) {
    var n = r.realScaleType,
      i = r.type,
      a = r.tickCount,
      o = r.originalDomain,
      s = r.allowDecimals,
      c = n || r.scale
    if (c !== 'auto' && c !== 'linear') return null
    if (a && i === 'number' && o && (o[0] === 'auto' || o[1] === 'auto')) {
      var u = t.domain()
      if (!u.length) return null
      var l = mF(u, a, s)
      return t.domain([Bu(l), Lu(l)]), { niceTicks: l }
    }
    if (a && i === 'number') {
      var f = t.domain(),
        d = gF(f, a, s)
      return { niceTicks: d }
    }
    return null
  }
function Xm(e) {
  var t = e.axis,
    r = e.ticks,
    n = e.bandSize,
    i = e.entry,
    a = e.index,
    o = e.dataKey
  if (t.type === 'category') {
    if (!t.allowDuplicatedCategory && t.dataKey && !se(i[t.dataKey])) {
      var s = Vs(r, 'value', i[t.dataKey])
      if (s) return s.coordinate + n / 2
    }
    return r[a] ? r[a].coordinate + n / 2 : null
  }
  var c = Ue(i, se(o) ? t.dataKey : o)
  return se(c) ? null : t.scale(c)
}
var Ym = function (t) {
    var r = t.axis,
      n = t.ticks,
      i = t.offset,
      a = t.bandSize,
      o = t.entry,
      s = t.index
    if (r.type === 'category') return n[s] ? n[s].coordinate + i : null
    var c = Ue(o, r.dataKey, r.domain[s])
    return se(c) ? null : r.scale(c) - a / 2 + i
  },
  i9 = function (t) {
    var r = t.numericAxis,
      n = r.scale.domain()
    if (r.type === 'number') {
      var i = Math.min(n[0], n[1]),
        a = Math.max(n[0], n[1])
      return i <= 0 && a >= 0 ? 0 : a < 0 ? a : i
    }
    return n[0]
  },
  a9 = function (t, r) {
    var n,
      i =
        (n = t.type) !== null && n !== void 0 && n.defaultProps
          ? Me(Me({}, t.type.defaultProps), t.props)
          : t.props,
      a = i.stackId
    if (We(a)) {
      var o = r[a]
      if (o) {
        var s = o.items.indexOf(t)
        return s >= 0 ? o.stackedData[s] : null
      }
    }
    return null
  },
  o9 = function (t) {
    return t.reduce(
      function (r, n) {
        return [Bu(n.concat([r[0]]).filter(U)), Lu(n.concat([r[1]]).filter(U))]
      },
      [1 / 0, -1 / 0],
    )
  },
  NO = function (t, r, n) {
    return Object.keys(t)
      .reduce(
        function (i, a) {
          var o = t[a],
            s = o.stackedData,
            c = s.reduce(
              function (u, l) {
                var f = o9(l.slice(r, n + 1))
                return [Math.min(u[0], f[0]), Math.max(u[1], f[1])]
              },
              [1 / 0, -1 / 0],
            )
          return [Math.min(c[0], i[0]), Math.max(c[1], i[1])]
        },
        [1 / 0, -1 / 0],
      )
      .map(function (i) {
        return i === 1 / 0 || i === -1 / 0 ? 0 : i
      })
  },
  Qm = /^dataMin[\s]*-[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/,
  Zm = /^dataMax[\s]*\+[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/,
  id = function (t, r, n) {
    if (ie(t)) return t(r, n)
    if (!Array.isArray(t)) return r
    var i = []
    if (U(t[0])) i[0] = n ? t[0] : Math.min(t[0], r[0])
    else if (Qm.test(t[0])) {
      var a = +Qm.exec(t[0])[1]
      i[0] = r[0] - a
    } else ie(t[0]) ? (i[0] = t[0](r[0])) : (i[0] = r[0])
    if (U(t[1])) i[1] = n ? t[1] : Math.max(t[1], r[1])
    else if (Zm.test(t[1])) {
      var o = +Zm.exec(t[1])[1]
      i[1] = r[1] + o
    } else ie(t[1]) ? (i[1] = t[1](r[1])) : (i[1] = r[1])
    return i
  },
  Oc = function (t, r, n) {
    if (t && t.scale && t.scale.bandwidth) {
      var i = t.scale.bandwidth()
      if (!n || i > 0) return i
    }
    if (t && r && r.length >= 2) {
      for (
        var a = Xh(r, function (f) {
            return f.coordinate
          }),
          o = 1 / 0,
          s = 1,
          c = a.length;
        s < c;
        s++
      ) {
        var u = a[s],
          l = a[s - 1]
        o = Math.min((u.coordinate || 0) - (l.coordinate || 0), o)
      }
      return o === 1 / 0 ? 0 : o
    }
    return n ? void 0 : 0
  },
  Jm = function (t, r, n) {
    return !t || !t.length || as(t, xt(n, 'type.defaultProps.domain')) ? r : t
  },
  IO = function (t, r) {
    var n = t.type.defaultProps
        ? Me(Me({}, t.type.defaultProps), t.props)
        : t.props,
      i = n.dataKey,
      a = n.name,
      o = n.unit,
      s = n.formatter,
      c = n.tooltipType,
      u = n.chartType,
      l = n.hide
    return Me(
      Me({}, J(t, !1)),
      {},
      {
        dataKey: i,
        unit: o,
        formatter: s,
        name: a || i,
        color: wp(t),
        value: Ue(r, i),
        type: c,
        payload: r,
        chartType: u,
        hide: l,
      },
    )
  }
function So(e) {
  '@babel/helpers - typeof'
  return (
    (So =
      typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
        ? function (t) {
            return typeof t
          }
        : function (t) {
            return t &&
              typeof Symbol == 'function' &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? 'symbol'
              : typeof t
          }),
    So(e)
  )
}
function eg(e, t) {
  var r = Object.keys(e)
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e)
    t &&
      (n = n.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable
      })),
      r.push.apply(r, n)
  }
  return r
}
function pr(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {}
    t % 2
      ? eg(Object(r), !0).forEach(function (n) {
          RO(e, n, r[n])
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
        : eg(Object(r)).forEach(function (n) {
            Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
          })
  }
  return e
}
function RO(e, t, r) {
  return (
    (t = s9(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  )
}
function s9(e) {
  var t = c9(e, 'string')
  return So(t) == 'symbol' ? t : t + ''
}
function c9(e, t) {
  if (So(e) != 'object' || !e) return e
  var r = e[Symbol.toPrimitive]
  if (r !== void 0) {
    var n = r.call(e, t || 'default')
    if (So(n) != 'object') return n
    throw new TypeError('@@toPrimitive must return a primitive value.')
  }
  return (t === 'string' ? String : Number)(e)
}
function u9(e, t) {
  return h9(e) || d9(e, t) || f9(e, t) || l9()
}
function l9() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}
function f9(e, t) {
  if (e) {
    if (typeof e == 'string') return tg(e, t)
    var r = Object.prototype.toString.call(e).slice(8, -1)
    if (
      (r === 'Object' && e.constructor && (r = e.constructor.name),
      r === 'Map' || r === 'Set')
    )
      return Array.from(e)
    if (r === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
      return tg(e, t)
  }
}
function tg(e, t) {
  ;(t == null || t > e.length) && (t = e.length)
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r]
  return n
}
function d9(e, t) {
  var r =
    e == null
      ? null
      : (typeof Symbol < 'u' && e[Symbol.iterator]) || e['@@iterator']
  if (r != null) {
    var n,
      i,
      a,
      o,
      s = [],
      c = !0,
      u = !1
    try {
      if (((a = (r = r.call(e)).next), t !== 0))
        for (
          ;
          !(c = (n = a.call(r)).done) && (s.push(n.value), s.length !== t);
          c = !0
        );
    } catch (l) {
      ;(u = !0), (i = l)
    } finally {
      try {
        if (!c && r.return != null && ((o = r.return()), Object(o) !== o))
          return
      } finally {
        if (u) throw i
      }
    }
    return s
  }
}
function h9(e) {
  if (Array.isArray(e)) return e
}
var Sc = Math.PI / 180,
  p9 = function (t) {
    return (t * 180) / Math.PI
  },
  Pe = function (t, r, n, i) {
    return { x: t + Math.cos(-Sc * i) * n, y: r + Math.sin(-Sc * i) * n }
  },
  DO = function (t, r) {
    var n =
      arguments.length > 2 && arguments[2] !== void 0
        ? arguments[2]
        : { top: 0, right: 0, bottom: 0, left: 0 }
    return (
      Math.min(
        Math.abs(t - (n.left || 0) - (n.right || 0)),
        Math.abs(r - (n.top || 0) - (n.bottom || 0)),
      ) / 2
    )
  },
  v9 = function (t, r, n, i, a) {
    var o = t.width,
      s = t.height,
      c = t.startAngle,
      u = t.endAngle,
      l = ot(t.cx, o, o / 2),
      f = ot(t.cy, s, s / 2),
      d = DO(o, s, n),
      h = ot(t.innerRadius, d, 0),
      y = ot(t.outerRadius, d, d * 0.8),
      v = Object.keys(r)
    return v.reduce(function (p, x) {
      var b = r[x],
        w = b.domain,
        g = b.reversed,
        m
      if (se(b.range))
        i === 'angleAxis' ? (m = [c, u]) : i === 'radiusAxis' && (m = [h, y]),
          g && (m = [m[1], m[0]])
      else {
        m = b.range
        var S = m,
          P = u9(S, 2)
        ;(c = P[0]), (u = P[1])
      }
      var $ = TO(b, a),
        T = $.realScaleType,
        k = $.scale
      k.domain(w).range(m), kO(k)
      var C = MO(k, pr(pr({}, b), {}, { realScaleType: T })),
        j = pr(
          pr(pr({}, b), C),
          {},
          {
            range: m,
            radius: y,
            realScaleType: T,
            scale: k,
            cx: l,
            cy: f,
            innerRadius: h,
            outerRadius: y,
            startAngle: c,
            endAngle: u,
          },
        )
      return pr(pr({}, p), {}, RO({}, x, j))
    }, {})
  },
  y9 = function (t, r) {
    var n = t.x,
      i = t.y,
      a = r.x,
      o = r.y
    return Math.sqrt(Math.pow(n - a, 2) + Math.pow(i - o, 2))
  },
  m9 = function (t, r) {
    var n = t.x,
      i = t.y,
      a = r.cx,
      o = r.cy,
      s = y9({ x: n, y: i }, { x: a, y: o })
    if (s <= 0) return { radius: s }
    var c = (n - a) / s,
      u = Math.acos(c)
    return (
      i > o && (u = 2 * Math.PI - u),
      { radius: s, angle: p9(u), angleInRadian: u }
    )
  },
  g9 = function (t) {
    var r = t.startAngle,
      n = t.endAngle,
      i = Math.floor(r / 360),
      a = Math.floor(n / 360),
      o = Math.min(i, a)
    return { startAngle: r - o * 360, endAngle: n - o * 360 }
  },
  b9 = function (t, r) {
    var n = r.startAngle,
      i = r.endAngle,
      a = Math.floor(n / 360),
      o = Math.floor(i / 360),
      s = Math.min(a, o)
    return t + s * 360
  },
  rg = function (t, r) {
    var n = t.x,
      i = t.y,
      a = m9({ x: n, y: i }, r),
      o = a.radius,
      s = a.angle,
      c = r.innerRadius,
      u = r.outerRadius
    if (o < c || o > u) return !1
    if (o === 0) return !0
    var l = g9(r),
      f = l.startAngle,
      d = l.endAngle,
      h = s,
      y
    if (f <= d) {
      for (; h > d; ) h -= 360
      for (; h < f; ) h += 360
      y = h >= f && h <= d
    } else {
      for (; h > f; ) h -= 360
      for (; h < d; ) h += 360
      y = h >= d && h <= f
    }
    return y ? pr(pr({}, r), {}, { radius: o, angle: b9(h, r) }) : null
  },
  LO = function (t) {
    return !A.isValidElement(t) && !ie(t) && typeof t != 'boolean'
      ? t.className
      : ''
  }
function Ao(e) {
  '@babel/helpers - typeof'
  return (
    (Ao =
      typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
        ? function (t) {
            return typeof t
          }
        : function (t) {
            return t &&
              typeof Symbol == 'function' &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? 'symbol'
              : typeof t
          }),
    Ao(e)
  )
}
var x9 = ['offset']
function w9(e) {
  return P9(e) || A9(e) || S9(e) || O9()
}
function O9() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}
function S9(e, t) {
  if (e) {
    if (typeof e == 'string') return ad(e, t)
    var r = Object.prototype.toString.call(e).slice(8, -1)
    if (
      (r === 'Object' && e.constructor && (r = e.constructor.name),
      r === 'Map' || r === 'Set')
    )
      return Array.from(e)
    if (r === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
      return ad(e, t)
  }
}
function A9(e) {
  if (
    (typeof Symbol < 'u' && e[Symbol.iterator] != null) ||
    e['@@iterator'] != null
  )
    return Array.from(e)
}
function P9(e) {
  if (Array.isArray(e)) return ad(e)
}
function ad(e, t) {
  ;(t == null || t > e.length) && (t = e.length)
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r]
  return n
}
function $9(e, t) {
  if (e == null) return {}
  var r = E9(e, t),
    n,
    i
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e)
    for (i = 0; i < a.length; i++)
      (n = a[i]),
        !(t.indexOf(n) >= 0) &&
          Object.prototype.propertyIsEnumerable.call(e, n) &&
          (r[n] = e[n])
  }
  return r
}
function E9(e, t) {
  if (e == null) return {}
  var r = {}
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue
      r[n] = e[n]
    }
  return r
}
function ng(e, t) {
  var r = Object.keys(e)
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e)
    t &&
      (n = n.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable
      })),
      r.push.apply(r, n)
  }
  return r
}
function Be(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {}
    t % 2
      ? ng(Object(r), !0).forEach(function (n) {
          _9(e, n, r[n])
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
        : ng(Object(r)).forEach(function (n) {
            Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
          })
  }
  return e
}
function _9(e, t, r) {
  return (
    (t = C9(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  )
}
function C9(e) {
  var t = j9(e, 'string')
  return Ao(t) == 'symbol' ? t : t + ''
}
function j9(e, t) {
  if (Ao(e) != 'object' || !e) return e
  var r = e[Symbol.toPrimitive]
  if (r !== void 0) {
    var n = r.call(e, t || 'default')
    if (Ao(n) != 'object') return n
    throw new TypeError('@@toPrimitive must return a primitive value.')
  }
  return (t === 'string' ? String : Number)(e)
}
function Po() {
  return (
    (Po = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t]
            for (var n in r)
              Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
          }
          return e
        }),
    Po.apply(this, arguments)
  )
}
var T9 = function (t) {
    var r = t.value,
      n = t.formatter,
      i = se(t.children) ? r : t.children
    return ie(n) ? n(i) : i
  },
  k9 = function (t, r) {
    var n = at(r - t),
      i = Math.min(Math.abs(r - t), 360)
    return n * i
  },
  M9 = function (t, r, n) {
    var i = t.position,
      a = t.viewBox,
      o = t.offset,
      s = t.className,
      c = a,
      u = c.cx,
      l = c.cy,
      f = c.innerRadius,
      d = c.outerRadius,
      h = c.startAngle,
      y = c.endAngle,
      v = c.clockWise,
      p = (f + d) / 2,
      x = k9(h, y),
      b = x >= 0 ? 1 : -1,
      w,
      g
    i === 'insideStart'
      ? ((w = h + b * o), (g = v))
      : i === 'insideEnd'
        ? ((w = y - b * o), (g = !v))
        : i === 'end' && ((w = y + b * o), (g = v)),
      (g = x <= 0 ? g : !g)
    var m = Pe(u, l, p, w),
      S = Pe(u, l, p, w + (g ? 1 : -1) * 359),
      P = 'M'
        .concat(m.x, ',')
        .concat(
          m.y,
          `
    A`,
        )
        .concat(p, ',')
        .concat(p, ',0,1,')
        .concat(
          g ? 0 : 1,
          `,
    `,
        )
        .concat(S.x, ',')
        .concat(S.y),
      $ = se(t.id) ? ma('recharts-radial-line-') : t.id
    return E.createElement(
      'text',
      Po({}, n, {
        dominantBaseline: 'central',
        className: ue('recharts-radial-bar-label', s),
      }),
      E.createElement('defs', null, E.createElement('path', { id: $, d: P })),
      E.createElement('textPath', { xlinkHref: '#'.concat($) }, r),
    )
  },
  N9 = function (t) {
    var r = t.viewBox,
      n = t.offset,
      i = t.position,
      a = r,
      o = a.cx,
      s = a.cy,
      c = a.innerRadius,
      u = a.outerRadius,
      l = a.startAngle,
      f = a.endAngle,
      d = (l + f) / 2
    if (i === 'outside') {
      var h = Pe(o, s, u + n, d),
        y = h.x,
        v = h.y
      return {
        x: y,
        y: v,
        textAnchor: y >= o ? 'start' : 'end',
        verticalAnchor: 'middle',
      }
    }
    if (i === 'center')
      return { x: o, y: s, textAnchor: 'middle', verticalAnchor: 'middle' }
    if (i === 'centerTop')
      return { x: o, y: s, textAnchor: 'middle', verticalAnchor: 'start' }
    if (i === 'centerBottom')
      return { x: o, y: s, textAnchor: 'middle', verticalAnchor: 'end' }
    var p = (c + u) / 2,
      x = Pe(o, s, p, d),
      b = x.x,
      w = x.y
    return { x: b, y: w, textAnchor: 'middle', verticalAnchor: 'middle' }
  },
  I9 = function (t) {
    var r = t.viewBox,
      n = t.parentViewBox,
      i = t.offset,
      a = t.position,
      o = r,
      s = o.x,
      c = o.y,
      u = o.width,
      l = o.height,
      f = l >= 0 ? 1 : -1,
      d = f * i,
      h = f > 0 ? 'end' : 'start',
      y = f > 0 ? 'start' : 'end',
      v = u >= 0 ? 1 : -1,
      p = v * i,
      x = v > 0 ? 'end' : 'start',
      b = v > 0 ? 'start' : 'end'
    if (a === 'top') {
      var w = {
        x: s + u / 2,
        y: c - f * i,
        textAnchor: 'middle',
        verticalAnchor: h,
      }
      return Be(Be({}, w), n ? { height: Math.max(c - n.y, 0), width: u } : {})
    }
    if (a === 'bottom') {
      var g = {
        x: s + u / 2,
        y: c + l + d,
        textAnchor: 'middle',
        verticalAnchor: y,
      }
      return Be(
        Be({}, g),
        n ? { height: Math.max(n.y + n.height - (c + l), 0), width: u } : {},
      )
    }
    if (a === 'left') {
      var m = {
        x: s - p,
        y: c + l / 2,
        textAnchor: x,
        verticalAnchor: 'middle',
      }
      return Be(
        Be({}, m),
        n ? { width: Math.max(m.x - n.x, 0), height: l } : {},
      )
    }
    if (a === 'right') {
      var S = {
        x: s + u + p,
        y: c + l / 2,
        textAnchor: b,
        verticalAnchor: 'middle',
      }
      return Be(
        Be({}, S),
        n ? { width: Math.max(n.x + n.width - S.x, 0), height: l } : {},
      )
    }
    var P = n ? { width: u, height: l } : {}
    return a === 'insideLeft'
      ? Be(
          { x: s + p, y: c + l / 2, textAnchor: b, verticalAnchor: 'middle' },
          P,
        )
      : a === 'insideRight'
        ? Be(
            {
              x: s + u - p,
              y: c + l / 2,
              textAnchor: x,
              verticalAnchor: 'middle',
            },
            P,
          )
        : a === 'insideTop'
          ? Be(
              {
                x: s + u / 2,
                y: c + d,
                textAnchor: 'middle',
                verticalAnchor: y,
              },
              P,
            )
          : a === 'insideBottom'
            ? Be(
                {
                  x: s + u / 2,
                  y: c + l - d,
                  textAnchor: 'middle',
                  verticalAnchor: h,
                },
                P,
              )
            : a === 'insideTopLeft'
              ? Be({ x: s + p, y: c + d, textAnchor: b, verticalAnchor: y }, P)
              : a === 'insideTopRight'
                ? Be(
                    {
                      x: s + u - p,
                      y: c + d,
                      textAnchor: x,
                      verticalAnchor: y,
                    },
                    P,
                  )
                : a === 'insideBottomLeft'
                  ? Be(
                      {
                        x: s + p,
                        y: c + l - d,
                        textAnchor: b,
                        verticalAnchor: h,
                      },
                      P,
                    )
                  : a === 'insideBottomRight'
                    ? Be(
                        {
                          x: s + u - p,
                          y: c + l - d,
                          textAnchor: x,
                          verticalAnchor: h,
                        },
                        P,
                      )
                    : ha(a) && (U(a.x) || bn(a.x)) && (U(a.y) || bn(a.y))
                      ? Be(
                          {
                            x: s + ot(a.x, u),
                            y: c + ot(a.y, l),
                            textAnchor: 'end',
                            verticalAnchor: 'end',
                          },
                          P,
                        )
                      : Be(
                          {
                            x: s + u / 2,
                            y: c + l / 2,
                            textAnchor: 'middle',
                            verticalAnchor: 'middle',
                          },
                          P,
                        )
  },
  R9 = function (t) {
    return 'cx' in t && U(t.cx)
  }
function ze(e) {
  var t = e.offset,
    r = t === void 0 ? 5 : t,
    n = $9(e, x9),
    i = Be({ offset: r }, n),
    a = i.viewBox,
    o = i.position,
    s = i.value,
    c = i.children,
    u = i.content,
    l = i.className,
    f = l === void 0 ? '' : l,
    d = i.textBreakAll
  if (!a || (se(s) && se(c) && !A.isValidElement(u) && !ie(u))) return null
  if (A.isValidElement(u)) return A.cloneElement(u, i)
  var h
  if (ie(u)) {
    if (((h = A.createElement(u, i)), A.isValidElement(h))) return h
  } else h = T9(i)
  var y = R9(a),
    v = J(i, !0)
  if (y && (o === 'insideStart' || o === 'insideEnd' || o === 'end'))
    return M9(i, h, v)
  var p = y ? N9(i) : I9(i)
  return E.createElement(
    Bn,
    Po({ className: ue('recharts-label', f) }, v, p, { breakAll: d }),
    h,
  )
}
ze.displayName = 'Label'
var BO = function (t) {
    var r = t.cx,
      n = t.cy,
      i = t.angle,
      a = t.startAngle,
      o = t.endAngle,
      s = t.r,
      c = t.radius,
      u = t.innerRadius,
      l = t.outerRadius,
      f = t.x,
      d = t.y,
      h = t.top,
      y = t.left,
      v = t.width,
      p = t.height,
      x = t.clockWise,
      b = t.labelViewBox
    if (b) return b
    if (U(v) && U(p)) {
      if (U(f) && U(d)) return { x: f, y: d, width: v, height: p }
      if (U(h) && U(y)) return { x: h, y, width: v, height: p }
    }
    return U(f) && U(d)
      ? { x: f, y: d, width: 0, height: 0 }
      : U(r) && U(n)
        ? {
            cx: r,
            cy: n,
            startAngle: a || i || 0,
            endAngle: o || i || 0,
            innerRadius: u || 0,
            outerRadius: l || c || s || 0,
            clockWise: x,
          }
        : t.viewBox
          ? t.viewBox
          : {}
  },
  D9 = function (t, r) {
    return t
      ? t === !0
        ? E.createElement(ze, { key: 'label-implicit', viewBox: r })
        : We(t)
          ? E.createElement(ze, { key: 'label-implicit', viewBox: r, value: t })
          : A.isValidElement(t)
            ? t.type === ze
              ? A.cloneElement(t, { key: 'label-implicit', viewBox: r })
              : E.createElement(ze, {
                  key: 'label-implicit',
                  content: t,
                  viewBox: r,
                })
            : ie(t)
              ? E.createElement(ze, {
                  key: 'label-implicit',
                  content: t,
                  viewBox: r,
                })
              : ha(t)
                ? E.createElement(
                    ze,
                    Po({ viewBox: r }, t, { key: 'label-implicit' }),
                  )
                : null
      : null
  },
  L9 = function (t, r) {
    var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0
    if (!t || (!t.children && n && !t.label)) return null
    var i = t.children,
      a = BO(t),
      o = wt(i, ze).map(function (c, u) {
        return A.cloneElement(c, { viewBox: r || a, key: 'label-'.concat(u) })
      })
    if (!n) return o
    var s = D9(t.label, r || a)
    return [s].concat(w9(o))
  }
ze.parseViewBox = BO
ze.renderCallByParent = L9
function B9(e) {
  var t = e == null ? 0 : e.length
  return t ? e[t - 1] : void 0
}
var F9 = B9
const U9 = me(F9)
function $o(e) {
  '@babel/helpers - typeof'
  return (
    ($o =
      typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
        ? function (t) {
            return typeof t
          }
        : function (t) {
            return t &&
              typeof Symbol == 'function' &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? 'symbol'
              : typeof t
          }),
    $o(e)
  )
}
var W9 = ['valueAccessor'],
  q9 = ['data', 'dataKey', 'clockWise', 'id', 'textBreakAll']
function H9(e) {
  return V9(e) || G9(e) || K9(e) || z9()
}
function z9() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}
function K9(e, t) {
  if (e) {
    if (typeof e == 'string') return od(e, t)
    var r = Object.prototype.toString.call(e).slice(8, -1)
    if (
      (r === 'Object' && e.constructor && (r = e.constructor.name),
      r === 'Map' || r === 'Set')
    )
      return Array.from(e)
    if (r === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
      return od(e, t)
  }
}
function G9(e) {
  if (
    (typeof Symbol < 'u' && e[Symbol.iterator] != null) ||
    e['@@iterator'] != null
  )
    return Array.from(e)
}
function V9(e) {
  if (Array.isArray(e)) return od(e)
}
function od(e, t) {
  ;(t == null || t > e.length) && (t = e.length)
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r]
  return n
}
function Ac() {
  return (
    (Ac = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t]
            for (var n in r)
              Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
          }
          return e
        }),
    Ac.apply(this, arguments)
  )
}
function ig(e, t) {
  var r = Object.keys(e)
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e)
    t &&
      (n = n.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable
      })),
      r.push.apply(r, n)
  }
  return r
}
function ag(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {}
    t % 2
      ? ig(Object(r), !0).forEach(function (n) {
          X9(e, n, r[n])
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
        : ig(Object(r)).forEach(function (n) {
            Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
          })
  }
  return e
}
function X9(e, t, r) {
  return (
    (t = Y9(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  )
}
function Y9(e) {
  var t = Q9(e, 'string')
  return $o(t) == 'symbol' ? t : t + ''
}
function Q9(e, t) {
  if ($o(e) != 'object' || !e) return e
  var r = e[Symbol.toPrimitive]
  if (r !== void 0) {
    var n = r.call(e, t || 'default')
    if ($o(n) != 'object') return n
    throw new TypeError('@@toPrimitive must return a primitive value.')
  }
  return (t === 'string' ? String : Number)(e)
}
function og(e, t) {
  if (e == null) return {}
  var r = Z9(e, t),
    n,
    i
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e)
    for (i = 0; i < a.length; i++)
      (n = a[i]),
        !(t.indexOf(n) >= 0) &&
          Object.prototype.propertyIsEnumerable.call(e, n) &&
          (r[n] = e[n])
  }
  return r
}
function Z9(e, t) {
  if (e == null) return {}
  var r = {}
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue
      r[n] = e[n]
    }
  return r
}
var J9 = function (t) {
  return Array.isArray(t.value) ? U9(t.value) : t.value
}
function Ar(e) {
  var t = e.valueAccessor,
    r = t === void 0 ? J9 : t,
    n = og(e, W9),
    i = n.data,
    a = n.dataKey,
    o = n.clockWise,
    s = n.id,
    c = n.textBreakAll,
    u = og(n, q9)
  return !i || !i.length
    ? null
    : E.createElement(
        pe,
        { className: 'recharts-label-list' },
        i.map(function (l, f) {
          var d = se(a) ? r(l, f) : Ue(l && l.payload, a),
            h = se(s) ? {} : { id: ''.concat(s, '-').concat(f) }
          return E.createElement(
            ze,
            Ac({}, J(l, !0), u, h, {
              parentViewBox: l.parentViewBox,
              value: d,
              textBreakAll: c,
              viewBox: ze.parseViewBox(
                se(o) ? l : ag(ag({}, l), {}, { clockWise: o }),
              ),
              key: 'label-'.concat(f),
              index: f,
            }),
          )
        }),
      )
}
Ar.displayName = 'LabelList'
function eU(e, t) {
  return e
    ? e === !0
      ? E.createElement(Ar, { key: 'labelList-implicit', data: t })
      : E.isValidElement(e) || ie(e)
        ? E.createElement(Ar, {
            key: 'labelList-implicit',
            data: t,
            content: e,
          })
        : ha(e)
          ? E.createElement(
              Ar,
              Ac({ data: t }, e, { key: 'labelList-implicit' }),
            )
          : null
    : null
}
function tU(e, t) {
  var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0
  if (!e || (!e.children && r && !e.label)) return null
  var n = e.children,
    i = wt(n, Ar).map(function (o, s) {
      return A.cloneElement(o, { data: t, key: 'labelList-'.concat(s) })
    })
  if (!r) return i
  var a = eU(e.label, t)
  return [a].concat(H9(i))
}
Ar.renderCallByParent = tU
function Eo(e) {
  '@babel/helpers - typeof'
  return (
    (Eo =
      typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
        ? function (t) {
            return typeof t
          }
        : function (t) {
            return t &&
              typeof Symbol == 'function' &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? 'symbol'
              : typeof t
          }),
    Eo(e)
  )
}
function sd() {
  return (
    (sd = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t]
            for (var n in r)
              Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
          }
          return e
        }),
    sd.apply(this, arguments)
  )
}
function sg(e, t) {
  var r = Object.keys(e)
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e)
    t &&
      (n = n.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable
      })),
      r.push.apply(r, n)
  }
  return r
}
function cg(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {}
    t % 2
      ? sg(Object(r), !0).forEach(function (n) {
          rU(e, n, r[n])
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
        : sg(Object(r)).forEach(function (n) {
            Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
          })
  }
  return e
}
function rU(e, t, r) {
  return (
    (t = nU(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  )
}
function nU(e) {
  var t = iU(e, 'string')
  return Eo(t) == 'symbol' ? t : t + ''
}
function iU(e, t) {
  if (Eo(e) != 'object' || !e) return e
  var r = e[Symbol.toPrimitive]
  if (r !== void 0) {
    var n = r.call(e, t || 'default')
    if (Eo(n) != 'object') return n
    throw new TypeError('@@toPrimitive must return a primitive value.')
  }
  return (t === 'string' ? String : Number)(e)
}
var aU = function (t, r) {
    var n = at(r - t),
      i = Math.min(Math.abs(r - t), 359.999)
    return n * i
  },
  $s = function (t) {
    var r = t.cx,
      n = t.cy,
      i = t.radius,
      a = t.angle,
      o = t.sign,
      s = t.isExternal,
      c = t.cornerRadius,
      u = t.cornerIsExternal,
      l = c * (s ? 1 : -1) + i,
      f = Math.asin(c / l) / Sc,
      d = u ? a : a + o * f,
      h = Pe(r, n, l, d),
      y = Pe(r, n, i, d),
      v = u ? a - o * f : a,
      p = Pe(r, n, l * Math.cos(f * Sc), v)
    return { center: h, circleTangency: y, lineTangency: p, theta: f }
  },
  FO = function (t) {
    var r = t.cx,
      n = t.cy,
      i = t.innerRadius,
      a = t.outerRadius,
      o = t.startAngle,
      s = t.endAngle,
      c = aU(o, s),
      u = o + c,
      l = Pe(r, n, a, o),
      f = Pe(r, n, a, u),
      d = 'M '
        .concat(l.x, ',')
        .concat(
          l.y,
          `
    A `,
        )
        .concat(a, ',')
        .concat(
          a,
          `,0,
    `,
        )
        .concat(+(Math.abs(c) > 180), ',')
        .concat(
          +(o > u),
          `,
    `,
        )
        .concat(f.x, ',')
        .concat(
          f.y,
          `
  `,
        )
    if (i > 0) {
      var h = Pe(r, n, i, o),
        y = Pe(r, n, i, u)
      d += 'L '
        .concat(y.x, ',')
        .concat(
          y.y,
          `
            A `,
        )
        .concat(i, ',')
        .concat(
          i,
          `,0,
            `,
        )
        .concat(+(Math.abs(c) > 180), ',')
        .concat(
          +(o <= u),
          `,
            `,
        )
        .concat(h.x, ',')
        .concat(h.y, ' Z')
    } else d += 'L '.concat(r, ',').concat(n, ' Z')
    return d
  },
  oU = function (t) {
    var r = t.cx,
      n = t.cy,
      i = t.innerRadius,
      a = t.outerRadius,
      o = t.cornerRadius,
      s = t.forceCornerRadius,
      c = t.cornerIsExternal,
      u = t.startAngle,
      l = t.endAngle,
      f = at(l - u),
      d = $s({
        cx: r,
        cy: n,
        radius: a,
        angle: u,
        sign: f,
        cornerRadius: o,
        cornerIsExternal: c,
      }),
      h = d.circleTangency,
      y = d.lineTangency,
      v = d.theta,
      p = $s({
        cx: r,
        cy: n,
        radius: a,
        angle: l,
        sign: -f,
        cornerRadius: o,
        cornerIsExternal: c,
      }),
      x = p.circleTangency,
      b = p.lineTangency,
      w = p.theta,
      g = c ? Math.abs(u - l) : Math.abs(u - l) - v - w
    if (g < 0)
      return s
        ? 'M '
            .concat(y.x, ',')
            .concat(
              y.y,
              `
        a`,
            )
            .concat(o, ',')
            .concat(o, ',0,0,1,')
            .concat(
              o * 2,
              `,0
        a`,
            )
            .concat(o, ',')
            .concat(o, ',0,0,1,')
            .concat(
              -o * 2,
              `,0
      `,
            )
        : FO({
            cx: r,
            cy: n,
            innerRadius: i,
            outerRadius: a,
            startAngle: u,
            endAngle: l,
          })
    var m = 'M '
      .concat(y.x, ',')
      .concat(
        y.y,
        `
    A`,
      )
      .concat(o, ',')
      .concat(o, ',0,0,')
      .concat(+(f < 0), ',')
      .concat(h.x, ',')
      .concat(
        h.y,
        `
    A`,
      )
      .concat(a, ',')
      .concat(a, ',0,')
      .concat(+(g > 180), ',')
      .concat(+(f < 0), ',')
      .concat(x.x, ',')
      .concat(
        x.y,
        `
    A`,
      )
      .concat(o, ',')
      .concat(o, ',0,0,')
      .concat(+(f < 0), ',')
      .concat(b.x, ',')
      .concat(
        b.y,
        `
  `,
      )
    if (i > 0) {
      var S = $s({
          cx: r,
          cy: n,
          radius: i,
          angle: u,
          sign: f,
          isExternal: !0,
          cornerRadius: o,
          cornerIsExternal: c,
        }),
        P = S.circleTangency,
        $ = S.lineTangency,
        T = S.theta,
        k = $s({
          cx: r,
          cy: n,
          radius: i,
          angle: l,
          sign: -f,
          isExternal: !0,
          cornerRadius: o,
          cornerIsExternal: c,
        }),
        C = k.circleTangency,
        j = k.lineTangency,
        M = k.theta,
        N = c ? Math.abs(u - l) : Math.abs(u - l) - T - M
      if (N < 0 && o === 0)
        return ''.concat(m, 'L').concat(r, ',').concat(n, 'Z')
      m += 'L'
        .concat(j.x, ',')
        .concat(
          j.y,
          `
      A`,
        )
        .concat(o, ',')
        .concat(o, ',0,0,')
        .concat(+(f < 0), ',')
        .concat(C.x, ',')
        .concat(
          C.y,
          `
      A`,
        )
        .concat(i, ',')
        .concat(i, ',0,')
        .concat(+(N > 180), ',')
        .concat(+(f > 0), ',')
        .concat(P.x, ',')
        .concat(
          P.y,
          `
      A`,
        )
        .concat(o, ',')
        .concat(o, ',0,0,')
        .concat(+(f < 0), ',')
        .concat($.x, ',')
        .concat($.y, 'Z')
    } else m += 'L'.concat(r, ',').concat(n, 'Z')
    return m
  },
  sU = {
    cx: 0,
    cy: 0,
    innerRadius: 0,
    outerRadius: 0,
    startAngle: 0,
    endAngle: 0,
    cornerRadius: 0,
    forceCornerRadius: !1,
    cornerIsExternal: !1,
  },
  UO = function (t) {
    var r = cg(cg({}, sU), t),
      n = r.cx,
      i = r.cy,
      a = r.innerRadius,
      o = r.outerRadius,
      s = r.cornerRadius,
      c = r.forceCornerRadius,
      u = r.cornerIsExternal,
      l = r.startAngle,
      f = r.endAngle,
      d = r.className
    if (o < a || l === f) return null
    var h = ue('recharts-sector', d),
      y = o - a,
      v = ot(s, y, 0, !0),
      p
    return (
      v > 0 && Math.abs(l - f) < 360
        ? (p = oU({
            cx: n,
            cy: i,
            innerRadius: a,
            outerRadius: o,
            cornerRadius: Math.min(v, y / 2),
            forceCornerRadius: c,
            cornerIsExternal: u,
            startAngle: l,
            endAngle: f,
          }))
        : (p = FO({
            cx: n,
            cy: i,
            innerRadius: a,
            outerRadius: o,
            startAngle: l,
            endAngle: f,
          })),
      E.createElement(
        'path',
        sd({}, J(r, !0), { className: h, d: p, role: 'img' }),
      )
    )
  }
function _o(e) {
  '@babel/helpers - typeof'
  return (
    (_o =
      typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
        ? function (t) {
            return typeof t
          }
        : function (t) {
            return t &&
              typeof Symbol == 'function' &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? 'symbol'
              : typeof t
          }),
    _o(e)
  )
}
function cd() {
  return (
    (cd = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t]
            for (var n in r)
              Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
          }
          return e
        }),
    cd.apply(this, arguments)
  )
}
function ug(e, t) {
  var r = Object.keys(e)
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e)
    t &&
      (n = n.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable
      })),
      r.push.apply(r, n)
  }
  return r
}
function lg(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {}
    t % 2
      ? ug(Object(r), !0).forEach(function (n) {
          cU(e, n, r[n])
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
        : ug(Object(r)).forEach(function (n) {
            Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
          })
  }
  return e
}
function cU(e, t, r) {
  return (
    (t = uU(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  )
}
function uU(e) {
  var t = lU(e, 'string')
  return _o(t) == 'symbol' ? t : t + ''
}
function lU(e, t) {
  if (_o(e) != 'object' || !e) return e
  var r = e[Symbol.toPrimitive]
  if (r !== void 0) {
    var n = r.call(e, t || 'default')
    if (_o(n) != 'object') return n
    throw new TypeError('@@toPrimitive must return a primitive value.')
  }
  return (t === 'string' ? String : Number)(e)
}
var fg = {
    curveBasisClosed: sM,
    curveBasisOpen: cM,
    curveBasis: oM,
    curveBumpX: Kk,
    curveBumpY: Gk,
    curveLinearClosed: uM,
    curveLinear: Pu,
    curveMonotoneX: lM,
    curveMonotoneY: fM,
    curveNatural: dM,
    curveStep: hM,
    curveStepAfter: vM,
    curveStepBefore: pM,
  },
  Es = function (t) {
    return t.x === +t.x && t.y === +t.y
  },
  Ra = function (t) {
    return t.x
  },
  Da = function (t) {
    return t.y
  },
  fU = function (t, r) {
    if (ie(t)) return t
    var n = 'curve'.concat(Su(t))
    return (n === 'curveMonotone' || n === 'curveBump') && r
      ? fg[''.concat(n).concat(r === 'vertical' ? 'Y' : 'X')]
      : fg[n] || Pu
  },
  dU = function (t) {
    var r = t.type,
      n = r === void 0 ? 'linear' : r,
      i = t.points,
      a = i === void 0 ? [] : i,
      o = t.baseLine,
      s = t.layout,
      c = t.connectNulls,
      u = c === void 0 ? !1 : c,
      l = fU(n, s),
      f = u
        ? a.filter(function (v) {
            return Es(v)
          })
        : a,
      d
    if (Array.isArray(o)) {
      var h = u
          ? o.filter(function (v) {
              return Es(v)
            })
          : o,
        y = f.map(function (v, p) {
          return lg(lg({}, v), {}, { base: h[p] })
        })
      return (
        s === 'vertical'
          ? (d = ms()
              .y(Da)
              .x1(Ra)
              .x0(function (v) {
                return v.base.x
              }))
          : (d = ms()
              .x(Ra)
              .y1(Da)
              .y0(function (v) {
                return v.base.y
              })),
        d.defined(Es).curve(l),
        d(y)
      )
    }
    return (
      s === 'vertical' && U(o)
        ? (d = ms().y(Da).x1(Ra).x0(o))
        : U(o)
          ? (d = ms().x(Ra).y1(Da).y0(o))
          : (d = I1().x(Ra).y(Da)),
      d.defined(Es).curve(l),
      d(f)
    )
  },
  Pc = function (t) {
    var r = t.className,
      n = t.points,
      i = t.path,
      a = t.pathRef
    if ((!n || !n.length) && !i) return null
    var o = n && n.length ? dU(t) : i
    return E.createElement(
      'path',
      cd({}, J(t, !1), Xs(t), {
        className: ue('recharts-curve', r),
        d: o,
        ref: a,
      }),
    )
  },
  hU = Object.getOwnPropertyNames,
  pU = Object.getOwnPropertySymbols,
  vU = Object.prototype.hasOwnProperty
function dg(e, t) {
  return function (n, i, a) {
    return e(n, i, a) && t(n, i, a)
  }
}
function _s(e) {
  return function (r, n, i) {
    if (!r || !n || typeof r != 'object' || typeof n != 'object')
      return e(r, n, i)
    var a = i.cache,
      o = a.get(r),
      s = a.get(n)
    if (o && s) return o === n && s === r
    a.set(r, n), a.set(n, r)
    var c = e(r, n, i)
    return a.delete(r), a.delete(n), c
  }
}
function hg(e) {
  return hU(e).concat(pU(e))
}
var WO =
  Object.hasOwn ||
  function (e, t) {
    return vU.call(e, t)
  }
function Aa(e, t) {
  return e || t ? e === t : e === t || (e !== e && t !== t)
}
var qO = '_owner',
  pg = Object.getOwnPropertyDescriptor,
  vg = Object.keys
function yU(e, t, r) {
  var n = e.length
  if (t.length !== n) return !1
  for (; n-- > 0; ) if (!r.equals(e[n], t[n], n, n, e, t, r)) return !1
  return !0
}
function mU(e, t) {
  return Aa(e.getTime(), t.getTime())
}
function yg(e, t, r) {
  if (e.size !== t.size) return !1
  for (var n = {}, i = e.entries(), a = 0, o, s; (o = i.next()) && !o.done; ) {
    for (var c = t.entries(), u = !1, l = 0; (s = c.next()) && !s.done; ) {
      var f = o.value,
        d = f[0],
        h = f[1],
        y = s.value,
        v = y[0],
        p = y[1]
      !u &&
        !n[l] &&
        (u = r.equals(d, v, a, l, e, t, r) && r.equals(h, p, d, v, e, t, r)) &&
        (n[l] = !0),
        l++
    }
    if (!u) return !1
    a++
  }
  return !0
}
function gU(e, t, r) {
  var n = vg(e),
    i = n.length
  if (vg(t).length !== i) return !1
  for (var a; i-- > 0; )
    if (
      ((a = n[i]),
      (a === qO && (e.$$typeof || t.$$typeof) && e.$$typeof !== t.$$typeof) ||
        !WO(t, a) ||
        !r.equals(e[a], t[a], a, a, e, t, r))
    )
      return !1
  return !0
}
function La(e, t, r) {
  var n = hg(e),
    i = n.length
  if (hg(t).length !== i) return !1
  for (var a, o, s; i-- > 0; )
    if (
      ((a = n[i]),
      (a === qO && (e.$$typeof || t.$$typeof) && e.$$typeof !== t.$$typeof) ||
        !WO(t, a) ||
        !r.equals(e[a], t[a], a, a, e, t, r) ||
        ((o = pg(e, a)),
        (s = pg(t, a)),
        (o || s) &&
          (!o ||
            !s ||
            o.configurable !== s.configurable ||
            o.enumerable !== s.enumerable ||
            o.writable !== s.writable)))
    )
      return !1
  return !0
}
function bU(e, t) {
  return Aa(e.valueOf(), t.valueOf())
}
function xU(e, t) {
  return e.source === t.source && e.flags === t.flags
}
function mg(e, t, r) {
  if (e.size !== t.size) return !1
  for (var n = {}, i = e.values(), a, o; (a = i.next()) && !a.done; ) {
    for (var s = t.values(), c = !1, u = 0; (o = s.next()) && !o.done; )
      !c &&
        !n[u] &&
        (c = r.equals(a.value, o.value, a.value, o.value, e, t, r)) &&
        (n[u] = !0),
        u++
    if (!c) return !1
  }
  return !0
}
function wU(e, t) {
  var r = e.length
  if (t.length !== r) return !1
  for (; r-- > 0; ) if (e[r] !== t[r]) return !1
  return !0
}
var OU = '[object Arguments]',
  SU = '[object Boolean]',
  AU = '[object Date]',
  PU = '[object Map]',
  $U = '[object Number]',
  EU = '[object Object]',
  _U = '[object RegExp]',
  CU = '[object Set]',
  jU = '[object String]',
  TU = Array.isArray,
  gg =
    typeof ArrayBuffer == 'function' && ArrayBuffer.isView
      ? ArrayBuffer.isView
      : null,
  bg = Object.assign,
  kU = Object.prototype.toString.call.bind(Object.prototype.toString)
function MU(e) {
  var t = e.areArraysEqual,
    r = e.areDatesEqual,
    n = e.areMapsEqual,
    i = e.areObjectsEqual,
    a = e.arePrimitiveWrappersEqual,
    o = e.areRegExpsEqual,
    s = e.areSetsEqual,
    c = e.areTypedArraysEqual
  return function (l, f, d) {
    if (l === f) return !0
    if (l == null || f == null || typeof l != 'object' || typeof f != 'object')
      return l !== l && f !== f
    var h = l.constructor
    if (h !== f.constructor) return !1
    if (h === Object) return i(l, f, d)
    if (TU(l)) return t(l, f, d)
    if (gg != null && gg(l)) return c(l, f, d)
    if (h === Date) return r(l, f, d)
    if (h === RegExp) return o(l, f, d)
    if (h === Map) return n(l, f, d)
    if (h === Set) return s(l, f, d)
    var y = kU(l)
    return y === AU
      ? r(l, f, d)
      : y === _U
        ? o(l, f, d)
        : y === PU
          ? n(l, f, d)
          : y === CU
            ? s(l, f, d)
            : y === EU
              ? typeof l.then != 'function' &&
                typeof f.then != 'function' &&
                i(l, f, d)
              : y === OU
                ? i(l, f, d)
                : y === SU || y === $U || y === jU
                  ? a(l, f, d)
                  : !1
  }
}
function NU(e) {
  var t = e.circular,
    r = e.createCustomConfig,
    n = e.strict,
    i = {
      areArraysEqual: n ? La : yU,
      areDatesEqual: mU,
      areMapsEqual: n ? dg(yg, La) : yg,
      areObjectsEqual: n ? La : gU,
      arePrimitiveWrappersEqual: bU,
      areRegExpsEqual: xU,
      areSetsEqual: n ? dg(mg, La) : mg,
      areTypedArraysEqual: n ? La : wU,
    }
  if ((r && (i = bg({}, i, r(i))), t)) {
    var a = _s(i.areArraysEqual),
      o = _s(i.areMapsEqual),
      s = _s(i.areObjectsEqual),
      c = _s(i.areSetsEqual)
    i = bg({}, i, {
      areArraysEqual: a,
      areMapsEqual: o,
      areObjectsEqual: s,
      areSetsEqual: c,
    })
  }
  return i
}
function IU(e) {
  return function (t, r, n, i, a, o, s) {
    return e(t, r, s)
  }
}
function RU(e) {
  var t = e.circular,
    r = e.comparator,
    n = e.createState,
    i = e.equals,
    a = e.strict
  if (n)
    return function (c, u) {
      var l = n(),
        f = l.cache,
        d = f === void 0 ? (t ? new WeakMap() : void 0) : f,
        h = l.meta
      return r(c, u, { cache: d, equals: i, meta: h, strict: a })
    }
  if (t)
    return function (c, u) {
      return r(c, u, {
        cache: new WeakMap(),
        equals: i,
        meta: void 0,
        strict: a,
      })
    }
  var o = { cache: void 0, equals: i, meta: void 0, strict: a }
  return function (c, u) {
    return r(c, u, o)
  }
}
var DU = ln()
ln({ strict: !0 })
ln({ circular: !0 })
ln({ circular: !0, strict: !0 })
ln({
  createInternalComparator: function () {
    return Aa
  },
})
ln({
  strict: !0,
  createInternalComparator: function () {
    return Aa
  },
})
ln({
  circular: !0,
  createInternalComparator: function () {
    return Aa
  },
})
ln({
  circular: !0,
  createInternalComparator: function () {
    return Aa
  },
  strict: !0,
})
function ln(e) {
  e === void 0 && (e = {})
  var t = e.circular,
    r = t === void 0 ? !1 : t,
    n = e.createInternalComparator,
    i = e.createState,
    a = e.strict,
    o = a === void 0 ? !1 : a,
    s = NU(e),
    c = MU(s),
    u = n ? n(c) : IU(c)
  return RU({
    circular: r,
    comparator: c,
    createState: i,
    equals: u,
    strict: o,
  })
}
function LU(e) {
  typeof requestAnimationFrame < 'u' && requestAnimationFrame(e)
}
function xg(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0,
    r = -1,
    n = function i(a) {
      r < 0 && (r = a), a - r > t ? (e(a), (r = -1)) : LU(i)
    }
  requestAnimationFrame(n)
}
function ud(e) {
  '@babel/helpers - typeof'
  return (
    (ud =
      typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
        ? function (t) {
            return typeof t
          }
        : function (t) {
            return t &&
              typeof Symbol == 'function' &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? 'symbol'
              : typeof t
          }),
    ud(e)
  )
}
function BU(e) {
  return qU(e) || WU(e) || UU(e) || FU()
}
function FU() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}
function UU(e, t) {
  if (e) {
    if (typeof e == 'string') return wg(e, t)
    var r = Object.prototype.toString.call(e).slice(8, -1)
    if (
      (r === 'Object' && e.constructor && (r = e.constructor.name),
      r === 'Map' || r === 'Set')
    )
      return Array.from(e)
    if (r === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
      return wg(e, t)
  }
}
function wg(e, t) {
  ;(t == null || t > e.length) && (t = e.length)
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r]
  return n
}
function WU(e) {
  if (
    (typeof Symbol < 'u' && e[Symbol.iterator] != null) ||
    e['@@iterator'] != null
  )
    return Array.from(e)
}
function qU(e) {
  if (Array.isArray(e)) return e
}
function HU() {
  var e = {},
    t = function () {
      return null
    },
    r = !1,
    n = function i(a) {
      if (!r) {
        if (Array.isArray(a)) {
          if (!a.length) return
          var o = a,
            s = BU(o),
            c = s[0],
            u = s.slice(1)
          if (typeof c == 'number') {
            xg(i.bind(null, u), c)
            return
          }
          i(c), xg(i.bind(null, u))
          return
        }
        ud(a) === 'object' && ((e = a), t(e)), typeof a == 'function' && a()
      }
    }
  return {
    stop: function () {
      r = !0
    },
    start: function (a) {
      ;(r = !1), n(a)
    },
    subscribe: function (a) {
      return (
        (t = a),
        function () {
          t = function () {
            return null
          }
        }
      )
    },
  }
}
function Co(e) {
  '@babel/helpers - typeof'
  return (
    (Co =
      typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
        ? function (t) {
            return typeof t
          }
        : function (t) {
            return t &&
              typeof Symbol == 'function' &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? 'symbol'
              : typeof t
          }),
    Co(e)
  )
}
function Og(e, t) {
  var r = Object.keys(e)
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e)
    t &&
      (n = n.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable
      })),
      r.push.apply(r, n)
  }
  return r
}
function Sg(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {}
    t % 2
      ? Og(Object(r), !0).forEach(function (n) {
          HO(e, n, r[n])
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
        : Og(Object(r)).forEach(function (n) {
            Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
          })
  }
  return e
}
function HO(e, t, r) {
  return (
    (t = zU(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  )
}
function zU(e) {
  var t = KU(e, 'string')
  return Co(t) === 'symbol' ? t : String(t)
}
function KU(e, t) {
  if (Co(e) !== 'object' || e === null) return e
  var r = e[Symbol.toPrimitive]
  if (r !== void 0) {
    var n = r.call(e, t || 'default')
    if (Co(n) !== 'object') return n
    throw new TypeError('@@toPrimitive must return a primitive value.')
  }
  return (t === 'string' ? String : Number)(e)
}
var GU = function (t, r) {
    return [Object.keys(t), Object.keys(r)].reduce(function (n, i) {
      return n.filter(function (a) {
        return i.includes(a)
      })
    })
  },
  VU = function (t) {
    return t
  },
  XU = function (t) {
    return t.replace(/([A-Z])/g, function (r) {
      return '-'.concat(r.toLowerCase())
    })
  },
  Qa = function (t, r) {
    return Object.keys(r).reduce(function (n, i) {
      return Sg(Sg({}, n), {}, HO({}, i, t(i, r[i])))
    }, {})
  },
  Ag = function (t, r, n) {
    return t
      .map(function (i) {
        return ''.concat(XU(i), ' ').concat(r, 'ms ').concat(n)
      })
      .join(',')
  }
function YU(e, t) {
  return JU(e) || ZU(e, t) || zO(e, t) || QU()
}
function QU() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}
function ZU(e, t) {
  var r =
    e == null
      ? null
      : (typeof Symbol < 'u' && e[Symbol.iterator]) || e['@@iterator']
  if (r != null) {
    var n,
      i,
      a,
      o,
      s = [],
      c = !0,
      u = !1
    try {
      if (((a = (r = r.call(e)).next), t !== 0))
        for (
          ;
          !(c = (n = a.call(r)).done) && (s.push(n.value), s.length !== t);
          c = !0
        );
    } catch (l) {
      ;(u = !0), (i = l)
    } finally {
      try {
        if (!c && r.return != null && ((o = r.return()), Object(o) !== o))
          return
      } finally {
        if (u) throw i
      }
    }
    return s
  }
}
function JU(e) {
  if (Array.isArray(e)) return e
}
function eW(e) {
  return nW(e) || rW(e) || zO(e) || tW()
}
function tW() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}
function zO(e, t) {
  if (e) {
    if (typeof e == 'string') return ld(e, t)
    var r = Object.prototype.toString.call(e).slice(8, -1)
    if (
      (r === 'Object' && e.constructor && (r = e.constructor.name),
      r === 'Map' || r === 'Set')
    )
      return Array.from(e)
    if (r === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
      return ld(e, t)
  }
}
function rW(e) {
  if (
    (typeof Symbol < 'u' && e[Symbol.iterator] != null) ||
    e['@@iterator'] != null
  )
    return Array.from(e)
}
function nW(e) {
  if (Array.isArray(e)) return ld(e)
}
function ld(e, t) {
  ;(t == null || t > e.length) && (t = e.length)
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r]
  return n
}
var $c = 1e-4,
  KO = function (t, r) {
    return [0, 3 * t, 3 * r - 6 * t, 3 * t - 3 * r + 1]
  },
  GO = function (t, r) {
    return t
      .map(function (n, i) {
        return n * Math.pow(r, i)
      })
      .reduce(function (n, i) {
        return n + i
      })
  },
  Pg = function (t, r) {
    return function (n) {
      var i = KO(t, r)
      return GO(i, n)
    }
  },
  iW = function (t, r) {
    return function (n) {
      var i = KO(t, r),
        a = [].concat(
          eW(
            i
              .map(function (o, s) {
                return o * s
              })
              .slice(1),
          ),
          [0],
        )
      return GO(a, n)
    }
  },
  $g = function () {
    for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++)
      r[n] = arguments[n]
    var i = r[0],
      a = r[1],
      o = r[2],
      s = r[3]
    if (r.length === 1)
      switch (r[0]) {
        case 'linear':
          ;(i = 0), (a = 0), (o = 1), (s = 1)
          break
        case 'ease':
          ;(i = 0.25), (a = 0.1), (o = 0.25), (s = 1)
          break
        case 'ease-in':
          ;(i = 0.42), (a = 0), (o = 1), (s = 1)
          break
        case 'ease-out':
          ;(i = 0.42), (a = 0), (o = 0.58), (s = 1)
          break
        case 'ease-in-out':
          ;(i = 0), (a = 0), (o = 0.58), (s = 1)
          break
        default: {
          var c = r[0].split('(')
          if (
            c[0] === 'cubic-bezier' &&
            c[1].split(')')[0].split(',').length === 4
          ) {
            var u = c[1]
                .split(')')[0]
                .split(',')
                .map(function (p) {
                  return parseFloat(p)
                }),
              l = YU(u, 4)
            ;(i = l[0]), (a = l[1]), (o = l[2]), (s = l[3])
          }
        }
      }
    var f = Pg(i, o),
      d = Pg(a, s),
      h = iW(i, o),
      y = function (x) {
        return x > 1 ? 1 : x < 0 ? 0 : x
      },
      v = function (x) {
        for (var b = x > 1 ? 1 : x, w = b, g = 0; g < 8; ++g) {
          var m = f(w) - b,
            S = h(w)
          if (Math.abs(m - b) < $c || S < $c) return d(w)
          w = y(w - m / S)
        }
        return d(w)
      }
    return (v.isStepper = !1), v
  },
  aW = function () {
    var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {},
      r = t.stiff,
      n = r === void 0 ? 100 : r,
      i = t.damping,
      a = i === void 0 ? 8 : i,
      o = t.dt,
      s = o === void 0 ? 17 : o,
      c = function (l, f, d) {
        var h = -(l - f) * n,
          y = d * a,
          v = d + ((h - y) * s) / 1e3,
          p = (d * s) / 1e3 + l
        return Math.abs(p - f) < $c && Math.abs(v) < $c ? [f, 0] : [p, v]
      }
    return (c.isStepper = !0), (c.dt = s), c
  },
  oW = function () {
    for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++)
      r[n] = arguments[n]
    var i = r[0]
    if (typeof i == 'string')
      switch (i) {
        case 'ease':
        case 'ease-in-out':
        case 'ease-out':
        case 'ease-in':
        case 'linear':
          return $g(i)
        case 'spring':
          return aW()
        default:
          if (i.split('(')[0] === 'cubic-bezier') return $g(i)
      }
    return typeof i == 'function' ? i : null
  }
function jo(e) {
  '@babel/helpers - typeof'
  return (
    (jo =
      typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
        ? function (t) {
            return typeof t
          }
        : function (t) {
            return t &&
              typeof Symbol == 'function' &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? 'symbol'
              : typeof t
          }),
    jo(e)
  )
}
function Eg(e) {
  return uW(e) || cW(e) || VO(e) || sW()
}
function sW() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}
function cW(e) {
  if (
    (typeof Symbol < 'u' && e[Symbol.iterator] != null) ||
    e['@@iterator'] != null
  )
    return Array.from(e)
}
function uW(e) {
  if (Array.isArray(e)) return dd(e)
}
function _g(e, t) {
  var r = Object.keys(e)
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e)
    t &&
      (n = n.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable
      })),
      r.push.apply(r, n)
  }
  return r
}
function Ve(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {}
    t % 2
      ? _g(Object(r), !0).forEach(function (n) {
          fd(e, n, r[n])
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
        : _g(Object(r)).forEach(function (n) {
            Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
          })
  }
  return e
}
function fd(e, t, r) {
  return (
    (t = lW(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  )
}
function lW(e) {
  var t = fW(e, 'string')
  return jo(t) === 'symbol' ? t : String(t)
}
function fW(e, t) {
  if (jo(e) !== 'object' || e === null) return e
  var r = e[Symbol.toPrimitive]
  if (r !== void 0) {
    var n = r.call(e, t || 'default')
    if (jo(n) !== 'object') return n
    throw new TypeError('@@toPrimitive must return a primitive value.')
  }
  return (t === 'string' ? String : Number)(e)
}
function dW(e, t) {
  return vW(e) || pW(e, t) || VO(e, t) || hW()
}
function hW() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}
function VO(e, t) {
  if (e) {
    if (typeof e == 'string') return dd(e, t)
    var r = Object.prototype.toString.call(e).slice(8, -1)
    if (
      (r === 'Object' && e.constructor && (r = e.constructor.name),
      r === 'Map' || r === 'Set')
    )
      return Array.from(e)
    if (r === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
      return dd(e, t)
  }
}
function dd(e, t) {
  ;(t == null || t > e.length) && (t = e.length)
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r]
  return n
}
function pW(e, t) {
  var r =
    e == null
      ? null
      : (typeof Symbol < 'u' && e[Symbol.iterator]) || e['@@iterator']
  if (r != null) {
    var n,
      i,
      a,
      o,
      s = [],
      c = !0,
      u = !1
    try {
      if (((a = (r = r.call(e)).next), t !== 0))
        for (
          ;
          !(c = (n = a.call(r)).done) && (s.push(n.value), s.length !== t);
          c = !0
        );
    } catch (l) {
      ;(u = !0), (i = l)
    } finally {
      try {
        if (!c && r.return != null && ((o = r.return()), Object(o) !== o))
          return
      } finally {
        if (u) throw i
      }
    }
    return s
  }
}
function vW(e) {
  if (Array.isArray(e)) return e
}
var Ec = function (t, r, n) {
    return t + (r - t) * n
  },
  hd = function (t) {
    var r = t.from,
      n = t.to
    return r !== n
  },
  yW = function e(t, r, n) {
    var i = Qa(function (a, o) {
      if (hd(o)) {
        var s = t(o.from, o.to, o.velocity),
          c = dW(s, 2),
          u = c[0],
          l = c[1]
        return Ve(Ve({}, o), {}, { from: u, velocity: l })
      }
      return o
    }, r)
    return n < 1
      ? Qa(function (a, o) {
          return hd(o)
            ? Ve(
                Ve({}, o),
                {},
                {
                  velocity: Ec(o.velocity, i[a].velocity, n),
                  from: Ec(o.from, i[a].from, n),
                },
              )
            : o
        }, r)
      : e(t, i, n - 1)
  }
const mW = function (e, t, r, n, i) {
  var a = GU(e, t),
    o = a.reduce(function (p, x) {
      return Ve(Ve({}, p), {}, fd({}, x, [e[x], t[x]]))
    }, {}),
    s = a.reduce(function (p, x) {
      return Ve(Ve({}, p), {}, fd({}, x, { from: e[x], velocity: 0, to: t[x] }))
    }, {}),
    c = -1,
    u,
    l,
    f = function () {
      return null
    },
    d = function () {
      return Qa(function (x, b) {
        return b.from
      }, s)
    },
    h = function () {
      return !Object.values(s).filter(hd).length
    },
    y = function (x) {
      u || (u = x)
      var b = x - u,
        w = b / r.dt
      ;(s = yW(r, s, w)),
        i(Ve(Ve(Ve({}, e), t), d())),
        (u = x),
        h() || (c = requestAnimationFrame(f))
    },
    v = function (x) {
      l || (l = x)
      var b = (x - l) / n,
        w = Qa(function (m, S) {
          return Ec.apply(void 0, Eg(S).concat([r(b)]))
        }, o)
      if ((i(Ve(Ve(Ve({}, e), t), w)), b < 1)) c = requestAnimationFrame(f)
      else {
        var g = Qa(function (m, S) {
          return Ec.apply(void 0, Eg(S).concat([r(1)]))
        }, o)
        i(Ve(Ve(Ve({}, e), t), g))
      }
    }
  return (
    (f = r.isStepper ? y : v),
    function () {
      return (
        requestAnimationFrame(f),
        function () {
          cancelAnimationFrame(c)
        }
      )
    }
  )
}
function Hi(e) {
  '@babel/helpers - typeof'
  return (
    (Hi =
      typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
        ? function (t) {
            return typeof t
          }
        : function (t) {
            return t &&
              typeof Symbol == 'function' &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? 'symbol'
              : typeof t
          }),
    Hi(e)
  )
}
var gW = [
  'children',
  'begin',
  'duration',
  'attributeName',
  'easing',
  'isActive',
  'steps',
  'from',
  'to',
  'canBegin',
  'onAnimationEnd',
  'shouldReAnimate',
  'onAnimationReStart',
]
function bW(e, t) {
  if (e == null) return {}
  var r = xW(e, t),
    n,
    i
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e)
    for (i = 0; i < a.length; i++)
      (n = a[i]),
        !(t.indexOf(n) >= 0) &&
          Object.prototype.propertyIsEnumerable.call(e, n) &&
          (r[n] = e[n])
  }
  return r
}
function xW(e, t) {
  if (e == null) return {}
  var r = {},
    n = Object.keys(e),
    i,
    a
  for (a = 0; a < n.length; a++)
    (i = n[a]), !(t.indexOf(i) >= 0) && (r[i] = e[i])
  return r
}
function Ml(e) {
  return AW(e) || SW(e) || OW(e) || wW()
}
function wW() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}
function OW(e, t) {
  if (e) {
    if (typeof e == 'string') return pd(e, t)
    var r = Object.prototype.toString.call(e).slice(8, -1)
    if (
      (r === 'Object' && e.constructor && (r = e.constructor.name),
      r === 'Map' || r === 'Set')
    )
      return Array.from(e)
    if (r === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
      return pd(e, t)
  }
}
function SW(e) {
  if (
    (typeof Symbol < 'u' && e[Symbol.iterator] != null) ||
    e['@@iterator'] != null
  )
    return Array.from(e)
}
function AW(e) {
  if (Array.isArray(e)) return pd(e)
}
function pd(e, t) {
  ;(t == null || t > e.length) && (t = e.length)
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r]
  return n
}
function Cg(e, t) {
  var r = Object.keys(e)
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e)
    t &&
      (n = n.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable
      })),
      r.push.apply(r, n)
  }
  return r
}
function Bt(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {}
    t % 2
      ? Cg(Object(r), !0).forEach(function (n) {
          Ha(e, n, r[n])
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
        : Cg(Object(r)).forEach(function (n) {
            Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
          })
  }
  return e
}
function Ha(e, t, r) {
  return (
    (t = XO(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  )
}
function PW(e, t) {
  if (!(e instanceof t))
    throw new TypeError('Cannot call a class as a function')
}
function $W(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r]
    ;(n.enumerable = n.enumerable || !1),
      (n.configurable = !0),
      'value' in n && (n.writable = !0),
      Object.defineProperty(e, XO(n.key), n)
  }
}
function EW(e, t, r) {
  return (
    t && $W(e.prototype, t),
    Object.defineProperty(e, 'prototype', { writable: !1 }),
    e
  )
}
function XO(e) {
  var t = _W(e, 'string')
  return Hi(t) === 'symbol' ? t : String(t)
}
function _W(e, t) {
  if (Hi(e) !== 'object' || e === null) return e
  var r = e[Symbol.toPrimitive]
  if (r !== void 0) {
    var n = r.call(e, t || 'default')
    if (Hi(n) !== 'object') return n
    throw new TypeError('@@toPrimitive must return a primitive value.')
  }
  return (t === 'string' ? String : Number)(e)
}
function CW(e, t) {
  if (typeof t != 'function' && t !== null)
    throw new TypeError('Super expression must either be null or a function')
  ;(e.prototype = Object.create(t && t.prototype, {
    constructor: { value: e, writable: !0, configurable: !0 },
  })),
    Object.defineProperty(e, 'prototype', { writable: !1 }),
    t && vd(e, t)
}
function vd(e, t) {
  return (
    (vd = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (n, i) {
          return (n.__proto__ = i), n
        }),
    vd(e, t)
  )
}
function jW(e) {
  var t = TW()
  return function () {
    var n = _c(e),
      i
    if (t) {
      var a = _c(this).constructor
      i = Reflect.construct(n, arguments, a)
    } else i = n.apply(this, arguments)
    return yd(this, i)
  }
}
function yd(e, t) {
  if (t && (Hi(t) === 'object' || typeof t == 'function')) return t
  if (t !== void 0)
    throw new TypeError(
      'Derived constructors may only return object or undefined',
    )
  return md(e)
}
function md(e) {
  if (e === void 0)
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called",
    )
  return e
}
function TW() {
  if (typeof Reflect > 'u' || !Reflect.construct || Reflect.construct.sham)
    return !1
  if (typeof Proxy == 'function') return !0
  try {
    return (
      Boolean.prototype.valueOf.call(
        Reflect.construct(Boolean, [], function () {}),
      ),
      !0
    )
  } catch {
    return !1
  }
}
function _c(e) {
  return (
    (_c = Object.setPrototypeOf
      ? Object.getPrototypeOf.bind()
      : function (r) {
          return r.__proto__ || Object.getPrototypeOf(r)
        }),
    _c(e)
  )
}
var cr = (function (e) {
  CW(r, e)
  var t = jW(r)
  function r(n, i) {
    var a
    PW(this, r), (a = t.call(this, n, i))
    var o = a.props,
      s = o.isActive,
      c = o.attributeName,
      u = o.from,
      l = o.to,
      f = o.steps,
      d = o.children,
      h = o.duration
    if (
      ((a.handleStyleChange = a.handleStyleChange.bind(md(a))),
      (a.changeStyle = a.changeStyle.bind(md(a))),
      !s || h <= 0)
    )
      return (
        (a.state = { style: {} }),
        typeof d == 'function' && (a.state = { style: l }),
        yd(a)
      )
    if (f && f.length) a.state = { style: f[0].style }
    else if (u) {
      if (typeof d == 'function') return (a.state = { style: u }), yd(a)
      a.state = { style: c ? Ha({}, c, u) : u }
    } else a.state = { style: {} }
    return a
  }
  return (
    EW(r, [
      {
        key: 'componentDidMount',
        value: function () {
          var i = this.props,
            a = i.isActive,
            o = i.canBegin
          ;(this.mounted = !0), !(!a || !o) && this.runAnimation(this.props)
        },
      },
      {
        key: 'componentDidUpdate',
        value: function (i) {
          var a = this.props,
            o = a.isActive,
            s = a.canBegin,
            c = a.attributeName,
            u = a.shouldReAnimate,
            l = a.to,
            f = a.from,
            d = this.state.style
          if (s) {
            if (!o) {
              var h = { style: c ? Ha({}, c, l) : l }
              this.state &&
                d &&
                ((c && d[c] !== l) || (!c && d !== l)) &&
                this.setState(h)
              return
            }
            if (!(DU(i.to, l) && i.canBegin && i.isActive)) {
              var y = !i.canBegin || !i.isActive
              this.manager && this.manager.stop(),
                this.stopJSAnimation && this.stopJSAnimation()
              var v = y || u ? f : i.to
              if (this.state && d) {
                var p = { style: c ? Ha({}, c, v) : v }
                ;((c && d[c] !== v) || (!c && d !== v)) && this.setState(p)
              }
              this.runAnimation(
                Bt(Bt({}, this.props), {}, { from: v, begin: 0 }),
              )
            }
          }
        },
      },
      {
        key: 'componentWillUnmount',
        value: function () {
          this.mounted = !1
          var i = this.props.onAnimationEnd
          this.unSubscribe && this.unSubscribe(),
            this.manager && (this.manager.stop(), (this.manager = null)),
            this.stopJSAnimation && this.stopJSAnimation(),
            i && i()
        },
      },
      {
        key: 'handleStyleChange',
        value: function (i) {
          this.changeStyle(i)
        },
      },
      {
        key: 'changeStyle',
        value: function (i) {
          this.mounted && this.setState({ style: i })
        },
      },
      {
        key: 'runJSAnimation',
        value: function (i) {
          var a = this,
            o = i.from,
            s = i.to,
            c = i.duration,
            u = i.easing,
            l = i.begin,
            f = i.onAnimationEnd,
            d = i.onAnimationStart,
            h = mW(o, s, oW(u), c, this.changeStyle),
            y = function () {
              a.stopJSAnimation = h()
            }
          this.manager.start([d, l, y, c, f])
        },
      },
      {
        key: 'runStepAnimation',
        value: function (i) {
          var a = this,
            o = i.steps,
            s = i.begin,
            c = i.onAnimationStart,
            u = o[0],
            l = u.style,
            f = u.duration,
            d = f === void 0 ? 0 : f,
            h = function (v, p, x) {
              if (x === 0) return v
              var b = p.duration,
                w = p.easing,
                g = w === void 0 ? 'ease' : w,
                m = p.style,
                S = p.properties,
                P = p.onAnimationEnd,
                $ = x > 0 ? o[x - 1] : p,
                T = S || Object.keys(m)
              if (typeof g == 'function' || g === 'spring')
                return [].concat(Ml(v), [
                  a.runJSAnimation.bind(a, {
                    from: $.style,
                    to: m,
                    duration: b,
                    easing: g,
                  }),
                  b,
                ])
              var k = Ag(T, b, g),
                C = Bt(Bt(Bt({}, $.style), m), {}, { transition: k })
              return [].concat(Ml(v), [C, b, P]).filter(VU)
            }
          return this.manager.start(
            [c].concat(Ml(o.reduce(h, [l, Math.max(d, s)])), [
              i.onAnimationEnd,
            ]),
          )
        },
      },
      {
        key: 'runAnimation',
        value: function (i) {
          this.manager || (this.manager = HU())
          var a = i.begin,
            o = i.duration,
            s = i.attributeName,
            c = i.to,
            u = i.easing,
            l = i.onAnimationStart,
            f = i.onAnimationEnd,
            d = i.steps,
            h = i.children,
            y = this.manager
          if (
            ((this.unSubscribe = y.subscribe(this.handleStyleChange)),
            typeof u == 'function' || typeof h == 'function' || u === 'spring')
          ) {
            this.runJSAnimation(i)
            return
          }
          if (d.length > 1) {
            this.runStepAnimation(i)
            return
          }
          var v = s ? Ha({}, s, c) : c,
            p = Ag(Object.keys(v), o, u)
          y.start([l, a, Bt(Bt({}, v), {}, { transition: p }), o, f])
        },
      },
      {
        key: 'render',
        value: function () {
          var i = this.props,
            a = i.children
          i.begin
          var o = i.duration
          i.attributeName, i.easing
          var s = i.isActive
          i.steps,
            i.from,
            i.to,
            i.canBegin,
            i.onAnimationEnd,
            i.shouldReAnimate,
            i.onAnimationReStart
          var c = bW(i, gW),
            u = A.Children.count(a),
            l = this.state.style
          if (typeof a == 'function') return a(l)
          if (!s || u === 0 || o <= 0) return a
          var f = function (h) {
            var y = h.props,
              v = y.style,
              p = v === void 0 ? {} : v,
              x = y.className,
              b = A.cloneElement(
                h,
                Bt(Bt({}, c), {}, { style: Bt(Bt({}, p), l), className: x }),
              )
            return b
          }
          return u === 1
            ? f(A.Children.only(a))
            : E.createElement(
                'div',
                null,
                A.Children.map(a, function (d) {
                  return f(d)
                }),
              )
        },
      },
    ]),
    r
  )
})(A.PureComponent)
cr.displayName = 'Animate'
cr.defaultProps = {
  begin: 0,
  duration: 1e3,
  from: '',
  to: '',
  attributeName: '',
  easing: 'ease',
  isActive: !0,
  canBegin: !0,
  steps: [],
  onAnimationEnd: function () {},
  onAnimationStart: function () {},
}
cr.propTypes = {
  from: X.oneOfType([X.object, X.string]),
  to: X.oneOfType([X.object, X.string]),
  attributeName: X.string,
  duration: X.number,
  begin: X.number,
  easing: X.oneOfType([X.string, X.func]),
  steps: X.arrayOf(
    X.shape({
      duration: X.number.isRequired,
      style: X.object.isRequired,
      easing: X.oneOfType([
        X.oneOf(['ease', 'ease-in', 'ease-out', 'ease-in-out', 'linear']),
        X.func,
      ]),
      properties: X.arrayOf('string'),
      onAnimationEnd: X.func,
    }),
  ),
  children: X.oneOfType([X.node, X.func]),
  isActive: X.bool,
  canBegin: X.bool,
  onAnimationEnd: X.func,
  shouldReAnimate: X.bool,
  onAnimationStart: X.func,
  onAnimationReStart: X.func,
}
X.object, X.object, X.object, X.element
X.object, X.object, X.object, X.oneOfType([X.array, X.element]), X.any
function To(e) {
  '@babel/helpers - typeof'
  return (
    (To =
      typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
        ? function (t) {
            return typeof t
          }
        : function (t) {
            return t &&
              typeof Symbol == 'function' &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? 'symbol'
              : typeof t
          }),
    To(e)
  )
}
function Cc() {
  return (
    (Cc = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t]
            for (var n in r)
              Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
          }
          return e
        }),
    Cc.apply(this, arguments)
  )
}
function kW(e, t) {
  return RW(e) || IW(e, t) || NW(e, t) || MW()
}
function MW() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}
function NW(e, t) {
  if (e) {
    if (typeof e == 'string') return jg(e, t)
    var r = Object.prototype.toString.call(e).slice(8, -1)
    if (
      (r === 'Object' && e.constructor && (r = e.constructor.name),
      r === 'Map' || r === 'Set')
    )
      return Array.from(e)
    if (r === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
      return jg(e, t)
  }
}
function jg(e, t) {
  ;(t == null || t > e.length) && (t = e.length)
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r]
  return n
}
function IW(e, t) {
  var r =
    e == null
      ? null
      : (typeof Symbol < 'u' && e[Symbol.iterator]) || e['@@iterator']
  if (r != null) {
    var n,
      i,
      a,
      o,
      s = [],
      c = !0,
      u = !1
    try {
      if (((a = (r = r.call(e)).next), t !== 0))
        for (
          ;
          !(c = (n = a.call(r)).done) && (s.push(n.value), s.length !== t);
          c = !0
        );
    } catch (l) {
      ;(u = !0), (i = l)
    } finally {
      try {
        if (!c && r.return != null && ((o = r.return()), Object(o) !== o))
          return
      } finally {
        if (u) throw i
      }
    }
    return s
  }
}
function RW(e) {
  if (Array.isArray(e)) return e
}
function Tg(e, t) {
  var r = Object.keys(e)
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e)
    t &&
      (n = n.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable
      })),
      r.push.apply(r, n)
  }
  return r
}
function kg(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {}
    t % 2
      ? Tg(Object(r), !0).forEach(function (n) {
          DW(e, n, r[n])
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
        : Tg(Object(r)).forEach(function (n) {
            Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
          })
  }
  return e
}
function DW(e, t, r) {
  return (
    (t = LW(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  )
}
function LW(e) {
  var t = BW(e, 'string')
  return To(t) == 'symbol' ? t : t + ''
}
function BW(e, t) {
  if (To(e) != 'object' || !e) return e
  var r = e[Symbol.toPrimitive]
  if (r !== void 0) {
    var n = r.call(e, t || 'default')
    if (To(n) != 'object') return n
    throw new TypeError('@@toPrimitive must return a primitive value.')
  }
  return (t === 'string' ? String : Number)(e)
}
var Mg = function (t, r, n, i, a) {
    var o = Math.min(Math.abs(n) / 2, Math.abs(i) / 2),
      s = i >= 0 ? 1 : -1,
      c = n >= 0 ? 1 : -1,
      u = (i >= 0 && n >= 0) || (i < 0 && n < 0) ? 1 : 0,
      l
    if (o > 0 && a instanceof Array) {
      for (var f = [0, 0, 0, 0], d = 0, h = 4; d < h; d++)
        f[d] = a[d] > o ? o : a[d]
      ;(l = 'M'.concat(t, ',').concat(r + s * f[0])),
        f[0] > 0 &&
          (l += 'A '
            .concat(f[0], ',')
            .concat(f[0], ',0,0,')
            .concat(u, ',')
            .concat(t + c * f[0], ',')
            .concat(r)),
        (l += 'L '.concat(t + n - c * f[1], ',').concat(r)),
        f[1] > 0 &&
          (l += 'A '
            .concat(f[1], ',')
            .concat(f[1], ',0,0,')
            .concat(
              u,
              `,
        `,
            )
            .concat(t + n, ',')
            .concat(r + s * f[1])),
        (l += 'L '.concat(t + n, ',').concat(r + i - s * f[2])),
        f[2] > 0 &&
          (l += 'A '
            .concat(f[2], ',')
            .concat(f[2], ',0,0,')
            .concat(
              u,
              `,
        `,
            )
            .concat(t + n - c * f[2], ',')
            .concat(r + i)),
        (l += 'L '.concat(t + c * f[3], ',').concat(r + i)),
        f[3] > 0 &&
          (l += 'A '
            .concat(f[3], ',')
            .concat(f[3], ',0,0,')
            .concat(
              u,
              `,
        `,
            )
            .concat(t, ',')
            .concat(r + i - s * f[3])),
        (l += 'Z')
    } else if (o > 0 && a === +a && a > 0) {
      var y = Math.min(o, a)
      l = 'M '
        .concat(t, ',')
        .concat(
          r + s * y,
          `
            A `,
        )
        .concat(y, ',')
        .concat(y, ',0,0,')
        .concat(u, ',')
        .concat(t + c * y, ',')
        .concat(
          r,
          `
            L `,
        )
        .concat(t + n - c * y, ',')
        .concat(
          r,
          `
            A `,
        )
        .concat(y, ',')
        .concat(y, ',0,0,')
        .concat(u, ',')
        .concat(t + n, ',')
        .concat(
          r + s * y,
          `
            L `,
        )
        .concat(t + n, ',')
        .concat(
          r + i - s * y,
          `
            A `,
        )
        .concat(y, ',')
        .concat(y, ',0,0,')
        .concat(u, ',')
        .concat(t + n - c * y, ',')
        .concat(
          r + i,
          `
            L `,
        )
        .concat(t + c * y, ',')
        .concat(
          r + i,
          `
            A `,
        )
        .concat(y, ',')
        .concat(y, ',0,0,')
        .concat(u, ',')
        .concat(t, ',')
        .concat(r + i - s * y, ' Z')
    } else
      l = 'M '
        .concat(t, ',')
        .concat(r, ' h ')
        .concat(n, ' v ')
        .concat(i, ' h ')
        .concat(-n, ' Z')
    return l
  },
  FW = function (t, r) {
    if (!t || !r) return !1
    var n = t.x,
      i = t.y,
      a = r.x,
      o = r.y,
      s = r.width,
      c = r.height
    if (Math.abs(s) > 0 && Math.abs(c) > 0) {
      var u = Math.min(a, a + s),
        l = Math.max(a, a + s),
        f = Math.min(o, o + c),
        d = Math.max(o, o + c)
      return n >= u && n <= l && i >= f && i <= d
    }
    return !1
  },
  UW = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    radius: 0,
    isAnimationActive: !1,
    isUpdateAnimationActive: !1,
    animationBegin: 0,
    animationDuration: 1500,
    animationEasing: 'ease',
  },
  Op = function (t) {
    var r = kg(kg({}, UW), t),
      n = A.useRef(),
      i = A.useState(-1),
      a = kW(i, 2),
      o = a[0],
      s = a[1]
    A.useEffect(function () {
      if (n.current && n.current.getTotalLength)
        try {
          var g = n.current.getTotalLength()
          g && s(g)
        } catch {}
    }, [])
    var c = r.x,
      u = r.y,
      l = r.width,
      f = r.height,
      d = r.radius,
      h = r.className,
      y = r.animationEasing,
      v = r.animationDuration,
      p = r.animationBegin,
      x = r.isAnimationActive,
      b = r.isUpdateAnimationActive
    if (c !== +c || u !== +u || l !== +l || f !== +f || l === 0 || f === 0)
      return null
    var w = ue('recharts-rectangle', h)
    return b
      ? E.createElement(
          cr,
          {
            canBegin: o > 0,
            from: { width: l, height: f, x: c, y: u },
            to: { width: l, height: f, x: c, y: u },
            duration: v,
            animationEasing: y,
            isActive: b,
          },
          function (g) {
            var m = g.width,
              S = g.height,
              P = g.x,
              $ = g.y
            return E.createElement(
              cr,
              {
                canBegin: o > 0,
                from: '0px '.concat(o === -1 ? 1 : o, 'px'),
                to: ''.concat(o, 'px 0px'),
                attributeName: 'strokeDasharray',
                begin: p,
                duration: v,
                isActive: x,
                easing: y,
              },
              E.createElement(
                'path',
                Cc({}, J(r, !0), {
                  className: w,
                  d: Mg(P, $, m, S, d),
                  ref: n,
                }),
              ),
            )
          },
        )
      : E.createElement(
          'path',
          Cc({}, J(r, !0), { className: w, d: Mg(c, u, l, f, d) }),
        )
  },
  WW = ['points', 'className', 'baseLinePoints', 'connectNulls']
function si() {
  return (
    (si = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t]
            for (var n in r)
              Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
          }
          return e
        }),
    si.apply(this, arguments)
  )
}
function qW(e, t) {
  if (e == null) return {}
  var r = HW(e, t),
    n,
    i
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e)
    for (i = 0; i < a.length; i++)
      (n = a[i]),
        !(t.indexOf(n) >= 0) &&
          Object.prototype.propertyIsEnumerable.call(e, n) &&
          (r[n] = e[n])
  }
  return r
}
function HW(e, t) {
  if (e == null) return {}
  var r = {}
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue
      r[n] = e[n]
    }
  return r
}
function Ng(e) {
  return VW(e) || GW(e) || KW(e) || zW()
}
function zW() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}
function KW(e, t) {
  if (e) {
    if (typeof e == 'string') return gd(e, t)
    var r = Object.prototype.toString.call(e).slice(8, -1)
    if (
      (r === 'Object' && e.constructor && (r = e.constructor.name),
      r === 'Map' || r === 'Set')
    )
      return Array.from(e)
    if (r === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
      return gd(e, t)
  }
}
function GW(e) {
  if (
    (typeof Symbol < 'u' && e[Symbol.iterator] != null) ||
    e['@@iterator'] != null
  )
    return Array.from(e)
}
function VW(e) {
  if (Array.isArray(e)) return gd(e)
}
function gd(e, t) {
  ;(t == null || t > e.length) && (t = e.length)
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r]
  return n
}
var Ig = function (t) {
    return t && t.x === +t.x && t.y === +t.y
  },
  XW = function () {
    var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [],
      r = [[]]
    return (
      t.forEach(function (n) {
        Ig(n)
          ? r[r.length - 1].push(n)
          : r[r.length - 1].length > 0 && r.push([])
      }),
      Ig(t[0]) && r[r.length - 1].push(t[0]),
      r[r.length - 1].length <= 0 && (r = r.slice(0, -1)),
      r
    )
  },
  Za = function (t, r) {
    var n = XW(t)
    r &&
      (n = [
        n.reduce(function (a, o) {
          return [].concat(Ng(a), Ng(o))
        }, []),
      ])
    var i = n
      .map(function (a) {
        return a.reduce(function (o, s, c) {
          return ''
            .concat(o)
            .concat(c === 0 ? 'M' : 'L')
            .concat(s.x, ',')
            .concat(s.y)
        }, '')
      })
      .join('')
    return n.length === 1 ? ''.concat(i, 'Z') : i
  },
  YW = function (t, r, n) {
    var i = Za(t, n)
    return ''
      .concat(i.slice(-1) === 'Z' ? i.slice(0, -1) : i, 'L')
      .concat(Za(r.reverse(), n).slice(1))
  },
  QW = function (t) {
    var r = t.points,
      n = t.className,
      i = t.baseLinePoints,
      a = t.connectNulls,
      o = qW(t, WW)
    if (!r || !r.length) return null
    var s = ue('recharts-polygon', n)
    if (i && i.length) {
      var c = o.stroke && o.stroke !== 'none',
        u = YW(r, i, a)
      return E.createElement(
        'g',
        { className: s },
        E.createElement(
          'path',
          si({}, J(o, !0), {
            fill: u.slice(-1) === 'Z' ? o.fill : 'none',
            stroke: 'none',
            d: u,
          }),
        ),
        c
          ? E.createElement(
              'path',
              si({}, J(o, !0), { fill: 'none', d: Za(r, a) }),
            )
          : null,
        c
          ? E.createElement(
              'path',
              si({}, J(o, !0), { fill: 'none', d: Za(i, a) }),
            )
          : null,
      )
    }
    var l = Za(r, a)
    return E.createElement(
      'path',
      si({}, J(o, !0), {
        fill: l.slice(-1) === 'Z' ? o.fill : 'none',
        className: s,
        d: l,
      }),
    )
  }
function bd() {
  return (
    (bd = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t]
            for (var n in r)
              Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
          }
          return e
        }),
    bd.apply(this, arguments)
  )
}
var Wu = function (t) {
  var r = t.cx,
    n = t.cy,
    i = t.r,
    a = t.className,
    o = ue('recharts-dot', a)
  return r === +r && n === +n && i === +i
    ? E.createElement(
        'circle',
        bd({}, J(t, !1), Xs(t), { className: o, cx: r, cy: n, r: i }),
      )
    : null
}
function ko(e) {
  '@babel/helpers - typeof'
  return (
    (ko =
      typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
        ? function (t) {
            return typeof t
          }
        : function (t) {
            return t &&
              typeof Symbol == 'function' &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? 'symbol'
              : typeof t
          }),
    ko(e)
  )
}
var ZW = ['x', 'y', 'top', 'left', 'width', 'height', 'className']
function xd() {
  return (
    (xd = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t]
            for (var n in r)
              Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
          }
          return e
        }),
    xd.apply(this, arguments)
  )
}
function Rg(e, t) {
  var r = Object.keys(e)
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e)
    t &&
      (n = n.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable
      })),
      r.push.apply(r, n)
  }
  return r
}
function JW(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {}
    t % 2
      ? Rg(Object(r), !0).forEach(function (n) {
          eq(e, n, r[n])
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
        : Rg(Object(r)).forEach(function (n) {
            Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
          })
  }
  return e
}
function eq(e, t, r) {
  return (
    (t = tq(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  )
}
function tq(e) {
  var t = rq(e, 'string')
  return ko(t) == 'symbol' ? t : t + ''
}
function rq(e, t) {
  if (ko(e) != 'object' || !e) return e
  var r = e[Symbol.toPrimitive]
  if (r !== void 0) {
    var n = r.call(e, t || 'default')
    if (ko(n) != 'object') return n
    throw new TypeError('@@toPrimitive must return a primitive value.')
  }
  return (t === 'string' ? String : Number)(e)
}
function nq(e, t) {
  if (e == null) return {}
  var r = iq(e, t),
    n,
    i
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e)
    for (i = 0; i < a.length; i++)
      (n = a[i]),
        !(t.indexOf(n) >= 0) &&
          Object.prototype.propertyIsEnumerable.call(e, n) &&
          (r[n] = e[n])
  }
  return r
}
function iq(e, t) {
  if (e == null) return {}
  var r = {}
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue
      r[n] = e[n]
    }
  return r
}
var aq = function (t, r, n, i, a, o) {
    return 'M'
      .concat(t, ',')
      .concat(a, 'v')
      .concat(i, 'M')
      .concat(o, ',')
      .concat(r, 'h')
      .concat(n)
  },
  oq = function (t) {
    var r = t.x,
      n = r === void 0 ? 0 : r,
      i = t.y,
      a = i === void 0 ? 0 : i,
      o = t.top,
      s = o === void 0 ? 0 : o,
      c = t.left,
      u = c === void 0 ? 0 : c,
      l = t.width,
      f = l === void 0 ? 0 : l,
      d = t.height,
      h = d === void 0 ? 0 : d,
      y = t.className,
      v = nq(t, ZW),
      p = JW({ x: n, y: a, top: s, left: u, width: f, height: h }, v)
    return !U(n) || !U(a) || !U(f) || !U(h) || !U(s) || !U(u)
      ? null
      : E.createElement(
          'path',
          xd({}, J(p, !0), {
            className: ue('recharts-cross', y),
            d: aq(n, a, f, h, s, u),
          }),
        )
  },
  sq = Du,
  cq = uO,
  uq = fr
function lq(e, t) {
  return e && e.length ? sq(e, uq(t), cq) : void 0
}
var fq = lq
const dq = me(fq)
var hq = Du,
  pq = fr,
  vq = lO
function yq(e, t) {
  return e && e.length ? hq(e, pq(t), vq) : void 0
}
var mq = yq
const gq = me(mq)
var bq = ['cx', 'cy', 'angle', 'ticks', 'axisLine'],
  xq = ['ticks', 'tick', 'angle', 'tickFormatter', 'stroke']
function zi(e) {
  '@babel/helpers - typeof'
  return (
    (zi =
      typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
        ? function (t) {
            return typeof t
          }
        : function (t) {
            return t &&
              typeof Symbol == 'function' &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? 'symbol'
              : typeof t
          }),
    zi(e)
  )
}
function Ja() {
  return (
    (Ja = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t]
            for (var n in r)
              Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
          }
          return e
        }),
    Ja.apply(this, arguments)
  )
}
function Dg(e, t) {
  var r = Object.keys(e)
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e)
    t &&
      (n = n.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable
      })),
      r.push.apply(r, n)
  }
  return r
}
function dn(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {}
    t % 2
      ? Dg(Object(r), !0).forEach(function (n) {
          qu(e, n, r[n])
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
        : Dg(Object(r)).forEach(function (n) {
            Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
          })
  }
  return e
}
function Lg(e, t) {
  if (e == null) return {}
  var r = wq(e, t),
    n,
    i
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e)
    for (i = 0; i < a.length; i++)
      (n = a[i]),
        !(t.indexOf(n) >= 0) &&
          Object.prototype.propertyIsEnumerable.call(e, n) &&
          (r[n] = e[n])
  }
  return r
}
function wq(e, t) {
  if (e == null) return {}
  var r = {}
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue
      r[n] = e[n]
    }
  return r
}
function Oq(e, t) {
  if (!(e instanceof t))
    throw new TypeError('Cannot call a class as a function')
}
function Bg(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r]
    ;(n.enumerable = n.enumerable || !1),
      (n.configurable = !0),
      'value' in n && (n.writable = !0),
      Object.defineProperty(e, QO(n.key), n)
  }
}
function Sq(e, t, r) {
  return (
    t && Bg(e.prototype, t),
    r && Bg(e, r),
    Object.defineProperty(e, 'prototype', { writable: !1 }),
    e
  )
}
function Aq(e, t, r) {
  return (
    (t = jc(t)),
    Pq(
      e,
      YO() ? Reflect.construct(t, r || [], jc(e).constructor) : t.apply(e, r),
    )
  )
}
function Pq(e, t) {
  if (t && (zi(t) === 'object' || typeof t == 'function')) return t
  if (t !== void 0)
    throw new TypeError(
      'Derived constructors may only return object or undefined',
    )
  return $q(e)
}
function $q(e) {
  if (e === void 0)
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called",
    )
  return e
}
function YO() {
  try {
    var e = !Boolean.prototype.valueOf.call(
      Reflect.construct(Boolean, [], function () {}),
    )
  } catch {}
  return (YO = function () {
    return !!e
  })()
}
function jc(e) {
  return (
    (jc = Object.setPrototypeOf
      ? Object.getPrototypeOf.bind()
      : function (r) {
          return r.__proto__ || Object.getPrototypeOf(r)
        }),
    jc(e)
  )
}
function Eq(e, t) {
  if (typeof t != 'function' && t !== null)
    throw new TypeError('Super expression must either be null or a function')
  ;(e.prototype = Object.create(t && t.prototype, {
    constructor: { value: e, writable: !0, configurable: !0 },
  })),
    Object.defineProperty(e, 'prototype', { writable: !1 }),
    t && wd(e, t)
}
function wd(e, t) {
  return (
    (wd = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (n, i) {
          return (n.__proto__ = i), n
        }),
    wd(e, t)
  )
}
function qu(e, t, r) {
  return (
    (t = QO(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  )
}
function QO(e) {
  var t = _q(e, 'string')
  return zi(t) == 'symbol' ? t : t + ''
}
function _q(e, t) {
  if (zi(e) != 'object' || !e) return e
  var r = e[Symbol.toPrimitive]
  if (r !== void 0) {
    var n = r.call(e, t || 'default')
    if (zi(n) != 'object') return n
    throw new TypeError('@@toPrimitive must return a primitive value.')
  }
  return (t === 'string' ? String : Number)(e)
}
var Hu = (function (e) {
  function t() {
    return Oq(this, t), Aq(this, t, arguments)
  }
  return (
    Eq(t, e),
    Sq(
      t,
      [
        {
          key: 'getTickValueCoord',
          value: function (n) {
            var i = n.coordinate,
              a = this.props,
              o = a.angle,
              s = a.cx,
              c = a.cy
            return Pe(s, c, i, o)
          },
        },
        {
          key: 'getTickTextAnchor',
          value: function () {
            var n = this.props.orientation,
              i
            switch (n) {
              case 'left':
                i = 'end'
                break
              case 'right':
                i = 'start'
                break
              default:
                i = 'middle'
                break
            }
            return i
          },
        },
        {
          key: 'getViewBox',
          value: function () {
            var n = this.props,
              i = n.cx,
              a = n.cy,
              o = n.angle,
              s = n.ticks,
              c = dq(s, function (l) {
                return l.coordinate || 0
              }),
              u = gq(s, function (l) {
                return l.coordinate || 0
              })
            return {
              cx: i,
              cy: a,
              startAngle: o,
              endAngle: o,
              innerRadius: u.coordinate || 0,
              outerRadius: c.coordinate || 0,
            }
          },
        },
        {
          key: 'renderAxisLine',
          value: function () {
            var n = this.props,
              i = n.cx,
              a = n.cy,
              o = n.angle,
              s = n.ticks,
              c = n.axisLine,
              u = Lg(n, bq),
              l = s.reduce(
                function (y, v) {
                  return [
                    Math.min(y[0], v.coordinate),
                    Math.max(y[1], v.coordinate),
                  ]
                },
                [1 / 0, -1 / 0],
              ),
              f = Pe(i, a, l[0], o),
              d = Pe(i, a, l[1], o),
              h = dn(
                dn(dn({}, J(u, !1)), {}, { fill: 'none' }, J(c, !1)),
                {},
                { x1: f.x, y1: f.y, x2: d.x, y2: d.y },
              )
            return E.createElement(
              'line',
              Ja({ className: 'recharts-polar-radius-axis-line' }, h),
            )
          },
        },
        {
          key: 'renderTicks',
          value: function () {
            var n = this,
              i = this.props,
              a = i.ticks,
              o = i.tick,
              s = i.angle,
              c = i.tickFormatter,
              u = i.stroke,
              l = Lg(i, xq),
              f = this.getTickTextAnchor(),
              d = J(l, !1),
              h = J(o, !1),
              y = a.map(function (v, p) {
                var x = n.getTickValueCoord(v),
                  b = dn(
                    dn(
                      dn(
                        dn(
                          {
                            textAnchor: f,
                            transform: 'rotate('
                              .concat(90 - s, ', ')
                              .concat(x.x, ', ')
                              .concat(x.y, ')'),
                          },
                          d,
                        ),
                        {},
                        { stroke: 'none', fill: u },
                        h,
                      ),
                      {},
                      { index: p },
                      x,
                    ),
                    {},
                    { payload: v },
                  )
                return E.createElement(
                  pe,
                  Ja(
                    {
                      className: ue('recharts-polar-radius-axis-tick', LO(o)),
                      key: 'tick-'.concat(v.coordinate),
                    },
                    Ln(n.props, v, p),
                  ),
                  t.renderTickItem(o, b, c ? c(v.value, p) : v.value),
                )
              })
            return E.createElement(
              pe,
              { className: 'recharts-polar-radius-axis-ticks' },
              y,
            )
          },
        },
        {
          key: 'render',
          value: function () {
            var n = this.props,
              i = n.ticks,
              a = n.axisLine,
              o = n.tick
            return !i || !i.length
              ? null
              : E.createElement(
                  pe,
                  {
                    className: ue(
                      'recharts-polar-radius-axis',
                      this.props.className,
                    ),
                  },
                  a && this.renderAxisLine(),
                  o && this.renderTicks(),
                  ze.renderCallByParent(this.props, this.getViewBox()),
                )
          },
        },
      ],
      [
        {
          key: 'renderTickItem',
          value: function (n, i, a) {
            var o
            return (
              E.isValidElement(n)
                ? (o = E.cloneElement(n, i))
                : ie(n)
                  ? (o = n(i))
                  : (o = E.createElement(
                      Bn,
                      Ja({}, i, {
                        className: 'recharts-polar-radius-axis-tick-value',
                      }),
                      a,
                    )),
              o
            )
          },
        },
      ],
    )
  )
})(A.PureComponent)
qu(Hu, 'displayName', 'PolarRadiusAxis')
qu(Hu, 'axisType', 'radiusAxis')
qu(Hu, 'defaultProps', {
  type: 'number',
  radiusAxisId: 0,
  cx: 0,
  cy: 0,
  angle: 0,
  orientation: 'right',
  stroke: '#ccc',
  axisLine: !0,
  tick: !0,
  tickCount: 5,
  allowDataOverflow: !1,
  scale: 'auto',
  allowDuplicatedCategory: !0,
})
function Ki(e) {
  '@babel/helpers - typeof'
  return (
    (Ki =
      typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
        ? function (t) {
            return typeof t
          }
        : function (t) {
            return t &&
              typeof Symbol == 'function' &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? 'symbol'
              : typeof t
          }),
    Ki(e)
  )
}
function gn() {
  return (
    (gn = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t]
            for (var n in r)
              Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
          }
          return e
        }),
    gn.apply(this, arguments)
  )
}
function Fg(e, t) {
  var r = Object.keys(e)
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e)
    t &&
      (n = n.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable
      })),
      r.push.apply(r, n)
  }
  return r
}
function hn(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {}
    t % 2
      ? Fg(Object(r), !0).forEach(function (n) {
          zu(e, n, r[n])
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
        : Fg(Object(r)).forEach(function (n) {
            Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
          })
  }
  return e
}
function Cq(e, t) {
  if (!(e instanceof t))
    throw new TypeError('Cannot call a class as a function')
}
function Ug(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r]
    ;(n.enumerable = n.enumerable || !1),
      (n.configurable = !0),
      'value' in n && (n.writable = !0),
      Object.defineProperty(e, JO(n.key), n)
  }
}
function jq(e, t, r) {
  return (
    t && Ug(e.prototype, t),
    r && Ug(e, r),
    Object.defineProperty(e, 'prototype', { writable: !1 }),
    e
  )
}
function Tq(e, t, r) {
  return (
    (t = Tc(t)),
    kq(
      e,
      ZO() ? Reflect.construct(t, r || [], Tc(e).constructor) : t.apply(e, r),
    )
  )
}
function kq(e, t) {
  if (t && (Ki(t) === 'object' || typeof t == 'function')) return t
  if (t !== void 0)
    throw new TypeError(
      'Derived constructors may only return object or undefined',
    )
  return Mq(e)
}
function Mq(e) {
  if (e === void 0)
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called",
    )
  return e
}
function ZO() {
  try {
    var e = !Boolean.prototype.valueOf.call(
      Reflect.construct(Boolean, [], function () {}),
    )
  } catch {}
  return (ZO = function () {
    return !!e
  })()
}
function Tc(e) {
  return (
    (Tc = Object.setPrototypeOf
      ? Object.getPrototypeOf.bind()
      : function (r) {
          return r.__proto__ || Object.getPrototypeOf(r)
        }),
    Tc(e)
  )
}
function Nq(e, t) {
  if (typeof t != 'function' && t !== null)
    throw new TypeError('Super expression must either be null or a function')
  ;(e.prototype = Object.create(t && t.prototype, {
    constructor: { value: e, writable: !0, configurable: !0 },
  })),
    Object.defineProperty(e, 'prototype', { writable: !1 }),
    t && Od(e, t)
}
function Od(e, t) {
  return (
    (Od = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (n, i) {
          return (n.__proto__ = i), n
        }),
    Od(e, t)
  )
}
function zu(e, t, r) {
  return (
    (t = JO(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  )
}
function JO(e) {
  var t = Iq(e, 'string')
  return Ki(t) == 'symbol' ? t : t + ''
}
function Iq(e, t) {
  if (Ki(e) != 'object' || !e) return e
  var r = e[Symbol.toPrimitive]
  if (r !== void 0) {
    var n = r.call(e, t || 'default')
    if (Ki(n) != 'object') return n
    throw new TypeError('@@toPrimitive must return a primitive value.')
  }
  return (t === 'string' ? String : Number)(e)
}
var Rq = Math.PI / 180,
  Wg = 1e-5,
  Ku = (function (e) {
    function t() {
      return Cq(this, t), Tq(this, t, arguments)
    }
    return (
      Nq(t, e),
      jq(
        t,
        [
          {
            key: 'getTickLineCoord',
            value: function (n) {
              var i = this.props,
                a = i.cx,
                o = i.cy,
                s = i.radius,
                c = i.orientation,
                u = i.tickSize,
                l = u || 8,
                f = Pe(a, o, s, n.coordinate),
                d = Pe(a, o, s + (c === 'inner' ? -1 : 1) * l, n.coordinate)
              return { x1: f.x, y1: f.y, x2: d.x, y2: d.y }
            },
          },
          {
            key: 'getTickTextAnchor',
            value: function (n) {
              var i = this.props.orientation,
                a = Math.cos(-n.coordinate * Rq),
                o
              return (
                a > Wg
                  ? (o = i === 'outer' ? 'start' : 'end')
                  : a < -Wg
                    ? (o = i === 'outer' ? 'end' : 'start')
                    : (o = 'middle'),
                o
              )
            },
          },
          {
            key: 'renderAxisLine',
            value: function () {
              var n = this.props,
                i = n.cx,
                a = n.cy,
                o = n.radius,
                s = n.axisLine,
                c = n.axisLineType,
                u = hn(
                  hn({}, J(this.props, !1)),
                  {},
                  { fill: 'none' },
                  J(s, !1),
                )
              if (c === 'circle')
                return E.createElement(
                  Wu,
                  gn({ className: 'recharts-polar-angle-axis-line' }, u, {
                    cx: i,
                    cy: a,
                    r: o,
                  }),
                )
              var l = this.props.ticks,
                f = l.map(function (d) {
                  return Pe(i, a, o, d.coordinate)
                })
              return E.createElement(
                QW,
                gn({ className: 'recharts-polar-angle-axis-line' }, u, {
                  points: f,
                }),
              )
            },
          },
          {
            key: 'renderTicks',
            value: function () {
              var n = this,
                i = this.props,
                a = i.ticks,
                o = i.tick,
                s = i.tickLine,
                c = i.tickFormatter,
                u = i.stroke,
                l = J(this.props, !1),
                f = J(o, !1),
                d = hn(hn({}, l), {}, { fill: 'none' }, J(s, !1)),
                h = a.map(function (y, v) {
                  var p = n.getTickLineCoord(y),
                    x = n.getTickTextAnchor(y),
                    b = hn(
                      hn(
                        hn({ textAnchor: x }, l),
                        {},
                        { stroke: 'none', fill: u },
                        f,
                      ),
                      {},
                      { index: v, payload: y, x: p.x2, y: p.y2 },
                    )
                  return E.createElement(
                    pe,
                    gn(
                      {
                        className: ue('recharts-polar-angle-axis-tick', LO(o)),
                        key: 'tick-'.concat(y.coordinate),
                      },
                      Ln(n.props, y, v),
                    ),
                    s &&
                      E.createElement(
                        'line',
                        gn(
                          { className: 'recharts-polar-angle-axis-tick-line' },
                          d,
                          p,
                        ),
                      ),
                    o && t.renderTickItem(o, b, c ? c(y.value, v) : y.value),
                  )
                })
              return E.createElement(
                pe,
                { className: 'recharts-polar-angle-axis-ticks' },
                h,
              )
            },
          },
          {
            key: 'render',
            value: function () {
              var n = this.props,
                i = n.ticks,
                a = n.radius,
                o = n.axisLine
              return a <= 0 || !i || !i.length
                ? null
                : E.createElement(
                    pe,
                    {
                      className: ue(
                        'recharts-polar-angle-axis',
                        this.props.className,
                      ),
                    },
                    o && this.renderAxisLine(),
                    this.renderTicks(),
                  )
            },
          },
        ],
        [
          {
            key: 'renderTickItem',
            value: function (n, i, a) {
              var o
              return (
                E.isValidElement(n)
                  ? (o = E.cloneElement(n, i))
                  : ie(n)
                    ? (o = n(i))
                    : (o = E.createElement(
                        Bn,
                        gn({}, i, {
                          className: 'recharts-polar-angle-axis-tick-value',
                        }),
                        a,
                      )),
                o
              )
            },
          },
        ],
      )
    )
  })(A.PureComponent)
zu(Ku, 'displayName', 'PolarAngleAxis')
zu(Ku, 'axisType', 'angleAxis')
zu(Ku, 'defaultProps', {
  type: 'category',
  angleAxisId: 0,
  scale: 'auto',
  cx: 0,
  cy: 0,
  orientation: 'outer',
  axisLine: !0,
  tickLine: !0,
  tickSize: 8,
  tick: !0,
  hide: !1,
  allowDuplicatedCategory: !0,
})
var Dq = aw,
  Lq = Dq(Object.getPrototypeOf, Object),
  Bq = Lq,
  Fq = Ir,
  Uq = Bq,
  Wq = Rr,
  qq = '[object Object]',
  Hq = Function.prototype,
  zq = Object.prototype,
  eS = Hq.toString,
  Kq = zq.hasOwnProperty,
  Gq = eS.call(Object)
function Vq(e) {
  if (!Wq(e) || Fq(e) != qq) return !1
  var t = Uq(e)
  if (t === null) return !0
  var r = Kq.call(t, 'constructor') && t.constructor
  return typeof r == 'function' && r instanceof r && eS.call(r) == Gq
}
var Xq = Vq
const Yq = me(Xq)
var Qq = Ir,
  Zq = Rr,
  Jq = '[object Boolean]'
function eH(e) {
  return e === !0 || e === !1 || (Zq(e) && Qq(e) == Jq)
}
var tH = eH
const rH = me(tH)
function Mo(e) {
  '@babel/helpers - typeof'
  return (
    (Mo =
      typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
        ? function (t) {
            return typeof t
          }
        : function (t) {
            return t &&
              typeof Symbol == 'function' &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? 'symbol'
              : typeof t
          }),
    Mo(e)
  )
}
function kc() {
  return (
    (kc = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t]
            for (var n in r)
              Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
          }
          return e
        }),
    kc.apply(this, arguments)
  )
}
function nH(e, t) {
  return sH(e) || oH(e, t) || aH(e, t) || iH()
}
function iH() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}
function aH(e, t) {
  if (e) {
    if (typeof e == 'string') return qg(e, t)
    var r = Object.prototype.toString.call(e).slice(8, -1)
    if (
      (r === 'Object' && e.constructor && (r = e.constructor.name),
      r === 'Map' || r === 'Set')
    )
      return Array.from(e)
    if (r === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
      return qg(e, t)
  }
}
function qg(e, t) {
  ;(t == null || t > e.length) && (t = e.length)
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r]
  return n
}
function oH(e, t) {
  var r =
    e == null
      ? null
      : (typeof Symbol < 'u' && e[Symbol.iterator]) || e['@@iterator']
  if (r != null) {
    var n,
      i,
      a,
      o,
      s = [],
      c = !0,
      u = !1
    try {
      if (((a = (r = r.call(e)).next), t !== 0))
        for (
          ;
          !(c = (n = a.call(r)).done) && (s.push(n.value), s.length !== t);
          c = !0
        );
    } catch (l) {
      ;(u = !0), (i = l)
    } finally {
      try {
        if (!c && r.return != null && ((o = r.return()), Object(o) !== o))
          return
      } finally {
        if (u) throw i
      }
    }
    return s
  }
}
function sH(e) {
  if (Array.isArray(e)) return e
}
function Hg(e, t) {
  var r = Object.keys(e)
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e)
    t &&
      (n = n.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable
      })),
      r.push.apply(r, n)
  }
  return r
}
function zg(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {}
    t % 2
      ? Hg(Object(r), !0).forEach(function (n) {
          cH(e, n, r[n])
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
        : Hg(Object(r)).forEach(function (n) {
            Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
          })
  }
  return e
}
function cH(e, t, r) {
  return (
    (t = uH(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  )
}
function uH(e) {
  var t = lH(e, 'string')
  return Mo(t) == 'symbol' ? t : t + ''
}
function lH(e, t) {
  if (Mo(e) != 'object' || !e) return e
  var r = e[Symbol.toPrimitive]
  if (r !== void 0) {
    var n = r.call(e, t || 'default')
    if (Mo(n) != 'object') return n
    throw new TypeError('@@toPrimitive must return a primitive value.')
  }
  return (t === 'string' ? String : Number)(e)
}
var Kg = function (t, r, n, i, a) {
    var o = n - i,
      s
    return (
      (s = 'M '.concat(t, ',').concat(r)),
      (s += 'L '.concat(t + n, ',').concat(r)),
      (s += 'L '.concat(t + n - o / 2, ',').concat(r + a)),
      (s += 'L '.concat(t + n - o / 2 - i, ',').concat(r + a)),
      (s += 'L '.concat(t, ',').concat(r, ' Z')),
      s
    )
  },
  fH = {
    x: 0,
    y: 0,
    upperWidth: 0,
    lowerWidth: 0,
    height: 0,
    isUpdateAnimationActive: !1,
    animationBegin: 0,
    animationDuration: 1500,
    animationEasing: 'ease',
  },
  dH = function (t) {
    var r = zg(zg({}, fH), t),
      n = A.useRef(),
      i = A.useState(-1),
      a = nH(i, 2),
      o = a[0],
      s = a[1]
    A.useEffect(function () {
      if (n.current && n.current.getTotalLength)
        try {
          var w = n.current.getTotalLength()
          w && s(w)
        } catch {}
    }, [])
    var c = r.x,
      u = r.y,
      l = r.upperWidth,
      f = r.lowerWidth,
      d = r.height,
      h = r.className,
      y = r.animationEasing,
      v = r.animationDuration,
      p = r.animationBegin,
      x = r.isUpdateAnimationActive
    if (
      c !== +c ||
      u !== +u ||
      l !== +l ||
      f !== +f ||
      d !== +d ||
      (l === 0 && f === 0) ||
      d === 0
    )
      return null
    var b = ue('recharts-trapezoid', h)
    return x
      ? E.createElement(
          cr,
          {
            canBegin: o > 0,
            from: { upperWidth: 0, lowerWidth: 0, height: d, x: c, y: u },
            to: { upperWidth: l, lowerWidth: f, height: d, x: c, y: u },
            duration: v,
            animationEasing: y,
            isActive: x,
          },
          function (w) {
            var g = w.upperWidth,
              m = w.lowerWidth,
              S = w.height,
              P = w.x,
              $ = w.y
            return E.createElement(
              cr,
              {
                canBegin: o > 0,
                from: '0px '.concat(o === -1 ? 1 : o, 'px'),
                to: ''.concat(o, 'px 0px'),
                attributeName: 'strokeDasharray',
                begin: p,
                duration: v,
                easing: y,
              },
              E.createElement(
                'path',
                kc({}, J(r, !0), {
                  className: b,
                  d: Kg(P, $, g, m, S),
                  ref: n,
                }),
              ),
            )
          },
        )
      : E.createElement(
          'g',
          null,
          E.createElement(
            'path',
            kc({}, J(r, !0), { className: b, d: Kg(c, u, l, f, d) }),
          ),
        )
  },
  hH = ['option', 'shapeType', 'propTransformer', 'activeClassName', 'isActive']
function No(e) {
  '@babel/helpers - typeof'
  return (
    (No =
      typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
        ? function (t) {
            return typeof t
          }
        : function (t) {
            return t &&
              typeof Symbol == 'function' &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? 'symbol'
              : typeof t
          }),
    No(e)
  )
}
function pH(e, t) {
  if (e == null) return {}
  var r = vH(e, t),
    n,
    i
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e)
    for (i = 0; i < a.length; i++)
      (n = a[i]),
        !(t.indexOf(n) >= 0) &&
          Object.prototype.propertyIsEnumerable.call(e, n) &&
          (r[n] = e[n])
  }
  return r
}
function vH(e, t) {
  if (e == null) return {}
  var r = {}
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue
      r[n] = e[n]
    }
  return r
}
function Gg(e, t) {
  var r = Object.keys(e)
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e)
    t &&
      (n = n.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable
      })),
      r.push.apply(r, n)
  }
  return r
}
function Mc(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {}
    t % 2
      ? Gg(Object(r), !0).forEach(function (n) {
          yH(e, n, r[n])
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
        : Gg(Object(r)).forEach(function (n) {
            Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
          })
  }
  return e
}
function yH(e, t, r) {
  return (
    (t = mH(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  )
}
function mH(e) {
  var t = gH(e, 'string')
  return No(t) == 'symbol' ? t : t + ''
}
function gH(e, t) {
  if (No(e) != 'object' || !e) return e
  var r = e[Symbol.toPrimitive]
  if (r !== void 0) {
    var n = r.call(e, t || 'default')
    if (No(n) != 'object') return n
    throw new TypeError('@@toPrimitive must return a primitive value.')
  }
  return (t === 'string' ? String : Number)(e)
}
function bH(e, t) {
  return Mc(Mc({}, t), e)
}
function xH(e, t) {
  return e === 'symbols'
}
function Vg(e) {
  var t = e.shapeType,
    r = e.elementProps
  switch (t) {
    case 'rectangle':
      return E.createElement(Op, r)
    case 'trapezoid':
      return E.createElement(dH, r)
    case 'sector':
      return E.createElement(UO, r)
    case 'symbols':
      if (xH(t)) return E.createElement(Uh, r)
      break
    default:
      return null
  }
}
function wH(e) {
  return A.isValidElement(e) ? e.props : e
}
function tS(e) {
  var t = e.option,
    r = e.shapeType,
    n = e.propTransformer,
    i = n === void 0 ? bH : n,
    a = e.activeClassName,
    o = a === void 0 ? 'recharts-active-shape' : a,
    s = e.isActive,
    c = pH(e, hH),
    u
  if (A.isValidElement(t)) u = A.cloneElement(t, Mc(Mc({}, c), wH(t)))
  else if (ie(t)) u = t(c)
  else if (Yq(t) && !rH(t)) {
    var l = i(t, c)
    u = E.createElement(Vg, { shapeType: r, elementProps: l })
  } else {
    var f = c
    u = E.createElement(Vg, { shapeType: r, elementProps: f })
  }
  return s ? E.createElement(pe, { className: o }, u) : u
}
function Gu(e, t) {
  return t != null && 'trapezoids' in e.props
}
function Vu(e, t) {
  return t != null && 'sectors' in e.props
}
function Io(e, t) {
  return t != null && 'points' in e.props
}
function OH(e, t) {
  var r,
    n,
    i =
      e.x ===
        (t == null || (r = t.labelViewBox) === null || r === void 0
          ? void 0
          : r.x) || e.x === t.x,
    a =
      e.y ===
        (t == null || (n = t.labelViewBox) === null || n === void 0
          ? void 0
          : n.y) || e.y === t.y
  return i && a
}
function SH(e, t) {
  var r = e.endAngle === t.endAngle,
    n = e.startAngle === t.startAngle
  return r && n
}
function AH(e, t) {
  var r = e.x === t.x,
    n = e.y === t.y,
    i = e.z === t.z
  return r && n && i
}
function PH(e, t) {
  var r
  return Gu(e, t) ? (r = OH) : Vu(e, t) ? (r = SH) : Io(e, t) && (r = AH), r
}
function $H(e, t) {
  var r
  return (
    Gu(e, t)
      ? (r = 'trapezoids')
      : Vu(e, t)
        ? (r = 'sectors')
        : Io(e, t) && (r = 'points'),
    r
  )
}
function EH(e, t) {
  if (Gu(e, t)) {
    var r
    return (r = t.tooltipPayload) === null ||
      r === void 0 ||
      (r = r[0]) === null ||
      r === void 0 ||
      (r = r.payload) === null ||
      r === void 0
      ? void 0
      : r.payload
  }
  if (Vu(e, t)) {
    var n
    return (n = t.tooltipPayload) === null ||
      n === void 0 ||
      (n = n[0]) === null ||
      n === void 0 ||
      (n = n.payload) === null ||
      n === void 0
      ? void 0
      : n.payload
  }
  return Io(e, t) ? t.payload : {}
}
function _H(e) {
  var t = e.activeTooltipItem,
    r = e.graphicalItem,
    n = e.itemData,
    i = $H(r, t),
    a = EH(r, t),
    o = n.filter(function (c, u) {
      var l = as(a, c),
        f = r.props[i].filter(function (y) {
          var v = PH(r, t)
          return v(y, t)
        }),
        d = r.props[i].indexOf(f[f.length - 1]),
        h = u === d
      return l && h
    }),
    s = n.indexOf(o[o.length - 1])
  return s
}
var Rs
function Gi(e) {
  '@babel/helpers - typeof'
  return (
    (Gi =
      typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
        ? function (t) {
            return typeof t
          }
        : function (t) {
            return t &&
              typeof Symbol == 'function' &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? 'symbol'
              : typeof t
          }),
    Gi(e)
  )
}
function ci() {
  return (
    (ci = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t]
            for (var n in r)
              Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
          }
          return e
        }),
    ci.apply(this, arguments)
  )
}
function Xg(e, t) {
  var r = Object.keys(e)
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e)
    t &&
      (n = n.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable
      })),
      r.push.apply(r, n)
  }
  return r
}
function Se(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {}
    t % 2
      ? Xg(Object(r), !0).forEach(function (n) {
          Tt(e, n, r[n])
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
        : Xg(Object(r)).forEach(function (n) {
            Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
          })
  }
  return e
}
function CH(e, t) {
  if (!(e instanceof t))
    throw new TypeError('Cannot call a class as a function')
}
function Yg(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r]
    ;(n.enumerable = n.enumerable || !1),
      (n.configurable = !0),
      'value' in n && (n.writable = !0),
      Object.defineProperty(e, nS(n.key), n)
  }
}
function jH(e, t, r) {
  return (
    t && Yg(e.prototype, t),
    r && Yg(e, r),
    Object.defineProperty(e, 'prototype', { writable: !1 }),
    e
  )
}
function TH(e, t, r) {
  return (
    (t = Nc(t)),
    kH(
      e,
      rS() ? Reflect.construct(t, r || [], Nc(e).constructor) : t.apply(e, r),
    )
  )
}
function kH(e, t) {
  if (t && (Gi(t) === 'object' || typeof t == 'function')) return t
  if (t !== void 0)
    throw new TypeError(
      'Derived constructors may only return object or undefined',
    )
  return MH(e)
}
function MH(e) {
  if (e === void 0)
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called",
    )
  return e
}
function rS() {
  try {
    var e = !Boolean.prototype.valueOf.call(
      Reflect.construct(Boolean, [], function () {}),
    )
  } catch {}
  return (rS = function () {
    return !!e
  })()
}
function Nc(e) {
  return (
    (Nc = Object.setPrototypeOf
      ? Object.getPrototypeOf.bind()
      : function (r) {
          return r.__proto__ || Object.getPrototypeOf(r)
        }),
    Nc(e)
  )
}
function NH(e, t) {
  if (typeof t != 'function' && t !== null)
    throw new TypeError('Super expression must either be null or a function')
  ;(e.prototype = Object.create(t && t.prototype, {
    constructor: { value: e, writable: !0, configurable: !0 },
  })),
    Object.defineProperty(e, 'prototype', { writable: !1 }),
    t && Sd(e, t)
}
function Sd(e, t) {
  return (
    (Sd = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (n, i) {
          return (n.__proto__ = i), n
        }),
    Sd(e, t)
  )
}
function Tt(e, t, r) {
  return (
    (t = nS(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  )
}
function nS(e) {
  var t = IH(e, 'string')
  return Gi(t) == 'symbol' ? t : t + ''
}
function IH(e, t) {
  if (Gi(e) != 'object' || !e) return e
  var r = e[Symbol.toPrimitive]
  if (r !== void 0) {
    var n = r.call(e, t || 'default')
    if (Gi(n) != 'object') return n
    throw new TypeError('@@toPrimitive must return a primitive value.')
  }
  return (t === 'string' ? String : Number)(e)
}
var Lr = (function (e) {
  function t(r) {
    var n
    return (
      CH(this, t),
      (n = TH(this, t, [r])),
      Tt(n, 'pieRef', null),
      Tt(n, 'sectorRefs', []),
      Tt(n, 'id', ma('recharts-pie-')),
      Tt(n, 'handleAnimationEnd', function () {
        var i = n.props.onAnimationEnd
        n.setState({ isAnimationFinished: !0 }), ie(i) && i()
      }),
      Tt(n, 'handleAnimationStart', function () {
        var i = n.props.onAnimationStart
        n.setState({ isAnimationFinished: !1 }), ie(i) && i()
      }),
      (n.state = {
        isAnimationFinished: !r.isAnimationActive,
        prevIsAnimationActive: r.isAnimationActive,
        prevAnimationId: r.animationId,
        sectorToFocus: 0,
      }),
      n
    )
  }
  return (
    NH(t, e),
    jH(
      t,
      [
        {
          key: 'isActiveIndex',
          value: function (n) {
            var i = this.props.activeIndex
            return Array.isArray(i) ? i.indexOf(n) !== -1 : n === i
          },
        },
        {
          key: 'hasActiveIndex',
          value: function () {
            var n = this.props.activeIndex
            return Array.isArray(n) ? n.length !== 0 : n || n === 0
          },
        },
        {
          key: 'renderLabels',
          value: function (n) {
            var i = this.props.isAnimationActive
            if (i && !this.state.isAnimationFinished) return null
            var a = this.props,
              o = a.label,
              s = a.labelLine,
              c = a.dataKey,
              u = a.valueKey,
              l = J(this.props, !1),
              f = J(o, !1),
              d = J(s, !1),
              h = (o && o.offsetRadius) || 20,
              y = n.map(function (v, p) {
                var x = (v.startAngle + v.endAngle) / 2,
                  b = Pe(v.cx, v.cy, v.outerRadius + h, x),
                  w = Se(
                    Se(Se(Se({}, l), v), {}, { stroke: 'none' }, f),
                    {},
                    { index: p, textAnchor: t.getTextAnchor(b.x, v.cx) },
                    b,
                  ),
                  g = Se(
                    Se(
                      Se(Se({}, l), v),
                      {},
                      { fill: 'none', stroke: v.fill },
                      d,
                    ),
                    {},
                    { index: p, points: [Pe(v.cx, v.cy, v.outerRadius, x), b] },
                  ),
                  m = c
                return (
                  se(c) && se(u) ? (m = 'value') : se(c) && (m = u),
                  E.createElement(
                    pe,
                    {
                      key: 'label-'
                        .concat(v.startAngle, '-')
                        .concat(v.endAngle, '-')
                        .concat(v.midAngle, '-')
                        .concat(p),
                    },
                    s && t.renderLabelLineItem(s, g, 'line'),
                    t.renderLabelItem(o, w, Ue(v, m)),
                  )
                )
              })
            return E.createElement(pe, { className: 'recharts-pie-labels' }, y)
          },
        },
        {
          key: 'renderSectorsStatically',
          value: function (n) {
            var i = this,
              a = this.props,
              o = a.activeShape,
              s = a.blendStroke,
              c = a.inactiveShape
            return n.map(function (u, l) {
              if (
                (u == null ? void 0 : u.startAngle) === 0 &&
                (u == null ? void 0 : u.endAngle) === 0 &&
                n.length !== 1
              )
                return null
              var f = i.isActiveIndex(l),
                d = c && i.hasActiveIndex() ? c : null,
                h = f ? o : d,
                y = Se(
                  Se({}, u),
                  {},
                  { stroke: s ? u.fill : u.stroke, tabIndex: -1 },
                )
              return E.createElement(
                pe,
                ci(
                  {
                    ref: function (p) {
                      p && !i.sectorRefs.includes(p) && i.sectorRefs.push(p)
                    },
                    tabIndex: -1,
                    className: 'recharts-pie-sector',
                  },
                  Ln(i.props, u, l),
                  {
                    key: 'sector-'
                      .concat(u == null ? void 0 : u.startAngle, '-')
                      .concat(u == null ? void 0 : u.endAngle, '-')
                      .concat(u.midAngle, '-')
                      .concat(l),
                  },
                ),
                E.createElement(
                  tS,
                  ci({ option: h, isActive: f, shapeType: 'sector' }, y),
                ),
              )
            })
          },
        },
        {
          key: 'renderSectorsWithAnimation',
          value: function () {
            var n = this,
              i = this.props,
              a = i.sectors,
              o = i.isAnimationActive,
              s = i.animationBegin,
              c = i.animationDuration,
              u = i.animationEasing,
              l = i.animationId,
              f = this.state,
              d = f.prevSectors,
              h = f.prevIsAnimationActive
            return E.createElement(
              cr,
              {
                begin: s,
                duration: c,
                isActive: o,
                easing: u,
                from: { t: 0 },
                to: { t: 1 },
                key: 'pie-'.concat(l, '-').concat(h),
                onAnimationStart: this.handleAnimationStart,
                onAnimationEnd: this.handleAnimationEnd,
              },
              function (y) {
                var v = y.t,
                  p = [],
                  x = a && a[0],
                  b = x.startAngle
                return (
                  a.forEach(function (w, g) {
                    var m = d && d[g],
                      S = g > 0 ? xt(w, 'paddingAngle', 0) : 0
                    if (m) {
                      var P = gt(
                          m.endAngle - m.startAngle,
                          w.endAngle - w.startAngle,
                        ),
                        $ = Se(
                          Se({}, w),
                          {},
                          { startAngle: b + S, endAngle: b + P(v) + S },
                        )
                      p.push($), (b = $.endAngle)
                    } else {
                      var T = w.endAngle,
                        k = w.startAngle,
                        C = gt(0, T - k),
                        j = C(v),
                        M = Se(
                          Se({}, w),
                          {},
                          { startAngle: b + S, endAngle: b + j + S },
                        )
                      p.push(M), (b = M.endAngle)
                    }
                  }),
                  E.createElement(pe, null, n.renderSectorsStatically(p))
                )
              },
            )
          },
        },
        {
          key: 'attachKeyboardHandlers',
          value: function (n) {
            var i = this
            n.onkeydown = function (a) {
              if (!a.altKey)
                switch (a.key) {
                  case 'ArrowLeft': {
                    var o = ++i.state.sectorToFocus % i.sectorRefs.length
                    i.sectorRefs[o].focus(), i.setState({ sectorToFocus: o })
                    break
                  }
                  case 'ArrowRight': {
                    var s =
                      --i.state.sectorToFocus < 0
                        ? i.sectorRefs.length - 1
                        : i.state.sectorToFocus % i.sectorRefs.length
                    i.sectorRefs[s].focus(), i.setState({ sectorToFocus: s })
                    break
                  }
                  case 'Escape': {
                    i.sectorRefs[i.state.sectorToFocus].blur(),
                      i.setState({ sectorToFocus: 0 })
                    break
                  }
                }
            }
          },
        },
        {
          key: 'renderSectors',
          value: function () {
            var n = this.props,
              i = n.sectors,
              a = n.isAnimationActive,
              o = this.state.prevSectors
            return a && i && i.length && (!o || !as(o, i))
              ? this.renderSectorsWithAnimation()
              : this.renderSectorsStatically(i)
          },
        },
        {
          key: 'componentDidMount',
          value: function () {
            this.pieRef && this.attachKeyboardHandlers(this.pieRef)
          },
        },
        {
          key: 'render',
          value: function () {
            var n = this,
              i = this.props,
              a = i.hide,
              o = i.sectors,
              s = i.className,
              c = i.label,
              u = i.cx,
              l = i.cy,
              f = i.innerRadius,
              d = i.outerRadius,
              h = i.isAnimationActive,
              y = this.state.isAnimationFinished
            if (a || !o || !o.length || !U(u) || !U(l) || !U(f) || !U(d))
              return null
            var v = ue('recharts-pie', s)
            return E.createElement(
              pe,
              {
                tabIndex: this.props.rootTabIndex,
                className: v,
                ref: function (x) {
                  n.pieRef = x
                },
              },
              this.renderSectors(),
              c && this.renderLabels(o),
              ze.renderCallByParent(this.props, null, !1),
              (!h || y) && Ar.renderCallByParent(this.props, o, !1),
            )
          },
        },
      ],
      [
        {
          key: 'getDerivedStateFromProps',
          value: function (n, i) {
            return i.prevIsAnimationActive !== n.isAnimationActive
              ? {
                  prevIsAnimationActive: n.isAnimationActive,
                  prevAnimationId: n.animationId,
                  curSectors: n.sectors,
                  prevSectors: [],
                  isAnimationFinished: !0,
                }
              : n.isAnimationActive && n.animationId !== i.prevAnimationId
                ? {
                    prevAnimationId: n.animationId,
                    curSectors: n.sectors,
                    prevSectors: i.curSectors,
                    isAnimationFinished: !0,
                  }
                : n.sectors !== i.curSectors
                  ? { curSectors: n.sectors, isAnimationFinished: !0 }
                  : null
          },
        },
        {
          key: 'getTextAnchor',
          value: function (n, i) {
            return n > i ? 'start' : n < i ? 'end' : 'middle'
          },
        },
        {
          key: 'renderLabelLineItem',
          value: function (n, i, a) {
            if (E.isValidElement(n)) return E.cloneElement(n, i)
            if (ie(n)) return n(i)
            var o = ue(
              'recharts-pie-label-line',
              typeof n != 'boolean' ? n.className : '',
            )
            return E.createElement(
              Pc,
              ci({}, i, { key: a, type: 'linear', className: o }),
            )
          },
        },
        {
          key: 'renderLabelItem',
          value: function (n, i, a) {
            if (E.isValidElement(n)) return E.cloneElement(n, i)
            var o = a
            if (ie(n) && ((o = n(i)), E.isValidElement(o))) return o
            var s = ue(
              'recharts-pie-label-text',
              typeof n != 'boolean' && !ie(n) ? n.className : '',
            )
            return E.createElement(
              Bn,
              ci({}, i, { alignmentBaseline: 'middle', className: s }),
              o,
            )
          },
        },
      ],
    )
  )
})(A.PureComponent)
Rs = Lr
Tt(Lr, 'displayName', 'Pie')
Tt(Lr, 'defaultProps', {
  stroke: '#fff',
  fill: '#808080',
  legendType: 'rect',
  cx: '50%',
  cy: '50%',
  startAngle: 0,
  endAngle: 360,
  innerRadius: 0,
  outerRadius: '80%',
  paddingAngle: 0,
  labelLine: !0,
  hide: !1,
  minAngle: 0,
  isAnimationActive: !nr.isSsr,
  animationBegin: 400,
  animationDuration: 1500,
  animationEasing: 'ease',
  nameKey: 'name',
  blendStroke: !1,
  rootTabIndex: 0,
})
Tt(Lr, 'parseDeltaAngle', function (e, t) {
  var r = at(t - e),
    n = Math.min(Math.abs(t - e), 360)
  return r * n
})
Tt(Lr, 'getRealPieData', function (e) {
  var t = e.data,
    r = e.children,
    n = J(e, !1),
    i = wt(r, ju)
  return t && t.length
    ? t.map(function (a, o) {
        return Se(Se(Se({ payload: a }, n), a), i && i[o] && i[o].props)
      })
    : i && i.length
      ? i.map(function (a) {
          return Se(Se({}, n), a.props)
        })
      : []
})
Tt(Lr, 'parseCoordinateOfPie', function (e, t) {
  var r = t.top,
    n = t.left,
    i = t.width,
    a = t.height,
    o = DO(i, a),
    s = n + ot(e.cx, i, i / 2),
    c = r + ot(e.cy, a, a / 2),
    u = ot(e.innerRadius, o, 0),
    l = ot(e.outerRadius, o, o * 0.8),
    f = e.maxRadius || Math.sqrt(i * i + a * a) / 2
  return { cx: s, cy: c, innerRadius: u, outerRadius: l, maxRadius: f }
})
Tt(Lr, 'getComposedData', function (e) {
  var t = e.item,
    r = e.offset,
    n =
      t.type.defaultProps !== void 0
        ? Se(Se({}, t.type.defaultProps), t.props)
        : t.props,
    i = Rs.getRealPieData(n)
  if (!i || !i.length) return null
  var a = n.cornerRadius,
    o = n.startAngle,
    s = n.endAngle,
    c = n.paddingAngle,
    u = n.dataKey,
    l = n.nameKey,
    f = n.valueKey,
    d = n.tooltipType,
    h = Math.abs(n.minAngle),
    y = Rs.parseCoordinateOfPie(n, r),
    v = Rs.parseDeltaAngle(o, s),
    p = Math.abs(v),
    x = u
  se(u) && se(f)
    ? (Gt(
        !1,
        `Use "dataKey" to specify the value of pie,
      the props "valueKey" will be deprecated in 1.1.0`,
      ),
      (x = 'value'))
    : se(u) &&
      (Gt(
        !1,
        `Use "dataKey" to specify the value of pie,
      the props "valueKey" will be deprecated in 1.1.0`,
      ),
      (x = f))
  var b = i.filter(function ($) {
      return Ue($, x, 0) !== 0
    }).length,
    w = (p >= 360 ? b : b - 1) * c,
    g = p - b * h - w,
    m = i.reduce(function ($, T) {
      var k = Ue(T, x, 0)
      return $ + (U(k) ? k : 0)
    }, 0),
    S
  if (m > 0) {
    var P
    S = i.map(function ($, T) {
      var k = Ue($, x, 0),
        C = Ue($, l, T),
        j = (U(k) ? k : 0) / m,
        M
      T ? (M = P.endAngle + at(v) * c * (k !== 0 ? 1 : 0)) : (M = o)
      var N = M + at(v) * ((k !== 0 ? h : 0) + j * g),
        R = (M + N) / 2,
        I = (y.innerRadius + y.outerRadius) / 2,
        L = [{ name: C, value: k, payload: $, dataKey: x, type: d }],
        B = Pe(y.cx, y.cy, I, R)
      return (
        (P = Se(
          Se(
            Se(
              {
                percent: j,
                cornerRadius: a,
                name: C,
                tooltipPayload: L,
                midAngle: R,
                middleRadius: I,
                tooltipPosition: B,
              },
              $,
            ),
            y,
          ),
          {},
          {
            value: Ue($, x),
            startAngle: M,
            endAngle: N,
            payload: $,
            paddingAngle: at(v) * c,
          },
        )),
        P
      )
    })
  }
  return Se(Se({}, y), {}, { sectors: S, data: i })
})
var RH = Math.ceil,
  DH = Math.max
function LH(e, t, r, n) {
  for (var i = -1, a = DH(RH((t - e) / (r || 1)), 0), o = Array(a); a--; )
    (o[n ? a : ++i] = e), (e += r)
  return o
}
var BH = LH,
  FH = Aw,
  Qg = 1 / 0,
  UH = 17976931348623157e292
function WH(e) {
  if (!e) return e === 0 ? e : 0
  if (((e = FH(e)), e === Qg || e === -Qg)) {
    var t = e < 0 ? -1 : 1
    return t * UH
  }
  return e === e ? e : 0
}
var iS = WH,
  qH = BH,
  HH = Cu,
  Nl = iS
function zH(e) {
  return function (t, r, n) {
    return (
      n && typeof n != 'number' && HH(t, r, n) && (r = n = void 0),
      (t = Nl(t)),
      r === void 0 ? ((r = t), (t = 0)) : (r = Nl(r)),
      (n = n === void 0 ? (t < r ? 1 : -1) : Nl(n)),
      qH(t, r, n, e)
    )
  }
}
var KH = zH,
  GH = KH,
  VH = GH(),
  XH = VH
const Ic = me(XH)
function Ro(e) {
  '@babel/helpers - typeof'
  return (
    (Ro =
      typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
        ? function (t) {
            return typeof t
          }
        : function (t) {
            return t &&
              typeof Symbol == 'function' &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? 'symbol'
              : typeof t
          }),
    Ro(e)
  )
}
function Zg(e, t) {
  var r = Object.keys(e)
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e)
    t &&
      (n = n.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable
      })),
      r.push.apply(r, n)
  }
  return r
}
function Jg(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {}
    t % 2
      ? Zg(Object(r), !0).forEach(function (n) {
          aS(e, n, r[n])
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
        : Zg(Object(r)).forEach(function (n) {
            Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
          })
  }
  return e
}
function aS(e, t, r) {
  return (
    (t = YH(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  )
}
function YH(e) {
  var t = QH(e, 'string')
  return Ro(t) == 'symbol' ? t : t + ''
}
function QH(e, t) {
  if (Ro(e) != 'object' || !e) return e
  var r = e[Symbol.toPrimitive]
  if (r !== void 0) {
    var n = r.call(e, t || 'default')
    if (Ro(n) != 'object') return n
    throw new TypeError('@@toPrimitive must return a primitive value.')
  }
  return (t === 'string' ? String : Number)(e)
}
var ZH = ['Webkit', 'Moz', 'O', 'ms'],
  JH = function (t, r) {
    var n = t.replace(/(\w)/, function (a) {
        return a.toUpperCase()
      }),
      i = ZH.reduce(function (a, o) {
        return Jg(Jg({}, a), {}, aS({}, o + n, r))
      }, {})
    return (i[t] = r), i
  }
function Vi(e) {
  '@babel/helpers - typeof'
  return (
    (Vi =
      typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
        ? function (t) {
            return typeof t
          }
        : function (t) {
            return t &&
              typeof Symbol == 'function' &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? 'symbol'
              : typeof t
          }),
    Vi(e)
  )
}
function Rc() {
  return (
    (Rc = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t]
            for (var n in r)
              Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
          }
          return e
        }),
    Rc.apply(this, arguments)
  )
}
function e0(e, t) {
  var r = Object.keys(e)
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e)
    t &&
      (n = n.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable
      })),
      r.push.apply(r, n)
  }
  return r
}
function Il(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {}
    t % 2
      ? e0(Object(r), !0).forEach(function (n) {
          vt(e, n, r[n])
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
        : e0(Object(r)).forEach(function (n) {
            Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
          })
  }
  return e
}
function ez(e, t) {
  if (!(e instanceof t))
    throw new TypeError('Cannot call a class as a function')
}
function t0(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r]
    ;(n.enumerable = n.enumerable || !1),
      (n.configurable = !0),
      'value' in n && (n.writable = !0),
      Object.defineProperty(e, sS(n.key), n)
  }
}
function tz(e, t, r) {
  return (
    t && t0(e.prototype, t),
    r && t0(e, r),
    Object.defineProperty(e, 'prototype', { writable: !1 }),
    e
  )
}
function rz(e, t, r) {
  return (
    (t = Dc(t)),
    nz(
      e,
      oS() ? Reflect.construct(t, r || [], Dc(e).constructor) : t.apply(e, r),
    )
  )
}
function nz(e, t) {
  if (t && (Vi(t) === 'object' || typeof t == 'function')) return t
  if (t !== void 0)
    throw new TypeError(
      'Derived constructors may only return object or undefined',
    )
  return iz(e)
}
function iz(e) {
  if (e === void 0)
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called",
    )
  return e
}
function oS() {
  try {
    var e = !Boolean.prototype.valueOf.call(
      Reflect.construct(Boolean, [], function () {}),
    )
  } catch {}
  return (oS = function () {
    return !!e
  })()
}
function Dc(e) {
  return (
    (Dc = Object.setPrototypeOf
      ? Object.getPrototypeOf.bind()
      : function (r) {
          return r.__proto__ || Object.getPrototypeOf(r)
        }),
    Dc(e)
  )
}
function az(e, t) {
  if (typeof t != 'function' && t !== null)
    throw new TypeError('Super expression must either be null or a function')
  ;(e.prototype = Object.create(t && t.prototype, {
    constructor: { value: e, writable: !0, configurable: !0 },
  })),
    Object.defineProperty(e, 'prototype', { writable: !1 }),
    t && Ad(e, t)
}
function Ad(e, t) {
  return (
    (Ad = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (n, i) {
          return (n.__proto__ = i), n
        }),
    Ad(e, t)
  )
}
function vt(e, t, r) {
  return (
    (t = sS(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  )
}
function sS(e) {
  var t = oz(e, 'string')
  return Vi(t) == 'symbol' ? t : t + ''
}
function oz(e, t) {
  if (Vi(e) != 'object' || !e) return e
  var r = e[Symbol.toPrimitive]
  if (r !== void 0) {
    var n = r.call(e, t || 'default')
    if (Vi(n) != 'object') return n
    throw new TypeError('@@toPrimitive must return a primitive value.')
  }
  return (t === 'string' ? String : Number)(e)
}
var sz = function (t) {
    var r = t.data,
      n = t.startIndex,
      i = t.endIndex,
      a = t.x,
      o = t.width,
      s = t.travellerWidth
    if (!r || !r.length) return {}
    var c = r.length,
      u = Xa()
        .domain(Ic(0, c))
        .range([a, a + o - s]),
      l = u.domain().map(function (f) {
        return u(f)
      })
    return {
      isTextActive: !1,
      isSlideMoving: !1,
      isTravellerMoving: !1,
      isTravellerFocused: !1,
      startX: u(n),
      endX: u(i),
      scale: u,
      scaleValues: l,
    }
  },
  r0 = function (t) {
    return t.changedTouches && !!t.changedTouches.length
  },
  Xi = (function (e) {
    function t(r) {
      var n
      return (
        ez(this, t),
        (n = rz(this, t, [r])),
        vt(n, 'handleDrag', function (i) {
          n.leaveTimer && (clearTimeout(n.leaveTimer), (n.leaveTimer = null)),
            n.state.isTravellerMoving
              ? n.handleTravellerMove(i)
              : n.state.isSlideMoving && n.handleSlideDrag(i)
        }),
        vt(n, 'handleTouchMove', function (i) {
          i.changedTouches != null &&
            i.changedTouches.length > 0 &&
            n.handleDrag(i.changedTouches[0])
        }),
        vt(n, 'handleDragEnd', function () {
          n.setState({ isTravellerMoving: !1, isSlideMoving: !1 }, function () {
            var i = n.props,
              a = i.endIndex,
              o = i.onDragEnd,
              s = i.startIndex
            o == null || o({ endIndex: a, startIndex: s })
          }),
            n.detachDragEndListener()
        }),
        vt(n, 'handleLeaveWrapper', function () {
          ;(n.state.isTravellerMoving || n.state.isSlideMoving) &&
            (n.leaveTimer = window.setTimeout(
              n.handleDragEnd,
              n.props.leaveTimeOut,
            ))
        }),
        vt(n, 'handleEnterSlideOrTraveller', function () {
          n.setState({ isTextActive: !0 })
        }),
        vt(n, 'handleLeaveSlideOrTraveller', function () {
          n.setState({ isTextActive: !1 })
        }),
        vt(n, 'handleSlideDragStart', function (i) {
          var a = r0(i) ? i.changedTouches[0] : i
          n.setState({
            isTravellerMoving: !1,
            isSlideMoving: !0,
            slideMoveStartX: a.pageX,
          }),
            n.attachDragEndListener()
        }),
        (n.travellerDragStartHandlers = {
          startX: n.handleTravellerDragStart.bind(n, 'startX'),
          endX: n.handleTravellerDragStart.bind(n, 'endX'),
        }),
        (n.state = {}),
        n
      )
    }
    return (
      az(t, e),
      tz(
        t,
        [
          {
            key: 'componentWillUnmount',
            value: function () {
              this.leaveTimer &&
                (clearTimeout(this.leaveTimer), (this.leaveTimer = null)),
                this.detachDragEndListener()
            },
          },
          {
            key: 'getIndex',
            value: function (n) {
              var i = n.startX,
                a = n.endX,
                o = this.state.scaleValues,
                s = this.props,
                c = s.gap,
                u = s.data,
                l = u.length - 1,
                f = Math.min(i, a),
                d = Math.max(i, a),
                h = t.getIndexInRange(o, f),
                y = t.getIndexInRange(o, d)
              return {
                startIndex: h - (h % c),
                endIndex: y === l ? l : y - (y % c),
              }
            },
          },
          {
            key: 'getTextOfTick',
            value: function (n) {
              var i = this.props,
                a = i.data,
                o = i.tickFormatter,
                s = i.dataKey,
                c = Ue(a[n], s, n)
              return ie(o) ? o(c, n) : c
            },
          },
          {
            key: 'attachDragEndListener',
            value: function () {
              window.addEventListener('mouseup', this.handleDragEnd, !0),
                window.addEventListener('touchend', this.handleDragEnd, !0),
                window.addEventListener('mousemove', this.handleDrag, !0)
            },
          },
          {
            key: 'detachDragEndListener',
            value: function () {
              window.removeEventListener('mouseup', this.handleDragEnd, !0),
                window.removeEventListener('touchend', this.handleDragEnd, !0),
                window.removeEventListener('mousemove', this.handleDrag, !0)
            },
          },
          {
            key: 'handleSlideDrag',
            value: function (n) {
              var i = this.state,
                a = i.slideMoveStartX,
                o = i.startX,
                s = i.endX,
                c = this.props,
                u = c.x,
                l = c.width,
                f = c.travellerWidth,
                d = c.startIndex,
                h = c.endIndex,
                y = c.onChange,
                v = n.pageX - a
              v > 0
                ? (v = Math.min(v, u + l - f - s, u + l - f - o))
                : v < 0 && (v = Math.max(v, u - o, u - s))
              var p = this.getIndex({ startX: o + v, endX: s + v })
              ;(p.startIndex !== d || p.endIndex !== h) && y && y(p),
                this.setState({
                  startX: o + v,
                  endX: s + v,
                  slideMoveStartX: n.pageX,
                })
            },
          },
          {
            key: 'handleTravellerDragStart',
            value: function (n, i) {
              var a = r0(i) ? i.changedTouches[0] : i
              this.setState({
                isSlideMoving: !1,
                isTravellerMoving: !0,
                movingTravellerId: n,
                brushMoveStartX: a.pageX,
              }),
                this.attachDragEndListener()
            },
          },
          {
            key: 'handleTravellerMove',
            value: function (n) {
              var i = this.state,
                a = i.brushMoveStartX,
                o = i.movingTravellerId,
                s = i.endX,
                c = i.startX,
                u = this.state[o],
                l = this.props,
                f = l.x,
                d = l.width,
                h = l.travellerWidth,
                y = l.onChange,
                v = l.gap,
                p = l.data,
                x = { startX: this.state.startX, endX: this.state.endX },
                b = n.pageX - a
              b > 0
                ? (b = Math.min(b, f + d - h - u))
                : b < 0 && (b = Math.max(b, f - u)),
                (x[o] = u + b)
              var w = this.getIndex(x),
                g = w.startIndex,
                m = w.endIndex,
                S = function () {
                  var $ = p.length - 1
                  return (
                    (o === 'startX' && (s > c ? g % v === 0 : m % v === 0)) ||
                    (s < c && m === $) ||
                    (o === 'endX' && (s > c ? m % v === 0 : g % v === 0)) ||
                    (s > c && m === $)
                  )
                }
              this.setState(
                vt(vt({}, o, u + b), 'brushMoveStartX', n.pageX),
                function () {
                  y && S() && y(w)
                },
              )
            },
          },
          {
            key: 'handleTravellerMoveKeyboard',
            value: function (n, i) {
              var a = this,
                o = this.state,
                s = o.scaleValues,
                c = o.startX,
                u = o.endX,
                l = this.state[i],
                f = s.indexOf(l)
              if (f !== -1) {
                var d = f + n
                if (!(d === -1 || d >= s.length)) {
                  var h = s[d]
                  ;(i === 'startX' && h >= u) ||
                    (i === 'endX' && h <= c) ||
                    this.setState(vt({}, i, h), function () {
                      a.props.onChange(
                        a.getIndex({
                          startX: a.state.startX,
                          endX: a.state.endX,
                        }),
                      )
                    })
                }
              }
            },
          },
          {
            key: 'renderBackground',
            value: function () {
              var n = this.props,
                i = n.x,
                a = n.y,
                o = n.width,
                s = n.height,
                c = n.fill,
                u = n.stroke
              return E.createElement('rect', {
                stroke: u,
                fill: c,
                x: i,
                y: a,
                width: o,
                height: s,
              })
            },
          },
          {
            key: 'renderPanorama',
            value: function () {
              var n = this.props,
                i = n.x,
                a = n.y,
                o = n.width,
                s = n.height,
                c = n.data,
                u = n.children,
                l = n.padding,
                f = A.Children.only(u)
              return f
                ? E.cloneElement(f, {
                    x: i,
                    y: a,
                    width: o,
                    height: s,
                    margin: l,
                    compact: !0,
                    data: c,
                  })
                : null
            },
          },
          {
            key: 'renderTravellerLayer',
            value: function (n, i) {
              var a,
                o,
                s = this,
                c = this.props,
                u = c.y,
                l = c.travellerWidth,
                f = c.height,
                d = c.traveller,
                h = c.ariaLabel,
                y = c.data,
                v = c.startIndex,
                p = c.endIndex,
                x = Math.max(n, this.props.x),
                b = Il(
                  Il({}, J(this.props, !1)),
                  {},
                  { x, y: u, width: l, height: f },
                ),
                w =
                  h ||
                  'Min value: '
                    .concat(
                      (a = y[v]) === null || a === void 0 ? void 0 : a.name,
                      ', Max value: ',
                    )
                    .concat(
                      (o = y[p]) === null || o === void 0 ? void 0 : o.name,
                    )
              return E.createElement(
                pe,
                {
                  tabIndex: 0,
                  role: 'slider',
                  'aria-label': w,
                  'aria-valuenow': n,
                  className: 'recharts-brush-traveller',
                  onMouseEnter: this.handleEnterSlideOrTraveller,
                  onMouseLeave: this.handleLeaveSlideOrTraveller,
                  onMouseDown: this.travellerDragStartHandlers[i],
                  onTouchStart: this.travellerDragStartHandlers[i],
                  onKeyDown: function (m) {
                    ;['ArrowLeft', 'ArrowRight'].includes(m.key) &&
                      (m.preventDefault(),
                      m.stopPropagation(),
                      s.handleTravellerMoveKeyboard(
                        m.key === 'ArrowRight' ? 1 : -1,
                        i,
                      ))
                  },
                  onFocus: function () {
                    s.setState({ isTravellerFocused: !0 })
                  },
                  onBlur: function () {
                    s.setState({ isTravellerFocused: !1 })
                  },
                  style: { cursor: 'col-resize' },
                },
                t.renderTraveller(d, b),
              )
            },
          },
          {
            key: 'renderSlide',
            value: function (n, i) {
              var a = this.props,
                o = a.y,
                s = a.height,
                c = a.stroke,
                u = a.travellerWidth,
                l = Math.min(n, i) + u,
                f = Math.max(Math.abs(i - n) - u, 0)
              return E.createElement('rect', {
                className: 'recharts-brush-slide',
                onMouseEnter: this.handleEnterSlideOrTraveller,
                onMouseLeave: this.handleLeaveSlideOrTraveller,
                onMouseDown: this.handleSlideDragStart,
                onTouchStart: this.handleSlideDragStart,
                style: { cursor: 'move' },
                stroke: 'none',
                fill: c,
                fillOpacity: 0.2,
                x: l,
                y: o,
                width: f,
                height: s,
              })
            },
          },
          {
            key: 'renderText',
            value: function () {
              var n = this.props,
                i = n.startIndex,
                a = n.endIndex,
                o = n.y,
                s = n.height,
                c = n.travellerWidth,
                u = n.stroke,
                l = this.state,
                f = l.startX,
                d = l.endX,
                h = 5,
                y = { pointerEvents: 'none', fill: u }
              return E.createElement(
                pe,
                { className: 'recharts-brush-texts' },
                E.createElement(
                  Bn,
                  Rc(
                    {
                      textAnchor: 'end',
                      verticalAnchor: 'middle',
                      x: Math.min(f, d) - h,
                      y: o + s / 2,
                    },
                    y,
                  ),
                  this.getTextOfTick(i),
                ),
                E.createElement(
                  Bn,
                  Rc(
                    {
                      textAnchor: 'start',
                      verticalAnchor: 'middle',
                      x: Math.max(f, d) + c + h,
                      y: o + s / 2,
                    },
                    y,
                  ),
                  this.getTextOfTick(a),
                ),
              )
            },
          },
          {
            key: 'render',
            value: function () {
              var n = this.props,
                i = n.data,
                a = n.className,
                o = n.children,
                s = n.x,
                c = n.y,
                u = n.width,
                l = n.height,
                f = n.alwaysShowText,
                d = this.state,
                h = d.startX,
                y = d.endX,
                v = d.isTextActive,
                p = d.isSlideMoving,
                x = d.isTravellerMoving,
                b = d.isTravellerFocused
              if (
                !i ||
                !i.length ||
                !U(s) ||
                !U(c) ||
                !U(u) ||
                !U(l) ||
                u <= 0 ||
                l <= 0
              )
                return null
              var w = ue('recharts-brush', a),
                g = E.Children.count(o) === 1,
                m = JH('userSelect', 'none')
              return E.createElement(
                pe,
                {
                  className: w,
                  onMouseLeave: this.handleLeaveWrapper,
                  onTouchMove: this.handleTouchMove,
                  style: m,
                },
                this.renderBackground(),
                g && this.renderPanorama(),
                this.renderSlide(h, y),
                this.renderTravellerLayer(h, 'startX'),
                this.renderTravellerLayer(y, 'endX'),
                (v || p || x || b || f) && this.renderText(),
              )
            },
          },
        ],
        [
          {
            key: 'renderDefaultTraveller',
            value: function (n) {
              var i = n.x,
                a = n.y,
                o = n.width,
                s = n.height,
                c = n.stroke,
                u = Math.floor(a + s / 2) - 1
              return E.createElement(
                E.Fragment,
                null,
                E.createElement('rect', {
                  x: i,
                  y: a,
                  width: o,
                  height: s,
                  fill: c,
                  stroke: 'none',
                }),
                E.createElement('line', {
                  x1: i + 1,
                  y1: u,
                  x2: i + o - 1,
                  y2: u,
                  fill: 'none',
                  stroke: '#fff',
                }),
                E.createElement('line', {
                  x1: i + 1,
                  y1: u + 2,
                  x2: i + o - 1,
                  y2: u + 2,
                  fill: 'none',
                  stroke: '#fff',
                }),
              )
            },
          },
          {
            key: 'renderTraveller',
            value: function (n, i) {
              var a
              return (
                E.isValidElement(n)
                  ? (a = E.cloneElement(n, i))
                  : ie(n)
                    ? (a = n(i))
                    : (a = t.renderDefaultTraveller(i)),
                a
              )
            },
          },
          {
            key: 'getDerivedStateFromProps',
            value: function (n, i) {
              var a = n.data,
                o = n.width,
                s = n.x,
                c = n.travellerWidth,
                u = n.updateId,
                l = n.startIndex,
                f = n.endIndex
              if (a !== i.prevData || u !== i.prevUpdateId)
                return Il(
                  {
                    prevData: a,
                    prevTravellerWidth: c,
                    prevUpdateId: u,
                    prevX: s,
                    prevWidth: o,
                  },
                  a && a.length
                    ? sz({
                        data: a,
                        width: o,
                        x: s,
                        travellerWidth: c,
                        startIndex: l,
                        endIndex: f,
                      })
                    : { scale: null, scaleValues: null },
                )
              if (
                i.scale &&
                (o !== i.prevWidth ||
                  s !== i.prevX ||
                  c !== i.prevTravellerWidth)
              ) {
                i.scale.range([s, s + o - c])
                var d = i.scale.domain().map(function (h) {
                  return i.scale(h)
                })
                return {
                  prevData: a,
                  prevTravellerWidth: c,
                  prevUpdateId: u,
                  prevX: s,
                  prevWidth: o,
                  startX: i.scale(n.startIndex),
                  endX: i.scale(n.endIndex),
                  scaleValues: d,
                }
              }
              return null
            },
          },
          {
            key: 'getIndexInRange',
            value: function (n, i) {
              for (var a = n.length, o = 0, s = a - 1; s - o > 1; ) {
                var c = Math.floor((o + s) / 2)
                n[c] > i ? (s = c) : (o = c)
              }
              return i >= n[s] ? s : o
            },
          },
        ],
      )
    )
  })(A.PureComponent)
vt(Xi, 'displayName', 'Brush')
vt(Xi, 'defaultProps', {
  height: 40,
  travellerWidth: 5,
  gap: 1,
  fill: '#fff',
  stroke: '#666',
  padding: { top: 1, right: 1, bottom: 1, left: 1 },
  leaveTimeOut: 1e3,
  alwaysShowText: !1,
})
var cz = Vh
function uz(e, t) {
  var r
  return (
    cz(e, function (n, i, a) {
      return (r = t(n, i, a)), !r
    }),
    !!r
  )
}
var lz = uz,
  fz = Q1,
  dz = fr,
  hz = lz,
  pz = ht,
  vz = Cu
function yz(e, t, r) {
  var n = pz(e) ? fz : hz
  return r && vz(e, t, r) && (t = void 0), n(e, dz(t))
}
var mz = yz
const gz = me(mz)
var ar = function (t, r) {
    var n = t.alwaysShow,
      i = t.ifOverflow
    return n && (i = 'extendDomain'), i === r
  },
  n0 = bw
function bz(e, t, r) {
  t == '__proto__' && n0
    ? n0(e, t, { configurable: !0, enumerable: !0, value: r, writable: !0 })
    : (e[t] = r)
}
var xz = bz,
  wz = xz,
  Oz = mw,
  Sz = fr
function Az(e, t) {
  var r = {}
  return (
    (t = Sz(t)),
    Oz(e, function (n, i, a) {
      wz(r, i, t(n, i, a))
    }),
    r
  )
}
var Pz = Az
const $z = me(Pz)
function Ez(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length; ++r < n; )
    if (!t(e[r], r, e)) return !1
  return !0
}
var _z = Ez,
  Cz = Vh
function jz(e, t) {
  var r = !0
  return (
    Cz(e, function (n, i, a) {
      return (r = !!t(n, i, a)), r
    }),
    r
  )
}
var Tz = jz,
  kz = _z,
  Mz = Tz,
  Nz = fr,
  Iz = ht,
  Rz = Cu
function Dz(e, t, r) {
  var n = Iz(e) ? kz : Mz
  return r && Rz(e, t, r) && (t = void 0), n(e, Nz(t))
}
var Lz = Dz
const cS = me(Lz)
var Bz = ['x', 'y']
function Do(e) {
  '@babel/helpers - typeof'
  return (
    (Do =
      typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
        ? function (t) {
            return typeof t
          }
        : function (t) {
            return t &&
              typeof Symbol == 'function' &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? 'symbol'
              : typeof t
          }),
    Do(e)
  )
}
function Pd() {
  return (
    (Pd = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t]
            for (var n in r)
              Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
          }
          return e
        }),
    Pd.apply(this, arguments)
  )
}
function i0(e, t) {
  var r = Object.keys(e)
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e)
    t &&
      (n = n.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable
      })),
      r.push.apply(r, n)
  }
  return r
}
function Ba(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {}
    t % 2
      ? i0(Object(r), !0).forEach(function (n) {
          Fz(e, n, r[n])
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
        : i0(Object(r)).forEach(function (n) {
            Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
          })
  }
  return e
}
function Fz(e, t, r) {
  return (
    (t = Uz(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  )
}
function Uz(e) {
  var t = Wz(e, 'string')
  return Do(t) == 'symbol' ? t : t + ''
}
function Wz(e, t) {
  if (Do(e) != 'object' || !e) return e
  var r = e[Symbol.toPrimitive]
  if (r !== void 0) {
    var n = r.call(e, t || 'default')
    if (Do(n) != 'object') return n
    throw new TypeError('@@toPrimitive must return a primitive value.')
  }
  return (t === 'string' ? String : Number)(e)
}
function qz(e, t) {
  if (e == null) return {}
  var r = Hz(e, t),
    n,
    i
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e)
    for (i = 0; i < a.length; i++)
      (n = a[i]),
        !(t.indexOf(n) >= 0) &&
          Object.prototype.propertyIsEnumerable.call(e, n) &&
          (r[n] = e[n])
  }
  return r
}
function Hz(e, t) {
  if (e == null) return {}
  var r = {}
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue
      r[n] = e[n]
    }
  return r
}
function zz(e, t) {
  var r = e.x,
    n = e.y,
    i = qz(e, Bz),
    a = ''.concat(r),
    o = parseInt(a, 10),
    s = ''.concat(n),
    c = parseInt(s, 10),
    u = ''.concat(t.height || i.height),
    l = parseInt(u, 10),
    f = ''.concat(t.width || i.width),
    d = parseInt(f, 10)
  return Ba(
    Ba(Ba(Ba(Ba({}, t), i), o ? { x: o } : {}), c ? { y: c } : {}),
    {},
    { height: l, width: d, name: t.name, radius: t.radius },
  )
}
function a0(e) {
  return E.createElement(
    tS,
    Pd(
      {
        shapeType: 'rectangle',
        propTransformer: zz,
        activeClassName: 'recharts-active-bar',
      },
      e,
    ),
  )
}
var Kz = function (t) {
    var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0
    return function (n, i) {
      if (typeof t == 'number') return t
      var a = typeof n == 'number'
      return a ? t(n, i) : (a || Un(), r)
    }
  },
  Gz = ['value', 'background'],
  uS
function Yi(e) {
  '@babel/helpers - typeof'
  return (
    (Yi =
      typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
        ? function (t) {
            return typeof t
          }
        : function (t) {
            return t &&
              typeof Symbol == 'function' &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? 'symbol'
              : typeof t
          }),
    Yi(e)
  )
}
function Vz(e, t) {
  if (e == null) return {}
  var r = Xz(e, t),
    n,
    i
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e)
    for (i = 0; i < a.length; i++)
      (n = a[i]),
        !(t.indexOf(n) >= 0) &&
          Object.prototype.propertyIsEnumerable.call(e, n) &&
          (r[n] = e[n])
  }
  return r
}
function Xz(e, t) {
  if (e == null) return {}
  var r = {}
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue
      r[n] = e[n]
    }
  return r
}
function Lc() {
  return (
    (Lc = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t]
            for (var n in r)
              Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
          }
          return e
        }),
    Lc.apply(this, arguments)
  )
}
function o0(e, t) {
  var r = Object.keys(e)
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e)
    t &&
      (n = n.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable
      })),
      r.push.apply(r, n)
  }
  return r
}
function Ie(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {}
    t % 2
      ? o0(Object(r), !0).forEach(function (n) {
          en(e, n, r[n])
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
        : o0(Object(r)).forEach(function (n) {
            Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
          })
  }
  return e
}
function Yz(e, t) {
  if (!(e instanceof t))
    throw new TypeError('Cannot call a class as a function')
}
function s0(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r]
    ;(n.enumerable = n.enumerable || !1),
      (n.configurable = !0),
      'value' in n && (n.writable = !0),
      Object.defineProperty(e, fS(n.key), n)
  }
}
function Qz(e, t, r) {
  return (
    t && s0(e.prototype, t),
    r && s0(e, r),
    Object.defineProperty(e, 'prototype', { writable: !1 }),
    e
  )
}
function Zz(e, t, r) {
  return (
    (t = Bc(t)),
    Jz(
      e,
      lS() ? Reflect.construct(t, r || [], Bc(e).constructor) : t.apply(e, r),
    )
  )
}
function Jz(e, t) {
  if (t && (Yi(t) === 'object' || typeof t == 'function')) return t
  if (t !== void 0)
    throw new TypeError(
      'Derived constructors may only return object or undefined',
    )
  return eK(e)
}
function eK(e) {
  if (e === void 0)
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called",
    )
  return e
}
function lS() {
  try {
    var e = !Boolean.prototype.valueOf.call(
      Reflect.construct(Boolean, [], function () {}),
    )
  } catch {}
  return (lS = function () {
    return !!e
  })()
}
function Bc(e) {
  return (
    (Bc = Object.setPrototypeOf
      ? Object.getPrototypeOf.bind()
      : function (r) {
          return r.__proto__ || Object.getPrototypeOf(r)
        }),
    Bc(e)
  )
}
function tK(e, t) {
  if (typeof t != 'function' && t !== null)
    throw new TypeError('Super expression must either be null or a function')
  ;(e.prototype = Object.create(t && t.prototype, {
    constructor: { value: e, writable: !0, configurable: !0 },
  })),
    Object.defineProperty(e, 'prototype', { writable: !1 }),
    t && $d(e, t)
}
function $d(e, t) {
  return (
    ($d = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (n, i) {
          return (n.__proto__ = i), n
        }),
    $d(e, t)
  )
}
function en(e, t, r) {
  return (
    (t = fS(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  )
}
function fS(e) {
  var t = rK(e, 'string')
  return Yi(t) == 'symbol' ? t : t + ''
}
function rK(e, t) {
  if (Yi(e) != 'object' || !e) return e
  var r = e[Symbol.toPrimitive]
  if (r !== void 0) {
    var n = r.call(e, t || 'default')
    if (Yi(n) != 'object') return n
    throw new TypeError('@@toPrimitive must return a primitive value.')
  }
  return (t === 'string' ? String : Number)(e)
}
var Vn = (function (e) {
  function t() {
    var r
    Yz(this, t)
    for (var n = arguments.length, i = new Array(n), a = 0; a < n; a++)
      i[a] = arguments[a]
    return (
      (r = Zz(this, t, [].concat(i))),
      en(r, 'state', { isAnimationFinished: !1 }),
      en(r, 'id', ma('recharts-bar-')),
      en(r, 'handleAnimationEnd', function () {
        var o = r.props.onAnimationEnd
        r.setState({ isAnimationFinished: !0 }), o && o()
      }),
      en(r, 'handleAnimationStart', function () {
        var o = r.props.onAnimationStart
        r.setState({ isAnimationFinished: !1 }), o && o()
      }),
      r
    )
  }
  return (
    tK(t, e),
    Qz(
      t,
      [
        {
          key: 'renderRectanglesStatically',
          value: function (n) {
            var i = this,
              a = this.props,
              o = a.shape,
              s = a.dataKey,
              c = a.activeIndex,
              u = a.activeBar,
              l = J(this.props, !1)
            return (
              n &&
              n.map(function (f, d) {
                var h = d === c,
                  y = h ? u : o,
                  v = Ie(
                    Ie(Ie({}, l), f),
                    {},
                    {
                      isActive: h,
                      option: y,
                      index: d,
                      dataKey: s,
                      onAnimationStart: i.handleAnimationStart,
                      onAnimationEnd: i.handleAnimationEnd,
                    },
                  )
                return E.createElement(
                  pe,
                  Lc(
                    { className: 'recharts-bar-rectangle' },
                    Ln(i.props, f, d),
                    {
                      key: 'rectangle-'
                        .concat(f == null ? void 0 : f.x, '-')
                        .concat(f == null ? void 0 : f.y, '-')
                        .concat(f == null ? void 0 : f.value),
                    },
                  ),
                  E.createElement(a0, v),
                )
              })
            )
          },
        },
        {
          key: 'renderRectanglesWithAnimation',
          value: function () {
            var n = this,
              i = this.props,
              a = i.data,
              o = i.layout,
              s = i.isAnimationActive,
              c = i.animationBegin,
              u = i.animationDuration,
              l = i.animationEasing,
              f = i.animationId,
              d = this.state.prevData
            return E.createElement(
              cr,
              {
                begin: c,
                duration: u,
                isActive: s,
                easing: l,
                from: { t: 0 },
                to: { t: 1 },
                key: 'bar-'.concat(f),
                onAnimationEnd: this.handleAnimationEnd,
                onAnimationStart: this.handleAnimationStart,
              },
              function (h) {
                var y = h.t,
                  v = a.map(function (p, x) {
                    var b = d && d[x]
                    if (b) {
                      var w = gt(b.x, p.x),
                        g = gt(b.y, p.y),
                        m = gt(b.width, p.width),
                        S = gt(b.height, p.height)
                      return Ie(
                        Ie({}, p),
                        {},
                        { x: w(y), y: g(y), width: m(y), height: S(y) },
                      )
                    }
                    if (o === 'horizontal') {
                      var P = gt(0, p.height),
                        $ = P(y)
                      return Ie(
                        Ie({}, p),
                        {},
                        { y: p.y + p.height - $, height: $ },
                      )
                    }
                    var T = gt(0, p.width),
                      k = T(y)
                    return Ie(Ie({}, p), {}, { width: k })
                  })
                return E.createElement(
                  pe,
                  null,
                  n.renderRectanglesStatically(v),
                )
              },
            )
          },
        },
        {
          key: 'renderRectangles',
          value: function () {
            var n = this.props,
              i = n.data,
              a = n.isAnimationActive,
              o = this.state.prevData
            return a && i && i.length && (!o || !as(o, i))
              ? this.renderRectanglesWithAnimation()
              : this.renderRectanglesStatically(i)
          },
        },
        {
          key: 'renderBackground',
          value: function () {
            var n = this,
              i = this.props,
              a = i.data,
              o = i.dataKey,
              s = i.activeIndex,
              c = J(this.props.background, !1)
            return a.map(function (u, l) {
              u.value
              var f = u.background,
                d = Vz(u, Gz)
              if (!f) return null
              var h = Ie(
                Ie(
                  Ie(Ie(Ie({}, d), {}, { fill: '#eee' }, f), c),
                  Ln(n.props, u, l),
                ),
                {},
                {
                  onAnimationStart: n.handleAnimationStart,
                  onAnimationEnd: n.handleAnimationEnd,
                  dataKey: o,
                  index: l,
                  className: 'recharts-bar-background-rectangle',
                },
              )
              return E.createElement(
                a0,
                Lc(
                  {
                    key: 'background-bar-'.concat(l),
                    option: n.props.background,
                    isActive: l === s,
                  },
                  h,
                ),
              )
            })
          },
        },
        {
          key: 'renderErrorBar',
          value: function (n, i) {
            if (this.props.isAnimationActive && !this.state.isAnimationFinished)
              return null
            var a = this.props,
              o = a.data,
              s = a.xAxis,
              c = a.yAxis,
              u = a.layout,
              l = a.children,
              f = wt(l, os)
            if (!f) return null
            var d = u === 'vertical' ? o[0].height / 2 : o[0].width / 2,
              h = function (p, x) {
                var b = Array.isArray(p.value) ? p.value[1] : p.value
                return { x: p.x, y: p.y, value: b, errorVal: Ue(p, x) }
              },
              y = { clipPath: n ? 'url(#clipPath-'.concat(i, ')') : null }
            return E.createElement(
              pe,
              y,
              f.map(function (v) {
                return E.cloneElement(v, {
                  key: 'error-bar-'.concat(i, '-').concat(v.props.dataKey),
                  data: o,
                  xAxis: s,
                  yAxis: c,
                  layout: u,
                  offset: d,
                  dataPointFormatter: h,
                })
              }),
            )
          },
        },
        {
          key: 'render',
          value: function () {
            var n = this.props,
              i = n.hide,
              a = n.data,
              o = n.className,
              s = n.xAxis,
              c = n.yAxis,
              u = n.left,
              l = n.top,
              f = n.width,
              d = n.height,
              h = n.isAnimationActive,
              y = n.background,
              v = n.id
            if (i || !a || !a.length) return null
            var p = this.state.isAnimationFinished,
              x = ue('recharts-bar', o),
              b = s && s.allowDataOverflow,
              w = c && c.allowDataOverflow,
              g = b || w,
              m = se(v) ? this.id : v
            return E.createElement(
              pe,
              { className: x },
              b || w
                ? E.createElement(
                    'defs',
                    null,
                    E.createElement(
                      'clipPath',
                      { id: 'clipPath-'.concat(m) },
                      E.createElement('rect', {
                        x: b ? u : u - f / 2,
                        y: w ? l : l - d / 2,
                        width: b ? f : f * 2,
                        height: w ? d : d * 2,
                      }),
                    ),
                  )
                : null,
              E.createElement(
                pe,
                {
                  className: 'recharts-bar-rectangles',
                  clipPath: g ? 'url(#clipPath-'.concat(m, ')') : null,
                },
                y ? this.renderBackground() : null,
                this.renderRectangles(),
              ),
              this.renderErrorBar(g, m),
              (!h || p) && Ar.renderCallByParent(this.props, a),
            )
          },
        },
      ],
      [
        {
          key: 'getDerivedStateFromProps',
          value: function (n, i) {
            return n.animationId !== i.prevAnimationId
              ? {
                  prevAnimationId: n.animationId,
                  curData: n.data,
                  prevData: i.curData,
                }
              : n.data !== i.curData
                ? { curData: n.data }
                : null
          },
        },
      ],
    )
  )
})(A.PureComponent)
uS = Vn
en(Vn, 'displayName', 'Bar')
en(Vn, 'defaultProps', {
  xAxisId: 0,
  yAxisId: 0,
  legendType: 'rect',
  minPointSize: 0,
  hide: !1,
  data: [],
  layout: 'vertical',
  activeBar: !1,
  isAnimationActive: !nr.isSsr,
  animationBegin: 0,
  animationDuration: 400,
  animationEasing: 'ease',
})
en(Vn, 'getComposedData', function (e) {
  var t = e.props,
    r = e.item,
    n = e.barPosition,
    i = e.bandSize,
    a = e.xAxis,
    o = e.yAxis,
    s = e.xAxisTicks,
    c = e.yAxisTicks,
    u = e.stackedData,
    l = e.dataStartIndex,
    f = e.displayedData,
    d = e.offset,
    h = QF(n, r)
  if (!h) return null
  var y = t.layout,
    v = r.type.defaultProps,
    p = v !== void 0 ? Ie(Ie({}, v), r.props) : r.props,
    x = p.dataKey,
    b = p.children,
    w = p.minPointSize,
    g = y === 'horizontal' ? o : a,
    m = u ? g.scale.domain() : null,
    S = i9({ numericAxis: g }),
    P = wt(b, ju),
    $ = f.map(function (T, k) {
      var C, j, M, N, R, I
      u
        ? (C = ZF(u[l + k], m))
        : ((C = Ue(T, x)), Array.isArray(C) || (C = [S, C]))
      var L = Kz(w, uS.defaultProps.minPointSize)(C[1], k)
      if (y === 'horizontal') {
        var B,
          W = [o.scale(C[0]), o.scale(C[1])],
          G = W[0],
          z = W[1]
        ;(j = Ym({
          axis: a,
          ticks: s,
          bandSize: i,
          offset: h.offset,
          entry: T,
          index: k,
        })),
          (M = (B = z ?? G) !== null && B !== void 0 ? B : void 0),
          (N = h.size)
        var H = G - z
        if (
          ((R = Number.isNaN(H) ? 0 : H),
          (I = { x: j, y: o.y, width: N, height: o.height }),
          Math.abs(L) > 0 && Math.abs(R) < Math.abs(L))
        ) {
          var Q = at(R || L) * (Math.abs(L) - Math.abs(R))
          ;(M -= Q), (R += Q)
        }
      } else {
        var ne = [a.scale(C[0]), a.scale(C[1])],
          he = ne[0],
          Ge = ne[1]
        if (
          ((j = he),
          (M = Ym({
            axis: o,
            ticks: c,
            bandSize: i,
            offset: h.offset,
            entry: T,
            index: k,
          })),
          (N = Ge - he),
          (R = h.size),
          (I = { x: a.x, y: M, width: a.width, height: R }),
          Math.abs(L) > 0 && Math.abs(N) < Math.abs(L))
        ) {
          var je = at(N || L) * (Math.abs(L) - Math.abs(N))
          N += je
        }
      }
      return Ie(
        Ie(
          Ie({}, T),
          {},
          {
            x: j,
            y: M,
            width: N,
            height: R,
            value: u ? C : C[1],
            payload: T,
            background: I,
          },
          P && P[k] && P[k].props,
        ),
        {},
        {
          tooltipPayload: [IO(r, T)],
          tooltipPosition: { x: j + N / 2, y: M + R / 2 },
        },
      )
    })
  return Ie({ data: $, layout: y }, d)
})
function Lo(e) {
  '@babel/helpers - typeof'
  return (
    (Lo =
      typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
        ? function (t) {
            return typeof t
          }
        : function (t) {
            return t &&
              typeof Symbol == 'function' &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? 'symbol'
              : typeof t
          }),
    Lo(e)
  )
}
function nK(e, t) {
  if (!(e instanceof t))
    throw new TypeError('Cannot call a class as a function')
}
function c0(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r]
    ;(n.enumerable = n.enumerable || !1),
      (n.configurable = !0),
      'value' in n && (n.writable = !0),
      Object.defineProperty(e, dS(n.key), n)
  }
}
function iK(e, t, r) {
  return (
    t && c0(e.prototype, t),
    r && c0(e, r),
    Object.defineProperty(e, 'prototype', { writable: !1 }),
    e
  )
}
function u0(e, t) {
  var r = Object.keys(e)
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e)
    t &&
      (n = n.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable
      })),
      r.push.apply(r, n)
  }
  return r
}
function Wt(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {}
    t % 2
      ? u0(Object(r), !0).forEach(function (n) {
          Xu(e, n, r[n])
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
        : u0(Object(r)).forEach(function (n) {
            Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
          })
  }
  return e
}
function Xu(e, t, r) {
  return (
    (t = dS(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  )
}
function dS(e) {
  var t = aK(e, 'string')
  return Lo(t) == 'symbol' ? t : t + ''
}
function aK(e, t) {
  if (Lo(e) != 'object' || !e) return e
  var r = e[Symbol.toPrimitive]
  if (r !== void 0) {
    var n = r.call(e, t || 'default')
    if (Lo(n) != 'object') return n
    throw new TypeError('@@toPrimitive must return a primitive value.')
  }
  return (t === 'string' ? String : Number)(e)
}
var hS = function (t, r, n, i, a) {
    var o = t.width,
      s = t.height,
      c = t.layout,
      u = t.children,
      l = Object.keys(r),
      f = {
        left: n.left,
        leftMirror: n.left,
        right: o - n.right,
        rightMirror: o - n.right,
        top: n.top,
        topMirror: n.top,
        bottom: s - n.bottom,
        bottomMirror: s - n.bottom,
      },
      d = !!mt(u, Vn)
    return l.reduce(function (h, y) {
      var v = r[y],
        p = v.orientation,
        x = v.domain,
        b = v.padding,
        w = b === void 0 ? {} : b,
        g = v.mirror,
        m = v.reversed,
        S = ''.concat(p).concat(g ? 'Mirror' : ''),
        P,
        $,
        T,
        k,
        C
      if (
        v.type === 'number' &&
        (v.padding === 'gap' || v.padding === 'no-gap')
      ) {
        var j = x[1] - x[0],
          M = 1 / 0,
          N = v.categoricalDomain.sort()
        if (
          (N.forEach(function (ne, he) {
            he > 0 && (M = Math.min((ne || 0) - (N[he - 1] || 0), M))
          }),
          Number.isFinite(M))
        ) {
          var R = M / j,
            I = v.layout === 'vertical' ? n.height : n.width
          if (
            (v.padding === 'gap' && (P = (R * I) / 2), v.padding === 'no-gap')
          ) {
            var L = ot(t.barCategoryGap, R * I),
              B = (R * I) / 2
            P = B - L - ((B - L) / I) * L
          }
        }
      }
      i === 'xAxis'
        ? ($ = [
            n.left + (w.left || 0) + (P || 0),
            n.left + n.width - (w.right || 0) - (P || 0),
          ])
        : i === 'yAxis'
          ? ($ =
              c === 'horizontal'
                ? [n.top + n.height - (w.bottom || 0), n.top + (w.top || 0)]
                : [
                    n.top + (w.top || 0) + (P || 0),
                    n.top + n.height - (w.bottom || 0) - (P || 0),
                  ])
          : ($ = v.range),
        m && ($ = [$[1], $[0]])
      var W = TO(v, a, d),
        G = W.scale,
        z = W.realScaleType
      G.domain(x).range($), kO(G)
      var H = MO(G, Wt(Wt({}, v), {}, { realScaleType: z }))
      i === 'xAxis'
        ? ((C = (p === 'top' && !g) || (p === 'bottom' && g)),
          (T = n.left),
          (k = f[S] - C * v.height))
        : i === 'yAxis' &&
          ((C = (p === 'left' && !g) || (p === 'right' && g)),
          (T = f[S] - C * v.width),
          (k = n.top))
      var Q = Wt(
        Wt(Wt({}, v), H),
        {},
        {
          realScaleType: z,
          x: T,
          y: k,
          scale: G,
          width: i === 'xAxis' ? n.width : v.width,
          height: i === 'yAxis' ? n.height : v.height,
        },
      )
      return (
        (Q.bandSize = Oc(Q, H)),
        !v.hide && i === 'xAxis'
          ? (f[S] += (C ? -1 : 1) * Q.height)
          : v.hide || (f[S] += (C ? -1 : 1) * Q.width),
        Wt(Wt({}, h), {}, Xu({}, y, Q))
      )
    }, {})
  },
  pS = function (t, r) {
    var n = t.x,
      i = t.y,
      a = r.x,
      o = r.y
    return {
      x: Math.min(n, a),
      y: Math.min(i, o),
      width: Math.abs(a - n),
      height: Math.abs(o - i),
    }
  },
  oK = function (t) {
    var r = t.x1,
      n = t.y1,
      i = t.x2,
      a = t.y2
    return pS({ x: r, y: n }, { x: i, y: a })
  },
  vS = (function () {
    function e(t) {
      nK(this, e), (this.scale = t)
    }
    return iK(
      e,
      [
        {
          key: 'domain',
          get: function () {
            return this.scale.domain
          },
        },
        {
          key: 'range',
          get: function () {
            return this.scale.range
          },
        },
        {
          key: 'rangeMin',
          get: function () {
            return this.range()[0]
          },
        },
        {
          key: 'rangeMax',
          get: function () {
            return this.range()[1]
          },
        },
        {
          key: 'bandwidth',
          get: function () {
            return this.scale.bandwidth
          },
        },
        {
          key: 'apply',
          value: function (r) {
            var n =
                arguments.length > 1 && arguments[1] !== void 0
                  ? arguments[1]
                  : {},
              i = n.bandAware,
              a = n.position
            if (r !== void 0) {
              if (a)
                switch (a) {
                  case 'start':
                    return this.scale(r)
                  case 'middle': {
                    var o = this.bandwidth ? this.bandwidth() / 2 : 0
                    return this.scale(r) + o
                  }
                  case 'end': {
                    var s = this.bandwidth ? this.bandwidth() : 0
                    return this.scale(r) + s
                  }
                  default:
                    return this.scale(r)
                }
              if (i) {
                var c = this.bandwidth ? this.bandwidth() / 2 : 0
                return this.scale(r) + c
              }
              return this.scale(r)
            }
          },
        },
        {
          key: 'isInRange',
          value: function (r) {
            var n = this.range(),
              i = n[0],
              a = n[n.length - 1]
            return i <= a ? r >= i && r <= a : r >= a && r <= i
          },
        },
      ],
      [
        {
          key: 'create',
          value: function (r) {
            return new e(r)
          },
        },
      ],
    )
  })()
Xu(vS, 'EPS', 1e-4)
var Sp = function (t) {
  var r = Object.keys(t).reduce(function (n, i) {
    return Wt(Wt({}, n), {}, Xu({}, i, vS.create(t[i])))
  }, {})
  return Wt(
    Wt({}, r),
    {},
    {
      apply: function (i) {
        var a =
            arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
          o = a.bandAware,
          s = a.position
        return $z(i, function (c, u) {
          return r[u].apply(c, { bandAware: o, position: s })
        })
      },
      isInRange: function (i) {
        return cS(i, function (a, o) {
          return r[o].isInRange(a)
        })
      },
    },
  )
}
function sK(e) {
  return ((e % 180) + 180) % 180
}
var cK = function (t) {
    var r = t.width,
      n = t.height,
      i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0,
      a = sK(i),
      o = (a * Math.PI) / 180,
      s = Math.atan(n / r),
      c = o > s && o < Math.PI - s ? n / Math.sin(o) : r / Math.cos(o)
    return Math.abs(c)
  },
  uK = fr,
  lK = es,
  fK = Eu
function dK(e) {
  return function (t, r, n) {
    var i = Object(t)
    if (!lK(t)) {
      var a = uK(r)
      ;(t = fK(t)),
        (r = function (s) {
          return a(i[s], s, i)
        })
    }
    var o = e(t, r, n)
    return o > -1 ? i[a ? t[o] : o] : void 0
  }
}
var hK = dK,
  pK = iS
function vK(e) {
  var t = pK(e),
    r = t % 1
  return t === t ? (r ? t - r : t) : 0
}
var yK = vK,
  mK = fw,
  gK = fr,
  bK = yK,
  xK = Math.max
function wK(e, t, r) {
  var n = e == null ? 0 : e.length
  if (!n) return -1
  var i = r == null ? 0 : bK(r)
  return i < 0 && (i = xK(n + i, 0)), mK(e, gK(t), i)
}
var OK = wK,
  SK = hK,
  AK = OK,
  PK = SK(AK),
  $K = PK
const EK = me($K)
var _K = Lj(
    function (e) {
      return { x: e.left, y: e.top, width: e.width, height: e.height }
    },
    function (e) {
      return ['l', e.left, 't', e.top, 'w', e.width, 'h', e.height].join('')
    },
  ),
  Ap = A.createContext(void 0),
  Pp = A.createContext(void 0),
  yS = A.createContext(void 0),
  mS = A.createContext({}),
  gS = A.createContext(void 0),
  bS = A.createContext(0),
  xS = A.createContext(0),
  l0 = function (t) {
    var r = t.state,
      n = r.xAxisMap,
      i = r.yAxisMap,
      a = r.offset,
      o = t.clipPathId,
      s = t.children,
      c = t.width,
      u = t.height,
      l = _K(a)
    return E.createElement(
      Ap.Provider,
      { value: n },
      E.createElement(
        Pp.Provider,
        { value: i },
        E.createElement(
          mS.Provider,
          { value: a },
          E.createElement(
            yS.Provider,
            { value: l },
            E.createElement(
              gS.Provider,
              { value: o },
              E.createElement(
                bS.Provider,
                { value: u },
                E.createElement(xS.Provider, { value: c }, s),
              ),
            ),
          ),
        ),
      ),
    )
  },
  CK = function () {
    return A.useContext(gS)
  },
  wS = function (t) {
    var r = A.useContext(Ap)
    r == null && Un()
    var n = r[t]
    return n == null && Un(), n
  },
  jK = function () {
    var t = A.useContext(Ap)
    return Wr(t)
  },
  TK = function () {
    var t = A.useContext(Pp),
      r = EK(t, function (n) {
        return cS(n.domain, Number.isFinite)
      })
    return r || Wr(t)
  },
  OS = function (t) {
    var r = A.useContext(Pp)
    r == null && Un()
    var n = r[t]
    return n == null && Un(), n
  },
  kK = function () {
    var t = A.useContext(yS)
    return t
  },
  MK = function () {
    return A.useContext(mS)
  },
  $p = function () {
    return A.useContext(xS)
  },
  Ep = function () {
    return A.useContext(bS)
  }
function Qi(e) {
  '@babel/helpers - typeof'
  return (
    (Qi =
      typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
        ? function (t) {
            return typeof t
          }
        : function (t) {
            return t &&
              typeof Symbol == 'function' &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? 'symbol'
              : typeof t
          }),
    Qi(e)
  )
}
function NK(e, t) {
  if (!(e instanceof t))
    throw new TypeError('Cannot call a class as a function')
}
function IK(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r]
    ;(n.enumerable = n.enumerable || !1),
      (n.configurable = !0),
      'value' in n && (n.writable = !0),
      Object.defineProperty(e, AS(n.key), n)
  }
}
function RK(e, t, r) {
  return (
    t && IK(e.prototype, t),
    Object.defineProperty(e, 'prototype', { writable: !1 }),
    e
  )
}
function DK(e, t, r) {
  return (
    (t = Fc(t)),
    LK(
      e,
      SS() ? Reflect.construct(t, r || [], Fc(e).constructor) : t.apply(e, r),
    )
  )
}
function LK(e, t) {
  if (t && (Qi(t) === 'object' || typeof t == 'function')) return t
  if (t !== void 0)
    throw new TypeError(
      'Derived constructors may only return object or undefined',
    )
  return BK(e)
}
function BK(e) {
  if (e === void 0)
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called",
    )
  return e
}
function SS() {
  try {
    var e = !Boolean.prototype.valueOf.call(
      Reflect.construct(Boolean, [], function () {}),
    )
  } catch {}
  return (SS = function () {
    return !!e
  })()
}
function Fc(e) {
  return (
    (Fc = Object.setPrototypeOf
      ? Object.getPrototypeOf.bind()
      : function (r) {
          return r.__proto__ || Object.getPrototypeOf(r)
        }),
    Fc(e)
  )
}
function FK(e, t) {
  if (typeof t != 'function' && t !== null)
    throw new TypeError('Super expression must either be null or a function')
  ;(e.prototype = Object.create(t && t.prototype, {
    constructor: { value: e, writable: !0, configurable: !0 },
  })),
    Object.defineProperty(e, 'prototype', { writable: !1 }),
    t && Ed(e, t)
}
function Ed(e, t) {
  return (
    (Ed = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (n, i) {
          return (n.__proto__ = i), n
        }),
    Ed(e, t)
  )
}
function f0(e, t) {
  var r = Object.keys(e)
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e)
    t &&
      (n = n.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable
      })),
      r.push.apply(r, n)
  }
  return r
}
function d0(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {}
    t % 2
      ? f0(Object(r), !0).forEach(function (n) {
          _p(e, n, r[n])
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
        : f0(Object(r)).forEach(function (n) {
            Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
          })
  }
  return e
}
function _p(e, t, r) {
  return (
    (t = AS(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  )
}
function AS(e) {
  var t = UK(e, 'string')
  return Qi(t) == 'symbol' ? t : t + ''
}
function UK(e, t) {
  if (Qi(e) != 'object' || !e) return e
  var r = e[Symbol.toPrimitive]
  if (r !== void 0) {
    var n = r.call(e, t || 'default')
    if (Qi(n) != 'object') return n
    throw new TypeError('@@toPrimitive must return a primitive value.')
  }
  return (t === 'string' ? String : Number)(e)
}
function WK(e, t) {
  return KK(e) || zK(e, t) || HK(e, t) || qK()
}
function qK() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}
function HK(e, t) {
  if (e) {
    if (typeof e == 'string') return h0(e, t)
    var r = Object.prototype.toString.call(e).slice(8, -1)
    if (
      (r === 'Object' && e.constructor && (r = e.constructor.name),
      r === 'Map' || r === 'Set')
    )
      return Array.from(e)
    if (r === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
      return h0(e, t)
  }
}
function h0(e, t) {
  ;(t == null || t > e.length) && (t = e.length)
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r]
  return n
}
function zK(e, t) {
  var r =
    e == null
      ? null
      : (typeof Symbol < 'u' && e[Symbol.iterator]) || e['@@iterator']
  if (r != null) {
    var n,
      i,
      a,
      o,
      s = [],
      c = !0,
      u = !1
    try {
      if (((a = (r = r.call(e)).next), t !== 0))
        for (
          ;
          !(c = (n = a.call(r)).done) && (s.push(n.value), s.length !== t);
          c = !0
        );
    } catch (l) {
      ;(u = !0), (i = l)
    } finally {
      try {
        if (!c && r.return != null && ((o = r.return()), Object(o) !== o))
          return
      } finally {
        if (u) throw i
      }
    }
    return s
  }
}
function KK(e) {
  if (Array.isArray(e)) return e
}
function _d() {
  return (
    (_d = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t]
            for (var n in r)
              Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
          }
          return e
        }),
    _d.apply(this, arguments)
  )
}
var GK = function (t, r) {
    var n
    return (
      E.isValidElement(t)
        ? (n = E.cloneElement(t, r))
        : ie(t)
          ? (n = t(r))
          : (n = E.createElement(
              'line',
              _d({}, r, { className: 'recharts-reference-line-line' }),
            )),
      n
    )
  },
  VK = function (t, r, n, i, a, o, s, c, u) {
    var l = a.x,
      f = a.y,
      d = a.width,
      h = a.height
    if (n) {
      var y = u.y,
        v = t.y.apply(y, { position: o })
      if (ar(u, 'discard') && !t.y.isInRange(v)) return null
      var p = [
        { x: l + d, y: v },
        { x: l, y: v },
      ]
      return c === 'left' ? p.reverse() : p
    }
    if (r) {
      var x = u.x,
        b = t.x.apply(x, { position: o })
      if (ar(u, 'discard') && !t.x.isInRange(b)) return null
      var w = [
        { x: b, y: f + h },
        { x: b, y: f },
      ]
      return s === 'top' ? w.reverse() : w
    }
    if (i) {
      var g = u.segment,
        m = g.map(function (S) {
          return t.apply(S, { position: o })
        })
      return ar(u, 'discard') &&
        gz(m, function (S) {
          return !t.isInRange(S)
        })
        ? null
        : m
    }
    return null
  }
function XK(e) {
  var t = e.x,
    r = e.y,
    n = e.segment,
    i = e.xAxisId,
    a = e.yAxisId,
    o = e.shape,
    s = e.className,
    c = e.alwaysShow,
    u = CK(),
    l = wS(i),
    f = OS(a),
    d = kK()
  if (!u || !d) return null
  Gt(
    c === void 0,
    'The alwaysShow prop is deprecated. Please use ifOverflow="extendDomain" instead.',
  )
  var h = Sp({ x: l.scale, y: f.scale }),
    y = We(t),
    v = We(r),
    p = n && n.length === 2,
    x = VK(h, y, v, p, d, e.position, l.orientation, f.orientation, e)
  if (!x) return null
  var b = WK(x, 2),
    w = b[0],
    g = w.x,
    m = w.y,
    S = b[1],
    P = S.x,
    $ = S.y,
    T = ar(e, 'hidden') ? 'url(#'.concat(u, ')') : void 0,
    k = d0(d0({ clipPath: T }, J(e, !0)), {}, { x1: g, y1: m, x2: P, y2: $ })
  return E.createElement(
    pe,
    { className: ue('recharts-reference-line', s) },
    GK(o, k),
    ze.renderCallByParent(e, oK({ x1: g, y1: m, x2: P, y2: $ })),
  )
}
var Cp = (function (e) {
  function t() {
    return NK(this, t), DK(this, t, arguments)
  }
  return (
    FK(t, e),
    RK(t, [
      {
        key: 'render',
        value: function () {
          return E.createElement(XK, this.props)
        },
      },
    ])
  )
})(E.Component)
_p(Cp, 'displayName', 'ReferenceLine')
_p(Cp, 'defaultProps', {
  isFront: !1,
  ifOverflow: 'discard',
  xAxisId: 0,
  yAxisId: 0,
  fill: 'none',
  stroke: '#ccc',
  fillOpacity: 1,
  strokeWidth: 1,
  position: 'middle',
})
function Cd() {
  return (
    (Cd = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t]
            for (var n in r)
              Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
          }
          return e
        }),
    Cd.apply(this, arguments)
  )
}
function Zi(e) {
  '@babel/helpers - typeof'
  return (
    (Zi =
      typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
        ? function (t) {
            return typeof t
          }
        : function (t) {
            return t &&
              typeof Symbol == 'function' &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? 'symbol'
              : typeof t
          }),
    Zi(e)
  )
}
function p0(e, t) {
  var r = Object.keys(e)
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e)
    t &&
      (n = n.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable
      })),
      r.push.apply(r, n)
  }
  return r
}
function v0(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {}
    t % 2
      ? p0(Object(r), !0).forEach(function (n) {
          Yu(e, n, r[n])
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
        : p0(Object(r)).forEach(function (n) {
            Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
          })
  }
  return e
}
function YK(e, t) {
  if (!(e instanceof t))
    throw new TypeError('Cannot call a class as a function')
}
function QK(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r]
    ;(n.enumerable = n.enumerable || !1),
      (n.configurable = !0),
      'value' in n && (n.writable = !0),
      Object.defineProperty(e, $S(n.key), n)
  }
}
function ZK(e, t, r) {
  return (
    t && QK(e.prototype, t),
    Object.defineProperty(e, 'prototype', { writable: !1 }),
    e
  )
}
function JK(e, t, r) {
  return (
    (t = Uc(t)),
    eG(
      e,
      PS() ? Reflect.construct(t, r || [], Uc(e).constructor) : t.apply(e, r),
    )
  )
}
function eG(e, t) {
  if (t && (Zi(t) === 'object' || typeof t == 'function')) return t
  if (t !== void 0)
    throw new TypeError(
      'Derived constructors may only return object or undefined',
    )
  return tG(e)
}
function tG(e) {
  if (e === void 0)
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called",
    )
  return e
}
function PS() {
  try {
    var e = !Boolean.prototype.valueOf.call(
      Reflect.construct(Boolean, [], function () {}),
    )
  } catch {}
  return (PS = function () {
    return !!e
  })()
}
function Uc(e) {
  return (
    (Uc = Object.setPrototypeOf
      ? Object.getPrototypeOf.bind()
      : function (r) {
          return r.__proto__ || Object.getPrototypeOf(r)
        }),
    Uc(e)
  )
}
function rG(e, t) {
  if (typeof t != 'function' && t !== null)
    throw new TypeError('Super expression must either be null or a function')
  ;(e.prototype = Object.create(t && t.prototype, {
    constructor: { value: e, writable: !0, configurable: !0 },
  })),
    Object.defineProperty(e, 'prototype', { writable: !1 }),
    t && jd(e, t)
}
function jd(e, t) {
  return (
    (jd = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (n, i) {
          return (n.__proto__ = i), n
        }),
    jd(e, t)
  )
}
function Yu(e, t, r) {
  return (
    (t = $S(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  )
}
function $S(e) {
  var t = nG(e, 'string')
  return Zi(t) == 'symbol' ? t : t + ''
}
function nG(e, t) {
  if (Zi(e) != 'object' || !e) return e
  var r = e[Symbol.toPrimitive]
  if (r !== void 0) {
    var n = r.call(e, t || 'default')
    if (Zi(n) != 'object') return n
    throw new TypeError('@@toPrimitive must return a primitive value.')
  }
  return (t === 'string' ? String : Number)(e)
}
var iG = function (t) {
    var r = t.x,
      n = t.y,
      i = t.xAxis,
      a = t.yAxis,
      o = Sp({ x: i.scale, y: a.scale }),
      s = o.apply({ x: r, y: n }, { bandAware: !0 })
    return ar(t, 'discard') && !o.isInRange(s) ? null : s
  },
  Qu = (function (e) {
    function t() {
      return YK(this, t), JK(this, t, arguments)
    }
    return (
      rG(t, e),
      ZK(t, [
        {
          key: 'render',
          value: function () {
            var n = this.props,
              i = n.x,
              a = n.y,
              o = n.r,
              s = n.alwaysShow,
              c = n.clipPathId,
              u = We(i),
              l = We(a)
            if (
              (Gt(
                s === void 0,
                'The alwaysShow prop is deprecated. Please use ifOverflow="extendDomain" instead.',
              ),
              !u || !l)
            )
              return null
            var f = iG(this.props)
            if (!f) return null
            var d = f.x,
              h = f.y,
              y = this.props,
              v = y.shape,
              p = y.className,
              x = ar(this.props, 'hidden') ? 'url(#'.concat(c, ')') : void 0,
              b = v0(
                v0({ clipPath: x }, J(this.props, !0)),
                {},
                { cx: d, cy: h },
              )
            return E.createElement(
              pe,
              { className: ue('recharts-reference-dot', p) },
              t.renderDot(v, b),
              ze.renderCallByParent(this.props, {
                x: d - o,
                y: h - o,
                width: 2 * o,
                height: 2 * o,
              }),
            )
          },
        },
      ])
    )
  })(E.Component)
Yu(Qu, 'displayName', 'ReferenceDot')
Yu(Qu, 'defaultProps', {
  isFront: !1,
  ifOverflow: 'discard',
  xAxisId: 0,
  yAxisId: 0,
  r: 10,
  fill: '#fff',
  stroke: '#ccc',
  fillOpacity: 1,
  strokeWidth: 1,
})
Yu(Qu, 'renderDot', function (e, t) {
  var r
  return (
    E.isValidElement(e)
      ? (r = E.cloneElement(e, t))
      : ie(e)
        ? (r = e(t))
        : (r = E.createElement(
            Wu,
            Cd({}, t, {
              cx: t.cx,
              cy: t.cy,
              className: 'recharts-reference-dot-dot',
            }),
          )),
    r
  )
})
function Td() {
  return (
    (Td = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t]
            for (var n in r)
              Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
          }
          return e
        }),
    Td.apply(this, arguments)
  )
}
function Ji(e) {
  '@babel/helpers - typeof'
  return (
    (Ji =
      typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
        ? function (t) {
            return typeof t
          }
        : function (t) {
            return t &&
              typeof Symbol == 'function' &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? 'symbol'
              : typeof t
          }),
    Ji(e)
  )
}
function y0(e, t) {
  var r = Object.keys(e)
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e)
    t &&
      (n = n.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable
      })),
      r.push.apply(r, n)
  }
  return r
}
function m0(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {}
    t % 2
      ? y0(Object(r), !0).forEach(function (n) {
          Zu(e, n, r[n])
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
        : y0(Object(r)).forEach(function (n) {
            Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
          })
  }
  return e
}
function aG(e, t) {
  if (!(e instanceof t))
    throw new TypeError('Cannot call a class as a function')
}
function oG(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r]
    ;(n.enumerable = n.enumerable || !1),
      (n.configurable = !0),
      'value' in n && (n.writable = !0),
      Object.defineProperty(e, _S(n.key), n)
  }
}
function sG(e, t, r) {
  return (
    t && oG(e.prototype, t),
    Object.defineProperty(e, 'prototype', { writable: !1 }),
    e
  )
}
function cG(e, t, r) {
  return (
    (t = Wc(t)),
    uG(
      e,
      ES() ? Reflect.construct(t, r || [], Wc(e).constructor) : t.apply(e, r),
    )
  )
}
function uG(e, t) {
  if (t && (Ji(t) === 'object' || typeof t == 'function')) return t
  if (t !== void 0)
    throw new TypeError(
      'Derived constructors may only return object or undefined',
    )
  return lG(e)
}
function lG(e) {
  if (e === void 0)
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called",
    )
  return e
}
function ES() {
  try {
    var e = !Boolean.prototype.valueOf.call(
      Reflect.construct(Boolean, [], function () {}),
    )
  } catch {}
  return (ES = function () {
    return !!e
  })()
}
function Wc(e) {
  return (
    (Wc = Object.setPrototypeOf
      ? Object.getPrototypeOf.bind()
      : function (r) {
          return r.__proto__ || Object.getPrototypeOf(r)
        }),
    Wc(e)
  )
}
function fG(e, t) {
  if (typeof t != 'function' && t !== null)
    throw new TypeError('Super expression must either be null or a function')
  ;(e.prototype = Object.create(t && t.prototype, {
    constructor: { value: e, writable: !0, configurable: !0 },
  })),
    Object.defineProperty(e, 'prototype', { writable: !1 }),
    t && kd(e, t)
}
function kd(e, t) {
  return (
    (kd = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (n, i) {
          return (n.__proto__ = i), n
        }),
    kd(e, t)
  )
}
function Zu(e, t, r) {
  return (
    (t = _S(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  )
}
function _S(e) {
  var t = dG(e, 'string')
  return Ji(t) == 'symbol' ? t : t + ''
}
function dG(e, t) {
  if (Ji(e) != 'object' || !e) return e
  var r = e[Symbol.toPrimitive]
  if (r !== void 0) {
    var n = r.call(e, t || 'default')
    if (Ji(n) != 'object') return n
    throw new TypeError('@@toPrimitive must return a primitive value.')
  }
  return (t === 'string' ? String : Number)(e)
}
var hG = function (t, r, n, i, a) {
    var o = a.x1,
      s = a.x2,
      c = a.y1,
      u = a.y2,
      l = a.xAxis,
      f = a.yAxis
    if (!l || !f) return null
    var d = Sp({ x: l.scale, y: f.scale }),
      h = {
        x: t ? d.x.apply(o, { position: 'start' }) : d.x.rangeMin,
        y: n ? d.y.apply(c, { position: 'start' }) : d.y.rangeMin,
      },
      y = {
        x: r ? d.x.apply(s, { position: 'end' }) : d.x.rangeMax,
        y: i ? d.y.apply(u, { position: 'end' }) : d.y.rangeMax,
      }
    return ar(a, 'discard') && (!d.isInRange(h) || !d.isInRange(y))
      ? null
      : pS(h, y)
  },
  Ju = (function (e) {
    function t() {
      return aG(this, t), cG(this, t, arguments)
    }
    return (
      fG(t, e),
      sG(t, [
        {
          key: 'render',
          value: function () {
            var n = this.props,
              i = n.x1,
              a = n.x2,
              o = n.y1,
              s = n.y2,
              c = n.className,
              u = n.alwaysShow,
              l = n.clipPathId
            Gt(
              u === void 0,
              'The alwaysShow prop is deprecated. Please use ifOverflow="extendDomain" instead.',
            )
            var f = We(i),
              d = We(a),
              h = We(o),
              y = We(s),
              v = this.props.shape
            if (!f && !d && !h && !y && !v) return null
            var p = hG(f, d, h, y, this.props)
            if (!p && !v) return null
            var x = ar(this.props, 'hidden') ? 'url(#'.concat(l, ')') : void 0
            return E.createElement(
              pe,
              { className: ue('recharts-reference-area', c) },
              t.renderRect(v, m0(m0({ clipPath: x }, J(this.props, !0)), p)),
              ze.renderCallByParent(this.props, p),
            )
          },
        },
      ])
    )
  })(E.Component)
Zu(Ju, 'displayName', 'ReferenceArea')
Zu(Ju, 'defaultProps', {
  isFront: !1,
  ifOverflow: 'discard',
  xAxisId: 0,
  yAxisId: 0,
  r: 10,
  fill: '#ccc',
  fillOpacity: 0.5,
  stroke: 'none',
  strokeWidth: 1,
})
Zu(Ju, 'renderRect', function (e, t) {
  var r
  return (
    E.isValidElement(e)
      ? (r = E.cloneElement(e, t))
      : ie(e)
        ? (r = e(t))
        : (r = E.createElement(
            Op,
            Td({}, t, { className: 'recharts-reference-area-rect' }),
          )),
    r
  )
})
function CS(e, t, r) {
  if (t < 1) return []
  if (t === 1 && r === void 0) return e
  for (var n = [], i = 0; i < e.length; i += t) n.push(e[i])
  return n
}
function pG(e, t, r) {
  var n = { width: e.width + t.width, height: e.height + t.height }
  return cK(n, r)
}
function vG(e, t, r) {
  var n = r === 'width',
    i = e.x,
    a = e.y,
    o = e.width,
    s = e.height
  return t === 1
    ? { start: n ? i : a, end: n ? i + o : a + s }
    : { start: n ? i + o : a + s, end: n ? i : a }
}
function qc(e, t, r, n, i) {
  if (e * t < e * n || e * t > e * i) return !1
  var a = r()
  return e * (t - (e * a) / 2 - n) >= 0 && e * (t + (e * a) / 2 - i) <= 0
}
function yG(e, t) {
  return CS(e, t + 1)
}
function mG(e, t, r, n, i) {
  for (
    var a = (n || []).slice(),
      o = t.start,
      s = t.end,
      c = 0,
      u = 1,
      l = o,
      f = function () {
        var y = n == null ? void 0 : n[c]
        if (y === void 0) return { v: CS(n, u) }
        var v = c,
          p,
          x = function () {
            return p === void 0 && (p = r(y, v)), p
          },
          b = y.coordinate,
          w = c === 0 || qc(e, b, x, l, s)
        w || ((c = 0), (l = o), (u += 1)),
          w && ((l = b + e * (x() / 2 + i)), (c += u))
      },
      d;
    u <= a.length;

  )
    if (((d = f()), d)) return d.v
  return []
}
function Bo(e) {
  '@babel/helpers - typeof'
  return (
    (Bo =
      typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
        ? function (t) {
            return typeof t
          }
        : function (t) {
            return t &&
              typeof Symbol == 'function' &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? 'symbol'
              : typeof t
          }),
    Bo(e)
  )
}
function g0(e, t) {
  var r = Object.keys(e)
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e)
    t &&
      (n = n.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable
      })),
      r.push.apply(r, n)
  }
  return r
}
function Qe(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {}
    t % 2
      ? g0(Object(r), !0).forEach(function (n) {
          gG(e, n, r[n])
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
        : g0(Object(r)).forEach(function (n) {
            Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
          })
  }
  return e
}
function gG(e, t, r) {
  return (
    (t = bG(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  )
}
function bG(e) {
  var t = xG(e, 'string')
  return Bo(t) == 'symbol' ? t : t + ''
}
function xG(e, t) {
  if (Bo(e) != 'object' || !e) return e
  var r = e[Symbol.toPrimitive]
  if (r !== void 0) {
    var n = r.call(e, t || 'default')
    if (Bo(n) != 'object') return n
    throw new TypeError('@@toPrimitive must return a primitive value.')
  }
  return (t === 'string' ? String : Number)(e)
}
function wG(e, t, r, n, i) {
  for (
    var a = (n || []).slice(),
      o = a.length,
      s = t.start,
      c = t.end,
      u = function (d) {
        var h = a[d],
          y,
          v = function () {
            return y === void 0 && (y = r(h, d)), y
          }
        if (d === o - 1) {
          var p = e * (h.coordinate + (e * v()) / 2 - c)
          a[d] = h = Qe(
            Qe({}, h),
            {},
            { tickCoord: p > 0 ? h.coordinate - p * e : h.coordinate },
          )
        } else a[d] = h = Qe(Qe({}, h), {}, { tickCoord: h.coordinate })
        var x = qc(e, h.tickCoord, v, s, c)
        x &&
          ((c = h.tickCoord - e * (v() / 2 + i)),
          (a[d] = Qe(Qe({}, h), {}, { isShow: !0 })))
      },
      l = o - 1;
    l >= 0;
    l--
  )
    u(l)
  return a
}
function OG(e, t, r, n, i, a) {
  var o = (n || []).slice(),
    s = o.length,
    c = t.start,
    u = t.end
  if (a) {
    var l = n[s - 1],
      f = r(l, s - 1),
      d = e * (l.coordinate + (e * f) / 2 - u)
    o[s - 1] = l = Qe(
      Qe({}, l),
      {},
      { tickCoord: d > 0 ? l.coordinate - d * e : l.coordinate },
    )
    var h = qc(
      e,
      l.tickCoord,
      function () {
        return f
      },
      c,
      u,
    )
    h &&
      ((u = l.tickCoord - e * (f / 2 + i)),
      (o[s - 1] = Qe(Qe({}, l), {}, { isShow: !0 })))
  }
  for (
    var y = a ? s - 1 : s,
      v = function (b) {
        var w = o[b],
          g,
          m = function () {
            return g === void 0 && (g = r(w, b)), g
          }
        if (b === 0) {
          var S = e * (w.coordinate - (e * m()) / 2 - c)
          o[b] = w = Qe(
            Qe({}, w),
            {},
            { tickCoord: S < 0 ? w.coordinate - S * e : w.coordinate },
          )
        } else o[b] = w = Qe(Qe({}, w), {}, { tickCoord: w.coordinate })
        var P = qc(e, w.tickCoord, m, c, u)
        P &&
          ((c = w.tickCoord + e * (m() / 2 + i)),
          (o[b] = Qe(Qe({}, w), {}, { isShow: !0 })))
      },
      p = 0;
    p < y;
    p++
  )
    v(p)
  return o
}
function jp(e, t, r) {
  var n = e.tick,
    i = e.ticks,
    a = e.viewBox,
    o = e.minTickGap,
    s = e.orientation,
    c = e.interval,
    u = e.tickFormatter,
    l = e.unit,
    f = e.angle
  if (!i || !i.length || !n) return []
  if (U(c) || nr.isSsr) return yG(i, typeof c == 'number' && U(c) ? c : 0)
  var d = [],
    h = s === 'top' || s === 'bottom' ? 'width' : 'height',
    y =
      l && h === 'width'
        ? Va(l, { fontSize: t, letterSpacing: r })
        : { width: 0, height: 0 },
    v = function (w, g) {
      var m = ie(u) ? u(w.value, g) : w.value
      return h === 'width'
        ? pG(Va(m, { fontSize: t, letterSpacing: r }), y, f)
        : Va(m, { fontSize: t, letterSpacing: r })[h]
    },
    p = i.length >= 2 ? at(i[1].coordinate - i[0].coordinate) : 1,
    x = vG(a, p, h)
  return c === 'equidistantPreserveStart'
    ? mG(p, x, v, i, o)
    : (c === 'preserveStart' || c === 'preserveStartEnd'
        ? (d = OG(p, x, v, i, o, c === 'preserveStartEnd'))
        : (d = wG(p, x, v, i, o)),
      d.filter(function (b) {
        return b.isShow
      }))
}
var SG = ['viewBox'],
  AG = ['viewBox'],
  PG = ['ticks']
function ea(e) {
  '@babel/helpers - typeof'
  return (
    (ea =
      typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
        ? function (t) {
            return typeof t
          }
        : function (t) {
            return t &&
              typeof Symbol == 'function' &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? 'symbol'
              : typeof t
          }),
    ea(e)
  )
}
function ui() {
  return (
    (ui = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t]
            for (var n in r)
              Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
          }
          return e
        }),
    ui.apply(this, arguments)
  )
}
function b0(e, t) {
  var r = Object.keys(e)
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e)
    t &&
      (n = n.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable
      })),
      r.push.apply(r, n)
  }
  return r
}
function tt(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {}
    t % 2
      ? b0(Object(r), !0).forEach(function (n) {
          Tp(e, n, r[n])
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
        : b0(Object(r)).forEach(function (n) {
            Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
          })
  }
  return e
}
function Rl(e, t) {
  if (e == null) return {}
  var r = $G(e, t),
    n,
    i
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e)
    for (i = 0; i < a.length; i++)
      (n = a[i]),
        !(t.indexOf(n) >= 0) &&
          Object.prototype.propertyIsEnumerable.call(e, n) &&
          (r[n] = e[n])
  }
  return r
}
function $G(e, t) {
  if (e == null) return {}
  var r = {}
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue
      r[n] = e[n]
    }
  return r
}
function EG(e, t) {
  if (!(e instanceof t))
    throw new TypeError('Cannot call a class as a function')
}
function x0(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r]
    ;(n.enumerable = n.enumerable || !1),
      (n.configurable = !0),
      'value' in n && (n.writable = !0),
      Object.defineProperty(e, TS(n.key), n)
  }
}
function _G(e, t, r) {
  return (
    t && x0(e.prototype, t),
    r && x0(e, r),
    Object.defineProperty(e, 'prototype', { writable: !1 }),
    e
  )
}
function CG(e, t, r) {
  return (
    (t = Hc(t)),
    jG(
      e,
      jS() ? Reflect.construct(t, r || [], Hc(e).constructor) : t.apply(e, r),
    )
  )
}
function jG(e, t) {
  if (t && (ea(t) === 'object' || typeof t == 'function')) return t
  if (t !== void 0)
    throw new TypeError(
      'Derived constructors may only return object or undefined',
    )
  return TG(e)
}
function TG(e) {
  if (e === void 0)
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called",
    )
  return e
}
function jS() {
  try {
    var e = !Boolean.prototype.valueOf.call(
      Reflect.construct(Boolean, [], function () {}),
    )
  } catch {}
  return (jS = function () {
    return !!e
  })()
}
function Hc(e) {
  return (
    (Hc = Object.setPrototypeOf
      ? Object.getPrototypeOf.bind()
      : function (r) {
          return r.__proto__ || Object.getPrototypeOf(r)
        }),
    Hc(e)
  )
}
function kG(e, t) {
  if (typeof t != 'function' && t !== null)
    throw new TypeError('Super expression must either be null or a function')
  ;(e.prototype = Object.create(t && t.prototype, {
    constructor: { value: e, writable: !0, configurable: !0 },
  })),
    Object.defineProperty(e, 'prototype', { writable: !1 }),
    t && Md(e, t)
}
function Md(e, t) {
  return (
    (Md = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (n, i) {
          return (n.__proto__ = i), n
        }),
    Md(e, t)
  )
}
function Tp(e, t, r) {
  return (
    (t = TS(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  )
}
function TS(e) {
  var t = MG(e, 'string')
  return ea(t) == 'symbol' ? t : t + ''
}
function MG(e, t) {
  if (ea(e) != 'object' || !e) return e
  var r = e[Symbol.toPrimitive]
  if (r !== void 0) {
    var n = r.call(e, t || 'default')
    if (ea(n) != 'object') return n
    throw new TypeError('@@toPrimitive must return a primitive value.')
  }
  return (t === 'string' ? String : Number)(e)
}
var Pa = (function (e) {
  function t(r) {
    var n
    return (
      EG(this, t),
      (n = CG(this, t, [r])),
      (n.state = { fontSize: '', letterSpacing: '' }),
      n
    )
  }
  return (
    kG(t, e),
    _G(
      t,
      [
        {
          key: 'shouldComponentUpdate',
          value: function (n, i) {
            var a = n.viewBox,
              o = Rl(n, SG),
              s = this.props,
              c = s.viewBox,
              u = Rl(s, AG)
            return !fi(a, c) || !fi(o, u) || !fi(i, this.state)
          },
        },
        {
          key: 'componentDidMount',
          value: function () {
            var n = this.layerReference
            if (n) {
              var i = n.getElementsByClassName(
                'recharts-cartesian-axis-tick-value',
              )[0]
              i &&
                this.setState({
                  fontSize: window.getComputedStyle(i).fontSize,
                  letterSpacing: window.getComputedStyle(i).letterSpacing,
                })
            }
          },
        },
        {
          key: 'getTickLineCoord',
          value: function (n) {
            var i = this.props,
              a = i.x,
              o = i.y,
              s = i.width,
              c = i.height,
              u = i.orientation,
              l = i.tickSize,
              f = i.mirror,
              d = i.tickMargin,
              h,
              y,
              v,
              p,
              x,
              b,
              w = f ? -1 : 1,
              g = n.tickSize || l,
              m = U(n.tickCoord) ? n.tickCoord : n.coordinate
            switch (u) {
              case 'top':
                ;(h = y = n.coordinate),
                  (p = o + +!f * c),
                  (v = p - w * g),
                  (b = v - w * d),
                  (x = m)
                break
              case 'left':
                ;(v = p = n.coordinate),
                  (y = a + +!f * s),
                  (h = y - w * g),
                  (x = h - w * d),
                  (b = m)
                break
              case 'right':
                ;(v = p = n.coordinate),
                  (y = a + +f * s),
                  (h = y + w * g),
                  (x = h + w * d),
                  (b = m)
                break
              default:
                ;(h = y = n.coordinate),
                  (p = o + +f * c),
                  (v = p + w * g),
                  (b = v + w * d),
                  (x = m)
                break
            }
            return { line: { x1: h, y1: v, x2: y, y2: p }, tick: { x, y: b } }
          },
        },
        {
          key: 'getTickTextAnchor',
          value: function () {
            var n = this.props,
              i = n.orientation,
              a = n.mirror,
              o
            switch (i) {
              case 'left':
                o = a ? 'start' : 'end'
                break
              case 'right':
                o = a ? 'end' : 'start'
                break
              default:
                o = 'middle'
                break
            }
            return o
          },
        },
        {
          key: 'getTickVerticalAnchor',
          value: function () {
            var n = this.props,
              i = n.orientation,
              a = n.mirror,
              o = 'end'
            switch (i) {
              case 'left':
              case 'right':
                o = 'middle'
                break
              case 'top':
                o = a ? 'start' : 'end'
                break
              default:
                o = a ? 'end' : 'start'
                break
            }
            return o
          },
        },
        {
          key: 'renderAxisLine',
          value: function () {
            var n = this.props,
              i = n.x,
              a = n.y,
              o = n.width,
              s = n.height,
              c = n.orientation,
              u = n.mirror,
              l = n.axisLine,
              f = tt(
                tt(tt({}, J(this.props, !1)), J(l, !1)),
                {},
                { fill: 'none' },
              )
            if (c === 'top' || c === 'bottom') {
              var d = +((c === 'top' && !u) || (c === 'bottom' && u))
              f = tt(
                tt({}, f),
                {},
                { x1: i, y1: a + d * s, x2: i + o, y2: a + d * s },
              )
            } else {
              var h = +((c === 'left' && !u) || (c === 'right' && u))
              f = tt(
                tt({}, f),
                {},
                { x1: i + h * o, y1: a, x2: i + h * o, y2: a + s },
              )
            }
            return E.createElement(
              'line',
              ui({}, f, {
                className: ue(
                  'recharts-cartesian-axis-line',
                  xt(l, 'className'),
                ),
              }),
            )
          },
        },
        {
          key: 'renderTicks',
          value: function (n, i, a) {
            var o = this,
              s = this.props,
              c = s.tickLine,
              u = s.stroke,
              l = s.tick,
              f = s.tickFormatter,
              d = s.unit,
              h = jp(tt(tt({}, this.props), {}, { ticks: n }), i, a),
              y = this.getTickTextAnchor(),
              v = this.getTickVerticalAnchor(),
              p = J(this.props, !1),
              x = J(l, !1),
              b = tt(tt({}, p), {}, { fill: 'none' }, J(c, !1)),
              w = h.map(function (g, m) {
                var S = o.getTickLineCoord(g),
                  P = S.line,
                  $ = S.tick,
                  T = tt(
                    tt(
                      tt(
                        tt({ textAnchor: y, verticalAnchor: v }, p),
                        {},
                        { stroke: 'none', fill: u },
                        x,
                      ),
                      $,
                    ),
                    {},
                    {
                      index: m,
                      payload: g,
                      visibleTicksCount: h.length,
                      tickFormatter: f,
                    },
                  )
                return E.createElement(
                  pe,
                  ui(
                    {
                      className: 'recharts-cartesian-axis-tick',
                      key: 'tick-'
                        .concat(g.value, '-')
                        .concat(g.coordinate, '-')
                        .concat(g.tickCoord),
                    },
                    Ln(o.props, g, m),
                  ),
                  c &&
                    E.createElement(
                      'line',
                      ui({}, b, P, {
                        className: ue(
                          'recharts-cartesian-axis-tick-line',
                          xt(c, 'className'),
                        ),
                      }),
                    ),
                  l &&
                    t.renderTickItem(
                      l,
                      T,
                      ''
                        .concat(ie(f) ? f(g.value, m) : g.value)
                        .concat(d || ''),
                    ),
                )
              })
            return E.createElement(
              'g',
              { className: 'recharts-cartesian-axis-ticks' },
              w,
            )
          },
        },
        {
          key: 'render',
          value: function () {
            var n = this,
              i = this.props,
              a = i.axisLine,
              o = i.width,
              s = i.height,
              c = i.ticksGenerator,
              u = i.className,
              l = i.hide
            if (l) return null
            var f = this.props,
              d = f.ticks,
              h = Rl(f, PG),
              y = d
            return (
              ie(c) && (y = d && d.length > 0 ? c(this.props) : c(h)),
              o <= 0 || s <= 0 || !y || !y.length
                ? null
                : E.createElement(
                    pe,
                    {
                      className: ue('recharts-cartesian-axis', u),
                      ref: function (p) {
                        n.layerReference = p
                      },
                    },
                    a && this.renderAxisLine(),
                    this.renderTicks(
                      y,
                      this.state.fontSize,
                      this.state.letterSpacing,
                    ),
                    ze.renderCallByParent(this.props),
                  )
            )
          },
        },
      ],
      [
        {
          key: 'renderTickItem',
          value: function (n, i, a) {
            var o
            return (
              E.isValidElement(n)
                ? (o = E.cloneElement(n, i))
                : ie(n)
                  ? (o = n(i))
                  : (o = E.createElement(
                      Bn,
                      ui({}, i, {
                        className: 'recharts-cartesian-axis-tick-value',
                      }),
                      a,
                    )),
              o
            )
          },
        },
      ],
    )
  )
})(A.Component)
Tp(Pa, 'displayName', 'CartesianAxis')
Tp(Pa, 'defaultProps', {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  viewBox: { x: 0, y: 0, width: 0, height: 0 },
  orientation: 'bottom',
  ticks: [],
  stroke: '#666',
  tickLine: !0,
  axisLine: !0,
  tick: !0,
  mirror: !1,
  minTickGap: 5,
  tickSize: 6,
  tickMargin: 2,
  interval: 'preserveEnd',
})
var NG = ['x1', 'y1', 'x2', 'y2', 'key'],
  IG = ['offset']
function Wn(e) {
  '@babel/helpers - typeof'
  return (
    (Wn =
      typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
        ? function (t) {
            return typeof t
          }
        : function (t) {
            return t &&
              typeof Symbol == 'function' &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? 'symbol'
              : typeof t
          }),
    Wn(e)
  )
}
function w0(e, t) {
  var r = Object.keys(e)
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e)
    t &&
      (n = n.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable
      })),
      r.push.apply(r, n)
  }
  return r
}
function Ze(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {}
    t % 2
      ? w0(Object(r), !0).forEach(function (n) {
          RG(e, n, r[n])
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
        : w0(Object(r)).forEach(function (n) {
            Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
          })
  }
  return e
}
function RG(e, t, r) {
  return (
    (t = DG(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  )
}
function DG(e) {
  var t = LG(e, 'string')
  return Wn(t) == 'symbol' ? t : t + ''
}
function LG(e, t) {
  if (Wn(e) != 'object' || !e) return e
  var r = e[Symbol.toPrimitive]
  if (r !== void 0) {
    var n = r.call(e, t || 'default')
    if (Wn(n) != 'object') return n
    throw new TypeError('@@toPrimitive must return a primitive value.')
  }
  return (t === 'string' ? String : Number)(e)
}
function On() {
  return (
    (On = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t]
            for (var n in r)
              Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
          }
          return e
        }),
    On.apply(this, arguments)
  )
}
function O0(e, t) {
  if (e == null) return {}
  var r = BG(e, t),
    n,
    i
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e)
    for (i = 0; i < a.length; i++)
      (n = a[i]),
        !(t.indexOf(n) >= 0) &&
          Object.prototype.propertyIsEnumerable.call(e, n) &&
          (r[n] = e[n])
  }
  return r
}
function BG(e, t) {
  if (e == null) return {}
  var r = {}
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue
      r[n] = e[n]
    }
  return r
}
var FG = function (t) {
  var r = t.fill
  if (!r || r === 'none') return null
  var n = t.fillOpacity,
    i = t.x,
    a = t.y,
    o = t.width,
    s = t.height,
    c = t.ry
  return E.createElement('rect', {
    x: i,
    y: a,
    ry: c,
    width: o,
    height: s,
    stroke: 'none',
    fill: r,
    fillOpacity: n,
    className: 'recharts-cartesian-grid-bg',
  })
}
function kS(e, t) {
  var r
  if (E.isValidElement(e)) r = E.cloneElement(e, t)
  else if (ie(e)) r = e(t)
  else {
    var n = t.x1,
      i = t.y1,
      a = t.x2,
      o = t.y2,
      s = t.key,
      c = O0(t, NG),
      u = J(c, !1)
    u.offset
    var l = O0(u, IG)
    r = E.createElement(
      'line',
      On({}, l, { x1: n, y1: i, x2: a, y2: o, fill: 'none', key: s }),
    )
  }
  return r
}
function UG(e) {
  var t = e.x,
    r = e.width,
    n = e.horizontal,
    i = n === void 0 ? !0 : n,
    a = e.horizontalPoints
  if (!i || !a || !a.length) return null
  var o = a.map(function (s, c) {
    var u = Ze(
      Ze({}, e),
      {},
      { x1: t, y1: s, x2: t + r, y2: s, key: 'line-'.concat(c), index: c },
    )
    return kS(i, u)
  })
  return E.createElement(
    'g',
    { className: 'recharts-cartesian-grid-horizontal' },
    o,
  )
}
function WG(e) {
  var t = e.y,
    r = e.height,
    n = e.vertical,
    i = n === void 0 ? !0 : n,
    a = e.verticalPoints
  if (!i || !a || !a.length) return null
  var o = a.map(function (s, c) {
    var u = Ze(
      Ze({}, e),
      {},
      { x1: s, y1: t, x2: s, y2: t + r, key: 'line-'.concat(c), index: c },
    )
    return kS(i, u)
  })
  return E.createElement(
    'g',
    { className: 'recharts-cartesian-grid-vertical' },
    o,
  )
}
function qG(e) {
  var t = e.horizontalFill,
    r = e.fillOpacity,
    n = e.x,
    i = e.y,
    a = e.width,
    o = e.height,
    s = e.horizontalPoints,
    c = e.horizontal,
    u = c === void 0 ? !0 : c
  if (!u || !t || !t.length) return null
  var l = s
    .map(function (d) {
      return Math.round(d + i - i)
    })
    .sort(function (d, h) {
      return d - h
    })
  i !== l[0] && l.unshift(0)
  var f = l.map(function (d, h) {
    var y = !l[h + 1],
      v = y ? i + o - d : l[h + 1] - d
    if (v <= 0) return null
    var p = h % t.length
    return E.createElement('rect', {
      key: 'react-'.concat(h),
      y: d,
      x: n,
      height: v,
      width: a,
      stroke: 'none',
      fill: t[p],
      fillOpacity: r,
      className: 'recharts-cartesian-grid-bg',
    })
  })
  return E.createElement(
    'g',
    { className: 'recharts-cartesian-gridstripes-horizontal' },
    f,
  )
}
function HG(e) {
  var t = e.vertical,
    r = t === void 0 ? !0 : t,
    n = e.verticalFill,
    i = e.fillOpacity,
    a = e.x,
    o = e.y,
    s = e.width,
    c = e.height,
    u = e.verticalPoints
  if (!r || !n || !n.length) return null
  var l = u
    .map(function (d) {
      return Math.round(d + a - a)
    })
    .sort(function (d, h) {
      return d - h
    })
  a !== l[0] && l.unshift(0)
  var f = l.map(function (d, h) {
    var y = !l[h + 1],
      v = y ? a + s - d : l[h + 1] - d
    if (v <= 0) return null
    var p = h % n.length
    return E.createElement('rect', {
      key: 'react-'.concat(h),
      x: d,
      y: o,
      width: v,
      height: c,
      stroke: 'none',
      fill: n[p],
      fillOpacity: i,
      className: 'recharts-cartesian-grid-bg',
    })
  })
  return E.createElement(
    'g',
    { className: 'recharts-cartesian-gridstripes-vertical' },
    f,
  )
}
var zG = function (t, r) {
    var n = t.xAxis,
      i = t.width,
      a = t.height,
      o = t.offset
    return jO(
      jp(
        Ze(
          Ze(Ze({}, Pa.defaultProps), n),
          {},
          { ticks: xr(n, !0), viewBox: { x: 0, y: 0, width: i, height: a } },
        ),
      ),
      o.left,
      o.left + o.width,
      r,
    )
  },
  KG = function (t, r) {
    var n = t.yAxis,
      i = t.width,
      a = t.height,
      o = t.offset
    return jO(
      jp(
        Ze(
          Ze(Ze({}, Pa.defaultProps), n),
          {},
          { ticks: xr(n, !0), viewBox: { x: 0, y: 0, width: i, height: a } },
        ),
      ),
      o.top,
      o.top + o.height,
      r,
    )
  },
  ri = {
    horizontal: !0,
    vertical: !0,
    horizontalPoints: [],
    verticalPoints: [],
    stroke: '#ccc',
    fill: 'none',
    verticalFill: [],
    horizontalFill: [],
  }
function Nd(e) {
  var t,
    r,
    n,
    i,
    a,
    o,
    s = $p(),
    c = Ep(),
    u = MK(),
    l = Ze(
      Ze({}, e),
      {},
      {
        stroke: (t = e.stroke) !== null && t !== void 0 ? t : ri.stroke,
        fill: (r = e.fill) !== null && r !== void 0 ? r : ri.fill,
        horizontal:
          (n = e.horizontal) !== null && n !== void 0 ? n : ri.horizontal,
        horizontalFill:
          (i = e.horizontalFill) !== null && i !== void 0
            ? i
            : ri.horizontalFill,
        vertical: (a = e.vertical) !== null && a !== void 0 ? a : ri.vertical,
        verticalFill:
          (o = e.verticalFill) !== null && o !== void 0 ? o : ri.verticalFill,
        x: U(e.x) ? e.x : u.left,
        y: U(e.y) ? e.y : u.top,
        width: U(e.width) ? e.width : u.width,
        height: U(e.height) ? e.height : u.height,
      },
    ),
    f = l.x,
    d = l.y,
    h = l.width,
    y = l.height,
    v = l.syncWithTicks,
    p = l.horizontalValues,
    x = l.verticalValues,
    b = jK(),
    w = TK()
  if (
    !U(h) ||
    h <= 0 ||
    !U(y) ||
    y <= 0 ||
    !U(f) ||
    f !== +f ||
    !U(d) ||
    d !== +d
  )
    return null
  var g = l.verticalCoordinatesGenerator || zG,
    m = l.horizontalCoordinatesGenerator || KG,
    S = l.horizontalPoints,
    P = l.verticalPoints
  if ((!S || !S.length) && ie(m)) {
    var $ = p && p.length,
      T = m(
        {
          yAxis: w ? Ze(Ze({}, w), {}, { ticks: $ ? p : w.ticks }) : void 0,
          width: s,
          height: c,
          offset: u,
        },
        $ ? !0 : v,
      )
    Gt(
      Array.isArray(T),
      'horizontalCoordinatesGenerator should return Array but instead it returned ['.concat(
        Wn(T),
        ']',
      ),
    ),
      Array.isArray(T) && (S = T)
  }
  if ((!P || !P.length) && ie(g)) {
    var k = x && x.length,
      C = g(
        {
          xAxis: b ? Ze(Ze({}, b), {}, { ticks: k ? x : b.ticks }) : void 0,
          width: s,
          height: c,
          offset: u,
        },
        k ? !0 : v,
      )
    Gt(
      Array.isArray(C),
      'verticalCoordinatesGenerator should return Array but instead it returned ['.concat(
        Wn(C),
        ']',
      ),
    ),
      Array.isArray(C) && (P = C)
  }
  return E.createElement(
    'g',
    { className: 'recharts-cartesian-grid' },
    E.createElement(FG, {
      fill: l.fill,
      fillOpacity: l.fillOpacity,
      x: l.x,
      y: l.y,
      width: l.width,
      height: l.height,
      ry: l.ry,
    }),
    E.createElement(
      UG,
      On({}, l, { offset: u, horizontalPoints: S, xAxis: b, yAxis: w }),
    ),
    E.createElement(
      WG,
      On({}, l, { offset: u, verticalPoints: P, xAxis: b, yAxis: w }),
    ),
    E.createElement(qG, On({}, l, { horizontalPoints: S })),
    E.createElement(HG, On({}, l, { verticalPoints: P })),
  )
}
Nd.displayName = 'CartesianGrid'
var GG = ['type', 'layout', 'connectNulls', 'ref'],
  VG = ['key']
function ta(e) {
  '@babel/helpers - typeof'
  return (
    (ta =
      typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
        ? function (t) {
            return typeof t
          }
        : function (t) {
            return t &&
              typeof Symbol == 'function' &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? 'symbol'
              : typeof t
          }),
    ta(e)
  )
}
function S0(e, t) {
  if (e == null) return {}
  var r = XG(e, t),
    n,
    i
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e)
    for (i = 0; i < a.length; i++)
      (n = a[i]),
        !(t.indexOf(n) >= 0) &&
          Object.prototype.propertyIsEnumerable.call(e, n) &&
          (r[n] = e[n])
  }
  return r
}
function XG(e, t) {
  if (e == null) return {}
  var r = {}
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue
      r[n] = e[n]
    }
  return r
}
function eo() {
  return (
    (eo = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t]
            for (var n in r)
              Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
          }
          return e
        }),
    eo.apply(this, arguments)
  )
}
function A0(e, t) {
  var r = Object.keys(e)
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e)
    t &&
      (n = n.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable
      })),
      r.push.apply(r, n)
  }
  return r
}
function pt(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {}
    t % 2
      ? A0(Object(r), !0).forEach(function (n) {
          qt(e, n, r[n])
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
        : A0(Object(r)).forEach(function (n) {
            Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
          })
  }
  return e
}
function ni(e) {
  return JG(e) || ZG(e) || QG(e) || YG()
}
function YG() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}
function QG(e, t) {
  if (e) {
    if (typeof e == 'string') return Id(e, t)
    var r = Object.prototype.toString.call(e).slice(8, -1)
    if (
      (r === 'Object' && e.constructor && (r = e.constructor.name),
      r === 'Map' || r === 'Set')
    )
      return Array.from(e)
    if (r === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
      return Id(e, t)
  }
}
function ZG(e) {
  if (
    (typeof Symbol < 'u' && e[Symbol.iterator] != null) ||
    e['@@iterator'] != null
  )
    return Array.from(e)
}
function JG(e) {
  if (Array.isArray(e)) return Id(e)
}
function Id(e, t) {
  ;(t == null || t > e.length) && (t = e.length)
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r]
  return n
}
function eV(e, t) {
  if (!(e instanceof t))
    throw new TypeError('Cannot call a class as a function')
}
function P0(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r]
    ;(n.enumerable = n.enumerable || !1),
      (n.configurable = !0),
      'value' in n && (n.writable = !0),
      Object.defineProperty(e, NS(n.key), n)
  }
}
function tV(e, t, r) {
  return (
    t && P0(e.prototype, t),
    r && P0(e, r),
    Object.defineProperty(e, 'prototype', { writable: !1 }),
    e
  )
}
function rV(e, t, r) {
  return (
    (t = zc(t)),
    nV(
      e,
      MS() ? Reflect.construct(t, r || [], zc(e).constructor) : t.apply(e, r),
    )
  )
}
function nV(e, t) {
  if (t && (ta(t) === 'object' || typeof t == 'function')) return t
  if (t !== void 0)
    throw new TypeError(
      'Derived constructors may only return object or undefined',
    )
  return iV(e)
}
function iV(e) {
  if (e === void 0)
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called",
    )
  return e
}
function MS() {
  try {
    var e = !Boolean.prototype.valueOf.call(
      Reflect.construct(Boolean, [], function () {}),
    )
  } catch {}
  return (MS = function () {
    return !!e
  })()
}
function zc(e) {
  return (
    (zc = Object.setPrototypeOf
      ? Object.getPrototypeOf.bind()
      : function (r) {
          return r.__proto__ || Object.getPrototypeOf(r)
        }),
    zc(e)
  )
}
function aV(e, t) {
  if (typeof t != 'function' && t !== null)
    throw new TypeError('Super expression must either be null or a function')
  ;(e.prototype = Object.create(t && t.prototype, {
    constructor: { value: e, writable: !0, configurable: !0 },
  })),
    Object.defineProperty(e, 'prototype', { writable: !1 }),
    t && Rd(e, t)
}
function Rd(e, t) {
  return (
    (Rd = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (n, i) {
          return (n.__proto__ = i), n
        }),
    Rd(e, t)
  )
}
function qt(e, t, r) {
  return (
    (t = NS(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  )
}
function NS(e) {
  var t = oV(e, 'string')
  return ta(t) == 'symbol' ? t : t + ''
}
function oV(e, t) {
  if (ta(e) != 'object' || !e) return e
  var r = e[Symbol.toPrimitive]
  if (r !== void 0) {
    var n = r.call(e, t || 'default')
    if (ta(n) != 'object') return n
    throw new TypeError('@@toPrimitive must return a primitive value.')
  }
  return (t === 'string' ? String : Number)(e)
}
var ss = (function (e) {
  function t() {
    var r
    eV(this, t)
    for (var n = arguments.length, i = new Array(n), a = 0; a < n; a++)
      i[a] = arguments[a]
    return (
      (r = rV(this, t, [].concat(i))),
      qt(r, 'state', { isAnimationFinished: !0, totalLength: 0 }),
      qt(r, 'generateSimpleStrokeDasharray', function (o, s) {
        return ''.concat(s, 'px ').concat(o - s, 'px')
      }),
      qt(r, 'getStrokeDasharray', function (o, s, c) {
        var u = c.reduce(function (x, b) {
          return x + b
        })
        if (!u) return r.generateSimpleStrokeDasharray(s, o)
        for (
          var l = Math.floor(o / u), f = o % u, d = s - o, h = [], y = 0, v = 0;
          y < c.length;
          v += c[y], ++y
        )
          if (v + c[y] > f) {
            h = [].concat(ni(c.slice(0, y)), [f - v])
            break
          }
        var p = h.length % 2 === 0 ? [0, d] : [d]
        return []
          .concat(ni(t.repeat(c, l)), ni(h), p)
          .map(function (x) {
            return ''.concat(x, 'px')
          })
          .join(', ')
      }),
      qt(r, 'id', ma('recharts-line-')),
      qt(r, 'pathRef', function (o) {
        r.mainCurve = o
      }),
      qt(r, 'handleAnimationEnd', function () {
        r.setState({ isAnimationFinished: !0 }),
          r.props.onAnimationEnd && r.props.onAnimationEnd()
      }),
      qt(r, 'handleAnimationStart', function () {
        r.setState({ isAnimationFinished: !1 }),
          r.props.onAnimationStart && r.props.onAnimationStart()
      }),
      r
    )
  }
  return (
    aV(t, e),
    tV(
      t,
      [
        {
          key: 'componentDidMount',
          value: function () {
            if (this.props.isAnimationActive) {
              var n = this.getTotalLength()
              this.setState({ totalLength: n })
            }
          },
        },
        {
          key: 'componentDidUpdate',
          value: function () {
            if (this.props.isAnimationActive) {
              var n = this.getTotalLength()
              n !== this.state.totalLength && this.setState({ totalLength: n })
            }
          },
        },
        {
          key: 'getTotalLength',
          value: function () {
            var n = this.mainCurve
            try {
              return (n && n.getTotalLength && n.getTotalLength()) || 0
            } catch {
              return 0
            }
          },
        },
        {
          key: 'renderErrorBar',
          value: function (n, i) {
            if (this.props.isAnimationActive && !this.state.isAnimationFinished)
              return null
            var a = this.props,
              o = a.points,
              s = a.xAxis,
              c = a.yAxis,
              u = a.layout,
              l = a.children,
              f = wt(l, os)
            if (!f) return null
            var d = function (v, p) {
                return {
                  x: v.x,
                  y: v.y,
                  value: v.value,
                  errorVal: Ue(v.payload, p),
                }
              },
              h = { clipPath: n ? 'url(#clipPath-'.concat(i, ')') : null }
            return E.createElement(
              pe,
              h,
              f.map(function (y) {
                return E.cloneElement(y, {
                  key: 'bar-'.concat(y.props.dataKey),
                  data: o,
                  xAxis: s,
                  yAxis: c,
                  layout: u,
                  dataPointFormatter: d,
                })
              }),
            )
          },
        },
        {
          key: 'renderDots',
          value: function (n, i, a) {
            var o = this.props.isAnimationActive
            if (o && !this.state.isAnimationFinished) return null
            var s = this.props,
              c = s.dot,
              u = s.points,
              l = s.dataKey,
              f = J(this.props, !1),
              d = J(c, !0),
              h = u.map(function (v, p) {
                var x = pt(
                  pt(pt({ key: 'dot-'.concat(p), r: 3 }, f), d),
                  {},
                  {
                    value: v.value,
                    dataKey: l,
                    cx: v.x,
                    cy: v.y,
                    index: p,
                    payload: v.payload,
                  },
                )
                return t.renderDotItem(c, x)
              }),
              y = {
                clipPath: n
                  ? 'url(#clipPath-'.concat(i ? '' : 'dots-').concat(a, ')')
                  : null,
              }
            return E.createElement(
              pe,
              eo({ className: 'recharts-line-dots', key: 'dots' }, y),
              h,
            )
          },
        },
        {
          key: 'renderCurveStatically',
          value: function (n, i, a, o) {
            var s = this.props,
              c = s.type,
              u = s.layout,
              l = s.connectNulls
            s.ref
            var f = S0(s, GG),
              d = pt(
                pt(
                  pt({}, J(f, !0)),
                  {},
                  {
                    fill: 'none',
                    className: 'recharts-line-curve',
                    clipPath: i ? 'url(#clipPath-'.concat(a, ')') : null,
                    points: n,
                  },
                  o,
                ),
                {},
                { type: c, layout: u, connectNulls: l },
              )
            return E.createElement(Pc, eo({}, d, { pathRef: this.pathRef }))
          },
        },
        {
          key: 'renderCurveWithAnimation',
          value: function (n, i) {
            var a = this,
              o = this.props,
              s = o.points,
              c = o.strokeDasharray,
              u = o.isAnimationActive,
              l = o.animationBegin,
              f = o.animationDuration,
              d = o.animationEasing,
              h = o.animationId,
              y = o.animateNewValues,
              v = o.width,
              p = o.height,
              x = this.state,
              b = x.prevPoints,
              w = x.totalLength
            return E.createElement(
              cr,
              {
                begin: l,
                duration: f,
                isActive: u,
                easing: d,
                from: { t: 0 },
                to: { t: 1 },
                key: 'line-'.concat(h),
                onAnimationEnd: this.handleAnimationEnd,
                onAnimationStart: this.handleAnimationStart,
              },
              function (g) {
                var m = g.t
                if (b) {
                  var S = b.length / s.length,
                    P = s.map(function (j, M) {
                      var N = Math.floor(M * S)
                      if (b[N]) {
                        var R = b[N],
                          I = gt(R.x, j.x),
                          L = gt(R.y, j.y)
                        return pt(pt({}, j), {}, { x: I(m), y: L(m) })
                      }
                      if (y) {
                        var B = gt(v * 2, j.x),
                          W = gt(p / 2, j.y)
                        return pt(pt({}, j), {}, { x: B(m), y: W(m) })
                      }
                      return pt(pt({}, j), {}, { x: j.x, y: j.y })
                    })
                  return a.renderCurveStatically(P, n, i)
                }
                var $ = gt(0, w),
                  T = $(m),
                  k
                if (c) {
                  var C = ''
                    .concat(c)
                    .split(/[,\s]+/gim)
                    .map(function (j) {
                      return parseFloat(j)
                    })
                  k = a.getStrokeDasharray(T, w, C)
                } else k = a.generateSimpleStrokeDasharray(w, T)
                return a.renderCurveStatically(s, n, i, { strokeDasharray: k })
              },
            )
          },
        },
        {
          key: 'renderCurve',
          value: function (n, i) {
            var a = this.props,
              o = a.points,
              s = a.isAnimationActive,
              c = this.state,
              u = c.prevPoints,
              l = c.totalLength
            return s && o && o.length && ((!u && l > 0) || !as(u, o))
              ? this.renderCurveWithAnimation(n, i)
              : this.renderCurveStatically(o, n, i)
          },
        },
        {
          key: 'render',
          value: function () {
            var n,
              i = this.props,
              a = i.hide,
              o = i.dot,
              s = i.points,
              c = i.className,
              u = i.xAxis,
              l = i.yAxis,
              f = i.top,
              d = i.left,
              h = i.width,
              y = i.height,
              v = i.isAnimationActive,
              p = i.id
            if (a || !s || !s.length) return null
            var x = this.state.isAnimationFinished,
              b = s.length === 1,
              w = ue('recharts-line', c),
              g = u && u.allowDataOverflow,
              m = l && l.allowDataOverflow,
              S = g || m,
              P = se(p) ? this.id : p,
              $ =
                (n = J(o, !1)) !== null && n !== void 0
                  ? n
                  : { r: 3, strokeWidth: 2 },
              T = $.r,
              k = T === void 0 ? 3 : T,
              C = $.strokeWidth,
              j = C === void 0 ? 2 : C,
              M = qT(o) ? o : {},
              N = M.clipDot,
              R = N === void 0 ? !0 : N,
              I = k * 2 + j
            return E.createElement(
              pe,
              { className: w },
              g || m
                ? E.createElement(
                    'defs',
                    null,
                    E.createElement(
                      'clipPath',
                      { id: 'clipPath-'.concat(P) },
                      E.createElement('rect', {
                        x: g ? d : d - h / 2,
                        y: m ? f : f - y / 2,
                        width: g ? h : h * 2,
                        height: m ? y : y * 2,
                      }),
                    ),
                    !R &&
                      E.createElement(
                        'clipPath',
                        { id: 'clipPath-dots-'.concat(P) },
                        E.createElement('rect', {
                          x: d - I / 2,
                          y: f - I / 2,
                          width: h + I,
                          height: y + I,
                        }),
                      ),
                  )
                : null,
              !b && this.renderCurve(S, P),
              this.renderErrorBar(S, P),
              (b || o) && this.renderDots(S, R, P),
              (!v || x) && Ar.renderCallByParent(this.props, s),
            )
          },
        },
      ],
      [
        {
          key: 'getDerivedStateFromProps',
          value: function (n, i) {
            return n.animationId !== i.prevAnimationId
              ? {
                  prevAnimationId: n.animationId,
                  curPoints: n.points,
                  prevPoints: i.curPoints,
                }
              : n.points !== i.curPoints
                ? { curPoints: n.points }
                : null
          },
        },
        {
          key: 'repeat',
          value: function (n, i) {
            for (
              var a = n.length % 2 !== 0 ? [].concat(ni(n), [0]) : n,
                o = [],
                s = 0;
              s < i;
              ++s
            )
              o = [].concat(ni(o), ni(a))
            return o
          },
        },
        {
          key: 'renderDotItem',
          value: function (n, i) {
            var a
            if (E.isValidElement(n)) a = E.cloneElement(n, i)
            else if (ie(n)) a = n(i)
            else {
              var o = i.key,
                s = S0(i, VG),
                c = ue(
                  'recharts-line-dot',
                  typeof n != 'boolean' ? n.className : '',
                )
              a = E.createElement(Wu, eo({ key: o }, s, { className: c }))
            }
            return a
          },
        },
      ],
    )
  )
})(A.PureComponent)
qt(ss, 'displayName', 'Line')
qt(ss, 'defaultProps', {
  xAxisId: 0,
  yAxisId: 0,
  connectNulls: !1,
  activeDot: !0,
  dot: !0,
  legendType: 'line',
  stroke: '#3182bd',
  strokeWidth: 1,
  fill: '#fff',
  points: [],
  isAnimationActive: !nr.isSsr,
  animateNewValues: !0,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: 'ease',
  hide: !1,
  label: !1,
})
qt(ss, 'getComposedData', function (e) {
  var t = e.props,
    r = e.xAxis,
    n = e.yAxis,
    i = e.xAxisTicks,
    a = e.yAxisTicks,
    o = e.dataKey,
    s = e.bandSize,
    c = e.displayedData,
    u = e.offset,
    l = t.layout,
    f = c.map(function (d, h) {
      var y = Ue(d, o)
      return l === 'horizontal'
        ? {
            x: Xm({ axis: r, ticks: i, bandSize: s, entry: d, index: h }),
            y: se(y) ? null : n.scale(y),
            value: y,
            payload: d,
          }
        : {
            x: se(y) ? null : r.scale(y),
            y: Xm({ axis: n, ticks: a, bandSize: s, entry: d, index: h }),
            value: y,
            payload: d,
          }
    })
  return pt({ points: f, layout: l }, u)
})
function ra(e) {
  '@babel/helpers - typeof'
  return (
    (ra =
      typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
        ? function (t) {
            return typeof t
          }
        : function (t) {
            return t &&
              typeof Symbol == 'function' &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? 'symbol'
              : typeof t
          }),
    ra(e)
  )
}
function sV(e, t) {
  if (!(e instanceof t))
    throw new TypeError('Cannot call a class as a function')
}
function cV(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r]
    ;(n.enumerable = n.enumerable || !1),
      (n.configurable = !0),
      'value' in n && (n.writable = !0),
      Object.defineProperty(e, DS(n.key), n)
  }
}
function uV(e, t, r) {
  return (
    t && cV(e.prototype, t),
    Object.defineProperty(e, 'prototype', { writable: !1 }),
    e
  )
}
function lV(e, t, r) {
  return (
    (t = Kc(t)),
    fV(
      e,
      IS() ? Reflect.construct(t, r || [], Kc(e).constructor) : t.apply(e, r),
    )
  )
}
function fV(e, t) {
  if (t && (ra(t) === 'object' || typeof t == 'function')) return t
  if (t !== void 0)
    throw new TypeError(
      'Derived constructors may only return object or undefined',
    )
  return dV(e)
}
function dV(e) {
  if (e === void 0)
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called",
    )
  return e
}
function IS() {
  try {
    var e = !Boolean.prototype.valueOf.call(
      Reflect.construct(Boolean, [], function () {}),
    )
  } catch {}
  return (IS = function () {
    return !!e
  })()
}
function Kc(e) {
  return (
    (Kc = Object.setPrototypeOf
      ? Object.getPrototypeOf.bind()
      : function (r) {
          return r.__proto__ || Object.getPrototypeOf(r)
        }),
    Kc(e)
  )
}
function hV(e, t) {
  if (typeof t != 'function' && t !== null)
    throw new TypeError('Super expression must either be null or a function')
  ;(e.prototype = Object.create(t && t.prototype, {
    constructor: { value: e, writable: !0, configurable: !0 },
  })),
    Object.defineProperty(e, 'prototype', { writable: !1 }),
    t && Dd(e, t)
}
function Dd(e, t) {
  return (
    (Dd = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (n, i) {
          return (n.__proto__ = i), n
        }),
    Dd(e, t)
  )
}
function RS(e, t, r) {
  return (
    (t = DS(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  )
}
function DS(e) {
  var t = pV(e, 'string')
  return ra(t) == 'symbol' ? t : t + ''
}
function pV(e, t) {
  if (ra(e) != 'object' || !e) return e
  var r = e[Symbol.toPrimitive]
  if (r !== void 0) {
    var n = r.call(e, t || 'default')
    if (ra(n) != 'object') return n
    throw new TypeError('@@toPrimitive must return a primitive value.')
  }
  return (t === 'string' ? String : Number)(e)
}
function Ld() {
  return (
    (Ld = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t]
            for (var n in r)
              Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
          }
          return e
        }),
    Ld.apply(this, arguments)
  )
}
function vV(e) {
  var t = e.xAxisId,
    r = $p(),
    n = Ep(),
    i = wS(t)
  return i == null
    ? null
    : E.createElement(
        Pa,
        Ld({}, i, {
          className: ue(
            'recharts-'.concat(i.axisType, ' ').concat(i.axisType),
            i.className,
          ),
          viewBox: { x: 0, y: 0, width: r, height: n },
          ticksGenerator: function (o) {
            return xr(o, !0)
          },
        }),
      )
}
var na = (function (e) {
  function t() {
    return sV(this, t), lV(this, t, arguments)
  }
  return (
    hV(t, e),
    uV(t, [
      {
        key: 'render',
        value: function () {
          return E.createElement(vV, this.props)
        },
      },
    ])
  )
})(E.Component)
RS(na, 'displayName', 'XAxis')
RS(na, 'defaultProps', {
  allowDecimals: !0,
  hide: !1,
  orientation: 'bottom',
  width: 0,
  height: 30,
  mirror: !1,
  xAxisId: 0,
  tickCount: 5,
  type: 'category',
  padding: { left: 0, right: 0 },
  allowDataOverflow: !1,
  scale: 'auto',
  reversed: !1,
  allowDuplicatedCategory: !0,
})
function ia(e) {
  '@babel/helpers - typeof'
  return (
    (ia =
      typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
        ? function (t) {
            return typeof t
          }
        : function (t) {
            return t &&
              typeof Symbol == 'function' &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? 'symbol'
              : typeof t
          }),
    ia(e)
  )
}
function yV(e, t) {
  if (!(e instanceof t))
    throw new TypeError('Cannot call a class as a function')
}
function mV(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r]
    ;(n.enumerable = n.enumerable || !1),
      (n.configurable = !0),
      'value' in n && (n.writable = !0),
      Object.defineProperty(e, FS(n.key), n)
  }
}
function gV(e, t, r) {
  return (
    t && mV(e.prototype, t),
    Object.defineProperty(e, 'prototype', { writable: !1 }),
    e
  )
}
function bV(e, t, r) {
  return (
    (t = Gc(t)),
    xV(
      e,
      LS() ? Reflect.construct(t, r || [], Gc(e).constructor) : t.apply(e, r),
    )
  )
}
function xV(e, t) {
  if (t && (ia(t) === 'object' || typeof t == 'function')) return t
  if (t !== void 0)
    throw new TypeError(
      'Derived constructors may only return object or undefined',
    )
  return wV(e)
}
function wV(e) {
  if (e === void 0)
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called",
    )
  return e
}
function LS() {
  try {
    var e = !Boolean.prototype.valueOf.call(
      Reflect.construct(Boolean, [], function () {}),
    )
  } catch {}
  return (LS = function () {
    return !!e
  })()
}
function Gc(e) {
  return (
    (Gc = Object.setPrototypeOf
      ? Object.getPrototypeOf.bind()
      : function (r) {
          return r.__proto__ || Object.getPrototypeOf(r)
        }),
    Gc(e)
  )
}
function OV(e, t) {
  if (typeof t != 'function' && t !== null)
    throw new TypeError('Super expression must either be null or a function')
  ;(e.prototype = Object.create(t && t.prototype, {
    constructor: { value: e, writable: !0, configurable: !0 },
  })),
    Object.defineProperty(e, 'prototype', { writable: !1 }),
    t && Bd(e, t)
}
function Bd(e, t) {
  return (
    (Bd = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (n, i) {
          return (n.__proto__ = i), n
        }),
    Bd(e, t)
  )
}
function BS(e, t, r) {
  return (
    (t = FS(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  )
}
function FS(e) {
  var t = SV(e, 'string')
  return ia(t) == 'symbol' ? t : t + ''
}
function SV(e, t) {
  if (ia(e) != 'object' || !e) return e
  var r = e[Symbol.toPrimitive]
  if (r !== void 0) {
    var n = r.call(e, t || 'default')
    if (ia(n) != 'object') return n
    throw new TypeError('@@toPrimitive must return a primitive value.')
  }
  return (t === 'string' ? String : Number)(e)
}
function Fd() {
  return (
    (Fd = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t]
            for (var n in r)
              Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
          }
          return e
        }),
    Fd.apply(this, arguments)
  )
}
var AV = function (t) {
    var r = t.yAxisId,
      n = $p(),
      i = Ep(),
      a = OS(r)
    return a == null
      ? null
      : E.createElement(
          Pa,
          Fd({}, a, {
            className: ue(
              'recharts-'.concat(a.axisType, ' ').concat(a.axisType),
              a.className,
            ),
            viewBox: { x: 0, y: 0, width: n, height: i },
            ticksGenerator: function (s) {
              return xr(s, !0)
            },
          }),
        )
  },
  aa = (function (e) {
    function t() {
      return yV(this, t), bV(this, t, arguments)
    }
    return (
      OV(t, e),
      gV(t, [
        {
          key: 'render',
          value: function () {
            return E.createElement(AV, this.props)
          },
        },
      ])
    )
  })(E.Component)
BS(aa, 'displayName', 'YAxis')
BS(aa, 'defaultProps', {
  allowDuplicatedCategory: !0,
  allowDecimals: !0,
  hide: !1,
  orientation: 'left',
  width: 60,
  height: 0,
  mirror: !1,
  yAxisId: 0,
  tickCount: 5,
  type: 'number',
  padding: { top: 0, bottom: 0 },
  allowDataOverflow: !1,
  scale: 'auto',
  reversed: !1,
})
function $0(e) {
  return _V(e) || EV(e) || $V(e) || PV()
}
function PV() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}
function $V(e, t) {
  if (e) {
    if (typeof e == 'string') return Ud(e, t)
    var r = Object.prototype.toString.call(e).slice(8, -1)
    if (
      (r === 'Object' && e.constructor && (r = e.constructor.name),
      r === 'Map' || r === 'Set')
    )
      return Array.from(e)
    if (r === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
      return Ud(e, t)
  }
}
function EV(e) {
  if (
    (typeof Symbol < 'u' && e[Symbol.iterator] != null) ||
    e['@@iterator'] != null
  )
    return Array.from(e)
}
function _V(e) {
  if (Array.isArray(e)) return Ud(e)
}
function Ud(e, t) {
  ;(t == null || t > e.length) && (t = e.length)
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r]
  return n
}
var Wd = function (t, r, n, i, a) {
    var o = wt(t, Cp),
      s = wt(t, Qu),
      c = [].concat($0(o), $0(s)),
      u = wt(t, Ju),
      l = ''.concat(i, 'Id'),
      f = i[0],
      d = r
    if (
      (c.length &&
        (d = c.reduce(function (v, p) {
          if (
            p.props[l] === n &&
            ar(p.props, 'extendDomain') &&
            U(p.props[f])
          ) {
            var x = p.props[f]
            return [Math.min(v[0], x), Math.max(v[1], x)]
          }
          return v
        }, d)),
      u.length)
    ) {
      var h = ''.concat(f, '1'),
        y = ''.concat(f, '2')
      d = u.reduce(function (v, p) {
        if (
          p.props[l] === n &&
          ar(p.props, 'extendDomain') &&
          U(p.props[h]) &&
          U(p.props[y])
        ) {
          var x = p.props[h],
            b = p.props[y]
          return [Math.min(v[0], x, b), Math.max(v[1], x, b)]
        }
        return v
      }, d)
    }
    return (
      a &&
        a.length &&
        (d = a.reduce(function (v, p) {
          return U(p) ? [Math.min(v[0], p), Math.max(v[1], p)] : v
        }, d)),
      d
    )
  },
  US = { exports: {} }
;(function (e) {
  var t = Object.prototype.hasOwnProperty,
    r = '~'
  function n() {}
  Object.create &&
    ((n.prototype = Object.create(null)), new n().__proto__ || (r = !1))
  function i(c, u, l) {
    ;(this.fn = c), (this.context = u), (this.once = l || !1)
  }
  function a(c, u, l, f, d) {
    if (typeof l != 'function')
      throw new TypeError('The listener must be a function')
    var h = new i(l, f || c, d),
      y = r ? r + u : u
    return (
      c._events[y]
        ? c._events[y].fn
          ? (c._events[y] = [c._events[y], h])
          : c._events[y].push(h)
        : ((c._events[y] = h), c._eventsCount++),
      c
    )
  }
  function o(c, u) {
    --c._eventsCount === 0 ? (c._events = new n()) : delete c._events[u]
  }
  function s() {
    ;(this._events = new n()), (this._eventsCount = 0)
  }
  ;(s.prototype.eventNames = function () {
    var u = [],
      l,
      f
    if (this._eventsCount === 0) return u
    for (f in (l = this._events)) t.call(l, f) && u.push(r ? f.slice(1) : f)
    return Object.getOwnPropertySymbols
      ? u.concat(Object.getOwnPropertySymbols(l))
      : u
  }),
    (s.prototype.listeners = function (u) {
      var l = r ? r + u : u,
        f = this._events[l]
      if (!f) return []
      if (f.fn) return [f.fn]
      for (var d = 0, h = f.length, y = new Array(h); d < h; d++) y[d] = f[d].fn
      return y
    }),
    (s.prototype.listenerCount = function (u) {
      var l = r ? r + u : u,
        f = this._events[l]
      return f ? (f.fn ? 1 : f.length) : 0
    }),
    (s.prototype.emit = function (u, l, f, d, h, y) {
      var v = r ? r + u : u
      if (!this._events[v]) return !1
      var p = this._events[v],
        x = arguments.length,
        b,
        w
      if (p.fn) {
        switch ((p.once && this.removeListener(u, p.fn, void 0, !0), x)) {
          case 1:
            return p.fn.call(p.context), !0
          case 2:
            return p.fn.call(p.context, l), !0
          case 3:
            return p.fn.call(p.context, l, f), !0
          case 4:
            return p.fn.call(p.context, l, f, d), !0
          case 5:
            return p.fn.call(p.context, l, f, d, h), !0
          case 6:
            return p.fn.call(p.context, l, f, d, h, y), !0
        }
        for (w = 1, b = new Array(x - 1); w < x; w++) b[w - 1] = arguments[w]
        p.fn.apply(p.context, b)
      } else {
        var g = p.length,
          m
        for (w = 0; w < g; w++)
          switch (
            (p[w].once && this.removeListener(u, p[w].fn, void 0, !0), x)
          ) {
            case 1:
              p[w].fn.call(p[w].context)
              break
            case 2:
              p[w].fn.call(p[w].context, l)
              break
            case 3:
              p[w].fn.call(p[w].context, l, f)
              break
            case 4:
              p[w].fn.call(p[w].context, l, f, d)
              break
            default:
              if (!b)
                for (m = 1, b = new Array(x - 1); m < x; m++)
                  b[m - 1] = arguments[m]
              p[w].fn.apply(p[w].context, b)
          }
      }
      return !0
    }),
    (s.prototype.on = function (u, l, f) {
      return a(this, u, l, f, !1)
    }),
    (s.prototype.once = function (u, l, f) {
      return a(this, u, l, f, !0)
    }),
    (s.prototype.removeListener = function (u, l, f, d) {
      var h = r ? r + u : u
      if (!this._events[h]) return this
      if (!l) return o(this, h), this
      var y = this._events[h]
      if (y.fn)
        y.fn === l && (!d || y.once) && (!f || y.context === f) && o(this, h)
      else {
        for (var v = 0, p = [], x = y.length; v < x; v++)
          (y[v].fn !== l || (d && !y[v].once) || (f && y[v].context !== f)) &&
            p.push(y[v])
        p.length ? (this._events[h] = p.length === 1 ? p[0] : p) : o(this, h)
      }
      return this
    }),
    (s.prototype.removeAllListeners = function (u) {
      var l
      return (
        u
          ? ((l = r ? r + u : u), this._events[l] && o(this, l))
          : ((this._events = new n()), (this._eventsCount = 0)),
        this
      )
    }),
    (s.prototype.off = s.prototype.removeListener),
    (s.prototype.addListener = s.prototype.on),
    (s.prefixed = r),
    (s.EventEmitter = s),
    (e.exports = s)
})(US)
var CV = US.exports
const jV = me(CV)
var Dl = new jV(),
  Ll = 'recharts.syncMouseEvents'
function Fo(e) {
  '@babel/helpers - typeof'
  return (
    (Fo =
      typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
        ? function (t) {
            return typeof t
          }
        : function (t) {
            return t &&
              typeof Symbol == 'function' &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? 'symbol'
              : typeof t
          }),
    Fo(e)
  )
}
function TV(e, t) {
  if (!(e instanceof t))
    throw new TypeError('Cannot call a class as a function')
}
function kV(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r]
    ;(n.enumerable = n.enumerable || !1),
      (n.configurable = !0),
      'value' in n && (n.writable = !0),
      Object.defineProperty(e, WS(n.key), n)
  }
}
function MV(e, t, r) {
  return (
    t && kV(e.prototype, t),
    Object.defineProperty(e, 'prototype', { writable: !1 }),
    e
  )
}
function Bl(e, t, r) {
  return (
    (t = WS(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  )
}
function WS(e) {
  var t = NV(e, 'string')
  return Fo(t) == 'symbol' ? t : t + ''
}
function NV(e, t) {
  if (Fo(e) != 'object' || !e) return e
  var r = e[Symbol.toPrimitive]
  if (r !== void 0) {
    var n = r.call(e, t)
    if (Fo(n) != 'object') return n
    throw new TypeError('@@toPrimitive must return a primitive value.')
  }
  return String(e)
}
var IV = (function () {
  function e() {
    TV(this, e),
      Bl(this, 'activeIndex', 0),
      Bl(this, 'coordinateList', []),
      Bl(this, 'layout', 'horizontal')
  }
  return MV(e, [
    {
      key: 'setDetails',
      value: function (r) {
        var n,
          i = r.coordinateList,
          a = i === void 0 ? null : i,
          o = r.container,
          s = o === void 0 ? null : o,
          c = r.layout,
          u = c === void 0 ? null : c,
          l = r.offset,
          f = l === void 0 ? null : l,
          d = r.mouseHandlerCallback,
          h = d === void 0 ? null : d
        ;(this.coordinateList =
          (n = a ?? this.coordinateList) !== null && n !== void 0 ? n : []),
          (this.container = s ?? this.container),
          (this.layout = u ?? this.layout),
          (this.offset = f ?? this.offset),
          (this.mouseHandlerCallback = h ?? this.mouseHandlerCallback),
          (this.activeIndex = Math.min(
            Math.max(this.activeIndex, 0),
            this.coordinateList.length - 1,
          ))
      },
    },
    {
      key: 'focus',
      value: function () {
        this.spoofMouse()
      },
    },
    {
      key: 'keyboardEvent',
      value: function (r) {
        if (this.coordinateList.length !== 0)
          switch (r.key) {
            case 'ArrowRight': {
              if (this.layout !== 'horizontal') return
              ;(this.activeIndex = Math.min(
                this.activeIndex + 1,
                this.coordinateList.length - 1,
              )),
                this.spoofMouse()
              break
            }
            case 'ArrowLeft': {
              if (this.layout !== 'horizontal') return
              ;(this.activeIndex = Math.max(this.activeIndex - 1, 0)),
                this.spoofMouse()
              break
            }
          }
      },
    },
    {
      key: 'setIndex',
      value: function (r) {
        this.activeIndex = r
      },
    },
    {
      key: 'spoofMouse',
      value: function () {
        var r, n
        if (this.layout === 'horizontal' && this.coordinateList.length !== 0) {
          var i = this.container.getBoundingClientRect(),
            a = i.x,
            o = i.y,
            s = i.height,
            c = this.coordinateList[this.activeIndex].coordinate,
            u =
              ((r = window) === null || r === void 0 ? void 0 : r.scrollX) || 0,
            l =
              ((n = window) === null || n === void 0 ? void 0 : n.scrollY) || 0,
            f = a + c + u,
            d = o + this.offset.top + s / 2 + l
          this.mouseHandlerCallback({ pageX: f, pageY: d })
        }
      },
    },
  ])
})()
function RV(e, t, r) {
  if (r === 'number' && t === !0 && Array.isArray(e)) {
    var n = e == null ? void 0 : e[0],
      i = e == null ? void 0 : e[1]
    if (n && i && U(n) && U(i)) return !0
  }
  return !1
}
function DV(e, t, r, n) {
  var i = n / 2
  return {
    stroke: 'none',
    fill: '#ccc',
    x: e === 'horizontal' ? t.x - i : r.left + 0.5,
    y: e === 'horizontal' ? r.top + 0.5 : t.y - i,
    width: e === 'horizontal' ? n : r.width - 1,
    height: e === 'horizontal' ? r.height - 1 : n,
  }
}
function qS(e) {
  var t = e.cx,
    r = e.cy,
    n = e.radius,
    i = e.startAngle,
    a = e.endAngle,
    o = Pe(t, r, n, i),
    s = Pe(t, r, n, a)
  return { points: [o, s], cx: t, cy: r, radius: n, startAngle: i, endAngle: a }
}
function LV(e, t, r) {
  var n, i, a, o
  if (e === 'horizontal')
    (n = t.x), (a = n), (i = r.top), (o = r.top + r.height)
  else if (e === 'vertical')
    (i = t.y), (o = i), (n = r.left), (a = r.left + r.width)
  else if (t.cx != null && t.cy != null)
    if (e === 'centric') {
      var s = t.cx,
        c = t.cy,
        u = t.innerRadius,
        l = t.outerRadius,
        f = t.angle,
        d = Pe(s, c, u, f),
        h = Pe(s, c, l, f)
      ;(n = d.x), (i = d.y), (a = h.x), (o = h.y)
    } else return qS(t)
  return [
    { x: n, y: i },
    { x: a, y: o },
  ]
}
function Uo(e) {
  '@babel/helpers - typeof'
  return (
    (Uo =
      typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
        ? function (t) {
            return typeof t
          }
        : function (t) {
            return t &&
              typeof Symbol == 'function' &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? 'symbol'
              : typeof t
          }),
    Uo(e)
  )
}
function E0(e, t) {
  var r = Object.keys(e)
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e)
    t &&
      (n = n.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable
      })),
      r.push.apply(r, n)
  }
  return r
}
function Cs(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {}
    t % 2
      ? E0(Object(r), !0).forEach(function (n) {
          BV(e, n, r[n])
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
        : E0(Object(r)).forEach(function (n) {
            Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
          })
  }
  return e
}
function BV(e, t, r) {
  return (
    (t = FV(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  )
}
function FV(e) {
  var t = UV(e, 'string')
  return Uo(t) == 'symbol' ? t : t + ''
}
function UV(e, t) {
  if (Uo(e) != 'object' || !e) return e
  var r = e[Symbol.toPrimitive]
  if (r !== void 0) {
    var n = r.call(e, t || 'default')
    if (Uo(n) != 'object') return n
    throw new TypeError('@@toPrimitive must return a primitive value.')
  }
  return (t === 'string' ? String : Number)(e)
}
function WV(e) {
  var t,
    r,
    n = e.element,
    i = e.tooltipEventType,
    a = e.isActive,
    o = e.activeCoordinate,
    s = e.activePayload,
    c = e.offset,
    u = e.activeTooltipIndex,
    l = e.tooltipAxisBandSize,
    f = e.layout,
    d = e.chartName,
    h =
      (t = n.props.cursor) !== null && t !== void 0
        ? t
        : (r = n.type.defaultProps) === null || r === void 0
          ? void 0
          : r.cursor
  if (!n || !h || !a || !o || (d !== 'ScatterChart' && i !== 'axis'))
    return null
  var y,
    v = Pc
  if (d === 'ScatterChart') (y = o), (v = oq)
  else if (d === 'BarChart') (y = DV(f, o, c, l)), (v = Op)
  else if (f === 'radial') {
    var p = qS(o),
      x = p.cx,
      b = p.cy,
      w = p.radius,
      g = p.startAngle,
      m = p.endAngle
    ;(y = {
      cx: x,
      cy: b,
      startAngle: g,
      endAngle: m,
      innerRadius: w,
      outerRadius: w,
    }),
      (v = UO)
  } else (y = { points: LV(f, o, c) }), (v = Pc)
  var S = Cs(
    Cs(Cs(Cs({ stroke: '#ccc', pointerEvents: 'none' }, c), y), J(h, !1)),
    {},
    {
      payload: s,
      payloadIndex: u,
      className: ue('recharts-tooltip-cursor', h.className),
    },
  )
  return A.isValidElement(h) ? A.cloneElement(h, S) : A.createElement(v, S)
}
var qV = ['item'],
  HV = [
    'children',
    'className',
    'width',
    'height',
    'style',
    'compact',
    'title',
    'desc',
  ]
function oa(e) {
  '@babel/helpers - typeof'
  return (
    (oa =
      typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
        ? function (t) {
            return typeof t
          }
        : function (t) {
            return t &&
              typeof Symbol == 'function' &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? 'symbol'
              : typeof t
          }),
    oa(e)
  )
}
function to() {
  return (
    (to = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t]
            for (var n in r)
              Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
          }
          return e
        }),
    to.apply(this, arguments)
  )
}
function _0(e, t) {
  return GV(e) || KV(e, t) || zS(e, t) || zV()
}
function zV() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}
function KV(e, t) {
  var r =
    e == null
      ? null
      : (typeof Symbol < 'u' && e[Symbol.iterator]) || e['@@iterator']
  if (r != null) {
    var n,
      i,
      a,
      o,
      s = [],
      c = !0,
      u = !1
    try {
      if (((a = (r = r.call(e)).next), t !== 0))
        for (
          ;
          !(c = (n = a.call(r)).done) && (s.push(n.value), s.length !== t);
          c = !0
        );
    } catch (l) {
      ;(u = !0), (i = l)
    } finally {
      try {
        if (!c && r.return != null && ((o = r.return()), Object(o) !== o))
          return
      } finally {
        if (u) throw i
      }
    }
    return s
  }
}
function GV(e) {
  if (Array.isArray(e)) return e
}
function C0(e, t) {
  if (e == null) return {}
  var r = VV(e, t),
    n,
    i
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e)
    for (i = 0; i < a.length; i++)
      (n = a[i]),
        !(t.indexOf(n) >= 0) &&
          Object.prototype.propertyIsEnumerable.call(e, n) &&
          (r[n] = e[n])
  }
  return r
}
function VV(e, t) {
  if (e == null) return {}
  var r = {}
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) >= 0) continue
      r[n] = e[n]
    }
  return r
}
function XV(e, t) {
  if (!(e instanceof t))
    throw new TypeError('Cannot call a class as a function')
}
function YV(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r]
    ;(n.enumerable = n.enumerable || !1),
      (n.configurable = !0),
      'value' in n && (n.writable = !0),
      Object.defineProperty(e, KS(n.key), n)
  }
}
function QV(e, t, r) {
  return (
    t && YV(e.prototype, t),
    Object.defineProperty(e, 'prototype', { writable: !1 }),
    e
  )
}
function ZV(e, t, r) {
  return (
    (t = Vc(t)),
    JV(
      e,
      HS() ? Reflect.construct(t, r || [], Vc(e).constructor) : t.apply(e, r),
    )
  )
}
function JV(e, t) {
  if (t && (oa(t) === 'object' || typeof t == 'function')) return t
  if (t !== void 0)
    throw new TypeError(
      'Derived constructors may only return object or undefined',
    )
  return eX(e)
}
function eX(e) {
  if (e === void 0)
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called",
    )
  return e
}
function HS() {
  try {
    var e = !Boolean.prototype.valueOf.call(
      Reflect.construct(Boolean, [], function () {}),
    )
  } catch {}
  return (HS = function () {
    return !!e
  })()
}
function Vc(e) {
  return (
    (Vc = Object.setPrototypeOf
      ? Object.getPrototypeOf.bind()
      : function (r) {
          return r.__proto__ || Object.getPrototypeOf(r)
        }),
    Vc(e)
  )
}
function tX(e, t) {
  if (typeof t != 'function' && t !== null)
    throw new TypeError('Super expression must either be null or a function')
  ;(e.prototype = Object.create(t && t.prototype, {
    constructor: { value: e, writable: !0, configurable: !0 },
  })),
    Object.defineProperty(e, 'prototype', { writable: !1 }),
    t && qd(e, t)
}
function qd(e, t) {
  return (
    (qd = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (n, i) {
          return (n.__proto__ = i), n
        }),
    qd(e, t)
  )
}
function sa(e) {
  return iX(e) || nX(e) || zS(e) || rX()
}
function rX() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}
function zS(e, t) {
  if (e) {
    if (typeof e == 'string') return Hd(e, t)
    var r = Object.prototype.toString.call(e).slice(8, -1)
    if (
      (r === 'Object' && e.constructor && (r = e.constructor.name),
      r === 'Map' || r === 'Set')
    )
      return Array.from(e)
    if (r === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
      return Hd(e, t)
  }
}
function nX(e) {
  if (
    (typeof Symbol < 'u' && e[Symbol.iterator] != null) ||
    e['@@iterator'] != null
  )
    return Array.from(e)
}
function iX(e) {
  if (Array.isArray(e)) return Hd(e)
}
function Hd(e, t) {
  ;(t == null || t > e.length) && (t = e.length)
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r]
  return n
}
function j0(e, t) {
  var r = Object.keys(e)
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e)
    t &&
      (n = n.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable
      })),
      r.push.apply(r, n)
  }
  return r
}
function D(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {}
    t % 2
      ? j0(Object(r), !0).forEach(function (n) {
          re(e, n, r[n])
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
        : j0(Object(r)).forEach(function (n) {
            Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n))
          })
  }
  return e
}
function re(e, t, r) {
  return (
    (t = KS(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  )
}
function KS(e) {
  var t = aX(e, 'string')
  return oa(t) == 'symbol' ? t : t + ''
}
function aX(e, t) {
  if (oa(e) != 'object' || !e) return e
  var r = e[Symbol.toPrimitive]
  if (r !== void 0) {
    var n = r.call(e, t || 'default')
    if (oa(n) != 'object') return n
    throw new TypeError('@@toPrimitive must return a primitive value.')
  }
  return (t === 'string' ? String : Number)(e)
}
var oX = { xAxis: ['bottom', 'top'], yAxis: ['left', 'right'] },
  sX = { width: '100%', height: '100%' },
  GS = { x: 0, y: 0 }
function js(e) {
  return e
}
var cX = function (t, r) {
    return r === 'horizontal'
      ? t.x
      : r === 'vertical'
        ? t.y
        : r === 'centric'
          ? t.angle
          : t.radius
  },
  uX = function (t, r, n, i) {
    var a = r.find(function (l) {
      return l && l.index === n
    })
    if (a) {
      if (t === 'horizontal') return { x: a.coordinate, y: i.y }
      if (t === 'vertical') return { x: i.x, y: a.coordinate }
      if (t === 'centric') {
        var o = a.coordinate,
          s = i.radius
        return D(D(D({}, i), Pe(i.cx, i.cy, s, o)), {}, { angle: o, radius: s })
      }
      var c = a.coordinate,
        u = i.angle
      return D(D(D({}, i), Pe(i.cx, i.cy, c, u)), {}, { angle: u, radius: c })
    }
    return GS
  },
  el = function (t, r) {
    var n = r.graphicalItems,
      i = r.dataStartIndex,
      a = r.dataEndIndex,
      o = (n ?? []).reduce(function (s, c) {
        var u = c.props.data
        return u && u.length ? [].concat(sa(s), sa(u)) : s
      }, [])
    return o.length > 0
      ? o
      : t && t.length && U(i) && U(a)
        ? t.slice(i, a + 1)
        : []
  }
function VS(e) {
  return e === 'number' ? [0, 'auto'] : void 0
}
var zd = function (t, r, n, i) {
    var a = t.graphicalItems,
      o = t.tooltipAxis,
      s = el(r, t)
    return n < 0 || !a || !a.length || n >= s.length
      ? null
      : a.reduce(function (c, u) {
          var l,
            f = (l = u.props.data) !== null && l !== void 0 ? l : r
          f &&
            t.dataStartIndex + t.dataEndIndex !== 0 &&
            t.dataEndIndex - t.dataStartIndex >= n &&
            (f = f.slice(t.dataStartIndex, t.dataEndIndex + 1))
          var d
          if (o.dataKey && !o.allowDuplicatedCategory) {
            var h = f === void 0 ? s : f
            d = Vs(h, o.dataKey, i)
          } else d = (f && f[n]) || s[n]
          return d ? [].concat(sa(c), [IO(u, d)]) : c
        }, [])
  },
  T0 = function (t, r, n, i) {
    var a = i || { x: t.chartX, y: t.chartY },
      o = cX(a, n),
      s = t.orderedTooltipTicks,
      c = t.tooltipAxis,
      u = t.tooltipTicks,
      l = zF(o, s, u, c)
    if (l >= 0 && u) {
      var f = u[l] && u[l].value,
        d = zd(t, r, l, f),
        h = uX(n, s, l, a)
      return {
        activeTooltipIndex: l,
        activeLabel: f,
        activePayload: d,
        activeCoordinate: h,
      }
    }
    return null
  },
  lX = function (t, r) {
    var n = r.axes,
      i = r.graphicalItems,
      a = r.axisType,
      o = r.axisIdKey,
      s = r.stackGroups,
      c = r.dataStartIndex,
      u = r.dataEndIndex,
      l = t.layout,
      f = t.children,
      d = t.stackOffset,
      h = CO(l, a)
    return n.reduce(function (y, v) {
      var p,
        x =
          v.type.defaultProps !== void 0
            ? D(D({}, v.type.defaultProps), v.props)
            : v.props,
        b = x.type,
        w = x.dataKey,
        g = x.allowDataOverflow,
        m = x.allowDuplicatedCategory,
        S = x.scale,
        P = x.ticks,
        $ = x.includeHidden,
        T = x[o]
      if (y[T]) return y
      var k = el(t.data, {
          graphicalItems: i.filter(function (H) {
            var Q,
              ne =
                o in H.props
                  ? H.props[o]
                  : (Q = H.type.defaultProps) === null || Q === void 0
                    ? void 0
                    : Q[o]
            return ne === T
          }),
          dataStartIndex: c,
          dataEndIndex: u,
        }),
        C = k.length,
        j,
        M,
        N
      RV(x.domain, g, b) &&
        ((j = id(x.domain, null, g)),
        h && (b === 'number' || S !== 'auto') && (N = Ya(k, w, 'category')))
      var R = VS(b)
      if (!j || j.length === 0) {
        var I,
          L = (I = x.domain) !== null && I !== void 0 ? I : R
        if (w) {
          if (((j = Ya(k, w, b)), b === 'category' && h)) {
            var B = NT(j)
            m && B
              ? ((M = j), (j = Ic(0, C)))
              : m ||
                (j = Jm(L, j, v).reduce(function (H, Q) {
                  return H.indexOf(Q) >= 0 ? H : [].concat(sa(H), [Q])
                }, []))
          } else if (b === 'category')
            m
              ? (j = j.filter(function (H) {
                  return H !== '' && !se(H)
                }))
              : (j = Jm(L, j, v).reduce(function (H, Q) {
                  return H.indexOf(Q) >= 0 || Q === '' || se(Q)
                    ? H
                    : [].concat(sa(H), [Q])
                }, []))
          else if (b === 'number') {
            var W = YF(
              k,
              i.filter(function (H) {
                var Q,
                  ne,
                  he =
                    o in H.props
                      ? H.props[o]
                      : (Q = H.type.defaultProps) === null || Q === void 0
                        ? void 0
                        : Q[o],
                  Ge =
                    'hide' in H.props
                      ? H.props.hide
                      : (ne = H.type.defaultProps) === null || ne === void 0
                        ? void 0
                        : ne.hide
                return he === T && ($ || !Ge)
              }),
              w,
              a,
              l,
            )
            W && (j = W)
          }
          h && (b === 'number' || S !== 'auto') && (N = Ya(k, w, 'category'))
        } else
          h
            ? (j = Ic(0, C))
            : s && s[T] && s[T].hasStack && b === 'number'
              ? (j = d === 'expand' ? [0, 1] : NO(s[T].stackGroups, c, u))
              : (j = _O(
                  k,
                  i.filter(function (H) {
                    var Q = o in H.props ? H.props[o] : H.type.defaultProps[o],
                      ne =
                        'hide' in H.props
                          ? H.props.hide
                          : H.type.defaultProps.hide
                    return Q === T && ($ || !ne)
                  }),
                  b,
                  l,
                  !0,
                ))
        if (b === 'number') (j = Wd(f, j, T, a, P)), L && (j = id(L, j, g))
        else if (b === 'category' && L) {
          var G = L,
            z = j.every(function (H) {
              return G.indexOf(H) >= 0
            })
          z && (j = G)
        }
      }
      return D(
        D({}, y),
        {},
        re(
          {},
          T,
          D(
            D({}, x),
            {},
            {
              axisType: a,
              domain: j,
              categoricalDomain: N,
              duplicateDomain: M,
              originalDomain: (p = x.domain) !== null && p !== void 0 ? p : R,
              isCategorical: h,
              layout: l,
            },
          ),
        ),
      )
    }, {})
  },
  fX = function (t, r) {
    var n = r.graphicalItems,
      i = r.Axis,
      a = r.axisType,
      o = r.axisIdKey,
      s = r.stackGroups,
      c = r.dataStartIndex,
      u = r.dataEndIndex,
      l = t.layout,
      f = t.children,
      d = el(t.data, { graphicalItems: n, dataStartIndex: c, dataEndIndex: u }),
      h = d.length,
      y = CO(l, a),
      v = -1
    return n.reduce(function (p, x) {
      var b =
          x.type.defaultProps !== void 0
            ? D(D({}, x.type.defaultProps), x.props)
            : x.props,
        w = b[o],
        g = VS('number')
      if (!p[w]) {
        v++
        var m
        return (
          y
            ? (m = Ic(0, h))
            : s && s[w] && s[w].hasStack
              ? ((m = NO(s[w].stackGroups, c, u)), (m = Wd(f, m, w, a)))
              : ((m = id(
                  g,
                  _O(
                    d,
                    n.filter(function (S) {
                      var P,
                        $,
                        T =
                          o in S.props
                            ? S.props[o]
                            : (P = S.type.defaultProps) === null || P === void 0
                              ? void 0
                              : P[o],
                        k =
                          'hide' in S.props
                            ? S.props.hide
                            : ($ = S.type.defaultProps) === null || $ === void 0
                              ? void 0
                              : $.hide
                      return T === w && !k
                    }),
                    'number',
                    l,
                  ),
                  i.defaultProps.allowDataOverflow,
                )),
                (m = Wd(f, m, w, a))),
          D(
            D({}, p),
            {},
            re(
              {},
              w,
              D(
                D({ axisType: a }, i.defaultProps),
                {},
                {
                  hide: !0,
                  orientation: xt(oX, ''.concat(a, '.').concat(v % 2), null),
                  domain: m,
                  originalDomain: g,
                  isCategorical: y,
                  layout: l,
                },
              ),
            ),
          )
        )
      }
      return p
    }, {})
  },
  dX = function (t, r) {
    var n = r.axisType,
      i = n === void 0 ? 'xAxis' : n,
      a = r.AxisComp,
      o = r.graphicalItems,
      s = r.stackGroups,
      c = r.dataStartIndex,
      u = r.dataEndIndex,
      l = t.children,
      f = ''.concat(i, 'Id'),
      d = wt(l, a),
      h = {}
    return (
      d && d.length
        ? (h = lX(t, {
            axes: d,
            graphicalItems: o,
            axisType: i,
            axisIdKey: f,
            stackGroups: s,
            dataStartIndex: c,
            dataEndIndex: u,
          }))
        : o &&
          o.length &&
          (h = fX(t, {
            Axis: a,
            graphicalItems: o,
            axisType: i,
            axisIdKey: f,
            stackGroups: s,
            dataStartIndex: c,
            dataEndIndex: u,
          })),
      h
    )
  },
  hX = function (t) {
    var r = Wr(t),
      n = xr(r, !1, !0)
    return {
      tooltipTicks: n,
      orderedTooltipTicks: Xh(n, function (i) {
        return i.coordinate
      }),
      tooltipAxis: r,
      tooltipAxisBandSize: Oc(r, n),
    }
  },
  k0 = function (t) {
    var r = t.children,
      n = t.defaultShowTooltip,
      i = mt(r, Xi),
      a = 0,
      o = 0
    return (
      t.data && t.data.length !== 0 && (o = t.data.length - 1),
      i &&
        i.props &&
        (i.props.startIndex >= 0 && (a = i.props.startIndex),
        i.props.endIndex >= 0 && (o = i.props.endIndex)),
      {
        chartX: 0,
        chartY: 0,
        dataStartIndex: a,
        dataEndIndex: o,
        activeTooltipIndex: -1,
        isTooltipActive: !!n,
      }
    )
  },
  pX = function (t) {
    return !t || !t.length
      ? !1
      : t.some(function (r) {
          var n = Or(r && r.type)
          return n && n.indexOf('Bar') >= 0
        })
  },
  M0 = function (t) {
    return t === 'horizontal'
      ? { numericAxisName: 'yAxis', cateAxisName: 'xAxis' }
      : t === 'vertical'
        ? { numericAxisName: 'xAxis', cateAxisName: 'yAxis' }
        : t === 'centric'
          ? { numericAxisName: 'radiusAxis', cateAxisName: 'angleAxis' }
          : { numericAxisName: 'angleAxis', cateAxisName: 'radiusAxis' }
  },
  vX = function (t, r) {
    var n = t.props,
      i = t.graphicalItems,
      a = t.xAxisMap,
      o = a === void 0 ? {} : a,
      s = t.yAxisMap,
      c = s === void 0 ? {} : s,
      u = n.width,
      l = n.height,
      f = n.children,
      d = n.margin || {},
      h = mt(f, Xi),
      y = mt(f, di),
      v = Object.keys(c).reduce(
        function (m, S) {
          var P = c[S],
            $ = P.orientation
          return !P.mirror && !P.hide
            ? D(D({}, m), {}, re({}, $, m[$] + P.width))
            : m
        },
        { left: d.left || 0, right: d.right || 0 },
      ),
      p = Object.keys(o).reduce(
        function (m, S) {
          var P = o[S],
            $ = P.orientation
          return !P.mirror && !P.hide
            ? D(D({}, m), {}, re({}, $, xt(m, ''.concat($)) + P.height))
            : m
        },
        { top: d.top || 0, bottom: d.bottom || 0 },
      ),
      x = D(D({}, p), v),
      b = x.bottom
    h && (x.bottom += h.props.height || Xi.defaultProps.height),
      y && r && (x = VF(x, i, n, r))
    var w = u - x.left - x.right,
      g = l - x.top - x.bottom
    return D(
      D({ brushBottom: b }, x),
      {},
      { width: Math.max(w, 0), height: Math.max(g, 0) },
    )
  },
  yX = function (t, r) {
    if (r === 'xAxis') return t[r].width
    if (r === 'yAxis') return t[r].height
  },
  kp = function (t) {
    var r = t.chartName,
      n = t.GraphicalChild,
      i = t.defaultTooltipEventType,
      a = i === void 0 ? 'axis' : i,
      o = t.validateTooltipEventTypes,
      s = o === void 0 ? ['axis'] : o,
      c = t.axisComponents,
      u = t.legendContent,
      l = t.formatAxisMap,
      f = t.defaultProps,
      d = function (p, x) {
        var b = x.graphicalItems,
          w = x.stackGroups,
          g = x.offset,
          m = x.updateId,
          S = x.dataStartIndex,
          P = x.dataEndIndex,
          $ = p.barSize,
          T = p.layout,
          k = p.barGap,
          C = p.barCategoryGap,
          j = p.maxBarSize,
          M = M0(T),
          N = M.numericAxisName,
          R = M.cateAxisName,
          I = pX(b),
          L = []
        return (
          b.forEach(function (B, W) {
            var G = el(p.data, {
                graphicalItems: [B],
                dataStartIndex: S,
                dataEndIndex: P,
              }),
              z =
                B.type.defaultProps !== void 0
                  ? D(D({}, B.type.defaultProps), B.props)
                  : B.props,
              H = z.dataKey,
              Q = z.maxBarSize,
              ne = z[''.concat(N, 'Id')],
              he = z[''.concat(R, 'Id')],
              Ge = {},
              je = c.reduce(function (et, St) {
                var Yn = x[''.concat(St.axisType, 'Map')],
                  $a = z[''.concat(St.axisType, 'Id')]
                ;(Yn && Yn[$a]) || St.axisType === 'zAxis' || Un()
                var Qn = Yn[$a]
                return D(
                  D({}, et),
                  {},
                  re(
                    re({}, St.axisType, Qn),
                    ''.concat(St.axisType, 'Ticks'),
                    xr(Qn),
                  ),
                )
              }, Ge),
              Le = je[R],
              q = je[''.concat(R, 'Ticks')],
              te = w && w[ne] && w[ne].hasStack && a9(B, w[ne].stackGroups),
              ae = Or(B.type).indexOf('Bar') >= 0,
              F = Oc(Le, q),
              be = [],
              le = I && KF({ barSize: $, stackGroups: w, totalSize: yX(je, R) })
            if (ae) {
              var oe,
                Oe,
                Ne = se(Q) ? j : Q,
                Lt =
                  (oe =
                    (Oe = Oc(Le, q, !0)) !== null && Oe !== void 0
                      ? Oe
                      : Ne) !== null && oe !== void 0
                    ? oe
                    : 0
              ;(be = GF({
                barGap: k,
                barCategoryGap: C,
                bandSize: Lt !== F ? Lt : F,
                sizeList: le[he],
                maxBarSize: Ne,
              })),
                Lt !== F &&
                  (be = be.map(function (et) {
                    return D(
                      D({}, et),
                      {},
                      {
                        position: D(
                          D({}, et.position),
                          {},
                          { offset: et.position.offset - Lt / 2 },
                        ),
                      },
                    )
                  }))
            }
            var Xn = B && B.type && B.type.getComposedData
            Xn &&
              L.push({
                props: D(
                  D(
                    {},
                    Xn(
                      D(
                        D({}, je),
                        {},
                        {
                          displayedData: G,
                          props: p,
                          dataKey: H,
                          item: B,
                          bandSize: F,
                          barPosition: be,
                          offset: g,
                          stackedData: te,
                          layout: T,
                          dataStartIndex: S,
                          dataEndIndex: P,
                        },
                      ),
                    ),
                  ),
                  {},
                  re(
                    re(
                      re({ key: B.key || 'item-'.concat(W) }, N, je[N]),
                      R,
                      je[R],
                    ),
                    'animationId',
                    m,
                  ),
                ),
                childIndex: KT(B, p.children),
                item: B,
              })
          }),
          L
        )
      },
      h = function (p, x) {
        var b = p.props,
          w = p.dataStartIndex,
          g = p.dataEndIndex,
          m = p.updateId
        if (!Kv({ props: b })) return null
        var S = b.children,
          P = b.layout,
          $ = b.stackOffset,
          T = b.data,
          k = b.reverseStackOrder,
          C = M0(P),
          j = C.numericAxisName,
          M = C.cateAxisName,
          N = wt(S, n),
          R = n9(T, N, ''.concat(j, 'Id'), ''.concat(M, 'Id'), $, k),
          I = c.reduce(function (z, H) {
            var Q = ''.concat(H.axisType, 'Map')
            return D(
              D({}, z),
              {},
              re(
                {},
                Q,
                dX(
                  b,
                  D(
                    D({}, H),
                    {},
                    {
                      graphicalItems: N,
                      stackGroups: H.axisType === j && R,
                      dataStartIndex: w,
                      dataEndIndex: g,
                    },
                  ),
                ),
              ),
            )
          }, {}),
          L = vX(
            D(D({}, I), {}, { props: b, graphicalItems: N }),
            x == null ? void 0 : x.legendBBox,
          )
        Object.keys(I).forEach(function (z) {
          I[z] = l(b, I[z], L, z.replace('Map', ''), r)
        })
        var B = I[''.concat(M, 'Map')],
          W = hX(B),
          G = d(
            b,
            D(
              D({}, I),
              {},
              {
                dataStartIndex: w,
                dataEndIndex: g,
                updateId: m,
                graphicalItems: N,
                stackGroups: R,
                offset: L,
              },
            ),
          )
        return D(
          D(
            {
              formattedGraphicalItems: G,
              graphicalItems: N,
              offset: L,
              stackGroups: R,
            },
            W,
          ),
          I,
        )
      },
      y = (function (v) {
        function p(x) {
          var b, w, g
          return (
            XV(this, p),
            (g = ZV(this, p, [x])),
            re(g, 'eventEmitterSymbol', Symbol('rechartsEventEmitter')),
            re(g, 'accessibilityManager', new IV()),
            re(g, 'handleLegendBBoxUpdate', function (m) {
              if (m) {
                var S = g.state,
                  P = S.dataStartIndex,
                  $ = S.dataEndIndex,
                  T = S.updateId
                g.setState(
                  D(
                    { legendBBox: m },
                    h(
                      {
                        props: g.props,
                        dataStartIndex: P,
                        dataEndIndex: $,
                        updateId: T,
                      },
                      D(D({}, g.state), {}, { legendBBox: m }),
                    ),
                  ),
                )
              }
            }),
            re(g, 'handleReceiveSyncEvent', function (m, S, P) {
              if (g.props.syncId === m) {
                if (
                  P === g.eventEmitterSymbol &&
                  typeof g.props.syncMethod != 'function'
                )
                  return
                g.applySyncEvent(S)
              }
            }),
            re(g, 'handleBrushChange', function (m) {
              var S = m.startIndex,
                P = m.endIndex
              if (S !== g.state.dataStartIndex || P !== g.state.dataEndIndex) {
                var $ = g.state.updateId
                g.setState(function () {
                  return D(
                    { dataStartIndex: S, dataEndIndex: P },
                    h(
                      {
                        props: g.props,
                        dataStartIndex: S,
                        dataEndIndex: P,
                        updateId: $,
                      },
                      g.state,
                    ),
                  )
                }),
                  g.triggerSyncEvent({ dataStartIndex: S, dataEndIndex: P })
              }
            }),
            re(g, 'handleMouseEnter', function (m) {
              var S = g.getMouseInfo(m)
              if (S) {
                var P = D(D({}, S), {}, { isTooltipActive: !0 })
                g.setState(P), g.triggerSyncEvent(P)
                var $ = g.props.onMouseEnter
                ie($) && $(P, m)
              }
            }),
            re(g, 'triggeredAfterMouseMove', function (m) {
              var S = g.getMouseInfo(m),
                P = S
                  ? D(D({}, S), {}, { isTooltipActive: !0 })
                  : { isTooltipActive: !1 }
              g.setState(P), g.triggerSyncEvent(P)
              var $ = g.props.onMouseMove
              ie($) && $(P, m)
            }),
            re(g, 'handleItemMouseEnter', function (m) {
              g.setState(function () {
                return {
                  isTooltipActive: !0,
                  activeItem: m,
                  activePayload: m.tooltipPayload,
                  activeCoordinate: m.tooltipPosition || { x: m.cx, y: m.cy },
                }
              })
            }),
            re(g, 'handleItemMouseLeave', function () {
              g.setState(function () {
                return { isTooltipActive: !1 }
              })
            }),
            re(g, 'handleMouseMove', function (m) {
              m.persist(), g.throttleTriggeredAfterMouseMove(m)
            }),
            re(g, 'handleMouseLeave', function (m) {
              g.throttleTriggeredAfterMouseMove.cancel()
              var S = { isTooltipActive: !1 }
              g.setState(S), g.triggerSyncEvent(S)
              var P = g.props.onMouseLeave
              ie(P) && P(S, m)
            }),
            re(g, 'handleOuterEvent', function (m) {
              var S = zT(m),
                P = xt(g.props, ''.concat(S))
              if (S && ie(P)) {
                var $, T
                ;/.*touch.*/i.test(S)
                  ? (T = g.getMouseInfo(m.changedTouches[0]))
                  : (T = g.getMouseInfo(m)),
                  P(($ = T) !== null && $ !== void 0 ? $ : {}, m)
              }
            }),
            re(g, 'handleClick', function (m) {
              var S = g.getMouseInfo(m)
              if (S) {
                var P = D(D({}, S), {}, { isTooltipActive: !0 })
                g.setState(P), g.triggerSyncEvent(P)
                var $ = g.props.onClick
                ie($) && $(P, m)
              }
            }),
            re(g, 'handleMouseDown', function (m) {
              var S = g.props.onMouseDown
              if (ie(S)) {
                var P = g.getMouseInfo(m)
                S(P, m)
              }
            }),
            re(g, 'handleMouseUp', function (m) {
              var S = g.props.onMouseUp
              if (ie(S)) {
                var P = g.getMouseInfo(m)
                S(P, m)
              }
            }),
            re(g, 'handleTouchMove', function (m) {
              m.changedTouches != null &&
                m.changedTouches.length > 0 &&
                g.throttleTriggeredAfterMouseMove(m.changedTouches[0])
            }),
            re(g, 'handleTouchStart', function (m) {
              m.changedTouches != null &&
                m.changedTouches.length > 0 &&
                g.handleMouseDown(m.changedTouches[0])
            }),
            re(g, 'handleTouchEnd', function (m) {
              m.changedTouches != null &&
                m.changedTouches.length > 0 &&
                g.handleMouseUp(m.changedTouches[0])
            }),
            re(g, 'triggerSyncEvent', function (m) {
              g.props.syncId !== void 0 &&
                Dl.emit(Ll, g.props.syncId, m, g.eventEmitterSymbol)
            }),
            re(g, 'applySyncEvent', function (m) {
              var S = g.props,
                P = S.layout,
                $ = S.syncMethod,
                T = g.state.updateId,
                k = m.dataStartIndex,
                C = m.dataEndIndex
              if (m.dataStartIndex !== void 0 || m.dataEndIndex !== void 0)
                g.setState(
                  D(
                    { dataStartIndex: k, dataEndIndex: C },
                    h(
                      {
                        props: g.props,
                        dataStartIndex: k,
                        dataEndIndex: C,
                        updateId: T,
                      },
                      g.state,
                    ),
                  ),
                )
              else if (m.activeTooltipIndex !== void 0) {
                var j = m.chartX,
                  M = m.chartY,
                  N = m.activeTooltipIndex,
                  R = g.state,
                  I = R.offset,
                  L = R.tooltipTicks
                if (!I) return
                if (typeof $ == 'function') N = $(L, m)
                else if ($ === 'value') {
                  N = -1
                  for (var B = 0; B < L.length; B++)
                    if (L[B].value === m.activeLabel) {
                      N = B
                      break
                    }
                }
                var W = D(D({}, I), {}, { x: I.left, y: I.top }),
                  G = Math.min(j, W.x + W.width),
                  z = Math.min(M, W.y + W.height),
                  H = L[N] && L[N].value,
                  Q = zd(g.state, g.props.data, N),
                  ne = L[N]
                    ? {
                        x: P === 'horizontal' ? L[N].coordinate : G,
                        y: P === 'horizontal' ? z : L[N].coordinate,
                      }
                    : GS
                g.setState(
                  D(
                    D({}, m),
                    {},
                    {
                      activeLabel: H,
                      activeCoordinate: ne,
                      activePayload: Q,
                      activeTooltipIndex: N,
                    },
                  ),
                )
              } else g.setState(m)
            }),
            re(g, 'renderCursor', function (m) {
              var S,
                P = g.state,
                $ = P.isTooltipActive,
                T = P.activeCoordinate,
                k = P.activePayload,
                C = P.offset,
                j = P.activeTooltipIndex,
                M = P.tooltipAxisBandSize,
                N = g.getTooltipEventType(),
                R = (S = m.props.active) !== null && S !== void 0 ? S : $,
                I = g.props.layout,
                L = m.key || '_recharts-cursor'
              return E.createElement(WV, {
                key: L,
                activeCoordinate: T,
                activePayload: k,
                activeTooltipIndex: j,
                chartName: r,
                element: m,
                isActive: R,
                layout: I,
                offset: C,
                tooltipAxisBandSize: M,
                tooltipEventType: N,
              })
            }),
            re(g, 'renderPolarAxis', function (m, S, P) {
              var $ = xt(m, 'type.axisType'),
                T = xt(g.state, ''.concat($, 'Map')),
                k = m.type.defaultProps,
                C = k !== void 0 ? D(D({}, k), m.props) : m.props,
                j = T && T[C[''.concat($, 'Id')]]
              return A.cloneElement(
                m,
                D(
                  D({}, j),
                  {},
                  {
                    className: ue($, j.className),
                    key: m.key || ''.concat(S, '-').concat(P),
                    ticks: xr(j, !0),
                  },
                ),
              )
            }),
            re(g, 'renderPolarGrid', function (m) {
              var S = m.props,
                P = S.radialLines,
                $ = S.polarAngles,
                T = S.polarRadius,
                k = g.state,
                C = k.radiusAxisMap,
                j = k.angleAxisMap,
                M = Wr(C),
                N = Wr(j),
                R = N.cx,
                I = N.cy,
                L = N.innerRadius,
                B = N.outerRadius
              return A.cloneElement(m, {
                polarAngles: Array.isArray($)
                  ? $
                  : xr(N, !0).map(function (W) {
                      return W.coordinate
                    }),
                polarRadius: Array.isArray(T)
                  ? T
                  : xr(M, !0).map(function (W) {
                      return W.coordinate
                    }),
                cx: R,
                cy: I,
                innerRadius: L,
                outerRadius: B,
                key: m.key || 'polar-grid',
                radialLines: P,
              })
            }),
            re(g, 'renderLegend', function () {
              var m = g.state.formattedGraphicalItems,
                S = g.props,
                P = S.children,
                $ = S.width,
                T = S.height,
                k = g.props.margin || {},
                C = $ - (k.left || 0) - (k.right || 0),
                j = $O({
                  children: P,
                  formattedGraphicalItems: m,
                  legendWidth: C,
                  legendContent: u,
                })
              if (!j) return null
              var M = j.item,
                N = C0(j, qV)
              return A.cloneElement(
                M,
                D(
                  D({}, N),
                  {},
                  {
                    chartWidth: $,
                    chartHeight: T,
                    margin: k,
                    onBBoxUpdate: g.handleLegendBBoxUpdate,
                  },
                ),
              )
            }),
            re(g, 'renderTooltip', function () {
              var m,
                S = g.props,
                P = S.children,
                $ = S.accessibilityLayer,
                T = mt(P, Ct)
              if (!T) return null
              var k = g.state,
                C = k.isTooltipActive,
                j = k.activeCoordinate,
                M = k.activePayload,
                N = k.activeLabel,
                R = k.offset,
                I = (m = T.props.active) !== null && m !== void 0 ? m : C
              return A.cloneElement(T, {
                viewBox: D(D({}, R), {}, { x: R.left, y: R.top }),
                active: I,
                label: N,
                payload: I ? M : [],
                coordinate: j,
                accessibilityLayer: $,
              })
            }),
            re(g, 'renderBrush', function (m) {
              var S = g.props,
                P = S.margin,
                $ = S.data,
                T = g.state,
                k = T.offset,
                C = T.dataStartIndex,
                j = T.dataEndIndex,
                M = T.updateId
              return A.cloneElement(m, {
                key: m.key || '_recharts-brush',
                onChange: Ps(g.handleBrushChange, m.props.onChange),
                data: $,
                x: U(m.props.x) ? m.props.x : k.left,
                y: U(m.props.y)
                  ? m.props.y
                  : k.top + k.height + k.brushBottom - (P.bottom || 0),
                width: U(m.props.width) ? m.props.width : k.width,
                startIndex: C,
                endIndex: j,
                updateId: 'brush-'.concat(M),
              })
            }),
            re(g, 'renderReferenceElement', function (m, S, P) {
              if (!m) return null
              var $ = g,
                T = $.clipPathId,
                k = g.state,
                C = k.xAxisMap,
                j = k.yAxisMap,
                M = k.offset,
                N = m.type.defaultProps || {},
                R = m.props,
                I = R.xAxisId,
                L = I === void 0 ? N.xAxisId : I,
                B = R.yAxisId,
                W = B === void 0 ? N.yAxisId : B
              return A.cloneElement(m, {
                key: m.key || ''.concat(S, '-').concat(P),
                xAxis: C[L],
                yAxis: j[W],
                viewBox: {
                  x: M.left,
                  y: M.top,
                  width: M.width,
                  height: M.height,
                },
                clipPathId: T,
              })
            }),
            re(g, 'renderActivePoints', function (m) {
              var S = m.item,
                P = m.activePoint,
                $ = m.basePoint,
                T = m.childIndex,
                k = m.isRange,
                C = [],
                j = S.props.key,
                M =
                  S.item.type.defaultProps !== void 0
                    ? D(D({}, S.item.type.defaultProps), S.item.props)
                    : S.item.props,
                N = M.activeDot,
                R = M.dataKey,
                I = D(
                  D(
                    {
                      index: T,
                      dataKey: R,
                      cx: P.x,
                      cy: P.y,
                      r: 4,
                      fill: wp(S.item),
                      strokeWidth: 2,
                      stroke: '#fff',
                      payload: P.payload,
                      value: P.value,
                    },
                    J(N, !1),
                  ),
                  Xs(N),
                )
              return (
                C.push(
                  p.renderActiveDot(
                    N,
                    I,
                    ''.concat(j, '-activePoint-').concat(T),
                  ),
                ),
                $
                  ? C.push(
                      p.renderActiveDot(
                        N,
                        D(D({}, I), {}, { cx: $.x, cy: $.y }),
                        ''.concat(j, '-basePoint-').concat(T),
                      ),
                    )
                  : k && C.push(null),
                C
              )
            }),
            re(g, 'renderGraphicChild', function (m, S, P) {
              var $ = g.filterFormatItem(m, S, P)
              if (!$) return null
              var T = g.getTooltipEventType(),
                k = g.state,
                C = k.isTooltipActive,
                j = k.tooltipAxis,
                M = k.activeTooltipIndex,
                N = k.activeLabel,
                R = g.props.children,
                I = mt(R, Ct),
                L = $.props,
                B = L.points,
                W = L.isRange,
                G = L.baseLine,
                z =
                  $.item.type.defaultProps !== void 0
                    ? D(D({}, $.item.type.defaultProps), $.item.props)
                    : $.item.props,
                H = z.activeDot,
                Q = z.hide,
                ne = z.activeBar,
                he = z.activeShape,
                Ge = !!(!Q && C && I && (H || ne || he)),
                je = {}
              T !== 'axis' && I && I.props.trigger === 'click'
                ? (je = {
                    onClick: Ps(g.handleItemMouseEnter, m.props.onClick),
                  })
                : T !== 'axis' &&
                  (je = {
                    onMouseLeave: Ps(
                      g.handleItemMouseLeave,
                      m.props.onMouseLeave,
                    ),
                    onMouseEnter: Ps(
                      g.handleItemMouseEnter,
                      m.props.onMouseEnter,
                    ),
                  })
              var Le = A.cloneElement(m, D(D({}, $.props), je))
              function q(St) {
                return typeof j.dataKey == 'function'
                  ? j.dataKey(St.payload)
                  : null
              }
              if (Ge)
                if (M >= 0) {
                  var te, ae
                  if (j.dataKey && !j.allowDuplicatedCategory) {
                    var F =
                      typeof j.dataKey == 'function'
                        ? q
                        : 'payload.'.concat(j.dataKey.toString())
                    ;(te = Vs(B, F, N)), (ae = W && G && Vs(G, F, N))
                  } else (te = B == null ? void 0 : B[M]), (ae = W && G && G[M])
                  if (he || ne) {
                    var be =
                      m.props.activeIndex !== void 0 ? m.props.activeIndex : M
                    return [
                      A.cloneElement(
                        m,
                        D(D(D({}, $.props), je), {}, { activeIndex: be }),
                      ),
                      null,
                      null,
                    ]
                  }
                  if (!se(te))
                    return [Le].concat(
                      sa(
                        g.renderActivePoints({
                          item: $,
                          activePoint: te,
                          basePoint: ae,
                          childIndex: M,
                          isRange: W,
                        }),
                      ),
                    )
                } else {
                  var le,
                    oe =
                      (le = g.getItemByXY(g.state.activeCoordinate)) !== null &&
                      le !== void 0
                        ? le
                        : { graphicalItem: Le },
                    Oe = oe.graphicalItem,
                    Ne = Oe.item,
                    Lt = Ne === void 0 ? m : Ne,
                    Xn = Oe.childIndex,
                    et = D(D(D({}, $.props), je), {}, { activeIndex: Xn })
                  return [A.cloneElement(Lt, et), null, null]
                }
              return W ? [Le, null, null] : [Le, null]
            }),
            re(g, 'renderCustomized', function (m, S, P) {
              return A.cloneElement(
                m,
                D(
                  D({ key: 'recharts-customized-'.concat(P) }, g.props),
                  g.state,
                ),
              )
            }),
            re(g, 'renderMap', {
              CartesianGrid: { handler: js, once: !0 },
              ReferenceArea: { handler: g.renderReferenceElement },
              ReferenceLine: { handler: js },
              ReferenceDot: { handler: g.renderReferenceElement },
              XAxis: { handler: js },
              YAxis: { handler: js },
              Brush: { handler: g.renderBrush, once: !0 },
              Bar: { handler: g.renderGraphicChild },
              Line: { handler: g.renderGraphicChild },
              Area: { handler: g.renderGraphicChild },
              Radar: { handler: g.renderGraphicChild },
              RadialBar: { handler: g.renderGraphicChild },
              Scatter: { handler: g.renderGraphicChild },
              Pie: { handler: g.renderGraphicChild },
              Funnel: { handler: g.renderGraphicChild },
              Tooltip: { handler: g.renderCursor, once: !0 },
              PolarGrid: { handler: g.renderPolarGrid, once: !0 },
              PolarAngleAxis: { handler: g.renderPolarAxis },
              PolarRadiusAxis: { handler: g.renderPolarAxis },
              Customized: { handler: g.renderCustomized },
            }),
            (g.clipPathId = ''.concat(
              (b = x.id) !== null && b !== void 0 ? b : ma('recharts'),
              '-clip',
            )),
            (g.throttleTriggeredAfterMouseMove = Pw(
              g.triggeredAfterMouseMove,
              (w = x.throttleDelay) !== null && w !== void 0 ? w : 1e3 / 60,
            )),
            (g.state = {}),
            g
          )
        }
        return (
          tX(p, v),
          QV(p, [
            {
              key: 'componentDidMount',
              value: function () {
                var b, w
                this.addListener(),
                  this.accessibilityManager.setDetails({
                    container: this.container,
                    offset: {
                      left:
                        (b = this.props.margin.left) !== null && b !== void 0
                          ? b
                          : 0,
                      top:
                        (w = this.props.margin.top) !== null && w !== void 0
                          ? w
                          : 0,
                    },
                    coordinateList: this.state.tooltipTicks,
                    mouseHandlerCallback: this.triggeredAfterMouseMove,
                    layout: this.props.layout,
                  }),
                  this.displayDefaultTooltip()
              },
            },
            {
              key: 'displayDefaultTooltip',
              value: function () {
                var b = this.props,
                  w = b.children,
                  g = b.data,
                  m = b.height,
                  S = b.layout,
                  P = mt(w, Ct)
                if (P) {
                  var $ = P.props.defaultIndex
                  if (
                    !(
                      typeof $ != 'number' ||
                      $ < 0 ||
                      $ > this.state.tooltipTicks.length - 1
                    )
                  ) {
                    var T =
                        this.state.tooltipTicks[$] &&
                        this.state.tooltipTicks[$].value,
                      k = zd(this.state, g, $, T),
                      C = this.state.tooltipTicks[$].coordinate,
                      j = (this.state.offset.top + m) / 2,
                      M = S === 'horizontal',
                      N = M ? { x: C, y: j } : { y: C, x: j },
                      R = this.state.formattedGraphicalItems.find(function (L) {
                        var B = L.item
                        return B.type.name === 'Scatter'
                      })
                    R &&
                      ((N = D(D({}, N), R.props.points[$].tooltipPosition)),
                      (k = R.props.points[$].tooltipPayload))
                    var I = {
                      activeTooltipIndex: $,
                      isTooltipActive: !0,
                      activeLabel: T,
                      activePayload: k,
                      activeCoordinate: N,
                    }
                    this.setState(I),
                      this.renderCursor(P),
                      this.accessibilityManager.setIndex($)
                  }
                }
              },
            },
            {
              key: 'getSnapshotBeforeUpdate',
              value: function (b, w) {
                if (!this.props.accessibilityLayer) return null
                if (
                  (this.state.tooltipTicks !== w.tooltipTicks &&
                    this.accessibilityManager.setDetails({
                      coordinateList: this.state.tooltipTicks,
                    }),
                  this.props.layout !== b.layout &&
                    this.accessibilityManager.setDetails({
                      layout: this.props.layout,
                    }),
                  this.props.margin !== b.margin)
                ) {
                  var g, m
                  this.accessibilityManager.setDetails({
                    offset: {
                      left:
                        (g = this.props.margin.left) !== null && g !== void 0
                          ? g
                          : 0,
                      top:
                        (m = this.props.margin.top) !== null && m !== void 0
                          ? m
                          : 0,
                    },
                  })
                }
                return null
              },
            },
            {
              key: 'componentDidUpdate',
              value: function (b) {
                bf([mt(b.children, Ct)], [mt(this.props.children, Ct)]) ||
                  this.displayDefaultTooltip()
              },
            },
            {
              key: 'componentWillUnmount',
              value: function () {
                this.removeListener(),
                  this.throttleTriggeredAfterMouseMove.cancel()
              },
            },
            {
              key: 'getTooltipEventType',
              value: function () {
                var b = mt(this.props.children, Ct)
                if (b && typeof b.props.shared == 'boolean') {
                  var w = b.props.shared ? 'axis' : 'item'
                  return s.indexOf(w) >= 0 ? w : a
                }
                return a
              },
            },
            {
              key: 'getMouseInfo',
              value: function (b) {
                if (!this.container) return null
                var w = this.container,
                  g = w.getBoundingClientRect(),
                  m = b8(g),
                  S = {
                    chartX: Math.round(b.pageX - m.left),
                    chartY: Math.round(b.pageY - m.top),
                  },
                  P = g.width / w.offsetWidth || 1,
                  $ = this.inRange(S.chartX, S.chartY, P)
                if (!$) return null
                var T = this.state,
                  k = T.xAxisMap,
                  C = T.yAxisMap,
                  j = this.getTooltipEventType()
                if (j !== 'axis' && k && C) {
                  var M = Wr(k).scale,
                    N = Wr(C).scale,
                    R = M && M.invert ? M.invert(S.chartX) : null,
                    I = N && N.invert ? N.invert(S.chartY) : null
                  return D(D({}, S), {}, { xValue: R, yValue: I })
                }
                var L = T0(this.state, this.props.data, this.props.layout, $)
                return L ? D(D({}, S), L) : null
              },
            },
            {
              key: 'inRange',
              value: function (b, w) {
                var g =
                    arguments.length > 2 && arguments[2] !== void 0
                      ? arguments[2]
                      : 1,
                  m = this.props.layout,
                  S = b / g,
                  P = w / g
                if (m === 'horizontal' || m === 'vertical') {
                  var $ = this.state.offset,
                    T =
                      S >= $.left &&
                      S <= $.left + $.width &&
                      P >= $.top &&
                      P <= $.top + $.height
                  return T ? { x: S, y: P } : null
                }
                var k = this.state,
                  C = k.angleAxisMap,
                  j = k.radiusAxisMap
                if (C && j) {
                  var M = Wr(C)
                  return rg({ x: S, y: P }, M)
                }
                return null
              },
            },
            {
              key: 'parseEventsOfWrapper',
              value: function () {
                var b = this.props.children,
                  w = this.getTooltipEventType(),
                  g = mt(b, Ct),
                  m = {}
                g &&
                  w === 'axis' &&
                  (g.props.trigger === 'click'
                    ? (m = { onClick: this.handleClick })
                    : (m = {
                        onMouseEnter: this.handleMouseEnter,
                        onMouseMove: this.handleMouseMove,
                        onMouseLeave: this.handleMouseLeave,
                        onTouchMove: this.handleTouchMove,
                        onTouchStart: this.handleTouchStart,
                        onTouchEnd: this.handleTouchEnd,
                      }))
                var S = Xs(this.props, this.handleOuterEvent)
                return D(D({}, S), m)
              },
            },
            {
              key: 'addListener',
              value: function () {
                Dl.on(Ll, this.handleReceiveSyncEvent)
              },
            },
            {
              key: 'removeListener',
              value: function () {
                Dl.removeListener(Ll, this.handleReceiveSyncEvent)
              },
            },
            {
              key: 'filterFormatItem',
              value: function (b, w, g) {
                for (
                  var m = this.state.formattedGraphicalItems,
                    S = 0,
                    P = m.length;
                  S < P;
                  S++
                ) {
                  var $ = m[S]
                  if (
                    $.item === b ||
                    $.props.key === b.key ||
                    (w === Or($.item.type) && g === $.childIndex)
                  )
                    return $
                }
                return null
              },
            },
            {
              key: 'renderClipPath',
              value: function () {
                var b = this.clipPathId,
                  w = this.state.offset,
                  g = w.left,
                  m = w.top,
                  S = w.height,
                  P = w.width
                return E.createElement(
                  'defs',
                  null,
                  E.createElement(
                    'clipPath',
                    { id: b },
                    E.createElement('rect', {
                      x: g,
                      y: m,
                      height: S,
                      width: P,
                    }),
                  ),
                )
              },
            },
            {
              key: 'getXScales',
              value: function () {
                var b = this.state.xAxisMap
                return b
                  ? Object.entries(b).reduce(function (w, g) {
                      var m = _0(g, 2),
                        S = m[0],
                        P = m[1]
                      return D(D({}, w), {}, re({}, S, P.scale))
                    }, {})
                  : null
              },
            },
            {
              key: 'getYScales',
              value: function () {
                var b = this.state.yAxisMap
                return b
                  ? Object.entries(b).reduce(function (w, g) {
                      var m = _0(g, 2),
                        S = m[0],
                        P = m[1]
                      return D(D({}, w), {}, re({}, S, P.scale))
                    }, {})
                  : null
              },
            },
            {
              key: 'getXScaleByAxisId',
              value: function (b) {
                var w
                return (w = this.state.xAxisMap) === null ||
                  w === void 0 ||
                  (w = w[b]) === null ||
                  w === void 0
                  ? void 0
                  : w.scale
              },
            },
            {
              key: 'getYScaleByAxisId',
              value: function (b) {
                var w
                return (w = this.state.yAxisMap) === null ||
                  w === void 0 ||
                  (w = w[b]) === null ||
                  w === void 0
                  ? void 0
                  : w.scale
              },
            },
            {
              key: 'getItemByXY',
              value: function (b) {
                var w = this.state,
                  g = w.formattedGraphicalItems,
                  m = w.activeItem
                if (g && g.length)
                  for (var S = 0, P = g.length; S < P; S++) {
                    var $ = g[S],
                      T = $.props,
                      k = $.item,
                      C =
                        k.type.defaultProps !== void 0
                          ? D(D({}, k.type.defaultProps), k.props)
                          : k.props,
                      j = Or(k.type)
                    if (j === 'Bar') {
                      var M = (T.data || []).find(function (L) {
                        return FW(b, L)
                      })
                      if (M) return { graphicalItem: $, payload: M }
                    } else if (j === 'RadialBar') {
                      var N = (T.data || []).find(function (L) {
                        return rg(b, L)
                      })
                      if (N) return { graphicalItem: $, payload: N }
                    } else if (Gu($, m) || Vu($, m) || Io($, m)) {
                      var R = _H({
                          graphicalItem: $,
                          activeTooltipItem: m,
                          itemData: C.data,
                        }),
                        I = C.activeIndex === void 0 ? R : C.activeIndex
                      return {
                        graphicalItem: D(D({}, $), {}, { childIndex: I }),
                        payload: Io($, m) ? C.data[R] : $.props.data[R],
                      }
                    }
                  }
                return null
              },
            },
            {
              key: 'render',
              value: function () {
                var b = this
                if (!Kv(this)) return null
                var w = this.props,
                  g = w.children,
                  m = w.className,
                  S = w.width,
                  P = w.height,
                  $ = w.style,
                  T = w.compact,
                  k = w.title,
                  C = w.desc,
                  j = C0(w, HV),
                  M = J(j, !1)
                if (T)
                  return E.createElement(
                    l0,
                    {
                      state: this.state,
                      width: this.props.width,
                      height: this.props.height,
                      clipPathId: this.clipPathId,
                    },
                    E.createElement(
                      wf,
                      to({}, M, { width: S, height: P, title: k, desc: C }),
                      this.renderClipPath(),
                      Vv(g, this.renderMap),
                    ),
                  )
                if (this.props.accessibilityLayer) {
                  var N, R
                  ;(M.tabIndex =
                    (N = this.props.tabIndex) !== null && N !== void 0 ? N : 0),
                    (M.role =
                      (R = this.props.role) !== null && R !== void 0
                        ? R
                        : 'application'),
                    (M.onKeyDown = function (L) {
                      b.accessibilityManager.keyboardEvent(L)
                    }),
                    (M.onFocus = function () {
                      b.accessibilityManager.focus()
                    })
                }
                var I = this.parseEventsOfWrapper()
                return E.createElement(
                  l0,
                  {
                    state: this.state,
                    width: this.props.width,
                    height: this.props.height,
                    clipPathId: this.clipPathId,
                  },
                  E.createElement(
                    'div',
                    to(
                      {
                        className: ue('recharts-wrapper', m),
                        style: D(
                          {
                            position: 'relative',
                            cursor: 'default',
                            width: S,
                            height: P,
                          },
                          $,
                        ),
                      },
                      I,
                      {
                        ref: function (B) {
                          b.container = B
                        },
                      },
                    ),
                    E.createElement(
                      wf,
                      to({}, M, {
                        width: S,
                        height: P,
                        title: k,
                        desc: C,
                        style: sX,
                      }),
                      this.renderClipPath(),
                      Vv(g, this.renderMap),
                    ),
                    this.renderLegend(),
                    this.renderTooltip(),
                  ),
                )
              },
            },
          ])
        )
      })(A.Component)
    return (
      re(y, 'displayName', r),
      re(
        y,
        'defaultProps',
        D(
          {
            layout: 'horizontal',
            stackOffset: 'none',
            barCategoryGap: '10%',
            barGap: 4,
            margin: { top: 5, right: 5, bottom: 5, left: 5 },
            reverseStackOrder: !1,
            syncMethod: 'index',
          },
          f,
        ),
      ),
      re(y, 'getDerivedStateFromProps', function (v, p) {
        var x = v.dataKey,
          b = v.data,
          w = v.children,
          g = v.width,
          m = v.height,
          S = v.layout,
          P = v.stackOffset,
          $ = v.margin,
          T = p.dataStartIndex,
          k = p.dataEndIndex
        if (p.updateId === void 0) {
          var C = k0(v)
          return D(
            D(
              D({}, C),
              {},
              { updateId: 0 },
              h(D(D({ props: v }, C), {}, { updateId: 0 }), p),
            ),
            {},
            {
              prevDataKey: x,
              prevData: b,
              prevWidth: g,
              prevHeight: m,
              prevLayout: S,
              prevStackOffset: P,
              prevMargin: $,
              prevChildren: w,
            },
          )
        }
        if (
          x !== p.prevDataKey ||
          b !== p.prevData ||
          g !== p.prevWidth ||
          m !== p.prevHeight ||
          S !== p.prevLayout ||
          P !== p.prevStackOffset ||
          !fi($, p.prevMargin)
        ) {
          var j = k0(v),
            M = {
              chartX: p.chartX,
              chartY: p.chartY,
              isTooltipActive: p.isTooltipActive,
            },
            N = D(D({}, T0(p, b, S)), {}, { updateId: p.updateId + 1 }),
            R = D(D(D({}, j), M), N)
          return D(
            D(D({}, R), h(D({ props: v }, R), p)),
            {},
            {
              prevDataKey: x,
              prevData: b,
              prevWidth: g,
              prevHeight: m,
              prevLayout: S,
              prevStackOffset: P,
              prevMargin: $,
              prevChildren: w,
            },
          )
        }
        if (!bf(w, p.prevChildren)) {
          var I,
            L,
            B,
            W,
            G = mt(w, Xi),
            z =
              G &&
              (I =
                (L = G.props) === null || L === void 0
                  ? void 0
                  : L.startIndex) !== null &&
              I !== void 0
                ? I
                : T,
            H =
              G &&
              (B =
                (W = G.props) === null || W === void 0
                  ? void 0
                  : W.endIndex) !== null &&
              B !== void 0
                ? B
                : k,
            Q = z !== T || H !== k,
            ne = !se(b),
            he = ne && !Q ? p.updateId : p.updateId + 1
          return D(
            D(
              { updateId: he },
              h(
                D(
                  D({ props: v }, p),
                  {},
                  { updateId: he, dataStartIndex: z, dataEndIndex: H },
                ),
                p,
              ),
            ),
            {},
            { prevChildren: w, dataStartIndex: z, dataEndIndex: H },
          )
        }
        return null
      }),
      re(y, 'renderActiveDot', function (v, p, x) {
        var b
        return (
          A.isValidElement(v)
            ? (b = A.cloneElement(v, p))
            : ie(v)
              ? (b = v(p))
              : (b = E.createElement(Wu, p)),
          E.createElement(pe, { className: 'recharts-active-dot', key: x }, b)
        )
      }),
      function (p) {
        return E.createElement(y, p)
      }
    )
  },
  mX = kp({
    chartName: 'LineChart',
    GraphicalChild: ss,
    axisComponents: [
      { axisType: 'xAxis', AxisComp: na },
      { axisType: 'yAxis', AxisComp: aa },
    ],
    formatAxisMap: hS,
  }),
  gX = kp({
    chartName: 'BarChart',
    GraphicalChild: Vn,
    defaultTooltipEventType: 'axis',
    validateTooltipEventTypes: ['axis', 'item'],
    axisComponents: [
      { axisType: 'xAxis', AxisComp: na },
      { axisType: 'yAxis', AxisComp: aa },
    ],
    formatAxisMap: hS,
  }),
  bX = kp({
    chartName: 'PieChart',
    GraphicalChild: Lr,
    validateTooltipEventTypes: ['item'],
    defaultTooltipEventType: 'item',
    legendContent: 'children',
    axisComponents: [
      { axisType: 'angleAxis', AxisComp: Ku },
      { axisType: 'radiusAxis', AxisComp: Hu },
    ],
    formatAxisMap: v9,
    defaultProps: {
      layout: 'centric',
      startAngle: 0,
      endAngle: 360,
      cx: '50%',
      cy: '50%',
      innerRadius: 0,
      outerRadius: '80%',
    },
  })
const N0 = { CSV: 'text/csv', IMAGE: 'image/' },
  pn = { BAR: 'bar', LINE: 'line', PIE: 'pie' },
  I0 = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'],
  Fl = ({ contentType: e, data: t, filename: r }) =>
    O.jsxs(Xe, {
      variant: 'outline-primary',
      href: `data:${e};base64,${t}`,
      download: r,
      className: 'd-flex align-items-center gap-2',
      children: [
        O.jsxs('svg', {
          width: '20',
          height: '20',
          viewBox: '0 0 24 24',
          fill: 'none',
          stroke: 'currentColor',
          strokeWidth: '2',
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          children: [
            O.jsx('path', { d: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' }),
            O.jsx('polyline', { points: '7 10 12 15 17 10' }),
            O.jsx('line', { x1: '12', y1: '15', x2: '12', y2: '3' }),
          ],
        }),
        'Download',
      ],
    }),
  xX = ({ data: e }) => {
    var o
    const [t, r] = A.useState(pn.BAR),
      n =
        ((o = e == null ? void 0 : e.labels) == null
          ? void 0
          : o.map((s, c) => ({ name: s, value: e.values[c] }))) || [],
      i = {
        [pn.BAR]: O.jsxs(gX, {
          data: n,
          children: [
            O.jsx(Nd, { strokeDasharray: '3 3' }),
            O.jsx(na, { dataKey: 'name' }),
            O.jsx(aa, {}),
            O.jsx(Ct, {}),
            O.jsx(Vn, { dataKey: 'value', fill: '#8884d8' }),
          ],
        }),
        [pn.LINE]: O.jsxs(mX, {
          data: n,
          children: [
            O.jsx(Nd, { strokeDasharray: '3 3' }),
            O.jsx(na, { dataKey: 'name' }),
            O.jsx(aa, {}),
            O.jsx(Ct, {}),
            O.jsx(ss, {
              type: 'monotone',
              dataKey: 'value',
              stroke: '#8884d8',
            }),
          ],
        }),
        [pn.PIE]: O.jsxs(bX, {
          children: [
            O.jsx(Lr, {
              data: n,
              dataKey: 'value',
              nameKey: 'name',
              cx: '50%',
              cy: '50%',
              outerRadius: 150,
              label: !0,
              children: n.map((s, c) =>
                O.jsx(ju, { fill: I0[c % I0.length] }, `cell-${c}`),
              ),
            }),
            O.jsx(Ct, {}),
          ],
        }),
      },
      a = {
        [pn.BAR]: O.jsxs('svg', {
          width: '20',
          height: '20',
          viewBox: '0 0 24 24',
          fill: 'none',
          stroke: 'currentColor',
          strokeWidth: '2',
          children: [
            O.jsx('rect', {
              x: '3',
              y: '3',
              width: '18',
              height: '18',
              rx: '2',
            }),
            O.jsx('path', { d: 'M8 15v-5m4 5V8m4 7v-3' }),
          ],
        }),
        [pn.LINE]: O.jsx('svg', {
          width: '20',
          height: '20',
          viewBox: '0 0 24 24',
          fill: 'none',
          stroke: 'currentColor',
          strokeWidth: '2',
          children: O.jsx('path', { d: 'M3 12h18M3 6h18M3 18h18' }),
        }),
        [pn.PIE]: O.jsxs('svg', {
          width: '20',
          height: '20',
          viewBox: '0 0 24 24',
          fill: 'none',
          stroke: 'currentColor',
          strokeWidth: '2',
          children: [
            O.jsx('path', { d: 'M12 2v20M2 12h20' }),
            O.jsx('circle', { cx: '12', cy: '12', r: '10' }),
          ],
        }),
      }
    return O.jsxs(Je, {
      className: 'mb-4',
      children: [
        O.jsx(Je.Header, {
          className: 'd-flex justify-content-between align-items-center',
          children: O.jsx($b, {
            children: Object.entries(a).map(([s, c]) =>
              O.jsxs(
                Xe,
                {
                  variant: t === s ? 'primary' : 'outline-primary',
                  onClick: () => r(s),
                  className: 'd-flex align-items-center gap-2',
                  children: [c, s.charAt(0).toUpperCase() + s.slice(1)],
                },
                s,
              ),
            ),
          }),
        }),
        O.jsx(Je.Body, {
          children: O.jsx(d8, { width: '100%', height: 300, children: i[t] }),
        }),
      ],
    })
  },
  wX = ({ data: e }) =>
    !(e != null && e.labels) || !(e != null && e.values)
      ? null
      : O.jsx('div', {
          className: 'table-responsive',
          style: { maxHeight: '40vh', maxWidth: '40vw', overflowY: 'auto' },
          children: O.jsxs(aE, {
            striped: !0,
            bordered: !0,
            hover: !0,
            className: 'mb-0',
            children: [
              O.jsx('thead', {
                children: O.jsx('tr', {
                  children: e.labels.map((t, r) =>
                    O.jsx(
                      'th',
                      {
                        className: 'position-sticky top-0 bg-white',
                        children: t,
                      },
                      r,
                    ),
                  ),
                }),
              }),
              O.jsx('tbody', {
                children: e.values.map((t, r) =>
                  O.jsx(
                    'tr',
                    {
                      children: t.map((n, i) =>
                        O.jsx(
                          'td',
                          { children: n == null ? void 0 : n.toString() },
                          i,
                        ),
                      ),
                    },
                    r,
                  ),
                ),
              }),
            ],
          }),
        }),
  OX = () =>
    O.jsxs('svg', {
      width: '24',
      height: '24',
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: '2',
      children: [
        O.jsx('path', {
          d: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z',
        }),
        O.jsx('polyline', { points: '14 2 14 8 20 8' }),
      ],
    }),
  SX = ({ attachment: e }) => {
    var n
    const [t, r] = A.useState(!1)
    return e
      ? (n = e.contentType) != null && n.startsWith(N0.IMAGE)
        ? O.jsxs('div', {
            className: 'mb-3',
            children: [
              O.jsx('div', {
                className: 'position-relative',
                style: { height: 'auto', width: '100%' },
                children: O.jsx(Ni, {
                  src: `data:${e.contentType};base64,${e.data}`,
                  alt: e.filename,
                  className: 'w-100 h-auto',
                  style: {
                    objectFit: 'contain',
                    maxWidth: '100%',
                    height: 'auto',
                  },
                }),
              }),
              O.jsx('div', {
                className: 'mt-3',
                children: O.jsx(Fl, { ...e }),
              }),
            ],
          })
        : e.contentType === N0.CSV && e.chartData
          ? O.jsxs('div', {
              className: 'mb-3',
              children: [
                O.jsxs('div', {
                  className:
                    'd-flex justify-content-between align-items-center mb-3',
                  children: [
                    O.jsxs(Xe, {
                      variant: 'outline-primary',
                      onClick: () => r(!t),
                      className: 'd-flex align-items-center gap-2',
                      children: [
                        O.jsx('svg', {
                          width: '20',
                          height: '20',
                          viewBox: '0 0 24 24',
                          fill: 'none',
                          stroke: 'currentColor',
                          strokeWidth: '2',
                          children: t
                            ? O.jsx('path', { d: 'M19 9l-7 7-7-7' })
                            : O.jsx('path', { d: 'M9 18l6-6-6-6' }),
                        }),
                        t ? 'Hide Charts' : 'Show Charts',
                      ],
                    }),
                    O.jsx(Fl, { ...e }),
                  ],
                }),
                t && O.jsx(xX, { data: e.chartData }),
                O.jsxs(Je, {
                  children: [
                    O.jsx(Je.Header, { children: 'Data Table' }),
                    O.jsx(Je.Body, {
                      className: 'p-0',
                      children: O.jsx(wX, { data: e.chartData }),
                    }),
                  ],
                }),
              ],
            })
          : O.jsxs('div', {
              className: 'd-flex align-items-center gap-2 p-3 border rounded',
              children: [
                O.jsx(OX, {}),
                O.jsx('span', {
                  className: 'flex-grow-1',
                  children: e.filename,
                }),
                O.jsx(Fl, { ...e }),
              ],
            })
      : null
  },
  AX = ({ message: e, isCurrentUser: t }) => {
    var r
    return O.jsx(nn.Item, {
      className: `d-flex justify-content-${t ? 'end' : 'start'} border-0 bg-transparent`,
      children: O.jsxs('div', {
        className: `d-flex align-items-start ${t ? 'flex-row-reverse' : 'flex-row'}`,
        style: { maxWidth: '70%' },
        children: [
          O.jsx(Ni, {
            src: Gs,
            alt: e.sender.username,
            roundedCircle: !0,
            style: { width: '4.5rem', height: '2.5rem' },
          }),
          O.jsxs('div', {
            className: 'mx-2 p-3 rounded',
            style: {
              backgroundColor: t ? '#1CCB8F' : 'black',
              color: t ? 'black' : 'white',
              wordBreak: 'break-word',
            },
            children: [
              O.jsx('p', { className: 'mb-1', children: e.text }),
              (r = e.attachments) == null
                ? void 0
                : r.map((n, i) =>
                    O.jsx(
                      'div',
                      {
                        className: 'mt-2',
                        style: { maxWidth: '100%', overflow: 'auto' },
                        children: O.jsx(SX, { attachment: n }),
                      },
                      i,
                    ),
                  ),
            ],
          }),
        ],
      }),
    })
  },
  PX = ({ messages: e, currentUserId: t }) => {
    const r = A.useRef(null)
    return (
      A.useEffect(() => {
        r.current && (r.current.scrollTop = r.current.scrollHeight)
      }, [e]),
      O.jsx(nn, {
        ref: r,
        style: { height: '60vh', overflowY: 'auto' },
        children:
          e == null
            ? void 0
            : e.map((n, i) =>
                O.jsx(
                  AX,
                  { message: n, isCurrentUser: n.sender._id === t },
                  n._id || i,
                ),
              ),
      })
    )
  },
  $X = async ({ username: e, email: t, password: r }) => {
    const n = await fetch('https://drcdv-1.onrender.com/api/v1/user/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: e, email: t, password: r }),
    })
    if (!n.ok) throw new Error('failed to sign up')
    return await n.json()
  },
  EX = async ({ username: e, password: t }) => {
    const r = await fetch('https://drcdv-1.onrender.com/api/v1/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: e, password: t }),
    })
    if (!r.ok) throw new Error('failed to login')
    return await r.json()
  },
  _X = async (e) =>
    await (
      await fetch(`https://drcdv-1.onrender.com/users/${e}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
    ).json(),
  XS = async (e) =>
    await (
      await fetch(
        'https://drcdv-1.onrender.com/users?' + new URLSearchParams(e),
      )
    ).json()
function an({ id: e }) {
  const r = _i({ queryKey: ['users', e], queryFn: () => _X(e) }).data ?? {}
  return O.jsx('strong', { children: (r == null ? void 0 : r.username) ?? e })
}
an.propTypes = { id: X.string.isRequired }
const CX = ({ channelId: e }) => {
  const [t] = ur(),
    r = a1(),
    i = ((v) => {
      if (!v || typeof v != 'string')
        return (
          console.error('Invalid token:', 'Token must be a valid string'), null
        )
      try {
        const p = Nr(v)
        return { userId: p.sub, username: p.username }
      } catch (p) {
        return console.error('Invalid token:', p), null
      }
    })(t),
    [a, o] = A.useState([]),
    [s, c] = A.useState([]),
    { data: u, isLoading: l } = _i({
      queryKey: ['channel', { channelId: e }],
      queryFn: () => c1(e, t),
      enabled: !!e,
    }),
    { data: f, isLoading: d } = _i({
      queryKey: ['messages', { channelId: e }],
      queryFn: () => JE(e, t),
      enabled: !!e,
    })
  A.useEffect(() => {
    u && u.members && c(u.members)
  }, [u]),
    A.useEffect(() => {
      f && o(f)
    }, [f]),
    A.useEffect(() => {
      if (r) {
        const v = (p) => {
          o((x) => [...x, p])
        }
        return (
          r.on('messageCreated', v),
          () => {
            r.off('messageCreated', v)
          }
        )
      }
    }, [r])
  const h = (v) => {
    r &&
      r.emit('createMessage', {
        userId: i.userId,
        channelId: e,
        messageData: { text: v, attachments: [] },
      })
  }
  if (l || d) return O.jsx(Ux, { animation: 'border', role: 'status' })
  const y =
    u != null && u.title
      ? O.jsxs('div', {
          className: 'd-flex flex-row align-items-center',
          children: [
            s.length > 2
              ? O.jsx(Ni, { src: t_, alt: 'Channel', style: { width: '3rem' } })
              : O.jsx(Ni, { src: Gs, alt: 'User', style: { width: '3rem' } }),
            O.jsxs(Jr, {
              children: [
                O.jsx(Jr.Toggle, {
                  variant: 'link',
                  id: 'dropdown-basic',
                  children:
                    O.jsx(an, {
                      id: u.title.split(',').filter((v) => v !== i.userId)[0],
                    }) || 'Channel Members',
                }),
                O.jsx(Jr.Menu, {
                  children: s.map(
                    (v) =>
                      v.user !== i.userId &&
                      O.jsx(
                        Jr.Item,
                        { children: O.jsx(an, { id: v.user }) },
                        v.user,
                      ),
                  ),
                }),
              ],
            }),
          ],
        })
      : ''
  return e
    ? O.jsx(Er, {
        fluid: !0,
        className: 'p-4',
        children: O.jsx(Dn, {
          children: O.jsxs($r, {
            children: [
              O.jsx('div', {
                className:
                  'd-flex justify-content-between align-items-center mb-3',
                children: y,
              }),
              O.jsx(PX, { messages: a, currentUserId: i.userId }),
              O.jsx(ZE, { channelId: e, sendMessage: h }),
            ],
          }),
        }),
      })
    : O.jsxs('div', {
        style: {
          backgroundColor: 'white',
          position: 'absolute',
          padding: '1rem',
          left: '8rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '90vw',
          height: '100%',
        },
        children: [
          O.jsx('img', { src: e_, style: { width: '15rem' } }),
          O.jsx('h1', {
            style: { fontSize: '3.2em' },
            children: 'Navigate to connections or channels and start messaging',
          }),
        ],
      })
}
function jX() {
  const [e, t] = ur(),
    [r, n] = A.useState(!1),
    a = ((u) => {
      if (!u || typeof u != 'string') return null
      try {
        return { userId: Nr(u).sub }
      } catch (l) {
        return console.error('Invalid token:', l), null
      }
    })(e),
    o = () => {
      t(null), n(!1)
    },
    s = () => {
      n(!r)
    },
    c = ({ isSmallScreen: u }) =>
      O.jsx('div', {
        className: `shadow-lg ${u ? 'd-block d-md-none' : 'd-none d-md-block'}`,
        style: {
          position: 'fixed',
          top: '4rem',
          left: u ? 0 : 'auto',
          right: u ? 'auto' : 0,
          zIndex: 1e3,
          width: u ? '100vw' : '15rem',
        },
        children: O.jsx(Je, {
          className: 'border-0',
          children: O.jsxs(Je.Body, {
            className: 'd-flex flex-column align-items-center p-4',
            children: [
              O.jsx('img', {
                src: Gs,
                alt: 'Profile',
                className: 'rounded-circle mb-3',
                style: {
                  width: u ? '6rem' : '5rem',
                  height: u ? '6rem' : '5rem',
                },
              }),
              O.jsx('div', {
                className: 'mb-3',
                children: a && O.jsx(an, { id: a.userId }),
              }),
              O.jsx(Xe, {
                variant: 'outline-danger',
                size: u ? 'lg' : 'sm',
                onClick: o,
                className: 'w-100',
                children: 'Logout',
              }),
            ],
          }),
        }),
      })
  return O.jsx(wv, {
    fixed: 'top',
    bg: 'light',
    expand: 'lg',
    className: 'shadow-sm',
    style: { height: '4rem' },
    children: O.jsxs(Er, {
      fluid: !0,
      children: [
        O.jsx(wv.Brand, { href: '/', children: 'DRCDV' }),
        O.jsx(bv, {
          className: 'justify-content-end',
          children: e
            ? O.jsxs('div', {
                className: 'position-relative w-100',
                children: [
                  O.jsx(Xe, {
                    variant: 'link',
                    onClick: s,
                    className:
                      'd-flex align-items-center text-decoration-none p-0',
                    children: O.jsx('img', {
                      src: Gs,
                      alt: 'Profile',
                      className: 'rounded-circle',
                      style: { width: '2.5rem', height: '2.5rem' },
                    }),
                  }),
                  r &&
                    O.jsxs(O.Fragment, {
                      children: [
                        O.jsx(c, { isSmallScreen: !0 }),
                        O.jsx(c, { isSmallScreen: !1 }),
                      ],
                    }),
                ],
              })
            : O.jsx(bv.Link, { href: '/login', children: 'Login' }),
        }),
      ],
    }),
  })
}
function TX() {
  const [e] = ur(),
    [t, r] = A.useState({ title: '', members: [] }),
    [n, i] = A.useState({ user: '', username: '', role: 'guest' }),
    a = ua(),
    o = e ? Nr(e).sub : null,
    s = Ko({
      mutationFn: () => {
        const { title: p, members: x } = t
        return s1(e, {
          title: p,
          members: x.map(({ user: b, role: w }) => ({ user: b, role: w })),
        })
      },
      onSuccess: () => a.invalidateQueries(['channels']),
    }),
    c = _i({ queryKey: ['users'], queryFn: () => XS({}) }),
    u = (p) => {
      const { name: x, value: b } = p.target
      r((w) => ({ ...w, [x]: b }))
    },
    l = (p) => {
      const x = (c.data ?? []).find((b) => b._id === p)
      x && i((b) => ({ ...b, user: x._id, username: x.username }))
    },
    f = () => {
      n.user &&
        n.role &&
        (r((p) => ({
          ...p,
          members: [...p.members, { ...n, id: p.members.length }],
        })),
        i({ user: '', username: '', role: 'guest' }))
    },
    d = (p) => {
      r((x) => ({ ...x, members: x.members.filter((b, w) => w !== p) }))
    },
    h = async (p) => {
      p.preventDefault(), s.mutate()
    }
  A.useEffect(() => {
    s.isSuccess && r({ title: '', members: [] })
  }, [s.isSuccess])
  const y = c.data ?? [],
    v = Array.isArray(y)
      ? y.filter((p) => p._id !== o && !t.members.some((x) => x.user === p._id))
      : []
  return O.jsx(Er, {
    className: 'py-4',
    children: O.jsx(Dn, {
      className: 'justify-content-center',
      children: O.jsx($r, {
        md: 8,
        style: { width: '23rem' },
        children: O.jsx(_e, {
          onSubmit: h,
          children: O.jsxs(Je, {
            className: 'shadow-sm',
            children: [
              O.jsx(Je.Header, {
                className: 'bg-white',
                children: O.jsx(Je.Title, {
                  className: 'mb-0',
                  children: 'Create New Channel',
                }),
              }),
              O.jsxs(Je.Body, {
                children: [
                  O.jsxs(_e.Group, {
                    className: 'mb-4',
                    children: [
                      O.jsx(_e.Label, { children: 'Channel Title' }),
                      O.jsx(_e.Control, {
                        type: 'text',
                        name: 'title',
                        value: t.title,
                        onChange: u,
                        placeholder: 'Enter channel title',
                      }),
                    ],
                  }),
                  O.jsxs(_e.Group, {
                    className: 'mb-4',
                    children: [
                      O.jsx(_e.Label, { children: 'Add Members' }),
                      O.jsxs('div', {
                        className: 'd-flex gap-2 mb-3',
                        children: [
                          O.jsxs(Jr, {
                            onSelect: l,
                            children: [
                              O.jsx(Jr.Toggle, {
                                variant: 'outline-secondary',
                                style: { minWidth: '7rem' },
                                children: n.username || 'Select a user',
                              }),
                              O.jsx(Jr.Menu, {
                                children: v.map((p) =>
                                  O.jsx(
                                    Jr.Item,
                                    { eventKey: p._id, children: p.username },
                                    p._id,
                                  ),
                                ),
                              }),
                            ],
                          }),
                          O.jsxs(_e.Select, {
                            value: n.role,
                            onChange: (p) =>
                              i((x) => ({ ...x, role: p.target.value })),
                            style: { width: 'auto' },
                            children: [
                              O.jsx('option', {
                                value: 'admin',
                                children: 'Admin',
                              }),
                              O.jsx('option', {
                                value: 'guest',
                                children: 'Guest',
                              }),
                            ],
                          }),
                        ],
                      }),
                      O.jsx('div', {
                        children: O.jsx(Xe, {
                          variant: 'primary',
                          onClick: f,
                          disabled: !n.user,
                          style: {
                            backgroundColor: '#1CCB8F',
                            borderColor: '#1CCB8F',
                            minWidth: '7rem',
                          },
                          children: 'Add Member',
                        }),
                      }),
                      O.jsx(nn, {
                        className: 'mt-3',
                        children: t.members.map((p, x) =>
                          O.jsxs(
                            nn.Item,
                            {
                              className:
                                'd-flex justify-content-between align-items-center',
                              children: [
                                O.jsxs('div', {
                                  className: 'd-flex align-items-center gap-2',
                                  children: [
                                    O.jsx(an, { id: p.user }),
                                    O.jsxs('span', {
                                      className: 'text-muted',
                                      children: ['(', p.role, ')'],
                                    }),
                                  ],
                                }),
                                O.jsx(Xe, {
                                  variant: 'outline-danger',
                                  size: 'sm',
                                  onClick: () => d(x),
                                  children: 'Remove',
                                }),
                              ],
                            },
                            x,
                          ),
                        ),
                      }),
                    ],
                  }),
                  O.jsx('div', {
                    className: 'd-grid gap-2',
                    children: O.jsx(Xe, {
                      type: 'submit',
                      disabled: !t.title || s.isPending,
                      style: {
                        backgroundColor: '#1CCB8F',
                        borderColor: '#1CCB8F',
                      },
                      children: s.isPending ? 'Creating...' : 'Create Channel',
                    }),
                  }),
                  s.isSuccess &&
                    O.jsx('div', {
                      className: 'text-success text-center mt-3',
                      children: 'Channel created successfully!',
                    }),
                ],
              }),
            ],
          }),
        }),
      }),
    }),
  })
}
const YS = A.createContext(),
  kX = ({ children: e }) => {
    const [t, r] = A.useState(null),
      [n, i] = A.useState([]),
      [a, o] = A.useState([])
    return O.jsx(YS.Provider, {
      value: {
        selectedChannel: t,
        setSelectedChannel: r,
        channelMessages: n,
        setChannelMessages: i,
        channelMembers: a,
        setChannelMembers: o,
      },
      children: e,
    })
  },
  QS = () => A.useContext(YS),
  MX =
    "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3c!--%20Uploaded%20to:%20SVG%20Repo,%20www.svgrepo.com,%20Generator:%20SVG%20Repo%20Mixer%20Tools%20--%3e%3csvg%20fill='%23000000'%20width='800px'%20height='800px'%20viewBox='0%200%2024%2024'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M19.73,16.663A3.467,3.467,0,0,0,20.5,14.5a3.5,3.5,0,0,0-7,0,3.467,3.467,0,0,0,.77,2.163A6.04,6.04,0,0,0,12,18.69a6.04,6.04,0,0,0-2.27-2.027A3.467,3.467,0,0,0,10.5,14.5a3.5,3.5,0,0,0-7,0,3.467,3.467,0,0,0,.77,2.163A6,6,0,0,0,1,22a1,1,0,0,0,1,1H22a1,1,0,0,0,1-1A6,6,0,0,0,19.73,16.663ZM7,13a1.5,1.5,0,1,1-1.5,1.5A1.5,1.5,0,0,1,7,13ZM3.127,21a4,4,0,0,1,7.746,0ZM17,13a1.5,1.5,0,1,1-1.5,1.5A1.5,1.5,0,0,1,17,13Zm-3.873,8a4,4,0,0,1,7.746,0ZM11,10V7H8A1,1,0,0,1,8,5h3V2a1,1,0,0,1,2,0V5h3a1,1,0,0,1,0,2H13v3a1,1,0,0,1-2,0Z'/%3e%3c/svg%3e",
  NX =
    "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3c!--%20Uploaded%20to:%20SVG%20Repo,%20www.svgrepo.com,%20Generator:%20SVG%20Repo%20Mixer%20Tools%20--%3e%3csvg%20fill='%23000000'%20width='800px'%20height='800px'%20viewBox='0%200%20512%20512'%20xmlns='http://www.w3.org/2000/svg'%3e%3ctitle%3eionicons-v5-j%3c/title%3e%3cpath%20d='M258.9,48C141.92,46.42,46.42,141.92,48,258.9,49.56,371.09,140.91,462.44,253.1,464c117,1.6,212.48-93.9,210.88-210.88C462.44,140.91,371.09,49.56,258.9,48Zm-3.68,152.11c.21-1.2.44-2.4.71-3.59a66.46,66.46,0,0,1,16.29-31.21C285.11,151.58,303.38,144,323.67,144a74.05,74.05,0,0,1,25.06,4.26A66.69,66.69,0,0,1,375,165.46a68.15,68.15,0,0,1,18,42.14A78.46,78.46,0,0,1,393,219h0a86.19,86.19,0,0,1-8.2,31q-.76,1.59-1.59,3.15c-1.11,2.07-2.3,4.1-3.58,6.06a79.47,79.47,0,0,1-8.63,11c-13.12,14-29.92,21.73-47.31,21.73a59.61,59.61,0,0,1-19.17-3.18,63.47,63.47,0,0,1-6.1-2.43,70.76,70.76,0,0,1-22.07-16.12,83.76,83.76,0,0,1-22-51.32q-.27-3.88-.18-7.68A75.62,75.62,0,0,1,255.22,200.13ZM105.49,224.45a59.87,59.87,0,0,1,5.2-20.64,56.76,56.76,0,0,1,2.78-5.3,54.49,54.49,0,0,1,7.19-9.56,55.62,55.62,0,0,1,14-10.82,56.84,56.84,0,0,1,8.11-3.64,63.85,63.85,0,0,1,33.35-2.39,57,57,0,0,1,30.78,17,57.86,57.86,0,0,1,15.41,38.62c.05,2.11,0,4.23-.15,6.38a71.58,71.58,0,0,1-6,23.84,69.49,69.49,0,0,1-5.73,10.42,65.39,65.39,0,0,1-15.76,16.57C193.17,286,191.61,287,190,288a54.21,54.21,0,0,1-10,4.65,49.31,49.31,0,0,1-16.2,2.76c-.93,0-1.86,0-2.78-.08a47.6,47.6,0,0,1-5.48-.62,51.19,51.19,0,0,1-5.35-1.23,53.54,53.54,0,0,1-7.72-2.89c-.84-.39-1.66-.8-2.48-1.23-18-9.49-31.57-29.16-34.23-52.12-.12-1.05-.22-2.1-.29-3.16A66.59,66.59,0,0,1,105.49,224.45Zm53.92,178.6A177.27,177.27,0,0,1,97.47,332.4a4,4,0,0,1,1.62-5.26C117.67,316.69,141.4,311,163.82,311c17,0,30.7,2,42.69,5.88a8,8,0,0,1,2.59,13.77c-23.35,19-38.4,42.54-45.47,70.75v0A2.77,2.77,0,0,1,159.41,403.05ZM256,432a175.12,175.12,0,0,1-65.7-12.72,4,4,0,0,1-2.4-4.46c.4-2.05.84-3.92,1.23-5.48,7.12-28.43,24.76-52,51-68.18,23.29-14.35,53-22.25,83.52-22.25,31.16,0,60,7.58,83.48,21.91h0a2.72,2.72,0,0,1,.91,3.67A176.1,176.1,0,0,1,256,432Z'/%3e%3cpath%20d='M161,295.28a47.6,47.6,0,0,1-5.48-.62A47.6,47.6,0,0,0,161,295.28Z'/%3e%3cpath%20d='M134.64,178.13a55.62,55.62,0,0,0-14,10.82,54.49,54.49,0,0,0-7.19,9.56,54.49,54.49,0,0,1,7.19-9.56A55.62,55.62,0,0,1,134.64,178.13Z'/%3e%3cpath%20d='M216.17,257.89a71.58,71.58,0,0,0,6-23.84c.15-2.15.2-4.27.15-6.38q.08,3.15-.15,6.38A71.58,71.58,0,0,1,216.17,257.89Z'/%3e%3cpath%20d='M134.64,178.13a56.84,56.84,0,0,1,8.11-3.64A56.84,56.84,0,0,0,134.64,178.13Z'/%3e%3cpath%20d='M150.21,293.43a53.54,53.54,0,0,1-7.72-2.89A53.54,53.54,0,0,0,150.21,293.43Z'/%3e%3cpath%20d='M105.78,237.19c2.66,23,16.26,42.63,34.23,52.12C122,279.82,108.44,260.15,105.78,237.19Z'/%3e%3cpath%20d='M254.34,219a83.76,83.76,0,0,0,22,51.32,70.76,70.76,0,0,0,22.07,16.12,70.76,70.76,0,0,1-22.07-16.12,83.76,83.76,0,0,1-22-51.32q-.27-3.88-.18-7.68Q254.07,215.07,254.34,219Z'/%3e%3cpath%20d='M304.5,288.82a63.47,63.47,0,0,1-6.1-2.43A63.47,63.47,0,0,0,304.5,288.82Z'/%3e%3cpath%20d='M255.93,196.54a66.46,66.46,0,0,1,16.29-31.21A66.46,66.46,0,0,0,255.93,196.54Z'/%3e%3cpath%20d='M375,165.46a68.15,68.15,0,0,1,18,42.14,68.15,68.15,0,0,0-18-42.14,66.69,66.69,0,0,0-26.27-17.2A66.69,66.69,0,0,1,375,165.46Z'/%3e%3cpath%20d='M393,219h0a86.19,86.19,0,0,1-8.2,31A86.19,86.19,0,0,0,393,219Z'/%3e%3cpath%20d='M254.16,211.27a75.62,75.62,0,0,1,1.06-11.14A75.62,75.62,0,0,0,254.16,211.27Z'/%3e%3cpath%20d='M383.19,253.16c-1.11,2.07-2.3,4.1-3.58,6.06C380.89,257.26,382.08,255.23,383.19,253.16Z'/%3e%3cpath%20d='M206.88,189.05a57.86,57.86,0,0,1,15.41,38.62,57.86,57.86,0,0,0-15.41-38.62,57,57,0,0,0-30.78-17A57,57,0,0,1,206.88,189.05Z'/%3e%3cpath%20d='M190,288a54.21,54.21,0,0,1-10,4.65A54.21,54.21,0,0,0,190,288Z'/%3e%3cpath%20d='M105.49,224.45a59.87,59.87,0,0,1,5.2-20.64A59.87,59.87,0,0,0,105.49,224.45Z'/%3e%3cpath%20d='M194.68,284.88C193.17,286,191.61,287,190,288,191.61,287,193.17,286,194.68,284.88Z'/%3e%3cpath%20d='M216.17,257.89a69.49,69.49,0,0,1-5.73,10.42A69.49,69.49,0,0,0,216.17,257.89Z'/%3e%3cpath%20d='M110.69,203.81a56.76,56.76,0,0,1,2.78-5.3A56.76,56.76,0,0,0,110.69,203.81Z'/%3e%3cpath%20d='M194.68,284.88a65.39,65.39,0,0,0,15.76-16.57A65.39,65.39,0,0,1,194.68,284.88Z'/%3e%3c/svg%3e",
  IX = '/assets/channels-C1-V5QRs.svg',
  Kd =
    "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3c!--%20Uploaded%20to:%20SVG%20Repo,%20www.svgrepo.com,%20Generator:%20SVG%20Repo%20Mixer%20Tools%20--%3e%3csvg%20width='800px'%20height='800px'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M12%202C6.48%202%202%206.48%202%2012C2%2017.52%206.48%2022%2012%2022C17.52%2022%2022%2017.52%2022%2012C22%206.48%2017.52%202%2012%202ZM7.07%2018.28C7.5%2017.38%2010.12%2016.5%2012%2016.5C13.88%2016.5%2016.51%2017.38%2016.93%2018.28C15.57%2019.36%2013.86%2020%2012%2020C10.14%2020%208.43%2019.36%207.07%2018.28ZM12%2014.5C13.46%2014.5%2016.93%2015.09%2018.36%2016.83C19.38%2015.49%2020%2013.82%2020%2012C20%207.59%2016.41%204%2012%204C7.59%204%204%207.59%204%2012C4%2013.82%204.62%2015.49%205.64%2016.83C7.07%2015.09%2010.54%2014.5%2012%2014.5ZM12%206C10.06%206%208.5%207.56%208.5%209.5C8.5%2011.44%2010.06%2013%2012%2013C13.94%2013%2015.5%2011.44%2015.5%209.5C15.5%207.56%2013.94%206%2012%206ZM10.5%209.5C10.5%2010.33%2011.17%2011%2012%2011C12.83%2011%2013.5%2010.33%2013.5%209.5C13.5%208.67%2012.83%208%2012%208C11.17%208%2010.5%208.67%2010.5%209.5Z'%20fill='%23000000'/%3e%3c/svg%3e",
  RX = ({ channels: e, handleChannelClick: t }) => {
    const [r] = ur(),
      i = ((o) => {
        if (!o || typeof o != 'string') return null
        try {
          return { userId: Nr(o).sub }
        } catch {
          return null
        }
      })(r),
      a = e.filter((o) => o.members.length < 3)
    return O.jsx('div', {
      className: 'connections-list',
      style: { height: '72vh', overflowY: 'auto' },
      children: O.jsx(nn, {
        variant: 'flush',
        children: a.map((o) => {
          const s = o.title
            .split(',')
            .filter((c) => c !== (i == null ? void 0 : i.userId))[0]
          return O.jsx(
            nn.Item,
            {
              action: !0,
              onClick: () => t(o._id),
              className: 'py-2',
              style: {
                cursor: 'pointer',
                borderLeft: 'none',
                borderRight: 'none',
                transition: 'background-color 0.2s ease',
              },
              children: O.jsxs('div', {
                className: 'd-flex align-items-center',
                children: [
                  O.jsxs('div', {
                    className: 'position-relative',
                    style: {
                      width: '40px',
                      height: '40px',
                      marginRight: '12px',
                    },
                    children: [
                      O.jsx(Ni, {
                        src: Kd,
                        alt: 'User avatar',
                        style: {
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          borderRadius: '50%',
                        },
                      }),
                      O.jsx('span', {
                        className: 'position-absolute',
                        style: {
                          width: '10px',
                          height: '10px',
                          backgroundColor: '#28a745',
                          borderRadius: '50%',
                          bottom: '0',
                          right: '0',
                          border: '2px solid white',
                        },
                      }),
                    ],
                  }),
                  O.jsx('div', {
                    className: 'flex-grow-1',
                    children: O.jsx('div', {
                      className:
                        'd-flex justify-content-between align-items-center',
                      children: O.jsx('div', {
                        className: 'text-truncate',
                        style: { maxWidth: '70%' },
                        children: O.jsx(an, { id: s }),
                      }),
                    }),
                  }),
                ],
              }),
            },
            o._id,
          )
        }),
      }),
    })
  }
function ZS({ channelId: e, title: t, members: r, onChannelClick: n }) {
  const [i] = ur(),
    o = ((s) => {
      if (!s || typeof s != 'string') return null
      try {
        return { userId: Nr(s).sub }
      } catch {
        return null
      }
    })(i)
  return O.jsx(Je, {
    onClick: () => n(e),
    style: {
      margin: '1rem',
      maxWidth: '20rem',
      borderRadius: '8px',
      cursor: 'pointer',
    },
    index: e,
    children: O.jsxs(Je.Body, {
      children: [
        O.jsxs(Je.Title, {
          children: [
            r.length > 2
              ? O.jsx('img', {
                  src: Kd,
                  alt: 'group Icon',
                  style: { marginRight: '0.5rem', width: '1.5rem' },
                })
              : O.jsx('img', {
                  src: Kd,
                  alt: 'person Icon',
                  style: { marginRight: '0.5rem', width: '1.5rem' },
                }),
            r.length > 2
              ? t
              : O.jsx(an, {
                  id: t.split(',').filter((s) => s !== o.userId)[0],
                }),
          ],
        }),
        O.jsx(nn, {
          variant: 'flush',
          style: { maxHeight: '10rem', overflowY: 'auto' },
          children:
            r.length > 2 &&
            O.jsxs('p', {
              children: [
                O.jsx('hr', {}),
                O.jsx(an, { id: r[0].user }),
                ' ',
                `and ${r.length - 1} others`,
              ],
            }),
        }),
      ],
    }),
  })
}
ZS.propTypes = {
  channelId: X.string.isRequired,
  title: X.string.isRequired,
  members: X.arrayOf(
    X.shape({
      user: X.string.isRequired,
      role: X.oneOf(['admin', 'guest']).isRequired,
    }),
  ).isRequired,
  onChannelClick: X.func.isRequired,
}
function DX({ channels: e, handleChannelClick: t }) {
  return O.jsx(nn, {
    style: { overflowY: 'auto', height: '72vh' },
    children: e
      .filter((r) => r.members.length > 2)
      .map((r) =>
        O.jsx(
          gh,
          {
            style: { marginBottom: '1rem' },
            children: O.jsx(ZS, {
              channelId: r._id,
              title: r.title,
              members: r.members,
              onChannelClick: t,
            }),
          },
          r._id,
        ),
      ),
  })
}
const LX = {
    width: '8rem',
    height: '100vh',
    borderRight: '3px solid #ddd',
    backgroundColor: '#f8f9fa',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '2rem 0',
    position: 'fixed',
  },
  Ul = {
    cursor: 'pointer',
    textAlign: 'center',
    marginBottom: '2rem',
    height: '5rem',
    width: '4rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  BX = ({
    handleShowConnections: e,
    handleShowCreateChannel: t,
    handleShowChannels: r,
    hoveredButton: n,
    handleMouseEnter: i,
    handleMouseLeave: a,
  }) =>
    O.jsxs('div', {
      style: LX,
      children: [
        O.jsx('div', {
          onMouseEnter: () => i('connections'),
          onMouseLeave: a,
          onClick: e,
          style: Ul,
          children:
            n === 'connections'
              ? O.jsx('span', {
                  style: { fontSize: '1em', fontWeight: 200, color: 'black' },
                  children: 'Connections',
                })
              : O.jsx('img', {
                  src: NX,
                  alt: 'Connections',
                  style: { width: '2rem' },
                }),
        }),
        O.jsx('div', {
          onMouseEnter: () => i('createChannel'),
          onMouseLeave: a,
          onClick: t,
          style: Ul,
          children:
            n === 'createChannel'
              ? O.jsx('span', {
                  style: { fontSize: '1em', fontWeight: 200, color: 'black' },
                  children: 'Create New Channel',
                })
              : O.jsx('img', {
                  src: MX,
                  alt: 'Create Channel',
                  style: { width: '2rem' },
                }),
        }),
        O.jsx('div', {
          onMouseEnter: () => i('channels'),
          onMouseLeave: a,
          onClick: r,
          style: Ul,
          children:
            n === 'channels'
              ? O.jsx('span', {
                  style: { fontSize: '1em', fontWeight: 200, color: 'black' },
                  children: 'Channels',
                })
              : O.jsx('img', {
                  src: IX,
                  alt: 'Channels',
                  style: { width: '2rem' },
                }),
        }),
      ],
    })
function Gd() {
  const [e] = ur(),
    {
      setSelectedChannel: t,
      setChannelMessages: r,
      setChannelMembers: n,
    } = QS(),
    a = ((M) => {
      if (!M || typeof M != 'string')
        return (
          console.error('Invalid token:', 'Token must be a valid string'), null
        )
      try {
        return { userId: Nr(M).sub }
      } catch (N) {
        return console.error('Invalid token:', N), null
      }
    })(e)
  A.useEffect(() => console.log(`user data ${JSON.stringify(a)}`), [])
  const o = ua(),
    s = _i({
      queryKey: ['channels', { userId: a == null ? void 0 : a.userId }],
      queryFn: () => o1({ userId: a == null ? void 0 : a.userId }),
      enabled: !!(a != null && a.userId),
    }),
    c = Ko({
      mutationFn: ({ title: M, members: N }) => s1(e, { title: M, members: N }),
      onSuccess: () => {
        o.invalidateQueries(['channels'])
      },
    }),
    u = async () => {
      try {
        const M = await XS()
        for (const N of M)
          if (N._id !== a.userId) {
            const R = `${a.userId},${N._id}`,
              I = [{ user: N._id, role: 'admin' }]
            await c.mutateAsync({ title: R, members: I })
          }
      } catch (M) {
        console.error('Error creating channels:', M)
      }
    },
    l = async (M) => {
      try {
        const N = await c1(M, e)
        r(N.messages), n(N.members), t(M)
      } catch (N) {
        console.error(N)
      }
    },
    [f, d] = A.useState(!1),
    [h, y] = A.useState(!1),
    [v, p] = A.useState(!1),
    x = () => d(!1),
    b = () => d(!0),
    w = () => y(!1),
    g = () => y(!0),
    m = () => p(!1),
    S = () => p(!0),
    [P, $] = A.useState(''),
    T = (M) => {
      $(M)
    },
    k = () => {
      $('')
    }
  if (!a)
    return O.jsx('div', { children: 'Please log in to view your channels.' })
  const C = s.data ?? [],
    j = {
      width: '8rem',
      height: '100%',
      padding: 0,
      backgroundColor: '#f8f9fa',
    }
  return a
    ? O.jsx('div', {
        style: { height: '100vh', overflowY: 'auto' },
        children:
          C && C.length < 1
            ? O.jsxs('div', {
                style: {
                  position: 'absolute',
                  width: '99%',
                  height: '100%',
                  backgroundColor: 'white',
                  padding: '7rem',
                  textAlign: 'center',
                  zIndex: 1e3,
                },
                children: [
                  O.jsx('h1', { children: 'WELCOME TO DRCDV' }),
                  O.jsx('hr', {}),
                  O.jsx('p', {
                    children: 'Add connections and enjoy messaging',
                  }),
                  O.jsx(Xe, {
                    variant: 'primary',
                    onClick: u,
                    children: 'Add Connections',
                  }),
                ],
              })
            : O.jsxs(O.Fragment, {
                children: [
                  O.jsx(BX, {
                    handleShowConnections: b,
                    handleShowCreateChannel: g,
                    handleShowChannels: S,
                    hoveredButton: P,
                    handleMouseEnter: T,
                    handleMouseLeave: k,
                  }),
                  O.jsxs(rt, {
                    show: f,
                    onHide: x,
                    placement: 'start',
                    style: { ...j, width: '20rem' },
                    children: [
                      O.jsx(rt.Header, {
                        closeButton: !0,
                        children: O.jsx(rt.Title, { children: 'Connections' }),
                      }),
                      O.jsx(rt.Body, {
                        children: O.jsx(RX, {
                          channels: C,
                          handleChannelClick: l,
                        }),
                      }),
                    ],
                  }),
                  O.jsxs(rt, {
                    show: h,
                    onHide: w,
                    placement: 'start',
                    style: { ...j, width: '20rem' },
                    children: [
                      O.jsx(rt.Header, {
                        closeButton: !0,
                        children: O.jsx(rt.Title, {
                          children: 'Create New Channel',
                        }),
                      }),
                      O.jsx(rt.Body, {
                        children: O.jsx(Je.Body, { children: O.jsx(TX, {}) }),
                      }),
                    ],
                  }),
                  O.jsxs(rt, {
                    show: v,
                    onHide: m,
                    placement: 'start',
                    style: { ...j, width: '20rem' },
                    children: [
                      O.jsx(rt.Header, {
                        closeButton: !0,
                        children: O.jsx(rt.Title, { children: 'Channels' }),
                      }),
                      O.jsx(rt.Body, {
                        children:
                          C && C.length
                            ? O.jsx(DX, { channels: C, handleChannelClick: l })
                            : O.jsx('p', { children: 'No channels available' }),
                      }),
                    ],
                  }),
                ],
              }),
      })
    : O.jsx('div', { children: 'Please log in to view your channels.' })
}
const JS = A.createContext(),
  FX = ({ children: e }) => {
    const { authToken: t } = ur(),
      r = t ? Nr(t).sub : null,
      [n, i] = A.useState(!1),
      {
        data: a,
        isLoading: o,
        isError: s,
      } = _i({
        queryKey: ['channels', r],
        queryFn: () => o1({ userId: r }),
        enabled: !!r,
      })
    A.useEffect(() => {
      !o && !s && a && i(a.length > 0)
    }, [o, s, a])
    const c = () => {
      i(!n)
    }
    return o
      ? O.jsx('div', { children: 'Loading...' })
      : s
        ? O.jsx('div', { children: 'Error loading channels' })
        : O.jsx(JS.Provider, {
            value: { isVisible: n, toggleVisibility: c },
            children: e,
          })
  },
  UX = () => A.useContext(JS),
  WX =
    "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3c!--%20Uploaded%20to:%20SVG%20Repo,%20www.svgrepo.com,%20Generator:%20SVG%20Repo%20Mixer%20Tools%20--%3e%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20stroke='%23000000'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'%20%3e%3crect%20x='3'%20y='3'%20width='18'%20height='18'%20rx='2'%20ry='2'%20/%3e%3cline%20x1='9'%20y1='3'%20x2='9'%20y2='21'%20/%3e%3cpath%20d='M13%208l4%204-4%204'%20/%3e%3c/svg%3e"
function qX() {
  const [e] = ur(),
    r = ((o) => {
      if (!o || typeof o != 'string')
        return (
          console.error('Invalid token:', 'Token must be a valid string'), null
        )
      try {
        return { userId: Nr(o).sub }
      } catch (s) {
        return console.error('Invalid token:', s), null
      }
    })(e),
    { isVisible: n, toggleVisibility: i } = UX(),
    { selectedChannel: a } = QS()
  return O.jsx(O.Fragment, {
    children: r
      ? O.jsxs(Er, {
          fluid: !0,
          className: 'bg-light min-vh-100',
          style: { width: '100vw', paddingLeft: 0 },
          children: [
            O.jsx(jX, { toggleChannelsBoard: i }),
            !n &&
              O.jsx(Xe, {
                variant: 'outline',
                className: 'd-block d-md-none',
                onClick: i,
                style: {
                  position: 'fixed',
                  top: '1rem',
                  left: '1rem',
                  width: '4rem',
                  height: '4rem',
                  zIndex: 1e3,
                  border: 'none',
                },
                children: O.jsx('img', {
                  src: WX,
                  alt: 'Toggle Sidebar',
                  style: {
                    width: '3rem',
                    position: 'fixed',
                    top: '5rem',
                    left: 0,
                  },
                }),
              }),
            O.jsxs(Dn, {
              className: 'g-0 mt-5',
              children: [
                O.jsx($r, {
                  xs: 12,
                  md: 2,
                  className: 'd-none d-md-block',
                  children: O.jsx(Gd, {}),
                }),
                O.jsx($r, {
                  xs: 12,
                  md: 10,
                  className: 'flex-grow-1',
                  style: { paddingLeft: '4rem', margin: 0 },
                  children: O.jsx(CX, { channelId: a }),
                }),
              ],
            }),
            O.jsx(rt, {
              show: n,
              onHide: i,
              placement: 'start',
              style: {
                width: '16.6667%',
                height: '100vh',
                padding: 0,
                backgroundColor: '#f8f9fa',
              },
              children: O.jsx(rt.Body, {
                className: 'p-0',
                children: O.jsx(Gd, {}),
              }),
            }),
          ],
        })
      : O.jsxs(Er, {
          className: 'text-center mt-5',
          style: { width: '100vw', margin: '4vw' },
          children: [
            O.jsx('h1', {
              children: 'Sign in and enjoy messaging experience using DRCDV',
            }),
            O.jsx(Ds, {
              to: '/login',
              children: O.jsx(Xe, {
                variant: 'dark',
                className: 'm-2',
                style: { backgroundColor: 'black', color: 'white' },
                children: 'Login',
              }),
            }),
            O.jsx(Ds, {
              to: '/signup',
              children: O.jsx(Xe, {
                variant: 'light',
                className: 'm-2',
                style: { backgroundColor: '#1CCB8F', color: 'black' },
                children: 'Signup',
              }),
            }),
          ],
        }),
  })
}
function HX() {
  const [e, t] = A.useState(''),
    [r, n] = A.useState(''),
    [i, a] = A.useState(''),
    o = K0(),
    s = ua(),
    c = Ko({
      mutationFn: () => $X({ username: e, email: r, password: i }),
      onSuccess: (l) => {
        s.invalidateQueries(['channels']),
          o('/login', { state: { token: l.token } })
      },
      onError: () => alert('Failed to sign up!'),
    }),
    u = (l) => {
      l.preventDefault(), c.mutate()
    }
  return O.jsx('div', {
    style: {
      width: '100vw',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    children: O.jsxs(Er, {
      className: 'p-2',
      style: { width: '60vw', textAlign: 'center' },
      children: [
        O.jsx(Dn, {
          className: 'justify-content-center',
          children: O.jsxs($r, {
            xs: 12,
            children: [
              O.jsx('h2', {
                className: 'mb-4 text-center',
                children: 'Sign Up',
              }),
              O.jsxs(_e, {
                onSubmit: u,
                children: [
                  O.jsx(_e.Group, {
                    controlId: 'create-username',
                    className: 'mb-3',
                    style: { maxWidth: '300px', margin: 'auto' },
                    children: O.jsx(_e.Control, {
                      type: 'text',
                      placeholder: 'Enter your username',
                      value: e,
                      onChange: (l) => t(l.target.value),
                    }),
                  }),
                  O.jsx(_e.Group, {
                    controlId: 'create-email',
                    className: 'mb-3',
                    style: { maxWidth: '300px', margin: 'auto' },
                    children: O.jsx(_e.Control, {
                      type: 'email',
                      placeholder: 'Enter your email',
                      value: r,
                      onChange: (l) => n(l.target.value),
                    }),
                  }),
                  O.jsx(_e.Group, {
                    controlId: 'create-password',
                    className: 'mb-3',
                    style: { maxWidth: '300px', margin: 'auto' },
                    children: O.jsx(_e.Control, {
                      type: 'password',
                      placeholder: 'Enter your password',
                      value: i,
                      onChange: (l) => a(l.target.value),
                    }),
                  }),
                  O.jsx(Xe, {
                    variant: 'light',
                    type: 'submit',
                    disabled: !e || !i || c.isPending,
                    className: 'w-40',
                    style: { backgroundColor: '#1CCB8F', color: 'black' },
                    children: c.isPending ? 'Signing up...' : 'Sign Up',
                  }),
                  c.isError &&
                    O.jsx(rh, {
                      variant: 'danger',
                      className: 'mt-3',
                      children: 'Failed to sign up!',
                    }),
                ],
              }),
            ],
          }),
        }),
        O.jsx(Dn, {
          xs: 12,
          children: O.jsx(Ds, {
            to: '/',
            className: 'btn btn-link mb-3',
            children: 'Back to main page',
          }),
        }),
      ],
    }),
  })
}
function zX() {
  const [e, t] = A.useState(''),
    [r, n] = A.useState(''),
    i = K0(),
    [, a] = ur(),
    o = Ko({
      mutationFn: () => EX({ username: e, password: r }),
      onSuccess: (c) => {
        a(c.token), i('/')
      },
      onError: () => alert('Failed to log in!'),
    }),
    s = (c) => {
      c.preventDefault(), o.mutate()
    }
  return O.jsxs('div', {
    style: {
      width: '100vw',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
    },
    children: [
      O.jsx(Er, {
        className: 'p-2',
        style: { width: '80vw', textAlign: 'center' },
        children: O.jsxs(Dn, {
          className: 'justify-content-center',
          children: [
            O.jsx($r, { xs: 12 }),
            O.jsxs($r, {
              xs: 12,
              children: [
                O.jsx('h2', {
                  className: 'mb-4 text-center',
                  children: 'Login',
                }),
                O.jsxs(_e, {
                  onSubmit: s,
                  children: [
                    O.jsx(_e.Group, {
                      controlId: 'create-username',
                      className: 'mb-3',
                      style: { maxWidth: '300px', margin: 'auto' },
                      children: O.jsx(_e.Control, {
                        type: 'text',
                        placeholder: 'Enter your username',
                        value: e,
                        onChange: (c) => t(c.target.value),
                      }),
                    }),
                    O.jsx(_e.Group, {
                      controlId: 'create-password',
                      className: 'mb-3',
                      style: { maxWidth: '300px', margin: 'auto' },
                      children: O.jsx(_e.Control, {
                        type: 'password',
                        placeholder: 'Enter your password',
                        value: r,
                        onChange: (c) => n(c.target.value),
                      }),
                    }),
                    O.jsx(Xe, {
                      variant: 'dark',
                      type: 'submit',
                      disabled: !e || !r || o.isPending,
                      className: 'w-60',
                      style: { backgroundColor: 'black', color: 'white' },
                      children: o.isPending ? 'Logging in...' : 'Log in',
                    }),
                    o.isError &&
                      O.jsx(rh, {
                        variant: 'danger',
                        className: 'mt-3',
                        children: 'Failed to log in!',
                      }),
                  ],
                }),
              ],
            }),
          ],
        }),
      }),
      O.jsx(Ds, {
        to: '/',
        className: 'btn btn-link mb-3',
        children: 'Back to main page',
      }),
    ],
  })
}
const KX = new SA(),
  GX = tA([
    { path: '/', element: O.jsx(qX, {}) },
    { path: '/signup', element: O.jsx(HX, {}) },
    { path: '/login', element: O.jsx(zX, {}) },
    { path: '/Sidebar', element: O.jsx(Gd, {}) },
  ])
function VX() {
  return O.jsx(_A, {
    client: KX,
    children: O.jsx(qx, {
      children: O.jsx(FX, {
        children: O.jsx(kX, {
          children: O.jsx(XE, { children: O.jsx(rA, { router: GX }) }),
        }),
      }),
    }),
  })
}
Wl.createRoot(document.getElementById('root')).render(
  O.jsx(E.StrictMode, { children: O.jsx(VX, {}) }),
)
//# sourceMappingURL=index-BmX0TtU8.js.map
