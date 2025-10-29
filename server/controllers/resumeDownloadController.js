let puppeteer;
try {
  puppeteer = require('puppeteer');
} catch (error) {
  console.warn('⚠️  Puppeteer not installed. Install it with: npm install puppeteer');
}

const generatePDF = async (htmlContent) => {
  if (!puppeteer) {
    throw new Error('Puppeteer is not installed. Please run: npm install puppeteer');
  }
  
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
  const pdf = await page.pdf({
    format: 'A4',
    printBackground: true,
    margin: { top: '0', right: '0', bottom: '0', left: '0' },
  });
  await browser.close();
  return pdf;
};

const generatePNG = async (htmlContent) => {
  if (!puppeteer) {
    throw new Error('Puppeteer is not installed. Please run: npm install puppeteer');
  }
  
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1600 });
  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
  const png = await page.screenshot({
    type: 'png',
    fullPage: true,
  });
  await browser.close();
  return png;
};

const downloadResumePDF = async (req, res) => {
  try {
    const { htmlContent } = req.body;

    if (!htmlContent) {
      return res.status(400).json({ error: 'HTML content is required' });
    }

    const pdf = await generatePDF(htmlContent);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=resume.pdf');
    res.send(pdf);
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).json({ error: 'Failed to generate PDF: ' + error.message });
  }
};

const downloadResumePNG = async (req, res) => {
  try {
    const { htmlContent } = req.body;

    if (!htmlContent) {
      return res.status(400).json({ error: 'HTML content is required' });
    }

    const png = await generatePNG(htmlContent);

    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Content-Disposition', 'attachment; filename=resume.png');
    res.send(png);
  } catch (error) {
    console.error('Error generating PNG:', error);
    res.status(500).json({ error: 'Failed to generate PNG: ' + error.message });
  }
};

module.exports = { downloadResumePDF, downloadResumePNG };

