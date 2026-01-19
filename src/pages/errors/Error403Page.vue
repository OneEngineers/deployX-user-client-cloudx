<template>
  <div
    class="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center px-4"
  >
    <div class="max-w-2xl w-full text-center">
      <!-- Error Code -->
      <div class="mb-8">
        <h1 class="text-9xl font-bold text-red-600 mb-2">403</h1>
        <div class="h-1 w-32 bg-red-500 mx-auto rounded-full"></div>
      </div>

      <!-- Icon -->
      <div class="mb-6">
        <Icon icon="tabler:lock-access" class="w-32 h-32 mx-auto text-red-400" />
      </div>

      <!-- Message -->
      <div class="mb-8">
        <h2 class="text-3xl font-semibold text-slate-800 mb-3">Access Forbidden</h2>
        <p class="text-lg text-slate-600 max-w-md mx-auto">
          You don't have permission to access this resource. Please contact your administrator if
          you believe this is a mistake.
        </p>
      </div>

      <!-- Possible Reasons -->
      <div class="mb-8 bg-white rounded-lg p-6 shadow-sm border border-red-100 max-w-md mx-auto">
        <h3
          class="text-sm font-semibold text-slate-700 mb-3 flex items-center justify-center gap-2"
        >
          <Icon icon="tabler:info-circle" class="w-5 h-5 text-red-500" />
          Possible Reasons
        </h3>
        <ul class="text-sm text-slate-600 space-y-2 text-left">
          <li class="flex items-start gap-2">
            <Icon icon="tabler:point-filled" class="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
            <span>You're not logged in or your session has expired</span>
          </li>
          <li class="flex items-start gap-2">
            <Icon icon="tabler:point-filled" class="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
            <span>You don't have the required permissions</span>
          </li>
          <li class="flex items-start gap-2">
            <Icon icon="tabler:point-filled" class="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
            <span>The resource is restricted to certain users</span>
          </li>
        </ul>
      </div>

      <!-- Actions -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          @click="goBack"
          class="px-6 py-3 bg-white text-slate-700 rounded-lg font-medium hover:bg-slate-50 border border-slate-300 transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <Icon icon="tabler:arrow-left" class="w-5 h-5" />
          Go Back
        </button>
        <router-link
          to="/login"
          class="px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <Icon icon="tabler:login" class="w-5 h-5" />
          Sign In
        </router-link>
        <router-link
          to="/"
          class="px-6 py-3 bg-slate-600 text-white rounded-lg font-medium hover:bg-slate-700 transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <Icon icon="tabler:home" class="w-5 h-5" />
          Go to Home
        </router-link>
      </div>

      <!-- Additional Help -->
      <div class="mt-12 pt-8 border-t border-red-100">
        <p class="text-sm text-slate-500 mb-4">Need assistance?</p>
        <div class="flex flex-wrap gap-3 justify-center text-sm">
          <router-link to="/contact" class="text-red-600 hover:text-red-700 hover:underline">
            Contact Administrator
          </router-link>
          <span class="text-slate-300">•</span>
          <router-link to="/help" class="text-red-600 hover:text-red-700 hover:underline">
            Help Center
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  if (window.history.length > 1) {
    router.back()
  } else {
    router.push('/')
  }
}
</script>
