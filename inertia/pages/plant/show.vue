<template>
  <Layout>
    <div class="plant-box">
      <div class="form-header">
        <div class="form-title">
          <h2>{{ props.plant.name }}</h2>
          <p>{{ plantType }}</p>
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
        title="Période pour semer en pots"
        :options="getPeriodOptions('seedPot')"
        v-model="props.periods.seedPotPeriod"
      />
      <Checkbox
        title="Période pour semer en terre"
        :options="getPeriodOptions('seedSoil')"
        v-model="props.periods.seedSoilPeriod"
      />
      <Checkbox
        title="Période pour plantation"
        :options="getPeriodOptions('plantation')"
        v-model="props.periods.plantationPeriod"
      />
      <Checkbox
        title="Période de maturité"
        :options="getPeriodOptions('mature')"
        v-model="props.periods.maturePeriod"
      />
      <TextAreaGroup
        label="Commentaires"
        name="comment"
        v-model="props.plant.comment"
        :isDisabled="true"
      />
    </div>
  </Layout>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { InferPageProps } from '@adonisjs/inertia/types'
import { Link } from '@inertiajs/vue3'
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

const plantType = computed(
  () => props.typeOptions.find((option) => option.value === props.plant.type)?.label || ''
)

function getPeriodOptions(name: string): Array<CheckboxForm> {
  const periodOptions = props.periodOptions.find((option) => option.type === name)?.periods || []

  return periodOptions.map((periodOption) => {
    let checkboxForm: CheckboxForm = periodOption
    checkboxForm.isDisabled = true
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
