<template>
  <header class="sticky flex justify-between border-b border-border">
    <NavigationMenu class="ml-7">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink
            href="/"
            class="hover:text-muted-foreground hover:bg-background focus:bg-background"
            :class="navigationMenuTriggerStyle()"
          >
            Plant Garden
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
    <NavigationMenu class="mr-7">
      <NavigationMenuList>
        <NavigationMenuItem v-for="link in links" :key="link.name">
          <NavigationMenuLink
            v-if="isAuth === link.auth"
            :href="link.url"
            class="hover:text-muted-foreground hover:bg-background focus:bg-background"
            :class="navigationMenuTriggerStyle()"
          >
            {{ link.name }}
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  </header>
</template>

<script setup lang="ts">
  import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'
  import { computed, ref } from 'vue'
  import { usePage } from '@inertiajs/vue3'
  import type { InertiaProps } from '@/types'

  const isAuth = computed(() => usePage<InertiaProps>().props.isAuth)

  const links = ref([
    { name: 'Mes jardins', url: '/gardens', auth: true },
    { name: 'Calendrier', url: '/calendars', auth: true },
    { name: 'Plantes', url: '/plants', auth: true },
    { name: 'Déconnexion', url: '/logout', auth: true },
    { name: 'Connexion', url: '/login', auth: false },
    { name: 'Inscription', url: '/signin', auth: false },
  ])
</script>
