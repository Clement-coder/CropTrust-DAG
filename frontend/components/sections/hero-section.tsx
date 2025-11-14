"use client"
import Link from "next/link"
import { Button } from "../ui/button"
import { motion } from "framer-motion"
import { Wheat, Truck, ShieldCheck, CircleDollarSign, ArrowRight, Store } from 'lucide-react';

export function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <section className="min-h-screen bg-background pt-24 flex items-center justify-center relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 right-10 w-64 h-64 rounded-full opacity-5 bg-primary"
          animate={{ y: [0, 30, 0] }}
          transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
        />
        <motion.div
          className="absolute bottom-20 left-10 w-64 h-64 rounded-full opacity-5 bg-secondary"
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
        />
      </div>

      <motion.div
        className="max-w-4xl mx-auto px-4 text-center relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-5xl md:text-6xl lg:text-7xl font-bold text-balance text-foreground mb-6"
          variants={itemVariants}
        >
          Connecting Farmers and Buyers <span className="text-primary">Seamlessly</span>
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance"
          variants={itemVariants}
        >
          A digital space where trust grows with every trade. Empowering agriculture with transparent, fair, and
          efficient transactions.
        </motion.p>

        <motion.div className="flex flex-col sm:flex-row gap-4 justify-center" variants={itemVariants}>
          <Button size="lg" asChild className="flex items-center gap-2">
            <Link href="/signup">
              Get Started <ArrowRight size={20} />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="flex items-center gap-2">
            <Link href="#how-it-works">
              <Store size={20} /> Explore Marketplace
            </Link>
          </Button>
        </motion.div>

        {/* Floating icons animation */}
        <motion.div className="mt-16 flex justify-center gap-8" variants={itemVariants}>
          {[
            { icon: <Wheat size={40} className="text-primary" />, label: "Crops" },
            { icon: <Truck size={40} className="text-primary" />, label: "Delivery" },
            { icon: <ShieldCheck size={40} className="text-primary" />, label: "Trust" },
            { icon: <CircleDollarSign size={40} className="text-primary" />, label: "Fair Price" },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="text-4xl"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, delay: index * 0.2, repeat: Number.POSITIVE_INFINITY }}
            >
              {item.icon}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
