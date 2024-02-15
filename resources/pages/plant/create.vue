<template>
  <Layout :isAuthenticated="true">
    <div class="plant-box">
      <div class="plant-title">
        <h3>Ajouter une plante</h3>
      </div>
      <form @submit.prevent="form.post('/plants')">
        <FormInput
          class="form-group"
          label="Nom"
          labelFor="name"
          type="text"
          v-model="form.name"
          :errors="form.errors.name"
        />
        <FormInput
          class="form-group"
          label="Image"
          labelFor="image"
          type="url"
          v-model="form.image"
          :errors="form.errors.image"
        />
        <FormSelect
          class="form-group"
          label="Type de plante"
          labelFor="type"
          :options="optionsType"
          v-model="form.type"
          :errors="form.errors.type"
        />
        <FormInput
          class="form-group"
          label="Profondeur pour la graine (cm)"
          labelFor="depth"
          type="text"
          v-model="form.depth"
          :errors="form.errors.depth"
        />
        <FormInput
          class="form-group"
          label="Distance entre 2 plantes (cm)"
          labelFor="distance"
          type="text"
          v-model="form.distance"
          :errors="form.errors.distance"
        />
        <FormInput
          class="form-group"
          label="Hauteur de la plante (cm)"
          labelFor="height"
          type="text"
          v-model="form.height"
          :errors="form.errors.height"
        />
        <FormSelect
          class="form-group"
          label="Luminosité"
          labelFor="brightness"
          :options="optionsBrightness"
          v-model="form.brightness"
          :errors="form.errors.brightness"
        />
        <div class="form-column">
          <FormCheckbox
            class="form-group"
            label="Période pour semer en pots"
            :options="getOptionsMonth('seedPot')"
            v-model="form.seedPotPeriod"
            :errors="form.errors.seedPotPeriod"
          />
          <FormCheckbox
            class="form-group"
            label="Période pour semer en terre"
            :options="getOptionsMonth('seedSoil')"
            v-model="form.seedSoilPeriod"
            :errors="form.errors.seedSoilPeriod"
          />
        </div>
        <div class="form-column">
          <FormCheckbox
            class="form-group"
            label="Période pour plantation"
            :options="getOptionsMonth('plantation')"
            v-model="form.plantationPeriod"
            :errors="form.errors.plantationPeriod"
          />
          <FormCheckbox
            class="form-group"
            label="Période de maturité"
            :options="getOptionsMonth('mature')"
            v-model="form.maturePeriod"
            :errors="form.errors.maturePeriod"
          />
        </div>
        <FormTextarea
          class="form-group"
          label="Commentaires"
          labelFor="comment"
          v-model="form.comment"
          :errors="form.errors.comment"
        />
        <button type="submit">Ajouter</button>
      </form>
    </div>
  </Layout>
</template>

<script setup lang="ts">
import { useForm } from '@inertiajs/vue3'
import type { PlantForm } from '@/types'
import Layout from '@/layouts/default.vue'
import FormInput from '@/components/form/input.vue'
import FormSelect from '@/components/form/select.vue'
import FormCheckbox from '@/components/form/checkbox.vue'
import FormTextarea from '@/components/form/textarea.vue'

const form = useForm<PlantForm>({
  name: '',
  image: '',
  type: '',
  depth: '',
  distance: '',
  height: '',
  brightness: '',
  seedPotPeriod: [],
  seedSoilPeriod: [],
  plantationPeriod: [],
  maturePeriod: [],
  comment: '',
  _csrf: document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
})

let optionsType = [
  { value: '', label: '=== Choisir une option ===' },
  { value: 'flower', label: 'Fleur' },
  { value: 'vegetable', label: 'Plante potagère' },
  { value: 'aromatic', label: 'Plante aromatique' },
]

let optionsBrightness = [
  { value: '', label: '=== Choisir une option ===' },
  { value: 'sun', label: 'Soleil total' },
  { value: 'partial_sun', label: 'Soleil/mi-ombre' },
  { value: 'partial_shadow', label: 'Ombre/mi-ombre' },
  { value: 'shadow', label: 'Ombre totale' },
]

function getOptionsMonth(name: string): Array<{ id: string; value: string; label: string }> {
  return [
    { id: `${name}-january`, value: 'january', label: 'Janvier' },
    { id: `${name}-february`, value: 'february', label: 'Février' },
    { id: `${name}-march`, value: 'march', label: 'Mars' },
    { id: `${name}-april`, value: 'april', label: 'Avril' },
    { id: `${name}-may`, value: 'may', label: 'Mai' },
    { id: `${name}-june`, value: 'june', label: 'Juin' },
    { id: `${name}-july`, value: 'july', label: 'Juillet' },
    { id: `${name}-august`, value: 'august', label: 'Août' },
    { id: `${name}-september`, value: 'september', label: 'Septembre' },
    { id: `${name}-october`, value: 'october', label: 'Octobre' },
    { id: `${name}-november`, value: 'november', label: 'Novembre' },
    { id: `${name}-december`, value: 'december', label: 'Décembre' },
  ]
}
</script>
