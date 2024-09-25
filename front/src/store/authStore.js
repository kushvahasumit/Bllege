import {create} from 'zustand'; //state management lib
import axios from 'axios'; // avoide the use of fetch for making api call

const API_URL = "http://localhost:5000";

axios.defaults.withCredentials = true;
export const useAuthStore = create((set)=> ({
    user:null,
    isAuthenticated:false,
    error:null,
    isLoading:false,
    isCheckAuthenticated:true, //is user authenticated to show either signup or signin

    signUp: async (email,password)=>{
        set({isLoading:true, error:null});
        try {
            const response = await axios.post(`${API_URL}/api/auth/signup`,{email,password});
            console.log(response);
            set({user:response.user, isAuthenticated: true, isLoading: false});u
        } catch (error) {
            set({error: error.response.data.message || "Error signing up" , isLoading: false});
            throw error;
        }
    }
}))
