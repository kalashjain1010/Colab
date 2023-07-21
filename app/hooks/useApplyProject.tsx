'use client'

import {create} from 'zustand'

interface useApplyProjectStore{
    onOpen: () => void
    onClose: () => void
    isOpen: boolean
}

const useApplyProject = create<useApplyProjectStore>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false})
}))

export default useApplyProject
