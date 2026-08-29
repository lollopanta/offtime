interface EnvironmentalOverlaysProps {
  progress: number;
}

function getFireOpacity(progress: number): number {
  if (progress < 0.1) {
    return Math.max(0, Math.min(1, progress / 0.1));
  }
  if (progress < 0.33) {
    return 1;
  }
  return Math.max(0, Math.min(1, 1 - (progress - 0.33) / 0.08));
}

function getShadowOpacity(progress: number): number {
  if (progress < 0.36) {
    return 0;
  }
  if (progress < 0.42) {
    return Math.max(0, Math.min(1, (progress - 0.36) / 0.06));
  }
  if (progress < 0.6) {
    return 1;
  }
  return Math.max(0, Math.min(1, 1 - (progress - 0.6) / 0.07));
}

function getCloudOpacity(progress: number): number {
  if (progress < 0.63) {
    return 0;
  }
  if (progress < 0.7) {
    return Math.max(0, Math.min(1, (progress - 0.63) / 0.07));
  }
  if (progress < 0.84) {
    return 1;
  }
  return Math.max(0, Math.min(1, 1 - (progress - 0.84) / 0.06));
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
        {/* Deep ambient red/orange radial glow behind slab */}
        <div className="absolute top-[25%] left-[5%] h-[600px] w-[600px] rounded-full bg-gradient-to-br from-[#c0392b]/25 via-[#e67e22]/15 to-transparent blur-[130px]" />
        <div className="absolute right-[5%] bottom-[15%] h-[400px] w-[400px] rounded-full bg-gradient-to-tr from-[#962d22]/20 to-transparent blur-[100px]" />

        {/* Abstract SVG fire curves and heat aura */}
        <svg
          aria-hidden="true"
          className="absolute inset-0 h-full w-full opacity-45 mix-blend-screen"
          preserveAspectRatio="none"
          viewBox="0 0 1440 900"
        >
          <title>Flames ambience</title>
          <defs>
            <linearGradient id="fireGrad1" x1="0%" x2="100%" y1="100%" y2="0%">
              <stop offset="0%" stopColor="#c0392b" stopOpacity="0" />
              <stop offset="50%" stopColor="#e67e22" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#f39c12" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="fireGrad2" x1="100%" x2="0%" y1="100%" y2="0%">
              <stop offset="0%" stopColor="#962d22" stopOpacity="0" />
              <stop offset="60%" stopColor="#d35400" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#e74c3c" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Flowing thermal currents */}
          <path
            d="M 150,900 C 250,700 350,550 320,300 C 300,100 450,50 600,0"
            fill="none"
            stroke="url(#fireGrad1)"
            strokeDasharray="8 12"
            strokeWidth="2.5"
          />
          <path
            d="M 50,900 C 150,750 250,500 330,250 C 390,50 550,-50 750,-50"
            fill="none"
            stroke="url(#fireGrad2)"
            strokeWidth="1.5"
          />
          <path
            d="M 400,900 C 500,650 550,450 520,200 C 500,50 650,-20 900,-50"
            fill="none"
            stroke="url(#fireGrad1)"
            strokeWidth="1"
          />
        </svg>

        {/* Floating subtle ember dots */}
        <div className="absolute top-[35%] left-[20%] h-1.5 w-1.5 rounded-full bg-[#f39c12] opacity-75 shadow-[0_0_8px_#f39c12]" />
        <div className="absolute top-[20%] left-[12%] h-1 w-1 rounded-full bg-[#e67e22] opacity-60 shadow-[0_0_6px_#e67e22]" />
        <div className="absolute top-[50%] left-[28%] h-1 w-1 rounded-full bg-[#f1c40f] opacity-50 shadow-[0_0_5px_#f1c40f]" />
      </div>

      {/* 2. SHADOW / GENGAR PSYCHIC AMBIENCE */}
      <div
        className="absolute inset-0 transition-opacity duration-700 ease-out"
        style={{ opacity: shadowOpacity }}
      >
        {/* Deep violet & OFFTIME pink psychic aura focused behind Gengar */}
        <div className="absolute top-[18%] right-[8%] h-[650px] w-[650px] rounded-full bg-gradient-to-br from-[#8b68d7]/30 via-[#ef75aa]/20 to-transparent blur-[140px]" />
        <div className="absolute top-[35%] left-[5%] h-[450px] w-[450px] rounded-full bg-gradient-to-tr from-[#4658ad]/20 via-[#8b68d7]/10 to-transparent blur-[120px]" />

        {/* Psychic Resonance Waves & Hypnotic Rings centered around Gengar (Right side) */}
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

          {/* Concentric undulating psychic resonance rings around Gengar (center ~ 1080, 420) */}
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

          {/* Flowing psychic frequency sine wave curves */}
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
          <path
            d="M 300,850 C 600,720 900,820 1150,600 C 1300,460 1380,500 1440,450"
            fill="none"
            stroke="url(#psychicGrad)"
            strokeWidth="1"
          />
        </svg>

        {/* Floating psychic aura orbs */}
        <div className="absolute top-[28%] right-[22%] h-2 w-2 rounded-full bg-[#ef75aa] opacity-70 shadow-[0_0_12px_#ef75aa]" />
        <div className="absolute top-[48%] right-[14%] h-1.5 w-1.5 rounded-full bg-[#8b68d7] opacity-60 shadow-[0_0_10px_#8b68d7]" />
        <div className="absolute top-[62%] right-[26%] h-2 w-2 rounded-full bg-[#7185ff] opacity-50 shadow-[0_0_10px_#7185ff]" />
      </div>

      {/* 3. CLOUD / GEAR 5 NIKA FREEDOM AMBIENCE */}
      <div
        className="absolute inset-0 transition-opacity duration-700 ease-out"
        style={{ opacity: cloudOpacity }}
      >
        {/* Soft airy platinum diffused highlights behind Luffy (Left side) */}
        <div className="absolute top-[18%] left-[8%] h-[650px] w-[650px] rounded-full bg-gradient-to-br from-[#94a3b8]/25 via-[#64748b]/15 to-transparent blur-[130px]" />
        <div className="absolute top-[35%] right-[5%] h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-[#38bdf8]/12 via-[#cbd5e1]/10 to-transparent blur-[110px]" />

        {/* Stylized Gear 5 Hagoromo Cloud Ribbons & Swirling Cloud Curls */}
        <svg
          aria-hidden="true"
          className="absolute inset-0 h-full w-full opacity-60 mix-blend-screen"
          preserveAspectRatio="none"
          viewBox="0 0 1440 900"
        >
          <title>Nika cloud ambience</title>
          <defs>
            <linearGradient
              id="cloudRibbon1"
              x1="0%"
              x2="100%"
              y1="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
              <stop offset="40%" stopColor="#e2e8f0" stopOpacity="0.6" />
              <stop offset="80%" stopColor="#94a3b8" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="cloudRibbon2"
              x1="100%"
              x2="0%"
              y1="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#cbd5e1" stopOpacity="0.7" />
              <stop offset="50%" stopColor="#94a3b8" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient
              id="cloudPuffGrad"
              x1="0%"
              x2="0%"
              y1="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#64748b" stopOpacity="0.03" />
            </linearGradient>
          </defs>

          {/* Stylized Gear 5 Hagoromo Cloud Ribbon loops around Luffy (~ 360, 420) */}
          <path
            d="M 120,520 C 180,320 280,240 420,270 C 560,300 580,480 460,580 C 340,680 180,620 160,450 C 140,280 320,160 520,190 C 720,220 850,380 980,320"
            fill="none"
            stroke="url(#cloudRibbon1)"
            strokeWidth="3"
          />
          <path
            d="M 180,580 C 240,400 340,320 460,350 C 580,380 590,520 490,620 C 390,720 250,680 220,520"
            fill="none"
            stroke="url(#cloudRibbon2)"
            strokeDasharray="10 8"
            strokeWidth="2"
          />

          {/* Layered swirling stylized cloud puffs */}
          <path
            d="M 80,380 C 110,340 160,330 190,360 C 230,320 290,330 310,370 C 350,360 390,390 380,430 C 400,470 370,510 330,510 C 310,540 260,540 230,520 C 190,540 140,520 130,480 C 90,480 70,440 80,380 Z"
            fill="url(#cloudPuffGrad)"
            stroke="url(#cloudRibbon1)"
            strokeWidth="1.2"
          />

          <path
            d="M 380,180 C 410,140 460,130 490,160 C 530,130 580,140 600,180 C 640,170 670,200 660,240 C 680,270 660,310 620,310 C 600,340 550,340 520,320 C 480,340 440,320 430,280 C 390,280 370,240 380,180 Z"
            fill="url(#cloudPuffGrad)"
            stroke="url(#cloudRibbon2)"
            strokeWidth="1"
          />

          {/* Sweeping freedom breeze trails */}
          <path
            d="M 50,220 C 300,140 600,320 900,180 C 1150,60 1320,180 1440,120"
            fill="none"
            stroke="url(#cloudRibbon1)"
            strokeWidth="2"
          />
          <path
            d="M 250,750 C 500,620 800,780 1100,640 C 1280,560 1380,620 1440,580"
            fill="none"
            stroke="url(#cloudRibbon2)"
            strokeDasharray="6 12"
            strokeWidth="1.5"
          />
        </svg>
      </div>
    </div>
  );
}
