type Props = { color?: string; playing?: boolean; small?: boolean; artwork?: boolean }
export function VinylRecord({ color = '#df593c', playing = false, small = false, artwork = false }: Props) {
  return <div className={`vinyl ${playing ? 'spinning' : ''} ${small ? 'small-vinyl' : ''} ${artwork ? 'vinyl-artwork' : ''}`} aria-hidden="true">
    <div className="grooves" />
    <div className="label" style={{ background: color }}><span>SHIVAJI</span><b>33⅓</b><span>SIDE A</span></div>
  </div>
}
