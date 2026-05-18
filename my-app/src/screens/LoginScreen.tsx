import React, { useState } from 'react';
import { Text, Alert, KeyboardAvoidingView, Platform, ScrollView, Pressable, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { signIn, signUp } from '../services/auth';
import { spacing, typography } from '../constants/theme';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LoginScreen: React.FC = () => {
  const { colors } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '', confirmPassword: '' });
  const [touched, setTouched] = useState({ email: false, password: false, confirmPassword: false });

  const validateEmail = (value: string) => {
    if (!value.trim()) return 'Email is verplicht';
    if (!EMAIL_REGEX.test(value.trim())) return 'Ongeldig email-formaat';
    return '';
  };

  const validatePassword = (value: string) => {
    if (!value) return 'Wachtwoord is verplicht';
    if (value.length < 6) return 'Moet minimaal 6 tekens zijn';
    return '';
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    if (touched.email) {
      setErrors(prev => ({ ...prev, email: isSignUp ? validateEmail(text) : '' }));
    }
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    if (touched.password) {
      setErrors(prev => ({ ...prev, password: validatePassword(text) }));
    }
  };

  const handleBlur = (field: 'email' | 'password' | 'confirmPassword') => {
    setTouched(prev => ({ ...prev, [field]: true }));
    if (field === 'email') setErrors(prev => ({ ...prev, email: validateEmail(email) }));
    if (field === 'password') setErrors(prev => ({ ...prev, password: validatePassword(password) }));
    if (field === 'confirmPassword') {
      const err = !confirmPassword ? 'Bevestig je wachtwoord' : confirmPassword !== password ? 'Wachtwoorden komen niet overeen' : '';
      setErrors(prev => ({ ...prev, confirmPassword: err }));
    }
  };

  const validateAll = () => {
    const emailErr = validateEmail(email);
    const pwErr = validatePassword(password);
    let confirmErr = '';
    if (isSignUp) {
      if (!confirmPassword) confirmErr = 'Bevestig je wachtwoord';
      else if (confirmPassword !== password) confirmErr = 'Wachtwoorden komen niet overeen';
    }
    setErrors({ email: emailErr, password: pwErr, confirmPassword: confirmErr });
    setTouched({ email: true, password: true, confirmPassword: true });
    return !emailErr && !pwErr && !confirmErr;
  };

  const handleLogin = async () => {
    if (!validateAll()) return;
    setLoading(true);
    try {
      await signIn(email.trim(), password);
    } catch (error: any) {
      Alert.alert('Login mislukt', error.message || 'Controleer je gegevens');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    if (!validateAll()) return;
    setLoading(true);
    try {
      await signUp(email.trim(), password);
      Alert.alert('Succes', 'Account aangemaakt!');
      setIsSignUp(false);
    } catch (error: any) {
      Alert.alert('Registratie mislukt', error.message || 'Probeer opnieuw');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.background }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: spacing.lg }} keyboardShouldPersistTaps="handled">
        <View style={{ alignItems: 'center', marginBottom: spacing.lg }}>
          <Text style={{ fontSize: 64 }}>💪</Text>
          <Text style={{ ...typography.h1, color: colors.primary, textAlign: 'center', marginTop: spacing.xs }}>WORKOUT TRACKER</Text>
        </View>
        <Text style={{ ...typography.body, color: colors.textSecondary, textAlign: 'center', marginBottom: spacing.xl }}>{isSignUp ? 'Maak een account aan' : 'Log in om te beginnen'}</Text>

        <InputField
          label="Email"
          value={email}
          onChangeText={handleEmailChange}
          onBlur={() => handleBlur('email')}
          error={touched.email ? errors.email : ''}
          keyboardType="email-address"
          autoCapitalize="none"
          returnKeyType="next"
          onSubmitEditing={() => {}}
        />
        <InputField
          label="Wachtwoord"
          value={password}
          onChangeText={handlePasswordChange}
          onBlur={() => handleBlur('password')}
          error={touched.password ? errors.password : ''}
          secureTextEntry
          returnKeyType={isSignUp ? 'next' : 'done'}
          onSubmitEditing={isSignUp ? undefined : handleLogin}
        />
        {isSignUp && (
          <InputField
            label="Bevestig wachtwoord"
            value={confirmPassword}
            onChangeText={(text) => {
              setConfirmPassword(text);
              if (touched.confirmPassword) {
                const err = !text ? 'Bevestig je wachtwoord' : text !== password ? 'Wachtwoorden komen niet overeen' : '';
                setErrors(prev => ({ ...prev, confirmPassword: err }));
              }
            }}
            onBlur={() => handleBlur('confirmPassword')}
            error={touched.confirmPassword ? errors.confirmPassword : ''}
            secureTextEntry
            returnKeyType="done"
            onSubmitEditing={handleSignUp}
          />
        )}

        <Button
          title={isSignUp ? 'Registreren' : 'Inloggen'}
          onPress={isSignUp ? handleSignUp : handleLogin}
          disabled={loading}
        />
        <Pressable onPress={() => { setIsSignUp(!isSignUp); setErrors({ email: '', password: '', confirmPassword: '' }); setTouched({ email: false, password: false, confirmPassword: false }); }}>
          <Text style={{ ...typography.body, color: colors.primary, textAlign: 'center', marginTop: spacing.lg }}>
            {isSignUp ? 'Heb je al een account? Log in' : 'Nog geen account? Registreer'}
          </Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;