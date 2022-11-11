import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    input: {
        background: "#ABBBDF",
        borderRadius: 10
    }
}));

function Search({ searchQuery, setSearchQuery }) {
    const classes = useStyles();
    return (
        <form action="/" method="get" style={{padding: 10}}>
            <TextField
                variant='outlined'
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon fontSize='large' sx={{ color:'#ffffff' }} />
                        </InputAdornment>
                    ),
                }}
                placeholder='Search for Beach'
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                inputProps={{style: {fontSize: 20, color: "#ffffff", fontWeight: 'bold'}}}
                className={classes.input}
            />
        </form>
    )
}

export default Search;