'use client'
import { Pause, Play, Volume2, VolumeX } from 'lucide-react'
import { VinylRecord } from '../vinyl/VinylRecord'
import type { Project } from '../../data/projects'
export function MusicPlayer({ project, playing, muted, onPlay, onMute }: { project: Project; playing: boolean; muted: boolean; onPlay: () => void; onMute: () => void }) { return <div className="player"><VinylRecord color={project.color} small playing={playing}/><div><b>{playing ? project.title : 'Needle at rest'}</b><small>{playing ? 'SHIVAJI — SIDE A' : 'press play to begin'}</small></div><button onClick={onPlay} aria-label="Play or pause">{playing ? <Pause/> : <Play/>}</button><div className="progress"><i style={{width: playing ? '42%' : '0%'}}/></div><button onClick={onMute} aria-label="Mute">{muted ? <VolumeX/> : <Volume2/>}</button></div> }
