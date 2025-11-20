import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Award, Sprout, Droplets, TreeDeciduous, Wheat, Calendar, TrendingUp, Flame } from "lucide-react";
import { toast } from "sonner";

interface BadgeData {
  badge_id: string;
  unlocked_at: string;
}

interface UserStats {
  total_points: number;
  current_streak: number;
  longest_streak: number;
}

const Achievements = () => {
  const { user } = useAuth();
  const [unlockedBadges, setUnlockedBadges] = useState<BadgeData[]>([]);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);

  const allBadges = [
    { 
      id: "soil_guardian",
      icon: Sprout, 
      name: "Soil Guardian", 
      description: "Completed 10 soil tests",
      category: "Activity"
    },
    { 
      id: "reforestation_hero",
      icon: TreeDeciduous, 
      name: "Reforestation Hero", 
      description: "Planted 100 trees",
      category: "Activity"
    },
    { 
      id: "water_warrior",
      icon: Droplets, 
      name: "Water Warrior", 
      description: "Saved 1000L water",
      category: "Activity"
    },
    { 
      id: "crop_champion",
      icon: Wheat, 
      name: "Crop Champion", 
      description: "Improved 5 hectares",
      category: "Activity"
    },
    {
      id: "week_warrior",
      icon: Award,
      name: "Week Warrior",
      description: "7-day activity streak",
      category: "Streak"
    },
    {
      id: "monthly_master",
      icon: Trophy,
      name: "Monthly Master",
      description: "30-day activity streak",
      category: "Streak"
    },
    {
      id: "century_champion",
      icon: Award,
      name: "Century Champion",
      description: "100-day activity streak",
      category: "Streak"
    }
  ];

  useEffect(() => {
    if (user) {
      loadAchievements();
    }
  }, [user]);

  const loadAchievements = async () => {
    try {
      // Load unlocked badges
      const { data: badgesData, error: badgesError } = await supabase
        .from('user_badges')
        .select('*')
        .eq('user_id', user?.id)
        .order('unlocked_at', { ascending: false });

      if (badgesError) throw badgesError;
      setUnlockedBadges(badgesData || []);

      // Load user stats
      const { data: statsData, error: statsError } = await supabase
        .from('user_stats')
        .select('*')
        .eq('user_id', user?.id)
        .maybeSingle();

      if (statsError) throw statsError;
      setStats(statsData);
    } catch (error: any) {
      console.error('Error loading achievements:', error);
      toast.error('Failed to load achievements');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getBadgeDetails = (badgeId: string) => {
    return allBadges.find(b => b.id === badgeId);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/4"></div>
          <div className="h-64 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Achievements
        </h1>
        <p className="text-muted-foreground">
          View your unlocked badges and track your progress
        </p>
      </div>

      {/* Statistics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-primary/10 to-background border-primary/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Trophy className="h-4 w-4 text-primary" />
              Total Points
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">
              {stats?.total_points?.toLocaleString() || 0}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500/10 to-background border-orange-500/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Flame className="h-4 w-4 text-orange-500" />
              Current Streak
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-500">
              {stats?.current_streak || 0} days
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/10 to-background border-purple-500/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-purple-500" />
              Longest Streak
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-500">
              {stats?.longest_streak || 0} days
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Unlocked Badges */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            Unlocked Badges ({unlockedBadges.length})
          </CardTitle>
          <CardDescription>
            Your earned achievements in chronological order
          </CardDescription>
        </CardHeader>
        <CardContent>
          {unlockedBadges.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Trophy className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <p>No badges unlocked yet. Start tracking your activities to earn badges!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {unlockedBadges.map((badge) => {
                const details = getBadgeDetails(badge.badge_id);
                if (!details) return null;
                const Icon = details.icon;

                return (
                  <div
                    key={badge.badge_id}
                    className="flex items-start gap-4 p-4 rounded-lg border border-primary/20 bg-gradient-to-r from-primary/5 to-transparent hover:from-primary/10 transition-all"
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-primary/20 rounded-full animate-pulse" />
                      <div className="relative bg-gradient-to-br from-primary/30 to-primary/10 rounded-full p-3">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-1">
                        <h3 className="font-semibold text-lg text-foreground">
                          {details.name}
                        </h3>
                        <Badge variant="secondary" className="shrink-0">
                          {details.category}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground text-sm mb-2">
                        {details.description}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>Unlocked on {formatDate(badge.unlocked_at)}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* All Available Badges */}
      <Card>
        <CardHeader>
          <CardTitle>All Badges</CardTitle>
          <CardDescription>
            Complete activities and maintain streaks to unlock these badges
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {allBadges.map((badge) => {
              const isUnlocked = unlockedBadges.some(ub => ub.badge_id === badge.id);
              const Icon = badge.icon;

              return (
                <div
                  key={badge.id}
                  className={`p-4 rounded-lg border transition-all ${
                    isUnlocked
                      ? 'border-primary/30 bg-gradient-to-br from-primary/10 to-transparent'
                      : 'border-border bg-muted/50 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-full ${
                      isUnlocked ? 'bg-primary/20' : 'bg-muted'
                    }`}>
                      <Icon className={`h-6 w-6 ${
                        isUnlocked ? 'text-primary' : 'text-muted-foreground'
                      }`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold truncate">{badge.name}</h4>
                      <Badge variant={isUnlocked ? "default" : "secondary"} className="text-xs">
                        {badge.category}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{badge.description}</p>
                  {isUnlocked && (
                    <div className="mt-2 text-xs text-primary font-medium">
                      ✓ Unlocked
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Achievements;
