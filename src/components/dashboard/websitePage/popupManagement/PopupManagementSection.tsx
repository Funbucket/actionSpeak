'use client';

import React, { useEffect, useState } from 'react';

import ToastSettingsSection from './ToastSettingsSection';
import Toast from '@/components/popups/toast';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useWebsiteImages } from '@/hook/useWebsiteImages';
import { useWebsitePopups } from '@/hook/useWebsitePopups';
import { PopupContent, PopupData, ToastContent } from '@/lib/types/popup';

interface PopupManagementSectionProps {
  websiteId: string;
}

// 초기 팝업 데이터 상태
const initialPopupData = (websiteId: string): PopupData => ({
  website_id: websiteId,
  popup_type: 'toast',
  content: {
    title: '',
    description: '',
    closeButton: true,
    position: 'bottom',
    imageName: undefined,
  } as ToastContent,
  duration: 10000,
  frequency: 2,
  wait_for: 1,
});

const PopupManagementSection: React.FC<PopupManagementSectionProps> = ({ websiteId }) => {
  const { popup, upsertPopup, deletePopup } = useWebsitePopups(websiteId);
  const { deleteImage, addImage, getImageByName, images } = useWebsiteImages(websiteId);

  const [popupData, setPopupData] = useState<PopupData>(initialPopupData(websiteId));
  const [newImageFile, setNewImageFile] = useState<File | undefined>(undefined);
  const [isImageRemoved, setIsImageRemoved] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (popup) {
      setPopupData(popup);
      setIsImageRemoved(false);
    }
  }, [popup]);

  // 팝업 데이터 변경 핸들러
  const handlePopupDataChange = (newData: Partial<PopupData>) => {
    setPopupData((prev) => ({
      ...prev,
      ...newData,
      content: { ...prev.content, ...newData.content },
    }));
  };

  // 팝업 저장 핸들러 (원본 로직 유지)
  const handleSave = async () => {
    setIsLoading(true);
    setError(null);
    try {
      let updatedPopupData: PopupData = { ...popupData };

      if (newImageFile) {
        // 새 이미지가 업로드된 경우
        const imageName = `image-${Date.now()}`;
        await addImage({ file: newImageFile, name: imageName });
        updatedPopupData = {
          ...updatedPopupData,
          content: { ...updatedPopupData.content, imageName },
        };

        if (popup?.content.imageName && popup.content.imageName !== imageName) {
          await deleteImage({ imageName: popup.content.imageName, websiteId });
        }
      } else if (isImageRemoved) {
        // 이미지가 삭제된 경우
        if (popup?.content.imageName) {
          await deleteImage({ imageName: popup.content.imageName, websiteId });
          updatedPopupData = {
            ...updatedPopupData,
            content: { ...updatedPopupData.content, imageName: undefined },
          };
        }
      } else {
        // 이미지 변경이 없는 경우
        updatedPopupData = {
          ...updatedPopupData,
          content: { ...updatedPopupData.content, imageName: popup?.content.imageName },
        };
      }

      const savedPopup = await upsertPopup(updatedPopupData);
      setPopupData(savedPopup);
      setNewImageFile(undefined);
      setIsImageRemoved(false);
    } catch (error) {
      console.error('Error saving popup:', error);
      setError('팝업 저장 중 오류가 발생했습니다. 다시 시도해 주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  // 팝업 삭제 핸들러
  const handleDelete = async () => {
    setIsLoading(true);
    setError(null);
    try {
      if (popup?.content.imageName) {
        await deleteImage({ imageName: popup.content.imageName, websiteId });
      }
      await deletePopup();
      setPopupData(initialPopupData(websiteId));
      setNewImageFile(undefined);
      setIsImageRemoved(false);
    } catch (error) {
      console.error('Error deleting popup:', error);
      setError('팝업 삭제 중 오류가 발생했습니다. 다시 시도해 주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  // 팝업 미리보기 렌더링
  const renderPopupPreview = () => {
    if (popupData.popup_type !== 'toast') return null;

    const imageData = popupData.content.imageName
      ? getImageByName(popupData.content.imageName)
      : null;
    const image = newImageFile
      ? { image_url: URL.createObjectURL(newImageFile), name: newImageFile.name }
      : imageData && !isImageRemoved
        ? { image_url: imageData.image_url, name: imageData.name }
        : null;

    return <Toast content={popupData.content as ToastContent} image={image} />;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-2xl font-bold'>팝업 관리</CardTitle>
        <CardDescription>웹사이트의 팝업을 관리할 수 있어요.</CardDescription>
      </CardHeader>
      <CardContent>
        {!popup && (
          <div className='mb-4'>
            <Select
              value={popupData.popup_type}
              onValueChange={(value: PopupData['popup_type']) =>
                handlePopupDataChange({ popup_type: value })
              }
            >
              <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder='팝업 유형 선택' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='toast'>푸시 팝업</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        <h2 className='mb-4 mt-8 text-xl font-bold'>미리보기</h2>
        <div className='border-base-content/10 space-y-6 rounded-2xl border-2 border-dashed p-6'>
          {renderPopupPreview()}
        </div>

        <h2 className='mb-4 mt-8 text-xl font-bold'>설정</h2>
        <ToastSettingsSection
          popupData={popupData}
          onPopupDataChange={handlePopupDataChange}
          onImageChange={(file: File | undefined) => {
            setNewImageFile(file);
            setIsImageRemoved(!file);
          }}
        />
      </CardContent>
      <CardFooter className='flex justify-end space-x-2'>
        {error && <p className='mr-auto text-red-500'>{error}</p>}
        <Button variant='default' onClick={handleSave} disabled={isLoading}>
          {isLoading ? '저장 중...' : '저장하기'}
        </Button>
        {popup && (
          <Button variant='destructive' onClick={handleDelete} disabled={isLoading}>
            {isLoading ? '삭제 중...' : '삭제하기'}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default PopupManagementSection;
