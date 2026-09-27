// Drive folder scanner — fetches folder structure at build time
// Root folders = projects with images inside
// Root-level files (videos) = standalone video projects

import { driveFolders, DRIVE_ROOT_FOLDER, DriveFolderConfig } from './driveConfig';

export interface DriveFile {
  id: string;
  name: string;
  type: 'image' | 'video' | 'other';
  mimeType?: string;
}

export interface ProjectData extends DriveFolderConfig {
  files: DriveFile[];
  images: DriveFile[];
  videos: DriveFile[];
}

const IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp', 'avif'];
const VIDEO_EXTENSIONS = ['mp4', 'webm', 'mov', 'avi', 'mkv', 'm4v'];

function getExtension(filename: string): string {
  return filename.split('.').pop()?.toLowerCase() || '';
}

function classifyFile(name: string): 'image' | 'video' | 'other' {
  const ext = getExtension(name);
  if (IMAGE_EXTENSIONS.includes(ext)) return 'image';
  if (VIDEO_EXTENSIONS.includes(ext)) return 'video';
  return 'other';
}

function parseEmbeddedView(html: string): { id: string; name: string; isFolder: boolean }[] {
  const results: { id: string; name: string; isFolder: boolean }[] = [];

  // Extract all links with their positions
  const linkRegex = /href="https:\/\/drive\.google\.com\/(file\/d|drive\/folders)\/([a-zA-Z0-9_-]+)/g;
  let match;
  while ((match = linkRegex.exec(html)) !== null) {
    const type = match[1] === 'drive/folders' ? 'folder' : 'file';
    results.push({
      id: match[2],
      name: `${type}_${match[2].slice(0, 8)}`,
      isFolder: type === 'folder',
    });
  }

  // Extract file/folder names
  const nameRegex = /class="flip-entry-title"[^>]*>([^<]+)<\/span>/g;
  const names: string[] = [];
  while ((match = nameRegex.exec(html)) !== null) {
    names.push(match[1].trim());
  }

  // Match names to IDs by order
  if (names.length > 0 && names.length === results.length) {
    return results.map((r, i) => ({ ...r, name: names[i] }));
  }

  return results;
}

async function fetchFolderContents(folderId: string): Promise<DriveFile[]> {
  try {
    const url = `https://drive.google.com/embeddedfolderview?id=${folderId}#grid`;
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    });

    if (!response.ok) return [];

    const html = await response.text();
    const items = parseEmbeddedView(html);

    return items
      .filter(item => !item.isFolder)
      .map(item => ({
        id: item.id,
        name: item.name,
        type: classifyFile(item.name),
      }));
  } catch {
    return [];
  }
}

// Scan root folder for standalone videos
async function fetchRootVideos(): Promise<DriveFile[]> {
  try {
    const url = `https://drive.google.com/embeddedfolderview?id=${DRIVE_ROOT_FOLDER}#grid`;
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    });

    if (!response.ok) return [];

    const html = await response.text();
    const items = parseEmbeddedView(html);

    return items
      .filter(item => !item.isFolder)
      .map(item => ({
        id: item.id,
        name: item.name,
        type: classifyFile(item.name),
      }))
      .filter(f => f.type === 'video');
  } catch {
    return [];
  }
}

// Scan all configured folders and return project data
export async function scanDriveProjects(): Promise<ProjectData[]> {
  const projects: ProjectData[] = [];

  // Add root-level videos as standalone projects
  const rootVideos = await fetchRootVideos();
  if (rootVideos.length > 0) {
    projects.push({
      id: 'root-videos',
      name: 'Video Reel',
      files: rootVideos,
      images: [],
      videos: rootVideos,
    });
  }

  // Scan each project folder
  for (const folder of driveFolders) {
    const files = await fetchFolderContents(folder.id);
    const images = files.filter(f => f.type === 'image');
    const videos = files.filter(f => f.type === 'video');

    projects.push({
      ...folder,
      files,
      images,
      videos,
    });
  }

  return projects;
}

export function getProjectIds(): string[] {
  return driveFolders.map(f => f.id);
}

export { DRIVE_ROOT_FOLDER };
