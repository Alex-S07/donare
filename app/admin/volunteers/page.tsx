'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AdminLayout from '@/components/admin/admin-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Users, 
  Clock, 
  Award, 
  TrendingUp, 
  Search, 
  Filter,
  Eye,
  CheckCircle,
  XCircle,
  MoreHorizontal,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Star,
  Activity
} from 'lucide-react';
import { toast } from 'sonner';
import { Volunteer, VolunteerStatistics } from '@/types/database';

interface VolunteerWithDetails extends Volunteer {
  activities?: any[];
  achievements?: any[];
}

export default function AdminVolunteersPage() {
  const [volunteers, setVolunteers] = useState<VolunteerWithDetails[]>([]);
  const [statistics, setStatistics] = useState<VolunteerStatistics | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVolunteer, setSelectedVolunteer] = useState<VolunteerWithDetails | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false);
  const [approvalAction, setApprovalAction] = useState<'approve' | 'reject'>('approve');
  const [approvalReason, setApprovalReason] = useState('');
  const [commitmentStartDate, setCommitmentStartDate] = useState('');
  
  // Filters
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchVolunteers();
    fetchStatistics();
  }, [statusFilter, searchQuery, currentPage]);

  const fetchVolunteers = async () => {
    try {
      setLoading(true);

      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10'
      });

      if (statusFilter !== 'all') {
        params.append('status', statusFilter);
      }

      if (searchQuery) {
        params.append('search', searchQuery);
      }

      const response = await fetch(`/api/admin/volunteers?${params}`, {
        credentials: 'include'
      });

      const data = await response.json();
      
      if (data.success) {
        setVolunteers(data.data);
        setTotalPages(data.pagination.totalPages);
      } else {
        toast.error(data.error || 'Failed to fetch volunteers');
      }
    } catch (error) {
      console.error('Error fetching volunteers:', error);
      toast.error('Failed to fetch volunteers');
    } finally {
      setLoading(false);
    }
  };

  const fetchStatistics = async () => {
    try {
      const response = await fetch('/api/admin/volunteers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ action: 'statistics' })
      });

      const data = await response.json();
      
      if (data.success) {
        setStatistics(data.data);
      }
    } catch (error) {
      console.error('Error fetching statistics:', error);
    }
  };

  const fetchVolunteerDetails = async (volunteerId: string) => {
    try {
      const response = await fetch(`/api/admin/volunteers/${volunteerId}`, {
        credentials: 'include'
      });

      const data = await response.json();
      
      if (data.success) {
        setSelectedVolunteer(data.data);
        setIsDetailModalOpen(true);
      } else {
        toast.error(data.error || 'Failed to fetch volunteer details');
      }
    } catch (error) {
      console.error('Error fetching volunteer details:', error);
      toast.error('Failed to fetch volunteer details');
    }
  };

  const handleApproval = async () => {
    if (!selectedVolunteer) return;

    try {
      const response = await fetch(`/api/admin/volunteers/${selectedVolunteer.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          action: approvalAction,
          [approvalAction === 'approve' ? 'approval_reason' : 'rejection_reason']: approvalReason,
          commitment_start_date: commitmentStartDate
        })
      });

      const data = await response.json();
      
      if (data.success) {
        toast.success(data.message);
        setIsApprovalModalOpen(false);
        setApprovalReason('');
        setCommitmentStartDate('');
        fetchVolunteers();
        fetchStatistics();
      } else {
        toast.error(data.error || 'Failed to process volunteer application');
      }
    } catch (error) {
      console.error('Error processing volunteer application:', error);
      toast.error('Failed to process volunteer application');
    }
  };

  const handleStatusUpdate = async (volunteerId: string, newStatus: 'active' | 'inactive') => {
    try {
      const response = await fetch(`/api/admin/volunteers/${volunteerId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          action: 'update_status',
          status: newStatus
        })
      });

      const data = await response.json();
      
      if (data.success) {
        toast.success(data.message);
        fetchVolunteers();
        fetchStatistics();
      } else {
        toast.error(data.error || 'Failed to update volunteer status');
      }
    } catch (error) {
      console.error('Error updating volunteer status:', error);
      toast.error('Failed to update volunteer status');
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800', icon: Clock },
      approved: { color: 'bg-blue-100 text-blue-800', icon: CheckCircle },
      active: { color: 'bg-green-100 text-green-800', icon: Activity },
      inactive: { color: 'bg-gray-100 text-gray-800', icon: XCircle },
      rejected: { color: 'bg-red-100 text-red-800', icon: XCircle }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    const Icon = config.icon;

    return (
      <Badge className={`${config.color} flex items-center gap-1`}>
        <Icon className="w-3 h-3" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatCommitmentDuration = (duration: string) => {
    const durationMap = {
      '1_month': '1 Month',
      '6_months': '6 Months',
      '1_year': '1 Year',
      'flexible': 'Flexible'
    };
    return durationMap[duration as keyof typeof durationMap] || duration;
  };

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Volunteer Management</h1>
          <p className="text-muted-foreground">Manage volunteer applications and activities</p>
        </div>
      </div>

      {/* Statistics Cards */}
      {statistics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Volunteers</p>
                  <p className="text-2xl font-bold text-foreground">{statistics.total_volunteers}</p>
                </div>
                <Users className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Volunteers</p>
                  <p className="text-2xl font-bold text-foreground">{statistics.active_volunteers}</p>
                </div>
                <Activity className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending Applications</p>
                  <p className="text-2xl font-bold text-foreground">{statistics.pending_applications}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Hours</p>
                  <p className="text-2xl font-bold text-foreground">{statistics.total_hours_volunteered}</p>
                </div>
                <Award className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search volunteers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Volunteers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Volunteers</CardTitle>
          <CardDescription>
            Manage volunteer applications and their status
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Commitment</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Applied</TableHead>
                    <TableHead>Hours</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {volunteers.map((volunteer) => (
                    <TableRow key={volunteer.id}>
                      <TableCell className="font-medium">{volunteer.full_name}</TableCell>
                      <TableCell>{volunteer.email}</TableCell>
                      <TableCell>{volunteer.phone_number}</TableCell>
                      <TableCell>{formatCommitmentDuration(volunteer.commitment_duration)}</TableCell>
                      <TableCell>{getStatusBadge(volunteer.status)}</TableCell>
                      <TableCell>{formatDate(volunteer.submitted_at)}</TableCell>
                      <TableCell>{volunteer.total_hours_volunteered}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => fetchVolunteerDetails(volunteer.id)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {volunteer.status === 'pending' && (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setSelectedVolunteer(volunteer);
                                  setApprovalAction('approve');
                                  setIsApprovalModalOpen(true);
                                }}
                                className="text-green-600 hover:text-green-700"
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setSelectedVolunteer(volunteer);
                                  setApprovalAction('reject');
                                  setIsApprovalModalOpen(true);
                                }}
                                className="text-red-600 hover:text-red-700"
                              >
                                <XCircle className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                          {volunteer.status === 'approved' && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleStatusUpdate(volunteer.id, 'active')}
                              className="text-green-600 hover:text-green-700"
                            >
                              Activate
                            </Button>
                          )}
                          {volunteer.status === 'active' && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleStatusUpdate(volunteer.id, 'inactive')}
                              className="text-yellow-600 hover:text-yellow-700"
                            >
                              Deactivate
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <p className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Volunteer Details Modal */}
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Volunteer Details</DialogTitle>
            <DialogDescription>
              Complete information about the volunteer application
            </DialogDescription>
          </DialogHeader>
          
          {selectedVolunteer && (
            <div className="space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Full Name</Label>
                    <p className="text-sm">{selectedVolunteer.full_name}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Age</Label>
                    <p className="text-sm">{selectedVolunteer.age}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Gender</Label>
                    <p className="text-sm capitalize">{selectedVolunteer.gender}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Phone</Label>
                    <p className="text-sm">{selectedVolunteer.phone_number}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Email</Label>
                    <p className="text-sm">{selectedVolunteer.email}</p>
                  </div>
                </div>
              </div>

              {/* Professional Details */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Professional Details</h3>
                <div className="space-y-3">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Current Occupation</Label>
                    <p className="text-sm">{selectedVolunteer.current_occupation || 'Not provided'}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Work Experience</Label>
                    <p className="text-sm">{selectedVolunteer.work_experience || 'Not provided'}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Educational Background</Label>
                    <p className="text-sm">{selectedVolunteer.educational_background || 'Not provided'}</p>
                  </div>
                </div>
              </div>

              {/* Volunteer Preferences */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Volunteer Preferences</h3>
                <div className="space-y-3">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Commitment Duration</Label>
                    <p className="text-sm">{formatCommitmentDuration(selectedVolunteer.commitment_duration)}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Preferred Activities</Label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {selectedVolunteer.preferred_activities?.map((activity, index) => (
                        <Badge key={index} variant="secondary">{activity}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Relevant Skills</Label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {selectedVolunteer.relevant_skills?.map((skill, index) => (
                        <Badge key={index} variant="outline">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Emergency Contact</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Name</Label>
                    <p className="text-sm">{selectedVolunteer.emergency_contact_name}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Relationship</Label>
                    <p className="text-sm">{selectedVolunteer.emergency_contact_relationship}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Phone</Label>
                    <p className="text-sm">{selectedVolunteer.emergency_contact_phone}</p>
                  </div>
                </div>
              </div>

              {/* Motivation Statement */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Motivation Statement</h3>
                <p className="text-sm bg-muted p-3 rounded-md">{selectedVolunteer.motivation_statement}</p>
              </div>

              {/* Activities and Achievements */}
              {selectedVolunteer.activities && selectedVolunteer.activities.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">Recent Activities</h3>
                  <div className="space-y-2">
                    {selectedVolunteer.activities.slice(0, 5).map((activity, index) => (
                      <div key={index} className="border rounded-md p-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{activity.activity_type}</p>
                            <p className="text-sm text-muted-foreground">{activity.activity_description}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">{activity.hours_worked}h</p>
                            <p className="text-xs text-muted-foreground">{formatDate(activity.activity_date)}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Approval Modal */}
      <Dialog open={isApprovalModalOpen} onOpenChange={setIsApprovalModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {approvalAction === 'approve' ? 'Approve Volunteer' : 'Reject Volunteer'}
            </DialogTitle>
            <DialogDescription>
              {approvalAction === 'approve' 
                ? 'Approve this volunteer application and set their commitment period.'
                : 'Reject this volunteer application with a reason.'
              }
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            {approvalAction === 'approve' && (
              <div>
                <Label htmlFor="startDate">Commitment Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={commitmentStartDate}
                  onChange={(e) => setCommitmentStartDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
            )}
            
            <div>
              <Label htmlFor="reason">
                {approvalAction === 'approve' ? 'Approval Reason' : 'Rejection Reason'}
              </Label>
              <Textarea
                id="reason"
                value={approvalReason}
                onChange={(e) => setApprovalReason(e.target.value)}
                placeholder={`Enter ${approvalAction === 'approve' ? 'approval' : 'rejection'} reason...`}
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsApprovalModalOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleApproval}
              className={approvalAction === 'approve' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}
            >
              {approvalAction === 'approve' ? 'Approve' : 'Reject'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      </div>
    </AdminLayout>
  );
}
