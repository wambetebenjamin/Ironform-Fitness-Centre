"use client";

import { Clock3, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { whatsappLink } from "@/lib/data";

const branches = {
  Westlands: {
    address: "Waiyaki Way, Westlands, Nairobi",
    phone: "+254 112 272 061",
    map: "https://www.google.com/maps?q=Westlands%2C%20Nairobi%2C%20Kenya&output=embed",
  },
  Karen: {
    address: "Ngong Road, Karen, Nairobi",
    phone: "+254 112 272 061",
    map: "https://www.google.com/maps?q=Karen%2C%20Nairobi%2C%20Kenya&output=embed",
  },
};

type BranchName = keyof typeof branches;

export default function Locations() {
  const [active, setActive] = useState<BranchName>("Westlands");
  const branch = branches[active];
  return (
    <div className="locations-shell">
      <div className="location-tabs" role="tablist" aria-label="Choose Ironform branch">
        {(Object.keys(branches) as BranchName[]).map((name) => <button role="tab" aria-selected={active === name} className={active === name ? "active" : ""} onClick={() => setActive(name)} key={name}><MapPin size={17} />{name}</button>)}
      </div>
      <div className="location-panel" key={active}>
        <iframe title={`${active} branch map`} src={branch.map} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        <div className="location-details">
          <p className="eyebrow">{active} branch</p>
          <h3>Train where Nairobi moves.</h3>
          <p className="location-line"><MapPin size={18} />{branch.address}</p>
          <p className="location-line"><Phone size={18} /><a href={`tel:${branch.phone.replace(/\s/g, "")}`}>{branch.phone}</a></p>
          <div className="hours-heading"><Clock3 size={18} /><strong>Operating hours</strong></div>
          <table className="hours-table"><tbody>
            <tr><td>Monday – Friday</td><td>5:00am – 11:00pm</td></tr>
            <tr><td>Saturday</td><td>6:00am – 10:00pm</td></tr>
            <tr><td>Sunday</td><td>7:00am – 8:00pm</td></tr>
          </tbody></table>
          <a className="button button-red" target="_blank" rel="noreferrer" href={whatsappLink(`Hello! I would like more information about the Ironform ${active} branch.`)}>WhatsApp this branch</a>
        </div>
      </div>
    </div>
  );
}
