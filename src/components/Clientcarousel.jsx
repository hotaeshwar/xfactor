import { useEffect, useRef, useState } from "react";

const clients = [
  { id: 1, name: "Amazon Construction", src: "/media/client/amazonconst-logo (1).png" },
  { id: 2, name: "Xfactor",             src: "/media/client/Copy of Copy of Logo Bigger.png" },
  { id: 4, name: "Logo Preview",        src: "/media/client/Logo Preview.png" },
  { id: 5, name: "Everlend CA",         src: "/media/client/everland.png" },
  { id: 6, name: "Nest4Pet",            src: "/media/client/nest4pet-logo.png" },
  { id: 7, name: "SVG Client",          src: "/media/client/SVG Logo-01.svg" },
];

function LogoTile({ name, src }) {
  return (
    <div className="logo-tile">
      <div className="logo-card">
        {src ? (
          <img src={src} alt={name} className="logo-img" />
        ) : (
          <span className="logo-text">{name}</span>
        )}
      </div>
    </div>
  );
}

export default function ClientCarousel() {
  const trackRef  = useRef(null);
  const posRef    = useRef(0);
  const rafRef    = useRef(null);
  const pauseRef  = useRef(false);
  const [entered, setEntered] = useState(false);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.12 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 60);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const speed = 0.6;
    const tick = () => {
      if (!pauseRef.current) {
        posRef.current += speed;
        const half = el.scrollWidth / 2;
        if (posRef.current >= half) posRef.current = 0;
        el.style.transform = `translateX(-${posRef.current}px)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  const doubled = [...clients, ...clients];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&display=swap');

        .cc-section {
          background: #f5f5f5;
          position: relative;
          overflow: hidden;
          padding: 0;
          font-family: 'DM Sans', sans-serif;
        }

        .cc-label-wrap {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.85s cubic-bezier(0.22,1,0.36,1),
                      transform 0.85s cubic-bezier(0.22,1,0.36,1);
        }
        .cc-label-wrap.in { opacity: 1; transform: translateY(0); }

        .cc-track-wrap {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.95s cubic-bezier(0.22,1,0.36,1) 0.18s,
                      transform 0.95s cubic-bezier(0.22,1,0.36,1) 0.18s;
        }
        .cc-track-wrap.in { opacity: 1; transform: translateY(0); }

        .cc-accent {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(0,0,0,0.08) 30%, rgba(0,0,0,0.08) 70%, transparent);
        }

        .cc-label-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 28px 24px 20px;
        }
        .cc-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: #1eaec8;
          box-shadow: 0 0 8px rgba(30,174,200,0.6);
          flex-shrink: 0;
        }
        .cc-label {
          font-size: 0.6rem;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(0,0,0,0.4);
        }

        .cc-marquee-outer {
          position: relative;
          overflow: hidden;
          padding: 16px 0 32px;
        }
        .cc-marquee-outer::before,
        .cc-marquee-outer::after {
          content: '';
          position: absolute; top: 0; bottom: 0;
          width: 120px;
          z-index: 2;
          pointer-events: none;
        }
        .cc-marquee-outer::before {
          left: 0;
          background: linear-gradient(to right, #f5f5f5, transparent);
        }
        .cc-marquee-outer::after {
          right: 0;
          background: linear-gradient(to left, #f5f5f5, transparent);
        }
        @media (max-width: 640px) {
          .cc-marquee-outer::before,
          .cc-marquee-outer::after { width: 60px; }
        }

        .cc-track {
          display: flex;
          align-items: center;
          gap: 0;
          width: max-content;
          will-change: transform;
        }

        .logo-tile {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8px 20px;
          cursor: default;
          min-width: 200px;
          min-height: 110px;
        }
        @media (max-width: 768px) {
          .logo-tile { padding: 8px 14px; min-width: 160px; min-height: 90px; }
        }
        @media (max-width: 480px) {
          .logo-tile { padding: 6px 10px; min-width: 130px; min-height: 80px; }
        }

        .logo-card {
          display: flex;
          align-items: center;
          justify-content: center;
          background: #ffffff;
          border-radius: 14px;
          padding: 18px 28px;
          width: 170px;
          height: 90px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.07), 0 1px 3px rgba(0,0,0,0.05);
          transition: box-shadow 0.3s ease, transform 0.3s ease;
        }
        @media (max-width: 768px) {
          .logo-card { width: 140px; height: 76px; padding: 14px 20px; }
        }
        @media (max-width: 480px) {
          .logo-card { width: 115px; height: 64px; padding: 10px 14px; border-radius: 10px; }
        }

        .logo-tile:hover .logo-card {
          box-shadow: 0 6px 24px rgba(30,174,200,0.15), 0 2px 8px rgba(0,0,0,0.06);
          transform: translateY(-2px);
        }

        .logo-img {
          height: 56px;
          width: auto;
          max-width: 140px;
          object-fit: contain;
          opacity: 1;
          transition: opacity 0.3s ease, transform 0.3s ease;
          filter: none;
        }
        @media (max-width: 768px) {
          .logo-img { height: 46px; max-width: 115px; }
        }
        @media (max-width: 480px) {
          .logo-img { height: 36px; max-width: 90px; }
        }

        .logo-tile:hover .logo-img {
          opacity: 1;
          transform: scale(1.05);
        }

        .logo-text {
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(0.75rem, 1.6vw, 0.9rem);
          font-weight: 500;
          letter-spacing: 0.08em;
          color: rgba(0,0,0,0.5);
          white-space: nowrap;
          transition: color 0.3s ease;
          text-transform: uppercase;
          user-select: none;
        }
        .logo-tile:hover .logo-text { color: #1eaec8; }

        .cc-bottom-accent {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(0,0,0,0.08) 30%, rgba(0,0,0,0.08) 70%, transparent);
        }
      `}</style>

      <section ref={sectionRef} className="cc-section" aria-label="Our Clients">
        <div className="cc-accent" />

        <div className={`cc-label-wrap ${entered && visible ? "in" : ""}`}>
          <div className="cc-label-row">
            <div className="cc-dot" />
            <span className="cc-label">Trusted Clients of Xfactor</span>
            <div className="cc-dot" />
          </div>
        </div>

        <div className={`cc-track-wrap ${entered && visible ? "in" : ""}`}>
          <div
            className="cc-marquee-outer"
            onMouseEnter={() => { pauseRef.current = true; }}
            onMouseLeave={() => { pauseRef.current = false; }}
          >
            <div ref={trackRef} className="cc-track">
              {doubled.map((client, i) => (
                <LogoTile key={`${client.id}-${i}`} name={client.name} src={client.src} />
              ))}
            </div>
          </div>
        </div>

        <div className="cc-bottom-accent" />
      </section>
    </>
  );
}