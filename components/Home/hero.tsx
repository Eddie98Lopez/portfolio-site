"use client";

import { useEffect, useState, useRef } from "react";
import { Section } from "../ui/section";
import { useInView } from "motion/react";
import { Typewriter } from "motion-plus/react";
import Link from "next/link";
// import { Button } from "../ui/button";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css/bundle";
import { HighlightedText } from "../ui/highlighted-text";

// const jobRoles = ["engineer.", "designer.", "developer."];

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
    <Section className="texture py-[50px] border-b border" data-pattern="dot">
      {/* 1. Parent set to a 1x1 grid */}
      <div className="h-full grid grid-cols-1 grid-rows-1 justify-center items-center">
        {/* 2. Background Layer: Assigned to row 1, column 1 */}
        <div className="w-full h-full bg-(--background-emphasis)/80 col-start-1 row-start-1 aspect-4/5 lg:aspect-16/9 overflow-hidden flex justify-center items-center rounded">
          <video
            autoPlay
            loop
            muted
            /* ADDED object-cover, REMOVED stray "fill" class */
            className="w-full h-full object-cover object-center opacity-50 mix-blend-multiply"
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* 3. Content Layer: Also assigned to row 1, column 1 */}
        <div className="flex items-center justify-center gap-4 text-display-large col-start-1 row-start-1 z-1 text-(--text-inverse)">
          <div className="">
            <div className="text-right text-(--text-inverse)/30 dark:text-(--text-inverse)/50">
              UX
            </div>
            <div className="text-right">DESIGN</div>
            <div className="text-right text-(--text-inverse)/30 dark:text-(--text-inverse)/50">
              SOFTWARE
            </div>
          </div>
          {/* Removed useless grid classes here since the parent is a 'flex' container */}
          <div>
            <HighlightedText className="text-(--text-base)">
              ENGINEER
            </HighlightedText>
          </div>
        </div>
      </div>
    </Section>
  );
};

// export const ProjectsSection = ({ projects }) => {
//   const ref = useRef(null);
//   const inView = useInView(ref, {
//     margin: "200px 0px 200px 0px", // trigger a little before it enters
//   });
//   console.log("project slideShow in view: ", inView);
//   return (
//     <div ref={ref}>
//       <div style={{ display: inView ? "block" : "none" }}>
//         <Swiper
//           modules={[Navigation, Pagination, Autoplay]}
//           slidesPerView={"auto"}
//           spaceBetween={30}
//           centeredSlides={true}
//           speed={1000}
//           autoplay={{
//             delay: 5000,
//             disableOnInteraction: false,
//           }}
//           pagination={{ clickable: true }}
//           style={{ paddingBottom: "40px" }} // makes room below slides
//         >
//           {projects.projects.map((project) => (
//             <SwiperSlide
//               key={`project-${project.id}`}
//               className="w-full h-full max-w-[50%] aspect-16/9 flex place-content-center content-center items-center rounded-lg overflow-hidden"
//             >
//               <Link href={`/projects/${project.id}`}>
//                 <Image
//                   src={project.cover_image}
//                   width={1080}
//                   height={1080}
//                   alt={project.title}
//                   className="object-cover w-full block transition-transform duration-300 hover:scale-105"
//                 />
//               </Link>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>
//     </div>
//   );
// };

export default Hero;
