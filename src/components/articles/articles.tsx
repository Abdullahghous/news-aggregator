import { format } from "date-fns";
import "./articles.css";

const Article = (prop) => {
  return (
    <div key={prop.index} className="article-box">
      <div>
        <img className="article-img" src={prop.data.urlToImage} alt="Iamge" />
      </div>
      <div>
        <h3
          style={{
            margin: "0px",
            textDecoration: "underline",
            cursor: "pointer",
          }}
        >
          <a href={prop?.data?.url} target="_blank" style={{ color: "black" }}>
            {prop.data?.title}
          </a>
        </h3>
        <span className="article-date-source">
          {" "}
          {prop.data?.source?.name} ▪️{" "}
          {format(
            new Date(
              prop?.data?.publishedAt ? prop?.data?.publishedAt : new Date()
            ),
            "dd-MM-yyyy HH:mm"
          )}
        </span>
        <p>
          {prop.data?.content}
          <span style={{ cursor: "pointer" }}>
            <a href={prop?.data?.url} target="_blank">
              read more
            </a>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Article;
