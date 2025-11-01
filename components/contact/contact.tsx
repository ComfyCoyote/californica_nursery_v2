'use client'

import React, { useState } from 'react';
import LeftSection from './left-section';
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';
import Navbar from '../layout/navbar';

const ContactUs: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
        recaptchaValue: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleRecaptchaChange = (token: string | null) => {
        if(token){
        setFormData(prev => ({
            ...prev,
            recaptchaValue: token
        }));
    }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await axios.post('/api/contact', {
                ...formData
            });

            if (response.data.success) {


                setFormData({
                    name: '',
                    email: '',
                    message: '',
                    recaptchaValue: ''
                });
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
     
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col md:flex-row gap-8 p-8 mt-25">
            <Navbar/>
            <LeftSection />
            <div className="w-full md:w-1/2">
                <h1 className="text-4xl font-bold mb-8 text-cream">Contact Us</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-lg font-medium mb-2 text-cream">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your name"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-lg font-medium mb-2 text-cream">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Your email"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-lg font-medium mb-2 text-cream">Message</label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Your message"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500 min-h-[150px]"
                            required
                        />
                    </div>
                    <div>
                        <ReCAPTCHA
                            sitekey="your-site-key"
                            onChange={handleRecaptchaChange}
                            className="mb-4"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isSubmitting || !formData.recaptchaValue}
                        className="w-full py-3 bg-lime-500 text-white font-bold rounded-lg hover:bg-lime-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ContactUs;
