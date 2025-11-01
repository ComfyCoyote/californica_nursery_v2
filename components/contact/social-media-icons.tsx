import React from 'react';
import { FaInstagram, FaLinkedin } from 'react-icons/fa';

const SocialMediaIcons: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row gap-2 justify-start">
      <a 
        href="https://www.instagram.com/californicanursery/"
        target='_blank'
        rel="noopener noreferrer"
        className="text-pink-500 hover:text-pink-600 transition-colors"
      >
        <FaInstagram className="text-3xl" />
      </a>
      <a 
        href="https://www.linkedin.com/company/californica-nursery/posts/?feedView=all"
        target='_blank'
        rel="noopener noreferrer"
        className="text-blue-500 hover:text-blue-600 transition-colors"
      >
        <FaLinkedin className="text-3xl" />
      </a>
    </div>
  );
};

export default SocialMediaIcons;
