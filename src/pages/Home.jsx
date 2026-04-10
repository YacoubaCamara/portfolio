import { useEffect, useState } from "react";
import WeatherWidget from "../components/WeatherWidget";

function Home() {
  const words = [
    "Yacouba Camara",
    "an engineer, and scientist",
    "a basketball player, and fitness enthusiast",
  ];

  const [wordIndex, setWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];

    if (!isDeleting && displayText === currentWord) {
      const pauseTimer = setTimeout(() => {
        setIsDeleting(true);
      }, 1200);

      return () => clearTimeout(pauseTimer);
    }

    if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const speed = isDeleting ? 45 : 85;

    const timer = setTimeout(() => {
      setDisplayText(
        isDeleting
          ? currentWord.slice(0, displayText.length - 1)
          : currentWord.slice(0, displayText.length + 1)
      );
    }, speed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, wordIndex]);

  return (
    <>
      <section className="hero">
        <div className="hero-overlay">
          <div className="layout-container hero-content">
            <div className="hero-text">
              <h1>Hello, I am</h1>
              <p className="typing-line">
                {displayText}
                <span className="typing-cursor"></span>
              </p>
            </div>

            <div className="hero-weather">
              <WeatherWidget />
            </div>
          </div>
        </div>
      </section>

      <section className="about-bottom">
        <div className="layout-container about-bottom-top">
          <div className="about-bottom-left">
            <h2>Hello!</h2>

            <p>
              My name is Yacouba Camara. I am currently working on a streaming
              app, and I am interested in AI, ML, and robotics. I am completing
              my undergraduate at Dalhousie in computer science.
            </p>

            <p className="mt-3">Currently, I am:</p>

            <ul>
              <li>
                Working with data structure and algorithms to solve LeetCode
                style questions
              </li>
              <li>Building a streaming app</li>
              <li>
                Taking math courses to understand AI, ML, and robotics on a
                deeper level
              </li>
            </ul>
          </div>

          <div className="about-bottom-right">
            <h3>Links</h3>

            <ul className="about-links">
            <li>
              <a
                href="https://github.com/YacoubaCamara"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub profile"
              >
                <i className="fa-brands fa-github" aria-hidden="true"></i>
              </a>
            </li>

            <li>
              <a
                href="https://www.linkedin.com/in/yacouba-camara-17b21a330/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn profile"
              >
                <i className="fa-brands fa-linkedin" aria-hidden="true"></i>
              </a>
            </li>

            <li>
              <a
                href="mailto:yacoubacamara478@gmail.com"
                aria-label="Send email to Yacouba Camara"
              >
                <i className="fa-solid fa-envelope" aria-hidden="true"></i>
              </a>
            </li>
          </ul>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;