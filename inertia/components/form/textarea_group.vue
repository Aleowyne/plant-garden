<template>
  <div class="form-group">
    <Label :name="name" :label="label" />
    <TextArea :name="name" :placeholder="placeholder" v-model="model" />
    <Error :errors="errors" />
  </div>
</template>

<script setup lang="ts">
import Label from '@/components/form/label.vue'
import TextArea from '@/components/form/textarea.vue'
import Error from '@/components/form/error.vue'

interface TextAreaGroupProps {
  name: string
  label: string
  placeholder?: string
  errors?: any
}

defineProps<TextAreaGroupProps>()

const model = defineModel<string>()
</script>
