<template>
  <Layout>
    <div class="plant-box">
      <div class="form-header">
        <div class="form-title">
          <h2>{{ props.plant.name }}</h2>
          <p>{{ plantType }}</p>
        </div>
        <div class="action">
          <Link :href="`/plants/${props.plant.id}/edit`">
            <img src="@/assets/edit.png" alt="Editer les informations de la plante" />
          </Link>
          <img src="@/assets/delete.png" alt="Supprimer la plante" />
        </div>
      </div>
      <div class="form-img">
        <img :src="props.plant.image" :alt="`Plante ${props.plant.name}`" />
      </div>
      <Checkbox
        label="Période pour semer en pots"
        :options="getOptionsMonth('seedPot')"
        v-model="props.periods.seedPotPeriod"
      />
      <Checkbox
        label="Période pour semer en terre"
        :options="getOptionsMonth('seedSoil')"
        v-model="props.periods.seedSoilPeriod"
      />
      <Checkbox
        label="Période pour plantation"
        :options="getOptionsMonth('plantation')"
        v-model="props.periods.plantationPeriod"
      />
      <Checkbox
        label="Période de maturité"
        :options="getOptionsMonth('mature')"
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
import Layout from '@/layouts/default.vue'
import Checkbox from '@/components/form/checkbox_month.vue'
import TextAreaGroup from '@/components/form/textarea_group.vue'
import type PlantsController from '#controllers/plants_controller'

const props = defineProps<{
  plant: InferPageProps<PlantsController, 'show'>['plant']
  periods: InferPageProps<PlantsController, 'show'>['periods']
}>()

const plantType = computed(
  () => optionsType.find((option) => option.value === props.plant.type)?.label || ''
)

const optionsType = [
  { value: '', label: '=== Choisir une option ===' },
  { value: 'flower', label: 'Fleur' },
  { value: 'vegetable', label: 'Plante potagère' },
  { value: 'aromatic', label: 'Plante aromatique' },
]

function getOptionsMonth(name: string): Array<{ name: string; value: string; label: string }> {
  return [
    { name: `${name}-january`, value: 'january', label: 'Janv.' },
    { name: `${name}-february`, value: 'february', label: 'Févr.' },
    { name: `${name}-march`, value: 'march', label: 'Mars' },
    { name: `${name}-april`, value: 'april', label: 'Avr.' },
    { name: `${name}-may`, value: 'may', label: 'Mai' },
    { name: `${name}-june`, value: 'june', label: 'Juin' },
    { name: `${name}-july`, value: 'july', label: 'Juill.' },
    { name: `${name}-august`, value: 'august', label: 'Août' },
    { name: `${name}-september`, value: 'september', label: 'Sept.' },
    { name: `${name}-october`, value: 'october', label: 'Oct.' },
    { name: `${name}-november`, value: 'november', label: 'Nov.' },
    { name: `${name}-december`, value: 'december', label: 'Déc.' },
  ]
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

  & img {
    width: 300px;
  }
}
</style>
