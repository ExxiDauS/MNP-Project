import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Github } from 'lucide-react';

interface FooterLink {
    label: string;
    href: string;
}

interface FooterSection {
    title: string;
    links: FooterLink[];
}

const Footer = () => {
    const footerSections: FooterSection[] = [
        {
            title: "Company",
            links: [
                { label: "About Us", href: "/about" },
                { label: "Our Services", href: "/services" },
                { label: "Privacy Policy", href: "/privacy" },
            ]
        },
        {
            title: "Get Help",
            links: [
                { label: "FAQ", href: "/faq" },
                { label: "Booking", href: "/booking" },
                { label: "Payment Options", href: "/payment" },
            ]
        },
    ];

    const creators = [
        {
            name: "Kawin Isaramala",
            socials: [
                { platform: "Facebook", url: "#", icon: Facebook },
                { platform: "Instagram", url: "#", icon: Instagram },
                { platform: "LinkedIn", url: "#", icon: Linkedin }
            ]
        },
        {
            name: "Kittipit Pinthawornrak",
            socials: [
                { platform: "Facebook", url: "#", icon: Facebook },
                { platform: "Instagram", url: "#", icon: Instagram },
                { platform: "LinkedIn", url: "#", icon: Linkedin }
            ]
        },
        {
            name: "Teerapat Tuanpromrat",
            socials: [
                { platform: "Facebook", url: "https://www.facebook.com/theerapat.tuanpromrat.2024/?locale=th_TH", icon: Facebook },
                { platform: "Instagram", url: "https://www.instagram.com/thr_pt/", icon: Instagram },
                { platform: "LinkedIn", url: "https://github.com/Danny2Forever", icon: Github }
            ]
        }
    ];

    return (
        <footer className="bg-custom-background-surface py-16 px-4">
            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center sm:text-left">
                {footerSections.map((section) => (
                    <div key={section.title} className="space-y-4">
                        <h2 className="text-white font-semibold relative mb-8">
                            {section.title}
                            <span className="absolute -bottom-2 left-1/2 sm:left-0 transform -translate-x-1/2 sm:translate-x-0 w-12 h-0.5 bg-custom-purple-dark"></span>
                        </h2>
                        <ul className="space-y-2">
                            {section.links.map((link) => (
                                <li key={link.label}>
                                    <a href={link.href}>
                                        <div className="text-custom-text-secondary hover:text-custom-text-primary hover:ml-4 transform transition-all duration-300 inline-block">
                                            {link.label}
                                        </div>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
                <div className="space-y-6 col-span-1 sm:col-span-2 md:col-span-2">
                    <h2 className="text-white font-semibold relative mb-8">
                        Made with suffer by
                        <span className="absolute -bottom-2 left-1/2 sm:left-0 transform -translate-x-1/2 sm:translate-x-0 w-20 h-0.5 bg-custom-purple-dark"></span>
                    </h2>
                    <div className="flex flex-wrap justify-center sm:justify-between gap-6">
                        {creators.map((creator, index) => (
                            <div key={index} className="text-center sm:text-left">
                                <p className="text-sm text-custom-text-primary font-semibold">{creator.name}</p>
                                <div className="flex justify-center sm:justify-start space-x-3 mt-2">
                                    {creator.socials.map((social, socialIndex) => (
                                        <a
                                            key={socialIndex}
                                            href={social.url}
                                            className="bg-custom-purple-deeper text-custom-text-primary p-2 rounded-full hover:bg-custom-purple-light hover:text-black transition-colors duration-200"
                                            aria-label={`${creator.name}'s ${social.platform}`}
                                        >
                                            <social.icon className="w-5 h-5" />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
