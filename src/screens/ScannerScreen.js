import React, { useRef, useEffect, useState } from 'react';
import { View, Button, StyleSheet, Platform, PermissionsAndroid, Alert } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import  DocumentScanner  from 'react-native-document-scanner-plugin';

export default function ScannerScreen() {
  const camera = useRef(null);
  const devices = useCameraDevices();
  const device = devices.find(d => d.position === 'back');
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'granted');
      console.log('Camera permission status:', status);
    })();
  }, []);
  useEffect(() => {
    console.log('Camera devices:', devices);
    console.log('Selected device:', device);
    }, [devices, device]);

  const scanDocument = async () => {
    try {
        const { scannedImages } = await DocumentScanner.scanDocument();
        if (scannedImages && scannedImages.length) {
        console.log('Flattened scanned image:', scannedImages[0]);
        // You can display or process the flattened image here
        } else {
        console.log('No document scanned.');
        }
    } catch (error) {
        console.error('Document scan error:', error);
    }
  };

  if (!device || !hasPermission) return <View style={styles.container}><Button title="Waiting for camera..." disabled /></View>;

  return (
    <View style={styles.container}>
      {/* <View style={styles.previewContainer}>
        <Camera
          ref={camera}
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
          photo={true}
        />
      </View> */}
      <Button title="Scan" onPress={scanDocument} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewContainer: {
    width: '90%',
    height: '80%',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#000',
    marginBottom: 20,
  },
});