import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function Dashboard() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome to FarmEdu! 🌾</Text>
        <Text style={styles.subtitle}>Learn farming management</Text>
      </View>


      <ScrollView style={styles.content}>
        <View style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>Your Progress</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Crops Planted</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>$1000</Text>
              <Text style={styles.statLabel}>Money</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Days</Text>
            </View>
          </View>
        </View>
// Add this button to your Dashboard component:
<TouchableOpacity 
  style={styles.profileButton}
  onPress={() => router.push('/(game)/profile')}
>
  <Text style={styles.profileButtonText}>👤 View Profile</Text>
</TouchableOpacity>
        <TouchableOpacity 
          style={styles.gameButton}
          onPress={() => router.push('/(game)/farming')}
        >
          <Text style={styles.gameButtonText}>🚜 Start Farming Game</Text>
        </TouchableOpacity>

        <View style={styles.tipsContainer}>
          <Text style={styles.sectionTitle}>What You'll Learn</Text>
          <Text style={styles.tip}>• Crop management</Text>
          <Text style={styles.tip}>• Financial planning</Text>
          <Text style={styles.tip}>• Resource allocation</Text>
          <Text style={styles.tip}>• Market timing</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
profileButton: {
  backgroundColor: '#2196f3',
  padding: 15,
  borderRadius: 10,
  alignItems: 'center',
  marginBottom: 15,
},
profileButtonText: {
  color: 'white',
  fontSize: 16,
  fontWeight: 'bold',
},
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: 'white',
    padding: 20,
    paddingTop: 60,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2e7d32',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 5,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  statsContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4caf50',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  gameButton: {
    backgroundColor: '#ff9800',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  gameButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  tipsContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
  },
  tip: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
});