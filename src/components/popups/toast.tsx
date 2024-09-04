import React from 'react';

import Image from 'next/image';

import { ToastContent } from '@/lib/types/popup';

interface ToastProps {
  content: ToastContent;
  image: { image_url: string; name: string } | null;
  tempImageUrl?: string;
}

const Toast: React.FC<ToastProps> = ({ content, image, tempImageUrl }) => {
  const ContentWrapper = content.link && content.link.includes('http') ? 'a' : 'div';

  return (
    <div className='as-toast'>
      <ContentWrapper
        className={`as-toast-content ${content.link ? 'as-toast-content-link' : ''}`}
        role={content.link ? 'button' : undefined}
        style={{ cursor: content.link ? 'pointer' : 'default' }}
      >
        {content.closeButton && (
          <button className='as-toast-close-btn' aria-label='Close'>
            &times;
          </button>
        )}
        <div className='as-toast-content-wrapper'>
          <div className='as-toast-image-container'>
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
              <Image
                src='https://via.placeholder.com/100x100.png?text=Placeholder+Image'
                alt='Placeholder image'
                className='h-full w-full object-cover'
                width={100}
                height={100}
                objectFit='cover'
              />
            )}
          </div>
          <div style={{ width: '100%' }}>
            <div className={`as-toast-content-title ${!content.title && 'as-toast-placeholder'}`}>
              {content.title || '제목을 입력하세요'}
            </div>
            <div
              className={`as-toast-content-description ${!content.description && 'as-toast-placeholder'}`}
            >
              {content.description || '설명을 입력하세요'}
            </div>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default Toast;
