import React, { useState } from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { MacWindowPopupContent, PopupData } from '@/lib/types/popup';
import { CircleHelp } from 'lucide-react';

interface MacWindowSettingsSectionProps {
  popupData: PopupData;
  onPopupDataChange: (newData: Partial<PopupData>) => void;
  onImageChange: (file: File) => void;
}

const MacWindowPopupSettingsSection: React.FC<MacWindowSettingsSectionProps> = ({
  popupData,
  onPopupDataChange,
  onImageChange,
}) => {
  const [fileError, setFileError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onPopupDataChange({ content: { ...popupData.content, [name]: value } });
  };

  const handleSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onPopupDataChange({ [name]: parseInt(value, 10) || 0 });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 1024 * 1024) {
        setFileError('1MB 이하의 파일을 업로드해주세요');
      } else {
        setFileError(null);
        onImageChange(file);
      }
    }
  };

  const macWindowContent = popupData.content as MacWindowPopupContent;

  return (
    <div className='space-y-4'>
      <div className='grid gap-2'>
        <Label htmlFor='image'>이미지</Label>
        <Input id='image' type='file' onChange={handleImageUpload} />
        {fileError && <p className='text-sm text-red-500'>{fileError}</p>}
      </div>
      <div className='grid gap-2'>
        <Label htmlFor='title'>제목</Label>
        <Input
          id='title'
          name='title'
          value={macWindowContent.title}
          onChange={handleInputChange}
          placeholder='제목을 입력하세요'
        />
      </div>
      <div className='grid gap-2'>
        <Label htmlFor='link'>링크</Label>
        <Input
          id='link'
          name='link'
          value={macWindowContent.link || ''}
          onChange={handleInputChange}
          placeholder='연결할 링크를 입력하세요.'
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
                <p>팝업이 표시되기 전 대기 시간을 초 단위로 설정합니다.</p>
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
          placeholder='대기 시간을 입력하세요 (초)'
        />
      </div>
    </div>
  );
};

export default MacWindowPopupSettingsSection;
