export default {
    bind: function(el, binding, vnode) {},
    inserted: function(el, binding) {
        let oTip = document.createElement('div'),
            modifiers = binding.modifiers
        el.onmousemove = function() {
            // ${binding.value}
            oTip.innerHTML = `<div style="width: 150px; height: 150px">
                            <img style="width: 100%; height: 100%" src="https://qcdn.beautifulreading.com/a6bdafefecbbeab028c476fa9a75986a" />
                        </div>`
            oTip.className = 'v-tooltip__content'
            el.style.position = 'relative'

            el.appendChild(oTip)
            for (let attr in modifiers) {
                if (attr == 'top') {
                    oTip.style.cssText =
                        'position: absolute;left: 50%; top: -10px;  transform: translate(-50%,-100%);'
                } else if (attr == 'right') {
                    oTip.style.cssText =
                        'position: absolute;right: -10px; top: 50%; transform: translate(100%,-50%)'
                } else if (attr == 'left') {
                    oTip.style.cssText =
                        'position: absolute;left: -10px; top: 50%; transform: translate(-100%,-50%)'
                } else {
                    oTip.style.cssText =
                        'position: absolute;left: 50%; bottom: -10px; transform: translate(-50%,100%)'
                }
            }
            oTip.style.display = 'block'
        }
        el.onmouseout = function() {
            oTip.style.display = 'none'
        }
    }
}
