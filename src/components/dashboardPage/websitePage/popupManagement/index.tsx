'use client';

import React, { useEffect, useState } from 'react';

import BasicPopupSettingsSection from './BasicPopupSettingsSection';
import MacWindowPopupSettingsSection from './MacWindowPopupSettingsSection';
import ToastSettingsSection from './ToastSettingsSection';
import BasicPopup from '@/components/popups/basicPopup';
import MacWindowPopup from '@/components/popups/macWindowPopup';
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
import { useToast } from '@/components/ui/use-toast';
import { useWebsiteImages } from '@/hook/useWebsiteImages';
import { useWebsitePopups } from '@/hook/useWebsitePopups';
import { initialPopupData } from '@/lib/popup';
import {
  BasicPopupContent,
  MacWindowPopupContent,
  PopupData,
  ToastContent,
} from '@/lib/types/popup';

interface PopupManagementSectionProps {
  websiteId: string;
}

const PopupManagementSection: React.FC<PopupManagementSectionProps> = ({ websiteId }) => {
  const { popup, upsertPopup, deletePopup } = useWebsitePopups(websiteId);
  const { deleteImage, addImage, getImageByName } = useWebsiteImages(websiteId);
  const [popupData, setPopupData] = useState<PopupData>(() => initialPopupData(websiteId, 'toast'));
  const [newImageFile, setNewImageFile] = useState<File | undefined>(undefined);
  const [isImageRemoved, setIsImageRemoved] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { toast } = useToast();

  useEffect(() => {
    if (popup) {
      setPopupData({
        ...popup,
        duration: popup.duration ? popup.duration / 1000 : undefined,
        wait_for: popup.wait_for / 1000,
      });
      setIsImageRemoved(false);
    }
  }, [popup]);

  useEffect(() => {
    setPopupData(initialPopupData(websiteId, popupData.popup_type));
  }, [popupData.popup_type, websiteId]);

  const handlePopupDataChange = (newData: Partial<PopupData>) => {
    setPopupData((prev) => {
      if (newData.popup_type && newData.popup_type !== prev.popup_type) {
        return initialPopupData(websiteId, newData.popup_type);
      }
      return {
        ...prev,
        ...newData,
        content: { ...prev.content, ...newData.content },
      };
    });
  };

  const handleSave = async () => {
    setIsLoading(true);

    try {
      let updatedPopupData: PopupData = {
        ...popupData,

        wait_for: popupData.wait_for * 1000,
      };

      if (newImageFile) {
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
        if (popup?.content.imageName) {
          await deleteImage({ imageName: popup.content.imageName, websiteId });
          updatedPopupData = {
            ...updatedPopupData,
            content: { ...updatedPopupData.content, imageName: undefined },
          };
        }
      } else {
        updatedPopupData = {
          ...updatedPopupData,
          content: { ...updatedPopupData.content, imageName: popup?.content.imageName },
        };
      }

      const savedPopup = await upsertPopup(updatedPopupData);

      setPopupData({
        ...savedPopup,
        duration: savedPopup.duration ? savedPopup.duration / 1000 : undefined,
        wait_for: savedPopup.wait_for / 1000,
      });

      setNewImageFile(undefined);
      setIsImageRemoved(false);

      toast({
        title: '저장 성공',
        description: '팝업이 성공적으로 저장되었습니다.',
      });
    } catch (error) {
      console.error('Error saving popup:', error);
      toast({
        variant: 'destructive',
        title: '저장 실패',
        description: '팝업 저장 중 오류가 발생했습니다. 다시 시도해 주세요.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);

    try {
      if (popup?.content.imageName) {
        await deleteImage({ imageName: popup.content.imageName, websiteId });
      }
      await deletePopup();
      setPopupData(initialPopupData(websiteId, 'toast'));
      setNewImageFile(undefined);
      setIsImageRemoved(false);

      toast({
        title: '삭제 성공',
        description: '팝업이 성공적으로 삭제되었습니다.',
      });
    } catch (error) {
      console.error('Error deleting popup:', error);
      toast({
        variant: 'destructive',
        title: '삭제 실패',
        description: '팝업 삭제 중 오류가 발생했습니다. 다시 시도해 주세요.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderPopupPreview = () => {
    const imageData = popupData.content.imageName
      ? getImageByName(popupData.content.imageName)
      : null;
    const image = newImageFile
      ? { image_url: URL.createObjectURL(newImageFile), name: newImageFile.name }
      : imageData && !isImageRemoved
        ? { image_url: imageData.image_url, name: imageData.name }
        : null;

    switch (popupData.popup_type) {
      case 'toast':
        return (
          <Toast
            content={popupData.content as ToastContent}
            duration={popupData.duration}
            image={image}
          />
        );
      case 'basicPopup':
        return (
          <BasicPopup
            content={popupData.content as BasicPopupContent}
            duration={popupData.duration}
            image={image}
          />
        );
      case 'macWindowPopup':
        return (
          <MacWindowPopup content={popupData.content as MacWindowPopupContent} image={image} />
        );
      default:
        return null;
    }
  };

  const renderSettingsSection = () => {
    const commonProps = {
      popupData: popupData,
      onPopupDataChange: handlePopupDataChange,
      onImageChange: (file: File | undefined) => {
        setNewImageFile(file);
        setIsImageRemoved(!file);
      },
    };

    switch (popupData.popup_type) {
      case 'toast':
        return <ToastSettingsSection {...commonProps} />;
      case 'basicPopup':
        return <BasicPopupSettingsSection {...commonProps} />;
      case 'macWindowPopup':
        return <MacWindowPopupSettingsSection {...commonProps} />;
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-xl font-bold sm:text-2xl'>팝업 관리</CardTitle>
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
                <SelectItem value='basicPopup'>기본 팝업</SelectItem>
                <SelectItem value='macWindowPopup'>맥 윈도우 팝업</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
        <h2 className='mb-4 mt-8 text-base font-bold sm:text-xl'>미리보기</h2>
        <div className='border-base-content/10 space-y-6 rounded-2xl border-2 border-dashed p-6'>
          {renderPopupPreview()}
        </div>

        <h2 className='mb-4 mt-8 text-base font-bold sm:text-xl'>설정</h2>
        {renderSettingsSection()}
      </CardContent>
      <CardFooter className='flex justify-end space-x-2'>
        <Button isLoading={isLoading} onClick={handleSave} loadingText='저장 중...'>
          저장하기
        </Button>
        {popup && (
          <Button
            isLoading={isLoading}
            variant='destructive'
            onClick={handleDelete}
            loadingText='삭제 중...'
          >
            삭제하기
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default PopupManagementSection;
