import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { colors, spacing, typography } from '../constants/theme';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { signIn, signUp } from '../services/auth';

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });

  const validate = () => {
    const newErrors = { email: '', password: '' };
    if (!email) newErrors.email = 'Email is verplicht';
    if (!password) newErrors.password = 'Wachtwoord is verplicht';
    if (password && password.length < 6) newErrors.password = 'Wachtwoord moet minimaal 6 tekens zijn';
    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  const handleLogin = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      await signIn(email, password);
    } catch (error: any) {
      Alert.alert('Login mislukt', error.message || 'Controleer je gegevens');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      await signUp(email, password);
      Alert.alert('Succes', 'Account aangemaakt!');
    } catch (error: any) {
      Alert.alert('Registratie mislukt', error.message || 'Probeer opnieuw');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Workout Tracker</Text>
        <Text style={styles.subtitle}>Log in om te beginnen</Text>

        <InputField
          label="Email"
          value={email}
          onChangeText={setEmail}
          error={errors.email}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <InputField
          label="Wachtwoord"
          value={password}
          onChangeText={setPassword}
          error={errors.password}
          secureTextEntry
        />

        <Button title="Inloggen" onPress={handleLogin} disabled={loading} />
        <Button
          title="Registreren"
          variant="secondary"
          onPress={handleSignUp}
          disabled={loading}
          style={styles.signUpBtn}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: spacing.lg,
  },
  title: {
    ...typography.h1,
    color: colors.primary,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  signUpBtn: {
    marginTop: spacing.md,
  },
});

export default LoginScreen;
