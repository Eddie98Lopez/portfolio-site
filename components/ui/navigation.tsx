"use client";
import React, { useState, useEffect } from "react";
import { Button } from "./button";
import Logo from "../Logo";
import Link from "next/link";
import { Menu, CircleX, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname, useParams } from "next/navigation";
import { motion } from "motion/react";

export const NavigationWrapper = ({
  variant = "default",
  className = "",
  children,
}) => {
  "use client";
  return (
    <header
      id="main-navigation"
      className="bg-white md:px-[8%] flex translate-z-0 z-1000 flex-col justify-around items-center w-full h-full ring-1 py-4 ring-gray-alpha-400 px-6 sticky top-0 "
    >
      <nav
        id="nav-wrapper"
        className={`flex w-full relative  md:flex-row justify-between max-w-[1600px] md:items-center m-auto ${variant} ${className}`}
      >
        {children}
      </nav>
    </header>
  );
};

export const NavLogo = ({ children }) => {
  return <div>{children}</div>;
};

export const NavLinkGroup = ({ children, isOpen, setOpen, className = "" }) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, translateY: -500 }}
        whileInView={{ opacity: 1, translateY: 0 }}
        id="mobile-nav"
        className={`bg-default
        fixed inset-0
        w-screen h-screen
        z-[9999] ${isOpen ? "block" : "hidden"}
         ${className}
        lg:hidden
      `}
      >
        <div
          className="background-invert w-full h-full flex flex-col items-center justify-center  gap-8  uppercase font-bold 
        text-secondary "
        >
          <Button
            variant={"ghost"}
            className="lg:hidden leading-none absolute top-4 right-4 z-2"
            onClick={() => setOpen(!isOpen)}
          >
            <CircleX className="size-8 " />
          </Button>
          {children}
        </div>
      </motion.div>

      <div
        id="desktop-nav"
        className="  lg:block uppercase font-bold lg:flex lg:flex-row  lg:items-center lg:justify-start lg:gap-8 lg:text-primary hidden"
      >
        <Button
          variant={"ghost"}
          className="lg:hidden leading-none absolute top-4 right-4 z-2"
          onClick={() => setOpen(!isOpen)}
        >
          <CircleX className="size-8 " />
        </Button>
        {children}
      </div>
    </>
  );
};

export const NavHamburger = ({ isOpen, setOpen, className = "" }) => {
  return (
    <Button
      onClick={() => setOpen(!isOpen)}
      className={`lg:hidden p-0 m-0 min-h-none text-right ${className}`}
      variant={"ghost"}
    >
      <Menu className="size-8" />
    </Button>
  );
};

export const Navigation = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const params = useParams();
  //console.log(pathname);
  //console.log(params);

  useEffect(() => {
    setOpen(false);
  }, [pathname, params]);

  return (
    <NavigationWrapper>
      <NavLogo>
        <Link href="/">
          <Logo className="size-12" />
        </Link>
      </NavLogo>
      <NavHamburger isOpen={open} setOpen={setOpen} />
      <NavLinkGroup isOpen={open} setOpen={setOpen} className="">
        <Link
          className="block font-(family-name:--heading-type) text-7xl lg:text-base"
          href="/#"
        >
          home
        </Link>
        <Link
          className="block font-(family-name:--heading-type) text-7xl lg:text-base"
          href="/#about"
        >
          about
        </Link>
        <Link
          className="block font-(family-name:--heading-type) text-7xl lg:text-base"
          href="/#projects"
        >
          projects
        </Link>
        <Link
          className="block font-(family-name:--heading-type) text-7xl lg:text-base"
          href="/#services"
        >
          services
        </Link>
        <Link
          className="block font-(family-name:--heading-type) text-7xl lg:text-base"
          href="/#contact"
        >
          contact
        </Link>
      </NavLinkGroup>
    </NavigationWrapper>
  );
};
