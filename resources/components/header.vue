<template>
  <header>
    <div class="header-navbar-left">
      <Link class="header-navbar-link" href="/">Plant Garden</Link>
    </div>
    <ul class="header-navbar-right">
      <li class="header-navbar-item">
        <Link class="header-navbar-link" href="/gardens">Mes jardins</Link>
      </li>
      <li class="header-navbar-item">
        <Link class="header-navbar-link" href="/calendars">Calendrier</Link>
      </li>
      <li class="header-navbar-item">
        <Link class="header-navbar-link" href="/plants/search">Recherche de plantes</Link>
      </li>
      <li class="header-navbar-item">
        <Link class="header-navbar-link" href="/logout">Déconnexion</Link>
      </li>
    </ul>
  </header>
</template>

<script setup lang="ts">
import { Link } from '@inertiajs/vue3'
</script>

<style scoped>
header {
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 50px;
  background-color: #164a41;
}

.header-navbar-left {
  display: flex;
  align-items: center;
  padding-left: 20px;
}

.header-navbar-right {
  display: flex;
  justify-content: right;
  align-items: center;
}

.header-navbar-item {
  padding: 0px 20px;
  list-style: none;
}

.header-navbar-link {
  color: #e7edf8;
  text-decoration: none;
}
</style>
