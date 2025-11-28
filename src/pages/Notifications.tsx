import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Bell, AlertTriangle, Info, CheckCircle, Clock, MoreHorizontal, Package } from "lucide-react";
import { useNotifications } from "@/hooks/useNotifications";

const Notifications = () => {
  const navigate = useNavigate();
  const { data: notifications, isLoading } = useNotifications();
  
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'critical':
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-warning" />;
      case 'success':
        return <CheckCircle className="h-4 w-4 text-success" />;
      default:
        return <Info className="h-4 w-4 text-primary" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'critical':
        return 'border-l-destructive bg-destructive/5';
      case 'warning':
        return 'border-l-warning bg-warning/5';
      case 'success':
        return 'border-l-success bg-success/5';
      default:
        return 'border-l-primary bg-primary/5';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hours ago`;
    return date.toLocaleDateString();
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  const unreadCount = notifications?.filter((n: any) => !n.read).length || 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Bell className="h-8 w-8 text-primary" />
            Notifications
            {unreadCount > 0 && (
              <Badge className="bg-destructive text-destructive-foreground">
                {unreadCount} new
              </Badge>
            )}
          </h1>
          <p className="text-muted-foreground mt-2">
            Stay updated with important alerts and system notifications
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline"
            onClick={() => {
              // Mark all notifications as read - this would update state in real app
              console.log("All notifications marked as read");
            }}
          >
            Mark all as read
          </Button>
          <Button 
            variant="outline"
            onClick={() => {
              navigate('/notifications/settings');
            }}
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Notifications List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notifications && notifications.length > 0 ? (
              notifications.map((notification: any) => (
                <div
                  key={notification.id}
                  className={`p-4 border-l-4 rounded-lg transition-colors hover:bg-muted/30 ${
                    getNotificationColor(notification.type)
                  } ${!notification.read ? 'bg-opacity-20' : ''}`}
                >
                  <div className="flex items-start gap-4">
                    {notification.avatar_url ? (
                      <Avatar className="h-10 w-10 mt-1">
                        <AvatarImage src={notification.avatar_url} />
                        <AvatarFallback>
                          {notification.title.split(' ')[0][0]}
                        </AvatarFallback>
                      </Avatar>
                    ) : (
                      <div className="p-2 rounded-full bg-muted mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                    )}
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <h3 className={`font-medium text-foreground flex items-center gap-2 ${
                            !notification.read ? 'font-semibold' : ''
                          }`}>
                            {notification.title}
                            {!notification.read && (
                              <div className="w-2 h-2 bg-primary rounded-full" />
                            )}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {notification.message}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {formatTimestamp(notification.created_at)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No notifications</h3>
                <p className="text-sm text-muted-foreground">
                  You're all caught up! New notifications will appear here.
                </p>
              </div>
            )}
           </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-medium">Patient Alerts</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span>Critical patient updates</span>
                  <Badge className="bg-success">Enabled</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Admission/Discharge notifications</span>
                  <Badge className="bg-success">Enabled</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Risk score changes</span>
                  <Badge variant="outline">Disabled</Badge>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium">System Alerts</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span>Inventory warnings</span>
                  <Badge className="bg-success">Enabled</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>System maintenance</span>
                  <Badge className="bg-success">Enabled</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Team assignments</span>
                  <Badge className="bg-success">Enabled</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Notifications;