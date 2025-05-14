

// Footer.jsx
import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'; // Exemple d'icônes sociales

const Footer = () => {
  // Obtient l'année en cours dynamiquement
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-6 text-center">
        {/* Icônes de réseaux sociaux */}
        <div className="flex justify-center space-x-6 mb-4">
          <a 
            href="https://github.com" // Remplacez par votre lien GitHub réel
            target="_blank" // Ouvre le lien dans un nouvel onglet
            rel="noopener noreferrer" // Pour des raisons de sécurité et de SEO
            aria-label="GitHub" // Pour l'accessibilité
            className="hover:text-gray-400 transition duration-150"
          >
            <FaGithub size={24} />
          </a>
          <a 
            href="https://linkedin.com" // Remplacez par votre lien LinkedIn réel
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="LinkedIn"
            className="hover:text-gray-400 transition duration-150"
          >
            <FaLinkedin size={24} />
          </a>
          <a 
            href="https://twitter.com" // Remplacez par votre lien Twitter réel
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="Twitter"
            className="hover:text-gray-400 transition duration-150"
          >
            <FaTwitter size={24} />
          </a>
        </div>
        {/* Message de copyright */}
        <p className="text-sm text-gray-400">
          &copy; {currentYear} InkPad. Tous droits réservés.
        </p>
        {/* Petit message de crédit (optionnel) */}
        <p className="text-xs text-gray-500 mt-2">
          Conçu avec React & Tailwind CSS.
        </p>
        <p className="text-xs text-gray-500 mt-2">
         Jérémie edoh
        </p>
      </div>
    </footer>
  );
};

export default Footer;
