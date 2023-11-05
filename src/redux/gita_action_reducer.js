import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


const initialState = {
    language : 'dv',
    field_chapter_value : 1,
    field_nsutra_value : 5,
    htrskd : {value:0 ,text: ""},
    httyn : {value:0 ,text: ""},
    htshg : {value:0 ,text: ""},
    scsh : {value:0 ,text: ""},
    hcchi : {value:0 ,text: ""},
    hcrskd : {value:0 ,text: ""},
    scang : {value:0 ,text: ""},
    scram : {value:0 ,text: ""},
    scanand : {value:0 ,text: ""},
    scjaya : {value:0 ,text: ""},
    scmad : {value:0 ,text: ""},
    scval : {value:0 ,text: ""},
    scms : {value:0 ,text: ""},
    scsri : {value:0 ,text: ""},
    scvv : {value:0 ,text: ""},
    scpur : {value:0 ,text: ""},
    scneel : {value:0 ,text: ""},
    scdhan : {value:0 ,text: ""},
    ecsiva : {value:0 ,text: ""},
    etsiva : {value:0 ,text: ""},
    etpurohit : {value:0 ,text: ""},
    etgb : {value:0 ,text: ""},
    setgb : {value:0 ,text: ""},
    etssa : {value:0 ,text: ""},
    etassa : {value:0 ,text: ""},
    etradi : {value:0 ,text: ""},
    etadi : {value:0 ,text: ""},
  };



  // fix all slok function



  const gitaSlice = createSlice({
    name : 'gitaSlice',
    initialState,
    reducers: {
        incrementSlok(state) {
            state.field_nsutra_value++;
            // To do 

        },

        decrementSlok(state) {
            state.field_nsutra_value--;
            // To do 
        },

        setSlok(state,{payload}) {
            console.log(payload);
            // To do 
        },
        
        setChapter(state,{payload}) {
            console.log(payload);
            // To do 
        },

        setTranslation(state,{payload}) {
            // payload will be array
            // console.log(payload);
            payload.map((item) => {
                // name = item.name;
                // console.log(state[name]);
                state[item.name].value = item.value ? 1 : 0;
                // console.log(state[item.name].value);
            })
            // console.log(state);
        },

    },
  })


  export const {incrementSlok,decrementSlok,setChapter,setSlok,setTranslation} = gitaSlice.actions;
  export default gitaSlice.reducer