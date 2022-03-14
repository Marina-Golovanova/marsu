import React from "react";
import { NewCategory } from "../NewCategory";
import { CardCategory } from "../CardCategory";
import styles from "./styles.module.scss";
import { useAppSelector } from "../../hooks/redux-hooks";
import { selectCategories } from "../redux/wordSlice";
import { capitalize } from "../../utils/capitalize";

export const Dictionary: React.FC = React.memo(function Dictionary() {
  const categories = useAppSelector(selectCategories);
  return (
    <div className={styles.dictionary}>
      {categories.map((cat) => (
        <CardCategory key={cat.name} name={capitalize(cat.name)} />
      ))}

      <NewCategory />
    </div>
  );
});
