import {Children, createContext,useState} from 'react'

export const MovimientosContext = createContext({})

export const MovimientosProvider = ({children}) =>{

    const [movimientosState,setMovimientosState] = useState([])

    
    return <MovimientosContext.Provider value={{movimientosState,setMovimientosState}}>
        {children}
    </MovimientosContext.Provider>
}



