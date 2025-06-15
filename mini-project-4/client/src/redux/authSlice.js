import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"
let api=import.meta.env.VITE_API_URL

export const signupReducer= createAsyncThunk("auth/signup", async ()=>{
    try {
        const res= await axios.post(`${api}auth/signup`)
        return res.data
    } catch (error) {
        console.error(error)
    }
})
export const signinReducer= createAsyncThunk("auth/signin", async ()=>{
    try {
        const res= await axios.post(`${api}auth/signin`)
        localStorage.setItem("token", res.data.token)
        return res.data
    } catch (error) {
        console.error(error)
    }
})

const authSlice=createSlice({
    name:"auth",
    initialState:{
        user:null,
        token:localStorage.getItem("token")||null,
        loading: false,
        error:null,
    },
    reducers:{
        logout: (state)=>{
            state.user=null,
            state.token=null
            state.token=localStorage.removeItem("token")
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(signupReducer.pending, (state)=>{
            state.loading=true
            state.error=null
        })
        .addCase(signupReducer.fulfilled, (state, action)=>{
            state.loading=false
            state.user=action.payload.user
            state.token=action.payload.token
            localStorage.setItem("token", action.payload.token)
        })
        .addCase(signupReducer.rejected, (state, action)=>{
            state.loading=false
            state.error= action.payload?.message || "signup failed"
        })

        builder
        .addCase(signinReducer.pending, (state)=>{
            state.loading=true
            state.user=null
        })
        .addCase(signinReducer.fulfilled, (state, action)=>{
            state.loading=false
            state.user= action.payload.user
            state.token= action.payload.token
        })
        .addCase(signinReducer.rejected, (state, action)=>{
            state.loading=false
            state.error=action.payload?.message || "signin failed"
        })
    }
})

export const {logout}=authSlice.actions
export default authSlice.reducer