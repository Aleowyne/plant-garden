<template>
  <Layout>
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
          <CardDescription class="text-center">{{ props.plant.typeLabel }}</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="flex flex-col flex-1 items-center">
            <div v-if="props.plant.image" class="w-80">
              <img
                class="max-w-full mb-4"
                :src="props.plant.image"
                :alt="`Plante ${props.plant.name}`"
              />
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
          <CheckboxMonth
            v-model="form.maturePeriod"
            title="Période de maturité"
            :options="getPeriodOptions('mature')"
          />
          <FormTextarea
            v-model="form.comment"
            label="Commentaires"
            name="comment"
            :disabled="true"
          />
        </CardContent>
      </Card>
    </div>
  </Layout>
</template>

<script setup lang="ts">
  import { InferPageProps } from '@adonisjs/inertia/types'
  import { useForm, Link } from '@inertiajs/vue3'
  import { CheckboxForm, PlantForm } from '@/types'
  import Layout from '@/layouts/AppLayout.vue'
  import CheckboxMonth from '@/components/CheckboxMonth.vue'
  import FormTextarea from '@/components/form/FormTextarea.vue'
  import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
  import type PlantsController from '#controllers/plants_controller'
  import { Pencil, Trash2 } from 'lucide-vue-next'

  const props = defineProps<{
    plant: InferPageProps<PlantsController, 'show'>['plant']
    periods: InferPageProps<PlantsController, 'show'>['periods']
    typeOptions: InferPageProps<PlantsController, 'show'>['typeOptions']
    periodOptions: InferPageProps<PlantsController, 'show'>['periodOptions']
  }>()

  const form = useForm<PlantForm>({
    name: props.plant.name,
    image: props.plant.image,
    type: props.plant.type,
    seedPotPeriod: props.periods.seedPotPeriod,
    seedSoilPeriod: props.periods.seedSoilPeriod,
    plantationPeriod: props.periods.plantationPeriod,
    maturePeriod: props.periods.maturePeriod,
    comment: props.plant.comment,
  })

  function getPeriodOptions(name: string): CheckboxForm[] {
    const periodOptions = props.periodOptions.find((option) => option.type === name)?.periods ?? []

    return periodOptions.map((periodOption) => {
      let checkboxForm: CheckboxForm = periodOption
      checkboxForm.disabled = true
      return checkboxForm
    })
  }
</script>
