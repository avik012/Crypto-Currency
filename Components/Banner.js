import { Container, Typography, makeStyles } from '@material-ui/core'
import React from 'react'
import Carousel from './Carousel'

const useStyles = makeStyles(()=>({
  banner:{
      backgroundImage: 'url(./banner2.jpg)'
  },
  bannerContent: {
    height:400,
    display:'flex',
    flexDirection:'column',
    paddingTop:25,
    justifyContent:"space-around"
  },
  tagline:{
    display:'flex',
    flexDirection:'column',
    justifyContent:"center",
    height:'40%',
    textAlign:'center'
  }
}))
const Banner = () => {
const classes = useStyles()
  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContent}>
        <div className={classes.tagline}>
          <Typography 
          variant='h2'
          style={{
            fontWeight:'bold',
            marginBottom:15,
          }}
          >
            Crypto Hunter
          </Typography>
          <Typography 
          variant='subtitle2'
          style={{
            color:'darkgray',
            textTransform:"capitalize"
          }}
          >
            Get All The Info Regarding Your Favorite Crypto Currency
          </Typography>
        </div>
          <Carousel />

      </Container>
      
    </div>
  )
}

export default Banner