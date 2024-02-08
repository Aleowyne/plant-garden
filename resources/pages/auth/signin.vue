<template>
  <Layout :message="props.message">
    <div class="signin-box">
      <div class="signin-title">
        <h3>Inscription</h3>
      </div>
      <form @submit.prevent="form.post('/signin')">
        <div class="form-group">
          <label for="email">Adresse mail</label>
          <input type="text" id="email" v-model="form.email" />
          <div class="form-error">
            <p v-if="form.errors.email">{{ form.errors.email[0] }}</p>
          </div>
        </div>
        <div class="form-group">
          <label for="username">Nom d'utilisateur</label>
          <input type="text" id="username" v-model="form.username" />
          <div class="form-error">
            <p v-if="form.errors.username">{{ form.errors.username[0] }}</p>
          </div>
        </div>
        <div class="form-group">
          <label for="password">Mot de passe</label>
          <input type="password" id="password" v-model="form.password" />
          <div class="form-error">
            <p v-if="form.errors.password">{{ form.errors.password[0] }}</p>
          </div>
        </div>
        <button type="submit" class="signin-button">S'inscrire</button>
      </form>
    </div>
  </Layout>
</template>

<script setup lang="ts">
import { useForm } from '@inertiajs/vue3'
import type { UserForm, Message } from '@/types'
import Layout from '@/layouts/auth.vue'

const props = defineProps<Message>()

const form = useForm<UserForm>({
  email: '',
  username: '',
  password: '',
  _csrf: document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
})
</script>

<style scoped>
.signin-box {
  width: 400px;
  padding: 40px;
  background-color: #ffffff;
}

.signin-title {
  margin-bottom: 30px;
  text-align: center;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 5px;
}

input {
  padding: 10px;
  border: none;
  border-radius: 4px;
  background: #efefef;
}

.signin-button {
  height: 54px;
  width: 100%;
  padding-left: 30px;
  padding-right: 30px;
  line-height: 1.5;
  font-size: 1rem;
  color: #ffffff;
  background-color: #fb771a;
  border-color: #fb771a;
  border-style: none;
  border-radius: 4px;
}

.signin-button:not(:disabled) {
  cursor: pointer;
}
</style>
