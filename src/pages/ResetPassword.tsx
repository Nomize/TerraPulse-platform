import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Lock, Eye, EyeOff, Leaf } from 'lucide-react';
import { toast } from 'sonner';

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { updatePassword } = useAuth();
  const navigate = useNavigate();

  const getPasswordStrength = (pass: string) => {
    if (pass.length === 0) return 0;
    if (pass.length < 6) return 25;
    if (pass.length < 8) return 50;
    if (pass.length >= 8 && /[A-Z]/.test(pass) && /[0-9]/.test(pass)) return 100;
    return 75;
  };

  const passwordStrength = getPasswordStrength(newPassword);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newPassword) {
      toast.error('Please enter a new password');
      return;
    }

    if (newPassword.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setLoading(true);
    const { error } = await updatePassword(newPassword);
    setLoading(false);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Password updated successfully!');
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center p-6">
      {/* Animated background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00FF4110_1px,transparent_1px),linear-gradient(to_bottom,#00FF4110_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-[#0F1419]/90 backdrop-blur-xl border border-[#10B981]/30 rounded-2xl p-8 shadow-[0_0_60px_rgba(0,255,65,0.2)]">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <Leaf className="w-10 h-10 text-[#00FF41]" />
            <span className="text-2xl font-bold text-white">
              Terra<span className="text-[#00FF41]">Pulse</span>
            </span>
          </div>

          <h1 className="text-3xl font-bold text-white mb-2 text-center">Reset Password</h1>
          <p className="text-gray-400 mb-8 text-center">
            Enter your new password below
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* New Password */}
            <div>
              <label className="text-sm text-gray-400 mb-2 block">New Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-10 pr-10 bg-[#1A1F26] border-[#10B981]/50 text-white focus:border-[#00FF41]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#00FF41]"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {newPassword && (
                <div className="mt-2">
                  <div className="w-full h-2 bg-[#1A1F26] rounded-full overflow-hidden">
                    <div
                      className="h-full transition-all duration-300"
                      style={{
                        width: `${passwordStrength}%`,
                        backgroundColor: passwordStrength < 50 ? '#FF3B3B' : passwordStrength < 75 ? '#FF8C00' : '#00FF41'
                      }}
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    {passwordStrength < 50 ? 'Weak' : passwordStrength < 75 ? 'Good' : 'Strong'} password
                  </p>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-10 bg-[#1A1F26] border-[#10B981]/50 text-white focus:border-[#00FF41]"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#00FF41] text-black font-bold hover:bg-[#39FF14] hover:shadow-[0_0_30px_rgba(0,255,65,0.6)]"
              size="lg"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  Resetting...
                </div>
              ) : (
                'Reset Password'
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}