import { useEffect, useState } from "react";

import './styles/global.scss';

type Repository = {
  id: number;
  name: string;
  favorite: boolean;
}

export function App() {
  const [repositories, setRepositories] = useState<Repository[]>([]);

  async function getRepositories(){
    const response = await fetch('https://api.github.com/users/matheusvinute/repos');
    const responseJson = await response.json();

    setRepositories(responseJson);
    console.log(responseJson);
  }

  useEffect(() => {
    getRepositories();
  }, [])

  useEffect(() => {
    const filtered = repositories.filter(repo => repo.favorite);

    document.title = `São ${filtered.length} Repositorios Favoritos`
  }, [repositories])

  function handleFavorite(id: number){
    const newRepositories = repositories.map(repo => {
      return repo.id === id ? {...repo, favorite: !repo.favorite} : repo
    })

    setRepositories(newRepositories);
  }

  return (
    <div className="container">
      <h1>Github Explorer</h1>
      <ul>
        {repositories.map(repo => (
          <li key={repo.id}>
            {repo.name}
            {repo.favorite && <span>(Favoritado)</span>}
            <button onClick={() => handleFavorite(repo.id)}>
              Favorito
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}