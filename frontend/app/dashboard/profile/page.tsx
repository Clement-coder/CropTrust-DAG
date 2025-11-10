'use client';
import { usePrivy } from '@privy-io/react-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { DashboardLayout } from '@/components/dashboard/layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Mail, User as UserIcon, Calendar } from 'lucide-react';

export default function ProfilePage() {
  const { ready, authenticated, user } = usePrivy();
  const router = useRouter();

  useEffect(() => {
    if (ready && !authenticated) {
      router.push('/');
    }
  }, [ready, authenticated, router]);

  if (!user) {
    return (
      <DashboardLayout>
        <div className="p-6 md:p-8 text-center">Loading...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-6 md:p-8 max-w-4xl">
        <motion.h1
          className="text-3xl font-bold text-foreground mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Profile
        </motion.h1>

        <div className="grid lg:grid-cols-4 gap-6">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white text-4xl font-bold mx-auto mb-4">
                  {user.google?.name?.charAt(0)}
                </div>
                <p className="font-semibold text-foreground">{user.google?.name}</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
                      <UserIcon size={16} />
                      Full Name
                    </label>
                    <p className="text-foreground font-medium">{user.google?.name}</p>
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
                      <Mail size={16} />
                      Email Address
                    </label>
                    <p className="text-foreground font-medium">{user.google?.email}</p>
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
                      <Calendar size={16} />
                      Joined
                    </label>
                    <p className="text-foreground font-medium">{user.createdAt.toLocaleDateString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}
