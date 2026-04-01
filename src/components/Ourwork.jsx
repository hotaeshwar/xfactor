import { useEffect, useRef, useState, useCallback } from "react";

// ── video catalogue ──────────────────────────────────────────────────────────
const videos = [
  { src: "/media/work/GOLISODA1.mp4",   label: "Goli Soda",       tag: "Social Media Marketing" },
  { src: "/media/work/GOLISODA2.mp4",   label: "Goli Soda II",    tag: "Social Media Marketing" },
  { src: "/media/work/EPICATOR.mp4",    label: "Epicater",        tag: "B2B Food Service" },
  { src: "/media/work/SushantBar.mp4",  label: "Sushant Bar",     tag: "Lifestyle · Bar" },
  { src: "/media/work/NAKUL1.mp4",      label: "Nakul Sood",      tag: "Personal Brand · Real Estate" },
  { src: "/media/work/NAKUL2.mp4",      label: "Nakul Sood II",   tag: "Personal Brand · Real Estate" },
  { src: "/media/work/Renovations.mp4", label: "YouLike Renovations", tag: "Brand · Social Media" },
  { src: "/media/work/JASPREETV2.mp4",  label: "Jaspreet",        tag: "Mortgage Agent · Video" },
  { src: "/media/work/JASPREETV3.mp4",  label: "Jaspreet V3",     tag: "Mortgage Agent · Video" },
  { src: "/media/work/JASPREETV4.mp4",  label: "Jaspreet V4",     tag: "Mortgage Agent · Video" },
  { src: "/media/work/JASPREETV5.mp4",  label: "Jaspreet V5",     tag: "Mortgage Agent · Video" },
  { src: "/media/work/JASPREETV6.mp4",  label: "Jaspreet V6",     tag: "Mortgage Agent · Video" },
  { src: "/media/work/Dipit1.mp4",      label: "Dipit I",         tag: "Real Estate" },
  { src: "/media/work/Dipit2.mp4",      label: "Dipit II",        tag: "Real Estate" },
  { src: "/media/work/Dipit3.mp4",      label: "Dipit III",       tag: "Real Estate" },
  { src: "/media/work/Dipit4.mp4",      label: "Dipit IV",        tag: "Real Estate" },
  { src: "/media/work/Dipit5.mp4",      label: "Dipit V",         tag: "Real Estate" },
  { src: "/media/work/Gaurang.mp4",     label: "Gaurang Dave",    tag: "Real Estate" },
  { src: "/media/work/PIA.mp4",         label: "Pia Dhir",        tag: "Real Estate" },
  { src: "/media/work/HONEY.mp4",       label: "Honey Lawyer",    tag: "Legal · Personal Brand" },
  { src: "/media/work/Glassbuild.mp4",  label: "TSB Homes",       tag: "Construction" },
  { src: "/media/work/Glassbuild1.mp4", label: "TSB Homes II",    tag: "Construction" },
  { src: "/media/work/Glarly1.mp4",     label: "Glarly",          tag: "E-commerce · Socks Brand" },
  { src: "/media/work/Glarly2.mp4",     label: "Glarly II",       tag: "E-commerce · Socks Brand" },
  { src: "/media/work/EVA.mp4",         label: "EVA",             tag: "Campaign" },
  { src: "/media/work/Foundershike.mp4",label: "Foundershike",    tag: "Event" },
  { src: "/media/work/MjEvent1.mp4",    label: "MJ Event I",      tag: "Event Production" },
  { src: "/media/work/MJevent2.mp4",    label: "MJ Event II",     tag: "Event Production" },
  { src: "/media/work/MORTGAGE1.mp4",   label: "Mortgage I",      tag: "Finance · Video" },
  { src: "/media/work/MORTGAGE2.mp4",   label: "Mortgage II",     tag: "Finance · Video" },
  { src: "/media/work/MORTGAGE3.mp4",   label: "Mortgage III",    tag: "Finance · Video" },
  { src: "/media/work/MOTRTGAGE.mp4",   label: "Mortgage IV",     tag: "Finance · Video" },
  { src: "/media/work/SEMINAR.mp4",     label: "Seminar",         tag: "Event · Education" },
  { src: "/media/work/automative2.mp4", label: "Automotive II",   tag: "Automotive" },
  { src: "/media/work/automotive1.mp4", label: "Automotive I",    tag: "Automotive" },
  { src: "/media/work/Barberscave.mp4", label: "Barbers Cave I",  tag: "Lifestyle · Grooming" },
  { src: "/media/work/BarbersCave2.mp4",label: "Barbers Cave II", tag: "Lifestyle · Grooming" },
  { src: "/media/work/BLUE.mp4",        label: "Blue",            tag: "Brand Film" },
];

