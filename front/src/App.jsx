import { Routes,Route } from "react-router-dom";

import SignupPage from "./pages/SignUp";
import Login from "./pages/Login";
import Emailverification from "./pages/EmailVerification";


function App() {
  return (
    <div className=" bg-slate text-black overflow-hidden">
      <Routes>
        <Route path="/" element={"home"} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/email-verification" element={<Emailverification />} />
      </Routes>
    </div>
  );
}

export default App;
