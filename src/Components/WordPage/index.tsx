import { PageHeader } from "antd";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SoundOutlined } from "@ant-design/icons";
import { capitalize } from "../../utils/capitalize";
import { getImageURL } from "../../utils/getImageURL";
import { voice } from "../../utils/voice";
import { useAppSelector } from "../../hooks/redux-hooks";
import { selectWords } from "../redux/wordSlice";

import styles from "./styles.module.scss";

export const WordPage: React.FC = React.memo(function WordPage() {
  const title = useParams().word || "";
  const [imageUrl, setImageUrl] = React.useState("");
  const wordInfo = useAppSelector(selectWords).find(
    (word) => word.key === title
  );

  const navigate = useNavigate();

  React.useEffect(() => {
    getImageURL(title)
      .then((res) => setImageUrl(res))
      .catch(() => setImageUrl(""));
  }, [title]);

  return (
    <div className={styles.wordPage}>
      <PageHeader
        className="site-page-header"
        onBack={() => navigate(-1)}
        title={capitalize(title)}
      />
      <div className={styles.wordInfo}>
        {(wordInfo?.pos || wordInfo?.gen) && (
          <div className={styles.pos}>
            {wordInfo?.pos}, {wordInfo?.gen}
          </div>
        )}
        <div>
          <span className={styles.rowTitle}>Произношение:</span>
          <span>{wordInfo?.transcription}</span>
          <SoundOutlined onClick={() => voice(title)} />
        </div>
        <div>
          <span className={styles.rowTitle}>Перевод:</span>
          <span>
            {wordInfo?.translationes && wordInfo.translationes.join(", ")}
          </span>
        </div>
        <div>
          <span className={styles.rowTitle}>Примеры:</span>
          <div>
            {wordInfo?.examples &&
              wordInfo?.examples.map((ex: string) => <div>{ex}</div>)}
          </div>
        </div>
      </div>
      {imageUrl && <img className={styles.img} src={imageUrl} alt={title} />}
    </div>
  );
});
