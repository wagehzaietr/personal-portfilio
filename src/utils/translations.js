import enTranslations from '../locales/en.json'
import arTranslations from '../locales/ar.json'

const translations = {
  en: enTranslations,
  ar: arTranslations
}

export const getTranslation = (language, key, projectId = null) => {
  const lang = translations[language] || translations.en
  
  if (projectId && key.startsWith('projects.')) {
    const projectKey = key.replace('projects.', '')
    return lang.projects[projectId]?.[projectKey] || ''
  }
  
  // Handle nested keys like 'ui.overview'
  const keys = key.split('.')
  let value = lang
  
  for (const k of keys) {
    value = value?.[k]
    if (value === undefined) break
  }
  // Fallback: some locale files (e.g., Arabic) may accidentally nest `ui` under `projects`
  if (value === undefined && keys[0] === 'ui' && lang?.projects?.ui) {
    let alt = lang.projects
    for (let i = 0; i < keys.length; i++) {
      alt = alt?.[keys[i]]
      if (alt === undefined) break
    }
    if (alt !== undefined) return alt
  }

  return value !== undefined ? value : key
}

export const getProjectTranslation = (language, projectId, key) => {
  const lang = translations[language] || translations.en
  return lang.projects[projectId]?.[key] || ''
}

export default translations