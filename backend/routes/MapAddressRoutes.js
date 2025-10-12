import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

router.get('/directions', async (req, res) => {
  const { from, to } = req.query;
  const MAPQUEST_BASE_URL = "http://www.mapquestapi.com/directions/v2/route";
  const params = new URLSearchParams({ key: '6n8mOkjIr008hDT2QOx9Vs9NNsAmCWEz', from, to });

  try {
    const response = await fetch(`${MAPQUEST_BASE_URL}?${params}`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error in directions route:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
