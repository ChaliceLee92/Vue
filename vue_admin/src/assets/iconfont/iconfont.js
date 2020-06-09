!(function(d) {
    let e,
        a =
            '<svg><symbol id="icon-RectangleCopy" viewBox="0 0 1024 1024"><path d="M517.632 552.149333c-108.714667 0-197.162667-85.546667-197.162667-190.72 0-38.314667 11.690667-75.306667 33.877334-106.922666C391.04 202.026667 452.138667 170.666667 517.632 170.666667c65.408 0 126.464 31.274667 163.2 83.712 7.765333 11.093333 14.250667 22.869333 19.413333 35.072a21.333333 21.333333 0 1 1-39.338666 16.64 147.285333 147.285333 0 0 0-15.018667-27.221334C617.130667 237.824 569.173333 213.333333 517.632 213.333333c-51.626667 0-99.584 24.533333-128.426667 65.621334a143.445333 143.445333 0 0 0-26.069333 82.432c0 81.664 69.290667 148.096 154.453333 148.096 63.402667 0 119.722667-36.437333 143.36-92.8a21.333333 21.333333 0 0 1 39.338667 16.512c-30.378667 72.277333-102.016 118.954667-182.656 118.954666"  ></path><path d="M303.829333 627.456c-49.92 0-90.453333 41.088-90.453333 91.605333C213.333333 769.578667 253.866667 810.666667 303.786667 810.666667h416.341333C770.133333 810.666667 810.666667 769.578667 810.666667 719.061333c0-50.517333-40.533333-91.605333-90.453334-91.605333H303.786667zM720.213333 853.333333H303.829333C230.442667 853.333333 170.709333 793.088 170.709333 719.061333 170.666667 645.034667 230.4 584.789333 303.786667 584.789333h416.341333C793.6 584.789333 853.333333 645.034667 853.333333 719.061333 853.333333 793.088 793.6 853.333333 720.213333 853.333333z"  ></path></symbol><symbol id="icon-RectangleCopy1" viewBox="0 0 1024 1024"><path d="M810.666667 557.312v-58.154667c0-54.272-48-98.432-106.965334-98.432H357.888V308.181333C357.888 232.362667 427.52 170.666667 513.024 170.666667c85.546667 0 155.178667 61.696 155.178667 137.514666v18.005334a21.333333 21.333333 0 1 0 42.666666 0v-18.005334c0-99.370667-88.746667-180.181333-197.845333-180.181333-109.056 0-197.802667 80.810667-197.802667 180.181333v93.013334C258.645333 403.669333 213.333333 446.464 213.333333 499.157333v255.701334C213.333333 809.173333 261.290667 853.333333 320.256 853.333333h383.445333C762.666667 853.333333 810.666667 809.173333 810.666667 754.858667v-69.546667a21.333333 21.333333 0 0 0-42.666667 0v69.546667c0 30.805333-28.842667 55.808-64.298667 55.808H320.256C284.842667 810.666667 256 785.664 256 754.858667v-255.701334c0-30.762667 28.842667-55.765333 64.256-55.765333h383.445333c35.456 0 64.298667 25.002667 64.298667 55.765333v58.154667a21.333333 21.333333 0 0 0 42.666667 0z"  ></path></symbol></svg>',
        t = (e = document.getElementsByTagName('script'))[
            e.length - 1
        ].getAttribute('data-injectcss')
    if (t && !d.__iconfont__svg__cssinject__) {
        d.__iconfont__svg__cssinject__ = !0
        try {
            document.write(
                '<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>'
            )
        } catch (e) {
            console && console.log(e)
        }
    }
    !(function(e) {
        if (document.addEventListener)
            if (
                ~['complete', 'loaded', 'interactive'].indexOf(
                    document.readyState
                )
            )
                setTimeout(e, 0)
            else {
                let t = function() {
                    document.removeEventListener('DOMContentLoaded', t, !1), e()
                }
                document.addEventListener('DOMContentLoaded', t, !1)
            }
        else
            document.attachEvent &&
                ((o = e),
                (c = d.document),
                (i = !1),
                (a = function() {
                    try {
                        c.documentElement.doScroll('left')
                    } catch (e) {
                        return void setTimeout(a, 50)
                    }
                    n()
                })(),
                (c.onreadystatechange = function() {
                    'complete' == c.readyState &&
                        ((c.onreadystatechange = null), n())
                }))
        function n() {
            i || ((i = !0), o())
        }
        let o, c, i, a
    })(function() {
        let e, t, n, o, c, i
        ;((e = document.createElement('div')).innerHTML = a),
            (a = null),
            (t = e.getElementsByTagName('svg')[0]) &&
                (t.setAttribute('aria-hidden', 'true'),
                (t.style.position = 'absolute'),
                (t.style.width = 0),
                (t.style.height = 0),
                (t.style.overflow = 'hidden'),
                (n = t),
                (o = document.body).firstChild
                    ? ((c = n),
                      (i = o.firstChild).parentNode.insertBefore(c, i))
                    : o.appendChild(n))
    })
})(window)
