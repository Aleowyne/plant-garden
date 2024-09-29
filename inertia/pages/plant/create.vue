<template>
  <Layout>
    <div class="plant-box box">
      <div class="form-title">
        <h3>Ajouter une plante</h3>
      </div>
      <form @submit.prevent="form.post('/plants')">
        <InputGroup
          v-model="form.name"
          type="text"
          name="name"
          label="Nom"
          :error="form.errors.name"
        />
        <InputGroup
          v-model="form.image"
          type="url"
          name="image"
          label="Image"
          :error="form.errors.image"
        />
        <SelectGroup
          v-model="form.type"
          name="type"
          label="Type de plante"
          :options="props.typeOptions"
          :error="form.errors.type"
        />
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
        <TextAreaGroup
          v-model="form.comment"
          label="Commentaires"
          name="comment"
          :error="form.errors.comment"
        />
        <Button label="Ajouter" />
      </form>
    </div>
  </Layout>
</template>

<script setup lang="ts">
  import { useForm } from '@inertiajs/vue3'
  import { InferPageProps } from '@adonisjs/inertia/types'
  import { PlantForm } from '@/types'
  import { CheckboxForm } from '@/components/form/checkbox_group.vue'
  import type PlantsController from '#controllers/plants_controller'
  import Layout from '@/layouts/default.vue'
  import InputGroup from '@/components/form/input_group.vue'
  import SelectGroup from '@/components/form/select_group.vue'
  import Checkbox from '@/components/form/checkbox_month.vue'
  import TextAreaGroup from '@/components/form/textarea_group.vue'
  import Button from '@/components/form/button.vue'

  const props = defineProps<{
    typeOptions: InferPageProps<PlantsController, 'create'>['typeOptions']
    periodOptions: InferPageProps<PlantsController, 'create'>['periodOptions']
  }>()

  const form = useForm<PlantForm>({
    name: '',
    image: '',
    type: '',
    seedPotPeriod: [],
    seedSoilPeriod: [],
    plantationPeriod: [],
    maturePeriod: [],
    comment: '',
  })

  function getPeriodOptions(name: string): Array<CheckboxForm> {
    return props.periodOptions.find((option) => option.type === name)?.periods ?? []
  }
</script>
