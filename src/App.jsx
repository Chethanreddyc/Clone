import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Zap, Layers, ArrowRight, Star, Github } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ShimmerButton,
  BorderBeam,
  Meteors,
  Ripple,
  AnimatedGradientText,
  BlurFade,
  NumberTicker,
} from "@/components/magicui";

import "./index.css";

const features = [
  {
    icon: Sparkles,
    title: "Magic UI",
    description: "Beautiful animated components like shimmer buttons, border beams, meteors, and ripple effects out of the box.",
    color: "from-violet-500 to-purple-600",
  },
  {
    icon: Layers,
    title: "shadcn/ui",
    description: "Copy-paste accessible component primitives built on Radix UI. Completely customizable with your own design tokens.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Zap,
    title: "Motion",
    description: "Production-ready animations powered by Framer Motion. Spring physics, gesture support, and layout animations.",
    color: "from-orange-500 to-pink-500",
  },
];

const stats = [
  { label: "Components", value: 50, suffix: "+" },
  { label: "Animations", value: 120, suffix: "+" },
  { label: "Downloads", value: 99, suffix: "K" },
  { label: "Stars", value: 15, suffix: "K" },
];

export default function App() {
  const [activeCard, setActiveCard] = useState(null);
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-background text-foreground transition-colors duration-300">

        {/* ── Navbar ───────────────────────────────────── */}
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl"
        >
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-pink-500">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold">StackKit</span>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" className="gap-2">
                <Github className="h-4 w-4" /> GitHub
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setDarkMode(!darkMode)}
              >
                {darkMode ? "☀️ Light" : "🌙 Dark"}
              </Button>
            </div>
          </div>
        </motion.nav>

        {/* ── Hero ─────────────────────────────────────── */}
        <section className="relative overflow-hidden px-6 py-32 text-center">
          {/* Background effects */}
          <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-60" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-violet-500/5 via-transparent to-transparent" />
          <Ripple className="opacity-30" />

          <div className="relative z-10 mx-auto max-w-4xl">
            <BlurFade delay={0.1}>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-sm text-violet-400">
                <Star className="h-3.5 w-3.5" />
                <span>Vite + React + Magic UI + shadcn + Motion</span>
              </div>
            </BlurFade>

            <BlurFade delay={0.2}>
              <h1 className="mb-6 text-5xl font-black leading-tight tracking-tight sm:text-7xl">
                Build{" "}
                <AnimatedGradientText>stunning</AnimatedGradientText>{" "}
                UIs faster
              </h1>
            </BlurFade>

            <BlurFade delay={0.3}>
              <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground">
                Your project is pre-configured with the best React UI stack —
                Magic UI for animations, shadcn/ui for components, and Framer Motion
                for physics-based interactions.
              </p>
            </BlurFade>

            <BlurFade delay={0.4}>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <ShimmerButton
                  className="px-8 py-3 text-base"
                  background="linear-gradient(135deg, #7c3aed, #db2777)"
                >
                  <span className="flex items-center gap-2">
                    Get Started <ArrowRight className="h-4 w-4" />
                  </span>
                </ShimmerButton>

                <Button variant="outline" size="lg" className="gap-2 text-base">
                  View Components
                </Button>
              </div>
            </BlurFade>
          </div>
        </section>

        {/* ── Stats Bar ────────────────────────────────── */}
        <section className="border-y border-border/40 bg-muted/30 px-6 py-12">
          <div className="mx-auto grid max-w-4xl grid-cols-2 gap-8 sm:grid-cols-4">
            {stats.map((stat, i) => (
              <BlurFade key={stat.label} delay={0.1 * i}>
                <div className="text-center">
                  <div className="text-4xl font-black tabular-nums text-foreground">
                    <NumberTicker value={stat.value} />
                    {stat.suffix}
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
                </div>
              </BlurFade>
            ))}
          </div>
        </section>

        {/* ── Features ─────────────────────────────────── */}
        <section className="px-6 py-24">
          <div className="mx-auto max-w-6xl">
            <BlurFade delay={0.1}>
              <div className="mb-16 text-center">
                <h2 className="mb-4 text-4xl font-bold tracking-tight">Everything you need</h2>
                <p className="text-muted-foreground">Three powerful libraries, one cohesive stack.</p>
              </div>
            </BlurFade>

            <div className="grid gap-6 sm:grid-cols-3">
              {features.map((feature, i) => (
                <BlurFade key={feature.title} delay={0.15 * (i + 1)}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    onClick={() => setActiveCard(activeCard === i ? null : i)}
                    className="cursor-pointer"
                  >
                    <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/10">
                      <BorderBeam
                        colorFrom="#7c3aed"
                        colorTo="#db2777"
                        duration={6 + i * 2}
                        delay={i * 1.5}
                      />
                      <CardHeader>
                        <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.color}`}>
                          <feature.icon className="h-6 w-6 text-white" />
                        </div>
                        <CardTitle>{feature.title}</CardTitle>
                        <CardDescription>{feature.description}</CardDescription>
                      </CardHeader>
                      <AnimatePresence>
                        {activeCard === i && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <CardContent>
                              <div className="rounded-lg bg-muted p-3 font-mono text-xs text-muted-foreground">
                                {feature.title === "Magic UI" && "import { ShimmerButton, Meteors } from '@/components/magicui'"}
                                {feature.title === "shadcn/ui" && "import { Button, Card } from '@/components/ui'"}
                                {feature.title === "Motion" && "import { motion } from 'framer-motion'"}
                              </div>
                            </CardContent>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Card>
                  </motion.div>
                </BlurFade>
              ))}
            </div>
          </div>
        </section>

        {/* ── Meteor Banner ────────────────────────────── */}
        <section className="px-6 py-16">
          <div className="mx-auto max-w-4xl">
            <BlurFade delay={0.2}>
              <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-violet-950 via-slate-900 to-pink-950 px-8 py-16 text-center text-white shadow-2xl">
                <Meteors number={15} />
                <div className="relative z-10">
                  <h2 className="mb-4 text-4xl font-black">Ready to build?</h2>
                  <p className="mb-8 text-slate-300">
                    Your dev environment is ready. Start editing{" "}
                    <code className="rounded bg-white/10 px-2 py-0.5 font-mono text-sm text-violet-300">
                      src/App.jsx
                    </code>{" "}
                    to begin.
                  </p>
                  <ShimmerButton
                    background="rgba(255,255,255,0.15)"
                    shimmerColor="#ffffff"
                    className="mx-auto px-8 py-3 text-base font-semibold"
                  >
                    Start Building →
                  </ShimmerButton>
                </div>
              </div>
            </BlurFade>
          </div>
        </section>

        {/* ── Footer ───────────────────────────────────── */}
        <footer className="border-t border-border/40 px-6 py-8 text-center text-sm text-muted-foreground">
          <p>
            Built with{" "}
            <span className="font-semibold text-foreground">Vite + React</span> ·{" "}
            <AnimatedGradientText className="text-sm font-semibold">
              Magic UI · shadcn/ui · Framer Motion
            </AnimatedGradientText>
          </p>
        </footer>
      </div>
    </div>
  );
}
