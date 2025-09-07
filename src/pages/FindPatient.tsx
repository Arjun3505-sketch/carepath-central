import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, User, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FindPatient = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  // Mock patient data - replace with actual Supabase query
  const mockPatients = [
    { id: 1, name: "John Doe", email: "john.doe@email.com", age: 35, bloodGroup: "A+", lastVisit: "2024-01-05" },
    { id: 2, name: "Jane Smith", email: "jane.smith@email.com", age: 28, bloodGroup: "O-", lastVisit: "2024-01-04" },
    { id: 3, name: "Mike Johnson", email: "mike.johnson@email.com", age: 42, bloodGroup: "B+", lastVisit: "2024-01-03" },
    { id: 4, name: "Alice Brown", email: "alice.brown@email.com", age: 31, bloodGroup: "AB+", lastVisit: "2024-01-02" },
  ];

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }

    // TODO: Replace with actual Supabase search
    const filtered = mockPatients.filter(patient =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toString().includes(searchTerm)
    );
    
    setSearchResults(filtered);
  };

  const handlePatientClick = (patientId: number) => {
    navigate(`/patient/${patientId}`);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Button variant="outline" onClick={() => navigate("/doctor-dashboard")}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Find Patient</h1>
          <p className="text-muted-foreground">Search for patients by name, email, or ID</p>
        </div>
      </div>

      {/* Search Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Patient Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder="Enter patient name, email, or ID"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="flex-1"
            />
            <Button onClick={handleSearch}>
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Search Results ({searchResults.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {searchResults.map((patient) => (
                <div 
                  key={patient.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                  onClick={() => handlePatientClick(patient.id)}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{patient.name}</h3>
                      <p className="text-sm text-muted-foreground">{patient.email}</p>
                      <div className="flex gap-2 mt-1">
                        <Badge variant="outline">ID: {patient.id}</Badge>
                        <Badge variant="outline">Age: {patient.age}</Badge>
                        <Badge variant="outline">{patient.bloodGroup}</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Last Visit</p>
                    <p className="font-medium">{patient.lastVisit}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {searchTerm && searchResults.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground">No patients found matching "{searchTerm}"</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FindPatient;