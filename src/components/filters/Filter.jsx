import { useState, useEffect, FormEvent } from "react";
import "./Filters.css";

const Filters = ({ searchTextValue, filterDateVal, filterSourceVal, data }) => {
  const [searchText, setSearchText] = useState("lastest");
  const [filterDate, setFilterDate] = useState("");
  const [filterSource, setFilterSource] = useState("");
  const [sources, setSources] = useState([]);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    searchTextValue(searchText);
    filterDateVal(filterDate);
    filterSourceVal(filterSource);
  };

  useEffect(() => {
    const sourceNames = data.map((d) => d?.source?.name);
    const uniqueNames = [...new Set(sourceNames)];
    if (uniqueNames.length) {
      setSources(uniqueNames);
    }
  }, [data]);

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
        <input type="date" onChange={(e) => setFilterDate(e.target.value)} />
      </div>

      <div>
        <select
          value={filterSource}
          onChange={(e) => setFilterSource(e.target.value)}
        >
          <option value="">All</option>
          {sources.map((val) => (
            <option key={val} value={val}>
              {val}
            </option>
          ))}
        </select>
      </div>

      <button type="submit">Search</button>
    </form>
  );
};

export default Filters;
