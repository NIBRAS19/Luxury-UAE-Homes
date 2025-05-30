
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { Eye, EyeOff, Lock, Mail, User, Building, Phone, MapPin } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { FormField, Form, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from '@/contexts/AuthContext';

// Define types for the user roles
type UserRole = 'user' | 'agent' | 'admin' | 'superadmin';

// Base registration schema for form validation
const baseSchema = {
  first_name: z.string().min(2, "First name must be at least 2 characters"),
  last_name: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(['user', 'agent', 'admin', 'superadmin']),
  termsAgreed: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms and conditions"
  }),
};

// Agent specific schema
const agentSchema = {
  ...baseSchema,
  phone: z.string().min(1, "Phone number is required"),
  licenseNumber: z.string().min(1, "License number is required"),
  experience: z.string().min(1, "Years of experience is required"),
  specializations: z.string().optional(),
};

// Admin specific schema
const adminSchema = {
  ...baseSchema,
  department: z.string().min(1, "Department is required"),
  accessLevel: z.string().optional(),
};

// Superadmin specific schema
const superadminSchema = {
  ...baseSchema,
  department: z.string().min(1, "Department is required"),
};

// Registration schema for form validation that changes based on role
const registrationSchema = z.object(baseSchema)
  .superRefine((data, ctx) => {
    if (data.role === 'agent') {
      const agentValidation = z.object(agentSchema).safeParse(data);
      if (!agentValidation.success) {
        agentValidation.error.errors.forEach((error) => {
          ctx.addIssue(error);
        });
      }
    } else if (data.role === 'admin') {
      const adminValidation = z.object(adminSchema).safeParse(data);
      if (!adminValidation.success) {
        adminValidation.error.errors.forEach((error) => {
          ctx.addIssue(error);
        });
      }
    } else if (data.role === 'superadmin') {
      const superadminValidation = z.object(superadminSchema).safeParse(data);
      if (!superadminValidation.success) {
        superadminValidation.error.errors.forEach((error) => {
          ctx.addIssue(error);
        });
      }
    }
    return true;
  });

type RegistrationFormValues = z.infer<typeof registrationSchema> & {
  phone?: string;
  licenseNumber?: string;
  experience?: string;
  specializations?: string;
  department?: string;
  accessLevel?: string;
};

