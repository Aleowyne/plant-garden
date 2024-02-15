<template>
  <div>
    <fieldset>
      <legend>{{ label }}</legend>
      <div v-for="option in options">
        <input type="checkbox" :id="option.id" :value="option.value" v-model="inputValue" />
        <label :for="option.id">{{ option.label }}</label>
      </div>
    </fieldset>
    <div class="form-error">
      <p v-if="errors">{{ errors[0] }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { FieldForm, FieldFormValue } from '@/types'

const props = defineProps<FieldForm>()

const emit = defineEmits<{
  'update:modelValue': [value: FieldFormValue]
}>()

const inputValue = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})
</script>
