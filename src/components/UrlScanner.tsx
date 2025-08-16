import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Search, AlertTriangle, Globe } from "lucide-react";
import { toast } from "sonner";

interface UrlScannerProps {
  onScanComplete: (result: ScanResult) => void;
}

export interface ScanResult {
  url: string;
  ruleBasedChecks: {
    urlLength: { triggered: boolean; message: string };
    httpsCheck: { triggered: boolean; message: string };
    suspiciousChars: { triggered: boolean; message: string };
    suspiciousKeywords: { triggered: boolean; message: string };
  };
  virusTotalResult: {
    malicious: number;
    suspicious: number;
    harmless: number;
    undetected: number;
    verdict: 'Safe' | 'Suspicious' | 'Malicious';
  };
  finalVerdict: 'Safe' | 'Phishing';
  confidenceScore: number;
  timestamp: string;
}

const UrlScanner = ({ onScanComplete }: UrlScannerProps) => {
  const [url, setUrl] = useState("");
  const [isScanning, setIsScanning] = useState(false);

  const performRuleBasedChecks = (urlToCheck: string): ScanResult['ruleBasedChecks'] => {
    const checks = {
      urlLength: {
        triggered: urlToCheck.length > 75,
        message: urlToCheck.length > 75 
          ? `URL is ${urlToCheck.length} characters (suspicious if > 75)`
          : "URL length is acceptable"
      },
      httpsCheck: {
        triggered: !urlToCheck.startsWith('https://'),
        message: urlToCheck.startsWith('https://') 
          ? "HTTPS protocol detected (secure)"
          : "Missing HTTPS protocol (insecure)"
      },
      suspiciousChars: {
        triggered: urlToCheck.includes('@'),
        message: urlToCheck.includes('@') 
          ? "Contains @ symbol (often used in phishing)"
          : "No suspicious characters detected"
      },
      suspiciousKeywords: {
        triggered: /\b(login|verify|bank|secure|update|account|suspend|urgent|click|immediate)\b/i.test(urlToCheck),
        message: /\b(login|verify|bank|secure|update|account|suspend|urgent|click|immediate)\b/i.test(urlToCheck)
          ? "Contains suspicious keywords commonly used in phishing"
          : "No suspicious keywords detected"
      }
    };

    return checks;
  };

  const mockVirusTotalCheck = (): ScanResult['virusTotalResult'] => {
    // Mock VirusTotal response for demonstration
    const responses = [
      { malicious: 0, suspicious: 0, harmless: 45, undetected: 5, verdict: 'Safe' as const },
      { malicious: 12, suspicious: 3, harmless: 30, undetected: 5, verdict: 'Malicious' as const },
      { malicious: 2, suspicious: 8, harmless: 35, undetected: 5, verdict: 'Suspicious' as const },
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const calculateFinalVerdict = (
    ruleChecks: ScanResult['ruleBasedChecks'], 
    vtResult: ScanResult['virusTotalResult']
  ): { verdict: 'Safe' | 'Phishing'; confidence: number } => {
    let riskScore = 0;
    let totalChecks = 0;

    // Rule-based scoring
    Object.values(ruleChecks).forEach(check => {
      totalChecks++;
      if (check.triggered) riskScore++;
    });

    // VirusTotal scoring
    if (vtResult.verdict === 'Malicious') riskScore += 3;
    else if (vtResult.verdict === 'Suspicious') riskScore += 2;
    
    const maxScore = totalChecks + 3;
    const riskPercentage = (riskScore / maxScore) * 100;
    
    const verdict = riskPercentage > 40 ? 'Phishing' : 'Safe';
    const confidence = verdict === 'Phishing' ? riskPercentage : 100 - riskPercentage;
    
    return { verdict, confidence: Math.round(confidence) };
  };

  const handleScan = async () => {
    if (!url.trim()) {
      toast.error("Please enter a URL to scan");
      return;
    }

    // Basic URL validation
    try {
      new URL(url.startsWith('http') ? url : `http://${url}`);
    } catch {
      toast.error("Please enter a valid URL");
      return;
    }

    setIsScanning(true);
    toast.info("Scanning URL for phishing indicators...");

    // Simulate scanning delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    const normalizedUrl = url.startsWith('http') ? url : `http://${url}`;
    const ruleChecks = performRuleBasedChecks(normalizedUrl);
    const vtResult = mockVirusTotalCheck();
    const { verdict, confidence } = calculateFinalVerdict(ruleChecks, vtResult);

    const result: ScanResult = {
      url: normalizedUrl,
      ruleBasedChecks: ruleChecks,
      virusTotalResult: vtResult,
      finalVerdict: verdict,
      confidenceScore: confidence,
      timestamp: new Date().toISOString()
    };

    setIsScanning(false);
    onScanComplete(result);
    
    if (verdict === 'Phishing') {
      toast.error("⚠️ Potential phishing URL detected!");
    } else {
      toast.success("✅ URL appears to be safe");
    }
  };

  return (
    <Card className="cyber-glow">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center space-x-2 text-2xl">
          <Globe className="h-6 w-6 text-primary" />
          <span>URL Phishing Scanner</span>
        </CardTitle>
        <p className="text-muted-foreground">
          Enter a URL to check for phishing indicators using rule-based analysis and threat intelligence
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex space-x-2">
          <Input
            placeholder="Enter URL (e.g., https://example.com)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1"
            onKeyPress={(e) => e.key === 'Enter' && handleScan()}
          />
          <Button 
            onClick={handleScan} 
            disabled={isScanning}
            className="cyber-glow"
          >
            {isScanning ? (
              <>
                <Shield className="h-4 w-4 mr-2 animate-spin" />
                Scanning...
              </>
            ) : (
              <>
                <Search className="h-4 w-4 mr-2" />
                Scan URL
              </>
            )}
          </Button>
        </div>

        <div className="bg-muted/50 p-4 rounded-lg">
          <div className="flex items-start space-x-2">
            <AlertTriangle className="h-5 w-5 text-warning mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-medium mb-1">Security Analysis Includes:</p>
              <ul className="text-muted-foreground space-y-1">
                <li>• URL length and structure analysis</li>
                <li>• HTTPS protocol verification</li>
                <li>• Suspicious character detection</li>
                <li>• Phishing keyword identification</li>
                <li>• Threat intelligence lookup (simulated)</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UrlScanner;