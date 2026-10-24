"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";

export default function LoginPage() {
  const [notice, setNotice] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice("Sign-in is not connected yet. You can explore the learning demo for now.");
  }

  return (
    <main className="login-page">
      <Link className="login-back" href="/" aria-label="Back to LingorifyGo home">←</Link>
      <section className="login-card">
        <Link className="landing-brand login-brand" href="/">
          <Image className="brand-octopus" src="/ollie-mark-v2.webp" width={34} height={34} alt="" aria-hidden="true" />
          <span>Lingorify<span>Go</span></span>
        </Link>
        <div className="login-mascot">
          <Image src="/ollie-hero-v2.webp" width={480} height={350} alt="Ollie the purple octopus" priority />
        </div>
        <span className="login-kicker">WELCOME BACK</span>
        <h1>Ready to learn?</h1>
        <p>Pick up where you left off and keep your English growing.</p>
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Email address</label>
          <input id="email" name="email" type="email" placeholder="you@example.com" autoComplete="email" required />
          <div className="password-label">
            <label htmlFor="password">Password</label>
            <button type="button" onClick={() => setNotice("Password recovery is not connected yet.")}>Forgot password?</button>
          </div>
          <input id="password" name="password" type="password" placeholder="Enter your password" autoComplete="current-password" required minLength={8} />
          <button className="login-submit" type="submit">Log In <span>→</span></button>
        </form>
        {notice && <p className="login-notice" role="status">{notice}</p>}
        <p className="login-signup">New to LingorifyGo? <Link href="/dashboard">Try the free demo</Link></p>
      </section>
      <p className="login-footer">Learn at your pace. Grow every day. <span>✦</span></p>
    </main>
  );
}
