import React, { useEffect, useRef } from 'react';

const TICKER_TEXT = "WE PUT SOCIAL AT THE CENTER OF EVERYTHING WE DO.";

const Hero = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.volume = 0;
    video.setAttribute('playsinline', 'true');
    video.setAttribute('webkit-playsinline', 'true');

    const playVideo = async () => {
      try {
        await video.play();
      } catch {
        const enable = async () => {
          try { await video.play(); } catch {}
          document.removeEventListener('click', enable);
          document.removeEventListener('touchstart', enable);
        };
        document.addEventListener('click', enable, { once: true });
        document.addEventListener('touchstart', enable, { once: true });
      }
    };
    setTimeout(playVideo, 1000);
  }, []);

  const repeated = Array(8).fill(TICKER_TEXT);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@800&display=swap');

        @keyframes ticker-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ticker-track {
          display: flex;
          width: max-content;
          animation: ticker-scroll 22s linear infinite;
          will-change: transform;
        }
        .ticker-track:hover {
          animation-play-state: paused;
        }
        .ticker-item {
          display: flex;
          align-items: center;
          white-space: nowrap;
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: clamp(0.85rem, 1.4vw, 1.1rem);
          letter-spacing: 0.06em;
          color: #ffffff;
          padding: 0 1.25rem;
          text-transform: uppercase;
        }
        .ticker-dot {
          display: inline-block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #c8f04a;
          margin-left: 1.5rem;
          flex-shrink: 0;
        }
      `}</style>

      {/* Video hero — h-[50vh] keeps it half the viewport */}
      <div className="relative w-full h-[50vh] min-h-[300px] overflow-hidden bg-black">
        <video
          ref={videoRef}
          src="/media/home.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          controls={false}
          crossOrigin="anonymous"
          disablePictureInPicture
          disableRemotePlayback
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/50 to-transparent z-10" />
      </div>

      {/* Scrolling ticker bar */}
      <div className="w-full overflow-hidden py-3.5 border-y border-white/10" style={{ background: '#7B2FBE' }}>
        <div className="ticker-track">
          {[...repeated, ...repeated].map((text, i) => (
            <span key={i} className="ticker-item">
              {text}
              <span className="ticker-dot" />
            </span>
          ))}
        </div>
      </div>
    </>
  );
};

export default Hero;