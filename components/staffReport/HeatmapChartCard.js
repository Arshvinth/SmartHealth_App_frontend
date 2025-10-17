import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { theme } from "../../theme";

const cardHorizontalMargin = theme.spacing.md * 2;
const screenWidth = Dimensions.get("window").width - cardHorizontalMargin;
const gridColumns = 7; // 7 days (Mon–Sun)
const cellSize = (screenWidth - theme.spacing.md * 4) / gridColumns;

// Demo data generator (simulate occupancy %)
const generateHeatmapData = () => {
  return Array.from({ length: 28 }, () => Math.floor(Math.random() * 100));
};

const HeatmapChartCard = ({ title, filters }) => {
  const data = generateHeatmapData();

  // Determine if any filter is applied (not default)
  const isFilterApplied =
    (filters.dateRange && filters.dateRange !== "This Month") ||
    (filters.department && filters.department !== "All") ||
    (filters.patientType && filters.patientType !== "All");

  const getColor = (value) => {
    if (value < 30) return theme.colors.accent;
    if (value < 60) return theme.colors.secondary;
    if (value < 85) return theme.colors.warning;
    return theme.colors.error;
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

      <View style={styles.gridContainer}>
        {data.map((value, index) => (
          <View
            key={index}
            style={[
              styles.cell,
              { backgroundColor: getColor(value), opacity: 0.9 },
            ]}
          >
            <Text style={styles.cellText}>{value}%</Text>
          </View>
        ))}
      </View>

      <Text style={styles.legendLabel}>Occupancy Intensity</Text>
      <View style={styles.legend}>
        <View style={[styles.legendBox, { backgroundColor: theme.colors.accent }]} />
        <Text style={styles.legendText}>Low</Text>
        <View style={[styles.legendBox, { backgroundColor: theme.colors.secondary }]} />
        <Text style={styles.legendText}>Medium</Text>
        <View style={[styles.legendBox, { backgroundColor: theme.colors.warning }]} />
        <Text style={styles.legendText}>High</Text>
        <View style={[styles.legendBox, { backgroundColor: theme.colors.error }]} />
        <Text style={styles.legendText}>Critical</Text>
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
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: theme.spacing.sm,
  },
  cell: {
    width: cellSize,
    height: cellSize,
    margin: theme.spacing.xs,
    borderRadius: theme.radius.sm,
    alignItems: "center",
    justifyContent: "center",
  },
  cellText: {
    ...theme.typography.small,
    color: theme.colors.surface,
    fontWeight: "600",
  },
  filterSummary: {
    backgroundColor: theme.colors.background,
    padding: theme.spacing.sm,
    borderRadius: theme.radius.md,
  },
  filterText: {
    ...theme.typography.small,
    color: theme.colors.textSecondary,
    textAlign: "center",
  },
  legendLabel: {
    textAlign: "center",
    marginTop: theme.spacing.md,
    ...theme.typography.small,
    color: theme.colors.textPrimary,
  },
  legend: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: theme.spacing.xs,
  },
  legendBox: {
    width: 20,
    height: 20,
    borderRadius: theme.radius.sm,
  },
  legendText: {
    ...theme.typography.small,
    marginHorizontal: theme.spacing.xs,
  },
});

export default HeatmapChartCard;
