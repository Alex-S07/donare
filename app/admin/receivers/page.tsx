'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/admin-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Users,
  Building2,
  User,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  FileText,
  Phone,
  Mail,
  MapPin,
  RefreshCw,
  Search,
  Filter
} from 'lucide-react';
import { toast } from 'sonner';

interface DonationReceiver {
  id: string;
  receiver_type: 'ngo' | 'individual';
  status: 'pending' | 'approved' | 'rejected';
  phone_number: string;
  email: string | null;
  submitted_at: string;
  approved_at: string | null;
  approved_by_admin_id: number | null;
  rejection_reason: string | null;
  form_data: any;
  documents: any | null;
}

export default function ReceiversManagement() {
  const [receivers, setReceivers] = useState<DonationReceiver[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedReceiver, setSelectedReceiver] = useState<DonationReceiver | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [approvalAction, setApprovalAction] = useState<'approve' | 'reject'>('approve');
  const [rejectionReason, setRejectionReason] = useState('');
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Filters
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchReceivers = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/admin/receivers', {
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setReceivers(data.data.receivers || []);
        }
      } else {
        toast.error('Failed to load receivers');
      }
    } catch (error) {
      console.error('Error fetching receivers:', error);
      toast.error('Failed to load receivers');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReceivers();
  }, []);

  const handleApprovalAction = async () => {
    if (!selectedReceiver) return;

    setIsProcessing(true);
    try {
      const response = await fetch('/api/admin/receivers/approve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          receiver_id: selectedReceiver.id,
          action: approvalAction,
          rejection_reason: approvalAction === 'reject' ? rejectionReason : undefined,
          generated_password: approvalAction === 'approve' ? generatedPassword : undefined
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          toast.success(
            approvalAction === 'approve' 
              ? 'Receiver approved successfully' 
              : 'Receiver rejected successfully'
          );
          
          if (approvalAction === 'approve' && data.credentials) {
            toast.success(
              `Login credentials: ${data.credentials.phone_number} / ${data.credentials.password}`,
              { duration: 10000 }
            );
          }
          
          setShowApprovalModal(false);
          setSelectedReceiver(null);
          setRejectionReason('');
          setGeneratedPassword('');
          fetchReceivers();
        } else {
          toast.error(data.error || 'Action failed');
        }
      } else {
        toast.error('Failed to process request');
      }
    } catch (error) {
      console.error('Error processing approval:', error);
      toast.error('Failed to process request');
    } finally {
      setIsProcessing(false);
    }
  };

  const generateRandomPassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let result = '';
    for (let i = 0; i < 12; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setGeneratedPassword(result);
  };

  const filteredReceivers = receivers.filter(receiver => {
    const matchesStatus = statusFilter === 'all' || receiver.status === statusFilter;
    const matchesType = typeFilter === 'all' || receiver.receiver_type === typeFilter;
    const matchesSearch = searchQuery === '' || 
      receiver.phone_number.includes(searchQuery) ||
      receiver.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (receiver.form_data?.organization_name || receiver.form_data?.full_name || '')
        .toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesStatus && matchesType && matchesSearch;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="text-yellow-600 border-yellow-600"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
      case 'approved':
        return <Badge variant="outline" className="text-green-600 border-green-600"><CheckCircle className="h-3 w-3 mr-1" />Approved</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="text-red-600 border-red-600"><XCircle className="h-3 w-3 mr-1" />Rejected</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    return type === 'ngo' 
      ? <Badge variant="outline" className="text-blue-600 border-blue-600"><Building2 className="h-3 w-3 mr-1" />NGO</Badge>
      : <Badge variant="outline" className="text-purple-600 border-purple-600"><User className="h-3 w-3 mr-1" />Individual</Badge>;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Receiver Management</h2>
            <p className="text-gray-600 mt-1">
              Manage donation receiver applications and approvals
            </p>
          </div>
          <Button onClick={fetchReceivers} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Total Applications</p>
                  <p className="text-2xl font-bold text-gray-900">{receivers.length}</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Pending Review</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {receivers.filter(r => r.status === 'pending').length}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Approved</p>
                  <p className="text-2xl font-bold text-green-600">
                    {receivers.filter(r => r.status === 'approved').length}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Rejected</p>
                  <p className="text-2xl font-bold text-red-600">
                    {receivers.filter(r => r.status === 'rejected').length}
                  </p>
                </div>
                <XCircle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="search">Search</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="Search by phone, email, or name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="status-filter">Status</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="type-filter">Type</Label>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="ngo">NGO/Orphanage</SelectItem>
                    <SelectItem value="individual">Individual/Family</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-end">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchQuery('');
                    setStatusFilter('all');
                    setTypeFilter('all');
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

        {/* Receivers List */}
        <Card>
          <CardHeader>
            <CardTitle>Receiver Applications ({filteredReceivers.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-20 bg-gray-200 rounded"></div>
                  </div>
                ))}
              </div>
            ) : filteredReceivers.length > 0 ? (
              <div className="space-y-4">
                {filteredReceivers.map((receiver) => (
                  <div
                    key={receiver.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center space-x-3">
                        <h3 className="font-semibold text-gray-900">
                          {receiver.form_data?.organization_name || receiver.form_data?.full_name || 'Unknown'}
                        </h3>
                        {getTypeBadge(receiver.receiver_type)}
                        {getStatusBadge(receiver.status)}
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Phone className="h-4 w-4" />
                          <span>{receiver.phone_number}</span>
                        </div>
                        {receiver.email && (
                          <div className="flex items-center space-x-1">
                            <Mail className="h-4 w-4" />
                            <span>{receiver.email}</span>
                          </div>
                        )}
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>Applied {formatDate(receiver.submitted_at)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedReceiver(receiver);
                          setShowDetailsModal(true);
                        }}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      
                      {receiver.status === 'pending' && (
                        <>
                          <Button
                            size="sm"
                            onClick={() => {
                              setSelectedReceiver(receiver);
                              setApprovalAction('approve');
                              generateRandomPassword();
                              setShowApprovalModal(true);
                            }}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Approve
                          </Button>
                          
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => {
                              setSelectedReceiver(receiver);
                              setApprovalAction('reject');
                              setShowApprovalModal(true);
                            }}
                          >
                            <XCircle className="h-4 w-4 mr-2" />
                            Reject
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No receivers found matching your criteria</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Details Modal - Will be implemented in next part */}
      {/* Approval Modal - Will be implemented in next part */}
    </AdminLayout>
  );
}
