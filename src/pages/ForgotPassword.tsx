import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, ArrowLeft, Leaf, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const { resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    setLoading(true);
    const { error } = await resetPassword(email);
    setLoading(false);

    if (error) {
      toast.error(error.message);
    } else {
      setSent(true);
      toast.success('Password reset link sent!');
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

          {!sent ? (
            <>
              <h1 className="text-3xl font-bold text-white mb-2 text-center">Forgot Password?</h1>
              <p className="text-gray-400 mb-8 text-center">
                Enter your email and we'll send you a reset link
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="pl-10 bg-[#1A1F26] border-[#10B981]/50 text-white focus:border-[#00FF41] focus:shadow-[0_0_20px_rgba(0,255,65,0.3)]"
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
                      Sending...
                    </div>
                  ) : (
                    'Send Reset Link'
                  )}
                </Button>

                <Link to="/login">
                  <Button
                    type="button"
                    variant="ghost"
                    className="w-full text-gray-400 hover:text-[#00FF41]"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to login
                  </Button>
                </Link>
              </form>
            </>
          ) : (
            <div className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-[#00FF41] mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Check Your Email</h2>
              <p className="text-gray-400 mb-6">
                We've sent a password reset link to<br />
                <span className="text-[#00FF41] font-semibold">{email}</span>
              </p>
              <Link to="/login">
                <Button variant="outline" className="border-[#00FF41] text-[#00FF41] hover:bg-[#00FF41] hover:text-black">
                  Back to Login
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}