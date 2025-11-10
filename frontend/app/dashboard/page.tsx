'use client';
import { usePrivy } from '@privy-io/react-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { DashboardLayout } from "@/components/dashboard/layout"
import { OverviewCard } from "@/components/dashboard/overview-card"
import { RecentTransactions } from "@/components/dashboard/recent-transations"
import { motion } from "framer-motion"
import { Package, DollarSign, Star, Sprout, Truck, Lock, Clock } from 'lucide-react';

export default function DashboardPage() {
  const { ready, authenticated, user } = usePrivy();
  const router = useRouter();

  useEffect(() => {
    if (ready && !authenticated) {
      router.push('/');
    }
  }, [ready, authenticated, router]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

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

        {/* Overview Cards */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <OverviewCard label="Total Listed Products" value={0} icon={<Package />} />
          <OverviewCard label="Money Earned" value="$0.00" icon={<DollarSign />} />
          <OverviewCard label="Ratings" value="0/5" icon={<Star />} />
          <OverviewCard label="Crops Listed" value={0} icon={<Sprout />} />
          <OverviewCard label="Active Deliveries" value={0} icon={<Truck />} />
          <OverviewCard label="Money in Escrow" value="₦0.00" icon={<Lock />} />
          <OverviewCard label="Pending Sales" value={0} icon={<Clock />} />
        </motion.div>

        {/* Recent Transactions */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <RecentTransactions />
        </motion.div>
      </div>
    </DashboardLayout>
  )
}
