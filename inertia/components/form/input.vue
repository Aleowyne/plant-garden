<template>
  <input
    :id="props.name"
    v-model="model"
    class="input"
    :type="props.type"
    :placeholder="props.placeholder"
    :disabled="props.disabled"
  />
</template>

<script setup lang="ts">
  const props = defineProps<{
    type: string
    name: string
    placeholder?: string
    disabled?: boolean
  }>()

  const model = defineModel<string | number>()
</script>

<style scoped>
  .input {
    padding: 1em;
    border: 1px solid #ced4da;
    border-radius: 4px;
  }
</style>
