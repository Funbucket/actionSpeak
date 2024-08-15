'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

interface PopupManagementSectionProps {
  websiteId: string;
}

const PopupManagementSection: React.FC<PopupManagementSectionProps> = ({ websiteId }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-2xl font-bold'>팝업 추가하기</CardTitle>
        <CardDescription>새로운 팝업을 생성할 수 있습니다.</CardDescription>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
};

export default PopupManagementSection;
