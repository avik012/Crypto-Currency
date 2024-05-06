import React, {  createContext, useContext, useEffect, useState } from 'react'

const CoinContext = createContext()
const CryptoContext = ({children}) => {
  const [currency, setCurrency] = useState('INR')
  const [symbol, setSymbol] = useState('₹')

  useEffect(() => {
    if(currency === "INR" )setSymbol('₹') 
    else if(currency === "USD") setSymbol('$')
    
  }, [currency])
  
  return (
    <CoinContext.Provider value={{currency,setCurrency,symbol}}>
        {children}
    </CoinContext.Provider>
  )
}

export default CryptoContext;

export const CryptoState = ()=>{
  return useContext(CoinContext);
}