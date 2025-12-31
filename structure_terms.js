const fs = require('fs');

// Read the current content
const nlData = JSON.parse(fs.readFileSync('locales/nl.json', 'utf8'));
const enData = JSON.parse(fs.readFileSync('locales/en.json', 'utf8'));

function structureContent(content) {
  // Split into sections
  let structured = content;
  
  // Replace article headers with H2
  structured = structured.replace(/^(Artikel \d+ – [^\n]+)/gm, '<h2 style="font-size: 1.5rem; font-weight: 700; margin-top: 2rem; margin-bottom: 1rem;">$1</h2>');
  
  // Replace "Bijlage" with H2
  structured = structured.replace(/^(Bijlage \d+ – [^\n]+)/gm, '<h2 style="font-size: 1.5rem; font-weight: 700; margin-top: 2rem; margin-bottom: 1rem;">$1</h2>');
  
  // Structure definitions (Artikel 1)
  structured = structured.replace(/In deze voorwaarden wordt verstaan onder:\n((?:[^\n]+: [^\n]+\n?)+)/g, 
    '<p style="margin-bottom: 1rem;">In deze voorwaarden wordt verstaan onder:</p><ul style="list-style: disc; padding-left: 1.5rem; margin-bottom: 1.5rem;">$1</ul>');
  structured = structured.replace(/([A-Z][^:]+): ([^\n]+)\n/g, '<li style="margin-bottom: 0.5rem;"><strong>$1:</strong> $2</li>');
  
  // Structure bullet lists (verboden gedrag, etc.)
  structured = structured.replace(/Het is verboden \(niet-limitatief\):\n((?:[^\n]+;\n?)+)/g,
    '<p style="margin-bottom: 0.5rem;">Het is verboden (niet-limitatief):</p><ul style="list-style: disc; padding-left: 1.5rem; margin-bottom: 1.5rem;">$1</ul>');
  structured = structured.replace(/([^\n]+);\n/g, '<li style="margin-bottom: 0.5rem;">$1</li>');
  
  // Structure numbered lists (Annuleringsregeling)
  structured = structured.replace(/Annuleringsregeling door Deelnemer:\n((?:[^\n]+:\n?)+)/g,
    '<p style="margin-bottom: 0.5rem;"><strong>Annuleringsregeling door Deelnemer:</strong></p><ul style="list-style: disc; padding-left: 1.5rem; margin-bottom: 1.5rem;">$1</ul>');
  
  // Wrap paragraphs
  structured = structured.replace(/([^\n]+)\n\n/g, '<p style="margin-bottom: 1rem;">$1</p>');
  
  return structured;
}

// This is a simplified version - we'll do it manually for better control
console.log('Content structure helper ready');
