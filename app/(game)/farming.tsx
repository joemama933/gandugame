import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';

export default function FarmingGame() {
  const router = useRouter();
  const [money, setMoney] = useState(1000);
  const [crops, setCrops] = useState([]);
  const [day, setDay] = useState(1);

  const availableCrops = [
    { id: 1, name: 'Wheat', cost: 100, growthTime: 3, sellPrice: 150 },
    { id: 2, name: 'Corn', cost: 150, growthTime: 4, sellPrice: 220 },
    { id: 3, name: 'Tomato', cost: 200, growthTime: 5, sellPrice: 300 },
  ];

  const plantCrop = (crop) => {
    if (money >= crop.cost) {
      setMoney(money - crop.cost);
      setCrops([...crops, {
        ...crop,
        plantedDay: day,
        progress: 0
      }]);
      Alert.alert('Planted!', `You planted ${crop.name}`);
    } else {
      Alert.alert('Oops!', 'Not enough money');
    }
  };

  const harvestCrop = (crop, index) => {
    if (crop.progress >= crop.growthTime) {
      setMoney(money + crop.sellPrice);
      const newCrops = [...crops];
      newCrops.splice(index, 1);
      setCrops(newCrops);
      Alert.alert('Harvested!', `You earned $${crop.sellPrice}`);
    }
  };

  const advanceDay = () => {
    setDay(day + 1);
    setCrops(crops.map(crop => ({
      ...crop,
      progress: crop.progress + 1
    })));
  };

  const getCropStatus = (crop) => {
    const progress = (crop.progress / crop.growthTime) * 100;
    if (progress >= 100) return 'Ready to Harvest!';
    return `Growing... ${Math.min(progress, 100).toFixed(0)}%`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Farming Simulator</Text>
        <View>
          <Text style={styles.stats}>Day: {day}</Text>
          <Text style={styles.stats}>Money: ${money}</Text>
        </View>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Available Crops</Text>
        <View style={styles.cropsGrid}>
          {availableCrops.map(crop => (
            <TouchableOpacity 
              key={crop.id}
              style={styles.cropCard}
              onPress={() => plantCrop(crop)}
            >
              <Text style={styles.cropName}>{crop.name}</Text>
              <Text style={styles.cropCost}>Cost: ${crop.cost}</Text>
              <Text style={styles.cropInfo}>Sells for: ${crop.sellPrice}</Text>
              <Text style={styles.cropInfo}>Grows in: {crop.growthTime} days</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Your Farm</Text>
        {crops.length === 0 ? (
          <Text style={styles.empty}>No crops planted yet!</Text>
        ) : (
          crops.map((crop, index) => (
            <View key={index} style={styles.farmPlot}>
              <Text style={styles.cropName}>{crop.name}</Text>
              <Text style={styles.cropStatus}>{getCropStatus(crop)}</Text>
              {crop.progress >= crop.growthTime && (
                <TouchableOpacity 
                  style={styles.harvestButton}
                  onPress={() => harvestCrop(crop, index)}
                >
                  <Text style={styles.harvestText}>Harvest</Text>
                </TouchableOpacity>
              )}
            </View>
          ))
        )}
      </ScrollView>

      <TouchableOpacity style={styles.advanceButton} onPress={advanceDay}>
        <Text style={styles.advanceText}>Advance to Next Day</Text>
      </TouchableOpacity>
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
  },
  backButton: {
    color: '#4caf50',
    fontSize: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2e7d32',
  },
  stats: {
    fontSize: 14,
    color: '#666',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  cropsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  cropCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    width: '48%',
    marginBottom: 10,
    alignItems: 'center',
  },
  cropName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cropCost: {
    color: '#4caf50',
    fontWeight: '500',
  },
  cropInfo: {
    fontSize: 12,
    color: '#666',
  },
  farmPlot: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  cropStatus: {
    color: '#666',
    marginTop: 5,
  },
  harvestButton: {
    backgroundColor: '#4caf50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  harvestText: {
    color: 'white',
    fontWeight: 'bold',
  },
  empty: {
    textAlign: 'center',
    color: '#666',
    fontStyle: 'italic',
    padding: 20,
  },
  advanceButton: {
    backgroundColor: '#2196f3',
    padding: 15,
    alignItems: 'center',
    margin: 20,
    borderRadius: 10,
  },
  advanceText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});