import React from "react";
import { Link } from "react-router-dom";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";

const Footer = () => {
    const year = new Date().getFullYear();

    const footerLinks = {
        product: [
            { name: "Features", href: "#features" },
            { name: "Pricing", href: "#pricing" },
            { name: "Testimonials", href: "#testimonials" },
            { name: "FAQ", href: "#faq" },
        ],
        company: [
            { name: "About Us", href: "/about" },
            { name: "Careers", href: "/careers" },
            { name: "Blog", href: "/blog" },
            { name: "Contact", href: "/contact" },
        ],
        legal: [
            { name: "Privacy Policy", href: "/privacy" },
            { name: "Terms of Service", href: "/terms" },
            { name: "Cookie Policy", href: "/cookies" },
        ],
    };

    const socialLinks = [
        { name: "Github", icon: <Github className="h-5 w-5" />, href: "https://github.com" },
        { name: "Twitter", icon: <Twitter className="h-5 w-5" />, href: "https://twitter.com" },
        { name: "LinkedIn", icon: <Linkedin className="h-5 w-5" />, href: "https://linkedin.com" },
        { name: "Email", icon: <Mail className="h-5 w-5" />, href: "mailto:contact@aitalentmatch.com" },
    ];

    return (
        <footer className="bg-[#7B1E2B] border-t border-[#3B0E0E] text-white py-12 px-6 md:px-12">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                    <div className="lg:col-span-2">
                        <Link to="/" className="flex items-center space-x-2 text-xl font-bold text-black">
                            <span className="text-black">LEXX.IA</span>
                        </Link>
                        <p className="mt-4 text-white">
                            Revolutionizing Your Law procedure With LEXX.IA Review Analize Genert Leagel Docuemnts.
                        </p>
                        <div className="flex space-x-4 mt-6 text-white">
                            {socialLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="hover:text-[#A32B3E] transition-colors duration-300"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={link.name}
                                >
                                    {link.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-white">
                            Product
                        </h3>
                        <ul className="space-y-3">
                            {footerLinks.product.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="text-white hover:bg-[#3B0E0E] hover:px-2 hover:py-1 rounded transition-all duration-200"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-white">
                            Company
                        </h3>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.href}
                                        className="text-white hover:bg-[#3B0E0E] hover:px-2 hover:py-1 rounded transition-all duration-200"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-white">
                            Legal
                        </h3>
                        <ul className="space-y-3">
                            {footerLinks.legal.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.href}
                                        className="text-white hover:bg-[#3B0E0E] hover:px-2 hover:py-1 rounded transition-all duration-200"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="border-t border-[#3B0E0E] mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-white text-sm">
                    <p>&copy; {year} <span className="text-black">LEXX.IA  </span> All rights reserved.</p>
                    <p className="mt-4 md:mt-0">Designed with precision. Built with care.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
