import Header from "../header/Header";
import Banner from "../banner/Banner";
import Article from "../articles/articles";
import {
  getNewsAPIArticles,
  getNYTArticles,
  getGuradianArticles,
} from "../../services/news-api-service";
import { useEffect, useState, useCallback } from "react";
import Filters from "../filters/Filter";
import "./Home.css";
import Category from "../categroy/Category";

const Home = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchVal, setSearchVal] = useState<any>("Latest");
  const [filterDate, setFilterDate] = useState<any>("");
  const [filterSource, setFilterSource] = useState<any>("");

  const fetchArticles = useCallback(async () => {
    setLoading(true);

    const newsAPIArticles = await getNewsAPIArticles(searchVal || "Latest");
    const newNYTArticles = await getNYTArticles(searchVal || "Latest");
    const newGuradianArticles = await getGuradianArticles(
      searchVal || "Latest"
    );

    let combinedArticles = [
      ...newsAPIArticles,
      ...newNYTArticles,
      ...newGuradianArticles,
    ];

    setArticles(combinedArticles);
    setLoading(false);
  }, [searchVal]);

  const filterArticles = useCallback(() => {
    return articles.filter((article) => {
      const matchesDate =
        !filterDate ||
        new Date(article.publishedAt).toLocaleDateString() ===
          new Date(filterDate).toLocaleDateString();
      const matchesSource =
        !filterSource || article.source.name === filterSource;

      return matchesDate && matchesSource;
    });
  }, [articles, filterDate, filterSource]);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  const filteredArticles = filterArticles();

  function handleOnChangeCategory(sc: any) {
    setSearchVal(sc);
  }

  return (
    <div className="home-container">
      <Header />
      <div className="banner-filter-box">
        <Banner />
        <Filters
          data={articles}
          searchTextValue={setSearchVal}
          filterDateVal={setFilterDate}
          filterSourceVal={setFilterSource}
        />
      </div>
      <Category sc={handleOnChangeCategory} />
      <section>
        {filteredArticles.length === 0 && !loading ? (
          <p className="no-rec-msg">No Articles Found 😞</p>
        ) : (
          <h3 style={{ margin: "0px", fontSize: "1.5rem" }}>
            {searchVal} Articles
          </h3>
        )}
      </section>
      <section>
        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
          </div>
        ) : (
          <div className="articles-container">
            {filteredArticles
              .filter((art) => art.urlToImage !== null)
              .map((article, index) => (
                <Article
                  key={index}
                  data={article}
                  index={index}
                  showOneOnly={false}
                />
              ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
