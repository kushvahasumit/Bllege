import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function SignupForm() {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(email),
        console.log(password)
    }
  return (
    <div className="w-full h-full flex items-center justify-center ">
      <form className="p-4 max-w-sm w-full">
        <h2 className="text-3xl font-bold mb-6">Sign Up for Bllege</h2>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="shadow appearance-none border border-stone-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            // placeholder="Enter your email"
            value={email}
            onChange={(e)=> setEmail(e.target.value)}

          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="shadow appearance-none  border border-stone-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            // placeholder="Enter your password"
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-black hover:bg-zinc-900 text-white  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            type="button"
            onClick={handleSubmit}
          >
            Sign Up
          </button>
        </div>
        <div>
            <p className="text-stone-400 text-xs mt-6">By creating an account, you agree to our <u> Terms </u> & <u> Privacy Policy</u> !</p>
        </div>
        <div className="border border-solid border-stone-200 mt-3" />
        <div className="flex items-center justify-center mt-1">
            <p>Already a member? <strong> <Link to={"/login"} className="hover:underline">Sign in</Link> </strong> </p>
        </div>
        
      </form>
    </div>
  );
}

function ImageCarousel() {
  const images = [
    "https://images.unsplash.com/photo-1496449903678-68ddcb189a24?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.pexels.com/photos/27034673/pexels-photo-27034673/free-photo-of-a-fox-sitting-behind-the-grass-on-a-meadow.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.unsplash.com/photo-1593642634443-44adaa06623a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fG1vdW50YWlufGVufDB8fHx8MTY1MjE5NjUwOQ&ixlib=rb-1.2.1&q=80&w=400",
    "https://plus.unsplash.com/premium_photo-1682125196952-a37ba95ee650?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Automatically change the image every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [images.length]);

  // Handler to click on a dot and set image
  const handleDotClick = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="w-full h-full flex flex-col relative items-start bg-blue-300 ">
      

      {/* Dots navigation below image*/}
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

function SignupPage() {
  return (
    <div className="h-screen flex">
      {/* Left side - Signup form */}
      <div className="w-full">
        <SignupForm />
      </div>

      {/* Right side - Image carousel */}
      <div className="w-2/3 hidden sm:hidden md:block">
        <ImageCarousel />
      </div>
    </div>
  );
}

export default SignupPage;
