import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { TrendingCoins } from '../config/api'
import { makeStyles } from '@material-ui/core'
import { CryptoState } from '../CoinContext/CryptoContext'
import 'react-alice-carousel/lib/alice-carousel.css';
import AliceCarousel from 'react-alice-carousel'
import { Link } from 'react-router-dom'


const useStyles = makeStyles(()=>({
    bannerContent: {
      height:'50%',
      display:'flex',
      alignItems:'center'
    },
    carouselItems:{
      display:'flex',
      flexDirection:'column',
      alignItems:'center',
      cursor:'pointer',
      color:'white',
      textTransform:'uppercase'
    }
  }))

  export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
const Carousel = () => {
    const classes = useStyles();
    const [trending, setTrending] = useState([]);
    const {currency,symbol}=CryptoState();

    const fetchTendingsCoin = async()=>{
      try {
        const {data} = await axios.get(TrendingCoins(currency))
        setTrending(data)
            
        } catch (error) {
            console.log('Error', error)
        }
    }
    useEffect(() => {
      fetchTendingsCoin();
      // eslint-disable-next-line
    }, [currency])

    const responsive = {
      0:{
        items:2
      },
      512:{
        items:4
      }
    }
    const items = trending.map(coin=>{
      let profit = coin.price_change_percentage_24h >=0
      return (<Link className={classes.carouselItems} to={`/coin/${coin.id}`}>
        <img src={coin?.image} alt={coin.name} height={80}
        style={{marginBottom: 10}} />
        <span>
          {coin.symbol}
          &nbsp;
          <span style={{color: profit ? "rgb(14,203,129)":"red", fontWeight:500}}
          >{profit && '+'}{ coin?.price_change_percentage_24h?.toFixed(2)}%</span>
        </span>
        <span style={{fontSize:22,fontWeight:500}}>
          {symbol}{numberWithCommas(coin?.current_price.toFixed(2))}
        </span>
      </Link>)
})
    
  return (
    <div className={classes.bannerContent}>
        <AliceCarousel
        mouseTracking
        infinite
        responsive={responsive}
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        autoPlay
        items={items}
        />
    </div>
  )
}

export default Carousel