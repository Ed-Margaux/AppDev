import { useDispatch, useSelector } from 'react-redux';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { userLogout } from '../app/reducers/auth';

const PINK = '#E91E63';
const ORANGE = '#FF9800';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state?.auth?.data);

  const onLogout = () => {
    dispatch(userLogout());
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Profile</Text>
      {user?.name && (
        <Text style={styles.subtitle}>Welcome, {user.name}</Text>
      )}

      <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
        <Text style={styles.logoutText}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF7F2',
    padding: 24,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#222222',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#777777',
    marginBottom: 32,
  },
  logoutButton: {
    backgroundColor: PINK,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 999,
  },
  logoutText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
});

export default ProfileScreen;