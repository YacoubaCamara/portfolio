import { useEffect, useState } from "react";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/projects.json");

        if (!response.ok) {
          throw new Error("Failed to fetch projects.");
        }

        const data = await response.json();
        setProjects(data);
      } catch (err) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section className="projects-page">
      <div className="layout-container">
        <h1 className="projects-title">Projects</h1>

        {loading && <p className="projects-status">Loading projects...</p>}
        {error && <p className="projects-error">{error}</p>}

        {!loading && !error && (
          <div className="projects-grid">
            {projects.map((project) => (
              <div className="project-card" key={project.id}>
                
                <h4 className="project-name">{project.name}</h4>

                <p>
                  <strong>Author:</strong> {project.author}
                </p>

                <p>
                  <strong>Languages:</strong>{" "}
                  {project.languages.join(", ")}
                </p>

                {project.video && (
                  <video className="project-video"
                    controls
                    aria-label={`Demo video for ${project.name}`}>
                    <source src={project.video} type="video/mp4" />
                    <track
                      kind="captions"
                      src="/captions/supamail.vtt"
                      srcLang="en"
                      label="English captions"
                    />
                    Your browser does not support the video tag.
                  </video>
                )}

                <p className="project-description">
                  {project.description}
                </p>

              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Projects;