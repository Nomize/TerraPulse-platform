import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, CheckCircle2, ScanLine, TrendingDown, TrendingUp } from "lucide-react";
import { toast } from "sonner";

interface Detection {
  id: number;
  zone: string;
  issue: string;
  severity: "high" | "moderate" | "low";
  change: string;
  confidence: number;
  time: string;
  recommendation: string;
}

const DegradationDetection = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [detections, setDetections] = useState<Detection[]>([
    {
      id: 1,
      zone: "Zone A3",
      issue: "Soil Erosion",
      severity: "high",
      change: "-15% topsoil in 6 months",
      confidence: 94,
      time: "2 hours ago",
      recommendation: "Implement contour plowing and plant cover crops"
    },
    {
      id: 2,
      zone: "Zone B7",
      issue: "Vegetation Loss",
      severity: "moderate",
      change: "-8% NDVI decline",
      confidence: 87,
      time: "5 hours ago",
      recommendation: "Increase irrigation and apply organic fertilizer"
    },
    {
      id: 3,
      zone: "Zone C2",
      issue: "Recovery Detected",
      severity: "low",
      change: "+12% vegetation growth",
      confidence: 91,
      time: "1 day ago",
      recommendation: "Continue current restoration practices"
    }
  ]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "text-status-risk";
      case "moderate": return "text-status-moderate";
      default: return "text-status-healthy";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "high": return AlertTriangle;
      case "moderate": return AlertTriangle;
      default: return CheckCircle2;
    }
  };

  const getSeverityBg = (severity: string) => {
    switch (severity) {
      case "high": return "border-status-risk bg-status-risk/10";
      case "moderate": return "border-status-moderate bg-status-moderate/10";
      default: return "border-status-healthy bg-status-healthy/10";
    }
  };

  const handleRunScan = () => {
    setIsScanning(true);
    toast.info("Scanning satellite data...");
    
    setTimeout(() => {
      const newDetection: Detection = {
        id: Date.now(),
        zone: "Zone D5",
        issue: "Water Stress",
        severity: "moderate",
        change: "-10% soil moisture",
        confidence: 89,
        time: "Just now",
        recommendation: "Increase water retention through mulching"
      };
      
      setDetections([newDetection, ...detections]);
      setIsScanning(false);
      toast.success("New detection added!");
    }, 3000);
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Land Degradation Detection</CardTitle>
            <CardDescription>AI-powered satellite imagery analysis</CardDescription>
          </div>
          <Button 
            onClick={handleRunScan}
            disabled={isScanning}
            className="bg-primary text-black hover:bg-primary/90 shadow-[0_0_20px_rgba(0,255,65,0.5)]"
          >
            <ScanLine className={`h-4 w-4 mr-2 ${isScanning ? 'animate-spin' : ''}`} />
            {isScanning ? "Scanning..." : "Run New Scan"}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {detections.map((detection, index) => (
          <Card 
            key={detection.id}
            className={`transition-all hover:shadow-lg border-2 ${getSeverityBg(detection.severity)} animate-fade-in`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    {(() => {
                      const Icon = getSeverityIcon(detection.severity);
                      return <Icon className={`h-5 w-5 mt-0.5 ${getSeverityColor(detection.severity)}`} />;
                    })()}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">{detection.zone}</h4>
                        <Badge 
                          variant={detection.severity === "high" ? "destructive" : "outline"}
                          className={detection.severity === "high" ? "" : detection.severity === "moderate" ? "border-status-moderate text-status-moderate" : "border-status-healthy text-status-healthy"}
                        >
                          {detection.severity.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-sm font-medium">{detection.issue}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        {detection.severity === "low" ? (
                          <TrendingUp className="h-3 w-3 text-status-healthy" />
                        ) : (
                          <TrendingDown className="h-3 w-3 text-status-risk" />
                        )}
                        {detection.change}
                      </p>
                      <p className="text-xs text-muted-foreground">{detection.time}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">AI Confidence</span>
                    <span className="font-medium">{detection.confidence}%</span>
                  </div>
                  <Progress value={detection.confidence} className="h-1.5" />
                </div>

                <div className="pt-2 border-t border-border/50">
                  <p className="text-xs text-muted-foreground mb-2">Recommended Action:</p>
                  <p className="text-sm">{detection.recommendation}</p>
                </div>

                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full hover:bg-primary/10 hover:border-primary/50"
                >
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
};

export default DegradationDetection;