import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

type LoadingScreenProps = {
  onComplete: () => void;
};

type Particle = {
  x: number;
  y: number;
  originX: number;
  originY: number;
  targetX: number;
  targetY: number;
  seed: number;
  orbit: number;
};

type SignatureLayout = {
  x: number;
  y: number;
  width: number;
};

const TOTAL_DURATION = 5600;
const TEXT_FORM_START = 650;
const TEXT_FORM_END = 2200;
const TEXT_HOLD_START = 2200;
const SIGNATURE_START = 3200;
const DISSOLVE_START = 4650;
const PARTICLE_COUNT = 660;
const SIGNATURE_WIDTH = 310;
const TAGLINE_LINES = ["DESIGNING CLARITY", "FROM COMPLEXITY"];

function clamp01(value: number) {
  return Math.max(0, Math.min(1, value));
}

function easeInOutCubic(value: number) {
  return value < 0.5
    ? 4 * value * value * value
    : 1 - Math.pow(-2 * value + 2, 3) / 2;
}

function easeOutExpo(value: number) {
  return value === 1 ? 1 : 1 - Math.pow(2, -10 * value);
}

function getSignatureLayout(width: number, height: number): SignatureLayout {
  const signatureWidth = Math.min(SIGNATURE_WIDTH, width * 0.6);

  return {
    x: width / 2 - signatureWidth / 2,
    y: height / 2 + Math.min(170, height * 0.27),
    width: signatureWidth,
  };
}

function fitTextSize(
  context: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  startSize: number,
) {
  let fontSize = startSize;

  while (fontSize > 20) {
    context.font = `600 ${fontSize}px Inter, sans-serif`;
    if (context.measureText(text).width <= maxWidth) {
      return fontSize;
    }
    fontSize -= 2;
  }

  return fontSize;
}

function getTaglineTypography(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
) {
  const maxTextWidth = width * 0.82;
  const startSize = Math.max(30, Math.min(76, width * 0.074));
  const fontSize = Math.min(
    ...TAGLINE_LINES.map((line) => fitTextSize(context, line, maxTextWidth, startSize)),
  );
  const lineHeight = fontSize * 1.34;
  const centerY = height / 2 - Math.min(46, height * 0.07);

  return {
    fontSize,
    lineHeight,
    yPositions: [
      centerY - lineHeight / 2,
      centerY + lineHeight / 2,
    ],
  };
}

function drawTaglineText(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  alpha: number,
) {
  const { fontSize, yPositions } = getTaglineTypography(context, width, height);

  context.font = `600 ${fontSize}px Inter, sans-serif`;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillStyle = `rgba(255,255,255,${alpha})`;
  context.letterSpacing = "3px";
  TAGLINE_LINES.forEach((line, index) => {
    context.fillText(line, width / 2, yPositions[index]);
  });
}

function sampleTaglinePoints(width: number, height: number) {
  const offscreen = document.createElement("canvas");
  const context = offscreen.getContext("2d", { willReadFrequently: true });
  if (!context) {
    return [];
  }

  offscreen.width = Math.max(320, Math.floor(width));
  offscreen.height = Math.max(300, Math.floor(height * 0.56));
  context.clearRect(0, 0, offscreen.width, offscreen.height);

  const { fontSize, yPositions } = getTaglineTypography(
    context,
    offscreen.width,
    offscreen.height,
  );

  context.font = `600 ${fontSize}px Inter, sans-serif`;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillStyle = "#fff";
  context.letterSpacing = "3px";
  TAGLINE_LINES.forEach((line, index) => {
    context.fillText(line, offscreen.width / 2, yPositions[index]);
  });

  const imageData = context.getImageData(0, 0, offscreen.width, offscreen.height);
  const points: Array<{ x: number; y: number }> = [];
  const step = Math.max(4, Math.floor(fontSize / 10));
  const offsetX = (width - offscreen.width) / 2;
  const offsetY = height / 2 - offscreen.height / 2 - Math.min(12, height * 0.02);

  for (let y = 0; y < offscreen.height; y += step) {
    for (let x = 0; x < offscreen.width; x += step) {
      const alpha = imageData.data[(y * offscreen.width + x) * 4 + 3];
      if (alpha > 90) {
        points.push({ x: x + offsetX, y: y + offsetY });
      }
    }
  }

  return points;
}

