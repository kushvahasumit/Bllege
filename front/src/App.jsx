import { Routes,Route, Navigate } from "react-router-dom";
import SignupPage from "./pages/SignUp";
import Login from "./pages/Login";
import Emailverification from "./pages/EmailVerification";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";

//redirect user to home 
const RedirectAuthenticatedUser = ({children}) => {
  const {isAuthenticated, user} = useAuthStore();

  if (isAuthenticated && user.isVerified) {
    return <Navigate to="/" replace />;
  }

  return children;
}

//protect route for authentication
const ProtectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated ) {
    return <Navigate to="/login" replace />;
  }

  if(!user.isVerified){
    return <Navigate to="/email-verification" replace />
  }

  return children;
};


function App() {
  const { isCheckAuthenticated, checkUserAuth ,user, isAuthenticated} = useAuthStore();

  useEffect(()=>{
    checkUserAuth();
  },[checkUserAuth]);

  console.log("isAUth", isAuthenticated);
  console.log("isCheckAUth", isCheckAuthenticated);
  console.log("user", user);


  return (
    <div className=" bg-slate text-black overflow-hidden">
      <Routes>
        <Route path="/" element={"home"} />
        <Route
          path="/sign-up"
          element={
            <RedirectAuthenticatedUser>
              <SignupPage />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path="/login"
          element={
            <RedirectAuthenticatedUser>
              <Login />
            </RedirectAuthenticatedUser>
          }
        />
        <Route path="/email-verification" element={
          <ProtectAuthenticatedUser>
            <Emailverification />
          </ProtectAuthenticatedUser>
        } />
      </Routes>
    </div>
  );
}

export default App;
