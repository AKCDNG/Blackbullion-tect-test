import { useState, useEffect } from 'react';
import Path from './path';
import './App.scss';

import type PathType from '../lib/constants';
const URL: string = 'https://www.blackbullion.com/api/_dev/pathways';

function App() {
  const controller = new AbortController();
  const [apiFetch, setApiFetch] = useState<Array<PathType>>([]);

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
        <ul>
          <li>
            {apiFetch.map(
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
      </div>
    </main>
  );
}

export default App;
