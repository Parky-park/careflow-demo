import { Button } from "@/components/ui/button";
import { ArrowRight, Activity, Users, BarChart3, Shield, Clock, HeartPulse } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Redirect to dashboard if already logged in
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Header */}
      <header className="border-b border-border/40 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">CareFlow</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate("/login")}>
              Sign In
            </Button>
            <Button onClick={() => navigate("/signup")}>
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent border border-accent/20">
            <HeartPulse className="h-4 w-4" />
            <span className="text-sm font-medium">FHIR-Based Healthcare Management</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
            Integrated Care
            <span className="block text-primary mt-2">Powered by AI</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real-time patient monitoring, predictive analytics, and seamless care coordination 
            in one powerful platform built on the MoV software system.
          </p>
          
          <div className="flex items-center justify-center gap-4 pt-4">
            <Button size="lg" onClick={() => navigate("/signup")} className="h-12 px-8">
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate("/login")} className="h-12 px-8">
              Sign In
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-12 max-w-2xl mx-auto">
            <div className="space-y-1">
              <div className="text-3xl font-bold text-primary">98%</div>
              <div className="text-sm text-muted-foreground">Accuracy Rate</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-bold text-accent">24/7</div>
              <div className="text-sm text-muted-foreground">Monitoring</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-bold text-medical-orange">50K+</div>
              <div className="text-sm text-muted-foreground">Patients</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-6 py-20 bg-card/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything You Need for Modern Healthcare
            </h2>
            <p className="text-lg text-muted-foreground">
              Comprehensive tools designed for integrated care management
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card border border-border rounded-lg p-8 space-y-4 hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Activity className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Real-Time Monitoring</h3>
              <p className="text-muted-foreground">
                Track patient vitals, ADT feeds, and clinical events in real-time with instant alerts.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-8 space-y-4 hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Predictive Analytics</h3>
              <p className="text-muted-foreground">
                AI-powered insights to identify high-risk patients and optimize resource allocation.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-8 space-y-4 hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 rounded-lg bg-medical-orange/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-medical-orange" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Care Coordination</h3>
              <p className="text-muted-foreground">
                Seamlessly manage care teams, medical homes, and hot-spotter programs.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-8 space-y-4 hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 rounded-lg bg-success/10 flex items-center justify-center">
                <Shield className="h-6 w-6 text-success" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">FHIR Integration</h3>
              <p className="text-muted-foreground">
                Full FHIR compliance with secure data exchange and interoperability.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-8 space-y-4 hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Pharmacy AI</h3>
              <p className="text-muted-foreground">
                AI-driven prescription processing with OCR and RAG technology.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-8 space-y-4 hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
                <HeartPulse className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Hot-Spotter Teams</h3>
              <p className="text-muted-foreground">
                Identify and support high-utilizer patients with targeted interventions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-12 text-center text-primary-foreground">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Care Delivery?
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Join healthcare organizations using CareFlow to improve patient outcomes and reduce costs.
          </p>
          <Button 
            size="lg" 
            variant="secondary" 
            onClick={() => navigate("/signup")}
            className="h-12 px-8"
          >
            Get Started Today
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-card/50">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="h-6 w-6 text-primary" />
              <span className="text-lg font-semibold text-foreground">CareFlow</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2024 CareFlow. Built on MoV software system.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
