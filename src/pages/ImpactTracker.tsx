import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Trophy, TrendingUp, Award, Sprout, Droplets, TreeDeciduous, Wheat } from "lucide-react";
import { toast } from "sonner";

const ImpactTracker = () => {
  const [points, setPoints] = useState(2450);
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

  const leaderboard = [
    { rank: 1, name: "Sarah Green", points: 5240, badge: "🏆" },
    { rank: 2, name: "Michael Forest", points: 4890, badge: "🥈" },
    { rank: 3, name: "Emma Earth", points: 3670, badge: "🥉" },
    { rank: 4, name: "You (Earth Guardian)", points: 2450, badge: "⭐", isCurrentUser: true },
    { rank: 5, name: "David Plant", points: 2110, badge: "" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activityType || !quantity) {
      toast.error("Please fill in all required fields");
      return;
    }

    const pointsEarned = parseInt(quantity) * 10;
    setPoints(points + pointsEarned);
    setActivities([
      { type: activityType, quantity: parseInt(quantity), date: "Just now" },
      ...activities,
    ]);

    toast.success(`+${pointsEarned} Eco Points earned! 🌱`);
    
    // Reset form
    setActivityType("");
    setQuantity("");
    setLocation("");
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
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

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Eco Points</span>
                <span className="font-bold text-2xl text-primary">{points}</span>
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
              <div className="space-y-2">
                {leaderboard.map((user) => (
                  <div
                    key={user.rank}
                    className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                      user.isCurrentUser
                        ? "bg-primary/10 border border-primary/30"
                        : "bg-muted/30 hover:bg-muted/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl w-8 text-center">{user.badge || user.rank}</span>
                      <div>
                        <p className={`font-medium ${user.isCurrentUser ? "text-primary" : ""}`}>
                          {user.name}
                        </p>
                      </div>
                    </div>
                    <Badge variant={user.isCurrentUser ? "default" : "outline"}>
                      {user.points.toLocaleString()} pts
                    </Badge>
                  </div>
                ))}
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
                className={`${
                  badge.earned
                    ? "border-primary/50 bg-primary/5"
                    : "border-border opacity-60"
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
              <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
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
