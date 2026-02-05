import React from "react";
import { Section } from "@/components/ui/section";
import IdeWrapper from "@/components/Home/ide-wrapper";
import { TypewriterCarousel } from "@/components/Home/hero";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Me | Eddie Lopez | Frontend Devloper & Designer",
  description: `I’m Eduardo “Eddie” Lopez, a designer turned frontend engineer with agency experience, focused on building thoughtful, well-crafted web interfaces.`,
  keywords: [
    "about frontend engineer",
    "about web developer",
    "designer turned frontend engineer",
    "ui focused developer",
    "frontend engineer background",
    "web developer experience",
    "agency frontend developer",
    "creative frontend engineer",
    "eduardo lopez frontend engineer",
    "eddie lopez web developer",
    "design and development background",
  ],
};

export const Resume = () => {
  return (
    <Section>
      <div className="lg:grid lg:grid-cols-[1fr_2fr] flex flex-col gap-8">
        <h2 className="text-5xl">Experience</h2>
        <ul className="flex flex-col lg:flex-row  lg:gap-16 gap-8 flex-wrap">
          <li>
            <h3 className="text-2xl ">Web Developer</h3>
            <p>Centered Marketing Group</p>
            <p className="italic">May 2025 - Dec 2025</p>
          </li>
          <li>
            <h3 className="text-2xl ">Graphic Designer</h3>
            <p>Centered Marketing Group</p>
            <p className="italic">Mar 2024 - May 2025</p>
          </li>
        </ul>
      </div>
      <div className="lg:grid lg:grid-cols-[1fr_2fr] flex flex-col gap-8 mt-12">
        <h2 className="text-5xl">Education</h2>
        <ul className="flex flex-col lg:flex-row  lg:gap-16 gap-8  flex-wrap">
          <li>
            <h3 className="text-2xl ">California College of the Arts</h3>
            <p className="italic">Aug 2016 - Mar 2019</p>
          </li>
          <li>
            <h3 className="text-2xl ">
              Lambda School Fullstack Web Development
            </h3>
            <p className="italic">Oct 2020 - Aug 2021</p>
          </li>
        </ul>
      </div>
    </Section>
  );
};

export const About = () => {
  return (
    <div id="about">
      <Section className="min-h-[400px] background-invert text-secondary py-15 flex">
        <div className="grid lg:grid-cols-[1fr_2fr]  w-full h-full gap-8 min-h-400px">
          <div>
            <h2
              className="display-type leading-none"
              style={{ fontSize: "5rem" }}
            >
              Hi, I’m Eduardo.
            </h2>
            <h3 className="subheading text-[2.5rem]">
              But my friends call me Eddie.
            </h3>
          </div>
          <p className="h-full w-full lg:translate-y-2 animate__animated animate__fadeInLeftBig">
            I learned to code because as a designer, I didn’t want to settle at
            “that’s not possible in the template”. I’ve shipped real work in
            agency environments, and I’m now intentionally{" "}
            <span className="font-bold">
              pivoting into frontend engineering
            </span>
            , watching tutorials, reading tons of books, and sharpening the
            fundamentals. I’m curious by default and a little{" "}
            <span className="font-bold">obsessive about craft </span>(in a
            healthy way).
          </p>
          {/*           <div className="bg-gray-700 w-[70%] aspect-4/5 h-full ">
            image of me{" "}
          </div> */}
          <div className=" flex w-full col-span-full">
            <IdeWrapper>
              <p>
                <span className="font-bold">const</span> eddie ={" "}
                <span className="font-bold">new</span> Engineer
                {`("eddie","lopez")`}
              </p>
              <p>
                eddie.
                <TypewriterCarousel
                  phrases={[
                    "isCurious = true",
                    "isNerdy = true",
                    "isReady = true",
                  ]}
                />
              </p>
            </IdeWrapper>
          </div>
        </div>
      </Section>
      <Resume />

      {/*       <Section>Reading List</Section>
      <Section>Expereience resume Style</Section>
      <Section>Education</Section> */}
    </div>
  );
};

export default About;
