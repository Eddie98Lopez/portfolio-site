import React from "react";
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "./dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./carousel";
import Image from "next/image";

const ImageCarousel = ({ children, images, startIndex }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="bg-transparent border-transparent sm:max-w-[80%]">
        <DialogTitle>Images</DialogTitle>

        <Carousel opts={{ loop: true, startIndex }}>
          <CarouselContent>
            {images.map((image, i) => {
              return (
                <CarouselItem
                  key={`carousel-image-${i}`}
                  className="flex items-center content-center max-h-[80vh]"
                >
                  <Image
                    src={image.href}
                    width={1080}
                    height={1080}
                    alt="image"
                    className="w-full h-auto max-h-[80vh] object-contain rounded-md"
                  />
                </CarouselItem>
              );
            })}
          </CarouselContent>

          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </DialogContent>
    </Dialog>
  );
};

export default ImageCarousel;
