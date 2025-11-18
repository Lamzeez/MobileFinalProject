import React from 'react';
import { View, Text, Button, ScrollView, StyleSheet, Clipboard, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

const PlanScreen = () => {
  const router = useRouter();
  const { formData: formDataString } = useLocalSearchParams();
  const formData = JSON.parse(formDataString);

  const procedureSteps = [
    { label: '1. Review previous lesson / introduce new lesson', value: formData.proc1 },
    { label: '2. State lesson purpose', value: formData.proc2 },
    { label: '3. Present examples / illustrations', value: formData.proc3 },
    { label: '4. Discuss and practice concepts/skills', value: formData.proc4 },
    { label: '5. Develop mastery', value: formData.proc5 },
    { label: '6. Apply concepts in real life', value: formData.proc6 },
    { label: '7. Make generalizations / abstractions', value: formData.proc7 },
    { label: '8. Evaluate learning', value: formData.proc8 },
    { label: '9. Additional activities for application/remediation', value: formData.proc9 },
  ];

  const handleCopyToClipboard = () => {
    const lessonPlanText = `
      Generated Lesson Plan

      Header Information
      School: ${formData.school}
      Teacher: ${formData.teacher}
      Grade Level: ${formData.gradeLevel}
      Subject: ${formData.subject}
      Quarter: ${formData.quarter}
      Week: ${formData.week}
      Day: ${formData.day}
      Date: ${formData.date}

      I. Objectives
      ${formData.learningCompetencies}

      II. Content
      Topic / Lesson Title: ${formData.topic}
      Reference materials: ${formData.referenceMaterials}

      III. Learning Resources
      ${formData.learningResources}

      IV. Procedures
      ${procedureSteps.map(step => `${step.label}\n${step.value}`).join('\n\n')}

      V. Remarks
      ${formData.remarks}

      VI. Reflection
      ${formData.reflection}
    `;

    Clipboard.setString(lessonPlanText);
    Alert.alert('Copied!', 'The lesson plan has been copied to the clipboard.');
  };

  return (
    <ScrollView style={styles.container}>
      <Button title="Go Back to Form" onPress={() => router.back()} />
      <Button title="Copy to Clipboard" onPress={handleCopyToClipboard} />
      <Text style={styles.header}>Generated Lesson Plan</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Header Information</Text>
        <Text><Text style={styles.bold}>School:</Text> {formData.school}</Text>
        <Text><Text style={styles.bold}>Teacher:</Text> {formData.teacher}</Text>
        <Text><Text style={styles.bold}>Grade Level:</Text> {formData.gradeLevel}</Text>
        <Text><Text style={styles.bold}>Subject:</Text> {formData.subject}</Text>
        <Text><Text style={styles.bold}>Quarter:</Text> {formData.quarter}</Text>
        <Text><Text style={styles.bold}>Week:</Text> {formData.week}</Text>
        <Text><Text style={styles.bold}>Day:</Text> {formData.day}</Text>
        <Text><Text style={styles.bold}>Date:</Text> {formData.date}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>I. Objectives</Text>
        <Text>{formData.learningCompetencies}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>II. Content</Text>
        <Text><Text style={styles.bold}>Topic / Lesson Title:</Text> {formData.topic}</Text>
        <Text><Text style={styles.bold}>Reference materials:</Text> {formData.referenceMaterials}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>III. Learning Resources</Text>
        <Text>{formData.learningResources}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>IV. Procedures</Text>
        {procedureSteps.map((step, index) => (
          <View key={index} style={styles.procedureStep}>
            <Text style={styles.bold}>{step.label}</Text>
            <Text>{step.value}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>V. Remarks</Text>
        <Text>{formData.remarks}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>VI. Reflection</Text>
        <Text>{formData.reflection}</Text>
      </View>

      <Button title="Go Back to Form" onPress={() => router.back()} />
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
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 5,
  },
  bold: {
    fontWeight: 'bold',
  },
  procedureStep: {
    marginBottom: 10,
  }
});

export default PlanScreen;
