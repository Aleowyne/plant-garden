<template>
  <Layout :message="message" :isAuthenticated="false">
    <div class="auth-box">
      <div class="auth-title">
        <h3>Connexion</h3>
      </div>
      <form @submit.prevent="form.post('/login')">
        <FormInput
          class="form-group"
          label="Adresse mail"
          labelFor="email"
          type="text"
          v-model="form.email"
          :errors="form.errors.email"
        />
        <FormInput
          class="form-group"
          label="Mot de passe"
          labelFor="password"
          type="password"
          v-model="form.password"
          :errors="form.errors.password"
        />
        <button type="submit">Se connecter</button>
      </form>
    </div>
  </Layout>
</template>

<script setup lang="ts">
import { useForm } from '@inertiajs/vue3'
import type { UserForm, Message } from '@/types'
import Layout from '@/layouts/default.vue'
import FormInput from '@/components/form/input.vue'

defineProps<Message>()

const form = useForm<UserForm>({
  email: '',
  username: '',
  password: '',
  _csrf: document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
})
</script>
