<template>
  <div class="form-group">
    <Label :name="props.name" :label="props.label" />
    <TextArea
      :name="props.name"
      :placeholder="props.placeholder"
      :disabled="props.isDisabled"
      v-model="model"
    />
    <Error :errors="props.errors" />
  </div>
</template>

<script setup lang="ts">
import Label from '@/components/form/label.vue'
import TextArea from '@/components/form/textarea.vue'
import Error from '@/components/form/error.vue'

const props = defineProps<{
  name: string
  label: string
  placeholder?: string
  isDisabled?: boolean
  errors?: any
}>()

const model = defineModel<string>()
</script>
