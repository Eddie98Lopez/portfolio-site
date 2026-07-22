"use client";

import React, { useState } from "react";
import Image from "next/image";
import { HighlightedText } from "./ui/highlighted-text";

const FeatureCard = ({
  image,
  alt,
  children,
}: {
  image: string;
  alt: string;
  children: React.ReactNode | string;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="grid w-full aspect-3/2 overflow-hidden group relative cursor-pointer bg-(--surface-base) rounded border border-(--border-base)"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Layer: Occupies the full grid area. 
        Using group-hover to scale up and translate up 
      */}
      <div className="col-start-1 row-start-1 relative w-[50%] max-w-[200px] aspect-square m-auto transition-transform duration-500 ease-out group-hover:scale-150 group-hover:-translate-y-5 opacity-[.2] group-hover:opacity-100">
        <Image fill src={image} alt={alt} className="object-cover" />
      </div>

      {/* Text Layer: Stacked on top via Grid, centered via place-self-center.
        Using group-hover to translate down.
      */}
      <div className="col-start-1 row-start-1 place-self-center z-5 transition-transform duration-500 ease-out group-hover:translate-y-10 text-headline text-(--text-inverse) group-hover:text-(--text-base)">
        <HighlightedText trigger="controlled" isHovered={isHovered}>
          {children}
        </HighlightedText>
      </div>
    </div>
  );
};

export default FeatureCard;
