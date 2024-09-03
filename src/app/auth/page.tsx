import React, { Suspense } from 'react';

import AuthPage from '@/components/authPage';

export default function page() {
  return (
    <Suspense>
      <AuthPage />
    </Suspense>
  );
}
