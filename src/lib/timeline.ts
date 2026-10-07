interface TimelineJobEntry {
  role: string
  description?: string
  year_start: number
  year_end: number
  type: 'experience' | 'education'
}

interface TimelineNode {
  id: number
  organization: string
  description?: string
  img_src: string
  entries: TimelineJobEntry[]
}

export const timeline_events: TimelineNode[] = [
  {
    id: 1,
    organization: 'California College of the Arts',
    img_src: '/api/media/file/cca.png',
    entries: [
      { role: 'Student', year_end: 2018, year_start: 2016, type: 'education' },
      {
        role: 'Student Affairs Office Assistant',
        year_end: 2018,
        year_start: 2016,
        type: 'experience',
      },
    ],
  },
  {
    id: 2,
    organization: 'Bloom Institute of Technology',
    description: 'previously Lambda School',
    entries: [
      { role: 'Full-Stack Web-Dev Student', year_start: 2020, year_end: 2021, type: 'education' },
    ],
    img_src: '/api/media/file/lambda.png',
  },
  {
    id: 3,
    organization: 'Fastsigns',
    img_src: '/api/media/file/fastsigns.png',
    entries: [
      {
        role: 'Graphic Designer',
        year_start: 2022,
        year_end: 2024,
        type: 'experience',
      },
    ],
  },
  {
    id: 4,
    organization: 'Centered Marketing Group',
    img_src: '/api/media/file/cmg.png',
    entries: [
      {
        role: 'Graphic Designer & Web Developer',
        year_start: 2024,
        year_end: 2025,
        type: 'experience',
      },
    ],
  },
  {
    id: 5,
    organization: 'Cultivated Technology Group',
    img_src: '/api/media/file/cultivated.png',
    entries: [
      {
        role: 'Software Engineer Intern',
        year_start: 2026,
        year_end: 2026,
        type: 'experience',
      },
    ],
  },
]
