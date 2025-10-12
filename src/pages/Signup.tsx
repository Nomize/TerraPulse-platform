import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, EyeOff, Mail, Lock, User, Leaf } from 'lucide-react';
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
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Enhanced Satellite Grid Effect */}
      <div className="absolute inset-0">
        {/* Animated diagonal grid lines */}
        <div className="absolute inset-0">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M 80 0 L 0 80" stroke="#00FF41" strokeWidth="0.5" opacity="0.1" />
                <path d="M 0 0 L 80 80" stroke="#00FF41" strokeWidth="0.5" opacity="0.1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            <animate attributeName="x" from="0" to="80" dur="20s" repeatCount="indefinite" />
          </svg>
        </div>

        {/* Orbital paths with moving satellites */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {/* Orbit 1 */}
          <ellipse cx="50%" cy="50%" rx="40%" ry="30%" fill="none" stroke="#00FF41" strokeWidth="1" opacity="0.15" />
          <circle r="4" fill="#00FF41" opacity="0.8">
            <animateMotion dur="15s" repeatCount="indefinite" path="M 960,540 A 768,432 0 1,1 960,539" />
          </circle>
          
          {/* Orbit 2 */}
          <ellipse cx="50%" cy="50%" rx="30%" ry="45%" fill="none" stroke="#00FF41" strokeWidth="1" opacity="0.12" />
          <circle r="3" fill="#00FF41" opacity="0.6">
            <animateMotion dur="20s" repeatCount="indefinite" path="M 960,540 A 576,648 0 1,1 960,539" />
          </circle>

          {/* Orbit 3 */}
          <ellipse cx="50%" cy="50%" rx="25%" ry="20%" fill="none" stroke="#00FF41" strokeWidth="1" opacity="0.1" />
          <circle r="2" fill="#00FF41" opacity="0.5">
            <animateMotion dur="12s" repeatCount="indefinite" path="M 960,540 A 480,288 0 1,1 960,539" />
          </circle>
        </svg>

        {/* Glowing intersection points */}
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#00FF41] rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              boxShadow: '0 0 10px rgba(0,255,65,0.8)'
            }}
          />
        ))}
      </div>

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,255,65,0.05)_50%,#000_100%)]" />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-6 py-12">
        <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 bg-[#0F1419]/90 backdrop-blur-xl border border-[#10B981]/30 rounded-2xl p-8 shadow-[0_0_60px_rgba(0,255,65,0.2)]">
          {/* Left Side - Signup Form */}
          <div className="flex flex-col">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-6">
              <div className="relative">
                <Leaf className="w-10 h-10 text-[#00FF41] animate-pulse" />
              </div>
              <span className="text-2xl font-bold text-white">
                Terra<span className="text-[#00FF41]">Pulse</span>
              </span>
            </div>

            <h1 className="text-3xl font-bold text-white mb-2">Join TerraPulse</h1>
            <p className="text-gray-400 mb-6">Start restoring your land today</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Full Name *</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <Input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="John Doe"
                    className="pl-10 bg-[#1A1F26] border-[#10B981]/50 text-white focus:border-[#00FF41]"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Email *</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="pl-10 bg-[#1A1F26] border-[#10B981]/50 text-white focus:border-[#00FF41]"
                  />
                </div>
              </div>

              {/* Password with strength meter */}
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Password *</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                {password && (
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
                <label className="text-sm text-gray-400 mb-1 block">Confirm Password *</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <Input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="pl-10 pr-10 bg-[#1A1F26] border-[#10B981]/50 text-white focus:border-[#00FF41]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#00FF41]"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* User Type */}
              <div>
                <label className="text-sm text-gray-400 mb-1 block">I am a:</label>
                <select
                  value={userType}
                  onChange={(e) => setUserType(e.target.value)}
                  className="w-full bg-[#1A1F26] border border-[#10B981]/50 text-white rounded-md px-3 py-2 focus:border-[#00FF41] focus:outline-none"
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
                  <label className="text-sm text-gray-400 mb-1 block">Location</label>
                  <Input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Nigeria"
                    className="bg-[#1A1F26] border-[#10B981]/50 text-white focus:border-[#00FF41]"
                  />
                </div>

                {/* Farm Size */}
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Farm Size (ha)</label>
                  <Input
                    type="number"
                    value={farmSize}
                    onChange={(e) => setFarmSize(e.target.value)}
                    placeholder="42.5"
                    className="bg-[#1A1F26] border-[#10B981]/50 text-white focus:border-[#00FF41]"
                  />
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start gap-2">
                <Checkbox
                  checked={agreeTerms}
                  onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                  className="mt-1 border-[#00FF41]"
                />
                <span className="text-sm text-gray-400">
                  I agree to the{' '}
                  <Link to="/terms" className="text-[#00FF41] hover:text-[#39FF14]">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-[#00FF41] hover:text-[#39FF14]">
                    Privacy Policy
                  </Link>
                </span>
              </div>

              {/* Create Account Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-[#00FF41] text-black font-bold hover:bg-[#39FF14] hover:shadow-[0_0_30px_rgba(0,255,65,0.6)]"
                size="lg"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                    Creating account...
                  </div>
                ) : (
                  'Create Account'
                )}
              </Button>

              {/* Sign In Link */}
              <p className="text-center text-sm text-gray-400">
                Already have an account?{' '}
                <Link to="/login" className="text-[#00FF41] hover:text-[#39FF14] font-semibold">
                  Sign in
                </Link>
              </p>
            </form>
          </div>

          {/* Right Side - Stats */}
          <div className="hidden md:flex flex-col justify-center items-center text-center space-y-8">
            <div>
              <h3 className="text-3xl font-bold text-white mb-2">Join 10,000+ users</h3>
              <p className="text-gray-400">Monitoring 1M+ hectares worldwide</p>
            </div>
            
            <div className="grid grid-cols-2 gap-6 w-full">
              <div className="bg-[#1A1F26]/50 border border-[#10B981]/20 rounded-xl p-6 hover:border-[#00FF41] transition-all hover:shadow-[0_0_20px_rgba(0,255,65,0.3)]">
                <p className="text-4xl font-bold text-[#00FF41] mb-2 drop-shadow-[0_0_10px_rgba(0,255,65,0.5)]">1M+</p>
                <p className="text-gray-400 text-sm">Hectares Monitored</p>
              </div>
              <div className="bg-[#1A1F26]/50 border border-[#10B981]/20 rounded-xl p-6 hover:border-[#00FF41] transition-all hover:shadow-[0_0_20px_rgba(0,255,65,0.3)]">
                <p className="text-4xl font-bold text-[#00FF41] mb-2 drop-shadow-[0_0_10px_rgba(0,255,65,0.5)]">156K</p>
                <p className="text-gray-400 text-sm">Tons CO₂ Sequestered</p>
              </div>
            </div>

            <div className="w-32 h-32 relative">
              <div className="absolute inset-0 bg-[#00FF41]/10 rounded-full animate-pulse shadow-[0_0_40px_rgba(0,255,65,0.4)]"></div>
              <div className="absolute inset-4 bg-[#00FF41]/20 rounded-full animate-ping shadow-[0_0_20px_rgba(0,255,65,0.6)]"></div>
              <Leaf className="absolute inset-0 m-auto w-16 h-16 text-[#00FF41] drop-shadow-[0_0_15px_rgba(0,255,65,0.8)]" />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}