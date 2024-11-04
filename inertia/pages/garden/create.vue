<template>
  <Layout>
    <form
      class="flex flex-col flex-1 items-center mt-16"
      @submit.prevent="form.post('/gardens', { onSuccess: () => form.reset() })"
    >
      <Card>
        <CardHeader>
          <CardTitle class="text-center">Ajouter un jardin</CardTitle>
        </CardHeader>
        <CardContent>
          <FormInput
            v-model="form.name"
            type="text"
            name="name"
            label="Nom"
            :error="form.errors.name"
          />
          <FormInput
            v-model="form.image"
            type="url"
            name="image"
            label="Image"
            :error="form.errors.image"
          />
        </CardContent>
        <CardFooter class="flex justify-center">
          <Button>Créer le jardin</Button>
        </CardFooter>
      </Card>
    </form>
  </Layout>
</template>

<script setup lang="ts">
  import { useForm } from '@inertiajs/vue3'
  import { GardenForm } from '@/types'
  import Layout from '@/layouts/AppLayout.vue'
  import FormInput from '@/components/FormInput.vue'
  import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
  import { Button } from '@/components/ui/button'

  const form = useForm<GardenForm>({
    name: '',
    image: '',
  })
</script>
