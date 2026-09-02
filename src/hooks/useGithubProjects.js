import { useState, useEffect } from 'react';
import {
  IconBrandJavascript,
  IconBrandTypescript,
  IconBrandPython,
  IconBrandReact,
  IconBrandHtml5,
  IconBrandCss3,
  IconCode,
} from '@tabler/icons-react';

const LANGUAGE_COLORS = {
  JavaScript: 'var(--accenty)',
  TypeScript: 'var(--accentb)',
  Python: 'var(--accentv)',
  HTML: 'var(--accento)',
  CSS: 'var(--accentc)',
  Java: 'var(--accentp)',
  'C++': 'var(--accentp)',
  Vue: 'var(--accentg)',
  Ruby: 'var(--accento)',
  default: 'var(--sectext)'
};

const LANGUAGE_ICONS = {
  JavaScript: IconBrandJavascript,
  TypeScript: IconBrandTypescript,
  Python: IconBrandPython,
  HTML: IconBrandHtml5,
  CSS: IconBrandCss3,
  React: IconBrandReact,
  default: IconCode
};

import { LOCAL_PROJECTS } from '../data/projects';

export function useGithubProjects(username = 'daredevil17052004') {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
        if (!res.ok) throw new Error('Failed to fetch from GitHub');
        const data = await res.json();

        // Filter out forks if you only want original projects
        const originals = data.filter(repo => !repo.fork);

        const mappedProjects = originals.map(repo => {
          const lang = repo.language || 'Unknown';
          
          // Find matching local project to restore custom descriptions, roles, etc.
          const localMatch = LOCAL_PROJECTS.find(p => p.githubName.toLowerCase() === repo.name.toLowerCase());
          
          const IconComponent = localMatch?.Icon || LANGUAGE_ICONS[lang] || LANGUAGE_ICONS.default;
          
          return {
            id: repo.id,
            name: localMatch?.name || repo.name,
            tagline: localMatch?.tagline || repo.description || 'No description provided.',
            desc: localMatch?.desc || repo.description || 'No description provided.',
            role: localMatch?.role || lang,
            duration: localMatch?.duration || new Date(repo.updated_at).getFullYear(),
            metric: localMatch?.metric || `${repo.stargazers_count} Stars`,
            metricColor: localMatch?.metricColor || LANGUAGE_COLORS[lang] || LANGUAGE_COLORS.default,
            category: localMatch?.category || lang,
            Icon: IconComponent,
            accent: localMatch?.accent || LANGUAGE_COLORS[lang] || LANGUAGE_COLORS.default,
            href: localMatch?.href !== undefined ? localMatch.href : (repo.homepage || repo.html_url),
            repo: repo.html_url,
            tech: localMatch?.tech || (repo.topics && repo.topics.length > 0 ? repo.topics : [lang]),
            highlights: localMatch?.highlights || [], // No stats if not local match!
            githubName: repo.name
          };
        });

        const filteredProjects = mappedProjects.filter(repo => 
          LOCAL_PROJECTS.some(p => p.githubName.toLowerCase() === repo.githubName.toLowerCase())
        );

        setProjects(filteredProjects);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(err.message);
        setLoading(false);
      }
    }

    fetchProjects();
  }, [username]);

  return { projects, loading, error };
}
