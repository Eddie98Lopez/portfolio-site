"use client";
import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Ticker } from "motion-plus/react";
import books from "@/lib/books";
import Image from "next/image";

const BookSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    margin: "200px 0px 200px 0px", // trigger a little before it enters
  });

  const slideLeft = {
    initial: { x: -150, opacity: 0 },
    whileInView: { x: 0, opacity: 1 },
    transition: {
      duration: 4, // Increased from 0.8 to slow it down
      delay: 2, // Wait 0.2s before starting
      ease: [0.22, 1, 0.36, 1], // A "Quint" ease-out for a smoother glide
    },
  };

  const slideRight = {
    initial: { x: 150, opacity: 0 },
    whileInView: { x: 0, opacity: 1 },
    transition: {
      duration: 4,
      delay: 3, // Slightly more delay than the left for a staggered look
      ease: [0.22, 1, 0.36, 1],
    },
  };

  return (
    <section className=" background-invert text-white relative min-h-[100vh] w-full grid grid-cols-1 snap-section">
      <div className="col-start-1 row-start-1 sticky top-[27%] md:top-[30%] z-0 h-fit overflow-hidden">
        <motion.div
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: "-30% 0px -30% 0px" }}
          variants={slideLeft}
        >
          <h2 className=" text-6xl md:text-9xl font-black uppercase text-center text-white leading-none tracking-[1.1rem]">
            Self Taught, <br /> But well read
          </h2>
        </motion.div>
      </div>

      <div className="col-start-1 row-start-1 relative z-10 flex flex-col items-center">
        <div className="h-[25vh] md:h-[45vh] " />

        <div ref={ref} className="w-full overflow-hidden sticky top-[50%]">
          <div
            className="flex justify-center items-center  w-full"
            style={{ display: isInView ? "block" : "none" }}
          >
            <Ticker
              gap={25}
              velocity={50}
              items={books.map((book, i) => {
                return (
                  <div
                    key={`${book.title}-${i}`}
                    className="relative aspect-square w-[200px] md:w-[350px]"
                    style={{ clipPath: "inset(0 round 0.5rem)" }} // same as rounded-lg
                  >
                    <Image
                      src={book.image}
                      alt={book.title}
                      fill
                      sizes="(max-width: 768px) 200px, 350px"
                      className="object-cover"
                    />
                  </div>
                );
              })}
            />
          </div>
        </div>
        <div style={{ height: isInView ? 0 : 350 }}></div>
        <div className="h-[60vh]" />
      </div>

      {/* LAYER 3: Outline Header (Top) */}
      <div className="col-start-1 row-start-1 sticky top-[27%] md:top-[30%] z-20 h-fit pointer-events-none overflow-hidden">
        <motion.div
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: "-30% 0px -30% 0px" }}
          variants={slideRight} // This one comes from the right
        >
          <h2
            className=" text-6xl md:text-9xl font-black uppercase text-center leading-none text-transparent tracking-[3rem]"
            style={{ WebkitTextStroke: "2px white" }}
          >
            Self Taught, <br /> But well read
          </h2>
        </motion.div>
      </div>
    </section>
  );
};
export default BookSection;
