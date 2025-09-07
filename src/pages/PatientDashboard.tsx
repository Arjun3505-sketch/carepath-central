import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Heart, Pill, Calendar, FileText, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PatientDashboard = () => {
  const navigate = useNavigate();

  // Mock patient data - replace with actual data from Supabase
  const patientInfo = {
    name: "John Doe",
    age: 35,
    bloodGroup: "A+",
    email: "john.doe@email.com",
    phone: "+1234567890"
  };

  const latestDiagnosis = {
    date: "2024-01-05",
    condition: "Hypertension",
    doctor: "Dr. Smith",
    details: "Blood pressure monitoring required"
  };

  const activePrescriptions = [
    { id: 1, medication: "Lisinopril 10mg", dosage: "Once daily", expires: "2024-03-01" },
    { id: 2, medication: "Metformin 500mg", dosage: "Twice daily", expires: "2024-02-15" },
  ];

  const upcomingAppointments = [
    { id: 1, doctor: "Dr. Smith", date: "2024-01-10", time: "10:00 AM", type: "Follow-up" },
    { id: 2, doctor: "Dr. Johnson", date: "2024-01-15", time: "2:30 PM", type: "Cardiology" },
  ];

  const recentLabReports = [
    { id: 1, test: "Complete Blood Count", date: "2024-01-03", status: "Normal" },
    { id: 2, test: "Lipid Panel", date: "2023-12-28", status: "Abnormal" },
  ];

  const handleLogout = () => {
    // TODO: Implement actual logout with Supabase
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Patient Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {patientInfo.name}</p>
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
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Name:</span>
                <span className="font-medium">{patientInfo.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Age:</span>
                <span className="font-medium">{patientInfo.age}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Blood Group:</span>
                <Badge variant="outline">{patientInfo.bloodGroup}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Email:</span>
                <span className="font-medium text-sm">{patientInfo.email}</span>
              </div>
            </div>
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
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date:</span>
                <span className="font-medium">{latestDiagnosis.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Condition:</span>
                <Badge variant="secondary">{latestDiagnosis.condition}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Doctor:</span>
                <span className="font-medium">{latestDiagnosis.doctor}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">{latestDiagnosis.details}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Pill className="w-5 h-5" />
              Active Prescriptions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {activePrescriptions.map((prescription) => (
                <div key={prescription.id} className="p-3 border rounded-lg">
                  <p className="font-medium">{prescription.medication}</p>
                  <p className="text-sm text-muted-foreground">{prescription.dosage}</p>
                  <p className="text-xs text-muted-foreground">Expires: {prescription.expires}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Appointments and Lab Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Upcoming Appointments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{appointment.doctor}</p>
                    <p className="text-sm text-muted-foreground">{appointment.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{appointment.date}</p>
                    <p className="text-xs text-muted-foreground">{appointment.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Recent Lab Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentLabReports.map((report) => (
                <div key={report.id} className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{report.test}</p>
                    <p className="text-sm text-muted-foreground">{report.date}</p>
                  </div>
                  <Badge variant={report.status === "Normal" ? "secondary" : "destructive"}>
                    {report.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PatientDashboard;