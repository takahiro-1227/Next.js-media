import Image from 'next/image';
import Link from 'next/link';

export const Header = () => {
  return (
    <header className="fixed h-14 w-full flex justify-center items-center z-50 bg-white shadow-md">
      <Link href="/">
        <a>
          <Image src="/yuruwork-logo.png" alt="ゆるワーク" width="160" height="30"/>
        </a>
      </Link>
    </header>
  )
}