import React, { useState } from "react";

function Projects() {
  const [activeCategory, setActiveCategory] = useState("Residential");
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);

  // Dummy Data matching your design fields
  const allProjects = {
    Residential: [
      {
        id: 1,
        title: "02. Rangsit Guest House",
        description:
          "This project consisted of the design and construction of a building incorporating reinforced concrete structural works and complete MEP systems. The project was delivered with a focus on safety and quality control. The scope also included strict adherence to relevant codes and standards to ensure long-term performance and operational efficiency.",
        client: "Enzo Hein",
        location: "DEF block, Ward 5, 6/6, Pathum Thani, Lak Hok, 12000",
        date: "7 Jan 2019 to 8 May 2020",
        area: "100 square meters",
        image:
          "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      },
      {
        id: 2,
        title: "03. Modern Loft Villa",
        description:
          "A luxury villa utilizing steel structure works for a modern aesthetic. Features include open-plan living areas, sustainable energy systems, and premium finishing materials.",
        client: "Sarah Connor",
        location: "Sukhumvit Soi 24, Bangkok, Thailand",
        date: "12 Feb 2021 to 30 Nov 2021",
        area: "250 square meters",
        image:
          "https://images.unsplash.com/photo-1600596542815-2495db9dc2c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      },
    ],
    Commercial: [
      {
        id: 3,
        title: "04. City Center Mall",
        description:
          "Large scale commercial complex involving deep foundation earthworks and structural steel framing.",
        client: "Central Group",
        location: "Downtown Yangon",
        date: "March 2022 - Present",
        area: "5000 square meters",
        image:
          "https://images.unsplash.com/photo-1555636222-cae831e670b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      },
    ],
    Industrial: [
      {
        id: 4,
        title: "05. Logistics Warehouse",
        description:
          "High-capacity warehouse storage facility with automated systems layout.",
        client: "Global Logistics Co.",
        location: "Industrial Zone 1",
        date: "Jan 2023 - Dec 2023",
        area: "12000 square meters",
        image:
          "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      },
    ],
  };

  const projects = allProjects[activeCategory] || [];
  const currentProject = projects[currentProjectIndex];

  // Navigation Handlers
  const nextProject = () => {
    setCurrentProjectIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentProjectIndex(
      (prev) => (prev - 1 + projects.length) % projects.length
    );
  };

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setCurrentProjectIndex(0);
  };

  return (
    <div className="min-h-screen w-full bg-white">
      {/* 1. Header Section (Title + Tabs) */}
      <div className="mx-auto flex max-w-7xl flex-col items-center  justify-evenly  gap-3 px-6 py-12 lg:flex-row lg:px-8">
        <h1 className="text-2xl  font-medium text-slate-700 sm:text-3xl">
          Discover our Projects
        </h1>

        {/* Pill Tabs */}
        <div className="flex overflow-hidden rounded-full bg-[#1a455a] p-1">
          {["Residential", "Commercial", "Industrial"].map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`rounded-full px-6 py-2 text-sm font-medium transition-colors duration-300 ${
                activeCategory === cat
                  ? "bg-[#84cc16] text-[#1a455a]"
                  : "bg-transparent text-white hover:text-[#84cc16]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Blue Background Strip */}
      <div className="h-32 w-full bg-[#1a455a]"></div>

      {/* 3. Overlapping Content Card */}
      <div className="mx-auto -mt-24 max-w-[90rem] px-4 pb-20">
        <div className="relative min-h-[600px] rounded-t-[2.5rem] bg-white px-8 py-12 shadow-2xl sm:px-12 lg:px-16">
          {/* Main Navigation Arrows (Left/Right of the whole card content) */}
          <button
            onClick={prevProject}
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-lg border border-gray-200 p-2 text-gray-400 transition hover:bg-gray-50 hover:text-gray-900 lg:-left-6 lg:bg-white lg:shadow-lg"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={nextProject}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg border border-gray-200 p-2 text-gray-400 transition hover:bg-gray-50 hover:text-gray-900 lg:-right-6 lg:bg-white lg:shadow-lg"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {projects.length > 0 ? (
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
              {/* LEFT COLUMN: Text Info */}
              <div className="flex flex-col justify-center">
                <h2 className="mb-6 text-3xl font-medium text-slate-700">
                  {currentProject.title}
                </h2>

                <p className="mb-10 text-justify leading-relaxed text-slate-500">
                  {currentProject.description}
                </p>

                {/* 4-Grid Info Cards */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {/* Card 1: Client */}
                  <div className="flex flex-col items-center justify-center rounded-xl border border-gray-200 p-6 text-center transition hover:border-[#84cc16]">
                    <div className="mb-2 text-slate-700">
                      {/* User Icon */}
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                    <span className="text-xs font-medium text-slate-500">
                      {currentProject.client}
                    </span>
                  </div>

                  {/* Card 2: Location */}
                  <div className="flex flex-col items-center justify-center rounded-xl border border-gray-200 p-6 text-center transition hover:border-[#84cc16]">
                    <div className="mb-2 text-slate-700">
                      {/* Location Icon */}
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <span className="text-xs font-medium text-slate-500">
                      {currentProject.location}
                    </span>
                  </div>

                  {/* Card 3: Date */}
                  <div className="flex flex-col items-center justify-center rounded-xl border border-gray-200 p-6 text-center transition hover:border-[#84cc16]">
                    <div className="mb-2 text-slate-700">
                      {/* Calendar Icon */}
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <span className="text-xs font-medium text-slate-500">
                      {currentProject.date}
                    </span>
                  </div>

                  {/* Card 4: Area */}
                  <div className="flex flex-col items-center justify-center rounded-xl border border-gray-200 p-6 text-center transition hover:border-[#84cc16]">
                    <div className="mb-2 text-slate-700">
                      {/* House Icon */}
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                        />
                      </svg>
                    </div>
                    <span className="text-xs font-medium text-slate-500">
                      {currentProject.area}
                    </span>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: Image */}
              <div className="relative overflow-hidden rounded-2xl shadow-lg">
                <img
                  src={currentProject.image}
                  alt={currentProject.title}
                  className="h-full w-full object-cover min-h-[400px]"
                />

                {/* Internal Image Navigation (Decorative based on design) */}
                <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                  <button className="rounded bg-[#1a455a]/80 p-1 text-white hover:bg-[#1a455a]">
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <button className="rounded bg-[#1a455a]/80 p-1 text-white hover:bg-[#1a455a]">
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="py-20 text-center text-slate-500">
              No projects found in this category.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Projects;
