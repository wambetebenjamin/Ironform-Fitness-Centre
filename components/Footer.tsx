import Link from "next/link";
import { Facebook, Instagram, MapPin, Phone } from "lucide-react";
import { businessPhone } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link className="wordmark footer-wordmark" href="/">IRON<span>FORM</span></Link>
          <p>Stronger training, real coaching and a fitness community built for Nairobi.</p>
          <div className="social-links">
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram /></a>
            <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label="Facebook"><Facebook /></a>
          </div>
        </div>
        <div><p className="footer-title">Train</p><Link href="/#classes">Classes</Link><Link href="/schedule">Class schedule</Link><Link href="/#memberships">Memberships</Link><Link href="/#trainers">Trainers</Link></div>
        <div><p className="footer-title">Westlands</p><p className="footer-line"><MapPin size={15} />Waiyaki Way, Westlands<br />Nairobi, Kenya</p><a className="footer-line" href={`tel:${businessPhone.replace(/\s/g, "")}`}><Phone size={15} />{businessPhone}</a></div>
        <div><p className="footer-title">Karen</p><p className="footer-line"><MapPin size={15} />Ngong Road, Karen<br />Nairobi, Kenya</p><a className="footer-line" href={`tel:${businessPhone.replace(/\s/g, "")}`}><Phone size={15} />{businessPhone}</a></div>
      </div>
      <div className="container footer-bottom"><p>© 2026 Ironform Fitness Centre.</p><div><Link href="/privacy">Privacy</Link><Link href="/image-credits">Image credits</Link></div></div>
    </footer>
  );
}
