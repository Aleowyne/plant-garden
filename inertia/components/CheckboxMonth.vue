<template>
  <div class="grid w-full items-center gap-1.5">
    <p class="text-sm">
      {{ props.title }}
    </p>
    <div class="flex flex-wrap gap-2.5 mb-8">
      <div v-for="option in props.options" :key="option.id" class="flex flex-col items-center">
        <Label :for="option.id" class="mb-2">
          {{ option.label }}
        </Label>
        <Checkbox
          :id="option.id"
          :value="option.value"
          :disabled="option.disabled"
          :checked="model?.includes(option.value)"
          class="w-12 h-12"
          @update:checked="(isChecked) => handleCheck(isChecked, option.value)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { CheckboxForm } from '@/types'
  import { Label } from '@/components/ui/label'
  import { Checkbox } from '@/components/ui/checkbox'

  const props = defineProps<{
    title: string
    options: Array<CheckboxForm>
  }>()

  const model = defineModel<Array<string>>()

  function handleCheck(isChecked: boolean, value: string) {
    if (isChecked) {
      model.value?.push(value)
    } else {
      model.value?.splice(model.value.indexOf(value), 1)
    }
  }
</script>
