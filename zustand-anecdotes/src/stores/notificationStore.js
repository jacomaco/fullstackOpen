import { create } from 'zustand';

export const useNotificationStore = create((set, get) => ({
  visible: false,
  message: '',
  timeoutId: '',
  actions: {
    showNotification: (messageText) => {
      if (get().timeoutId) {
        clearTimeout(get().timeoutId)
      }
      set({ visible: true, message: messageText })
      const id = setTimeout(() => {
        set({ visible: false, message: '', timeoutId: null })
      }, 5000)
      set({ timeoutId: id })
    }
  }
}))

export const useIsNotificationVisible = () => useNotificationStore(state => state.visible)
export const useNotificationMessage = () => useNotificationStore(state => state.message)
export const useNotificationActions = () => useNotificationStore(state => state.actions)
