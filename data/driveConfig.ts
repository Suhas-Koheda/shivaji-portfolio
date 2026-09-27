// Google Drive folder configuration
// Each entry = one company/project folder in your Drive
// The portfolio auto-detects images and videos inside each folder
// To add a new project: create a folder in Drive, then add its ID here

export interface DriveFolderConfig {
  id: string;
  name: string; // Display name (company/project name)
}

export const DRIVE_ROOT_FOLDER = '1i3Ml70cYjzawG7tB-IM6TIDwfGpSt98W';

export const driveFolders: DriveFolderConfig[] = [
  { id: '1dl_ruzHoTLeJsKMdisi6KKxTVAh0JftJ', name: 'ATLAS_WEAR_RUSSIA' },
  { id: '10pQ1XZR_GvvF5q2QqoI32TL3fMKimhMQ', name: 'LABEL_EMUSE - INDIA, PUNE' },
  { id: '1q2FT_yYZLmyzk6VxH0PXay8TbYp4aeUC', name: 'MARSHMELLO_BRAND' },
  { id: '1zbgp24NSrfd615oznqZ5YrlTUHe9rmIU', name: 'meher_jewellery_DUBAI' },
  { id: '1w7X32Ll7dfwnmOdHV7U_j7mQ_C87R8WC', name: 'SOT_FOREVER_SWEDEN' },
  { id: '1-ZwcZBqn0Zg9w2USMl5sgWFuSNd4uig4', name: "YES_MA'AM - NIGERIA" },
];

// Helper to construct direct file access URLs
// Using lh3.googleusercontent.com - direct image CDN, no redirects
export const getDriveFileUrl = (fileId: string) =>
  `https://lh3.googleusercontent.com/d/${fileId}=w1600`;

export const getDriveThumbnailUrl = (fileId: string, size = 'w800') =>
  `https://lh3.googleusercontent.com/d/${fileId}=${size}`;
