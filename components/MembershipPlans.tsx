"use client";

import { CSSProperties, FormEvent, useEffect, useRef, useState } from "react";
import { CheckCircle, LoaderCircle, X } from "lucide-react";
import { memberships } from "@/lib/data";

export default function MembershipPlans() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [plan, setPlan] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "success">("idle");
  const [whatsappUrl, setWhatsappUrl] = useState("");

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.15 });
    observer.observe(grid);
    return () => observer.disconnect();
  }, []);

  function close() {
    setPlan(null);
    setStatus("idle");
  }

  async function enquire(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    const values = Object.fromEntries(new FormData(event.currentTarget));
    const response = await fetch("/api/membership", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...values, plan }),
    });
    if (!response.ok) return setStatus("error");
    const data = await response.json();
    setWhatsappUrl(data.whatsappUrl);
    setStatus("success");
  }

  return (
    <>
      <div className="membership-grid" ref={gridRef}>
        {memberships.map((item, index) => (
          <article
            className={`membership-card reveal reveal-scale ${visible ? "is-visible" : ""} ${item.featured ? "featured" : ""}`}
            style={{ "--reveal-delay": `${index * 80}ms` } as CSSProperties}
            key={item.name}
          >
            {item.featured && <span className="value-flag">Best value</span>}
            <p className="plan-name">{item.name}</p>
            <p className="plan-price"><span>KES</span> {item.price}</p>
            <p className="plan-duration">{item.duration}</p>
            <ul>
              {item.inclusions.map((inclusion) => <li key={inclusion}><CheckCircle size={17} />{inclusion}</li>)}
            </ul>
            <button className={`button ${item.featured ? "button-white" : "button-red"}`} onClick={() => setPlan(item.name)}>Join this plan</button>
          </article>
        ))}
      </div>
      {plan && (
        <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.currentTarget === event.target) close(); }}>
          <div className="booking-modal" role="dialog" aria-modal="true" aria-labelledby="membership-title">
            <button className="modal-close" onClick={close} aria-label="Close membership form"><X size={20} /></button>
            {status === "success" ? (
              <div className="form-success">
                <CheckCircle size={42} />
                <p className="eyebrow">Enquiry saved</p>
                <h3 id="membership-title">Let&apos;s make it official.</h3>
                <p>Chat with the Ironform team to arrange payment and your first fitness assessment.</p>
                <a className="button button-red" href={whatsappUrl} target="_blank" rel="noreferrer">Continue on WhatsApp</a>
              </div>
            ) : (
              <>
                <p className="eyebrow">Membership enquiry</p>
                <h3 id="membership-title">Join {plan}</h3>
                <p className="modal-summary">Leave your details and our Nairobi team will help you get started.</p>
                <form onSubmit={enquire} className="booking-form">
                  <label>Full name<input name="name" required autoFocus autoComplete="name" /></label>
                  <label>Phone number<input name="phone" required inputMode="tel" autoComplete="tel" placeholder="07XX XXX XXX" /></label>
                  <label>Email address<input name="email" type="email" autoComplete="email" /></label>
                  <label>Preferred branch<select name="branch" defaultValue="Westlands"><option>Westlands</option><option>Karen</option></select></label>
                  {status === "error" && <p className="form-error" role="alert">We could not save that enquiry. Please try again.</p>}
                  <button className="button button-red" disabled={status === "loading"}>{status === "loading" ? <><LoaderCircle className="spin" size={15} /> Saving</> : "Send enquiry"}</button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
