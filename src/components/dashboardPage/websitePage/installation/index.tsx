'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/components/ui/use-toast';
import useWebsiteMetrics from '@/hook/useWebsiteMetrics';

interface InstallationSectionProps {
  websiteId: string;
}

const RenderSkeletonMetrics = () => (
  <section className='mx-auto mt-16 max-w-2xl px-6 py-8'>
    <Card>
      <CardHeader>
        <Skeleton className='h-8 w-3/4' />
        <Skeleton className='mt-2 h-4 w-1/2' />
      </CardHeader>
      <CardContent>
        <div className='flex items-center justify-between rounded-lg bg-gray-100 p-4 dark:bg-gray-800'>
          <Skeleton className='h-20 w-full' />
        </div>
      </CardContent>
      <CardFooter className='flex justify-end'>
        <Skeleton className='h-8 w-24' />
      </CardFooter>
    </Card>
  </section>
);

const InstallationSection: React.FC<InstallationSectionProps> = ({ websiteId }) => {
  const { data: metrics, isLoading } = useWebsiteMetrics(websiteId);
  const { toast } = useToast();

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: '복사 성공 📋',
        description: '코드가 클립보드에 복사되었습니다.',
      });
    } catch (err) {
      console.error('Failed to copy: ', err);
      toast({
        title: '복사 실패',
        description: '코드 복사에 실패했습니다.',
      });
    }
  };

  if (isLoading || !metrics) {
    return <RenderSkeletonMetrics />;
  }

  return (
    <section className='mx-auto mt-16 max-w-2xl px-6 py-8'>
      <Card>
        <CardHeader>
          <CardTitle className='text-xl font-bold sm:text-2xl'>actionSpeak 설치하기</CardTitle>
          <CardDescription>
            웹사이트의 <code>&lt;head&gt;</code> 에 아래 코드를 붙여넣으세요.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex items-center justify-between rounded-lg bg-gray-100 p-4 dark:bg-gray-800'>
            <pre className='flex-1 overflow-auto font-mono text-sm'>{metrics.script}</pre>
          </div>
        </CardContent>
        <CardFooter className='flex justify-end'>
          <Button onClick={() => handleCopy(metrics.script)}>복사하기</Button>
        </CardFooter>
      </Card>
    </section>
  );
};

export default InstallationSection;
