import axios from 'axios';

const NEWS_API_KEY = '1b5785319e1b40e48486352dbe05a63e';
const NYT_API_KEY = 'JyChfVgHc4rk5EjG14gtKWuTadbYEA6Z';
const BBC_API_KEY = 'your_bbc_key';

const getNewsAPIArticles = async (seachVal: string) => {
  const response = await axios.get(`https://newsapi.org/v2/everything?q=${seachVal}&apiKey=${NEWS_API_KEY}`);
  return response.data.articles;
};

const getNYTArticles = async (seachVal: string) => {
  const response = await axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q${seachVal}&api-key=${NYT_API_KEY}`);
  if(response.data.response.docs.length) {
    const data = response.data.response.docs;
    const modifiedNewNYTArticles = data.map((nyt) => ({
      urlToImage :`${process.env.PUBLIC_URL}/assets/img/img-not-found.png`,
      source: {
        name: nyt.source
      },
      publishedAt: nyt.pub_date,
      title: nyt.abstract,
      content: nyt.lead_paragraph
    }))
    return modifiedNewNYTArticles;
  } else {
    return [];
  }
};

// const getGuardianArticles = async (query: string) => {
//   const response = await axios.get(`https://content.guardianapis.com/search?q=${seachVal}&api-key=${GUARDIAN_API_KEY}`);
//   return response.data.response.results;
// };

const getBBCArticles = async (query: string) => {
  const response = await axios.get(`https://newsapi.org/v2/everything?sources=bbc-news&q=${query}&apiKey=${BBC_API_KEY}`);
  return response.data.articles;
};

export { getNewsAPIArticles, getNYTArticles, getBBCArticles };
