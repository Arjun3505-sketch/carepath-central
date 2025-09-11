import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Stethoscope, Calendar, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Diagnosis {
  id: string;
  patient_id: string;
  doctor_id: string;
  date: string;
  condition: string;
  icd10_code: string | null;
  severity: string | null;
  status: string | null;
  clinical_notes: string | null;
  created_at: string;
}

const Diagnoses = () => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchDiagnoses();
  }, []);

  const fetchDiagnoses = async () => {
    try {
      const { data, error } = await supabase
        .from('diagnoses')
        .select('*')
        .order('date', { ascending: false });

      if (error) throw error;
      setDiagnoses(data || []);
    } catch (error) {
      console.error('Error fetching diagnoses:', error);
      toast({
        title: "Error",
        description: "Failed to fetch diagnoses",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getSeverityBadge = (severity: string | null) => {
    if (!severity) return null;
    
    switch (severity.toLowerCase()) {
      case 'mild':
        return <Badge variant="secondary">Mild</Badge>;
      case 'moderate':
        return <Badge variant="default">Moderate</Badge>;
      case 'severe':
        return <Badge variant="destructive">Severe</Badge>;
      default:
        return <Badge variant="outline">{severity}</Badge>;
    }
  };

  const getStatusBadge = (status: string | null) => {
    if (!status) return null;

    switch (status.toLowerCase()) {
      case 'confirmed':
        return (
          <Badge variant="default">
            <CheckCircle className="w-3 h-3 mr-1" />
            Confirmed
          </Badge>
        );
      case 'provisional':
        return (
          <Badge variant="secondary">
            <Clock className="w-3 h-3 mr-1" />
            Provisional
          </Badge>
        );
      case 'chronic':
        return (
          <Badge variant="outline">
            <AlertTriangle className="w-3 h-3 mr-1" />
            Chronic
          </Badge>
        );
      case 'resolved':
        return (
          <Badge variant="default">
            <CheckCircle className="w-3 h-3 mr-1" />
            Resolved
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Stethoscope className="w-5 h-5" />
            Diagnoses
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-8">
            <div className="text-muted-foreground">Loading diagnoses...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Stethoscope className="w-5 h-5" />
          Diagnoses ({diagnoses.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {diagnoses.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No diagnoses found
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Condition</TableHead>
                  <TableHead>ICD-10</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Clinical Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {diagnoses.map((diagnosis) => (
                  <TableRow key={diagnosis.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        {formatDate(diagnosis.date)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{diagnosis.condition}</div>
                    </TableCell>
                    <TableCell>
                      {diagnosis.icd10_code ? (
                        <code className="text-xs bg-muted px-1 py-0.5 rounded">
                          {diagnosis.icd10_code}
                        </code>
                      ) : (
                        <span className="text-muted-foreground text-sm">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {getSeverityBadge(diagnosis.severity)}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(diagnosis.status)}
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs truncate text-sm">
                        {diagnosis.clinical_notes || "No notes"}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Diagnoses;