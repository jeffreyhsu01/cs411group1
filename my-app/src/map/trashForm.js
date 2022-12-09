import React, { useState } from 'react';//
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Can from '../map/can.svg';
import Button from '@mui/material/Button';

export default function TrashForm(props) {
    const [trashList, , setTrashList] = useState([
        {"id":"can", "name": "Cans", "count": 0, "img": Can},
        {"id":"cigarette", "name": "Cigarettes", "count": 0, "img": Can},
        {"id":"needle", "name": "Medical", "count": 0, "img": Can},
        {"id":"facemask", "name": "Face Masks", "count": 0, "img": Can},
        {"id":"sodaBottle", "name": "Plastic Bottles", "count": 0, "img": Can},
        {"id":"wineBottle", "name": "Glass Bottles", "count": 0, "img": Can},
        {"id":"food", "name": "Food", "count": 0, "img": Can},
        {"id":"plasticbag", "name": "To-Go Bags", "count": 0, "img": Can},
        {"id":"nail", "name": "Nails", "count": 0, "img": Can},
    ])
    props.getTrash(trashList);
    const [totalCount, setTotalCount] = useState(0)
    function removeItem(item) {
        if (item.count > 0) {
            item.count-=1
            setTrashList([...trashList]);
            setTotalCount(total)
        }
    }
    function addItem(item) {
        item.count+=1
        setTrashList([...trashList]);
        setTotalCount(total)
    }

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
                            <Button variant="outlined" style={{width:2}} onClick={() => {removeItem(item)}}></Button>
                            <p style={{margin:10}} >{item.count}</p>
                            <Button variant="outlined" style={{width:2}} onClick={() => {addItem(item)}}></Button>
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