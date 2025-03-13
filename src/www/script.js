function createConfirmPopup(options = {}) {
    // Základní nastavení proměnných
    const settings = {
      title: options.title || 'Potvrdit akci',
      message: options.message || 'Jste si jisti, že chcete pokračovat?',
      confirmText: options.confirmText || 'OK',
      cancelText: options.cancelText || 'Zrušit',
      width: options.width || '400px'
    };
    
    // Vytvoření elementů popupu
    const backdrop = document.createElement('div');
    backdrop.id = 'confirm-backdrop';
    backdrop.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    `;
    
    const popup = document.createElement('div');
    popup.id = 'confirm-popup';
    popup.style.cssText = `
      background-color: #fff;
      border-radius: 8px;
      padding: 20px;
      width: ${settings.width};
      max-width: 90%;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    `;
    
    // Titulek
    const titleElement = document.createElement('h3');
    titleElement.textContent = settings.title;
    titleElement.style.cssText = `
      margin: 0 0 15px 0;
      color: #333;
      font-size: 18px;
    `;
    
    // Zpráva
    const messageElement = document.createElement('p');
    messageElement.textContent = settings.message;
    messageElement.style.cssText = `
      margin: 0 0 20px 0;
      color: #555;
    `;
    
    // Div na buttony
    const buttonsContainer = document.createElement('div');
    buttonsContainer.style.cssText = `
      display: flex;
      justify-content: center;
      gap: 10px;
    `;
    
    // Zrušit button
    const cancelButton = document.createElement('button');
    cancelButton.textContent = settings.cancelText;
    cancelButton.style.cssText = `
      padding: 8px 16px;
      background-color: var(--pico-primary-background);
      border: none;
      border-radius: 4px;
      cursor: pointer;
    `;
    
    // Potvrdit button
    const confirmButton = document.createElement('button');
    confirmButton.textContent = settings.confirmText;
    confirmButton.style.cssText = `
      padding: 8px 16px;
      background-color: var(--delete-button);
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    `;
    
    // Složení popupu
    buttonsContainer.appendChild(confirmButton);
    buttonsContainer.appendChild(cancelButton);
    popup.appendChild(titleElement);
    popup.appendChild(messageElement);
    popup.appendChild(buttonsContainer);
    backdrop.appendChild(popup);
    
    // Odstranění
    function removePopup() {
      if (backdrop.parentNode) {
        document.body.removeChild(backdrop);
      }
    }
    
    // User input handler
    return function() {
      document.body.appendChild(backdrop);
      
      return new Promise(resolve => {
        confirmButton.onclick = function() {
          document.body.removeChild(backdrop);
          resolve(true);
        };
        
        cancelButton.onclick = function() {
          document.body.removeChild(backdrop);
          resolve(false);
        };
        
        backdrop.onclick = function(e) {
          if (e.target === backdrop) {
            removePopup();
            resolve(false);
          }
        };
        
        document.onkeydown = function(e) {
          if (e.key === 'Escape') {
            removePopup();
            resolve(false);
          }
        };
      });
    };
  }