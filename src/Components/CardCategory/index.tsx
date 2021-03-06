import React from "react";
import { Card, Input, Modal } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Meta from "antd/lib/card/Meta";

import styles from "./styles.module.scss";
import { NavLink } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { wordSlice } from "../redux/wordSlice";

type ICardCategoryProps = {
  name: string;
};

export const CardCategory: React.FC<ICardCategoryProps> = React.memo(
  function CardCategory(props) {
    const [isNeedEdit, setIsNeedEdit] = React.useState(false);
    const name = props.name;
    const [isModalVisible, setIsModalVisible] = React.useState(false);

    const inputRef = React.useRef<Input>(null);

    const dispatch = useAppDispatch();

    const handleBlur = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const newName = e.target.value.toLowerCase();
        if (newName) {
          dispatch(
            wordSlice.actions.updateCategoryName({
              prev: name.toLowerCase(),
              new: newName,
            })
          );
          setIsNeedEdit(false);
        } else {
          setIsNeedEdit(false);
        }
      },
      [dispatch, name]
    );

    const handleEnterPress = React.useCallback((e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        (e.target as HTMLInputElement).blur();
      }
    }, []);

    const handleClickEdit = React.useCallback(() => {
      setIsNeedEdit(true);
      requestAnimationFrame(() => inputRef.current?.input.focus());
    }, []);

    const handleClickDelete = React.useCallback(() => {
      setIsModalVisible(true);
    }, []);

    const handleDeleteCategory = React.useCallback(() => {
      dispatch(wordSlice.actions.deleteCategory(name.toLowerCase()));
      setIsModalVisible(false);
    }, [dispatch, name]);

    const actions = [
      <EditOutlined key="edit" onClick={handleClickEdit} />,
      <DeleteOutlined key="delete" onClick={handleClickDelete} />,
    ];

    return (
      <>
        <Card actions={actions}>
          {isNeedEdit ? (
            <Input
              ref={inputRef}
              onBlur={handleBlur}
              defaultValue={name}
              onKeyPress={handleEnterPress}
            />
          ) : (
            <NavLink to={`${name.toLowerCase()}`} className={styles.title}>
              <Meta title={name} />
            </NavLink>
          )}
        </Card>
        <Modal
          title="???? ???????????????"
          visible={isModalVisible}
          onOk={handleDeleteCategory}
          onCancel={() => setIsModalVisible(false)}
        >
          <p>?????? ?????????????????????? ?????????? ?????????? ??????????????.</p>
        </Modal>
      </>
    );
  }
);
