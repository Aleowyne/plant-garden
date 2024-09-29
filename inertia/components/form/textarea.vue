<template>
  <textarea
    :id="props.name"
    v-model="model"
    class="textarea"
    :placeholder="props.placeholder"
    :disabled="props.disabled"
  />
</template>

<script setup lang="ts">
  const props = defineProps<{
    name: string
    placeholder?: string
    disabled?: boolean
  }>()

  const model = defineModel<string>()
</script>

<style scoped>
  .textarea {
    height: 10em;
    resize: none;
  }
</style>
