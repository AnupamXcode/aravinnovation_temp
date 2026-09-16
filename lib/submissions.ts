import fs from 'fs';
import path from 'path';
import os from 'os';

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
  source?: string;
  submittedAt: string;
  status: 'new' | 'contacted' | 'qualified' | 'archived';
  ipAddress?: string;
  companyEmailStatus?: 'SENT' | 'FAILED' | 'SKIPPED';
  userEmailStatus?: 'SENT' | 'FAILED' | 'SKIPPED';
}

const PRIMARY_STORAGE_PATH = path.join(process.cwd(), 'scratch', 'submissions.json');
const FALLBACK_STORAGE_PATH = path.join(os.tmpdir(), 'arav_submissions.json');

// In-Memory Storage array as absolute guarantee against serverless filesystem errors
let memorySubmissions: FormSubmission[] = [
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
    source: 'website_form',
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
    source: 'website_form',
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
    source: 'chatbot',
    submittedAt: new Date(Date.now() - 86400000 * 8).toISOString(),
    status: 'qualified',
  },
];

let isLoadedFromFile = false;

function loadFromDisk(): void {
  if (isLoadedFromFile) return;

  const pathsToTry = [PRIMARY_STORAGE_PATH, FALLBACK_STORAGE_PATH];
  for (const filePath of pathsToTry) {
    try {
      if (fs.existsSync(/*turbopackIgnore: true*/ filePath)) {
        const raw = fs.readFileSync(/*turbopackIgnore: true*/ filePath, 'utf-8');
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge parsed disk submissions with initial memory submissions avoiding duplicate IDs
          const existingIds = new Set(memorySubmissions.map(s => s.id));
          for (const item of parsed) {
            if (!existingIds.has(item.id)) {
              memorySubmissions.push(item);
              existingIds.add(item.id);
            }
          }
          // Sort descending by submission date
          memorySubmissions.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
          isLoadedFromFile = true;
          return;
        }
      }
    } catch {
      // Continue to next path
    }
  }
}

function persistToDisk(): void {
  const pathsToTry = [PRIMARY_STORAGE_PATH, FALLBACK_STORAGE_PATH];
  for (const filePath of pathsToTry) {
    try {
      const dir = path.dirname(filePath);
      if (!fs.existsSync(/*turbopackIgnore: true*/ dir)) {
        fs.mkdirSync(/*turbopackIgnore: true*/ dir, { recursive: true });
      }
      fs.writeFileSync(/*turbopackIgnore: true*/ filePath, JSON.stringify(memorySubmissions, null, 2), 'utf-8');
      return; // Stop after first successful write
    } catch {
      // Catch read-only filesystem errors gracefully
    }
  }
}

export function getSubmissions(): FormSubmission[] {
  loadFromDisk();
  return [...memorySubmissions];
}

export function saveSubmission(newSubmission: Omit<FormSubmission, 'id' | 'submittedAt' | 'status'>): FormSubmission {
  loadFromDisk();

  const created: FormSubmission = {
    ...newSubmission,
    id: `ARAV-${Date.now()}`,
    submittedAt: new Date().toISOString(),
    status: 'new',
  };

  memorySubmissions.unshift(created);
  persistToDisk();

  return created;
}

export function updateSubmissionStatus(id: string, status: FormSubmission['status']): FormSubmission | null {
  loadFromDisk();
  const index = memorySubmissions.findIndex(s => s.id === id);
  if (index === -1) return null;

  memorySubmissions[index].status = status;
  persistToDisk();
  return memorySubmissions[index];
}

export function updateSubmissionEmailStatus(
  id: string,
  companyStatus: 'SENT' | 'FAILED' | 'SKIPPED',
  userStatus: 'SENT' | 'FAILED' | 'SKIPPED'
): void {
  loadFromDisk();
  const index = memorySubmissions.findIndex(s => s.id === id);
  if (index !== -1) {
    memorySubmissions[index].companyEmailStatus = companyStatus;
    memorySubmissions[index].userEmailStatus = userStatus;
    persistToDisk();
  }
}

export function deleteSubmission(id: string): boolean {
  loadFromDisk();
  const initialLength = memorySubmissions.length;
  memorySubmissions = memorySubmissions.filter(s => s.id !== id);
  if (memorySubmissions.length === initialLength) return false;

  persistToDisk();
  return true;
}
