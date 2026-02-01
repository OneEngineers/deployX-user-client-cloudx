<template>
  <div class="flex h-screen bg-gray-100 font-sans text-gray-900">
    <aside class="w-64 bg-slate-900 text-white hidden md:flex flex-col">
      <div class="p-6 text-2xl font-bold border-b border-slate-800 tracking-tight text-blue-400">
        CloudX
      </div>
      <nav class="flex-1 p-4 space-y-1">
        <a
          href="#"
          class="flex items-center space-x-3 px-4 py-2.5 bg-blue-600 rounded-lg shadow-md transition"
        >
          <span>Overview</span>
        </a>
        <a
          href="#"
          class="flex items-center space-x-3 px-4 py-2.5 text-slate-400 hover:bg-slate-800 hover:text-white rounded-lg transition"
        >
          <span>Repositories</span>
        </a>
        <a
          href="#"
          class="flex items-center space-x-3 px-4 py-2.5 text-slate-400 hover:bg-slate-800 hover:text-white rounded-lg transition"
        >
          <span>Deployments</span>
        </a>
        <a
          href="#"
          class="flex items-center space-x-3 px-4 py-2.5 text-slate-400 hover:bg-slate-800 hover:text-white rounded-lg transition"
        >
          <span>Settings</span>
        </a>
      </nav>
      <div class="p-4 border-t border-slate-800">
        <button
          @click="auth.logout"
          class="w-full text-left px-4 py-2 text-sm text-slate-400 hover:text-red-400 transition"
        >
          Logout
        </button>
      </div>
    </aside>

    <div class="flex-1 flex flex-col overflow-hidden">
      <header class="h-16 bg-white border-b flex items-center justify-between px-8 shadow-sm">
        <div class="text-xl font-semibold text-gray-700">
          Welcome back, <span class="text-blue-600">{{ auth.user?.name || 'Developer' }}</span>
        </div>
        <div class="flex items-center space-x-4">
          <button
            @click="loadRepos"
            :disabled="auth.loading"
            class="text-sm font-medium bg-white border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded-lg transition disabled:opacity-50 flex items-center"
          >
            <span v-if="auth.loading" class="mr-2 animate-spin">◌</span>
            {{ auth.loading ? 'Syncing...' : 'Sync GitHub' }}
          </button>
          <div
            class="w-10 h-10 bg-gradient-to-tr from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold shadow-inner"
          >
            {{ auth.user?.name?.charAt(0) || 'U' }}
          </div>
        </div>
      </header>

      <main class="flex-1 overflow-x-hidden overflow-y-auto p-8 bg-gray-50/50">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div
            v-for="stat in auth.dashboardStats"
            :key="stat.label"
            class="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-blue-300 transition-colors"
          >
            <p class="text-xs font-bold text-gray-400 uppercase tracking-widest">
              {{ stat.label }}
            </p>
            <div class="flex items-baseline justify-between mt-3">
              <h3 class="text-2xl font-extrabold text-gray-800">{{ stat.value }}</h3>
              <span
                :class="stat.trendUp ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'"
                class="text-xs font-bold px-2 py-1 rounded"
              >
                {{ stat.trend }}
              </span>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div class="p-6 border-b border-gray-100 flex justify-between items-center bg-white">
            <h3 class="font-bold text-gray-800 text-lg">Your GitHub Repositories</h3>
            <span v-if="auth.loading" class="text-blue-500 text-xs font-medium animate-pulse">
              UPDATING...
            </span>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left">
              <thead
                class="bg-gray-50 text-gray-400 text-[10px] uppercase font-bold tracking-widest"
              >
                <tr>
                  <th class="px-6 py-4">Repository Name</th>
                  <th class="px-6 py-4">Status</th>
                  <th class="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                <tr
                  v-for="repo in auth.githubRepos"
                  :key="repo.id"
                  class="group hover:bg-blue-50/30 transition-colors"
                >
                  <td class="px-6 py-4">
                    <div
                      class="font-semibold text-gray-800 group-hover:text-blue-700 transition-colors"
                    >
                      {{ repo.name }}
                    </div>
                    <div class="text-xs text-gray-400">{{ repo.language || 'Documentation' }}</div>
                  </td>
                  <td class="px-6 py-4">
                    <span
                      class="px-2.5 py-0.5 text-xs font-semibold bg-green-100 text-green-700 rounded-full border border-green-200"
                    >
                      Public
                    </span>
                  </td>
                  <td class="px-6 py-4 text-right">
                    <a
                      :href="repo.html_url"
                      target="_blank"
                      class="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-bold transition"
                    >
                      Open Repo
                      <svg
                        class="w-4 h-4 ml-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                        />
                      </svg>
                    </a>
                  </td>
                </tr>
                <tr v-if="auth.githubRepos.length === 0 && !auth.loading">
                  <td colspan="3" class="px-6 py-16 text-center">
                    <div class="text-gray-400 text-sm mb-2">
                      No repositories found in your account.
                    </div>
                    <button @click="loadRepos" class="text-blue-600 font-bold hover:underline">
                      Click to sync
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()

const loadRepos = async () => {
  await auth.fetchGithubRepos()
}

onMounted(() => {
  if (auth.isAuthenticated) {
    if (auth.githubRepos.length === 0) {
      loadRepos()
    }
  }
})
</script>
