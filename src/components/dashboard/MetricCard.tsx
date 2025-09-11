import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Users, Activity, AlertTriangle, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    type: 'increase' | 'decrease';
  };
  status?: 'normal' | 'warning' | 'critical' | 'success';
  icon?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
}

export function MetricCard({ title, value, change, status = 'normal', icon, className, onClick, href }: MetricCardProps) {
  const navigate = useNavigate();
  
  const getStatusColor = () => {
    switch (status) {
      case 'warning': return 'border-l-warning';
      case 'critical': return 'border-l-destructive';
      case 'success': return 'border-l-success';
      default: return 'border-l-primary';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'warning': return <AlertTriangle className="h-4 w-4 text-warning" />;
      case 'critical': return <AlertTriangle className="h-4 w-4 text-destructive" />;
      case 'success': return <CheckCircle className="h-4 w-4 text-success" />;
      default: return <Activity className="h-4 w-4 text-primary" />;
    }
  };

  const handleClick = () => {
    if (href) {
      navigate(href);
    } else if (onClick) {
      onClick();
    }
  };

  const isClickable = !!(onClick || href);

  return (
    <Card 
      className={cn(
        "relative transition-all duration-300 hover:shadow-md border-l-4",
        getStatusColor(),
        isClickable && "cursor-pointer hover:border-primary/50",
        className
      )}
      onClick={isClickable ? handleClick : undefined}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 md:px-6 pt-4 md:pt-6">
        <CardTitle className="text-xs md:text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon || getStatusIcon()}
      </CardHeader>
      <CardContent className="px-4 md:px-6 pb-4 md:pb-6">
        <div className="flex items-center justify-between">
          <div className="text-xl md:text-2xl font-bold text-foreground">
            {value}
          </div>
          {change && (
            <div className={cn(
              "flex items-center text-xs font-medium",
              change.type === 'increase' 
                ? status === 'critical' ? 'text-destructive' : 'text-success'
                : status === 'warning' ? 'text-warning' : 'text-muted-foreground'
            )}>
              {change.type === 'increase' ? (
                <TrendingUp className="h-3 w-3 mr-1" />
              ) : (
                <TrendingDown className="h-3 w-3 mr-1" />
              )}
              {Math.abs(change.value)}%
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}