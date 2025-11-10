'use client';
import { usePrivy } from '@privy-io/react-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Navigation } from '@/components/navigation';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';

export default function SignupPage() {
  const { ready, authenticated, login } = usePrivy();
  const router = useRouter();

  useEffect(() => {
    if (ready && authenticated) {
      router.push('/dashboard');
    }
  }, [ready, authenticated, router]);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navigation />
      <div className="flex flex-col items-center justify-center flex-grow">
        <div className="max-w-md w-full p-8 space-y-8 bg-card rounded-lg shadow-lg">
          <div className="flex justify-start">
            <Link href="/" className="text-muted-foreground hover:text-foreground">
              <ArrowLeft size={24} />
            </Link>
          </div>
          <div className="text-center">
            <Image src="/CroptrustLog.png" alt="CropTrust Logo" width={64} height={64} className="mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-foreground">Create your CropTrust account</h1>
            <p className="mt-2 text-muted-foreground">
              Join our community of farmers and buyers to trade crops with trust and transparency. Get access to a decentralized marketplace, secure payments, and a reliable reputation system.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <button
              onClick={login}
              className="w-full px-4 py-2 text-lg font-semibold text-white bg-primary rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary flex items-center justify-center gap-2"
            >
              <FcGoogle size={24} />
              Sign up with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
