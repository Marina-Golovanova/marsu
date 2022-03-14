import { Button, Input, Modal, PageHeader, Table } from "antd";
import React from "react";
import styles from "./styles.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { SoundOutlined } from "@ant-design/icons";
import { EditableCell } from "./EditableCell";
import { IColKey, ICols } from "../types";
import { capitalize } from "../../utils/capitalize";
import { voice } from "../../utils/voice";
import {
  selectCategory,
  addNewWord,
  updateWord,
  wordSlice,
} from "../redux/wordSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";

export const CategoryPage: React.FC = React.memo(function CategoryPage() {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [popupTitle, setPopupTitle] = React.useState("");
  const inputRef = React.useRef<Input>(null);
  const navigate = useNavigate();

  const title = useParams().name || "";

  const [isEmptyValue, setIsEmptyValue] = React.useState(true);

  const dataSource = useAppSelector(selectCategory)(title);

  const dispatch = useAppDispatch();

  const columns = [
    {
      title: "Слово",
      dataIndex: "word",
      key: "word",
      render: (text: string, record: ICols) => (
        <div className={styles.word}>
          <EditableCell
            text={text}
            getWord={(val) => handleUpdateWord(record.key, "word", val)}
            isLink={true}
          />
          <SoundOutlined onClick={() => voice(text)} />
        </div>
      ),
    },
    {
      title: "Транскрипция",
      dataIndex: "transcription",
      key: "transcription",
      render: (text: string, record: ICols) => (
        <div className={styles.word}>
          <EditableCell
            text={text}
            getWord={(val) =>
              handleUpdateWord(record.key, "transcription", val)
            }
          />
        </div>
      ),
    },
    {
      title: "Перевод",
      dataIndex: "translation",
      key: "translation",
      render: (text: string, record: ICols) => (
        <div className={styles.word}>
          <EditableCell
            text={text}
            getWord={(val) => handleUpdateWord(record.key, "translations", val)}
          />
        </div>
      ),
    },
  ];

  const handleAddWord = React.useCallback(
    (value: string) => {
      if (value) {
        const dataHasWord = dataSource?.words.filter(
          (el) => el.word === value
        ).length;
        if (dataHasWord) {
          setPopupTitle("Это слово уже существует");
          inputRef.current?.setValue("");
        } else {
          setPopupTitle("Введите слово");
          dispatch(addNewWord({ word: value, category: title }));
          inputRef.current?.setValue("");
        }
      }
    },
    [dataSource, dispatch, title]
  );

  const handleUpdateWord = React.useCallback(
    (key: string, col: IColKey, value: string) => {
      if (col === "word") {
        dispatch(updateWord({ prev: key, new: value, category: title }));
      } else {
        dispatch(
          wordSlice.actions.updateWordInfo({ key, col, value, category: title })
        );
      }
    },
    [dispatch, title]
  );

  const currentData = dataSource?.words.map((el) => ({
    key: el.key,
    word: el.word,
    transcription: el.transcription,
    translation: el.translations ? el.translations[0] : null,
  }));

  return (
    <div className={styles.category}>
      <PageHeader
        title={capitalize(title)}
        onBack={() => navigate(-1)}
        extra={[
          <Button
            key="1"
            type="primary"
            onClick={() => {
              setIsModalVisible(true);
              setPopupTitle("Введите слово");
              requestAnimationFrame(() => inputRef.current?.input.focus());
            }}
          >
            Добавить слово
          </Button>,
        ]}
      />

      <Table
        className={styles.table}
        dataSource={currentData}
        columns={columns}
        tableLayout="fixed"
      />

      <Modal
        title={popupTitle}
        visible={isModalVisible}
        cancelText="Отмена"
        onOk={() => {
          if (inputRef.current?.state.value) {
            const value = inputRef.current?.state.value.toLowerCase();
            handleAddWord(value);
          }
        }}
        onCancel={() => setIsModalVisible(false)}
        okButtonProps={{
          disabled: isEmptyValue,
        }}
      >
        <Input
          ref={inputRef}
          onChange={(e) => setIsEmptyValue(!e.target.value)}
          placeholder="hola"
        ></Input>
      </Modal>
    </div>
  );
});

//«Реализовано с помощью сервиса «Яндекс.Словарь» https://tech.yandex.ru/dictionary.
