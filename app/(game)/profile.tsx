import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const router = useRouter();
  const [showDetails, setShowDetails] = useState(false);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Mock user data
  const userData = {
    name: 'Alex Farmer',
    level: 5,
    rewards: 12,
    bestLevel: 'Level 8',
    advertisements: 3,
    // Hidden details
    email: 'alex@listengreenfarm.com',
    phone: '+1 (555) 123-4567',
    joinDate: '2024-01-15'
  };

  const handleShowDetails = () => {
    if (isAuthenticated) {
      setShowDetails(!showDetails);
    } else {
      Alert.prompt(
        'Enter Password',
        'Please enter your password to view personal details:',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: (inputPassword) => {
              if (inputPassword === '1234') { // Simple demo password
                setIsAuthenticated(true);
                setShowDetails(true);
              } else {
                Alert.alert('Error', 'Incorrect password!');
              }
            },
          },
        ],
        'secure-text'
      );
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>👤 Profile</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>🌱</Text>
          </View>
          <Text style={styles.userName}>{userData.name}</Text>
          <Text style={styles.farmName}>Listen Green Farm</Text>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{userData.level}</Text>
            <Text style={styles.statLabel}>Level</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{userData.rewards}</Text>
            <Text style={styles.statLabel}>Rewards</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{userData.advertisements}</Text>
            <Text style={styles.statLabel}>Ads</Text>
          </View>
        </View>

        {/* Personal Details Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Personal Details</Text>
            <TouchableOpacity onPress={handleShowDetails}>
              <Text style={styles.toggleButton}>
                {showDetails ? 'Hide Details' : 'Show Details'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.detailsCard}>
            {/* Always visible */}
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Name:</Text>
              <Text style={styles.detailValue}>{userData.name}</Text>
            </View>

            {/* Hidden until authenticated */}
            {showDetails ? (
              <>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Email:</Text>
                  <Text style={styles.detailValue}>{userData.email}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Phone:</Text>
                  <Text style={styles.detailValue}>{userData.phone}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Join Date:</Text>
                  <Text style={styles.detailValue}>{userData.joinDate}</Text>
                </View>
              </>
            ) : (
              <View style={styles.hiddenSection}>
                <Text style={styles.hiddenText}>🔒 Details hidden for privacy</Text>
                <Text style={styles.hintText}>Click "Show Details" and enter password to view</Text>
              </View>
            )}
          </View>
        </View>

        {/* Game Records */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Game Records</Text>
          <View style={styles.recordsCard}>
            <View style={styles.recordItem}>
              <Text style={styles.recordLabel}>Best Level:</Text>
              <Text style={styles.recordValue}>{userData.bestLevel}</Text>
            </View>
            <View style={styles.recordItem}>
              <Text style={styles.recordLabel}>Total Rewards:</Text>
              <Text style={styles.recordValue}>{userData.rewards} collected</Text>
            </View>
            <View style={styles.recordItem}>
              <Text style={styles.recordLabel}>Advertisements:</Text>
              <Text style={styles.recordValue}>{userData.advertisements} watched</Text>
            </View>
          </View>
        </View>

        {/* AI Chatbot Button */}
        <TouchableOpacity style={styles.chatbotButton}>
          <Text style={styles.chatbotIcon}>🤖</Text>
          <View style={styles.chatbotText}>
            <Text style={styles.chatbotTitle}>Green Farm Assistant</Text>
            <Text style={styles.chatbotSubtitle}>Get farming advice from AI</Text>
          </View>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: 'white',
    padding: 20,
    paddingTop: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  backButton: {
    color: '#4caf50',
    fontSize: 16,
    fontWeight: '500',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2e7d32',
  },
  headerSpacer: {
    width: 40,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  profileCard: {
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#e8f5e8',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatarText: {
    fontSize: 35,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  farmName: {
    fontSize: 16,
    color: '#4caf50',
    fontWeight: '500',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
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
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  toggleButton: {
    color: '#2196f3',
    fontWeight: '500',
  },
  detailsCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '400',
  },
  hiddenSection: {
    alignItems: 'center',
    padding: 20,
  },
  hiddenText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  hintText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
  },
  recordsCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  recordItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  recordLabel: {
    fontSize: 14,
    color: '#666',
  },
  recordValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  chatbotButton: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  chatbotIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  chatbotText: {
    flex: 1,
  },
  chatbotTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  chatbotSubtitle: {
    fontSize: 12,
    color: '#666',
  },
  chevron: {
    fontSize: 20,
    color: '#999',
  },
});