const https = require('https');
const fs = require('fs');

const pages = [
  '/view/transformationafrica/purpose',
  '/view/transformationafrica/purpose/background-scope',
  '/view/transformationafrica/purpose/mission',
  '/view/transformationafrica/purpose/ecosystem-approach',
  '/view/transformationafrica/purpose/un-sdgs-africa-agenda-2063',
  '/view/transformationafrica/purpose/key-competences-model',
  '/view/transformationafrica/purpose/testimonials',
  '/view/transformationafrica/purpose/core-team',
  '/view/transformationafrica/purpose/contact',
  '/view/transformationafrica/people',
  '/view/transformationafrica/people/students-associates',
  '/view/transformationafrica/people/higher-education-systems',
  '/view/transformationafrica/people/industry-businesses',
  '/view/transformationafrica/people/start-up-impact-hubs',
  '/view/transformationafrica/people/non-profit-organisations',
  '/view/transformationafrica/people/learning-outcomes',
  '/view/transformationafrica/people/training-development',
  '/view/transformationafrica/projects',
  '/view/transformationafrica/projects/general-approach',
  '/view/transformationafrica/projects/types',
  '/view/transformationafrica/projects/types/coils',
  '/view/transformationafrica/projects/types/short-term-study-tours',
  '/view/transformationafrica/projects/types/bama-thesis',
  '/view/transformationafrica/projects/types/internships',
  '/view/transformationafrica/projects/project-pipeline',
  '/view/transformationafrica/projects/overview',
  '/view/transformationafrica/partnership',
  '/view/transformationafrica/partnership/membership',
  '/view/transformationafrica/partnership/sponsorship',
  '/view/transformationafrica/partnership/events-conferences',
  '/view/transformationafrica/partnership/financial-aspects',
  '/view/transformationafrica/partnership/contact',
  '/view/transformationafrica/personal-login',
  '/view/transformationafrica/personal-login/individual-registration',
  '/view/transformationafrica/personal-login/project-ideas-assignments'
];

async function inspectPage(path) {
  return new Promise((resolve) => {
    https.get('https://sites.google.com' + path, (res) => {
      let html = '';
      res.on('data', chunk => html += chunk);
      res.on('end', () => {
        const docs = html.match(/https?:\/\/(?:docs|drive)\.google\.com\/[^\s"'>]+/g) || [];
        const imgs = html.match(/https?:\/\/[^\s"'>]*googleusercontent\.com[^\s"'>]+/g) || [];
        resolve({ path, docs: [...new Set(docs)], imgs: imgs.slice(0, 5) });
      });
    }).on('error', () => resolve({ path, docs: [], imgs: [] }));
  });
}

(async () => {
  const all = {};
  for (const p of pages) {
    all[p] = await inspectPage(p);
    if (all[p].docs.length > 0) {
      console.log(p, 'Found docs:', all[p].docs);
    }
  }
  fs.writeFileSync('site_embeds.json', JSON.stringify(all, null, 2));
  console.log('Saved site_embeds.json');
})();
