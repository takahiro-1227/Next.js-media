import Image from 'next/image';
import Link from 'next/link';

export const Header = () => {
  return (
    <header className="fixed h-14 w-full flex justify-center items-center z-50 bg-white shadow-md">
      <Link href="/">
        <a>
          Next.js Media
        </a>
      </Link>
    </header>
  )
}