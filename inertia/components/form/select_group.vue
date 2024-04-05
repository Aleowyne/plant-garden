<template>
  <div class="form-group">
    <Label :name="name" :label="label" />
    <Select :name="name" :options="options" v-model="model" />
    <Error :errors="errors" />
  </div>
</template>

<script setup lang="ts">
import Label from '@/components/form/label.vue'
import Select from '@/components/form/select.vue'
import Error from '@/components/form/error.vue'

interface SelectGroupProps {
  name: string
  label: string
  options: Array<{ value: string; label: string }>
  errors?: any
}

defineProps<SelectGroupProps>()

const model = defineModel<string | number>()
</script>
