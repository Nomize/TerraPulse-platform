import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, EyeOff, Mail, Lock, CheckCircle, XCircle, Leaf, MapPin, TrendingUp, Award, DollarSign } from 'lucide-react';
import { toast } from 'sonner';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Welcome back!');
      navigate('/dashboard');
    }
  };

  const benefits = [
    { icon: MapPin, title: 'Save Your Regions', description: 'Track multiple farm locations' },
    { icon: TrendingUp, title: 'Track Progress', description: 'See improvements over time' },
    { icon: Award, title: 'Earn Rewards', description: 'Badges and leaderboard rankings' },
    { icon: DollarSign, title: 'Carbon Credits', description: 'Verify and monetize impact' }
  ];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00FF4110_1px,transparent_1px),linear-gradient(to_bottom,#00FF4110_1px,transparent_1px)] bg-[size:4rem_4rem] animate-grid-flow" />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 bg-[#0F1419]/90 backdrop-blur-xl border border-[#10B981]/30 rounded-2xl p-8 shadow-[0_0_60px_rgba(0,255,65,0.2)]">
          {/* Left Side - Login Form */}
          <div className="flex flex-col justify-center">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-8">
              <div className="relative">
                <Leaf className="w-10 h-10 text-[#00FF41] animate-pulse" />
                <div className="absolute inset-0 w-10 h-10">
                  <Leaf className="w-10 h-10 text-[#00FF41] opacity-50 animate-ping" />
                </div>
              </div>
              <span className="text-2xl font-bold text-white">
                Terra<span className="text-[#00FF41]">Pulse</span>
              </span>
            </div>

            <h1 className="text-4xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-gray-400 mb-8">Monitor your land, track progress</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Email</label>
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

              {/* Password Input */}
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="pl-10 pr-10 bg-[#1A1F26] border-[#10B981]/50 text-white focus:border-[#00FF41] focus:shadow-[0_0_20px_rgba(0,255,65,0.3)]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#00FF41] transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                    className="border-[#00FF41]"
                  />
                  <span className="text-sm text-gray-400">Remember me</span>
                </div>
                <Link to="/forgot-password" className="text-sm text-[#00FF41] hover:text-[#39FF14] transition-colors">
                  Forgot password?
                </Link>
              </div>

              {/* Sign In Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-[#00FF41] text-black font-bold hover:bg-[#39FF14] hover:shadow-[0_0_30px_rgba(0,255,65,0.6)] transition-all"
                size="lg"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                    Signing in...
                  </div>
                ) : (
                  'Sign In'
                )}
              </Button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#10B981]/30"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-[#0F1419] text-gray-400">or continue as</span>
                </div>
              </div>

              {/* Guest Button */}
              <Link to="/dashboard">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full border-2 border-[#10B981]/50 text-gray-400 hover:border-[#00FF41] hover:text-[#00FF41] transition-all"
                  size="lg"
                >
                  Continue as Guest
                </Button>
              </Link>

              {/* Sign Up Link */}
              <p className="text-center text-sm text-gray-400">
                Don't have an account?{' '}
                <Link to="/signup" className="text-[#00FF41] hover:text-[#39FF14] font-semibold transition-colors">
                  Sign up
                </Link>
              </p>
            </form>
          </div>

          {/* Right Side - Benefits */}
          <div className="hidden md:flex flex-col justify-center space-y-4">
            <h3 className="text-2xl font-bold text-white mb-4">Why TerraPulse?</h3>
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-[#1A1F26]/50 border border-[#10B981]/20 rounded-xl p-6 hover:border-[#00FF41] hover:bg-[#1A1F26]/70 hover:shadow-[0_0_30px_rgba(0,255,65,0.1)] transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#00FF41]/10 rounded-lg flex items-center justify-center group-hover:bg-[#00FF41]/20 transition-all">
                    <benefit.icon className="w-6 h-6 text-[#00FF41]" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">{benefit.title}</h4>
                    <p className="text-gray-400 text-sm">{benefit.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}