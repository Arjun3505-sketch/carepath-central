import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Syringe, Calendar, AlertCircle, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Vaccination {
  id: string;
  patient_id: string;
  doctor_id: string;
  vaccine_name: string;
  administered_date: string;
  dose_number: number | null;
  total_doses: number | null;
  next_dose_due: string | null;
  batch_number: string | null;
  reaction_notes: string | null;
  created_at: string;
}

const Vaccinations = () => {
  const [vaccinations, setVaccinations] = useState<Vaccination[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchVaccinations();
  }, []);

  const fetchVaccinations = async () => {
    try {
      const { data, error } = await supabase
        .from('vaccinations')
        .select('*')
        .order('administered_date', { ascending: false });

      if (error) throw error;
      setVaccinations(data || []);
    } catch (error) {
      console.error('Error fetching vaccinations:', error);
      toast({
        title: "Error",
        description: "Failed to fetch vaccinations",
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

  const getNextDoseBadge = (nextDoseDate: string | null) => {
    if (!nextDoseDate) return null;
    
    const dueDate = new Date(nextDoseDate);
    const today = new Date();
    const isOverdue = dueDate < today;
    const isDueSoon = dueDate <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // Within 30 days

    if (isOverdue) {
      return (
        <Badge variant="destructive">
          <AlertCircle className="w-3 h-3 mr-1" />
          Overdue
        </Badge>
      );
    } else if (isDueSoon) {
      return (
        <Badge variant="secondary">
          <Clock className="w-3 h-3 mr-1" />
          Due Soon
        </Badge>
      );
    } else {
      return (
        <Badge variant="outline">
          Scheduled
        </Badge>
      );
    }
  };

  const getDoseProgress = (doseNumber: number | null, totalDoses: number | null) => {
    if (!doseNumber || !totalDoses) return null;
    
    const isComplete = doseNumber >= totalDoses;
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm">{doseNumber}/{totalDoses}</span>
        {isComplete && (
          <Badge variant="default" className="text-xs">
            Complete
          </Badge>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Syringe className="w-5 h-5" />
            Vaccinations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-8">
            <div className="text-muted-foreground">Loading vaccinations...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Syringe className="w-5 h-5" />
          Vaccinations ({vaccinations.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {vaccinations.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No vaccinations found
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Vaccine</TableHead>
                  <TableHead>Dose Progress</TableHead>
                  <TableHead>Next Dose</TableHead>
                  <TableHead>Batch</TableHead>
                  <TableHead>Reaction Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vaccinations.map((vaccination) => (
                  <TableRow key={vaccination.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        {formatDate(vaccination.administered_date)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{vaccination.vaccine_name}</div>
                    </TableCell>
                    <TableCell>
                      {getDoseProgress(vaccination.dose_number, vaccination.total_doses)}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        {vaccination.next_dose_due && (
                          <>
                            <div className="text-sm">
                              {formatDate(vaccination.next_dose_due)}
                            </div>
                            {getNextDoseBadge(vaccination.next_dose_due)}
                          </>
                        )}
                        {!vaccination.next_dose_due && (
                          <span className="text-muted-foreground text-sm">No next dose</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {vaccination.batch_number ? (
                        <code className="text-xs bg-muted px-1 py-0.5 rounded">
                          {vaccination.batch_number}
                        </code>
                      ) : (
                        <span className="text-muted-foreground text-sm">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs truncate text-sm">
                        {vaccination.reaction_notes || "No reaction"}
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

export default Vaccinations;