import { AppContextConfig } from "@/store/config"
import { useContext } from "react"

export const useContextHook = () => {
    return useContext(AppContextConfig)
}