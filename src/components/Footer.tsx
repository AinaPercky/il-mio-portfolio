import React from 'react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-brand-dark py-8 text-center border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-gray-400">
        <p>© {currentYear} RAMANOARA Percky. Tous droits réservés.</p>
        <p className="mt-4 md:mt-0">
          Built with <span className="text-brand-orange">♥</span> & Lean Mindset
        </p>
      </div>
    </footer>
  );
};
