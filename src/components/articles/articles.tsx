import ArticleInfo from "./article-info";
import "./articles.css";

const Article = (prop) => {
  return (
    <section  className={prop.showOneOnly ? 'article-trending' : 'article'} key={prop.index}>
      {prop.showOneOnly ? (
        <div className="trending-box">
          <img className="article-trending-img" src={prop.data.urlToImage} alt="Iamge" />
          <div className="article-trending-info-box">
            <ArticleInfo data={prop.data}/>
          </div>
        </div>
      ) : (
        <div>
          <img className="article-img" src={prop.data.urlToImage} alt="Iamge" />
          <ArticleInfo data={prop.data}/>
        </div>
      )}
    </section>
  );
};

export default Article;
