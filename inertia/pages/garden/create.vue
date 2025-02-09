<template>
  <Head>
    <title>Création d'un jardin</title>
  </Head>
  <div class="flex flex-1 mt-16 mx-9">
    <form class="flex-none" @submit.prevent="gardenForm.post('/gardens', { onSuccess: () => gardenForm.reset() })">
      <Card>
        <CardHeader>
          <CardTitle class="text-center">Ajouter un jardin</CardTitle>
        </CardHeader>
        <CardContent>
          <FormInput v-model="gardenForm.name" type="text" name="name" label="Nom" :error="gardenForm.errors.name" />
          <FormInput
            v-model="gardenForm.image"
            type="url"
            name="image"
            label="Image"
            :error="gardenForm.errors.image"
          />
          <FormInput
            v-model="gardenForm.nbRow"
            type="number"
            name="image"
            label="Nombre de lignes"
            :min="0"
            :max="20"
            :error="gardenForm.errors.nbRow"
          />
          <FormInput
            v-model="gardenForm.nbCol"
            type="number"
            name="image"
            label="Nombre de colonnes"
            :min="0"
            :max="20"
            :error="gardenForm.errors.nbCol"
          />
        </CardContent>
        <CardFooter class="flex justify-center">
          <Button>Créer le jardin</Button>
        </CardFooter>
      </Card>
    </form>
    <div class="flex mx-6">
      <div v-for="col in gardenForm.nbCol" :key="col">
        <div
          v-for="row in gardenForm.nbRow"
          :key="row"
          :set="getPlantAtPosition(row - 1, col - 1)"
          class="w-24 h-24 flex items-center justify-center border-solid border border-black"
          @dragover.prevent
          @dragenter.prevent
          @drop="dropHandler($event, row - 1, col - 1)"
        >
          <template
            v-for="{ gardenPlant } in [{ gardenPlant: getPlantAtPosition(row - 1, col - 1) }]"
            :key="gardenPlant"
          >
            <img
              v-if="gardenPlant"
              :src="gardenPlant.image"
              :alt="gardenPlant.name"
              draggable="true"
              @dragstart="dragStartHandler($event, gardenPlant)"
            />

            <Dialog v-else>
              <DialogTrigger><BadgePlus class="size-24 mx-1 text-secondary" /></DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle class="mb-8">Ajouter une plante au jardin</DialogTitle>
                  <DialogDescription>
                    <WhenVisible data="plants">
                      <template #fallback>
                        <span>Chargement ...</span>
                      </template>
                      <form id="search" @submit.prevent="addPlant(row - 1, col - 1)">
                        <Popover v-model:open="openPopover">
                          <PopoverTrigger as-child>
                            <Button
                              variant="outline"
                              role="combobox"
                              :aria-expanded="openPopover"
                              class="w-full justify-between"
                            >
                              {{
                                plotForm.plantId && props.plants
                                  ? props.plants.find((plant) => plant.id === plotForm.plantId)?.name
                                  : 'Choisir une plante ...'
                              }}
                              <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent class="w-full p-0">
                            <Command>
                              <CommandInput placeholder="Rechercher une plante ..." />
                              <CommandEmpty>Aucune plante trouvée.</CommandEmpty>
                              <CommandList>
                                <CommandGroup>
                                  <CommandItem
                                    v-for="plant in props.plants"
                                    :key="plant.name"
                                    :value="`${plant.name}${plant.id}`"
                                    @select="
                                      () => {
                                        plotForm.plantId = plant.id
                                        plotForm.plantName = plant.name
                                        plotForm.plantImage = plant.image
                                        openPopover = false
                                      }
                                    "
                                  >
                                    <Check
                                      :class="
                                        cn('h-4 w-4', plotForm.plantId === plant.id ? 'opacity-100' : 'opacity-0')
                                      "
                                    />
                                    {{ plant.name }}
                                  </CommandItem>
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                        <FormInput
                          v-model="plotForm.plantationDate"
                          type="date"
                          name="plantationDate"
                          label="Date de semis/plantation"
                          class="mt-8"
                        />
                      </form>
                    </WhenVisible>
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose as-child>
                    <Button type="submit" form="search">Valider</Button>
                  </DialogClose>
                  <DialogClose as-child>
                    <Button class="bg-secondary">Annuler</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { useForm, WhenVisible, Head } from '@inertiajs/vue3'
  import { cn } from '@/lib/utils'
  import { GardenForm, PlantPosition, PlotForm } from '@/types'
  import FormInput from '@/components/form/FormInput.vue'
  import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
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
  import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
  import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
  import { Button } from '@/components/ui/button'
  import { BadgePlus, ChevronsUpDown, Check } from 'lucide-vue-next'
  import { PlantsPresenterSerialized } from '#presenters/plants_presenter'

  const props = defineProps<{
    plants?: PlantsPresenterSerialized[]
  }>()

  const gardenForm = useForm<GardenForm>({
    name: '',
    image: '',
    nbCol: 0,
    nbRow: 0,
    plantPositions: [],
  })

  const plotForm = useForm<PlotForm>({
    plantId: 0,
    plantName: '',
    plantImage: '',
    plantationDate: '',
  })

  const openPopover = ref(false)

  // Récupération de la plante à une position
  function getPlantAtPosition(row: number, column: number): PlantPosition {
    return gardenForm.plantPositions.find((plant) => plant.row === row && plant.column === column) as PlantPosition
  }

  // Récupération de l'index de la plante à une position
  function getIndexPlantAtPosition(row: number, column: number): number {
    return gardenForm.plantPositions.findIndex((plant) => plant.row === row && plant.column === column)
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
        gardenForm.plantPositions.push({
          row: row,
          column: column,
          id: sourcePlant.id,
          name: sourcePlant.name,
          image: sourcePlant.image,
          plantationDate: sourcePlant.plantationDate,
        })
      }
      // Remplacement de la plante
      else {
        const index = getIndexPlantAtPosition(row, column)
        destinationPlant.id = sourcePlant.id
        destinationPlant.name = sourcePlant.name
        destinationPlant.image = sourcePlant.image
        destinationPlant.plantationDate = sourcePlant.plantationDate

        gardenForm.plantPositions.splice(index, 1, destinationPlant)
      }
    }
  }

  // Ajout d'une nouvelle plante dans la jardin
  function addPlant(row: number, column: number) {
    if (plotForm.plantId) {
      gardenForm.plantPositions.push({
        row: row,
        column: column,
        id: plotForm.plantId,
        name: plotForm.plantName,
        image: plotForm.plantImage,
        plantationDate: plotForm.plantationDate,
      })

      plotForm.plantId = 0
      plotForm.plantName = ''
      plotForm.plantImage = ''
      plotForm.plantationDate = ''
    }
  }
</script>
