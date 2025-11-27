import { ExternalLink, Github, Calendar, CheckCircle } from "lucide-react";

export const ProjectsContent = () => {
  const projects = [
    {
      title: "Wine Quality Prediction",
      period: "Apr 2024 - May 2024",
      status: "Completed",
      description: "Built a Machine Learning Model using Supervised Learning Techniques to predict wine quality based on various chemical properties.",
      technologies: ["Python", "Pandas", "NumPy", "Scikit-learn", "Matplotlib", "Seaborn"],
      category: "Machine Learning • Predictive Analysis",
      github: "https://github.com/heerr2005",
      demo: "https://github.com/heerr2005",
    },
    {
      title: "Tic Tac Toe",
      period: "2024",
      status: "Completed",
      description: "A classic X-O game built with HTML, CSS, and JavaScript. Features include score tracking, undo moves, and a responsive neon-style UI. Simple, smooth, and fun - all logic and styling done from scratch.",
      technologies: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "Game Logic"],
      category: "Frontend Development • Game Development",
      github: "https://github.com/heerr2005",
      demo: "https://heerr2005.github.io/TicTacToe/",
    },
  ];

  return (
    <div className="p-6 max-h-[500px] overflow-auto">
      <h1 className="text-2xl font-bold text-foreground mb-2">My Projects</h1>
      <p className="text-sm text-muted-foreground mb-6">Featured projects showcasing data analysis and development skills</p>

      <div className="space-y-6">
        {projects.map((project) => (
          <div key={project.title} className="border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
            {/* Project Header */}
            <div className="bg-gradient-to-r from-xp-blue to-xp-blue-light p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">{project.title}</h3>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 text-xs bg-xp-green text-white px-2 py-1 rounded">
                    <CheckCircle className="w-3 h-3" />
                    {project.status}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 mt-1 text-white/80 text-xs">
                <Calendar className="w-3 h-3" />
                <span>{project.period}</span>
              </div>
            </div>

            {/* Project Body */}
            <div className="p-4 bg-card">
              <p className="text-sm text-muted-foreground mb-4">{project.description}</p>

              {/* Technologies */}
              <div className="mb-4">
                <h4 className="text-xs font-bold text-foreground mb-2">Tools & Technologies:</h4>
                <div className="flex flex-wrap gap-1">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="text-xs px-2 py-1 bg-xp-blue/10 text-xp-blue-dark rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{project.category}</span>
                <div className="flex gap-2">
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-3 py-1.5 bg-gray-800 text-white text-xs rounded hover:bg-gray-700 transition-colors"
                  >
                    <Github className="w-3 h-3" />
                    View Code
                  </a>
                  <a 
                    href={project.demo} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-3 py-1.5 bg-xp-blue text-white text-xs rounded hover:bg-xp-blue-dark transition-colors"
                  >
                    <ExternalLink className="w-3 h-3" />
                    Live Demo
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* GitHub CTA */}
      <div className="mt-6 p-4 bg-muted rounded-lg text-center">
        <h3 className="font-semibold text-foreground mb-2">Want to see more of my work?</h3>
        <p className="text-sm text-muted-foreground mb-3">Check out my GitHub for additional projects and contributions</p>
        <a 
          href="https://github.com/heerr2005" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors"
        >
          <Github className="w-4 h-4" />
          Visit My GitHub
        </a>
      </div>
    </div>
  );
};
