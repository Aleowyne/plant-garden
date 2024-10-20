<template>
  <div class="flex flex-col min-h-full">
    <Header />
    <slot />
    <Footer />
    <Toaster />
  </div>
</template>

<script setup lang="ts">
  import { watch } from 'vue'
  import { usePage } from '@inertiajs/vue3'
  import { useToast } from '@/components/ui/toast/use-toast'
  import Header from '@/components/header.vue'
  import Footer from '@/components/footer.vue'
  import type { InertiaProps } from '@/types'

  const page = usePage<InertiaProps>()
  const { toast } = useToast()

  watch(
    () => page.props,
    (newValue) => {
      if (newValue.message) {
        toast({
          description: newValue.message.description,
          variant: newValue.message.type === 'error' ? 'destructive' : 'default',
        })
      }
    }
  )
</script>
