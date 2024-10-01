import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import SignupPage from "./pages/SignUp";
import Login from "./pages/Login";
import Emailverification from "./pages/EmailVerification";
import { useAuthStore } from "./store/authStore";
import { useEffect,useState } from "react";
import Dashboard from "./pages/Dashboard";
import LoadingSpinner from "./pages/LoadingSpinner";
import ForgetPassword from "./pages/ForgetPassword";
import Resetpass from "./pages/Resetpass";

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

function ImageCarousel() {
  const images = [
    "https://images.unsplash.com/photo-1496449903678-68ddcb189a24?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.pexels.com/photos/27034673/pexels-photo-27034673/free-photo-of-a-fox-sitting-behind-the-grass-on-a-meadow.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.unsplash.com/photo-1593642634443-44adaa06623a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fG1vdW50YWlufGVufDB8fHx8MTY1MjE5NjUwOQ&ixlib=rb-1.2.1&q=80&w=400",
    "https://plus.unsplash.com/premium_photo-1682125196952-a37ba95ee650?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  const handleDotClick = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="w-full h-full flex flex-col relative items-start bg-blue-300 ">
      <div className="flex absolute m-20 space-x-2">
        {images.map((_, index) => (
          <span
            key={index}
            className={`h-3 w-3 rounded-full cursor-pointer ${
              index === currentImageIndex ? "bg-white" : "bg-gray-500"
            }`}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>

      <img
        src={images[currentImageIndex]}
        alt="carousel"
        className="object-cover w-full h-full"
      />
    </div>
  );
}


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
    <div className="h-screen flex bg-offWhite text-black overflow-hidden">
      <div className="w-full">
        <Routes>
          <Route path="/" element={<Dashboard />} />
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
