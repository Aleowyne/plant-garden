<template>
  <fieldset class="form-group">
    <legend>{{ props.title }}</legend>
    <div v-for="option in props.options">
      <input
        type="checkbox"
        :id="option.id"
        :value="option.value"
        :disabled="option.isDisabled"
        v-model="model"
      />
      <label :for="option.id">{{ option.label }}</label>
    </div>
  </fieldset>
</template>

<script lang="ts">
export type CheckboxForm = {
  id: string
  label: string
  value: string
  isDisabled?: boolean
}
</script>

<script setup lang="ts">
const props = defineProps<{
  title: string
  options: Array<CheckboxForm>
}>()

const model = defineModel<Array<string>>()
</script>
