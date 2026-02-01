import React from "react";

export const Section = ({ children, className = "", ...props }) => {
  return (
    <section
      className={`md:px-[8%] p-6 py-10 box-border w-full h-full lg:text-left text-center m-auto ${className}`}
      {...props}
    >
      <div className="w-full max-w-[1600px] m-auto"> {children}</div>
    </section>
  );
};
