<template>
  <div class="form-group">
    <Label :name="props.name" :label="props.label" />
    <Input
      v-model="model"
      :type="props.type"
      :name="props.name"
      :placeholder="props.placeholder"
      :disabled="props.disabled"
    />
    <Error :error="props.error" />
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
    disabled?: boolean
    error?: string
  }>()

  const model = defineModel<string | number>()
</script>
