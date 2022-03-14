import React from "react";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Card, Input } from "antd";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { wordSlice } from "../redux/wordSlice";

export const NewCategory: React.FC = React.memo(function NewCategory() {
  const [inputVisible, setInputVisible] = React.useState(false);
  const inputRef = React.useRef<Input>(null);

  const dispatch = useAppDispatch();

  const handleClickAdd = React.useCallback(() => {
    setInputVisible(true);
    requestAnimationFrame(() => inputRef.current?.focus());
  }, []);

  const handleBlur = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const title = e.target.value.replace(/ +/g, " ").trim();
      if (title) {
        dispatch(wordSlice.actions.addCategory(title));
      }
      setInputVisible(false);
    },
    [dispatch]
  );

  const handleEnterPress = React.useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      (e.target as HTMLInputElement).blur();
    }
  }, []);

  const handleKeyDown = React.useCallback((e: React.KeyboardEvent) => {
    if (!e.key.match(/\w/) && !(e.code === "Space")) {
      e.preventDefault();
    }
  }, []);

  return (
    <Card style={{ textAlign: "center" }}>
      {inputVisible ? (
        <Input
          ref={inputRef}
          onBlur={handleBlur}
          onKeyPress={handleEnterPress}
          onKeyDown={handleKeyDown}
          maxLength={32}
        />
      ) : (
        <PlusCircleOutlined
          style={{ fontSize: "60px", color: "#696969", cursor: "pointer" }}
          onClick={handleClickAdd}
        />
      )}
    </Card>
  );
});
