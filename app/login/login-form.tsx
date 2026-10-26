"use client";

import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

type LoginFormProps = {
  initialNotice: string;
};

type SignupResponse = {
  error?: string;
};

export default function LoginForm({ initialNotice }: LoginFormProps) {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [notice, setNotice] = useState(initialNotice);
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice("");
    setPending(true);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");
    const isSignup = mode === "signup";

    try {
      if (isSignup) {
        const response = await fetch("/api/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.get("name"),
            surname: formData.get("surname"),
            age: formData.get("age"),
            email,
            password,
          }),
        });

        const result = (await response.json()) as SignupResponse;
        if (!response.ok) {
          setNotice(result.error ?? "Unable to create the account.");
          return;
        }
      }

      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/dashboard",
      });

      if (!result?.ok) {
        const message =
          isSignup
            ? "Your account was created, but sign-in failed. Please log in."
            : result?.error === "CredentialsSignin"
              ? "Email or password is incorrect."
              : "Sign-in is temporarily unavailable. Please try again.";
        setNotice(message);
        setMode("login");
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      console.error("Authentication request failed:", error);
      setNotice("Unable to connect right now. Please try again.");
    } finally {
      setPending(false);
    }
  }

  function switchMode(nextMode: "login" | "signup") {
    setMode(nextMode);
    setNotice("");
  }

  return (
    <main className="login-page">
      <Link className="login-back" href="/" aria-label="Back to LingorifyGo home">←</Link>
      <section className="login-card">
        <Link className="landing-brand login-brand" href="/">
          <Image className="brand-octopus" src="/octopus.png" width={34} height={34} alt="" aria-hidden="true" />
          <span>Lingorify<span>Go</span></span>
        </Link>
        <div className="login-mascot">
          <Image src="/ollie-hero-v2.webp" width={480} height={350} alt="Ollie the purple octopus" priority />
        </div>
        <span className="login-kicker">{mode === "login" ? "WELCOME BACK" : "JOIN LINGORIFYGO"}</span>
        <h1>{mode === "login" ? "Ready to learn?" : "Let’s get started."}</h1>
        <p>
          {mode === "login"
            ? "Pick up where you left off and keep your English growing."
            : "Create your account to save your learning progress."}
        </p>
        <form className="login-form" onSubmit={handleSubmit}>
          {mode === "signup" && (
            <>
              <label htmlFor="name">First name</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Beren"
                autoComplete="given-name"
                minLength={2}
                maxLength={80}
                pattern={String.raw`\p{L}[\p{L}\p{M}]*(?:[ '\u2019-]\p{L}[\p{L}\p{M}]*)*`}
                title="Use 2–80 letters, spaces, apostrophes, or hyphens."
                required
              />
              <label htmlFor="surname">Last name</label>
              <input
                id="surname"
                name="surname"
                type="text"
                placeholder="Yılmaz"
                autoComplete="family-name"
                minLength={2}
                maxLength={80}
                pattern={String.raw`\p{L}[\p{L}\p{M}]*(?:[ '\u2019-]\p{L}[\p{L}\p{M}]*)*`}
                title="Use 2–80 letters, spaces, apostrophes, or hyphens."
                required
              />
              <label htmlFor="age">Age</label>
              <input
                id="age"
                name="age"
                type="number"
                min={1}
                max={120}
                step={1}
                placeholder="25"
                required
              />
            </>
          )}
          <label htmlFor="email">Email address</label>
          <input id="email" name="email" type="email" placeholder="you@example.com" autoComplete="email" maxLength={254} required />
          <div className="password-label">
            <label htmlFor="password">Password</label>
            {mode === "login" && (
              <button type="button" onClick={() => setNotice("Password reset is not available yet.")}>Forgot password?</button>
            )}
          </div>
          <input
            id="password"
            name="password"
            type="password"
            placeholder={mode === "signup" ? "8+ characters, with a letter and number" : "Enter your password"}
            autoComplete={mode === "signup" ? "new-password" : "current-password"}
            minLength={8}
            maxLength={72}
            title={mode === "signup" ? "Use at least 8 characters, including a letter and a number." : undefined}
            required
          />
          <button className="login-submit" type="submit" disabled={pending}>
            {pending
              ? mode === "signup" ? "Creating account…" : "Logging in…"
              : mode === "signup" ? "Create account" : "Log In"}
            <span aria-hidden="true">→</span>
          </button>
        </form>
        {notice && <p className="login-notice" role="status">{notice}</p>}
        <p className="login-signup">
          {mode === "login" ? "New to LingorifyGo? " : "Already have an account? "}
          <button
            type="button"
            onClick={() => switchMode(mode === "login" ? "signup" : "login")}
          >
            {mode === "login" ? "Create an account" : "Log in"}
          </button>
        </p>
      </section>
      <p className="login-footer">Learn at your pace. Grow every day. <span>✦</span></p>
    </main>
  );
}
