import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TreeDeciduous, Droplets, Sprout, Wheat, MapPin, TrendingUp, Activity, Calendar, Edit2, Save } from "lucide-react";
import { toast } from "sonner";

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    full_name: "",
    user_type: "",
    location: "",
    farm_size: "",
    bio: "",
    avatar_url: ""
  });
  const [activities, setActivities] = useState<any[]>([]);
  const [activityFilter, setActivityFilter] = useState("all");
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadProfile();
      loadActivities();
    }
  }, [user]);

  const loadProfile = async () => {
    if (!user) return;

    setLoading(true);
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    setLoading(false);

    if (error) {
      console.error("Error loading profile:", error);
    } else if (data) {
      setProfile({
        full_name: data.full_name || "",
        user_type: data.user_type || "",
        location: data.location || "",
        farm_size: data.farm_size?.toString() || "",
        bio: data.bio || "",
        avatar_url: data.avatar_url || ""
      });
    }
  };

  const loadActivities = async () => {
    if (!user) return;
    
    try {
      let query = supabase
        .from('activities')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(20);

      if (activityFilter === 'week') {
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        query = query.gte('created_at', weekAgo.toISOString());
      } else if (activityFilter === 'month') {
        const monthAgo = new Date();
        monthAgo.setMonth(monthAgo.getMonth() - 1);
        query = query.gte('created_at', monthAgo.toISOString());
      }

      const { data, error } = await query;
      
      if (error) throw error;
      setActivities(data || []);
    } catch (error) {
      console.error('Error loading activities:', error);
    }
  };

  useEffect(() => {
    loadActivities();
  }, [activityFilter, user]);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "Tree Planting": return TreeDeciduous;
      case "Soil Testing": return Sprout;
      case "Water Conservation": return Droplets;
      case "Composting": return Wheat;
      default: return TrendingUp;
    }
  };

  const handleSave = async () => {
    if (!user) return;

    setLoading(true);
    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: profile.full_name,
        user_type: profile.user_type,
        location: profile.location,
        farm_size: profile.farm_size ? parseFloat(profile.farm_size) : null,
        bio: profile.bio,
      })
      .eq("id", user.id);

    setLoading(false);

    if (error) {
      toast.error("Failed to update profile");
      console.error("Error updating profile:", error);
    } else {
      toast.success("Profile updated successfully!");
      setEditing(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl md:text-4xl font-bold">Profile Settings</h1>
        {!editing ? (
          <Button onClick={() => setEditing(true)}>
            <Edit2 className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setEditing(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - Avatar & Basic Info */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Avatar</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <Avatar className="h-32 w-32">
                <AvatarFallback className="text-4xl gradient-hero text-primary-foreground">
                  {profile.full_name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase() || user?.email?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </div>
              <Button variant="outline" className="w-full">
                Change Avatar
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Account Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Activities Logged</span>
                <span className="font-semibold">{activities.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Eco Points</span>
                <span className="font-semibold">{activities.reduce((sum, a) => sum + (a.points_earned || 0), 0)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Badges Earned</span>
                <span className="font-semibold">3/10</span>
              </div>
            </CardContent>
          </Card>

          {/* Activity History Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  Activity History
                </CardTitle>
                <select
                  value={activityFilter}
                  onChange={(e) => setActivityFilter(e.target.value)}
                  className="px-3 py-1 text-sm bg-background border border-border rounded-md"
                >
                  <option value="all">All Time</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                </select>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 max-h-[500px] overflow-y-auto">
              {activities.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No activities logged yet</p>
              ) : (
                activities.map((activity) => {
                  const Icon = getActivityIcon(activity.activity_type);
                  return (
                    <Card 
                      key={activity.id}
                      className="transition-all hover:shadow-lg hover:scale-[1.02] hover:border-primary/50"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3 flex-1">
                            <div className="gradient-hero p-2 rounded-lg shrink-0">
                              <Icon className="h-5 w-5 text-primary-foreground" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <h4 className="font-semibold">{activity.activity_type}</h4>
                              <p className="text-sm text-muted-foreground">
                                {activity.details || `Quantity: ${activity.quantity}`}
                              </p>
                              <div className="flex flex-wrap gap-3 mt-2">
                                {activity.location && (
                                  <div className="flex items-center gap-1">
                                    <MapPin className="h-3 w-3 text-muted-foreground" />
                                    <span className="text-xs text-muted-foreground">{activity.location}</span>
                                  </div>
                                )}
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3 text-muted-foreground" />
                                  <span className="text-xs text-muted-foreground">
                                    {new Date(activity.created_at).toLocaleDateString('en-US', {
                                      month: 'short',
                                      day: 'numeric',
                                      year: 'numeric'
                                    })}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <Badge className="bg-primary/20 text-primary border-primary shrink-0 ml-2">
                            +{activity.points_earned} pts
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Profile Form */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Full Name */}
              <div>
                <Label htmlFor="full_name">Full Name</Label>
                <Input
                  id="full_name"
                  value={profile.full_name}
                  onChange={(e) =>
                    setProfile({ ...profile, full_name: e.target.value })
                  }
                  disabled={!editing}
                />
              </div>

              {/* User Type */}
              <div>
                <Label htmlFor="user_type">User Type</Label>
                <select
                  id="user_type"
                  value={profile.user_type}
                  onChange={(e) =>
                    setProfile({ ...profile, user_type: e.target.value })
                  }
                  disabled={!editing}
                  className="w-full px-3 py-2 rounded-md border border-input bg-background disabled:opacity-50"
                >
                  <option value="">Select type...</option>
                  <option value="farmer">Farmer</option>
                  <option value="ngo">NGO</option>
                  <option value="researcher">Researcher</option>
                  <option value="government">Government</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Location */}
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={profile.location}
                  onChange={(e) =>
                    setProfile({ ...profile, location: e.target.value })
                  }
                  disabled={!editing}
                  placeholder="e.g., Lagos, Nigeria"
                />
              </div>

              {/* Farm Size */}
              <div>
                <Label htmlFor="farm_size">Farm Size (hectares)</Label>
                <Input
                  id="farm_size"
                  type="number"
                  value={profile.farm_size}
                  onChange={(e) =>
                    setProfile({ ...profile, farm_size: e.target.value })
                  }
                  disabled={!editing}
                  placeholder="e.g., 42.5"
                />
              </div>

              {/* Bio */}
              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={profile.bio}
                  onChange={(e) =>
                    setProfile({ ...profile, bio: e.target.value })
                  }
                  disabled={!editing}
                  rows={4}
                  placeholder="Tell us about yourself and your land regeneration goals..."
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
