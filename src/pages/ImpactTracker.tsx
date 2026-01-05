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
import { Trophy, TrendingUp, Award, Sprout, Droplets, TreeDeciduous, Wheat, Recycle, Database, Flame } from "lucide-react";
import { toast } from "sonner";
import { PointsAnimation } from "@/components/PointsAnimation";
import { BadgeUnlockModal } from "@/components/BadgeUnlockModal";
import { motion, AnimatePresence } from "framer-motion";

const ImpactTracker = () => {
  const { user } = useAuth();
  const [points, setPoints] = useState(0);
  const [showPointsAnim, setShowPointsAnim] = useState(false);
  const [earnedPoints, setEarnedPoints] = useState(0);
  const [displayPoints, setDisplayPoints] = useState(0);
  const [previousRank, setPreviousRank] = useState(4);
  const [rankChange, setRankChange] = useState(0);
  const [showRankGlow, setShowRankGlow] = useState(false);
  const [badgeModal, setBadgeModal] = useState<{ open: boolean; badge: any }>({ 
    open: false, 
    badge: null 
  });
  const [activities, setActivities] = useState<Array<{ type: string; quantity: number; date: string; timestamp?: Date }>>([]);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [unlockedBadges, setUnlockedBadges] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [activityCounts, setActivityCounts] = useState<Record<string, number>>({});

  const [activityType, setActivityType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [location, setLocation] = useState("");

  const level = Math.floor(points / 500) + 1;
  const levelProgress = ((points % 500) / 500) * 100;
  const nextLevelPoints = (level * 500) - points;

  // Badge definitions with correct thresholds
  const badges = [
    { 
      id: "forest_builder",
      icon: TreeDeciduous, 
      name: "Forest Builder", 
      emoji: "🌳",
      description: "Plant 50+ trees", 
      earned: unlockedBadges.includes("forest_builder"),
      progress: Math.min(100, ((activityCounts["Tree Planting"] || 0) / 50) * 100),
      type: "activity",
      activityType: "Tree Planting",
      threshold: 50
    },
    { 
      id: "soil_guardian",
      icon: Sprout, 
      name: "Soil Guardian", 
      emoji: "🌿",
      description: "Complete 10+ soil tests", 
      earned: unlockedBadges.includes("soil_guardian"),
      progress: Math.min(100, ((activityCounts["Soil Testing"] || 0) / 10) * 100),
      type: "activity",
      activityType: "Soil Testing",
      threshold: 10
    },
    { 
      id: "water_warrior",
      icon: Droplets, 
      name: "Water Warrior", 
      emoji: "💧",
      description: "Conserve 1000L+ water", 
      earned: unlockedBadges.includes("water_warrior"),
      progress: Math.min(100, ((activityCounts["Water Conservation"] || 0) / 1000) * 100),
      type: "activity",
      activityType: "Water Conservation",
      threshold: 1000
    },
    { 
      id: "green_recycler",
      icon: Recycle, 
      name: "Green Recycler", 
      emoji: "♻️",
      description: "Complete 20+ composting sessions", 
      earned: unlockedBadges.includes("green_recycler"),
      progress: Math.min(100, ((activityCounts["Composting"] || 0) / 20) * 100),
      type: "activity",
      activityType: "Composting",
      threshold: 20
    },
    { 
      id: "data_champion",
      icon: Database, 
      name: "Data Champion", 
      emoji: "📊",
      description: "Upload 10+ data sets", 
      earned: unlockedBadges.includes("data_champion"),
      progress: Math.min(100, ((activityCounts["Data Upload"] || 0) / 10) * 100),
      type: "activity",
      activityType: "Data Upload",
      threshold: 10
    },
    {
      id: "consistency_king",
      icon: Flame,
      name: "Consistency King",
      emoji: "🔥",
      description: "7-day activity streak",
      earned: unlockedBadges.includes("consistency_king"),
      progress: Math.min(100, (currentStreak / 7) * 100),
      type: "streak",
      threshold: 7
    },
    {
      id: "monthly_master",
      icon: Trophy,
      name: "Monthly Master",
      emoji: "👑",
      description: "30-day activity streak",
      earned: unlockedBadges.includes("monthly_master"),
      progress: Math.min(100, (currentStreak / 30) * 100),
      type: "streak",
      threshold: 30
    },
  ];

  const [leaderboard, setLeaderboard] = useState([
    { id: "1", rank: 1, name: "Sarah Green", points: 5240, badge: "🏆", isCurrentUser: false },
    { id: "2", rank: 2, name: "Michael Forest", points: 4890, badge: "🥈", isCurrentUser: false },
    { id: "3", rank: 3, name: "Emma Earth", points: 3670, badge: "🥉", isCurrentUser: false },
    { id: "user", rank: 4, name: "You (Earth Guardian)", points: 0, badge: "⭐", isCurrentUser: true },
    { id: "5", rank: 5, name: "David Plant", points: 2110, badge: "", isCurrentUser: false },
  ]);

  // Load user data from database
  useEffect(() => {
    const loadUserData = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        // Load user stats
        const { data: stats, error: statsError } = await supabase
          .from('user_stats')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();

        if (statsError) throw statsError;

        if (stats) {
          setPoints(stats.total_points);
          setDisplayPoints(stats.total_points);
          setCurrentStreak(stats.current_streak);
        } else {
          // Create initial stats record
          await supabase.from('user_stats').insert({
            user_id: user.id,
            current_streak: 0,
            longest_streak: 0,
            total_points: 0
          });
        }

        // Load badges
        const { data: badgesData, error: badgesError } = await supabase
          .from('user_badges')
          .select('badge_id')
          .eq('user_id', user.id);

        if (badgesError) throw badgesError;

        if (badgesData) {
          setUnlockedBadges(badgesData.map(b => b.badge_id));
        }

        // Load activities and calculate totals per type
        const { data: activitiesData, error: activitiesError } = await supabase
          .from('activities')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (activitiesError) throw activitiesError;

        if (activitiesData) {
          const formattedActivities = activitiesData.slice(0, 10).map(a => ({
            type: a.activity_type,
            quantity: a.quantity,
            date: new Date(a.created_at).toLocaleDateString(),
            timestamp: new Date(a.created_at)
          }));
          setActivities(formattedActivities);
          
          // Calculate totals per activity type
          const counts: Record<string, number> = {};
          activitiesData.forEach(a => {
            counts[a.activity_type] = (counts[a.activity_type] || 0) + a.quantity;
          });
          setActivityCounts(counts);
          
          // Recalculate streak from activities
          const streak = calculateStreak(formattedActivities);
          setCurrentStreak(streak);
        }
      } catch (error) {
        console.error('Error loading user data:', error);
        toast.error('Failed to load your data');
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [user]);

  // Update leaderboard when points change with rank tracking
  useEffect(() => {
    setLeaderboard(prev => {
      // Get current user rank before update
      const oldUserRank = prev.find(u => u.isCurrentUser)?.rank || 4;
      
      const updated = prev.map(u => 
        u.isCurrentUser ? { ...u, points: displayPoints } : u
      );
      
      const sorted = updated.sort((a, b) => b.points - a.points).map((u, idx) => ({
        ...u,
        rank: idx + 1,
        badge: idx === 0 ? "🏆" : idx === 1 ? "🥈" : idx === 2 ? "🥉" : u.isCurrentUser ? "⭐" : ""
      }));
      
      // Calculate rank change
      const newUserRank = sorted.find(u => u.isCurrentUser)?.rank || 4;
      if (oldUserRank !== newUserRank && oldUserRank > newUserRank) {
        setRankChange(oldUserRank - newUserRank);
        setShowRankGlow(true);
        setTimeout(() => {
          setRankChange(0);
          setShowRankGlow(false);
        }, 3000);
      }
      
      return sorted;
    });
  }, [displayPoints]);

  // Calculate streak from activities
  const calculateStreak = (activitiesList: Array<{ timestamp?: Date }>) => {
    if (activitiesList.length === 0) return 0;
    
    const sortedDates = activitiesList
      .filter(a => a.timestamp)
      .map(a => {
        const date = new Date(a.timestamp!);
        date.setHours(0, 0, 0, 0);
        return date.getTime();
      })
      .sort((a, b) => b - a);
    
    if (sortedDates.length === 0) return 0;
    
    let streak = 1;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayTime = today.getTime();
    
    // Check if most recent activity was today or yesterday
    const daysDiff = Math.floor((todayTime - sortedDates[0]) / (24 * 60 * 60 * 1000));
    if (daysDiff > 1) return 0; // Streak broken
    
    // Count consecutive days
    for (let i = 0; i < sortedDates.length - 1; i++) {
      const diff = Math.floor((sortedDates[i] - sortedDates[i + 1]) / (24 * 60 * 60 * 1000));
      if (diff === 1) {
        streak++;
      } else if (diff > 1) {
        break;
      }
    }
    
    return streak;
  };

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
    const qty = parseInt(quantity);
    
    // Update activity counts
    const newCounts = { ...activityCounts };
    newCounts[activityType] = (newCounts[activityType] || 0) + qty;
    setActivityCounts(newCounts);
    
    // Save to database if user is logged in
    if (user) {
      try {
        // Insert activity
        await supabase.from('activities').insert({
          user_id: user.id,
          activity_type: activityType,
          quantity: qty,
          location: location || null,
          points_earned: pointsEarned,
          details: `Logged ${qty}x ${activityType}`
        });

        // Update user stats
        const today = new Date().toISOString().split('T')[0];
        
        const { data: currentStats } = await supabase
          .from('user_stats')
          .select('*')
          .eq('user_id', user.id)
          .single();

        const lastActivityDate = currentStats?.last_activity_date;
        let newStreak = 1;

        if (lastActivityDate) {
          const lastDate = new Date(lastActivityDate);
          const todayDate = new Date(today);
          const diffDays = Math.floor((todayDate.getTime() - lastDate.getTime()) / (24 * 60 * 60 * 1000));

          if (diffDays === 0) {
            // Same day, maintain streak
            newStreak = currentStats.current_streak;
          } else if (diffDays === 1) {
            // Consecutive day, increment streak
            newStreak = currentStats.current_streak + 1;
          }
        }

        await supabase
          .from('user_stats')
          .update({
            total_points: newTotal,
            current_streak: newStreak,
            longest_streak: Math.max(newStreak, currentStats?.longest_streak || 0),
            last_activity_date: today
          })
          .eq('user_id', user.id);

        setCurrentStreak(newStreak);
      } catch (error) {
        console.error('Error saving activity:', error);
        toast.error('Failed to save activity');
        return;
      }
    }
    
    // Show points animation
    setEarnedPoints(pointsEarned);
    setShowPointsAnim(true);
    
    // Animate counter with green glow effect
    const duration = 1500;
    const steps = 40;
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

    setPoints(newTotal);
    
    const newActivity = { 
      type: activityType, 
      quantity: qty, 
      date: "Just now",
      timestamp: new Date()
    };
    
    const updatedActivities = [newActivity, ...activities];
    setActivities(updatedActivities);
    
    // Calculate new streak
    const newStreak = calculateStreak(updatedActivities);
    const oldStreak = currentStreak;
    setCurrentStreak(newStreak);

    toast.success(`+${pointsEarned} Eco Points earned! 🌱`);
    
    // Check for badges based on activity type
    let badgeToUnlock = null;
    let badgeId = null;
    
    // Check streak badges first
    if (newStreak >= 7 && oldStreak < 7 && !unlockedBadges.includes("consistency_king")) {
      badgeToUnlock = {
        icon: Flame,
        name: "Consistency King",
        emoji: "🔥",
        description: "Completed 7-day streak!"
      };
      badgeId = "consistency_king";
    } else if (newStreak >= 30 && oldStreak < 30 && !unlockedBadges.includes("monthly_master")) {
      badgeToUnlock = {
        icon: Trophy,
        name: "Monthly Master",
        emoji: "👑",
        description: "Completed 30-day streak!"
      };
      badgeId = "monthly_master";
    }
    
    // Check activity-based badges if no streak badge
    if (!badgeToUnlock) {
      const totalForType = newCounts[activityType] || 0;
      
      switch (activityType) {
        case "Tree Planting":
          if (totalForType >= 50 && !unlockedBadges.includes("forest_builder")) {
            badgeToUnlock = {
              icon: TreeDeciduous,
              name: "Forest Builder",
              emoji: "🌳",
              description: "Planted 50+ trees!"
            };
            badgeId = "forest_builder";
          }
          break;
        case "Soil Testing":
          if (totalForType >= 10 && !unlockedBadges.includes("soil_guardian")) {
            badgeToUnlock = {
              icon: Sprout,
              name: "Soil Guardian",
              emoji: "🌿",
              description: "Completed 10+ soil tests!"
            };
            badgeId = "soil_guardian";
          }
          break;
        case "Water Conservation":
          if (totalForType >= 1000 && !unlockedBadges.includes("water_warrior")) {
            badgeToUnlock = {
              icon: Droplets,
              name: "Water Warrior",
              emoji: "💧",
              description: "Conserved 1000L+ water!"
            };
            badgeId = "water_warrior";
          }
          break;
        case "Composting":
          if (totalForType >= 20 && !unlockedBadges.includes("green_recycler")) {
            badgeToUnlock = {
              icon: Recycle,
              name: "Green Recycler",
              emoji: "♻️",
              description: "Completed 20+ composting sessions!"
            };
            badgeId = "green_recycler";
          }
          break;
        case "Data Upload":
          if (totalForType >= 10 && !unlockedBadges.includes("data_champion")) {
            badgeToUnlock = {
              icon: Database,
              name: "Data Champion",
              emoji: "📊",
              description: "Uploaded 10+ data sets!"
            };
            badgeId = "data_champion";
          }
          break;
      }
    }
    
    if (badgeToUnlock && badgeId && user) {
      // Save badge to database
      try {
        await supabase.from('user_badges').insert({
          user_id: user.id,
          badge_id: badgeId
        });
        setUnlockedBadges(prev => [...prev, badgeId]);
      } catch (error) {
        console.error('Error saving badge:', error);
      }

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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading your impact data...</p>
        </div>
      </div>
    );
  }

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
                <motion.span 
                  className="font-bold text-2xl text-primary transition-all duration-300"
                  animate={{
                    textShadow: showPointsAnim ? "0 0 20px rgba(0,255,65,0.8)" : "0 0 10px rgba(0,255,65,0.5)"
                  }}
                >
                  {displayPoints.toLocaleString()}
                </motion.span>
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
                <span className="text-muted-foreground">Current Streak</span>
                <span className="font-semibold flex items-center gap-1">
                  🔥 {currentStreak} {currentStreak === 1 ? 'day' : 'days'}
                </span>
              </div>
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
                      <option value="Tree Planting">🌳 Tree Planting</option>
                      <option value="Soil Testing">🌿 Soil Testing</option>
                      <option value="Water Conservation">💧 Water Conservation</option>
                      <option value="Composting">♻️ Composting</option>
                      <option value="Data Upload">📊 Data Upload</option>
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

          {/* Leaderboard with animations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-primary" />
                Top 5 Leaderboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <AnimatePresence mode="popLayout">
                  {leaderboard.map((user) => {
                    const isCurrentUser = user.isCurrentUser;
                    
                    return (
                      <motion.div
                        key={user.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ 
                          opacity: 1, 
                          y: 0,
                          boxShadow: isCurrentUser && showRankGlow 
                            ? "0 0 30px rgba(0,255,65,0.5)" 
                            : "none"
                        }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ 
                          layout: { type: "spring", damping: 20, stiffness: 300 },
                          duration: 0.5 
                        }}
                        className={`flex items-center justify-between p-3 rounded-lg ${
                          isCurrentUser
                            ? "bg-primary/10 border-2 border-primary/50"
                            : "bg-muted/30 hover:bg-muted/50"
                        } ${isCurrentUser && showRankGlow ? 'animate-pulse' : ''}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl w-8 text-center">{user.badge || user.rank}</span>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className={`font-medium ${isCurrentUser ? "text-primary font-bold" : ""}`}>
                                {user.name}
                              </p>
                              {isCurrentUser && rankChange > 0 && (
                                <motion.div
                                  initial={{ scale: 0, y: 10 }}
                                  animate={{ scale: 1, y: 0 }}
                                  className="flex items-center"
                                >
                                  <Badge className="bg-primary text-black">
                                    ↑ +{rankChange}
                                  </Badge>
                                </motion.div>
                              )}
                            </div>
                          </div>
                        </div>
                        <motion.div
                          animate={{
                            scale: isCurrentUser && showPointsAnim ? [1, 1.1, 1] : 1
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <Badge 
                            variant={isCurrentUser ? "default" : "outline"}
                            className={isCurrentUser && showPointsAnim ? "shadow-[0_0_10px_rgba(0,255,65,0.5)]" : ""}
                          >
                            {user.points.toLocaleString()} pts
                          </Badge>
                        </motion.div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
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
                    <div className="flex items-center gap-2">
                      <badge.icon className={`h-8 w-8 ${
                        badge.earned ? "text-primary" : "text-muted-foreground"
                      }`} />
                      <span className="text-2xl">{badge.emoji}</span>
                    </div>
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
                        <span className="font-medium">{Math.round(badge.progress)}%</span>
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
