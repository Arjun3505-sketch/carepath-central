import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, User, Settings, Shield, Bell, FileText, Eye, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const PatientProfile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Mock patient data - replace with Supabase data
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@email.com",
    phone: "+1234567890",
    dateOfBirth: "1989-05-15",
    address: "123 Main St, City, State 12345",
    emergencyContact: "Jane Doe - +0987654321",
    bloodGroup: "A+",
    allergies: "Peanuts, Shellfish"
  });

  const [notifications, setNotifications] = useState({
    appointmentReminders: true,
    prescriptionAlerts: true,
    labResults: true,
    emailUpdates: false,
    smsNotifications: true
  });

  const [privacySettings, setPrivacySettings] = useState({
    shareDataForResearch: false,
    allowDataAnalytics: true,
    marketingCommunications: false
  });

  const handleSavePersonalInfo = () => {
    // TODO: Implement Supabase update
    toast({
      title: "Profile Updated",
      description: "Your personal information has been saved successfully.",
    });
  };

  const handleSaveNotifications = () => {
    // TODO: Implement Supabase update
    toast({
      title: "Notification Settings Updated",
      description: "Your notification preferences have been saved.",
    });
  };

  const handleSavePrivacy = () => {
    // TODO: Implement Supabase update
    toast({
      title: "Privacy Settings Updated",
      description: "Your privacy preferences have been saved.",
    });
  };

  const handleChangePassword = () => {
    // TODO: Implement Supabase auth password change
    toast({
      title: "Password Change",
      description: "Password change functionality will be implemented with Supabase auth.",
    });
  };

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" onClick={() => navigate("/patient-dashboard")}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Profile Settings</h1>
          <p className="text-muted-foreground">Manage your account and preferences</p>
        </div>
      </div>

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="personal" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            Personal
          </TabsTrigger>
          <TabsTrigger value="account" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Account
          </TabsTrigger>
          <TabsTrigger value="privacy" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Privacy
          </TabsTrigger>
          <TabsTrigger value="app" className="flex items-center gap-2">
            <Bell className="w-4 h-4" />
            App Settings
          </TabsTrigger>
          <TabsTrigger value="records" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Health Records
          </TabsTrigger>
        </TabsList>

        {/* Personal Information */}
        <TabsContent value="personal" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={personalInfo.firstName}
                    onChange={(e) => setPersonalInfo({...personalInfo, firstName: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={personalInfo.lastName}
                    onChange={(e) => setPersonalInfo({...personalInfo, lastName: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={personalInfo.email}
                    onChange={(e) => setPersonalInfo({...personalInfo, email: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={personalInfo.phone}
                    onChange={(e) => setPersonalInfo({...personalInfo, phone: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={personalInfo.dateOfBirth}
                    onChange={(e) => setPersonalInfo({...personalInfo, dateOfBirth: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bloodGroup">Blood Group</Label>
                  <Input
                    id="bloodGroup"
                    value={personalInfo.bloodGroup}
                    onChange={(e) => setPersonalInfo({...personalInfo, bloodGroup: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={personalInfo.address}
                  onChange={(e) => setPersonalInfo({...personalInfo, address: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergencyContact">Emergency Contact</Label>
                <Input
                  id="emergencyContact"
                  value={personalInfo.emergencyContact}
                  onChange={(e) => setPersonalInfo({...personalInfo, emergencyContact: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="allergies">Allergies</Label>
                <Textarea
                  id="allergies"
                  value={personalInfo.allergies}
                  onChange={(e) => setPersonalInfo({...personalInfo, allergies: e.target.value})}
                  placeholder="List any known allergies..."
                />
              </div>
              <Button onClick={handleSavePersonalInfo} className="w-full">
                <Save className="w-4 h-4 mr-2" />
                Save Personal Information
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Account Settings */}
        <TabsContent value="account" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Change Password</h3>
                <div className="space-y-4">
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
                  <Button onClick={handleChangePassword}>Update Password</Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Notifications</h3>
                <div className="space-y-4">
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
                      <Label>Prescription Alerts</Label>
                      <p className="text-sm text-muted-foreground">Alerts for prescription refills and expiry</p>
                    </div>
                    <Switch
                      checked={notifications.prescriptionAlerts}
                      onCheckedChange={(checked) => setNotifications({...notifications, prescriptionAlerts: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Lab Results</Label>
                      <p className="text-sm text-muted-foreground">Notifications when lab results are available</p>
                    </div>
                    <Switch
                      checked={notifications.labResults}
                      onCheckedChange={(checked) => setNotifications({...notifications, labResults: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Email Updates</Label>
                      <p className="text-sm text-muted-foreground">General health tips and updates via email</p>
                    </div>
                    <Switch
                      checked={notifications.emailUpdates}
                      onCheckedChange={(checked) => setNotifications({...notifications, emailUpdates: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>SMS Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive important alerts via SMS</p>
                    </div>
                    <Switch
                      checked={notifications.smsNotifications}
                      onCheckedChange={(checked) => setNotifications({...notifications, smsNotifications: checked})}
                    />
                  </div>
                </div>
                <Button onClick={handleSaveNotifications}>Save Notification Settings</Button>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Security</h3>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Your account is secured with email and password authentication.
                  </p>
                  <Button variant="outline">Enable Two-Factor Authentication</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Privacy & Consent */}
        <TabsContent value="privacy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Privacy & Consent</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Share Data for Research</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow anonymized health data to be used for medical research
                    </p>
                  </div>
                  <Switch
                    checked={privacySettings.shareDataForResearch}
                    onCheckedChange={(checked) => setPrivacySettings({...privacySettings, shareDataForResearch: checked})}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Data Analytics</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow usage analytics to improve our services
                    </p>
                  </div>
                  <Switch
                    checked={privacySettings.allowDataAnalytics}
                    onCheckedChange={(checked) => setPrivacySettings({...privacySettings, allowDataAnalytics: checked})}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Marketing Communications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive promotional emails and offers
                    </p>
                  </div>
                  <Switch
                    checked={privacySettings.marketingCommunications}
                    onCheckedChange={(checked) => setPrivacySettings({...privacySettings, marketingCommunications: checked})}
                  />
                </div>
              </div>
              <Button onClick={handleSavePrivacy}>Save Privacy Settings</Button>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Data Management</h3>
                <div className="space-y-2">
                  <Button variant="outline">Download My Data</Button>
                  <Button variant="destructive">Delete My Account</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* App Settings */}
        <TabsContent value="app" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>App Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Display Preferences</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Dark Mode</Label>
                    <Switch />
                  </div>
                  <div className="space-y-2">
                    <Label>Language</Label>
                    <select className="w-full p-2 border rounded-md">
                      <option>English</option>
                      <option>Spanish</option>
                      <option>French</option>
                    </select>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Data Sync</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Auto-sync Health Data</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Offline Mode</Label>
                    <Switch />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Health Records */}
        <TabsContent value="records" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>View All Health Records</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Access your complete electronic health record with detailed medical history.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Button variant="outline" className="h-24 flex flex-col gap-2">
                  <FileText className="w-6 h-6" />
                  <span>Medical History</span>
                </Button>
                <Button variant="outline" className="h-24 flex flex-col gap-2">
                  <FileText className="w-6 h-6" />
                  <span>Lab Reports</span>
                </Button>
                <Button variant="outline" className="h-24 flex flex-col gap-2">
                  <FileText className="w-6 h-6" />
                  <span>Prescriptions</span>
                </Button>
                <Button variant="outline" className="h-24 flex flex-col gap-2">
                  <FileText className="w-6 h-6" />
                  <span>Vaccinations</span>
                </Button>
                <Button variant="outline" className="h-24 flex flex-col gap-2">
                  <FileText className="w-6 h-6" />
                  <span>Surgery Records</span>
                </Button>
                <Button variant="outline" className="h-24 flex flex-col gap-2">
                  <Eye className="w-6 h-6" />
                  <span>Full EHR View</span>
                </Button>
              </div>

              <Button className="w-full" onClick={() => navigate("/patient-ehr")}>
                <Eye className="w-4 h-4 mr-2" />
                View Complete Health Record
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PatientProfile;