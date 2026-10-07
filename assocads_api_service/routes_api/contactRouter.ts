import { Router, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const inquiriesPath = path.join(__dirname, '..', 'database_store', 'inquiries.json');

// Ensure inquiries file exists
if (!fs.existsSync(inquiriesPath)) {
  fs.writeFileSync(inquiriesPath, JSON.stringify([], null, 2), 'utf-8');
}

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  submittedAt: string;
  status: string;
}

const router = Router();

router.post('/submit', (req: Request, res: Response) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required fields.'
      });
    }

    const fileContent = fs.readFileSync(inquiriesPath, 'utf-8');
    const inquiries: ContactInquiry[] = JSON.parse(fileContent);

    const newInquiry: ContactInquiry = {
      id: `INQ-${Date.now().toString(36).toUpperCase()}`,
      name,
      email,
      phone: phone || '',
      message,
      submittedAt: new Date().toISOString(),
      status: 'new'
    };

    inquiries.unshift(newInquiry);
    fs.writeFileSync(inquiriesPath, JSON.stringify(inquiries, null, 2), 'utf-8');

    return res.status(201).json({
      success: true,
      message: 'Thank you for reaching out. The ASSOCADS Secretariat will get in touch shortly.',
      inquiry: newInquiry
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

router.get('/list', (req: Request, res: Response) => {
  try {
    const fileContent = fs.readFileSync(inquiriesPath, 'utf-8');
    const inquiries: ContactInquiry[] = JSON.parse(fileContent);
    return res.json({ success: true, count: inquiries.length, data: inquiries });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
