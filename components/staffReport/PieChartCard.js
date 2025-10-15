import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { theme } from "../../theme";
import { PieChart } from "react-native-chart-kit";

const cardHorizontalMargin = theme.spacing.md * 2;
const cardPadding = theme.spacing.md * 2;
const screenWidth = Dimensions.get("window").width - cardHorizontalMargin;
const chartWidth = screenWidth - cardPadding * 2;

const PieChartCard = ({ title, filters }) => {
  // Demo data — later you’ll replace this with data fetched based on filters
  const data = [
    {
      name: 'Cash',
      amount: 4500,
      color: theme.colors.primary,
      legendFontColor: theme.colors.textSecondary,
      legendFontSize: 14,
    },
    {
      name: 'Credit Card',
      amount: 3200,
      color: theme.colors.secondary,
      legendFontColor: theme.colors.textSecondary,
      legendFontSize: 14,
    },
    {
      name: 'Insurance',
      amount: 2800,
      color: theme.colors.accent,
      legendFontColor: theme.colors.textSecondary,
      legendFontSize: 14,
    },
    {
      name: 'Online Payment',
      amount: 1900,
      color: theme.colors.warning,
      legendFontColor: theme.colors.textSecondary,
      legendFontSize: 14,
    },
  ];

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <PieChart
        data={data}
        width={chartWidth}
        height={190}
        accessor="amount"
        backgroundColor="transparent"
        paddingLeft="10"
        chartConfig={{
          color: () => theme.colors.textPrimary,
        }}
        hasLegend
        absolute
        style={styles.chart}
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
});

export default PieChartCard;