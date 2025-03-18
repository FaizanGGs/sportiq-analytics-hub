
import React, { useState } from 'react';
import { Save, Bell, Shield, User, Moon, SunMedium, Globe, Lock, ChevronRight, EyeOff, Eye, Languages, Sliders, RefreshCw, HelpCircle, FileText, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import GlassCard from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/use-toast';

const Settings = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(true);
  const [language, setLanguage] = useState('english');
  const [showApiKey, setShowApiKey] = useState(false);
  const [apiKey, setApiKey] = useState('sk-f7s8dsf7sd8f7sd87f8s7df78sd****');
  const [isDataLoading, setIsDataLoading] = useState(false);

  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  const handleRefreshData = () => {
    setIsDataLoading(true);
    // Simulating data refresh
    setTimeout(() => {
      setIsDataLoading(false);
      toast({
        title: "Data refreshed",
        description: "Your data has been refreshed successfully.",
      });
    }, 1500);
  };

  return (
    <div className="h-full flex bg-sportiq-black text-white">
      <Sidebar isOpen={isSidebarOpen} />
      
      <div className="flex-1 flex flex-col min-h-screen">
        <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 animate-fade-in">
          <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold text-gradient">Settings</h1>

            <Tabs defaultValue="account" className="w-full">
              <TabsList className="grid grid-cols-4 mb-6">
                <TabsTrigger value="account" className="data-[state=active]:bg-sportiq-blue/20 data-[state=active]:text-sportiq-blue">
                  Account
                </TabsTrigger>
                <TabsTrigger value="preferences" className="data-[state=active]:bg-sportiq-purple/20 data-[state=active]:text-sportiq-purple">
                  Preferences
                </TabsTrigger>
                <TabsTrigger value="notifications" className="data-[state=active]:bg-sportiq-green/20 data-[state=active]:text-sportiq-green">
                  Notifications
                </TabsTrigger>
                <TabsTrigger value="api" className="data-[state=active]:bg-sportiq-gold/20 data-[state=active]:text-sportiq-gold">
                  API & Data
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="account" className="space-y-4">
                <GlassCard className="p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-16 w-16 rounded-full bg-sportiq-blue/20 flex items-center justify-center">
                      <User className="h-8 w-8 text-sportiq-blue" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">John Smith</h2>
                      <p className="text-white/70">Fantasy Sports Enthusiast</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-white/70 mb-1 block">Name</label>
                        <Input 
                          className="bg-sportiq-lightgray/20 border-sportiq-lightgray/30"
                          defaultValue="John Smith"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-white/70 mb-1 block">Email</label>
                        <Input 
                          className="bg-sportiq-lightgray/20 border-sportiq-lightgray/30"
                          defaultValue="john.smith@example.com"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm text-white/70 mb-1 block">Bio</label>
                      <Input 
                        className="bg-sportiq-lightgray/20 border-sportiq-lightgray/30"
                        defaultValue="Fantasy sports player with a focus on cricket and football analytics."
                      />
                    </div>
                    
                    <div className="pt-2">
                      <Button className="bg-sportiq-blue hover:bg-sportiq-blue/90">
                        <Save className="mr-2 h-4 w-4" />
                        Save Account Details
                      </Button>
                    </div>
                  </div>
                </GlassCard>
                
                <GlassCard className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Security</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-white/70 mb-1 block">Current Password</label>
                      <Input 
                        type="password"
                        className="bg-sportiq-lightgray/20 border-sportiq-lightgray/30"
                        defaultValue="********"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-white/70 mb-1 block">New Password</label>
                        <Input 
                          type="password"
                          className="bg-sportiq-lightgray/20 border-sportiq-lightgray/30"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-white/70 mb-1 block">Confirm New Password</label>
                        <Input 
                          type="password"
                          className="bg-sportiq-lightgray/20 border-sportiq-lightgray/30"
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-2">
                        <Shield className="h-5 w-5 text-sportiq-blue" />
                        <span>Enable Two-Factor Authentication</span>
                      </div>
                      <Switch checked={true} />
                    </div>
                    
                    <div className="pt-2">
                      <Button className="bg-sportiq-blue hover:bg-sportiq-blue/90">
                        <Lock className="mr-2 h-4 w-4" />
                        Update Security Settings
                      </Button>
                    </div>
                  </div>
                </GlassCard>
              </TabsContent>
              
              <TabsContent value="preferences" className="space-y-4">
                <GlassCard className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Appearance & Localization</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-2">
                        {isDarkMode ? (
                          <Moon className="h-5 w-5 text-sportiq-purple" />
                        ) : (
                          <SunMedium className="h-5 w-5 text-sportiq-gold" />
                        )}
                        <span>Dark Mode</span>
                      </div>
                      <Switch checked={isDarkMode} onCheckedChange={setIsDarkMode} />
                    </div>
                    
                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-2">
                        <Globe className="h-5 w-5 text-sportiq-green" />
                        <span>Language</span>
                      </div>
                      <Select defaultValue={language} onValueChange={setLanguage}>
                        <SelectTrigger className="w-32 bg-sportiq-lightgray/20 border-sportiq-lightgray/30">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="english">English</SelectItem>
                          <SelectItem value="spanish">Spanish</SelectItem>
                          <SelectItem value="french">French</SelectItem>
                          <SelectItem value="german">German</SelectItem>
                          <SelectItem value="hindi">Hindi</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-2">
                        <Sliders className="h-5 w-5 text-sportiq-blue" />
                        <span>Default Sport</span>
                      </div>
                      <Select defaultValue="cricket">
                        <SelectTrigger className="w-32 bg-sportiq-lightgray/20 border-sportiq-lightgray/30">
                          <SelectValue placeholder="Select sport" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cricket">Cricket</SelectItem>
                          <SelectItem value="football">Football</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </GlassCard>
                
                <GlassCard className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Analytics Preferences</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-2">
                        <BarChart className="h-5 w-5 text-sportiq-purple" />
                        <span>Show Advanced Statistics</span>
                      </div>
                      <Switch checked={true} />
                    </div>
                    
                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-2">
                        <Languages className="h-5 w-5 text-sportiq-green" />
                        <span>Use Simplified Terms</span>
                      </div>
                      <Switch checked={false} />
                    </div>
                    
                    <div className="pt-2">
                      <Button onClick={handleSaveSettings} className="bg-sportiq-purple hover:bg-sportiq-purple/90">
                        <Save className="mr-2 h-4 w-4" />
                        Save Preferences
                      </Button>
                    </div>
                  </div>
                </GlassCard>
              </TabsContent>
              
              <TabsContent value="notifications" className="space-y-4">
                <GlassCard className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Notification Settings</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-2">
                        <Bell className="h-5 w-5 text-sportiq-green" />
                        <span>Push Notifications</span>
                      </div>
                      <Switch checked={notifications} onCheckedChange={setNotifications} />
                    </div>
                    
                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-2">
                        <Mail className="h-5 w-5 text-sportiq-blue" />
                        <span>Email Updates</span>
                      </div>
                      <Switch checked={emailUpdates} onCheckedChange={setEmailUpdates} />
                    </div>
                    
                    <div className="space-y-2 pt-4">
                      <h4 className="font-medium">Notify me about:</h4>
                      
                      <div className="ml-2 space-y-1">
                        <div className="flex items-center gap-2">
                          <Switch checked={true} size="sm" />
                          <span className="text-sm">Match Predictions</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Switch checked={true} size="sm" />
                          <span className="text-sm">Player Performance Updates</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Switch checked={true} size="sm" />
                          <span className="text-sm">Team News</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Switch checked={false} size="sm" />
                          <span className="text-sm">Fantasy Point Updates</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Switch checked={false} size="sm" />
                          <span className="text-sm">Marketing & Promotions</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-2">
                      <Button onClick={handleSaveSettings} className="bg-sportiq-green hover:bg-sportiq-green/90">
                        <Save className="mr-2 h-4 w-4" />
                        Save Notification Settings
                      </Button>
                    </div>
                  </div>
                </GlassCard>
              </TabsContent>
              
              <TabsContent value="api" className="space-y-4">
                <GlassCard className="p-6">
                  <h3 className="text-lg font-semibold mb-4">API Access</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-white/70 mb-1 block">API Key</label>
                      <div className="flex">
                        <Input 
                          type={showApiKey ? "text" : "password"}
                          className="bg-sportiq-lightgray/20 border-sportiq-lightgray/30 rounded-r-none"
                          value={apiKey}
                          readOnly
                        />
                        <Button 
                          type="button" 
                          variant="outline" 
                          className="rounded-l-none border-l-0"
                          onClick={() => setShowApiKey(!showApiKey)}
                        >
                          {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                      <p className="text-xs text-white/50 mt-1">Use this key to authenticate API requests.</p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-2 pt-2">
                      <Button className="bg-sportiq-gold hover:bg-sportiq-gold/90">
                        Generate New API Key
                      </Button>
                      <Button variant="outline" className="border-sportiq-lightgray/30">
                        Copy to Clipboard
                      </Button>
                    </div>
                  </div>
                </GlassCard>
                
                <GlassCard className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Data Management</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-2">
                        <RefreshCw className={cn("h-5 w-5 text-sportiq-blue", isDataLoading && "animate-spin")} />
                        <span>Refresh Data</span>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        disabled={isDataLoading}
                        onClick={handleRefreshData}
                      >
                        {isDataLoading ? "Refreshing..." : "Refresh Now"}
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-sportiq-purple" />
                        <span>Export Data</span>
                      </div>
                      <Select defaultValue="csv">
                        <SelectTrigger className="w-32 bg-sportiq-lightgray/20 border-sportiq-lightgray/30">
                          <SelectValue placeholder="Format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="csv">CSV</SelectItem>
                          <SelectItem value="json">JSON</SelectItem>
                          <SelectItem value="xlsx">Excel</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="pt-2">
                      <Button className="bg-sportiq-purple hover:bg-sportiq-purple/90">
                        Export My Data
                      </Button>
                    </div>
                  </div>
                </GlassCard>
                
                <GlassCard className="p-6 border border-sportiq-red/20">
                  <h3 className="text-lg font-semibold text-sportiq-red mb-4">Danger Zone</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Delete All Data</p>
                        <p className="text-sm text-white/70">This will remove all your personal data from our systems.</p>
                      </div>
                      <Button variant="destructive">
                        Delete Data
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Close Account</p>
                        <p className="text-sm text-white/70">Your account will be permanently deleted.</p>
                      </div>
                      <Button variant="destructive">
                        Close Account
                      </Button>
                    </div>
                  </div>
                </GlassCard>
              </TabsContent>
            </Tabs>
            
            <div className="flex justify-center py-4">
              <div className="flex flex-col sm:flex-row items-center gap-3 text-white/50 text-sm">
                <a href="#" className="hover:text-white flex items-center">
                  <HelpCircle className="h-4 w-4 mr-1" />
                  Help & Support
                </a>
                <span className="hidden sm:inline">•</span>
                <a href="#" className="hover:text-white flex items-center">
                  <FileText className="h-4 w-4 mr-1" />
                  Terms & Privacy
                </a>
                <span className="hidden sm:inline">•</span>
                <a href="#" className="hover:text-white flex items-center">
                  <LogOut className="h-4 w-4 mr-1" />
                  Log Out
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
