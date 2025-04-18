<template>
  <Head>
    <title>Affichage d'un jardin</title>
  </Head>
  <div class="flex flex-col flex-1 items-center mt-16">
    <Card>
      <CardHeader>
        <CardTitle class="flex items-center justify-between">
          <div class="absolute left-1/2 transform -translate-x-1/2">{{ props.garden.name }}</div>
          <div class="ml-auto">
            <Link :href="`/gardens/${props.garden.id}/edit`" as="button">
              <Pencil class="size-6 mx-1 text-primary" />
            </Link>
            <Link :href="`/gardens/${props.garden.id}`" method="delete" as="button">
              <Trash2 class="size-6 mx-1 text-destructive" />
            </Link>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div class="flex flex-col flex-1 items-center">
          <div v-if="props.garden.image" class="w-80">
            <img class="max-w-full mb-4" :src="props.garden.image" :alt="`Plante ${props.garden.name}`" />
          </div>
        </div>

        <div class="flex justify-center">
          <div v-for="col in props.garden.nbCol" :key="col">
            <div
              v-for="row in props.garden.nbRow"
              :key="row"
              class="w-24 h-24 flex items-center justify-center border-solid border border-black"
            >
              <template
                v-for="{ plantPosition } in [{ plantPosition: getPlantAtPosition(row - 1, col - 1) }]"
                :key="plantPosition"
              >
                <img v-if="plantPosition.plantId" :src="plantPosition.plantImage" :alt="plantPosition.plantName" />
              </template>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
  import { Head, Link } from '@inertiajs/vue3'
  import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
  import { Pencil, Trash2 } from 'lucide-vue-next'
  import { GardensPresenterSerialized } from '#presenters/gardens_presenter'
  import { PlotsPresenterSerialized } from '#presenters/plots_presenter'

  const props = defineProps<{
    garden: GardensPresenterSerialized
  }>()

  // Récupération de la plante à une position
  function getPlantAtPosition(row: number, column: number): PlotsPresenterSerialized {
    let plantPosition = props.garden.plots.find((plant) => plant.row === row && plant.column === column)

    if (!plantPosition) {
      plantPosition = {
        id: 0,
        row: row,
        column: column,
        plantId: 0,
        plantName: '',
        plantImage: '',
        plantationDate: '',
        removeDate: '',
      }
    }

    return plantPosition
  }
</script>
