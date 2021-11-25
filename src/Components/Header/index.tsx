import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import cn from "classnames";

import styles from "./styles.module.scss";

export const Header: React.FC = () => {
  const [isAuthorizationOpen, setIsAuthorizationOpen] = React.useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>Marsú</div>

      <div className={styles.authorization}>
        <ul
          className={cn(styles.authorizationItems, {
            [styles.authorizationItemsActive]: isAuthorizationOpen,
          })}
        >
          <li>Регистрация</li>
          <li>Вход</li>
        </ul>

        <button onClick={() => setIsAuthorizationOpen(!isAuthorizationOpen)}>
          <FontAwesomeIcon
            className={styles.logIn}
            icon={faUserCircle}
            size="3x"
            color="#fff"
            border={false}
            title="authorization"
          />
        </button>
      </div>
    </header>
  );
};
