<template>
  <select :id="props.name" v-model="model" class="select" :name="props.name">
    <option
      v-for="option in props.options"
      :key="option.id"
      :value="option.value"
      :disabled="option.disabled"
    >
      {{ option.label }}
    </option>
  </select>
</template>

<script lang="ts">
  export type OptionForm = {
    id: string
    label: string
    value: string
    disabled?: boolean
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
    padding: 1em;
  }
</style>
