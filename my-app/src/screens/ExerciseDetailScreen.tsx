import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { colors, spacing, borderRadius, typography } from '../constants/theme';
import CustomHeader from '../components/CustomHeader';
import Button from '../components/Button';

interface Props {
  route: any;
  navigation: any;
}

const ExerciseDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { exercise } = route.params;

  return (
    <View style={styles.container}>
      <CustomHeader
        title={exercise.name}
        leftIcon={<Text style={styles.backIcon}>←</Text>}
        onLeftPress={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.infoCard}>
          <Text style={styles.label}>Spiergroep</Text>
          <Text style={styles.value}>{exercise.muscleGroup}</Text>
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.label}>Moeilijkheid</Text>
          <Text style={styles.value}>{exercise.difficulty}</Text>
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.label}>Beschrijving</Text>
          <Text style={styles.description}>
            Dit is een effectieve oefening voor het trainen van {exercise.muscleGroup.toLowerCase()}.
            Zorg voor een goede vorm en controleer je bewegingen.
          </Text>
        </View>
        <Button
          title="Log Workout"
          onPress={() => navigation.navigate('Log', { exercise })}
          style={styles.logBtn}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.lg,
  },
  backIcon: {
    fontSize: 24,
    color: colors.white,
  },
  infoCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  label: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
    textTransform: 'uppercase',
  },
  value: {
    ...typography.h3,
    color: colors.text,
  },
  description: {
    ...typography.body,
    color: colors.text,
    lineHeight: 22,
  },
  logBtn: {
    marginTop: spacing.lg,
  },
});

export default ExerciseDetailScreen;
