<template>
  <Layout>
    <div class="plant-box box">
      <div class="form-header">
        <div class="form-title">
          <h2>{{ props.plant.name }}</h2>
          <p>{{ props.plant.typeLabel }}</p>
        </div>
        <div class="action">
          <Link :href="`/plants/${props.plant.id}/edit`" as="button" class="button-action">
            <img src="@/assets/edit.png" alt="Editer les informations de la plante" />
          </Link>
          <Link
            :href="`/plants/${props.plant.id}`"
            method="delete"
            as="button"
            class="button-action"
          >
            <img src="@/assets/delete.png" alt="Supprimer la plante" />
          </Link>
        </div>
      </div>
      <div v-if="props.plant.image" class="form-img">
        <img :src="props.plant.image" :alt="`Plante ${props.plant.name}`" />
      </div>
      <Checkbox
        v-model="form.seedPotPeriod"
        title="Période pour semer en pots"
        :options="getPeriodOptions('seedPot')"
      />
      <Checkbox
        v-model="form.seedSoilPeriod"
        title="Période pour semer en terre"
        :options="getPeriodOptions('seedSoil')"
      />
      <Checkbox
        v-model="form.plantationPeriod"
        title="Période pour plantation"
        :options="getPeriodOptions('plantation')"
      />
      <Checkbox
        v-model="form.maturePeriod"
        title="Période de maturité"
        :options="getPeriodOptions('mature')"
      />
      <TextAreaGroup v-model="form.comment" label="Commentaires" name="comment" :disabled="true" />
    </div>
  </Layout>
</template>

<script setup lang="ts">
  import { InferPageProps } from '@adonisjs/inertia/types'
  import { useForm, Link } from '@inertiajs/vue3'
  import { PlantForm } from '@/types'
  import { CheckboxForm } from '@/components/form/checkbox_group.vue'
  import type PlantsController from '#controllers/plants_controller'
  import Layout from '@/layouts/default.vue'
  import Checkbox from '@/components/form/checkbox_month.vue'
  import TextAreaGroup from '@/components/form/textarea_group.vue'

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

  function getPeriodOptions(name: string): Array<CheckboxForm> {
    const periodOptions = props.periodOptions.find((option) => option.type === name)?.periods ?? []

    return periodOptions.map((periodOption) => {
      let checkboxForm: CheckboxForm = periodOption
      checkboxForm.disabled = true
      return checkboxForm
    })
  }
</script>

<style scoped>
  .form-header {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-areas: 'a a b c d';
  }

  .form-title {
    grid-area: b;
  }

  .action {
    grid-area: d;
    justify-self: end;

    & img {
      width: 24px;
      height: 24px;
      margin: 0px 5px;
    }
  }

  .form-img {
    display: flex;
    justify-content: center;
    text-align: center;

    & img {
      width: 300px;
    }
  }

  .button-action {
    cursor: pointer;
    border: none;
    background-color: transparent;
  }
</style>
