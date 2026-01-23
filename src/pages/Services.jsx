import React, { useState } from "react";

function Services() {
  // State to track which service is currently open (defaulting to null or 0)
  const [openIndex, setOpenIndex] = useState(0);

  // Data Array
  const services = [
    {
      id: 0,
      number: "01",
      title: "Road and Bridge Construction",
      description:
        "Road and bridge construction involves designing and building safe, durable transportation infrastructure that supports efficient travel and ensures longevity. It requires precise planning, quality materials, and adherence to engineering standards to withstand heavy loads.",
      image:
        "https://images.unsplash.com/photo-1545558014-8692077e9b5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Placeholder bridge image
    },
    {
      id: 1,
      number: "02",
      title: "Earth Works",
      description:
        "Comprehensive earthworks including excavation, land grading, and soil stabilization to prepare foundations for major construction projects.",
      image:
        "https://images.unsplash.com/photo-1588612502660-f6555b76d05f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      number: "03",
      title: "Building Construction",
      description:
        "End-to-end building construction services for residential, commercial, and industrial structures, focusing on safety, sustainability, and modern design.",
      image:
        "https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      number: "04",
      title: "Steel Structure Works",
      description:
        "Fabrication and erection of high-quality steel structures for warehouses, factories, and high-rise buildings, ensuring structural integrity.",
      image:
        "https://images.unsplash.com/photo-1535732759880-bbd5c7265e3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 4,
      number: "05",
      title: "Fit-Out and Construction Project Management",
      description:
        "Professional project management and interior fit-out services to deliver projects on time, within budget, and to the highest quality standards.",
      image:
        "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
  ];

  const toggleService = (index) => {
    // If clicking the already open one, close it (set to null), otherwise open the new one
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen w-full bg-slate-50">
      {/* 1. Header Section */}
      <div className="w-full bg-[#1a455a] px-6 pb-32 pt-16 text-center lg:px-16">
        <h1 className="text-3xl font-medium text-white sm:text-4xl">
          Services we provide
        </h1>
      </div>

      {/* 2. Overlapping List Container */}
      <div className="mx-auto -mt-20 max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
          {services.map((service, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={service.id}
                onClick={() => toggleService(index)}
                className={`cursor-pointer border-b border-gray-100 transition-all duration-300 ease-in-out ${
                  isOpen
                    ? "bg-gray-200/50 py-10"
                    : "bg-white py-8 hover:bg-gray-50"
                }`}
              >
                <div className="px-6 lg:px-12">
                  {/* Top Row: Number & Title */}
                  <div className="flex items-center">
                    {/* Number (Left) */}
                    <span className="w-12 text-sm font-serif text-slate-500 lg:w-24 lg:text-base">
                      {service.number}
                    </span>

                    {/* Title (Center) */}
                    <h2
                      className={`flex-1 text-center text-xl text-slate-700 lg:text-2xl ${
                        isOpen ? "font-medium" : "font-normal"
                      }`}
                    >
                      {service.title}
                    </h2>

                    {/* Spacer for balance (Right) */}
                    <span className="w-12 lg:w-24"></span>
                  </div>

                  {/* Expanded Content: Image & Description */}
                  {/* We use a max-height transition trick or simply conditional rendering for simplicity */}
                  {isOpen && (
                    <div className="mt-10 flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12 animate-fadeIn">
                      {/* Left: Image */}
                      <div className="w-full lg:w-1/2">
                        <div className="overflow-hidden rounded-lg shadow-md">
                          <img
                            src={service.image}
                            alt={service.title}
                            className="h-64 w-full object-cover transition-transform duration-500 hover:scale-105"
                          />
                        </div>
                      </div>

                      {/* Right: Description */}
                      <div className="w-full lg:w-1/2">
                        <p className="font-serif text-lg leading-relaxed text-slate-600 italic">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom spacing */}
      <div className="h-20"></div>
    </div>
  );
}

export default Services;
