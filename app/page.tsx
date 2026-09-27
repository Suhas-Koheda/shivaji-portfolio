'use client';

import { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { ProjectDetail } from '../components/ProjectDetail';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface DriveFile {
  id: string;
  name: string;
  type: 'image' | 'video' | 'other';
}

interface ProjectData {
  id: string;
  name: string;
  files: DriveFile[];
  images: DriveFile[];
  videos: DriveFile[];
}

export default function Home() {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(true);
  const scrollRef = useScrollAnimation();

  useEffect(() => {
    async function loadProjects() {
      try {
        const res = await fetch('/api/drive');
        const data = await res.json();
        setProjects(data.projects || []);
      } catch (e) {
        console.error('Failed to load projects:', e);
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, []);

  if (selectedProject) {
    return (
      <main>
        <Header />
        <div className="page-wrapper">
          <ProjectDetail project={selectedProject} onClose={() => setSelectedProject(null)} />
        </div>
      </main>
    );
  }

  return (
    <main ref={scrollRef}>
      <Header />

      {/* Hero */}
      <section className="hero">
        <h1 className="hero-wordmark">FLIM</h1>
        <div className="hero-tagline">
          <h2>Creative Developer<br />& Designer</h2>
          <p>Building digital experiences that feel inevitable and surprising. Based in Hyderabad, India.</p>
        </div>
      </section>

      {/* Search Bar */}
      <div className="page-wrapper">
        <div className="search-bar">
          <input type="text" placeholder="Search anything" />
          <button>Search ⌘/</button>
        </div>
      </div>

      {/* Work Section */}
      <section className="page-wrapper">
        <div className="project-nav">
          <a href="#work" className="project-nav-link active">All Work</a>
          {projects.map(p => (
            <a key={p.id} href={`#${p.id}`} className="project-nav-link">{p.name}</a>
          ))}
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="loading-progress">Loading...</div>
            <div className="loading-bar"><div className="loading-bar-fill" style={{ width: '60%' }} /></div>
          </div>
        ) : (
          <div className="project-section" id="work">
            <div className="project-header">
              <h2 className="project-title">
                <span className="highlight-heading">Selected</span> Works
              </h2>
              <p className="project-meta">{projects.length} Projects · Updated {new Date().getFullYear()}</p>
            </div>

            <div className="scattered-grid">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="image-card"
                  onClick={() => setSelectedProject(project)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && setSelectedProject(project)}
                  style={{ cursor: 'pointer' }}
                >
                  {project.images[0] ? (
                    <img
                      src={`https://lh3.googleusercontent.com/d/${project.images[0].id}=w400`}
                      alt={project.name}
                      loading="lazy"
                    />
                  ) : project.videos[0] ? (
                    <div style={{ width: '100%', aspectRatio: '16/9', background: 'var(--color-ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-paper)', fontSize: '48px', fontFamily: 'var(--font-swizzy)' }}>
                      ▶
                    </div>
                  ) : (
                    <div style={{ width: '100%', aspectRatio: '4/3', background: 'var(--color-mist)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px', fontFamily: 'var(--font-swizzy)' }}>
                      {project.name.charAt(0)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Brand Strip */}
      <section className="brand-strip">
        <p className="caption">Trusted by the brands shaping culture</p>
        <div className="brand-logos">
          <span className="brand-logo">ATLAS WEAR</span>
          <span className="brand-logo">LABEL EMUSE</span>
          <span className="brand-logo">MARSHMELLO</span>
          <span className="brand-logo">SOT FOREVER</span>
          <span className="brand-logo">YES MA'AM</span>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div>
          <h2 className="footer-cta">Let&apos;s make<br />something <span className="highlight-heading">play.</span></h2>
          <a href="mailto:hello@shivaji.dev" className="footer-link" style={{ marginTop: '20px', display: 'inline-block' }}>
            hello@shivaji.dev ↗
          </a>
        </div>
        <div className="footer-copy">
          © {new Date().getFullYear()} SHIVAJI · MADE WITH INTENTION
        </div>
      </footer>
    </main>
  );
}
