"use client";

import { FormEvent, useState } from "react";
import { Calendar, CheckCircle, Clock3, LoaderCircle, Timer, User, X } from "lucide-react";
import { schedule, ScheduleItem } from "@/lib/data";

const days = Object.keys(schedule);

type BookingResult = { whatsappUrl: string; emailSent: boolean };

export default function Schedule({ compact = false }: { compact?: boolean }) {
  const [day, setDay] = useState("Mon");
  const [selected, setSelected] = useState<ScheduleItem | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [result, setResult] = useState<BookingResult | null>(null);

  function closeModal() {
    setSelected(null);
    setStatus("idle");
    setResult(null);
  }

  async function submitBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selected) return;
    setStatus("loading");
    const values = Object.fromEntries(new FormData(event.currentTarget));
    const response = await fetch("/api/book-class", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...values, day, className: selected.name, time: selected.time, trainer: selected.trainer }),
    });
    if (!response.ok) {
      setStatus("error");
      return;
    }
    setResult(await response.json());
    setStatus("success");
  }

  return (
    <div className={`schedule-widget ${compact ? "is-compact" : ""}`}>
      <div className="day-tabs" role="tablist" aria-label="Select schedule day">
        {days.map((item) => (
          <button key={item} role="tab" aria-selected={day === item} className={day === item ? "active" : ""} onClick={() => setDay(item)}>{item}</button>
        ))}
      </div>
      <div className="schedule-scroll" key={day}>
        <table className="schedule-table">
          <thead><tr><th>Time</th><th>Session</th><th>Coach</th><th>Duration</th><th><span className="sr-only">Book</span></th></tr></thead>
          <tbody>
            {schedule[day].map((item) => (
              <tr key={`${item.time}-${item.name}`}>
                <td className="schedule-time"><Clock3 size={16} /> {item.time}</td>
                <td><strong>{item.name}</strong></td>
                <td><span className="table-meta"><User size={15} />{item.trainer}</span></td>
                <td><span className="table-meta"><Timer size={15} />{item.duration} min</span></td>
                <td><button className="button button-small button-navy" onClick={() => setSelected(item)}>Book class</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected && (
        <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.currentTarget === event.target) closeModal(); }}>
          <div className="booking-modal" role="dialog" aria-modal="true" aria-labelledby="booking-title">
            <button className="modal-close" onClick={closeModal} aria-label="Close booking form"><X size={20} /></button>
            {status === "success" && result ? (
              <div className="form-success">
                <CheckCircle size={42} />
                <p className="eyebrow">Spot requested</p>
                <h3 id="booking-title">You&apos;re nearly in.</h3>
                <p>Your booking has been saved{result.emailSent ? " and an email confirmation was sent" : ""}. Confirm with our team on WhatsApp.</p>
                <a className="button button-red" href={result.whatsappUrl} target="_blank" rel="noreferrer">Confirm on WhatsApp</a>
              </div>
            ) : (
              <>
                <p className="eyebrow"><Calendar size={15} /> Book your spot</p>
                <h3 id="booking-title">{selected.name}</h3>
                <p className="modal-summary">{day} at {selected.time} · {selected.duration} min · {selected.trainer}</p>
                <form onSubmit={submitBooking} className="booking-form">
                  <label>Full name<input name="name" required autoFocus autoComplete="name" /></label>
                  <label>Phone number<input name="phone" required inputMode="tel" autoComplete="tel" placeholder="07XX XXX XXX" /></label>
                  <label>Email address<input name="email" required type="email" autoComplete="email" /></label>
                  {status === "error" && <p className="form-error" role="alert">We could not save that booking. Please try again or use WhatsApp.</p>}
                  <button className="button button-red" disabled={status === "loading"}>
                    {status === "loading" ? <><LoaderCircle className="spin" size={15} /> Saving</> : "Request booking"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
