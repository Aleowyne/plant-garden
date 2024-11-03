<template>
  <Layout>
    <div class="flex flex-1 mt-16 mx-9">
      <form class="flex-none" @submit.prevent="form.get('/plants', { preserveState: true })">
        <Card>
          <CardHeader class="text-center">
            <CardTitle>Rechercher</CardTitle>
          </CardHeader>
          <CardContent>
            <FormInput
              v-model="form.name"
              type="text"
              name="name"
              label="Nom de plante"
              :error="form.errors.name"
            />
            <FormSelect
              v-model="form.type"
              name="type"
              label="Type de plante"
              :options="props.typeOptions"
              :error="form.errors.type"
            />
          </CardContent>
          <CardFooter class="flex justify-center">
            <Button>Rechercher</Button>
          </CardFooter>
        </Card>
      </form>
      <div class="flex flex-wrap gap-8 mx-6">
        <div v-for="plant in props.plants" :key="plant.id">
          <Link :href="`/plants/${plant.id}`">
            <Card class="size-56">
              <CardHeader class="text-center">
                <CardTitle>{{ plant.name }}</CardTitle>
                <CardDescription>{{ plant.typeLabel }}</CardDescription>
              </CardHeader>
              <CardContent v-if="plant.image">
                <img :src="plant.image" :alt="`Plante ${plant.name}`" />
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script setup lang="ts">
  import { useForm, Link } from '@inertiajs/vue3'
  import { InferPageProps } from '@adonisjs/inertia/types'
  import Layout from '@/layouts/AppLayout.vue'
  import FormInput from '@/components/FormInput.vue'
  import FormSelect from '@/components/FormSelect.vue'
  import { Button } from '@/components/ui/button'
  import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
  } from '@/components/ui/card'
  import type PlantsController from '#controllers/plants_controller'

  const props = defineProps<{
    plants: InferPageProps<PlantsController, 'index'>['plants']
    typeOptions: InferPageProps<PlantsController, 'show'>['typeOptions']
  }>()

  const form = useForm<{ name: string; type: string }>({
    name: '',
    type: '',
  })
</script>
