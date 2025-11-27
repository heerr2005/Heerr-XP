import { Instagram, Github, Linkedin, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import userAvatar from "@/assets/user-avatar.png";

export const AboutMeContent = () => {
  const [openSections, setOpenSections] = useState({
    social: true,
    skills: true,
    software: true,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const skills = [
    { name: "Python Programming", icon: "🐍" },
    { name: "Data Analysis", icon: "📊" },
    { name: "Machine Learning", icon: "🤖" },
    { name: "SQL & Databases", icon: "🗄️" },
    { name: "Data Visualization", icon: "📈" },
    { name: "Statistical Analysis", icon: "📉" },
    { name: "Problem Solving", icon: "🧩" },
    { name: "Excel & Reporting", icon: "📋" },
  ];

  const software = [
    { name: "Python", icon: "🐍" },
    { name: "Pandas", icon: "🐼" },
    { name: "NumPy", icon: "🔢" },
    { name: "Scikit-learn", icon: "🔬" },
    { name: "Matplotlib", icon: "📊" },
    { name: "Seaborn", icon: "🎨" },
    { name: "VS Code", icon: "💻" },
    { name: "Jupyter", icon: "📓" },
    { name: "Git/GitHub", icon: "🌿" },
    { name: "SQL", icon: "🗃️" },
    { name: "Excel", icon: "📗" },
    { name: "Power BI", icon: "📈" },
  ];

  return (
    <div className="flex h-full">
      {/* Left Sidebar */}
      <div className="w-48 bg-gradient-to-b from-xp-blue-light/30 to-xp-blue/20 border-r border-border p-2 flex-shrink-0">
        {/* Social Links Section */}
        <div className="mb-3">
          <button 
            onClick={() => toggleSection('social')}
            className="w-full flex items-center justify-between px-2 py-1 bg-xp-blue text-white text-xs font-bold rounded-sm"
          >
            <span>Social Links</span>
            {openSections.social ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
          {openSections.social && (
            <div className="mt-1 space-y-1">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-2 py-1 hover:bg-xp-blue/10 rounded-sm transition-colors">
                <Instagram className="w-4 h-4 text-pink-500" />
                <span className="text-xs">Instagram</span>
              </a>
              <a href="https://github.com/heerr2005" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-2 py-1 hover:bg-xp-blue/10 rounded-sm transition-colors">
                <Github className="w-4 h-4 text-gray-700" />
                <span className="text-xs">Github</span>
              </a>
              <a href="https://www.linkedin.com/in/heerchotaliya" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-2 py-1 hover:bg-xp-blue/10 rounded-sm transition-colors">
                <Linkedin className="w-4 h-4 text-blue-600" />
                <span className="text-xs">LinkedIn</span>
              </a>
            </div>
          )}
        </div>

        {/* Skills Section */}
        <div className="mb-3">
          <button 
            onClick={() => toggleSection('skills')}
            className="w-full flex items-center justify-between px-2 py-1 bg-xp-blue text-white text-xs font-bold rounded-sm"
          >
            <span>Skills</span>
            {openSections.skills ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
          {openSections.skills && (
            <div className="mt-1 space-y-0.5">
              {skills.map((skill) => (
                <div key={skill.name} className="flex items-center gap-2 px-2 py-0.5 hover:bg-xp-blue/10 rounded-sm transition-colors">
                  <span className="text-sm">{skill.icon}</span>
                  <span className="text-xs">{skill.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Software Section */}
        <div>
          <button 
            onClick={() => toggleSection('software')}
            className="w-full flex items-center justify-between px-2 py-1 bg-xp-blue text-white text-xs font-bold rounded-sm"
          >
            <span>Software</span>
            {openSections.software ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
          {openSections.software && (
            <div className="mt-1 space-y-0.5">
              {software.map((item) => (
                <div key={item.name} className="flex items-center gap-2 px-2 py-0.5 hover:bg-xp-blue/10 rounded-sm transition-colors">
                  <span className="text-sm">{item.icon}</span>
                  <span className="text-xs">{item.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gradient-to-br from-xp-blue to-xp-blue-dark p-6 overflow-auto">
        <h1 className="text-3xl font-bold text-white mb-6 drop-shadow-lg">About Me</h1>
        
        <div className="space-y-6">
          {/* Introduction */}
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-lg overflow-hidden border-2 border-white/30 shadow-lg flex-shrink-0">
              <img src={userAvatar} alt="Heer" className="w-full h-full object-cover" />
            </div>
            <p className="text-white/90 text-sm leading-relaxed italic">
              I'm <strong>Heer Chotaliya</strong>, a Data Analyst from <strong>Surat, Gujarat, India</strong>. 
              I transform complex data into actionable insights through advanced analytics and machine learning. 
              Passionate about uncovering patterns that drive strategic decisions.
            </p>
          </div>

          {/* Background */}
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 flex items-center justify-center bg-white/10 rounded-lg flex-shrink-0 text-3xl">
              🎓
            </div>
            <p className="text-white/90 text-sm leading-relaxed italic">
              Detail-oriented and enthusiastic <strong>Computer Science undergraduate</strong>, aspiring Data Analyst 
              with a strong foundation in Python programming. Currently pursuing <strong>B.Tech in Computer Engineering</strong> at 
              Bhagwan Mahavir University, Surat. Completed Diploma in Computer Engineering from N.G Patel Polytechnic.
            </p>
          </div>

          {/* Experience */}
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 flex items-center justify-center bg-white/10 rounded-lg flex-shrink-0 text-3xl">
              💼
            </div>
            <p className="text-white/90 text-sm leading-relaxed italic">
              Currently working as a <strong>Data Analyst at NOVITECH R&D PVT LTD</strong>. Previously completed 
              Machine Learning & Data Science internship at <strong>BRAINYBEAM TECHNOLOGIES</strong>. 
              Certified in <strong>Cloud Computing from Simplilearn</strong>. Passionate about leveraging analytical 
              techniques to extract meaningful insights and support data-driven decision-making.
            </p>
          </div>

          {/* Contact Info */}
          <div className="mt-6 p-4 bg-white/10 rounded-lg">
            <h3 className="text-white font-bold mb-3">📬 Get In Touch</h3>
            <div className="grid grid-cols-2 gap-3 text-white/90 text-sm">
              <div>📧 heerchotaliya78@gmail.com</div>
              <div>📱 +91 7862899167</div>
              <div>📍 Surat, Gujarat, India</div>
              <div>🌐 github.com/heerr2005</div>
            </div>
          </div>
        </div>

        <p className="text-white/60 text-xs mt-6">Learn more about Heer</p>
      </div>
    </div>
  );
};
