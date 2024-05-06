import React from 'react'
import './CoinEnter.css'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import Header from './Components/Header'
import Home from './Pages/Home'
import CoinDetails from './Pages/CoinDetails'
import { makeStyles } from '@material-ui/core'
import CryptoContext from './CoinContext/CryptoContext'

const useStyles = makeStyles(()=>({
  CoinCurrency:{
      color:'white',
      backgroundColor:'#14161a',
      minHeight:'100vh'
  }
}))
const CoinEnter = () => {
  const classes =useStyles();
  return (
    <CryptoContext >

    <BrowserRouter>
    <div className={classes.CoinCurrency}>

    <Header />
    <Routes>
    <Route exact path='/' element={<Home />} />
    <Route exact path='/coin/:id' element={<CoinDetails />} />

    </Routes>
    </div>
    </BrowserRouter>
    </CryptoContext>
  )
}

export default CoinEnter