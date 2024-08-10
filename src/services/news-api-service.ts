import axios from "axios";

// should be from .env for demo purpose I did in this way
const NEWS_API_KEY = "1b5785319e1b40e48486352dbe05a63e";
const NYT_API_KEY = "JyChfVgHc4rk5EjG14gtKWuTadbYEA6Z";
const GURADIAN_API_KEY = "0cfaba44-a5ca-45d0-8b33-addf6c1cdc7d"

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
        url: nyt.web_url,
        source: {
          name: nyt.source,
        },
        publishedAt: nyt.pub_date,
        title: nyt.abstract,
        content: nyt.lead_paragraph,
      }));
      return modifiedNewNYTArticles;
    }
  } catch (error) {
    console.log("ERROR WHILE FETCHING NYT API ARTICLES::", error);
  }
};

const getGuradianArticles = async (seachVal) => {
  try {
    const response = await axios.get(
      `https://content.guardianapis.com//search?q=${seachVal}&show-fields='headline,trailText,body,thumbnail'&api-key=${GURADIAN_API_KEY}`
    );
    if (response.data.response.results.length) {
      const data = response.data.response.results;
      const modifiedGuradianArticles = data?.map((ga) => ({
        urlToImage: `${process.env.PUBLIC_URL}/assets/img/img-not-found.png`,
        url: ga.webUrl,
        source: {
          name: 'The Guardian',
        },
        publishedAt: ga.webPublicationDate,
        title: ga.webTitle,
        content: ga.fields.trailText,
      }));
      return modifiedGuradianArticles;
    }
  } catch (error) {
    console.log("ERROR WHILE FETCHING NEW API ARTICLES::", error);
  }
};

export { getNewsAPIArticles, getNYTArticles, getGuradianArticles };
