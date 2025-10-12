import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { User, Mail, MapPin, Edit3, Save, X } from 'lucide-react';
import { toast } from 'sonner';

export default function Profile() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    full_name: '',
    user_type: '',
    location: '',
    farm_size: '',
    bio: ''
  });

  useEffect(() => {
    if (user) {
      loadProfile();
    }
  }, [user]);

  const loadProfile = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) {
      console.error('Error loading profile:', error);
    } else if (data) {
      setProfile({
        full_name: data.full_name || '',
        user_type: data.user_type || '',
        location: data.location || '',
        farm_size: data.farm_size?.toString() || '',
        bio: data.bio || ''
      });
    }
  };

  const handleSave = async () => {
    if (!user) return;

    setLoading(true);
    const { error } = await supabase
      .from('profiles')
      .update({
        full_name: profile.full_name,
        user_type: profile.user_type,
        location: profile.location,
        farm_size: profile.farm_size ? parseFloat(profile.farm_size) : null,
        bio: profile.bio
      })
      .eq('id', user.id);

    setLoading(false);

    if (error) {
      toast.error('Failed to update profile');
    } else {
      toast.success('Profile updated successfully!');
      setEditing(false);
    }
  };

  return (
    <div className="min-h-screen bg-black py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-[#0F1419] border border-[#10B981]/30 rounded-2xl p-8 shadow-[0_0_40px_rgba(0,255,65,0.1)]">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-white">Profile Settings</h1>
            {!editing ? (
              <Button
                onClick={() => setEditing(true)}
                variant="outline"
                className="border-[#00FF41] text-[#00FF41] hover:bg-[#00FF41] hover:text-black"
              >
                <Edit3 className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button
                  onClick={handleSave}
                  disabled={loading}
                  className="bg-[#00FF41] text-black hover:bg-[#39FF14]"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </Button>
                <Button
                  onClick={() => {
                    setEditing(false);
                    loadProfile();
                  }}
                  variant="outline"
                  className="border-[#10B981]/50 text-gray-400"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </div>
            )}
          </div>

          {/* Avatar Section */}
          <div className="flex items-center gap-6 mb-8 pb-8 border-b border-[#10B981]/20">
            <div className="w-24 h-24 bg-gradient-to-br from-[#00FF41] to-[#10B981] rounded-full flex items-center justify-center text-4xl font-bold text-black">
              {profile.full_name?.charAt(0) || 'U'}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">{profile.full_name || 'User'}</h2>
              <p className="text-gray-400">{user?.email}</p>
              {profile.user_type && (
                <span className="inline-block mt-2 px-3 py-1 bg-[#00FF41]/10 border border-[#00FF41] rounded-full text-[#00FF41] text-sm font-semibold">
                  {profile.user_type}
                </span>
              )}
            </div>
          </div>

          {/* Profile Form */}
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Full Name</label>
                <Input
                  value={profile.full_name}
                  onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                  disabled={!editing}
                  className="bg-[#1A1F26] border-[#10B981]/50 text-white disabled:opacity-50"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-2 block">Email</label>
                <Input
                  value={user?.email || ''}
                  disabled
                  className="bg-[#1A1F26] border-[#10B981]/50 text-white opacity-50"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-2 block">User Type</label>
                <select
                  value={profile.user_type}
                  onChange={(e) => setProfile({ ...profile, user_type: e.target.value })}
                  disabled={!editing}
                  className="w-full bg-[#1A1F26] border border-[#10B981]/50 text-white rounded-md px-3 py-2 disabled:opacity-50"
                >
                  <option value="">Select type</option>
                  <option value="farmer">Farmer</option>
                  <option value="ngo">NGO</option>
                  <option value="researcher">Researcher</option>
                  <option value="government">Government</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-2 block">Location</label>
                <Input
                  value={profile.location}
                  onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                  disabled={!editing}
                  placeholder="Nigeria"
                  className="bg-[#1A1F26] border-[#10B981]/50 text-white disabled:opacity-50"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-2 block">Farm/Project Size (hectares)</label>
                <Input
                  type="number"
                  value={profile.farm_size}
                  onChange={(e) => setProfile({ ...profile, farm_size: e.target.value })}
                  disabled={!editing}
                  placeholder="42.5"
                  className="bg-[#1A1F26] border-[#10B981]/50 text-white disabled:opacity-50"
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-400 mb-2 block">Bio</label>
              <Textarea
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                disabled={!editing}
                placeholder="Tell us about yourself and your land restoration goals..."
                rows={4}
                className="bg-[#1A1F26] border-[#10B981]/50 text-white disabled:opacity-50"
              />
            </div>
          </div>

          {/* Account Stats */}
          <div className="mt-8 pt-8 border-t border-[#10B981]/20">
            <h3 className="text-xl font-bold text-white mb-4">Account Stats</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-[#1A1F26] border border-[#10B981]/20 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-[#00FF41] mb-1">0</p>
                <p className="text-xs text-gray-400">Regions Saved</p>
              </div>
              <div className="bg-[#1A1F26] border border-[#10B981]/20 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-[#00FF41] mb-1">0</p>
                <p className="text-xs text-gray-400">Data Uploads</p>
              </div>
              <div className="bg-[#1A1F26] border border-[#10B981]/20 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-[#00FF41] mb-1">0</p>
                <p className="text-xs text-gray-400">Eco-Points</p>
              </div>
              <div className="bg-[#1A1F26] border border-[#10B981]/20 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-[#00FF41] mb-1">0</p>
                <p className="text-xs text-gray-400">Day Streak</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}