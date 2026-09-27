'use client';

import { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { ProjectCard } from '../components/ProjectCard';
import { ProjectDetail } from '../components/ProjectDetail';
import { StampSeal } from '../components/StampSeal';

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
    <main>
      <Header />

      {/* Hero Banner */}
      <section className="display-banner">
        <h1>SHIVAJI</h1>
        <p>Selected Works · {new Date().getFullYear()}</p>
      </section>

      {/* Bio Section */}
      <section className="page-wrapper">
        <div className="bio-section">
          <div>
            <p className="bio-text">
              <span className="bio-dropcap">I</span>&apos;m an engineer designing intelligent products and curious interfaces. My work lives at the intersection of systems thinking and creative exploration — building things that feel both inevitable and surprising.
            </p>
            <p className="bio-text" style={{ marginTop: '20px' }}>
              Currently exploring the space between AI and human creativity, always looking for the next interesting problem to solve.
            </p>
          </div>
          <div>
            <h2 className="bio-heading">
              Creative Developer<br />Based in Hyderabad, India.
            </h2>
            <div style={{ marginTop: '24px' }}>
              <StampSeal />
            </div>
          </div>
        </div>
      </section>

      {/* Work Section */}
      <section className="page-wrapper" id="work">
        <div style={{ textAlign: 'center', marginBottom: '43px' }}>
          <h2 className="heading-lg">ALL WORK!</h2>
          <p className="subheading" style={{ marginTop: '14px' }}>
            A collection of projects, experiments, and collaborations.
          </p>
        </div>

        {loading ? (
          <div className="project-grid">
            {[1, 2, 3].map(i => (
              <div key={i} className="loading-skeleton" style={{ height: '300px' }} />
            ))}
          </div>
        ) : (
          <div className="project-grid">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onSelect={setSelectedProject}
              />
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="footer" id="contact">
        <div>
          <h2 className="footer-cta">
            Let&apos;s make<br />something <em>play.</em>
          </h2>
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
