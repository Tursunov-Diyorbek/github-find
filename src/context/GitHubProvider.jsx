import { useState } from 'react';
import GitHubContext from './GitHubContext';

const GitHubProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUser = async (username) => {
    setLoading(true);
    setError(null);
    setUser(null);
    setRepos([]);

    try {
      const cachedUser = localStorage.getItem(`github_user_${username}`);
      const cachedRepos = localStorage.getItem(`github_repos_${username}`);

      if (cachedUser && cachedRepos) {
        setUser(JSON.parse(cachedUser));
        setRepos(JSON.parse(cachedRepos));
        setLoading(false);
        return;
      }

      const userRes = await fetch(`https://api.github.com/users/${username}`);
      if (!userRes.ok) throw new Error('User not found');

      const userData = await userRes.json();
      setUser(userData);

      const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
      if (!reposRes.ok) throw new Error('Error fetching repos');

      const reposData = await reposRes.json();
      setRepos(reposData);

      localStorage.setItem(`github_user_${username}`, JSON.stringify(userData));
      localStorage.setItem(`github_repos_${username}`, JSON.stringify(reposData));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <GitHubContext.Provider value={{ user, repos, loading, error, fetchUser }}>
      {children}
    </GitHubContext.Provider>
  );
};

export default GitHubProvider;