// ── case studies ─────────────────────────────────────────────────────────────
const caseStudies = [
  {
    name: "Goli Soda",
    tag: "Social Media Marketing",
    about:
      "Goli Soda is a vibrant and nostalgic beverage brand that brings back the charm of traditional Indian fizzy drinks with a modern twist. Known for its refreshing flavors and iconic packaging, the brand connects strongly with both younger audiences and those who love a touch of desi nostalgia.",
    challenge:
      "Increase brand visibility in a competitive beverage market, build a strong digital presence, connect with younger social-media-savvy audiences, and drive more sales through online engagement.",
    strategy:
      "Eye-catching content creation, brand storytelling combining nostalgia and modern vibes, Reels & trend marketing, interactive audience engagement posts, and maintaining a visually cohesive feed.",
    results: [
      "Significant increase in engagement and reach",
      "Stronger brand recall among target audience",
      "Growth in followers and online visibility",
      "Noticeable boost in inquiries and product demand",
      "Converted social media presence into real sales impact",
    ],
  },
  {
    name: "Epicater",
    tag: "B2B Food Service · Canada",
    about:
      "Epicater is a Canada-based B2B food service company specializing in delivering nutritious, well-balanced meals to corporate organizations. With a focus on quality, convenience, and employee wellness, the brand positions itself as a reliable partner for modern workplaces.",
    challenge:
      "Establish a strong and credible digital presence within the corporate space, build trust, communicate value effectively, and attract high-quality B2B clients in a competitive and professional market.",
    strategy:
      "Premium content showcasing food quality and hygiene, value-driven messaging around employee health and productivity, consistent professional branding, and content crafted specifically for corporate decision-makers.",
    results: [
      "Strengthened brand positioning in the Canadian corporate market",
      "Increased engagement from relevant B2B audiences",
      "Enhanced trust, credibility, and professional perception",
      "Growth in qualified leads and business inquiries",
      "Improved conversion potential through a stronger digital presence",
    ],
  },
  {
    name: "Nakul Sood",
    tag: "Personal Brand · Real Estate",
    about:
      "Nakul Sood is a real estate professional focused on building a strong personal brand in the property market. With a vision to stand out in a competitive industry, the goal was to position him as a credible, influential, and recognizable name in real estate.",
    challenge:
      "Establish a powerful personal brand from the ground up while maintaining professionalism and trust, increasing visibility online and offline, and attracting high-intent clients.",
    strategy:
      "Crafted a distinct professional identity, high-quality content on real estate insights and market trends, consistent premium digital presence, event hosting for offline authority, and relatable value-driven communication.",
    results: [
      "Strong and recognizable personal brand in real estate",
      "Increased social media engagement and audience growth",
      "Enhanced credibility and trust among potential clients",
      "Improved networking and visibility through events",
      "Growth in quality leads and client inquiries",
    ],
  },
  {
    name: "YouLike Renovations",
    tag: "Renovation · Brand",
    about:
      "YouLike Renovations is a modern renovation company specializing in transforming residential and commercial spaces with a focus on quality craftsmanship, functional design, and aesthetic appeal.",
    challenge:
      "Build a strong digital presence, showcase its work effectively, and stand out in a competitive renovation market while attracting quality leads and building trust through visual proof of work.",
    strategy:
      "High-quality before-and-after transformation content, clean premium visuals reflecting craftsmanship, engaging project showcase Reels, professional brand positioning, and a cohesive polished feed.",
    results: [
      "Increased engagement and visibility on social media",
      "Stronger brand trust through high-quality visual content",
      "Improved audience perception and credibility",
      "Growth in inquiries and potential client leads",
      "Enhanced positioning in a competitive renovation market",
    ],
  },
  {
    name: "Jaspreet – Mortgage Agent",
    tag: "Mortgage · Video Production",
    about:
      "Jaspreet is a professional mortgage agent who wanted to build a strong digital presence and connect more effectively with potential homebuyers. While she had the expertise, her online presence lacked consistency, engagement, and impactful content.",
    challenge:
      "Position Jaspreet as a trusted and approachable mortgage expert through strategic social media marketing and high-quality video content that educates, engages, and converts.",
    strategy:
      "Tailored content strategy educating audiences about mortgages and home financing, informational Reels on mortgage basics, personal branding videos, and consistent professional visual identity across all channels.",
    results: [
      "Stronger and more consistent online presence",
      "Increased audience engagement and reach",
      "Enhanced credibility as a mortgage expert",
      "Better connection with potential clients through video-first content",
    ],
  },
  {
    name: "Glarly",
    tag: "E-commerce · Socks Brand",
    about:
      "Glarly is a modern socks brand built around comfort, style, and everyday essentials. While the product had strong potential, the brand needed a cohesive identity and a high-performing digital ecosystem to stand out in a competitive e-commerce space.",
    challenge:
      "Build Glarly from the ground up—creating a distinctive brand identity, a seamless e-commerce experience, and a performance-driven marketing system that drives consistent sales and growth.",
    strategy:
      "Clean contemporary brand identity, conversion-focused e-commerce website optimized for mobile and desktop, targeted performance marketing with retargeting, and an integrated growth strategy aligning branding with marketing.",
    results: [
      "Strong and cohesive brand identity",
      "High-performing e-commerce website",
      "Increased traffic and improved conversion rates",
      "Scalable performance marketing funnel driving consistent sales",
    ],
  },
];

