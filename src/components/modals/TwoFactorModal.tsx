import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, QrCode } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface TwoFactorModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TwoFactorModal({ open, onOpenChange }: TwoFactorModalProps) {
  const { toast } = useToast();
  const [step, setStep] = useState<'setup' | 'verify'>('setup');
  const [verificationCode, setVerificationCode] = useState('');

  const handleEnable2FA = () => {
    setStep('verify');
  };

  const handleVerify = () => {
    if (verificationCode.length === 6) {
      toast({
        title: "2FA Enabled",
        description: "Two-factor authentication has been enabled successfully.",
      });
      onOpenChange(false);
      setStep('setup');
      setVerificationCode('');
    } else {
      toast({
        title: "Invalid Code",
        description: "Please enter a 6-digit verification code.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Two-Factor Authentication
          </DialogTitle>
          <DialogDescription>
            Add an extra layer of security to your account
          </DialogDescription>
        </DialogHeader>
        
        {step === 'setup' && (
          <div className="space-y-4">
            <div className="flex justify-center p-8 bg-muted rounded-lg">
              <div className="w-48 h-48 bg-background border-2 border-dashed border-border rounded-lg flex items-center justify-center">
                <QrCode className="h-24 w-24 text-muted-foreground" />
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Scan this QR code with your authenticator app (Google Authenticator, Authy, etc.)
              </p>
              <div className="p-2 bg-muted rounded text-center font-mono text-sm">
                ABCD-EFGH-IJKL-MNOP-QRST-UVWX
              </div>
            </div>
            <Button onClick={handleEnable2FA} className="w-full">
              Continue to Verification
            </Button>
          </div>
        )}

        {step === 'verify' && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="code">Enter Verification Code</Label>
              <Input
                id="code"
                type="text"
                placeholder="000000"
                maxLength={6}
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
              />
              <p className="text-xs text-muted-foreground">
                Enter the 6-digit code from your authenticator app
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setStep('setup')} className="flex-1">
                Back
              </Button>
              <Button onClick={handleVerify} className="flex-1">
                Enable 2FA
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
