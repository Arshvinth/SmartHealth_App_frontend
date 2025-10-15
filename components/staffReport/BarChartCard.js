import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { theme } from '../../theme';

const cardHorizontalMargin = theme.spacing.md * 2;
const cardPadding = theme.spacing.md * 2;
const screenWidth = Dimensions.get("window").width - cardHorizontalMargin;
const chartWidth = screenWidth - cardPadding * 2;

const BarChartCard = ({ title, filters }) => {
  // Determine if any filter is applied (not default)
  const isFilterApplied =
    (filters.dateRange && filters.dateRange !== "This Month") ||
    (filters.department && filters.department !== "All") ||
    (filters.patientType && filters.patientType !== "All");

  // Example data (replace with API or dynamic data later)
  const data = {
    labels: ['Cardiology', 'Radiology', 'Pediatrics', 'Neurology', 'Orthopedics'],
    datasets: [
      {
        data: [240, 180, 320, 210, 150],
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: theme.colors.surface,
    backgroundGradientTo: theme.colors.surface,
    color: (opacity = 1) => theme.colors.primary,
    fillShadowGradient: theme.colors.primary,
    fillShadowGradientOpacity: 0.9,
    barPercentage: 0.6,
    decimalPlaces: 0,
    labelColor: () => theme.colors.textSecondary,
    propsForBackgroundLines: {
      stroke: theme.colors.border,
    },
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>

      {/* Show filter summary only if a filter is applied */}
      {isFilterApplied && (
        <View style={styles.filterSummary}>
          <Text style={styles.filterText}>
            {filters.dateRange || "This Month"} |{" "}
            {filters.department || "All"} |{" "}
            {filters.patientType || "All"}
          </Text>
        </View>
      )}

      <BarChart
        data={data}
        width={chartWidth}
        height={260}
        chartConfig={chartConfig}
        style={styles.chart}
        fromZero
        showValuesOnTopOfBars={false}
      />
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

export default BarChartCard;
