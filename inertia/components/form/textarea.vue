<template>
  <textarea
    class="textarea"
    :id="props.name"
    :placeholder="props.placeholder"
    :disabled="props.isDisabled"
    v-model="model"
  ></textarea>
</template>

<script setup lang="ts">
const props = defineProps<{
  name: string
  placeholder?: string
  isDisabled?: boolean
}>()

const model = defineModel<string>()
</script>

<style scoped>
.textarea {
  height: 200px;
  resize: none;
}
</style>
