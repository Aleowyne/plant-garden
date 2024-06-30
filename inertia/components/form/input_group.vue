<template>
  <div class="form-group">
    <Label :name="name" :label="label" />
    <Input
      :type="type"
      :name="name"
      :placeholder="placeholder"
      :isDisabled="isDisabled"
      v-model="model"
    />
    <Error :errors="errors" />
  </div>
</template>

<script setup lang="ts">
import Label from '@/components/form/label.vue'
import Input from '@/components/form/input.vue'
import Error from '@/components/form/error.vue'

interface InputGroupProps {
  type: string
  name: string
  label: string
  placeholder?: string
  isDisabled?: boolean
  errors?: any
}

defineProps<InputGroupProps>()

const model = defineModel<string | number>()
</script>
