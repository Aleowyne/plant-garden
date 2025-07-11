<template>
  <Head>
    <title>{{ props.plant.id ? 'Mise à jour' : 'Ajout' }} d'une plante</title>
  </Head>
  <form
    class="flex flex-col flex-1 items-center mt-16"
    @submit.prevent="
      props.plant.id ? form.put(`/plants/${props.plant.id}`) : form.post('/plants', { onSuccess: () => form.reset() })
    "
  >
    <Card>
      <CardHeader>
        <CardTitle class="flex items-center justify-between">
          <div class="absolute left-1/2 transform -translate-x-1/2">
            {{ props.plant.id ? 'Modifier' : 'Ajouter' }} une plante
          </div>
          <div v-if="props.plant.id" class="ml-auto">
            <Link :href="`/plants/${props.plant.id}`" as="button">
              <Eye class="size-6 mx-1 text-primary" />
            </Link>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <FormInput v-model="form.name" type="text" name="name" label="Nom" :error="form.errors.name" />
        <FormInput v-model="form.image" type="url" name="image" label="Image" :error="form.errors.image" />
        <FormSelect
          v-model="form.type"
          name="type"
          label="Type de plante"
          :options="PlantService.types"
          :error="form.errors.type"
        />
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
        <FormTextarea v-model="form.comment" label="Commentaires" name="comment" :error="form.errors.comment" />
      </CardContent>
      <CardFooter class="flex justify-center">
        <Button>{{ props.plant.id ? 'Modifier' : 'Ajouter' }} la plante</Button>
      </CardFooter>
    </Card>
  </form>
</template>

<script setup lang="ts">
  import { useForm, Head, Link } from '@inertiajs/vue3'
  import { CheckboxForm, PlantForm } from '@/types'
  import FormInput from '@/components/form/FormInput.vue'
  import FormSelect from '@/components/form/FormSelect.vue'
  import FormTextarea from '@/components/form/FormTextarea.vue'
  import CheckboxMonth from '@/components/CheckboxMonth.vue'
  import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
  import { Button } from '@/components/ui/button'
  import { Eye } from 'lucide-vue-next'
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
      checkboxForm.disabled = false
      return checkboxForm
    })
  }
</script>
