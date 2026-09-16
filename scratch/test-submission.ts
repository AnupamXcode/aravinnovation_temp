import { getSubmissions, saveSubmission } from '../lib/submissions';
import { leadFormSchema } from '../lib/validations';

console.log('--- Testing Submission Validation & Storage ---');

const testPayload = {
  name: "Anupam Shrivastava",
  company: "Amazon",
  email: "anupamshri1906@gmail.com",
  phone: "9165108596",
  service: "IT Strategy & Implementation",
  timeline: "1 - 3 Months",
  requirement: "Sir i have to create a website for my company.",
  budget: "100",
  source: "test_script"
};

try {
  const validated = leadFormSchema.parse(testPayload);
  console.log('✅ Validation Passed:', validated);

  const saved = saveSubmission({ ...validated, source: testPayload.source });
  console.log('✅ Saved Submission:', saved);

  const all = getSubmissions();
  console.log('✅ Total Submissions Count:', all.length);

  const found = all.find(s => s.id === saved.id);
  if (found) {
    console.log('✅ Submission verified in persistent store:', found.name, found.company, found.email);
  } else {
    console.error('❌ Submission not found in store!');
  }
} catch (err) {
  console.error('❌ Error during test:', err);
}
