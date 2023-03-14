import classes from "./index.module.css";

type PropsItem = {
  title: string;
};

export const Item = ({ title }: PropsItem) => {
  return <div className={classes.item}>{title}</div>;
};
