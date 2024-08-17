<template>
  <div class="form-group">
    <Label :name="props.name" :label="props.label" />
    <Select :name="props.name" :options="props.options" v-model="model" />
    <Error :errors="props.errors" />
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
  errors?: any
}>()

const model = defineModel<string | number>()
</script>
