<template>
  <div class="grid w-full max-w-sm items-center gap-1.5">
    <Label :for="props.name">{{ props.label }}</Label>
    <Input
      :id="props.name"
      v-model="model"
      :type="props.type"
      :placeholder="props.placeholder"
      :disabled="props.disabled"
    />
    <Error :error="props.error" />
  </div>
</template>

<script setup lang="ts">
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
