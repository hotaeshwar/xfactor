import { useEffect, useRef, useState, useCallback } from "react";
import { X } from "lucide-react";

const services = [
  {
    id: "01",
    title: "Branding",
    short: "Brand Identity & Strategy",
    description:
      "Build a brand that people remember. We craft powerful brand identities — from logo design and color systems to tone of voice and brand guidelines — that set you apart and make lasting impressions.",
    image: "/media/branding.jpg",
    tag: "Identity · Strategy · Design",
    detail:
      "Your brand is more than a logo — it's the feeling people get when they encounter your business. We develop complete brand systems including visual identity, typography, messaging strategy, and brand guidelines. Every touchpoint is crafted to communicate your values and connect emotionally with your target audience.",
    keywords: "brand identity design, logo design, brand strategy, visual identity",
  },
  {
    id: "02",
    title: "Website",
    short: "Web Design & Development",
    description:
      "Your website is your most powerful sales tool. We design and develop fast, responsive, conversion-focused websites that look stunning on every device and turn visitors into customers.",
    image: "/media/website.jpg",
    tag: "Design · Dev · UX",
    detail:
      "We build websites that work as hard as you do. From UX research and wireframing to pixel-perfect design and clean code, every site we deliver is fast, accessible, SEO-ready, and built to convert. We specialize in business websites, landing pages, and portfolio sites that generate real results.",
    keywords: "website design, web development, responsive website, business website",
  },
  {
    id: "03",
    title: "E-Commerce",
    short: "Online Store Development",
    description:
      "Launch and scale your online store with confidence. We build high-converting e-commerce experiences with seamless checkout flows, product pages built to sell, and integrations that scale with your business.",
    image: "/media/sco.jpg",
    tag: "Store · Sales · Scale",
    detail:
      "From product catalogue architecture to payment gateway integration, we build e-commerce stores that are optimized for sales. We work with Shopify, WooCommerce, and custom solutions — focusing on speed, mobile experience, and conversion rate optimization so every visit has the best chance of becoming a purchase.",
    keywords: "ecommerce website, online store, shopify development, woocommerce",
  },
  {
    id: "04",
    title: "Production",
    short: "Photography & Videography",
    description:
      "Stop the scroll with visuals that tell your story. Our production team creates professional photography and videography — from brand shoots to product content — that elevates your identity across every platform.",
    image: "/media/shoot.jpg",
    tag: "Photo · Video · Content",
    detail:
      "Great visuals are the foundation of great marketing. Our end-to-end production service covers creative direction, location scouting, shooting, and post-production. Whether you need hero imagery for your website, scroll-stopping social content, or a brand film — we deliver visuals that make your brand impossible to ignore.",
    keywords: "brand photography, videography, product photography, brand shoot",
  },
  {
    id: "05",
    title: "Digital Marketing",
    short: "Growth & Performance Marketing",
    description:
      "Reach the right people at the right time. Our digital marketing strategies combine SEO, social media, paid ads, and content marketing to grow your audience, generate leads, and drive measurable ROI.",
    image: "/media/Social media dashboard in modern office.png",
    tag: "SEO · Ads · Growth",
    detail:
      "We build data-driven marketing strategies tailored to your business goals. From organic search and social media management to Google Ads and Meta campaigns, every channel is optimized for performance. We track what matters — traffic, leads, conversions — and continuously refine to maximize your return on investment.",
    keywords: "digital marketing, SEO, social media marketing, Google ads, performance marketing",
  },
  {
    id: "06",
    title: "Management Tool",
    short: "Customized Business Solutions",
    description:
      "Run your business smarter with tools built exactly for you. We develop customized management systems — CRMs, dashboards, booking tools, and workflow automations — that streamline operations and save you time every day.",
    image: "/media/Google My Business dashboard in office.png",
    tag: "CRM · Dashboard · Automation",
    detail:
      "Off-the-shelf software rarely fits your exact needs. We build custom management tools that map to your real workflows — whether that's a client CRM, inventory system, booking platform, or internal dashboard. Built with clean interfaces, role-based access, and integrations with the tools you already use.",
    keywords: "custom management software, CRM development, business automation, custom dashboard",
  },
];

