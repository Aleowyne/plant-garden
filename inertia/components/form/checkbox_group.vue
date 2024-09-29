<template>
  <fieldset class="form-group">
    <legend>{{ props.title }}</legend>
    <div v-for="option in props.options" :key="option.id">
      <input
        :id="option.id"
        v-model="model"
        type="checkbox"
        :value="option.value"
        :disabled="option.disabled"
      />
      <label :for="option.id">
        {{ option.label }}
      </label>
    </div>
  </fieldset>
</template>

<script lang="ts">
  export type CheckboxForm = {
    id: string
    label: string
    value: string
    disabled?: boolean
  }
</script>

<script setup lang="ts">
  const props = defineProps<{
    title: string
    options: Array<CheckboxForm>
  }>()

  const model = defineModel<Array<string>>()
</script>
