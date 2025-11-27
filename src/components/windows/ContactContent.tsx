import { useState } from "react";
import { Mail, Phone, MapPin, Linkedin, Github, Send } from "lucide-react";

export const ContactContent = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Open mailto link
    const mailtoLink = `mailto:heerchotaliya78@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
    )}`;
    window.open(mailtoLink);
  };

  const contactInfo = [
    { icon: Phone, label: "Phone", value: "+91 7862899167", href: "tel:+917862899167" },
    { icon: Mail, label: "Email", value: "heerchotaliya78@gmail.com", href: "mailto:heerchotaliya78@gmail.com" },
    { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/heerchotaliya", href: "https://www.linkedin.com/in/heerchotaliya" },
    { icon: Github, label: "GitHub", value: "github.com/heerr2005", href: "https://github.com/heerr2005" },
    { icon: MapPin, label: "Location", value: "Surat, Gujarat-395009, India", href: null },
  ];

  return (
    <div className="p-6 max-h-[500px] overflow-auto">
      <h1 className="text-2xl font-bold text-foreground mb-2">Get In Touch</h1>
      <p className="text-sm text-muted-foreground mb-6">Let's connect and discuss data opportunities</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contact Info */}
        <div className="space-y-4">
          <h2 className="font-bold text-foreground">Contact Information</h2>
          
          {contactInfo.map((item) => (
            <div key={item.label} className="flex items-center gap-3 p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
              <div className="w-10 h-10 bg-xp-blue/10 rounded-lg flex items-center justify-center">
                <item.icon className="w-5 h-5 text-xp-blue" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{item.label}</p>
                {item.href ? (
                  <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-foreground hover:text-xp-blue transition-colors">
                    {item.value}
                  </a>
                ) : (
                  <p className="text-sm font-medium text-foreground">{item.value}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <div>
          <h2 className="font-bold text-foreground mb-4">Send a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="text-xs text-muted-foreground">Your Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full mt-1 px-3 py-2 bg-input border border-border rounded text-sm focus:outline-none focus:ring-2 focus:ring-xp-blue"
                required
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Your Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full mt-1 px-3 py-2 bg-input border border-border rounded text-sm focus:outline-none focus:ring-2 focus:ring-xp-blue"
                required
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Subject</label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full mt-1 px-3 py-2 bg-input border border-border rounded text-sm focus:outline-none focus:ring-2 focus:ring-xp-blue"
                required
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Message</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={4}
                className="w-full mt-1 px-3 py-2 bg-input border border-border rounded text-sm focus:outline-none focus:ring-2 focus:ring-xp-blue resize-none"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-xp-blue text-white rounded hover:bg-xp-blue-dark transition-colors"
            >
              <Send className="w-4 h-4" />
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Ready to collaborate */}
      <div className="mt-6 p-4 bg-gradient-to-r from-xp-blue to-xp-blue-light rounded-lg text-center">
        <h3 className="font-bold text-white mb-1">Ready to collaborate?</h3>
        <p className="text-sm text-white/80">I'm always interested in discussing data analysis projects and opportunities.</p>
      </div>
    </div>
  );
};
