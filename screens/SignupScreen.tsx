import React, {useState} from 'react';

import {View, Text, StyleSheet, Button, Alert, Image,SafeAreaView} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import {useDispatch} from "react-redux"

import {Divider} from '../components/Divider';
import Colors from '../constants/color-palete';
import {InputComponent} from '../components/InputComponent';
import {setUser} from "../store/actions/userActions" 
import {Loader} from "../components/Loader"

export const SignupScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [showLoader,setShowLoader] = useState(false)

  const dispatch = useDispatch()

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
      .then((res) => {
        const loggedUser = {
          displayName:res.user.displayName,
          photoURL : res.user.photoURL,
          uid : res.user.uid,
          email:res.user.email,
          role:"listener"
        }
        dispatch(setUser(loggedUser))
      })
      .catch((err) => {
        setShowLoader(false)
        const errMessage = err.message.slice(21,) 
        Alert.alert(
          'Error!!',
          `${errMessage}`, 
          [{
            text: 'Ok',
            style:'cancel'
          }]);
      });
  };

  const signupWithEmail = () => {
    setShowLoader(true)
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        loginWithEmail();
      })
      .catch((err) => {
        setShowLoader(false)
        const errMessage = err.message.slice(21,) 
        Alert.alert(
          'Error!!', 
          `${errMessage}`, 
          [{
            text: 'Ok',
            style: 'cancel',
          }]
        );
      });
  };

  
  const handleGoogleSignIn = ()=>{

  }

  const handleFacebookSignIn = ()=>{

  }

  return (
    <SafeAreaView style={{flex:1}}>
      <View style={styles.screen}>
        <View style={styles.tagLineContainer}>
          <Text style={styles.tagLine1}>Listeners, welcome to</Text>
          <Text style={styles.tagLine2}>Mello!</Text>
        </View>
        <View style={styles.messageContainer}>
          <Text style={styles.message1}>To gain knowledge listen meaningful audios here.</Text>
          <Text style={styles.message2}>Smartly use your idle time, multitask or just listen when you don't have time to read.</Text>
        </View>
        <View style={styles.signInUsingContainer}>
          <Text style={styles.signInUsing}>Sign in using</Text>
        </View>
        <View style={styles.authOptions}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={handleGoogleSignIn}
          >
            <Image  style={styles.googleIcon} source={require('../assets/google.png')}/>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleFacebookSignIn}
            activeOpacity={0.5}
          >
            <Image style={styles.facebookIcon} source={require('../assets/facebook.png')}/>
          </TouchableOpacity>
        </View>
        <Divider text="OR" />
        <View style={styles.inputContainer}>
          <InputComponent
            label="Email"
            value={email}
            setValue={handleEmailChange}
            type="emailAddress"
            icon="mail"
            placeholder="Email"
          />
          <InputComponent
            label="Password"
            value={password}
            setValue={handlePasswordChange}
            type="password"
            icon="lock"
            placeholder="Password"
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

            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={{color: Colors.primary,textDecorationLine:'underline'}}>Log In</Text>
            </TouchableOpacity>
          </View>
        </View>
        {
          showLoader&&<Loader/>
        }
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: "white",
  },
  button: {
    paddingHorizontal: 20,
    height: 50,
  },
  inputContainer: {
    marginTop:10,
    marginBottom:20,
    width: '100%',
  },
  logo: {
    width: 100,
    height: 100,
    backgroundColor: Colors.logobackground,
    borderWidth: 1,
    marginVertical: 30,
    borderRadius: 50,
  },
  tagLineContainer:{
    flexDirection:'row',
    marginVertical:20,
    alignItems:'flex-end'
  },
  tagLine1: {
    fontSize: 22,
    marginRight: 5,
    color:'green'
  },
  tagLine2: {
    fontSize: 25,
    fontWeight: 'bold',
    color:'green'
  },
  messageContainer:{
    paddingHorizontal : 10,
  },
  message1:{
    textAlign:'center',
    fontSize:17,
    marginBottom:2
  },
  message2:{
    textAlign:'center',
    fontSize:17
  },
  signInUsingContainer:{
    marginVertical : 20,
  },
  signInUsing:{
    textDecorationLine:'underline',
    textDecorationStyle:"solid",
    fontSize : 20, 
  },
  authOptions:{
    flexDirection:'row',
    marginVertical : 10
  },
  googleIcon:{
    width:25,
    height:25,
    marginRight : 10, 
  },
  facebookIcon:{
    width:25,
    height:25,
    marginLeft : 10, 
  }
});
