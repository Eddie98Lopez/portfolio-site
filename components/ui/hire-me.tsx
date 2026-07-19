import React from "react";
import FeatureCard from "../feature-card";
import { Section } from "./section";
import { HighlightedText } from "./highlighted-text";
import Link from "next/link";

const HireMe = () => {
  return (
    <Section className="texture" data-pattern="dot">
      <div className="flex flex-col gap-8 text-center">
        <div>
          <h2 className="text-display-small mb-4">
            <HighlightedText>Hire Me</HighlightedText> :)
          </h2>
          <p className="text-headline">Part-time. Full-time. Freelance</p>
        </div>
        <div className="flex flex-col md:grid grid-cols-3 md:flex-row gap-4 w-full flex-wrap">
          <FeatureCard image="/images/estimate.png" alt="calculator">
            Request a quote
          </FeatureCard>
          <FeatureCard image="/images/message.png" alt="envelope">
            Send Me a Message
          </FeatureCard>
          <Link
            href="https://calendar.app.google/ZgkaLipQNttcGAz69"
            target="_blank"
          >
            <FeatureCard image="/images/call.png" alt="rotary phone">
              Book a Call
            </FeatureCard>
          </Link>

          <div className="bg-(--surface-base) hover:bg-(--secondary-base) transition-all w-full min-h-[100px] col-span-3 grid content-center items-center text-headline text-(--text-inverse)  hover:text-(--text-base)">
            download a resume
          </div>
        </div>
      </div>
    </Section>
  );
};

export default HireMe;