function createParticles(width: number, height: number) {
  const taglinePoints = sampleTaglinePoints(width, height);
  const fallbackPoints = Array.from({ length: PARTICLE_COUNT }, (_, index) => {
    const x =
      width / 2 -
      Math.min(width * 0.38, 360) +
      (index / PARTICLE_COUNT) * Math.min(width * 0.76, 720);
    return {
      x,
      y:
        height / 2 -
        Math.min(46, height * 0.07) +
        (index % 2 === 0 ? -24 : 24) +
        Math.sin(index * 0.16) * 18,
    };
  });

  const targets = taglinePoints.length > 0 ? taglinePoints : fallbackPoints;

  return Array.from({ length: PARTICLE_COUNT }, (_, index): Particle => {
    const target = targets[Math.floor((index / PARTICLE_COUNT) * targets.length)];
    const originX = Math.random() * width;
    const originY = Math.random() * height;

    return {
      x: originX,
      y: originY,
      originX,
      originY,
      targetX: target.x + (Math.random() - 0.5) * 1.5,
      targetY: target.y + (Math.random() - 0.5) * 1.5,
      seed: Math.random() * Math.PI * 2,
      orbit: 28 + Math.random() * 96,
    };
  });
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const completeRef = useRef(onComplete);
  const [signatureLayout, setSignatureLayout] = useState<SignatureLayout>(() =>
    typeof window === "undefined"
      ? { x: 0, y: 0, width: SIGNATURE_WIDTH }
      : getSignatureLayout(window.innerWidth, window.innerHeight),
  );

  useEffect(() => {
    completeRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d", { alpha: false });
    if (!context) {
      return;
    }

    let animationFrame = 0;
    let completed = false;
    let width = 0;
    let height = 0;
    let devicePixelRatio = 1;
    let particles: Particle[] = [];

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * devicePixelRatio);
      canvas.height = Math.floor(height * devicePixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
      particles = createParticles(width, height);
      setSignatureLayout(getSignatureLayout(width, height));
    };

    resize();
    window.addEventListener("resize", resize);

    const start = performance.now();

    const draw = (time: number) => {
      const elapsed = time - start;
      const formProgress = easeInOutCubic(
        clamp01((elapsed - TEXT_FORM_START) / (TEXT_FORM_END - TEXT_FORM_START)),
      );
      const dissolve = 1 - clamp01((elapsed - DISSOLVE_START) / 520);
      const holdGlow = clamp01((elapsed - TEXT_HOLD_START) / 420);
      const staticStrength = 1 - clamp01(elapsed / TEXT_FORM_END);

      context.fillStyle = "#000";
      context.fillRect(0, 0, width, height);

      context.save();
      context.globalAlpha = 0.32 * staticStrength * dissolve;
      context.fillStyle = "#fff";
      for (let i = 0; i < 95; i += 1) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const lineWidth = 6 + Math.random() * 52;
        context.fillRect(x, y, lineWidth, 1);
      }
      context.restore();

      const centerX = width / 2;
      const centerY = height / 2;

      particles.forEach((particle, index) => {
        const chaosTime = time * 0.00175 + particle.seed;
        const swirlX =
          centerX +
          Math.cos(chaosTime + index * 0.015) *
            (particle.orbit + Math.sin(chaosTime * 0.7) * 28) +
          (particle.originX - centerX) * 0.62;
        const swirlY =
          centerY +
          Math.sin(chaosTime * 1.22 + index * 0.019) *
            (particle.orbit * 0.72 + Math.cos(chaosTime * 0.52) * 22) +
          (particle.originY - centerY) * 0.62;

        const jitter = Math.max(0, 1 - formProgress) * 12;
        const targetX = particle.targetX + Math.cos(chaosTime * 2.1) * jitter;
        const targetY = particle.targetY + Math.sin(chaosTime * 2.4) * jitter;
        const eased = easeOutExpo(formProgress);
        const x = swirlX + (targetX - swirlX) * eased;
        const y = swirlY + (targetY - swirlY) * eased;
        const radius = 1.05 + (1 - formProgress) * 0.9;
        const alpha =
          (0.42 + formProgress * 0.48 + holdGlow * 0.15) * dissolve;

        context.beginPath();
        context.fillStyle = `rgba(255,255,255,${alpha})`;
        context.arc(x, y, radius, 0, Math.PI * 2);
        context.fill();

        if (formProgress > 0.74 && index % 10 === 0) {
          context.beginPath();
          context.fillStyle = `rgba(137,170,204,${0.18 * dissolve})`;
          context.arc(x, y, radius * 2.7, 0, Math.PI * 2);
          context.fill();
        }
      });

      if (elapsed > TEXT_FORM_END - 260 && elapsed < DISSOLVE_START) {
        const textAlpha =
          clamp01((elapsed - (TEXT_FORM_END - 260)) / 520) * 0.1 * dissolve;
        drawTaglineText(context, width, height, textAlpha);
      }

      if (elapsed < TOTAL_DURATION) {
        animationFrame = requestAnimationFrame(draw);
      } else if (!completed) {
        completed = true;
        completeRef.current();
      }
    };

    animationFrame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] overflow-hidden bg-black"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <canvas ref={canvasRef} className="absolute inset-0" />

      <motion.div
        className="fixed text-white"
        initial={{ x: signatureLayout.x, y: signatureLayout.y, opacity: 0 }}
        animate={{ opacity: [0, 0, 1, 1, 0] }}
        transition={{
          times: [0, SIGNATURE_START / TOTAL_DURATION, 0.77, 0.93, 1],
          duration: TOTAL_DURATION / 1000,
          ease: "easeOut",
        }}
        style={{ width: signatureLayout.width }}
      >
        <svg
          viewBox="0 0 739 327"
          className="h-auto w-full overflow-visible drop-shadow-[0_0_18px_rgba(255,255,255,0.24)]"
          aria-hidden="true"
        >
          <motion.path
            d="M46 196 C115 179 174 159 226 134 C300 98 375 52 458 20"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="6"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              delay: SIGNATURE_START / 1000,
              duration: 0.82,
              ease: [0.65, 0, 0.35, 1],
            }}
          />
          <motion.path
            d="M108 74 C117 145 111 236 151 278 C168 296 176 256 185 219 C194 182 204 127 229 131 C257 136 270 213 278 278 C284 237 280 176 310 153 C330 138 350 148 372 146"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="7"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              delay: SIGNATURE_START / 1000 + 0.1,
              duration: 1.18,
              ease: [0.65, 0, 0.35, 1],
            }}
          />
          <motion.path
            d="M306 153 C355 141 401 143 439 159 C473 174 495 196 494 223 C493 253 463 272 426 277 C397 281 379 273 377 247 C375 213 388 169 405 147 C414 136 430 131 447 133"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="7"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              delay: SIGNATURE_START / 1000 + 0.25,
              duration: 1.08,
              ease: [0.65, 0, 0.35, 1],
            }}
          />
        </svg>
      </motion.div>
    </motion.div>
  );
}