const Auth = () => {
  // Get tab parameter from URL
  const [searchParams] = useSearchParams();
  const tabParam = searchParams.get('tab');
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { signIn } = useAuth();

  // Registration form
  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      role: 'user',
      termsAgreed: false,
      phone: '',
      licenseNumber: '',
      experience: '',
      specializations: '',
      department: '',
      accessLevel: ''
    }
  });

  const selectedRole = form.watch('role');

  useEffect(() => {
    // Check if already authenticated
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/admin');
      }
    };
    
    checkAuth();
  }, [navigate]);

  // Clear field values when role changes
  useEffect(() => {
    if (selectedRole === 'user') {
      form.setValue('phone', '');
      form.setValue('licenseNumber', '');
      form.setValue('experience', '');
      form.setValue('specializations', '');
      form.setValue('department', '');
      form.setValue('accessLevel', '');
    }
  }, [selectedRole, form]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { error } = await signIn(loginEmail, loginPassword);
      
      if (error) throw error;
      
      toast({
        title: "Login successful",
        description: "Welcome back to EliteEstates",
      });
      
      navigate('/admin');
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message || "Please check your email and password",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const onSubmit = async (values: RegistrationFormValues) => {
    setLoading(true);
    
    try {
      // Create user with Supabase auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            full_name: `${values.first_name} ${values.last_name}`,
          },
        },
      });
      
      if (authError) throw authError;
      
      // If registration is successful, store additional user data and role
      if (authData?.user) {
        // Insert user role
        const { error: roleError } = await supabase
          .from('user_roles')
          .insert({
            user_id: authData.user.id,
            role: values.role
          });
          
        if (roleError) throw roleError;
        
        // For agents, store additional details
        if (values.role === 'agent' && values.phone) {
          const { error: agentError } = await supabase
            .from('agents')
            .insert({
              user_id: authData.user.id,
              first_name: values.first_name,
              last_name: values.last_name,
              email: values.email,
              phone: values.phone,
              license_number: values.licenseNumber,
              experience_years: values.experience,
              specializations: values.specializations,
            });
            
          if (agentError) throw agentError;
        }
        
        // For admins and superadmins, store department and access level as metadata
        if ((values.role === 'admin' || values.role === 'superadmin') && values.department) {
          // Access level is set to 'high' by default for superadmins
          const accessLevel = values.role === 'superadmin' ? 'high' : values.accessLevel;
          
          const { error: userMetadataError } = await supabase.auth.updateUser({
            data: {
              department: values.department,
              access_level: accessLevel
            }
          });
            
          if (userMetadataError) throw userMetadataError;
        }
      }
      
      toast({
        title: "Registration successful",
        description: "Your account has been created. Please check your email for verification instructions.",
      });
      
      form.reset();
      
    } catch (error: any) {
      console.error("Registration error:", error);
      toast({
        title: "Registration failed",
        description: error.message || "An error occurred during registration",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <motion.div 
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-deep-blue to-deep-blue/90 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            <span className="text-gold">Elite</span>Estates
          </h1>
          <p className="text-white/80">Admin Portal</p>
        </div>
        
        <Card className="bg-white/95 backdrop-blur-sm shadow-premium border-0">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Welcome Back</CardTitle>
            <CardDescription className="text-center">
              Login or register to access the portal
            </CardDescription>
          </CardHeader>
          
          <Tabs defaultValue={tabParam === 'register' ? 'register' : 'login'} className="w-full">
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="login">Sign In</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={handleSignIn}>
                <CardContent className="space-y-4 pt-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        className="pl-10 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-3 top-2.5"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="flex flex-col">
                  <Button 
                    type="submit" 
                    className="w-full bg-gold hover:bg-gold/90 text-white"
                    disabled={loading}
                  >
                    {loading ? "Signing in..." : "Sign In"}
                  </Button>
                </CardFooter>
              </form>
            </TabsContent>
            
            <TabsContent value="register">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <CardContent className="space-y-4 pt-6">
                    {/* Role selection - shown for all users */}
                    <FormField
                      control={form.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Account Type</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="grid grid-cols-2 gap-4"
                            >
                              <FormItem>
                                <FormControl>
                                  <RadioGroupItem
                                    value="user"
                                    id="user"
                                    className="peer sr-only"
                                  />
                                </FormControl>
                                <Label
                                  htmlFor="user"
                                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                >
                                  <User className="mb-2 h-6 w-6" />
                                  User
                                </Label>
                              </FormItem>

                              <FormItem>
                                <FormControl>
                                  <RadioGroupItem
                                    value="agent"
                                    id="agent"
                                    className="peer sr-only"
                                  />
                                </FormControl>
                                <Label
                                  htmlFor="agent"
                                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                >
                                  <Building className="mb-2 h-6 w-6" />
                                  Agent
                                </Label>
                              </FormItem>

                              <FormItem>
                                <FormControl>
                                  <RadioGroupItem
                                    value="admin"
                                    id="admin"
                                    className="peer sr-only"
                                  />
                                </FormControl>
                                <Label
                                  htmlFor="admin"
                                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                >
                                  <Lock className="mb-2 h-6 w-6" />
                                  Admin
                                </Label>
                              </FormItem>

                              <FormItem>
                                <FormControl>
                                  <RadioGroupItem
                                    value="superadmin"
                                    id="superadmin"
                                    className="peer sr-only"
                                  />
                                </FormControl>
                                <Label
                                  htmlFor="superadmin"
                                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                >
                                  <Lock className="mb-2 h-6 w-6" />
                                  Super Admin
                                </Label>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Basic user information - shown for all users */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-gray-500 mb-3">Basic Information</h3>
                      <div className="space-y-3">
                        <FormField
                          control={form.control}
                          name="first_name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>First Name</FormLabel>
                              <div className="relative">
                                <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                <FormControl>
                                  <Input 
                                    placeholder="John" 
                                    className="pl-10"
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </div>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="last_name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Last Name</FormLabel>
                              <div className="relative">
                                <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                <FormControl>
                                  <Input 
                                    placeholder="Doe" 
                                    className="pl-10"
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </div>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <div className="relative">
                                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                <FormControl>
                                  <Input 
                                    type="email" 
                                    placeholder="your@email.com" 
                                    className="pl-10"
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </div>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Password</FormLabel>
                              <div className="relative">
                                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                <FormControl>
                                  <Input 
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••" 
                                    className="pl-10 pr-10"
                                    {...field} 
                                  />
                                </FormControl>
                                <button
                                  type="button"
                                  onClick={togglePasswordVisibility}
                                  className="absolute right-3 top-2.5"
                                >
                                  {showPassword ? (
                                    <EyeOff className="h-5 w-5 text-gray-400" />
                                  ) : (
                                    <Eye className="h-5 w-5 text-gray-400" />
                                  )}
                                </button>
                                <FormMessage />
                              </div>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* Agent specific fields */}
                    {selectedRole === 'agent' && (
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h3 className="text-sm font-medium text-blue-500 mb-3">Agent Information</h3>
                        <div className="space-y-3">
                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Phone Number</FormLabel>
                                <div className="relative">
                                  <Phone className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                  <FormControl>
                                    <Input 
                                      placeholder="+1 123 456 7890" 
                                      className="pl-10"
                                      {...field} 
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </div>
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="licenseNumber"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>License Number</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="RE12345678" 
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="experience"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Years of Experience</FormLabel>
                                <FormControl>
                                  <Input 
                                    type="number" 
                                    placeholder="5" 
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="specializations"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Specializations</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="Luxury Homes, Condos, Commercial" 
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    )}
                    
                    {/* Admin specific fields */}
                    {selectedRole === 'admin' && (
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <h3 className="text-sm font-medium text-purple-500 mb-3">Admin Information</h3>
                        <div className="space-y-3">
                          <FormField
                            control={form.control}
                            name="department"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Department</FormLabel>
                                <FormControl>
                                  <Select 
                                    onValueChange={field.onChange} 
                                    defaultValue={field.value}
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select department" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="sales">Sales</SelectItem>
                                      <SelectItem value="marketing">Marketing</SelectItem>
                                      <SelectItem value="operations">Operations</SelectItem>
                                      <SelectItem value="finance">Finance</SelectItem>
                                      <SelectItem value="it">IT</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="accessLevel"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Access Level</FormLabel>
                                <FormControl>
                                  <Select 
                                    onValueChange={field.onChange} 
                                    defaultValue={field.value}
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select access level" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="low">Low (View Only)</SelectItem>
                                      <SelectItem value="medium">Medium (View & Edit)</SelectItem>
                                      <SelectItem value="high">High (Full Access)</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    )}

                    {/* Superadmin specific fields */}
                    {selectedRole === 'superadmin' && (
                      <div className="bg-red-50 p-4 rounded-lg">
                        <h3 className="text-sm font-medium text-red-500 mb-3">Super Admin Information</h3>
                        <div className="space-y-3">
                          <FormField
                            control={form.control}
                            name="department"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Department</FormLabel>
                                <FormControl>
                                  <Select 
                                    onValueChange={field.onChange} 
                                    defaultValue={field.value}
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select department" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="executive">Executive</SelectItem>
                                      <SelectItem value="operations">Operations</SelectItem>
                                      <SelectItem value="security">Security</SelectItem>
                                      <SelectItem value="technology">Technology</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <div className="text-sm text-gray-500 italic">
                            Super Admins automatically receive highest access level
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <FormField
                      control={form.control}
                      name="termsAgreed"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 pt-2">
                          <FormControl>
                            <Checkbox 
                              checked={field.value} 
                              onCheckedChange={field.onChange} 
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-sm font-normal">
                              I agree to the terms and conditions
                            </FormLabel>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                  
                  <CardFooter className="flex flex-col">
                    <Button 
                      type="submit" 
                      className="w-full bg-deep-blue hover:bg-deep-blue/90 text-white"
                      disabled={loading}
                    >
                      {loading ? "Creating Account..." : "Create Account"}
                    </Button>
                  </CardFooter>
                </form>
              </Form>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </motion.div>
  );
};

export default Auth;
