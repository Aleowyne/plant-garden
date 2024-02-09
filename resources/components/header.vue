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
