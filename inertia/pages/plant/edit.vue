<template>
  <Layout>
    <form
      class="flex flex-col flex-1 items-center mt-16"
      @submit.prevent="form.put(`/plants/${props.plant.id}`)"
    >
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center justify-between">
            <div class="absolute left-1/2 transform -translate-x-1/2">Modifier une plante</div>
            <div class="ml-auto">
              <Link :href="`/plants/${props.plant.id}`" as="button">
                <Eye class="size-6 mx-1 text-primary" />
              </Link>
            </div>
          </CardTitle>
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
          <FormSelect
            v-model="form.type"
            name="type"
            label="Type de plante"
            :options="props.typeOptions"
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
          <CheckboxMonth
            v-model="form.maturePeriod"
            title="Période de maturité"
            :options="getPeriodOptions('mature')"
          />
          <FormTextarea
            v-model="form.comment"
            label="Commentaires"
            name="comment"
            :error="form.errors.comment"
          />
        </CardContent>
        <CardFooter class="flex justify-center">
          <Button>Modifier la plante</Button>
        </CardFooter>
      </Card>
    </form>
  </Layout>
</template>

<script setup lang="ts">
  import { useForm, Link } from '@inertiajs/vue3'
  import { InferPageProps } from '@adonisjs/inertia/types'
  import { CheckboxForm, PlantForm } from '@/types'
  import Layout from '@/layouts/AppLayout.vue'
  import FormInput from '@/components/FormInput.vue'
  import FormSelect from '@/components/FormSelect.vue'
  import FormTextarea from '@/components/FormTextarea.vue'
  import CheckboxMonth from '@/components/CheckboxMonth.vue'
  import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
  import { Button } from '@/components/ui/button'
  import type PlantsController from '#controllers/plants_controller'
  import { Eye } from 'lucide-vue-next'

  const props = defineProps<{
    plant: InferPageProps<PlantsController, 'edit'>['plant']
    periods: InferPageProps<PlantsController, 'edit'>['periods']
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

  function getPeriodOptions(name: string): Array<CheckboxForm> {
    return props.periodOptions.find((option) => option.type === name)?.periods ?? []
  }
</script>
