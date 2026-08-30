interface EnvironmentalOverlaysProps {
  progress: number;
}

function getFireOpacity(progress: number): number {
  if (progress < 0.08) {
    return Math.max(0, Math.min(1, (progress - 0.04) / 0.08));
  }
  if (progress < 0.32) {
    return 1;
  }
  return Math.max(0, Math.min(1, 1 - (progress - 0.32) / 0.08));
}

function getShadowOpacity(progress: number): number {
  if (progress < 0.35) {
    return 0;
  }
  if (progress < 0.42) {
    return Math.max(0, Math.min(1, (progress - 0.35) / 0.07));
  }
  if (progress < 0.58) {
    return 1;
  }
  return Math.max(0, Math.min(1, 1 - (progress - 0.58) / 0.08));
}

function getCloudOpacity(progress: number): number {
  if (progress < 0.66) {
    return 0;
  }
  if (progress < 0.74) {
    return Math.max(0, Math.min(1, (progress - 0.66) / 0.08));
  }
  if (progress < 0.86) {
    return 1;
  }
  return Math.max(0, Math.min(1, 1 - (progress - 0.86) / 0.06));
}

export function EnvironmentalOverlays({
  progress,
}: EnvironmentalOverlaysProps) {
  const fireOpacity = getFireOpacity(progress);
  const shadowOpacity = getShadowOpacity(progress);
  const cloudOpacity = getCloudOpacity(progress);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* 1. FIRE / CHARIZARD AMBIENCE */}
      <div
        className="absolute inset-0 transition-opacity duration-700 ease-out"
        style={{ opacity: fireOpacity }}
      >
        {/* Deep ambient crimson & burnt orange radial glow */}
        <div className="absolute top-[20%] left-[2%] h-[650px] w-[650px] rounded-full bg-gradient-to-br from-[#c0392b]/30 via-[#d35400]/20 to-transparent blur-[140px]" />
        <div className="absolute right-[5%] bottom-[15%] h-[450px] w-[450px] rounded-full bg-gradient-to-tr from-[#962d22]/20 via-[#e67e22]/10 to-transparent blur-[110px]" />

        {/* Abstract SVG thermal currents */}
        <svg
          aria-hidden="true"
          className="absolute inset-0 h-full w-full opacity-50 mix-blend-screen"
          preserveAspectRatio="none"
          viewBox="0 0 1440 900"
        >
          <title>Flames ambience</title>
          <defs>
            <linearGradient id="fireGrad1" x1="0%" x2="100%" y1="100%" y2="0%">
              <stop offset="0%" stopColor="#c0392b" stopOpacity="0" />
              <stop offset="40%" stopColor="#e67e22" stopOpacity="0.5" />
              <stop offset="80%" stopColor="#f39c12" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#c0392b" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="fireGrad2" x1="100%" x2="0%" y1="100%" y2="0%">
              <stop offset="0%" stopColor="#962d22" stopOpacity="0" />
              <stop offset="50%" stopColor="#d35400" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#e74c3c" stopOpacity="0" />
            </linearGradient>
          </defs>

          <path
            d="M 120,900 C 220,700 320,550 280,300 C 260,100 420,50 580,0"
            fill="none"
            stroke="url(#fireGrad1)"
            strokeDasharray="8 12"
            strokeWidth="2.5"
          />
          <path
            d="M 30,900 C 130,750 220,500 300,250 C 360,50 520,-50 720,-50"
            fill="none"
            stroke="url(#fireGrad2)"
            strokeWidth="1.5"
          />
          <path
            d="M 380,900 C 480,650 520,450 490,200 C 470,50 620,-20 860,-50"
            fill="none"
            stroke="url(#fireGrad1)"
            strokeWidth="1"
          />
        </svg>

        {/* Floating subtle ember dots */}
        <div className="absolute top-[32%] left-[18%] h-1.5 w-1.5 rounded-full bg-[#f39c12] opacity-80 shadow-[0_0_10px_#f39c12]" />
        <div className="absolute top-[18%] left-[10%] h-1 w-1 rounded-full bg-[#e67e22] opacity-70 shadow-[0_0_8px_#e67e22]" />
        <div className="absolute top-[48%] left-[24%] h-1 w-1 rounded-full bg-[#f1c40f] opacity-60 shadow-[0_0_6px_#f1c40f]" />
      </div>

      {/* 2. SHADOW / GENGAR PSYCHIC AMBIENCE */}
      <div
        className="absolute inset-0 transition-opacity duration-700 ease-out"
        style={{ opacity: shadowOpacity }}
      >
        {/* Deep violet & OFFTIME pink aura behind Gengar (Right side) */}
        <div className="absolute top-[15%] right-[6%] h-[700px] w-[700px] rounded-full bg-gradient-to-br from-[#8b68d7]/35 via-[#ef75aa]/20 to-transparent blur-[150px]" />
        <div className="absolute top-[35%] left-[5%] h-[450px] w-[450px] rounded-full bg-gradient-to-tr from-[#4658ad]/20 via-[#8b68d7]/10 to-transparent blur-[120px]" />

        {/* Psychic Resonance Waves & Hypnotic Rings */}
        <svg
          aria-hidden="true"
          className="absolute inset-0 h-full w-full opacity-55 mix-blend-screen"
          preserveAspectRatio="none"
          viewBox="0 0 1440 900"
        >
          <title>Psychic shadow ambience</title>
          <defs>
            <linearGradient
              id="psychicGrad"
              x1="0%"
              x2="100%"
              y1="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#8b68d7" stopOpacity="0.8" />
              <stop offset="40%" stopColor="#ef75aa" stopOpacity="0.6" />
              <stop offset="75%" stopColor="#7185ff" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#8b68d7" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="psychicWaveGrad"
              x1="100%"
              x2="0%"
              y1="50%"
              y2="50%"
            >
              <stop offset="0%" stopColor="#ef75aa" stopOpacity="0.7" />
              <stop offset="50%" stopColor="#8b68d7" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#4658ad" stopOpacity="0" />
            </linearGradient>
          </defs>

          <ellipse
            cx="1080"
            cy="420"
            fill="none"
            rx="180"
            ry="260"
            stroke="url(#psychicGrad)"
            strokeDasharray="12 8"
            strokeWidth="2"
            transform="rotate(-12 1080 420)"
          />
          <ellipse
            cx="1080"
            cy="420"
            fill="none"
            rx="270"
            ry="380"
            stroke="url(#psychicGrad)"
            strokeDasharray="6 14"
            strokeWidth="1.5"
            transform="rotate(8 1080 420)"
          />
          <ellipse
            cx="1080"
            cy="420"
            fill="none"
            rx="360"
            ry="490"
            stroke="url(#psychicWaveGrad)"
            strokeWidth="1"
            transform="rotate(-5 1080 420)"
          />

          <path
            d="M 100,550 C 400,480 700,620 950,420 C 1100,300 1300,480 1440,380"
            fill="none"
            stroke="url(#psychicWaveGrad)"
            strokeWidth="2"
          />
          <path
            d="M 50,700 C 450,620 750,750 1020,520 C 1180,380 1350,560 1440,480"
            fill="none"
            stroke="url(#psychicWaveGrad)"
            strokeDasharray="4 8"
            strokeWidth="1.5"
          />
        </svg>

        {/* Floating psychic aura orbs */}
        <div className="absolute top-[28%] right-[22%] h-2 w-2 rounded-full bg-[#ef75aa] opacity-70 shadow-[0_0_12px_#ef75aa]" />
        <div className="absolute top-[48%] right-[14%] h-1.5 w-1.5 rounded-full bg-[#8b68d7] opacity-60 shadow-[0_0_10px_#8b68d7]" />
        <div className="absolute top-[62%] right-[26%] h-2 w-2 rounded-full bg-[#7185ff] opacity-50 shadow-[0_0_10px_#7185ff]" />
      </div>

      {/* 3. CLOUD / GEAR 5 NIKA AMBIENCE — Soft Pearl Smoke Gray */}
      <div
        className="absolute inset-0 transition-opacity duration-700 ease-out"
        style={{ opacity: cloudOpacity }}
      >
        {/* Soft diffused pearl & silver glow on atmospheric slate canvas */}
        <div className="absolute top-[15%] left-[5%] h-[700px] w-[700px] rounded-full bg-gradient-to-br from-[#cbd5e1]/15 via-[#94a3b8]/10 to-transparent blur-[140px]" />
        <div className="absolute top-[30%] right-[8%] h-[550px] w-[550px] rounded-full bg-gradient-to-tr from-[#38bdf8]/10 via-[#e2e8f0]/8 to-transparent blur-[120px]" />

        {/* Graphic Hagoromo cloud ribbons and floating mist */}
        <svg
          aria-hidden="true"
          className="absolute inset-0 h-full w-full opacity-45 mix-blend-screen"
          preserveAspectRatio="none"
          viewBox="0 0 1440 900"
        >
          <title>Nika cloud ambience</title>
          <defs>
            <linearGradient
              id="cloudStroke1"
              x1="0%"
              x2="100%"
              y1="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#cbd5e1" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          {/* Cloud ribbon loops around Luffy */}
          <path
            d="M 120,520 C 180,320 280,240 420,270 C 560,300 580,480 460,580 C 340,680 180,620 160,450 C 140,280 320,160 520,190 C 720,220 850,380 980,320"
            fill="none"
            stroke="url(#cloudStroke1)"
            strokeWidth="2.5"
          />

          {/* Sweeping breeze trails */}
          <path
            d="M 50,220 C 300,140 600,320 900,180 C 1150,60 1320,180 1440,120"
            fill="none"
            stroke="url(#cloudStroke1)"
            strokeWidth="1.5"
          />
        </svg>
      </div>
    </div>
  );
}
