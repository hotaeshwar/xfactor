import { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";

const links = [
  { label: "Home",        to: "/" },
  { label: "Services",    to: "/services" },
  { label: "Get In Touch", to: "/contact" },
];

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ01";
function useScramble(text) {
  const [display, setDisplay] = useState(text);
  const rafRef = useRef(null);

  const scramble = () => {
    let iteration = 0;
    const total = text.length * 3;
    cancelAnimationFrame(rafRef.current);

    const tick = () => {
      setDisplay(
        text
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < iteration / 3) return char;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );
      iteration++;
      if (iteration <= total) rafRef.current = requestAnimationFrame(tick);
    };
    tick();
  };

  const reset = () => {
    cancelAnimationFrame(rafRef.current);
    setDisplay(text);
  };

  return { display, scramble, reset };
}

function ScrambleLink({ label, to }) {
  const { display, scramble, reset } = useScramble(label.toUpperCase());

  return (
    <NavLink
      to={to}
      end={to === "/"}
      onMouseEnter={scramble}
      onMouseLeave={reset}
      className={({ isActive }) =>
        `scramble-link nav-dm flex items-center gap-[6px] px-4 py-2 text-[0.82rem] tracking-[0.08em] select-none
         ${isActive ? "active-link" : "inactive-link"}`
      }
      style={{ fontWeight: 700 }}
    >
      {({ isActive }) => (
        <>
          <span className="link-text">{display}</span>
          {isActive && <span className="active-dot" />}
        </>
      )}
    </NavLink>
  );
}

export default function Navbar() {
  const [open, setOpen]         = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location                = useLocation();

  useEffect(() => { setOpen(false); }, [location]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@400;500;700;800&display=swap');

        .nav-syne { font-family: 'Syne', sans-serif; }
        .nav-dm   { font-family: 'DM Sans', sans-serif; }

        .nav-root::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.035'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
          border-radius: inherit;
        }

        .scramble-link {
          position: relative;
          transition: color 0.15s ease;
        }

        .scramble-link::after {
          content: '';
          position: absolute;
          bottom: 2px;
          left: 16px;
          right: 16px;
          height: 1.5px;
          background: #1a1a1a;
          transform: scaleX(0);
          transform-origin: left center;
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: none;
        }
        .scramble-link:hover::after {
          transform: scaleX(1);
        }

        .active-link::after {
          transform: scaleX(1) !important;
        }

        .active-link .link-text   { color: #1a1a1a; }
        .inactive-link .link-text { color: #444444; }
        .scramble-link:hover .link-text { color: #1a1a1a; }

        .active-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #1a1a1a;
          display: inline-block;
          box-shadow: none;
          animation: dot-pulse 2s ease-in-out infinite;
          flex-shrink: 0;
        }
        @keyframes dot-pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.5; }
        }

        .ham-bar { background: #1a1a1a; }

        .nav-scrolled {
          box-shadow: 0 1px 0 rgba(0,0,0,0.08), 0 4px 32px rgba(0,0,0,0.08);
        }

        .mobile-link-item {
          position: relative;
          overflow: hidden;
        }
        .mobile-link-item::after {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 3px;
          background: #1a1a1a;
          border-radius: 0 2px 2px 0;
          transform: scaleY(0);
          transition: transform 0.25s cubic-bezier(0.16,1,0.3,1);
          box-shadow: none;
        }
        .mobile-link-item:hover::after,
        .mobile-link-active::after {
          transform: scaleY(1);
        }
      `}</style>

      <nav
        className={`
          nav-root sticky top-0 w-full z-50
          bg-white
          transition-all duration-300
          ${scrolled ? "nav-scrolled" : ""}
        `}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8" style={{ position: "relative", zIndex: 1 }}>
          <div className="flex items-center justify-between h-24 sm:h-[100px]">

            <NavLink to="/" className="flex items-center select-none shrink-0">
              <span
                className="nav-syne"
                style={{
                  fontSize: "1.75rem",
                  fontWeight: 800,
                  color: "#1a1a1a",
                  letterSpacing: "-0.02em",
                  lineHeight: 1,
                }}
              >
                X<span style={{ color: "#1a1a1a" }}>factor</span>
              </span>
            </NavLink>

            <ul className="hidden md:flex items-center gap-0 nav-dm">
              {links.map(({ label, to }) => (
                <li key={to}>
                  <ScrambleLink label={label} to={to} />
                </li>
              ))}
            </ul>

            <button
              onClick={() => setOpen(o => !o)}
              aria-label="Toggle menu"
              className="
                md:hidden relative w-10 h-10 rounded-xl
                flex flex-col items-center justify-center gap-[5px]
                bg-transparent border-none cursor-pointer
                focus:outline-none select-none
                transition-colors duration-200
                hover:bg-black/5
              "
            >
              <span className={`ham-bar block h-[2.5px] rounded-full transition-all duration-300 ease-[cubic-bezier(.16,1,.3,1)] ${open ? "w-[22px] translate-y-[7.5px] rotate-45 bg-[#1a1a1a]" : "w-[22px]"}`} />
              <span className={`ham-bar block h-[2.5px] rounded-full transition-all duration-300 ease-[cubic-bezier(.16,1,.3,1)] ${open ? "w-0 opacity-0" : "w-[16px] self-end mr-[2px]"}`} />
              <span className={`ham-bar block h-[2.5px] rounded-full transition-all duration-300 ease-[cubic-bezier(.16,1,.3,1)] ${open ? "w-[22px] -translate-y-[7.5px] -rotate-45 bg-[#1a1a1a]" : "w-[22px]"}`} />
            </button>

          </div>
        </div>

        <div
          className={`
            md:hidden overflow-hidden
            transition-all duration-400 ease-[cubic-bezier(.16,1,.3,1)]
            ${open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}
          `}
          style={{ position: "relative", zIndex: 1 }}
        >
          <div className="bg-white border-t border-black/10 px-5 pb-6 pt-3">
            <ul className="nav-dm flex flex-col gap-1">
              {links.map(({ label, to }, i) => (
                <li
                  key={to}
                  style={{ transitionDelay: open ? `${i * 55}ms` : "0ms" }}
                  className={`transition-all duration-300 ${open ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-3"}`}
                >
                  <NavLink
                    to={to}
                    end={to === "/"}
                    className={({ isActive }) =>
                      `mobile-link-item ${isActive ? "mobile-link-active" : ""} flex items-center justify-between px-4 py-3 rounded-xl text-[0.95rem]
                       transition-colors duration-200
                       ${isActive
                         ? "text-[#1a1a1a] bg-black/5"
                         : "text-[#444444] hover:bg-black/5 hover:text-[#1a1a1a]"
                       }`
                    }
                    style={{ fontWeight: 800 }}
                  >
                    {({ isActive }) => (
                      <>
                        <span>{label}</span>
                        {isActive && <span className="w-2 h-2 rounded-full bg-[#1a1a1a]" />}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}