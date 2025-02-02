'use client';

import Link from 'next/link';

import { useHeadingsObserver } from '@/hook/useHeadingsObserver';
import { HeadingItem } from '@/lib/types/post';
import { cn } from '@/lib/utils';

interface Props {
  toc: HeadingItem[];
}

const TableOfContentSidebar = ({ toc }: Props) => {
  const activeIdList = useHeadingsObserver('h1, h2, h3'); // 'h1' 추가

  return (
    <aside className='not-prose absolute -top-[200px] left-full -mb-[100px] hidden h-[calc(100%+150px)] xl:block'>
      <div className='sticky bottom-0 top-[200px] z-10 ml-[5rem] mt-[200px] w-[200px]'>
        <div className='mb-4 border-l px-4 py-2'>
          <ul className='text-xs'>
            {toc.map((item) => {
              const isH1 = item.indent === 0; // h1 인덴트 설정
              const isH2 = item.indent === 1; // h2 인덴트 설정
              const isH3 = item.indent === 2; // h3 인덴트 설정
              const isIntersecting = activeIdList.includes(item.link);

              return (
                <li
                  key={item.link}
                  className={cn(
                    isH1 && 'ml-1', // h1 스타일 설정
                    isH2 && 'ml-3', // h2 인덴트
                    isH3 && 'ml-5', // h3 인덴트
                    isIntersecting && 'font-medium text-[#1E90FF]',
                    'py-1 transition'
                  )}
                >
                  <Link href={item.link}>{item.text}</Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default TableOfContentSidebar;
