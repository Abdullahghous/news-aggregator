import "./articles.css";
import { format } from "date-fns";

const ArticleInfo = (prop) => {
  return (
    <div className="article-info-box">
      <span>
        {" "}
        {prop.data?.source?.name} ▪️{" "}
        {format(new Date(prop?.data?.publishedAt ? prop?.data?.publishedAt : new Date()), "dd-MM-yyyy HH:mm")}
      </span>
      <h3>{prop.data?.title}</h3>
      <p className="article-content">{prop.data?.content}</p>
    </div>
  );
};

export default ArticleInfo;
