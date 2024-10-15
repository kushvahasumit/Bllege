import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import SignupPage from "./pages/authpages/SignUp";
import Login from "./pages/authpages/Login";
import EmailVerification from "./pages/authpages/EmailVerification";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import LoadingSpinner from "./components/LoadingSpinner";
import ForgetPassword from "./pages/authpages/ForgetPassword";
import Resetpass from "./pages/authpages/Resetpass";
import ImageCarousel from "./components/ImageCarousel";
import Feed from "./pages/dashboardPages/Feed";
import Trending from "./pages/dashboardPages/Trending";
import AllChannels from "./pages/dashboardPages/AllChannels";
import FeaturedContents from "./pages/dashboardPages/FeaturedContents";
import MyCollege from "./pages/dashboardPages/MyCollege";
import Polls from "./pages/dashboardPages/Polls";

// Redirect if the user is authenticated and verified
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user?.isVerified) {
    return <Navigate to="/" replace />;
  }

  return children;
};

// Protect route for authentication and verification
const ProtectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated but not verified, redirect to email verification
  if (!user?.isVerified) {
    return <Navigate to="/email-verification" replace />;
  }

  // If authenticated and verified, render the children
  return children;
};

function App() {
  const { isCheckAuthenticated, checkUserAuth, user, isAuthenticated } =
    useAuthStore();
  const location = useLocation();

  useEffect(() => {
    checkUserAuth(); // Check authentication on app load
  }, [checkUserAuth]);

  console.log("isAuthenticated:", isAuthenticated);
  console.log("isCheckAuthenticated:", isCheckAuthenticated);
  console.log("user:", user);

  if (isCheckAuthenticated) return <LoadingSpinner />;

  const shouldShowImageCarousel =
    (!isAuthenticated || !user?.isVerified) && location.pathname !== "/";

  return (
    <div className="h-screen flex bg-ofFwhite text-black overflow-hidden">
      <div className="w-full">
        <Routes>
          <Route path="/" element={<Dashboard />}>
            <Route path="feed" element={<Feed />} />
            <Route path="mycollege" element={<MyCollege />} />
            <Route path="polls" element={<Polls /> } />
            <Route path="channels" element={<AllChannels />} />
            <Route path="featuredcontent" element={<FeaturedContents />} />
            <Route path="trending" element={<Trending />} />
          </Route>

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
                <EmailVerification />
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

      {shouldShowImageCarousel && (
        <div className="w-2/3 hidden sm:hidden md:block">
          <ImageCarousel />
        </div>
      )}
    </div>
  );
}

export default App;
