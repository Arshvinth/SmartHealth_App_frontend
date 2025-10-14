import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { theme } from "../../theme";

const cardHorizontalMargin = theme.spacing.md * 2;
const cardPadding = theme.spacing.md * 2;
const screenWidth = Dimensions.get("window").width - cardHorizontalMargin;
const chartWidth = screenWidth - cardPadding;

const LineChartCard = ({ title, filters }) => {
  // Demo data — later you’ll replace this with data fetched based on filters
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        data: [30, 45, 28, 80, 99, 43, 55],
        color: (opacity = 1) => theme.colors.primary, // line color
        strokeWidth: 3,
      },
    ],
    legend: ["Patient Visits"],
  };

  const chartConfig = {
    backgroundGradientFrom: theme.colors.surface,
    backgroundGradientTo: theme.colors.surface,
    color: (opacity = 1) => theme.colors.secondary,
    labelColor: (opacity = 1) => theme.colors.textSecondary,
    propsForDots: {
      r: "4",
      strokeWidth: "2",
      stroke: theme.colors.surface,
    },
    propsForBackgroundLines: {
      strokeDasharray: "",
      stroke: theme.colors.border,
    },
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <LineChart
        data={data}
        width={chartWidth}
        height={220}
        chartConfig={chartConfig}
        bezier
        style={styles.chart}
      />

      {/* Optional: show applied filters */}
      <View style={styles.filterSummary}>
        <Text style={styles.filterText}>
          {filters.dateRange || "This Month"} | {" "}
          {filters.department || "All"} | {" "}
          {filters.patientType || "All"}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md,
    marginHorizontal: theme.spacing.md,
    marginTop: theme.spacing.md,
    shadowColor: theme.colors.shadow,
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  title: {
    ...theme.typography.h2,
    color: theme.colors.primary,
    marginBottom: theme.spacing.sm,
  },
  chart: {
    borderRadius: theme.radius.md,
    alignSelf: "center",
  },
  filterSummary: {
    marginTop: theme.spacing.sm,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.sm,
    borderRadius: theme.radius.md,
  },
  filterText: {
    ...theme.typography.small,
    color: theme.colors.textSecondary,
    textAlign: "center",
  },
});

export default LineChartCard;
