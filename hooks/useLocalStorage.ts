import { useEffect, useState } from "react";

const getInitialLocalValue = <T>(key: string, defaultValue: T) => {
  let initialValue: T | undefined;
  if (typeof window !== "undefined") {
    const localValue = window.localStorage.getItem(key);
    initialValue = localValue ? JSON.parse(localValue): defaultValue;
  } else {
    initialValue = undefined;
  }
  return initialValue;
}

const useLocalStorage = <T>(key: string, defaultValue: T) => {
  const [localValue, setLocalValue] = useState(() => getInitialLocalValue<T>(key, defaultValue));

  useEffect(() => {
    if (typeof localValue !== "undefined") {
      window.localStorage.setItem(key, JSON.stringify(localValue))
    }
  }, [key, localValue])

  return [localValue, setLocalValue] as const;
}

export default useLocalStorage;