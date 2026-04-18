import React from 'react';

export default function TermsPage() {
  const sections = [
    {
      title: "1. Booking & Payment",
      content: "An advance payment is required to confirm all bookings. The remaining balance must be paid at the time of check-in unless otherwise agreed. All bookings are non-refundable."
    },
    {
      title: "2. Security Deposit",
      content: "A refundable security deposit is mandatory for all stays. The amount will be communicated at the time of booking and will be refunded after check-out, subject to property inspection and deduction of any applicable charges."
    },
    {
      title: "3. Check-in & Check-out",
      content: "Check-in time is 2:00 PM and check-out time is 11:00 AM. Early check-in or late check-out is subject to availability and may incur additional charges."
    },
    {
      title: "4. Identification Requirement",
      content: "All guests must present a valid government-issued photo ID (Aadhaar Card, Driving License, Passport, or Voter ID) at the time of check-in. Entry will not be permitted without valid identification."
    },
    {
      title: "5. Occupancy Policy",
      content: "Guests must adhere to the maximum occupancy specified at the time of booking. Additional guests will not be allowed without prior approval and applicable charges."
    },
    {
      title: "6. Visitor Policy",
      content: "Visitors are permitted only with prior approval. All visitors must vacate the premises by 8:00 PM. Overnight stays for visitors are strictly not allowed."
    },
    {
      title: "7. Noise & Music Policy",
      content: "Guests are required to maintain low noise levels after 9:00 PM. Loud music, parties, or disturbances are strictly prohibited during this time. DJ setups are not allowed unless explicitly approved in advance. Violations may result in immediate cancellation of stay without refund."
    },
    {
      title: "8. Swimming Pool Usage",
      content: "Swimming pool access is available from 2:00 PM to 9:00 PM. Guests use the pool at their own risk. Children must be supervised at all times. Glass items and food are not allowed near the pool. Any damage or contamination will incur cleaning charges."
    },
    {
      title: "9. Smoking & Alcohol Policy",
      content: "Smoking inside the villa is strictly prohibited. Designated outdoor areas may be used for smoking. Any stains, damages, or excessive mess caused due to smoking or alcohol consumption will be chargeable."
    },
    {
      title: "10. Damages & Liability",
      content: "Guests are responsible for maintaining the property in good condition. Any damage to furniture, appliances, or property will be charged at actual repair or replacement cost."
    },
    {
      title: "11. Cleanliness",
      content: "Guests are expected to maintain cleanliness within the property. Excessive mess or improper waste disposal may result in additional cleaning charges."
    },
    {
      title: "12. Prohibited Activities",
      content: "Illegal activities, including the use of drugs or narcotics, are strictly prohibited. Fireworks, bonfires, or any hazardous activities are not allowed without prior approval."
    },
    {
      title: "13. Power & Utilities",
      content: "Guests are requested to use electricity and water responsibly. Any misuse leading to damage or excessive consumption may be chargeable."
    },
    {
      title: "14. Cancellation & Modifications",
      content: "All bookings are non-refundable. Date changes are subject to availability and any price differences."
    },
    {
      title: "15. Force Majeure",
      content: "Vora Stays shall not be held responsible for any disruptions caused due to events beyond control, including natural disasters, weather conditions, government restrictions, or utility failures."
    },
    {
      title: "16. Personal Belongings",
      content: "Guests are responsible for their personal belongings. Vora Stays is not liable for any loss, theft, or damage."
    },
    {
      title: "17. Management Rights",
      content: "Vora Stays reserves the right to refuse entry, cancel bookings, or evict guests in case of rule violations. No refund will be provided in such cases."
    },
    {
      title: "18. Acceptance of Terms",
      content: "By confirming a booking, guests acknowledge and agree to abide by all the above terms and conditions."
    }
  ];

  return (
    <main className="min-h-screen bg-white pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20 animate-fadeInUp">
          <h4 className="text-saffron font-black uppercase tracking-[0.3em] text-[10px] mb-4">Vora Stays</h4>
          <h1 className="text-4xl md:text-5xl font-display text-navy mb-6">Terms & Conditions</h1>
          <p className="text-navy/60 text-sm max-w-2xl mx-auto leading-relaxed">
            Welcome to Vora Stays. By confirming your booking and staying at our property, you agree to comply with the following terms and conditions.
          </p>
          <div className="w-20 h-1 bg-saffron/20 mx-auto mt-10 rounded-full" />
        </div>

        {/* Content */}
        <div className="space-y-12 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
          {sections.map((section, index) => (
            <section key={index} className="group border-l-2 border-transparent hover:border-saffron/30 pl-8 transition-all duration-500">
              <h3 className="text-xl font-display text-navy mb-4 group-hover:text-saffron transition-colors">
                {section.title}
              </h3>
              <p className="text-navy/70 leading-loose text-[15px]">
                {section.content}
              </p>
            </section>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-24 pt-12 border-t border-navy/5 text-center animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
          <p className="text-navy font-display text-xl mb-2">VORA STAYS</p>
          <p className="text-navy/50 text-[10px] uppercase tracking-widest">Premium Villa Experiences with Comfort, Safety & Trust</p>
        </div>
      </div>
    </main>
  );
}
