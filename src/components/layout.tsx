import type { ReactElement } from "react";
import classes from "./layout.module.css";

type PropsLayout = {
  children: ReactElement;
};

export const Layout = ({ children }: PropsLayout) => {
  return <div className={classes.layout}>{children}</div>;
};
