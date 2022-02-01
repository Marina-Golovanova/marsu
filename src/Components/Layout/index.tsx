import React from "react";

import styles from "./styles.module.scss";

export const Layout: React.FC = React.memo(function Layout(props) {
  return <div className={styles.layout}>{props.children}</div>;
});
