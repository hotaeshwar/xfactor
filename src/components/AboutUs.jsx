import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, PhoneCall } from "lucide-react";

const stats = [
  { end: 150, suffix: "+",  label: "Brands Grown" },
  { end: 98,  suffix: "%",  label: "Client Retention" },
  { end: 3,   suffix: "×",  label: "Avg. ROI Delivered" },
  { end: 5,   suffix: "YR", label: "In The Game" },
];

export default function AboutUs() {
  const [visibleHeader, setVisibleHeader] = useState(false);
  const [visibleLeft,   setVisibleLeft]   = useState(false);
  const [visibleRight,  setVisibleRight]  = useState(false);
  const [visibleBottom, setVisibleBottom] = useState(false);
  const [visibleStats,  setVisibleStats]  = useState(false);
  const [counts, setCounts] = useState(stats.map(() => 0));

  const headerRef = useRef(null);
  const leftRef   = useRef(null);
  const rightRef  = useRef(null);
  const bottomRef = useRef(null);
  const statsRef  = useRef(null);

  useEffect(() => {
    const pairs = [
      [headerRef, setVisibleHeader],
      [leftRef,   setVisibleLeft],
      [rightRef,  setVisibleRight],
      [bottomRef, setVisibleBottom],
      [statsRef,  setVisibleStats],
    ];
    const obs = pairs.map(([ref, setter]) => {
      const o = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setter(true); },
        { threshold: 0.15 }
      );
      if (ref.current) o.observe(ref.current);
      return o;
    });
    return () => obs.forEach(o => o.disconnect());
  }, []);

  useEffect(() => {
    if (!visibleStats) return;
    setCounts(stats.map(() => 0));
    const duration = 1800;
    const startTime = performance.now();
    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCounts(stats.map(s => Math.floor(ease * s.end)));
      if (progress < 1) requestAnimationFrame(tick);
      else setCounts(stats.map(s => s.end));
    };
    requestAnimationFrame(tick);
  }, [visibleStats]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;700&display=swap');

        .ab-section {
          background: #fafaf8;
          font-family: 'DM Sans', sans-serif;
          position: relative;
          overflow: hidden;
        }
        .ab-glow {
          position: absolute;
          width: 500px; height: 500px; border-radius: 50%;
          background: radial-gradient(circle, rgba(37,135,168,0.05) 0%, transparent 70%);
          top: -100px; right: -150px;
          pointer-events: none; z-index: 0;
        }
        .ab-glow2 {
          position: absolute;
          width: 400px; height: 400px; border-radius: 50%;
          background: radial-gradient(circle, rgba(37,135,168,0.04) 0%, transparent 70%);
          bottom: -80px; left: -100px;
          pointer-events: none; z-index: 0;
        }
        .ab-inner {
          position: relative; z-index: 1;
          max-width: 1280px; margin: 0 auto;
          padding: clamp(64px,8vw,100px) clamp(24px,5vw,80px);
        }

        /* ── Staggered reveal system ── */
        .ab-reveal {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 1s cubic-bezier(0.22,1,0.36,1),
                      transform 1s cubic-bezier(0.22,1,0.36,1);
        }
        .ab-reveal.from-left  { transform: translateX(-40px); }
        .ab-reveal.from-right { transform: translateX(40px); }
        .ab-reveal.from-bottom { transform: translateY(50px); }
        .ab-reveal.in { opacity: 1 !important; transform: translate(0,0) !important; }

        /* Individual stagger delays */
        .ab-reveal.d1 { transition-delay: 0.1s; }
        .ab-reveal.d2 { transition-delay: 0.2s; }
        .ab-reveal.d3 { transition-delay: 0.3s; }
        .ab-reveal.d4 { transition-delay: 0.42s; }
        .ab-reveal.d5 { transition-delay: 0.56s; }

        .ab-eyebrow {
          display: flex; align-items: center; gap: 10px;
          font-size: 0.7rem; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase; color: #2587a8;
          margin-bottom: 20px;
        }
        .ab-eyebrow-dot {
          width: 5px; height: 5px; border-radius: 50%; background: #2587a8;
          box-shadow: 0 0 8px rgba(37,135,168,0.6);
          animation: ab-dot 2.2s ease-in-out infinite;
        }
        @keyframes ab-dot {
          0%,100% { box-shadow: 0 0 8px rgba(37,135,168,0.6); }
          50%      { box-shadow: 0 0 16px rgba(37,135,168,0.9), 0 0 28px rgba(37,135,168,0.4); }
        }

        .ab-headline {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(3rem,5.5vw,5rem);
          line-height: 0.92; letter-spacing: 0.02em; color: #111;
          margin: 0 0 clamp(20px,2.5vw,28px);
        }
        .ab-headline .hl-outline {
          color: transparent;
          -webkit-text-stroke: 1.5px #2587a8;
        }
        .ab-headline .hl-blue { color: #2587a8; }

        .ab-body {
          font-size: clamp(0.82rem,1vw,0.9rem); font-weight: 300; line-height: 1.9;
          color: rgba(0,0,0,0.5); margin-bottom: 14px;
        }

        /* ── Photos — now LEFT side, overlapping layout ── */
        .ab-photos {
          position: relative;
          height: 460px;
        }
        .ab-photo-main {
          position: absolute;
          top: 0; left: 0;
          width: 78%; height: 340px;
          border-radius: 18px; overflow: hidden;
          border: 1px solid rgba(0,0,0,0.06);
          box-shadow: 0 8px 40px rgba(0,0,0,0.1);
          z-index: 1;
        }
        .ab-photo-secondary {
          position: absolute;
          bottom: 0; right: 0;
          width: 58%; height: 220px;
          border-radius: 18px; overflow: hidden;
          border: 3px solid #fafaf8;
          box-shadow: 0 8px 40px rgba(0,0,0,0.12);
          z-index: 2;
        }
        .ab-photo-main img,
        .ab-photo-secondary img {
          width:100%; height:100%; object-fit:cover; display:block;
          transition: transform 0.8s ease;
        }
        .ab-photo-main:hover img,
        .ab-photo-secondary:hover img { transform: scale(1.05); }

        /* Floating badge on photos */
        .ab-photo-badge {
          position: absolute;
          top: 20px; right: -12px;
          background: #2587a8;
          color: #fff;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 0.75rem; letter-spacing: 0.12em;
          padding: 6px 14px;
          border-radius: 9999px;
          box-shadow: 0 4px 16px rgba(37,135,168,0.35);
          z-index: 3;
          white-space: nowrap;
        }

        .ab-cta {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: 'DM Sans', sans-serif; font-size: 0.72rem; font-weight: 700;
          letter-spacing: 0.08em; text-transform: uppercase;
          color: #fff; background: #2587a8;
          border: none; cursor: pointer;
          padding: 10px 22px; border-radius: 9999px; text-decoration: none;
          position: relative; overflow: hidden;
          transition: background 0.3s, transform 0.3s, box-shadow 0.3s;
        }
        .ab-cta::after {
          content: ''; position: absolute; top: 0; left: -100%; width: 60%; height: 100%;
          background: linear-gradient(120deg, transparent, rgba(255,255,255,0.25), transparent);
          transform: skewX(-20deg); transition: left 0.5s ease;
        }
        .ab-cta:hover::after { left: 160%; }
        .ab-cta:hover {
          background: #1a6e8e;
          box-shadow: 0 6px 24px rgba(37,135,168,0.3);
          transform: translateY(-2px);
        }

        .ab-icon-card {
          border-radius: 16px; padding: clamp(18px,2.2vw,24px);
          border: 1px solid rgba(0,0,0,0.07);
          background: #fff;
          box-shadow: 0 2px 16px rgba(0,0,0,0.04);
          transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s; cursor: default;
        }
        .ab-icon-card:hover {
          border-color: rgba(37,135,168,0.3);
          box-shadow: 0 8px 32px rgba(37,135,168,0.1);
          transform: translateY(-3px);
        }

        @keyframes ab-ping {
          0%   { transform: scale(1); opacity: 0.4; }
          100% { transform: scale(1.9); opacity: 0; }
        }
        .ab-ping { animation: ab-ping 2.2s ease-out infinite; }

        .ab-stats {
          display: grid; grid-template-columns: repeat(2,1fr);
          gap: 1px; background: rgba(0,0,0,0.06);
          border-radius: 16px; overflow: hidden;
          margin-top: clamp(40px,5vw,64px);
          border: 1px solid rgba(0,0,0,0.07);
          box-shadow: 0 2px 16px rgba(0,0,0,0.04);
        }
        @media (min-width: 640px) { .ab-stats { grid-template-columns: repeat(4,1fr); } }
        .ab-stat-cell {
          background: #fff;
          padding: clamp(20px,2.5vw,32px) clamp(16px,2vw,24px);
          position: relative; overflow: hidden;
          transition: background 0.3s; cursor: default;
        }
        .ab-stat-cell::after {
          content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 2px;
          background: #2587a8; transform: scaleX(0); transform-origin: left;
          transition: transform 0.4s cubic-bezier(0.22,1,0.36,1);
        }
        .ab-stat-cell:hover { background: #f0f8fc; }
        .ab-stat-cell:hover::after { transform: scaleX(1); }
        .ab-stat-val {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(2rem,3.5vw,3rem); color: #111; line-height: 1;
          display: block; transition: color 0.3s;
        }
        .ab-stat-cell:hover .ab-stat-val { color: #2587a8; }
        .ab-stat-lbl {
          font-size: 0.6rem; font-weight: 600; letter-spacing: 0.14em;
          text-transform: uppercase; color: rgba(0,0,0,0.3);
          margin-top: 4px; display: block;
        }

        /* Divider line */
        .ab-divider {
          width: 40px; height: 2px;
          background: linear-gradient(90deg, #2587a8, rgba(37,135,168,0.2));
          border-radius: 2px; margin-bottom: 24px;
        }
      `}</style>

      <section id="about" className="ab-section w-full">
        <div className="ab-glow" />
        <div className="ab-glow2" />
        <div className="ab-inner">

          {/* ── MAIN 2-COL: photos LEFT, text RIGHT ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* LEFT — overlapping photos */}
            <div ref={leftRef} className={`ab-reveal from-left ${visibleLeft ? "in" : ""}`}>
              <div className="ab-photos">
                <div className="ab-photo-main">
                  <img src="/media/About-1.jpg" alt="Team working" />
                </div>
                <span className="ab-photo-badge">✦ Full Service Agency</span>
                <div className="ab-photo-secondary">
                  <img src="/media/About-2.jpg" alt="Collaboration" />
                </div>
              </div>
            </div>

            {/* RIGHT — staggered text content */}
            <div className="flex flex-col">

              {/* Eyebrow */}
              <div ref={headerRef} className={`ab-reveal d1 ${visibleHeader ? "in" : ""}`}>
                <div className="ab-eyebrow">
                  <span className="ab-eyebrow-dot" />
                  About Us
                </div>
              </div>

              {/* Headline */}
              <div ref={rightRef} className={`ab-reveal from-right d2 ${visibleRight ? "in" : ""}`}>
                <h2 className="ab-headline">
                  A Full-<br />Service<br />
                  <span className="hl-blue">Digital</span>{" "}
                  <span className="hl-outline">Agency.</span>
                </h2>
                <div className="ab-divider" />
              </div>

              {/* Body text */}
              <div ref={bottomRef} className={`ab-reveal from-bottom d3 ${visibleBottom ? "in" : ""}`}>
                <p className="ab-body">
                  At Xfactor, we turn ideas into powerful digital experiences that help businesses
                  reach their goals. Our focus is not just on design or technology — but on delivering
                  results that truly matter.
                </p>
                <p className="ab-body">
                  We work closely with our clients to understand their vision, targets, and audience.
                  Every solution we create is aimed at growth, performance, and measurable success.
                </p>
                <p className="ab-body" style={{ marginBottom: "28px" }}>
                  Xfactor is committed to completing targets, meeting deadlines, and helping brands
                  stand out in today's competitive digital world. Your goals are our mission, and
                  your success is our result.
                </p>

                {/* Contact card */}
                <div className={`ab-reveal d4 ${visibleBottom ? "in" : ""} ab-icon-card flex items-center justify-between gap-4`}>
                  <div style={{ display:"flex", alignItems:"center", gap:"14px" }}>
                    <div style={{ position:"relative", flexShrink:0 }}>
                      <div className="ab-ping" style={{ position:"absolute", inset:0, borderRadius:"50%", background:"rgba(37,135,168,0.18)" }} />
                      <div style={{ position:"relative", width:"42px", height:"42px", borderRadius:"50%", background:"rgba(37,135,168,0.08)", border:"1px solid rgba(37,135,168,0.2)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                        <PhoneCall size={16} color="#2587a8" strokeWidth={2} />
                      </div>
                    </div>
                    <div>
                      <p style={{ fontWeight:600, fontSize:"0.88rem", color:"#111" }}>Contact Us</p>
                      <p style={{ fontSize:"0.75rem", fontWeight:300, color:"rgba(0,0,0,0.38)" }}>+1 (519) 774-6608</p>
                    </div>
                  </div>
                  <a href="#contact" className="ab-cta">
                    Let's Talk <ArrowUpRight size={13} strokeWidth={2.5} />
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* ── STATS ROW ── */}
          <div ref={statsRef} className={`ab-reveal from-bottom ${visibleStats ? "in" : ""} ab-stats`}>
            {stats.map((s, i) => (
              <div key={s.label} className="ab-stat-cell" style={{ transitionDelay:`${i * 0.09}s` }}>
                <span className="ab-stat-val">{counts[i]}{s.suffix}</span>
                <span className="ab-stat-lbl">{s.label}</span>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}