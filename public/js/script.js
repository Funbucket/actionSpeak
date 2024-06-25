(() => {
  const STYLE = `
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
  `;

  const CONFIG = {
    localStorageVisitorIdName: 'actionSpeak-visitor-id',
    localStorageImageUrlName: 'actionSpeak-image-url',
    validateDomainEndpoint: 'https://action-speak.vercel.app/api/validateDomain',
    getImageUrlEndpoint: 'https://action-speak.vercel.app/api/getImageUrl',
    toastFrequencyKey: 'actionSpeak-toast-frequency',
    maxFrequencyKey: 'actionSpeak-max-frequency',
  };

  let toastTimeout;
  let toastInterval;
  let toasting = [];
  let messages = [];
  let waitFor;
  let toastEvery;
  let toastDuration;
  let visitorId;
  let publicImageUrl;
  const domain = document.currentScript.getAttribute('data-domain');

  const getVisitorId = () => {
    visitorId = localStorage.getItem(CONFIG.localStorageVisitorIdName);

    if (!visitorId) {
      visitorId = Date.now().toString(36) + Math.random().toString(36).substr(2);
      localStorage.setItem(CONFIG.localStorageVisitorIdName, visitorId);
    }

    return visitorId;
  };

  const validateDomain = async () => {
    const response = await fetch(CONFIG.validateDomainEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ domain }),
    });

    return response.ok;
  };

  const getImageUrl = async (img) => {
    const response = await fetch(CONFIG.getImageUrlEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ domain, img }),
    });

    const data = await response.json();

    if (data.imageUrl) {
      publicImageUrl = data.imageUrl;
    }

    return response.ok;
  };

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

  const showToast = (content, options = {}) => {
    const position = options.position || 'top';

    ensureToastContainer(position);

    const id = `toast-${Date.now()}`;
    const toast = document.createElement('div');
    toast.id = id;
    toast.className = 'actionSpeak-toast';
    toast.innerHTML = options.isHTML ? content : content;

    if (window.innerWidth < 640) {
      toasting.forEach((id) => removeToast(id, true));
    }

    document.querySelector('#actionSpeak-toast-container').prepend(toast);
    toasting.push(id);

    const closeButton = toast.querySelector('.toast-close-btn');
    if (closeButton) {
      closeButton.addEventListener('click', (event) => {
        event.stopPropagation();
        removeToast(id, true);
      });
    }

    if (!options.stay || options.duration) {
      setTimeout(() => {
        removeToast(id);
      }, options.duration || 10000);
    }
  };

  const removeToast = (id, force = false) => {
    const toast = document.getElementById(id);

    if (!toast) return;

    if (!toast.dataset.removed) {
      toast.dataset.removed = true;
      incrementToastFrequency();
    }

    if (force) {
      toast.remove();
      toasting = toasting.filter((t) => t !== id);
    } else {
      toast.classList.add('toast-hide');
      setTimeout(() => {
        if (toast) {
          toast.remove();
          toasting = toasting.filter((t) => t !== id);
        }
      }, 400);
    }
  };

  const cleanupToasts = () => {
    if (toastTimeout) clearTimeout(toastTimeout);
    if (toastInterval) clearInterval(toastInterval);
    toasting.forEach((id) => removeToast(id));
  };

  const createMessage = (message) => {
    const Image = publicImageUrl
      ? `<img src="${publicImageUrl}" style="width: 48px; height: 48px; object-fit: cover; object-position: center; flex-shrink: 0; border-radius: 8px;" width="48" height="48" alt="" />`
      : '';
    const closeButton = message.closeButton
      ? '<button class="toast-close-btn" aria-label="Close">&times;</button>'
      : '';
    const Content = `
          <div style="width: 100%;">
              <div style="font-size: 1rem; font-weight: 600; color: rgb(3 7 18); margin-bottom: 0.25rem;">${message.title}</div>
              <div style="font-size: 1rem; font-weight: 400; line-height: 1.25; color: rgb(55 65 81);">${message.body}</div>
          </div>
          ${closeButton}
      `;

    if (message.link && message.link.includes('http')) {
      return `
              <div role="button" class="actionSpeak-toast-content" style="pointer-events: auto; width: 100%; cursor: pointer; transition: transform 0.2s ease-in-out;" onmouseover="this.style.transform = 'scale(1.01)';" onmouseout="this.style.transform = 'scale(1)';" onclick="window.open('${message.link}', '_blank')">
                  ${Image}
                  ${Content}
              </div>
          `;
    } else {
      return `
              <div class="actionSpeak-toast-content" style="pointer-events: auto;">
                  ${Image}
                  ${Content}
              </div>
          `;
    }
  };

  const processMessages = (msgs) => {
    toastTimeout = setTimeout(() => {
      if (!toastEvery) {
        // 단일 메시지 처리
        const message = msgs[0];
        const html = createMessage(message);
        if (shouldShowToast()) {
          showToast(html, { duration: toastDuration, position: message.position });
        }
      } else {
        // 다중 메시지 처리
        toastInterval = setInterval(() => {
          const message = msgs.shift();

          if (!message) {
            clearInterval(toastInterval);
            return;
          }

          const html = createMessage(message);
          if (shouldShowToast()) {
            showToast(html, { duration: toastDuration, position: message.position });
          }
        }, toastEvery);
      }
    }, waitFor);
  };

  const handleActionSpeakConfig = (configs) => {
    configs.forEach((config) => {
      if (config.message) {
        messages = [config.message];
      } else if (config.messages) {
        messages = config.messages;
      }
      if (config.waitFor) waitFor = config.waitFor;
      if (config.toastEvery) toastEvery = config.toastEvery;
      if (config.toastDuration) toastDuration = config.toastDuration;
      if (config.frequency) {
        localStorage.setItem(CONFIG.maxFrequencyKey, config.frequency);
      }
      processMessages(messages);
    });
  };

  const initialize = async () => {
    getVisitorId();

    const styleEl = document.createElement('style');
    styleEl.innerHTML = STYLE;
    document.head.appendChild(styleEl);

    if (window.actionSpeak && window.actionSpeak.length > 0) {
      const img = window.actionSpeak.message.img || null;
      const isDomainValid = await validateDomain();

      if (isDomainValid && img) {
        await getImageUrl(img);
      }

      if (isDomainValid) {
        handleActionSpeakConfig(window.actionSpeak);
      }
    }
  };

  const getToastFrequency = () => {
    const frequency = localStorage.getItem(CONFIG.toastFrequencyKey);
    return frequency ? parseInt(frequency, 10) : 0;
  };

  const getMaxFrequency = () => {
    const maxFrequency = localStorage.getItem(CONFIG.maxFrequencyKey);
    return maxFrequency ? parseInt(maxFrequency, 10) : 1;
  };

  const incrementToastFrequency = () => {
    const frequency = getToastFrequency();
    localStorage.setItem(CONFIG.toastFrequencyKey, frequency + 1);
  };

  const shouldShowToast = () => {
    const frequency = getToastFrequency();
    const maxFrequency = getMaxFrequency();
    return frequency < maxFrequency;
  };

  window.actionSpeak = window.actionSpeak || [];
  window.actionSpeak.push = (...args) => {
    handleActionSpeakConfig(args);
  };

  initialize();
})();
