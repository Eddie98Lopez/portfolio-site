import React from "react";
import { Facebook, Instagram, Linkedin } from "lucide-react";

const Footer = ({ children }) => {
  return (
    <footer className="w-full min-h-[70vh] background-invert text-secondary px-[8%] lg:py-16 py-8">
      {children}
    </footer>
  );
};

export default Footer;
