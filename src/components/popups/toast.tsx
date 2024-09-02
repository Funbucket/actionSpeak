import React from 'react';

import Image from 'next/image';

import { ToastContent } from '@/lib/types/popup';
import { ImageIcon } from 'lucide-react';

interface ToastProps {
  content: ToastContent;
  image: { image_url: string; name: string } | null;
  tempImageUrl?: string;
}

const Toast: React.FC<ToastProps> = ({ content, image, tempImageUrl }) => {
  const handleClick = () => {
    if (content.link && content.link.includes('http')) {
      window.open(content.link, '_blank');
    }
  };

  const ContentWrapper = content.link && content.link.includes('http') ? 'a' : 'div';

  return (
    <div className='as-toast'>
      <ContentWrapper
        className={`as-toast-content ${content.link ? 'as-toast-content-link' : ''}`}
        onClick={handleClick}
        href={content.link && content.link.includes('http') ? content.link : undefined}
        target='_blank'
        rel='noopener noreferrer'
        role={content.link ? 'button' : undefined}
        style={{ cursor: content.link ? 'pointer' : 'default' }}
      >
        {content.closeButton && (
          <button
            className='as-toast-close-btn'
            aria-label='Close'
            onClick={(e) => e.stopPropagation()}
          >
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
              <div className='flex h-full w-full items-center justify-center object-cover'>
                <ImageIcon className='h-3/4 w-3/4' />
              </div>
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
