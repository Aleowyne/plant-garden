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
                href="/login"
                class="hover:text-muted-foreground hover:bg-background focus:bg-background"
                :class="navigationMenuTriggerStyle()"
              >
                Connexion
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link
                href="/signin"
                class="hover:text-muted-foreground hover:bg-background focus:bg-background"
                :class="navigationMenuTriggerStyle()"
              >
                Inscription
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </header>
    </div>
    <slot />
    <Footer />
    <Toaster rich-colors />
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
  import { Toaster } from '@/components/ui/sonner'
  import { toast } from 'vue-sonner'
  import { SharedProps } from '@adonisjs/inertia/types'
  import 'vue-sonner/style.css'

  const page = usePage<SharedProps>()

  watch(
    () => page.props.message,
    (newValue) => {
      if (newValue.type) {
        if (newValue.type === 'success') {
          toast.success(newValue.description)
        } else if (newValue.type === 'info') {
          toast.info(newValue.description)
        } else if (newValue.type === 'warning') {
          toast.warning(newValue.description)
        } else if (newValue.type === 'error') {
          toast.error(newValue.description)
        }
      }
    }
  )
</script>
