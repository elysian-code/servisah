"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "es" | "fr" | "de"

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Simple translations (would be more comprehensive in a real app)
const translations: Record<Language, Record<string, string>> = {
  en: {
    "nav.home": "Home",
    "nav.services": "Services",
    "nav.about": "About",
    "nav.login": "Login",
    "nav.register": "Register",
    "hero.title": "Find the perfect service provider",
    "hero.subtitle": "Connect with skilled professionals for all your needs",
    "cta.getStarted": "Get Started",
    // Add more translations as needed
  },
  es: {
    "nav.home": "Inicio",
    "nav.services": "Servicios",
    "nav.about": "Acerca de",
    "nav.login": "Iniciar Sesión",
    "nav.register": "Registrarse",
    "hero.title": "Encuentra el proveedor de servicios perfecto",
    "hero.subtitle": "Conéctate con profesionales calificados para todas tus necesidades",
    "cta.getStarted": "Comenzar",
  },
  fr: {
    "nav.home": "Accueil",
    "nav.services": "Services",
    "nav.about": "À propos",
    "nav.login": "Connexion",
    "nav.register": "S'inscrire",
    "hero.title": "Trouvez le prestataire parfait",
    "hero.subtitle": "Connectez-vous avec des professionnels qualifiés pour tous vos besoins",
    "cta.getStarted": "Commencer",
  },
  de: {
    "nav.home": "Startseite",
    "nav.services": "Dienstleistungen",
    "nav.about": "Über uns",
    "nav.login": "Anmelden",
    "nav.register": "Registrieren",
    "hero.title": "Finden Sie den perfekten Dienstleister",
    "hero.subtitle": "Verbinden Sie sich mit qualifizierten Fachleuten für alle Ihre Bedürfnisse",
    "cta.getStarted": "Loslegen",
  },
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && Object.keys(translations).includes(savedLanguage)) {
      setLanguage(savedLanguage)
    }
  }, [])

  const changeLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)
    document.documentElement.lang = lang
  }

  const translate = (key: string): string => {
    return translations[language][key] || key
  }

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage: changeLanguage,
        t: translate,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
