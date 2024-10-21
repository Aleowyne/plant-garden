<template>
  <div class="form-group">
    <Label :for="props.name">{{ props.label }}</Label>
    <Select v-model="model" :name="props.name" :options="props.options" />
    <Error :error="props.error" />
  </div>
</template>

<script setup lang="ts">
  import Select, { OptionForm } from '@/components/form/select.vue'

  const props = defineProps<{
    name: string
    label: string
    options: Array<OptionForm>
    error?: string
  }>()

  const model = defineModel<string | number>()
</script>
