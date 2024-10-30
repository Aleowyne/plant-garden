<template>
  <Layout>
    <div class="plant-box box">
      <div class="form-title">
        <h3>Modifier une plante</h3>
      </div>
      <form @submit.prevent="form.put(`/plants/${props.plant.id}`)">
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
        <Button>Modifier</Button>
      </form>
    </div>
  </Layout>
</template>

<script setup lang="ts">
  import { useForm } from '@inertiajs/vue3'
  import { InferPageProps } from '@adonisjs/inertia/types'
  import { CheckboxForm, PlantForm } from '@/types'
  import Layout from '@/layouts/AppLayout.vue'
  import FormInput from '@/components/FormInput.vue'
  import FormSelect from '@/components/FormSelect.vue'
  import FormTextarea from '@/components/FormTextarea.vue'
  import CheckboxMonth from '@/components/CheckboxMonth.vue'
  import { Button } from '@/components/ui/button'
  import type PlantsController from '#controllers/plants_controller'

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
