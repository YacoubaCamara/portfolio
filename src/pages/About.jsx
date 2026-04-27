import { useState } from "react";

function About() {
  const skills = [
  { name: "JavaScript", category: "Languages" },
  { name: "Python", category: "Languages" },
  { name: "Java", category: "Languages" },
  { name: "PHP", category: "Languages" },
  { name: "C++", category: "Languages" },
  { name: "SQL", category: "Languages" },

  { name: "React", category: "Frameworks & Libraries" },
  { name: "Next.js", category: "Frameworks & Libraries" },
  { name: "Node.js", category: "Frameworks & Libraries" },
  { name: "Express.js", category: "Frameworks & Libraries" },
  { name: "Leaflet.js", category: "Frameworks & Libraries" },
  { name: "Bootstrap", category: "Frameworks & Libraries" },

  { name: "Claude AI", category: "AI & Data" },
  { name: "RAG pipelines", category: "AI & Data" },
  { name: "pgvector", category: "AI & Data" },
  { name: "Supabase", category: "AI & Data" },
  { name: "Voyage AI", category: "AI & Data" },
  { name: "MongoDB", category: "AI & Data" },
  { name: "MySQL", category: "AI & Data" },

  { name: "Git", category: "Tools" },
  { name: "GitHub", category: "Tools" },
  { name: "Vercel", category: "Tools" },
  { name: "Postman", category: "Tools" },
  { name: "VS Code", category: "Tools" },
  { name: "Wireshark", category: "Tools" },
  { name: "Docker", category: "Tools" },
  { name: "Suricata", category: "Tools" },
  { name: "IntelliJ", category: "Tools" },

];

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...new Set(skills.map((skill) => skill.category))];

  const filteredSkills = skills.filter((skill) => {
    const matchesSearch = skill.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || skill.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <section className="about-page">
      <div className="layout-container">
        <h1 className="about-page-title">About Me</h1>

        <section className="about-block">
          <h3>Bio</h3>
          <p>
            I’m a Computer Science student at Dalhousie University with a strong interest in building practical applications that solve real-world problems. I enjoy working across the full stack, from designing clean user interfaces to implementing backend logic and APIs.

My interest in technology started with a curiosity for how applications work behind the scenes, which led me to explore web development, data structures, and software engineering principles. Recently, I’ve been focusing on areas like artificial intelligence, machine learning, and robotics, while strengthening my problem-solving skills through algorithm practice.

Currently, I’m building a streaming application. I also spend time working on LeetCode-style problems to sharpen my understanding of data structures and algorithms.

My goal is to become a well-rounded software engineer and contribute to impactful projects, particularly in AI-driven applications and scalable systems.
          </p>
        </section>

        {/* <section className="about-block">
          <h3>Education</h3>
          <p>Bachelor of Computer Science, Dalhousie University</p>
        </section> */}

        <section className="about-block">
          <h3>Technical Expertise</h3>

          <div className="about-controls">
            <input
              type="text"
              className="about-input"
              placeholder="Search skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <select
              className="about-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="about-skills-grid">
            {filteredSkills.length > 0 ? (
              filteredSkills.map((skill, index) => (
                <div className="about-skill-card" key={index}>
                  <h5>{skill.name}</h5>
                  <p>{skill.category}</p>
                </div>
              ))
            ) : (
              <p className="about-no-results">No skills match your search.</p>
            )}
          </div>
        </section>
      </div>
    </section>
  );
}

export default About;