import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Satellite, Brain, Sprout, TrendingUp, ArrowRight, Leaf, Activity, Database, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Index = () => {
  const [animatedStats, setAnimatedStats] = useState({ hectares: 0, communities: 0, carbon: 0 });

  useEffect(() => {
    const animateStats = () => {
      const duration = 2000;
      const steps = 60;
      const interval = duration / steps;
      let step = 0;

      const timer = setInterval(() => {
        step++;
        const progress = step / steps;
        setAnimatedStats({
          hectares: Math.floor(1000000 * progress),
          communities: Math.floor(500 * progress),
          carbon: Math.floor(2000000 * progress),
        });

        if (step >= steps) clearInterval(timer);
      }, interval);
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        animateStats();
        observer.disconnect();
      }
    });

    const statsElement = document.getElementById('stats-section');
    if (statsElement) observer.observe(statsElement);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-hero min-h-screen flex items-center">
        {/* Organic Pattern Background */}
        <div className="absolute inset-0 organic-pattern opacity-50"></div>
        
        {/* Floating Leaves */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-primary/30 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${6 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        <div className="container relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 text-foreground animate-fade-in">
            Smart Farming for a <span className="text-primary">Sustainable Future</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-muted-foreground max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Monitor land health, optimize crops, and build resilient farms with AI-powered insights
          </p>

          {/* Key Features Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
            <div className="farm-card p-6 rounded-xl animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <Satellite className="w-12 h-12 text-primary mx-auto mb-3" />
              <h3 className="text-lg font-heading font-semibold text-foreground mb-2">Satellite Monitoring</h3>
              <p className="text-sm text-muted-foreground">Real-time field health data</p>
            </div>
            <div className="farm-card p-6 rounded-xl animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <Brain className="w-12 h-12 text-secondary mx-auto mb-3" />
              <h3 className="text-lg font-heading font-semibold text-foreground mb-2">AI Recommendations</h3>
              <p className="text-sm text-muted-foreground">Personalized farming advice</p>
            </div>
            <div className="farm-card p-6 rounded-xl animate-fade-in" style={{ animationDelay: '0.8s' }}>
              <Sprout className="w-12 h-12 text-success mx-auto mb-3" />
              <h3 className="text-lg font-heading font-semibold text-foreground mb-2">Regeneration Plans</h3>
              <p className="text-sm text-muted-foreground">Sustainable farming practices</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '1s' }}>
            <Button asChild size="lg" className="text-lg">
              <Link to="/dashboard">
                Launch Dashboard <ArrowRight className="ml-2" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg">
              <Link to="/ai-insights">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Showcase */}
      <section className="py-20 bg-card">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Feature 1 */}
            <Card className="border-border hover:border-primary/50 transition-all hover:-translate-y-2 shadow-soft hover:shadow-medium">
              <CardHeader>
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Activity className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-2xl font-heading text-foreground">Farm Health Dashboard</CardTitle>
                <CardDescription className="text-base">
                  Real-time vegetation cover (NDVI), soil moisture, and crop health tracking via satellite data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-48 bg-background rounded-xl flex items-center justify-center border border-border">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full border-4 border-primary/30 flex items-center justify-center animate-grow">
                      <span className="text-3xl font-heading text-primary">68%</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Live Health Score</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card className="border-border hover:border-secondary/50 transition-all hover:-translate-y-2 shadow-soft hover:shadow-medium">
              <CardHeader>
                <div className="w-16 h-16 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
                  <Brain className="w-8 h-8 text-secondary" />
                </div>
                <CardTitle className="text-2xl font-heading text-foreground">Early Warning System</CardTitle>
                <CardDescription className="text-base">
                  Time-series analysis to detect soil depletion, pest risks, and water stress before they impact your crops
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-48 bg-background rounded-xl flex items-center justify-center border border-border relative overflow-hidden">
                  <div className="relative z-10 text-center">
                    <p className="text-primary font-medium text-sm mb-2">Analyzing field conditions...</p>
                    <div className="flex gap-2 justify-center">
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card className="border-border hover:border-success/50 transition-all hover:-translate-y-2 shadow-soft hover:shadow-medium">
              <CardHeader>
                <div className="w-16 h-16 rounded-xl bg-success/10 flex items-center justify-center mb-4">
                  <Leaf className="w-8 h-8 text-success" />
                </div>
                <CardTitle className="text-2xl font-heading text-foreground">Personalized Recommendations</CardTitle>
                <CardDescription className="text-base">
                  Tailored advice including crop rotation, organic fertilizers, and water management for your specific conditions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {['Use cover crops for soil health', 'Implement drip irrigation', 'Rotate legumes for nitrogen'].map((rec, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-background rounded-lg border border-border">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <span className="text-sm text-foreground">{rec}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Feature 4 */}
            <Card className="border-border hover:border-primary/50 transition-all hover:-translate-y-2 shadow-soft hover:shadow-medium">
              <CardHeader>
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <TrendingUp className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-2xl font-heading text-foreground">Yield Prediction</CardTitle>
                <CardDescription className="text-base">
                  Forecast crop yields, soil improvement, and potential carbon credits before making decisions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-48 bg-background rounded-xl flex items-center justify-center border border-border">
                  <div className="text-center space-y-4">
                    <div className="flex justify-around gap-8">
                      <div>
                        <p className="text-2xl font-bold text-destructive">42</p>
                        <p className="text-xs text-muted-foreground">Before</p>
                      </div>
                      <ArrowRight className="text-primary self-center" />
                      <div>
                        <p className="text-2xl font-bold text-success">73</p>
                        <p className="text-xs text-muted-foreground">After</p>
                      </div>
                    </div>
                    <p className="text-sm text-primary font-medium">+31% Improvement</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats-section" className="py-20 gradient-earth">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="farm-card p-8 rounded-xl">
              <Database className="w-12 h-12 text-primary mx-auto mb-4" />
              <p className="text-4xl font-heading font-bold text-primary mb-2">
                {animatedStats.hectares.toLocaleString()}+
              </p>
              <p className="text-muted-foreground">Hectares Monitored</p>
            </div>
            <div className="farm-card p-8 rounded-xl">
              <Users className="w-12 h-12 text-secondary mx-auto mb-4" />
              <p className="text-4xl font-heading font-bold text-secondary mb-2">
                {animatedStats.communities.toLocaleString()}+
              </p>
              <p className="text-muted-foreground">Farmers Supported</p>
            </div>
            <div className="farm-card p-8 rounded-xl">
              <Leaf className="w-12 h-12 text-success mx-auto mb-4" />
              <p className="text-4xl font-heading font-bold text-success mb-2">
                {animatedStats.carbon.toLocaleString()}
              </p>
              <p className="text-muted-foreground">Tons CO₂ Sequestered</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 text-center bg-card">
        <div className="container">
          <p className="text-sm text-primary mb-4 font-medium">Growing Together for Tomorrow</p>
          <h2 className="mb-4 text-3xl md:text-5xl font-heading font-bold text-foreground">
            Ready to Transform Your <span className="text-primary">Farm?</span>
          </h2>
          <p className="mb-8 text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of farmers using smart insights for sustainable, profitable farming
          </p>
          <Button asChild size="lg" className="text-lg">
            <Link to="/dashboard">
              Get Started Today <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
