import { ref, onUnmounted } from 'vue'

export default function useSocket(url) {
    const messages = ref([])
    const ws = new WebSocket(url)
    ws.onmessage = (e) => messages.value.push(e.data)
    onUnmounted(() => ws.close())
    return { messages }
}
