-- Phase 1: Clean up redundant tables
DROP TABLE IF EXISTS public.auth_credentials123 CASCADE;
DROP TABLE IF EXISTS public.auth_credentials CASCADE;

-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('doctor', 'patient');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS policies for user_roles
CREATE POLICY "Users can view their own roles"
  ON public.user_roles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own roles during signup"
  ON public.user_roles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Phase 2: Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- RLS policies for profiles
CREATE POLICY "Users can view their own profile"
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  );
  RETURN NEW;
END;
$$;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Phase 3: Add user_id to doctors and patients tables
ALTER TABLE public.doctors ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;
ALTER TABLE public.patients ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;

-- Create unique constraints
CREATE UNIQUE INDEX IF NOT EXISTS doctors_user_id_unique ON public.doctors(user_id) WHERE user_id IS NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS patients_user_id_unique ON public.patients(user_id) WHERE user_id IS NOT NULL;

-- RLS policies for doctors table
CREATE POLICY "Doctors can view their own record"
  ON public.doctors
  FOR SELECT
  TO authenticated
  USING (
    auth.uid() = user_id 
    OR public.has_role(auth.uid(), 'doctor')
  );

CREATE POLICY "Doctors can update their own record"
  ON public.doctors
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS policies for patients table
CREATE POLICY "Patients can view their own record"
  ON public.patients
  FOR SELECT
  TO authenticated
  USING (
    auth.uid() = user_id 
    OR public.has_role(auth.uid(), 'doctor')
  );

CREATE POLICY "Patients can update their own record"
  ON public.patients
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Enable RLS on doctors and patients
ALTER TABLE public.doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;

-- RLS policies for diagnoses (doctors can create, patients can view their own)
ALTER TABLE public.diagnoses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Doctors can create diagnoses"
  ON public.diagnoses
  FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'doctor'));

CREATE POLICY "Doctors can view all diagnoses"
  ON public.diagnoses
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'doctor'));

CREATE POLICY "Patients can view their own diagnoses"
  ON public.diagnoses
  FOR SELECT
  TO authenticated
  USING (
    patient_id IN (
      SELECT id FROM public.patients WHERE user_id = auth.uid()
    )
  );

-- RLS policies for prescriptions
ALTER TABLE public.prescriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Doctors can create prescriptions"
  ON public.prescriptions
  FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'doctor'));

CREATE POLICY "Doctors can view all prescriptions"
  ON public.prescriptions
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'doctor'));

CREATE POLICY "Patients can view their own prescriptions"
  ON public.prescriptions
  FOR SELECT
  TO authenticated
  USING (
    patient_id IN (
      SELECT id FROM public.patients WHERE user_id = auth.uid()
    )
  );

-- RLS policies for lab_reports
ALTER TABLE public.lab_reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Doctors can create lab reports"
  ON public.lab_reports
  FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'doctor'));

CREATE POLICY "Doctors can view all lab reports"
  ON public.lab_reports
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'doctor'));

CREATE POLICY "Patients can view their own lab reports"
  ON public.lab_reports
  FOR SELECT
  TO authenticated
  USING (
    patient_id IN (
      SELECT id FROM public.patients WHERE user_id = auth.uid()
    )
  );

-- RLS policies for vaccinations
ALTER TABLE public.vaccinations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Doctors can create vaccinations"
  ON public.vaccinations
  FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'doctor'));

CREATE POLICY "Doctors can view all vaccinations"
  ON public.vaccinations
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'doctor'));

CREATE POLICY "Patients can view their own vaccinations"
  ON public.vaccinations
  FOR SELECT
  TO authenticated
  USING (
    patient_id IN (
      SELECT id FROM public.patients WHERE user_id = auth.uid()
    )
  );

-- RLS policies for surgeries
ALTER TABLE public.surgeries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Doctors can create surgeries"
  ON public.surgeries
  FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'doctor'));

CREATE POLICY "Doctors can view all surgeries"
  ON public.surgeries
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'doctor'));

CREATE POLICY "Patients can view their own surgeries"
  ON public.surgeries
  FOR SELECT
  TO authenticated
  USING (
    patient_id IN (
      SELECT id FROM public.patients WHERE user_id = auth.uid()
    )
  );

-- RLS policies for prescription_items
ALTER TABLE public.prescription_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Doctors can manage prescription items"
  ON public.prescription_items
  FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'doctor'));

CREATE POLICY "Patients can view their prescription items"
  ON public.prescription_items
  FOR SELECT
  TO authenticated
  USING (
    prescription_id IN (
      SELECT p.id FROM public.prescriptions p
      INNER JOIN public.patients pat ON p.patient_id = pat.id
      WHERE pat.user_id = auth.uid()
    )
  );