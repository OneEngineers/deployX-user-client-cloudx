<script setup>
const login = () => {
  const baseUrl = 'http://localhost:8080/oauth2/authorize/github'
  const redirectUri = 'http://localhost:5173/oauth2/redirect'
  window.location.href = `${baseUrl}?redirect_uri=${redirectUri}`
}
</script>

<template>
  <div class="flex min-h-screen bg-slate-50">
    <div class="hidden lg:flex lg:flex-1 bg-[#0b5394] items-center justify-center text-white p-12">
      <div class="max-w-md text-center">
        <h2 class="text-4xl font-bold mb-4">CloudX Portal</h2>
        <p class="text-blue-100 text-lg">Deploy your infrastructure in seconds, not hours.</p>
      </div>
    </div>

    <div class="flex flex-col justify-center w-full bg-white px-8 py-12 lg:w-137.5 shadow-2xl">
      <div class="max-w-sm mx-auto w-full">
        <h1 class="text-3xl font-bold text-slate-800">Welcome!</h1>
        <p class="mt-2 text-slate-500">Please login via GitHub to continue.</p>

        <button
          @click="login"
          class="mt-8 w-full flex items-center justify-center gap-3 px-6 py-4 bg-[#24292f] hover:bg-black text-white font-bold rounded-xl transition-all shadow-lg active:scale-95"
        >
          <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path
              d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
            />
          </svg>
          Login with GitHub
        </button>

        <div class="mt-12 p-6 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50">
          <h3 class="font-bold text-slate-700 mb-3">Quick Instructions:</h3>
          <ul class="text-sm text-slate-600 space-y-2">
            <li class="flex items-start gap-2">
              <span>•</span> Have your GitHub credentials ready.
            </li>
            <li class="flex items-start gap-2">
              <span>•</span> Authorize the application when prompted.
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
