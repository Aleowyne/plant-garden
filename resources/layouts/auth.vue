<template>
  <Error :message="props.message"></Error>
  <header>
    <div class="header-navbar-left">
      <Link class="header-navbar-link" href="/">Plant Garden</Link>
    </div>
    <ul class="header-navbar-right">
      <li class="header-navbar-item">
        <Link class="header-navbar-link" href="/login">Connexion</Link>
      </li>
      <li class="header-navbar-item">
        <Link class="header-navbar-link" href="/signin">Inscription</Link>
      </li>
    </ul>
  </header>
  <main>
    <slot></slot>
  </main>
</template>

<script setup lang="ts">
import { Link } from '@inertiajs/vue3'
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
  min-height: 90vh;
}
</style>
