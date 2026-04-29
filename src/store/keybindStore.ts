import {create} from "zustand"
import { persist } from 'zustand/middleware'
import { KeybindAction,KeybindDef, KEYBINDS } from "@/lib/keybinds"


type KeybindStore = {
    keybind: Record<KeybindAction, KeybindDef>;
    setKeybind: (action: KeybindAction, newBind:KeybindDef) => void;
}
export const keybindStore = create<KeybindStore>()(
    persist((set,get)=>({
    keybind: KEYBINDS,
    getKeybind: () => get().keybind as Record<KeybindAction, KeybindDef>,
    setKeybind: (action, newBind) =>set((state) => ({
    keybind: {
        ...state.keybind,
        [action]: newBind,
        }
    }))
}),{name:"keybind-Storage"})
) 