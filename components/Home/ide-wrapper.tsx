import React, { ReactNode } from "react";

type IdeWrapperProps = {
  children: React.ReactNode;
};

export function IdeWrapper({ children }: IdeWrapperProps) {
  const items = React.Children.toArray(children);

  return (
    <div className="w-full border-2 min-h-[300px] rounded-lg border-secondary p-3 flex flex-col gap-3">
      <div className="w-full min-h-7 border-2 rounded-sm border-secondary flex items-center gap-2 p-2">
        <div className="size-5 border-2 rounded-3xl" />
        <div className="size-5 border-2 rounded-3xl" />
        <div className="size-5 border-2 rounded-3xl" />
      </div>

      <div className="border-2 rounded-sm border-secondary h-full w-full lg:p-6 p-3 grow flex flex-col gap-2">
        {items.map((child, i) => (
          <div
            key={(child as any)?.key ?? i} // stable enough for children
            className="flex gap-3 lg:gap-6 lg:items-center items-start"
          >
            <div className="text-center text-[.825rem] md:text-[1rem]">
              {i + 1}
            </div>
            <div className="text-left text-[.825rem] md:text-[1rem]">
              {child}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default IdeWrapper;

export const StyledWindowWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className=" w-full border-2 min-h-[300px] rounded-lg border-(secondary) p-3 flex flex-col gap-3 ">
      <div className="w-full min-h-7 border-2 rounded-sm border-(secondary) flex items-center gap-2 p-2">
        <div className="size-5 border-2 rounded-3xl"></div>
        <div className="size-5 border-2 rounded-3xl"></div>
        <div className="size-5 border-2 rounded-3xl"></div>
      </div>
      <div className="border-2 rounded-sm border-(secondary) h-full w-full lg:p-6 p-3 grow flex flex-col gap-2 ">
        {children}
      </div>
    </div>
  );
};