// ── detect mobile ─────────────────────────────────────────────────────────────
const isMobile = () =>
  typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;

// ── VideoCard ─────────────────────────────────────────────────────────────────
function VideoCard({ video, onOpen, isPlaying, cardIndex }) {
  const cardRef  = useRef(null);
  const videoRef = useRef(null);
  const [visible,  setVisible]  = useState(false);
  const [loaded,   setLoaded]   = useState(false);
  const [appeared, setAppeared] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          const delay = (cardIndex % 8) * 80;
          setTimeout(() => setAppeared(true), delay);
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [cardIndex]);

  // ── FIX: play/pause with mobile-safe retry ──
  useEffect(() => {
    const v = videoRef.current;
    if (!v || !visible) return;

    if (isPlaying) {
      // readyState check prevents NotAllowedError on iOS before any interaction
      const tryPlay = () => {
        v.muted = true; // ensure muted — required for autoplay on mobile
        v.play().catch(() => {});
      };
      if (v.readyState >= 2) {
        tryPlay();
      } else {
        v.addEventListener("canplay", tryPlay, { once: true });
        return () => v.removeEventListener("canplay", tryPlay);
      }
    } else {
      v.pause();
    }
  }, [visible, isPlaying]);

  return (
    <div
      ref={cardRef}
      className="flex-shrink-0 flex flex-col items-center cursor-pointer"
      style={{
        width: "clamp(120px, 14vw, 190px)",
        opacity: appeared ? 1 : 0,
        transform: appeared ? "translateY(0px)" : "translateY(40px)",
        transition: "opacity 0.55s ease, transform 0.55s ease",
      }}
      onClick={() => onOpen(video)}
    >
      <div
        className="relative rounded-2xl overflow-hidden w-full group transition-shadow duration-500"
        style={{
          aspectRatio: "9/16",
          boxShadow: visible
            ? "0 0 20px 5px rgba(30,174,200,0.28), 0 0 55px 12px rgba(30,174,200,0.10)"
            : "none",
        }}
      >
        {visible && (
          <video
            ref={videoRef}
            src={video.src}
            muted
            loop
            playsInline
            preload="metadata"
            onLoadedData={() => setLoaded(true)}
            className="w-full h-full object-cover"
            style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.5s" }}
          />
        )}
        {(!visible || !loaded) && (
          <div className="absolute inset-0 bg-[#dedad4] animate-pulse rounded-2xl" />
        )}
        {/* hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center rounded-2xl">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-11 h-11 rounded-full border-2 border-white bg-white/10 backdrop-blur-sm flex items-center justify-center">
            <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>
      <div className="mt-2.5 text-center px-1">
        <span className="block text-[10px] font-bold tracking-[0.18em] text-[#1eaec8] uppercase">{video.tag}</span>
        <span className="block text-[12px] font-extrabold text-[#1a1a1a] mt-0.5 leading-tight">{video.label}</span>
      </div>
    </div>
  );
}

// ── Modal ─────────────────────────────────────────────────────────────────────
function VideoModal({ video, onClose }) {
  const videoRef = useRef(null);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    // ── FIX: muted + playsInline required for modal autoplay on mobile ──
    const v = videoRef.current;
    if (v) {
      v.muted = false; // allow sound in modal since user tapped intentionally
      v.play().catch(() => {
        v.muted = true; // fallback: if sound blocked, play muted
        v.play().catch(() => {});
      });
    }
    const esc = (e) => { if (e.key === "Escape") handleClose(); };
    window.addEventListener("keydown", esc);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", esc); };
  }, []);

  const handleClose = useCallback(() => {
    setClosing(true);
    setTimeout(onClose, 320);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        background: "rgba(0,0,0,0.87)",
        backdropFilter: "blur(16px)",
        animation: closing ? "fdOut .32s ease forwards" : "fdIn .32s ease forwards",
      }}
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
    >
      <div
        className="relative flex flex-col items-center"
        style={{ animation: closing ? "scOut .32s ease forwards" : "scIn .32s ease forwards" }}
      >
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{
            width: "clamp(240px, 34vw, 400px)",
            aspectRatio: "9/16",
            boxShadow: "0 0 60px 20px rgba(30,174,200,0.35)",
          }}
        >
          {/* ── FIX: added webkit-playsinline for older iOS ── */}
          <video
            ref={videoRef}
            src={video.src}
            controls
            loop
            playsInline
            webkit-playsinline="true"
            className="w-full h-full object-cover"
          />

          <button
            onClick={handleClose}
            className="absolute top-3 right-3 w-10 h-10 rounded-full border-2 border-[#1eaec8] flex items-center justify-center text-white hover:bg-[#1eaec8]/30 transition-colors z-20"
            style={{
              background: "rgba(0,0,0,0.55)",
              backdropFilter: "blur(6px)",
              animation: "spIn .45s ease .1s both",
            }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 44 44" fill="none"
              style={{ animation: "rotCW 3s linear infinite" }}>
              <circle cx="22" cy="22" r="20" stroke="#1eaec8" strokeWidth="1.5"
                strokeDasharray="30 95" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="mt-5 text-center">
          <span className="block text-[11px] font-bold tracking-[0.2em] text-[#1eaec8] uppercase">{video.tag}</span>
          <span className="block text-xl font-extrabold text-white mt-1">{video.label}</span>
        </div>
      </div>

      <style>{`
        @keyframes fdIn  { from { opacity: 0 } to { opacity: 1 } }
        @keyframes fdOut { from { opacity: 1 } to { opacity: 0 } }
        @keyframes scIn  { from { opacity: 0; transform: scale(.88) } to { opacity: 1; transform: scale(1) } }
        @keyframes scOut { from { opacity: 1; transform: scale(1) } to { opacity: 0; transform: scale(.88) } }
        @keyframes spIn  { from { opacity: 0; transform: rotate(-180deg) scale(0) } to { opacity: 1; transform: rotate(0deg) scale(1) } }
        @keyframes rotCW { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }
      `}</style>
    </div>
  );
}

