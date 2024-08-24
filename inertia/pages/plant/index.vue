<template>
  <Layout>
    <div class="plant-index">
      <div class="plant-search">
        <form @submit.prevent="form.get('/plants', { preserveState: true })">
          <InputGroup
            type="text"
            name="name"
            label="Nom de plante"
            v-model="form.name"
            :errors="form.errors.name"
          />
          <SelectGroup
            name="type"
            label="Type de plante"
            :options="props.typeOptions"
            v-model="form.type"
            :errors="form.errors.type"
          />
          <Button label="Rechercher" />
        </form>
      </div>
      <div class="plant-list">
        <div v-for="plant in props.plants">
          <Link :href="`/plants/${plant.id}`" class="plant-card">
            <h2>{{ plant.name }}</h2>
            <p>{{ getPlantType(plant.type) }}</p>
            <div v-if="plant.image" class="plant-img">
              <img :src="plant.image" :alt="`Plante ${plant.name}`" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script setup lang="ts">
import { useForm, Link } from '@inertiajs/vue3'
import { InferPageProps } from '@adonisjs/inertia/types'
import type PlantsController from '#controllers/plants_controller'
import Layout from '@/layouts/default.vue'
import InputGroup from '@/components/form/input_group.vue'
import SelectGroup from '@/components/form/select_group.vue'
import Button from '@/components/form/button.vue'

const props = defineProps<{
  plants: InferPageProps<PlantsController, 'index'>['plants']
  typeOptions: InferPageProps<PlantsController, 'show'>['typeOptions']
}>()

function getPlantType(type: string): string {
  return props.typeOptions.find((option) => option.value === type)?.label || ''
}

const form = useForm<{ name: string; type: string }>({
  name: '',
  type: '',
})
</script>

<style scoped>
.plant-index {
  display: grid;
  grid-template-columns: 400px 1fr;
}

.plant-search {
  height: 250px;
  margin: 0 25px;
  padding: 25px;
  background-color: #ffffff;
}

.plant-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  justify-items: center;
  gap: 50px 50px;
  margin: 0px 50px;
}

.plant-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
  height: 200px;
  padding: 15px;
  color: #000000;
  text-decoration: none;
  border-radius: 10px;
  background: #ffffff;
}

.plant-img img {
  width: 100%;
}
</style>
