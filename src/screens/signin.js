import React, { useState, useEffect } from "react";
import {View, Text, Alert} from "react-native";
import Custominput from "../components/custominput";
import { useWindowDimensions, StyleSheet } from "react-native";
import Custombutton from "../components/custombutton";
import { ScrollView } from "react-native";
import { useNavigation, validatePathConfig } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Signin = () => {
    const [usernamel, setUsernamel] = useState('');
    const [passwordl, setPasswordl] = useState('');
    const {height} = useWindowDimensions();
    const navigation = useNavigation();

    const onSignInPressed = () =>{
        try{
            AsyncStorage.getItem('UserData')
            .then(value =>{
                if(value != null) {
                    let user = JSON.parse(value);
                    if(usernamel == user.Username && passwordl == user.Password){
                        console.info('Inicio de sesión exitoso');
                        navigation.navigate('Contacts');
                    }
                }else{
                    console.warn('El usuario no existe');
                }
            })
        }catch(error){
            console.warn(error);
        }
    }
     const onSignUpPressed = () =>{
        navigation.navigate('SignUp');
     }

    return(
        <ScrollView>
            <View style={styles.root}>
                <Text style={styles.titulo}>Login</Text>
                <Custominput
                placeholder="Usuario"
                value={usernamel}
                setValue={setUsernamel}
                />
                <Custominput
                placeholder="Contraseña"
                value={passwordl}
                setValue={setPasswordl}
                secureTextEntry={true}
                />
                <Custombutton text="Ingresar" onPress={onSignInPressed}/>
                <Custombutton text="¿No tienes cuenta? Crea una." onPress={onSignUpPressed} type="TERTIARY"/>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({

    root:{
        alignItems: 'center',
        padding: 20,
        justifyContent: 'flex-start',
        marginTop: 130,
        flex: 1,
    },

    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#051c60',
        margin:10
    }
});

export default Signin;