import React, { useState } from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
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
  const [fileError, setFileError] = useState<string | null>(null);

  const handleButtonChange = (
    e: React.ChangeEvent<HTMLInputElement> | { checked: boolean; name: string }
  ) => {
    let key: string;
    let value: string | boolean;

    if ('target' in e) {
      key = e.target.name;
      value = e.target.value;
    } else {
      key = e.name;
      value = e.checked;
    }

    onPopupDataChange({
      content: {
        ...popupData.content,
        button: {
          ...((popupData.content as BasicPopupContent).button ?? {}),
          [key]: value,
        },
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
      if (file.size > 1024 * 1024) {
        setFileError('1MB 이하의 파일을 업로드해주세요');
      } else {
        setFileError(null);
        onImageChange(file);
      }
    }
  };

  const basicPopupContent = popupData.content as BasicPopupContent;

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
          <Label htmlFor='duration'>지속 시간 (초)</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <CircleHelp className='h-4 w-4' />
              </TooltipTrigger>
              <TooltipContent>
                <p>팝업이 화면에 표시되는 시간을 초 단위로 설정합니다.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Input
          id='duration'
          name='duration'
          type='number'
          value={popupData.duration || ''}
          onChange={handleSettingsChange}
          placeholder='지속 시간을 입력하세요 (초)'
        />
      </div>
      <div className='flex items-center space-x-2'>
        <Label htmlFor='timeLimit'>제한 시간 표시</Label>
        <Switch
          id='timeLimit'
          checked={basicPopupContent.button?.timeLimit ?? false}
          onCheckedChange={(checked) => handleButtonChange({ checked, name: 'timeLimit' })}
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
          <Label htmlFor='wait_for'>대기 시간 (초)</Label>
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

export default BasicPopupSettingsSection;
