import React, {useState, useEffect} from 'react';

import {View, Text, StyleSheet, Button, Alert, Image,SafeAreaView} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux'
import {
  // GoogleSignin,
  GoogleSigninButton,
  statusCodes,
  User,
  GoogleSignin
} from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';


import Colors from '../constants/color-palete';
import {InputComponent} from '../components/InputComponent';
import {Divider} from '../components/Divider';
import {setUser} from "../store/actions/userActions"

export const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch()
  
  // Handle user state changes
  const onAuthStateChanged = (_user) => {
    if(_user){
      const loggedUser = {
        displayName:_user.displayName,
        photoURL : _user.photoURL,
        uid : _user.uid,
        email:_user.email,
        role:"listener"
      }
      dispatch(setUser(loggedUser))      
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const handleEmailChange = (_email: string) => {
    setEmail(_email);
  };

  const handlePasswordChange = (_password: string) => {
    setPassword(_password);
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
        const errMessage = err.message.slice(21,) 
        Alert.alert(
            'Error!!',
            `${errMessage}`, 
            [{
              text: 'Ok'
            }]
        );
      });
  };

  //**Not working**//

  //  GoogleSignin.configure({
  //     webClientId:'381110390220-g1h7j6gs982neo7ih271s963u4eh37li.apps.googleusercontent.com'
  // });

  //**Not working**//

  const handleGoogleSignIn = async ()=>{
    try{
      // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();
      // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      // Sign-in the user with the credential
    const res = auth().signInWithCredential(googleCredential);
    console.log(res);
  }catch(err){
    console.log(err); 
  } 
}

  const handleFacebookSignIn = ()=>{

  }

  const handleForgotPassword = ()=>{

  }

  return (
    <SafeAreaView
      style={{flex:1}}
    >
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
            title="Log in"
            onPress={() => loginWithEmail()}
            color={Colors.secondary}
          />
        </View>
        <View style={styles.forgetPasswordAndSignUp}>
          <TouchableOpacity onPress={() => {}}>
            <Text style={{color: Colors.danger,textDecorationLine:'underline'}}>Forgot Password</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={{color: Colors.primary,textDecorationLine:'underline'}}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    </SafeAreaView>
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
    marginTop: 10,
    marginBottom:20,
    width: '100%',
  },
  googleButton: {width: 192, height: 48},
  screen: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: "white",
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
