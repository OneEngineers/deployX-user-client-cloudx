<template>
  <div
    class="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4"
  >
    <div class="w-full max-w-md">
      <!-- Logo/Brand Section -->
      <div class="text-center mb-8">
        <div
          class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-4 shadow-lg"
        >
          <Icon icon="mdi:lock-outline" class="text-white text-3xl" />
        </div>
        <h1 class="text-3xl font-bold text-gray-900">Welcome Back</h1>
        <p class="text-gray-600 mt-2">Sign in to continue to your account</p>
      </div>

      <!-- Sign In Card -->
      <div class="bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
        <form @submit.prevent="onLogin" class="space-y-5">
          <!-- Email Field -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon icon="mdi:email-outline" class="text-gray-400 text-xl" />
              </div>
              <input
                id="email"
                v-model="email"
                type="email"
                placeholder="you@example.com"
                required
                class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                :class="{ 'border-red-500 focus:ring-red-500': emailError }"
                @blur="validateEmail"
              />
            </div>
            <p v-if="emailError" class="mt-1 text-sm text-red-600">{{ emailError }}</p>
          </div>

          <!-- Password Field -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon icon="mdi:lock-outline" class="text-gray-400 text-xl" />
              </div>
              <input
                id="password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="••••••••"
                required
                class="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                :class="{ 'border-red-500 focus:ring-red-500': passwordError }"
                @blur="validatePassword"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Icon
                  :icon="showPassword ? 'mdi:eye-off-outline' : 'mdi:eye-outline'"
                  class="text-xl"
                />
              </button>
            </div>
            <p v-if="passwordError" class="mt-1 text-sm text-red-600">{{ passwordError }}</p>
          </div>

          <!-- Remember Me & Forgot Password -->
          <div class="flex items-center justify-between">
            <label class="flex items-center">
              <input
                v-model="rememberMe"
                type="checkbox"
                class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span class="ml-2 text-sm text-gray-700">Remember me</span>
            </label>
            <a
              href="#"
              class="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              Forgot password?
            </a>
          </div>

          <!-- Error Message -->
          <div
            v-if="loginError"
            class="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3"
          >
            <Icon icon="mdi:alert-circle" class="text-red-600 text-xl flex-shrink-0 mt-0.5" />
            <div class="flex-1">
              <p class="text-sm text-red-800 font-medium">{{ loginError }}</p>
            </div>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="loading || !isFormValid"
            class="w-full py-3 px-4 from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-lg flex items-center justify-center gap-2"
          >
            <Icon v-if="loading" icon="mdi:loading" class="text-xl animate-spin" />
            <span>{{ loading ? 'Signing in...' : 'Sign In' }}</span>
          </button>
        </form>

        <!-- Divider -->
        <div class="relative my-6">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-4 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        <!-- Social Login Buttons -->
        <div class="grid grid-cols-2 gap-3">
          <button
            type="button"
            @click="login"
            class="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Icon icon="mdi:github" class="text-xl text-gray-900" />
            <span class="text-sm font-medium text-gray-700">GitHub</span>
          </button>
          <button
            type="button"
            class="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Icon icon="mdi:google" class="text-xl text-red-600" />
            <span class="text-sm font-medium text-gray-700">Google</span>
          </button>
        </div>
      </div>

      <!-- Sign Up Link -->
      <p class="text-center text-sm text-gray-600 mt-6">
        Don't have an account?
        <a href="#" class="text-blue-600 hover:text-blue-700 font-semibold transition-colors">
          Sign up for free
        </a>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '@/store/authStore'
import { useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'

const auth = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const loading = ref(false)
const showPassword = ref(false)
const rememberMe = ref(false)
const loginError = ref('')
const emailError = ref('')
const passwordError = ref('')

const login = () => {
  const baseUrl = `${import.meta.env.VITE_BACKEND_URL}/oauth2/authorization/github`
  const redirectUri = `${import.meta.env.VITE_BACKEND_URL}/oauth2/redirect`
  window.location.href = `${baseUrl}?redirect_uri=${redirectUri}`
}

const isFormValid = computed(() => {
  return email.value && password.value && !emailError.value && !passwordError.value
})

const validateEmail = () => {
  emailError.value = ''
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email.value) {
    emailError.value = 'Email is required'
  } else if (!emailRegex.test(email.value)) {
    emailError.value = 'Please enter a valid email address'
  }
}

const validatePassword = () => {
  passwordError.value = ''
  if (!password.value) {
    passwordError.value = 'Password is required'
  } else if (password.value.length < 6) {
    passwordError.value = 'Password must be at least 6 characters'
  }
}

const onLogin = async () => {
  loginError.value = ''
  validateEmail()
  validatePassword()

  if (emailError.value || passwordError.value) return

  loading.value = true

  try {
    await auth.login({
      email: email.value,
      password: password.value,
      remember: rememberMe.value
    })

    const redirectPath = auth.user.role === 'admin' ? '/admin/dashboard' : '/developer/apps'

    await router.push(redirectPath)
  } catch (error) {
    loginError.value =
      error.response?.data?.message || 'Invalid email or password. Please try again.'
  } finally {
    loading.value = false
  }
}

</script>

<style scoped>
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
