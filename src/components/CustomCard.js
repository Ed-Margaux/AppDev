import React from 'react';
import { Text, View, Alert, StyleSheet } from 'react-native';
import CustomButton from './CustomButton';

const CustomCard = ({
  label,
  buttonLabel = 'Click Me',
  alertMessage = 'Hello!',
  backgroundColor = '#E91E63',
  onPress,
}) => {
  return (
    <View style={[styles.card, { backgroundColor }]}>
      <Text style={styles.title}>{label}</Text>

      <CustomButton
        label={buttonLabel}
        onPress={
          onPress
            ? onPress
            : () => {
                Alert.alert(alertMessage);
              }
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    justifyContent: 'center',
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
  },
  title: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
});

export default CustomCard;