"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const features = [
  {
    icon: "conversation",
    title: "Daily vocabulary",
    description: "Learn useful English words in short, focused sessions.",
  },
  {
    icon: "feedback",
    title: "A level that fits you",
    description: "Build your vocabulary step by step, from A1 through B2.",
  },
  {
    icon: "streak",
    title: "Daily streak",
    description: "Small daily practice beats rare long sessions.",
  },
];

function FeatureIcon({ name }: { name: string }) {
  if (name === "conversation") {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 11.2a7.2 7.2 0 0 1-7.5 7.2 8.8 8.8 0 0 1-3.7-.8L4 19l1.5-3.8A7.1 7.1 0 0 1 5 11.2 7.5 7.5 0 0 1 12.5 4 7.5 7.5 0 0 1 20 11.2Z" /><circle cx="9" cy="11.5" r="1" /><circle cx="13" cy="11.5" r="1" /><circle cx="17" cy="11.5" r="1" /></svg>;
  }
  if (name === "feedback") {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 4h12v12h-7l-4 4v-4H4V8a4 4 0 0 1 4-4Z" /><path d="M13 7.5 10.8 10h2.1l-1 2.5 2.3-2.8h-2.1l.9-2.2ZM17 13l1 1 2-2" /></svg>;
  }
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.2 2.8c.8 3.2-1.9 4.2-1.9 6.7 0 1.2.8 2 1.8 2 1.6 0 2.3-1.5 2-3.1 2.6 1.9 4.2 4.4 4.2 7.2a7.3 7.3 0 0 1-14.6 0c0-3.4 2-6.3 5.5-8.3-.3 2.7.4 3.9 1.5 3.9 1.4 0 1.8-1.5 1.5-3.1-.3-1.7-.7-3.1 0-5.3Z" /></svg>;
}

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <main className={`landing-page${darkMode ? " landing-dark" : ""}`}>
      <header className="landing-header">
        <Link className="landing-brand" href="/" aria-label="LingorifyGo home">
          <Image className="brand-octopus" src="/octopus.png" width={34} height={34} alt="" aria-hidden="true" />
          <span>Lingorify<span>Go</span></span>
        </Link>
        <nav className="landing-actions" aria-label="Account">
          <Link className="login-link" href="/login">Log In</Link>
          <button
            className="theme-toggle"
            type="button"
            aria-label={darkMode ? "Switch to light theme" : "Switch to dark theme"}
            onClick={() => setDarkMode((mode) => !mode)}
          >
            {darkMode ? "☀" : "☾"}
          </button>
        </nav>
      </header>

      <div className="landing-content">
        <section className="landing-hero">
          <div className="hero-copy">
            <span className="hero-kicker"><span /> YOUR ENGLISH, YOUR WAY</span>
            <h1><span>Start learning.</span> Grow your English, one word at a time.</h1>
            <p>
              Build your English vocabulary with short, level-based practice
              and examples explained in your language.
            </p>
            <div className="hero-cta-row">
              <Link className="hero-cta" href="/dashboard">Start for free <span aria-hidden="true">→</span></Link>
              <span className="hero-note">Five words a day. No card needed.</span>
            </div>
            <div className="hero-levels"><span>A1</span><span>A2</span><span>B1</span><span>B2</span><i /> Four levels, one word at a time.
            </div>
          </div>
          <div className="hero-art">
            <span className="art-orb art-orb-one" aria-hidden="true" />
            <span className="art-orb art-orb-two" aria-hidden="true" />
            <Image
              className="hero-mascot"
              src="/ollie-hero-v2.webp"
              width={480}
              height={350}
              priority
              alt="Ollie, the purple octopus learning English with a laptop and books"
            />
          </div>
        </section>

        <section className="landing-features" aria-label="Why LingorifyGo">
          {features.map((feature) => (
            <article className="landing-feature" key={feature.title}>
              <span className="feature-icon"><FeatureIcon name={feature.icon} /></span>
              <h2>{feature.title}</h2>
              <p>{feature.description}</p>
            </article>
          ))}
        </section>
        <footer className="landing-footer">
          <span>4 levels · Free · No card required</span>
          <span>Made for curious minds <span aria-hidden="true">✳</span></span>
        </footer>
      </div>
    </main>
  );
}
