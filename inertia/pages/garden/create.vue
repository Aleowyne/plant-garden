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
              :error="form.errors.nbRow"
            />
            <FormInput
              v-model="form.nbCol"
              type="number"
              name="image"
              label="Nombre de colonnes"
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
              v-for="{ plot } in [{ plot: getPlantAtPosition(row - 1, col - 1) }]"
              :key="plot"
            >
              <img
                v-if="plot"
                :src="plot.plantImage"
                :alt="plot.plantName"
                draggable="true"
                @dragstart="dragStartHandler($event, plot)"
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
  import { GardenForm, Plot } from '@/types'
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
    plots: [],
  })

  function getPlantAtPosition(row: number, column: number): Plot {
    return form.plots.find((plot) => plot.row === row && plot.column === column) as Plot
  }

  function getIndexPlantAtPosition(row: number, column: number): number {
    return form.plots.findIndex((plot) => plot.row === row && plot.column === column)
  }

  function dragStartHandler(event: DragEvent, plot: Plot) {
    if (plot) {
      event.dataTransfer?.setData('plot', JSON.stringify(plot))
      event.dataTransfer!.dropEffect = 'copy'
      event.dataTransfer!.effectAllowed = 'copy'
    }
  }

  function dropHandler(event: DragEvent, row: number, column: number) {
    const plotTransfer = event.dataTransfer?.getData('plot')

    if (plotTransfer) {
      const plot: Plot = JSON.parse(plotTransfer)
      const plant = getPlantAtPosition(row, column)

      // Ajout d'une nouvelle plante
      if (!plant) {
        form.plots.push({
          row: row,
          column: column,
          plantId: plot.plantId,
          plantName: plot.plantName,
          plantImage: plot.plantImage,
        })
      }
      // Remplacement de la plante
      else {
        const index = getIndexPlantAtPosition(row, column)
        plant.plantId = plot.plantId
        plant.plantName = plot.plantName
        plant.plantImage = plot.plantImage

        form.plots.splice(index, 1, plant)
      }
    }
  }

  function addPlant(plant: Plant, row: number, column: number) {
    form.plots.push({
      row: row,
      column: column,
      plantId: plant.id,
      plantName: plant.name,
      plantImage: plant.image,
    })
  }
</script>
