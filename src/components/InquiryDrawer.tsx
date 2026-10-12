import React, { useState } from 'react';
import { X, CheckCircle2, Send } from 'lucide-react';

interface InquiryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedDiscipline?: string;
  initialTopic?: string;
  theme?: 'dark' | 'white';
}

export const InquiryDrawer: React.FC<InquiryDrawerProps> = ({
  isOpen,
  onClose,
  preselectedDiscipline = '',
  initialTopic = '',
  theme = 'dark'
}) => {
  const isWhite = theme === 'white';
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: initialTopic || preselectedDiscipline || 'Wedding Sangeet Production',
    location: 'Hyderabad',
    eventDate: '',
    notes: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div 
      className={`fixed inset-0 z-[150] flex justify-end backdrop-blur-md transition-opacity ${
        isWhite ? 'bg-stone-950/40' : 'bg-black/85'
      }`}
      onClick={onClose}
    >
      <div 
        className={`w-full max-w-xl h-full overflow-y-auto flex flex-col justify-between p-6 sm:p-10 shadow-2xl animate-in slide-in-from-right duration-300 ${
          isWhite 
            ? 'bg-[#FAF8F5] border-l border-stone-300 text-stone-900' 
            : 'bg-[#0c0c10] border-l border-white/10 text-white'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Bar */}
        <div className={`flex items-center justify-between pb-6 border-b ${
          isWhite ? 'border-stone-200' : 'border-white/10'
        }`}>
          <div className="space-y-1">
            <span className={`text-[11px] font-mono uppercase tracking-widest font-semibold ${
              isWhite ? 'text-amber-700' : 'text-amber-300'
            }`}>
              Direct Production Inquiries
            </span>
            <h3 className={`text-xl sm:text-2xl font-display font-bold uppercase tracking-tight ${
              isWhite ? 'text-stone-950' : 'text-white'
            }`}>
              Curate a Commission
            </h3>
          </div>

          <button
            onClick={onClose}
            aria-label="Close inquiry drawer"
            className={`p-2 rounded transition-colors cursor-pointer ${
              isWhite ? 'text-stone-500 hover:text-black hover:bg-stone-200/60' : 'text-stone-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="py-8 flex-1">
          {submitted ? (
            <div className={`p-8 rounded-none border text-center space-y-4 my-auto ${
              isWhite ? 'bg-amber-50/60 border-amber-300 text-stone-800' : 'bg-white/5 border-amber-300/30 text-white'
            }`}>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto border ${
                isWhite ? 'bg-amber-100 text-amber-700 border-amber-400' : 'bg-amber-400/20 text-amber-300 border-amber-300/30'
              }`}>
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className={`text-xl font-display font-bold uppercase ${
                isWhite ? 'text-stone-950' : 'text-white'
              }`}>
                Inquiry Transmitted
              </h4>
              <p className={`text-xs sm:text-sm leading-relaxed font-light ${
                isWhite ? 'text-stone-600' : 'text-stone-300'
              }`}>
                Thank you for reaching out to Nicy Joseph Dance & Fitness. 
                Our studio director in Jubilee Hills, Hyderabad will review your project scope and respond within 24 hours.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => {
                    setSubmitted(false);
                    onClose();
                  }}
                  className={`px-6 py-3 text-xs font-bold uppercase tracking-wider rounded-none transition-colors cursor-pointer ${
                    isWhite ? 'bg-stone-950 text-white hover:bg-amber-600' : 'bg-white text-black hover:bg-amber-300'
                  }`}
                >
                  Return to Archive
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Event Type / Discipline */}
              <div className="space-y-2">
                <label className={`text-xs font-mono uppercase tracking-wider ${
                  isWhite ? 'text-stone-700' : 'text-stone-300'
                }`}>
                  Commission Category
                </label>
                <select
                  value={formData.eventType}
                  onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                  className={`w-full px-4 py-3 rounded-none text-sm focus:outline-none transition-colors ${
                    isWhite 
                      ? 'bg-white border border-stone-300 text-stone-900 focus:border-amber-600' 
                      : 'bg-white/5 border border-white/10 text-white focus:border-amber-300'
                  }`}
                >
                  <option value="Directorial Commission & Reels" className={isWhite ? 'bg-white text-black' : 'bg-[#111116]'}>
                    Directorial Commission & Screen Choreo
                  </option>
                  <option value="Royal Palace Sangeet Direction" className={isWhite ? 'bg-white text-black' : 'bg-[#111116]'}>
                    Royal Sangeet & Palace Choreography
                  </option>
                  <option value="Contemporary & Commercial Choreography" className={isWhite ? 'bg-white text-black' : 'bg-[#111116]'}>
                    Contemporary Stage & Screen Choreography
                  </option>
                  <option value="Private Handstand & Inversion Coaching" className={isWhite ? 'bg-white text-black' : 'bg-[#111116]'}>
                    Handstand & Advanced Inversion Coaching
                  </option>
                  <option value="Festival & Masterclass Conducting" className={isWhite ? 'bg-white text-black' : 'bg-[#111116]'}>
                    Festival Garba / Institutional Masterclass
                  </option>
                  <option value="Studio Rental & Floor Rehearsal" className={isWhite ? 'bg-white text-black' : 'bg-[#111116]'}>
                    Jubilee Hills Studio Floor Booking
                  </option>
                </select>
              </div>

              {/* Name & Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className={`text-xs font-mono uppercase tracking-wider ${
                    isWhite ? 'text-stone-700' : 'text-stone-300'
                  }`}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Radhika Reddy"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full px-4 py-3 rounded-none text-sm focus:outline-none transition-colors ${
                      isWhite 
                        ? 'bg-white border border-stone-300 text-stone-900 placeholder:text-stone-400 focus:border-amber-600' 
                        : 'bg-white/5 border border-white/10 text-white placeholder:text-stone-500 focus:border-amber-300'
                    }`}
                  />
                </div>

                <div className="space-y-2">
                  <label className={`text-xs font-mono uppercase tracking-wider ${
                    isWhite ? 'text-stone-700' : 'text-stone-300'
                  }`}>
                    Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full px-4 py-3 rounded-none text-sm focus:outline-none transition-colors ${
                      isWhite 
                        ? 'bg-white border border-stone-300 text-stone-900 placeholder:text-stone-400 focus:border-amber-600' 
                        : 'bg-white/5 border border-white/10 text-white placeholder:text-stone-500 focus:border-amber-300'
                    }`}
                  />
                </div>
              </div>

              {/* Email & Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className={`text-xs font-mono uppercase tracking-wider ${
                    isWhite ? 'text-stone-700' : 'text-stone-300'
                  }`}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full px-4 py-3 rounded-none text-sm focus:outline-none transition-colors ${
                      isWhite 
                        ? 'bg-white border border-stone-300 text-stone-900 placeholder:text-stone-400 focus:border-amber-600' 
                        : 'bg-white/5 border border-white/10 text-white placeholder:text-stone-500 focus:border-amber-300'
                    }`}
                  />
                </div>

                <div className="space-y-2">
                  <label className={`text-xs font-mono uppercase tracking-wider ${
                    isWhite ? 'text-stone-700' : 'text-stone-300'
                  }`}>
                    Target Date / Window
                  </label>
                  <input
                    type="date"
                    value={formData.eventDate}
                    onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                    className={`w-full px-4 py-3 rounded-none text-sm focus:outline-none transition-colors ${
                      isWhite 
                        ? 'bg-white border border-stone-300 text-stone-900 focus:border-amber-600' 
                        : 'bg-white/5 border border-white/10 text-white focus:border-amber-300'
                    }`}
                  />
                </div>
              </div>

              {/* City / Venue */}
              <div className="space-y-2">
                <label className={`text-xs font-mono uppercase tracking-wider ${
                  isWhite ? 'text-stone-700' : 'text-stone-300'
                }`}>
                  Location / Destination
                </label>
                <input
                  type="text"
                  placeholder="e.g. Hyderabad (Taj Falaknuma / Jubilee Hills) or Oman"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className={`w-full px-4 py-3 rounded-none text-sm focus:outline-none transition-colors ${
                    isWhite 
                      ? 'bg-white border border-stone-300 text-stone-900 placeholder:text-stone-400 focus:border-amber-600' 
                      : 'bg-white/5 border border-white/10 text-white placeholder:text-stone-500 focus:border-amber-300'
                  }`}
                />
              </div>

              {/* Production Details */}
              <div className="space-y-2">
                <label className={`text-xs font-mono uppercase tracking-wider ${
                  isWhite ? 'text-stone-700' : 'text-stone-300'
                }`}>
                  Project Scope & Vision
                </label>
                <textarea
                  rows={3}
                  placeholder="Provide approximate number of performers, track preferences, or rehearsal timelines..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className={`w-full px-4 py-3 rounded-none text-sm focus:outline-none transition-colors ${
                    isWhite 
                      ? 'bg-white border border-stone-300 text-stone-900 placeholder:text-stone-400 focus:border-amber-600' 
                      : 'bg-white/5 border border-white/10 text-white placeholder:text-stone-500 focus:border-amber-300'
                  }`}
                />
              </div>

              <button
                type="submit"
                className={`w-full py-3.5 font-wide font-bold text-xs uppercase tracking-[0.2em] transition-all rounded-none flex items-center justify-center gap-2 shadow-xl cursor-pointer active:scale-[0.99] ${
                  isWhite
                    ? 'bg-stone-950 text-white hover:bg-stone-800'
                    : 'bg-white text-black hover:bg-amber-300'
                }`}
              >
                <span>Submit Production Inquiry</span>
                <Send className="w-3.5 h-3.5" />
              </button>

            </form>
          )}
        </div>

        {/* Footer Notes */}
        <div className={`pt-6 border-t text-[11px] font-mono space-y-1 ${
          isWhite ? 'border-stone-200 text-stone-500' : 'border-white/10 text-stone-400'
        }`}>
          <div>STUDIO: NICY JOSEPH DANCE & FITNESS · JUBILEE HILLS, HYDERABAD</div>
          <div>OFFICIAL CHANNELS: @NICYJOSEPHDANCEANDFITNESS · YOUTUBE: @NICYJOSEPH</div>
        </div>

      </div>
    </div>
  );
};
