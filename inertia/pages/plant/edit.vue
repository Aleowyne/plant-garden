<template>
  <Layout>
    <div class="plant-box">
      <div class="form-title">
        <h3>Modifier une plante</h3>
      </div>
      <form @submit.prevent="form.put(`/plants/${props.plant.id}`)">
        <InputGroup
          type="text"
          name="name"
          label="Nom"
          v-model="form.name"
          :errors="form.errors.name"
        />
        <InputGroup
          type="url"
          name="image"
          label="Image"
          v-model="form.image"
          :errors="form.errors.image"
        />
        <SelectGroup
          name="type"
          label="Type de plante"
          :options="optionsType"
          v-model="form.type"
          :errors="form.errors.type"
        />
        <div class="form-column">
          <Checkbox
            label="Période pour semer en pots"
            :options="getOptionsMonth('seedPot')"
            v-model="form.seedPotPeriod"
            :errors="form.errors.seedPotPeriod"
          />
          <Checkbox
            label="Période pour semer en terre"
            :options="getOptionsMonth('seedSoil')"
            v-model="form.seedSoilPeriod"
            :errors="form.errors.seedSoilPeriod"
          />
        </div>
        <div class="form-column">
          <Checkbox
            label="Période pour plantation"
            :options="getOptionsMonth('plantation')"
            v-model="form.plantationPeriod"
            :errors="form.errors.plantationPeriod"
          />
          <Checkbox
            label="Période de maturité"
            :options="getOptionsMonth('mature')"
            v-model="form.maturePeriod"
            :errors="form.errors.maturePeriod"
          />
        </div>
        <TextAreaGroup
          label="Commentaires"
          name="comment"
          v-model="form.comment"
          :errors="form.errors.comment"
        />
        <Button label="Modifier" />
      </form>
    </div>
  </Layout>
</template>

<script setup lang="ts">
import { useForm } from '@inertiajs/vue3'
import { InferPageProps } from '@adonisjs/inertia/types'
import type { PlantForm } from '@/types'
import Layout from '@/layouts/default.vue'
import InputGroup from '@/components/form/input_group.vue'
import SelectGroup from '@/components/form/select_group.vue'
import Checkbox from '@/components/form/checkbox.vue'
import TextAreaGroup from '@/components/form/textarea_group.vue'
import Button from '@/components/form/button.vue'
import type PlantsController from '#controllers/plants_controller'

const props = defineProps<{
  plant: InferPageProps<PlantsController, 'edit'>['plant']
  periods: InferPageProps<PlantsController, 'edit'>['periods']
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

let optionsType = [
  { value: '', label: '=== Choisir une option ===' },
  { value: 'flower', label: 'Fleur' },
  { value: 'vegetable', label: 'Plante potagère' },
  { value: 'aromatic', label: 'Plante aromatique' },
]

function getOptionsMonth(name: string): Array<{ name: string; value: string; label: string }> {
  return [
    { name: `${name}-january`, value: 'january', label: 'Janvier' },
    { name: `${name}-february`, value: 'february', label: 'Février' },
    { name: `${name}-march`, value: 'march', label: 'Mars' },
    { name: `${name}-april`, value: 'april', label: 'Avril' },
    { name: `${name}-may`, value: 'may', label: 'Mai' },
    { name: `${name}-june`, value: 'june', label: 'Juin' },
    { name: `${name}-july`, value: 'july', label: 'Juillet' },
    { name: `${name}-august`, value: 'august', label: 'Août' },
    { name: `${name}-september`, value: 'september', label: 'Septembre' },
    { name: `${name}-october`, value: 'october', label: 'Octobre' },
    { name: `${name}-november`, value: 'november', label: 'Novembre' },
    { name: `${name}-december`, value: 'december', label: 'Décembre' },
  ]
}
</script>
