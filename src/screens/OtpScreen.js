import React, { useState, useContext } from 'react';
import { View, TextInput, Button } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';

export default function OtpScreen({ navigation }) {
  const [otp, setOtp] = useState('');
  const { login } = useContext(AuthContext);

  const handleConfirm = () => {
    login('dummy-token'); // Simulate login
    navigation.replace('Home');
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput placeholder="Enter OTP" value={otp} onChangeText={setOtp} keyboardType="number-pad" />
      <Button title="Confirm OTP" onPress={handleConfirm} />
    </View>
  );
}
