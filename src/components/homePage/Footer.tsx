import Link from 'next/link';

const Footer = () => (
  <footer className='w-full border-t'>
    <div className='container flex flex-col items-center justify-between gap-4 py-8 md:flex-row md:gap-0'>
      <p className='text-sm text-muted-foreground'>&copy; 2024 acionSpeak. All Rights Reserved</p>
      <nav className='flex items-center gap-4'>
        <Link
          href='https://ouchc.notion.site/actionSpeak-023c7690fe3d48e1afbbf845fdd46904'
          className='text-sm text-muted-foreground hover:text-foreground'
        >
          개인정보 처리방침
        </Link>

        <Link
          href='https://ouchc.notion.site/af7a3dcd4bd24a8aa903f9dfb313e1dd'
          className='text-sm text-muted-foreground hover:text-foreground'
        >
          이용약관
        </Link>
      </nav>
    </div>
  </footer>
);

export default Footer;
