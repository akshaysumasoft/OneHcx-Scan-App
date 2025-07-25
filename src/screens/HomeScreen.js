import React, { useState, useEffect } from 'react';
import {ChevronRight, CircleUserRound, Search, SlidersHorizontal, SlidersVertical} from 'lucide-react-native'
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native';

const dummyApiResponse = {
  status: 200,
  message: '',
  data: [
    { id: '1', name: 'John Doe', age: 30, gender: "Male", prn: 'PRN001', bed: 'B1', ward: 'Ward A', floor: '1', insuranceCompany: "ABC Insurance", preauthStatus: "Draft", admissionDate: "2023-01-01" },
    { id: '2', name: 'Jane Smith', age: 25, gender: "Female", prn: 'PRN002', bed: 'B2', ward: 'Ward A', floor: '2', insuranceCompany: "XYZ Insurance", preauthStatus: "Draft", admissionDate: "2023-01-02" },
    { id: '3', name: 'Sam Wilson', age: 40, gender: "Male", prn: 'PRN003', bed: 'B3', ward: 'Ward B', floor: '1', insuranceCompany: "LMN Insurance", preauthStatus: "Draft", admissionDate: "2023-01-03" },
    { id: '4', name: 'Emily Brown', age: 35, gender: "Female", prn: 'PRN004', bed: 'B4', ward: 'Ward B', floor: '3', insuranceCompany: "OPQ Insurance", preauthStatus: "Draft", admissionDate: "2023-01-04" },
    { id: '5', name: 'Chris Green', age: 28, gender: "Male", prn: 'PRN005', bed: 'B5', ward: 'Ward A', floor: '2', insuranceCompany: "RST Insurance", preauthStatus: "Draft", admissionDate: "2023-01-05" },
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
      <View style={styles.imageContainer}>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.details}>PRN: {item.prn}</Text>
        <Text style={styles.details}>Bed: {item.bed} | Ward: {item.ward} | Floor: {item.floor}</Text>
      </View>
      <View style={styles.iconContainer}>
        <ChevronRight style={{color: '#163fa7fb'}}/>
      </View>
    </View>
  </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image source={require('../assets/logo-home.png')}
          style={styles.image}
        />
        <TouchableOpacity>
          <CircleUserRound size={32}/>
          {/* <Image source={require('../assets/profile-circle.svg')}
          style={styles.image}
          // resizeMode="contain"
          /> */}
        </TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.searchWrapper}>
          <View style={styles.searchContainer}>
          <Search color={'grey'}/>
          <TextInput
            style={styles.search}
            placeholder="Search by name..."
            value={search}
            onChangeText={setSearch}
          />
          </View>
          <TouchableOpacity style={styles.filterContainer}  onPress={() => setShowFilter(!showFilter)}>
            <SlidersVertical color={'grey'}/>
          </TouchableOpacity>
        </View>

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

        <Text style={{fontSize: 16, fontWeight: 500, paddingBottom: 8}}>Recent Patients</Text>

        <FlatList
            data={
              search || selectedWard || selectedFloor
                ? filtered
                : people
            }
            ItemSeparatorComponent={<View style={{height: 8}}></View>}
            keyExtractor={item => item.id}
            renderItem={renderPerson}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 120 }}
        />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 16,
    // backgroundColor:'white'
  },
  headerContainer:{
    marginBottom: 8,
    padding: 16,
    backgroundColor: 'white',
    alignItems:'center',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  contentContainer:{
    padding: 16,
    backgroundColor:'white'
  },
  searchContainer:{
    backgroundColor: '#fff',
    flexDirection:'row',
    alignItems:'center',
    gap: 4,
    borderRadius: 8,
    flex: 1,
    paddingLeft: 16,
    fontSize: 16,
    height: 48,
    boxSizing: 'border-box',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  filterContainer:{
    height: 48,
  },
  searchWrapper:{
    flexDirection:'row',
    justifyContent:'space-between',
    gap: 8,
  },
  search: {
    flex: 1
  },
  image:{
    height: 46,
    width: 144,
  },
  filterContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
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
    fontSize: 16,
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: '#ddd',
  },
  infoContainer:{

  },
  iconContainer:{
    justifyContent:'center',
    alignItems:'center'
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
