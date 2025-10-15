import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { theme } from "../../theme";

const cardHorizontalMargin = theme.spacing.md * 2;
const cardPadding = theme.spacing.md * 2;
const screenWidth = Dimensions.get("window").width - cardHorizontalMargin;
const barMaxWidth = screenWidth - cardPadding * 3;

const ReportSummaryCard = ({ title, filters }) => {
  // Determine if any filter is applied (not default)
  const isFilterApplied =
    (filters.dateRange && filters.dateRange !== "This Month") ||
    (filters.department && filters.department !== "All") ||
    (filters.patientType && filters.patientType !== "All");

  // Demo data — later this can be fetched dynamically
  const departments = [
    { name: "Cardiology", visits: 320 },
    { name: "Pediatrics", visits: 260 },
    { name: "Radiology", visits: 210 },
    { name: "Orthopedics", visits: 180 },
    { name: "Dermatology", visits: 150 },
  ];

  const maxVisits = Math.max(...departments.map((d) => d.visits));

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

      <View style={styles.listContainer}>
        {departments.map((dept, index) => {
          const barWidth = (dept.visits / maxVisits) * barMaxWidth;
          const colorVariants = [
            theme.colors.primary,
            theme.colors.secondary,
            theme.colors.accent,
            theme.colors.warning,
            theme.colors.info,
          ];
          const barColor = colorVariants[index % colorVariants.length];

          return (
            <View key={dept.name} style={styles.row}>
              <View style={styles.rankCircle}>
                <Text style={styles.rankText}>{index + 1}</Text>
              </View>
              <View style={styles.departmentInfo}>
                <Text style={styles.departmentName}>{dept.name}</Text>
                <View style={[styles.barBackground]}>
                  <View
                    style={[styles.barFill, { width: barWidth, backgroundColor: barColor }]}
                  />
                </View>
              </View>
              <Text style={styles.visitsText}>{dept.visits}</Text>
            </View>
          );
        })}
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
  filterSummary: {
    marginBottom: theme.spacing.sm,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.sm,
    borderRadius: theme.radius.md,
  },
  filterText: {
    ...theme.typography.small,
    color: theme.colors.textSecondary,
    textAlign: "center",
  },
  listContainer: {
    marginTop: theme.spacing.sm,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: theme.spacing.xs,
  },
  rankCircle: {
    width: 28,
    height: 28,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.accent,
    alignItems: "center",
    justifyContent: "center",
    marginRight: theme.spacing.sm,
  },
  rankText: {
    ...theme.typography.small,
    color: theme.colors.surface,
    fontWeight: "700",
  },
  departmentInfo: {
    flex: 1,
  },
  departmentName: {
    ...theme.typography.body,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs / 2,
  },
  barBackground: {
    width: "100%",
    height: 10,
    backgroundColor: theme.colors.background,
    borderRadius: theme.radius.sm,
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    borderRadius: theme.radius.sm,
  },
  visitsText: {
    ...theme.typography.small,
    color: theme.colors.textSecondary,
    marginLeft: theme.spacing.sm,
    minWidth: 40,
    textAlign: "right",
  },
});

export default ReportSummaryCard;
