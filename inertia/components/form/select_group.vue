<template>
  <div class="form-group">
    <Label :name="props.name" :label="props.label" />
    <Select v-model="model" :name="props.name" :options="props.options" />
    <Error :error="props.error" />
  </div>
</template>

<script setup lang="ts">
  import Label from '@/components/form/label.vue'
  import Select, { OptionForm } from '@/components/form/select.vue'
  import Error from '@/components/form/error.vue'

  const props = defineProps<{
    name: string
    label: string
    options: Array<OptionForm>
    error?: string
  }>()

  const model = defineModel<string | number>()
</script>
