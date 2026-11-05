export interface Project {
  slug: string; index: string; title: string; kicker: string; stack: string[]; summary: string;
  links: { live?: string; github?: string; caseStudy: string }; // TODO: add live/github URLs per project
}
export const projects: Project[] = [
  { slug: 'cardiovascular-disease-prediction', index: '01', title: 'Cardiovascular Disease Prediction',
    kicker: 'End-to-end healthcare web app',
    stack: ['Python', 'Chi-square', 'Gradient Boosting', 'FastAPI', 'React', 'Tailwind'],
    summary: 'Gradient Boosting classifier at 73.6% accuracy on 70,000+ patient records, served by FastAPI into a React risk dashboard.',
    links: { live: 'https://cardio-vascular-disease-prediction-pi.vercel.app/', caseStudy: '/work/cardiovascular-disease-prediction' } },
  { slug: 'nexushealth', index: '02', title: 'NexusHealth', kicker: 'Hospital management system',
    stack: ['React', 'Tailwind', 'Material-UI', 'ASP.NET Core', 'SQL Server', 'EF Core', 'JWT'],
    summary: 'JWT role-based access for Admins, Doctors and Patients, with self-registration, staff admin and appointment workflows.',
    links: { caseStudy: '/work/nexushealth' } },
  { slug: 'airbnb-clone', index: '03', title: 'Airbnb Clone', kicker: 'MVC listings app',
    stack: ['Node', 'Express', 'MongoDB Atlas', 'EJS', 'Passport.js', 'Joi'],
    summary: 'RESTful CRUD with Passport.js sessions, authorization middleware, Joi validation and connect-flash.',
    links: { caseStudy: '/work/airbnb-clone' } },
  { slug: 'intelliwave', index: '04', title: 'IntelliWave', kicker: 'SIH 2026 · PS 147',
    stack: ['AI', 'DSP', '.WAV', '.IQ'],
    summary: 'Hybrid AI + DSP pipeline for automated feature extraction and classification from noisy .WAV/.IQ streams.',
    links: { caseStudy: '/work/intelliwave' } },
];

/** Case-study copy. `improve` is yours to write (TODO) — the section stays hidden while empty. */
export const caseNotes: Record<string, { role: string; architecture: string; improve: string }> = {
  'cardiovascular-disease-prediction': { role: 'Full-stack developer', improve: '',
    architecture: 'Python preprocessing and Chi-square feature selection feed a Gradient Boosting classifier. FastAPI serves predictions to a React + Tailwind risk dashboard.' },
  nexushealth: { role: 'Full-stack developer', improve: '',
    architecture: 'A React + Material-UI client talks to an ASP.NET Core Web API over SQL Server (EF Core migrations, LINQ). DTOs and FluentValidation guard the boundary; JWT claims gate Admin, Doctor and Patient routes.' },
  'airbnb-clone': { role: 'Full-stack developer', improve: '',
    architecture: 'MVC on Express with EJS views and MongoDB Atlas models. Passport.js sessions and authorization middleware protect RESTful CRUD routes; Joi validates input and connect-flash reports outcomes.' },
  intelliwave: { role: 'Architecture design', improve: '',
    architecture: 'A hybrid pipeline: a DSP front end extracts features from noisy .WAV/.IQ streams and an AI model classifies them. TODO: add your architecture diagram.' },
};
export const more = [
  { name: 'Observatory', note: 'TypeScript', href: 'https://github.com/Shubham-Parsana/Observatory' },
  { name: 'Repair-Shop', note: '', href: 'https://github.com/Shubham-Parsana/Repair-Shop' },
  // TODO: confirm the repo URL and add a one-line description from its README (I couldn't read it)
  { name: 'dotdrops', note: '', href: 'https://github.com/Shubham-Parsana/dotdrops' },
];
