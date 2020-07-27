import React, {useState} from 'react';
import {View, Text, StyleSheet, Button, Alert, Image} from 'react-native';
import Colors from '../constants/color-palete';
import {InputComponent} from '../components/InputComponent';
import {Divider} from '../components/Divider';
import {TouchableOpacity} from 'react-native-gesture-handler';

import auth from '@react-native-firebase/auth';

export const SignupScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailIsValid, setEmailIsValid] = useState(false);

  const checkEmailValidation = (email: string) => {
    const pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-.]+(?:\[a-zA-Z0-[9-]+)*$/;
    const isValid = pattern.test(email.trim());
    if (isValid) {
      setEmailIsValid(true);
    } else {
      setEmailIsValid(false);
    }
  };

  const handleEmailChange = (email: string) => {
    checkEmailValidation(email);
    setEmail(email);
  };

  const handlePasswordChange = (password: string) => {
    setPassword(password);
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

  const signupWithEmail = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        loginWithEmail();
      })
      .catch((error) => {
        Alert.alert('Alert!!', `${error.message}`, [
          {
            text: 'ok',
            style: 'cancel',
          },
        ]);
      });
  };

  return (
    <View style={styles.screen}>
      <Image source={require('../assets/logo.jpg')} style={styles.logo} />
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
            title="Signup"
            disabled={!emailIsValid}
            onPress={() => signupWithEmail()}
            color={Colors.secondary}
          />
        </View>
        <View
          style={{
            marginVertical: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
          }}>
          <TouchableOpacity onPress={() => {}}>
            <Text style={{color: Colors.danger}}>Forgot Password</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={{color: Colors.primary}}>Log In</Text>
          </TouchableOpacity>
        </View>
        <Divider text="or" />
        <View style={styles.button}>
          <Button
            title="Signup with Google"
            onPress={() => {}}
            color={Colors.danger}
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
  inputContainer: {
    marginVertical: 10,
    width: '100%',
  },
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
