<template>
  <Dialog @update:open="getAllPlants()">
    <DialogTrigger><BadgePlus class="size-24 mx-1 text-secondary" /></DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle class="mb-8">Ajouter une plante au jardin</DialogTitle>
        <DialogDescription>
          <form id="search" @submit.prevent="$emit('add', selectedPlant)">
            <Popover v-model:open="openPopover">
              <PopoverTrigger as-child>
                <Button
                  variant="outline"
                  role="combobox"
                  :aria-expanded="openPopover"
                  class="w-full justify-between"
                >
                  {{
                    selectedPlant.id
                      ? props.plants.find((plant) => plant.id === selectedPlant.id)?.name
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
                            selectedPlant = plant
                            openPopover = false
                          }
                        "
                      >
                        <Check
                          :class="
                            cn(
                              'h-4 w-4',
                              selectedPlant.id === plant.id ? 'opacity-100' : 'opacity-0'
                            )
                          "
                        />
                        {{ plant.name }}
                      </CommandItem>
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </form>
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <DialogClose as-child>
          <Button type="submit" form="search">Valider</Button>
        </DialogClose>
        <DialogClose as-child>
          <Button>Annuler</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
  import { router } from '@inertiajs/vue3'
  import { ref } from 'vue'
  import { InferPageProps } from '@adonisjs/inertia/types'
  import { cn } from '@/lib/utils'
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
  import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
  } from '@/components/ui/command'
  import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
  import { Button } from '@/components/ui/button'
  import { BadgePlus, Check, ChevronsUpDown } from 'lucide-vue-next'
  import GardensController from '#controllers/gardens_controller'

  type Plant = InferPageProps<GardensController, 'create'>['plants'][0]
  defineEmits(['add'])

  const props = defineProps<{
    plants: Plant[]
  }>()

  const selectedPlant = ref<Plant>({
    id: 0,
    name: '',
    image: '',
    type: '',
    typeLabel: '',
    comment: '',
  })

  const openPopover = ref(false)

  function getAllPlants() {
    router.visit('/gardens/create', {
      preserveState: true,
    })
  }
</script>
