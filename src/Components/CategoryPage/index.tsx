import { Button, Input, Modal, PageHeader, Table } from "antd";
import React from "react";
import styles from "./styles.module.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { SoundOutlined, EditOutlined } from "@ant-design/icons";
import { api } from "../../utils/api";

export const CategoryPage: React.FC = React.memo(function CategoryPage() {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [popatTitle, setPopatTitle] = React.useState("");
  const inputRef = React.useRef<Input>(null);
  const navigate = useNavigate();

  const voice = (text: string) => {
    const reactivate = window.speechSynthesis;
    const word = new SpeechSynthesisUtterance();
    word.lang = "es-ES";
    word.text = text;
    reactivate.speak(word);
  };

  const [dataSource, setDateSource] = React.useState([
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
      editable: true,
      render: (text: string) => (
        <div className={styles.word}>
          <NavLink to={text}>{text}</NavLink>
          <SoundOutlined onClick={() => voice(text)} />
        </div>
      ),
    },
    {
      title: "Транскрипция",
      dataIndex: "transcription",
      key: "transcription",
      editable: true,
      render: (text: string) => {
        return (
          <div className={styles.word}>
            <span>{text}</span>
            <EditOutlined onClick={() => console.log(1)} />
          </div>
        );
      },
    },
    {
      title: "Перевод",
      dataIndex: "translation",
      key: "translation",
      editable: true,
    },
  ];

  const handleAddWord = (value: string) => {
    if (value) {
      const dataHasWord = dataSource.filter((el) => el.word === value).length;
      if (dataHasWord) {
        setPopatTitle("Это слово уже существует");
        inputRef.current?.setValue("");
      } else {
        setPopatTitle("Введите слово");
        api.getWordInformation(value).then((res) => {
          if (res.def[0]) {
            const wordInfo = res.def[0];
            const transcription = wordInfo.ts;
            const translation = wordInfo.tr[0].text;
            setDateSource(
              dataSource.concat({
                key: value,
                word: value,
                transcription,
                translation,
              })
            );
          } else {
            setDateSource(
              dataSource.concat({
                key: value,
                word: value,
                transcription: "",
                translation: "",
              })
            );
          }
        });
        inputRef.current?.setValue("");
      }
    }
  };

  return (
    <div className={styles.category}>
      <PageHeader
        title="Title"
        onBack={() => navigate(-1)}
        extra={[
          <Button
            key="1"
            type="primary"
            onClick={() => {
              setIsModalVisible(true);
              setPopatTitle("Введите слово");
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
      />

      <Modal
        title={popatTitle}
        visible={isModalVisible}
        cancelText="Отмена"
        onOk={() => handleAddWord(inputRef.current?.state.value.toLowerCase())}
        onCancel={() => setIsModalVisible(false)}
      >
        <Input ref={inputRef} placeholder="hola"></Input>
      </Modal>
    </div>
  );
});

//«Реализовано с помощью сервиса «Яндекс.Словарь» https://tech.yandex.ru/dictionary.
