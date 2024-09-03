import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

interface ImageUploadFormProps {
  onUpload: (file: File, name: string) => Promise<void>;
}

const ImageUploadForm: React.FC<ImageUploadFormProps> = ({ onUpload }) => {
  const [file, setFile] = useState<File | null>(null);
  const [imageName, setImageName] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file || !imageName.trim()) {
      toast({
        variant: 'destructive',
        title: '업로드 실패',
        description: '파일과 이미지 이름을 모두 입력해주세요.',
      });
      return;
    }

    setIsLoading(true);
    try {
      await onUpload(file, imageName);
      toast({
        title: '업로드 성공',
        description: '이미지가 성공적으로 추가되었습니다.',
      });
      setFile(null);
      setImageName('');
    } catch (error) {
      toast({
        variant: 'destructive',
        title: '업로드 실패',
        description: '이미지 업로드 중 오류가 발생했습니다.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className='grid gap-4' onSubmit={handleSubmit}>
      <div className='grid gap-2'>
        <Input
          id='image'
          type='file'
          onChange={(e) => e.target.files && setFile(e.target.files[0])}
          disabled={isLoading}
        />
      </div>
      <div className='grid gap-2'>
        <Input
          id='name'
          type='text'
          placeholder='이미지의 고유한 이름을 입력해주세요.'
          value={imageName}
          onChange={(e) => setImageName(e.target.value)}
          disabled={isLoading}
        />
      </div>
      <Button
        type='submit'
        className='justify-self-end'
        isLoading={isLoading}
        loadingText='추가 중...'
      >
        추가하기
      </Button>
    </form>
  );
};

export default ImageUploadForm;
