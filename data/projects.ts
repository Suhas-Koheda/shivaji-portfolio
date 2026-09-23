export type Project = { title: string; type: string; color: string; desc: string; tags: string[]; art: string }
export const projects: Project[] = [
  { title: 'Saarthi', type: 'AI ASSISTANT · 2024', color: '#e15c3d', desc: 'A multilingual AI copilot built to make complex information feel local, immediate and human.', tags: ['LLMs', 'RAG', 'TypeScript'], art: 'SA' },
  { title: 'Orbit', type: 'SPATIAL COMPUTING · 2024', color: '#edba31', desc: 'An experiment in giving ambitious ideas a tangible, playful interface.', tags: ['Vision', 'Python', 'WebGL'], art: 'OR' },
  { title: 'Signal', type: 'SYSTEMS · 2023', color: '#477fc0', desc: 'Turning noisy streams of data into decisions teams can actually act on.', tags: ['Rust', 'Infra', 'ML'], art: 'SI' },
  { title: 'Monsoon', type: 'CREATIVE CODE · 2023', color: '#6e9876', desc: 'A weather instrument that turns the moving sky into sound and image.', tags: ['Audio', 'Canvas', 'Data'], art: 'MO' },
]
