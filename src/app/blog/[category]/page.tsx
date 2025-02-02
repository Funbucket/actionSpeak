import { Metadata } from 'next';

import PostListPage from '@/components/post_list/PostListPage';
import { META } from '@/lib/constant';
import { getCategoryList, getCategoryPublicName } from '@/lib/post';

type Props = {
  params: { category: string };
};

// 허용된 param 외 접근시 404
export const dynamicParams = false;

export function generateStaticParams() {
  const categoryList = getCategoryList();
  const paramList = categoryList.map((category) => ({ category }));
  return paramList;
}

export async function generateMetadata({ params: { category } }: Props): Promise<Metadata> {
  const cg = getCategoryPublicName(category);
  const title = `${cg} | ${META.siteName}`;
  const url = `${META.url}/${category}`;

  return {
    title,
    openGraph: {
      title,
      url,
      images: [META.ogImage],
    },
    twitter: {
      title,
      images: [META.ogImage],
    },
  };
}

const CategoryPage = async ({ params }: Props) => {
  return <PostListPage category={params.category} />;
};

export default CategoryPage;
