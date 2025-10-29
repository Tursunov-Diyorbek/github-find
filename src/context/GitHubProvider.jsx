import { useState } from 'react';
import GitHubContext from './GitHubContext';

const GitHubProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUser = async (username) => {
    setLoading(true);
    setError(null);
    setUser(null);
    setRepos([]);
    setFollowers([]);

    try {
      const userRes = await fetch(`https://api.github.com/users/${username}`);
      if (!userRes.ok) throw new Error('Foydalanuvchi topilmadi');

      const userData = await userRes.json();
      setUser(userData);

      const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
      if (!reposRes.ok) throw new Error('Repozitoriyalarni olishda xatolik');

      const reposData = await reposRes.json();
      setRepos(reposData);

      const reposFollowers = await fetch(`https://api.github.com/users/${username}/followers`);
      if (!reposFollowers.ok) throw new Error('Kuzatuvchilarni olishda xatolik');

      const reposFollowersData = await reposFollowers.json();
      setFollowers(reposFollowersData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <GitHubContext.Provider value={{ user, repos, followers, loading, error, fetchUser }}>
      {children}
    </GitHubContext.Provider>
  );
};

export default GitHubProvider;