import { create } from 'zustand';

export const useNotificationStore = create((set) => ({
  visible: false,
  message: '',
  actions: {
    showNotification: (anecdote) => {
      set({ visible: true, message: anecdote.content })
      setTimeout(() => {
        set({ visible: false, message: '' })
      }, 5000)
    }
  }
}))

export const useIsNotificationVisible = () => useNotificationStore(state => state.visible)
export const useNotificationMessage = () => useNotificationStore(state => state.message)
export const useNotificationActions = () => useNotificationStore(state => state.actions)
