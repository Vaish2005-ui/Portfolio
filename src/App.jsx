import React, { useState, useEffect, useRef } from 'react';

// --- Basic Profile/Data ---
const PROFILE_DATA = {
  name: 'Vaishnavi Falle',
  title: 'Full Stack Developer & AI Enthusiast',
  bio: 'Experienced developer passionate about building scalable solutions and exploring the intersection of technology and creativity. I turn complex problems into clean, efficient code.',
  email: 'vaishnavifalle1@gmail.com',
  github: 'Vaish2005-ui',
  linkedin: 'https://www.linkedin.com/in/vaishnavi-falle-93131426b/',
  // Place your photo in /public as profile.jp (served at /profile.jp)
  photoUrl: '/profile.jpg'
};

const SKILLS = [
  { name: 'TypeScript / JavaScript', level: 95, color: 'text-blue-400' },
  { name: 'React / Next.js', level: 90, color: 'text-cyan-400' },
  { name: 'C# / .NET', level: 85, color: 'text-green-400' },
  { name: 'Python', level: 80, color: 'text-indigo-400' },
  { name: 'Tailwind CSS', level: 75, color: 'text-sky-400' },
];

const PROJECTS = [
  {
    title: 'hackbuild-Datax',
    description:
      'A full-stack data exchange and management platform, built using TypeScript and Next.js, featuring a clean, responsive UI and scalable architecture.',
    technologies: ['TypeScript', 'Next.js', 'React', 'CSS'],
    link: 'https://github.com/Vaish2005-ui/hackbuild-Datax',
  },
  {
    title: 'FreelancerApp',
    description:
      'A C# application for freelancers, demonstrating robust backend logic, with recent updates focused on dashboard layout and bid submission stability.',
    technologies: ['C#', '.NET', 'Frontend UI'],
    link: 'https://github.com/Vaish2005-ui/FreelancerApp',
  },
  {
    title: 'Voice-Controlled-Budget-Tracker',
    description:
      'A Python application for hands-free expense tracking, allowing users to manage budgets and save data to CSV via voice commands.',
    technologies: ['Python', 'Voice Control', 'CSV'],
    link: 'https://github.com/Vaish2005-ui/Voice-Controlled-Budget-Tracker',
  },
  {
    title: 'Fitness_Tracker',
    description:
      'A C# project designed to help users track their fitness goals, monitor workout routines, and record progress over time.',
    technologies: ['C#', 'Console/GUI'],
    link: 'https://github.com/Vaish2005-ui/Fitness_Tracker',
  },
];

// --- Animated Section ---
const AnimatedSection = ({ id, title, children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (domRef.current) observer.observe(domRef.current);
    return () => {
      if (domRef.current) observer.unobserve(domRef.current);
    };
  }, []);

  const animationClass = isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8';

  return (
    <section id={id} ref={domRef} className="py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-sky-400">
          {title}
        </h2>
        <div className={`transition-all duration-1000 ease-out ${animationClass}`}>
          {typeof children === 'function' ? children({ parentVisible: isVisible }) : children}
        </div>
      </div>
    </section>
  );
};

