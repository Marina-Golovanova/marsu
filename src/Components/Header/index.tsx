import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import cn from "classnames";

import styles from "./styles.module.scss";
import { Link } from "react-router-dom";

export const Header: React.FC = React.memo(function Header() {
  const [isAuthorizationOpened, setIsAuthorizationOpened] =
    React.useState(false);

  return (
    <header className={styles.header}>
      <Link to="/">
        <div className={styles.logo}>Marsú</div>
      </Link>

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