export default function Services() {
  const [modalService, setModalService]   = useState(null);
  const [modalVisible, setModalVisible]   = useState(false);
  const [visibleHeader, setVisibleHeader] = useState(false);
  const [visibleCards, setVisibleCards]   = useState(false);
  const [isPaused, setIsPaused]           = useState(false);

  const headerRef = useRef(null);
  const cardsRef  = useRef(null);
  const scrollRef = useRef(null);
  const posRef    = useRef(0);
  const rafRef    = useRef(null);
  const pauseRef  = useRef(false);

  const items = [...services, ...services, ...services];

  const startScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const speed = 0.55;

    // Start at the end of the first third so reverse (L→R) loop is seamless
    const init = () => {
      const third = el.scrollWidth / 3;
      posRef.current = third;
      el.scrollLeft = third;
    };

    // Wait a tick for layout to settle
    setTimeout(init, 50);

    const tick = () => {
      if (!pauseRef.current) {
        posRef.current -= speed;
        const third = el.scrollWidth / 3;
        if (posRef.current <= 0) posRef.current = third;
        el.scrollLeft = posRef.current;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    startScroll();
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [startScroll]);

  useEffect(() => { pauseRef.current = isPaused; }, [isPaused]);

  useEffect(() => {
    const o1 = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisibleHeader(true); }, { threshold: 0.15 });
    const o2 = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisibleCards(true); }, { threshold: 0.05 });
    if (headerRef.current) o1.observe(headerRef.current);
    if (cardsRef.current)  o2.observe(cardsRef.current);
    return () => { o1.disconnect(); o2.disconnect(); };
  }, []);

  const openModal = (svc) => {
    setIsPaused(true);
    setModalService(svc);
    setTimeout(() => setModalVisible(true), 10);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setModalVisible(false);
    setTimeout(() => {
      setModalService(null);
      document.body.style.overflow = "";
      setIsPaused(false);
    }, 420);
  };

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") closeModal(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;700&display=swap');
        .svc-bebas { font-family: 'Bebas Neue', sans-serif; }
        .svc-dm    { font-family: 'DM Sans', sans-serif; }

        .svc-fade {
          opacity: 0; transform: translateY(32px);
          transition: opacity 0.9s cubic-bezier(0.22,1,0.36,1), transform 0.9s cubic-bezier(0.22,1,0.36,1);
        }
        .svc-fade.in { opacity: 1; transform: translateY(0); }
        .svc-fade.d1 { transition-delay: 0.06s; }
        .svc-fade.d2 { transition-delay: 0.2s; }
        .svc-fade.d3 { transition-delay: 0.34s; }

        .track-fade {
          opacity: 0; transform: translateY(44px);
          transition: opacity 1s cubic-bezier(0.22,1,0.36,1) 0.15s,
                      transform 1s cubic-bezier(0.22,1,0.36,1) 0.15s;
        }
        .track-fade.in { opacity: 1; transform: translateY(0); }

        .no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
        .no-scrollbar::-webkit-scrollbar { display: none; }

        .svc-card-glow {
          position: absolute; inset: -2px; border-radius: 22px; z-index: 0;
          background: radial-gradient(ellipse at 50% 0%, rgba(37,135,168,0.2) 0%, transparent 65%);
          opacity: 0; transition: opacity 0.45s ease; pointer-events: none;
        }
        .svc-card:hover .svc-card-glow { opacity: 1; }
        .modal-open .svc-card:hover .svc-card-glow { opacity: 0; }

        .svc-card-bar {
          position: absolute; bottom: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, #2587a8, rgba(37,135,168,0.35));
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.4s cubic-bezier(0.22,1,0.36,1);
        }
        .svc-card:hover .svc-card-bar { transform: scaleX(1); }
        .modal-open .svc-card:hover .svc-card-bar { transform: scaleX(0); }

        .svc-ambient { position: absolute; border-radius: 50%; pointer-events: none; z-index: 0; filter: blur(80px); }

        .svc-edge-left  { position: absolute; left: 0;  top: 0; bottom: 0; width: 80px; background: linear-gradient(to right, #fafaf8, transparent); z-index: 2; pointer-events: none; }
        .svc-edge-right { position: absolute; right: 0; top: 0; bottom: 0; width: 80px; background: linear-gradient(to left,  #fafaf8, transparent); z-index: 2; pointer-events: none; }

        .modal-backdrop {
          position: fixed; inset: 0; z-index: 100;
          background: rgba(0,0,0,0);
          display: flex; align-items: center; justify-content: center;
          padding: 16px;
          transition: background 0.4s ease;
          pointer-events: none;
        }
        .modal-backdrop.visible { background: rgba(0,0,0,0.52); pointer-events: all; }

        .modal-box {
          width: 100%; max-width: 780px; max-height: 90vh;
          background: #fff; border: 1px solid rgba(0,0,0,0.08);
          border-radius: 24px; overflow: hidden;
          display: flex; flex-direction: column;
          opacity: 0; transform: scale(0.92) translateY(28px);
          transition: opacity 0.42s cubic-bezier(0.22,1,0.36,1),
                      transform 0.42s cubic-bezier(0.22,1,0.36,1);
          box-shadow: 0 40px 100px rgba(0,0,0,0.14);
        }
        .modal-box.visible { opacity: 1; transform: scale(1) translateY(0); }

        .modal-hero { width: 100%; height: 240px; flex-shrink: 0; overflow: hidden; position: relative; }
        @media (min-width: 640px) { .modal-hero { height: 300px; } }
        .modal-hero img { width:100%; height:100%; object-fit:cover; display:block; }
        .modal-hero-fade {
          position: absolute; inset: 0;
          background: linear-gradient(to top, #fff 0%, rgba(255,255,255,0.05) 55%, transparent 100%);
        }

        .modal-close {
          position: absolute; top: 14px; right: 14px; z-index: 20;
          width: 40px; height: 40px; border-radius: 50%;
          background: rgba(255,255,255,0.88); border: 1px solid rgba(0,0,0,0.1);
          backdrop-filter: blur(10px);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: #111;
          transition: background 0.3s, color 0.3s,
                      transform 0.35s cubic-bezier(0.22,1,0.36,1), border-color 0.3s;
        }
        .modal-close:hover {
          background: #2587a8; color: #fff; border-color: #2587a8;
          transform: scale(1.1) rotate(90deg);
        }

        .modal-scroll { overflow-y: auto; flex: 1; }
        .modal-scroll::-webkit-scrollbar { width: 3px; }
        .modal-scroll::-webkit-scrollbar-thumb { background: rgba(37,135,168,0.3); border-radius: 9999px; }

        .modal-big-num {
          font-family: 'Bebas Neue', sans-serif; font-size: 5rem;
          color: transparent; -webkit-text-stroke: 1px rgba(37,135,168,0.1);
          line-height: 1; float: right; margin-left: 12px; margin-top: -4px; user-select: none;
        }
      `}</style>

      <section
        id="services"
        aria-label="Xfactor Services"
        className={`svc-dm relative w-full overflow-hidden bg-[#fafaf8] py-14 sm:py-20 lg:py-24 ${modalService ? "modal-open" : ""}`}
      >
        <div className="svc-ambient w-[480px] h-[480px] bg-[#2587a8]/[0.07] top-[-100px] right-[-80px]" />
        <div className="svc-ambient w-[380px] h-[380px] bg-[#2587a8]/[0.05] bottom-[-60px] left-[-60px]" />
        <div className="svc-ambient w-[280px] h-[280px] bg-[#2587a8]/[0.05] top-[35%] left-[40%]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 md:px-12 lg:px-20">

          <header ref={headerRef} className="mb-10 sm:mb-14">
            <div className={`svc-fade d1 ${visibleHeader ? "in" : ""} flex items-center gap-3 mb-5`}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#2587a8] shadow-[0_0_8px_rgba(37,135,168,0.7)]" />
              <span className="text-[0.68rem] font-bold tracking-[0.22em] uppercase text-[#2587a8]">
                Our Services
              </span>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-end gap-5 lg:gap-12">
              <h2
                className={`svc-fade d2 svc-bebas ${visibleHeader ? "in" : ""} text-[#111] leading-[0.92] tracking-[0.02em]`}
                style={{ fontSize: "clamp(3rem,7vw,5.5rem)" }}
              >
                What We<br />
                <span className="text-[#2587a8]">Do Best.</span>
              </h2>
              <p className={`svc-fade d3 ${visibleHeader ? "in" : ""} lg:w-2/5 lg:pb-1 text-sm sm:text-base leading-relaxed text-black/45 font-light max-w-md`}>
                From brand identity to custom tech — six powerful services designed to grow your business online and offline.
              </p>
            </div>
          </header>

          <div ref={cardsRef} className={`track-fade ${visibleCards ? "in" : ""}`}>
            <p className="text-[0.58rem] tracking-[0.16em] uppercase text-black/25 font-medium mb-4 text-right select-none">
              Hover to pause · Click to explore
            </p>

            <div className="relative">
              <div className="svc-edge-left" />
              <div className="svc-edge-right" />

              <div
                ref={scrollRef}
                className="no-scrollbar flex gap-4 sm:gap-5 overflow-x-hidden py-3"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => !modalService && setIsPaused(false)}
              >
                {items.map((svc, i) => (
                  <article
                    key={`${svc.id}-${i}`}
                    className={`svc-card relative flex-shrink-0 rounded-[20px] bg-white border border-black/[0.07]
                      shadow-[0_2px_20px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col
                      w-[260px] sm:w-[290px] md:w-[320px] lg:w-[360px]
                      transition-all duration-[400ms] ease-out
                      ${!modalService
                        ? "cursor-pointer hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(37,135,168,0.13)] hover:border-[#2587a8]/25"
                        : "cursor-default"
                      }`}
                    onClick={() => !modalService && openModal(svc)}
                    aria-label={`${svc.title} — ${svc.short}`}
                  >
                    <div className="svc-card-glow" />

                    <div className="relative w-full h-[150px] sm:h-[170px] md:h-[190px] overflow-hidden flex-shrink-0">
                      <img
                        src={svc.image}
                        alt={`${svc.title} service by Xfactor`}
                        loading="lazy"
                        width="360"
                        height="190"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/25" />
                      <span className="svc-bebas absolute top-3 left-3 text-[0.75rem] tracking-[0.08em] text-white bg-black/40 backdrop-blur-sm border border-white/15 px-2.5 py-0.5 rounded-full">
                        {svc.id}
                      </span>
                      <span className="absolute bottom-3 right-3 text-[0.52rem] font-semibold tracking-[0.1em] uppercase text-white bg-[#2587a8]/80 backdrop-blur-sm px-2.5 py-1 rounded-full">
                        {svc.tag}
                      </span>
                    </div>

                    <div className="relative z-10 flex flex-col gap-2 p-4 sm:p-5 flex-1">
                      <h3
                        className="svc-bebas text-[#111] leading-[1] tracking-[0.02em] transition-colors duration-300"
                        style={{ fontSize: "clamp(1.5rem,2.5vw,1.9rem)" }}
                      >
                        {svc.title}
                      </h3>
                      <p className="text-[0.76rem] sm:text-[0.8rem] font-light leading-[1.75] text-black/50 flex-1 line-clamp-4">
                        {svc.description}
                      </p>
                      <div className="flex items-center justify-between pt-1.5 border-t border-black/[0.05] mt-1">
                        <span className="text-[0.58rem] font-semibold tracking-[0.1em] uppercase text-[#2587a8]">
                          {svc.short}
                        </span>
                        <span className="text-[0.56rem] font-medium text-black/25 italic">
                          {!modalService ? "Tap to learn more →" : ""}
                        </span>
                      </div>
                    </div>

                    <div className="svc-card-bar" />
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {modalService && (
        <div
          className={`modal-backdrop ${modalVisible ? "visible" : ""}`}
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div
            className={`modal-box ${modalVisible ? "visible" : ""}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close" onClick={closeModal} aria-label="Close modal">
              <X size={17} strokeWidth={2.5} />
            </button>

            <div className="modal-hero">
              <img
                src={modalService.image}
                alt={`${modalService.title} — Xfactor`}
                width="780"
                height="300"
              />
              <div className="modal-hero-fade" />
            </div>

            <div className="modal-scroll p-5 sm:p-8">
              <span className="modal-big-num">{modalService.id}</span>

              <p className="text-[0.6rem] font-bold tracking-[0.18em] uppercase text-[#2587a8] mb-2">
                {modalService.short}
              </p>

              <h2
                id="modal-title"
                className="svc-bebas text-[#111] leading-[1] tracking-[0.03em] mb-3"
                style={{ fontSize: "clamp(2rem,5vw,3rem)" }}
              >
                {modalService.title}
              </h2>

              <div className="h-px bg-[#2587a8]/15 mb-4" />

              <p className="text-sm sm:text-[0.9rem] leading-[1.85] text-black/55 font-light mb-3.5">
                {modalService.description}
              </p>

              <p className="text-sm leading-[1.85] text-black/38 font-light mb-5">
                {modalService.detail}
              </p>

              <div className="flex flex-wrap gap-2">
                {modalService.keywords.split(", ").map((kw) => (
                  <span
                    key={kw}
                    className="text-[0.56rem] font-semibold tracking-[0.1em] uppercase text-[#2587a8] px-3 py-1 border border-[#2587a8]/25 rounded-full"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}