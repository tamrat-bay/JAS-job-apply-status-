import React from 'react'
import { createJasStore } from '../JasStore/JasStore'
import { useLocalStore } from 'mobx-react'

const JasStoreContext = React.createContext(null)

export const JasStoreProvider = ({children}) => {
  const jasStore = useLocalStore(createJasStore)

  return <JasStoreContext.Provider value={jasStore}>
    {children}
  </JasStoreContext.Provider>
}

export const useJasStore = () => React.useContext(JasStoreContext)