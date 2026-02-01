<template>
  <div
    class="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-50 via-white to-blue-50 px-4"
  >
    <div class="w-full max-w-md">
      <!-- Logo/Brand Section -->
      <div class="text-center mb-8">
        <div
          class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl mb-4 shadow-lg"
        >
          <Icon icon="mdi:account-plus-outline" class="text-white text-3xl" />
        </div>
        <h1 class="text-3xl font-bold text-gray-900">Create Account</h1>
        <p class="text-gray-600 mt-2">Join us today and get started</p>
      </div>

      <!-- Register Card -->
      <div class="bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
        <form @submit.prevent="handleRegister" class="space-y-5">
          <!-- Full Name Field -->
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon icon="mdi:account-outline" class="text-gray-400 text-xl" />
              </div>
              <input
                id="name"
                v-model="name"
                type="text"
                placeholder="John Doe"
                required
                class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none"
                :class="{ 'border-red-500 focus:ring-red-500': nameError }"
                @blur="validateName"
              />
            </div>
            <p v-if="nameError" class="mt-1 text-sm text-red-600">{{ nameError }}</p>
          </div>

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
                class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none"
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
                class="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none"
                :class="{ 'border-red-500 focus:ring-red-500': passwordError }"
                @input="validatePassword"
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

            <!-- Password Strength Indicator -->
            <div v-if="password" class="mt-2">
              <div class="flex gap-1 mb-1">
                <div
                  v-for="i in 4"
                  :key="i"
                  class="h-1 flex-1 rounded-full transition-all"
                  :class="
                    i <= passwordStrength ? getStrengthColor(passwordStrength) : 'bg-gray-200'
                  "
                ></div>
              </div>
              <p class="text-xs" :class="getStrengthTextColor(passwordStrength)">
                {{ getStrengthText(passwordStrength) }}
              </p>
            </div>

            <p v-if="passwordError" class="mt-1 text-sm text-red-600">{{ passwordError }}</p>

            <!-- Password Requirements -->
            <ul class="mt-2 space-y-1 text-xs text-gray-600">
              <li
                class="flex items-center gap-1"
                :class="{ 'text-green-600': password.length >= 8 }"
              >
                <Icon
                  :icon="password.length >= 8 ? 'mdi:check-circle' : 'mdi:circle-outline'"
                  class="text-sm"
                />
                At least 8 characters
              </li>
              <li
                class="flex items-center gap-1"
                :class="{ 'text-green-600': /[A-Z]/.test(password) }"
              >
                <Icon
                  :icon="/[A-Z]/.test(password) ? 'mdi:check-circle' : 'mdi:circle-outline'"
                  class="text-sm"
                />
                One uppercase letter
              </li>
              <li
                class="flex items-center gap-1"
                :class="{ 'text-green-600': /[0-9]/.test(password) }"
              >
                <Icon
                  :icon="/[0-9]/.test(password) ? 'mdi:check-circle' : 'mdi:circle-outline'"
                  class="text-sm"
                />
                One number
              </li>
            </ul>
          </div>

          <!-- Confirm Password Field -->
          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon icon="mdi:lock-check-outline" class="text-gray-400 text-xl" />
              </div>
              <input
                id="confirmPassword"
                v-model="confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                placeholder="••••••••"
                required
                class="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none"
                :class="{
                  'border-red-500 focus:ring-red-500': confirmPasswordError,
                  'border-green-500 focus:ring-green-500':
                    confirmPassword && !confirmPasswordError && password === confirmPassword
                }"
                @blur="validateConfirmPassword"
              />
              <button
                type="button"
                @click="showConfirmPassword = !showConfirmPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Icon
                  :icon="showConfirmPassword ? 'mdi:eye-off-outline' : 'mdi:eye-outline'"
                  class="text-xl"
                />
              </button>
            </div>
            <p v-if="confirmPasswordError" class="mt-1 text-sm text-red-600">
              {{ confirmPasswordError }}
            </p>
            <p
              v-else-if="confirmPassword && password === confirmPassword"
              class="mt-1 text-sm text-green-600 flex items-center gap-1"
            >
              <Icon icon="mdi:check-circle" class="text-sm" />
              Passwords match
            </p>
          </div>

          <!-- Terms and Conditions -->
          <div class="flex items-start">
            <input
              id="terms"
              v-model="acceptTerms"
              type="checkbox"
              class="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500 mt-0.5"
            />
            <label for="terms" class="ml-2 text-sm text-gray-700">
              I agree to the
              <a href="#" class="text-purple-600 hover:text-purple-700 font-medium"
                >Terms of Service</a
              >
              and
              <a href="#" class="text-purple-600 hover:text-purple-700 font-medium"
                >Privacy Policy</a
              >
            </label>
          </div>

          <!-- Error Message -->
          <div
            v-if="registerError"
            class="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3"
          >
            <Icon icon="mdi:alert-circle" class="text-red-600 text-xl flex-shrink-0 mt-0.5" />
            <div class="flex-1">
              <p class="text-sm text-red-800 font-medium">{{ registerError }}</p>
            </div>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="loading || !isFormValid"
            class="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-lg flex items-center justify-center gap-2"
          >
            <Icon v-if="loading" icon="mdi:loading" class="text-xl animate-spin" />
            <span>{{ loading ? 'Creating Account...' : 'Create Account' }}</span>
          </button>
        </form>

        <!-- Divider -->
        <div class="relative my-6">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-4 bg-white text-gray-500">Or sign up with</span>
          </div>
        </div>

        <!-- Social Login Buttons -->
        <div class="grid grid-cols-2 gap-3">
          <button
            type="button"
            class="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Icon icon="mdi:google" class="text-xl text-red-600" />
            <span class="text-sm font-medium text-gray-700">Google</span>
          </button>
          <button
            type="button"
            class="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Icon icon="mdi:github" class="text-xl text-gray-900" />
            <span class="text-sm font-medium text-gray-700">GitHub</span>
          </button>
        </div>
      </div>

      <!-- Login Link -->
      <p class="text-center text-sm text-gray-600 mt-6">
        Already have an account?
        <router-link
          to="/login"
          class="text-purple-600 hover:text-purple-700 font-semibold transition-colors"
        >
          Sign in
        </router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'

