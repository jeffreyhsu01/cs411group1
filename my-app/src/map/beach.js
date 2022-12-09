import * as React from 'react';
import {useState} from 'react';
import { useLocation } from 'react-router-dom';
import "../index.css";
import TrashForm from './trashForm';

export default function Beach() {
  const location = useLocation();
  const selectedBeach = location.state.selectedBeach;
  console.log(selectedBeach)
  const [trashList, setTrashList] = useState([]);
  const getTrash = (data) => {
    setTrashList(data);
  }

  return (
    <div style={{textAlign:'center',backgroundColor: "#35559B", height:'calc(222vh)'}}>
        <h1 style={{paddingTop:30}}>{selectedBeach.name}</h1>
        <div>
          <TrashForm getTrash={getTrash}></TrashForm>
        </div>
    </div>
  );
}
