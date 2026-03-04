import React, { useState, useEffect } from "react";
import apiClient from "../services/api";

function Projects() {
  // 1. Set up our state variables
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. Fetch the data when the component loads
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        // This calls http://localhost:5001/api/projects under the hood
        const response = await apiClient.get("/projects");

        // Log exactly what the backend gives us to the console for debugging
        console.log("Data from backend:", response.data);

        // Safely extract the array, regardless of how the backend wrapped it
        let dataArray = [];
        if (Array.isArray(response.data)) {
          dataArray = response.data; // It's already an array
        } else if (response.data && Array.isArray(response.data.data)) {
          dataArray = response.data.data; // Wrapped in { data: [...] }
        } else if (response.data && Array.isArray(response.data.projects)) {
          dataArray = response.data.projects; // Wrapped in { projects: [...] }
        } else if (
          response.data &&
          Array.isArray(response.data.data?.projects)
        ) {
          dataArray = response.data.data.projects; // Wrapped deeper
        }

        // Save the guaranteed array to state
        setProjects(dataArray);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError("Failed to load projects. Make sure the backend is running!");
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // 3. Handle Loading and Error states
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl font-semibold animate-pulse text-slate-600">
          Loading projects...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-red-500 bg-red-50 p-6 rounded-lg shadow">
          {error}
        </div>
      </div>
    );
  }

  // 4. Render the actual UI
  return (
    <div className="container mx-auto px-4 py-16 max-w-7xl">
      <h1 className="text-4xl font-bold text-center mb-12 text-slate-800">
        Our Projects
      </h1>

      {/* Check if the database is empty */}
      {projects.length === 0 ? (
        <div className="text-center text-slate-500 py-20 bg-slate-50 rounded-lg border border-dashed border-slate-300">
          <p className="text-xl font-medium mb-2">No projects found.</p>
          <p>
            Your database is currently empty. Add some projects via the backend
            to see them here!
          </p>
        </div>
      ) : (
        /* Render the projects in a responsive grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              {/* Project Image Placeholder */}
              <div className="h-56 bg-slate-200 overflow-hidden">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400">
                    No Image Available
                  </div>
                )}
              </div>

              {/* Project Details */}
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-2 text-slate-800">
                  {project.title}
                </h2>
                <p className="text-slate-600 mb-6 line-clamp-3">
                  {project.description}
                </p>

                <div className="space-y-2 text-sm text-slate-500 bg-slate-50 p-4 rounded-lg">
                  <p>
                    <strong className="text-slate-700">Location:</strong>{" "}
                    {project.location || "N/A"}
                  </p>
                  <p>
                    <strong className="text-slate-700">Duration:</strong>{" "}
                    {project.duration || "N/A"}
                  </p>
                  <p>
                    <strong className="text-slate-700">Area:</strong>{" "}
                    {project.area || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Projects;
