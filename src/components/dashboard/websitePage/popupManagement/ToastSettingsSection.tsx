'use client';

import React from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { PopupData, ToastContent } from '@/lib/types/popup';
import { CircleHelp } from 'lucide-react';

interface ToastSettingsSectionProps {
  popupData: PopupData;
  onPopupDataChange: (newData: Partial<PopupData>) => void;
  onImageChange: (file: File) => void;
}

const ToastSettingsSection: React.FC<ToastSettingsSectionProps> = ({
  popupData,
  onPopupDataChange,
  onImageChange,
}) => {
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
      onImageChange(file);
    }
  };

  const toastContent = popupData.content as ToastContent;

  return (
    <div className='space-y-4'>
      <div className='grid gap-2'>
        <Label htmlFor='title'>제목</Label>
        <Input
          id='title'
          name='title'
          value={toastContent.title}
          onChange={handleInputChange}
          placeholder='제목을 입력하세요'
        />
      </div>
      <div className='grid gap-2'>
        <Label htmlFor='description'>설명</Label>
        <Textarea
          id='description'
          name='description'
          value={toastContent.description}
          onChange={handleInputChange}
          placeholder='설명을 입력하세요'
        />
      </div>
      <div className='grid gap-2'>
        <Label htmlFor='link'>링크</Label>
        <Input
          id='link'
          name='link'
          value={toastContent.link || ''}
          onChange={handleInputChange}
          placeholder='연결할 링크를 입력하세요.'
        />
      </div>
      <div className='flex items-center space-x-2'>
        <Label htmlFor='closeButton'>닫기 버튼 표시</Label>
        <Switch
          id='closeButton'
          checked={toastContent.closeButton}
          onCheckedChange={(checked) =>
            onPopupDataChange({ content: { ...toastContent, closeButton: checked } })
          }
        />
      </div>
      <div className='grid gap-2'>
        <Label htmlFor='position'>위치</Label>
        <Select
          value={toastContent.position}
          onValueChange={(value: 'top' | 'bottom') =>
            onPopupDataChange({ content: { ...toastContent, position: value } })
          }
        >
          <SelectTrigger id='position'>
            <SelectValue placeholder='위치 선택' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='top'>상단</SelectItem>
            <SelectItem value='bottom'>하단</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className='grid gap-2'>
        <Label htmlFor='image'>이미지</Label>
        <Input id='image' type='file' onChange={handleImageUpload} />
      </div>
      <div className='grid gap-2'>
        <div className='flex items-center gap-2'>
          <Label htmlFor='duration'>지속 시간 (ms)</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <CircleHelp className='h-4 w-4' />
              </TooltipTrigger>
              <TooltipContent>
                <p>팝업이 화면에 표시되는 시간을 밀리초 단위로 설정합니다.</p>
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
          placeholder='지속 시간을 입력하세요 (ms)'
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

export default ToastSettingsSection;
