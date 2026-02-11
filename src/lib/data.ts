
import { Github, Linkedin, Twitter, LucideIcon } from "lucide-react";

export const socialIconMap: { [key: string]: LucideIcon } = {
  LinkedIn: Linkedin,
  GitHub: Github,
  Twitter: Twitter,
};

export const personalData = {
  name: "Alex Doe",
  title: "Full-Stack Developer & AI Enthusiast",
  avatarUrl: "https://placehold.co/600x600.png",
  avatarHint: "professional portrait",
  professionalSummary: "A creative and detail-oriented Full-Stack Developer with a passion for building intuitive and performant web applications. Experienced in leveraging modern technologies and AI to solve complex problems and deliver exceptional user experiences. Always eager to learn and take on new challenges.",
  personalTouch: "When I'm not coding, you can find me exploring hiking trails, experimenting with new recipes, or diving into a good sci-fi novel.",
  uniqueSellingPoint: "My unique blend of technical expertise in both frontend and backend development, combined with a keen interest in artificial intelligence, allows me to build not just functional, but truly intelligent and engaging applications.",
  contact: {
    email: "alex.doe@example.com",
    location: "San Francisco, CA",
  },
  socials: [
    { id: "social-1", name: "LinkedIn", url: "https://linkedin.com", icon: Linkedin },
    { id: "social-2", name: "GitHub", url: "https://github.com", icon: Github },
    { id: "social-3", name: "Twitter", url: "https://twitter.com", icon: Twitter },
  ]
};

export const editableContent = {
  sections: {
    skills: {
      title: "My Skills",
      description: "A collection of technologies I'm proficient with and the soft skills I bring to every project.",
    },
    experience: {
      title: "Work Experience",
      description: "My professional journey and the impact I've made in various roles.",
    },
    education: {
      title: "Education",
      description: "My academic background and qualifications.",
    },
    gallery: {
      title: "Certifications & Awards",
      description: "Recognitions and achievements that highlight my expertise and contributions.",
    },
    publications: {
      title: "Publications",
      description: "A selection of my published articles and journal papers.",
    },
  },
};

export const projectsData = [
  {
    id: "proj-1",
    title: "AI-Powered Task Manager",
    role: "Lead Developer",
    problem: "Users often feel overwhelmed by long to-do lists and struggle to prioritize tasks effectively.",
    technologies: ["Next.js", "React", "Firebase", "Genkit AI", "Tailwind CSS"],
    features: ["Natural language task input", "AI-powered task prioritization", "Smart scheduling suggestions", "Collaborative workspaces"],
    impact: "Increased user productivity by 25% and reduced task completion time by 15%.",
    liveUrl: "#",
    githubUrl: "#",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "abstract tech",
  },
  {
    id: "proj-2",
    title: "E-commerce Analytics Dashboard",
    role: "Frontend Developer",
    problem: "Online store owners needed a clear, consolidated view of their sales data, customer behavior, and inventory levels.",
    technologies: ["React", "Redux", "D3.js", "Node.js", "PostgreSQL"],
    features: ["Interactive sales charts", "Customer segmentation analysis", "Real-time inventory tracking", "Custom report generation"],
    impact: "Provided business owners with actionable insights, leading to a 10% increase in average order value.",
    liveUrl: "#",
    githubUrl: "#",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "dashboard analytics"
  },
  {
    id: "proj-3",
    title: "Community Recipe Sharing Platform",
    role: "Full-Stack Developer",
    problem: "Home cooks lacked a dedicated, user-friendly platform to share their recipes and discover new ones from a diverse community.",
    technologies: ["Vue.js", "Express", "MongoDB", "Cloudinary"],
    features: ["User recipe submissions with images", "Advanced search and filtering", "Rating and review system", "Personalized recipe collections"],
    impact: "Grew a community of 10,000+ active users within the first six months.",
    liveUrl: "#",
    githubUrl: "#",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "food cooking"
  },
];

