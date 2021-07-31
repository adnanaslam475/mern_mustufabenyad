import React, { useEffect, useState } from 'react';
import {
    Table, TableHead, TableBody, TableCell, makeStyles,
    TableContainer, TableRow, Paper
} from '@material-ui/core';
import moment from 'moment'
import axios from 'axios';

const useStyles = makeStyles({
    table: {
        minWidth: '80%',
        maxWidth: '80%',
        margin: '5%'
    },
});
const Myhotels = () => {
    const classes = useStyles();

    const token = localStorage.getItem('auth');
    const t = JSON.parse(token);
    const [err, setErr] = useState('')
    const [myhotels, setMyHotels] = useState([]);


    useEffect(() => {
        axios.get(`http://localhost:8000/api/seller-hotels`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${t.token}`
            }
        }).then(res => {
            setMyHotels(res.data)
            console.log('res', res.data);
        }).catch(err => {
            console.log('err19==>', err);
            setErr('network Error')
        })
    }, [])

    return (
        <div>
            <TableContainer component={Paper} className={classes.table}>
                <h2 style={{ alignSelf: 'center' }}> My Hotels</h2>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Title</TableCell>
                            <TableCell align="center">Bed</TableCell>
                            <TableCell align="center">From</TableCell>
                            <TableCell align="center">To</TableCell>
                            <TableCell align="center">Price</TableCell>
                            <TableCell align="center">Image</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {myhotels.map((row, i) => (
                            <TableRow key={row.name}>
                                <TableCell component="th" scope="row">
                                    {row.title}
                                </TableCell>
                                <TableCell align="center">{row.bed}</TableCell>
                                <TableCell align="center">{moment(row.from).format('DD-MM-yyyy')}</TableCell>
                                <TableCell align="center">{moment(row.to).format('DD-MM-yyyy')}</TableCell>
                                <TableCell align="center">{row.price}</TableCell>
                                <TableCell align="center"><img style={{
                                    width: '100px',
                                    height: '100px'
                                }} src={row.image} /></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </div>
    )
}

export default Myhotels
