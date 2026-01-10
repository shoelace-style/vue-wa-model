const wm = new WeakMap();


export default function (options = {}) {
  if (!options) { options = {} }

  if (!options.events) {
    options.events = ["input", "change"]
  }

  if (!options.eventHandler) {
    options.eventHandler = function (el, binding, vnode) {
      return (event) => {
        Vue.set(vnode.context, binding.expression, event.target.value);
      }
    };
  }

  const { events, eventHandler } = options

  return {
    install: function (Vue) {
      Vue.directive('wa-model', {
        bind (el, binding, vnode) {
          const inputHandler = eventHandler(binding)
          wm.set(el, inputHandler);
          el.defaultValue = binding.value ?? null
          el.value = binding.value ?? null;
          events.forEach((eventName) => {
            el.addEventListener(eventName, inputHandler);
          })
        },
        componentUpdated(el, binding) {
          el.defaultValue = binding.value ?? null
          el.value = binding.value;
        },
        unbind(el) {
          const inputHandler = wm.get(el);
          events.forEach((eventName) => {
            el.removeEventListener(eventName, inputHandler);
          })
        }
      })
    }
  }
};
