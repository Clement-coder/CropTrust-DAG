'use client';
import { usePrivy } from '@privy-io/react-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { DashboardLayout } from "@/components/dashboard/layout"
import { RecentTransactions } from "@/components/dashboard/recent-transations"
import { motion } from "framer-motion"

export default function DashboardPage() {
  const { ready, authenticated, user } = usePrivy();
  const router = useRouter();

  useEffect(() => {
    if (ready && !authenticated) {
      router.push('/');
    }
  }, [ready, authenticated, router]);

  return (
    <DashboardLayout>
      <div className="p-6 md:p-8">
        <motion.h1
          className="text-3xl font-bold text-foreground mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Welcome, {user?.google?.name || 'User'}!
        </motion.h1>

        {/* Recent Transactions */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <RecentTransactions />
        </motion.div>
      </div>
    </DashboardLayout>
  )
}
