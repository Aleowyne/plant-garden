<template>
  <div class="h-4 text-xs mb-4 text-destructive">
    <p v-if="props.error">
      {{ props.error }}
    </p>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps<{
    error?: string
  }>()
</script>
