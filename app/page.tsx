import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Hello, Welcome to the SWD project website!</h1>
      <Image
        src="/images/swdThumb.png"
        alt="swd Logo"
        width={300}
        height={300}
      />
      <Link href="/data_analysis">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Go to Data Analysis
        </button>
      </Link>
      <Link href="/data_display">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Go to Data Display
        </button>
      </Link>
      <Link href="/data_analysis_2">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Go to Data Analysis 2
        </button>
      </Link>
    </main>
  );
}
