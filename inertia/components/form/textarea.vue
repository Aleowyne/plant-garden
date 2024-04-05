<template>
  <textarea :id="name" :placeholder="placeholder" v-model="model"></textarea>
</template>

<script setup lang="ts">
interface TextAreaProps {
  name: string
  placeholder?: string
}

defineProps<TextAreaProps>()

const model = defineModel<string>()
</script>

<style scoped>
textarea {
  height: 200px;
}
</style>
