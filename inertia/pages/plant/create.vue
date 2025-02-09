<template>
  <Head>
    <title>Création d'une plante</title>
  </Head>
  <form
    class="flex flex-col flex-1 items-center mt-16"
    @submit.prevent="form.post('/plants', { onSuccess: () => form.reset() })"
  >
    <Card>
      <CardHeader>
        <CardTitle class="text-center">Ajouter une plante</CardTitle>
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
          :options="PlantService.getPeriodOptions('seedPot')"
        />
        <CheckboxMonth
          v-model="form.seedSoilPeriod"
          title="Période pour semer en terre"
          :options="PlantService.getPeriodOptions('seedSoil')"
        />
        <CheckboxMonth
          v-model="form.plantationPeriod"
          title="Période pour plantation"
          :options="PlantService.getPeriodOptions('plantation')"
        />
        <CheckboxMonth
          v-model="form.maturePeriod"
          title="Période de maturité"
          :options="PlantService.getPeriodOptions('mature')"
        />
        <FormTextarea v-model="form.comment" label="Commentaires" name="comment" :error="form.errors.comment" />
      </CardContent>
      <CardFooter class="flex justify-center">
        <Button>Créer la plante</Button>
      </CardFooter>
    </Card>
  </form>
</template>

<script setup lang="ts">
  import { useForm, Head } from '@inertiajs/vue3'
  import { PlantForm } from '@/types'
  import FormInput from '@/components/form/FormInput.vue'
  import FormSelect from '@/components/form/FormSelect.vue'
  import FormTextarea from '@/components/form/FormTextarea.vue'
  import CheckboxMonth from '@/components/CheckboxMonth.vue'
  import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
  import { Button } from '@/components/ui/button'
  import PlantService from '#services/plant_service'

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
</script>
