import React from 'react';

import Image from 'next/image';

import { MacWindowPopupContent } from '@/lib/types/popup';

interface MacWindowPopupProps {
  content: MacWindowPopupContent;
  image: { image_url: string; name: string } | null;
  tempImageUrl?: string;
}

const MacWindowPopup: React.FC<MacWindowPopupProps> = ({ content, image, tempImageUrl }) => {
  const WindowWrapper = content.link ? 'a' : 'div';

  return (
    <div className='preview-container flex items-center justify-center'>
      <WindowWrapper
        className={`as-mac-window preview-mode ${content.link ? 'cursor-pointer' : ''}`}
      >
        <div className='title-bar'>
          <div className='buttons'>
            <div className='close'></div>
            <div className='minimize'></div>
            <div className='maximize'></div>
          </div>
          <div className='title'>{content.title}</div>
        </div>
        <div className='window'>
          {tempImageUrl || image ? (
            <Image
              src={tempImageUrl || (image ? image.image_url : '')}
              alt={content.title || '팝업 이미지'}
              className='as-popup-image'
              width={400}
              height={300}
              style={{ width: '100%', height: 'auto' }}
            />
          ) : (
            <Image
              src='https://via.placeholder.com/384x216.png?text=Placeholder+Image'
              alt='Placeholder image'
              className='as-popup-image'
              width={384}
              height={216}
              style={{ width: '100%', height: 'auto' }}
            />
          )}
        </div>
      </WindowWrapper>
    </div>
  );
};

export default MacWindowPopup;
