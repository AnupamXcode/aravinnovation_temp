import fs from 'fs';
import path from 'path';
import os from 'os';
import { getSupabaseAdmin } from '@/lib/supabase/admin';
import { isSupabaseServiceConfigured } from '@/lib/supabase/config';

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
  industry?: string;
  originalQuery?: string;
  conversationContext?: Array<{ sender: 'bot' | 'user'; text: string }>;
  source?: string;
  submittedAt: string;
  status: 'new' | 'contacted' | 'in_progress' | 'converted' | 'closed' | 'qualified' | 'archived';
  ipAddress?: string;
  companyEmailStatus?: 'SENT' | 'FAILED' | 'SKIPPED' | 'PENDING';
  userEmailStatus?: 'SENT' | 'FAILED' | 'SKIPPED' | 'PENDING';
  storage?: 'supabase' | 'local_disk_dev';
}

const PRIMARY_STORAGE_PATH = path.join(process.cwd(), 'scratch', 'submissions.json');
const FALLBACK_STORAGE_PATH = path.join(os.tmpdir(), 'arav_submissions.json');

// In-Memory baseline data for local development when Supabase credentials are not yet supplied
let memorySubmissions: FormSubmission[] = [
  {
    id: 'ARAV-1715892000000',
    name: 'Fatima Al Mansoori',
    email: 'fatima@apex-global.ae',
    company: 'Apex Global Enterprises',
    phone: '+971 50 123 4567',
    service: 'Risk, Compliance & Governance',
    industry: 'Financial Services & Banking',
    requirement: 'DPDP and UAE Data Privacy readiness assessment and ISO27001 roadmap.',
    originalQuery: 'We need an audit of our data privacy infrastructure for compliance across UAE and India DPDP.',
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
    industry: 'Fintech & Cloud Architecture',
    requirement: 'Core banking microservices cloud architecture health check and latency optimization.',
    originalQuery: 'Looking for expert tech consultants to optimize latency on our Kubernetes cloud core banking backend.',
    timeline: 'Immediate (within 2 weeks)',
    budget: 'Enterprise ($50k+)',
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
    industry: 'Logistics & Supply Chain',
    requirement: 'Custom LLM automation for enterprise supply chain documentation processing.',
    originalQuery: 'I need to create a website and custom AI workflow automation for my logistics company.',
    conversationContext: [
      { sender: 'user', text: 'Hi, I need help building an AI pipeline for document extraction.' },
      { sender: 'bot', text: 'We specialize in enterprise AI & LLM integration! What industry are you in?' },
      { sender: 'user', text: 'Logistics and supply chain management.' },
      { sender: 'bot', text: 'Great! David, would you like an Arav specialist to reach out?' },
      { sender: 'user', text: 'Yes, submit inquiry.' },
    ],
    timeline: '3 - 6 Months',
    budget: '$50k+',
    source: 'chatbot',
    submittedAt: new Date(Date.now() - 86400000 * 8).toISOString(),
    status: 'converted',
  },
  {
    id: 'ARAV-1715632800000',
    name: 'Elena Rostova',
    email: 'elena@biotech-innovations.eu',
    company: 'BioTech Global Solutions',
    phone: '+49 89 1234 5678',
    service: 'Web & Application Development',
    industry: 'Healthcare & Biotech',
    requirement: 'High-performance web portal with HIPAA/GDPR compliance and real-time dashboard.',
    originalQuery: 'We require a modern responsive enterprise portal with strict security controls for healthcare data.',
    conversationContext: [
      { sender: 'user', text: 'Need a compliant web application built fast.' },
      { sender: 'bot', text: 'Arav Innovations develops enterprise web platforms with security governance. What timeline do you envision?' },
      { sender: 'user', text: '1 to 3 months.' },
    ],
    timeline: '1 - 3 Months',
    budget: '$30k-$50k',
    source: 'chatbot',
    submittedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    status: 'new',
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
          const existingIds = new Set(memorySubmissions.map(s => s.id));
          for (const item of parsed) {
            if (!existingIds.has(item.id)) {
              memorySubmissions.push(item);
              existingIds.add(item.id);
            }
          }
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
      return;
    } catch {
      // Gracefully catch read-only filesystem errors in serverless
    }
  }
}

