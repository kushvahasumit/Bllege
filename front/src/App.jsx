import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import SignupPage from "./pages/SignUp";
import Login from "./pages/Login";
import Emailverification from "./pages/EmailVerification";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import LoadingSpinner from "./pages/LoadingSpinner";
import ForgetPassword from "./pages/ForgetPassword";
import Resetpass from "./pages/Resetpass";
import ImageCarousel from "./pages/ImageCarousel";
import Feed from "./pages/dashboardPages/Feed";
import Trending from "./pages/dashboardPages/Trending";

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

  if (user.isVerified) {
    return <Navigate to="/" replace />;
  }

  return children;
};


function App() {
  const { isCheckAuthenticated, checkUserAuth ,user, isAuthenticated} = useAuthStore();
  const location = useLocation(); 
  useEffect(()=>{
    checkUserAuth();
  },[checkUserAuth]);

  console.log("isAUth", isAuthenticated);
  console.log("isCheckAUth", isCheckAuthenticated);
  console.log("user", user);

  if(isCheckAuthenticated) return <LoadingSpinner />;
  return (
    <div className="h-screen flex bg-ofFwhite text-black overflow-hidden">
      <div className="w-full">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="feed" element={
            <RedirectAuthenticatedUser>
                <Feed />
              </RedirectAuthenticatedUser>
            
            } />
          <Route path="trending" element={
            <RedirectAuthenticatedUser>
                <Trending />
              </RedirectAuthenticatedUser>
            } />
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
          <Route
            path="/email-verification"
            element={
              <ProtectAuthenticatedUser>
                <Emailverification />
              </ProtectAuthenticatedUser>
            }
          />

          <Route
            path="/forget-password"
            element={
              <RedirectAuthenticatedUser>
                <ForgetPassword />
              </RedirectAuthenticatedUser>
            }
          />

          <Route
            path="/reset-password/:token"
            element={
              <RedirectAuthenticatedUser>
                <Resetpass />
              </RedirectAuthenticatedUser>
            }
          />
        </Routes>
      </div>
      {location.pathname !== "/" && (
        <div className="w-2/3 hidden sm:hidden md:block">
          <ImageCarousel />
        </div>
      )}
    </div>
  );
}

export default App;
