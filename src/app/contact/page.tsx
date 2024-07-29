import React from 'react';

import Head from 'next/head';

export default function Page() {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        margin: 0,
        overflow: 'hidden',
      }}
    >
      <Head>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'
        />
        <title>도입 문의</title>
        <style>{`
          html { margin: 0; height: 100%; overflow: hidden; }
          iframe { position: absolute; top: 0; right: 0; bottom: 0; left: 0; border: 0; }
        `}</style>
      </Head>
      <iframe
        src='https://tally.so/r/mYOgJ6?transparentBackground=1'
        width='100%'
        height='100%'
        style={{ marginTop: '16px' }}
        title='도입 문의'
      ></iframe>
    </div>
  );
}