function mapRowToSubmission(row: Record<string, any>): FormSubmission {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    company: row.company,
    phone: row.phone,
    service: row.service,
    requirement: row.requirement,
    timeline: row.timeline,
    budget: row.budget || undefined,
    industry: row.industry || undefined,
    originalQuery: row.original_query || undefined,
    conversationContext: row.conversation_context || undefined,
    source: row.source || 'website_form',
    submittedAt: row.submitted_at || row.created_at,
    status: row.status || 'new',
    ipAddress: row.ip_address || undefined,
    companyEmailStatus: row.company_email_status || undefined,
    userEmailStatus: row.user_email_status || undefined,
    storage: 'supabase',
  };
}

export function findRecentDuplicate(email: string, requirement: string): FormSubmission | null {
  loadFromDisk();
  const oneMinuteAgo = Date.now() - 60000;
  const match = memorySubmissions.find((s) => {
    const isRecent = new Date(s.submittedAt).getTime() > oneMinuteAgo;
    const sameEmail = s.email && email && s.email.toLowerCase() === email.toLowerCase();
    const sameReq = s.requirement && requirement && s.requirement.trim().toLowerCase() === requirement.trim().toLowerCase();
    return isRecent && sameEmail && sameReq;
  });
  return match || null;
}

/**
 * Persists a new lead asynchronously.
 * Writes directly to Supabase if credentials are provided.
 * If Supabase is not configured yet, logs warning and uses local dev memory/disk.
 */
