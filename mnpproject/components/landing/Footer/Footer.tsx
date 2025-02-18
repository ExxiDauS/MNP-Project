import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

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
            name: "Teerapat Tuanpomrat",
            socials: [
                { platform: "Facebook", url: "#", icon: Facebook },
                { platform: "Instagram", url: "#", icon: Instagram },
                { platform: "LinkedIn", url: "#", icon: Linkedin }
            ]
        }
    ];

    return (
        // Container
        <footer className="bg-custom-background-surface py-16 px-4">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">

                {/* Footer Contents */}
                {footerSections.map((section) => (
                    <div key={section.title} className="space-y-4">
                        <h2 className="text-white font-semibold relative mb-8">
                            {section.title}
                            <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-custom-purple-dark"></span>
                        </h2>
                        <ul className="space-y-2">
                            {section.links.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                    >
                                        <div className="text-custom-text-secondary hover:text-custom-text-primary hover:ml-4 transform transition-all duration-300 w-2/3">
                                            {link.label}
                                        </div>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}

                {/* Made by */}
                <div className="space-y-2 col-span-2">
                    <h2 className="text-white font-semibold relative mb-8">
                        Made with suffer by
                        <span className="absolute -bottom-2 left-0 w-20 h-0.5 bg-custom-purple-dark"></span>
                    </h2>
                    <div className="flex justify-between">
                        {creators.map((creator, index) => (
                            <div key={index} className="space-y-2">
                                <p className="text-sm text-custom-text-primary">{creator.name}</p>
                                <div className="flex space-x-3">
                                    {creator.socials.map((social, socialIndex) => (
                                        <a
                                            key={socialIndex}
                                            href={social.url}
                                            className="bg-custom-purple-deeper text-custom-text-primary p-1.5 rounded-full hover:bg-custom-purple-light hover:text-black transition-colors duration-200"
                                            aria-label={`${creator.name}'s ${social.platform}`}
                                        >
                                            <social.icon className="w-4 h-4" />
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