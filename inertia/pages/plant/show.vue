<template>
  <Head>
    <title>Affichage d'une plante</title>
  </Head>
  <div class="flex flex-col flex-1 items-center mt-16">
    <Card>
      <CardHeader>
        <CardTitle class="flex items-center justify-between">
          <div class="absolute left-1/2 transform -translate-x-1/2">{{ props.plant.name }}</div>
          <div class="ml-auto">
            <Link :href="`/plants/${props.plant.id}/edit`" as="button">
              <Pencil class="size-6 mx-1 text-primary" />
            </Link>
            <Link :href="`/plants/${props.plant.id}`" method="delete" as="button">
              <Trash2 class="size-6 mx-1 text-destructive" />
            </Link>
          </div>
        </CardTitle>
        <CardDescription class="text-center">{{ plant.typeLabel }}</CardDescription>
      </CardHeader>
      <CardContent>
        <div class="flex flex-col flex-1 items-center">
          <div v-if="props.plant.image" class="w-80">
            <img class="max-w-full mb-4" :src="props.plant.image" :alt="`Plante ${props.plant.name}`" />
          </div>
        </div>
        <CheckboxMonth
          v-model="form.seedPotPeriod"
          title="Période pour semer en pots"
          :options="getPeriodOptions('seedPot')"
        />
        <CheckboxMonth
          v-model="form.seedSoilPeriod"
          title="Période pour semer en terre"
          :options="getPeriodOptions('seedSoil')"
        />
        <CheckboxMonth
          v-model="form.plantationPeriod"
          title="Période pour plantation"
          :options="getPeriodOptions('plantation')"
        />
        <CheckboxMonth v-model="form.maturePeriod" title="Période de maturité" :options="getPeriodOptions('mature')" />
        <FormTextarea v-model="form.comment" label="Commentaires" name="comment" :disabled="true" />
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
  import { useForm, Head, Link } from '@inertiajs/vue3'
  import { CheckboxForm, PlantForm } from '@/types'
  import CheckboxMonth from '@/components/CheckboxMonth.vue'
  import FormTextarea from '@/components/form/FormTextarea.vue'
  import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
  import { Pencil, Trash2 } from 'lucide-vue-next'
  import PlantService from '#services/plant_service'
  import { PlantsPresenterSerialized } from '#presenters/plants_presenter'

  const props = defineProps<{
    plant: PlantsPresenterSerialized
  }>()

  const form = useForm<PlantForm>({
    name: props.plant.name,
    image: props.plant.image,
    type: props.plant.type,
    seedPotPeriod: props.plant.periods.seedPotPeriod,
    seedSoilPeriod: props.plant.periods.seedSoilPeriod,
    plantationPeriod: props.plant.periods.plantationPeriod,
    maturePeriod: props.plant.periods.maturePeriod,
    comment: props.plant.comment,
  })

  function getPeriodOptions(name: string): CheckboxForm[] {
    return PlantService.getPeriodOptions(name).map((periodOption) => {
      let checkboxForm: CheckboxForm = periodOption
      checkboxForm.disabled = true
      return checkboxForm
    })
  }
</script>
