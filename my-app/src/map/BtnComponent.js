import React, {useState,useEffect} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import firebase from '../firebase/firebase';

function BtnComponent(props) {
  const [trashList, setTrashList] = useState([]);
  const getTrash = (data) => {
    setTrashList(data);
  }
  const time = props.time;

    // --- check location ---
    async function getUserLocation() {
      const beachData = await firebase.firestore().collection("beaches_MA_array_temp").where('id', '==', props.beachInfo.id).get();
      const fbeachData = beachData.docs[0].data();
      navigator.geolocation.getCurrentPosition((pos) => {
        const lat_max = fbeachData.boundry[0]+.01;
        const lat_min = fbeachData.boundry[0]-.01;
        const long_max = fbeachData.boundry[1]+.01;
        const long_min = fbeachData.boundry[1]-.01;
        if (!((pos.coords.latitude >= lat_min && pos.coords.latitude <= lat_max) && (pos.coords.longitude >= long_min && pos.coords.longitude <= long_max))) {
          handleClickOpen()
          document.getElementById("stopBtn").click();
        }
      });
    }
    const ms = 10000; // 1 minute: 60000, 10 seconds: 10000
    useEffect(() => {
      const interval = setInterval(() => {
        getUserLocation()
      }, ms);
      return () => clearInterval(interval);
    }, [])
      
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

  return (
    <div style={{background: "#35559B"}}>
      {(props.status === 0)? 
        <button className="stopwatch-btn stopwatch-btn-gre"
        onClick={props.start} style={{marginBottom:52}}>Start</button> : ""
      }

      {(props.status === 1)? 
        <div>
          <button className="stopwatch-btn stopwatch-btn-red" id="stopBtn"
                  onClick={props.stop}>Stop</button>
        </div> : ""
      }

     {(props.status === 2)? 
        <div>
          <button className="stopwatch-btn stopwatch-btn-gre"
                  onClick={props.resume}>Resume</button>
        </div> : ""
      }	

     <div> 
        {/* open alert if not in region */}
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          PaperProps={{style:{borderRadius: 20, maxWidth: 300} }}
        >
          <DialogContent>
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
              <h1 style={{color:"#355598", marginBottom:10}}>Whoa there Buddy,</h1>
            </div>
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
              <p style={{color:"#355598", marginBottom:10, fontSize:20}}>You're no longer on {props.beachInfo.name}, wya?</p>
            </div>
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
            </div>
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
              <Button style={{color:"#355598", textTransform:'none', fontSize:20}} onClick={handleClose}>I'm headed back</Button>
              <Button style={{color:"#355598", textTransform:'none', fontSize:20}} onClick={handleClose}>I left the beach</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default BtnComponent;