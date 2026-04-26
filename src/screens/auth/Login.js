import { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
  ActivityIndicator,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { ROUTES } from '../../utils';
import { resetLogin, resetLoginUi, userLogin } from '../../app/reducers/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { isLoading, isError, errorMessage } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(resetLoginUi());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      Alert.alert(
        'Login failed',
        errorMessage || 'Please check your email and password and try again.',
        [{ text: 'OK', onPress: () => dispatch(resetLogin()) }],
      );
    }
  }, [isError, errorMessage, dispatch]);

  const onLogin = () => {
    if (!email || !password) {
      Alert.alert('Missing information', 'Please enter email and password.');
      return;
    }

    dispatch(
      userLogin({
        email,
        password,
      }),
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Welcome back!</Text>
        <Text style={styles.subtitle}>
          Log in to follow your learner&apos;s progress.
        </Text>

        <Text style={styles.label}>Email</Text>
        <TextInput
          placeholder="Enter email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          placeholderTextColor="#B3B3B3"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          placeholder="Enter password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          placeholderTextColor="#B3B3B3"
        />

        <TouchableOpacity
          style={[styles.button, isLoading && styles.buttonDisabled]}
          onPress={onLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>Log in</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.forgot}>Forgot password?</Text>
        </TouchableOpacity>

        <View style={styles.signupRow}>
          <Text style={styles.signupPrompt}>New to Teach Me?</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate(ROUTES.REGISTER)}
          >
            <Text style={styles.signup}> Create an account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const PINK = '#E91E63';
const ORANGE = '#FF9800';
const BACKGROUND = '#FFF7F2';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  header: {
    marginBottom: 16,
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 72,
    marginBottom: 4,
  },
  appTagline: {
    marginTop: 4,
    fontSize: 14,
    color: ORANGE,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingHorizontal: 24,
    paddingVertical: 28,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 6,
    color: '#222222',
  },
  subtitle: {
    textAlign: 'center',
    color: '#777777',
    marginBottom: 20,
    fontSize: 14,
  },
  label: {
    marginBottom: 6,
    fontWeight: '600',
    color: '#444444',
    fontSize: 14,
  },
  input: {
    backgroundColor: '#FAFAFA',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#FFE0B2',
  },
  button: {
    backgroundColor: ORANGE,
    paddingVertical: 14,
    borderRadius: 999,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
  forgot: {
    textAlign: 'center',
    marginTop: 14,
    color: PINK,
    fontSize: 13,
  },
  signupRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 22,
  },
  signupPrompt: {
    color: '#777777',
    fontSize: 13,
  },
  signup: {
    color: PINK,
    fontWeight: '700',
    fontSize: 13,
  },
});

export default Login;