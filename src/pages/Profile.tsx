
import React, { useState, useRef } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Camera, User, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Profile = () => {
  const { user, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleProfileUpdate = () => {
    if (!name.trim()) {
      toast({
        title: "Name is required",
        description: "Please provide a valid name",
        variant: "destructive",
      });
      return;
    }

    updateUserProfile({ name });
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (event) => {
        if (event.target && event.target.result) {
          updateUserProfile({ profileImage: event.target.result as string });
          toast({
            title: "Profile Picture Updated",
            description: "Your profile picture has been successfully updated.",
          });
        }
      };
      
      reader.readAsDataURL(file);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-background dark:bg-gray-900 transition-colors duration-300 py-8 px-4">
      <div className="max-w-md mx-auto">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')} 
          className="mb-4 flex items-center hover:bg-transparent hover:text-primary"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
        
        <Card className="transition-all duration-300 hover:shadow-lg dark:hover:shadow-purple-900/20 border-opacity-50">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold tracking-tight">Your Profile</CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center">
              <div 
                className="relative cursor-pointer group" 
                onClick={handleImageClick}
              >
                <Avatar className="h-24 w-24 border-2 border-primary">
                  {user?.profileImage && user.profileImage !== '/placeholder.svg' ? (
                    <AvatarImage src={user.profileImage} alt={user.name} />
                  ) : (
                    <AvatarFallback className="bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-200 text-xl">
                      {user?.name ? getInitials(user.name) : <User />}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                  <Camera className="text-white h-8 w-8" />
                </div>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*" 
                  onChange={handleImageChange}
                />
              </div>
              <p className="mt-2 text-sm text-muted-foreground">Click to change profile picture</p>
            </div>
            
            <div className="space-y-4">
              {isEditing ? (
                <>
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input 
                      id="name" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)}
                      className="transition-all duration-300 focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      value={email} 
                      disabled 
                      className="bg-gray-100 dark:bg-gray-800"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Email cannot be changed</p>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <Label className="text-muted-foreground">Name</Label>
                    <p className="text-lg font-medium">{user?.name}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Email</Label>
                    <p className="text-lg">{user?.email}</p>
                  </div>
                </>
              )}
            </div>
          </CardContent>
          
          <CardFooter>
            {isEditing ? (
              <div className="flex w-full space-x-2">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setName(user?.name || '');
                    setIsEditing(false);
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleProfileUpdate}
                  className="flex-1 bg-purple-600 hover:bg-purple-700"
                >
                  Save Changes
                </Button>
              </div>
            ) : (
              <Button 
                onClick={() => setIsEditing(true)}
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                Edit Profile
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
