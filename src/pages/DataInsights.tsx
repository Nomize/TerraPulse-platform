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
  ComposedChart,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer 
} from "recharts";
import { Upload, Download, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, FileText, Grid3x3 } from "lucide-react";
import { toast } from "sonner";
import { exportToCSV, exportToPDF } from "@/lib/export-utils";

const DataInsights = () => {
  const [activeTab, setActiveTab] = useState("soil");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadedData, setUploadedData] = useState<any[] | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [viewMode, setViewMode] = useState<'chart' | 'heatmap'>('chart');

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

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadedFile(file);
    setIsProcessing(true);

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const rows = text.split('\n').map(row => row.split(','));
      const headers = rows[0];
      const data = rows.slice(1).map(row => {
        const obj: any = {};
        headers.forEach((header, i) => {
          obj[header.trim()] = row[i]?.trim();
        });
        return obj;
      }).filter(row => Object.values(row).some(val => val));

      setTimeout(() => {
        setUploadedData(data);
        setIsProcessing(false);
        toast.success(`Successfully processed ${data.length} rows!`);
      }, 1500);
    };
    reader.readAsText(file);
  };

  const handleExportPDF = () => {
    const reportHTML = `
      <h2>Land Health Summary Report</h2>
      <table>
        <tr><th>Metric</th><th>Value</th><th>Status</th></tr>
        <tr><td>Average Soil Health</td><td>73/100</td><td>Good</td></tr>
        <tr><td>NDVI Average</td><td>0.68</td><td>Healthy</td></tr>
        <tr><td>Healthy Land Coverage</td><td>71%</td><td>Improving (+26%)</td></tr>
        <tr><td>Degraded Land</td><td>8%</td><td>Declining (-12%)</td></tr>
      </table>
      <h2>Key Insights</h2>
      <ul>
        <li>Soil moisture levels optimal in most monitored regions</li>
        <li>Strong correlation between rainfall and vegetation (NDVI)</li>
        <li>Lagos and Abuja show highest health scores (72-81)</li>
        <li>Niger region requires attention with score of 45</li>
      </ul>
      <h2>Recommendations</h2>
      <ul>
        <li>Continue current land management practices in high-performing regions</li>
        <li>Implement targeted restoration in Niger region</li>
        <li>Monitor rainfall patterns for drought preparedness</li>
        <li>Expand vegetation coverage in moderate-risk zones</li>
      </ul>
    `;
    exportToPDF('TerraPulse Land Health Report', reportHTML);
  };

  const handleDownloadSample = () => {
    const sampleData = [
      { region: 'Lagos', ndvi: 0.72, soilHealth: 75, rainfall: 85 },
      { region: 'Kano', ndvi: 0.58, soilHealth: 62, rainfall: 45 },
      { region: 'Abuja', ndvi: 0.81, soilHealth: 85, rainfall: 92 },
    ];
    exportToCSV(sampleData, 'terrapulse_sample_data');
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
          <Button 
            onClick={handleExportPDF}
            className="bg-gradient-to-r from-[#00FF41] to-[#10B981] text-black hover:shadow-[0_0_30px_rgba(0,255,65,0.6)]"
          >
            <FileText className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
          <Button 
            variant="outline"
            onClick={() => exportToCSV(degradationByRegion, 'land_health_data')}
            className="border-[#00FF41] text-[#00FF41] hover:bg-[#00FF41] hover:text-black"
          >
            <Download className="h-4 w-4 mr-2" />
            Export CSV
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
          <Card className="bg-[#0F1419] border border-[#10B981]/30 hover:border-[#00FF41] transition-all">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white">Vegetation Change Over Time</CardTitle>
                  <CardDescription>Recovery and decline patterns by status</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant={viewMode === 'chart' ? 'default' : 'outline'}
                    onClick={() => setViewMode('chart')}
                    className={viewMode === 'chart' ? 'bg-[#00FF41] text-black' : 'border-[#00FF41] text-[#00FF41]'}
                  >
                    <TrendingUp className="h-4 w-4 mr-1" />
                    Chart
                  </Button>
                  <Button
                    size="sm"
                    variant={viewMode === 'heatmap' ? 'default' : 'outline'}
                    onClick={() => setViewMode('heatmap')}
                    className={viewMode === 'heatmap' ? 'bg-[#00FF41] text-black' : 'border-[#00FF41] text-[#00FF41]'}
                  >
                    <Grid3x3 className="h-4 w-4 mr-1" />
                    Heatmap
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => exportToCSV(vegetationChange, 'vegetation_trends')}
                    className="border-[#00FF41] text-[#00FF41]"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {viewMode === 'chart' ? (
                <ResponsiveContainer width="100%" height={350}>
                  <AreaChart data={vegetationChange}>
                    <defs>
                      <linearGradient id="healthyGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--status-healthy))" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="hsl(var(--status-healthy))" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1A1F26" />
                    <XAxis dataKey="year" stroke="#A1A1AA" />
                    <YAxis stroke="#A1A1AA" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#0F1419",
                        border: "2px solid #00FF41",
                        borderRadius: "8px",
                        color: "white"
                      }}
                    />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="healthy"
                      stackId="1"
                      stroke="hsl(var(--status-healthy))"
                      fill="url(#healthyGrad)"
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
              ) : (
                <div className="space-y-4">
                  {vegetationChange.map((yearData, idx) => (
                    <div key={yearData.year} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-white font-semibold">{yearData.year}</span>
                        <span className="text-gray-400 text-sm">Total: 100%</span>
                      </div>
                      <div className="flex h-12 rounded-lg overflow-hidden border border-[#10B981]/30">
                        <div 
                          className="bg-[#00E676] flex items-center justify-center text-black font-semibold text-sm transition-all hover:opacity-80"
                          style={{ width: `${yearData.healthy}%` }}
                          title={`Healthy: ${yearData.healthy}%`}
                        >
                          {yearData.healthy}%
                        </div>
                        <div 
                          className="bg-[#FF8C00] flex items-center justify-center text-white font-semibold text-sm transition-all hover:opacity-80"
                          style={{ width: `${yearData.moderate}%` }}
                          title={`Moderate: ${yearData.moderate}%`}
                        >
                          {yearData.moderate}%
                        </div>
                        <div 
                          className="bg-[#FF3B3B] flex items-center justify-center text-white font-semibold text-sm transition-all hover:opacity-80"
                          style={{ width: `${yearData.degraded}%` }}
                          title={`Degraded: ${yearData.degraded}%`}
                        >
                          {yearData.degraded}%
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="grid grid-cols-3 gap-4 mt-6">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-[#00E676] rounded"></div>
                      <span className="text-white text-sm">Healthy</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-[#FF8C00] rounded"></div>
                      <span className="text-white text-sm">Moderate Risk</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-[#FF3B3B] rounded"></div>
                      <span className="text-white text-sm">Degraded</span>
                    </div>
                  </div>
                </div>
              )}
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
          <Card className="bg-[#0F1419] border border-[#10B981]/30 hover:border-[#00FF41] transition-all">
            <CardHeader>
              <CardTitle className="text-white">Upload Your Data</CardTitle>
              <CardDescription>Upload CSV or Excel files for custom analysis</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {!uploadedFile ? (
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept=".csv,.xlsx,.xls"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <div className="border-2 border-dashed border-[#10B981] rounded-xl p-12 text-center space-y-4 hover:border-[#00FF41] transition-all bg-[#1A1F26]">
                    <Upload className="h-16 w-16 mx-auto text-[#00FF41]" />
                    <div>
                      <p className="text-white font-semibold text-lg mb-2">Upload Your Data</p>
                      <p className="text-gray-400 text-sm">CSV, Excel files supported (Max 10MB)</p>
                    </div>
                    <div className="mt-4 bg-[#00FF41] text-black px-6 py-3 rounded-lg font-semibold hover:bg-[#39FF14] transition-all inline-block">
                      Choose File
                    </div>
                  </div>
                </label>
              ) : (
                <div className="bg-[#1A1F26] border border-[#10B981]/30 rounded-xl p-8 text-center">
                  {isProcessing ? (
                    <>
                      <div className="w-16 h-16 mx-auto mb-4 relative">
                        <div className="absolute inset-0 border-4 border-[#00FF41] rounded-full border-t-transparent animate-spin"></div>
                      </div>
                      <p className="text-white font-semibold mb-2">Processing {uploadedFile.name}...</p>
                      <p className="text-gray-400 text-sm">Analyzing data structure</p>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-16 h-16 text-[#00FF41] mx-auto mb-4" />
                      <p className="text-white font-semibold text-lg mb-2">Upload Successful!</p>
                      <p className="text-[#00FF41] mb-4">{uploadedData?.length || 0} rows processed</p>
                      <div className="flex gap-3 justify-center">
                        <Button 
                          variant="outline"
                          onClick={() => {
                            setUploadedFile(null);
                            setUploadedData(null);
                          }}
                          className="border-[#00FF41] text-[#00FF41] hover:bg-[#00FF41] hover:text-black"
                        >
                          Upload Another
                        </Button>
                        <Button className="bg-[#00FF41] text-black hover:bg-[#39FF14]">
                          Analyze Data →
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              )}

              <div className="flex justify-between items-center">
                <Button 
                  variant="outline"
                  onClick={handleDownloadSample}
                  className="border-[#00FF41] text-[#00FF41] hover:bg-[#00FF41] hover:text-black"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Sample Data
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
