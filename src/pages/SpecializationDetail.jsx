import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const specializationData = {
  ai: {
    title: "AI / ML",
    description: "Master the latest in AI & ML with hands-on projects and tools.",
    topics: [
      { name: "Neural Networks", img: "https://source.unsplash.com/100x100/?neural" },
      { name: "Computer Vision", img: "https://source.unsplash.com/100x100/?vision" },
      { name: "Natural Language Processing", img: "https://source.unsplash.com/100x100/?nlp" },
      { name: "Reinforcement Learning", img: "https://source.unsplash.com/100x100/?reinforcement" }
    ]
  },
  ds: {
    title: "Data Science",
    description: "Get skilled in data analytics and engineering.",
    topics: [
      { name: "Python", img: "https://source.unsplash.com/100x100/?python" },
      { name: "Pandas", img: "https://source.unsplash.com/100x100/?pandas" },
      { name: "NumPy", img: "https://source.unsplash.com/100x100/?numpy" },
      { name: "Data Visualization", img: "https://source.unsplash.com/100x100/?dataviz" },
      { name: "Scikit-learn", img: "https://source.unsplash.com/100x100/?scikit" }
    ]
  },
  cyber: {
    title: "Cybersecurity",
    description: "Secure systems, test vulnerabilities, and build a security-first mindset.",
    topics: [
      { name: "Ethical Hacking", img: "https://source.unsplash.com/100x100/?hacking" },
      { name: "Firewalls", img: "https://source.unsplash.com/100x100/?firewall" },
      { name: "Cryptography", img: "https://source.unsplash.com/100x100/?crypto" },
      { name: "Penetration Testing", img: "https://source.unsplash.com/100x100/?pentesting" }
    ]
  },
  web: {
    title: "Web Development",
    description: "Front to back, build amazing apps.",
    topics: [
      { name: "HTML", img: "https://source.unsplash.com/100x100/?html" },
      { name: "CSS", img: "https://source.unsplash.com/100x100/?css" },
      { name: "JavaScript", img: "https://source.unsplash.com/100x100/?javascript" },
      { name: "React", img: "https://source.unsplash.com/100x100/?react" },
      { name: "Node.js", img: "https://source.unsplash.com/100x100/?nodejs" }
    ]
  }
};

const SpecializationDetail = () => {
  const { id } = useParams();
  const specialization = specializationData[id];

  useEffect(() => {
    if (specialization) {
      document.title = `${specialization.title} | Edusource Specialization`;
    } else {
      document.title = "Specialization Not Found | Edusource";
    }
  }, [id, specialization]);

  if (!specialization) {
    return <div className="p-6 text-center text-red-500 font-semibold">Specialization not found.</div>;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
      <Navbar />
      <div className="flex flex-col md:flex-row p-6 gap-6">
        {/* Sidebar */}
        <aside className="md:w-1/4 bg-blue-100 dark:bg-slate-800 p-4 rounded-xl shadow">
          <h3 className="text-lg font-bold mb-4">Other Specializations</h3>
          <ul className="space-y-2">
            {Object.entries(specializationData).map(([key, spec]) => (
              <li key={key}>
                <Link
                  to={`/specialization/${key}`}
                  className={`block px-3 py-2 rounded-md transition hover:bg-blue-200 dark:hover:bg-slate-700 ${
                    key === id ? "bg-blue-300 dark:bg-slate-600 font-semibold" : ""
                  }`}
                >
                  {spec.title}
                </Link>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 bg-white dark:bg-slate-800 rounded-xl shadow">
          <h1 className="text-4xl font-bold mb-4">{specialization.title}</h1>
          <p className="mb-6 text-lg">{specialization.description}</p>
          <h3 className="text-2xl font-semibold mb-4">Topics Covered:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {specialization.topics.map((topic, index) => (
              <div key={index} className="flex items-center gap-4 bg-blue-50 dark:bg-slate-700 p-4 rounded-lg shadow">
                <img src={topic.img} alt={topic.name} className="w-16 h-16 object-cover rounded" />
                <span className="text-lg font-medium">{topic.name}</span>
              </div>
            ))}
          </div>
          <Link
            to="/dashboard"
            className="mt-8 inline-block bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
          >
            ← Back to Dashboard
          </Link>
        </main>
      </div>
    </div>
  );
};

export default SpecializationDetail;