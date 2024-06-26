import Link from 'next/link';

import { Button } from '@/components/ui/button';

const HeroSection = () => (
  <section className='mx-auto max-w-2xl px-6 py-12'>
    <div className='container grid px-4 md:px-6 lg:px-8'>
      <div className='flex flex-col items-center justify-center text-center'>
        <h1 className='mb-4 text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl'>
          잠재 고객을 전환시키는 방법
        </h1>
        <p className='mb-8 text-lg text-gray-800 dark:text-gray-400 lg:text-2xl'>
          사이트 방문한 고객을 그냥 보내지 마세요.
          <br />
          팝업으로 고객에게 말을 걸어 구매를 유도하세요.
        </p>
        <Button asChild>
          <Link href='/dashboard'>무료로 도입하기</Link>
        </Button>
      </div>
    </div>
  </section>
);

export default HeroSection;
