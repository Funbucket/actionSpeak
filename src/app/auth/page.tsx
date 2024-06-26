import React, { Suspense } from 'react';

import AuthPage from '@/components/auth/AuthPage';

export default function page() {
  return (
    <Suspense>
      <AuthPage />
    </Suspense>
  );
}
