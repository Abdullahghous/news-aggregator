import axios from "axios";

// should be from .env for demo purpose I did in this way
const NEWS_API_KEY = "1b5785319e1b40e48486352dbe05a63e";
const NYT_API_KEY = "JyChfVgHc4rk5EjG14gtKWuTadbYEA6Z";

const getNewsAPIArticles = async (seachVal) => {
  try {
    const response = await axios.get(
      `https://newsapi.org/v2/everything?q=${seachVal}&sortBy=popularity&apiKey=${NEWS_API_KEY}`
    );
    return response.data.articles;
  } catch (error) {
    console.log("ERROR WHILE FETCHING NEW API ARTICLES::", error);
  }
};

const getNYTArticles = async (seachVal) => {
  try {
    const response = await axios.get(
      `https://api.nytimes.com/svc/search/v2/articlesearch.json?q${seachVal}&api-key=${NYT_API_KEY}`
    );
    if (response.data.response.docs.length) {
      const data = response.data.response.docs;
      const modifiedNewNYTArticles = data?.map((nyt) => ({
        urlToImage: `${process.env.PUBLIC_URL}/assets/img/img-not-found.png`,
        web_url: nyt.web_url,
        source: {
          name: nyt.source,
        },
        publishedAt: nyt.pub_date,
        title: nyt.abstract,
        content: nyt.lead_paragraph,
      }));
      return modifiedNewNYTArticles;
    } else {
      return [];
    }
  } catch (error) {
    console.log("ERROR WHILE FETCHING NYT API ARTICLES::", error);
  }
};

export { getNewsAPIArticles, getNYTArticles };
