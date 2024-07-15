(() => {
  const STYLE = `
    /* Global styles */
    .as-container {
      font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", "Segoe UI", Roboto, "system-ui", "sans-serif";
    }
 
    /* Toast styles */
    .as-toast-container {
      position: fixed;
      z-index: 2147483647;
      left: 1.5rem;
      right: 1.5rem;
      user-select: none;
      pointer-events: none;
    }
    @media (min-width: 640px) {
      .as-toast-container {
        left: 3rem;
        right: 3rem;
      }
    }
    .as-toast {
      background: transparent;
      padding: 0 0 1rem;
      display: flex;
      justify-content: flex-end;
      animation: as-slide-in 0.3s ease-in-out;
    }
    .as-toast-content {
      width: 100%;
      max-width: 350px;
      display: flex;
      align-items: start;
      justify-content: space-between;
      padding: 14px;
      background-color: rgba(220, 220, 220, 0.7);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
      border-radius: 10px;
      font-size: 1rem;
      line-height: 1.5;
      z-index: 50;
      color: rgb(47, 48, 60);
      box-sizing: border-box;
      text-align: left;
    }
    .as-toast-content-link {
      display: flex;
      flex-direction: row;
      gap: 14px;
      pointer-events: auto;
      width: 100%;
      cursor: pointer;
      transition: transform 0.2s ease-in-out;
    }
    .as-toast-content-link:hover {
      transform: scale(1.01);
    }
    .as-toast-hide {
      animation: as-fade-out 0.4s forwards;
    }
    @keyframes as-slide-in {
      from {
        opacity: 0.8;
        transform: translateX(5%);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
    @keyframes as-fade-out {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
      }
    }
    .as-toast-close-btn {
      background: none;
      border: none;
      cursor: pointer;
      color: rgb(55, 65, 81);
      font-size: 1.25rem;
      line-height: 1;
      padding: 0;
      margin-left: 0.5rem;
    }
    .as-toast-content-title {
      font-size: 1rem;
      font-weight: 600;
      color: rgb(3, 7, 18);
      margin-bottom: 0.25rem;
    }
    .as-toast-content-description {
      font-size: 1rem;
      font-weight: 400;
      line-height: 1.25;
      color: rgb(55, 65, 81);
    }
    .as-toast-image {
      width: 48px;
      height: 48px;
      object-fit: cover;
      object-position: center;
      flex-shrink: 0;
      border-radius: 8px;
    }
 
    /* Popup styles */
    .as-popup-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 2147483647;
    }
    .as-popup-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.15);
      display: none;
      justify-content: center;
      align-items: center;
      pointer-events: auto;
    }
    .as-popup {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      background: #fff;
      border-radius: 10px;
      text-align: center;
      width: 86%;
      max-width: 520px;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
      color: rgb(47, 48, 60);
      overflow: hidden;
    }
    .as-popup-image-container {
      width: 100%;
      position: relative;
    }
    .as-popup-image {
      width: 100%;
      height: auto;
      display: block;
    }
    .as-popup-close-btn {
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      background: rgba(220, 220, 220, 0.7);
      color: rgb(55, 65, 81);
      border: none;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      font-size: 20px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
    }
    .as-popup-content {
      padding: 24px;
      width: 100%;
      box-sizing: border-box;
    }
    .as-popup h2 {
      color: rgb(3, 7, 18);
      margin-top: 0;
      margin-bottom: 9px;
      font-size: 1.5rem;
      font-weight: 600;
    }
    .as-popup p {
      color: rgb(55, 65, 81);
      margin-top: 0;
      margin-bottom: 20px;
      font-size: 1rem;
      line-height: 1.4;
    }
    .as-popup-btn-bottom {
      background: #000;
      color: white;
      border: none;
      padding: 13px 16px;
      border-radius: 5px;
      cursor: pointer;
      display: block;
      text-decoration: none;
      font-size: 1rem;
      font-weight: 500;
      transition: background-color 0.2s ease-in-out;
      margin: 0 auto;
    }
    .as-popup-btn-bottom:hover {
      background-color: #333;
    }

    @media (min-width: 640px) {
      .as-popup {
        width: 520px;
      }
      .as-popup-close-btn {
        top: 1rem;
        right: 1rem;
        width: 36px;
        height: 36px;
        font-size: 24px;
      }
      .as-popup-content {
        padding: 20px;
      }
      .as-popup h2 {
        font-size: 1.25rem;
      }
      .as-popup p {
        font-size: 1rem;
        line-height: 1.5;
        margin-bottom: 24px;
      }
      .as-popup-btn-bottom {
        padding: 14px 20px;
        font-size: 1rem;
      }
    }
  `;

  const CONFIG = {
    localStorageVisitorIdName: 'as-visitor-id',
    localStorageImageUrlName: 'as-image-url',
    endpoint: 'https://www.actionspeak.kr/api',
    frequencyPrefix: 'as-frequency-',
    maxFrequencyPrefix: 'as-max-frequency-',
  };

  let toastTimeout;
  let toastInterval;
  let toastingQueue = [];
  let visitorId;
  let imageUrls = {};
  let websiteId;
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

  const showMessage = async (type, options = {}) => {
    if (!websiteId) {
      console.error(`Your website is not registered. Cannot show ${type}.`);
      return;
    }

    const { message, waitFor, duration, frequency } = options;
    message.id = await generateHash(message);
    setMaxFrequency(message.id, frequency);

    setTimeout(() => {
      if (shouldShowMessage(message.id, frequency)) {
        if (type === 'toast') {
          showToast({ message, duration });
        } else if (type === 'popup') {
          showPopup({ message });
        }
        incrementFrequency(message.id);
      }
    }, waitFor || 0);
  };

  /* Toast functions */

  const ensureToastContainer = (position) => {
    let container = document.querySelector('#as-toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'as-toast-container';
      container.className = 'as-toast-container as-container';
      document.body.appendChild(container);
    }
    container.style.top = position === 'top' ? '1.5rem' : 'auto';
    container.style.bottom = position === 'bottom' ? '1.5rem' : 'auto';
  };

  const createToast = async (message) => {
    let image = '';
    if (message.img && imageUrls[message.img]) {
      image = `<img class="as-toast-image" src="${imageUrls[message.img]}" alt="" />`;
    }
    const closeButton = message.closeButton
      ? '<button class="as-toast-close-btn" aria-label="Close">&times;</button>'
      : '';
    const content = `
      <div style="width: 100%;">
        <div class="as-toast-content-title">${message.title}</div>
        <div class="as-toast-content-description">${message.description}</div>
      </div>
      ${closeButton}
    `;

    if (message.link && message.link.includes('http')) {
      return `
        <div role="button" class="as-toast-content as-toast-content-link" onclick="window.open('${message.link}', '_blank')">
          ${image}
          ${content}
        </div>
      `;
    } else {
      return `
        <div class="as-toast-content" style="pointer-events: auto;">
          ${image}
          ${content}
        </div>
      `;
    }
  };

  const showToast = async ({ message, duration }) => {
    ensureToastContainer(message.position);

    const toastId = `as-toast-${Date.now()}`;
    const toast = document.createElement('div');
    toast.id = toastId;
    toast.className = 'as-toast';
    toast.innerHTML = await createToast(message);

    if (window.innerWidth < 640) {
      toastingQueue.forEach((id) => removeToast(id, true));
    }

    document.querySelector('#as-toast-container').prepend(toast);
    toastingQueue.push(toastId);

    const closeButton = toast.querySelector('.as-toast-close-btn');
    if (closeButton) {
      closeButton.addEventListener('click', (event) => {
        event.stopPropagation();
        removeToast(toastId, true);
      });
    }

    setTimeout(() => {
      removeToast(toastId, false);
    }, duration || 10000);
  };

  const removeToast = (toastId, force = false) => {
    const toast = document.getElementById(toastId);

    if (!toast) return;

    if (force) {
      toast.remove();
      toastingQueue = toastingQueue.filter((t) => t !== toastId);
    } else {
      toast.classList.add('as-toast-hide');
      setTimeout(() => {
        if (toast) {
          toast.remove();
          toastingQueue = toastingQueue.filter((t) => t !== toastId);
        }
      }, 400);
    }
  };

  const cleanupToasts = () => {
    if (toastTimeout) clearTimeout(toastTimeout);
    if (toastInterval) clearInterval(toastInterval);
    toastingQueue.forEach((id) => removeToast(id));
  };

  /* Popup functions */

  const ensurePopupContainer = () => {
    let container = document.querySelector('#as-popup-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'as-popup-container';
      container.className = 'as-popup-container as-container';
      document.body.appendChild(container);
    }
    return container;
  };

  const createPopup = (message, popupId) => {
    return `
    <div class="as-popup-overlay" id="${popupId}-overlay">
      <div class="as-popup">
        <div class="as-popup-image-container">
          ${message.img ? `<img class="as-popup-image" src="${imageUrls[message.img]}" alt="${message.title}">` : ''}
          <button class="as-popup-close-btn" onclick="window.actionSpeak.closePopup('${popupId}')">&times;</button>
        </div>
        <div class="as-popup-content">
          <h2>${message.title}</h2>
          <p>${message.description}</p>
          ${
            message.button && message.buttonLink
              ? `
            <a href="${message.buttonLink}" target="_blank" class="as-popup-btn-bottom" onclick="window.actionSpeak.closePopup('${popupId}')">
              ${message.button}
            </a>
          `
              : ''
          }
        </div>
      </div>
    </div>
  `;
  };

  const showPopup = ({ message }) => {
    const container = ensurePopupContainer();
    const popupId = `as-popup-${Date.now()}`;
    const popupContent = createPopup(message, popupId);

    container.insertAdjacentHTML('beforeend', popupContent);

    const overlay = document.getElementById(`${popupId}-overlay`);
    overlay.style.display = 'flex';

    overlay.addEventListener('click', (event) => {
      if (event.target === overlay) {
        window.actionSpeak.closePopup(popupId);
      }
    });
  };

  const closePopup = (popupId) => {
    const overlay = document.getElementById(`${popupId}-overlay`);
    if (overlay) {
      overlay.style.display = 'none';
      setTimeout(() => {
        overlay.remove();
      }, 300); // 애니메이션을 위한 지연 시간
    }
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

  const incrementFrequency = (id) => {
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

  const shouldShowMessage = (id, maxFrequency) => {
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
      websiteId = await getWebsiteIdByDomain(domain);
      if (websiteId) {
        imageUrls = await getImagesByWebsiteId(websiteId);
      } else {
        console.error('Website is not registered');
      }
    } catch (error) {
      console.error(error);
    }
  };

  window.actionSpeak = window.actionSpeak || {};

  window.actionSpeak.showToast = async (...args) => {
    const [options] = args;
    await showMessage('toast', options);
  };

  window.actionSpeak.showPopup = async (...args) => {
    const [options] = args;
    await showMessage('popup', options);
  };

  window.actionSpeak.closePopup = closePopup;

  window.actionSpeak.imageFetch = async () => {
    try {
      const websiteId = window.location.href.split('/').pop();
      imageUrls = await getImagesByWebsiteId(websiteId);
    } catch (error) {
      console.error(error);
    }
  };

  initialize();
})();
