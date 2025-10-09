import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart3, Brain, Users, ArrowRight, Sparkles } from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: BarChart3,
      title: "Real-Time Monitoring",
      description: "Track soil health and vegetation with live data analytics and customizable dashboards",
    },
    {
      icon: Brain,
      title: "AI Predictions",
      description: "Leverage machine learning to predict degradation patterns and optimize restoration efforts",
    },
    {
      icon: Users,
      title: "Community Impact",
      description: "Join a global movement with gamified tracking, badges, and collaborative restoration projects",
    },
  ];

  const stats = [
    { value: "1M+", label: "Hectares Monitored" },
    { value: "500K+", label: "Data Points Daily" },
    { value: "98%", label: "Prediction Accuracy" },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-hero py-24 md:py-32">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-64 h-64 bg-primary-foreground rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm px-4 py-2 rounded-full border border-primary-foreground/20">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
              <span className="text-sm text-primary-foreground font-medium">
                Built for LandReGen Hackathon
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-tight">
              AI-Powered Insights for a Greener Planet
            </h1>

            <p className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto">
              Monitor land health, predict degradation, and drive restoration with real-time AI analytics
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link to="/dashboard">
                <Button size="lg" variant="secondary" className="group text-base px-8">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="text-base px-8 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center space-y-2">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-5xl font-bold">
              Powerful Features for Climate Action
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to monitor, predict, and restore degraded land
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group hover:shadow-glow transition-all duration-300 border-border hover:border-primary/50"
              >
                <CardContent className="p-6 space-y-4">
                  <div className="h-12 w-12 rounded-lg gradient-hero flex items-center justify-center group-hover:scale-110 transition-transform">
                    <feature.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-3">
              <h2 className="text-2xl md:text-4xl font-bold">
                Trusted by Environmental Leaders
              </h2>
              <p className="text-muted-foreground">
                Join farmers, NGOs, and scientists using TerraPulse
              </p>
            </div>
            
            {/* Partner Logos Placeholder */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-16 bg-muted rounded-lg flex items-center justify-center">
                  <span className="text-sm text-muted-foreground font-medium">Partner {i}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <Card className="gradient-sky border-0 shadow-glow">
            <CardContent className="p-12 text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-accent-foreground">
                Ready to Make an Impact?
              </h2>
              <p className="text-lg text-accent-foreground/90 max-w-2xl mx-auto">
                Start monitoring your land today and join the regeneration revolution
              </p>
              <Link to="/dashboard">
                <Button size="lg" variant="secondary" className="text-base px-8">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Index;
