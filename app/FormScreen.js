import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import OpenAI from 'openai';

const FormScreen = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    school: '',
    teacher: '',
    gradeLevel: '',
    subject: '',
    quarter: '',
    week: '',
    day: '',
    date: '',
    learningCompetencies: '',
    topic: '',
  });

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleGenerate = async () => {
    console.log('handleGenerate called');
    console.log('Form Data:', formData);
    setIsLoading(true);

    const openai = new OpenAI({ apiKey: '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', dangerouslyAllowBrowser: true });

    const prompt = `
      You are an expert in creating educational materials following the Department of Education (DepEd) standards in the Philippines.
      Based on the following information, generate the missing sections of a Daily Lesson Log (DLL).

      **Provided Information:**
      - **Grade Level:** ${formData.gradeLevel}
      - **Subject:** ${formData.subject}
      - **Lesson Title:** ${formData.topic}
      - **Learning Competencies (Objectives):** ${formData.learningCompetencies}

      **Generate the following sections:**
      1.  **Reference Materials:** (e.g., textbook/module/pages)
      2.  **Learning Resources:** (e.g., Textbooks, modules, worksheets, visuals, ICT tools)
      3.  **Procedures:** (A list of 9 steps)
          - 1. Review previous lesson / introduce new lesson
          - 2. State lesson purpose
          - 3. Present examples / illustrations
          - 4. Discuss and practice concepts/skills
          - 5. Develop mastery
          - 6. Apply concepts in real life
          - 7. Make generalizations / abstractions
          - 8. Evaluate learning (quiz, oral, or performance tasks)
          - 9. Additional activities for application/remediation
      4.  **Remarks:** (e.g., Lesson completion, extension, or adjustments)
      5.  **Reflection:** (A teacher's self-assessment: successes, difficulties, strategies for improvement)

      Return the output as a JSON object with the following keys: "referenceMaterials", "learningResources", "proc1", "proc2", "proc3", "proc4", "proc5", "proc6", "proc7", "proc8", "proc9", "remarks", "reflection".
      Do not include any introductory text or explanations outside of the JSON object.
    `;
    console.log('Prompt:', prompt);

    try {
      console.log('Calling OpenAI API...');
      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo-1106', // Or another suitable model
        messages: [{ role: 'user', content: prompt }],
        response_format: { type: "json_object" },
      });
      console.log('OpenAI Response:', response);

      const generatedContent = JSON.parse(response.choices[0].message.content);
      console.log('Generated Content:', generatedContent);

      const fullFormData = {
        ...formData,
        ...generatedContent,
      };
      console.log('Full Form Data:', fullFormData);

      router.push({ pathname: '/plan', params: { formData: JSON.stringify(fullFormData) } });
      console.log('Navigation to /plan successful');

    } catch (error) {
      console.error('Error during generation:', error);
      Alert.alert('Error', 'Failed to generate lesson plan. Please check your console for details.');
    } finally {
      setIsLoading(false);
      console.log('handleGenerate finished');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Header Information</Text>
      <TextInput style={styles.input} placeholder="School" onChangeText={(value) => handleInputChange('school', value)} />
      <TextInput style={styles.input} placeholder="Teacher" onChangeText={(value) => handleInputChange('teacher', value)} />
      <TextInput style={styles.input} placeholder="Grade Level" onChangeText={(value) => handleInputChange('gradeLevel', value)} />
      <TextInput style={styles.input} placeholder="Subject" onChangeText={(value) => handleInputChange('subject', value)} />
      <TextInput style={styles.input} placeholder="Quarter" onChangeText={(value) => handleInputChange('quarter', value)} />
      <TextInput style={styles.input} placeholder="Week" onChangeText={(value) => handleInputChange('week', value)} />
      <TextInput style={styles.input} placeholder="Day" onChangeText={(value) => handleInputChange('day', value)} />
      <TextInput style={styles.input} placeholder="Date" onChangeText={(value) => handleInputChange('date', value)} />

      <Text style={styles.header}>I. Objectives</Text>
      <TextInput style={styles.textArea} placeholder="Learning competencies (MELCs)" multiline onChangeText={(value) => handleInputChange('learningCompetencies', value)} />

      <Text style={styles.header}>II. Content</Text>
      <TextInput style={styles.input} placeholder="Topic / Lesson Title" onChangeText={(value) => handleInputChange('topic', value)} />

      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button
          title="Generate Lesson Plan"
          onPress={async () => await handleGenerate()}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    height: 100,
    textAlignVertical: 'top',
  },
  disclaimer: {
    fontSize: 12,
    color: 'gray',
    marginBottom: 20,
  },
});

export default FormScreen;
