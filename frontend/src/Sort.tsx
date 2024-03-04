function Sort({sortAlphabetical, sortRecent}) {
  return (
    <div className='sort-wrapper'>
      <h3>Sort</h3>
      <div className='sort-options'>
        <button className='sort-btn' onClick={sortAlphabetical}>
          A-Z
        </button>
        <button className='sort-btn' onClick={sortRecent}>
          Most Recent
        </button>
      </div>
    </div>
  );
}

export default Sort
