import { create } from 'zustand';

export const useNotificationStore = create((set) => ({
  visible: false,
  actions: {
    showNotification: () => {
      set({ visible: true })
      setTimeout(() => {
        set({ visible: false })
      }, 5000)
    }
  }
}))

export const useIsNotificationVisible = () => useNotificationStore(state => state.visible)
export const useNotificationActions = () => useNotificationStore(state => state.actions)
