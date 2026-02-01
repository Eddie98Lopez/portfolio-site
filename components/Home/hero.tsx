"use client";

import React, { useEffect, useState } from "react";
import { Section } from "../ui/section";
import { motion } from "motion/react";
import { Typewriter } from "motion-plus/react";
import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";

const jobRoles = ["engineer.", "designer.", "developer."];

export const TypewriterCarousel = ({
  phrases,
  duration = 5000,
  className = "",
  ...props
}: {
  phrases: string[];
  duration?: number;
  className?: string;
}) => {
  const [text, setText] = useState(phrases[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentIndex = phrases.indexOf(text);

      if (currentIndex + 1 >= phrases.length) {
        setText(phrases[0]);
      } else {
        setText(phrases[currentIndex + 1]);
      }
    }, duration);

    // cleanup when text changes or component unmounts
    return () => clearInterval(interval);
  }, [text]);

  return (
    <Typewriter speed={"slow"} textClassName={className} {...props}>
      {text}
    </Typewriter>
  );
};

const Hero = () => {
  return (
    <Section>
      <div className="w-full lg:min-h-[80vh] grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.5fr] items-center ">
        <div className="w-full lg:order-first order-last lg:text-left text-center">
          <motion.div
            transition={{
              duration: 1,
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="flex flex-col items-start justify-center gap-6 lg:text-left text-center"
          >
            <p className=" w-full subheading lg:text-left text-center m-0 pb-0 leading-none">
              Hello world. I am a frontend...
            </p>
            <h1 className="lg:text-[9rem] text-[5rem] leading-none m-0 p-0 w-full lg:text-left text-center">
              <TypewriterCarousel
                phrases={jobRoles}
                className={"display-text"}
              />
            </h1>

            <p className="lg:text-left text-center">
              From graphic artist to frontend developer. I use clean code as my
              medium to create visually compelling user experiences, modern
              stack web-apps, websites, and more.
            </p>

            <div className="flex flex-col lg:flex-row lg:justify-start gap-4 w-full ">
              <Link href="/#projects" className="w-full lg:w-auto">
                <Button variant={"outline"} className="w-full lg:w-auto">
                  View Work
                </Button>
              </Link>
              <Link href="/#contact" className="w-full md:w-auto">
                <Button className="w-full lg:w-auto">Start a project</Button>
              </Link>
            </div>
          </motion.div>
        </div>

        <motion.div
          transition={{
            duration: 1,
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          className="w-full h-full  flex place-center overflow"
        >
          <Image
            alt="ui sketch"
            src="/ui sketch.svg"
            width={100}
            height={100}
            className=" w-[70%] m-auto lg:w-full lg:h-full aspect-auto "
          />
        </motion.div>
      </div>
    </Section>
  );
};

export default Hero;