export async function saveSubmissionAsync(
  newSubmission: Omit<FormSubmission, 'id' | 'submittedAt' | 'status'>
): Promise<{ submission: FormSubmission; storage: 'supabase' | 'local_disk_dev'; error?: string }> {
  const id = `ARAV-${Date.now()}`;
  const submittedAt = new Date().toISOString();

  // 1. Deduplication check
  if (newSubmission.email && newSubmission.requirement) {
    const duplicate = findRecentDuplicate(newSubmission.email, newSubmission.requirement);
    if (duplicate) {
      return { submission: duplicate, storage: duplicate.storage || 'local_disk_dev' };
    }
  }

  const baseSubmission: FormSubmission = {
    ...newSubmission,
    id,
    submittedAt,
    status: 'new',
    companyEmailStatus: 'PENDING',
    userEmailStatus: 'PENDING',
  };

  // 2. Attempt Supabase persistent insert if configured
  if (isSupabaseServiceConfigured()) {
    try {
      const adminClient = getSupabaseAdmin();
      if (adminClient) {
        const { data, error } = await (adminClient as any)
          .from('submissions')
          .insert({
            id: baseSubmission.id,
            name: baseSubmission.name,
            email: baseSubmission.email,
            company: baseSubmission.company,
            phone: baseSubmission.phone,
            service: baseSubmission.service,
            requirement: baseSubmission.requirement,
            timeline: baseSubmission.timeline,
            budget: baseSubmission.budget || null,
            industry: baseSubmission.industry || null,
            original_query: baseSubmission.originalQuery || null,
            conversation_context: baseSubmission.conversationContext || null,
            source: baseSubmission.source || 'website_form',
            status: baseSubmission.status,
            ip_address: baseSubmission.ipAddress || null,
            company_email_status: baseSubmission.companyEmailStatus,
            user_email_status: baseSubmission.userEmailStatus,
            submitted_at: baseSubmission.submittedAt,
          })
          .select()
          .single();

        if (error) {
          console.error('[Supabase Lead Persistence Error]:', error.message);
          // Fail explicitly to avoid pretending a database write occurred
          return {
            submission: baseSubmission,
            storage: 'local_disk_dev',
            error: `Supabase write failed: ${error.message}`,
          };
        }

        const savedSupabase = mapRowToSubmission(data);
        // Cache in memory for instant local reads
        memorySubmissions.unshift(savedSupabase);
        return { submission: savedSupabase, storage: 'supabase' };
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unknown database error';
      console.error('[Supabase Client Exception]:', msg);
      return { submission: baseSubmission, storage: 'local_disk_dev', error: msg };
    }
  }

  // 3. Fallback to local dev disk/memory if Supabase is not yet configured
  console.warn('[Submissions]: Supabase not configured. Saved to local dev storage.');
  baseSubmission.storage = 'local_disk_dev';
  memorySubmissions.unshift(baseSubmission);
  persistToDisk();
  return { submission: baseSubmission, storage: 'local_disk_dev' };
}

/**
 * Retrieves all submissions asynchronously from Supabase, or from local fallback.
 */
export async function getSubmissionsAsync(): Promise<FormSubmission[]> {
  if (isSupabaseServiceConfigured()) {
    try {
      const adminClient = getSupabaseAdmin();
      if (adminClient) {
        const { data, error } = await adminClient
          .from('submissions')
          .select('*')
          .order('submitted_at', { ascending: false });

        if (!error && Array.isArray(data)) {
          return data.map(mapRowToSubmission);
        }
        if (error) {
          console.error('[Supabase Query Error on Submissions]:', error.message);
        }
      }
    } catch (err) {
      console.error('[Supabase Fetch Exception]:', err);
    }
  }

  loadFromDisk();
  return [...memorySubmissions];
}

/**
 * Updates submission status asynchronously.
 */
export async function updateSubmissionStatusAsync(
  id: string,
  status: FormSubmission['status']
): Promise<FormSubmission | null> {
  if (isSupabaseServiceConfigured()) {
    try {
      const adminClient = getSupabaseAdmin();
      if (adminClient) {
        const { data, error } = await (adminClient as any)
          .from('submissions')
          .update({ status })
          .eq('id', id)
          .select()
          .single();

        if (!error && data) {
          const updated = mapRowToSubmission(data);
          const idx = memorySubmissions.findIndex(s => s.id === id);
          if (idx !== -1) memorySubmissions[idx] = updated;
          return updated;
        }
      }
    } catch (err) {
      console.error('[Supabase Update Status Exception]:', err);
    }
  }

  return updateSubmissionStatus(id, status);
}

/**
 * Updates email delivery status asynchronously.
 */
export async function updateSubmissionEmailStatusAsync(
  id: string,
  companyStatus: 'SENT' | 'FAILED' | 'SKIPPED',
  userStatus: 'SENT' | 'FAILED' | 'SKIPPED'
): Promise<void> {
  if (isSupabaseServiceConfigured()) {
    try {
      const adminClient = getSupabaseAdmin();
      if (adminClient) {
        await (adminClient as any)
          .from('submissions')
          .update({
            company_email_status: companyStatus,
            user_email_status: userStatus,
          })
          .eq('id', id);
      }
    } catch (err) {
      console.error('[Supabase Update Email Status Exception]:', err);
    }
  }

  updateSubmissionEmailStatus(id, companyStatus, userStatus);
}

/**
 * Deletes a submission asynchronously.
 */
export async function deleteSubmissionAsync(id: string): Promise<boolean> {
  if (isSupabaseServiceConfigured()) {
    try {
      const adminClient = getSupabaseAdmin();
      if (adminClient) {
        const { error } = await (adminClient as any)
          .from('submissions')
          .delete()
          .eq('id', id);

        if (!error) {
          memorySubmissions = memorySubmissions.filter(s => s.id !== id);
          return true;
        }
      }
    } catch (err) {
      console.error('[Supabase Delete Submission Exception]:', err);
    }
  }

  return deleteSubmission(id);
}

// ============================================================================
// Synchronous wrappers (Backwards Compatibility)
// ============================================================================

export function getSubmissions(): FormSubmission[] {
  loadFromDisk();
  return [...memorySubmissions];
}

export function getChatbotInquiries(): FormSubmission[] {
  loadFromDisk();
  return memorySubmissions.filter((s) => s.source === 'chatbot');
}

export function getContactFormSubmissions(): FormSubmission[] {
  loadFromDisk();
  return memorySubmissions.filter((s) => s.source !== 'chatbot');
}

export function saveSubmission(newSubmission: Omit<FormSubmission, 'id' | 'submittedAt' | 'status'>): FormSubmission {
  loadFromDisk();

  if (newSubmission.email && newSubmission.requirement) {
    const duplicate = findRecentDuplicate(newSubmission.email, newSubmission.requirement);
    if (duplicate) return duplicate;
  }

  const created: FormSubmission = {
    ...newSubmission,
    id: `ARAV-${Date.now()}`,
    submittedAt: new Date().toISOString(),
    status: 'new',
    storage: 'local_disk_dev',
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
