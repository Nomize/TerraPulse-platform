import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { AlertTriangle, CheckCircle2, ScanLine, TrendingDown, TrendingUp, Lightbulb, Eye, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

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
  const [selectedDetection, setSelectedDetection] = useState<Detection | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showRecommendationsModal, setShowRecommendationsModal] = useState(false);
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
      const issues = [
        { issue: "Water Stress", change: "-10% soil moisture", severity: "moderate" as const },
        { issue: "Nutrient Deficiency", change: "-5% nitrogen levels", severity: "moderate" as const },
        { issue: "Erosion Risk", change: "-8% topsoil", severity: "high" as const },
        { issue: "Healthy Growth", change: "+15% vegetation", severity: "low" as const }
      ];
      const randomIssue = issues[Math.floor(Math.random() * issues.length)];
      
      const newDetection: Detection = {
        id: Date.now(),
        zone: `Zone ${String.fromCharCode(65 + Math.floor(Math.random() * 6))}${Math.floor(Math.random() * 9) + 1}`,
        issue: randomIssue.issue,
        severity: randomIssue.severity,
        change: randomIssue.change,
        confidence: 85 + Math.floor(Math.random() * 10),
        time: "Just now",
        recommendation: getRecommendation(randomIssue.issue)
      };
      
      setDetections([newDetection, ...detections]);
      setIsScanning(false);
      toast.success("New detection added!");
    }, 3000);
  };

  const getRecommendation = (issue: string): string => {
    const recommendations: Record<string, string> = {
      "Water Stress": "Increase water retention through mulching and drip irrigation",
      "Nutrient Deficiency": "Apply organic compost and nitrogen-fixing cover crops",
      "Erosion Risk": "Install terracing and plant deep-rooted vegetation",
      "Healthy Growth": "Maintain current practices and monitor progress"
    };
    return recommendations[issue] || "Contact an agronomist for personalized advice";
  };

  const getDetailedRecommendations = (detection: Detection) => {
    const recommendations = {
      "Soil Erosion": [
        { action: "Implement contour plowing", impact: "Reduces water runoff by 50%", priority: "High" },
        { action: "Plant cover crops (legumes)", impact: "Stabilizes soil and adds nitrogen", priority: "High" },
        { action: "Install check dams", impact: "Slows water flow in channels", priority: "Medium" },
        { action: "Add organic mulch layer", impact: "Protects topsoil from rain impact", priority: "Medium" },
        { action: "Create buffer strips", impact: "Filters sediment from runoff", priority: "Low" }
      ],
      "Vegetation Loss": [
        { action: "Increase irrigation frequency", impact: "Improves plant hydration by 30%", priority: "High" },
        { action: "Apply organic fertilizer", impact: "Boosts nutrient availability", priority: "High" },
        { action: "Install shade structures", impact: "Reduces heat stress", priority: "Medium" },
        { action: "Test soil pH levels", impact: "Identifies nutrient lock-up issues", priority: "Medium" }
      ],
      "Water Stress": [
        { action: "Implement drip irrigation", impact: "Reduces water waste by 40%", priority: "High" },
        { action: "Apply mulching", impact: "Retains soil moisture", priority: "High" },
        { action: "Plant drought-resistant varieties", impact: "Long-term resilience", priority: "Medium" }
      ],
      "Recovery Detected": [
        { action: "Continue current practices", impact: "Maintain positive trend", priority: "High" },
        { action: "Document methods used", impact: "Replicable success", priority: "Medium" },
        { action: "Monitor quarterly", impact: "Track continued progress", priority: "Low" }
      ]
    };
    return recommendations[detection.issue as keyof typeof recommendations] || [
      { action: "Consult with local agronomist", impact: "Expert guidance", priority: "High" },
      { action: "Collect soil samples", impact: "Detailed analysis", priority: "Medium" }
    ];
  };

  return (
    <>
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
          <AnimatePresence>
            {detections.map((detection, index) => (
              <motion.div
                key={detection.id}
                initial={{ opacity: 0, x: -50, height: 0 }}
                animate={{ opacity: 1, x: 0, height: "auto" }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.3, delay: index === 0 ? 0 : 0 }}
              >
                <Card 
                  className={`transition-all hover:shadow-lg border-2 ${getSeverityBg(detection.severity)}`}
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

                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1 hover:bg-primary/10 hover:border-primary/50"
                          onClick={() => {
                            setSelectedDetection(detection);
                            setShowDetailsModal(true);
                          }}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                        <Button 
                          size="sm" 
                          className="flex-1"
                          onClick={() => {
                            setSelectedDetection(detection);
                            setShowRecommendationsModal(true);
                          }}
                        >
                          <Lightbulb className="h-4 w-4 mr-2" />
                          Get Recommendations
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* View Details Modal */}
      <Dialog open={showDetailsModal} onOpenChange={setShowDetailsModal}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-primary" />
              {selectedDetection?.zone} - Detailed Analysis
            </DialogTitle>
            <DialogDescription>
              Comprehensive breakdown of detected issues
            </DialogDescription>
          </DialogHeader>
          {selectedDetection && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-muted/50">
                  <p className="text-sm text-muted-foreground">Issue Type</p>
                  <p className="font-semibold">{selectedDetection.issue}</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <p className="text-sm text-muted-foreground">Severity Level</p>
                  <Badge 
                    variant={selectedDetection.severity === "high" ? "destructive" : "outline"}
                    className="mt-1"
                  >
                    {selectedDetection.severity.toUpperCase()}
                  </Badge>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <p className="text-sm text-muted-foreground">Change Detected</p>
                  <p className="font-semibold">{selectedDetection.change}</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <p className="text-sm text-muted-foreground">AI Confidence</p>
                  <p className="font-semibold">{selectedDetection.confidence}%</p>
                </div>
              </div>
              
              <div className="p-4 rounded-lg border border-primary/30 bg-primary/5">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <p className="font-semibold text-primary">AI Analysis Summary</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  Based on satellite imagery from the past 6 months, our AI has detected 
                  {selectedDetection.severity === "high" ? " significant " : selectedDetection.severity === "moderate" ? " moderate " : " positive "}
                  changes in {selectedDetection.zone}. {selectedDetection.recommendation}
                </p>
              </div>

              <div className="p-4 rounded-lg bg-muted/30">
                <p className="text-sm text-muted-foreground mb-2">Historical Data</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Last scan: {selectedDetection.time}</span>
                    <span className="text-muted-foreground">30 days ago: Baseline</span>
                  </div>
                  <Progress value={selectedDetection.confidence} className="h-2" />
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Get Recommendations Modal */}
      <Dialog open={showRecommendationsModal} onOpenChange={setShowRecommendationsModal}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-primary" />
              AI Recommendations for {selectedDetection?.zone}
            </DialogTitle>
            <DialogDescription>
              Actionable steps to address {selectedDetection?.issue}
            </DialogDescription>
          </DialogHeader>
          {selectedDetection && (
            <div className="space-y-4">
              {getDetailedRecommendations(selectedDetection).map((rec, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 rounded-lg border border-border hover:border-primary/50 transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="w-6 h-6 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center font-semibold">
                          {index + 1}
                        </span>
                        <h4 className="font-semibold">{rec.action}</h4>
                      </div>
                      <p className="text-sm text-muted-foreground ml-8">{rec.impact}</p>
                    </div>
                    <Badge 
                      variant={rec.priority === "High" ? "default" : "outline"}
                      className={rec.priority === "High" ? "bg-status-risk" : rec.priority === "Medium" ? "border-status-moderate text-status-moderate" : ""}
                    >
                      {rec.priority}
                    </Badge>
                  </div>
                </motion.div>
              ))}
              
              <div className="pt-4 border-t">
                <Button className="w-full" onClick={() => {
                  toast.success("Recommendations saved to your action plan!");
                  setShowRecommendationsModal(false);
                }}>
                  Save to Action Plan
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DegradationDetection;
