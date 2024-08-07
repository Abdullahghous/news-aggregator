import Header from "../header/Header";
import "./Home.css";
import Banner from "../banner/Banner";
import Article from "../articles/articles";
import {
  getNewsAPIArticles,
  getNYTArticles,
  getBBCArticles,
} from "../../services/news-api-service";
import { useEffect, useState } from "react";
import Filters from "../filters/Filter";
// import ArticleCard from '../components/ArticleCard';
// import SearchBar from '../components/SearchBar';

const Home = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, isLoading] = useState<boolean>(true);
  const [searchVal, setSearchVal] = useState<any>("latest");

  const [filterDate, setFilterDate] = useState<any>("");
  const [filterSource, setFilterSource] = useState<any>("");


  const fetchArticles = async () => {
    const newsAPIArticles = await getNewsAPIArticles(searchVal ? searchVal : 'lastest');
    const newNYTArticles = await getNYTArticles(searchVal ? searchVal : 'lastest');
    // const bbcArticles = await getBBCArticles(query);
  
    let combinedArticles = [...newsAPIArticles, ...newNYTArticles];
  
    if (filterDate) {
      console.log(filterDate, 'filterDate');
      combinedArticles = combinedArticles.filter(article =>
        new Date(article.publishedAt).toLocaleDateString() === new Date(filterDate).toLocaleDateString()
      );
    }
  
    if (filterSource) {
      combinedArticles = combinedArticles.filter(article => article.source.name === filterSource);
    }
  
    setArticles(combinedArticles);
    isLoading(false);
  };
  

  useEffect(() => {
    isLoading(true);
    fetchArticles().catch((err) => {
      console.log("err", err);
    });
  }, [searchVal, filterDate, filterSource]);

  return (
    <div className="home-container">
      <Header />
      <Banner />
      <Filters 
        data={articles} 
        searchTextValue={(searchVal) => setSearchVal(searchVal)} 
        filterDateVal={(date) => setFilterDate(date)} 
        filterSourceVal={(filterSource) => setFilterSource(filterSource)} 
      />
      <section className="no-rec-msg">
      {articles.length == 0 && !loading ? <p>No Articles Found 😞</p> : ''}
      </section>
      <section>
        {loading ? (
          <div className="laoding">
            <div className="spinner"></div>
          </div>
        ) : (
          <>
            {/* Showing Trending Article */}
            <section>
              {articles
                .filter((art) => art.urlToImage !== null)
                .slice(0, 1)
                .map((article, index) => (
                  <Article data={article} index={index} showOneOnly={true} />
                ))}
            </section>
            {/* Showing Lastest Articles */}
            <div className="article-box-heading">
              {/* <h2>Lastest News</h2> */}
              {/* <h2 className="see-more">See all </h2> */}
            </div>
            <div className="articles-container">
              {articles
                .filter((art) => art.urlToImage !== null)
                // .slice(0, 4)
                .map((article, index) => (
                  <Article data={article} index={index} showOneOnly={false} />
                ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default Home;
