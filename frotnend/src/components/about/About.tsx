import React from "react";
import Header from "@/components/layout/Header";

interface AboutProps {
  isSignInOpen: boolean;
  setIsSignInOpen: (open: boolean) => void;
}

const About: React.FC<AboutProps> = ({ isSignInOpen, setIsSignInOpen }) => {
  return (
    <div className="min-h-screen bg-[#A62538] text-white">
      <Header isSignInOpen={isSignInOpen} setIsSignInOpen={setIsSignInOpen} />

      <div className="px-6 py-16 space-y-24 max-w-5xl mx-auto">
        {/* Mission Section */}
        <section className="text-center">
          <h1 className="text-5xl font-bold mb-6">
            <span className="text-white">Our </span>
            <span className="text-[#FB3956]">Mission</span>
          </h1>
          <p className="text-lg text-gray-100 leading-relaxed max-w-3xl mx-auto">
            We are committed to turning complexity into clarity. Our mission is
            to empower businesses and individuals with AI-driven solutions that
            make legal, hiring, and operational decisions faster, smarter, and
            more reliable — ensuring that every choice you make is backed by
            precision and insight.
          </p>
        </section>

        {/* Team Section */}
        <section>
          <h2 className="text-3xl font-semibold text-center text-[#FB3956] mb-10">
            Meet the Team
          </h2>
          <div className="grid gap-8 md:grid-cols-2 text-center">
            <div className="bg-black p-6 rounded-xl shadow-lg hover:shadow-[#FB3956]/40 transition">
              <h3 className="text-xl font-semibold text-[#FB3956]">
                Met Shehu
              </h3>
              <p className="text-sm text-gray-300 mt-2">
                Co-Founder & CTO — leading innovation with deep expertise in AI
                engineering, creating the core technology behind our platform.
              </p>
            </div>
            <div className="bg-black p-6 rounded-xl shadow-lg hover:shadow-[#FB3956]/40 transition">
              <h3 className="text-xl font-semibold text-[#FB3956]">
               Qerim Qerimi 
              </h3>
              <p className="text-sm text-gray-300 mt-2">
                Co-Founder & Head of Product — shaping vision, strategy, and the
                user experience to deliver unmatched value to our clients.
              </p>
            </div>
          </div>
        </section>

        {/* Careers Section */}
        <section>
          <h2 className="text-3xl font-semibold text-center text-[#FB3956] mb-6">
            Careers
          </h2>
          <p className="text-center text-gray-100 max-w-3xl mx-auto mb-10">
            Join our mission to redefine how people and businesses interact with
            technology. We’re looking for innovators, problem-solvers, and
            creative thinkers to help us shape the future.
          </p>
          <div className="text-center">
            <a
              href="/careers"
              className="bg-[#FB3956] hover:bg-[#d82e47] text-white px-6 py-3 rounded-lg font-medium transition"
            >
              View Open Positions
            </a>
          </div>
        </section>

        {/* Contact Us Section */}
        <section>
          <h2 className="text-3xl font-semibold text-center text-[#FB3956] mb-10">
            Contact Us
          </h2>
          <div className="grid md:grid-cols-2 gap-10">
            {/* Left: Info Text */}
            <div className="space-y-4 text-gray-100">
              <p>
                We would love to hear from you! Please fill out the form and the
                nearest person from our team will contact you.
              </p>
              <p>
                For support, reach out to{" "}
                <a
                  href="mailto:contact@talentmatch.ai"
                  className="underline text-[#FB3956]"
                >
                  contact@talentmatch.ai
                </a>
                .
              </p>
              <p className="text-white font-medium mt-4">
                Let's reinvent the future.
              </p>
            </div>

            {/* Right: Contact Form */}
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First Name"
                className="bg-transparent border-b border-gray-300 py-2 px-1 text-white placeholder-gray-200"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="bg-transparent border-b border-gray-300 py-2 px-1 text-white placeholder-gray-200"
              />
              <select className="bg-transparent border-b border-gray-300 py-2 px-1 text-white">
                <option value="">Job Title</option>
                <option>Developer</option>
                <option>HR Manager</option>
                <option>CEO</option>
              </select>
              <input
                type="email"
                placeholder="Work Email"
                className="bg-transparent border-b border-gray-300 py-2 px-1 text-white placeholder-gray-200"
              />
              <input
                type="text"
                placeholder="Company Name"
                className="bg-transparent border-b border-gray-300 py-2 px-1 text-white placeholder-gray-200"
              />
              <select className="bg-transparent border-b border-gray-300 py-2 px-1 text-white">
                <option value="">Industry</option>
                <option>Tech</option>
                <option>Recruitment</option>
                <option>Other</option>
              </select>
              <select className="col-span-2 bg-transparent border-b border-gray-300 py-2 px-1 text-white">
                <option value="">Country</option>
                <option>Germany</option>
                <option>Kosovo</option>
                <option>USA</option>
              </select>
              <select className="col-span-2 bg-transparent border-b border-gray-300 py-2 px-1 text-white">
                <option value="">How can we help?</option>
                <option>General Inquiry</option>
                <option>Support</option>
                <option>Partnership</option>
              </select>
              <textarea
                rows={4}
                placeholder="Share your comments (Optional)"
                className="col-span-2 bg-transparent border-b border-gray-300 py-2 px-1 text-white placeholder-gray-200"
              />
              <button
                type="submit"
                className="col-span-2 bg-[#FB3956] hover:bg-[#d82e47] text-white py-2 rounded mt-4 transition"
              >
                Submit
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
