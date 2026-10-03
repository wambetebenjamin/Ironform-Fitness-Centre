"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, CheckCircle, LoaderCircle } from "lucide-react";

export default function Newsletter() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  async function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    const form = event.currentTarget;
    const email = new FormData(form).get("email");
    const response = await fetch("/api/newsletter", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
    if (!response.ok) return setStatus("error");
    form.reset();
    setStatus("success");
  }
  return (
    <div className="newsletter-inner container">
      <div><p className="eyebrow">The Ironform weekly</p><h2>Weekly workouts and tips straight to your inbox.</h2></div>
      {status === "success" ? <p className="newsletter-success"><CheckCircle /> You&apos;re on the list. See you next week.</p> : (
        <form className="newsletter-form" onSubmit={subscribe}>
          <label className="sr-only" htmlFor="newsletter-email">Email address</label>
          <input id="newsletter-email" name="email" type="email" required placeholder="Your email address" autoComplete="email" />
          <button className="button button-red" disabled={status === "loading"}>{status === "loading" ? <LoaderCircle className="spin" /> : <><span>Subscribe</span><ArrowRight size={17} /></>}</button>
          {status === "error" && <p className="form-error">Something went wrong. Please try again.</p>}
        </form>
      )}
    </div>
  );
}
