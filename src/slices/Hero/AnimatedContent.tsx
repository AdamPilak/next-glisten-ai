"use client";

import ButtonLink from "@/components/ButtonLink";
import StarGrid from "@/components/StarGrid";
import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, PrismicText } from "@prismicio/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";

gsap.registerPlugin(useGSAP);

const AnimatedContent = ({ slice }: { slice: Content.HeroSlice }) => {
  const container = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion) {
        gsap.set(
          ".hero-heading, .hero-body, .hero-button, .hero-image, .hero-glow",
          { opacity: 1 },
        );
      }

      const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });

      tl.fromTo(
        ".hero-heading",
        { scale: 0.5 },
        { opacity: 1, scale: 1, duration: 1.4 },
      );
      tl.fromTo(
        ".hero-body",
        { y: 20 },
        { opacity: 1, y: 0, duration: 1.2 },
        "-=0.6",
      );
      tl.fromTo(
        ".hero-button",
        { scale: 1.5 },
        { opacity: 1, scale: 1, duration: 1.3 },
        "-=0.8",
      );
      tl.fromTo(
        ".hero-image",
        { y: 100 },
        { opacity: 1, y: 0, duration: 1.3 },
        "+=0.3",
      );
      tl.fromTo(
        ".hero-glow",
        { scale: 0.5 },
        { opacity: 1, scale: 1, duration: 1.4 },
        "-=1",
      );
    },
    { scope: container },
  );

  return (
    <div className="relative" ref={container}>
      <StarGrid />
      {isFilled.richText(slice.primary.heading) && (
        <h1 className="hero-heading text-5xl font-medium text-balance opacity-0 md:text-7xl">
          <PrismicText field={slice.primary.heading} />
        </h1>
      )}
      {isFilled.richText(slice.primary.body) && (
        <div className="hero-body mx-auto mt-6 max-w-md text-balance text-slate-300 opacity-0">
          <PrismicRichText field={slice.primary.body} />
        </div>
      )}
      {isFilled.link(slice.primary.button_link) && (
        <ButtonLink
          className="hero-button mt-8 opacity-0"
          field={slice.primary.button_link}
        >
          {slice.primary.button_label}
        </ButtonLink>
      )}
      {isFilled.image(slice.primary.image) && (
        <div className="hero-image glass-container mt-16 w-fit opacity-0">
          <div className="hero-glow absolute inset-0 -z-10 bg-blue-500/30 opacity-0 blur-2xl filter" />
          <PrismicNextImage
            className="rounded-lg"
            field={slice.primary.image}
          />
        </div>
      )}
    </div>
  );
};

export default AnimatedContent;
