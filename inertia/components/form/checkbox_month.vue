<template>
  <div class="form-group">
    <p class="form-group-title">{{ label }}</p>
    <div class="checkboxes">
      <div class="checkbox" v-for="option in options">
        <label :for="option.name">{{ option.label }}</label>
        <input type="checkbox" :id="option.name" :value="option.value" v-model="model" disabled />
        <div class="checkmark" @click="activateMonth($event)"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface CheckboxProps {
  label: string
  options: Array<{ name: string; value: string; label: string }>
}

defineProps<CheckboxProps>()

const model = defineModel<Array<string>>()

function activateMonth(event: Event) {
  const checkmark = event.target as HTMLDivElement
  const checkbox = checkmark.previousElementSibling as HTMLInputElement

  if (checkbox && !checkbox.disabled) {
    checkbox.checked = !checkbox.checked

    if (checkbox.checked) {
      checkmark.style.backgroundColor = '#4d774e'
    } else {
      checkmark.style.backgroundColor = '#ebebeb'
    }
  }
}
</script>

<style scoped>
.form-group-title {
  font-weight: bold;
}

.checkboxes {
  display: flex;
  flex-wrap: wrap;
}

input {
  display: none;
}

.checkbox {
  display: flex;
  flex-direction: column;
  flex-basis: calc(100% / 12);
  align-items: center;
}

.checkmark {
  width: 50px;
  height: 50px;
  background-color: #ebebeb;

  input:not(:disabled) + & {
    cursor: pointer;
  }

  input:checked + & {
    background-color: #4d774e;
  }
}
</style>
