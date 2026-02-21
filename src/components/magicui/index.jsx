import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

/**
 * Magic UI – Shimmer Button
 * A button with an animated shimmer border effect.
 */
export function ShimmerButton({
  children,
  className,
  shimmerColor = "#ffffff",
  shimmerSize = "0.05em",
  shimmerDuration = "3s",
  borderRadius = "100px",
  background = "rgba(0, 0, 0, 1)",
  ...props
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap border border-white/10 px-6 py-3 text-white [background:var(--bg)] [border-radius:var(--radius)]",
        "transform-gpu transition-all duration-300 ease-in-out active:translate-y-px",
        className
      )}
      style={{
        "--radius": borderRadius,
        "--bg": background,
      }}
      {...props}
    >
      {/* Shimmer overlay */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ borderRadius: "inherit" }}
      >
        <div
          className="absolute inset-[-100%] animate-shimmer"
          style={{
            background: `conic-gradient(from 90deg at 50% 50%, #0000 50%, ${shimmerColor} 50%)`,
            opacity: 0.4,
          }}
        />
      </div>
      <span className="relative z-10 text-sm font-semibold">{children}</span>
    </motion.button>
  );
}

/**
 * Magic UI – Border Beam
 * Adds an animated beam that travels along the border of a container.
 */
export function BorderBeam({
  className,
  size = 200,
  duration = 15,
  anchor = 90,
  borderWidth = 1.5,
  colorFrom = "#ffaa40",
  colorTo = "#9c40ff",
  delay = 0,
}) {
  return (
    <div
      style={{
        "--size": size,
        "--duration": duration,
        "--anchor": anchor,
        "--border-width": borderWidth,
        "--color-from": colorFrom,
        "--color-to": colorTo,
        "--delay": `-${delay}s`,
      }}
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit] [border:calc(var(--border-width)*1px)_solid_transparent]",
        "[background:linear-gradient(transparent,transparent),linear-gradient(to_right,var(--color-from),var(--color-to))] [background-clip:padding-box,border-box] [background-origin:border-box]",
        "[mask-clip:padding-box,border-box] [mask-composite:intersect] [mask:linear-gradient(transparent,transparent),linear-gradient(white,white)]",
        "animate-border-beam",
        className
      )}
    />
  );
}

/**
 * Magic UI – Meteors
 * Animated falling meteor streaks.
 */
export function Meteors({ number = 20, className }) {
  const meteors = Array.from({ length: number });

  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      {meteors.map((_, i) => (
        <span
          key={i}
          className="animate-meteor absolute h-0.5 w-0.5 rotate-[215deg] rounded-full bg-slate-500 shadow-[0_0_0_1px_#ffffff10]"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 0.6 + 0.2}s`,
            animationDuration: `${Math.random() * 8 + 2}s`,
          }}
        >
          <span className="absolute top-1/2 -z-10 h-[1px] w-[50px] -translate-y-1/2 bg-gradient-to-r from-slate-500 to-transparent" />
        </span>
      ))}
    </div>
  );
}

/**
 * Magic UI – Ripple
 * Concentric animated ripple rings.
 */
export function Ripple({ mainCircleSize = 210, mainCircleOpacity = 0.24, numCircles = 8, className }) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 flex items-center justify-center select-none",
        className
      )}
    >
      {Array.from({ length: numCircles }, (_, i) => {
        const size = mainCircleSize + i * 70;
        const opacity = mainCircleOpacity - i * 0.03;
        const animationDelay = `${i * 0.06}s`;
        const border = i === numCircles - 1 ? "none" : "1px solid hsl(var(--border))";

        return (
          <div
            key={i}
            className={cn("absolute rounded-full bg-foreground/5 animate-ripple shadow-xl")}
            style={{
              width: `${size}px`,
              height: `${size}px`,
              opacity,
              animationDelay,
              border,
              "--i": i,
            }}
          />
        );
      })}
    </div>
  );
}

/**
 * Magic UI – Animated Gradient Text
 */
export function AnimatedGradientText({ children, className }) {
  return (
    <span
      className={cn(
        "inline-block bg-gradient-to-r from-violet-500 via-pink-500 to-orange-400 bg-clip-text text-transparent animate-shimmer-text",
        className
      )}
    >
      {children}
    </span>
  );
}

/**
 * Magic UI – Blur Fade
 * Fades in content from below with a blur effect.
 */
export function BlurFade({ children, className, delay = 0, inView = true }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, filter: "blur(12px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Magic UI – Number Ticker
 * Animates a number from 0 to target value.
 */
export function NumberTicker({ value, className, decimalPlaces = 0 }) {
  return (
    <motion.span
      className={cn("inline-block tabular-nums", className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {value.toFixed(decimalPlaces)}
      </motion.span>
    </motion.span>
  );
}
