import { create } from 'zustand'
import type { UserDetails, Category, Subcategory, Skill, ChatMessage } from '@/types'

interface State {
    userDetails: UserDetails | null
    selectedCategory: Category | null
    selectedSubcategory: Subcategory | null
    selectedSkill: Skill | null
    chatHistory: ChatMessage[]
    setUserDetails: (details: UserDetails) => void
    setSelectedCategory: (category: Category) => void
    setSelectedSubcategory: (subcategory: Subcategory) => void
    setSelectedSkill: (skill: Skill) => void
    addChatMessage: (message: ChatMessage) => void
    clearChat: () => void
}

export const useStore = create<State>((set) => ({
    userDetails: null,
    selectedCategory: null,
    selectedSubcategory: null,
    selectedSkill: null,
    chatHistory: [],
    setUserDetails: (details: UserDetails) => set({ userDetails: details }),
    setSelectedCategory: (category: Category) => set({ selectedCategory: category }),
    setSelectedSubcategory: (subcategory: Subcategory) => set({ selectedSubcategory: subcategory }),
    setSelectedSkill: (skill: Skill) => set({ selectedSkill: skill }),
    addChatMessage: (message: ChatMessage) =>
        set((state) => ({
            chatHistory: [...state.chatHistory, message]
        })),
    clearChat: () => set({ chatHistory: [] })
}))

