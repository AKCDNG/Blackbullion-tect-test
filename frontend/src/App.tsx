import { useState, useEffect } from 'react';
import Path from './path';
import Sort from './Sort';
import './App.scss';
import { coursesPerPage } from '../lib/constants';

import type { PathType } from '../lib/constants';
const URL: string = 'https://www.blackbullion.com/api/_dev/pathways';

function App() {
  const controller = new AbortController();
  const [apiFetch, setApiFetch] = useState<Array<PathType>>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const startIndex: number = (currentPage - 1) * coursesPerPage;
  const endIndex: number = startIndex + coursesPerPage;
  const currentCourses: Array<PathType> = apiFetch.slice(0, endIndex);

  const handleLoadMore = (): void => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const sortAlphabetical = (): void => {
    const sortedData = [...apiFetch].sort((a: PathType, b: PathType) =>
      a.title.localeCompare(b.title)
    );
    setApiFetch(sortedData);
  };

  const sortRecent = (): void => {
    const sortedData: Array<PathType> = [...apiFetch].sort(
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
        <Sort sortAlphabetical={sortAlphabetical} sortRecent={sortRecent} />
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
        <button className='load-more' onClick={handleLoadMore}>
          Load More Courses
        </button>
      </div>
    </main>
  );
}

export default App;
