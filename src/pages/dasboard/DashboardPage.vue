<script setup>
import { onMounted } from 'vue'
import { useDashboardStore } from '@/store/dashboard/dashboard.store'

const store = useDashboardStore()

const getStatusBadgeClass = status => {
  if (status === 'Healthy' || status === 'Success')
    return 'bg-emerald-50 text-emerald-700 border-emerald-200'
  if (status === 'Warning' || status === 'Running')
    return 'bg-amber-50 text-amber-700 border-amber-200'
  return 'bg-rose-50 text-rose-700 border-rose-200'
}

onMounted(() => store.fetchAll())
</script>

<template>
  <v-app class="bg-neutral-50">
    <!-- Sidebar -->
    <v-navigation-drawer v-model="store.isSidebarOpen" color="#09090b" theme="dark" width="240">
      <div class="p-6">
        <div class="flex items-center gap-2 mb-8">
          <div
            class="w-8 h-8 bg-gradient-to-br from-violet-500 to-purple-600 rounded-md flex items-center justify-center"
          >
            <v-icon size="20">mdi-rocket-launch</v-icon>
          </div>
          <h1 class="text-lg font-semibold tracking-tight text-white">DevOps Hub</h1>
        </div>

        <v-list density="compact" nav class="space-y-1">
          <v-list-item
            prepend-icon="mdi-view-dashboard-outline"
            title="Dashboard"
            active
            class="rounded-md"
            color="primary"
          />
          <v-list-item prepend-icon="mdi-chart-box-outline" title="Analytics" class="rounded-md" />
          <v-list-item prepend-icon="mdi-cog-outline" title="Settings" class="rounded-md" />
        </v-list>
      </div>
    </v-navigation-drawer>

    <!-- Header -->
    <v-app-bar flat class="border-b bg-white/80 backdrop-blur-sm">
      <v-app-bar-nav-icon @click="store.isSidebarOpen = !store.isSidebarOpen" />
      <v-toolbar-title class="font-semibold text-neutral-900"> Deployments </v-toolbar-title>
      <v-spacer />
      <v-btn
        color="neutral-900"
        variant="flat"
        prepend-icon="mdi-plus"
        @click="store.openModal()"
        class="rounded-lg"
      >
        New Project
      </v-btn>
    </v-app-bar>

    <!-- Main Content -->
    <v-main>
      <div class="p-6 lg:p-8 max-w-7xl mx-auto">
        <!-- Error Message -->
        <v-alert
          v-if="store.errorMessage"
          type="info"
          variant="tonal"
          closable
          class="mb-6"
          @click:close="store.errorMessage = null"
        >
          {{ store.errorMessage }}
        </v-alert>

        <!-- Search Bar -->
        <div class="mb-8">
          <v-text-field
            v-model="store.searchQuery"
            placeholder="Search projects..."
            prepend-inner-icon="mdi-magnify"
            variant="outlined"
            density="comfortable"
            class="max-w-md"
            hide-details
            @update:model-value="store.fetchAll"
          />
        </div>

        <!-- Project Grid -->
        <v-row v-if="store.items.length > 0" class="gap-y-6">
          <v-col v-for="d in store.items" :key="d.id" cols="12" sm="6" lg="4">
            <v-card
              border
              flat
              class="rounded-lg overflow-hidden hover:shadow-lg transition-all duration-200 hover:border-neutral-300 group"
            >
              <v-card-item class="pb-3">
                <div class="flex items-start justify-between mb-2">
                  <div class="flex-1">
                    <div class="text-xs text-neutral-500 mb-1 font-mono">#{{ d.id }}</div>
                    <v-card-title class="text-base font-semibold text-neutral-900 px-0">
                      {{ d.name }}
                    </v-card-title>
                    <div class="text-xs text-neutral-500 mt-1 break-all">
                      {{ d.gitUrl }}
                    </div>
                  </div>
                  <div
                    :class="[
                      'px-2.5 py-1 rounded-md text-xs font-medium border whitespace-nowrap ml-2',
                      getStatusBadgeClass(d.status)
                    ]"
                  >
                    {{ d.status || 'CREATED' }}
                  </div>
                </div>
              </v-card-item>

              <v-divider class="opacity-50" />

              <v-card-actions class="bg-neutral-50/50 px-4 py-3 justify-between">
                <div class="flex gap-1">
                  <v-btn
                    icon="mdi-pencil-outline"
                    size="small"
                    variant="text"
                    class="text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
                    @click="store.openModal(d)"
                  />
                  <v-btn
                    icon="mdi-trash-can-outline"
                    size="small"
                    variant="text"
                    class="text-neutral-600 hover:text-rose-600 hover:bg-rose-50"
                    @click="store.delete(d.id)"
                  />
                </div>
                <v-btn
                  color="neutral-900"
                  variant="flat"
                  size="small"
                  prepend-icon="mdi-play"
                  :loading="store.loading"
                  class="rounded-md text-xs px-3"
                  @click="store.runDeploy(d.id)"
                >
                  Deploy
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>

        <!-- Empty State -->
        <div v-else class="flex flex-col items-center justify-center py-16 text-center">
          <div class="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mb-4">
            <v-icon size="32" color="neutral-400">mdi-package-variant</v-icon>
          </div>
          <h3 class="text-lg font-semibold text-neutral-900 mb-1">No projects yet</h3>
          <p class="text-neutral-500 text-sm mb-4">
            Get started by creating your first deployment project
          </p>
          <v-btn
            color="neutral-900"
            variant="flat"
            prepend-icon="mdi-plus"
            @click="store.openModal()"
            class="rounded-lg"
          >
            Create Project
          </v-btn>
        </div>
      </div>
    </v-main>

    <!-- Modal -->
    <v-dialog v-model="store.dialog" max-width="520px">
      <v-card class="rounded-lg">
        <v-card-item class="pb-2">
          <v-card-title class="text-lg font-semibold text-neutral-900">
            {{ store.isEdit ? 'Edit Project' : 'New Project' }}
          </v-card-title>
          <template v-slot:subtitle>
            <span class="text-sm text-neutral-500">
              {{
                store.isEdit ? 'Update your deployment project' : 'Create a new deployment project'
              }}
            </span>
          </template>
        </v-card-item>

        <v-card-text class="pt-4 space-y-4">
          <div>
            <v-text-field
              v-model="store.form.name"
              label="Project name"
              placeholder="my-awesome-app"
              variant="outlined"
              density="comfortable"
              hide-details
              :error="store.validationErrors?.name ? true : false"
            />
            <div v-if="store.validationErrors?.name" class="text-xs text-rose-600 mt-1">
              {{ store.validationErrors.name }}
            </div>
          </div>

          <v-text-field
            v-model="store.form.gitUrl"
            label="Git Repository URL"
            placeholder="https://github.com/user/repo.git"
            variant="outlined"
            density="comfortable"
            hide-details
          />
        </v-card-text>

        <v-card-actions class="px-6 pb-6 pt-2">
          <v-spacer />
          <v-btn variant="text" class="rounded-lg text-neutral-600" @click="store.dialog = false">
            Cancel
          </v-btn>
          <v-btn
            color="neutral-900"
            variant="flat"
            class="rounded-lg"
            :loading="store.loading"
            @click="store.save"
          >
            {{ store.isEdit ? 'Save Changes' : 'Create Project' }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<style scoped>
.v-card {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.v-card:hover {
  transform: translateY(-2px);
}
</style>
