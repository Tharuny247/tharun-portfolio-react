import React, { useEffect, useState, useRef } from 'react';

/*
 * Data describing each key on the skills keyboard.  For each
 * entry we record the primary and edge colours, the audio file
 * containing the piano note to play on hover, the human‑readable
 * name of the skill, a short tagline and the Font Awesome icon
 * class.  The optional `iconColor` field overrides the default
 * text colour for that specific key.
 */
const skills = [
  {
    color: '#E34F26',
    edge: '#b3411c',
    sound: 'note01.wav',
    name: 'HTML5',
    tag: 'The backbone of every webpage',
    icon: 'fab fa-html5',
  },
  {
    color: '#2965F1',
    edge: '#214db5',
    sound: 'note02.wav',
    name: 'CSS3',
    tag: 'Style it like a pro',
    icon: 'fab fa-css3-alt',
  },
  {
    color: '#F7E018',
    edge: '#c7b414',
    sound: 'note03.wav',
    name: 'JavaScript',
    tag: 'Making the web interactive',
    icon: 'fab fa-js',
    iconColor: '#1f2937',
  },
  {
    color: '#007ACC',
    edge: '#0060a3',
    sound: 'note04.wav',
    name: 'TypeScript',
    tag: 'JavaScript with type power',
    icon: 'fa-solid fa-code',
  },
  {
    color: '#61DAFB',
    edge: '#4caec6',
    sound: 'note05.wav',
    name: 'React',
    tag: 'Build UIs like never before',
    icon: 'fab fa-react',
    iconColor: '#0e1220',
  },
  {
    color: '#DD0031',
    edge: '#b10028',
    sound: 'note06.wav',
    name: 'Angular',
    tag: 'Robust front‑end architecture',
    icon: 'fab fa-angular',
  },
  {
    color: '#3C873A',
    edge: '#2e662b',
    sound: 'note07.wav',
    name: 'Node.js',
    tag: 'JavaScript server‑side hero',
    icon: 'fab fa-node-js',
  },
  {
    color: '#5382A1',
    edge: '#415f77',
    sound: 'note08.wav',
    name: 'Java',
    tag: 'Write once, run anywhere',
    icon: 'fab fa-java',
  },
  {
    color: '#6DB33F',
    edge: '#548a32',
    sound: 'note09.wav',
    name: 'Spring Boot',
    tag: 'Speedy microservices',
    icon: 'fa-solid fa-seedling',
  },
  {
    color: '#4B8BBE',
    edge: '#3670a0',
    sound: 'note10.wav',
    name: 'Python',
    tag: 'Readable and powerful',
    icon: 'fab fa-python',
  },
  {
    color: '#b56576',
    edge: '#904254',
    sound: 'note11.wav',
    name: 'SQL',
    tag: 'Query your data',
    icon: 'fa-solid fa-database',
  },
  {
    color: '#47A248',
    edge: '#367a38',
    sound: 'note12.wav',
    name: 'MongoDB',
    tag: 'NoSQL document store',
    icon: 'fab fa-envira',
  },
  {
    color: '#231F20',
    edge: '#171516',
    sound: 'note13.wav',
    name: 'Kafka',
    tag: 'Stream all the things',
    icon: 'fa-solid fa-wave-square',
  },
  {
    color: '#0db7ed',
    edge: '#0a8db1',
    sound: 'note14.wav',
    name: 'Docker',
    tag: 'Containerize everything',
    icon: 'fab fa-docker',
  },
  {
    color: '#326CE5',
    edge: '#274fac',
    sound: 'note15.wav',
    name: 'Kubernetes',
    tag: 'Orchestrate your containers',
    icon: 'fab fa-kubernetes',
  },
  {
    color: '#FF9900',
    edge: '#cc7a00',
    sound: 'note16.wav',
    name: 'AWS',
    tag: 'Scale with the cloud',
    icon: 'fab fa-aws',
  },
  {
    color: '#0078D4',
    edge: '#005da1',
    sound: 'note17.wav',
    name: 'Azure',
    tag: 'Cloud by Microsoft',
    icon: 'fa-brands fa-microsoft',
  },
  {
    color: '#F1502F',
    edge: '#bb3b22',
    sound: 'note18.wav',
    name: 'Git',
    tag: 'Commit to excellence',
    icon: 'fab fa-git-alt',
  },
  {
    color: '#D33833',
    edge: '#a42a27',
    sound: 'note19.wav',
    name: 'Jenkins',
    tag: 'Automate your pipelines',
    icon: 'fa-solid fa-building-columns',
  },
  {
    color: '#623CE8',
    edge: '#4f30b5',
    sound: 'note20.wav',
    name: 'Terraform',
    tag: 'Infrastructure as code',
    icon: 'fa-solid fa-cubes-stacked',
  },
  {
    color: '#00B5D5',
    edge: '#008da9',
    sound: 'note21.wav',
    name: 'Observability',
    tag: 'See into your systems',
    icon: 'fa-solid fa-chart-line',
  },
];

