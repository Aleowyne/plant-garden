<template>
  <div class="form-group">
    <Label :name="props.name" :label="props.label" />
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
  import Label from '@/components/form/label.vue'
  import TextArea from '@/components/form/textarea.vue'
  import Error from '@/components/form/error.vue'

  const props = defineProps<{
    name: string
    label: string
    placeholder?: string
    disabled?: boolean
    error?: string
  }>()

  const model = defineModel<string>()
</script>
