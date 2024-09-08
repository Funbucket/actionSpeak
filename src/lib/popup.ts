import {
  BasicPopupContent,
  JsonCompatiblePopupContent,
  MacWindowPopupContent,
  PopupData,
  ToastContent,
} from './types/popup';

export const initialPopupData = (
  websiteId: string,
  popupType: PopupData['popup_type'] = 'toast'
): PopupData => {
  const basePopupData: Omit<PopupData, 'content'> = {
    website_id: websiteId,
    popup_type: popupType,
    duration: 5,
    frequency: 2,
    wait_for: 0,
  };

  let content: JsonCompatiblePopupContent;

  switch (popupType) {
    case 'toast':
      content = {
        title: '',
        description: '',
        timeLimit: true,
        link: 'https://',
        position: 'bottom',
        imageName: undefined,
      } as ToastContent;
      break;
    case 'basicPopup':
      content = {
        title: '',
        description: '',
        imageName: undefined,
        button: {
          label: '',
          link: 'https://',
          timeLimit: true,
        },
      } as BasicPopupContent;
      break;
    case 'macWindowPopup':
      content = {
        title: '',
        imageName: undefined,
        link: 'https://',
      } as MacWindowPopupContent;
      break;
    default:
      content = {} as JsonCompatiblePopupContent;
  }

  return {
    ...basePopupData,
    content,
  };
};
