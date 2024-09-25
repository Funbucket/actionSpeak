import Image from 'next/image';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CloudLightning, Joystick, Tablet, Target } from 'lucide-react';

const featureIntroCards = [
  {
    icon: CloudLightning,
    title: '빠르고 간단한 설정',
    content: '몇 분안에 사용자 여정에 팝업을 추가하세요. 개발자의 도움은 필요하지 않습니다.',
  },
  {
    icon: Target,
    title: '행동 기반 타겟팅',
    content: '사용자의 실시간 행동 데이터를 기반으로 개인화된 팝업을 추가하세요.',
  },
  {
    icon: Tablet,
    title: '반응형 디자인',
    content: '데스톱부터 모바일까지 모든 기기에서 팝업을 추가하세요.',
  },
  {
    icon: Joystick,
    title: '사용자의 피로도 고려',
    content: '팝업 노출 시간, 빈도를 조절하여 사용자의 피로도를 낮추어 팝업을 추가하세요.',
  },
];

const FeaturesSection = () => (
  <section className='w-full bg-muted px-6 py-12'>
    <div className='mx-auto grid max-w-[83rem] gap-8 px-4 md:grid-cols-2 md:px-6'>
      <div className='space-y-4'>
        <h2 className='text-2xl font-bold md:text-4xl'>구매률을 높이는 강력한 기능</h2>
        <p className='text-lg text-muted-foreground md:text-xl lg:text-2xl'>
          actionSpeak는 효과적인 팝업을 생성하는데 빠르고 강력합니다.
        </p>
        <div className='grid gap-4 sm:grid-cols-6'>
          <div className='sm:col-span-3'>
            <div className='relative'>
              <Image
                width='300'
                height='300'
                unoptimized
                src='/imgs/popup_preview.gif'
                alt='Popup Preview'
                className='h-auto w-full rounded-lg border border-gray-200'
              />
              <p className='mt-1 text-center text-sm text-muted-foreground'>기본 팝업 예시</p>
            </div>
          </div>
          <div className='sm:col-span-3'>
            <div className='relative'>
              <Image
                width='400'
                height='300'
                unoptimized
                src='/imgs/toast_preview.gif'
                alt='Toast Preview'
                className='h-auto w-full rounded-lg border border-gray-200'
              />
              <p className='mt-1 text-center text-sm text-muted-foreground'>푸시 팝업 예시</p>
            </div>
          </div>
        </div>
      </div>
      <div className='grid gap-4'>
        {featureIntroCards.map((card, index) => (
          <Card key={index}>
            <CardHeader>
              <card.icon className='mb-2 h-8 w-8 text-primary' />
              <CardTitle>{card.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{card.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection;
