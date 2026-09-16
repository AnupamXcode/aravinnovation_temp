import fs from 'fs';
import path from 'path';

export interface FormSubmission {
  id: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  service: string;
  requirement: string;
  timeline: string;
  budget?: string;
  submittedAt: string;
  status: 'new' | 'contacted' | 'qualified' | 'archived';
  ipAddress?: string;
}

const STORAGE_PATH = path.join(process.cwd(), 'scratch', 'submissions.json');

// Ensure directory and storage file exist
function ensureStorage() {
  const dir = path.dirname(STORAGE_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (!fs.existsSync(STORAGE_PATH)) {
    // Default initial mock submissions for demonstration
    const initialData: FormSubmission[] = [
      {
        id: 'ARAV-1715892000000',
        name: 'Fatima Al Mansoori',
        email: 'fatima@apex-global.ae',
        company: 'Apex Global Enterprises',
        phone: '+971 50 123 4567',
        service: 'Risk, Compliance & Governance',
        requirement: 'DPDP and UAE Data Privacy readiness assessment and ISO27001 roadmap.',
        timeline: '1 - 3 Months',
        budget: '$25k-$50k',
        submittedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
        status: 'new',
      },
      {
        id: 'ARAV-1715805600000',
        name: 'Rahul Sharma',
        email: 'rahul.sharma@fintechpro.in',
        company: 'FintechPro India',
        phone: '+91 98765 43210',
        service: 'IT Strategy & Implementation',
        requirement: 'Core banking microservices cloud architecture health check and latency optimization.',
        timeline: 'Immediate (within 2 weeks)',
        budget: 'Enterprise',
        submittedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
        status: 'contacted',
      },
      {
        id: 'ARAV-1715719200000',
        name: 'David Miller',
        email: 'david@nexuslogistics.com',
        company: 'Nexus Logistics International',
        phone: '+1 415 555 0199',
        service: 'AI Portfolio',
        requirement: 'Custom LLM automation for enterprise supply chain documentation processing.',
        timeline: '3 - 6 Months',
        budget: '$50k+',
        submittedAt: new Date(Date.now() - 86400000 * 8).toISOString(),
        status: 'qualified',
      },
    ];
    fs.writeFileSync(STORAGE_PATH, JSON.stringify(initialData, null, 2), 'utf-8');
  }
}

export function getSubmissions(): FormSubmission[] {
  ensureStorage();
  try {
    const raw = fs.readFileSync(STORAGE_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveSubmission(newSubmission: Omit<FormSubmission, 'id' | 'submittedAt' | 'status'>): FormSubmission {
  ensureStorage();
  const submissions = getSubmissions();
  
  const created: FormSubmission = {
    ...newSubmission,
    id: `ARAV-${Date.now()}`,
    submittedAt: new Date().toISOString(),
    status: 'new',
  };

  submissions.unshift(created);
  fs.writeFileSync(STORAGE_PATH, JSON.stringify(submissions, null, 2), 'utf-8');
  return created;
}

export function updateSubmissionStatus(id: string, status: FormSubmission['status']): FormSubmission | null {
  ensureStorage();
  const submissions = getSubmissions();
  const index = submissions.findIndex(s => s.id === id);
  if (index === -1) return null;

  submissions[index].status = status;
  fs.writeFileSync(STORAGE_PATH, JSON.stringify(submissions, null, 2), 'utf-8');
  return submissions[index];
}

export function deleteSubmission(id: string): boolean {
  ensureStorage();
  const submissions = getSubmissions();
  const filtered = submissions.filter(s => s.id !== id);
  if (filtered.length === submissions.length) return false;

  fs.writeFileSync(STORAGE_PATH, JSON.stringify(filtered, null, 2), 'utf-8');
  return true;
}
