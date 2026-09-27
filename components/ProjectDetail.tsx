'use client';

import { useState, useEffect } from 'react';
import { ProjectData } from '../data/driveScanner';
import { getDriveFileUrl } from '../data/driveConfig';

interface ProjectDetailProps {
  project: ProjectData;
  onClose: () => void;
}

export function ProjectDetail({ project, onClose }: ProjectDetailProps) {
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [allLoaded, setAllLoaded] = useState(false);
  const totalImages = project.images.length;

  useEffect(() => {
    if (totalImages === 0) {
      setAllLoaded(true);
      return;
    }

    let loaded = 0;

    project.images.forEach((image) => {
      const img = new Image();
      img.onload = () => {
        loaded++;
        setImagesLoaded(loaded);
        if (loaded === totalImages) setAllLoaded(true);
      };
      img.onerror = () => {
        loaded++;
        setImagesLoaded(loaded);
        if (loaded === totalImages) setAllLoaded(true);
      };
      img.src = getDriveFileUrl(image.id);
    });
  }, [project.images, totalImages]);

  if (!allLoaded) {
    return (
      <div className="loading-container">
        <div className="loading-progress">{imagesLoaded}/{totalImages}</div>
        <p className="subheading">Loading {project.name}...</p>
        <div className="loading-bar">
          <div className="loading-bar-fill" style={{ width: `${(imagesLoaded / totalImages) * 100}%` }} />
        </div>
      </div>
    );
  }

  return (
    <div className="project-detail">
      <button className="back-button" onClick={onClose}>
        ← Back to all work
      </button>

      <div className="project-header">
        <h2 className="project-title">{project.name}</h2>
        <p className="project-meta">
          {project.images.length} images · {project.videos.length} videos
        </p>
      </div>

      {project.videos.length > 0 && (
        <div className="scattered-grid">
          {project.videos.map((video) => (
            <div key={video.id} className="image-card video-card">
              <video
                src={getDriveFileUrl(video.id)}
                controls
                playsInline
                preload="metadata"
              >
                Your browser does not support the video tag.
              </video>
            </div>
          ))}
        </div>
      )}

      <div className="scattered-grid">
        {project.images.map((image) => (
          <div key={image.id} className="image-card">
            <img
              src={getDriveFileUrl(image.id)}
              alt={`${project.name} - ${image.name}`}
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://drive.google.com/thumbnail?id=${image.id}&sz=w800`;
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
