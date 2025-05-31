import express from 'express';
import path from 'path';
import multer from 'multer';
import { fileURLToPath } from 'url';

// adding flename and dirname for ES modules
// __filename and __dirname are not available in ES modules, so we create them
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { mergePdfs } from './merge.js';

const app = express();
const upload = multer({ dest: 'uploads/' });
const port = 3000;
app.use("/static",express.static('public'))


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/merge', upload.array('pdfs', 15), async (req, res) => {
  try {
    const files = req.files.map(file => path.join(__dirname, file.path));
    
    let d = await mergePdfs(...files);
    
    res.redirect(`http://localhost:3000/static/${d}.pdf`);
  } catch (error) {
    console.error('Error merging PDFs:', error); 
    res.status(500).send('Error merging PDFs');
  }
});


app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
