import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Button,
  Animated,
} from 'react-native';

const dummyApiResponse = {
  status: 200,
  message: '',
  data: [
    { id: '1', name: 'John Doe', prn: 'PRN001', bed: 'B1', ward: 'Ward A', floor: '1' },
    { id: '2', name: 'Jane Smith', prn: 'PRN002', bed: 'B2', ward: 'Ward A', floor: '2' },
    { id: '3', name: 'Sam Wilson', prn: 'PRN003', bed: 'B3', ward: 'Ward B', floor: '1' },
    { id: '4', name: 'Emily Brown', prn: 'PRN004', bed: 'B4', ward: 'Ward B', floor: '3' },
    { id: '5', name: 'Chris Green', prn: 'PRN005', bed: 'B5', ward: 'Ward A', floor: '2' },
  ]
};

export default function HomeScreen({ navigation }) {
  const [people, setPeople] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedWard, setSelectedWard] = useState('');
  const [selectedFloor, setSelectedFloor] = useState('');
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    if (dummyApiResponse.status === 200) {
      setPeople(dummyApiResponse.data);
      setFiltered(dummyApiResponse.data);
    }
  }, []);

  useEffect(() => {
    const results = people.filter(person => {
      const matchesSearch = person.name.toLowerCase().includes(search.toLowerCase());
      const matchesWard = selectedWard ? person.ward === selectedWard : true;
      const matchesFloor = selectedFloor ? person.floor === selectedFloor : true;
      return matchesSearch && matchesWard && matchesFloor;
    });
    setFiltered(results);
  }, [search, selectedWard, selectedFloor]);

  const uniqueWards = [...new Set(people.map(p => p.ward))];
  const uniqueFloors = [...new Set(people.map(p => p.floor))];

  const renderPerson = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('PersonalDetails', { person: item })}>
    <View style={styles.card}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.details}>PRN: {item.prn}</Text>
      <Text style={styles.details}>Bed: {item.bed} | Ward: {item.ward} | Floor: {item.floor}</Text>
    </View>
  </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Hello, Welcome Back 👋</Text>

      <TextInput
        style={styles.search}
        placeholder="Search by name..."
        value={search}
        onChangeText={setSearch}
      />

      <TouchableOpacity style={styles.filterToggle} onPress={() => setShowFilter(!showFilter)}>
        <Text style={styles.filterToggleText}>{showFilter ? 'Hide Filters ▲' : 'Show Filters ▼'}</Text>
      </TouchableOpacity>

      {showFilter && (
        <View style={styles.filterContainer}>
          <Text style={styles.filterTitle}>Filter by Ward</Text>
          <View style={styles.filterGroup}>
            {uniqueWards.map(ward => (
              <TouchableOpacity
                key={ward}
                style={[
                  styles.filterButton,
                  selectedWard === ward && styles.selectedFilter
                ]}
                onPress={() => setSelectedWard(selectedWard === ward ? '' : ward)}
              >
                <Text style={styles.filterText}>{ward}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.filterTitle}>Filter by Floor</Text>
          <View style={styles.filterGroup}>
            {uniqueFloors.map(floor => (
              <TouchableOpacity
                key={floor}
                style={[
                  styles.filterButton,
                  selectedFloor === floor && styles.selectedFilter
                ]}
                onPress={() => setSelectedFloor(selectedFloor === floor ? '' : floor)}
              >
                <Text style={styles.filterText}>Floor {floor}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

     <FlatList
        data={
          search || selectedWard || selectedFloor
            ? filtered
            : people
        }
        keyExtractor={item => item.id}
        renderItem={renderPerson}
        contentContainerStyle={{ paddingBottom: 120 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f7fa',
  },
  header: {
    fontSize: 24, 
    fontWeight: '700',
    marginBottom: 12,
    color: '#333',
  },
  search: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 12,
  },
  filterToggle: {
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  filterToggleText: {
    color: '#3366ff',
    fontSize: 14,
    fontWeight: '500',
  },
  filterContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  filterTitle: {
    fontWeight: '600',
    marginBottom: 6,
  },
  filterGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  filterButton: {
    backgroundColor: '#eee',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 6,
  },
  selectedFilter: {
    backgroundColor: '#cde1ff',
  },
  filterText: {
    fontSize: 14,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  details: {
    color: '#555',
  },
});
