import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, CheckCheck, Trash2, AlertTriangle, TrendingUp, Leaf } from "lucide-react";

const Notifications = () => {
  const notifications = [
    {
      id: 1,
      type: "alert",
      title: "High Risk Zone Detected",
      message: "Zone A3 shows signs of severe soil erosion",
      time: "5 minutes ago",
      unread: true,
      icon: AlertTriangle,
      color: "text-status-risk"
    },
    {
      id: 2,
      type: "success",
      title: "Badge Unlocked!",
      message: "You earned the 'Soil Guardian' badge",
      time: "2 hours ago",
      unread: true,
      icon: Leaf,
      color: "text-status-healthy"
    },
    {
      id: 3,
      type: "info",
      title: "Health Score Improved",
      message: "Your land health score increased by 8%",
      time: "1 day ago",
      unread: true,
      icon: TrendingUp,
      color: "text-primary"
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-2">
              <Bell className="h-8 w-8 text-primary" />
              Notifications
            </h1>
            <p className="text-muted-foreground mt-1">
              You have {notifications.filter(n => n.unread).length} unread notifications
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <CheckCheck className="h-4 w-4 mr-2" />
              Mark All Read
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          {notifications.map((notification) => (
            <Card 
              key={notification.id} 
              className={`transition-all hover:shadow-glow-lg hover:border-primary/50 ${
                notification.unread ? 'border-primary/30 bg-primary/5' : ''
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg bg-background ${notification.color}`}>
                    <notification.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold">{notification.title}</h3>
                      {notification.unread && (
                        <Badge variant="default" className="bg-primary text-black">New</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{notification.message}</p>
                    <p className="text-xs text-muted-foreground">{notification.time}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="hover:text-status-risk">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications;