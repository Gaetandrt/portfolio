import { Project } from "@/components/project-card";

export const projects: Project[] = [
  {
    id: "project-one",
    title: "E-Commerce Platform",
    shortDescription:
      "A full-stack web application with real-time data visualization and user authentication.",
    fullDescription:
      "A comprehensive e-commerce platform built with modern technologies, featuring real-time inventory management, advanced analytics, and seamless user experience. The platform handles thousands of transactions daily and provides detailed insights for business owners.",
    technologies: [
      "React",
      "Next.js",
      "Node.js",
      "MongoDB",
      "Stripe",
      "Socket.io",
      "Redis",
    ],
    category: "Web Development",
    year: "2024",
    client: "TechCorp Solutions",
    duration: "6 months",
    team: ["Frontend Developer", "Backend Developer", "UI/UX Designer"],
    challenges: [
      "Real-time inventory synchronization across multiple warehouses",
      "Handling high-volume transactions during peak sales",
      "Complex pricing algorithms with dynamic discounts",
      "Mobile-first responsive design requirements",
    ],
    solutions: [
      "Implemented WebSocket connections for real-time updates",
      "Used Redis for caching and session management",
      "Created microservices architecture for scalability",
      "Developed progressive web app capabilities",
    ],
    results: [
      "40% increase in conversion rates",
      "99.9% uptime during Black Friday sales",
      "50% reduction in page load times",
      "Positive user feedback score of 4.8/5",
    ],
    images: {
      thumbnail: "https://placehold.co/600x400",
      hero: "/placeholder.svg?height=600&width=1200",
      gallery: [
        "https://placehold.co/600x400",
        "https://placehold.co/600x400",
        "https://placehold.co/600x400",
        "https://placehold.co/600x400",
      ],
    },
    links: {
      live: "https://example.com",
      github: "https://github.com/example",
      case_study: "#",
    },
    featured: true,
  },
  {
    id: "project-two",
    title: "AI-Powered Analytics Dashboard",
    shortDescription:
      "An intelligent analytics platform with machine learning capabilities.",
    fullDescription:
      "A sophisticated analytics dashboard that leverages artificial intelligence to provide predictive insights and automated reporting. The platform processes large datasets and presents actionable intelligence through intuitive visualizations.",
    technologies: [
      "Python",
      "React",
      "TensorFlow",
      "PostgreSQL",
      "Docker",
      "AWS",
    ],
    category: "Data Science",
    year: "2024",
    client: "DataFlow Inc",
    duration: "8 months",
    team: ["Data Scientist", "Full-Stack Developer", "DevOps Engineer"],
    challenges: [
      "Processing terabytes of data in real-time",
      "Creating intuitive visualizations for complex data",
      "Implementing machine learning models in production",
      "Ensuring data privacy and security compliance",
    ],
    solutions: [
      "Built scalable data pipeline using Apache Kafka",
      "Implemented custom D3.js visualizations",
      "Used MLOps practices for model deployment",
      "Applied end-to-end encryption for sensitive data",
    ],
    results: [
      "60% improvement in decision-making speed",
      "Automated 80% of manual reporting tasks",
      "Achieved 95% prediction accuracy",
      "Reduced operational costs by 30%",
    ],
    images: {
      thumbnail: "https://placehold.co/600x400",
      hero: "/placeholder.svg?height=600&width=1200",
      gallery: [
        "https://placehold.co/600x400",
        "https://placehold.co/600x400",
        "https://placehold.co/600x400",
      ],
    },
    links: {
      live: "https://example.com",
      github: "https://github.com/example",
    },
    featured: true,
  },
  {
    id: "project-three",
    title: "Mobile Fitness App",
    shortDescription:
      "A mobile-first progressive web app for tracking fitness goals and nutrition.",
    fullDescription:
      "A comprehensive fitness tracking application that combines workout planning, nutrition monitoring, and social features. The app uses advanced algorithms to create personalized workout plans and provides detailed progress analytics.",
    technologies: ["React Native", "Firebase", "Redux", "Chart.js", "Expo"],
    category: "Mobile Development",
    year: "2023",
    duration: "4 months",
    team: ["Mobile Developer", "UI/UX Designer"],
    challenges: [
      "Cross-platform compatibility issues",
      "Offline functionality requirements",
      "Complex state management for user data",
      "Integration with various fitness APIs",
    ],
    solutions: [
      "Used React Native for unified codebase",
      "Implemented offline-first architecture",
      "Applied Redux for predictable state management",
      "Created unified API layer for third-party integrations",
    ],
    results: [
      "50,000+ downloads in first month",
      "4.7-star rating on app stores",
      "85% user retention rate",
      "Featured in 'Best Health Apps' category",
    ],
    images: {
      thumbnail: "https://placehold.co/600x400",
      hero: "/placeholder.svg?height=600&width=1200",
      gallery: ["https://placehold.co/600x400", "https://placehold.co/600x400"],
    },
    links: {
      live: "https://example.com",
      github: "https://github.com/example",
    },
    featured: false,
  },
];
