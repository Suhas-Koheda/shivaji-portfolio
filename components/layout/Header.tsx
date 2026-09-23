'use client'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
export function Header() { const [menu, setMenu] = useState(false); return <header><a className="identity" href="#top"><img src="/shivaji.jpeg" alt="Shivaji"/><span><b>Shivaji</b><i>OPEN FOR NEW ROLES</i></span></a><nav className={menu ? 'shown' : ''}><a href="#top">Home</a><a href="#about">About</a><a href="#work">Projects</a><a href="#contact">Contact</a><a href="#">Resume ↗</a></nav><button className="call">Book a call</button><button className="menu" onClick={() => setMenu(!menu)} aria-label="Toggle navigation">{menu ? <X/> : <Menu/>}</button></header> }
