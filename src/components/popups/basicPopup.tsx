import React from 'react';

import Image from 'next/image';

import { BasicPopupContent } from '@/lib/types/popup';
import { ImageIcon, X } from 'lucide-react';

interface BasicPopupProps {
  content: BasicPopupContent;
  image: { image_url: string; name: string } | null;
  tempImageUrl?: string;
}

const BasicPopup: React.FC<BasicPopupProps> = ({ content, image, tempImageUrl }) => {
  const handleClick = () => {
    if (content.button?.link && content.button.link.includes('http')) {
      window.open(content.button.link, '_blank');
    }
  };

  return (
    <div className='as-popup-overlay'>
      <div className='as-popup'>
        <button className='as-popup-close-btn' aria-label='Close'>
          <X size={24} />
        </button>
        <div className='as-popup-content-wrapper'>
          <div className='as-popup-image-container'>
            {tempImageUrl ? (
              <Image
                src={tempImageUrl}
                alt='Temporary image'
                className='h-full w-full object-cover'
                width={100}
                height={100}
              />
            ) : image ? (
              <Image
                src={image.image_url}
                alt={image.name}
                className='h-full w-full object-cover'
                width={100}
                height={100}
              />
            ) : (
              <div className='flex h-full w-full items-center justify-center object-cover'>
                <ImageIcon className='h-3/4 w-3/4' />
              </div>
            )}
          </div>
          <div className='as-popup-content'>
            <div className={`as-popup-content-title ${!content.title && 'as-popup-placeholder'}`}>
              {content.title || '제목을 입력하세요'}
            </div>
            <div
              className={`as-popup-content-description ${!content.description && 'as-popup-placeholder'}`}
            >
              {content.description || '설명을 입력하세요'}
            </div>
            {content.button && (
              <button
                className='as-popup-btn-bottom'
                onClick={handleClick}
                style={{ cursor: content.button.link ? 'pointer' : 'default' }}
              >
                {content.button.label || '버튼 텍스트를 입력하세요'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicPopup;
