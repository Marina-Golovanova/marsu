import React from "react";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Card, Input } from "antd";

export const NewCategory: React.FC = React.memo(function NewCategory() {
  const [inputVisible, setInputVisible] = React.useState(false);
  const inputRef = React.useRef<Input>(null);

  const handleClickAdd = () => {
    setInputVisible(true);
    setTimeout(() => inputRef.current?.focus());
  };

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    //!!! TODO отправка новой категории
    setInputVisible(false);
  };

  const handleEnterPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      (e.target as HTMLInputElement).blur();
    }
  };

  return (
    <Card style={{ textAlign: "center" }}>
      {inputVisible ? (
        <Input
          ref={inputRef}
          onBlur={handleBlur}
          onKeyPress={handleEnterPress}
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
