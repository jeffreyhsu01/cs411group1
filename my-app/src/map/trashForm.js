import React, { useState } from 'react';//
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

export default function TrashForm(props) {
    const [trashList, , setTrashList] = useState([
        {"id":"can", "name": "Cans", "count": 0},
        {"id":"cigarette", "name": "Cigarettes", "count": 0},
        {"id":"needle", "name": "Medical", "count": 0},
        {"id":"facemask", "name": "Face Masks", "count": 0},
        {"id":"sodaBottle", "name": "Plastic Bottles", "count": 0},
        {"id":"wineBottle", "name": "Glass Bottles", "count": 0},
        {"id":"food", "name": "Food", "count": 0},
        {"id":"plasticbag", "name": "To-Go Bags", "count": 0},
        {"id":"nail", "name": "Nails", "count": 0},
    ])
    props.getTrash(trashList);

  return (
    <div>
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
        <Box style={{backgroundColor: "#ABBBDF",paddingTop:10, paddingBottom:10, width:250, borderRadius:20}}>
        </Box>
        </div>
        <div style={{height:10}}></div>
        <div style={{textAlign:'center', backgroundColor:'#ABBBDF', borderRadius:40}}>
            <h2 style={{paddingTop:20,marginBottom:20}}>Collected Trash Form!</h2>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {trashList.map((item, index) => (
                    <Grid item xs={2} sm={4} md={4} key={item.id}>
                        <h4>{item.name}</h4>
                        <img src={item.img} style={{width:100}} />
                        <div></div>
                        <div style={{textAlign:'center', display:'inline-flex'}}>
                            <p style={{margin:10}} >{item.count}</p>
                        </div>
                    </Grid>
                ))}
                </Grid>
            </Box>
            <div style={{paddingBottom:50}}></div>
        </div>
    </div>
  );
}