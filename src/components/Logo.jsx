/**
 * Logo — icon mark + wordmark.
 * Custom inline SVG: three connected nodes forming a triangle —
 * visually represents "Kepler" (a connection point/hub), matching the brand name.
 * Hover: nodes pulse + connecting lines glow — pure CSS transition.
 */
export default function Logo({ className = '', variant = 'light' }) {
  const isDark = variant === 'dark'
  return (
    <a href="#home" className={`group flex items-center gap-2.5 ${className}`}>
      <span
        className={`relative w-9 h-9 rounded-lg flex items-center justify-center
                   transition-transform duration-200 ease-out
                   group-hover:rotate-[8deg] group-hover:scale-105
                   ${isDark ? 'bg-forsythia' : 'bg-noir'}`}
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-out blur-md"
          style={{ background: 'radial-gradient(circle, #FFC801, transparent 70%)' }}
        />
        <svg
          viewBox="0 0 24 24"
          className="w-4 h-4 relative z-10"
          fill="none"
          stroke={isDark ? '#172B36' : '#F1F6F4'}
          strokeWidth="1.6"
          strokeLinecap="round"
        >
          {/* connecting lines */}
          <line x1="12" y1="5" x2="6" y2="17" className="transition-opacity duration-200 ease-out group-hover:opacity-100" />
          <line x1="12" y1="5" x2="18" y2="17" className="transition-opacity duration-200 ease-out group-hover:opacity-100" />
          <line x1="6" y1="17" x2="18" y2="17" className="transition-opacity duration-200 ease-out group-hover:opacity-100" />
          {/* nodes */}
          <circle cx="12" cy="5" r="2.1" fill={isDark ? '#172B36' : '#F1F6F4'} stroke="none" />
          <circle cx="6" cy="17" r="2.1" fill={isDark ? '#172B36' : '#F1F6F4'} stroke="none" />
          <circle cx="18" cy="17" r="2.1" fill={isDark ? '#172B36' : '#F1F6F4'} stroke="none" />
        </svg>
      </span>
      <span className={`text-xl font-bold font-mono ${isDark ? 'text-arctic' : 'text-noir'}`}>
        Kepler<span className="text-saffron">AI</span>
      </span>
    </a>
  )
}