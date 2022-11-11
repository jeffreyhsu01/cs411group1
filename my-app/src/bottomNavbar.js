import React from "react";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

const BottomNavbar = () => {
    return (
        <Box sx={{ flexGrow: 1, height: '70px', bgcolor: "#355598", position:'fixed', bottom: 0, width:'calc(100%)' }} position="static" >
            <Toolbar style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                {/* <img src={logo} style={{width:98, marginTop:-13}} /> */}
                {/* <img src={logo} style={{width:300, marginTop: -110, transform:`rotate(${7}deg)`}} /> */}
                {/* <img src={logo} style={{width:170, marginTop: -75}} /> */}
            </Toolbar>
        </Box>
	);
};
export default BottomNavbar;
