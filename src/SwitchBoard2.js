import React, { useState } from "react";
import Switch from '@mui/material/Switch';

export default function SwitchBoard2({content,setContent,onToggle,onDelete}) {

  const [checked1, setChecked1] = useState(content.switch1);
  const [checked2, setChecked2] = useState(content.switch2);
  const [checked3, setChecked3] = useState(content.switch3);
  const [checked4, setChecked4] = useState(content.switch4);

  const label = { inputProps: { 'aria-label': 'Switch demo' } };

  const resetState = () => {
    console.log("reset is called");
    setChecked1(content.switch1);
    setChecked2(content.switch2);
    setChecked3(content.switch3);
    setChecked4(content.switch4);
  };
  const handleChange = (event,switch_number) => {
    console.log(event.target.checked,switch_number);
    if(switch_number===1){
        setChecked1(event.target.checked);
      } else if(switch_number===2){
        setChecked2(event.target.checked);
      } else if(switch_number===3){
        setChecked3(event.target.checked);
      } else{
        setChecked4(event.target.checked);
      }
  }
  
  return (

    <div>
    <button onClick={resetState}>hey</button>
    <h1>SwitchBoard</h1>
    <h2>Id: {content.id}</h2>
    <h2>Switch 1 value:
    <Switch
      checked={checked1}
      onChange={(event)=>{handleChange(event,1)}}
      color="secondary"
      inputProps={{ 'aria-label': 'controlled' }}
    />
    </h2>
    <h2>Switch 2 value:
    <Switch
      checked={checked2}
      onChange={(event)=>{handleChange(event,2)}}
      color="secondary"
      inputProps={{ 'aria-label': 'controlled' }}
    />
    </h2>
    <h2>Switch 3 value:
    <Switch
      checked={checked3}
      onChange={(event)=>{handleChange(event,3)}}
      color="secondary"
      inputProps={{ 'aria-label': 'controlled' }}
    />
    </h2>
    <h2>Switch 4 value:
    <Switch
      checked={checked4}
      onChange={(event)=>{handleChange(event,4)}}
      color="secondary"
      inputProps={{ 'aria-label': 'controlled' }}
    />
    </h2>
    <button onClick={()=>onDelete(content)}>Delete</button>
    </div>
  )
}
