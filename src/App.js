import React, { Component, useState, useEffect } from 'react';

const App = () => {
  const [news, setNews] = useState([]);
  const [searchQuery, setSearchQuery] = useState('react')
  const [url, setUrl] = useState('http://hn.algolia.com/api/v1/search?query=react')
  const [loading, setLoading] = useState(false);
  const fetchNews = () => {
    setLoading(true)
    fetch(url)
    .then(result => result.json())
    .then(data => (setNews(data.hits), setLoading(false)))
    .catch(error => console.log(error))
  }

  useEffect(() => {
    fetchNews()
  }, [url]);

  const handleChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    setUrl(`http://hn.algolia.com/api/v1/search?query=${searchQuery}`)
  }
  
  
  return(
    <div>
      <h2>News:</h2>
      {loading ? <h2>loading...</h2> : ""}
      <form onSubmit={handleSubmit}>
        <input type="text" value={searchQuery} onChange={handleChange}/>
        <button>Search</button>
      </form>
      {news.map((n, i) => (<p key={i}>{n.title}</p>))}
    </div>
  )
}



export default App;
