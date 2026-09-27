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
    const newImages: HTMLImageElement[] = [];

    project.images.forEach((image) => {
      const img = new Image();
      img.onload = () => {
        loaded++;
        setImagesLoaded(loaded);
        if (loaded === totalImages) {
          setAllLoaded(true);
        }
      };
      img.onerror = () => {
        loaded++;
        setImagesLoaded(loaded);
        if (loaded === totalImages) {
          setAllLoaded(true);
        }
      };
      img.src = getDriveFileUrl(image.id);
      newImages.push(img);
    });

    return () => {
      newImages.forEach(img => { img.src = ''; });
    };
  }, [project.images, totalImages]);

  return (
    <div className="project-detail">
      <div className="project-detail-header">
        <h2 className="project-detail-title">{project.name}</h2>
        <p className="project-detail-subtitle">
          {project.images.length} images · {project.videos.length} videos
        </p>
      </div>

      {!allLoaded && (
        <div style={{
          textAlign: 'center',
          padding: '60px 20px',
          fontFamily: 'var(--font-editorial-new)',
        }}>
          <div style={{
            fontSize: '48px',
            marginBottom: '20px',
            animation: 'pulse 1.5s infinite',
          }}>
            {imagesLoaded}/{totalImages}
          </div>
          <p className="subheading">Loading images...</p>
          <div style={{
            width: '200px',
            height: '4px',
            background: 'var(--color-bone-cream)',
            margin: '20px auto',
            borderRadius: '2px',
            overflow: 'hidden',
          }}>
            <div style={{
              width: `${(imagesLoaded / totalImages) * 100}%`,
              height: '100%',
              background: 'var(--color-ember-orange)',
              transition: 'width 0.3s ease',
            }} />
          </div>
        </div>
      )}

      {allLoaded && (
        <>
          {project.videos.length > 0 && (
            <div className="project-media-grid">
              {project.videos.map((video) => (
                <div key={video.id} className="project-media-item project-media-full">
                  <video
                    src={getDriveFileUrl(video.id)}
                    controls
                    playsInline
                    preload="metadata"
                    style={{ width: '100%', maxHeight: '600px', background: '#000' }}
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              ))}
            </div>
          )}

          <div className="project-media-grid">
            {project.images.map((image, idx) => (
              <div key={image.id} className={`project-media-item ${idx === 0 ? 'project-media-full' : ''}`}>
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

          <button
            onClick={onClose}
            style={{
              background: 'var(--color-ink-black)',
              color: 'var(--color-parchment)',
              border: 'none',
              padding: '14px 28px',
              fontFamily: 'var(--font-editorial-new)',
              fontSize: '16px',
              cursor: 'pointer',
              borderRadius: 'var(--radius-buttons)',
            }}
          >
            ← Back to all work
          </button>
        </>
      )}
    </div>
  );
}
