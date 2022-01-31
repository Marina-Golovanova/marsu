import React from "react";
import { NewCategory } from "../NewCategory";
import { CardCategory } from "../CardCategory";
import styles from "./styles.module.scss";

export const Dictionary: React.FC = React.memo(function Dictionary() {
  return (
    <div className={styles.dictionary}>
      <CardCategory name="Category" />
      <NewCategory />
    </div>
  );
});
