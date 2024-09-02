import React from 'react';

import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { useWebsiteImages } from '@/hook/useWebsiteImages';
import { BasicPopupContent } from '@/lib/types/popup';
import { ImagePlus } from 'lucide-react';

interface BasicPopupProps {
  content: BasicPopupContent;
  websiteId: string;
}

const BasicPopup: React.FC<BasicPopupProps> = ({ content, websiteId }) => {
  const { images } = useWebsiteImages(websiteId);

  const image = images.find((img) => img.name === content.imageName);

  return (
    <div className='as-basic-popup'>
      <div className='as-basic-popup-content'>
        <button className='as-basic-popup-close-btn' aria-label='Close'>
          &times;
        </button>
        <div className='as-basic-popup-content-wrapper'>
          {image ? (
            <div className='as-basic-popup-image-container'>
              <Image
                src={image.image_url}
                alt={content.imageName || 'Popup image'}
                className='h-full w-full object-cover'
                width={300}
                height={200}
              />
            </div>
          ) : (
            <div className='as-basic-popup-image-container'>
              <div className='as-basic-popup-image-overlay'>
                <Button variant='ghost' size='icon'>
                  <ImagePlus />
                </Button>
              </div>
            </div>
          )}
          <div className='as-basic-popup-text-content'>
            <h2 className='as-basic-popup-title'>{content.title}</h2>
            <p className='as-basic-popup-description'>{content.description}</p>
            <Button
              className='as-basic-popup-button'
              onClick={() => window.open(content.button.link, '_blank')}
            >
              {content.button.label}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicPopup;
