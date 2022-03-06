import { PageHeader } from "antd";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SoundOutlined } from "@ant-design/icons";
import { capitalize } from "../../utils/capitalize";
import { getWordInformation } from "../../utils/getNewWord";
import { getImageURL } from "../../utils/getImageURL";
import { getPathSpeach } from "../../utils/getPathSpeach";
import { voice } from "../../utils/voice";

import styles from "./styles.module.scss";

export const WordPage: React.FC = React.memo(function WordPage() {
  const title = capitalize(useParams().word || "");
  const [imageUrl, setImageUrl] = React.useState("");
  const [examples, setExamples] = React.useState<null | string[]>(null);

  const navigate = useNavigate();

  //TODO перенести в редакс
  const [wordInfo, setWordInfo] = React.useState<Record<any, any> | null>(null);

  React.useEffect(() => {
    getWordInformation(title.toLowerCase()).then((res) => setWordInfo(res));
    getImageURL(title)
      .then((res) => setImageUrl(res))
      .catch(() => setImageUrl(""));
  }, [title]);

  React.useEffect(() => {
    if (wordInfo?.def[0].tr[0].ex) {
      setExamples(wordInfo?.def[0].tr[0].ex.map((el: any) => el.text));
    }
  }, [wordInfo?.def]);
  const pathSpeech = getPathSpeach(wordInfo?.def[0].pos);
  const ts = wordInfo?.def[0].ts;
  const gen = wordInfo?.def[0].gen === "f" ? "жен. род" : "муж. род";
  const translations = wordInfo?.def[0].tr.map((el: any) => el.text).join(", ");

  return (
    <div className={styles.wordPage}>
      <PageHeader
        className="site-page-header"
        onBack={() => navigate(-1)}
        title={title}
      />
      <div className={styles.wordInfo}>
        <div className={styles.pos}>
          {pathSpeech}, {gen}
        </div>
        <div>
          <span className={styles.rowTitle}>Произношение:</span>
          <span>{ts}</span>
          <SoundOutlined onClick={() => voice(title)} />
        </div>
        <div>
          <span className={styles.rowTitle}>Перевод:</span>
          <span>{translations}</span>
        </div>
        <div>
          <span className={styles.rowTitle}>Примеры:</span>
          <div>{examples && examples.map((ex: string) => <div>{ex}</div>)}</div>
        </div>
      </div>
      {imageUrl && <img className={styles.img} src={imageUrl} alt={title} />}
    </div>
  );
});
