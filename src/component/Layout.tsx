import { ReactNode } from "react";
import NavBar from "./NavBar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="layout__div">
      <NavBar />
      {children}
    </div>
  );
}
