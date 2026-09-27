'use client';

import { useState } from 'react';
import { ProjectData } from '../data/driveScanner';
import { getDriveFileUrl } from '../data/driveConfig';

interface ProjectCardProps {
  project: ProjectData;
  index: number;
  onSelect: (project: ProjectData) => void;
}

export function ProjectCard({ project, index, onSelect }: ProjectCardProps) {
  const [imgError, setImgError] = useState(false);
  const coverImage = project.images[0];
  const hasVideo = project.videos.length > 0;

  return (
    <article
      className="project-card"
      onClick={() => onSelect(project)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onSelect(project)}
      aria-label={`View ${project.name}`}
    >
      {coverImage && !imgError ? (
        <img
          className="project-card-image"
          src={getDriveFileUrl(coverImage.id)}
          alt={`${project.name} cover image`}
          onError={() => setImgError(true)}
          referrerPolicy="no-referrer"
        />
      ) : hasVideo ? (
        <video
          className="project-card-video"
          src={getDriveFileUrl(project.videos[0].id)}
          muted
          loop
          playsInline
          autoPlay
        />
      ) : (
        <div
          className="project-card-image"
          style={{
            background: 'var(--color-bone-cream)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '48px',
            fontFamily: 'var(--font-canopee)',
            minHeight: '200px',
          }}
        >
          {project.name.charAt(0)}
        </div>
      )}
      <div className="project-card-content">
        <h3 className="project-card-title">
          {project.name}
          {index < 3 && <span className="new-badge">NEW</span>}
        </h3>
        <p className="project-card-description">
          {project.images.length} images{project.videos.length > 0 && ` · ${project.videos.length} videos`}
        </p>
        <span className="project-card-meta">
          {new Date().getFullYear()} · VIEW PROJECT →
        </span>
      </div>
    </article>
  );
}
