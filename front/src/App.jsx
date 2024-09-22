import { Routes,Route } from "react-router-dom";

import SignupPage from "./pages/SignUp";

function App() {
  return (
    <div className=" bg-slate text-black overflow-hidden">
      <Routes>
        <Route path="/" element={"home"} />
        <Route path="/sign-up" element={<SignupPage />} />
      </Routes>
      
    </div>
  );
}

export default App;
