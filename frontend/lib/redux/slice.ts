import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import { RootState } from "./store"
import { IInitialState } from "./InitialState"

const initialState:IInitialState = {
    token:"",
    profile: null,
    recentTweets:null,
    topHashtags:null,
    topUsers:null
}

export const appSlice = createSlice({
    name:"tweeter clone",
    initialState,
    reducers:{
        setToken:(state,action:PayloadAction<string>)=>{
            const token = `Bearer ${action.payload}`;
            state.token = token;
        }
    }
})

export const {setToken} = appSlice.actions;
export default appSlice.reducer;