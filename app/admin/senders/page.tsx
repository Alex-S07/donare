'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/admin-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Users,
  Mail,
  Clock,
  RefreshCw,
  Search,
  Filter,
  Calendar,
  Globe,
  Shield,
  Phone,
  MapPin,
  User,
  DollarSign,
  Activity
} from 'lucide-react';
import { toast } from 'sonner';

interface DonationSender {
  id: string;
  email: string;
  provider: 'google' | 'email_otp';
  provider_id: string | null;
  created_at: string;
  last_login_at: string | null;
  session_expires_at: string | null;
  login_attempts: number;
  is_active: boolean;
  total_sessions: number;
  full_name: string | null;
  phone_number: string | null;
  first_name: string | null;
  last_name: string | null;
  profile_picture_url: string | null;
  date_of_birth: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  pincode: string | null;
  last_activity_at: string | null;
  total_donations_count: number;
  total_donated_amount: number;
}

export default function SendersManagement() {
  const [senders, setSenders] = useState<DonationSender[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Filters
  const [providerFilter, setProviderFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchSenders = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/admin/senders', {
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setSenders(data.data.senders || []);
        }
      } else {
        toast.error('Failed to load senders');
      }
    } catch (error) {
      console.error('Error fetching senders:', error);
      toast.error('Failed to load senders');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSenders();
  }, []);

  const filteredSenders = senders.filter(sender => {
    const matchesProvider = providerFilter === 'all' || sender.provider === providerFilter;
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'active' && sender.is_active) ||
      (statusFilter === 'inactive' && !sender.is_active);
    const matchesSearch = searchQuery === '' || 
      sender.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (sender.full_name && sender.full_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (sender.phone_number && sender.phone_number.includes(searchQuery));
    
    return matchesProvider && matchesStatus && matchesSearch;
  });

  const getProviderBadge = (provider: string) => {
    return provider === 'google' 
      ? <Badge variant="outline" className="text-blue-600 border-blue-600"><Globe className="h-3 w-3 mr-1" />Google</Badge>
      : <Badge variant="outline" className="text-green-600 border-green-600"><Mail className="h-3 w-3 mr-1" />Email OTP</Badge>;
  };

  const getStatusBadge = (isActive: boolean, sessionExpiresAt: string | null) => {
    const now = new Date();
    const sessionExpiry = sessionExpiresAt ? new Date(sessionExpiresAt) : null;
    const isSessionActive = sessionExpiry && sessionExpiry > now;

    if (isSessionActive) {
      return <Badge variant="outline" className="text-green-600 border-green-600"><Shield className="h-3 w-3 mr-1" />Online</Badge>;
    } else if (isActive) {
      return <Badge variant="outline" className="text-yellow-600 border-yellow-600"><Clock className="h-3 w-3 mr-1" />Offline</Badge>;
    } else {
      return <Badge variant="outline" className="text-red-600 border-red-600">Inactive</Badge>;
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getActiveSessionsCount = () => {
    const now = new Date();
    return senders.filter(sender => {
      const sessionExpiry = sender.session_expires_at ? new Date(sender.session_expires_at) : null;
      return sessionExpiry && sessionExpiry > now;
    }).length;
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Sender Management</h2>
            <p className="text-gray-600 mt-1 text-sm sm:text-base">
              Monitor donation senders and their activity
            </p>
          </div>
          <Button onClick={fetchSenders} disabled={isLoading} className="w-full sm:w-auto">
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">Total Senders</p>
                  <p className="text-lg sm:text-2xl font-bold text-gray-900">{senders.length}</p>
                </div>
                <Users className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 flex-shrink-0 ml-2" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">Active Sessions</p>
                  <p className="text-lg sm:text-2xl font-bold text-green-600">
                    {getActiveSessionsCount()}
                  </p>
                </div>
                <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 flex-shrink-0 ml-2" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">Google Auth</p>
                  <p className="text-lg sm:text-2xl font-bold text-blue-600">
                    {senders.filter(s => s.provider === 'google').length}
                  </p>
                </div>
                <Globe className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 flex-shrink-0 ml-2" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">Email OTP</p>
                  <p className="text-lg sm:text-2xl font-bold text-green-600">
                    {senders.filter(s => s.provider === 'email_otp').length}
                  </p>
                </div>
                <Mail className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 flex-shrink-0 ml-2" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="search">Search</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="Search by name, email, or phone..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="provider-filter">Provider</Label>
                <Select value={providerFilter} onValueChange={setProviderFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All providers" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Providers</SelectItem>
                    <SelectItem value="google">Google</SelectItem>
                    <SelectItem value="email_otp">Email OTP</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="status-filter">Status</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-end">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchQuery('');
                    setProviderFilter('all');
                    setStatusFilter('all');
                  }}
                  className="w-full"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Clear Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Senders List */}
        <Card>
          <CardHeader>
            <CardTitle>Donation Senders ({filteredSenders.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-16 bg-gray-200 rounded"></div>
                  </div>
                ))}
              </div>
            ) : filteredSenders.length > 0 ? (
              <div className="space-y-4">
                {filteredSenders.map((sender) => (
                  <div
                    key={sender.id}
                    className="p-3 sm:p-4 border rounded-lg hover:bg-gray-50 space-y-3 sm:space-y-4"
                  >
                    {/* Header with profile info */}
                    <div className="flex items-start space-x-3 sm:space-x-4">
                      <div className="flex-shrink-0">
                        {sender.profile_picture_url ? (
                          <img
                            src={sender.profile_picture_url}
                            alt={sender.full_name || sender.email}
                            className="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover"
                          />
                        ) : (
                          <div className="h-10 w-10 sm:h-12 sm:w-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 mb-2">
                          <h3 className="font-semibold text-gray-900 truncate text-sm sm:text-base">
                            {sender.full_name || sender.email}
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {getProviderBadge(sender.provider)}
                            {getStatusBadge(sender.is_active, sender.session_expires_at)}
                          </div>
                        </div>
                        
                        <div className="text-xs sm:text-sm text-gray-600 space-y-1">
                          <div className="flex items-center space-x-1 truncate">
                            <Mail className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                            <span className="truncate">{sender.email}</span>
                          </div>
                          {sender.phone_number && (
                            <div className="flex items-center space-x-1 truncate">
                              <Phone className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                              <span className="truncate">{sender.phone_number}</span>
                            </div>
                          )}
                          {sender.city && sender.state && (
                            <div className="flex items-center space-x-1 truncate">
                              <MapPin className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                              <span className="truncate">{sender.city}, {sender.state}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Activity and stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 text-xs sm:text-sm">
                      <div className="flex items-center space-x-1 text-gray-600">
                        <Calendar className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                        <span className="truncate">Joined {formatDate(sender.created_at)}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-gray-600">
                        <Clock className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                        <span className="truncate">Last login {formatDate(sender.last_login_at)}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-gray-600">
                        <Shield className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                        <span className="truncate">{sender.total_sessions} sessions</span>
                      </div>
                      <div className="flex items-center space-x-1 text-gray-600">
                        <DollarSign className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                        <span className="truncate">{sender.total_donations_count} donations</span>
                      </div>
                    </div>

                    {/* Additional info if available */}
                    {(sender.total_donated_amount > 0 || sender.last_activity_at) && (
                      <div className="pt-2 border-t border-gray-200">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600">
                          {sender.total_donated_amount > 0 && (
                            <div className="flex items-center space-x-1">
                              <DollarSign className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 flex-shrink-0" />
                              <span className="font-medium text-green-600 truncate">
                                Total donated: ₹{sender.total_donated_amount.toLocaleString()}
                              </span>
                            </div>
                          )}
                          {sender.last_activity_at && (
                            <div className="flex items-center space-x-1">
                              <Activity className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                              <span className="truncate">Last activity: {formatDate(sender.last_activity_at)}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No senders found matching your criteria</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
