<template>
  <textarea :id="name" :placeholder="placeholder" :disabled="isDisabled" v-model="model"></textarea>
</template>

<script setup lang="ts">
interface TextAreaProps {
  name: string
  placeholder?: string
  isDisabled?: boolean
}

defineProps<TextAreaProps>()

const model = defineModel<string>()
</script>

<style scoped>
textarea {
  height: 200px;
  resize: none;
}
</style>
