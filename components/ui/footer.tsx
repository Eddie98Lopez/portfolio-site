import React, { ReactNode } from "react";
import { Facebook, Instagram, Linkedin } from "lucide-react";

const Footer = ({ children }: { children: ReactNode }) => {
  return (
    <footer className="w-full  background-invert text-secondary px-[8%] py-16 ">
      {children}
    </footer>
  );
};

export default Footer;
