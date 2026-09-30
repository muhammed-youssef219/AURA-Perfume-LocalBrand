import * as React from "react";
import { Link } from "@tanstack/react-router";
import { Sparkles, ArrowLeft } from "lucide-react";
import { PerfumeFinderModal } from "./PerfumeFinderModal";

export function HeroSection() {
  const [isQuizOpen, setIsQuizOpen] = React.useState(false);
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const videoRef = React.useRef<HTMLVideoElement | null>(null);

  // Guarantee video autoplay
  React.useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  // Subtle floating golden dust / particle animation
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", handleResize);

    // Particle setup
    const particleCount = 45;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.2 + 0.8,
      speedY: Math.random() * 0.4 + 0.15,
      speedX: (Math.random() - 0.5) * 0.25,
      opacity: Math.random() * 0.7 + 0.3,
      pulseSpeed: Math.random() * 0.02 + 0.01,
      pulseVal: Math.random() * Math.PI,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y -= p.speedY;
        p.x += p.speedX;
        p.pulseVal += p.pulseSpeed;

        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        const currentOpacity = p.opacity * (0.6 + 0.4 * Math.sin(p.pulseVal));

        // Draw glowing golden particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(234, 179, 8, ${currentOpacity})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = "rgba(234, 179, 8, 0.9)";
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="relative min-h-[90vh] sm:min-h-[85vh] w-full overflow-hidden flex flex-col justify-end items-center pb-12 sm:pb-16 bg-black text-white">
      {/* Full-Detail Video Presentation - Zero Zoom & Zero Crop */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-black flex items-center justify-center">
        <video
          ref={videoRef}
          src="/hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          disablePictureInPicture
          disableRemotePlayback
          className="w-full h-full max-h-[88vh] object-contain object-center pointer-events-none select-none"
        />

        {/* Subtle Vignette for button contrast only */}
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />
      </div>

      {/* Interactive Golden Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-[1] w-full h-full pointer-events-none"
      />

      {/* Action Buttons Overlay - Side by Side at Bottom on Mobile & Desktop */}
      <div className="relative z-10 mx-auto w-full max-w-lg sm:max-w-xl px-3 sm:px-4 flex flex-row items-center justify-center gap-2 sm:gap-4">
        <Link
          to="/shop"
          className="group relative flex-1 inline-flex items-center justify-center gap-1.5 sm:gap-2.5 overflow-hidden rounded-md bg-gradient-to-r from-amber-500 to-amber-600 px-3 py-3.5 sm:px-7 sm:py-4 text-xs sm:text-sm font-bold text-black shadow-[0_0_25px_rgba(234,179,8,0.4)] transition-all duration-300 hover:scale-105 hover:from-amber-400 hover:to-amber-500 hover:shadow-[0_0_35px_rgba(234,179,8,0.6)] active:scale-95 text-center"
        >
          <span className="truncate">تسوّق المجموعة الملكية</span>
          <ArrowLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 transition-transform duration-300 group-hover:-translate-x-1" />
        </Link>

        <button
          type="button"
          onClick={() => setIsQuizOpen(true)}
          className="flex-1 inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-md border border-amber-400/50 bg-black/60 px-3 py-3.5 sm:px-7 sm:py-4 text-xs sm:text-sm font-bold text-amber-300 backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-amber-400 hover:bg-amber-500/20 hover:scale-105 active:scale-95 text-center"
        >
          <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 text-amber-400 animate-spin" style={{ animationDuration: '4s' }} />
          <span className="truncate">مستشار العطور الذكي</span>
        </button>
      </div>

      {/* Subtle bottom gradient to blend into content */}
      <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-background to-transparent pointer-events-none" />

      {/* Perfume Finder Quiz Modal */}
      <PerfumeFinderModal isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
    </section>
  );
}

