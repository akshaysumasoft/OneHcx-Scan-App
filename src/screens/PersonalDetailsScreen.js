import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, FlatList, Switch, Alert, TouchableOpacity } from 'react-native';
import  DocumentScanner  from 'react-native-document-scanner-plugin';

const requiredDocuments = [
  'Consent Form',
  'Insurance Card',
  'ID Proof',
  'Admission Letter'
];

export default function PersonDetails({ route, navigation }) {
  const { person } = route.params;

  // Track state of each document
  const [docStatus, setDocStatus] = useState({});

  useEffect(() => {
    // Initialize document status on mount
    const initialStatus = {};
    requiredDocuments.forEach(doc => {
      initialStatus[doc] = { uploaded: false, notAvailable: false };
    });
    setDocStatus(initialStatus);
  }, []);

  const handleScan = (docType) => {
    // Mock upload process
    setDocStatus(prev => ({
      ...prev,
      [docType]: { ...prev[docType], uploaded: true }
    }));

    // In real use, you'd call navigation.navigate here
    // navigation.navigate('Scanner', { personId: person.id, documentType: docType });
    // opening scanner screen directly for simplicity
    scanDocument();
  };

  const toggleNotAvailable = (docType) => {
    setDocStatus(prev => ({
      ...prev,
      [docType]: {
        ...prev[docType],
        notAvailable: !prev[docType].notAvailable,
        uploaded: prev[docType].notAvailable ? false : prev[docType].uploaded
      }
    }));
  };

  const allHandled = Object.values(docStatus).every(
    status => status.uploaded || status.notAvailable
  );

  const handleSubmit = () => {
    Alert.alert("Success", "All documents handled. Proceeding...");
  };

  const scanDocument = async () => {
    try {
        const { scannedImages } = await DocumentScanner.scanDocument();
        if (scannedImages && scannedImages.length) {
        console.log('Flattened scanned images:', scannedImages);
        // You can display or process the flattened image here
        } else {
        console.log('No document scanned.');
        }
    } catch (error) {
        console.error('Document scan error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{person.name}</Text>
      <Text style={styles.detail}>Age: {person.age}</Text>
      <Text style={styles.detail}>Gender: {person.gender}</Text>
      <Text style={styles.detail}>PRN: {person.prn}</Text>
      <Text style={styles.detail}>Bed: {person.bed}</Text>
      <Text style={styles.detail}>Ward: {person.ward}</Text>
      <Text style={styles.detail}>Floor: {person.floor}</Text>
      <Text style={styles.detail}>Insurance Company: {person.insuranceCompany}</Text>
      <Text style={styles.detail}>Preauth Status: {person.preauthStatus}</Text>
      <Text style={styles.detail}>Admission Date: {person.admissionDate}</Text>

      <Text style={styles.sectionTitle}>Required Documents</Text>

      <FlatList
        data={requiredDocuments}
        keyExtractor={(item) => item}
        renderItem={({ item }) => {
          const status = docStatus[item] || {};
          return (
            <View style={styles.docItem}>
              <View style={{ flex: 1 }}>
                <Text style={styles.docText}>{item}</Text>
                <View style={styles.row}>
                  <Text style={styles.notAvailableLabel}>Not Available</Text>
                  <Switch
                    value={status.notAvailable}
                    onValueChange={() => toggleNotAvailable(item)}
                  />
                </View>
              </View>
              <Button
                title={status.uploaded ? "Scanned" : "Scan"}
                onPress={() => handleScan(item)}
                disabled={status.uploaded || status.notAvailable}
              />
            </View>
          );
        }}
        contentContainerStyle={{ paddingBottom: 120 }}
      />

      <View style={styles.submitContainer}>
        <TouchableOpacity
          style={[
            styles.uploadButton,
            { backgroundColor: allHandled ? '#4CAF50' : '#ccc' }
          ]}
          onPress={handleSubmit}
          disabled={!allHandled}
        >
          <Text style={styles.uploadText}>Upload</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f7fa',
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 12,
  },
  detail: {
    fontSize: 16,
    marginBottom: 6,
    color: '#333',
  },
  sectionTitle: {
    marginTop: 24,
    marginBottom: 12,
    fontSize: 18,
    fontWeight: '600',
  },
  docItem: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  docText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 6,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  notAvailableLabel: {
    fontSize: 14,
    marginRight: 8,
    color: '#555',
  },
  submitContainer: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
  },
  uploadButton: {
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  uploadText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },    
});
