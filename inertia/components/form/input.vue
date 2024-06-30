<template>
  <input
    :type="type"
    :id="name"
    :placeholder="placeholder"
    :disabled="isDisabled"
    v-model="model"
  />
</template>

<script setup lang="ts">
interface InputProps {
  type: string
  name: string
  placeholder?: string
  isDisabled?: boolean
}

defineProps<InputProps>()

const model = defineModel<string | number>()
</script>

<style scoped>
input {
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 4px;
}
</style>
