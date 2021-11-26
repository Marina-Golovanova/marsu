import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import cn from "classnames";

import styles from "./styles.module.scss";

export const Header: React.FC = React.memo(() => {
  const [isAuthorizationOpened, setIsAuthorizationOpened] =
    React.useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>Marsú</div>

      <div className={styles.authorization}>
        <ul
          className={cn(styles.authorizationItems, {
            [styles.authorizationItemsActive]: isAuthorizationOpened,
          })}
        >
          <li>
            <a tabIndex={isAuthorizationOpened ? 0 : -1} href="/">
              Регистрация
            </a>
          </li>
          <li>
            <a tabIndex={isAuthorizationOpened ? 0 : -1} href="/">
              Вход
            </a>
          </li>
        </ul>

        <button onClick={() => setIsAuthorizationOpened((x) => !x)}>
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
});
