<template>
  <Layout>
    <form
      class="flex flex-col flex-1 justify-center items-center"
      @submit.prevent="form.post('/login')"
    >
      <Card class="w-96">
        <CardHeader>
          <CardTitle>Connexion</CardTitle>
        </CardHeader>
        <CardContent>
          <InputGroup
            v-model="form.email"
            type="email"
            name="email"
            label="Adresse mail"
            :error="form.errors.email"
          />
          <InputGroup
            v-model="form.password"
            type="password"
            name="password"
            label="Mot de passe"
            :error="form.errors.password"
          />
        </CardContent>
        <CardFooter>
          <Button class="w-full">Se connecter</Button>
        </CardFooter>
      </Card>
    </form>
  </Layout>
</template>

<script setup lang="ts">
  import { useForm } from '@inertiajs/vue3'
  import type { UserForm } from '@/types'
  import Layout from '@/layouts/default.vue'
  import InputGroup from '@/components/form/input_group.vue'

  const form = useForm<UserForm>({
    email: '',
    username: '',
    password: '',
  })
</script>
