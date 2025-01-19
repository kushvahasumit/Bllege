import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import { ToastContainer } from "react-toastify";
import { Suspense, lazy } from "react";

// Lazy load components
const SignupPage = lazy(() => import("./pages/authpages/SignUp"));
const Login = lazy(() => import("./pages/authpages/Login"));
const EmailVerification = lazy(() =>
  import("./pages/authpages/EmailVerification")
);
const Dashboard = lazy(() => import("./pages/Dashboard"));
const ForgetPassword = lazy(() => import("./pages/authpages/ForgetPassword"));
const Resetpass = lazy(() => import("./pages/authpages/Resetpass"));
const ImageCarousel = lazy(() => import("./components/ImageCarousel"));
const Feed = lazy(() => import("./pages/dashboardPages/Feed"));
const Trending = lazy(() => import("./pages/dashboardPages/Trending"));
const AllChannels = lazy(() => import("./pages/dashboardPages/AllChannels"));
const FeaturedContents = lazy(() =>
  import("./pages/dashboardPages/FeaturedContents")
);
const MyCollege = lazy(() => import("./pages/dashboardPages/MyCollege"));
const Polls = lazy(() => import("./pages/dashboardPages/Polls"));
const CreatePost = lazy(() => import("./pages/CreatePost"));
const SectionPost = lazy(() => import("./pages/dashboardPages/SectionPost"));
const ChatRoom = lazy(() => import("./pages/dashboardPages/ChatRoom"));
const Faq = lazy(() => import("./pages/Faq"));
const Placement = lazy(() => import("./pages/navPages/Placement"));
const Review = lazy(() => import("./pages/navPages/Review"));
const Trends = lazy(() => import("./pages/navPages/Trends"));
import Nav from "./pages/Nav";
const CommentPage = lazy(() => import("./pages/dashboardPages/CommentPage"));
const MyPost = lazy(() => import("./pages/dashboardPages/MyPost"));
const PopupCard = lazy( () => import("./components/PopupCard") );

const authRoutes = [
  "/sign-up",
  "/login",
  "/forget-password",
  "/email-verification",
  "/reset-password/:token",
];

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

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user?.isVerified) {
    return <Navigate to="/email-verification" replace />;
  }

  return children;
};

function App() {
  const { isCheckAuthenticated, checkUserAuth, user, isAuthenticated, logOut } =
    useAuthStore();
  const location = useLocation();

  useEffect(() => {
    checkUserAuth(); // Check authentication on app load
  }, [checkUserAuth]);

  // if (isCheckAuthenticated) return <LoadingSpinner />;

  const isAuthRoute = authRoutes.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <div className="h-screen flex bg-offWhite text-black overflow-hidden">
      <div className="w-full">
        {!isAuthRoute && <Nav user={user} logOut={logOut} />}
        <ToastContainer
          autoClose={3000}
          hideProgressBar={true}
          closeOnClick
          draggable
          pauseOnHover
        />
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <Dashboard />
              </Suspense>
            }
          >
            <Route
              index
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <Feed />
                </Suspense>
              }
            />
            <Route
              path="feed"
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <Feed />
                </Suspense>
              }
            />
            <Route
              path="mycollege"
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <MyCollege />
                </Suspense>
              }
            />
            <Route
              path="chik-chat"
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <ChatRoom />
                </Suspense>
              }
            />
            <Route
              path="polls"
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <Polls />
                </Suspense>
              }
            />
            <Route
              path="channels"
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <AllChannels />
                </Suspense>
              }
            />
            <Route
              path="featuredcontent"
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <FeaturedContents />
                </Suspense>
              }
            />
            <Route
              path="trending"
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <Trending />
                </Suspense>
              }
            />
            <Route
              path="createpost"
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <CreatePost />
                </Suspense>
              }
            />
            <Route
              path="/:sectionhead/:section"
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <SectionPost />
                </Suspense>
              }
            />
            <Route
              path="why-bllege-blog-carrer-news-faq"
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <Faq />
                </Suspense>
              }
            />
            <Route
              path="post/:postId/comment"
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <CommentPage />
                </Suspense>
              }
            />
            <Route
              path="myprofile/activity/post"
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <MyPost />
                </Suspense>
              }
            />
          </Route>
          <Route
            path="/placements"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <Placement />
              </Suspense>
            }
          />
          <Route
            path="/reviews"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <Review />
              </Suspense>
            }
          />
          <Route
            path="/trends"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <Trends />
              </Suspense>
            }
          />
          <Route
            path="/sign-up"
            element={
              <RedirectAuthenticatedUser>
                <Suspense fallback={<LoadingSpinner />}>
                  <SignupPage />
                </Suspense>
              </RedirectAuthenticatedUser>
            }
          />
          <Route
            path="/login"
            element={
              <RedirectAuthenticatedUser>
                <Suspense fallback={<LoadingSpinner />}>
                  <Login />
                </Suspense>
              </RedirectAuthenticatedUser>
            }
          />
          <Route
            path="/email-verification"
            element={
              <ProtectAuthenticatedUser>
                <Suspense fallback={<LoadingSpinner />}>
                  <EmailVerification />
                </Suspense>
              </ProtectAuthenticatedUser>
            }
          />
          <Route
            path="/forget-password"
            element={
              <RedirectAuthenticatedUser>
                <Suspense fallback={<LoadingSpinner />}>
                  <ForgetPassword />
                </Suspense>
              </RedirectAuthenticatedUser>
            }
          />
          <Route
            path="/reset-password/:token"
            element={
              <RedirectAuthenticatedUser>
                <Suspense fallback={<LoadingSpinner />}>
                  <Resetpass />
                </Suspense>
              </RedirectAuthenticatedUser>
            }
          />
        </Routes>
      </div>



      {isAuthRoute && (
        <div className="w-2/3 hidden sm:hidden md:block">
          <Suspense fallback={<div>Loading Image Carousel...</div>}>
            <ImageCarousel />
          </Suspense>
        </div>
      )}
    </div>
  );
}

export default App;
