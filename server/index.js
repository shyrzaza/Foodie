import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;
const STATE_FILE = path.join(__dirname, 'app-state.json');

app.use(cors());
app.use(express.json());

// Initialize state file if it doesn't exist
async function initStateFile() {
  try {
    await fs.access(STATE_FILE);
  } catch {
    await fs.writeFile(STATE_FILE, JSON.stringify({
      selected: [],
      skipped: [],
      done: false,
      cooking: false
    }, null, 2));
  }
}

// GET endpoint to retrieve current state
app.get('/api/state', async (req, res) => {
  try {
    const data = await fs.readFile(STATE_FILE, 'utf-8');
    res.json(JSON.parse(data));
  } catch (error) {
    console.error('Error reading state:', error);
    res.status(500).json({ error: 'Failed to read state' });
  }
});

// POST endpoint to update state
app.post('/api/state', async (req, res) => {
  try {
    const state = req.body;
    await fs.writeFile(STATE_FILE, JSON.stringify(state, null, 2));
    res.json({ success: true });
  } catch (error) {
    console.error('Error saving state:', error);
    res.status(500).json({ error: 'Failed to save state' });
  }
});

// DELETE endpoint to reset state
app.delete('/api/state', async (req, res) => {
  try {
    await fs.writeFile(STATE_FILE, JSON.stringify({
      selected: [],
      skipped: [],
      done: false,
      cooking: false
    }, null, 2));
    res.json({ success: true });
  } catch (error) {
    console.error('Error resetting state:', error);
    res.status(500).json({ error: 'Failed to reset state' });
  }
});

initStateFile().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
