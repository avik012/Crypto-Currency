import React, { useEffect, useState } from 'react'
import { CryptoState } from '../CoinContext/CryptoContext'
import axios from 'axios';
import { CoinList } from '../config/api';
import { Container, LinearProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography, createTheme, makeStyles } from '@material-ui/core';
import { Navigate, useNavigate } from 'react-router-dom';
import { numberWithCommas } from './Carousel';
import { Pagination } from '@material-ui/lab';

const useStyles = makeStyles(()=>({
    row: {
      backgroundColor:'#16171a',
      cursor:'pointer',
      "&:hover":{
        backgroundColor:"#131111"
      }
    },
    pagination:{
      "& .MuiPaginationItem-root" :{color:'gold'}
    }
  }))
const CoinTable = () => {
    const {currency, symbol}=CryptoState();
    const [coin, setCoin] = useState([]);
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const classes = useStyles()
    const navigate = useNavigate();

    const fetchCoins = async ()=>{
        setLoading(true)
        const {data} = await axios.get(CoinList(currency));
        setCoin(data)
        setLoading(false);

    }
    useEffect(() => {
      fetchCoins();
    }, [currency])
    
    const darkTheme = createTheme({
        palette:{
            primary:{
                main:'#fff'
            },
            type:'dark'
        }
       })

       const handleSearch = ()=>{
        return coin.filter(item=> item.symbol.toLowerCase().includes(search) ||
        item.name.toLowerCase().includes(search)
        )
       }

  return (
    <ThemeProvider theme={darkTheme}>
        <Container style={{textAlign:'center'}} >
            <Typography
            variant='h4'
            style={{margin:18,fontFamily:'MontSerrat'}}
            >
                Cryptocurrency Prices by Market Cap
            </Typography>
            <TextField label='Search For a Crypto Currency' 
            variant='outlined'
            style={{marginBottom:20,width:'100%'}} 
            />
            <TableContainer >
                {
                    loading ? (
                        <LinearProgress style={{backgroundColor:'gold'}} />
                    ):(
                        <Table>
                            <TableHead style={{backgroundColor:"#EEBC1D"}}>
                                <TableRow>
                                    {['Coin','Price','24h Change','Market Cap'].map(head=>(
                                        <TableCell
                                        style={{color:'black',fontWeight:700}}
                                        align={head === 'Coin' ? '': 'right'}
                                        >
                                            {head}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {handleSearch().slice((page-1)*10, (page-1)*10+10).map(row=>{
                                    const profit = row.price_change_percentage_24h >=0;
                                    
                                    return (
                                        <TableRow
                                        className={classes.row}
                                        key={row.name}
                                        onClick={()=>navigate(`/coin/${row.id}`)}
                                        >
                                            <TableCell
                                            component="th"
                                            scope='row'
                                            style={{
                                                display:'flex',
                                                gap:15
                                            }}
                                            >
                                                <img 
                                                src={row?.image}
                                                alt={row?.name}
                                                height={50}
                                                style={{marginBottom:10}}
                                                />
                                                <div style={{display:'flex',flexDirection:"column",}}>
                                                    <span style={{textTransform:'uppercase',fontSize:22}}>
                                                        {row.symbol}
                                                    </span>
                                                    <span style={{color:'darkgray'}}>
                                                        {row.name}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell align='right'>
                                                {numberWithCommas(row.current_price.toFixed(2))}
                                            </TableCell>
                                            <TableCell align='right' style={{color: profit ? "rgb(14,203,129)":"red", fontWeight:500}}>
                                                {profit && '+'}{ row?.price_change_percentage_24h?.toFixed(2)}%
                                            </TableCell>
                                            <TableCell align='right'>
                                                {symbol}{' '}{numberWithCommas(row.market_cap.toString().slice(0,-6))}M
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    )
                }
            </TableContainer>

        <Pagination
        style={{
            padding:20,
            width:'100%',
            display:'flex',
            justifyContent:'center'
        }}
        classes={{ul:classes.pagination}}
        count={(handleSearch()?.length/10).toFixed(0)}
        onChange = {(_,value)=>{
            setPage(value)
            window.scroll(0,450)
        }}
        />
        </Container>
    </ThemeProvider>
  )
}

export default CoinTable