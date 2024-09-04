import React from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { BasicPopupContent, PopupData } from '@/lib/types/popup';
import { CircleHelp } from 'lucide-react';

interface BasicPopupSettingsSectionProps {
  popupData: PopupData;
  onPopupDataChange: (newData: Partial<PopupData>) => void;
  onImageChange: (file: File) => void;
}

const BasicPopupSettingsSection: React.FC<BasicPopupSettingsSectionProps> = ({
  popupData,
  onPopupDataChange,
  onImageChange,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onPopupDataChange({ content: { ...popupData.content, [name]: value } });
  };

  const handleButtonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onPopupDataChange({
      content: {
        ...popupData.content,
        button: { ...(popupData.content as BasicPopupContent).button, [name]: value },
      },
    });
  };

  const handleSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onPopupDataChange({ [name]: parseInt(value, 10) || 0 });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageChange(file);
    }
  };

  const basicPopupContent = popupData.content as BasicPopupContent;

  return (
    <div className='space-y-4'>
      <div className='grid gap-2'>
        <Label htmlFor='image'>이미지</Label>
        <Input id='image' type='file' onChange={handleImageUpload} />
      </div>
      <div className='grid gap-2'>
        <Label htmlFor='title'>제목</Label>
        <Input
          id='title'
          name='title'
          value={basicPopupContent.title}
          onChange={handleInputChange}
          placeholder='제목을 입력하세요'
        />
      </div>
      <div className='grid gap-2'>
        <Label htmlFor='description'>설명</Label>
        <Textarea
          id='description'
          name='description'
          value={basicPopupContent.description}
          onChange={handleInputChange}
          placeholder='설명을 입력하세요'
        />
      </div>
      <div className='grid gap-2'>
        <Label htmlFor='button.label'>버튼 텍스트</Label>
        <Input
          id='button.label'
          name='label'
          value={basicPopupContent.button?.label || ''}
          onChange={handleButtonChange}
          placeholder='버튼 텍스트를 입력하세요'
        />
      </div>
      <div className='grid gap-2'>
        <Label htmlFor='button.link'>버튼 링크</Label>
        <Input
          id='button.link'
          name='link'
          value={basicPopupContent.button?.link || ''}
          onChange={handleButtonChange}
          placeholder='버튼 링크를 입력하세요'
        />
      </div>

      <div className='grid gap-2'>
        <div className='flex items-center gap-2'>
          <Label htmlFor='frequency'>빈도</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <CircleHelp className='h-4 w-4' />
              </TooltipTrigger>
              <TooltipContent>
                <p>팝업이 표시되는 주기를 설정합니다.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Input
          id='frequency'
          name='frequency'
          type='number'
          value={popupData.frequency}
          onChange={handleSettingsChange}
          placeholder='빈도를 입력하세요'
        />
      </div>
      <div className='grid gap-2'>
        <div className='flex items-center gap-2'>
          <Label htmlFor='wait_for'>대기 시간 (ms)</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <CircleHelp className='h-4 w-4' />
              </TooltipTrigger>
              <TooltipContent>
                <p>팝업이 표시되기 전 대기 시간을 밀리초 단위로 설정합니다.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Input
          id='wait_for'
          name='wait_for'
          type='number'
          value={popupData.wait_for}
          onChange={handleSettingsChange}
          placeholder='대기 시간을 입력하세요 (ms)'
        />
      </div>
    </div>
  );
};

export default BasicPopupSettingsSection;