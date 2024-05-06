import { AppBar, Container, MenuItem, Select, ThemeProvider, Toolbar, Typography, createTheme, makeStyles } from '@material-ui/core'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { CryptoState } from '../CoinContext/CryptoContext';

const useStyles = makeStyles(()=>({
    title:{
        flex: 1,
        color:'gold',
        fontFamily:'MontSerrat',
        fontWeight:"bold",
        cursor:'pointer'
    }
}))
const Header = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const {currency, setCurrency} = CryptoState();

   const darkTheme = createTheme({
    palette:{
        primary:{
            main:'#fff'
        },
        type:'dark'
    }
   })
  return (
        <ThemeProvider theme={darkTheme}>
      <AppBar color='transparent' position='static' >
        <Container>
            <Toolbar>
                <Typography variant={'h6'} onClick = {()=>navigate('/')} className={classes.title}>Crypto Hunter</Typography>
            <Select variant='outlined'
            onChange={(e)=>{setCurrency(e.target.value)}}
            value={currency}
            style={{
                width:100,
                height:40,
                marginRight: 15
            }}>
                <MenuItem value={'INR'}>INR</MenuItem>
                <MenuItem value={'USD'}>USD</MenuItem>
            </Select>
                </Toolbar>
        </Container>
    </AppBar>

        </ThemeProvider>
  )
}

export default Header