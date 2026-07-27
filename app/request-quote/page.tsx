import React from "react";
import { QuoteRequestForm } from "@/components/forms/quote-request-form";

const Page = () => {
  return (
    <div
      className="w-full h-[100vh] flex items-center content-center texture bg-(--background-base)"
      data-pattern="dot"
    >
      <div className="mx-auto p-4">
        <h1 className="text-display-small text-center mb-8">Request a Quote</h1>
        <QuoteRequestForm />
      </div>
    </div>
  );
};

export default Page;
