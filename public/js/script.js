(() => {
  const style = `
    .actionSpeak-toast-container {
      position: fixed;
      z-index: 2147483647;
      top: 3rem;
      left: 3rem;
      right: 3rem;
      bottom: 16px;
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
      gap: 0.75rem;
      padding: 12px;
      background-color: rgb(229 231 235 / 0.75);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px); 
      box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
      border-radius: 10px;
      font-size: 1rem;
      line-height: 1.5rem;
      z-index: 50;
      color: rgb(47, 48, 60);
      box-sizing: border-box;
      font-family: "Gabarito", "Noto Sans KR", ui-sans-serif, system-ui, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
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
  `;

  let toastTimeout;
  let toastInterval;
  let toasting = [];
  let messages = [];
  let waitFor;
  let toastEvery;
  let toastDuration;
  let visitorId;
  const localStorageVisitorIdName = 'actionSpeak-visitor-id';
  const domain = document.currentScript.getAttribute('data-domain');
  console.log('actionSpeack' + domain);
  const endpoint = 'https://action-speak.vercel.app/api/script';

  const getVisitorId = () => {
    visitorId = localStorage.getItem(localStorageVisitorIdName);

    if (!visitorId) {
      visitorId =
        Date.now().toString(36) + Math.random().toString(36).substr(2);
      localStorage.setItem(localStorageVisitorIdName, visitorId);
    }

    return visitorId;
  };

  const fetchFont = async () => {
    const link1 = document.createElement('link');
    link1.href =
      'https://fonts.googleapis.com/css2?family=Gabarito:wght@400..900&display=swap';
    link1.rel = 'stylesheet';
    document.head.appendChild(link1);

    const link2 = document.createElement('link');
    link2.href =
      'https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400&display=swap';
    link2.rel = 'stylesheet';
    document.head.appendChild(link2);
  };

  const validateWebsite = async () => {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        domain,
        visitorId,
        type: 'pageview',
        referrer: document.referrer,
      }),
    });
    console.log('actionSpeak' + response);

    return response.ok;
  };

  function ensureToastContainer() {
    if (!document.querySelector('#actionSpeak-toast-container')) {
      const container = document.createElement('div');
      container.id = 'actionSpeak-toast-container';
      container.className = 'actionSpeak-toast-container';
      document.body.appendChild(container);
    }
  }

  function showToast(content, options = {}) {
    ensureToastContainer();

    const id = `toast-${Date.now()}`;
    const toast = document.createElement('div');
    toast.id = id;
    toast.className = 'actionSpeak-toast';

    if (options.isHTML) {
      toast.innerHTML = content;
    } else {
      toast.textContent = content;
    }

    if (window.innerWidth < 640) {
      toasting.forEach(id => removeToast(id, true));
    }

    document.querySelector('#actionSpeak-toast-container').prepend(toast);
    toasting.push(id);

    if (!options.stay || options.duration) {
      setTimeout(() => removeToast(id), options.duration || 10000);
    }
  }

  function removeToast(id, force = false) {
    const toast = document.getElementById(id);

    if (!toast) {
      return;
    }

    if (force) {
      toast.remove();
      toasting = toasting.filter(t => t !== id);
    } else {
      toast.className += ' toast-hide';
      setTimeout(() => {
        if (toast) {
          toast.remove();
          toasting = toasting.filter(t => t !== id);
        }
      }, 400);
    }
  }

  function cleanup() {
    toastTimeout && clearTimeout(toastTimeout);
    toastInterval && clearInterval(toastInterval);
    toasting.forEach(id => removeToast(id));
  }

  const toast = {
    custom: (htmlContent, options = {}) => {
      options.isHTML = true;
      showToast(htmlContent, options);
    },
  };

  const processMessages = msgs => {
    msgs.forEach(message => {
      const img = new Image();
      img.src = message.img;
    });

    toastTimeout = setTimeout(() => {
      toastInterval = setInterval(() => {
        const message = msgs.shift();

        if (!message) {
          clearInterval(toastInterval);
          return;
        }

        let html = `
            <img src="${message.img}" style="width: 48px; height: 48px; object-fit: cover; object-position: center; flex-shrink: 0; border-radius: 8px;" width="48" height="48" alt="" />
            <div style="width: 100%;">
                <div style="font-size: 1rem; font-weight: 600; color: rgb(3 7 18);">${message.title}</div>
                <div style="font-size: 1rem; font-weight: 400; line-height: 1.25; color: rgb(55 65 81);">${message.body}</div>
            </div>
            <div style="color: #616d80;">${message.timeAgo}</div>
        `;

        if (message.link && message.link.includes('http')) {
          html = `
                <a class="actionSpeak-toast-content" href="${message.link}" target="_blank" style="pointer-events: auto; width: 100%; cursor: pointer; transition: transform 0.2s ease-in-out;" onmouseover="this.style.transform = 'scale(1.01)';" onmouseout="this.style.transform = 'scale(1)';">
                    ${html}
                </a>
            `;
        } else {
          html = `
                <div class="actionSpeak-toast-content" style="pointer-events: none;">
                    ${html}
                </div>
            `;
        }

        toast.custom(html, { duration: toastDuration });
      }, toastEvery);
    }, waitFor);
  };

  const main = async () => {
    getVisitorId();
    fetchFont();

    const isValid = await validateWebsite();

    if (isValid) {
      const styleEl = document.createElement('style');
      styleEl.innerHTML = style;
      document.head.appendChild(styleEl);

      // 기존 actionSpeak 메시지 처리
      if (window.actionSpeak && window.actionSpeak.length > 0) {
        window.actionSpeak.forEach(config => {
          if (config.messages) messages = config.messages;
          if (config.waitFor) waitFor = config.waitFor;
          if (config.toastEvery) toastEvery = config.toastEvery;
          if (config.toastDuration) toastDuration = config.toastDuration;
          processMessages(messages);
        });
      }
    }
  };

  // 초기화
  window.actionSpeak = window.actionSpeak || [];
  window.actionSpeak.push = (...args) => {
    console.log('actionSpeak push called with:', args);
    args.forEach(config => {
      if (config.messages) messages = config.messages;
      if (config.waitFor) waitFor = config.waitFor;
      if (config.toastEvery) toastEvery = config.toastEvery;
      if (config.toastDuration) toastDuration = config.toastDuration;
      processMessages(messages);
    });
  };

  main();
})();
