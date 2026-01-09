<script setup>
  const model = defineModel({ default: "value" })
  const getModel = () => model
</script>

<template>
  <div class="outline">
    <h2>Options Test</h2>
    <wa-input v-wa-model="getModel()"></wa-input>
    <wa-input v-wa-model="getModel()" readonly></wa-input>
    <div>Value: {{ model }}</div>
  </div>
</template>

