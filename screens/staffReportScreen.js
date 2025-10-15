import React, { useState } from "react";
import { ScrollView } from "react-native";
import Layout from "../components/layout/layout";
import ReportFilter from "../components/staffReport/ReportFilter";
import LineChartCard from "../components/staffReport/LineChartCard";
import BarChartCard from "../components/staffReport/BarChartCard";
import PieChartCard from "../components/staffReport/PieChartCard";
import HeatmapChartCard from "../components/staffReport/HeatmapChartCard";
import ReportSummaryCard from "../components/staffReport/ReportSummaryCard";

export default function PatientReport({ route }) {
  const [filters, setFilters] = useState({});

  return (
    <Layout title="Reports and Analytics">
      <ScrollView style={{ flex: 1, backgroundColor: '#f9fafb' }}>
        <ReportFilter onFilterChange={(f) => setFilters(f)} />

        <LineChartCard title="Daily/Monthly Patient Visits" filters={filters} />
        <BarChartCard title="Department-wise Service Usage" filters={filters} />
        <PieChartCard title="Revenue by Payment Method" filters={filters} />
        <HeatmapChartCard title="Hospital Occupancy Trends" filters={filters} />
        <ReportSummaryCard title="Top 5 Departments by Visits" filters={filters} />
      </ScrollView>
    </Layout>
  );
}

