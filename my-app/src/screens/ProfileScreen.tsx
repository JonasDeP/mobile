import React from 'react';
import { View, Text, Switch, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { useTheme } from '../context/ThemeContext';
import CustomHeader from '../components/CustomHeader';
import Button from '../components/Button';
import { toggleTheme } from '../store/themeSlice';
import { signOut } from '../services/auth';
import { useAuth } from '../hooks/useAuth';
import { spacing, borderRadius, typography } from '../constants/theme';

const ProfileScreen: React.FC = () => {
  const { user } = useAuth();
  const { colors } = useTheme();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      Alert.alert('Fout', 'Kon niet uitloggen');
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <CustomHeader title="Profiel" />
      <View style={{ padding: spacing.lg }}>
        <View style={{ backgroundColor: colors.surface, borderRadius: borderRadius.lg, padding: spacing.md, marginBottom: spacing.md }}>
          <Text style={{ ...typography.caption, color: colors.textSecondary, marginBottom: spacing.xs }}>Email</Text>
          <Text style={{ ...typography.body, color: colors.text, fontWeight: '600' }}>{user?.email || 'Niet ingelogd'}</Text>
        </View>

        <View style={{ backgroundColor: colors.surface, borderRadius: borderRadius.lg, padding: spacing.md, marginBottom: spacing.md, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View>
            <Text style={{ ...typography.body, color: colors.text, fontWeight: '600' }}>Donkere modus</Text>
            <Text style={{ ...typography.caption, color: colors.textSecondary, marginTop: spacing.xs }}>Schakel tussen licht en donker thema</Text>
          </View>
          <Switch
            value={false}
            onValueChange={() => { dispatch(toggleTheme()); }}
            trackColor={{ false: colors.border, true: colors.primary }}
            thumbColor={colors.white}
          />
        </View>

        <Button title="Uitloggen" onPress={handleLogout} variant="secondary" style={{ marginTop: spacing.lg }} />
      </View>
    </View>
  );
};

export default ProfileScreen;