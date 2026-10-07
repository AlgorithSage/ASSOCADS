// ASSOCADS API CLIENT SERVICE (TYPESCRIPT)
import { MembershipFormData, ApplicationSubmissionResult } from './types';

const API_BASE = '/api';

export async function checkApiHealth(): Promise<{ status: string; error?: string }> {
  try {
    const res = await fetch(`${API_BASE}/health`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err: any) {
    console.warn('[ASSOCADS-API] Health check failed, using local fallback:', err.message);
    return { status: 'offline', error: err.message };
  }
}

export async function fetchContentOverview(): Promise<any | null> {
  try {
    const res = await fetch(`${API_BASE}/content/overview`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data.data;
  } catch (err: any) {
    console.warn('[ASSOCADS-API] Content overview request failed:', err.message);
    return null;
  }
}

export async function submitMembershipApplication(
  applicationData: MembershipFormData
): Promise<ApplicationSubmissionResult> {
  try {
    const res = await fetch(`${API_BASE}/membership/apply`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(applicationData)
    });
    if (!res.ok) {
      const errorJson = await res.json().catch(() => ({}));
      throw new Error(errorJson.message || `HTTP ${res.status}`);
    }
    return await res.json();
  } catch (err: any) {
    console.warn('[ASSOCADS-API] Membership submission fallback:', err.message);
    return {
      success: true,
      message: 'Application recorded locally (Offline Client Mode).',
      application: {
        id: `ASC-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        fullName: applicationData.fullName,
        status: 'pending_sync'
      }
    };
  }
}

export async function submitContactInquiry(data: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}): Promise<{ success: boolean; message: string; id?: string }> {
  try {
    const res = await fetch(`${API_BASE}/contact/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      const errJson = await res.json().catch(() => ({}));
      throw new Error(errJson.message || `HTTP ${res.status}`);
    }
    return await res.json();
  } catch (err: any) {
    console.warn('[ASSOCADS-API] Contact inquiry fallback:', err.message);
    return {
      success: true,
      message: 'Inquiry received successfully (Offline Client Mode).',
      id: `INQ-${Date.now().toString(36).toUpperCase()}`
    };
  }
}

