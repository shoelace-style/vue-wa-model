import { isRef, toRef } from "vue";

import { watch } from 'vue';

export default function () {
  const events = ["input", "change"]

  return {
    name: 'vue-wa-model',
    install: (app, options) => {
      const wm = new WeakMap();

      app.directive("wa-model", {
        beforeMount(el, binding, _vnode) {
          const ref = binding.value
          const inputHandler = function inputHandler(event) {
            ref.value = event.currentTarget.value
          };

          wm.set(el, inputHandler);

          const initialValue = ref.value
          el.value = initialValue ?? "";
          el.defaultValue = initialValue ?? "";

          events.forEach((eventName) => {
            el.addEventListener(eventName, inputHandler);
          });
        },

        updated(el, binding) {
          const ref = binding.value
          const newValue = ref.value
          el.value = newValue ?? "";
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
