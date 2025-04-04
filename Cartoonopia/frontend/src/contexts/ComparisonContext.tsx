import React, { createContext, useState, useContext, useEffect } from "react"
import { Character } from "../types/CartoonopiaTypes"

interface ComparisonContextProps {
  addComparison: (character: Character) => void
  removeComparison: (character: Character) => void
  currentComparisons: Character[]
  comparisonHistory: Character[][]
  setComparison: (c1: Character, c2: Character) => void
}

export const ComparisonContext = createContext<ComparisonContextProps>({
  addComparison: () => {},
  removeComparison: () => {},
  currentComparisons: [],
  comparisonHistory: [],
  setComparison: () => {},
})

export const ComparisonProvider = ({
  children,
}: {
  children: React.ReactElement
}) => {
  const [currentComparisons, setCurrentComparison] = useState<Character[]>([])
  const [comparisonHistory, setComparisonHistory] = useState<Character[][]>([])

  useEffect(() => {
    if (currentComparisons.length === 2) {
      let exists = false
      comparisonHistory.forEach((pair) => {
        if (
          pair[0].id === currentComparisons[0].id &&
          pair[1].id === currentComparisons[1].id
        ) {
          exists = true
        }
      })
      if (!exists) {
        setComparisonHistory((old) => [...old, currentComparisons])
      }
    }
  }, [currentComparisons])

  const addComparison = (character: Character) => {
    setCurrentComparison((old) => [...old, character])
  }

  const removeComparison = (character: Character) => {
    setCurrentComparison((old) => old.filter((c) => c.id !== character.id))
  }

  const setComparison = (c1: Character, c2: Character) => {
    setCurrentComparison([c1, c2])
  }

  return (
    <ComparisonContext.Provider
      value={{
        addComparison: addComparison,
        removeComparison: removeComparison,
        currentComparisons: currentComparisons,
        comparisonHistory: comparisonHistory,
        setComparison: setComparison,
      }}
    >
      {children}
    </ComparisonContext.Provider>
  )
}

export function useComparison() {
  const context = useContext(ComparisonContext)
  if (!context) {
    throw new Error("useComparison must be used within a ComparisonContext")
  }
  return context
}
