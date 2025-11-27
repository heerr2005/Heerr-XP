import { Download, Briefcase, GraduationCap, Award, Code } from "lucide-react";

export const ResumeContent = () => {
  return (
    <div className="p-6 max-h-[500px] overflow-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Heer Chotaliya</h1>
          <p className="text-primary font-semibold">Data Analyst</p>
          <p className="text-sm text-muted-foreground">Surat, Gujarat, India</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-xp-blue text-white rounded hover:bg-xp-blue-dark transition-colors">
          <Download className="w-4 h-4" />
          <span className="text-sm">Download PDF</span>
        </button>
      </div>

      {/* Contact */}
      <div className="mb-6 p-3 bg-muted rounded text-sm">
        <div className="flex flex-wrap gap-4">
          <span>📧 heerchotaliya78@gmail.com</span>
          <span>📱 +91 7862899167</span>
          <span>🔗 linkedin.com/in/heerchotaliya</span>
          <span>🐙 github.com/heerr2005</span>
        </div>
      </div>

      {/* Summary */}
      <section className="mb-6">
        <h2 className="text-lg font-bold text-foreground mb-2 flex items-center gap-2">
          <span className="text-xl">👤</span> Professional Summary
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Detail-oriented and enthusiastic Computer Science undergraduate, aspiring Data Analyst with a strong 
          foundation in Python programming and hands-on experience through self-developed projects. Passionate 
          about leveraging analytical techniques to extract meaningful insights and support data-driven decision-making.
        </p>
      </section>

      {/* Experience */}
      <section className="mb-6">
        <h2 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-xp-blue" /> Experience
        </h2>
        <div className="space-y-4">
          <div className="border-l-2 border-xp-blue pl-4">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">Data Analyst</h3>
              <span className="text-xs bg-xp-green text-white px-2 py-0.5 rounded">Current</span>
            </div>
            <p className="text-sm text-primary">NOVITECH R&D PVT LTD</p>
            <p className="text-xs text-muted-foreground">Aug 2025 | Surat, Gujarat</p>
          </div>
          <div className="border-l-2 border-muted pl-4">
            <h3 className="font-semibold">Machine Learning & Data Science Intern</h3>
            <p className="text-sm text-primary">BRAINYBEAM TECHNOLOGIES PVT LTD</p>
            <p className="text-xs text-muted-foreground">Aug 2023 | Surat, India</p>
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="mb-6">
        <h2 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-xp-blue" /> Education
        </h2>
        <div className="space-y-4">
          <div className="border-l-2 border-xp-blue pl-4">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">B.Tech, Computer Engineering</h3>
              <span className="text-xs bg-xp-green text-white px-2 py-0.5 rounded">Current</span>
            </div>
            <p className="text-sm text-primary">Bhagwan Mahavir University</p>
            <p className="text-xs text-muted-foreground">Aug 2024 - Present | Surat, India</p>
          </div>
          <div className="border-l-2 border-muted pl-4">
            <h3 className="font-semibold">Diploma in Computer Engineering</h3>
            <p className="text-sm text-primary">N.G Patel Polytechnic</p>
            <p className="text-xs text-muted-foreground">2024 | Surat, India</p>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="mb-6">
        <h2 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
          <Code className="w-5 h-5 text-xp-blue" /> Technical Skills
        </h2>
        <div className="flex flex-wrap gap-2">
          {["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Scikit-learn", "SQL", "Excel", "Power BI", "Git/GitHub", "Jupyter", "VS Code"].map((skill) => (
            <span key={skill} className="px-3 py-1 bg-xp-blue/10 text-xp-blue-dark text-sm rounded">
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section>
        <h2 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
          <Award className="w-5 h-5 text-xp-blue" /> Certifications
        </h2>
        <div className="border-l-2 border-muted pl-4">
          <h3 className="font-semibold">Introduction to Cloud Computing</h3>
          <p className="text-sm text-primary">Simplilearn</p>
          <p className="text-xs text-muted-foreground">May 2024 | Online</p>
        </div>
      </section>
    </div>
  );
};
