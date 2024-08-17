<template>
  <input
    class="input"
    :type="props.type"
    :id="props.name"
    :placeholder="props.placeholder"
    :disabled="props.isDisabled"
    v-model="model"
  />
</template>

<script setup lang="ts">
const props = defineProps<{
  type: string
  name: string
  placeholder?: string
  isDisabled?: boolean
}>()

const model = defineModel<string | number>()
</script>

<style scoped>
.input {
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 4px;
}
</style>
