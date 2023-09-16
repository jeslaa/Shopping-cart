import { useEffect, useState } from "react"

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
  // Initialize state using useState hook
  const [value, setValue] = useState<T>(() => {
    
    // Try to retrieve the value from local storage based on the provided key
    const jsonValue = localStorage.getItem(key)

    // If value is found in local storage, parse it and use it as the initial value
    if (jsonValue != null) return JSON.parse(jsonValue)

    // If an initial value is specified as a function, execute to retrieve the initial value
    if (typeof initialValue === "function") {
      return (initialValue as () => T)()
    } else {
      
      return initialValue
    }
  })

  // Utilizes the useEffect hook to monitor changes in the value or key and refreshes the local storage
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue] as [typeof value, typeof setValue]
}