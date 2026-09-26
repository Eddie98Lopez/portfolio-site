// Design tokens pulled from the Figma file ("Message Received - BRANDED").
// Every component reads from here, so a brand tweak is a one-line change.

export const colors = {
  canvas: '#dbdad8', // semantic/background/subtle – area around the email
  ink: '#161718', // semantic/background/emphasis – dark bands
  paper: '#fffffe', // footer surface
  onInk: '#f6f6f6', // neutral-base-1 – text on dark
  buttonSurface: '#fefefe', // semantic/surface/base
  buttonText: '#151719', // neutral-cold-9
  muted: '#333436', // text/secondary + link-secondary
} as const

// First font = your brand font (loads in Apple Mail, iOS, some Android).
// The rest = what Gmail / Outlook show instead.
export const fonts = {
  display: "'Mazurquica', Impact, 'Arial Narrow Bold', 'Arial Narrow', sans-serif",
  body: "'IBM Plex Mono', 'Courier New', Courier, monospace",
  button: "'IBM Plex Mono', 'Courier New', Courier, monospace",
  link: "'Helvetica Neue', Helvetica, Arial, sans-serif",
} as const

export const layout = {
  width: 600,
} as const
