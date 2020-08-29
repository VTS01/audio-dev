import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Button, Alert, Image} from 'react-native';
import Colors from '../constants/color-palete';
import {InputComponent} from '../components/InputComponent';
import {Divider} from '../components/Divider';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
  User,
} from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';

export const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState();

  // Handle user state changes
  const onAuthStateChanged = (_user) => {
    setUser(user);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  GoogleSignin.configure({
    webClientId:
      '615406537334-kb6skchi7t9ejmcq7qpmimg8h7ksomu8.apps.googleusercontent.com',
  });

  const handleEmailChange = (_email: string) => {
    setEmail(_email);
  };
  const handlePasswordChange = (_password: string) => {
    setPassword(_password);
  };

  const loginWithEmail = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        navigation.navigate('Dashboard');
      })
      .catch(() => {
        Alert.alert('User not exist', 'Please sign up', [{text: 'Ok'}]);
      });
  };

  const loginWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setUser({userInfo});
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  return (
    <View style={styles.screen}>
      <Image source={require('../assets/logo1.jpg')} style={styles.logo} />
      <Text style={styles.tagLine}>Listen to the Web..</Text>
      <View style={styles.inputContainer}>
        <InputComponent
          label="Email"
          value={email}
          setValue={handleEmailChange}
          type="emailAddress"
          icon="mail"
          placeholder="Enter Email Address"
        />
        <InputComponent
          label="Password"
          value={password}
          setValue={handlePasswordChange}
          type="password"
          icon="lock"
          placeholder="Enter Password"
        />
        <View style={styles.button}>
          <Button
            title="Login"
            onPress={() => loginWithEmail()}
            color={Colors.secondary}
          />
        </View>
        <View style={styles.forgetPasswordAndSignUp}>
          <TouchableOpacity onPress={() => {}}>
            <Text style={{color: Colors.danger}}>Forgot Password</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={{color: Colors.primary}}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        <Divider text="or" />
        <View style={styles.button}>
          <GoogleSigninButton
            style={styles.googleButton}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={loginWithGoogle}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    height: 50,
  },
  forgetPasswordAndSignUp: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  inputContainer: {
    marginVertical: 10,
    width: '100%',
  },
  googleButton: {width: 192, height: 48},
  screen: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  logo: {
    width: 100,
    height: 100,
    backgroundColor: Colors.logobackground,
    borderWidth: 1,
    marginVertical: 30,
    borderRadius: 50,
  },
  tagLine: {
    fontSize: 20,
    fontWeight: '400',
  },
});
