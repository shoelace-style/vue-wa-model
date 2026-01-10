export default function (options = {}) {
  if (!options) { options = {} }

  if (!options.events) {
    options.events = ["input", "change"]
  }

  if (!options.eventHandler) {
    options.eventHandler = function (el, binding, vnode) {
      return (event) => {
        const model = binding.value
        model.value = event.target.value
      }
    };
  }

  const { events, eventHandler } = options

  return {
    name: 'vue-wa-model',
    install: (app, options) => {
      const wm = new WeakMap();

      app.directive("wa-model", {
        beforeMount(el, binding, vnode) {
          const inputHandler = eventHandler(el, binding, vnode)
          wm.set(el, inputHandler);

          const modelValue = binding.value.value
          el.value = modelValue ?? null;
          el.defaultValue = modelValue ?? null;

          events.forEach((eventName) => {
            el.addEventListener(eventName, inputHandler);
          });
        },

        updated(el, binding) {
          el.value = binding.value.value ?? null;
          el.defaultValue = binding.value ?? null
        },

        unmounted(el, _binding) {
          const inputHandler = wm.get(el);
          events.forEach((eventName) => {
            el.removeEventListener(eventName, inputHandler);
          });
          wm.delete(el);
        },
      });
    },
  }
};
