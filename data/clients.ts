export interface ClientLogo {
  id: string;
  name: string;
  category: string;
  logoText?: string;
  imageSrc?: string;
}

export const clientLogos: ClientLogo[] = [
  { id: "1", name: "Apex Global FinTech", category: "Banking & Financial Services", logoText: "APEX FINTECH" },
  { id: "2", name: "Nexis Cloud Solutions", category: "SaaS & Enterprise Cloud", logoText: "NEXIS CLOUD" },
  { id: "3", name: "Veritas Logistics", category: "Supply Chain & Logistics", logoText: "VERITAS LOGISTICS" },
  { id: "4", name: "Quantum BioHealth", category: "Healthcare Tech", logoText: "QUANTUM BIO" },
  { id: "5", name: "Aura Commerce Hub", category: "Omnichannel Retail", logoText: "AURA COMMERCE" },
  { id: "6", name: "Strata Global Energy", category: "Clean Energy Infrastructure", logoText: "STRATA ENERGY" },
  { id: "7", name: "Vanguard Capital", category: "Private Equity", logoText: "VANGUARD CAPITAL" },
  { id: "8", name: "Horizon CyberTech", category: "Cybersecurity & DPDP", logoText: "HORIZON CYBER" },
];
