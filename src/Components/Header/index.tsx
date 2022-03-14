import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import cn from "classnames";
import { Link } from "react-router-dom";
import { ModalLogin } from "../ModalLogin";

import styles from "./styles.module.scss";

export const Header: React.FC = React.memo(function Header() {
  const [isAuthorizationOpened, setIsAuthorizationOpened] =
    React.useState(false);

  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [modalTitle, setModalTitle] =
    React.useState<"registration" | "login">("login");

  const handleOk = React.useCallback(() => {
    setIsModalVisible(false);
  }, []);

  const handleCancel = React.useCallback(() => {
    setIsModalVisible(false);
  }, []);

  const handleClickRegister = React.useCallback(() => {
    setIsModalVisible(true);
    setModalTitle("registration");
  }, []);

  const handleClickEnter = React.useCallback(() => {
    setIsModalVisible(true);
    setModalTitle("login");
  }, []);

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
          <li onClick={handleClickRegister}>Регистрация</li>
          <li onClick={handleClickEnter}>Вход</li>
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

      <ModalLogin
        title={modalTitle}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      />
    </header>
  );
});
