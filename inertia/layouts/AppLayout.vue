<template>
  <div class="flex flex-col min-h-full">
    <div class="fixed w-full top-0 left-0 z-10">
      <header class="flex justify-between border-b border-border bg-background">
        <NavigationMenu class="ml-7">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link
                href="/"
                class="hover:text-muted-foreground hover:bg-background focus:bg-background"
                :class="navigationMenuTriggerStyle()"
              >
                Plant Garden
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <NavigationMenu class="mr-7">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link
                href="/gardens"
                class="hover:text-muted-foreground hover:bg-background focus:bg-background"
                :class="navigationMenuTriggerStyle()"
              >
                Mes jardins
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link
                href="/calendars"
                class="hover:text-muted-foreground hover:bg-background focus:bg-background"
                :class="navigationMenuTriggerStyle()"
              >
                Calendrier
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link
                href="/plants"
                class="hover:text-muted-foreground hover:bg-background focus:bg-background"
                :class="navigationMenuTriggerStyle()"
              >
                Plantes
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link
                href="/logout"
                class="hover:text-muted-foreground hover:bg-background focus:bg-background"
                :class="navigationMenuTriggerStyle()"
              >
                Déconnexion
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </header>
    </div>
    <slot />
    <Footer />
    <Toaster />
  </div>
</template>

<script setup lang="ts">
  import { watch } from 'vue'
  import { usePage, Link } from '@inertiajs/vue3'
  import Footer from '@/components/Footer.vue'
  import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    navigationMenuTriggerStyle,
  } from '@/components/ui/navigation-menu'
  import { Toaster, useToast } from '@/components/ui/toast'
  import { SharedProps } from '@adonisjs/inertia/types'

  const page = usePage<SharedProps>()

  const { toast } = useToast()

  watch(
    () => page.props.message,
    (newValue) => {
      if (newValue.type) {
        toast({
          description: newValue.description,
          variant: newValue.type === 'error' ? 'destructive' : 'default',
        })
      }
    }
  )
</script>
