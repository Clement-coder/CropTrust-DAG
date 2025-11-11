'use client';
import { usePrivy } from '@privy-io/react-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { DashboardLayout } from "@/components/dashboard/layout"
import { OverviewCard } from "@/components/dashboard/overview-card"
import { RecentTransactions } from "@/components/dashboard/recent-transations"
import { motion } from "framer-motion"
import { Package, DollarSign, Star, Sprout, Truck, Lock, Clock } from 'lucide-react';
import { useListings } from "@/hooks/use-listings"

export default function DashboardPage() {
  const { ready, authenticated, user } = usePrivy();
  const router = useRouter();
  const { listings } = useListings();

  useEffect(() => {
    if (ready && !authenticated) {
      router.push('/');
    }
  }, [ready, authenticated, router]);

  const totalListedProducts = listings.length;
  const cropsListed = listings.length; // Assuming "Crops Listed" is the same as total listed products

 const moneyEarned = listings
  .filter(listing => listing.status === "sold out")
  .reduce((sum, listing) => {
    const priceValue = parseFloat(String(listing.price).replace(/[^0-9.-]+/g, ""));
    return sum + (isNaN(priceValue) ? 0 : priceValue);
  }, 0);

const moneyInEscrow = listings
  .filter(listing => listing.status === "active")
  .reduce((sum, listing) => {
    const priceValue = parseFloat(String(listing.price).replace(/[^0-9.-]+/g, ""));
    return sum + (isNaN(priceValue) ? 0 : priceValue);
  }, 0);


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
          <OverviewCard label="Total Listed Products" value={totalListedProducts} icon={<Package />} />
          <OverviewCard label="Money Earned" value={`$${moneyEarned.toFixed(2)}`} icon={<DollarSign />} />
          <OverviewCard label="Ratings" value="0/5" icon={<Star />} />
          <OverviewCard label="Crops Listed" value={cropsListed} icon={<Sprout />} />
          <OverviewCard label="Active Deliveries" value={0} icon={<Truck />} />
          <OverviewCard label="Money in Escrow" value={`$${moneyInEscrow.toFixed(2)}`} icon={<Lock />} />
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
