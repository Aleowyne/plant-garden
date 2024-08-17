<template>
  <div class="form-group">
    <Label for="test" :name="props.name" :label="props.label" />
    <Input
      :type="props.type"
      :name="props.name"
      :placeholder="props.placeholder"
      :isDisabled="props.isDisabled"
      v-model="model"
    />
    <Error :errors="props.errors" />
  </div>
</template>

<script setup lang="ts">
import Label from '@/components/form/label.vue'
import Input from '@/components/form/input.vue'
import Error from '@/components/form/error.vue'

const props = defineProps<{
  type: string
  name: string
  label: string
  placeholder?: string
  isDisabled?: boolean
  errors?: any
}>()

const model = defineModel<string | number>()
</script>
