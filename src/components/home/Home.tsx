import Header from "../header/Header";
import Banner from "../banner/Banner";
import Article from "../articles/articles";
import {
  getNewsAPIArticles,
  getNYTArticles,
} from "../../services/news-api-service";
import { useEffect, useState } from "react";
import Filters from "../filters/Filter";
import "./Home.css";
import Category from "../categroy/Category";

const Home = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, isLoading] = useState<boolean>(true);
  const [searchVal, setSearchVal] = useState<any>("Latest");
  const [filterDate, setFilterDate] = useState<any>("");
  const [filterSource, setFilterSource] = useState<any>("");

  const fetchArticles = async () => {
    const newsAPIArticles = await getNewsAPIArticles(
      searchVal ? searchVal : "Latest"
    );
    const newNYTArticles = await getNYTArticles(
      searchVal ? searchVal : "Latest"
    );

    let combinedArticles = [...newsAPIArticles, ...newNYTArticles];

    if (filterDate & filterSource) {
      combinedArticles = combinedArticles.filter(
        (article) =>
          new Date(article.publishedAt).toLocaleDateString() ===
            new Date(filterDate).toLocaleDateString() &&
          article.source.name === filterSource
      );
    } else if (filterSource) {
      combinedArticles = combinedArticles.filter(
        (article) => article.source.name === filterSource
      );
    } else if (filterDate) {
      combinedArticles = combinedArticles.filter(
        (article) =>
          new Date(article.publishedAt).toLocaleDateString() ===
          new Date(filterDate).toLocaleDateString()
      );
    }

    setArticles(combinedArticles);
    isLoading(false);
  };

  useEffect(() => {
    isLoading(true);
    fetchArticles();
  }, [searchVal]);

  function handleOnChangeCategory(sc: any) {
    setSearchVal(sc);
    fetchArticles();
  }

  return (
    <div className="home-container">
      <Header />
      <div className="banner-filter-box">
        <Banner />
        <Filters
          data={articles}
          searchTextValue={(searchVal) => setSearchVal(searchVal)}
          filterDateVal={(date) => setFilterDate(date)}
          filterSourceVal={(filterSource) => setFilterSource(filterSource)}
        />
      </div>
      <Category sc={(sc) => handleOnChangeCategory(sc)} />
      <section>
        {articles.length == 0 && !loading ? (
          <p className="no-rec-msg">No Articles Found 😞</p>
        ) : (
          <h3 style={{ margin: "0px", fontSize: "1.5rem" }}>
            {searchVal} Articles
          </h3>
        )}
      </section>
      <section>
        {loading ? (
          <div className="laoding">
            <div className="spinner"></div>
          </div>
        ) : (
          <>
            <div className="articles-container">
              {articles
                .filter((art) => art.urlToImage !== null)
                // .slice(0, 4)
                .map((article, index) => (
                  <Article
                    key={index}
                    data={article}
                    index={index}
                    showOneOnly={false}
                  />
                ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default Home;
