export const profile = {
  name: 'Shubham Parsana',
  headline: ['Shubham', 'Parsana'] as const,
  role: 'Full-stack developer · Third-year CSE · Open to internships & entry-level roles',
  pitch:
    'I build full-stack products — from FastAPI models to role-based healthcare platforms — and I care about the details that make them feel finished.',
  availability: 'Available for internships',
  email: 'Shubhamparsana364@gmail.com',
  links: {
    github: 'https://github.com/Shubham-Parsana',
    linkedin: 'https://www.linkedin.com/in/shubham-parsana-0a2531343/',
    resume: '/Shubham_Parsana_Resume.pdf',
  },
  stats: ['8 public repos', '70,000+ records modelled', '3 roles in RBAC (Admin / Doctor / Patient)'],
  languages: ['English', 'Hindi', 'Gujarati'],
} as const;

export const about = {
  bio: [
    'Third-year B.Tech CSE student at Darshan University.',
    'Hands-on with full-stack apps, REST APIs, auth workflows and database-backed systems.',
    'Fluent in Java, Python, JavaScript and C#. I reach for React, Next.js, Node and ASP.NET Core, with SQL Server and MongoDB underneath.',
    'I run Arch Linux, co-organised a Model UN, and designed the architecture for an SIH 2026 problem statement.',
  ],
};
export const stack = [
  { title: 'Languages', items: ['Java', 'Python', 'JavaScript', 'C#'] },
  { title: 'Frontend', items: ['React', 'Next.js', 'Tailwind', 'Material-UI', 'Bootstrap', 'EJS'] },
  { title: 'Backend & APIs', items: ['Node', 'Express', 'ASP.NET Core', 'FastAPI', 'REST', 'JWT', 'Passport.js', 'EF Core', 'Joi', 'FluentValidation'] },
  { title: 'Data & Tools', items: ['SQL Server', 'MongoDB Atlas', 'GitHub', 'Arch Linux'] },
];
export const log = [
  { when: '2026', title: 'Smart India Hackathon', note: 'Designed the IntelliWave architecture for PS 147: AI + DSP feature extraction from noisy .WAV/.IQ signals.' },
  { when: 'Leadership', title: 'MUN Co-Organizer', note: 'Event planning, participant coordination and leadership.' },
  { when: '2024–2028', title: 'B.Tech CSE, Darshan University', note: 'Third year.' },
  { when: '2024', title: 'Class XII, GSEB', note: '' },
  { when: '2022', title: 'Class X, GSEB', note: '' },
];

export const glance: [string, string][] = [
  ['Now', 'Third-year B.Tech CSE, Darshan University'],
  ['Building', 'Full-stack apps, REST APIs, auth workflows'],
  ['Stack', 'React, Next.js, Node, ASP.NET Core, FastAPI'],
  ['Latest', 'IntelliWave, SIH 2026 (PS 147)'],
  ['Open to', 'Internships & entry-level roles'],
];
