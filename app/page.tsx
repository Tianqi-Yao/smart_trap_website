"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.push('/dashboard');
  }, [router]);

  return null; // or you can display a loading indicator
}

// export default function HomePage() {
  // return (
  //   <main className="flex min-h-screen flex-col items-center justify-between p-24">
  //     <h1 className="text-4xl font-bold">Hello, Welcome to the SWD project website!</h1>
  //     <Image
  //       src="/images/swdThumb.png"
  //       alt="swd Logo"
  //       width={300}
  //       height={300}
  //     />
  //     <Link href="/dashboard">
  //       <Button1 text="Dashboard" />
  //     </Link>
  //   </main>
  // );
// }
