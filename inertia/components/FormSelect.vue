<template>
  <div class="form-group">
    <Label :for="props.name">{{ props.label }}</Label>
    <Select :id="props.name" v-model="model">
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup v-for="option in props.options" :key="option.id">
          <SelectItem :value="option.value" :disabled="option.disabled">
            {{ option.label }}
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
    <Error :error="props.error" />
  </div>
</template>

<script setup lang="ts">
  import { OptionForm } from '@/types'
  import Error from '@/components/Error.vue'
  import { Label } from '@/components/ui/label'
  import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectGroup,
    SelectItem,
  } from '@/components/ui/select'

  const props = defineProps<{
    name: string
    label: string
    options: Array<OptionForm>
    error?: string
  }>()

  const model = defineModel<string>()
</script>
