import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MapPin, Target, CheckCircle, Leaf } from 'lucide-react';

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [goals, setGoals] = useState<string[]>([]);
  const navigate = useNavigate();

  const goalOptions = [
    { id: 'erosion', label: 'Reduce soil erosion', icon: '🌊' },
    { id: 'vegetation', label: 'Increase vegetation', icon: '🌱' },
    { id: 'carbon', label: 'Earn carbon credits', icon: '💰' },
    { id: 'yield', label: 'Improve crop yields', icon: '🌾' },
    { id: 'deforestation', label: 'Monitor deforestation', icon: '🌳' }
  ];

  const toggleGoal = (goalId: string) => {
    setGoals(prev =>
      prev.includes(goalId)
        ? prev.filter(g => g !== goalId)
        : [...prev, goalId]
    );
  };

  const handleComplete = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center p-6">
      {/* Animated background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00FF4110_1px,transparent_1px),linear-gradient(to_bottom,#00FF4110_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      
      {/* Confetti animation on step 3 */}
      {step === 3 && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-[#00FF41] rounded-full animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      )}

      <div className="relative z-10 w-full max-w-2xl">
        <div className="bg-[#0F1419]/90 backdrop-blur-xl border border-[#10B981]/30 rounded-2xl p-8 shadow-[0_0_60px_rgba(0,255,65,0.2)]">
          {/* Progress indicator */}
          <div className="flex items-center justify-between mb-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex-1 flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                  step >= s ? 'bg-[#00FF41] text-black' : 'bg-[#1A1F26] text-gray-500'
                }`}>
                  {step > s ? <CheckCircle className="w-6 h-6" /> : s}
                </div>
                {s < 3 && <div className={`flex-1 h-1 mx-2 rounded ${step > s ? 'bg-[#00FF41]' : 'bg-[#1A1F26]'}`} />}
              </div>
            ))}
          </div>

          {/* Step 1: Location */}
          {step === 1 && (
            <div className="text-center py-8">
              <MapPin className="w-16 h-16 text-[#00FF41] mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-white mb-4">Add Your First Location</h2>
              <p className="text-gray-400 mb-8">
                Where is your land? You can add multiple locations later.
              </p>
              <div className="flex flex-col gap-4">
                <Button
                  onClick={() => setStep(2)}
                  className="bg-[#00FF41] text-black font-bold hover:bg-[#39FF14]"
                  size="lg"
                >
                  Add Location on Map
                </Button>
                <Button
                  onClick={() => setStep(2)}
                  variant="outline"
                  className="border-[#00FF41] text-[#00FF41] hover:bg-[#00FF41] hover:text-black"
                  size="lg"
                >
                  Skip for Now
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Goals */}
          {step === 2 && (
            <div className="py-8">
              <Target className="w-16 h-16 text-[#00FF41] mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-white mb-4 text-center">Tell Us About Your Goals</h2>
              <p className="text-gray-400 mb-8 text-center">
                Select all that apply (you can change these later)
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {goalOptions.map((goal) => (
                  <button
                    key={goal.id}
                    onClick={() => toggleGoal(goal.id)}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${
                      goals.includes(goal.id)
                        ? 'border-[#00FF41] bg-[#00FF41]/10'
                        : 'border-[#10B981]/30 bg-[#1A1F26]'
                    } hover:border-[#00FF41]`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{goal.icon}</span>
                      <span className="text-white font-semibold">{goal.label}</span>
                      {goals.includes(goal.id) && (
                        <CheckCircle className="w-5 h-5 text-[#00FF41] ml-auto" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
              <Button
                onClick={() => setStep(3)}
                className="w-full bg-[#00FF41] text-black font-bold hover:bg-[#39FF14]"
                size="lg"
              >
                Continue
              </Button>
            </div>
          )}

          {/* Step 3: Complete */}
          {step === 3 && (
            <div className="text-center py-8">
              <div className="relative mb-6">
                <div className="w-24 h-24 mx-auto bg-[#00FF41]/10 rounded-full animate-pulse"></div>
                <Leaf className="w-16 h-16 text-[#00FF41] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              </div>
              <h2 className="text-4xl font-bold text-white mb-4">All Set! 🎉</h2>
              <p className="text-xl text-gray-300 mb-2">Your dashboard is ready!</p>
              <p className="text-gray-400 mb-8">
                Quick tip: Click any zone on the map to get instant AI analysis
              </p>
              <Button
                onClick={handleComplete}
                className="bg-[#00FF41] text-black font-bold hover:bg-[#39FF14] hover:shadow-[0_0_40px_rgba(0,255,65,0.6)]"
                size="lg"
              >
                Go to Dashboard →
              </Button>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}