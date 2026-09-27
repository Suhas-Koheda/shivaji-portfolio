import { NextResponse } from 'next/server';

// Pre-scanned file IDs from Google Drive
// Each folder = one project with its images/videos
// To add a new project: scan the folder, then add files here

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

const projects: ProjectData[] = [
  {
    id: '1dl_ruzHoTLeJsKMdisi6KKxTVAh0JftJ',
    name: 'ATLAS_WEAR_RUSSIA',
    files: [
      { id: '1Z2gVl3ueVf-xlTCjhH6Wl6hB2eoG9Qzv', name: 'image_1', type: 'image' },
      { id: '18TPS-4XxwHP1E6MHV18qA21at8rYyBFG', name: 'image_2', type: 'image' },
      { id: '1V_dllCTefYfa_4ZzFdRNfgh6KHfmOoA9', name: 'image_3', type: 'image' },
      { id: '17aRMpQkOD9ko59LcgKEuaQ_3CVQcrjdM', name: 'image_4', type: 'image' },
    ],
    images: [
      { id: '1Z2gVl3ueVf-xlTCjhH6Wl6hB2eoG9Qzv', name: 'image_1', type: 'image' },
      { id: '18TPS-4XxwHP1E6MHV18qA21at8rYyBFG', name: 'image_2', type: 'image' },
      { id: '1V_dllCTefYfa_4ZzFdRNfgh6KHfmOoA9', name: 'image_3', type: 'image' },
      { id: '17aRMpQkOD9ko59LcgKEuaQ_3CVQcrjdM', name: 'image_4', type: 'image' },
    ],
    videos: [],
  },
  {
    id: '10pQ1XZR_GvvF5q2QqoI32TL3fMKimhMQ',
    name: 'LABEL_EMUSE - INDIA, PUNE',
    files: [
      { id: '1nqn6Y4-s0SOKHSvZ-wjGSqtT6AMo9Pmu', name: 'image_1', type: 'image' },
      { id: '1mgF31etNlBb852TNIhY4m3eGW70LlkXJ', name: 'image_2', type: 'image' },
      { id: '1vcg139oewXdH_JN21dlE6-rNI3_tUyby', name: 'image_3', type: 'image' },
      { id: '17GgQOaTrMnc_4Ncr9sIo2kIG8a4B73_c', name: 'image_4', type: 'image' },
      { id: '18_627BncvOisLAQTdS4Leq7mIqpEIebt', name: 'image_5', type: 'image' },
      { id: '14xfeFXC1kV4ekYXrE0TzTMnGfz7v9Xby', name: 'image_6', type: 'image' },
      { id: '18Rrlb5qYWnzH6XP6PmpbiU4Zr4doVzGM', name: 'image_7', type: 'image' },
      { id: '1SREF8AOPoViilwDIqI4Ccwdt8EZu_Zwa', name: 'image_8', type: 'image' },
      { id: '1Y7efabSXj_BQBbeSZ3zNJ3jZiS46pALw', name: 'image_9', type: 'image' },
      { id: '1AruzvoYMEwOTzX5zGT00Qd_IRXCSje1J', name: 'image_10', type: 'image' },
      { id: '1aIxqvBGSOqqbbGxTd2WEuLZe_-wuDiM6', name: 'image_11', type: 'image' },
    ],
    images: [
      { id: '1nqn6Y4-s0SOKHSvZ-wjGSqtT6AMo9Pmu', name: 'image_1', type: 'image' },
      { id: '1mgF31etNlBb852TNIhY4m3eGW70LlkXJ', name: 'image_2', type: 'image' },
      { id: '1vcg139oewXdH_JN21dlE6-rNI3_tUyby', name: 'image_3', type: 'image' },
      { id: '17GgQOaTrMnc_4Ncr9sIo2kIG8a4B73_c', name: 'image_4', type: 'image' },
      { id: '18_627BncvOisLAQTdS4Leq7mIqpEIebt', name: 'image_5', type: 'image' },
      { id: '14xfeFXC1kV4ekYXrE0TzTMnGfz7v9Xby', name: 'image_6', type: 'image' },
      { id: '18Rrlb5qYWnzH6XP6PmpbiU4Zr4doVzGM', name: 'image_7', type: 'image' },
      { id: '1SREF8AOPoViilwDIqI4Ccwdt8EZu_Zwa', name: 'image_8', type: 'image' },
      { id: '1Y7efabSXj_BQBbeSZ3zNJ3jZiS46pALw', name: 'image_9', type: 'image' },
      { id: '1AruzvoYMEwOTzX5zGT00Qd_IRXCSje1J', name: 'image_10', type: 'image' },
      { id: '1aIxqvBGSOqqbbGxTd2WEuLZe_-wuDiM6', name: 'image_11', type: 'image' },
    ],
    videos: [],
  },
  {
    id: '1q2FT_yYZLmyzk6VxH0PXay8TbYp4aeUC',
    name: 'MARSHMELLO_BRAND',
    files: [
      { id: '1d-pGrjQyiXgoEuR4bbMrdZerQlm34kng', name: 'image_1', type: 'image' },
      { id: '1J4vmuGj3LUEgdYTG_gV9jt8y-BFZ6Jgn', name: 'image_2', type: 'image' },
      { id: '1qP_TnX1HarAi94FDFIuR0y2cJfxW-kzA', name: 'image_3', type: 'image' },
      { id: '10dJMQcIredh5QqT9ef0kRHEI2uWILeyh', name: 'image_4', type: 'image' },
    ],
    images: [
      { id: '1d-pGrjQyiXgoEuR4bbMrdZerQlm34kng', name: 'image_1', type: 'image' },
      { id: '1J4vmuGj3LUEgdYTG_gV9jt8y-BFZ6Jgn', name: 'image_2', type: 'image' },
      { id: '1qP_TnX1HarAi94FDFIuR0y2cJfxW-kzA', name: 'image_3', type: 'image' },
      { id: '10dJMQcIredh5QqT9ef0kRHEI2uWILeyh', name: 'image_4', type: 'image' },
    ],
    videos: [],
  },
  {
    id: '1zbgp24NSrfd615oznqZ5YrlTUHe9rmIU',
    name: 'meher_jewellery_DUBAI',
    files: [],
    images: [],
    videos: [],
  },
  {
    id: '1w7X32Ll7dfwnmOdHV7U_j7mQ_C87R8WC',
    name: 'SOT_FOREVER_SWEDEN',
    files: [
      { id: '1eM-E53aJ9UTWkJ_Qt6NL5YnmCthEXewQ', name: 'image_1', type: 'image' },
      { id: '1bCfwY27qqy3Ohd-Mxe9mVG2UEyyliKsH', name: 'image_2', type: 'image' },
      { id: '1UF0-KjKRc6Gi0uDetmtHoqhgNM2_ToO4', name: 'image_3', type: 'image' },
      { id: '11LXC8Gek7hfVEHRUaYa4qDGkUQmvnUxC', name: 'image_4', type: 'image' },
      { id: '1N-t9mNug2Y1kfxX80KktnEmFPpmcxWGH', name: 'image_5', type: 'image' },
      { id: '1qO35AWwK0vxKmyCIr9Tim0MHOWAaAfCC', name: 'image_6', type: 'image' },
      { id: '1X7cLOhK6JaRma1O-rTT64t8gJRThErJa', name: 'image_7', type: 'image' },
      { id: '1lXGgM5MPR8TDsuYlKiqlzpfkpLGbuxdK', name: 'image_8', type: 'image' },
      { id: '1yEOdx8F2Puf1sNhMItMQ89aIck3i2Ex8', name: 'image_9', type: 'image' },
    ],
    images: [
      { id: '1eM-E53aJ9UTWkJ_Qt6NL5YnmCthEXewQ', name: 'image_1', type: 'image' },
      { id: '1bCfwY27qqy3Ohd-Mxe9mVG2UEyyliKsH', name: 'image_2', type: 'image' },
      { id: '1UF0-KjKRc6Gi0uDetmtHoqhgNM2_ToO4', name: 'image_3', type: 'image' },
      { id: '11LXC8Gek7hfVEHRUaYa4qDGkUQmvnUxC', name: 'image_4', type: 'image' },
      { id: '1N-t9mNug2Y1kfxX80KktnEmFPpmcxWGH', name: 'image_5', type: 'image' },
      { id: '1qO35AWwK0vxKmyCIr9Tim0MHOWAaAfCC', name: 'image_6', type: 'image' },
      { id: '1X7cLOhK6JaRma1O-rTT64t8gJRThErJa', name: 'image_7', type: 'image' },
      { id: '1lXGgM5MPR8TDsuYlKiqlzpfkpLGbuxdK', name: 'image_8', type: 'image' },
      { id: '1yEOdx8F2Puf1sNhMItMQ89aIck3i2Ex8', name: 'image_9', type: 'image' },
    ],
    videos: [],
  },
  {
    id: '1-ZwcZBqn0Zg9w2USMl5sgWFuSNd4uig4',
    name: "YES_MA'AM - NIGERIA",
    files: [
      { id: '1HzYvXAca6dglcHrBqF0EB-O-_hr4sags', name: 'image_1', type: 'image' },
      { id: '1so7qaWiWUvvzPnBlXeJBS_y4-RD7tibC', name: 'image_2', type: 'image' },
      { id: '1KuWd8QdkiIcR-VQm-hN5GRcTeLNUAfOF', name: 'image_3', type: 'image' },
      { id: '14gj4M1GvOIASSzl2NJsia3a8E6Vhe20N', name: 'image_4', type: 'image' },
      { id: '1LKuic23oEIwRLHBW4yri-aIb37Mdh40z', name: 'image_5', type: 'image' },
      { id: '1YyxpwERoEs6VMlDDVTmYhW0yuJTxisxP', name: 'image_6', type: 'image' },
      { id: '1SsLEPX28b5eN6X-tbcmD-MQWVj4AC2ND', name: 'image_7', type: 'image' },
    ],
    images: [
      { id: '1HzYvXAca6dglcHrBqF0EB-O-_hr4sags', name: 'image_1', type: 'image' },
      { id: '1so7qaWiWUvvzPnBlXeJBS_y4-RD7tibC', name: 'image_2', type: 'image' },
      { id: '1KuWd8QdkiIcR-VQm-hN5GRcTeLNUAfOF', name: 'image_3', type: 'image' },
      { id: '14gj4M1GvOIASSzl2NJsia3a8E6Vhe20N', name: 'image_4', type: 'image' },
      { id: '1LKuic23oEIwRLHBW4yri-aIb37Mdh40z', name: 'image_5', type: 'image' },
      { id: '1YyxpwERoEs6VMlDDVTmYhW0yuJTxisxP', name: 'image_6', type: 'image' },
      { id: '1SsLEPX28b5eN6X-tbcmD-MQWVj4AC2ND', name: 'image_7', type: 'image' },
    ],
    videos: [],
  },
  {
    id: 'root-videos',
    name: 'Video Reel',
    files: [
      { id: '1OjymQy9SDjeWB6Uwza6JV9G5a3Su3qF1', name: 'video_1', type: 'video' },
    ],
    images: [],
    videos: [
      { id: '1OjymQy9SDjeWB6Uwza6JV9G5a3Su3qF1', name: 'video_1', type: 'video' },
    ],
  },
];

export async function GET() {
  return NextResponse.json({ projects });
}
