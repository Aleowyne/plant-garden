<template>
  <select class="select" :name="props.name" :id="props.name" v-model="model">
    <option v-for="option in props.options" :value="option.value" :disabled="option.isDisabled">
      {{ option.label }}
    </option>
  </select>
</template>

<script lang="ts">
export type OptionForm = {
  id: string
  label: string
  value: string
  isDisabled?: boolean
}
</script>

<script setup lang="ts">
const props = defineProps<{
  name: string
  options: Array<OptionForm>
}>()

const model = defineModel<string | number>()
</script>

<style scoped>
.select {
  padding: 10px;
}
</style>
