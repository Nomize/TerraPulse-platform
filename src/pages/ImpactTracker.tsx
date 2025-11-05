import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Trophy, TrendingUp, Award, Sprout, Droplets, TreeDeciduous, Wheat } from "lucide-react";
import { toast } from "sonner";
import { PointsAnimation } from "@/components/PointsAnimation";
import { BadgeUnlockModal } from "@/components/BadgeUnlockModal";

const ImpactTracker = () => {
  const { user } = useAuth();
  const [points, setPoints] = useState(2450);
  const [showPointsAnim, setShowPointsAnim] = useState(false);
  const [earnedPoints, setEarnedPoints] = useState(0);
  const [displayPoints, setDisplayPoints] = useState(2450);
  const [previousRank, setPreviousRank] = useState(4);
  const [badgeModal, setBadgeModal] = useState<{ open: boolean; badge: any }>({ 
    open: false, 
    badge: null 
  });
  const [activities, setActivities] = useState<Array<{ type: string; quantity: number; date: string }>>([
    { type: "Tree Planting", quantity: 50, date: "2 days ago" },
    { type: "Soil Testing", quantity: 5, date: "1 week ago" },
  ]);

  const [activityType, setActivityType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [location, setLocation] = useState("");

  const level = Math.floor(points / 500) + 1;
  const levelProgress = ((points % 500) / 500) * 100;
  const nextLevelPoints = (level * 500) - points;

  const badges = [
    { 
      icon: Sprout, 
      name: "Soil Guardian", 
      description: "Completed 10 soil tests", 
      earned: true,
      progress: 100 
    },
    { 
      icon: TreeDeciduous, 
      name: "Reforestation Hero", 
      description: "Planted 100 trees", 
      earned: true,
      progress: 100 
    },
    { 
      icon: Droplets, 
      name: "Water Warrior", 
      description: "Saved 1000L water", 
      earned: false,
      progress: 65 
    },
    { 
      icon: Wheat, 
      name: "Crop Champion", 
      description: "Improved 5 hectares", 
      earned: false,
      progress: 40 
    },
  ];

  const [leaderboard, setLeaderboard] = useState([
    { rank: 1, name: "Sarah Green", points: 5240, badge: "🏆" },
    { rank: 2, name: "Michael Forest", points: 4890, badge: "🥈" },
    { rank: 3, name: "Emma Earth", points: 3670, badge: "🥉" },
    { rank: 4, name: "You (Earth Guardian)", points: displayPoints, badge: "⭐", isCurrentUser: true },
    { rank: 5, name: "David Plant", points: 2110, badge: "" },
  ]);

  useEffect(() => {
    // Update leaderboard when points change
    setLeaderboard(prev => {
      const updated = prev.map(user => 
        user.isCurrentUser ? { ...user, points: displayPoints } : user
      );
      return updated.sort((a, b) => b.points - a.points).map((user, idx) => ({
        ...user,
        rank: idx + 1,
        badge: idx === 0 ? "🏆" : idx === 1 ? "🥈" : idx === 2 ? "🥉" : user.isCurrentUser ? "⭐" : ""
      }));
    });
  }, [displayPoints]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activityType || !quantity) {
      toast.error("Please fill in all required fields");
      return;
    }

    const currentRank = leaderboard.find(u => u.isCurrentUser)?.rank || 4;
    setPreviousRank(currentRank);

    const pointsEarned = parseInt(quantity) * 10;
    const newTotal = points + pointsEarned;
    
    // Save to database if user is logged in
    if (user) {
      try {
        await supabase.from('activities').insert({
          user_id: user.id,
          activity_type: activityType,
          quantity: parseInt(quantity),
          location: location || null,
          points_earned: pointsEarned,
          details: `Logged ${quantity}x ${activityType}`
        });
      } catch (error) {
        console.error('Error saving activity:', error);
      }
    }
    
    // Show points animation
    setEarnedPoints(pointsEarned);
    setShowPointsAnim(true);
    
    // Animate counter
    const duration = 1000;
    const steps = 30;
    const increment = pointsEarned / steps;
    let currentStep = 0;
    
    const interval = setInterval(() => {
      currentStep++;
      if (currentStep <= steps) {
        setDisplayPoints(Math.floor(points + (increment * currentStep)));
      } else {
        setDisplayPoints(newTotal);
        clearInterval(interval);
      }
    }, duration / steps);

    setPoints((prev) => prev + pointsEarned);
    setActivities([
      { type: activityType, quantity: parseInt(quantity), date: "Just now" },
      ...activities,
    ]);

    toast.success(`+${pointsEarned} Eco Points earned! 🌱`);
    
    // Badge awarding logic based on activity type
    const qty = parseInt(quantity);
    let badgeToUnlock = null;
    
    if (activityType === "Tree Planting" && qty >= 50) {
      badgeToUnlock = {
        icon: TreeDeciduous,
        name: "Forest Builder",
        description: "Planted 50+ trees"
      };
    } else if (activityType === "Soil Testing" && qty >= 10) {
      badgeToUnlock = {
        icon: Sprout,
        name: "Soil Guardian",
        description: "Completed 10+ soil tests"
      };
    } else if (activityType === "Water Conservation" && qty >= 1000) {
      badgeToUnlock = {
        icon: Droplets,
        name: "Water Warrior",
        description: "Saved 1000L+ water"
      };
    } else if (activityType === "Composting" && qty >= 20) {
      badgeToUnlock = {
        icon: Wheat,
        name: "Green Recycler",
        description: "Composted 20+ times"
      };
    }
    
    if (badgeToUnlock) {
      setTimeout(() => {
        setBadgeModal({
          open: true,
          badge: badgeToUnlock
        });
      }, 1500);
    }
    
    // Reset form
    setActivityType("");
    setQuantity("");
    setLocation("");
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Points Animation */}
      <PointsAnimation 
        value={earnedPoints}
        show={showPointsAnim}
        onComplete={() => setShowPointsAnim(false)}
      />

      {/* Badge Unlock Modal */}
      {badgeModal.badge && (
        <BadgeUnlockModal
          open={badgeModal.open}
          onClose={() => setBadgeModal({ open: false, badge: null })}
          badge={badgeModal.badge}
        />
      )}
      {/* Header */}
      <div className="text-center space-y-3">
        <h1 className="text-3xl md:text-4xl font-bold flex items-center justify-center gap-2">
          <Trophy className="h-8 w-8 text-primary" />
          Eco Impact Tracker
        </h1>
        <p className="text-muted-foreground">
          Track your environmental impact and earn rewards
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Profile Card */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Your Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center space-y-3">
              <Avatar className="h-24 w-24">
                <AvatarFallback className="gradient-hero text-2xl font-bold text-primary-foreground">
                  EG
                </AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h3 className="font-semibold text-lg">Earth Guardian</h3>
                <Badge className="mt-1">Level {level} - Forest Protector</Badge>
              </div>
            </div>

              <div className="space-y-2 relative">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Eco Points</span>
                  <span className="font-bold text-2xl text-primary transition-all duration-300 drop-shadow-[0_0_10px_rgba(0,255,65,0.5)]">
                    {displayPoints}
                  </span>
                </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Level {level}</span>
                  <span>{nextLevelPoints} to Level {level + 1}</span>
                </div>
                <Progress value={levelProgress} className="h-2" />
              </div>
            </div>

            <div className="pt-4 border-t border-border space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Activities</span>
                <span className="font-semibold">{activities.length + 12}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Badges Earned</span>
                <span className="font-semibold">{badges.filter(b => b.earned).length}/{badges.length}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Activity Logger & Leaderboard */}
        <div className="lg:col-span-2 space-y-6">
          {/* Activity Logger */}
          <Card>
            <CardHeader>
              <CardTitle>Log Activity</CardTitle>
              <CardDescription>Record your environmental actions and earn points</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="activityType">Activity Type *</Label>
                    <select
                      id="activityType"
                      value={activityType}
                      onChange={(e) => setActivityType(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                    >
                      <option value="">Select activity...</option>
                      <option value="Tree Planting">Tree Planting</option>
                      <option value="Composting">Composting</option>
                      <option value="Water Conservation">Water Conservation</option>
                      <option value="Soil Testing">Soil Testing</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity *</Label>
                    <Input
                      id="quantity"
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      placeholder="e.g., 10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g., Lagos, Nigeria"
                  />
                </div>
                <Button type="submit" className="w-full">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Log Activity & Earn Points
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Leaderboard */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-primary" />
                Top 10 Leaderboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 relative">
                {leaderboard.map((user, index) => {
                  const isCurrentUser = user.isCurrentUser;
                  const rankChange = isCurrentUser && previousRank > user.rank ? previousRank - user.rank : 0;
                  
                  return (
                    <div
                      key={user.rank}
                      className={`flex items-center justify-between p-3 rounded-lg transition-all duration-500 ${
                        isCurrentUser
                          ? "bg-primary/10 border-2 border-primary/50 shadow-[0_0_20px_rgba(0,255,65,0.3)]"
                          : "bg-muted/30 hover:bg-muted/50"
                      } ${isCurrentUser && rankChange > 0 ? 'animate-pulse' : ''}`}
                      style={{
                        order: user.rank,
                        transition: 'all 0.5s ease-in-out',
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl w-8 text-center">{user.badge || user.rank}</span>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className={`font-medium ${isCurrentUser ? "text-primary font-bold" : ""}`}>
                              {user.name}
                            </p>
                            {isCurrentUser && rankChange > 0 && (
                              <Badge className="bg-primary text-black animate-bounce">
                                ↑ +{rankChange}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <Badge variant={isCurrentUser ? "default" : "outline"} className={isCurrentUser ? "animate-pulse" : ""}>
                        {user.points.toLocaleString()} pts
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Badges Collection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            Your Badges
          </CardTitle>
          <CardDescription>Unlock achievements by completing challenges</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {badges.map((badge, index) => (
              <Card
                key={index}
                className={`transition-all duration-300 hover:scale-105 ${
                  badge.earned
                    ? "border-primary/50 bg-primary/5 shadow-[0_0_20px_rgba(0,255,65,0.3)]"
                    : "border-border opacity-60 grayscale"
                }`}
              >
                <CardContent className="p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <badge.icon className={`h-10 w-10 ${
                      badge.earned ? "text-primary" : "text-muted-foreground"
                    }`} />
                    {badge.earned && (
                      <Badge variant="default" className="gradient-hero">Earned</Badge>
                    )}
                  </div>
                  <div>
                    <h4 className="font-semibold">{badge.name}</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      {badge.description}
                    </p>
                  </div>
                  {!badge.earned && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{badge.progress}%</span>
                      </div>
                      <Progress value={badge.progress} className="h-1.5" />
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activities Feed */}
      <Card>
        <CardHeader>
          <CardTitle>Community Feed</CardTitle>
          <CardDescription>Recent activities from the community</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {activities.map((activity, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between p-3 bg-muted/30 rounded-lg animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center gap-3">
                  <div className="gradient-hero p-2 rounded-lg">
                    <TrendingUp className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">
                      You logged {activity.quantity}x {activity.type}
                    </p>
                    <p className="text-xs text-muted-foreground">{activity.date}</p>
                  </div>
                </div>
                <Badge variant="outline">+{activity.quantity * 10} pts</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ImpactTracker;
