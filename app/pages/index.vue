<script lang="ts" setup>
definePageMeta({
  layout: "guest",
  middleware: ["sanctum:guest"],
});

import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";

const { login } = useSanctumAuth();

const form = ref({
  email: "",
  password: "",
});

const handleSubmit = async () => {
  await login(form.value);
};
</script>

<script setup lang="ts"></script>

<template>
  <div class="w-full lg:grid lg:grid-cols-2 min-h-screen">
    <div class="flex items-center justify-center py-12">
      <div class="mx-auto grid w-[350px] gap-6">
        <div class="grid gap-2 text-center">
          <h1 class="text-3xl font-bold">Login</h1>
          <p class="text-balance text-muted-foreground">
            Enter your email below to login to your account
          </p>
        </div>
        <div class="grid gap-4">
          <div class="grid gap-2">
            <Label for="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              v-model="form.email"
              required
            />
          </div>
          <div class="grid gap-2">
            <div class="flex items-center">
              <Label for="password">Password</Label>
              <a
                href="/forgot-password"
                class="ml-auto inline-block text-sm underline"
              >
                Forgot your password?
              </a>
            </div>
            <Input
              v-model="form.password"
              id="password"
              type="password"
              required
            />
          </div>
          <Button
            class="w-full cursor-pointer"
            variant="default"
            @click="handleSubmit"
          >
            Login
          </Button>
        </div>
      </div>
    </div>
    <div class="hidden bg-muted lg:block">
      <img
        src="https://plus.unsplash.com/premium_photo-1716832318033-30fe0671866b?q=80&w=2922&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Image"
        width="1920"
        height="1080"
        class="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
      />
    </div>
  </div>
</template>
