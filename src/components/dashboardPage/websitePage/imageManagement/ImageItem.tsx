import Image from 'next/image';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { formatDate } from '@/lib/utils';
import { CalendarIcon, EyeIcon, TrashIcon } from 'lucide-react';

interface ImageItemProps {
  image: any;
  onPreview: (imageName: string) => void;
  onDelete: (imageName: string) => void;
  previewType: 'toast' | 'basicPopup' | 'macWindowPopup';
  setPreviewType: (type: 'toast' | 'basicPopup' | 'macWindowPopup') => void;
}

const ImageItem: React.FC<ImageItemProps> = ({
  image,
  onPreview,
  onDelete,
  previewType,
  setPreviewType,
}) => (
  <div className='grid grid-cols-1 gap-4 border-b pb-4 last:border-b-0 last:pb-0 sm:grid-cols-[1fr_auto]'>
    <div className='flex items-center gap-4'>
      <Image
        src={image.image_url}
        alt='Uploaded image'
        width={64}
        height={64}
        className='h-14 w-14 rounded-md border border-gray-300 object-cover object-center'
      />
      <div className='grid gap-1'>
        <p className='font-medium'>{image.name || 'No description'}</p>
        <div className='flex items-center gap-1 text-sm'>
          <CalendarIcon className='h-4 w-4' />
          <span className='text-muted-foreground'>{formatDate(image.created_at)}</span>
        </div>
      </div>
    </div>
    <div className='flex flex-wrap items-center gap-2 sm:justify-end'>
      <Select
        value={previewType}
        onValueChange={(value: 'toast' | 'basicPopup' | 'macWindowPopup') => setPreviewType(value)}
      >
        <SelectTrigger className='w-[100px]'>
          <SelectValue placeholder='미리보기 타입' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='toast'>푸시 팝업</SelectItem>
          <SelectItem value='basicPopup'>기본 팝업</SelectItem>
          <SelectItem value='macWindowPopup'>맥 윈도우 팝업</SelectItem>
        </SelectContent>
      </Select>
      <Button variant='ghost' size='icon' onClick={() => onPreview(image.name)}>
        <EyeIcon className='h-5 w-5' />
        <span className='sr-only'>Preview</span>
      </Button>
      <Button variant='ghost' size='icon' onClick={() => onDelete(image.name)}>
        <TrashIcon className='h-5 w-5' />
        <span className='sr-only'>Delete</span>
      </Button>
    </div>
  </div>
);

export default ImageItem;