function App() {
  // Track whether the light theme is enabled.  The initial state
  // reads from localStorage so that user preferences persist
  // between sessions.
  const [isLight, setIsLight] = useState(() => {
    return window.localStorage.getItem('preferred-theme') === 'light';
  });

  // Track whether the mobile navigation is open.
  const [navOpen, setNavOpen] = useState(false);

  // Refs to update the displayed skill name and tagline
  const skillNameRef = useRef(null);
  const skillTaglineRef = useRef(null);

  // Preload and store audio objects keyed by filename
  const soundsRef = useRef({});

  // Toggle between light and dark modes
  const toggleTheme = () => {
    setIsLight(prev => !prev);
  };

  // Toggle mobile navigation open state
  const toggleNav = () => {
    setNavOpen(prev => !prev);
  };

  // Apply the current theme to the body element and persist to
  // localStorage whenever the theme changes.
  useEffect(() => {
    const body = document.body;
    if (isLight) {
      body.classList.add('light');
    } else {
      body.classList.remove('light');
    }
    window.localStorage.setItem('preferred-theme', isLight ? 'light' : 'dark');
  }, [isLight]);

  // Set up IntersectionObserver to fade elements in when scrolled
  // into view.  This runs once on mount.
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      { threshold: 0.1 }
    );
    const animated = document.querySelectorAll(
      'section, .timeline-item, .project-card, .key, .cert-item'
    );
    animated.forEach(el => observer.observe(el));
    return () => {
      animated.forEach(el => observer.unobserve(el));
    };
  }, []);

  // Preload all piano notes and start the automatic highlight
  // animation for the skills keyboard.  This effect runs only
  // once after mount.
  useEffect(() => {
    // Preload audio files
    skills.forEach(k => {
      const { sound } = k;
      if (sound && !soundsRef.current[sound]) {
        const audio = new Audio(
          process.env.PUBLIC_URL + '/assets/sounds/' + sound
        );
        audio.preload = 'auto';
        soundsRef.current[sound] = audio;
      }
    });
    // Automatic highlight cycle for keys
    const keyElems = document.querySelectorAll('#skills .board-base .key');
    let index = 0;
    const interval = setInterval(() => {
      keyElems.forEach(k => k.classList.remove('active'));
      if (keyElems[index]) keyElems[index].classList.add('active');
      index = (index + 1) % keyElems.length;
    }, 2500);
    return () => {
      clearInterval(interval);
    };
  }, []);

  // Start and stop the typing animation when the typing section is
  // scrolled into view.  A single interval animates through the
  // keys on the secondary board.  When the section leaves the
  // viewport the interval is cleared.
  useEffect(() => {
    const typingSection = document.querySelector('.typing-section');
    const typingKeys = document.querySelectorAll('.typing-board .typing-key');
    let interval = null;
    const startAnim = () => {
      if (!interval && typingKeys.length) {
        let i = 0;
        interval = setInterval(() => {
          typingKeys.forEach(k => k.classList.remove('active'));
          if (typingKeys[i]) {
            typingKeys[i].classList.add('active');
          }
          i = (i + 1) % typingKeys.length;
        }, 1800);
      }
    };
    const stopAnim = () => {
      if (interval) {
        clearInterval(interval);
        interval = null;
        typingKeys.forEach(k => k.classList.remove('active'));
      }
    };
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            startAnim();
          } else {
            stopAnim();
          }
        });
      },
      { threshold: 0.4 }
    );
    if (typingSection) observer.observe(typingSection);
    return () => {
      observer.disconnect();
      stopAnim();
    };
  }, []);

  // Handler for when the user hovers over a skill key.  It plays
  // the associated audio and updates the display name/tagline.
  const handleKeyEnter = (skill) => {
    const audio = soundsRef.current[skill.sound];
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(() => {});
    }
    if (skillNameRef.current) {
      skillNameRef.current.textContent = skill.name;
    }
    if (skillTaglineRef.current) {
      skillTaglineRef.current.textContent = skill.tag;
    }
  };

  // Reset the display when leaving a key
  const handleKeyLeave = () => {
    if (skillNameRef.current) {
      skillNameRef.current.textContent = 'Hover a key';
    }
    if (skillTaglineRef.current) {
      skillTaglineRef.current.textContent = '';
    }
  };

  // Compute the current year for the footer
  const currentYear = new Date().getFullYear();

  return (
    <>
      {/* Header and navigation */}
      <header>
        <div className="container">
          <div className="logo">
            <a href="#">THARUN Y</a>
          </div>
          <nav>
            <ul className={navOpen ? 'nav-list open' : 'nav-list'}>
              <li>
                <a
                  href="#about"
                  onClick={() => setNavOpen(false)}
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#experience"
                  onClick={() => setNavOpen(false)}
                >
                  Experience
                </a>
              </li>
              <li>
                <a
                  href="#skills"
                  onClick={() => setNavOpen(false)}
                >
                  Skills
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  onClick={() => setNavOpen(false)}
                >
                  Projects
                </a>
              </li>
              <li>
                <a
                  href="#certifications"
                  onClick={() => setNavOpen(false)}
                >
                  Certifications
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={() => setNavOpen(false)}
                >
                  Contact
                </a>
              </li>
            </ul>
            <button
              id="theme-toggle"
              aria-label="Toggle dark/light mode"
              onClick={toggleTheme}
            >
              <i className={`fa-solid ${isLight ? 'fa-sun' : 'fa-moon'}`}></i>
            </button>
          </nav>
          {/* Mobile menu button */}
          <button
            className="nav-toggle"
            aria-label="Toggle navigation"
            onClick={toggleNav}
          >
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero">
        <div className="container hero-container">
          <div className="hero-text">
            <p className="greeting">Hi, I'm</p>
            <h1>Tharun Y.</h1>
            <h2>Full‑Stack Developer</h2>
            <p className="summary">
              Dynamic and results‑driven developer with over eight years of
              experience designing, building and deploying scalable
              applications. I enjoy bridging intuitive front‑end experiences
              with secure, high‑performance back‑end services.
            </p>
            <div className="hero-buttons">
              {/* The résumé is provided alongside the site for download */}
              <a href="/resume.docx" className="btn" download>
                Download Résumé
              </a>
              <a href="#contact" className="btn btn-secondary">
                Hire Me
              </a>
            </div>
            <div className="social-icons">
              <a
                href="mailto:tharuny247@gmail.com"
                aria-label="Email Tharun"
              >
                <i className="fa-solid fa-envelope"></i>
              </a>
              <a href="https://github.com/" aria-label="GitHub">
                <i className="fab fa-github"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/tharuny247/"
                aria-label="LinkedIn"
              >
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>
          <div className="hero-image">
            {/* Abstract cloud illustration to accompany the tagline */}
            <img
              src={process.env.PUBLIC_URL + '/img/cloud.png'}
              alt="Abstract cloud computing illustration showing interconnected nodes"
            />
          </div>
        </div>
        {/* Scroll indicator for hero */}
        <div className="scroll-indicator">
          <a href="#about" aria-label="Scroll to About section">
            <i className="fa-solid fa-angle-down"></i>
          </a>
        </div>
      </section>

      {/* Typing Demo Section */}
      <section className="typing-section">
        <div className="container">
          <h2 className="typing-title">Fun in the Lab</h2>
          <div className="typing-wrapper">
            {/* Cute mascot typing illustration */}
            <img
              src={process.env.PUBLIC_URL + '/img/typing_mascot.png'}
              alt="Cute yellow mascot typing at a keyboard"
              className="typing-mascot"
            />
            {/* Secondary keyboard used solely for the typing animation */}
            <div className="board-base typing-board">
              <div className="keyboard">
                {skills.map((skill, idx) => (
                  <div
                    key={idx}
                    className="key typing-key"
                    style={{
                      '--key-color': skill.color,
                      '--edge-color': skill.edge,
                      color: skill.iconColor || undefined,
                    }}
                  >
                    <i className={skill.icon}></i>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about">
        <div className="container about-container">
          <div className="about-text">
            <h2>About Me</h2>
            <p>
              I'm a passionate full‑stack engineer who thrives at the
              intersection of user experience and robust back‑end architecture.
              My work spans financial services, healthcare, education and retail
              domains, where I've built high‑traffic applications using Java,
              Spring Boot and .NET on the server side and React and Angular on
              the client side. I enjoy tackling complex integration
              challenges, orchestrating microservices and leveraging cloud
              platforms to deliver resilient solutions. When I'm not coding
              you'll find me exploring new machine‑learning techniques or
              mentoring teams on DevOps best practices.
            </p>
          </div>
          <div className="about-image">
            <img
              src={process.env.PUBLIC_URL + '/img/code.jpg'}
              alt="Close‑up of colourful code lines on a monitor"
            />
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills">
        <div className="container">
          <h2>Skills</h2>
          {/* Wrapper positions the descriptive text next to the keyboard
              on wide screens and stacks it on small screens. */}
          <div className="keyboard-wrapper">
            <div className="skill-display">
              <h3 id="skill-name" ref={skillNameRef}>
                Hover a key
              </h3>
              <p id="skill-tagline" ref={skillTaglineRef}></p>
            </div>
            <div className="board-base">
              <div className="keyboard">
                {skills.map((skill, idx) => (
                  <div
                    key={idx}
                    className="key"
                    style={{
                      '--key-color': skill.color,
                      '--edge-color': skill.edge,
                      color: skill.iconColor || undefined,
                    }}
                    onMouseEnter={() => handleKeyEnter(skill)}
                    onMouseLeave={handleKeyLeave}
                  >
                    <i className={skill.icon}></i>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience">
        <div className="container">
          <h2>Experience</h2>
          <div className="timeline">
            {/* PNC Bank */}
            <div className="timeline-item">
              <div className="timeline-icon">
                <i className="fa-solid fa-briefcase"></i>
              </div>
              <div className="timeline-content">
                <h3>
                  Sr Software Engineer <span>- PNC Bank, TX, USA</span>
                </h3>
                <span className="timeline-date">Jul 2024 – Present</span>
                <ul>
                  <li>
                    Develop responsive, modular UI components using React JS,
                    Node.js and Bootstrap, enabling real‑time user
                    interactions for core banking services.
                  </li>
                  <li>
                    Implement stateless authentication and authorization
                    using JWT and Spring Security to support scalable,
                    secure session handling.
                  </li>
                  <li>
                    Create secure microservices with Java 8 &amp; Spring Boot
                    to process transactions and integrate third‑party
                    financial services.
                  </li>
                  <li>
                    Containerize services with Docker and orchestrate
                    deployments across Kubernetes clusters in AWS;
                    automate build and release pipelines with Jenkins.
                  </li>
                </ul>
              </div>
            </div>
            {/* PepsiCo */}
            <div className="timeline-item">
              <div className="timeline-icon">
                <i className="fa-solid fa-briefcase"></i>
              </div>
              <div className="timeline-content">
                <h3>
                  Sr Software Developer <span>- PepsiCo, TX, USA</span>
                </h3>
                <span className="timeline-date">Apr 2023 – Jun 2024</span>
                <ul>
                  <li>
                    Designed and implemented a modular microservices
                    integration platform using Java 8, Spring Boot and
                    AngularJS to unify financial and operational data.
                  </li>
                  <li>
                    Engineered Kafka‑based pipelines to process
                    high‑throughput events and deliver real‑time insights
                    to business stakeholders.
                  </li>
                    <li>
                    Deployed containerized workloads to AWS ECS/EKS,
                    leveraging Docker and Kubernetes for scalability and
                    resilience.
                  </li>
                  <li>
                    Automated builds, testing and deployments using
                    Jenkins, Gradle and GitLab; improved observability with
                    AppDynamics and Grafana.
                  </li>
                </ul>
              </div>
            </div>
            {/* Cybersoft Technologies */}
            <div className="timeline-item">
              <div className="timeline-icon">
                <i className="fa-solid fa-briefcase"></i>
              </div>
              <div className="timeline-content">
                <h3>
                  Software Developer <span>- Cybersoft Technologies, TX,
                  USA</span>
                </h3>
                <span className="timeline-date">Sep 2022 – Apr 2023</span>
                <ul>
                  <li>
                    Delivered a cloud‑based SaaS platform for K‑12 nutrition
                    programs using Java 17, Spring Boot and React JS.
                  </li>
                  <li>
                    Integrated Apache Kafka for real‑time transaction
                    processing and system notifications.
                  </li>
                  <li>
                    Provisioned infrastructure with Terraform and
                    orchestrated blue‑green deployments on OpenShift and
                    Kubernetes.
                  </li>
                  <li>
                    Achieved 90% test coverage with JUnit 5 and Mockito;
                    documented APIs using Swagger/OpenAPI.
                  </li>
                </ul>
              </div>
            </div>
            {/* Carelon Global Solutions */}
            <div className="timeline-item">
              <div className="timeline-icon">
                <i className="fa-solid fa-briefcase"></i>
              </div>
              <div className="timeline-content">
                <h3>
                  Software Engineer <span>- Carelon Global Solutions,
                  Hyderabad IN</span>
                </h3>
                <span className="timeline-date">Oct 2020 – Aug 2022</span>
                <ul>
                  <li>
                    Designed secure microservices for provider workflows
                    using Java 11, Spring Boot and Hibernate, delivering
                    HIPAA compliant APIs.
                  </li>
                  <li>
                    Improved API response time by 90% via Redis caching
                    and reactive programming with Spring WebFlux.
                  </li>
                  <li>
                    Integrated Kafka to power high‑volume event streams
                    and implemented JWT/OAuth 2.0 for access control.
                  </li>
                  <li>
                    Modernized the provider portal UI with React and
                    Angular; provisioned infrastructure using Terraform
                    and AWS CloudFormation.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects">
        <div className="container">
          <h2>Projects</h2>
          <div className="projects-grid">
            {/* Project: Microservices Platform */}
            <div className="project-card">
              <img
                src={process.env.PUBLIC_URL + '/img/microservices.png'}
                alt="Abstract microservices architecture illustration with interconnected cubes"
              />
              <div className="project-content">
                <h3>Enterprise Microservices Platform</h3>
                <p>
                  Built a modular integration platform for a global food &amp;
                  beverage enterprise that unified financial and operational
                  data across multiple systems. Implemented microservices
                  with Java &amp; Spring Boot, created responsive web
                  components with AngularJS and delivered real‑time
                  insights via Kafka.
                </p>
                <div className="project-tags">
                  <span>Java&nbsp;&amp;&nbsp;Spring</span>
                  <span>AngularJS</span>
                  <span>Kafka</span>
                  <span>AWS&nbsp;EKS</span>
                  <span>Docker</span>
                </div>
              </div>
            </div>
            {/* Project: Provider System */}
            <div className="project-card">
              <img
                src={process.env.PUBLIC_URL + '/img/devops_loop.png'}
                alt="DevOps lifecycle loop with neon colours"
              />
              <div className="project-content">
                <h3>Strategic Provider System</h3>
                <p>
                  Developed a secure provider management system for a health
                  insurance subsidiary. Designed RESTful microservices for
                  registration and credentialing, reduced latency with
                  Redis caching and reactive APIs and integrated Kafka for
                  asynchronous event streams.
                </p>
                <div className="project-tags">
                  <span>Java&nbsp;11</span>
                  <span>Spring Boot</span>
                  <span>Redis</span>
                  <span>Kafka</span>
                  <span>React</span>
                </div>
              </div>
            </div>
            {/* Project: K‑12 SaaS Platform */}
            <div className="project-card">
              <img
                src={process.env.PUBLIC_URL + '/img/code.jpg'}
                alt="Colourful code lines used to illustrate a project"
              />
              <div className="project-content">
                <h3>K‑12 Nutrition SaaS Platform</h3>
                <p>
                  Delivered a comprehensive SaaS solution that streamlined
                  menu planning, inventory management and payment portals
                  for schools. Implemented REST and GraphQL APIs with
                  Java 17 &amp; Spring Boot, integrated Kafka for real‑time
                  notifications and deployed microservices on Azure via
                  Kubernetes.
                </p>
                <div className="project-tags">
                  <span>Java&nbsp;17</span>
                  <span>Spring&nbsp;Boot</span>
                  <span>React</span>
                  <span>GraphQL</span>
                  <span>Kubernetes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications">
        <div className="container">
          <h2>Certifications</h2>
          <div className="certifications-list">
            <div className="cert-item">
              <i className="fa-solid fa-certificate"></i>
              <span>Oracle Certified Professional, Java SE 11 Developer</span>
            </div>
            <div className="cert-item">
              <i className="fa-solid fa-certificate"></i>
              <span>Oracle Certified Professional, Java SE 8 Programmer</span>
            </div>
            <div className="cert-item">
              <i className="fa-solid fa-certificate"></i>
              <span>AWS Certified Developer</span>
            </div>
            <div className="cert-item">
              <i className="fa-solid fa-certificate"></i>
              <span>Microsoft Certified Azure Fundamentals</span>
            </div>
            <div className="cert-item">
              <i className="fa-solid fa-certificate"></i>
              <span>JP Morgan Chase Software Engineering Simulation</span>
            </div>
            <div className="cert-item">
              <i className="fa-solid fa-certificate"></i>
              <span>Machine Learning – Data Driven Science</span>
            </div>
            <div className="cert-item">
              <i className="fa-solid fa-certificate"></i>
              <span>Microsoft Virtual Academy: Mobile &amp; Desktop Development</span>
            </div>
            <div className="cert-item">
              <i className="fa-solid fa-certificate"></i>
              <span>Salesforce Platform Workshop</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact">
        <div className="container">
          <h2>Contact</h2>
          <div className="contact-container">
            {/* Contact information */}
            <div className="contact-info">
              <p>
                <i className="fa-solid fa-phone"></i> +1 732‑630‑5730
              </p>
              <p>
                <i className="fa-solid fa-envelope"></i>{' '}
                <a href="mailto:tharuny247@gmail.com">tharuny247@gmail.com</a>
              </p>
              <p>
                <i className="fab fa-linkedin"></i>{' '}
                <a href="https://www.linkedin.com/in/tharuny247/">
                  linkedin.com/in/tharuny247
                </a>
              </p>
              <p>
                <i className="fab fa-github"></i>{' '}
                <a href="https://github.com/">github.com</a>
              </p>
              <p>
                I am always open to discussing new projects, creative ideas or
                opportunities to be part of your vision. Feel free to drop me a
                line and I'll get back to you shortly.
              </p>
            </div>
            {/* Contact form */}
            <div className="contact-form">
              <form
                action="mailto:tharuny247@gmail.com"
                method="post"
                encType="text/plain"
              >
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  required
                />
                <textarea
                  name="message"
                  rows="5"
                  placeholder="Tell me about your project or idea..."
                  required
                ></textarea>
                <button type="submit" className="btn">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="container">
          <div className="footer-social">
            <a
              href="mailto:tharuny247@gmail.com"
              aria-label="Email"
            >
              <i className="fa-solid fa-envelope"></i>
            </a>
            <a href="https://github.com/" aria-label="GitHub">
              <i className="fab fa-github"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/tharuny247/"
              aria-label="LinkedIn"
            >
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
          <p>
            &copy; <span>{currentYear}</span> Tharun Y. All rights
            reserved.
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;