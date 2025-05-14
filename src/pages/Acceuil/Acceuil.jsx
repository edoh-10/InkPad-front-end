// HomePage.jsx
import React from "react";
import { FiChevronDown, FiEdit3, FiShare2, FiZap } from "react-icons/fi"; // Quelques icônes pour illustrer
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const HomePage = () => {
  // déclaration de location
  const location = useLocation();

  // states pour le formulaire de contact
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");

  // const API_BASE_URL = "http://localhost:5000/api";
  const API_BASE_URL = "https://inkpad.onrender.com/api";

  // usage de useEffect
  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name, 
          email,
          content,
        }),
      });

      if (!res.ok) {
        // console.log("erreur", res);
      }

      const data = res.json();
      // console.log("donnée envoiyé par le contact", data)
    } catch (error) {
      // console.log(error.message);
    }

    setName("");
    setEmail("");
    setContent("");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Section Héros */}
      {/* <section
        id="accueil"
        className="bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white mt-[6vh] py-20 md:py-32"
      >
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Bienvenue sur <span className="text-indigo-400">InkPad</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Votre nouvel espace pour capturer, organiser et partager vos idées
            sans effort.
          </p>
          <div className="space-x-4">
            <a
              href="#services"
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
            >
              Découvrir nos fonctionnalités
            </a>
            <a
              href="#contact"
              className="bg-transparent hover:bg-indigo-500 text-indigo-400 hover:text-white font-semibold py-3 px-8 border border-indigo-400 hover:border-transparent rounded-lg transition duration-300 ease-in-out"
            >
              Nous Contacter
            </a>
          </div>
          <div className="mt-16 animate-bounce">
            <a href="#a-propos" aria-label="Scroll down">
              <FiChevronDown
                size={40}
                className="mx-auto text-gray-400 hover:text-indigo-400"
              />
            </a>
          </div>
        </div>
      </section> */}

          <section
      id="accueil"
      // Responsive background gradient and text color
      // Vertical padding adjusts for different screen sizes (py-20 for small, md:py-32 for medium and up)
      // mt-[6vh] provides a top margin based on viewport height
      className="bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white mt-[6vh] py-20 md:py-32"
    >
      <div className="container mx-auto px-6 text-center">
        {/* Headline text: font size increases on medium screens and up */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Bienvenue sur <span className="text-indigo-400">InkPad</span>
        </h1>
        {/* Sub-headline text: font size increases on medium screens and up, max-width for readability */}
        <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-xl lg:max-w-2xl mx-auto">
          Votre nouvel espace pour capturer, organiser et partager vos idées
          sans effort.
        </p>
        {/* Button container:
            - Uses flexbox for layout.
            - Stacks buttons vertically on small screens (flex-col, space-y-4).
            - Arranges buttons horizontally on medium screens and up (sm:flex-row, sm:space-y-0, sm:space-x-4).
            - Centers buttons within the container.
        */}
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <a
            href="#services"
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 w-full sm:w-auto text-base md:text-lg"
          >
            Découvrir nos fonctionnalités
          </a>
          <a
            href="#contact"
            className="bg-transparent hover:bg-indigo-500 text-indigo-400 hover:text-white font-semibold py-3 px-8 border border-indigo-400 hover:border-transparent rounded-lg transition duration-300 ease-in-out w-full sm:w-auto text-base md:text-lg"
          >
            Nous Contacter
          </a>
        </div>
        {/* Scroll down indicator:
            - Margin top for spacing.
            - Bouncing animation for attention.
            - ChevronDown icon from lucide-react.
        */}
        <div className="mt-16 md:mt-24 animate-bounce">
          <a href="#a-propos" aria-label="Scroll down">
            <FiChevronDown // Using ChevronDown from lucide-react
              size={40} // Icon size
              className="mx-auto text-gray-400 hover:text-indigo-400 transition-colors duration-300"
            />
          </a>
        </div>
      </div>
    </section>

      {/* Section À Propos */}
      <section id="a-propos" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            Qu'est-ce que <span className="text-indigo-600">InkPad</span> ?
          </h2>
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="md:w-1/2">
              {/* Vous pouvez remplacer ceci par une image ou une illustration */}
              <img
                src="https://placehold.co/600x400/7e5bef/white?text=Illustration+InkPad&font=raleway"
                alt="Illustration du concept InkPad"
                className="rounded-lg shadow-xl object-cover w-full h-auto"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://placehold.co/600x400/cccccc/333333?text=Image+Indisponible";
                }}
              />
            </div>
            <div className="md:w-1/2 text-gray-700 text-lg leading-relaxed">
              <p className="mb-4">
                InkPad est conçu pour être votre compagnon numérique intuitif.
                Que vous soyez un étudiant, un professionnel ou un créatif,
                InkPad vous offre les outils nécessaires pour structurer vos
                pensées, gérer vos projets et collaborer efficacement.
              </p>
              <p className="mb-4">
                Notre mission est de simplifier la prise de notes et la gestion
                de l'information, afin que vous puissiez vous concentrer sur ce
                qui compte vraiment : donner vie à vos idées.
              </p>
              <ul className="list-disc list-inside space-y-2 text-indigo-700">
                <li>
                  <span className="text-gray-700">
                    Interface épurée et facile à utiliser.
                  </span>
                </li>
                <li>
                  <span className="text-gray-700">
                    Synchronisation multi-plateformes (bientôt !).
                  </span>
                </li>
                <li>
                  <span className="text-gray-700">
                    Fonctionnalités de partage avancées (bientôt !).
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section Services/Fonctionnalités */}
      <section id="services" className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-16">
            Fonctionnalités Clés
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center">
            <div className="p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <FiEdit3 size={48} className="mx-auto text-indigo-500 mb-6" />
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                Édition Facile
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Un éditeur riche et intuitif pour formater vos notes comme vous
                le souhaitez.
              </p>
            </div>
            <div className="p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <FiShare2 size={48} className="mx-auto text-indigo-500 mb-6" />
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                Partage Simplifié
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Partagez vos notes avec vos collègues ou amis en quelques clics.
              </p>
            </div>
            <div className="p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <FiZap size={48} className="mx-auto text-indigo-500 mb-6" />
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                Accès Rapide
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Retrouvez vos informations importantes rapidement grâce à une
                organisation intelligente.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Contact */}
      <section id="contact" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            Contactez-Nous
          </h2>
          <div className="max-w-2xl mx-auto bg-gray-50 p-8 md:p-12 rounded-xl shadow-xl">
            <form onSubmit={handleSubmit}>
              {" "}
              {/* Remplacez par votre endpoint de formulaire */}
              <div className="mb-6">
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Nom complet
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                  placeholder="Votre nom"
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Adresse e-mail
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                  placeholder="vous@exemple.com"
                  required
                />
              </div>
              <div className="mb-8">
                <label
                  htmlFor="message"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows="10"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                  placeholder="Votre message..."
                  required
                ></textarea>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-10 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Envoyer le Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
