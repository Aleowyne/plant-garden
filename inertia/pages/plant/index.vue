<template>
  <Layout>
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
  </Layout>
</template>

<script setup lang="ts">
import { InferPageProps } from '@adonisjs/inertia/types'
import { Link } from '@inertiajs/vue3'
import type PlantsController from '#controllers/plants_controller'
import Layout from '@/layouts/default.vue'

const props = defineProps<{
  plants: InferPageProps<PlantsController, 'index'>['plants']
  typeOptions: InferPageProps<PlantsController, 'show'>['typeOptions']
}>()

function getPlantType(type: string): string {
  return props.typeOptions.find((option) => option.value === type)?.label || ''
}
</script>

<style scoped>
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
