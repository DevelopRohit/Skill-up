import { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import LoginModal from "./LoginModal";

const Layout = ({ children }) => {

  const [showLogin,setShowLogin]=useState(false);

  return(
    <>
    
    <Navbar openLogin={()=>setShowLogin(true)} />

    {children}

    <Footer/>

    {showLogin && (
      <LoginModal close={()=>setShowLogin(false)} />
    )}

    </>
  );
};

export default Layout;