(() => {
  const STYLE = `
    /* Toast styles */
    .actionSpeak-toast-container {
        position: fixed;
        z-index: 2147483647;
        left: 3rem;
        right: 3rem;
        user-select: none;
        pointer-events: none;
    }
    @media (max-width: 640px) {
        .actionSpeak-toast-container {
            left: 1.5rem;
            right: 1.5rem;
        }
    }
    .actionSpeak-toast {
        background: transparent;
        padding: 0 0 16px 0;
        display: flex;
        justify-content: flex-end;
        animation: slideIn 0.3s ease-in-out;
    }
    .actionSpeak-toast-content {
        width: 100%;
        display: flex;
        align-items: start;
        justify-content: space-between;
        padding: 14px;
        background-color: rgba(220, 220, 220, 0.7);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
        border-radius: 10px;
        font-size: 1rem;
        line-height: 1.5rem;
        z-index: 50;
        color: rgb(47, 48, 60);
        box-sizing: border-box;
        font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", "Segoe UI", Roboto, "system-ui", "sans-serif";
        text-align: left;
    }
    @media (min-width: 640px) {
        .actionSpeak-toast-content {
            max-width: 350px;
        }
    }
    .toast-hide {
        animation: fadeOut 0.4s forwards;
    }
    @keyframes slideIn {
        from {
            opacity: 0.8;
            transform: translateX(5%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
    .toast-close-btn {
        background: none;
        border: none;
        cursor: pointer;
        color: rgb(55 65 81);
        font-size: 1.25rem;
        line-height: 1;
        padding: 0;
        margin-left: 0.5rem;
    }

    /* Popup styles */
    .actionSpeak-popup-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: none;
        justify-content: center;
        align-items: center;
        z-index: 9999;
    }
    .actionSpeak-popup {
        position: relative;
        background: #fff;
        padding: 20px;
        border-radius: 10px;
        text-align: center;
        width: 300px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    .actionSpeak-popup-close-btn {
        background: #000;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        margin-top: 10px;
    }
    .actionSpeak-popup-close-btn-top-right {
        position: absolute;
        top: 10px;
        right: 10px;
        background: transparent;
        color: #000;
        border: none;
        font-size: 20px;
        cursor: pointer;
    }
    .actionSpeak-popup img {
        max-width: 100%;
        height: auto;
        border-radius: 10px;
        margin-bottom: 15px;
    }
  `;

  const CONFIG = {
    localStorageVisitorIdName: 'actionSpeak-visitor-id',
    localStorageImageUrlName: 'actionSpeak-image-url',
    endpoint: 'https://www.actionspeak.kr/api',
    frequencyPrefix: 'actionSpeak-frequency-',
    maxFrequencyPrefix: 'actionSpeak-max-frequency-',
  };

  let toastTimeout;
  let toastInterval;
  let toasting = [];
  let visitorId;
  let imageUrls = {};
  const domain = document.currentScript.getAttribute('data-domain');

  const generateHash = async (message) => {
    const msgStr = JSON.stringify(message);
    const msgUint8 = new TextEncoder().encode(msgStr);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  };

  const getVisitorId = () => {
    visitorId = localStorage.getItem(CONFIG.localStorageVisitorIdName);

    if (!visitorId) {
      visitorId = Date.now().toString(36) + Math.random().toString(36).substr(2);
      localStorage.setItem(CONFIG.localStorageVisitorIdName, visitorId);
    }

    return visitorId;
  };

  /* Toast functions */

  const ensureToastContainer = (position) => {
    let container = document.querySelector('#actionSpeak-toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'actionSpeak-toast-container';
      container.className = 'actionSpeak-toast-container';
      document.body.appendChild(container);
    }
    container.style.top = position === 'top' ? '3rem' : 'auto';
    container.style.bottom = position === 'bottom' ? '3rem' : 'auto';
  };

  const createToast = async (message) => {
    let image = '';
    if (message.img && imageUrls[message.img]) {
      image = `<img src="${imageUrls[message.img]}" style="width: 3rem; height: 3rem; object-fit: cover; object-position: center; flex-shrink: 0; border-radius: 8px;" width="48" height="48" alt="" />`;
    }
    const closeButton = message.closeButton
      ? '<button class="toast-close-btn" aria-label="Close">&times;</button>'
      : '';
    const content = `
          <div style="width: 100%;">
              <div style="font-size: 1rem; font-weight: 600; color: rgb(3 7 18); margin-bottom: 0.25rem;">${message.title}</div>
              <div style="font-size: 1rem; font-weight: 400; line-height: 1.25; color: rgb(55 65 81);">${message.description}</div>
          </div>
          ${closeButton}
      `;

    if (message.link && message.link.includes('http')) {
      return `
              <div role="button" class="actionSpeak-toast-content" style="display: flex; flex-direction: row; gap: 14px; pointer-events: auto; width: 100%; cursor: pointer; transition: transform 0.2s ease-in-out;" onmouseover="this.style.transform = 'scale(1.01)';" onmouseout="this.style.transform = 'scale(1)';" onclick="window.open('${message.link}', '_blank')">
                  ${image}
                  ${content}
              </div>
          `;
    } else {
      return `
              <div class="actionSpeak-toast-content" style="pointer-events: auto;">
                  ${image}
                  ${content}
              </div>
          `;
    }
  };

  const showToast = async (options = {}) => {
    const { message, waitFor, toastDuration, frequency } = options;

    setTimeout(async () => {
      if (shouldShowToast(message.id, frequency)) {
        ensureToastContainer(message.position);

        const toastId = `toast-${Date.now()}`;
        const toast = document.createElement('div');
        toast.id = toastId;
        toast.className = 'actionSpeak-toast';
        toast.innerHTML = await createToast(message);

        if (window.innerWidth < 640) {
          toasting.forEach((id) => removeToast(id, true));
        }

        document.querySelector('#actionSpeak-toast-container').prepend(toast);
        toasting.push(toastId);

        const closeButton = toast.querySelector('.toast-close-btn');
        if (closeButton) {
          closeButton.addEventListener('click', (event) => {
            event.stopPropagation();
            removeToast(toastId, true, message.id);
          });
        }

        setTimeout(() => {
          removeToast(toastId, false, message.id);
        }, toastDuration || 10000);

        incrementToastFrequency(message.id);
      }
    }, waitFor || 0);
  };

  const removeToast = (toastId, force = false, id = '') => {
    const toast = document.getElementById(toastId);

    if (!toast) return;

    if (!toast.dataset.removed) {
      toast.dataset.removed = true;
      if (id) incrementToastFrequency(id);
    }

    if (force) {
      toast.remove();
      toasting = toasting.filter((t) => t !== toastId);
    } else {
      toast.classList.add('toast-hide');
      setTimeout(() => {
        if (toast) {
          toast.remove();
          toasting = toasting.filter((t) => t !== toastId);
        }
      }, 400);
    }
  };

  const cleanupToasts = () => {
    if (toastTimeout) clearTimeout(toastTimeout);
    if (toastInterval) clearInterval(toastInterval);
    toasting.forEach((id) => removeToast(id));
  };

  /* Popup functions */

  const createPopup = (message) => {
    const popupOverlay = document.createElement('div');
    popupOverlay.className = 'actionSpeak-popup-overlay';
    popupOverlay.innerHTML = `
        <div class="actionSpeak-popup">
            <button class="actionSpeak-popup-close-btn-top-right" onclick="this.parentNode.parentNode.style.display = 'none'">×</button>
            ${message.img ? `<img src="${imageUrls[message.img]}" alt="${message.title}">` : ''}
            <h2>${message.title}</h2>
            <p>${message.description}</p>
            ${message.link ? `<a href="${message.link}" target="_blank" class="actionSpeak-popup-close-btn" onclick="this.parentNode.parentNode.style.display = 'none'">${message.button || 'Close'}</a>` : `<button class="actionSpeak-popup-close-btn" onclick="this.parentNode.parentNode.style.display = 'none'">${message.button || 'Close'}</button>`}
        </div>
    `;
    return popupOverlay;
  };

  const showPopup = (options = {}) => {
    const { message, waitFor, frequency } = options;

    setTimeout(() => {
      if (shouldShowPopup(message.id, frequency)) {
        const popupOverlay = createPopup(message);
        document.body.appendChild(popupOverlay);
        popupOverlay.style.display = 'flex';
        incrementPopupFrequency(message.id);
      }
    }, waitFor || 0);
  };

  /* Utility functions */

  const getWebsiteIdByDomain = async (domain) => {
    const response = await fetch(`${CONFIG.endpoint}/get-website-id`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ domain }),
      mode: 'cors',
    });

    const data = await response.json();
    if (response.ok) {
      return data.website_id;
    }
    throw new Error('Failed to get website ID');
  };

  const getImagesByWebsiteId = async (websiteId) => {
    const response = await fetch(`${CONFIG.endpoint}/get-images`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ website_id: websiteId }),
      mode: 'cors',
    });

    const data = await response.json();
    if (response.ok) {
      return data.imageUrls || {};
    }
    throw new Error('Failed to get images');
  };

  const getFrequency = (id) => {
    const frequency = localStorage.getItem(CONFIG.frequencyPrefix + id);
    return frequency ? parseInt(frequency, 10) : 0;
  };

  const incrementToastFrequency = (id) => {
    const frequency = getFrequency(id);
    localStorage.setItem(CONFIG.frequencyPrefix + id, frequency + 1);
  };

  const incrementPopupFrequency = (id) => {
    const frequency = getFrequency(id);
    localStorage.setItem(CONFIG.frequencyPrefix + id, frequency + 1);
  };

  const getMaxFrequency = (id) => {
    const maxFrequency = localStorage.getItem(CONFIG.maxFrequencyPrefix + id);
    return maxFrequency ? parseInt(maxFrequency, 10) : 0;
  };

  const setMaxFrequency = (id, maxFrequency) => {
    if (localStorage.getItem(CONFIG.maxFrequencyPrefix + id) === null) {
      localStorage.setItem(CONFIG.maxFrequencyPrefix + id, maxFrequency);
    }
  };

  const shouldShowToast = (id, maxFrequency) => {
    setMaxFrequency(id, maxFrequency);
    const frequency = getFrequency(id);
    return frequency < getMaxFrequency(id);
  };

  const shouldShowPopup = (id, maxFrequency) => {
    setMaxFrequency(id, maxFrequency);
    const frequency = getFrequency(id);
    return frequency < getMaxFrequency(id);
  };

  const initialize = async () => {
    getVisitorId();

    const styleEl = document.createElement('style');
    styleEl.innerHTML = STYLE;
    document.head.appendChild(styleEl);

    try {
      const websiteId = await getWebsiteIdByDomain(domain);
      imageUrls = await getImagesByWebsiteId(websiteId);
    } catch (error) {
      console.error(error);
    }
  };

  window.actionSpeak = window.actionSpeak || {};

  window.actionSpeak.showToast = async (...args) => {
    const [config] = args;
    config.message.id = await generateHash(config.message);
    setMaxFrequency(config.message.id, config.frequency);
    showToast(config);
  };

  window.actionSpeak.showPopup = async (...args) => {
    const [config] = args;
    config.message.id = await generateHash(config.message);
    setMaxFrequency(config.message.id, config.frequency);
    showPopup(config);
  };

  initialize();
})();
