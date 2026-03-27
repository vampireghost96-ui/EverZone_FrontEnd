import React, { useState } from "react";
import apiClient from "../services/api";
import { useTranslation } from "react-i18next";

function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const { t } = useTranslation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await apiClient.post("/contact-forms", formData);
      console.log("Success:", response.data);
      setStatus("success");
      setFormData({ name: "", email: "", phone: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err) {
      console.error("Error submitting form:", err);
      setStatus("error");
      setErrorMessage(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Dark Blue Header Background (Matches Services Page) */}
      <div className="bg-[#113243] pt-16 pb-32"></div>

      {/* Main Overlapping Card */}
      <div className="container mx-auto px-4 max-w-6xl -mt-24">
        <div className="bg-white rounded-[2.5rem] shadow-xl p-8 md:p-12 lg:p-16 border border-slate-100 flex flex-col gap-12 lg:gap-16">
          {/* Top Section: Split Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
            {/* Left Side: Contact Information */}
            <div className="flex flex-col justify-center">
              {/* Note: Update your common.json to "Keep in touch with us" if you want to match Figma exactly! */}
              <h1 className="text-4xl md:text-5xl font-semibold text-[#113243] mb-6">
                {t("contactUs.title")}
              </h1>
              <p className="text-slate-500 text-lg leading-relaxed mb-10">
                {t("contactUs.subtitle")}
              </p>

              {/* Contact Details List */}
              <div className="space-y-6 text-slate-600">
                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="mt-1 shrink-0 text-slate-400">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                      />
                    </svg>
                  </div>
                  <span className="text-base">
                    ABC Condo, Building 1, Floor 2, Room 2202
                  </span>
                </div>

                {/* Email */}
                <div className="flex items-center gap-4">
                  <div className="shrink-0 text-slate-400">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                      />
                    </svg>
                  </div>
                  <span className="text-base">everzone123@gmail.com</span>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-4">
                  <div className="shrink-0 text-slate-400">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.864-1.041l-3.286-.481c-.498-.073-.993.17-1.25.597l-1.598 2.66c-3.04-1.5-5.5-3.96-7-7l2.66-1.598c.427-.257.67-.752.597-1.25l-.481-3.286c-.075-.512-.525-.864-1.041-.864H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                      />
                    </svg>
                  </div>
                  <span className="text-base">
                    +959123455789, +959987654321
                  </span>
                </div>
              </div>
            </div>

            {/* Right Side: Contact Form */}
            <div>
              {/* Alerts */}
              {status === "success" && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-2xl flex items-center gap-3">
                  <span className="font-medium">
                    Thank you! Your message has been sent.
                  </span>
                </div>
              )}
              {status === "error" && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl flex items-center gap-3">
                  <span className="font-medium">{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-4 rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#7fc41b] focus:border-transparent text-slate-700 placeholder-slate-400 bg-white"
                  placeholder="Name"
                />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-4 rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#7fc41b] focus:border-transparent text-slate-700 placeholder-slate-400 bg-white"
                  placeholder="Email"
                />

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-6 py-4 rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#7fc41b] focus:border-transparent text-slate-700 placeholder-slate-400 bg-white"
                  placeholder="Phone"
                />

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full px-6 py-5 rounded-[2rem] border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#7fc41b] focus:border-transparent text-slate-700 placeholder-slate-400 bg-white resize-none"
                  placeholder="How can we help?"
                ></textarea>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className={`px-10 py-4 rounded-full font-semibold text-white transition-all w-fit ml-auto mt-2
                    ${
                      status === "submitting"
                        ? "bg-slate-400 cursor-not-allowed"
                        : "bg-[#113243] hover:bg-[#18445a] shadow-md"
                    }`}
                >
                  {status === "submitting" ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>

          {/* Bottom Section: Google Map */}
          <div className="w-full h-[400px] rounded-[2rem] overflow-hidden bg-slate-200 border border-slate-100">
            {/* I used a generic map embed centered on Rangsit for testing. You can replace this src with your company's actual Google Maps embed link! */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15488.761008064415!2d100.57500366052745!3d13.963489814408018!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e283ab0b95c37d%3A0x6b772b1464c1266!2sRangsit%20University!5e0!3m2!1sen!2sth!4v1690000000000!5m2!1sen!2sth"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
