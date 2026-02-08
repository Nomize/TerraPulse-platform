import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, EyeOff, Mail, Lock, User, Leaf, Tractor, Sprout } from 'lucide-react';
import { toast } from 'sonner';

export default function Signup() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('farmer');
  const [location, setLocation] = useState('');
  const [farmSize, setFarmSize] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const getPasswordStrength = (pass: string) => {
    if (pass.length === 0) return 0;
    if (pass.length < 6) return 25;
    if (pass.length < 8) return 50;
    if (pass.length >= 8 && /[A-Z]/.test(pass) && /[0-9]/.test(pass)) return 100;
    return 75;
  };

  const passwordStrength = getPasswordStrength(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!fullName || !email || !password) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }

    if (!agreeTerms) {
      toast.error('Please agree to Terms & Privacy Policy');
      return;
    }

    setLoading(true);
    const { error } = await signUp(email, password, fullName, {
      user_type: userType,
      location,
      farm_size: farmSize ? parseFloat(farmSize) : null
    });
    setLoading(false);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Account created! Welcome to TerraPulse');
      navigate('/onboarding');
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Organic background pattern */}
      <div className="absolute inset-0 organic-pattern" />
      
      {/* Subtle farm-themed decorations */}
      <div className="absolute top-20 left-10 opacity-10">
        <Sprout className="w-32 h-32 text-primary" />
      </div>
      <div className="absolute bottom-20 right-10 opacity-10">
        <Tractor className="w-40 h-40 text-secondary" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-6 py-12">
        <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 bg-card/95 backdrop-blur-sm border border-border rounded-2xl p-8 shadow-medium">
          {/* Left Side - Signup Form */}
          <div className="flex flex-col">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-6">
              <div className="relative">
                <Leaf className="w-10 h-10 text-primary" />
              </div>
              <span className="text-2xl font-bold text-foreground">
                Terra<span className="text-primary">Pulse</span>
              </span>
            </div>

            <h1 className="text-3xl font-bold text-foreground mb-2">Join TerraPulse</h1>
            <p className="text-muted-foreground mb-6">Start your sustainable farming journey today</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="text-sm text-foreground font-medium mb-1 block">Full Name *</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="John Doe"
                    className="pl-10 bg-background border-border text-foreground focus:border-primary"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="text-sm text-foreground font-medium mb-1 block">Email *</label>
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

              {/* Password with strength meter */}
              <div>
                <label className="text-sm text-foreground font-medium mb-1 block">Password *</label>
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
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {password && (
                  <div className="mt-2">
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full transition-all duration-300"
                        style={{
                          width: `${passwordStrength}%`,
                          backgroundColor: passwordStrength < 50 ? 'hsl(var(--destructive))' : passwordStrength < 75 ? 'hsl(var(--warning))' : 'hsl(var(--success))'
                        }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {passwordStrength < 50 ? 'Weak' : passwordStrength < 75 ? 'Good' : 'Strong'} password
                    </p>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="text-sm text-foreground font-medium mb-1 block">Confirm Password *</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="pl-10 pr-10 bg-background border-border text-foreground focus:border-primary"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* User Type */}
              <div>
                <label className="text-sm text-foreground font-medium mb-1 block">I am a:</label>
                <select
                  value={userType}
                  onChange={(e) => setUserType(e.target.value)}
                  className="w-full bg-background border border-border text-foreground rounded-lg px-3 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="farmer">Farmer</option>
                  <option value="ngo">NGO</option>
                  <option value="researcher">Researcher</option>
                  <option value="government">Government</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Location */}
                <div>
                  <label className="text-sm text-foreground font-medium mb-1 block">Location</label>
                  <Input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Nigeria"
                    className="bg-background border-border text-foreground focus:border-primary"
                  />
                </div>

                {/* Farm Size */}
                <div>
                  <label className="text-sm text-foreground font-medium mb-1 block">Farm Size (ha)</label>
                  <Input
                    type="number"
                    value={farmSize}
                    onChange={(e) => setFarmSize(e.target.value)}
                    placeholder="42.5"
                    className="bg-background border-border text-foreground focus:border-primary"
                  />
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start gap-2">
                <Checkbox
                  checked={agreeTerms}
                  onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                  className="mt-1 border-primary data-[state=checked]:bg-primary"
                />
                <span className="text-sm text-muted-foreground">
                  I agree to the{' '}
                  <Link to="/terms" className="text-primary hover:text-primary-dark font-medium">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-primary hover:text-primary-dark font-medium">
                    Privacy Policy
                  </Link>
                </span>
              </div>

              {/* Create Account Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full"
                size="lg"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
                    Creating account...
                  </div>
                ) : (
                  'Create Account'
                )}
              </Button>

              {/* Sign In Link */}
              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link to="/login" className="text-primary hover:text-primary-dark font-semibold">
                  Sign in
                </Link>
              </p>
            </form>
          </div>

          {/* Right Side - Stats */}
          <div className="hidden md:flex flex-col justify-center items-center text-center space-y-8">
            <div>
              <h3 className="text-3xl font-bold text-foreground mb-2">Join 10,000+ farmers</h3>
              <p className="text-muted-foreground">Growing sustainably across 1M+ hectares</p>
            </div>
            
            <div className="grid grid-cols-2 gap-6 w-full">
              <div className="bg-background border border-border rounded-xl p-6 hover:border-primary transition-all hover:shadow-soft">
                <p className="text-4xl font-bold text-primary mb-2">1M+</p>
                <p className="text-muted-foreground text-sm">Hectares Monitored</p>
              </div>
              <div className="bg-background border border-border rounded-xl p-6 hover:border-primary transition-all hover:shadow-soft">
                <p className="text-4xl font-bold text-primary mb-2">156K</p>
                <p className="text-muted-foreground text-sm">Tons CO₂ Sequestered</p>
              </div>
            </div>

            <div className="w-32 h-32 relative">
              <div className="absolute inset-0 bg-primary/10 rounded-full"></div>
              <div className="absolute inset-4 bg-primary/20 rounded-full animate-pulse"></div>
              <Leaf className="absolute inset-0 m-auto w-16 h-16 text-primary" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
