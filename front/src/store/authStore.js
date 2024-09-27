import {create} from 'zustand'; //state management lib
import axios from 'axios'; // avoide the use of fetch for making api call

const API_URL = "http://localhost:5000";

axios.defaults.withCredentials = true;
export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckAuthenticated: true, //is user authenticated to show either signup or signin

  signUp: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/api/auth/signup`, {
        email,
        password,
      });
      console.log(response);
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response.data.message || "Error signing up",
        isLoading: false,
      });
      throw error;
    }
  },

  logIn: async (email,password) =>{
    set({isLoading:true, error:null});

    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password,
      });
      console.log(response);
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response.data.message || "Error signing up",
        isLoading: false,
      });
      throw error;
    }
  },

  logOut: async ()=>{
    set({isLoading:true, error:null})
    try {
      await axios.post(`${API_URL}/api/auth/logout`);
      
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error:null
      });
    } catch (error) {
      set({error:"Server Error",isLoading:false});
      throw error;
    }
  },

  verificationEmail: async (emailCode) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/api/auth/verify-email`, {
        emailCode,
      });
      console.log("Emailverification response",response);
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response.data.message || "Wrong OTP or Server Error",
        isLoading: false,
      });
      throw error;
    }
  },

  checkUserAuth : async ()=>{
    await new Promise((r)=> setTimeout(r,2000));
    set({isCheckAuthenticated:true, error:null});
    try {
        const response = await axios.get(`${API_URL}/api/auth//check-auth`);
        console.log(response);
        set({
          user: response.data.user,
          isAuthenticated: true,
          isCheckAuthenticated:false,
        });
    } catch (error) {
        set({
          error: null,
          isCheckAuthenticated: false,
          isAuthenticated:false
        });
        throw error;
    }
  }
}));
