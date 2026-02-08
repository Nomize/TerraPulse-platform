import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useGuest } from '@/contexts/GuestContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, EyeOff, Mail, Lock, Leaf, MapPin, TrendingUp, Award, Sprout, Tractor } from 'lucide-react';
import { toast } from 'sonner';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const { setGuestMode } = useGuest();
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
    { icon: Sprout, title: 'Grow Sustainably', description: 'Get personalized farming tips' }
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Organic background pattern */}
      <div className="absolute inset-0 organic-pattern" />
      
      {/* Subtle farm decorations */}
      <div className="absolute bottom-10 left-10 opacity-10">
        <Tractor className="w-40 h-40 text-secondary" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 bg-card/95 backdrop-blur-sm border border-border rounded-2xl p-8 shadow-medium">
          {/* Left Side - Login Form */}
          <div className="flex flex-col justify-center">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-8">
              <div className="relative">
                <Leaf className="w-10 h-10 text-primary" />
              </div>
              <span className="text-2xl font-bold text-foreground">
                Terra<span className="text-primary">Pulse</span>
              </span>
            </div>

            <h1 className="text-4xl font-bold text-foreground mb-2">Welcome Back</h1>
            <p className="text-muted-foreground mb-8">Monitor your land, track your progress</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <div>
                <label className="text-sm text-foreground font-medium mb-2 block">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="pl-10 bg-background border-border text-foreground focus:border-primary"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="text-sm text-foreground font-medium mb-2 block">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="pl-10 pr-10 bg-background border-border text-foreground focus:border-primary"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
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
                    className="border-primary data-[state=checked]:bg-primary"
                  />
                  <span className="text-sm text-muted-foreground">Remember me</span>
                </div>
                <Link to="/forgot-password" className="text-sm text-primary hover:text-primary-dark transition-colors font-medium">
                  Forgot password?
                </Link>
              </div>

              {/* Sign In Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full"
                size="lg"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
                    Signing in...
                  </div>
                ) : (
                  'Sign In'
                )}
              </Button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-card text-muted-foreground">or continue as</span>
                </div>
              </div>

              {/* Guest Button */}
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setGuestMode(true);
                  toast.info('Viewing as Guest - Sign up to save progress');
                  navigate('/dashboard');
                }}
                className="w-full"
                size="lg"
              >
                Continue as Guest
              </Button>

              {/* Sign Up Link */}
              <p className="text-center text-sm text-muted-foreground">
                Don't have an account?{' '}
                <Link to="/signup" className="text-primary hover:text-primary-dark font-semibold transition-colors">
                  Sign up
                </Link>
              </p>
            </form>
          </div>

          {/* Right Side - Benefits */}
          <div className="hidden md:flex flex-col justify-center space-y-4">
            <h3 className="text-2xl font-bold text-foreground mb-4">Why TerraPulse?</h3>
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-background border border-border rounded-xl p-6 hover:border-primary hover:shadow-soft transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-all">
                    <benefit.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-foreground font-bold mb-1">{benefit.title}</h4>
                    <p className="text-muted-foreground text-sm">{benefit.description}</p>
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
