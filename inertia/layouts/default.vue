<template>
  <Error />
  <Header />
  <div class="content">
    <slot />
  </div>
  <Footer />
</template>

<script setup lang="ts">
  import Header from '@/components/header.vue'
  import Footer from '@/components/footer.vue'
  import Error from '@/components/message.vue'
</script>

<style scoped>
  .content {
    display: flex;
    flex: 1;
    flex-direction: column;

    &:has(.auth-box) {
      justify-content: center;
    }

    &:has(.box) {
      align-items: center;
    }

    &:not(:has(.auth-box)) {
      margin: 2em 0em;
    }
  }
</style>
