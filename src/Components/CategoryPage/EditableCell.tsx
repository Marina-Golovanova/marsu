import { Input } from "antd";
import React from "react";
import { EditOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";

import styles from "./styles.module.scss";

type IEditableCellProps = {
  text: string;
  getWord: (text: string) => void;
  isLink?: boolean;
};

export const EditableCell: React.FC<IEditableCellProps> = React.memo(
  function EditableCell(props) {
    const [needEdit, setNeedEdit] = React.useState(false);
    const inputRef = React.useRef<Input>(null);

    const handleBlurInput = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        props.getWord(e.target.value);
        setNeedEdit(false);
      },
      [props]
    );

    const handleEnterPress = React.useCallback((e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        (e.target as HTMLInputElement).blur();
      }
    }, []);

    return (
      <>
        {needEdit ? (
          <Input
            ref={inputRef}
            defaultValue={props.text}
            width={0}
            onBlur={handleBlurInput}
            onKeyPress={handleEnterPress}
          ></Input>
        ) : (
          <>
            {props.isLink ? (
              <NavLink className={styles.cell} to={props.text}>
                {props.text}
              </NavLink>
            ) : (
              <span className={styles.cell}>{props.text}</span>
            )}
          </>
        )}
        <EditOutlined
          onClick={() => {
            setNeedEdit(true);
            requestAnimationFrame(() => inputRef.current?.input.focus());
          }}
          style={{ marginLeft: "auto" }}
        />
      </>
    );
  }
);
