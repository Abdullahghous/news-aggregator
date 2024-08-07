import { useState, useEffect, FormEvent } from 'react';
import './Filters.css';

const Filters = ({ searchTextValue, filterDateVal, filterSourceVal, data }) => {
  const [searchText, setSearchText] = useState('lastest');
  const [filterDate, setFilterDate] = useState('');
  const [filterSource, setFilterSource] = useState("");

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    searchTextValue(searchText);
    filterDateVal(filterDate);
    filterSourceVal(filterSource);
  };

  useEffect(() => {
    console.log('data', data);
  }, []);

  return (
    <form className="filter-box" onSubmit={handleSearch}>
      <div>
        <input
          type="text"
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search for articles..."
        />
      </div>

      <div>
        <input
          type="date"
          onChange={(e) => setFilterDate(e.target.value)}
        />
      </div>

      <div>
      <select value={filterSource} onChange={(e) => setFilterSource(e.target.value)}>
          <option value="">All</option>
          <option value="NewsAPI">NewsAPI</option>
          <option value="The New York Times">The New York Times</option>
          {/* Add more sources as needed */}
        </select>
      </div>

      <button type="submit">Search</button>
    </form>
  );
};

export default Filters;