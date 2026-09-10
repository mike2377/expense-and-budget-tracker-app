import { useState, useEffect } from 'react'

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      if (!item) return initialValue
      const parsed = JSON.parse(item)
      // Validation
      if (Array.isArray(initialValue) && !Array.isArray(parsed)) return initialValue
      if (typeof initialValue === 'object' && initialValue !== null && typeof parsed !== 'object') return initialValue
      return parsed
    } catch (error) {
      console.error(`Error reading localStorage ${key}:`, error)
      return initialValue
    }
  })

  // save to localStorage
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue))
    } catch (error) {
      console.error(`Error writing localStorage ${key}:`, error)
    }
  }, [key, storedValue])

  // return the state and the setter function
  return [storedValue, setStoredValue]
}
