import type { Metadata } from "next";
import MembershipPlans from "@/components/MembershipPlans";

export const revalidate = 300;
export const metadata: Metadata = { title: "Gym Memberships", description: "Compare Ironform gym memberships for our Westlands and Karen branches in Nairobi." };

export default function MembershipsPage() {
  return <main className="inner-page"><section className="page-hero container"><p className="eyebrow">Train your way</p><h1>Ironform memberships.</h1><p>Choose a focused monthly, quarterly or annual plan. Every membership starts with a fitness assessment.</p></section><section className="container standalone-grid"><MembershipPlans /></section></main>;
}
