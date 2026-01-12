<template>
    <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4">
        <div class="max-w-2xl w-full text-center">
            <!-- Error Code -->
            <div class="mb-8">
                <h1 class="text-9xl font-bold text-slate-800 mb-2">404</h1>
                <div class="h-1 w-32 bg-blue-500 mx-auto rounded-full"></div>
            </div>

            <!-- Icon -->
            <div class="mb-6">
                <Icon icon="tabler:error-404" class="w-32 h-32 mx-auto text-slate-400" />
            </div>

            <!-- Message -->
            <div class="mb-8">
                <h2 class="text-3xl font-semibold text-slate-800 mb-3">
                    Page Not Found
                </h2>
                <p class="text-lg text-slate-600 max-w-md mx-auto">
                    Sorry, the page you're looking for doesn't exist or has been moved.
                </p>
            </div>

            <!-- Actions -->
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <button @click="goBack"
                    class="px-6 py-3 bg-white text-slate-700 rounded-lg font-medium hover:bg-slate-50 border border-slate-300 transition-colors duration-200 flex items-center justify-center gap-2">
                    <Icon icon="tabler:arrow-left" class="w-5 h-5" />
                    Go Back
                </button>
                <router-link to="/"
                    class="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2">
                    <Icon icon="tabler:home" class="w-5 h-5" />
                    Go to Home
                </router-link>
            </div>

            <!-- Additional Help -->
            <div class="mt-12 pt-8 border-t border-slate-200">
                <p class="text-sm text-slate-500 mb-4">Need help? Try these:</p>
                <div class="flex flex-wrap gap-3 justify-center text-sm">
                    <router-link to="/contact" class="text-blue-600 hover:text-blue-700 hover:underline">
                        Contact Support
                    </router-link>
                    <span class="text-slate-300">•</span>
                    <router-link to="/help" class="text-blue-600 hover:text-blue-700 hover:underline">
                        Help Center
                    </router-link>
                    <span class="text-slate-300">•</span>
                    <router-link to="/sitemap" class="text-blue-600 hover:text-blue-700 hover:underline">
                        Site Map
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