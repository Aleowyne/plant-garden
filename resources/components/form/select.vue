<template>
  <div>
    <label :for="labelFor">{{ label }}</label>
    <select :name="labelFor" :id="labelFor" v-model="inputValue">
      <option v-for="option in options" :value="option.value">{{ option.label }}</option>
    </select>
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
