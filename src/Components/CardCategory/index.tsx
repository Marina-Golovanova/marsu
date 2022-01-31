import React from "react";
import { Card, Input, Modal } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Meta from "antd/lib/card/Meta";

type ICardCategoryProps = {
  name: string;
};

export const CardCategory: React.FC<ICardCategoryProps> = React.memo(
  function CardCategory(props) {
    const [isNeedEdit, setIsNeedEdit] = React.useState(false);
    const [name, setName] = React.useState(props.name);
    const [isModalVisible, setIsModalVisible] = React.useState(false);

    const inputRef = React.useRef<Input>(null);

    const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newName = e.target.value;
      if (newName) {
        setName(newName);
        setIsNeedEdit(false);
      } else {
        setIsNeedEdit(false);
      }
    };

    const handleEnterPress = (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        (e.target as HTMLInputElement).blur();
      }
    };

    const handleClickEdit = () => {
      setIsNeedEdit(true);
      setTimeout(() => inputRef.current?.input.focus());
    };

    const handleClickDelete = () => {
      setIsModalVisible(true);
    };

    const handleDeleteCategory = () => {
      //!!!TODO to delete category
      setIsModalVisible(false);
    };

    return (
      <>
        <Card
          actions={[
            <EditOutlined key="edit" onClick={handleClickEdit} />,
            <DeleteOutlined key="delete" onClick={handleClickDelete} />,
          ]}
        >
          {isNeedEdit ? (
            <Input
              ref={inputRef}
              onBlur={handleBlur}
              defaultValue={name}
              onKeyPress={handleEnterPress}
            />
          ) : (
            <Meta title={name} />
          )}
        </Card>
        <Modal
          title="Вы уверены?"
          visible={isModalVisible}
          onOk={handleDeleteCategory}
          onCancel={() => setIsModalVisible(false)}
        >
          <p>Все сохраненные слова будут удалены.</p>
        </Modal>
      </>
    );
  }
);
