(() => {
  const STYLE = `
    /* Global styles */
    :host {
      font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", "Segoe UI", Roboto, "system-ui", "sans-serif";
    }

    /* Toast styles */
    .as-toast-container {
      position: fixed;
      z-index: 9999;
      left: 24px;
      right: 24px;
      user-select: none;
      pointer-events: none;
    }

    .as-toast {
      background: transparent;
      padding: 0 0 16px;
      display: flex;
      justify-content: flex-end;
      animation: as-slide-in 0.3s ease-in-out;
    }

    .as-toast-content {
      position: relative;
      width: 100%;
      max-width: 350px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 14px;
      padding: 14px;
      background-color: rgba(220, 220, 220, 0.7);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
      border-radius: 10px;
      font-size: 16px;
      line-height: 1.5;
      z-index: 9999;
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

    .as-toast-close-btn,
    .as-toast-time-limit {
      position: absolute;
      top: 10px;
      right: 10px;
    }

    .as-toast-close-btn {
      background: none;
      border: none;
      cursor: pointer;
      color: rgb(55, 65, 81);
      font-size: 20px;
      line-height: 1;
      padding: 0;
      z-index: 9999;
    }
    
    .as-toast-time-limit {
      background-color: rgba(220, 220, 220, 0.7);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      border-radius: 9999px;
      padding: 4px 8px;
      font-size: 14px;
      color: rgb(55, 65, 81);
    }

    .as-toast-content-wrapper {
      flex: 1;
      padding-right: 16px;
    }

    .as-toast-content-title {
      font-size: 16px;
      font-weight: 600;
      color: rgb(3, 7, 18);
      margin-bottom: 4px;
      word-wrap: break-word;
    }

    .as-toast-content-description {
      font-size: 16px;
      font-weight: 400;
      line-height: 1.25;
      color: rgb(55, 65, 81);
    }

    @media (max-width: 640px) {
      .as-toast-content {
        max-width: 100%;
      }

      .as-toast-container[style*="bottom: auto"] .as-toast {
        animation: as-slide-down 0.3s ease-in-out;
      }

      .as-toast-container[style*="top: auto"] .as-toast {
        animation: as-slide-up 0.3s ease-in-out;
      }

      @keyframes as-slide-up {
        from {
          opacity: 0.8;
          transform: translateY(100%);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes as-slide-down {
        from {
          opacity: 0.8;
          transform: translateY(-100%);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      } 
    }


    /* Popup styles */
    .as-popup-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 9999;
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
      box-shadow: 0 15px 20px rgba(0, 0, 0, 0.25);
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
      top: 8px;
      right: 8px;
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
        top: 16px;
        right: 16px;
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
      font-size: 24px;
      font-weight: 600;
    }

    .as-popup p {
      color: rgb(55, 65, 81);
      margin-top: 0;
      margin-bottom: 20px;
      font-size: 16px;
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
      font-size: 16px;
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
        top: 16px;
        right: 16px;
        width: 36px;
        height: 36px;
        font-size: 24px;
      }
      .as-popup-content {
        padding: 20px;
      }
      .as-popup h2 {
        font-size: 20px;
      }
      .as-popup p {
        font-size: 16px;
        line-height: 1.5;
        margin-bottom: 24px;
      }
      .as-popup-btn-bottom {
        padding: 14px 20px;
        font-size: 16px;
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
      z-index: 9999;
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
      max-height: 100% !important;
      border-radius: 0;
      transform: translate(-50%, -50%) scale(1);
    }

    .as-mac-window .title-bar {
      background: linear-gradient(to top, rgb(200,197,200), rgb(234,231,234));
      height: 29px;
      border-bottom: 1px solid rgb(180, 180, 180);
      width: 100%;
      overflow: hidden;
      position: relative;
      display: flex;
      align-items: center;
    }

    .as-mac-window .title-bar .buttons {
      position: absolute;
      left: 8px;
      height: 12px;
      display: flex;
      align-items: center;
    }

    .as-mac-window .title-bar .buttons div {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      margin-right: 5px;
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
      width: 7px;
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
      width: 11px;
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
      font-family: 'Helvetica Neue', helvetica, arial, sans-serif;
      font-size: 13px;
      font-weight: 400;
      color: rgb(34,32,34);
      width: 100%;
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

  // Configuration
  const CONFIG = {
    localStorageVisitorIdName: 'as-visitor-id',
    localStorageImageUrlName: 'as-image-url',
    endpoint: 'https://www.actionspeak.kr/api',
    frequencyPrefix: 'as-frequency-',
    maxFrequencyPrefix: 'as-max-frequency-',
    localStorageVisitCountName: 'as-visit-count',
    localStorageLastVisitName: 'as-last-visit',
    revisitThreshold: 30 * 60 * 1000, // 재방문 기준: 30분
  };

  let toastTimeout;
  let toastInterval;
  let topToastQueue = [];
  let bottomToastQueue = [];
  let activeToast = null;
  let visitorId;
  let imageUrls = {};
  let websiteId;
  let globalShadowRoot;
  const domain = document.currentScript.getAttribute('data-domain');

  // User identification
  const getVisitCount = () => {
    const count = localStorage.getItem(CONFIG.localStorageVisitCountName);
    return count ? parseInt(count, 10) : 0;
  };

  const incrementVisitCount = () => {
    const count = getVisitCount();
    localStorage.setItem(CONFIG.localStorageVisitCountName, (count + 1).toString());
  };

  const updateLastVisit = () => {
    const now = new Date().toISOString();
    localStorage.setItem(CONFIG.localStorageLastVisitName, now);
  };

  const isRevisit = () => {
    const lastVisit = localStorage.getItem(CONFIG.localStorageLastVisitName);
    if (!lastVisit) return false;

    const lastVisitTime = new Date(lastVisit).getTime();
    const currentTime = new Date().getTime();

    return currentTime - lastVisitTime > CONFIG.revisitThreshold;
  };

  const updateVisitInfo = () => {
    if (isRevisit()) {
      incrementVisitCount();
    }
    updateLastVisit();
  };

  const initializeVisitorAndVisitInfo = () => {
    let visitorId = localStorage.getItem(CONFIG.localStorageVisitorIdName);

    if (!visitorId) {
      visitorId = ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
        (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
      );
      localStorage.setItem(CONFIG.localStorageVisitorIdName, visitorId);
      localStorage.setItem(CONFIG.localStorageVisitCountName, '1');
      updateLastVisit();
    } else {
      updateVisitInfo();
    }

    return visitorId;
  };

  // AB test bucketing
  const assignBucket = async (visitorId, testId) => {
    const combinedId = `${visitorId}:${testId}`;
    const msgUint8 = new TextEncoder().encode(combinedId);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashInt = hashArray.reduce(
      (acc, curr) => (acc * 256 + curr) % Number.MAX_SAFE_INTEGER,
      0
    );
    const variant = hashInt % 2;
    return variant === 0 ? 'control' : 'test';
  };

  // Popup Frequency
  const generateHash = async (message) => {
    const msgStr = JSON.stringify(message);
    const msgUint8 = new TextEncoder().encode(msgStr);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
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

  // dataLayer Event Push
  const pushDataLayerEvent = (popupId, popupTitle, popupType, bucket, visitorId) => {
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'actionSpeak_impression',
        popupId: popupId,
        popupTitle: popupTitle,
        popupType: popupType,
        bucket: bucket,
        timestamp: new Date().toISOString(),
        visitorId: visitorId,
      });
    }
  };

  // Toast
  const createToastContainer = (position) => {
    let containerId = position === 'top' ? 'as-toast-container-top' : 'as-toast-container-bottom';
    let container = globalShadowRoot.getElementById(containerId);
    if (!container) {
      container = document.createElement('div');
      container.id = containerId;
      container.className = 'as-toast-container as-container';
      globalShadowRoot.appendChild(container);
    }
    container.style.top = position === 'top' ? '1.5rem' : 'auto';
    container.style.bottom = position === 'bottom' ? '1.5rem' : 'auto';
    return container;
  };

  const createToastElement = (content, duration, popupId) => {
    let image = '';
    if (content.imageName && imageUrls[content.imageName]) {
      image = `
        <div class="as-toast-image-container">
          <img class="as-toast-image" src="${imageUrls[content.imageName]}" alt="" />
        </div>
      `;
    }

    let closeElement = '';
    if (content.timeLimit && duration) {
      closeElement = `<div class="as-toast-time-limit" id="as-toast-time-limit-${popupId}">${duration / 1000}s</div>`;
    } else {
      closeElement = '<button class="as-toast-close-btn" aria-label="Close">&times;</button>';
    }

    const contentHtml = `
      ${image}
      <div class="as-toast-content-wrapper">
        <div class="as-toast-content-title">${content.title}</div>
        <div class="as-toast-content-description">${content.description}</div>
      </div>
      ${closeElement}
    `;

    if (content.link && content.link.includes('http')) {
      return `
        <div class="as-toast-content as-toast-content-link">
          ${contentHtml}
        </div>
      `;
    } else {
      return `
        <div class="as-toast-content" style="pointer-events: auto;">
          ${contentHtml}
        </div>
      `;
    }
  };

  const showToast = (content, duration, popupId) => {
    const container = createToastContainer(content.position);

    if (window.innerWidth < 640 && activeToast) {
      removeToast(activeToast.id, true);
    }

    const toast = document.createElement('div');
    toast.id = popupId;
    toast.className = 'as-toast';
    toast.innerHTML = createToastElement(content, duration, popupId);

    container.prepend(toast);

    activeToast = { id: popupId, position: content.position };

    if (content.timeLimit && duration) {
      const timeLimitElement = globalShadowRoot.getElementById(`as-toast-time-limit-${popupId}`);
      const startTime = Date.now();
      const endTime = startTime + duration;

      const updateTimeRemaining = () => {
        const now = Date.now();
        const timeRemaining = Math.max(0, Math.ceil((endTime - now) / 1000));
        if (timeLimitElement) {
          timeLimitElement.textContent = `${timeRemaining}s`;
        }
        if (timeRemaining <= 0) {
          clearInterval(intervalId);
          removeToast(popupId, false);
        }
      };

      updateTimeRemaining();
      const intervalId = setInterval(updateTimeRemaining, 1000);
    } else if (!content.timeLimit) {
      const closeButton = toast.querySelector('.as-toast-close-btn');
      if (closeButton) {
        closeButton.addEventListener('click', (event) => {
          event.stopPropagation();
          removeToast(popupId, true);
        });
      }
    }

    if (duration) {
      setTimeout(() => {
        removeToast(popupId, false);
      }, duration);
    }

    if (content.link && content.link.includes('http')) {
      const linkElement = toast.querySelector('.as-toast-content-link');
      if (linkElement) {
        linkElement.addEventListener('click', (event) => {
          if (!event.target.closest('.as-toast-close-btn')) {
            removeToast(popupId, true);
            window.open(content.link, '_blank');
          }
        });
      }
    }
  };

  const removeToast = (popupId, force = false) => {
    const toast = globalShadowRoot.getElementById(popupId);

    if (!toast) return;

    if (force) {
      toast.remove();
      if (activeToast && activeToast.id === popupId) {
        activeToast = null;
      }
    } else {
      toast.classList.add('as-toast-hide');
      setTimeout(() => {
        if (toast) {
          toast.remove();
          if (activeToast && activeToast.id === popupId) {
            activeToast = null;
          }
        }
      }, 400);
    }
  };

  const cleanupToasts = () => {
    if (toastTimeout) clearTimeout(toastTimeout);
    if (toastInterval) clearInterval(toastInterval);
    [...topToastQueue, ...bottomToastQueue].forEach((id) => {
      const toast = globalShadowRoot.getElementById(id);
      if (toast) toast.remove();
    });
    topToastQueue = [];
    bottomToastQueue = [];
  };

  // Basic popup
  const createBasicPopupContainer = () => {
    let container = globalShadowRoot.getElementById('as-popup-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'as-popup-container';
      container.className = 'as-popup-container as-container';
      globalShadowRoot.appendChild(container);
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
      <a href="${content.button.link}" target="_blank" class="as-popup-btn-bottom">
        ${content.button.label}
      </a>
    `
      : '';

    return `
    <div class="as-popup-overlay" id="${popupId}-overlay">
      <div class="as-popup" id="${popupId}">
        <div class="as-popup-image-container">
          ${imageHtml}
          <button class="as-popup-close-btn">
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

  const showBasicPopup = (content, duration, popupId) => {
    const container = createBasicPopupContainer();
    const basicPopupElement = createBasicPopupElement(content, popupId);

    container.insertAdjacentHTML('beforeend', basicPopupElement);

    const overlay = globalShadowRoot.getElementById(`${popupId}-overlay`);
    const popup = globalShadowRoot.getElementById(popupId);

    overlay.style.display = 'flex';

    overlay.addEventListener('click', (event) => {
      if (event.target === overlay) {
        closeBasicPopup(popupId);
      }
    });

    const closeButton = popup.querySelector('.as-popup-close-btn');
    closeButton.addEventListener('click', () => closeBasicPopup(popupId));

    const bottomButton = popup.querySelector('.as-popup-btn-bottom');
    bottomButton.addEventListener('click', () => closeBasicPopup(popupId));

    if (content.button && content.button.timeLimit && duration) {
      const endTime = Date.now() + duration;

      const updateButtonText = () => {
        const remainingTime = Math.max(0, Math.ceil((endTime - Date.now()) / 1000));
        bottomButton.textContent = `${content.button.label} (${remainingTime}s)`;

        if (remainingTime <= 0) {
          clearInterval(intervalId);
          closeBasicPopup(popupId);
        }
      };

      updateButtonText();
      const intervalId = setInterval(updateButtonText, 1000);
    }

    if (duration) {
      setTimeout(() => {
        closeBasicPopup(popupId);
      }, duration);
    }
  };

  const closeBasicPopup = (popupId) => {
    const overlay = globalShadowRoot.getElementById(`${popupId}-overlay`);
    if (overlay) {
      overlay.style.display = 'none';
      setTimeout(() => {
        overlay.remove();
      }, 300);
    }
  };

  // Mac window popup
  const createMacWindowPopupContainer = () => {
    let container = globalShadowRoot.getElementById('as-macwindow-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'as-macwindow-container';
      container.className = 'as-macwindow-container';
      globalShadowRoot.appendChild(container);
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
          <div class="window" ${content.link ? `style="cursor: pointer;"` : ''}>
            ${imageHtml}
          </div>
        </div>
      </div>
    `;
  };

  const showMacWindowPopup = (content, duration, popupId) => {
    const container = createMacWindowPopupContainer();
    const macPopupElement = createMacWindowPopupElement(content, popupId);

    container.insertAdjacentHTML('beforeend', macPopupElement);

    const overlay = globalShadowRoot.getElementById(`${popupId}-overlay`);
    const popup = globalShadowRoot.getElementById(popupId);
    const image = popup.querySelector('.window img');

    const activatePopup = () => {
      overlay.classList.add('active');
      popup.classList.add('active');
    };

    if (image) {
      image.onload = activatePopup;
    } else {
      activatePopup();
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
      const windowElement = popup.querySelector('.window');
      if (windowElement) {
        windowElement.addEventListener('click', () => {
          closeMacWindowPopup(popupId);
          window.open(content.link, '_blank');
        });
      }
    }

    overlay.addEventListener('click', (event) => {
      if (event.target === overlay) {
        closeMacWindowPopup(popupId);
      }
    });

    if (duration) {
      setTimeout(() => {
        closeMacWindowPopup(popupId);
      }, duration);
    }
  };

  const closeMacWindowPopup = (popupId) => {
    const overlay = globalShadowRoot.getElementById(`${popupId}-overlay`);
    const popup = globalShadowRoot.getElementById(popupId);
    if (overlay && popup) {
      overlay.classList.remove('active');
      popup.classList.remove('active');
      setTimeout(() => {
        overlay.remove();
      }, 300);
    }
  };

  // API
  const getWebsiteDataByDomain = async (domain) => {
    const response = await fetch(`${CONFIG.endpoint}/get-website-data`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ domain }),
      mode: 'cors',
    });

    const data = await response.json();
    if (response.ok) {
      return data;
    }
    throw new Error('Failed to get website data');
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

  // Image load
  const preloadImage = (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = resolve;
      img.onerror = reject;
      img.src = src;
    });
  };

  // show popup
  const showPopup = async (config) => {
    if (!websiteId) {
      console.error(`Your website is not registered. Cannot show popup.`);
      return;
    }

    const { type, options, abTest, ...content } = config;
    const { waitFor, duration, frequency, path } = options || {};
    const visitorId = initializeVisitorAndVisitInfo();
    const popupId = await generateHash({ type, domain, content });
    let popupElementId = popupId;

    const show = async () => {
      if (path) {
        if (path !== window.location.pathname && window.location.pathname !== '/') {
          return;
        }
      } else if (window.location.pathname !== '/') {
        return;
      }

      setMaxFrequency(popupId, frequency);

      if (shouldShowBasedOnFrequency(popupId, frequency)) {
        const bucket = abTest ? await assignBucket(visitorId, popupId) : 'default';

        // AB 테스트 처리
        if (abTest && bucket === 'control') {
          return; // control 그룹인 경우 팝업을 보여주지 않음
        }

        setTimeout(() => {
          switch (type) {
            case 'toast':
              showToast(content, duration, popupId);
              break;
            case 'basicPopup':
              showBasicPopup(content, duration, popupId);
              break;
            case 'macWindowPopup':
              showMacWindowPopup(content, duration, popupId);
              break;
            default:
              console.warn('Unknown popup type:', type);
          }
          pushDataLayerEvent(popupId, content.title, type, bucket, visitorId);
          incrementFrequency(popupId);
        }, waitFor || 0);
      }
    };

    const hide = () => {
      switch (type) {
        case 'toast':
          removeToast(popupElementId);
          break;
        case 'basicPopup':
          closeBasicPopup(popupElementId);
          break;
        case 'macWindowPopup':
          closeMacWindowPopup(popupElementId);
          break;
      }
    };

    show();

    window.addEventListener('popstate', () => {
      if (path === window.location.pathname || (!path && window.location.pathname === '/')) {
        show();
      } else {
        hide();
      }
    });
  };

  // ShadowDOM Initialization
  const initializeShadowDOM = () => {
    const shadowHost = document.createElement('div');
    globalShadowRoot = shadowHost.attachShadow({ mode: 'open' });
    document.body.appendChild(shadowHost);

    const styleEl = document.createElement('style');
    styleEl.textContent = STYLE;
    globalShadowRoot.appendChild(styleEl);

    // Toast 컨테이너 초기화
    createToastContainer('top');
    createToastContainer('bottom');

    // Basic 팝업 컨테이너 초기화
    createBasicPopupContainer();

    // Mac Window 팝업 컨테이너 초기화
    createMacWindowPopupContainer();
  };

  // Initialization
  const initialize = async () => {
    initializeVisitorAndVisitInfo();
    initializeShadowDOM();

    try {
      const websiteData = await getWebsiteDataByDomain(domain);
      if (websiteData.website_id) {
        websiteId = websiteData.website_id;
        imageUrls = websiteData.image_urls;

        await Promise.all(Object.values(imageUrls).map(preloadImage));

        // 팝업 옵션이 있는 경우 처리
        if (websiteData.popup_option) {
          showPopup({ ...websiteData.popup_option, abTest: false });
        }
      } else {
        console.error('Website is not registered');
      }
    } catch (error) {
      console.error('Failed to initialize popups:', error);
    }

    window.actionSpeak.isReady = true;
  };

  // Global
  window.actionSpeak = window.actionSpeak || {};

  window.actionSpeak.showToast = async (config) => {
    await showPopup({ type: 'toast', ...config });
  };

  window.actionSpeak.showBasicPopup = async (config) => {
    await showPopup({ type: 'basicPopup', ...config });
  };

  window.actionSpeak.showMacWindowPopup = async (config) => {
    await showPopup({ type: 'macWindowPopup', ...config });
  };

  window.actionSpeak.imageFetch = async () => {
    try {
      const websiteId = window.location.href.split('/').pop();
      imageUrls = await getImagesByWebsiteId(websiteId);

      await Promise.all(Object.values(imageUrls).map(preloadImage));
    } catch (error) {
      console.error(error);
    }
  };

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 640 && activeToast) {
      activeToast = null;
    }
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
  } else {
    initialize();
  }
})();
