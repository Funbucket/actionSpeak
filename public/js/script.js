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
      position: relative;
      width: 100%;
      max-width: 350px;
      display: flex;
      align-items: flex-start;
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
      align-items: center;
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

    .as-toast-image-container {
      flex-shrink: 0;
      width: 55px;
      height: 55px;
      overflow: hidden;
      border-radius: 8px;
    }

    .as-toast-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
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
      position: absolute;
      top: 10px;
      right: 10px;
      background: none;
      border: none;
      cursor: pointer;
      color: rgb(55, 65, 81);
      font-size: 1.25rem;
      line-height: 1;
      padding: 0;
      z-index: 1;
    }

    .as-toast-content-wrapper {
      gap: 14px;
      display: flex;
      align-items: center;
      width: 100%;
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
      padding: 0;
      line-height: 1;
    }
      
    .as-popup-close-icon {
      width: 16px;
      height: 16px;
    }

    @media (min-width: 640px) {
      .as-popup-close-btn {
        top: 1rem;
        right: 1rem;
        width: 36px;
        height: 36px;
      }
      
      .as-popup-close-icon {
        width: 20px;
        height: 20px;
      }
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

    /* Mac Window styles */
    .as-macwindow-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 2147483647;
    }

    .as-macwindow-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: 0;
      transition: opacity 0.3s ease;
      pointer-events: none;
    }

    .as-macwindow-overlay.active {
      opacity: 1;
      pointer-events: auto;
    }

    .as-mac-window {
      border-radius: 5px;
      overflow: hidden;
      width: 600px;
      max-width: 90%;
      height: auto;
      box-shadow: 0 15px 20px rgba(0, 0, 0, 0.25);
      background: white;
      transform: scale(0.9) translate(-50%, -50%);
      opacity: 0;
      transition: all 0.3s ease;
      position: absolute;
      top: 50%;
      left: 50%;
    }

    .as-mac-window.active {
      transform: scale(1) translate(-50%, -50%);
      opacity: 1;
    }

    .as-mac-window.minimize {
      transform: translate(-50%, 50%) scale(1);
      opacity: 1;
      transition: all 0.5s;
    }

    .as-mac-window.minimize:hover {
      transform: translate(-50%, 45%) scale(1);
      transition: all 0.5s;
    }

    .as-mac-window.maximize {
      width: 100% !important;
      max-width: 100% !important;
      border-radius: 0;
      transform: translate(-50%, -50%) scale(1);
    }

    .as-mac-window .title-bar {
      background: linear-gradient(to top, rgb(200,197,200), rgb(234,231,234));
      height: 20px;
      border-bottom: 1px solid rgb(180, 180, 180);
      width: 100%;
      overflow: hidden;
      position: relative;
    }

    .as-mac-window .title-bar .buttons {
      position: absolute;
      left: 9px;
      top: 5px;
      height: 10px;
    }

    .as-mac-window .title-bar .buttons div {
      float: left;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      margin-right: 4px;
      position: relative;
    }

    .as-mac-window .title-bar .buttons .close {
      background: rgb(251, 73, 72);
      border: solid 1px rgba(214, 46, 48, 0.15);
    }

    .as-mac-window .title-bar .buttons .minimize {
      background: rgb(253, 178, 37);
      border: solid 1px rgba(213, 142, 27, 0.15);
    }

    .as-mac-window .title-bar .buttons .maximize {
      background: rgb(42, 200, 51);
      border: solid 1px rgba(30, 159, 32, 0.15);
    }

    .as-mac-window .title-bar .buttons div::before,
    .as-mac-window .title-bar .buttons div::after {
      content: '';
      position: absolute;
      opacity: 0;
      transition: opacity 0.2s ease;
    }

    .as-mac-window .title-bar .buttons:hover div::before,
    .as-mac-window .title-bar .buttons:hover div::after {
      opacity: 1;
    }

    .as-mac-window .title-bar .buttons .close::before,
    .as-mac-window .title-bar .buttons .close::after {
      width: 8px;
      height: 1px;
      background: rgb(54,0,0);
      top: 50%;
      left: 50%;
    }

    .as-mac-window .title-bar .buttons .close::before {
      transform: translate(-50%, -50%) rotate(45deg);
    }

    .as-mac-window .title-bar .buttons .close::after {
      transform: translate(-50%, -50%) rotate(-45deg);
    }

    .as-mac-window .title-bar .buttons .minimize::before {
      width: 8px;
      height: 1px;
      background: rgb(134,69,2);
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .as-mac-window .title-bar .buttons .maximize::before {
      content: '';
      position: absolute;
      width: 7px;
      height: 7px;
      background: rgb(11, 84, 1);
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border: solid 1px rgb(42, 200, 51);
      border-radius: 2px;
      opacity: 0;
      transition: opacity 0.2s ease;
    }


    .as-mac-window .title-bar .buttons .maximize::after {
      content: '';
      position: absolute;
      width: 10px;
      height: 2px;
      background: rgb(42, 200, 51);
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(45deg);
      opacity: 0;
      transition: opacity 0.2s ease;
    }


    .as-mac-window .title-bar .title {
      text-align: center;
      line-height: 20px;
      font-family: 'Helvetica Neue', helvetica, arial, sans-serif;
      font-size: 13px;
      font-weight: 300;
      color: rgb(34,32,34);
    }

    .as-mac-window .window {
      background: white;
      overflow: hidden;
    }

    .as-mac-window .window img {
      width: 100%;
      height: auto;
      display: block;
    }

    @media (max-width: 640px) {
      .as-mac-window.minimize {
        transform: translate(-50%, 100%) scale(1);
      }

      .as-mac-window.minimize:hover {
        transform: translate(-50%, 95%) scale(1);
        transition: all 0.5s;
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

  const show = async (type, config) => {
    if (!websiteId) {
      console.error(`Your website is not registered. Cannot show ${type}.`);
      return;
    }

    const { options, ...content } = config;
    const { waitFor, duration, frequency } = options || {};

    content.id = await generateHash(content);
    setMaxFrequency(content.id, frequency);

    setTimeout(() => {
      if (shouldShowBasedOnFrequency(content.id, frequency)) {
        if (type === 'toast') {
          showToast(content, duration);
        } else if (type === 'basicPopup') {
          showBasicPopup(content);
        } else if (type === 'macWindowPopup') {
          showMacWindowPopup(content);
        }
        incrementFrequency(content.id);
      }
    }, waitFor || 0);
  };

  /* Toast */
  const createToastContainer = (position) => {
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

  const createToastElement = (content) => {
    let image = '';
    if (content.imageName && imageUrls[content.imageName]) {
      image = `
        <div class="as-toast-image-container">
          <img class="as-toast-image" src="${imageUrls[content.imageName]}" alt="" />
        </div>
      `;
    }

    const closeButton = content.closeButton
      ? '<button class="as-toast-close-btn" aria-label="Close">&times;</button>'
      : '';

    const contentHtml = `
      <div class="as-toast-content-wrapper">
        ${image}
        <div style="width: 100%;">
          <div class="as-toast-content-title">${content.title}</div>
          <div class="as-toast-content-description">${content.description}</div>
        </div>
      </div>
    `;

    if (content.link && content.link.includes('http')) {
      return `
        <div role="button" class="as-toast-content as-toast-content-link" onclick="window.open('${content.link}', '_blank')">
          ${closeButton}
          ${contentHtml}
        </div>
      `;
    } else {
      return `
        <div class="as-toast-content" style="pointer-events: auto;">
          ${closeButton}
          ${contentHtml}
        </div>
      `;
    }
  };

  const showToast = (content, duration) => {
    createToastContainer(content.position);

    const toastId = `as-toast-${Date.now()}`;
    const toast = document.createElement('div');
    toast.id = toastId;
    toast.className = 'as-toast';
    toast.innerHTML = createToastElement(content);

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

  /* Basic Popup */
  const createBasicPopupContainer = () => {
    let container = document.querySelector('#as-popup-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'as-popup-container';
      container.className = 'as-popup-container as-container';
      document.body.appendChild(container);
    }
    return container;
  };

  const createBasicPopupElement = (content, popupId) => {
    const imageHtml =
      content.imageName && imageUrls[content.imageName]
        ? `<img class="as-popup-image" src="${imageUrls[content.imageName]}" alt="${content.title}">`
        : '';

    const buttonHtml = content.button
      ? `
      <a href="${content.button.link}" target="_blank" class="as-popup-btn-bottom" onclick="window.actionSpeak.closePopup('${popupId}')">
        ${content.button.label}
      </a>
    `
      : '';

    return `
    <div class="as-popup-overlay" id="${popupId}-overlay">
      <div class="as-popup">
        <div class="as-popup-image-container">
          ${imageHtml}
          <button class="as-popup-close-btn" onclick="window.actionSpeak.closePopup('${popupId}')">
            <svg class="as-popup-close-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div class="as-popup-content">
          <h2>${content.title}</h2>
          <p>${content.description}</p>
          ${buttonHtml}
        </div>
      </div>
    </div>
    `;
  };

  const showBasicPopup = (content) => {
    const container = createBasicPopupContainer();
    const popupId = `as-popup-${Date.now()}`;
    const basicPopupElement = createBasicPopupElement(content, popupId);

    container.insertAdjacentHTML('beforeend', basicPopupElement);

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
      }, 300);
    }
  };

  /* Mac Window Popup */
  const createMacWindowPopupContainer = () => {
    let container = document.querySelector('#as-macwindow-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'as-macwindow-container';
      container.className = 'as-macwindow-container';
      document.body.appendChild(container);
    }
    return container;
  };

  const createMacWindowPopupElement = (content, popupId) => {
    const imageHtml =
      content.imageName && imageUrls[content.imageName]
        ? `<img src="${imageUrls[content.imageName]}" alt="${content.title}" style="width: 100%; height: auto;">`
        : '';

    return `
      <div class="as-macwindow-overlay" id="${popupId}-overlay">
        <div class="as-mac-window" id="${popupId}">
          <div class="title-bar">
            <div class="buttons">
              <div class="close"></div>
              <div class="minimize"></div>
              <div class="maximize"></div>
            </div>
            <div class="title">${content.title}</div>
          </div>
          <div class="window">
            ${imageHtml}
          </div>
        </div>
      </div>
    `;
  };

  const showMacWindowPopup = (content) => {
    const container = createMacWindowPopupContainer();
    const popupId = `as-macpopup-${Date.now()}`;
    const macPopupElement = createMacWindowPopupElement(content, popupId);

    container.insertAdjacentHTML('beforeend', macPopupElement);

    const overlay = document.getElementById(`${popupId}-overlay`);
    const popup = document.getElementById(popupId);
    const windowContent = popup.querySelector('.window');
    const image = windowContent.querySelector('img');

    if (image) {
      image.onload = () => {
        overlay.classList.add('active');
        popup.classList.add('active');
      };
    } else {
      overlay.classList.add('active');
      popup.classList.add('active');
    }

    const closeButton = popup.querySelector('.close');
    const minimizeButton = popup.querySelector('.minimize');
    const maximizeButton = popup.querySelector('.maximize');

    closeButton.addEventListener('click', (e) => {
      e.stopPropagation();
      closeMacWindowPopup(popupId);
    });

    minimizeButton.addEventListener('click', (e) => {
      e.stopPropagation();
      popup.classList.toggle('minimize');
      popup.classList.remove('maximize');
    });

    maximizeButton.addEventListener('click', (e) => {
      e.stopPropagation();
      popup.classList.toggle('maximize');
      popup.classList.remove('minimize');
    });

    if (content.link) {
      windowContent.style.cursor = 'pointer';
      windowContent.addEventListener('click', () => {
        window.open(content.link, '_blank');
      });
    }

    overlay.addEventListener('click', (event) => {
      if (event.target === overlay) {
        closeMacWindowPopup(popupId);
      }
    });
  };

  const closeMacWindowPopup = (popupId) => {
    const overlay = document.getElementById(`${popupId}-overlay`);
    const popup = document.getElementById(popupId);
    if (overlay && popup) {
      overlay.classList.remove('active');
      popup.classList.remove('active');
      setTimeout(() => {
        overlay.remove();
      }, 300);
    }
  };

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

  const shouldShowBasedOnFrequency = (id, maxFrequency) => {
    setMaxFrequency(id, maxFrequency);
    const frequency = getFrequency(id);
    return frequency < getMaxFrequency(id);
  };

  const preloadImage = (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = resolve;
      img.onerror = reject;
      img.src = src;
    });
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
        console.log('Image URLs:', imageUrls); // 이미지 URL 로깅
        // 이미지 프리로드
        await Promise.all(Object.values(imageUrls).map(preloadImage));
      } else {
        console.error('Website is not registered');
      }
    } catch (error) {
      console.error('Error during initialization:', error);
    }

    window.actionSpeak.isReady = true;
  };

  window.actionSpeak = window.actionSpeak || {};

  window.actionSpeak.showToast = async (config) => {
    await show('toast', config);
  };

  window.actionSpeak.showBasicPopup = async (config) => {
    await show('basicPopup', config);
  };

  window.actionSpeak.showMacWindowPopup = async (config) => {
    await show('macWindowPopup', config);
  };

  window.actionSpeak.closePopup = closePopup;
  window.actionSpeak.closeMacWindowPopup = closeMacWindowPopup;

  window.actionSpeak.imageFetch = async () => {
    try {
      const websiteId = window.location.href.split('/').pop();
      imageUrls = await getImagesByWebsiteId(websiteId);
      // 이미지 프리로드
      await Promise.all(Object.values(imageUrls).map(preloadImage));
    } catch (error) {
      console.error(error);
    }
  };

  initialize();
})();
