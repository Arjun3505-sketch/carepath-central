import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  User, 
  Lock, 
  Bell, 
  Settings, 
  Shield, 
  Palette,
  Users,
  UserPlus,
  Calendar,
  BarChart3,
  Save
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DoctorProfile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Mock doctor data - replace with actual data from Supabase
  const [doctorInfo, setDoctorInfo] = useState({
    name: "Dr. Smith",
    email: "dr.smith@hospital.com",
    phone: "+1 (555) 123-4567",
    specialization: "Cardiology",
    licenseNumber: "MD12345",
    experience: "15 years",
    hospital: "City General Hospital",
    department: "Cardiology Department",
    bio: "Experienced cardiologist with expertise in interventional procedures."
  });

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    smsAlerts: false,
    appointmentReminders: true,
    labResults: true,
    emergencyAlerts: true
  });

  const [practiceSettings, setPracticeSettings] = useState({
    consultationDuration: "30",
    workingHours: "9:00 AM - 5:00 PM",
    breakTime: "12:00 PM - 1:00 PM",
    weekends: false,
    emergencyAvailable: true
  });

  const handleSave = (section: string) => {
    // TODO: Implement actual save to Supabase
    toast({
      title: "Settings Saved",
      description: `${section} settings have been updated successfully.`,
    });
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" size="icon" onClick={() => navigate("/doctor-dashboard")}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-3xl font-bold text-foreground">Doctor Profile</h1>
        </div>

        <Tabs defaultValue="professional" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7">
            <TabsTrigger value="professional">Professional</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="practice">Practice</TabsTrigger>
            <TabsTrigger value="patients">Patients</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          {/* Professional Information */}
          <TabsContent value="professional">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Edit Professional Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={doctorInfo.name}
                      onChange={(e) => setDoctorInfo({...doctorInfo, name: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={doctorInfo.email}
                      onChange={(e) => setDoctorInfo({...doctorInfo, email: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={doctorInfo.phone}
                      onChange={(e) => setDoctorInfo({...doctorInfo, phone: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="specialization">Specialization</Label>
                    <Input
                      id="specialization"
                      value={doctorInfo.specialization}
                      onChange={(e) => setDoctorInfo({...doctorInfo, specialization: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="license">License Number</Label>
                    <Input
                      id="license"
                      value={doctorInfo.licenseNumber}
                      onChange={(e) => setDoctorInfo({...doctorInfo, licenseNumber: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience">Experience</Label>
                    <Input
                      id="experience"
                      value={doctorInfo.experience}
                      onChange={(e) => setDoctorInfo({...doctorInfo, experience: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="hospital">Hospital/Clinic</Label>
                    <Input
                      id="hospital"
                      value={doctorInfo.hospital}
                      onChange={(e) => setDoctorInfo({...doctorInfo, hospital: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Input
                      id="department"
                      value={doctorInfo.department}
                      onChange={(e) => setDoctorInfo({...doctorInfo, department: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={doctorInfo.bio}
                      onChange={(e) => setDoctorInfo({...doctorInfo, bio: e.target.value})}
                    />
                  </div>
                </div>

                <Button onClick={() => handleSave("Professional")} className="mt-4">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security & Password */}
          <TabsContent value="security">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="w-5 h-5" />
                    Change Password
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>
                  <Button onClick={() => handleSave("Password")}>
                    Update Password
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Security & Privacy
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">Add extra security to your account</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Session Timeout</Label>
                      <p className="text-sm text-muted-foreground">Auto-logout after inactivity</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Login Notifications</Label>
                      <p className="text-sm text-muted-foreground">Get notified of new logins</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notification Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Email Alerts</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                  </div>
                  <Switch 
                    checked={notifications.emailAlerts}
                    onCheckedChange={(checked) => setNotifications({...notifications, emailAlerts: checked})}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>SMS Alerts</Label>
                    <p className="text-sm text-muted-foreground">Receive critical alerts via SMS</p>
                  </div>
                  <Switch 
                    checked={notifications.smsAlerts}
                    onCheckedChange={(checked) => setNotifications({...notifications, smsAlerts: checked})}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Appointment Reminders</Label>
                    <p className="text-sm text-muted-foreground">Get notified about upcoming appointments</p>
                  </div>
                  <Switch 
                    checked={notifications.appointmentReminders}
                    onCheckedChange={(checked) => setNotifications({...notifications, appointmentReminders: checked})}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Lab Results</Label>
                    <p className="text-sm text-muted-foreground">Notifications when lab results are ready</p>
                  </div>
                  <Switch 
                    checked={notifications.labResults}
                    onCheckedChange={(checked) => setNotifications({...notifications, labResults: checked})}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Emergency Alerts</Label>
                    <p className="text-sm text-muted-foreground">Critical patient emergency notifications</p>
                  </div>
                  <Switch 
                    checked={notifications.emergencyAlerts}
                    onCheckedChange={(checked) => setNotifications({...notifications, emergencyAlerts: checked})}
                  />
                </div>
                <Button onClick={() => handleSave("Notifications")} className="mt-4">
                  <Save className="w-4 h-4 mr-2" />
                  Save Notification Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Practice Settings */}
          <TabsContent value="practice">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Practice Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="consultationDuration">Default Consultation Duration (minutes)</Label>
                    <Input
                      id="consultationDuration"
                      type="number"
                      value={practiceSettings.consultationDuration}
                      onChange={(e) => setPracticeSettings({...practiceSettings, consultationDuration: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="workingHours">Working Hours</Label>
                    <Input
                      id="workingHours"
                      value={practiceSettings.workingHours}
                      onChange={(e) => setPracticeSettings({...practiceSettings, workingHours: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="breakTime">Break Time</Label>
                    <Input
                      id="breakTime"
                      value={practiceSettings.breakTime}
                      onChange={(e) => setPracticeSettings({...practiceSettings, breakTime: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="space-y-4 pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Weekend Availability</Label>
                      <p className="text-sm text-muted-foreground">Available for appointments on weekends</p>
                    </div>
                    <Switch 
                      checked={practiceSettings.weekends}
                      onCheckedChange={(checked) => setPracticeSettings({...practiceSettings, weekends: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Emergency Availability</Label>
                      <p className="text-sm text-muted-foreground">Available for emergency consultations</p>
                    </div>
                    <Switch 
                      checked={practiceSettings.emergencyAvailable}
                      onCheckedChange={(checked) => setPracticeSettings({...practiceSettings, emergencyAvailable: checked})}
                    />
                  </div>
                </div>
                
                <Button onClick={() => handleSave("Practice")} className="mt-4">
                  <Save className="w-4 h-4 mr-2" />
                  Save Practice Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Patient Management */}
          <TabsContent value="patients">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    My Patients
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">View and manage your patient list</p>
                  <Button onClick={() => navigate("/find-patient")} className="w-full">
                    <Users className="w-4 h-4 mr-2" />
                    View Patient List
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UserPlus className="w-5 h-5" />
                    Add New Patient
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">Register a new patient in the system</p>
                  <Button onClick={() => navigate("/add-patient")} className="w-full">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add New Patient
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Schedule Management */}
          <TabsContent value="schedule">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  My Schedule
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Manage your appointments and schedule</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button onClick={() => navigate("/schedule")} variant="outline">
                    <Calendar className="w-4 h-4 mr-2" />
                    View Schedule
                  </Button>
                  <Button onClick={() => navigate("/appointments")} variant="outline">
                    Manage Appointments
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports & Analytics */}
          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Reports & Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">View practice statistics and generate reports</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button onClick={() => navigate("/reports")} variant="outline">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    View Reports
                  </Button>
                  <Button onClick={() => navigate("/analytics")} variant="outline">
                    Practice Analytics
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DoctorProfile;