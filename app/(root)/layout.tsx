import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "@/components/Footer";

const layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <>
      <Navbar />
      <main className="font-work-sans">{children}</main>
      <Footer />
    </>
  );
};

export default layout;
