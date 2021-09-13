let vueSticky = {}
let listenAction
vueSticky.install = Vue => {
  Vue.directive('sticky', {
    inserted(el, binding) {
      let params = binding.value || {}
      let stickyTop = params.stickyTop || 0
      let zIndex = params.zIndex || 1000
      let elStyle = el.style

      elStyle.position = '-webkit-sticky'
      elStyle.position = 'sticky'
      // if the browser support css sticky（Currently Safari, Firefox and Chrome Canary）
      // if (~elStyle.position.indexOf('sticky')) {
      //     elStyle.top = `${stickyTop}px`;
      //     elStyle.zIndex = zIndex;
      //     return
      // }
      let elHeight = el.getBoundingClientRect().height
      let elWidth = el.getBoundingClientRect().width
      elStyle.cssText = `top: ${stickyTop}px; z-index: ${zIndex}`

      let parentElm = el.parentNode || document.documentElement
      let placeholder = document.createElement('div')
      placeholder.style.display = 'none'
      placeholder.style.width = `${elWidth}px`
      placeholder.style.height = `${elHeight}px`
      parentElm.insertBefore(placeholder, el)

      let active = false

      let getScroll = (target, top) => {
        let prop = top ? 'pageYOffset' : 'pageXOffset'
        let method = top ? 'scrollTop' : 'scrollLeft'
        let ret = target[prop]
        if (typeof ret !== 'number') {
          ret = window.document.documentElement[method]
        }
        return ret
      }

      let sticky = () => {
        if (active) {
          return
        }
        if (!elStyle.height) {
          elStyle.height = `${el.offsetHeight}px`
        }

        elStyle.position = 'fixed'
        elStyle.width = `${elWidth}px`
        placeholder.style.display = 'inline-block'
        active = true
      }

      let reset = () => {
        if (!active) {
          return
        }

        elStyle.position = ''
        placeholder.style.display = 'none'
        active = false
      }

      let check = () => {
        let scrollTop = getScroll(window, true)
        let offsetTop = el.getBoundingClientRect().top
        if (offsetTop < stickyTop) {
          sticky()
        } else {
          if (scrollTop < elHeight + stickyTop) {
            reset()
          }
        }
      }
      listenAction = () => {
        check()
      }

      window.addEventListener('scroll', listenAction)
    },

    unbind() {
      window.removeEventListener('scroll', listenAction)
    }
  })
}

export default vueSticky

