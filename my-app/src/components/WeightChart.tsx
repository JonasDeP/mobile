import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { WeightEntry } from '../types';
import { borderRadius, spacing, typography } from '../constants/theme';

interface Props {
  entries: WeightEntry[];
}

const PADDING_LEFT = 30;
const PADDING_RIGHT = 10;
const PADDING_TOP = 10;
const PADDING_BOTTOM = 30;
const CHART_HEIGHT = 120;

const WeightChart: React.FC<Props> = ({ entries }) => {
  const { colors } = useTheme();

  if (entries.length === 0) {
    return (
      <View style={[styles.empty, { backgroundColor: colors.surface }]}>
        <Text style={{ ...typography.caption, color: colors.textSecondary }}>
          Nog geen gewicht geregistreerd
        </Text>
      </View>
    );
  }

  const recent = entries.slice(-14);
  const weights = recent.map((e) => e.weight);
  const min = Math.min(...weights);
  const max = Math.max(...weights);
  const range = max - min || 0.1;

  const chartWidth = 220; // will be overridden by flexStyle
  const availableWidth = chartWidth - PADDING_LEFT - PADDING_RIGHT;
  const availableHeight = CHART_HEIGHT - PADDING_TOP - PADDING_BOTTOM;

  const getX = (i: number) =>
    PADDING_LEFT + (i / (recent.length - 1 || 1)) * availableWidth;

  const getY = (weight: number) =>
    PADDING_TOP + (1 - (weight - min) / range) * availableHeight;

  const points = recent.map((e, i) => ({
    x: getX(i),
    y: getY(e.weight),
  }));

  // Build a flat list of line segments
  const lines: { x1: number; y1: number; x2: number; y2: number }[] = [];
  for (let i = 0; i < points.length - 1; i++) {
    lines.push({ x1: points[i].x, y1: points[i].y, x2: points[i + 1].x, y2: points[i + 1].y });
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <Text style={{ ...typography.caption, color: colors.textSecondary, marginBottom: spacing.sm }}>
        Gewicht (kg) — laatste {recent.length} metingen
      </Text>

      <View style={{ width: '100%', height: CHART_HEIGHT }}>
        {lines.map((line, i) => {
          const dx = line.x2 - line.x1;
          const dy = line.y2 - line.y1;
          const length = Math.sqrt(dx * dx + dy * dy);
          const angle = Math.atan2(dy, dx) * (180 / Math.PI);
          return (
            <View
              key={i}
              style={{
                position: 'absolute',
                left: line.x1,
                top: line.y1,
                width: length,
                height: 3,
                backgroundColor: colors.primary,
                transformOrigin: 'left center',
                transform: [{ rotate: `${angle}deg` }],
                borderRadius: 2,
              }}
            />
          );
        })}
        {points.map((pt, i) => (
          <View
            key={recent[i].id}
            style={{
              position: 'absolute',
              left: pt.x - 5,
              top: pt.y - 5,
              width: 10,
              height: 10,
              borderRadius: 5,
              backgroundColor: i === recent.length - 1 ? colors.primaryDark : colors.primary,
              borderWidth: 2,
              borderColor: colors.white,
            }}
          />
        ))}
        {/* Y-axis labels */}
        <Text style={{ position: 'absolute', left: 0, top: PADDING_TOP - 6, ...typography.small, color: colors.textSecondary }}>
          {max.toFixed(1)}
        </Text>
        <Text style={{ position: 'absolute', left: 0, top: PADDING_TOP + availableHeight - 6, ...typography.small, color: colors.textSecondary }}>
          {min.toFixed(1)}
        </Text>
        {/* X-axis labels */}
        <Text style={{ position: 'absolute', left: PADDING_LEFT - 8, top: CHART_HEIGHT - 16, ...typography.small, color: colors.textSecondary }}>
          {new Date(recent[0].date).toLocaleDateString('nl-NL', { day: 'numeric', month: 'short' })}
        </Text>
        <Text style={{ position: 'absolute', right: PADDING_RIGHT - 8, top: CHART_HEIGHT - 16, ...typography.small, color: colors.textSecondary }}>
          {new Date(recent[recent.length - 1].date).toLocaleDateString('nl-NL', { day: 'numeric', month: 'short' })}
        </Text>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: spacing.xs }}>
        <Text style={{ ...typography.small, color: colors.textSecondary }}>
          {entries[0].weight} kg
        </Text>
        <Text style={{ ...typography.body, color: colors.text, fontWeight: '700' }}>
          {entries[entries.length - 1].weight} kg
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { borderRadius: borderRadius.lg, padding: spacing.md, marginBottom: spacing.md },
  empty: { borderRadius: borderRadius.lg, padding: spacing.md, marginBottom: spacing.md, alignItems: 'center', justifyContent: 'center', height: 80 },
});

export default WeightChart;