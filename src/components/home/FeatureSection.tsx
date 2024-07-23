import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  CheckIcon,
  CloudLightning,
  Joystick,
  Palette,
  Settings,
  Tablet,
  Target,
} from 'lucide-react';

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

const adoptionBenefitCards = [
  {
    icon: Target,
    title: '다양한 타겟팅 옵션',
    content: [
      '방문 빈도에 따른 구분 (신규 방문객, 재방문객)',
      '유입 경로별 타겟팅 (특정 광고를 통한 방문객)',
      '회원 상태별 구분 (회원/비회원)',
      '사용자 행동 기반 타겟팅 (예: 장바구니에 상품을 담은 고객)',
    ],
  },
  {
    icon: Settings,
    title: '데이터 분석 서비스',
    content: [
      '구매 전환율 분석',
      '고객 유입 경로 분석',
      '이탈률 분석',
      '구매 퍼널 분석',
      '매출 분석',
    ],
  },
  {
    icon: Palette,
    title: '맞춤형 팝업 디자인',
    content: ['사이트 특성에 맞는 커스텀 팝업 디자인 제공', '다양한 종류의 팝업 제작 가능'],
  },
];

const FeaturesSection = () => (
  <>
    <section className='w-full bg-muted px-6 py-12'>
      <div className='mx-auto grid max-w-7xl gap-8 px-4 md:grid-cols-2 md:px-6'>
        <div className='space-y-4'>
          <h2 className='text-3xl font-bold md:text-4xl lg:text-5xl'>
            구매률을 높이는 강력한 기능
          </h2>
          <p className='text-lg text-muted-foreground md:text-xl lg:text-2xl'>
            actionSpeak는 효과적인 팝업을 생성하는데 빠르고 강력합니다.
          </p>
          <div className='grid gap-4 sm:grid-cols-7'>
            <div className='sm:col-span-4'>
              <Image
                width='400'
                height='300'
                unoptimized
                src='/imgs/toast_preview.gif'
                alt='Toast Preview'
                className='h-auto w-full rounded-lg border border-gray-200'
              />
            </div>
            <div className='sm:col-span-3'>
              <Image
                width='300'
                height='300'
                unoptimized
                src='/imgs/popup_preview.gif'
                alt='Popup Preview'
                className='h-auto w-full rounded-lg border border-gray-200'
              />
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

    <section id='features' className='w-full px-6 py-12 md:py-24'>
      <div className='container mx-auto px-4 md:px-6'>
        <div className='mx-auto max-w-3xl text-center'>
          <h2 className='text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl'>
            도입을 고민하지 마세요
          </h2>
          <p className='mt-4 text-lg text-muted-foreground md:text-xl lg:text-2xl'>
            온라인 비즈니스 성장을 도와드릴게요.
          </p>
        </div>
        <div className='mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
          {adoptionBenefitCards.map((card, index) => (
            <Card
              key={index}
              className='rounded-lg bg-muted p-6 shadow-sm transition-all hover:bg-muted/80'
            >
              <CardContent className='p-0'>
                <card.icon className='mb-4 h-12 w-12 text-primary' />
                <h3 className='mb-4 text-xl font-semibold'>{card.title}</h3>
                <ul className='space-y-2 text-left'>
                  {card.content.map((item, itemIndex) => (
                    <li key={itemIndex} className='flex items-start'>
                      <CheckIcon className='mr-2 h-5 w-5 flex-shrink-0 text-primary' />
                      <span className='text-muted-foreground'>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className='mt-16 text-center'>
          <Button variant='default' size='lg' className='px-8 py-4 text-lg font-semibold' asChild>
            <Link href='/contact'>도입 문의하기</Link>
          </Button>
        </div>
      </div>
    </section>
  </>
);

export default FeaturesSection;
