import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const HeaderRight = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Text>HeaderRight</Text>
    </View>
  );
};

export default HeaderRight;