export const skillsData = {
  title: editableContent.sections.skills.title,
  description: editableContent.sections.skills.description,
  technical: [
    { id: "tech-cat-1", category: "Programming Languages", skills: ["JavaScript", "TypeScript", "Python", "Java", "SQL"] },
    { id: "tech-cat-2", category: "Frameworks & Libraries", skills: ["React", "Next.js", "Node.js", "Express", "Vue.js", "Spring Boot"] },
    { id: "tech-cat-3", category: "Databases", skills: ["PostgreSQL", "MongoDB", "Firebase Firestore", "Redis"] },
    { id: "tech-cat-4", category: "Cloud Platforms", skills: ["Firebase", "AWS", "Vercel", "Heroku"] },
    { id: "tech-cat-5", category: "Tools & Technologies", skills: ["Docker", "Git", "Webpack", "Genkit", "Jest"] },
  ],
  soft: [
    { id: 'soft-1', skill: "Problem Solving" },
    { id: 'soft-2', skill: "Collaboration" },
    { id: 'soft-3', skill: "Communication" },
    { id: 'soft-4', skill: "Adaptability" },
    { id: 'soft-5', skill: "Creativity" },
    { id: 'soft-6', skill: "Time Management" }
  ],
};

export const experienceData = [
  {
    id: "exp-1",
    title: "Senior Software Engineer",
    company: "Tech Solutions Inc.",
    dates: "Jan 2021 - Present",
    responsibilities: [
      "Led the development of a new AI-driven analytics platform, improving data processing efficiency by 40%.",
      "Mentored junior developers, fostering a culture of growth and knowledge sharing.",
      "Architected and implemented scalable microservices using Node.js and Docker.",
      "Collaborated with product managers to define feature requirements and technical specifications."
    ],
    technologies: ["React", "Node.js", "Python", "AWS", "Docker", "Kubernetes"],
  },
  {
    id: "exp-2",
    title: "Software Developer",
    company: "Innovate Co.",
    dates: "Jun 2018 - Dec 2020",
    responsibilities: [
      "Developed and maintained features for a high-traffic e-commerce website using React and Redux.",
      "Optimized application performance, resulting in a 30% reduction in page load times.",
      "Wrote comprehensive unit and integration tests to ensure code quality and reliability.",
    ],
    technologies: ["JavaScript", "React", "Redux", "Jest", "Webpack"],
  },
  {
    id: "exp-3",
    title: "Software Development Intern",
    company: "Digital Creations",
    dates: "May 2017 - Aug 2017",
    responsibilities: [
      "Assisted in the development of a client-facing web portal.",
      "Participated in daily stand-ups and sprint planning sessions.",
      "Fixed bugs and implemented small features, gaining experience in a professional agile environment.",
    ],
    technologies: ["HTML", "CSS", "jQuery", "PHP"],
  },
];

export const educationData = [
  {
    id: "edu-1",
    title: "Bachelor of Science in Computer Science",
    institution: "State University",
    graduationDate: "May 2018",
    honors: "Magna Cum Laude",
  },
];

export const involvementData = [
  {
    id: "involve-1",
    title: "Google Developer Student Clubs",
    role: "Core Team Member",
    dates: "Sep 2022 - Jun 2023",
    description: "Led workshops on Web Development and AI, organized hackathons, and managed community outreach.",
  },
  {
    id: "involve-2",
    title: "Coding Ninjas",
    role: "Campus Ambassador",
    dates: "Jan 2022 - Dec 2022",
    description: "Promoted coding culture on campus, hosted competitive programming contests, and mentored students.",
  },
];

export const galleryData = [
  {
    id: "gal-1",
    title: "AWS Certified Cloud Practitioner",
    description: "Validation of foundational, high-level understanding of AWS Cloud, services, and terminology.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "certificate award",
  },
  {
    id: "gal-2",
    title: "Hackathon Winner - AI for Good",
    description: "First place in the 2023 'AI for Good' hackathon for developing a prototype that helps physically challenged people.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "trophy award",
  },
  {
    id: "gal-3",
    title: "Google Certified Professional - Cloud Architect",
    description: "Demonstrated the ability to design, develop, and manage robust, secure, scalable, highly available, and dynamic solutions to drive business objectives.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "certificate document",
  },
  {
    id: "gal-4",
    title: "Employee of the Month",
    description: "Recognized for outstanding performance and contributions to the team's success in Q3 2022.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "award medal",
  },
];

export const publicationsData = [
  {
    id: "pub-1",
    title: "A Novel Approach to Efficient Data Structures for AI",
    journal: "Journal of Computer Science & Technology",
    date: "October 2023",
    url: "#",
    summary: "This paper introduces a new B-Tree variant that improves read/write performance for datasets commonly used in machine learning models.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "scientific journal"
  },
  {
    id: "pub-2",
    title: "The Impact of Quantum Computing on Cryptography",
    journal: "International Security Review",
    date: "January 2024",
    url: "#",
    summary: "An analysis of the potential threats quantum computing poses to current cryptographic standards and a review of quantum-resistant algorithms.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "quantum computing"
  },
];

    