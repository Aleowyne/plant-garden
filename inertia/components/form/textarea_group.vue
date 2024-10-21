<template>
  <div class="form-group">
    <Label :for="props.name">{{ props.label }}</Label>
    <TextArea
      v-model="model"
      :name="props.name"
      :placeholder="props.placeholder"
      :disabled="props.disabled"
    />
    <Error :error="props.error" />
  </div>
</template>

<script setup lang="ts">
  import TextArea from '@/components/form/textarea.vue'

  const props = defineProps<{
    name: string
    label: string
    placeholder?: string
    disabled?: boolean
    error?: string
  }>()

  const model = defineModel<string>()
</script>
