import React, { useState, useRef } from "react";
import { ScrollView, View, Button, Alert } from "react-native";
import { captureRef } from "react-native-view-shot";
import * as Print from "expo-print";

import Layout from "../components/layout/layout";
import ReportFilter from "../components/staffReport/ReportFilter";
import LineChartCard from "../components/staffReport/LineChartCard";
import BarChartCard from "../components/staffReport/BarChartCard";
import PieChartCard from "../components/staffReport/PieChartCard";
import ReportSummaryCard from "../components/staffReport/ReportSummaryCard";

export default function PatientReport({ route }) {
  const [filters, setFilters] = useState({});
  const reportRef = useRef();

  const handleExportPDF = async () => {
    try {
      // Capture the report as an image
      const uri = await captureRef(reportRef, {
        format: "png",
        quality: 0.9,
      });

      // Convert captured image to HTML for PDF
      const htmlContent = `
        <html>
          <body style="display:flex;justify-content:center;align-items:center;">
            <img src="${uri}" style="width:100%;height:auto;"/>
          </body>
        </html>
      `;

      // Generate the PDF
      const { uri: pdfUri } = await Print.printToFileAsync({
        html: htmlContent,
        base64: false,
      });

      Alert.alert("Report Generated", `PDF saved at:\n${pdfUri}`);
      // Optional: share it or open automatically
      // await Sharing.shareAsync(pdfUri);
    } catch (error) {
      console.error("PDF export failed:", error);
      Alert.alert("Error", "Failed to export report as PDF");
    }
  };

  return (
    <Layout title="Reports and Analytics">
      <View style={{ flex: 1, backgroundColor: "#f9fafb" }} ref={reportRef}>
        <ScrollView>
          <ReportFilter onFilterChange={(f) => setFilters(f)} />

          <LineChartCard title="Daily/Monthly Patient Visits" filters={filters} />
          <BarChartCard title="Department-wise Service Usage" filters={filters} />
          <PieChartCard title="Revenue by Payment Method" filters={filters} />
          <ReportSummaryCard title="Top 5 Departments by Visits" filters={filters} />

          <View style={{ margin: 16 }}>
            <Button title="Export Report as PDF" onPress={handleExportPDF} />
          </View>
        </ScrollView>
      </View>
    </Layout>
  );
}
