<template>
  <Error :message="message"></Error>
  <Header :isAuthenticated="isAuthenticated"></Header>
  <main>
    <slot></slot>
  </main>
  <Footer></Footer>
</template>

<script setup lang="ts">
import type { Message, Auth } from '@/types'
import Header from '@/components/header.vue'
import Footer from '@/components/footer.vue'
import Error from '@/components/message.vue'

defineProps<Message & Auth>()
</script>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 90vh;
}
</style>
