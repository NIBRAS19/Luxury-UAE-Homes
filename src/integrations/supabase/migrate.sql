
-- Create agents table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.agents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    phone TEXT,
    license_number TEXT,
    experience_years TEXT,
    specializations TEXT,
    bio TEXT,
    photo_url TEXT,
    email TEXT NOT NULL,
    status TEXT DEFAULT 'active',
    properties_sold SMALLINT DEFAULT 0,
    rating NUMERIC DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    UNIQUE(user_id)
);

-- Enable Row Level Security
ALTER TABLE public.agents ENABLE ROW LEVEL SECURITY;

-- Set up RLS policies for agents
CREATE POLICY "Agents can view their own profiles" 
ON public.agents FOR SELECT 
TO authenticated 
USING (auth.uid() = user_id);

CREATE POLICY "Agents can update their own profiles" 
ON public.agents FOR UPDATE
TO authenticated 
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all agent profiles" 
ON public.agents FOR SELECT 
TO authenticated 
USING (EXISTS (
  SELECT 1 FROM user_roles 
  WHERE user_id = auth.uid() 
  AND (role = 'admin' OR role = 'superadmin')
));

CREATE POLICY "Admins can update agent profiles" 
ON public.agents FOR UPDATE 
TO authenticated 
USING (EXISTS (
  SELECT 1 FROM user_roles 
  WHERE user_id = auth.uid() 
  AND (role = 'admin' OR role = 'superadmin')
));

-- Create user roles table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('user', 'agent', 'admin', 'superadmin')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    UNIQUE(user_id, role)
);

-- Enable Row Level Security for user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Set up RLS policies for user_roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles"
ON public.user_roles FOR SELECT
TO authenticated
USING (EXISTS (
  SELECT 1 FROM user_roles
  WHERE user_id = auth.uid()
  AND (role = 'admin' OR role = 'superadmin')
));

CREATE POLICY "SuperAdmins can insert roles"
ON public.user_roles FOR INSERT
TO authenticated
WITH CHECK (EXISTS (
  SELECT 1 FROM user_roles
  WHERE user_id = auth.uid()
  AND role = 'superadmin'
));

CREATE POLICY "SuperAdmins can update roles"
ON public.user_roles FOR UPDATE
TO authenticated
USING (EXISTS (
  SELECT 1 FROM user_roles
  WHERE user_id = auth.uid()
  AND role = 'superadmin'
));

-- Helper function to check roles without RLS recursion
CREATE OR REPLACE FUNCTION public.has_role(user_id UUID, role_name TEXT)
RETURNS BOOLEAN
LANGUAGE SQL
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 
    FROM public.user_roles 
    WHERE user_id = $1 
    AND role = $2
  );
$$;

-- Admin details are stored in user metadata instead of a separate table
