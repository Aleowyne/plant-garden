<template>
  <Head>
    <title>Liste des jardins</title>
  </Head>
  <div class="flex flex-1 justify-center mt-16 mx-9">
    <div class="flex flex-wrap gap-8 mx-6">
      <div v-for="garden in props.gardens" :key="garden.id">
        <Link :href="`/gardens/${garden.id}`">
          <Card class="size-56">
            <CardHeader class="text-center">
              <CardTitle>{{ garden.name }}</CardTitle>
            </CardHeader>
            <CardContent v-if="garden.image">
              <img :src="garden.image" :alt="`Jardin ${garden.name}`" />
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { Head, Link } from '@inertiajs/vue3'
  import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
  import { GardensPresenterSerialized } from '#presenters/gardens_presenter'

  const props = defineProps<{
    gardens: GardensPresenterSerialized[]
  }>()
</script>
