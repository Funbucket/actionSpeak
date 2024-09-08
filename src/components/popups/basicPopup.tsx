import React from 'react';

import Image from 'next/image';

import { BasicPopupContent } from '@/lib/types/popup';
import { X } from 'lucide-react';

interface BasicPopupProps {
  content: BasicPopupContent;
  image: { image_url: string; name: string } | null;
  duration?: number;
  tempImageUrl?: string;
}

const BasicPopup: React.FC<BasicPopupProps> = ({ content, image, tempImageUrl, duration }) => {
  return (
    <div className='flex items-center justify-center'>
      <div className='as-popup'>
        <div className='as-popup-image-container'>
          {tempImageUrl || image ? (
            <Image
              src={tempImageUrl || (image ? image.image_url : '')}
              alt={content.title || '팝업 이미지'}
              className='as-popup-image'
              width={400}
              height={300}
              objectFit='cover'
            />
          ) : (
            <Image
              src='https://via.placeholder.com/384x216.png?text=Placeholder+Image'
              alt='Placeholder image'
              className='as-popup-image'
              width={384}
              height={216}
              objectFit='cover'
            />
          )}
          <button className='as-popup-close-btn'>
            <X className='as-popup-close-icon' size={24} />
          </button>
        </div>
        <div className='as-popup-content'>
          <h2 className={`as-popup-content-title ${!content.title && 'as-popup-placeholder'}`}>
            {content.title || '제목을 입력하세요'}
          </h2>
          <p
            className={`as-popup-content-description ${!content.description && 'as-popup-placeholder'}`}
          >
            {content.description || '설명을 입력하세요'}
          </p>
          <a
            className={`as-popup-btn-bottom ${!content.button?.label && 'as-popup-placeholder'}`}
            rel='noopener noreferrer'
          >
            {content.button?.label || '버튼 텍스트를 입력하세요'}
            {content.button?.timeLimit && duration ? ` (${duration}s)` : ''}
          </a>
        </div>
      </div>
    </div>
  );
};

export default BasicPopup;
