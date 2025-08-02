export const Search = ({ searchKey, setSearchKey }) => {
  const handleChange = (e) => {
    setSearchKey(e.target.value);
  };

  return (
    <div className="user-search-area">
      <input
        type="text"
        className="user-search-text"
        value={searchKey}
        onChange={handleChange}
      />
      <i className="fa fa-search user-search-btn" aria-hidden="true"></i>
    </div>
  );
};