// ── AccordionItem ─────────────────────────────────────────────────────────────
function AccordionItem({ cs, index, isOpen, onToggle }) {
  const rowRef     = useRef(null);
  const [vis,      setVis]      = useState(false);
  const [everOpen, setEverOpen] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    obs.observe(rowRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (isOpen) setEverOpen(true);
  }, [isOpen]);

  const sections = [
    { label: "About the Brand", text: cs.about },
    { label: "The Challenge",   text: cs.challenge },
    { label: "Our Strategy",    text: cs.strategy },
  ];

  return (
    <div
      ref={rowRef}
      className="border border-[#e2dfd9] rounded-2xl bg-white"
      style={{
        opacity:    vis ? 1 : 0,
        transform:  vis ? "translateY(0)" : "translateY(36px)",
        transition: `opacity 0.5s ease ${index * 90}ms, transform 0.5s ease ${index * 90}ms`,
        boxShadow:  isOpen
          ? "0 8px 48px 0 rgba(30,174,200,0.13)"
          : "0 2px 16px 0 rgba(30,174,200,0.05)",
        overflow: "hidden",
      }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 md:px-8 py-5 md:py-6 text-left"
        style={{ background: isOpen ? "#fff" : "#faf9f7" }}
      >
        <div className="flex items-center gap-4">
          <span
            className="text-[11px] font-black tabular-nums leading-none"
            style={{ color: isOpen ? "#1eaec8" : "#bbb" }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <div>
            <span
              className="block text-[10px] font-bold tracking-[0.18em] uppercase mb-0.5"
              style={{ color: isOpen ? "#1eaec8" : "#aaa", transition: "color 0.3s" }}
            >
              {cs.tag}
            </span>
            <h3 className="text-base md:text-xl font-black text-[#0f0f0f] leading-tight">
              {cs.name}
            </h3>
          </div>
        </div>

        <div
          className="flex-shrink-0 w-9 h-9 rounded-full border-2 flex items-center justify-center"
          style={{
            borderColor: isOpen ? "#1eaec8" : "#d5d1cc",
            background:  isOpen ? "#1eaec8" : "transparent",
            transform:   isOpen ? "rotate(45deg)" : "rotate(0deg)",
            transition:  "all 0.35s ease",
          }}
        >
          <svg className="w-4 h-4" fill="none"
            stroke={isOpen ? "#fff" : "#888"} strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
          </svg>
        </div>
      </button>

      {everOpen && (
        <div
          style={{
            display: "grid",
            gridTemplateRows: isOpen ? "1fr" : "0fr",
            transition: "grid-template-rows 0.42s cubic-bezier(0.4,0,0.2,1)",
          }}
        >
          <div style={{ overflow: "hidden" }}>
            <div className="px-6 md:px-8 pb-7 pt-1 flex flex-col gap-5">
              <div className="w-10 h-[2px] bg-[#1eaec8] rounded-full" />
              {sections.map((s) => (
                <div key={s.label}>
                  <p className="text-[10px] font-bold tracking-widest text-[#1eaec8] uppercase mb-1.5">{s.label}</p>
                  <p className="text-sm text-[#555] leading-relaxed">{s.text}</p>
                </div>
              ))}
              <div>
                <p className="text-[10px] font-bold tracking-widest text-[#1eaec8] uppercase mb-3">Results</p>
                <ul className="flex flex-col gap-2">
                  {cs.results.map((r, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-[#333]">
                      <span className="mt-[6px] w-1.5 h-1.5 rounded-full bg-[#1eaec8] flex-shrink-0" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── CaseStudiesAccordion ──────────────────────────────────────────────────────
function CaseStudiesAccordion() {
  const [openIndex, setOpenIndex] = useState(null);
  return (
    <div className="flex flex-col gap-3 md:gap-4">
      {caseStudies.map((cs, i) => (
        <AccordionItem
          key={cs.name}
          cs={cs}
          index={i}
          isOpen={openIndex === i}
          onToggle={() => setOpenIndex(openIndex === i ? null : i)}
        />
      ))}
    </div>
  );
}

// ── Main Export ───────────────────────────────────────────────────────────────
export default function OurWork() {
  const trackRef   = useRef(null);
  const animRef    = useRef(null);
  const posRef     = useRef(0);
  const [modal, setModal]     = useState(null);
  const [hovered, setHovered] = useState(false);

  // ── FIX: on mobile, never pause carousel videos via hovered state ──
  const mobile = isMobile();
  const isPlaying = mobile ? !modal : (!hovered && !modal);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const SPEED = 0.55;

    const tick = () => {
      if (!hovered && !modal) {
        posRef.current += SPEED;
        const half = track.scrollWidth / 2;
        if (posRef.current >= half) posRef.current -= half;
        track.scrollLeft = posRef.current;
      }
      animRef.current = requestAnimationFrame(tick);
    };

    animRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animRef.current);
  }, [hovered, modal]);

  const touchStartX = useRef(0);
  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchMove  = (e) => {
    const dx = touchStartX.current - e.touches[0].clientX;
    posRef.current = Math.max(0, posRef.current + dx * 0.6);
    touchStartX.current = e.touches[0].clientX;
  };

  const doubled = [...videos, ...videos];

  return (
    <section className="w-full bg-[#f0ede8] py-16 md:py-24 overflow-hidden">

      <div className="px-6 md:px-16 mb-10 md:mb-14">
        <p className="flex items-center gap-2 text-[11px] font-bold tracking-[0.22em] text-[#1eaec8] uppercase mb-4">
          <span className="w-2 h-2 rounded-full bg-[#1eaec8] inline-block" />
          Our Work
        </p>
        <h2 className="text-[clamp(2rem,6vw,4rem)] font-black leading-none tracking-tight text-[#0f0f0f]">
          PROJECTS THAT
          <br />
          <span className="text-[#1eaec8]">SPEAK RESULTS.</span>
        </h2>
        <div className="mt-4 w-12 h-[3px] bg-[#1eaec8] rounded-full" />
      </div>

      <div
        ref={trackRef}
        className="flex gap-5 md:gap-6 px-4 md:px-8 overflow-x-hidden pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
      >
        {doubled.map((v, i) => (
          <VideoCard
            key={`${v.src}-${i}`}
            video={v}
            onOpen={setModal}
            isPlaying={isPlaying}
            cardIndex={i % videos.length}
          />
        ))}
      </div>

      <div className="px-6 md:px-16 mt-20 md:mt-28">
        <p className="flex items-center gap-2 text-[11px] font-bold tracking-[0.22em] text-[#1eaec8] uppercase mb-4">
          <span className="w-2 h-2 rounded-full bg-[#1eaec8] inline-block" />
          Case Studies
        </p>
        <h2 className="text-[clamp(1.6rem,4.5vw,3rem)] font-black leading-tight tracking-tight text-[#0f0f0f] mb-10 md:mb-14">
          THE STORY BEHIND
          <br />
          <span className="text-[#1eaec8]">THE RESULTS.</span>
        </h2>

        <CaseStudiesAccordion />
      </div>

      {modal && (
        <VideoModal
          video={modal}
          onClose={() => { setModal(null); setHovered(false); }}
        />
      )}

      <style>{`div::-webkit-scrollbar { display: none; }`}</style>
    </section>
  );
}