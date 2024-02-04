<template>
  <div class="alert" v-if="isVisibleMsg">
    {{ props.message }}
  </div>
</template>

<script setup lang="ts">
import type { ErrorMessage } from '@/types'
import { ref, watch } from 'vue'

const props = defineProps<ErrorMessage>()
const isVisibleMsg = ref(false)

watch(() => props.message, (newValue) => {
  if (newValue) {
    isVisibleMsg.value = true

    setTimeout(() => {
      isVisibleMsg.value = false
    }, 3000)
  }
  else {
    isVisibleMsg.value = false
  }
})
</script>

<style scoped>
.alert {
  position: fixed;
  z-index: 1;
  width: 100%;
  padding: 15px 0px;
  text-align: center;
  opacity: 0.85;
  background-color: #842029;
  color: #FFFFFF;
}
</style>