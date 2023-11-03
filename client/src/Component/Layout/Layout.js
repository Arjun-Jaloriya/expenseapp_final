import React from "react";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import Navbar from "./Navbar";
import { Toaster } from "react-hot-toast";
import { useAuth } from "../Context/Auth";
import Sidebar from "./Sidebar";
const Layout = ({ children, title, description, keywords, author }) => {

 
  const [auth]=useAuth();
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      
      <Navbar />
      
      <main style={{ minHeight: "100vh" }} className="main-content position-relative border-radius-lg  ">
  
        <Toaster />
        {children}
      </main>
      <Footer/>
    </div>
  );
};

Layout.defaultProps = {
  title: "Expense_app",
  description: "mern stack project",
  keywords: "mern,react,node,mongodb",
  author: "Arjun Jaloriya",
};

export default Layout;
