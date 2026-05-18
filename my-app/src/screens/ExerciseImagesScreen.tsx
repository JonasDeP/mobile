import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, Pressable, Image, Alert } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import CustomHeader from '../components/CustomHeader';
import Button from '../components/Button';
import { getExercises, updateExercise } from '../services/firestore';
import { ExerciseItem } from '../types';
import { spacing, borderRadius, typography } from '../constants/theme';

interface Props {
  navigation: any;
}

const ExerciseImagesScreen: React.FC<Props> = ({ navigation }) => {
  const { colors } = useTheme();
  const [exercises, setExercises] = useState<ExerciseItem[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [urlValue, setUrlValue] = useState('');
  const [saving, setSaving] = useState<string | null>(null);

  React.useEffect(() => {
    getExercises()
      .then((data) => { if (data.length > 0) setExercises(data); })
      .catch(() => {});
  }, []);

  const handleSave = async (exercise: ExerciseItem) => {
    if (!urlValue.trim()) {
      Alert.alert('Fout', 'Voer een URL in');
      return;
    }
    setSaving(exercise.id);
    try {
      await updateExercise(exercise.id, { imageUrl: urlValue.trim() });
      setExercises(prev => prev.map(ex => ex.id === exercise.id ? { ...ex, imageUrl: urlValue.trim() } : ex));
      setEditingId(null);
      setUrlValue('');
      Alert.alert('Opgeslagen', 'De afbeelding is bijgewerkt.');
    } catch {
      Alert.alert('Fout', 'Kon de afbeelding niet opslaan.');
    } finally {
      setSaving(null);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <CustomHeader
        title="Afbeeldingen"
        showBack
        onBack={() => navigation.goBack()}
      />
      <FlatList
        data={exercises}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: spacing.md }}
        ListHeaderComponent={
          <Text style={{ ...typography.body, color: colors.textSecondary, marginBottom: spacing.md }}>
            Zoek een foto op Unsplash, kopieer de URL en plak deze hieronder.
          </Text>
        }
        renderItem={({ item }) => (
          <View style={{ backgroundColor: colors.surface, borderRadius: borderRadius.lg, marginBottom: spacing.md, overflow: 'hidden' }}>
            <Image source={{ uri: item.imageUrl }} style={{ width: '100%', height: 160, backgroundColor: colors.border }} />
            <View style={{ padding: spacing.md }}>
              <Text style={{ ...typography.h3, color: colors.text, marginBottom: spacing.xs }}>{item.name}</Text>
              <Text style={{ ...typography.caption, color: colors.textSecondary, marginBottom: spacing.md }}>{item.muscleGroup}</Text>
              {editingId === item.id ? (
                <View>
                  <TextInput
                    value={urlValue}
                    onChangeText={setUrlValue}
                    placeholder="https://images.unsplash.com/..."
                    placeholderTextColor={colors.textSecondary}
                    style={{
                      backgroundColor: colors.background,
                      borderWidth: 1,
                      borderColor: colors.border,
                      borderRadius: borderRadius.md,
                      padding: spacing.sm,
                      color: colors.text,
                      fontSize: 14,
                    }}
                  />
                  <View style={{ flexDirection: 'row', gap: spacing.sm, marginTop: spacing.sm }}>
                    <Button
                      title="Opslaan"
                      onPress={() => handleSave(item)}
                      disabled={saving === item.id}
                      style={{ flex: 1 }}
                    />
                    <Pressable
                      onPress={() => { setEditingId(null); setUrlValue(''); }}
                      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                    >
                      <Text style={{ color: colors.textSecondary }}>Annuleren</Text>
                    </Pressable>
                  </View>
                </View>
              ) : (
                <Pressable
                  onPress={() => { setEditingId(item.id); setUrlValue(item.imageUrl); }}
                  style={{ backgroundColor: colors.primary, borderRadius: borderRadius.md, padding: spacing.sm, alignItems: 'center' }}
                >
                  <Text style={{ color: colors.white, fontWeight: '600' }}>URL wijzigen</Text>
                </Pressable>
              )}
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default ExerciseImagesScreen;