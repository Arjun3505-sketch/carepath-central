import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Heart, Pill, Calendar, FileText, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const PatientDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [patients, setPatients] = useState([]);
  const [diagnoses, setDiagnoses] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [labReports, setLabReports] = useState([]);
  const [vaccinations, setVaccinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPatientData();
  }, []);

  const fetchPatientData = async () => {
    try {
      // Fetch all patient data
      const [patientsRes, diagnosesRes, prescriptionsRes, labReportsRes, vaccinationsRes] = await Promise.all([
        supabase.from('patients').select('*').limit(1),
        supabase.from('diagnoses').select('*').order('date', { ascending: false }).limit(5),
        supabase.from('prescriptions').select('*').order('issue_date', { ascending: false }).limit(5),
        supabase.from('lab_reports').select('*').order('date', { ascending: false }).limit(5),
        supabase.from('vaccinations').select('*').order('administered_date', { ascending: false }).limit(5)
      ]);

      setPatients(patientsRes.data || []);
      setDiagnoses(diagnosesRes.data || []);
      setPrescriptions(prescriptionsRes.data || []);
      setLabReports(labReportsRes.data || []);
      setVaccinations(vaccinationsRes.data || []);
    } catch (error) {
      console.error('Error fetching patient data:', error);
      toast({
        title: "Error",
        description: "Failed to fetch patient data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const currentPatient = patients[0] || {};
  const latestDiagnosis = diagnoses[0] || {};

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Patient Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {currentPatient.name || 'Patient'}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate("/patient-profile")}>
            <User className="w-4 h-4 mr-2" />
            Profile
          </Button>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {/* Personal Health Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-4 text-muted-foreground">Loading...</div>
            ) : (
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Name:</span>
                  <span className="font-medium">{currentPatient.name || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Blood Group:</span>
                  <Badge variant="outline">{currentPatient.blood_group || 'N/A'}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email:</span>
                  <span className="font-medium text-sm">{currentPatient.email || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Phone:</span>
                  <span className="font-medium text-sm">{currentPatient.phone || 'N/A'}</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-5 h-5" />
              Latest Diagnosis
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-4 text-muted-foreground">Loading...</div>
            ) : latestDiagnosis.id ? (
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date:</span>
                  <span className="font-medium">{formatDate(latestDiagnosis.date)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Condition:</span>
                  <Badge variant="secondary">{latestDiagnosis.condition}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Severity:</span>
                  <Badge variant={latestDiagnosis.severity === 'severe' ? 'destructive' : 'outline'}>
                    {latestDiagnosis.severity || 'Not specified'}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {latestDiagnosis.clinical_notes || 'No notes available'}
                </p>
              </div>
            ) : (
              <div className="text-center py-4 text-muted-foreground">No diagnoses found</div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Pill className="w-5 h-5" />
              Recent Prescriptions ({prescriptions.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-4 text-muted-foreground">Loading...</div>
            ) : prescriptions.length === 0 ? (
              <div className="text-center py-4 text-muted-foreground">No prescriptions found</div>
            ) : (
              <div className="space-y-3">
                {prescriptions.slice(0, 3).map((prescription) => (
                  <div key={prescription.id} className="p-3 border rounded-lg">
                    <p className="font-medium">Prescription</p>
                    <p className="text-sm text-muted-foreground">
                      {prescription.instructions || 'No instructions'}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Valid until: {prescription.valid_until ? formatDate(prescription.valid_until) : 'No expiry'}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Lab Reports and Vaccinations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Recent Lab Reports ({labReports.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-4 text-muted-foreground">Loading...</div>
            ) : labReports.length === 0 ? (
              <div className="text-center py-4 text-muted-foreground">No lab reports found</div>
            ) : (
              <div className="space-y-3">
                {labReports.map((report) => (
                  <div key={report.id} className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{report.report_type}</p>
                      <p className="text-sm text-muted-foreground">{formatDate(report.date)}</p>
                    </div>
                    <Badge variant={report.tags?.urgent ? "destructive" : "secondary"}>
                      {report.tags?.urgent ? "Urgent" : "Normal"}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Recent Vaccinations ({vaccinations.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-4 text-muted-foreground">Loading...</div>
            ) : vaccinations.length === 0 ? (
              <div className="text-center py-4 text-muted-foreground">No vaccinations found</div>
            ) : (
              <div className="space-y-3">
                {vaccinations.map((vaccination) => (
                  <div key={vaccination.id} className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{vaccination.vaccine_name}</p>
                      <p className="text-sm text-muted-foreground">
                        Dose {vaccination.dose_number}/{vaccination.total_doses}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{formatDate(vaccination.administered_date)}</p>
                      {vaccination.next_dose_due && (
                        <p className="text-xs text-muted-foreground">
                          Next: {formatDate(vaccination.next_dose_due)}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PatientDashboard;