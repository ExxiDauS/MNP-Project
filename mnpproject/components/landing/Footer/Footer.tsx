import React from 'react';
import { Facebook, Instagram, Github } from 'lucide-react';

interface FooterLink {
    label: string;
    href: string;
}

interface FooterSection {
    title: string;
    links: FooterLink[];
}

const Footer = () => {

    const creators = [
        {
            name: "Kawin Isaramala",
            socials: [
                { platform: "Facebook", url: "https://www.facebook.com/kawin.tn", icon: Facebook },
                { platform: "Instagram", url: "https://www.instagram.com/kwnxp.n/?hl=en", icon: Instagram },
                { platform: "Github", url: "https://github.com/KwnxpN", icon: Github }
            ]
        },
        {
            name: "Kittipit Pinthawornrak",
            socials: [
                { platform: "Facebook", url: "https://www.facebook.com/kittipit.pinthawornrak", icon: Facebook },
                { platform: "Instagram", url: "https://www.instagram.com/kp_ptwr/?hl=en", icon: Instagram },
                { platform: "Github", url: "https://github.com/ExxiDauS", icon: Github }
            ]
        },
        {
            name: "Teerapat Tuanpromrat",
            socials: [
                { platform: "Facebook", url: "https://www.facebook.com/theerapat.tuanpromrat.2024/?locale=th_TH", icon: Facebook },
                { platform: "Instagram", url: "https://www.instagram.com/thr_pt/", icon: Instagram },
                { platform: "Github", url: "https://github.com/Danny2Forever", icon: Github }
            ]
        }
    ];

    return (
        <footer className="bg-custom-background-surface py-16 px-4">
            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center sm:text-left">
                <div className="space-y-6 col-span-1 sm:col-span-2 md:col-span-2">
                    <h2 className="text-white font-semibold relative mb-8">
                        สร้างด้วยความทรมาน
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
