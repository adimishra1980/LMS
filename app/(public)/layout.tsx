import { ReactNode } from "react";
import { Navbar } from "./_components/Navbar";

interface LayoutPublicProps {
  children: ReactNode;
}

export default function LayoutPublic({ children }: LayoutPublicProps) {
  return (
    <div>
      <Navbar />
      <main className="container mx-auto px-4 md:px-6 lg:px-8">{children}</main>
    </div>
  );
}
