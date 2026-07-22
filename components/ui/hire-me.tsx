"use client";
import FeatureCard from "../feature-card";
import { Section } from "./section";
import { HighlightedText } from "./highlighted-text";
import Link from "next/link";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "./dialog";
import { ContactForm } from "../forms/contact-form";
import { QuoteRequestForm } from "../forms/quote-request-form";

const HireMe = () => {
  return (
    <Section className="texture" data-pattern="dot" id="contact">
      <div className="flex flex-col gap-8 text-center h-full">
        <div>
          <h2 className="text-display-small mb-4">
            <HighlightedText>Hire Me</HighlightedText> {`:)`}
          </h2>
          <p className="text-headline">Part-time. Full-time. Freelance</p>
        </div>
        <div className=" grid grid-cols-1 md:grid-cols-3 gap-4 w-full ">
          <Dialog>
            <DialogTrigger>
              <FeatureCard image="/images/estimate.png" alt="calculator">
                Request a quote
              </FeatureCard>
            </DialogTrigger>
            <DialogContent className="overflow-scroll max-h-[80vh]">
              <DialogTitle className="sr-only">Request a Quote</DialogTitle>
              <QuoteRequestForm />
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger>
              <FeatureCard image="/images/message.png" alt="envelope">
                Send Me a Message
              </FeatureCard>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle className="text-headline text-2xl">
                Contact Me
              </DialogTitle>
              <DialogDescription>
                Send me a message and {`I'll`} get back to ya as soon as i can.
              </DialogDescription>
              <ContactForm />
            </DialogContent>
          </Dialog>

          <Link
            href="https://calendar.app.google/ZgkaLipQNttcGAz69"
            target="_blank"
          >
            <FeatureCard image="/images/call.png" alt="rotary phone">
              Book a Call
            </FeatureCard>
          </Link>

          <div className="bg-(--surface-base) hover:bg-(--secondary-base) transition-all w-full rounded min-h-[100px] md:col-span-3 grid content-center items-center text-headline text-(--text-inverse)  hover:text-(--text-base)">
            download a resume
          </div>
        </div>
      </div>
    </Section>
  );
};

export default HireMe;
