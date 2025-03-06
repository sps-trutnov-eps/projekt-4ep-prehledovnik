const fs = require('fs');
const path = require('path');

// Function to read and parse the markdown file
function parseModuleContent() {
  try {
    // Path to the markdown file
    const filePath = path.join(__dirname, '../../../doc/navod.md');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    
    // Object to store module content
    const modules = {};
    
    // Current module being processed
    let currentModule = null;
    let currentItems = [];
    
    // Split content by lines
    const lines = fileContent.split('\n');
    
    for (const line of lines) {
      // Check if line is a header (starts with #)
      if (line.startsWith('# ')) {
        // If we were processing a module, save its items
        if (currentModule) {
          modules[currentModule] = currentItems;
        }
        
        // Get the new module name (remove # and convert to lowercase)
        const headerText = line.substring(2).trim();
        
        // Map header text to module keys
        let moduleKey;
        if (headerText === 'Začněte s přehledovníkem') {
          moduleKey = 'home';
        } else if (headerText === 'Kalendář') {
          moduleKey = 'kalendar';
        } else {
          // For other headers, convert to lowercase and remove diacritics
          moduleKey = headerText.toLowerCase()
            .normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // Remove diacritics
        }
        
        currentModule = moduleKey;
        currentItems = [];
      } 
      // If line is not empty and not a header, and we're in a module, add it as content
      else if (line.trim() && currentModule) {
        currentItems.push({ content: line.trim() });
      }
    }
    
    // Don't forget to add the last module
    if (currentModule) {
      modules[currentModule] = currentItems;
    }
    
    return modules;
  } catch (error) {
    console.error('Error parsing markdown file:', error);
    // Return empty object in case of error
    return {};
  }
}

// Cache for module content
let moduleContentCache = null;

// Helper function to render the page with appropriate timeline content
function renderModulePage(req, res, module) {
  let title = module === 'home' ? 'Začněte s přehledovníkem' : module.charAt(0).toUpperCase() + module.slice(1);
  if (title == 'Kalendar') title = 'Kalendář';
  
  // Load content if not already cached
  if (!moduleContentCache) {
    moduleContentCache = parseModuleContent();
  }
  
  // Get items for the requested module
  const timelineItems = moduleContentCache[module] || [];
  
  res.render('index', { 
    title: title,
    activeModule: module,
    timelineItems: timelineItems
  });
}

// Controller methods for each route
exports.showModulesHome = (req, res) => {
  renderModulePage(req, res, 'home');
};

exports.showKalendar = (req, res) => {
  renderModulePage(req, res, 'kalendar');
};

exports.showRozvrh = (req, res) => {
  renderModulePage(req, res, 'rozvrh');
};

exports.showProjekty = (req, res) => {
  renderModulePage(req, res, 'projekty');
};

exports.showUdalosti = (req, res) => {
  renderModulePage(req, res, 'udalosti');
};

exports.showOsnovy = (req, res) => {
  renderModulePage(req, res, 'osnovy');
};

exports.showMaturita = (req, res) => {
  renderModulePage(req, res, 'maturita');
};