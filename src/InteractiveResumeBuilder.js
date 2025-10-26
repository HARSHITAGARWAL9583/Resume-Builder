import React, { useState, useRef } from "react";

export default function BasicResumeBuilder() {
  const resumeRef = useRef();

  const [data, setData] = useState({
    name: "",
    location: "",
    email: "",
    phone: "",
    linkedin: "",
    github: "",
    gfg: "",
    education: "",
    experience: "",
    skills: "",
    projects: "",
    certifications: "",
    achievements: "",
  });

  const handleChange = (key, value) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const handleDownload = () => {
    const printContents = resumeRef.current.innerHTML;
    const printWindow = window.open("", "", "height=700,width=900");
    printWindow.document.write(
      `<!doctype html><html><head><title>My Resume</title><meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1" />` +
        // Minimal styles so printed resume looks clean even without Tailwind in the new window
        `
        <style>
          body{font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; padding:20px;}
          h2{font-size:22px;margin:0 0 8px 0}
          h3{font-size:16px;margin:14px 0 6px 0}
          p{margin:0 0 8px 0;white-space:pre-line}
          .section{margin-bottom:10px}
        </style>
      </head><body>`
    );
    printWindow.document.write(printContents);
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  const fields = Object.keys(data);

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
          Resume Builder
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left - Form */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-lg font-medium mb-4">Enter Your Details</h3>

            <div className="space-y-4">
              {fields.map((key) => {
                const isLarge = [
                  "education",
                  "experience",
                  "skills",
                  "projects",
                  "certifications",
                  "achievements",
                ].includes(key);

                const label = key
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (s) => s.toUpperCase());

                return (
                  <div key={key}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {label}
                    </label>
                    {isLarge ? (
                      <textarea
                        rows={4}
                        value={data[key]}
                        onChange={(e) => handleChange(key, e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                        placeholder={`Add your ${label.toLowerCase()}`}
                      />
                    ) : (
                      <input
                        type="text"
                        value={data[key]}
                        onChange={(e) => handleChange(key, e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                        placeholder={label}
                      />
                    )}
                  </div>
                );
              })}

              <div className="flex gap-3">
                <button
                  onClick={handleDownload}
                  className="inline-flex items-center justify-center rounded-lg bg-indigo-600 text-white px-4 py-2 text-sm font-medium shadow hover:bg-indigo-700 focus:outline-none"
                >
                  Download Resume
                </button>

                <button
                  onClick={() =>
                    setData({
                      name: "",
                      location: "",
                      email: "",
                      phone: "",
                      linkedin: "",
                      github: "",
                      gfg: "",
                      education: "",
                      experience: "",
                      skills: "",
                      projects: "",
                      certifications: "",
                      achievements: "",
                    })
                  }
                  className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50 focus:outline-none"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* Right - Preview */}
          <div className="bg-white rounded-2xl shadow p-6" ref={resumeRef}>
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                  {data.name || "Your Name"}
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  {data.location && `${data.location} `}
                  {data.location && (data.email || data.phone) ? "| " : ""}
                  {data.email && `${data.email} `}
                  {data.email && data.phone ? "| " : ""}
                  {data.phone}
                </p>

                <div className="text-sm text-gray-600 mt-3 space-y-1">
                  {data.linkedin && <div>LinkedIn: {data.linkedin}</div>}
                  {data.github && <div>GitHub: {data.github}</div>}
                  {data.gfg && <div>GFG: {data.gfg}</div>}
                </div>
              </div>

              <div className="hidden md:flex items-center">
                {/* <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-400">
                  Photo
                </div> */}
              </div>
            </div>

            <hr className="my-4" />

            <section className="section">
              <h3 className="text-sm font-semibold text-gray-800">Education</h3>
              <p className="text-sm text-gray-700 whitespace-pre-line">
                {data.education || "Add your education details"}
              </p>
            </section>

            <section className="section">
              <h3 className="text-sm font-semibold text-gray-800">Experience</h3>
              <p className="text-sm text-gray-700 whitespace-pre-line">
                {data.experience || "Add your experience details"}
              </p>
            </section>

            <section className="section">
              <h3 className="text-sm font-semibold text-gray-800">Technical Skills</h3>
              <p className="text-sm text-gray-700 whitespace-pre-line">
                {data.skills || "Add your skills"}
              </p>
            </section>

            <section className="section">
              <h3 className="text-sm font-semibold text-gray-800">Projects</h3>
              <p className="text-sm text-gray-700 whitespace-pre-line">
                {data.projects || "Add your project details"}
              </p>
            </section>

            <section className="section">
              <h3 className="text-sm font-semibold text-gray-800">Certifications</h3>
              <p className="text-sm text-gray-700 whitespace-pre-line">
                {data.certifications || "Add your certifications"}
              </p>
            </section>

            <section className="section">
              <h3 className="text-sm font-semibold text-gray-800">Achievements</h3>
              <p className="text-sm text-gray-700 whitespace-pre-line">
                {data.achievements || "Add your achievements"}
              </p>
            </section>

            <div className="mt-4 flex justify-end">
              
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-500 mt-4">Tip: Use new lines in textareas to separate bullets — preview shows them correctly.</p>
      </div>
    </div>
  );
}
