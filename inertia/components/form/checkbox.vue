<template>
  <fieldset class="form-group">
    <legend>{{ label }}</legend>
    <div v-for="option in options">
      <input type="checkbox" :id="option.name" :value="option.value" v-model="model" />
      <label :for="option.name">{{ option.label }}</label>
    </div>
  </fieldset>
</template>

<script setup lang="ts">
interface CheckboxProps {
  label: string
  options: Array<{ name: string; value: string; label: string }>
}

defineProps<CheckboxProps>()

const model = defineModel<Array<string>>()
</script>
