<script setup>
  const model = defineModel({ default: "value" })

  // We wrap the model in a function to avoid unwrapping of refs when passing to `v-wa-model`.
  // Possibly related issue?
  // https://github.com/vuejs/rfcs/discussions/534
  const waModel = () => model

  function update() {
    model.value += "a"
  }
</script>

<template>
  <div class="outline wa-stack">
    <h2>Composition Test</h2>
    <wa-input v-wa-model="waModel()"></wa-input>
    <wa-input v-wa-model="waModel()" readonly></wa-input>
    <div>Value: {{ model }}</div>
    <button @click="update">Add "a"</button>
  </div>
</template>

