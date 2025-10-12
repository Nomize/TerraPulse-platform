import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Send, Sparkles, ThumbsUp, ThumbsDown, Copy, RefreshCw, TrendingUp, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const AIInsights = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const exampleQueries = [
    "Predict soil health for next month in Nigeria",
    "Analyze vegetation trends in my region",
    "What restoration methods work best?",
    "How does rainfall affect land degradation?",
  ];

  const mockResponses: { [key: string]: string } = {
    default: `Based on current data and seasonal patterns:

📈 **Predicted Soil Health Index:** 74/100
📊 **Trend:** +8% improvement expected

**Key Factors:**
• Recent rainfall increase (+15mm)
• Temperature stabilization  
• Reduced erosion risk

**Recommendation:** Consider planting nitrogen-fixing crops to boost soil fertility further.`,
    vegetation: `**Vegetation Analysis Report**

🌿 **Current NDVI:** 0.68 (Healthy)
📈 **6-Month Trend:** +12% improvement

**Observations:**
• Consistent growth in vegetation cover
• Peak season approaching in 2-3 weeks
• Soil moisture levels optimal

**Opportunity:** Best planting window is in the next 2 weeks. Consider expanding coverage by 15%.`,
    restoration: `**Top Restoration Methods for Your Region:**

1️⃣ **Agroforestry Integration**
   Success Rate: 87%
   Timeline: 6-12 months
   
2️⃣ **Nitrogen-Fixing Cover Crops**
   Success Rate: 92%
   Timeline: 3-4 months

3️⃣ **Contour Plowing**
   Success Rate: 78%
   Timeline: Immediate

**Recommendation:** Start with cover crops for quick wins, then implement agroforestry for long-term sustainability.`,
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      let response = mockResponses.default;
      
      if (input.toLowerCase().includes("vegetation") || input.toLowerCase().includes("trend")) {
        response = mockResponses.vegetation;
      } else if (input.toLowerCase().includes("restoration") || input.toLowerCase().includes("method")) {
        response = mockResponses.restoration;
      }

      const aiMessage: Message = { role: "assistant", content: response };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleExampleClick = (query: string) => {
    setInput(query);
  };

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success("Copied to clipboard!");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl md:text-4xl font-bold flex items-center justify-center gap-2">
            <Sparkles className="h-8 w-8 text-primary" />
            AI Insights
          </h1>
          <p className="text-muted-foreground">
            Ask questions about your land health and get AI-powered predictions
          </p>
        </div>

        {/* Insights Summary Sidebar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="md:col-span-3 lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-lg">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-status-healthy" />
                  <span className="text-sm font-medium">Health Trend</span>
                </div>
                <Badge variant="default">+8%</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-status-risk" />
                  <span className="text-sm font-medium">Risk Zones</span>
                </div>
                <Badge variant="destructive">2</Badge>
              </div>
              <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
                <p className="text-xs text-muted-foreground mb-1">Opportunity</p>
                <p className="text-sm font-medium">Best planting window: Next 2 weeks</p>
              </div>
            </CardContent>
          </Card>

          {/* Chat Interface */}
          <Card className="md:col-span-3 lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg">Chat with AI</CardTitle>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <div className="w-2 h-2 bg-[#00FF41] rounded-full animate-pulse shadow-[0_0_10px_rgba(0,255,65,0.8)]" />
                <span className="text-[#00FF41] font-semibold">Online</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Example Queries */}
              {messages.length === 0 && (
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">Try asking:</p>
                  <div className="flex flex-wrap gap-2">
                    {exampleQueries.map((query, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => handleExampleClick(query)}
                        className="text-xs border-[#00FF41]/50 text-[#00FF41] hover:bg-[#00FF41]/10 hover:border-[#00FF41]"
                      >
                        {query}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Messages */}
              <div className="space-y-4 min-h-[300px] max-h-[400px] overflow-y-auto">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-4 ${
                        message.role === "user"
                          ? "bg-primary/20 border-2 border-primary text-foreground"
                          : "bg-[#1A1F26] border-l-4 border-[#00FF41]"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line">{message.content}</p>
                      {message.role === "assistant" && (
                        <div className="flex gap-2 mt-3 pt-3 border-t border-border/50">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 px-2 hover:bg-[#00FF41]/10"
                            onClick={() => handleCopy(message.content)}
                          >
                            <Copy className="h-3 w-3 text-[#00FF41]" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 px-2 hover:bg-[#00FF41]/10">
                            <ThumbsUp className="h-3 w-3 text-[#00FF41]" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 px-2 hover:bg-[#00FF41]/10">
                            <ThumbsDown className="h-3 w-3 text-[#00FF41]" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 px-2 hover:bg-[#00FF41]/10">
                            <RefreshCw className="h-3 w-3 text-[#00FF41]" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-[#1A1F26] border-l-4 border-[#00FF41] rounded-lg p-4">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-[#00FF41] rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-[#00FF41] rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                        <div className="w-2 h-2 bg-[#00FF41] rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask about soil health, vegetation trends..."
                  className="flex-1 border-[#00FF41]/50 focus:border-[#00FF41] focus:shadow-[0_0_20px_rgba(0,255,65,0.5)]"
                />
                <Button 
                  onClick={handleSend}
                  className="bg-[#00FF41] text-black hover:bg-[#39FF14] hover:shadow-[0_0_30px_rgba(0,255,65,0.7)]"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AIInsights;
