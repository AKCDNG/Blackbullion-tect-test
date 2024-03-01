import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

const URL: string = 'https://www.blackbullion.com/api/_dev/pathways';

function App() {
  const controller = new AbortController();
  const [apiFetch, setApiFetch] = useState(0);

  useEffect(() => {
    async function getData() {
      const response = await fetch(URL);
      const data = await response.json();
      setApiFetch(data);
    }

    getData();

    console.log(apiFetch);

    return () => controller.abort();
  }, []);

  return <></>;
}

export default App;
