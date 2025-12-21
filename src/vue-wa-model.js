// TODO: not sure if this is granular enough, or if we need to provide more hooks. Make this a function to allow for future extensions.
export default function (options = {}) {
  if (!options) { options = {} }

  if (!options.events) { options.events = [] }
  if (!options.eventHandler) {
    function _eventHandler(event) {
      return (binding.instance[binding.value] = event.target.value);
    }
    options.eventHandler = _eventHandler
  }

  const { events, eventHandler } = options

  if (!events.includes("input")) {
    events.push("input")
  }

  if (!events.includes("change")) {
    events.push("change")
  }

  return {
    name: 'vue-wa-model',
    install: (app, _options) => {
      const wm = new WeakMap();

      app.directive("wa-model", {
        beforeMount(el, binding, _vnode) {
          wm.set(el, eventHandler);
          el.defaultValue = binding.value ?? null
          el.value = binding.value ?? null;

          events.forEach((eventName) => {
            el.addEventListener(eventName, eventHandler);
          })
        },
        updated(el, binding) {
          el.value = binding.value ?? null;
        },
        unmounted(el, _binding) {
          const eventHandler = wm.get(el);

          events.forEach((eventName) => {
            el.removeEventListener(eventName, eventHandler);
          })
        },
      });
    }
  }
};
