<template>
  <Error :message="props.message"></Error>
  <main>
    <slot></slot>
  </main>
</template>

<script setup lang="ts">
import type { Message } from '@/types'
import Error from '@/components/message.vue'

const props = defineProps<Message>()
</script>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>
