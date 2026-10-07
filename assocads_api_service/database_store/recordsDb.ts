import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const seedPath = path.join(__dirname, 'seedData.json');
const appsPath = path.join(__dirname, 'applications.json');

// Ensure applications file exists
if (!fs.existsSync(appsPath)) {
  fs.writeFileSync(appsPath, JSON.stringify([], null, 2), 'utf-8');
}

export interface ApplicationRecord {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  applicantType: string;
  organization?: string;
  designation?: string;
  district?: string;
  linkedIn?: string;
  interestAreas?: string[];
  statement?: string;
  status: string;
  submittedAt: string;
}

export function getSeedData(): any {
  const content = fs.readFileSync(seedPath, 'utf-8');
  return JSON.parse(content);
}

export function getAllApplications(): ApplicationRecord[] {
  const content = fs.readFileSync(appsPath, 'utf-8');
  return JSON.parse(content);
}

export function saveApplication(appData: Partial<ApplicationRecord>): ApplicationRecord {
  const apps = getAllApplications();
  const newApp: ApplicationRecord = {
    id: `ASC-2026-${Math.floor(1000 + Math.random() * 9000)}`,
    fullName: appData.fullName || 'Anonymous',
    email: appData.email || '',
    phone: appData.phone || '',
    applicantType: appData.applicantType || 'Professional',
    organization: appData.organization || 'Not Specified',
    designation: appData.designation || 'Not Specified',
    district: appData.district || 'Not Specified',
    linkedIn: appData.linkedIn || '',
    interestAreas: appData.interestAreas || [],
    statement: appData.statement || '',
    status: 'received_under_review',
    submittedAt: new Date().toISOString()
  };
  apps.unshift(newApp);
  fs.writeFileSync(appsPath, JSON.stringify(apps, null, 2), 'utf-8');
  return newApp;
}
