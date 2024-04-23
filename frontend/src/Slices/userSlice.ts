import { createSlice } from '@reduxjs/toolkit'
import type { Dispatch, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


export interface UserState {
    _id: string,
    name: string,
    email: string,

}

const initialState: UserState = {
    _id: "",
    name: "",
    email: "",
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    
    setUser: (state, action: PayloadAction<UserState>) => {
      state._id = action.payload._id
      state.name = action.payload.name
      state.email = action.payload.email
    },
    clearUser: (state) => {
        state._id = ""
        state.name = ""
        state.email = ""
    }
  },
})

// Action creators are generated for each case reducer function
export const { setUser , clearUser } = userSlice.actions


export const fetchUserData : any = () : any => async (dispatch: Dispatch<any>) => {
    try {
        // Call your API function to fetch user data
        const config ={
            headers:{
               'Content-Type':'application/json'
            },
            withCredentials:true
       }
        const {data} = await axios.get(`${BACKEND_URL}/api/user/getProfile`,config)
        const userData = data?.user;
        dispatch(setUser(userData));
    } catch (error) {
        // Handle error
        console.error('Error fetching user data:', error);
    }
};


export default userSlice.reducer