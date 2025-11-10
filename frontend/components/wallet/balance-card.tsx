'use client';
import { useState } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Copy, Check, ArrowDownToLine, ArrowUpFromLine } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { QRCodeSVG } from 'qrcode.react';

export function BalanceCard() {
  const { user } = usePrivy();
  const [isVisible, setIsVisible] = useState(true);
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    if (user?.wallet?.address) {
      navigator.clipboard.writeText(user.wallet.address);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground border-0">
        <CardContent className="p-8">
          <div className="space-y-6">
            <div>
              <p className="text-sm opacity-80 mb-2">Total Balance</p>
              <div className="flex items-end gap-4">
                <div className="flex items-baseline gap-2">
                  <h2 className="text-5xl font-bold">{isVisible ? '₦0.00' : '••••••'}</h2>
                </div>
                <button
                  onClick={() => setIsVisible(!isVisible)}
                  className="opacity-80 hover:opacity-100 transition mb-1"
                >
                  {isVisible ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>
            </div>

            <div className="flex gap-2 flex-wrap">
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                    <ArrowDownToLine size={16} className="mr-2" />
                    Deposit Funds
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Deposit Funds</DialogTitle>
                    <DialogDescription>
                      Scan the QR code or copy the address below to deposit funds into your wallet.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex flex-col items-center gap-4">
                    <QRCodeSVG value={user?.wallet?.address || ''} size={256} />
                    <p className="text-sm font-semibold break-all">{user?.wallet?.address}</p>
                  </div>
                </DialogContent>
              </Dialog>
              <Button
                size="sm"
                variant="outline"
                className="border-primary-foreground text-primary-foreground hover:bg-white/10 bg-transparent"
              >
                <ArrowUpFromLine size={16} className="mr-2" />
                Withdraw
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-primary-foreground text-primary-foreground hover:bg-white/10 bg-transparent"
                onClick={copyToClipboard}
              >
                {isCopied ? <Check size={16} /> : <Copy size={16} />}
                {isCopied ? 'Copied!' : 'Copy Address'}
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-4 pt-4 border-t border-primary-foreground/30">
              <div>
                <p className="text-xs opacity-80">Wallet Address</p>
                <p className="text-sm font-semibold break-all">{user?.wallet?.address}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