// --- Main App ---
const App = () => {
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Skills', id: 'skills' },
    { name: 'Projects', id: 'projects' },
    { name: 'Contact', id: 'contact' },
  ];

  const Navbar = () => (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-md shadow-xl border-b border-gray-800">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex justify-between items-center h-16">
          <a
            href="#home"
            className="text-2xl font-extrabold text-sky-400 hover:text-sky-300 transition duration-300"
            onClick={(e) => {
              e.preventDefault();
              setActiveSection('home');
              const el = document.getElementById('home');
              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
          >
            {PROFILE_DATA.name.split(' ')[0]} Dev
          </a>
          <div className="flex space-x-2 sm:space-x-4">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`px-3 py-1 sm:py-2 rounded-full text-sm font-medium transition duration-300 ${
                  activeSection === item.id
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/50'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-indigo-300'
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveSection(item.id);
                  const el = document.getElementById(item.id);
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );

  const HeroSection = () => (
    <section
      id="home"
      className="flex items-center justify-center min-h-screen pt-16 text-white p-4 bg-gray-950 relative overflow-hidden"
      style={{
        background:
          'radial-gradient(circle at 50% 10%, rgba(67, 56, 202, 0.1), transparent 50%)',
      }}
    >
      <div className="text-center transition-opacity duration-1000 ease-in opacity-100 animate-slide-up-fade relative z-10">
        <img
          src={PROFILE_DATA.photoUrl}
          alt={PROFILE_DATA.name}
          className="w-48 h-48 rounded-full mx-auto mb-6 object-cover object-top border-4 border-indigo-500 shadow-2xl transform hover:scale-105 transition duration-300"
          onError={(e) => (e.target.src = 'https://placehold.co/200x200/4f46e5/ffffff?text=VF')}
        />
        <h1 className="text-5xl md:text-7xl font-extrabold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-sky-300 to-indigo-400">
          Hello, I'm {PROFILE_DATA.name}
        </h1>
        <p className="text-xl md:text-2xl font-light text-gray-400 mb-10 tracking-wider">
          {PROFILE_DATA.title}
        </p>
        <a
          href="#projects"
          onClick={(e) => {
            e.preventDefault();
            setActiveSection('projects');
            const el = document.getElementById('projects');
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}
          className="inline-block px-10 py-3 bg-indigo-600 text-white font-bold rounded-lg shadow-xl hover:bg-indigo-700 transition duration-300 transform hover:scale-105 hover:shadow-indigo-500/60"
        >
          Explore My Work →
        </a>
      </div>
    </section>
  );

  const AboutSection = () => (
    <AnimatedSection id="about" title="About Me">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl transition duration-500 hover:shadow-sky-500/20 border border-gray-700">
        <p className="text-lg text-gray-300 leading-relaxed">{PROFILE_DATA.bio}</p>
        <p className="text-lg text-gray-300 leading-relaxed mt-4">
          I thrive in environments where continuous learning is paramount, always seeking the next challenge to expand my expertise in cutting-edge frameworks and API integration. Let's build something amazing together.
        </p>
        <div className="mt-8 flex justify-center space-x-8 text-gray-400">
          <a
            href={`https://github.com/${PROFILE_DATA.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-400 transition duration-300 text-3xl"
            title="GitHub"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.082-.742.083-.727.083-.727 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.046.138 3.003.404 2.293-1.552 3.301-1.23 3.301-1.23.653 1.653.242 2.873.117 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.474 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.563 21.802 24 17.301 24 12c0-6.627-5.373-12-12-12z"/></svg>
          </a>
          <a
            href={`https://linkedin.com/in/${PROFILE_DATA.linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-400 transition duration-300 text-3xl"
            title="LinkedIn"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.568-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
          </a>
        </div>
      </div>
    </AnimatedSection>
  );

  const SkillBar = ({ name, level, color, parentVisible }) => {
    const widthStyle = parentVisible ? { width: `${level}%` } : { width: '0%' };
    return (
      <div className="mb-4">
        <div className="flex justify-between mb-1">
          <span className="text-base font-medium text-gray-200">{name}</span>
          <span className={`${color} text-sm font-semibold`}>{level}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-sky-500 to-indigo-600"
            style={{ ...widthStyle, transition: 'width 1.5s ease-out 0.5s' }}
          />
        </div>
      </div>
    );
  };

  const SkillsSection = () => (
    <AnimatedSection id="skills" title="Technical Skills">
      {({ parentVisible }) => (
        <div className="grid md:grid-cols-2 gap-10">
          <div className="space-y-6 bg-gray-800 p-8 rounded-2xl shadow-2xl transition duration-500 hover:shadow-indigo-500/30 border border-gray-700">
            <h3 className="text-2xl font-semibold text-white mb-4 border-b border-gray-700 pb-2">Core Competencies</h3>
            {SKILLS.map((skill, index) => (
              <SkillBar key={index} name={skill.name} level={skill.level} color={skill.color} parentVisible={parentVisible} />
            ))}
          </div>
          <div className="flex flex-col justify-center p-8 bg-gray-800 rounded-2xl shadow-2xl text-gray-300 border border-gray-700">
            <h3 className="text-2xl font-semibold text-white mb-4 border-b border-gray-700 pb-2">What I Bring to the Table</h3>
            <ul className="space-y-4 list-none pl-0">
              <li className="flex items-start"><span className="text-indigo-400 mr-3 text-xl">★</span>Modern, modular, and component-based application architecture.</li>
              <li className="flex items-start"><span className="text-indigo-400 mr-3 text-xl">★</span>Proficiency in cloud deployment and CI/CD pipelines.</li>
              <li className="flex items-start"><span className="text-indigo-400 mr-3 text-xl">★</span>Strong foundation in data structures and algorithms.</li>
              <li className="flex items-start"><span className="text-indigo-400 mr-3 text-xl">★</span>A commitment to writing clean, maintainable, and well-tested code.</li>
            </ul>
          </div>
        </div>
      )}
    </AnimatedSection>
  );

  const ProjectCard = ({ project, index, parentVisible }) => {
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
      if (parentVisible) {
        const timer = setTimeout(() => setIsVisible(true), index * 150);
        return () => clearTimeout(timer);
      }
    }, [index, parentVisible]);
    const animationClass = isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95';
    return (
      <div
        className={`bg-gray-800 p-6 rounded-xl shadow-xl transition-all duration-500 ease-out border border-gray-700 transform hover:translate-y-[-8px] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] ${animationClass}`}
      >
        <h3 className="text-2xl font-bold text-white mb-2 border-b border-indigo-500/50 pb-1">{project.title}</h3>
        <p className="text-gray-400 mb-4 text-sm">{project.description}</p>
        <div className="mb-4">
          {project.technologies.map((tech, i) => (
            <span key={i} className="inline-block bg-sky-900/40 text-sky-300 text-xs font-medium mr-2 mb-2 px-3 py-1 rounded-full">
              {tech}
            </span>
          ))}
        </div>
        <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 font-semibold transition duration-300 flex items-center group">
          View Repository
          <span className="ml-2 text-xl transition-transform duration-300 group-hover:translate-x-1">→</span>
        </a>
      </div>
    );
  };

  const ProjectsSection = () => (
    <AnimatedSection id="projects" title="Featured Projects">
      {({ parentVisible }) => (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} parentVisible={parentVisible} />
          ))}
        </div>
      )}
    </AnimatedSection>
  );

  const ContactSection = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const handleSubmit = (e) => {
      e.preventDefault();
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 3000);
    };
    return (
      <AnimatedSection id="contact" title="Get In Touch">
        <div className="max-w-xl mx-auto space-y-8">
          <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl transition duration-500 hover:shadow-purple-500/30 border border-gray-700">
            <h3 className="text-2xl font-bold text-white mb-4 border-b border-gray-700 pb-2">Direct Message</h3>
            <p className="text-gray-300 mb-6 text-center text-lg">I'm currently open to new opportunities. Feel free to reach out directly!</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-400">Name</label>
                <input id="name" name="name" type="text" required className="mt-1 block w-full rounded-lg border-gray-600 bg-gray-700 text-white p-3 focus:ring-sky-500 focus:border-sky-500 transition duration-300" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-400">Email</label>
                <input id="email" name="email" type="email" required className="mt-1 block w-full rounded-lg border-gray-600 bg-gray-700 text-white p-3 focus:ring-sky-500 focus:border-sky-500 transition duration-300" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-400">Message</label>
                <textarea id="message" name="message" rows="4" required className="mt-1 block w-full rounded-lg border-gray-600 bg-gray-700 text-white p-3 focus:ring-sky-500 focus:border-sky-500 transition duration-300" />
              </div>
              <button
                type="submit"
                disabled={isSubmitted}
                className={`w-full py-3 px-4 border border-transparent rounded-lg text-white font-bold shadow-lg transition-all duration-300 transform ${
                  isSubmitted ? 'bg-green-600 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 hover:scale-[1.01]'
                }`}
              >
                {isSubmitted ? 'Message Sent! ✅' : 'Send Message'}
              </button>
            </form>
            <div className="mt-8 text-center text-gray-400">
              <p className="font-medium">Or, reach out directly:</p>
              <a href={`mailto:${PROFILE_DATA.email}`} className="text-sky-400 hover:underline transition duration-300">
                {PROFILE_DATA.email}
              </a>
            </div>
          </div>
        </div>
      </AnimatedSection>
    );
  };

  const Footer = () => (
    <footer className="bg-gray-950/80 py-6 border-t border-gray-800">
      <div className="container mx-auto px-4 max-w-6xl text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} {PROFILE_DATA.name}. All rights reserved.</p>
        <p className="mt-2">Designed and built with React and Tailwind CSS.</p>
      </div>
    </footer>
  );

  return (
    <div className="bg-gray-950 min-h-screen font-sans">
      <Navbar />
      <main className="text-white">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default App;
