import React, { useEffect, useState } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repo, setRepo] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepo(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: "Curso TOP",
      url: 'http://github.com/lucashfonseca123',
      techs: ['React native', 'Ruby on Rails']
    });

    const repositories = response.data;
    setRepo([...repo, repositories]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    const repositoryIndex = repo.findIndex(repos => repos.id === id);

    const repository = [...repo];

    repository.splice(repositoryIndex, 1);

    //Or const newRepositories = repo.filter(repos => repos.id !== id);
    setRepo(repository);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repo.map(repositories => (
          <li key={repositories.id}>
            {repositories.title}

            <button onClick={() => handleRemoveRepository(repositories.id)}>
              Remover
          </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
