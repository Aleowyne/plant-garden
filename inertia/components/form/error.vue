<template>
  <div class="form-error">
    <p v-if="props.errors && props.errors.length > 0">{{ props.errors[0] }}</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  errors?: Array<string>
}>()
</script>

<style scoped>
.form-error {
  height: 1em;
  font-size: 0.8em;
  color: #ff0000;
}
</style>
