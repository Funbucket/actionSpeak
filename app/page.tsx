import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6 grid lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Convert Visitors into Customers
            </h1>
            <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
              ActionSpeak is a powerful SaaS service that helps you engage with
              your website visitors and convert them into customers.
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild>
                <Link href="/dashboard">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                Integrate with GTM
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Real-time User Interaction Tracking
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                ActionSpeak seamlessly integrates with Google Tag Manager,
                allowing you to track user interactions on your website in
                real-time and trigger personalized ActionSpeak.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
