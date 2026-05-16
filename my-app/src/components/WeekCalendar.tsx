import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { typography } from '../constants/theme';

interface Props {
  visitedDates: string[];
  onToggleDate: (dateString: string) => void;
}

const DAYS = ['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo'];

const WeekCalendar: React.FC<Props> = ({ visitedDates, onToggleDate }) => {
  const { colors } = useTheme();

  const today = new Date();
  const monday = new Date(today);
  monday.setDate(today.getDate() - ((today.getDay() + 6) % 7));

  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });

  const formatDayKey = (d: Date) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  };

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      {days.map((day, i) => {
        const key = formatDayKey(day);
        const isVisited = visitedDates.includes(key);
        const isToday = formatDayKey(today) === key;
        const isFuture = day > today;

        return (
          <TouchableOpacity
            key={key}
            disabled={isFuture}
            onPress={() => onToggleDate(key)}
            style={{
              flex: 1,
              marginHorizontal: 3,
              alignItems: 'center',
              paddingVertical: 10,
              borderRadius: 10,
              backgroundColor: isVisited ? colors.primary : isFuture ? colors.surface : colors.surface,
              borderWidth: isToday && !isVisited ? 2 : 0,
              borderColor: colors.primary,
            }}
          >
            <Text style={{ ...typography.caption, color: isVisited ? colors.white : isFuture ? colors.textSecondary : colors.text, fontWeight: isToday ? '700' : '400' }}>
              {DAYS[i]}
            </Text>
            <Text style={{ ...typography.caption, color: isVisited ? colors.white : isFuture ? colors.textSecondary : colors.text, fontWeight: '700', marginTop: 4 }}>
              {day.getDate()}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default WeekCalendar;