import React, { useEffect, useState } from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useWebsiteImages } from '@/hook/useWebsiteImages';
import { BasicPopupContent, PopupData } from '@/lib/types/popup';

interface BasicPopupSettingsSectionProps {
  initialContent: BasicPopupContent;
  initialSettings: Pick<PopupData, 'duration' | 'frequency' | 'wait_for'>;
  onChange: (
    content: BasicPopupContent,
    settings: Pick<PopupData, 'duration' | 'frequency' | 'wait_for'>
  ) => void;
  onImageDelete: (imageName: string) => Promise<void>;
  websiteId: string;
}

const BasicPopupSettingsSection: React.FC<BasicPopupSettingsSectionProps> = ({
  initialContent,
  initialSettings,
  onChange,
  onImageDelete,
  websiteId,
}) => {
  const [content, setContent] = useState<BasicPopupContent>(initialContent);
  const [settings, setSettings] = useState(initialSettings);
  const [previousImageName, setPreviousImageName] = useState<string | undefined>(
    initialContent.imageName
  );
  const { images } = useWebsiteImages(websiteId);

  useEffect(() => {
    setContent(initialContent);
    setSettings(initialSettings);
    setPreviousImageName(initialContent.imageName);
  }, [initialContent, initialSettings]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContent((prev) => {
      const newContent = { ...prev, [name]: value };
      onChange(newContent, settings);
      return newContent;
    });
  };

  const handleButtonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContent((prev) => {
      const newContent = {
        ...prev,
        button: { ...prev.button, [name]: value },
      };
      onChange(newContent, settings);
      return newContent;
    });
  };

  const handleSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings((prev) => {
      const newSettings = { ...prev, [name]: parseInt(value, 10) };
      onChange(content, newSettings);
      return newSettings;
    });
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageName = `basic-popup-${Math.random().toString(36).substr(2, 9)}`;

      if (previousImageName) {
        await onImageDelete(previousImageName);
      }

      setContent((prev) => {
        const newContent = { ...prev, imageName };
        onChange(newContent, settings);
        return newContent;
      });
      setPreviousImageName(imageName);
    }
  };

  const currentImage = images.find((img) => img.name === content.imageName);

  return (
    <div className='space-y-4'>
      <div>
        <Label htmlFor='title'>제목</Label>
        <Input
          id='title'
          name='title'
          value={content.title}
          onChange={handleInputChange}
          placeholder='제목'
        />
      </div>
      <div>
        <Label htmlFor='description'>설명</Label>
        <Textarea
          id='description'
          name='description'
          value={content.description}
          onChange={handleInputChange}
          placeholder='설명'
        />
      </div>
      <div>
        <Label htmlFor='image'>이미지</Label>
        <Input id='image' type='file' onChange={handleImageChange} />
        {currentImage && <p>현재 이미지: {currentImage.name}</p>}
      </div>
      <div>
        <Label htmlFor='button-label'>버튼 텍스트</Label>
        <Input
          id='button-label'
          name='label'
          value={content.button.label}
          onChange={handleButtonChange}
          placeholder='버튼 텍스트'
        />
      </div>
      <div>
        <Label htmlFor='button-link'>버튼 링크</Label>
        <Input
          id='button-link'
          name='link'
          value={content.button.link}
          onChange={handleButtonChange}
          placeholder='버튼 링크'
        />
      </div>
      <div>
        <Label htmlFor='duration'>지속 시간 (ms)</Label>
        <Input
          id='duration'
          name='duration'
          type='number'
          value={settings.duration?.toString() || ''}
          onChange={handleSettingsChange}
          placeholder='지속 시간 (ms)'
        />
      </div>
      <div>
        <Label htmlFor='frequency'>빈도</Label>
        <Input
          id='frequency'
          name='frequency'
          type='number'
          value={settings.frequency.toString()}
          onChange={handleSettingsChange}
          placeholder='빈도'
        />
      </div>
      <div>
        <Label htmlFor='wait_for'>대기 시간 (ms)</Label>
        <Input
          id='wait_for'
          name='wait_for'
          type='number'
          value={settings.wait_for.toString()}
          onChange={handleSettingsChange}
          placeholder='대기 시간 (ms)'
        />
      </div>
    </div>
  );
};

export default BasicPopupSettingsSection;
