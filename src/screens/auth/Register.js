import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../../utils';
import { resetRegister, resetRegisterUi, userRegister } from '../../app/reducers/auth';

const PINK = '#E91E63';
const ORANGE = '#FF9800';
const BACKGROUND = '#FFF7F2';

// Validation: invalid character warnings
const EMAIL_VALID = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PASSWORD_SAFE = /^[\w!@#$%^&*()\-+=[\]{}|;:'",.<>?/\\`~]+$/;

function getEmailWarning(value) {
  if (!value) return null;
  if (/[^\w.@+-]/.test(value)) {
    return 'Email contains invalid characters.';
  }
  if (!EMAIL_VALID.test(value)) {
    return 'Please enter a valid email address.';
  }
  return null;
}

function getPasswordWarning(value) {
  if (!value) return null;
  if (!PASSWORD_SAFE.test(value)) {
    return 'Password contains invalid characters. Use only letters, numbers, and common symbols.';
  }
  if (value.length < 6) {
    return 'Password should be at least 6 characters.';
  }
  return null;
}

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { registerLoading, registerError, registerData } = useSelector(
    state => state.auth,
  );

  useEffect(() => {
    dispatch(resetRegisterUi());
  }, [dispatch]);

  const warnings = {
    email: getEmailWarning(email),
    password: getPasswordWarning(password),
    confirmPassword:
      confirmPassword && password !== confirmPassword
        ? 'Passwords do not match.'
        : null,
  };
  const hasWarnings =
    warnings.email ||
    warnings.password ||
    warnings.confirmPassword;

  useEffect(() => {
    if (registerError) {
      Alert.alert('Registration failed', registerError, [
        { text: 'OK', onPress: () => dispatch(resetRegister()) },
      ]);
    }
  }, [registerError, dispatch]);

  useEffect(() => {
    if (registerData) {
      Alert.alert(
        'Account created',
        'Your account has been created. Please log in.',
        [
          {
            text: 'Go to Login',
            onPress: () => {
              dispatch(resetRegister());
              navigation.navigate(ROUTES.LOGIN);
            },
          },
        ],
      );
    }
  }, [registerData, dispatch, navigation]);

  const onSubmit = () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Missing information', 'Please fill in all fields.');
      return;
    }

    if (hasWarnings) {
      const messages = [
        warnings.email,
        warnings.password,
        warnings.confirmPassword,
      ]
        .filter(Boolean)
        .join('\n• ');
      Alert.alert(
        'Invalid input',
        `Please fix the following:\n\n• ${messages}`,
      );
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Passwords do not match', 'Please re-enter your password.');
      return;
    }

    dispatch(
      userRegister({
        email,
        password,
        password_confirmation: confirmPassword,
      }),
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Image
            source={require('../../../assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.appTagline}>Create an account</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>Create your account</Text>
          <Text style={styles.subtitle}>
            Use the same email and password you use on TeachMe LMS.
          </Text>

          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="Enter email"
            value={email}
            onChangeText={setEmail}
            style={[styles.input, warnings.email && styles.inputError]}
            placeholderTextColor="#B3B3B3"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {warnings.email ? (
            <Text style={styles.warning}>{warnings.email}</Text>
          ) : null}

          <Text style={styles.label}>Password</Text>
          <TextInput
            placeholder="Create password (min 6 characters)"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={[styles.input, warnings.password && styles.inputError]}
            placeholderTextColor="#B3B3B3"
          />
          {warnings.password ? (
            <Text style={styles.warning}>{warnings.password}</Text>
          ) : null}

          <Text style={styles.label}>Confirm password</Text>
          <TextInput
            placeholder="Re-enter password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            style={[styles.input, warnings.confirmPassword && styles.inputError]}
            placeholderTextColor="#B3B3B3"
          />
          {warnings.confirmPassword ? (
            <Text style={styles.warning}>{warnings.confirmPassword}</Text>
          ) : null}

        <TouchableOpacity
          style={[styles.button, registerLoading && styles.buttonDisabled]}
          onPress={onSubmit}
          disabled={registerLoading}
        >
          {registerLoading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>Create account</Text>
          )}
        </TouchableOpacity>

        <View style={styles.footerRow}>
          <Text style={styles.footerPrompt}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate(ROUTES.LOGIN)}>
            <Text style={styles.footerAction}> Log in</Text>
          </TouchableOpacity>
        </View>
      </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingVertical: 24,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 12,
  },
  logo: {
    width: 180,
    height: 64,
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
    paddingVertical: 24,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#222222',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: '#777777',
    marginBottom: 14,
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
    paddingVertical: 10,
    marginBottom: 4,
    borderWidth: 1,
    borderColor: '#FFE0B2',
  },
  inputError: {
    borderColor: PINK,
  },
  warning: {
    fontSize: 12,
    color: PINK,
    marginBottom: 10,
    marginLeft: 4,
  },
  button: {
    backgroundColor: ORANGE,
    paddingVertical: 14,
    borderRadius: 999,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 18,
  },
  footerPrompt: {
    fontSize: 13,
    color: '#777777',
  },
  footerAction: {
    fontSize: 13,
    color: PINK,
    fontWeight: '700',
  },
});

export default Register;