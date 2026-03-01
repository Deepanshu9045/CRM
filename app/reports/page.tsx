"use client";

import React, { useEffect, useMemo, useState } from "react";
import { dashboardService } from "@/services/dashboard.service";
import { HeaderBar, DatePreset } from "@/components/reports/HeaderBar";
import { Section } from "@/components/reports/Section";
import { KpiGrid } from "@/components/reports/KpiGrid";
import { RevenueReports } from "@/components/reports/RevenueReports";
import { LeadsReports } from "@/components/reports/LeadsReports";
import { PipelineReports } from "@/components/reports/PipelineReports";
import { TasksReports } from "@/components/reports/TasksReports";
import { TeamPerformanceTable } from "@/components/reports/TeamPerformanceTable";
import { AdvancedFilters } from "@/components/reports/AdvancedFilters";
import { SmartAnalytics } from "@/components/reports/SmartAnalytics";
import { formatCurrency } from "@/components/reports/utils";

export default function ReportsPage() {
  // Filters and date range
  const [datePreset, setDatePreset] = useState<DatePreset>("this_month");
  const [customRange, setCustomRange] = useState<{ from?: string; to?: string }>({});
  const [filters, setFilters] = useState<{ salesperson?: string; team?: string; stage?: string; source?: string; minValue?: number; maxValue?: number }>({});

  // Basic data fetched from dashboard service to seed some charts
  const [loading, setLoading] = useState(true);
  const [monthlyRevenue, setMonthlyRevenue] = useState<{ name: string; value: number }[]>([]);
  const [stats, setStats] = useState<{ totalLeads: number; convertedCustomers: number; activeDeals: number; totalRevenue: number; conversionRate: number } | null>(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      try {
        const [rev, s] = await Promise.all([
          dashboardService.fetchMonthlyRevenue(),
          dashboardService.fetchDashboardStats(),
        ]);
        if (!mounted) return;
        setMonthlyRevenue(rev);
        setStats(s);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, [datePreset, customRange.from, customRange.to, filters.salesperson, filters.team, filters.stage, filters.source, filters.minValue, filters.maxValue]);

  // Placeholder/mock computed datasets for other charts until dedicated services exist
  const revenueBySalesperson = useMemo(() => [
    { name: "Alex", value: 120000 },
    { name: "Priya", value: 98000 },
    { name: "Sam", value: 87000 },
    { name: "Li", value: 66000 },
  ], []);

  const revenueByStage = useMemo(() => [
    { name: "Qualified", value: 45000 },
    { name: "Proposal", value: 78000 },
    { name: "Negotiation", value: 52000 },
    { name: "Won", value: 136000 },
  ], []);

  const forecastVsActual = useMemo(() => {
    const m = monthlyRevenue.map((d) => ({ month: d.name, actual: d.value, forecast: Math.round(d.value * 1.08) }));
    return m.length ? m : [
      { month: "Jan", actual: 80000, forecast: 86000 },
      { month: "Feb", actual: 92000, forecast: 100000 },
      { month: "Mar", actual: 110000, forecast: 118000 },
      { month: "Apr", actual: 90000, forecast: 104000 },
    ];
  }, [monthlyRevenue]);

  const leadsBySource = useMemo(() => [
    { name: "Website", value: 120 },
    { name: "Facebook", value: 70 },
    { name: "Referral", value: 55 },
    { name: "Email Campaign", value: 48 },
    { name: "Cold Call", value: 32 },
  ], []);

  const leadsByStatus = useMemo(() => [
    { name: "New", value: 140 },
    { name: "Contacted", value: 110 },
    { name: "Qualified", value: 80 },
    { name: "Proposal", value: 50 },
    { name: "Won", value: 36 },
    { name: "Lost", value: 22 },
  ], []);

  const funnelData = useMemo(() => [
    { name: "Lead In", value: 400 },
    { name: "Contacted", value: 300 },
    { name: "Qualified", value: 200 },
    { name: "Proposal", value: 120 },
    { name: "Won", value: 80 },
  ], []);

  const responseTime = useMemo(() => [
    { name: "Avg Response (hrs)", value: 5.2 },
    { name: "Median Response (hrs)", value: 3.4 },
  ], []);

  const dealsByStage = useMemo(() => [
    { name: "New", value: 50 },
    { name: "Contacted", value: 44 },
    { name: "Qualified", value: 30 },
    { name: "Proposal", value: 18 },
    { name: "Negotiation", value: 10 },
    { name: "Won", value: 8 },
  ], []);

  const winLoss = useMemo(() => [
    { name: "Won", value: 36 },
    { name: "Lost", value: 22 },
  ], []);

  const tasksCompletedPending = useMemo(() => [
    { name: "Completed", value: 180 },
    { name: "Pending", value: 65 },
  ], []);

  const tasksByPriority = useMemo(() => [
    { name: "High", value: 44 },
    { name: "Medium", value: 120 },
    { name: "Low", value: 81 },
    { name: "Urgent", value: 12 },
  ], []);

  const tasksByMember = useMemo(() => [
    { name: "Alex", value: 60 },
    { name: "Priya", value: 54 },
    { name: "Sam", value: 48 },
    { name: "Li", value: 36 },
  ], []);

  const overdueTrend = useMemo(() => [
    { month: "Jan", value: 10 },
    { month: "Feb", value: 14 },
    { month: "Mar", value: 9 },
    { month: "Apr", value: 12 },
    { month: "May", value: 8 },
  ], []);

  const teamTable = useMemo(() => [
    { name: "Alex Johnson", closed: 18, revenue: 120000, conv: 28, target: 92, art: "2h 15m" },
    { name: "Priya Sharma", closed: 15, revenue: 98000, conv: 24, target: 88, art: "2h 45m" },
    { name: "Sam Carter", closed: 12, revenue: 87000, conv: 21, target: 76, art: "3h 10m" },
    { name: "Li Wei", closed: 10, revenue: 66000, conv: 19, target: 70, art: "2h 55m" },
  ], []);

  // Derived KPIs
  const kpi = useMemo(() => {
    const totalRevenue = stats?.totalRevenue || 0;
    const avgDealSize = teamTable.length ? Math.round(totalRevenue / (teamTable.reduce((a, b) => a + b.closed, 0) || 1)) : 0;
    return {
      totalRevenue,
      revenueGrowthPct: 12, // placeholder vs last period
      totalLeads: stats?.totalLeads || 0,
      conversionRate: Math.round((stats?.conversionRate || 0) * 10) / 10,
      dealsWon: teamTable.reduce((a, b) => a + b.closed, 0),
      dealsLost: 22, // placeholder
      avgDealSize,
      targetAch: 86, // placeholder
    };
  }, [stats, teamTable]);

  // Export handlers (client-side CSV/XLSX/PDF minimal placeholders)
  function exportCSV() {
    const rows = [
      ["Metric", "Value"],
      ["Total Revenue", kpi.totalRevenue],
      ["Revenue Growth %", kpi.revenueGrowthPct],
      ["Total Leads", kpi.totalLeads],
      ["Lead Conversion Rate", kpi.conversionRate],
      ["Deals Won", kpi.dealsWon],
      ["Deals Lost", kpi.dealsLost],
      ["Average Deal Size", kpi.avgDealSize],
      ["Sales Target Achievement %", kpi.targetAch],
    ];
    const csv = rows.map(r => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `zest-reports-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function exportExcel() {
    // simple CSV with xls extension as placeholder
    exportCSV();
  }

  function downloadPDF() {
    window.print(); // basic printable export; can be replaced with jsPDF
  }

  function emailReport() {
    const subject = encodeURIComponent("Zest CRM Report");
    const body = encodeURIComponent(`Please find the Zest CRM report. Total Revenue: ${formatCurrency(kpi.totalRevenue)}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  }

  function resetFilters() {
    setFilters({});
  }

  return (
    <div className="space-y-8 p-4 lg:p-6">
      <HeaderBar
        datePreset={datePreset}
        setDatePreset={setDatePreset}
        customRange={customRange}
        setCustomRange={setCustomRange}
        onExportCSV={exportCSV}
        onExportExcel={exportExcel}
        onDownloadPDF={downloadPDF}
      />

      <KpiGrid kpi={kpi} />

      <Section title="Revenue Reports">
        <RevenueReports
          loading={loading}
          monthlyRevenue={monthlyRevenue}
          revenueBySalesperson={revenueBySalesperson}
          revenueByStage={revenueByStage}
          forecastVsActual={forecastVsActual}
        />
      </Section>

      <Section title="Leads Reports">
        <LeadsReports
          leadsBySource={leadsBySource}
          leadsByStatus={leadsByStatus}
          funnelData={funnelData}
          responseTime={responseTime}
        />
      </Section>

      <Section title="Pipeline Performance Reports">
        <PipelineReports dealsByStage={dealsByStage} winLoss={winLoss} />
      </Section>

      <Section title="Task Productivity Reports">
        <TasksReports
          tasksCompletedPending={tasksCompletedPending}
          tasksByPriority={tasksByPriority}
          tasksByMember={tasksByMember}
          overdueTrend={overdueTrend}
        />
      </Section>

      <Section title="Sales Team Performance">
        <TeamPerformanceTable rows={teamTable} />
      </Section>

      <AdvancedFilters
        filters={filters}
        setFilters={setFilters}
        onApply={() => {}}
        onReset={resetFilters}
        onEmail={emailReport}
      />

      <Section title="Smart Analytics">
        <SmartAnalytics kpi={{ totalRevenue: kpi.totalRevenue, revenueGrowthPct: kpi.revenueGrowthPct, conversionRate: kpi.conversionRate, targetAch: kpi.targetAch }} />
      </Section>
    </div>
  );
}
