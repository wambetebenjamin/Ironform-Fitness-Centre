"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const links = [
  ["Home", "/#home"],
  ["Classes", "/#classes"],
  ["Memberships", "/#memberships"],
  ["Trainers", "/#trainers"],
  ["Nutrition", "/#nutrition"],
  ["Schedule", "/schedule"],
  ["Contact", "/#locations"],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  return (
    <header className="site-header">
      <nav className="nav-shell" aria-label="Main navigation">
        <Link className="wordmark" href="/#home" aria-label="Ironform home" onClick={() => setOpen(false)}>
          IRON<span>FORM</span>
        </Link>
        <button className="menu-toggle" type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="nav-links" aria-label="Toggle navigation">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
        <div id="nav-links" className={`nav-links ${open ? "is-open" : ""}`}>
          {links.map(([label, href]) => (
            <Link href={href} key={label} onClick={() => setOpen(false)}>{label}</Link>
          ))}
        </div>
        <Link className="nav-join" href="/#memberships">Join now</Link>
      </nav>
    </header>
  );
}
