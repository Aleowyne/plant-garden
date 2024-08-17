<template>
  <Error />
  <Header />
  <main class="main">
    <slot></slot>
  </main>
  <Footer />
</template>

<script setup lang="ts">
import Header from '@/components/header.vue'
import Footer from '@/components/footer.vue'
import Error from '@/components/message.vue'
</script>
