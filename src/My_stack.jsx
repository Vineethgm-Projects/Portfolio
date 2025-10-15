import React, { useState } from "react";
import "./Mystack.css";

const techStack = [
  { name: "SvelteKit", category: "Frontend", description: "Lightning-fast reactive framework", color: "orange", experience: "2 years" },
  { name: "Solid.js", category: "Frontend", description: "Fine-grained reactive primitives", color: "blue", experience: "1 year" },
  { name: "Astro", category: "Frontend", description: "Content-focused static site generator", color: "purple", experience: "1.5 years" },
  { name: "Alpine.js", category: "Frontend", description: "Minimal framework for HTML enhancement", color: "teal", experience: "2 years" },
  { name: "Bun", category: "Backend", description: "All-in-one JavaScript runtime & toolkit", color: "yellow", experience: "6 months" },
  { name: "Hono", category: "Backend", description: "Ultrafast web framework for edge", color: "red", experience: "8 months" },
  { name: "Drizzle ORM", category: "Backend", description: "TypeScript ORM with SQL-like syntax", color: "green", experience: "1 year" },
  { name: "tRPC", category: "Backend", description: "End-to-end typesafe APIs", color: "indigo", experience: "1.5 years" },
  { name: "Turso", category: "Database", description: "Edge SQLite database", color: "cyan", experience: "8 months" },
  { name: "PlanetScale", category: "Database", description: "Serverless MySQL platform", color: "pink", experience: "1 year" },
  { name: "Upstash", category: "Database", description: "Serverless Redis & Kafka", color: "emerald", experience: "1 year" },
  { name: "Biome", category: "Tools", description: "Fast formatter & linter", color: "violet", experience: "6 months" },
  { name: "Vite", category: "Tools", description: "Next generation build tool", color: "amber", experience: "2 years" },
  { name: "Turborepo", category: "Tools", description: "High-performance monorepo system", color: "rose", experience: "1 year" },
  { name: "Cloudflare Workers", category: "Deployment", description: "Serverless compute at the edge", color: "orange", experience: "1.5 years" },
  { name: "Railway", category: "Deployment", description: "Infrastructure platform", color: "slate", experience: "1 year" },
];

const categories = ["All", "Frontend", "Backend", "Database", "Tools", "Deployment"];

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
            Tech Stack & <span className="techstack-accent-unique">Expertise</span>
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
