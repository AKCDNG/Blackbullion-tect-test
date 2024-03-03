import { useState, useEffect } from 'react';
import Path from './path';
import './App.scss';

import type PathType from '../lib/constants';
const URL: string = 'https://www.blackbullion.com/api/_dev/pathways';

function App() {
  const controller = new AbortController();
  const [apiFetch, setApiFetch] = useState<Array<PathType>>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const coursesPerPage: number = 10;

  const startIndex: number = (currentPage - 1) * coursesPerPage;
  const endIndex: number = startIndex + coursesPerPage;
  const currentCourses: Array<PathType> = apiFetch.slice(0, endIndex);

  const handleLoadMore = (): void => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const sortAlphabetical = () => {
    const sortedData = [...apiFetch].sort((a: PathType, b: PathType) =>
      a.title.localeCompare(b.title)
    );
    setApiFetch(sortedData);
  };

  const sortRecent = () => {
    const sortedData = [...apiFetch].sort(
      (a: PathType, b: PathType) => b.id - a.id
    );
    setApiFetch(sortedData);
  };

  useEffect(() => {
    fetch(URL)
      .then((response) => response.json())
      .then((data) => setApiFetch(data))
      .catch((error) => console.error(error));
    return () => controller.abort();
  }, []);
  return (
    <main>
      <div className='wrapper'>
        <div className='sort-wrapper'>
          <h3>Sort</h3>
          <div className='sort-options'>
            <button onClick={sortAlphabetical}>A-Z</button>
            <button onClick={sortRecent}>Most Recent</button>
          </div>
        </div>
        <ul>
          <li>
            {currentCourses.map(
              ({
                id,
                title,
                internal_title,
                url,
                intro,
                duration,
                image,
                type,
                has_summative_assessment,
              }) => {
                return (
                  <div className='path-wrap' key={id}>
                    <Path
                      title={title}
                      image={image}
                      url={url}
                      internal_title={internal_title}
                      intro={intro}
                      duration={duration}
                      type={type}
                      has_summative_assessment={
                        has_summative_assessment
                      }></Path>
                  </div>
                );
              }
            )}
          </li>
        </ul>
        <div onClick={handleLoadMore}>loadmore</div>
      </div>
    </main>
  );
}

export default App;
