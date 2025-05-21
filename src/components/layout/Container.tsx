import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

const Container = ({ children, className = "" }: ContainerProps) => {
  return (
    <div   className={`w-full max-w-[1199px] self-center flex flex-col items-stretch px-4 max-md:max-w-full ${className}`}>
      {children}
    </div>
  );
};

export default Container;