const router = useRouter()

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const acceptTerms = ref(false)
const loading = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)

const nameError = ref('')
const emailError = ref('')
const passwordError = ref('')
const confirmPasswordError = ref('')
const registerError = ref('')

const passwordStrength = computed(() => {
  if (!password.value) return 0

  let strength = 0
  if (password.value.length >= 8) strength++
  if (password.value.length >= 12) strength++
  if (/[a-z]/.test(password.value) && /[A-Z]/.test(password.value)) strength++
  if (/[0-9]/.test(password.value)) strength++
  if (/[^a-zA-Z0-9]/.test(password.value)) strength++

  return Math.min(strength, 4)
})

const isFormValid = computed(() => {
  return (
    name.value &&
    email.value &&
    password.value &&
    confirmPassword.value &&
    password.value === confirmPassword.value &&
    acceptTerms.value &&
    !nameError.value &&
    !emailError.value &&
    !passwordError.value &&
    !confirmPasswordError.value
  )
})

const validateName = () => {
  nameError.value = ''
  if (!name.value) {
    nameError.value = 'Name is required'
  } else if (name.value.length < 2) {
    nameError.value = 'Name must be at least 2 characters'
  }
}

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
  } else if (password.value.length < 8) {
    passwordError.value = 'Password must be at least 8 characters'
  } else if (!/[A-Z]/.test(password.value)) {
    passwordError.value = 'Password must contain at least one uppercase letter'
  } else if (!/[0-9]/.test(password.value)) {
    passwordError.value = 'Password must contain at least one number'
  }

  if (confirmPassword.value) {
    validateConfirmPassword()
  }
}

const validateConfirmPassword = () => {
  confirmPasswordError.value = ''
  if (!confirmPassword.value) {
    confirmPasswordError.value = 'Please confirm your password'
  } else if (password.value !== confirmPassword.value) {
    confirmPasswordError.value = 'Passwords do not match'
  }
}

const getStrengthColor = strength => {
  const colors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500']
  return colors[strength - 1] || 'bg-gray-200'
}

const getStrengthTextColor = strength => {
  const colors = ['text-red-600', 'text-orange-600', 'text-yellow-600', 'text-green-600']
  return colors[strength - 1] || 'text-gray-600'
}

const getStrengthText = strength => {
  const texts = ['Weak password', 'Fair password', 'Good password', 'Strong password']
  return texts[strength - 1] || ''
}

const handleRegister = async () => {
  registerError.value = ''

  validateName()
  validateEmail()
  validatePassword()
  validateConfirmPassword()

  if (nameError.value || emailError.value || passwordError.value || confirmPasswordError.value) {
    return
  }

  if (!acceptTerms.value) {
    registerError.value = 'You must accept the Terms of Service and Privacy Policy'
    return
  }

  loading.value = true

  try {
    // Replace with your actual registration API call
    // await api.register({ name: name.value, email: email.value, password: password.value })

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))

    console.log('Registered:', { name: name.value, email: email.value })

    // Redirect to login or dashboard
    router.push('/login')
  } catch (error) {
    registerError.value = error.response?.data?.message || 'Registration failed. Please try again.'
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
