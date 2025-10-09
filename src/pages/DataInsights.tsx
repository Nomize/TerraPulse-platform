import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  AreaChart, 
  Area,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer 
} from "recharts";
import { Upload, Download, TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

const DataInsights = () => {
  const [activeTab, setActiveTab] = useState("soil");

  // Mock data for different charts
  const soilMoistureData = [
    { month: "Jan", moisture: 35, optimal: 45 },
    { month: "Feb", moisture: 42, optimal: 45 },
    { month: "Mar", moisture: 48, optimal: 45 },
    { month: "Apr", moisture: 52, optimal: 45 },
    { month: "May", moisture: 45, optimal: 45 },
    { month: "Jun", moisture: 38, optimal: 45 },
  ];

  const rainfallVegetationData = [
    { month: "Jan", rainfall: 45, ndvi: 0.45 },
    { month: "Feb", rainfall: 52, ndvi: 0.52 },
    { month: "Mar", rainfall: 68, ndvi: 0.58 },
    { month: "Apr", rainfall: 75, ndvi: 0.63 },
    { month: "May", rainfall: 82, ndvi: 0.71 },
    { month: "Jun", rainfall: 70, ndvi: 0.68 },
  ];

  const degradationByRegion = [
    { region: "Lagos", score: 72 },
    { region: "Kano", score: 58 },
    { region: "Niger", score: 45 },
    { region: "Abuja", score: 81 },
    { region: "Kaduna", score: 63 },
  ];

  const vegetationChange = [
    { year: "2020", healthy: 45, moderate: 35, degraded: 20 },
    { year: "2021", healthy: 52, moderate: 32, degraded: 16 },
    { year: "2022", healthy: 58, moderate: 28, degraded: 14 },
    { year: "2023", healthy: 65, moderate: 25, degraded: 10 },
    { year: "2024", healthy: 71, moderate: 21, degraded: 8 },
  ];

  const handleUpload = () => {
    toast.success("File uploaded successfully! Analysis in progress...");
  };

  const handleAnalyze = () => {
    toast.success("Analysis complete! Check the results below.");
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">Data Insights</h1>
          <p className="text-muted-foreground mt-1">
            Comprehensive analysis and visualization
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* Tab Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
          <TabsTrigger value="soil">Soil Trends</TabsTrigger>
          <TabsTrigger value="vegetation">Vegetation</TabsTrigger>
          <TabsTrigger value="climate">Climate</TabsTrigger>
          <TabsTrigger value="upload">Upload Data</TabsTrigger>
        </TabsList>

        {/* Soil Trends Tab */}
        <TabsContent value="soil" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Soil Moisture Trends</CardTitle>
              <CardDescription>6-month historical data compared to optimal range</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={soilMoistureData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="moisture"
                    stroke="hsl(var(--chart-1))"
                    strokeWidth={2}
                    name="Actual Moisture (%)"
                  />
                  <Line
                    type="monotone"
                    dataKey="optimal"
                    stroke="hsl(var(--chart-2))"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name="Optimal Range"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Land Degradation by Region</CardTitle>
              <CardDescription>Health scores across monitored areas</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={degradationByRegion}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="region" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="score" fill="hsl(var(--chart-1))" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Vegetation Analysis Tab */}
        <TabsContent value="vegetation" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Vegetation Change Over Time</CardTitle>
              <CardDescription>Recovery and decline patterns by status</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={vegetationChange}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="year" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="healthy"
                    stackId="1"
                    stroke="hsl(var(--status-healthy))"
                    fill="hsl(var(--status-healthy))"
                    fillOpacity={0.6}
                    name="Healthy (%)"
                  />
                  <Area
                    type="monotone"
                    dataKey="moderate"
                    stackId="1"
                    stroke="hsl(var(--status-moderate))"
                    fill="hsl(var(--status-moderate))"
                    fillOpacity={0.6}
                    name="Moderate (%)"
                  />
                  <Area
                    type="monotone"
                    dataKey="degraded"
                    stackId="1"
                    stroke="hsl(var(--status-risk))"
                    fill="hsl(var(--status-risk))"
                    fillOpacity={0.6}
                    name="Degraded (%)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6 space-y-2">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-status-healthy" />
                  <span className="text-sm text-muted-foreground">Healthy Land</span>
                </div>
                <div className="text-3xl font-bold text-status-healthy">71%</div>
                <Badge variant="outline" className="text-status-healthy border-status-healthy">
                  +26% from 2020
                </Badge>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 space-y-2">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-status-moderate" />
                  <span className="text-sm text-muted-foreground">Moderate Risk</span>
                </div>
                <div className="text-3xl font-bold text-status-moderate">21%</div>
                <Badge variant="outline" className="text-status-moderate border-status-moderate">
                  -14% from 2020
                </Badge>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 space-y-2">
                <div className="flex items-center gap-2">
                  <TrendingDown className="h-5 w-5 text-status-risk" />
                  <span className="text-sm text-muted-foreground">Degraded</span>
                </div>
                <div className="text-3xl font-bold text-status-risk">8%</div>
                <Badge variant="outline" className="text-status-healthy border-status-healthy">
                  -12% from 2020
                </Badge>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Climate Correlation Tab */}
        <TabsContent value="climate" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Rainfall vs Vegetation Correlation</CardTitle>
              <CardDescription>Dual-axis analysis of climate impact</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={rainfallVegetationData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis yAxisId="left" className="text-xs" />
                  <YAxis yAxisId="right" orientation="right" domain={[0, 1]} className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="rainfall"
                    stroke="hsl(var(--chart-2))"
                    strokeWidth={2}
                    name="Rainfall (mm)"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="ndvi"
                    stroke="hsl(var(--chart-1))"
                    strokeWidth={2}
                    name="NDVI"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Upload Data Tab */}
        <TabsContent value="upload" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Upload Your Data</CardTitle>
              <CardDescription>Upload CSV or Excel files for custom analysis</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-2 border-dashed border-border rounded-lg p-12 text-center space-y-4">
                <Upload className="h-12 w-12 mx-auto text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium mb-1">Drop files here or click to browse</p>
                  <p className="text-xs text-muted-foreground">Supports CSV, XLSX (max 10MB)</p>
                </div>
                <Button onClick={handleUpload}>Select Files</Button>
              </div>

              <div className="flex justify-between items-center">
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download Sample Data
                </Button>
                <Button className="gradient-hero" onClick={handleAnalyze}>
                  Analyze Data
                </Button>
              </div>

              {/* Mock Analysis Results */}
              <Card className="bg-muted/30">
                <CardHeader>
                  <CardTitle className="text-lg">Analysis Results</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-card rounded-lg">
                    <span className="text-sm">Total Records Processed</span>
                    <Badge>1,247</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-card rounded-lg">
                    <span className="text-sm">Average Soil Health</span>
                    <Badge variant="default">73/100</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-card rounded-lg">
                    <span className="text-sm">Anomalies Detected</span>
                    <Badge variant="destructive">3</Badge>
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    <Download className="h-4 w-4 mr-2" />
                    Download Full Report (PDF)
                  </Button>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DataInsights;
