import { Link } from "react-router-dom";
import { Share2, Globe, MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-surface-container-low w-full py-12 font-body mt-auto">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Brand & Socials */}
        <div className="space-y-6">
          <div className="text-2xl font-black text-primary">
            QuickFood
          </div>
          <p className="text-on-surface-variant max-w-sm">
            Bringing the world's most vibrant flavors directly to your doorstep
            with speed and style.
          </p>
          <div className="flex gap-4">
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-surface-container-lowest flex items-center justify-center text-primary-container hover:scale-110 transition-transform shadow-sm"
            >
              <Share2 className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-surface-container-lowest flex items-center justify-center text-primary-container hover:scale-110 transition-transform shadow-sm"
            >
              <Globe className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-surface-container-lowest flex items-center justify-center text-primary-container hover:scale-110 transition-transform shadow-sm"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-3">
            <Link
              to="#"
              className="font-headline text-xs uppercase tracking-widest text-on-surface-variant hover:text-primary hover:underline transition-colors"
            >
              About Us
            </Link>
            <Link
              to="#"
              className="font-headline text-xs uppercase tracking-widest text-on-surface-variant hover:text-primary hover:underline transition-colors"
            >
              Partner with Us
            </Link>
            <Link
              to="#"
              className="font-headline text-xs uppercase tracking-widest text-on-surface-variant hover:text-primary hover:underline transition-colors"
            >
              Privacy Policy
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            <Link
              to="#"
              className="font-headline text-xs uppercase tracking-widest text-on-surface-variant hover:text-primary hover:underline transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              to="#"
              className="font-headline text-xs uppercase tracking-widest text-on-surface-variant hover:text-primary hover:underline transition-colors"
            >
              Sustainability
            </Link>
            <Link
              to="#"
              className="font-headline text-xs uppercase tracking-widest text-on-surface-variant hover:text-primary hover:underline transition-colors"
            >
              Help Center
            </Link>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto px-8 mt-12 pt-8 border-t border-outline-variant/20">
        <div className="font-headline text-xs uppercase tracking-widest text-on-surface-variant">
          © {new Date().getFullYear()} QuickFood. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
