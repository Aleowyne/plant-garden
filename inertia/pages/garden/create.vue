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
              <Dialog v-else>
                <DialogTrigger><BadgePlus class="size-24 mx-1 text-secondary" /></DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Ajouter une plante au jardin</DialogTitle>
                    <DialogDescription>Formulaire</DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose as-child>
                      <Button>Valider</Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </template>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script setup lang="ts">
  import { useForm } from '@inertiajs/vue3'
  import { GardenForm, Plot } from '@/types'
  import Layout from '@/layouts/AppLayout.vue'
  import FormInput from '@/components/form/FormInput.vue'
  import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
  import { Button } from '@/components/ui/button'
  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
  } from '@/components/ui/dialog'
  import { BadgePlus } from 'lucide-vue-next'

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

  function dragStartHandler(event: DragEvent, plot: Plot) {
    if (plot) {
      event.dataTransfer?.setData('plot', JSON.stringify(plot))
      event.dataTransfer!.dropEffect = 'copy'
      event.dataTransfer!.effectAllowed = 'copy'
    }
  }

  function dropHandler(event: DragEvent, row: number, column: number) {
    if (!getPlantAtPosition(row, column)) {
      const plotTransfer = event.dataTransfer?.getData('plot')

      if (plotTransfer) {
        const plot: Plot = JSON.parse(plotTransfer)

        form.plots.push({
          row: row,
          column: column,
          plantId: plot.plantId,
          plantName: plot.plantName,
          plantImage: plot.plantImage,
        })
      }
    }
  }
</script>
