<template>
  <Layout>
    <div class="garden-box box">
      <div class="form-title">
        <h3>Ajouter un jardin</h3>
      </div>
      <form @submit.prevent="form.post('/gardens')">
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
        <Button>Ajouter</Button>
      </form>
    </div>
  </Layout>
</template>

<script setup lang="ts">
  import { useForm } from '@inertiajs/vue3'
  import { GardenForm } from '@/types'
  import Layout from '@/layouts/AppLayout.vue'

  const form = useForm<GardenForm>({
    name: '',
    image: '',
  })
</script>
