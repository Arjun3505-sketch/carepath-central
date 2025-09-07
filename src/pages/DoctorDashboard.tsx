import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Stethoscope, Users, Calendar, FileText, Plus, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DoctorDashboard = () => {
  const navigate = useNavigate();

  // Mock data - replace with actual data from Supabase
  const recentPatients = [
    { id: 1, name: "John Doe", lastVisit: "2024-01-05", condition: "Hypertension" },
    { id: 2, name: "Jane Smith", lastVisit: "2024-01-04", condition: "Diabetes" },
    { id: 3, name: "Mike Johnson", lastVisit: "2024-01-03", condition: "Asthma" },
  ];

  const upcomingAppointments = [
    { id: 1, patient: "Alice Brown", time: "10:00 AM", date: "Today" },
    { id: 2, patient: "Bob Wilson", time: "2:30 PM", date: "Today" },
    { id: 3, patient: "Carol Davis", time: "9:00 AM", date: "Tomorrow" },
  ];

  const pendingTasks = [
    { id: 1, type: "Lab Report", patient: "John Doe", urgent: true },
    { id: 2, type: "Prescription", patient: "Jane Smith", urgent: false },
    { id: 3, type: "Follow-up", patient: "Mike Johnson", urgent: false },
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
          <h1 className="text-3xl font-bold text-foreground">Doctor Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, Dr. Smith</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate("/profile")}>
            Profile
          </Button>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Button 
          className="h-20 flex flex-col gap-2" 
          onClick={() => navigate("/find-patient")}
        >
          <Users className="w-6 h-6" />
          Find Patient
        </Button>
        <Button 
          className="h-20 flex flex-col gap-2" 
          onClick={() => navigate("/add-diagnosis")}
        >
          <Plus className="w-6 h-6" />
          Add Diagnosis
        </Button>
        <Button 
          className="h-20 flex flex-col gap-2" 
          onClick={() => navigate("/add-prescription")}
        >
          <FileText className="w-6 h-6" />
          New Prescription
        </Button>
        <Button 
          className="h-20 flex flex-col gap-2" 
          onClick={() => navigate("/add-lab-report")}
        >
          <Stethoscope className="w-6 h-6" />
          Add Lab Report
        </Button>
      </div>

      {/* Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Patients */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Recent Patients
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentPatients.map((patient) => (
                <div key={patient.id} className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{patient.name}</p>
                    <p className="text-sm text-muted-foreground">{patient.condition}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{patient.lastVisit}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Appointments */}
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
                    <p className="font-medium">{appointment.patient}</p>
                    <p className="text-sm text-muted-foreground">{appointment.time}</p>
                  </div>
                  <Badge variant="outline">{appointment.date}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pending Tasks */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Pending Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingTasks.map((task) => (
                <div key={task.id} className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{task.type}</p>
                    <p className="text-sm text-muted-foreground">{task.patient}</p>
                  </div>
                  <Badge variant={task.urgent ? "destructive" : "secondary"}>
                    {task.urgent ? "Urgent" : "Normal"}
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

export default DoctorDashboard;