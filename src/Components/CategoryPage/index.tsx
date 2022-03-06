import { Button, Input, Modal, PageHeader, Table } from "antd";
import React from "react";
import styles from "./styles.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { SoundOutlined } from "@ant-design/icons";
import { getNewWord } from "../../utils/getNewWord";
import { EditableCell } from "./EditableCell";
import { IColKey, ICols } from "../types";
import { capitalize } from "../../utils/capitalize";
import { voice } from "../../utils/voice";

export const CategoryPage: React.FC = React.memo(function CategoryPage() {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [popatTitle, setPopatTitle] = React.useState("");
  const inputRef = React.useRef<Input>(null);
  const navigate = useNavigate();

  const title = capitalize(useParams().name || "");

  const [isEmptyValue, setIsEmptyValue] = React.useState(true);

  const [dataSource, setDateSource] = React.useState<ICols[]>([
    {
      key: "madre",
      word: "madre",
      transcription: "<ˈmaðɾe>",
      translation: "мать",
    },
  ]);

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
      render: (text: string, record: ICols) => {
        return (
          <div className={styles.word}>
            <EditableCell
              text={text}
              getWord={(val) =>
                handleUpdateWord(record.key, "transcription", val)
              }
            />
          </div>
        );
      },
    },
    {
      title: "Перевод",
      dataIndex: "translation",
      key: "translation",
      render: (text: string, record: ICols) => {
        return (
          <div className={styles.word}>
            <EditableCell
              text={text}
              getWord={(val) =>
                handleUpdateWord(record.key, "translation", val)
              }
            />
          </div>
        );
      },
    },
  ];

  const handleAddWord = React.useCallback(
    async (value: string) => {
      if (value) {
        const dataHasWord = dataSource.filter((el) => el.word === value).length;
        if (dataHasWord) {
          setPopatTitle("Это слово уже существует");
          inputRef.current?.setValue("");
        } else {
          setPopatTitle("Введите слово");
          getNewWord(value)
            .then((res) => {
              setDateSource(
                dataSource.concat({
                  key: value,
                  word: value,
                  transcription: res.transcription,
                  translation: res.translation,
                })
              );
            })
            .catch(() =>
              setDateSource(
                dataSource.concat({
                  key: value,
                  word: value,
                  transcription: "",
                  translation: "",
                })
              )
            );
          inputRef.current?.setValue("");
        }
      }
    },
    [dataSource]
  );

  const handleUpdateWord = React.useCallback(
    (key: string, col: IColKey, value: string) => {
      if (col === "word") {
        getNewWord(value)
          .then((res) => {
            setDateSource(
              dataSource.map((el) =>
                el.key === key
                  ? {
                      key: value,
                      word: value,
                      transcription: res.transcription,
                      translation: res.translation,
                    }
                  : el
              )
            );
          })
          .catch(() =>
            setDateSource(
              dataSource.map((el) =>
                el.key === key
                  ? {
                      key: value,
                      word: value,
                      transcription: "",
                      translation: "",
                    }
                  : el
              )
            )
          );
      } else {
        setDateSource(
          dataSource.map((el) =>
            el.key === key ? { ...el, [col]: value } : el
          )
        );
      }
    },
    [dataSource]
  );

  return (
    <div className={styles.category}>
      <PageHeader
        title={title}
        onBack={() => navigate(-1)}
        extra={[
          <Button
            key="1"
            type="primary"
            onClick={() => {
              setIsModalVisible(true);
              setPopatTitle("Введите слово");
              requestAnimationFrame(() => inputRef.current?.input.focus());
            }}
          >
            Добавить слово
          </Button>,
        ]}
      />

      <Table
        className={styles.table}
        dataSource={dataSource}
        columns={columns}
        tableLayout="fixed"
      />

      <Modal
        title={popatTitle}
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
