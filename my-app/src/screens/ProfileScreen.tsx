import React from 'react';
import { View, Text, Switch, Alert, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '../context/ThemeContext';
import CustomHeader from '../components/CustomHeader';
import Button from '../components/Button';
import { toggleTheme } from '../store/themeSlice';
import { signOut } from '../services/auth';
import { useAuth } from '../hooks/useAuth';
import { RootState } from '../store';
import { spacing, borderRadius, typography } from '../constants/theme';

const ProfileScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { user } = useAuth();
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const isDark = useSelector((state: RootState) => state.theme.mode === 'dark');

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
            value={isDark}
            onValueChange={() => { dispatch(toggleTheme()); }}
            trackColor={{ false: colors.border, true: colors.primary }}
            thumbColor={colors.white}
          />
        </View>

        <Button title="Uitloggen" onPress={handleLogout} variant="secondary" style={{ marginTop: spacing.lg }} />

        <Pressable
          onPress={() => navigation.navigate('ExerciseImages')}
          style={{ marginTop: spacing.lg, backgroundColor: colors.surface, borderRadius: borderRadius.lg, padding: spacing.md }}
        >
          <Text style={{ ...typography.body, color: colors.primary, fontWeight: '600' }}>Oefening afbeeldingen beheren</Text>
          <Text style={{ ...typography.caption, color: colors.textSecondary, marginTop: spacing.xs }}>Stel eigen foto's in voor elke oefening</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ProfileScreen;