import React from 'react';
import { View, Text, StyleSheet, Switch, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { colors, spacing, borderRadius, typography } from '../constants/theme';
import CustomHeader from '../components/CustomHeader';
import Button from '../components/Button';
import { RootState } from '../store';
import { toggleTheme } from '../store/themeSlice';
import { signOut } from '../services/auth';
import { useAuth } from '../hooks/useAuth';

const ProfileScreen: React.FC = () => {
  const { user } = useAuth();
  const theme = useSelector((state: RootState) => state.theme.mode);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      Alert.alert('Fout', 'Kon niet uitloggen');
    }
  };

  return (
    <View style={styles.container}>
      <CustomHeader title="Profiel" />
      <View style={styles.content}>
        <View style={styles.infoCard}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{user?.email || 'Niet ingelogd'}</Text>
        </View>

        <View style={styles.settingCard}>
          <View>
            <Text style={styles.settingLabel}>Donkere modus</Text>
            <Text style={styles.settingDescription}>Schakel tussen licht en donker thema</Text>
          </View>
          <Switch
            value={theme === 'dark'}
            onValueChange={() => { dispatch(toggleTheme()); }}
            trackColor={{ false: colors.border, true: colors.primary }}
            thumbColor={colors.white}
          />
        </View>

        <Button title="Uitloggen" onPress={handleLogout} variant="secondary" style={styles.logoutBtn} />
      </View>
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
  },
  value: {
    ...typography.body,
    color: colors.text,
    fontWeight: '600',
  },
  settingCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingLabel: {
    ...typography.body,
    color: colors.text,
    fontWeight: '600',
  },
  settingDescription: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  logoutBtn: {
    marginTop: spacing.lg,
  },
});

export default ProfileScreen;
