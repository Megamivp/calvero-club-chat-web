"use client";

import React from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

import { cn } from "@/lib/utils";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/primitives/carousel";
import { Container } from "@/components/ui/react/design-system";

import type { CarouselApi } from "@/components/ui/primitives/carousel";

const images = ["/images/carousel/1.webp", "/images/carousel/2.webp"];

export function HomeCarousel() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <Container>
      <Carousel
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
        setApi={setApi}
        className="overflow-hidden rounded-xl"
      >
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index} className="relative h-96">
              <Image
                src={image}
                alt={`Carousel image ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 700px"
                priority={index === 0}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
          {Array.from({ length: count }).map((_, index) => (
            <span
              className={cn(
                "min-h-2 w-12 rounded-lg transition-all",
                index == current - 1
                  ? "pointer-events-none bg-white"
                  : "cursor-pointer bg-white/50 hover:bg-white",
              )}
              key={index}
              onClick={() => api?.scrollTo(index)}
            ></span>
          ))}
        </div>
        <CarouselPrevious className="left-4 top-1/2 -translate-y-1/2" />
        <CarouselNext className="right-4 top-1/2 -translate-y-1/2" />
      </Carousel>
    </Container>
  );
}
