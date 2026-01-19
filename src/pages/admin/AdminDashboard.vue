<template>
  <div class="min-h-screen bg-slate-50 p-6">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="mb-6">
        <h1 class="text-3xl font-bold text-slate-800 mb-2">Admin Dashboard</h1>
        <p class="text-slate-600">Overview of your system metrics and analytics</p>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div class="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Icon icon="tabler:users" class="w-6 h-6 text-blue-600" />
            </div>
            <span class="text-sm text-green-600 font-medium">+12%</span>
          </div>
          <h3 class="text-2xl font-bold text-slate-800 mb-1">{{ stats.totalUsers }}</h3>
          <p class="text-sm text-slate-600">Total Users</p>
        </div>

        <div class="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Icon icon="tabler:server" class="w-6 h-6 text-purple-600" />
            </div>
            <span class="text-sm text-green-600 font-medium">+8%</span>
          </div>
          <h3 class="text-2xl font-bold text-slate-800 mb-1">{{ stats.totalClusters }}</h3>
          <p class="text-sm text-slate-600">Active Clusters</p>
        </div>

        <div class="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Icon icon="tabler:rocket" class="w-6 h-6 text-green-600" />
            </div>
            <span class="text-sm text-green-600 font-medium">+23%</span>
          </div>
          <h3 class="text-2xl font-bold text-slate-800 mb-1">{{ stats.totalDeployments }}</h3>
          <p class="text-sm text-slate-600">Total Deployments</p>
        </div>

        <div class="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Icon icon="tabler:activity" class="w-6 h-6 text-orange-600" />
            </div>
            <span class="text-sm text-green-600 font-medium">+5%</span>
          </div>
          <h3 class="text-2xl font-bold text-slate-800 mb-1">{{ stats.activeApps }}</h3>
          <p class="text-sm text-slate-600">Active Applications</p>
        </div>
      </div>

      <!-- Charts Row -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <!-- User Growth Chart -->
        <div class="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <h3 class="text-lg font-semibold text-slate-800 mb-4">User Growth</h3>
          <canvas ref="userGrowthChart"></canvas>
        </div>

        <!-- Deployment Status -->
        <div class="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <h3 class="text-lg font-semibold text-slate-800 mb-4">Deployment Status</h3>
          <canvas ref="deploymentStatusChart"></canvas>
        </div>
      </div>

      <!-- Recent Activity & System Health -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Recent Activity -->
        <div class="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <h3 class="text-lg font-semibold text-slate-800 mb-4">Recent Activity</h3>
          <div class="space-y-4">
            <div
              v-for="activity in recentActivities"
              :key="activity.id"
              class="flex items-start gap-3 pb-4 border-b border-slate-100 last:border-0 last:pb-0"
            >
              <div
                :class="activity.iconBg"
                class="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
              >
                <Icon :icon="activity.icon" class="w-5 h-5" :class="activity.iconColor" />
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm text-slate-800">{{ activity.message }}</p>
                <p class="text-xs text-slate-500 mt-1">{{ activity.time }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- System Health -->
        <div class="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <h3 class="text-lg font-semibold text-slate-800 mb-4">System Health</h3>
          <div class="space-y-4">
            <div>
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm text-slate-600">CPU Usage</span>
                <span class="text-sm font-medium text-slate-800">{{ systemHealth.cpu }}%</span>
              </div>
              <div class="w-full bg-slate-200 rounded-full h-2">
                <div
                  class="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  :style="{ width: `${systemHealth.cpu}%` }"
                ></div>
              </div>
            </div>

            <div>
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm text-slate-600">Memory Usage</span>
                <span class="text-sm font-medium text-slate-800">{{ systemHealth.memory }}%</span>
              </div>
              <div class="w-full bg-slate-200 rounded-full h-2">
                <div
                  class="bg-purple-600 h-2 rounded-full transition-all duration-300"
                  :style="{ width: `${systemHealth.memory}%` }"
                ></div>
              </div>
            </div>

            <div>
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm text-slate-600">Disk Usage</span>
                <span class="text-sm font-medium text-slate-800">{{ systemHealth.disk }}%</span>
              </div>
              <div class="w-full bg-slate-200 rounded-full h-2">
                <div
                  class="bg-green-600 h-2 rounded-full transition-all duration-300"
                  :style="{ width: `${systemHealth.disk}%` }"
                ></div>
              </div>
            </div>

            <div>
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm text-slate-600">Network Load</span>
                <span class="text-sm font-medium text-slate-800">{{ systemHealth.network }}%</span>
              </div>
              <div class="w-full bg-slate-200 rounded-full h-2">
                <div
                  class="bg-orange-600 h-2 rounded-full transition-all duration-300"
                  :style="{ width: `${systemHealth.network}%` }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import { Chart } from 'chart.js/auto'

const stats = ref({
  totalUsers: 1284,
  totalClusters: 24,
  totalDeployments: 3562,
  activeApps: 156
})

const recentActivities = ref([
  {
    id: 1,
    icon: 'tabler:user-plus',
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
    message: 'New user registered: john.doe@example.com',
    time: '2 minutes ago'
  },
  {
    id: 2,
    icon: 'tabler:rocket',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    message: 'New deployment: Production v2.4.1',
    time: '15 minutes ago'
  },
  {
    id: 3,
    icon: 'tabler:alert-triangle',
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-600',
    message: 'High CPU usage detected on Cluster-03',
    time: '1 hour ago'
  },
  {
    id: 4,
    icon: 'tabler:server',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    message: 'New cluster added: cluster-eu-west-1',
    time: '2 hours ago'
  }
])

const systemHealth = ref({
  cpu: 45,
  memory: 62,
  disk: 38,
  network: 28
})

const userGrowthChart = ref(null)
const deploymentStatusChart = ref(null)

onMounted(() => {
  // User Growth Chart
  if (userGrowthChart.value) {
    new Chart(userGrowthChart.value, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'Users',
            data: [850, 920, 1050, 1150, 1220, 1284],
            borderColor: 'rgb(59, 130, 246)',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            tension: 0.4,
            fill: true
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: false
          }
        }
      }
    })
  }

  // Deployment Status Chart
  if (deploymentStatusChart.value) {
    new Chart(deploymentStatusChart.value, {
      type: 'doughnut',
      data: {
        labels: ['Success', 'Failed', 'In Progress'],
        datasets: [
          {
            data: [3200, 250, 112],
            backgroundColor: ['rgb(34, 197, 94)', 'rgb(239, 68, 68)', 'rgb(249, 115, 22)']
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    })
  }
})
</script>
