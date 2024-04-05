<template>
  <select :name="name" :id="name" v-model="model">
    <option v-for="option in options" :value="option.value">{{ option.label }}</option>
  </select>
</template>

<script setup lang="ts">
interface SelectProps {
  name: string
  options: Array<{ value: string; label: string }>
}

defineProps<SelectProps>()

const model = defineModel<string | number>()
</script>

<style scoped>
select {
  padding: 10px;
}
</style>
