import { Router, Request, Response } from 'express';
import { saveApplication, getAllApplications } from '../database_store/recordsDb.ts';

const router = Router();

router.post('/apply', (req: Request, res: Response) => {
  try {
    const {
      fullName,
      email,
      phone,
      applicantType,
      organization,
      designation,
      district,
      linkedIn,
      interestAreas,
      statement
    } = req.body;

    if (!fullName || !email || !phone || !applicantType) {
      return res.status(400).json({
        success: false,
        message: 'Missing required qualification fields (fullName, email, phone, applicantType).'
      });
    }

    const application = saveApplication({
      fullName,
      email,
      phone,
      applicantType,
      organization: organization || 'Not Specified',
      designation: designation || 'Not Specified',
      district: district || 'Not Specified',
      linkedIn: linkedIn || '',
      interestAreas: Array.isArray(interestAreas) ? interestAreas : [],
      statement: statement || ''
    });

    res.status(201).json({
      success: true,
      message: 'Membership qualification application received and logged successfully.',
      application
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get('/applications', (req: Request, res: Response) => {
  try {
    const apps = getAllApplications();
    res.json({ success: true, count: apps.length, data: apps });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
