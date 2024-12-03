<template>
  <Layout>
    <div class="flex flex-1 mt-16 mx-9">
      <form
        class="flex-none"
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
            <FormInput
              v-model="form.nbRow"
              type="number"
              name="image"
              label="Nombre de lignes"
              :min="0"
              :max="20"
              :error="form.errors.nbRow"
            />
            <FormInput
              v-model="form.nbCol"
              type="number"
              name="image"
              label="Nombre de colonnes"
              :min="0"
              :max="20"
              :error="form.errors.nbCol"
            />
          </CardContent>
          <CardFooter class="flex justify-center">
            <Button>Créer le jardin</Button>
          </CardFooter>
        </Card>
      </form>
      <div class="flex mx-6">
        <div v-for="col in form.nbCol" :key="col">
          <div
            v-for="row in form.nbRow"
            :key="row"
            :set="getPlantAtPosition(row - 1, col - 1)"
            class="w-24 h-24 flex items-center justify-center border-solid border border-black"
            @dragover.prevent
            @dragenter.prevent
            @drop="dropHandler($event, row - 1, col - 1)"
          >
            <template
              v-for="{ plant } in [{ plant: getPlantAtPosition(row - 1, col - 1) }]"
              :key="plant"
            >
              <img
                v-if="plant"
                :src="plant.image"
                :alt="plant.name"
                draggable="true"
                @dragstart="dragStartHandler($event, plant)"
              />
              <DialogSearchPlant
                v-else
                :plants="props.plants"
                @add="addPlant($event, row - 1, col - 1)"
              />
            </template>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script setup lang="ts">
  import { useForm } from '@inertiajs/vue3'
  import { InferPageProps } from '@adonisjs/inertia/types'
  import { GardenForm, PlantPosition } from '@/types'
  import Layout from '@/layouts/AppLayout.vue'
  import FormInput from '@/components/form/FormInput.vue'
  import DialogSearchPlant from '@/components/DialogSearchPlant.vue'
  import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
  import { Button } from '@/components/ui/button'
  import type GardensController from '#controllers/gardens_controller'

  type Plant = InferPageProps<GardensController, 'create'>['plants'][0]

  const props = defineProps<{
    plants: Plant[]
  }>()

  const form = useForm<GardenForm>({
    name: '',
    image: '',
    nbCol: 0,
    nbRow: 0,
    plantPositions: [],
  })

  // Récupération de la plante à une position
  function getPlantAtPosition(row: number, column: number): PlantPosition {
    return form.plantPositions.find(
      (plant) => plant.row === row && plant.column === column
    ) as PlantPosition
  }

  // Récupération de l'index de la plante à une position
  function getIndexPlantAtPosition(row: number, column: number): number {
    return form.plantPositions.findIndex((plant) => plant.row === row && plant.column === column)
  }

  // Gestion du drag and drop d'une plante (partie drag)
  function dragStartHandler(event: DragEvent, plant: PlantPosition) {
    if (plant) {
      event.dataTransfer?.setData('plant', JSON.stringify(plant))
      event.dataTransfer!.dropEffect = 'copy'
      event.dataTransfer!.effectAllowed = 'copy'
    }
  }

  // Gestion du drag and drop d'une plante (partie drop)
  function dropHandler(event: DragEvent, row: number, column: number) {
    const plantTransfer = event.dataTransfer?.getData('plant')

    if (plantTransfer) {
      const sourcePlant: PlantPosition = JSON.parse(plantTransfer)
      const destinationPlant = getPlantAtPosition(row, column)

      // Ajout d'une nouvelle plante
      if (!destinationPlant) {
        form.plantPositions.push({
          row: row,
          column: column,
          id: sourcePlant.id,
          name: sourcePlant.name,
          image: sourcePlant.image,
        })
      }
      // Remplacement de la plante
      else {
        const index = getIndexPlantAtPosition(row, column)
        destinationPlant.id = sourcePlant.id
        destinationPlant.name = sourcePlant.name
        destinationPlant.image = sourcePlant.image

        form.plantPositions.splice(index, 1, destinationPlant)
      }
    }
  }

  // Ajout d'une nouvelle plante dans la jardin
  function addPlant(plant: Plant, row: number, column: number) {
    form.plantPositions.push({
      row: row,
      column: column,
      id: plant.id,
      name: plant.name,
      image: plant.image,
    })
  }
</script>
