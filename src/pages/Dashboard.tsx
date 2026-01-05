import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { 
  TrendingUp, TrendingDown, Download, Droplets, FileText, Beaker, Leaf, Sparkles 
} from "lucide-react";
import { toast } from "sonner";
import { exportToCSV, exportToPDF } from "@/lib/export-utils";
import EnhancedMapComponent from "@/components/EnhancedMapComponent";
import DegradationDetection from "@/components/DegradationDetection";
import { GuestBanner } from "@/components/GuestBanner";

const Dashboard = () => {
  const [soilHealth, setSoilHealth] = useState(73);
  const [lastUpdate, setLastUpdate] = useState(0);
  const [showSoilDetailsModal, setShowSoilDetailsModal] = useState(false);
  const [showSimulateModal, setShowSimulateModal] = useState(false);

  const handleExportCSV = () => {
    const data = [
      { Date: '2024-01-15', Zone: 'A3', NDVI: 0.72, SoilHealth: 85, ErosionRate: 2.3 },
      { Date: '2024-01-16', Zone: 'B7', NDVI: 0.65, SoilHealth: 78, ErosionRate: 3.1 },
      { Date: '2024-01-17', Zone: 'C2', NDVI: 0.81, SoilHealth: 92, ErosionRate: 1.2 },
    ];
    exportToCSV(data, 'terrapulse_data');
    toast.success('Data exported to CSV');
  };

  const handleDownloadReport = () => {
    const content = `
      <h2>Land Health Summary</h2>
      <table>
        <thead>
          <tr>
            <th>Metric</th>
            <th>Current Value</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Average NDVI</td>
            <td>0.73</td>
            <td>Good</td>
          </tr>
          <tr>
            <td>Soil Health Score</td>
            <td>85/100</td>
            <td>Healthy</td>
          </tr>
          <tr>
            <td>High Risk Zones</td>
            <td>1</td>
            <td>Monitor</td>
          </tr>
          <tr>
            <td>Total Area</td>
            <td>156 ha</td>
            <td>-</td>
          </tr>
        </tbody>
      </table>
      
      <h2>Zone Analysis</h2>
      <ul>
        <li><strong>Zone A3:</strong> High erosion risk detected. Implement contour plowing.</li>
        <li><strong>Zone B7:</strong> Moderate vegetation loss. Increase irrigation.</li>
        <li><strong>Zone C2:</strong> Excellent recovery. Continue current practices.</li>
      </ul>
    `;
    exportToPDF('TerraPulse Land Health Report', content);
    toast.success('Opening print dialog for PDF');
  };

  // Mock NDVI data
  const ndviData = [
    { month: "Jan", value: 0.45 },
    { month: "Feb", value: 0.52 },
    { month: "Mar", value: 0.58 },
    { month: "Apr", value: 0.63 },
    { month: "May", value: 0.71 },
    { month: "Jun", value: 0.68 },
    { month: "Jul", value: 0.64 },
    { month: "Aug", value: 0.59 },
    { month: "Sep", value: 0.55 },
    { month: "Oct", value: 0.62 },
    { month: "Nov", value: 0.67 },
    { month: "Dec", value: 0.72 },
  ];

  // Simulate auto-refresh
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate((prev) => prev + 1);
      // Slightly vary the soil health score
      setSoilHealth((prev) => Math.max(60, Math.min(85, prev + (Math.random() - 0.5) * 3)));
    }, 10000); // Every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const getSoilHealthColor = (score: number) => {
    if (score < 40) return "text-status-risk";
    if (score < 70) return "text-status-moderate";
    return "text-status-healthy";
  };

  const getSoilHealthStatus = (score: number) => {
    if (score < 40) return { label: "Poor", variant: "destructive" as const };
    if (score < 70) return { label: "Moderate", variant: "outline" as const };
    return { label: "Excellent", variant: "default" as const };
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <GuestBanner />
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-1 flex items-center gap-2">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-glow"></span>
            Live data • Updated {lastUpdate} seconds ago
          </p>
        </div>
        <div className="flex gap-3">
          <Button onClick={handleExportCSV} variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          <Button onClick={handleDownloadReport} size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Download Report
          </Button>
        </div>
      </div>

      {/* Main Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Card 1: Soil Health Score */}
        <Card className="glass-card hover:shadow-glow-lg transition-all hover:border-primary/50 hover:-translate-y-1">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Soil Health Score
              <Badge {...getSoilHealthStatus(soilHealth)}>
                {getSoilHealthStatus(soilHealth).label}
              </Badge>
            </CardTitle>
            <CardDescription>Overall soil quality index</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Circular Progress */}
            <div className="flex flex-col items-center justify-center py-6">
              <div className="relative">
                <svg className="w-40 h-40 transform -rotate-90">
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="transparent"
                    className="text-muted"
                  />
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="transparent"
                    strokeDasharray={`${2 * Math.PI * 70}`}
                    strokeDashoffset={`${2 * Math.PI * 70 * (1 - soilHealth / 100)}`}
                    className={getSoilHealthColor(soilHealth)}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className={`text-4xl font-bold ${getSoilHealthColor(soilHealth)}`}>
                    {Math.round(soilHealth)}
                  </span>
                </div>
              </div>
            </div>

            {/* Sub-metrics */}
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">pH Level</span>
                  <span className="font-medium">6.8</span>
                </div>
                <Progress value={68} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Droplets className="h-3 w-3" />
                    Moisture
                  </span>
                  <span className="font-medium">42%</span>
                </div>
                <Progress value={42} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Nutrients</span>
                  <span className="font-medium">75%</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
            </div>

            <Button className="w-full" onClick={() => setShowSoilDetailsModal(true)}>
              View Details
            </Button>
          </CardContent>
        </Card>

        {/* Card 2: Vegetation Index */}
        <Card className="glass-card hover:shadow-glow-lg transition-all hover:border-primary/50 hover:-translate-y-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Vegetation Index (NDVI)
              <TrendingUp className="h-5 w-5 text-status-healthy" />
            </CardTitle>
            <CardDescription>12-month vegetation health trend</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={ndviData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12 }}
                  className="text-muted-foreground"
                />
                <YAxis
                  domain={[0, 1]}
                  tick={{ fontSize: 12 }}
                  className="text-muted-foreground"
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--primary))", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>

            {/* Legend */}
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="space-y-1">
                <div className="text-muted-foreground">Low</div>
                <div className="font-medium text-status-risk">0.0 - 0.3</div>
              </div>
              <div className="space-y-1">
                <div className="text-muted-foreground">Moderate</div>
                <div className="font-medium text-status-moderate">0.3 - 0.6</div>
              </div>
              <div className="space-y-1">
                <div className="text-muted-foreground">Healthy</div>
                <div className="font-medium text-status-healthy">0.6 - 1.0</div>
              </div>
            </div>

            <Button onClick={handleDownloadReport} className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Download Data
            </Button>
          </CardContent>
        </Card>

        {/* Card 3: Degradation Risk Map */}
        <Card className="glass-card hover:shadow-glow-lg transition-all hover:border-primary/50 hover:-translate-y-1 lg:col-span-1">
          <CardHeader>
            <CardTitle>Degradation Risk Map</CardTitle>
            <CardDescription>Interactive risk zone monitoring</CardDescription>
          </CardHeader>
          <CardContent>
            <EnhancedMapComponent />
          </CardContent>
        </Card>
      </div>

      {/* Degradation Detection Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        <DegradationDetection />
      </div>

      {/* Filters Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Date Range</label>
              <select className="w-full px-3 py-2 rounded-lg border border-input bg-background">
                <option>Last 30 days</option>
                <option>Last 90 days</option>
                <option>Last 12 months</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Region</label>
              <select className="w-full px-3 py-2 rounded-lg border border-input bg-background">
                <option>Nigeria</option>
                <option>Kenya</option>
                <option>Ethiopia</option>
              </select>
            </div>
            <div className="flex-1 flex items-end gap-2">
              <Button className="flex-1">Apply Filters</Button>
              <Button variant="outline" onClick={() => setShowSimulateModal(true)}>
                <Sparkles className="h-4 w-4 mr-2" />
                Simulate Impact
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Soil Details Modal */}
      <Dialog open={showSoilDetailsModal} onOpenChange={setShowSoilDetailsModal}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Beaker className="h-5 w-5 text-primary" />
              Soil Health Details
            </DialogTitle>
            <DialogDescription>
              Comprehensive soil analysis breakdown
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-muted/50">
                <p className="text-sm text-muted-foreground">Overall Score</p>
                <p className="text-2xl font-bold text-primary">{Math.round(soilHealth)}/100</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50">
                <p className="text-sm text-muted-foreground">Health Status</p>
                <Badge className="mt-1">{soilHealth >= 70 ? "Excellent" : soilHealth >= 40 ? "Moderate" : "Poor"}</Badge>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold flex items-center gap-2">
                <Leaf className="h-4 w-4 text-primary" />
                Nutrient Levels
              </h4>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Nitrogen (N)</span>
                    <span className="font-medium">45 ppm</span>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Phosphorus (P)</span>
                    <span className="font-medium">28 ppm</span>
                  </div>
                  <Progress value={52} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Potassium (K)</span>
                    <span className="font-medium">180 ppm</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold flex items-center gap-2">
                <Droplets className="h-4 w-4 text-primary" />
                Physical Properties
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg border">
                  <p className="text-xs text-muted-foreground">pH Level</p>
                  <p className="font-semibold">6.8 (Optimal)</p>
                </div>
                <div className="p-3 rounded-lg border">
                  <p className="text-xs text-muted-foreground">Moisture</p>
                  <p className="font-semibold">42%</p>
                </div>
                <div className="p-3 rounded-lg border">
                  <p className="text-xs text-muted-foreground">Organic Matter</p>
                  <p className="font-semibold">3.2%</p>
                </div>
                <div className="p-3 rounded-lg border">
                  <p className="text-xs text-muted-foreground">Texture</p>
                  <p className="font-semibold">Loamy</p>
                </div>
              </div>
            </div>

            <Button className="w-full" onClick={() => {
              handleDownloadReport();
              setShowSoilDetailsModal(false);
            }}>
              <Download className="h-4 w-4 mr-2" />
              Download Full Report
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Simulate Impact Modal */}
      <Dialog open={showSimulateModal} onOpenChange={setShowSimulateModal}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Impact Simulation
            </DialogTitle>
            <DialogDescription>
              See projected outcomes based on intervention scenarios
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-primary/10 border border-primary/30">
              <h4 className="font-semibold mb-3">Scenario: Cover Crop Implementation</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Soil Health</span>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">{Math.round(soilHealth)}</span>
                    <TrendingUp className="h-4 w-4 text-status-healthy" />
                    <span className="font-semibold text-status-healthy">{Math.round(soilHealth + 15)}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Erosion Rate</span>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">2.3 t/ha</span>
                    <TrendingDown className="h-4 w-4 text-status-healthy" />
                    <span className="font-semibold text-status-healthy">0.8 t/ha</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Carbon Sequestration</span>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">1.2 t/ha</span>
                    <TrendingUp className="h-4 w-4 text-status-healthy" />
                    <span className="font-semibold text-status-healthy">2.8 t/ha</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-muted/50">
              <h4 className="font-semibold mb-2">Projected Timeline</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">3 months</span>
                  <span>Initial soil coverage established</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">6 months</span>
                  <span>15% improvement in soil structure</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">12 months</span>
                  <span>Full ecosystem benefits realized</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button className="flex-1" onClick={() => {
                toast.success("Simulation saved to your projects!");
                setShowSimulateModal(false);
              }}>
                Save Simulation
              </Button>
              <Button variant="outline" className="flex-1" onClick={() => setShowSimulateModal(false)}>
                Run Another
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
