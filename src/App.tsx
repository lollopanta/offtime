import { useEffect } from "react"

import { DesignSystemPage } from "@/pages/design-system"
import { StorefrontPage } from "@/pages/storefront"

export function App() {
  const isDesignSystem = window.location.pathname === "/design-system"

  useEffect(() => {
    document.title = isDesignSystem ? "OFFTIME Design System" : "OFFTIME"
  }, [isDesignSystem])

  return isDesignSystem ? <DesignSystemPage /> : <StorefrontPage />
}

export default App
