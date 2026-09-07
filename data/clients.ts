export interface ClientLogo {
  id: string;
  name: string;
  category: string;
  logoText?: string;
  imageSrc?: string;
  verificationStatus?: "Draft" | "Needs Verification" | "Verified" | "Approved for Public Use" | "Archived";
  permissionStatus?: "Approved for Public Use" | "Needs Verification" | "Anonymized";
}

export const clientLogos: ClientLogo[] = [
  { id: "1", name: "Apex Global FinTech", category: "Banking & Financial Services", logoText: "APEX FINTECH", verificationStatus: "Approved for Public Use", permissionStatus: "Anonymized" },
  { id: "2", name: "Nexis Cloud Solutions", category: "SaaS & Enterprise Cloud", logoText: "NEXIS CLOUD", verificationStatus: "Approved for Public Use", permissionStatus: "Anonymized" },
  { id: "3", name: "Veritas Logistics", category: "Supply Chain & Logistics", logoText: "VERITAS LOGISTICS", verificationStatus: "Approved for Public Use", permissionStatus: "Anonymized" },
  { id: "4", name: "Quantum BioHealth", category: "Healthcare Tech", logoText: "QUANTUM BIO", verificationStatus: "Approved for Public Use", permissionStatus: "Anonymized" },
  { id: "5", name: "Aura Commerce Hub", category: "Omnichannel Retail", logoText: "AURA COMMERCE", verificationStatus: "Approved for Public Use", permissionStatus: "Anonymized" },
  { id: "6", name: "Strata Global Energy", category: "Clean Energy Infrastructure", logoText: "STRATA ENERGY", verificationStatus: "Approved for Public Use", permissionStatus: "Anonymized" },
  { id: "7", name: "Vanguard Capital", category: "Private Equity", logoText: "VANGUARD CAPITAL", verificationStatus: "Approved for Public Use", permissionStatus: "Anonymized" },
  { id: "8", name: "Horizon CyberTech", category: "Cybersecurity & DPDP", logoText: "HORIZON CYBER", verificationStatus: "Approved for Public Use", permissionStatus: "Anonymized" },
];
