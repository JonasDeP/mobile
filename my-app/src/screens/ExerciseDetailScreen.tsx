import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import CustomHeader from '../components/CustomHeader';
import Button from '../components/Button';
import { spacing, borderRadius, typography } from '../constants/theme';

interface Props {
  route: any;
  navigation: any;
}

const ExerciseDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { colors } = useTheme();
  const { exercise } = route.params;

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <CustomHeader
        title={exercise.name}
        leftIcon={<Text style={{ fontSize: 24, color: colors.white }}>←</Text>}
        onLeftPress={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={{ padding: spacing.lg }}>
        <View style={{ backgroundColor: colors.surface, borderRadius: borderRadius.lg, padding: spacing.md, marginBottom: spacing.md }}>
          <Text style={{ ...typography.caption, color: colors.textSecondary, marginBottom: spacing.xs, textTransform: 'uppercase' }}>Spiergroep</Text>
          <Text style={{ ...typography.h3, color: colors.text }}>{exercise.muscleGroup}</Text>
        </View>
        <View style={{ backgroundColor: colors.surface, borderRadius: borderRadius.lg, padding: spacing.md, marginBottom: spacing.md }}>
          <Text style={{ ...typography.caption, color: colors.textSecondary, marginBottom: spacing.xs, textTransform: 'uppercase' }}>Moeilijkheid</Text>
          <Text style={{ ...typography.h3, color: colors.text }}>{exercise.difficulty}</Text>
        </View>
        <View style={{ backgroundColor: colors.surface, borderRadius: borderRadius.lg, padding: spacing.md, marginBottom: spacing.md }}>
          <Text style={{ ...typography.caption, color: colors.textSecondary, marginBottom: spacing.xs, textTransform: 'uppercase' }}>Beschrijving</Text>
          <Text style={{ ...typography.body, color: colors.text, lineHeight: 22 }}>
            Dit is een effectieve oefening voor het trainen van {exercise.muscleGroup.toLowerCase()}.
            Zorg voor een goede vorm en controleer je bewegingen.
          </Text>
        </View>
        <Button
          title="Log Workout"
          onPress={() => navigation.navigate('Log', { exercise })}
          style={{ marginTop: spacing.lg }}
        />
      </ScrollView>
    </View>
  );
};

export default ExerciseDetailScreen;