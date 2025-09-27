'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/admin-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DollarSign,
  TrendingUp,
  Users,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  UserCheck,
  Send,
  Clock
} from 'lucide-react';
import { toast } from 'sonner';

interface DashboardStats {
  total_successful_donations: number;
  total_amount_raised: number;
  donations_last_30_days: number;
  donations_last_7_days: number;
  active_admin_users: number;
  admin_actions_today: number;
  total_senders: number;
  active_sender_sessions: number;
  total_receivers: number;
  pending_receiver_applications: number;
}

interface RecentDonation {
  id: number;
  name: string;
  amount: number;
  created_at: string;
  payment_status: boolean;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentDonations, setRecentDonations] = useState<RecentDonation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);

      // Fetch dashboard statistics
      const statsResponse = await fetch('/api/admin/dashboard/stats', {
        credentials: 'include',
      });

      if (statsResponse.ok) {
        const statsData = await statsResponse.json();
        if (statsData.success) {
          setStats(statsData.data);
        }
      }

      // Fetch recent donations
      const donationsResponse = await fetch('/api/admin/donations?limit=5', {
        credentials: 'include',
      });

      if (donationsResponse.ok) {
        const donationsData = await donationsResponse.json();
        if (donationsData.success) {
          setRecentDonations(donationsData.data.donations || []);
        }
      }

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const statCards = [
    {
      title: 'Total Donations',
      value: stats?.total_successful_donations || 0,
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Amount Raised',
      value: formatCurrency(stats?.total_amount_raised || 0),
      icon: TrendingUp,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Donation Senders',
      value: stats?.total_senders || 0,
      icon: Send,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: 'Pending Receivers',
      value: stats?.pending_receiver_applications || 0,
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Dashboard Overview</h2>
            <p className="text-gray-600 mt-1">
              Monitor donations and platform activity
            </p>
          </div>
          <Button onClick={fetchDashboardData} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {stat.value}
                      </p>
                    </div>
                    <div className={`p-3 rounded-full ${stat.bgColor}`}>
                      <Icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Donations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Recent Donations</span>
                <Badge variant="secondary">
                  {recentDonations.length} recent
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-3">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              ) : recentDonations.length > 0 ? (
                <div className="space-y-4">
                  {recentDonations.map((donation) => (
                    <div
                      key={donation.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">
                          {donation.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {formatDate(donation.created_at)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600">
                          {formatCurrency(donation.amount)}
                        </p>
                        <Badge
                          variant={donation.payment_status ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {donation.payment_status ? 'Completed' : 'Pending'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">
                  No recent donations
                </p>
              )}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <ArrowUpRight className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium text-gray-900">This Week</p>
                      <p className="text-sm text-gray-500">
                        {stats?.donations_last_7_days || 0} donations
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    +{((stats?.donations_last_7_days || 0) / 7).toFixed(1)}/day
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <DollarSign className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900">Average Donation</p>
                      <p className="text-sm text-gray-500">Per transaction</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-blue-600 border-blue-600">
                    {stats?.total_successful_donations
                      ? formatCurrency(
                          (stats.total_amount_raised || 0) / stats.total_successful_donations
                        )
                      : '₹0'}
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Users className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="font-medium text-gray-900">Admin Activity</p>
                      <p className="text-sm text-gray-500">Actions today</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-purple-600 border-purple-600">
                    {stats?.admin_actions_today || 0}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button className="h-20 flex flex-col space-y-2">
                <DollarSign className="h-6 w-6" />
                <span>View All Donations</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col space-y-2">
                <UserCheck className="h-6 w-6" />
                <span>Manage Receivers</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col space-y-2">
                <Send className="h-6 w-6" />
                <span>View Senders</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
