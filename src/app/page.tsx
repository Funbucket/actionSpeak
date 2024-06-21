import Image from 'next/image';
import Link from 'next/link';

import { Button } from '../components/ui/button';

export default function Home() {
  return (
    <div>
      <section className='w-full py-12 md:py-24 lg:py-32'>
        <div className='container grid px-4 md:px-6 lg:px-8'>
          <div className='flex flex-col items-center justify-center text-center'>
            <h1 className='mb-4 text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl'>
              잠재 고객을 전환시키는 방법
            </h1>
            <p className='mb-8 text-lg text-gray-800 dark:text-gray-400 lg:text-2xl'>
              사이트 방문한 고객을 그냥 보내지 마세요.
              <br />
              팝업으로 고객에게 말을 걸어 참여를 유도하세요.
            </p>
            <Button asChild>
              <Link href='/dashboard'>무료로 도입하기</Link>
            </Button>
          </div>
        </div>
      </section>
      <section className='w-full bg-gray-100 py-12 dark:bg-gray-800 md:py-24 lg:py-32'>
        <div className='container px-4 md:px-6'>
          <div className='flex flex-col items-center justify-center space-y-4 text-center'>
            <div className='space-y-2'>
              <div className='inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800'>
                google tag manager 와 연동
                <Image src='/imgs/gtm.png' alt='gtm-icon' width={50} height={50} />
              </div>
              <h2 className='text-3xl font-bold tracking-tighter sm:text-5xl'>
                실시간 웹 행동 데이터 기반 ...
              </h2>
              <p className='max-w-[900px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
                설명 ...
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
