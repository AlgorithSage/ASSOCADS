import { Router, Request, Response } from 'express';
import { getSeedData } from '../database_store/recordsDb.ts';

const router = Router();

router.get('/overview', (req: Request, res: Response) => {
  try {
    const data = getSeedData();
    res.json({ success: true, data });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get('/pillars', (req: Request, res: Response) => {
  try {
    const { pillars } = getSeedData();
    res.json({ success: true, data: pillars });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get('/roadmap', (req: Request, res: Response) => {
  try {
    const { roadmap } = getSeedData();
    res.json({ success: true, data: roadmap });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get('/events', (req: Request, res: Response) => {
  try {
    const { events } = getSeedData();
    res.json({ success: true, data: events });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get('/governance', (req: Request, res: Response) => {
  try {
    const { governance } = getSeedData();
    res.json({ success: true, data: governance });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
