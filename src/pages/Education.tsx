import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  AlertTriangle, 
  Shield, 
  Eye, 
  ExternalLink,
  Lock,
  Mail,
  Globe,
  FileText,
  Users,
  Target
} from "lucide-react";
import Header from "@/components/Header";

const Education = () => {
  const phishingRedFlags = [
    {
      icon: <Mail className="h-5 w-5 text-warning" />,
      title: "Suspicious Sender",
      description: "Emails from unknown senders or addresses that don't match the claimed organization"
    },
    {
      icon: <Target className="h-5 w-5 text-destructive" />,
      title: "Urgent Language",
      description: "Messages claiming 'immediate action required' or threatening account suspension"
    },
    {
      icon: <Globe className="h-5 w-5 text-warning" />,
      title: "Suspicious URLs",
      description: "Links that don't match the legitimate organization's domain or use URL shorteners"
    },
    {
      icon: <FileText className="h-5 w-5 text-destructive" />,
      title: "Poor Grammar",
      description: "Spelling mistakes, grammar errors, or unprofessional formatting"
    },
    {
      icon: <Lock className="h-5 w-5 text-warning" />,
      title: "Requests for Credentials",
      description: "Asking for passwords, PINs, or personal information via email or suspicious forms"
    },
    {
      icon: <Eye className="h-5 w-5 text-destructive" />,
      title: "Generic Greetings",
      description: "Using 'Dear Customer' instead of your actual name when they should know it"
    }
  ];

  const safeBrowsingTips = [
    {
      title: "Verify URLs Before Clicking",
      description: "Hover over links to see the actual destination before clicking",
      priority: "high"
    },
    {
      title: "Check for HTTPS",
      description: "Look for the lock icon and 'https://' in the address bar",
      priority: "high"
    },
    {
      title: "Type URLs Manually",
      description: "When in doubt, type the website address directly into your browser",
      priority: "medium"
    },
    {
      title: "Use Two-Factor Authentication",
      description: "Enable 2FA on all important accounts for extra security",
      priority: "high"
    },
    {
      title: "Keep Software Updated",
      description: "Regular updates include security patches that protect against threats",
      priority: "medium"
    },
    {
      title: "Use Antivirus Software",
      description: "Keep real-time protection enabled and scan regularly",
      priority: "medium"
    }
  ];

  const trustedResources = [
    {
      name: "PhishTank",
      description: "Community-driven database of known phishing URLs",
      url: "https://phishtank.org/",
      type: "Database"
    },
    {
      name: "Google Safe Browsing",
      description: "Google's service to identify dangerous websites",
      url: "https://safebrowsing.google.com/",
      type: "Scanner"
    },
    {
      name: "VirusTotal",
      description: "Multi-engine malware and URL analysis service",
      url: "https://virustotal.com/",
      type: "Scanner"
    },
    {
      name: "NIST Cybersecurity Framework",
      description: "Comprehensive cybersecurity guidelines and best practices",
      url: "https://nist.gov/cyberframework",
      type: "Guidelines"
    },
    {
      name: "SANS Institute",
      description: "Leading cybersecurity education and training resources",
      url: "https://sans.org/",
      type: "Education"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'destructive';
      case 'medium':
        return 'warning';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-cyber-blue bg-clip-text text-transparent">
            Cybersecurity Education Hub
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Learn to identify and defend against phishing attacks. Knowledge is your best defense in cybersecurity.
          </p>
        </div>

        {/* What is Phishing */}
        <Card className="cyber-glow">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-2xl">
              <BookOpen className="h-6 w-6 text-primary" />
              <span>What is Phishing?</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none dark:prose-invert">
            <p className="text-base leading-relaxed">
              <strong>Phishing</strong> is a cyber attack where criminals impersonate legitimate organizations 
              to steal sensitive information like passwords, credit card numbers, or personal data. 
              Attackers typically use deceptive emails, websites, or messages that appear to come from 
              trusted sources like banks, social media platforms, or government agencies.
            </p>
            <p className="text-base leading-relaxed mt-4">
              The goal is to trick victims into revealing confidential information or downloading malware. 
              Phishing attacks have become increasingly sophisticated, making it crucial to understand 
              how to identify and avoid them.
            </p>
          </CardContent>
        </Card>

        {/* Red Flags */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-2xl">
              <AlertTriangle className="h-6 w-6 text-warning" />
              <span>Phishing Red Flags</span>
            </CardTitle>
            <p className="text-muted-foreground">
              Learn to spot these common warning signs of phishing attempts
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {phishingRedFlags.map((flag, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 border rounded-lg">
                  {flag.icon}
                  <div>
                    <h3 className="font-semibold mb-1">{flag.title}</h3>
                    <p className="text-sm text-muted-foreground">{flag.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Safe Browsing Tips */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-2xl">
              <Shield className="h-6 w-6 text-safe" />
              <span>Safe Browsing Best Practices</span>
            </CardTitle>
            <p className="text-muted-foreground">
              Essential practices to protect yourself while browsing the internet
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {safeBrowsingTips.map((tip, index) => (
                <div key={index} className="flex items-start justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{tip.title}</h3>
                    <p className="text-sm text-muted-foreground">{tip.description}</p>
                  </div>
                  <Badge variant={getPriorityColor(tip.priority) as any} className="ml-4">
                    {tip.priority}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Trusted Resources */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-2xl">
              <Users className="h-6 w-6 text-primary" />
              <span>Trusted Security Resources</span>
            </CardTitle>
            <p className="text-muted-foreground">
              Recommended tools and websites for cybersecurity research and protection
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {trustedResources.map((resource, index) => (
                <div key={index} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{resource.name}</h3>
                    <Badge variant="outline">{resource.type}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{resource.description}</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => window.open(resource.url, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Visit Resource
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Academic Note */}
        <Card className="bg-muted/50">
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <h3 className="font-semibold text-lg">For Academic Study</h3>
              <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                This educational tool was developed for cybersecurity studies in Nigeria. 
                It demonstrates practical phishing detection techniques and serves as a 
                foundation for understanding web security principles. Always use knowledge 
                ethically and responsibly.
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Education;