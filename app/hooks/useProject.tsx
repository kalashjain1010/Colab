'use client'

import {create} from 'zustand'

interface useProjectStore{
    onOpen: () => void
    onClose: () => void
    isOpen: boolean
}

const useProject = create<useProjectStore>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false})
}))

export default useProject
