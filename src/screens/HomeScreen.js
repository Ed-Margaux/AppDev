import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { userLogout } from '../app/reducers/auth';
import { ROUTES } from '../utils';
import CustomCard from '../components/CustomCard';

const PINK = '#E91E63';
const ORANGE = '#FF9800';

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <CustomCard
        label="Welcome Card"
        buttonLabel="Say Hello"
        alertMessage="Hello, Madlang Fifol!"
      />

      <TouchableOpacity
        style={styles.profileButton}
        onPress={() => navigation.navigate(ROUTES.PROFILE)}
      >
        <Text style={styles.buttonText}>Profile</Text>
      </TouchableOpacity>

      {/* Logout Button */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => dispatch(userLogout())}
      >
        <Text style={styles.logoutText}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFF7F2',
    padding: 24,
  },
  logo: {
    width: 160,
    height: 160,
    marginBottom: 20,
  },
  profileButton: {
    backgroundColor: ORANGE,
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 999,
    marginTop: 10,
    marginBottom: 12,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: PINK,
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 999,
  },
  logoutText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
});

export default HomeScreen;