// src/app/page.tsx
import Image from 'next/image';
import Link from 'next/link';
import { DashboardHeader } from '@/components/dashboard/header';
import { DashboardNav } from '@/components/dashboard/nav';
import { Overview } from '@/components/dashboard/overview';
import { RecentActivity } from '@/components/dashboard/recent-activity';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Using TypeScript for better type safety and developer experience
interface DashboardMetric {
  label: string;
  value: string;
  trend: number;
  icon: React.ReactNode;
}

export default function Home() {
  // Quick metrics shown at the top of the dashboard
  const metrics: DashboardMetric[] = [
    {
      label: 'Total Revenue',
      value: '$45,231.89',
      trend: 20.1,
      icon: '💰'
    },
    {
      label: 'Active Users',
      value: '2,345',
      trend: 15.3,
      icon: '👥'
    },
    {
      label: 'Pending Orders',
      value: '12',
      trend: -2.5,
      icon: '📦'
    }
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      
      <div className="flex flex-1">
        <DashboardNav />
        
        <main className="flex-1 p-6">
          <div className="flex flex-col space-y-6">
            {/* Welcome Section */}
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              <div className="flex items-center space-x-4">
                <Link 
                  href="/reports"
                  className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                >
                  Generate Report
                </Link>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {metrics.map((metric) => (
                <Card key={metric.label}>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                      {metric.label}
                    </CardTitle>
                    <span className="text-2xl">{metric.icon}</span>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{metric.value}</div>
                    <p className={`text-sm ${metric.trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {metric.trend > 0 ? '+' : ''}{metric.trend}% from last month
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Main Content Area */}
            <div className="grid gap-6 lg:grid-cols-2">
              <Overview />
              <RecentActivity />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}