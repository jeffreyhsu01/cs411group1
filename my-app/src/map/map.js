import * as React from 'react';
import {useState, useMemo, useEffect} from 'react';
import Map, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl
} from 'react-map-gl';
import firebase from '../firebase/firebase';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Search from './search.js';
import '../map/map.css'
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import BottomNavbar from '../bottomNavbar.js';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Grid from '@mui/material/Grid';
import {useNavigate} from 'react-router-dom';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

import { getAuth, signInWithPopup,  GoogleAuthProvider } from "firebase/auth";



const TOKEN = 'pk.eyJ1IjoiY2hyaXN0aWFudG1hcmsiLCJhIjoiY2wwNXQ4aDM0MGNydzNpcWo4dWY5MGJkeSJ9.YTP08GGbccsCzCripTYICw'; // Set your mapbox token here

export default function MapComponent() {
  const [openIntroPopup, setOpenIntroPopup] = useState(true);
  const handleCloseIntroPopup = () => {
    turnOnLocation()
    setOpenIntroPopup(false);
  };
  const [beachPopup, setBeachPopup] = useState(null);
  const [beaches, setBeaches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userLocation, setUserLocation] = useState({});
  const { search } = window.location;

  
  
  
  // first thing that pops up when user first enter the app

  
  
  const [activeStep, setActiveStep] = React.useState(0);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const turnOnLocation = () => {
    if (navigator.geolocation) {
      alert('GeoLocation is Available!');
    } else {
      alert('Please try again to enable location!');
      turnOnLocation();
    }
  };

  // display beaches
  const filterBeaches = (beaches, query) => {
      if (!query) {
          return beaches;
      }
      return beaches.filter((beach) => {
          const beachName = beach.name.toLowerCase();
          return beachName.includes(query.toLowerCase());
      });
  };

  // search for beaches
  const query = new URLSearchParams(search).get('s'); 
  const [searchQuery, setSearchQuery] = useState(query || '');
  const filteredBeaches = filterBeaches(beaches, searchQuery);

  // check location before entering
  const navigate = useNavigate();
  const [here,setHere] = useState(false);
  const [check,setCheck] = useState(true);
  const [started,setStarted] = useState(false);
  async function getUserLocation(beach) {
    setBeachPopup(beach)
    const beachData = await firebase.firestore().collection("beaches_MA_array_temp").where('id', '==', beach.id).get();
    const fbeachData = beachData.docs[0].data();
    navigator.geolocation.getCurrentPosition((pos) => {
      const lat_max = fbeachData.boundry[0]+.01;
      const lat_min = fbeachData.boundry[0]-.01;
      const long_max = fbeachData.boundry[1]+.01;
      const long_min = fbeachData.boundry[1]-.01;
      if (!((pos.coords.latitude >= lat_min && pos.coords.latitude <= lat_max) && (pos.coords.longitude >= long_min && pos.coords.longitude <= long_max))) {
        setCheck(false);
        handleClickOpen()
      } else {
        setHere(false);
        setCheck(true);
        setStarted(false);
      }
      setHere(true);
    });
    if (here) {
      window.clearTimeout(checkLocation)
      return check;
    }
  }
  async function checkLocation() {
    setStarted(true);
    if(here === false && check == false && started == true) {
      window.setTimeout(checkLocation, 1000);
    }
  }
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setHere(false);
    setCheck(true);
    setStarted(false);
    setOpen(false);
  };


  useEffect(() => {
		const getBeaches = async () => {
      setLoading(true);
      const beachesRef = await firebase.firestore().collection("beaches_MA_demo_updates");
      await beachesRef.onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        })
        setBeaches(items);
        setLoading(false);
      })
    }
    getBeaches();
	}, []);
  console.log(beaches)

  var today = new Date();
  var weekAgo = new Date(today.getFullYear(), today.getMonth(), today.getDate()-7);
  var monthAgo = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
  weekAgo = weekAgo.getTime() / 1000
  monthAgo = monthAgo.getTime() / 1000

  const pins = useMemo(
    () => 
      beaches.map((beach, index) => (
        <Marker
            key={`marker-${index}`}
            longitude={beach.coordinate.longitude}
            latitude={beach.coordinate.latitude}
            anchor="bottom"
            color='#3FB1CE'
            onClick={() => setBeachPopup(beach)}
        >
        </Marker>
    )), [beaches]
  );

  function convertTime(time) {
    var newDate = new Date(time*1000);
    return newDate
  }


  if (loading || beaches.toString() === "[]") {
    return "Loading..."
  }

  
  return (
      <div style={{maxHeight:'calc(100vh)'}}>
        {/* first thing that pops up when user first enter the app */}
      
        {/* Map */}
        <Box sx={{ flexGrow: 1, height: '85px', bgcolor: "#355598" }} position="static" >
          <Toolbar disableGutters>
              <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
              {window.innerWidth <= 760 ?
                <ul>
                  {filteredBeaches.slice(0, 1).map((beach) => (
                      <Button style={{borderRadius: 10,backgroundColor: "#FFF1CA", margin: 5}} onClick={()=>{getUserLocation(beach); checkLocation()}}>
                        {beach.name}
                      </Button>
                  ))}
                </ul> :
                <ul>
                  {filteredBeaches.slice(0, 5).map((beach) => (
                      <Button style={{borderRadius: 10,backgroundColor: "#FFF1CA", margin: 5}} onClick={()=>{getUserLocation(beach); checkLocation()}}>
                        {beach.name}
                      </Button>
                  ))}
                </ul>
              }
          </Toolbar>
        </Box>
        <Map
          initialViewState={{
              longitude: -71.01,
              latitude: 42.35,
              zoom: 10
          }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          mapboxAccessToken={TOKEN}
          style={{height: 'calc(100vh - 85px - 70px)'}}
        >
          {/* Display user's current locatiom */}
          <GeolocateControl
            position="top-left"
            positionOptions={{ enableHighAccuracy: true }}
            showUserLocation={true}
            onGeolocate={(PositionOptions) => {
              setUserLocation({
                ...userLocation,
                latitude: PositionOptions["coords"].latitude,
                longitude: PositionOptions["coords"].longitude,
              });
            }}
          />
          <FullscreenControl position="top-left" />
          <NavigationControl position="top-left" />
          <ScaleControl />

          {pins}

          {beachPopup && (
            <Popup
              anchor="top"
              longitude={Number(beachPopup.coordinate._long)}
              latitude={Number(beachPopup.coordinate._lat)}
              closeOnClick={false}
              onClose={() => setBeachPopup(null)}
            >
              <div style={{backgroundColor:"#355598", borderRadius:20, padding:10, maxWidth:180}}>
                  <h2 style={{paddingBottom: 10, color:"#ffffff"}}> {beachPopup.name} </h2>
                  <img width="100%" src={beachPopup.photoURL} padding="10" />
                  <div style={{textAlign: 'left', color:"#ffffff", paddingBottom: 10}}> <b>Last cleaned:</b> {convertTime(beachPopup.lastCleaned.seconds).toString().substring(0,15)} </div>
                  <div style={{textAlign: 'left', color:"#ffffff", paddingBottom: 20}}> <b>Marine Life:</b> { beachPopup.marineLife } </div>

              <div>
                <div> 
                    <Button onClick={()=>{getUserLocation(beachPopup); checkLocation()}} style={{marginBottom: 15, backgroundColor:'#355598', border:"2px white solid",}} variant="contained" >Get Cleaning!</Button>
                    {
                      started ?
                        <div className="rotate">
                        </div>
                      : <div></div>
                    }
                </div>
                <div>

                {/* open alert if not in region */}
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                  PaperProps={{style:{borderRadius: 20, maxWidth: 400} }}
                >
                  <DialogContent>
                    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                      <h1 style={{color:"#355598", marginBottom:10}}>Whoa there Buddy,</h1>
                    </div>
                    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                      <p style={{color:"#355598", marginBottom:10, fontSize:20}}>You're not on {beachPopup.name}, wya?</p>
                    </div>
                    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                      <Button style={{color:"#355598", textTransform:'none', fontSize:20}} onClick={handleClose}>I'm heading to the beach!</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>





              </div>
            </Popup>
          )}
        </Map>

        <BottomNavbar></BottomNavbar>
      </div>
  );
}