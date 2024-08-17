<template>
  <div class="form-group">
    <p class="form-group-title">{{ props.title }}</p>
    <div class="checkbox-list">
      <div class="checkbox" v-for="option in props.options">
        <label :for="option.id">{{ option.label }}</label>
        <input
          class="checkbox-input"
          type="checkbox"
          :id="option.id"
          :value="option.value"
          :disabled="option.isDisabled"
          v-model="model"
        />
        <div class="checkmark" @click="activateMonth($event)"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CheckboxForm } from '@/components/form/checkbox_group.vue'

const props = defineProps<{
  title: string
  options: Array<CheckboxForm>
}>()

const model = defineModel<Array<string>>()

function activateMonth(event: Event) {
  const checkmark = event.target as HTMLDivElement
  const checkbox = checkmark.previousElementSibling as HTMLInputElement

  if (checkbox && !checkbox.disabled) {
    checkbox.checked = !checkbox.checked

    if (checkbox.checked) {
      model.value?.push(checkbox.value)
      checkmark.style.backgroundColor = '#4d774e'
    } else {
      model.value?.splice(model.value.indexOf(checkbox.value), 1)
      checkmark.style.backgroundColor = '#ebebeb'
    }
  }
}
</script>

<style scoped>
.form-group-title {
  font-weight: bold;
}

.checkbox-list {
  display: flex;
  flex-wrap: wrap;
  row-gap: 10px;
  column-gap: 5px;
}

.checkbox-input {
  display: none;
}

.checkbox {
  display: flex;
  flex-direction: column;
  flex-basis: calc(100% / 13);
  align-items: center;
}

.checkmark {
  width: 50px;
  height: 50px;
  background-color: #ebebeb;

  .checkbox-input:not(:disabled) + & {
    cursor: pointer;
  }

  .checkbox-input:checked + & {
    background-color: #4d774e;
  }
}
</style>
