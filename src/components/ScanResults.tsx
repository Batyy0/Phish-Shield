import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Globe,
  Lock,
  Eye,
  FileText,
  RotateCcw
} from "lucide-react";
import { ScanResult } from "./UrlScanner";

interface ScanResultsProps {
  result: ScanResult;
  onNewScan: () => void;
}

const ScanResults = ({ result, onNewScan }: ScanResultsProps) => {
  const getVerdictIcon = (verdict: string) => {
    switch (verdict) {
      case 'Safe':
        return <CheckCircle className="h-5 w-5 text-safe" />;
      case 'Phishing':
        return <XCircle className="h-5 w-5 text-destructive" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-warning" />;
    }
  };

  const getVerdictColor = (verdict: string) => {
    switch (verdict) {
      case 'Safe':
        return 'safe';
      case 'Phishing':
        return 'destructive';
      default:
        return 'warning';
    }
  };

  const getRuleIcon = (triggered: boolean) => {
    return triggered ? (
      <XCircle className="h-4 w-4 text-destructive" />
    ) : (
      <CheckCircle className="h-4 w-4 text-safe" />
    );
  };

  return (
    <div className="space-y-6">
      {/* Final Verdict */}
      <Card className={`${result.finalVerdict === 'Safe' ? 'safe-glow' : 'danger-glow'} border-2`}>
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center space-x-2 text-2xl">
            {getVerdictIcon(result.finalVerdict)}
            <span>{result.finalVerdict}</span>
          </CardTitle>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground break-all">
              <Globe className="h-4 w-4 inline mr-1" />
              {result.url}
            </p>
            <div className="flex items-center justify-center space-x-2">
              <span className="text-sm">Confidence:</span>
              <Progress value={result.confidenceScore} className="w-24" />
              <span className="text-sm font-medium">{result.confidenceScore}%</span>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Rule-Based Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-primary" />
            <span>Rule-Based Security Checks</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start space-x-3">
            {getRuleIcon(result.ruleBasedChecks.urlLength.triggered)}
            <div className="flex-1">
              <p className="font-medium">URL Length Analysis</p>
              <p className="text-sm text-muted-foreground">{result.ruleBasedChecks.urlLength.message}</p>
            </div>
            <Badge variant={result.ruleBasedChecks.urlLength.triggered ? 'destructive' : 'secondary'}>
              {result.ruleBasedChecks.urlLength.triggered ? 'Risk' : 'OK'}
            </Badge>
          </div>

          <div className="flex items-start space-x-3">
            {getRuleIcon(result.ruleBasedChecks.httpsCheck.triggered)}
            <div className="flex-1">
              <p className="font-medium">HTTPS Protocol Check</p>
              <p className="text-sm text-muted-foreground">{result.ruleBasedChecks.httpsCheck.message}</p>
            </div>
            <Badge variant={result.ruleBasedChecks.httpsCheck.triggered ? 'destructive' : 'secondary'}>
              {result.ruleBasedChecks.httpsCheck.triggered ? 'Risk' : 'OK'}
            </Badge>
          </div>

          <div className="flex items-start space-x-3">
            {getRuleIcon(result.ruleBasedChecks.suspiciousChars.triggered)}
            <div className="flex-1">
              <p className="font-medium">Character Analysis</p>
              <p className="text-sm text-muted-foreground">{result.ruleBasedChecks.suspiciousChars.message}</p>
            </div>
            <Badge variant={result.ruleBasedChecks.suspiciousChars.triggered ? 'destructive' : 'secondary'}>
              {result.ruleBasedChecks.suspiciousChars.triggered ? 'Risk' : 'OK'}
            </Badge>
          </div>

          <div className="flex items-start space-x-3">
            {getRuleIcon(result.ruleBasedChecks.suspiciousKeywords.triggered)}
            <div className="flex-1">
              <p className="font-medium">Keyword Analysis</p>
              <p className="text-sm text-muted-foreground">{result.ruleBasedChecks.suspiciousKeywords.message}</p>
            </div>
            <Badge variant={result.ruleBasedChecks.suspiciousKeywords.triggered ? 'destructive' : 'secondary'}>
              {result.ruleBasedChecks.suspiciousKeywords.triggered ? 'Risk' : 'OK'}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* VirusTotal Results */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-primary" />
            <span>Threat Intelligence Analysis</span>
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Results from threat intelligence database (VirusTotal simulation)
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-destructive">{result.virusTotalResult.malicious}</div>
              <div className="text-sm text-muted-foreground">Malicious</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-warning">{result.virusTotalResult.suspicious}</div>
              <div className="text-sm text-muted-foreground">Suspicious</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-safe">{result.virusTotalResult.harmless}</div>
              <div className="text-sm text-muted-foreground">Harmless</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-muted-foreground">{result.virusTotalResult.undetected}</div>
              <div className="text-sm text-muted-foreground">Undetected</div>
            </div>
          </div>
          
          <div className="flex items-center justify-center space-x-2">
            <Eye className="h-4 w-4" />
            <span className="font-medium">Verdict:</span>
            <Badge variant={getVerdictColor(result.virusTotalResult.verdict) as any}>
              {result.virusTotalResult.verdict}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Scan Metadata */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>Scanned: {new Date(result.timestamp).toLocaleString()}</span>
            </div>
            <Button onClick={onNewScan} variant="outline" size="sm" className="cyber-glow">
              <RotateCcw className="h-4 w-4 mr-2" />
              New Scan
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScanResults;