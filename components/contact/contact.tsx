import React from 'react';
import LeftSection from './left-section';
import Navbar from '../layout/navbar';
import { FaInstagram, FaLinkedin } from 'react-icons/fa';

const ContactUs: React.FC = () => {
    return (
        <div className="flex items-center justify-center flex-col md:flex-row gap-8 p-8 mt-25 h-full">
            <Navbar />
            <LeftSection />
            <div className="w-full md:w-1/2 flex flex-col gap-6">
                <h3 className="text-2xl font-bold text-cream">
                    Feel free to contact us for any inquiries, and we will get back to you as soon as possible
                </h3>
                <a
                    href="https://www.instagram.com/californicanursery/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-5 rounded-xl border border-cream/20 hover:bg-white/10 transition-colors"
                >
                    <FaInstagram className="text-5xl text-pink-400" />
                    <div>
                        <p className="text-cream text-xl font-semibold">Instagram</p>
                        <p className="text-cream/60 text-sm">@californicanursery</p>
                    </div>
                </a>
                <a
                    href="https://www.linkedin.com/company/californica-nursery/posts/?feedView=all"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-5 rounded-xl border border-cream/20 hover:bg-white/10 transition-colors"
                >
                    <FaLinkedin className="text-5xl text-blue-400" />
                    <div>
                        <p className="text-cream text-xl font-semibold">LinkedIn</p>
                        <p className="text-cream/60 text-sm">Californica Nursery</p>
                    </div>
                </a>
            </div>
        </div>
    );
};

export default ContactUs;
