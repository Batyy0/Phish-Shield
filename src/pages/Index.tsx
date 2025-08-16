import { useState } from "react";
import Header from "@/components/Header";
import UrlScanner from "@/components/UrlScanner";
import ScanResults from "@/components/ScanResults";
import { ScanResult } from "@/components/UrlScanner";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Globe, BookOpen, Users } from "lucide-react";

const Index = () => {
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);

  const handleScanComplete = (result: ScanResult) => {
    setScanResult(result);
  };

  const handleNewScan = () => {
    setScanResult(null);
  };

  const stats = [
    { label: "Phishing Sites Detected", value: "10M+", icon: <Shield className="h-5 w-5 text-destructive" /> },
    { label: "URLs Analyzed", value: "50M+", icon: <Globe className="h-5 w-5 text-primary" /> },
    { label: "Students Educated", value: "5K+", icon: <Users className="h-5 w-5 text-safe" /> },
    { label: "Academic Papers", value: "100+", icon: <BookOpen className="h-5 w-5 text-warning" /> },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {!scanResult ? (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="text-center space-y-4 py-8">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Shield className="h-12 w-12 text-primary animate-pulse-glow" />
                <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-cyber-blue bg-clip-text text-transparent">
                  PhishShield
                </h1>
              </div>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Advanced phishing detection engine for cybersecurity education and research
              </p>
              <div className="flex items-center justify-center space-x-4 pt-4">
                <Badge variant="outline" className="text-sm">
                  Rule-Based Analysis
                </Badge>
                <Badge variant="outline" className="text-sm">
                  Threat Intelligence
                </Badge>
                <Badge variant="outline" className="text-sm">
                  Academic Research
                </Badge>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {stats.map((stat, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-center mb-2">
                      {stat.icon}
                    </div>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Scanner */}
            <UrlScanner onScanComplete={handleScanComplete} />

            {/* Features Overview */}
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <Card>
                <CardContent className="pt-6 text-center">
                  <Shield className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Multi-Layer Detection</h3>
                  <p className="text-sm text-muted-foreground">
                    Combines rule-based analysis with threat intelligence for comprehensive phishing detection
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6 text-center">
                  <BookOpen className="h-8 w-8 text-safe mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Educational Focus</h3>
                  <p className="text-sm text-muted-foreground">
                    Designed for cybersecurity students and researchers with detailed explanations
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6 text-center">
                  <Globe className="h-8 w-8 text-warning mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Real-Time Analysis</h3>
                  <p className="text-sm text-muted-foreground">
                    Instant URL scanning with detailed security reports and recommendations
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <ScanResults result={scanResult} onNewScan={handleNewScan} />
        )}
      </main>
    </div>
  );
};

export default Index;
