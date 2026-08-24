import { AnimatePresence, motion } from 'motion/react';
import type { NavLink } from '../types/content';

interface MobileMenuProps {
  isOpen: boolean;
  links: ReadonlyArray<NavLink>;
  onNavigate: () => void;
}

export const MobileMenu = ({ isOpen, links, onNavigate }: MobileMenuProps) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        id="mobile-menu"
        className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
      >
        <div className="px-6 py-4 flex flex-col space-y-4">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={onNavigate}
              className="text-brand-dark hover:text-brand-main font-medium block py-2"
            >
              {link.label}
            </a>
          ))}
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);
