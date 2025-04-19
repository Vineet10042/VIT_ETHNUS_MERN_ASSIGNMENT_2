"use client";

import * as React from "react";
import {
  Carousel as CarouselPrimitive,
  CarouselContent as CarouselContentPrimitive,
  CarouselItem as CarouselItemPrimitive,
  CarouselNext as CarouselNextPrimitive,
  CarouselPrevious as CarouselPreviousPrimitive,
  CarouselViewport as CarouselViewportPrimitive,
} from "@radix-ui/react-carousel";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Carousel = CarouselPrimitive;
const CarouselViewport = CarouselViewportPrimitive;
const CarouselContent = CarouselContentPrimitive;
const CarouselItem = CarouselItemPrimitive;
const CarouselPrevious = CarouselPreviousPrimitive;
const CarouselNext = CarouselNextPrimitive;

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselViewport,
};

