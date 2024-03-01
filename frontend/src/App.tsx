import { useState, useEffect } from 'react';
import Path from './path';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

type Path = {
  id: number;
  title: string;
  internal_title: string;
  url: string;
  intro: string;
  duration: string;
  image: string;
  type: string;
  has_summative_assessment: boolean;
};
const URL: string = 'https://www.blackbullion.com/api/_dev/pathways';

function App() {
  const controller = new AbortController();
  const [apiFetch, setApiFetch] = useState<Array<Path>>([]);

  useEffect(() => {
    fetch(URL)
      .then((response) => response.json())
      .then((data) => setApiFetch(data))
      .catch((error) => console.error(error));
    return () => controller.abort();
  }, []);
  return (
    <>
      <div className='wrapper'>
        {apiFetch.map(({id, title, internal_title, url, intro, duration, image, type, has_summative_assessment}) => {
          return (
            <div className="path-wrap" key={id}>
              <Path title={title}></Path>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
