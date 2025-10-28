import React, { useState } from "react";
import "./Mystack.css";

const techStack = [
  { name: "React", category: "Frontend", description: "Popular JavaScript library for building UIs", color: "blue", experience: "2 years" },
{ name: "Next.js", category: "Frontend", description: "React framework for server-side rendering and static sites", color: "black", experience: "1.5 years" },
{ name: "Vite", category: "Tools", description: "Next-generation build tool", color: "amber", experience: "2 years" },
// === Databases & Caching ===
{ name: "PostgreSQL", category: "Database", description: "Advanced open-source relational database system", color: "cyan", experience: "1.5 years" },
{ name: "Redis", category: "Database", description: "In-memory data structure store used as a database, cache, and message broker", color: "crimson", experience: "1 year" },
{ name: "MySQL", category: "Database", description: "Relational database management system", color: "purple", experience: "2 years" },
{ name: "Prisma ORM", category: "Backend", description: "Type-safe ORM for Node.js and TypeScript", color: "green", experience: "1 year" },
// === Backend Frameworks ===
{ name: "Express.js", category: "Backend", description: "Minimal and flexible Node.js web framework", color: "green", experience: "1.5 years" },
{ name: "Node.js", category: "Backend", description: "JavaScript runtime for building scalable network applications", color: "lime", experience: "2 years" },
{ name: "FastAPI", category: "Backend", description: "Modern, fast web framework for building APIs with Python", color: "blue", experience: "1 year" },
{ name: "Spring Boot", category: "Backend", description: "Framework for building Java-based microservices", color: "teal", experience: "1.5 years" },
// === Programming Languages ===
{ name: "TypeScript", category: "Language", description: "Typed superset of JavaScript for scalable web applications", color: "blue", experience: "2 years" },
{ name: "Java", category: "Language", description: "Object-oriented programming language", color: "red", experience: "3 years" },
{ name: "C++", category: "Language", description: "General-purpose programming language", color: "orange", experience: "2 years" },
{ name: "JavaScript", category: "Language", description: "High-level scripting language for web development", color: "yellow", experience: "3 years" },
// === Tools ===
{ name: "Git", category: "Tool", description: "Version control system for tracking changes in source code", color: "orange", experience: "3 years" },
{ name: "GitHub", category: "Tool", description: "Platform for hosting and collaborating on Git repositories", color: "black", experience: "3 years" },
{ name: "Docker", category: "Tool", description: "Containerization platform for building and deploying applications", color: "skyblue", experience: "1.5 years" },
{ name: "VS Code", category: "Tool", description: "Lightweight source code editor by Microsoft", color: "blueviolet", experience: "3 years" },
// === Deployment Platforms ===
{ name: "Vercel", category: "Deployment", description: "Cloud platform for static sites and serverless functions", color: "gray", experience: "1 year" },
{ name: "AWS", category: "Deployment", description: "Comprehensive cloud platform offering compute and storage services", color: "gold", experience: "1.5 years" },
];

const categories = ["All", "Frontend", "Backend", "Database", "Tools", "Language","Deployment"];

export default function TechStack() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [hoveredTech, setHoveredTech] = useState(null);

  const filteredTech =
    selectedCategory === "All"
      ? techStack
      : techStack.filter((tech) => tech.category === selectedCategory);

  return (
    <section className="techstack-section-unique">
      <div className="techstack-container-unique">
        {/* Header */}
        <div className="techstack-header-unique">
          <h2>
            <span className="techstack-accent-unique">Tech Stack</span>
          </h2>
          <p>
            Crafting digital experiences with cutting-edge technologies and modern development practices
          </p>
        </div>

        {/* Category Filter */}
        <div className="techstack-categories-unique">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category ? "techstack-active-unique" : ""}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Tech Grid */}
        <div className="techstack-grid-unique">
          {filteredTech.map((tech, index) => (
            <div
  key={tech.name}
  className={`techstack-card-unique ${hoveredTech === tech.name ? "techstack-hovered-unique" : ""}`}
  onMouseEnter={() => setHoveredTech(tech.name)}
  onMouseLeave={() => setHoveredTech(null)}
  style={{ animationDelay: `${index * 100}ms`, borderColor: hoveredTech === tech.name ? tech.color : "#333" }}
>
  <span></span>
  <span></span>
  <span></span>
  <span></span>

  <div className="techstack-card-header-unique">
    <h3>{tech.name}</h3>
    <span className="techstack-badge-unique" style={{ background: tech.color }}>
      {tech.category}
    </span>
  </div>
  <p>{tech.description}</p>
</div>

          ))}
        </div>
      </div>
    </section>
  );
}
