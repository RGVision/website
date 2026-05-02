"use client";

import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
  const phoneNumber = "919384870117";
  const message = "Hello! I'm interested in booking a luxury villa with VORA. Can you help me?";

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-8 right-8 z-[100] group">
      {/* Tooltip/Label */}
      <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-4 py-2 glass rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap border border-gold/20">
        <p className="text-xs text-gold font-medium tracking-widest uppercase">Chat with an Expert</p>
      </div>

      {/* Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center w-16 h-16 bg-[#25D366] rounded-full shadow-2xl shadow-[#25D366]/30 hover:shadow-[#25D366]/50 hover:-translate-y-1 transition-all duration-300"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp className="text-3xl text-white" />

        {/* Pulsing Effect */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
      </a>
    </div>
  );
}
