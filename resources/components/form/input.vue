<template>
  <div>
    <label :for="labelFor">{{ label }}</label>
    <input :type="type" :id="labelFor" v-model="inputValue" :placeholder="placeholder" />
    <div class="form-error">
      <p v-if="errors">{{ errors[0] }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { FieldForm, FieldFormValue } from '@/types'

const props = withDefaults(defineProps<FieldForm>(), {
  type: 'text',
})

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
