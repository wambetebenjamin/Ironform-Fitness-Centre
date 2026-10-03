import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/data";

export default function WhatsAppButton() {
  return (
    <a className="whatsapp-float" href={whatsappLink("Hello! I am interested in joining Ironform Fitness Centre.")} target="_blank" rel="noreferrer" aria-label="Join today or book a class on WhatsApp">
      <span className="whatsapp-tooltip">Join today or book a class</span>
      <MessageCircle size={25} fill="currentColor" />
    </a>
  );
}
