import { FunctionComponent } from "react";
import { Header } from "./Header";

export const PageWithHeader: FunctionComponent = ({ children }) => (
  <>
    <Header />
    <main className="pt-16 px-8">{children}</main>
  </>
);
