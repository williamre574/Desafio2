import React, { useState } from 'react';
import {
    Text, StyleSheet, View, TextInput, Button, TouchableHighlight, Alert, ScrollView
} from 'react-native';
//import DateTimePickerModal from "react-native-modal-datetime-picker";
import shortid from "react-id-generator";

//import Colors from '../utils/Colors';
const Formulario = ({ citas, setCitas, guardarMostrarForm, guardarCitasStorage }) => {
    //variables para el formulario
    const [paciente, guardarPaciente] = useState('');
    const [propietario, guardarPropietario] = useState('');
    const [telefono, guardarTelefono] = useState('');

    
    // const showTimePicker = () => {
    //     setTimePickerVisibility(true);
    // };
    // const hideTimePicker = () => {
    //     setTimePickerVisibility(false);
    // };
 
    // Crear nueva cita
    const crearNuevaCita = () => {
        // Validar
        if (paciente.trim() === '' || propietario.trim() === '' || telefono.trim() === '') {
            // Falla la validación
            mostrarAlerta();
            return;
        }
        // Crear una nueva cita
        const cita = { paciente, propietario, telefono };
        cita.id = shortid();
         console.log(cita);
        // Agregar al state
        const citasNuevo = [...citas, cita];
        setCitas(citasNuevo);
        // Pasar las nuevas citas a storage
        guardarCitasStorage(JSON.stringify(citasNuevo));// Ocultar el formulario
        guardarMostrarForm(false);
        // Resetear el formulario
      //  guardarSintomas('');
        guardarPropietario('');
        guardarPaciente('');
        guardarTelefono('');
    }
    // Muestra la alerta si falla la validación
    const mostrarAlerta = () => {
        Alert.alert(
            'Error', // Titulo
            'Todos los campos son obligatorios', // mensaje
            [{
                text: 'OK' // Arreglo de botones
            }]
        )
    }
    return (
        <>
            <ScrollView style={styles.formulario}>
                <View>
                    
                    <TextInput placeholder='Nombre'
                        style={styles.input}
                        onChangeText={texto => guardarPaciente(texto)}
                    />
                </View>
                <View>
                   
                    <TextInput
                        placeholder='Apellido'
                        style={styles.input}
                        onChangeText={texto => guardarPropietario(texto)}
                    />
                </View>
                <View>
                   
                    <TextInput
                    placeholder='Telefono'
                        style={styles.input}
                        onChangeText={texto => guardarTelefono(texto)}
                        keyboardType='numeric'
                    />
                </View>
               
             
             
                <View>
                    <TouchableHighlight onPress={() => crearNuevaCita()}
                        style={styles.btnSubmit}>
                        <Text style={styles.textoSubmit}>Crear Nueva contacto</Text>
                    </TouchableHighlight>
                </View>
            </ScrollView>
        </>
    );
}
const styles = StyleSheet.create({
    formulario: {
        backgroundColor: '#FFF',
        paddingHorizontal: 20,
        paddingVertical: 10,
        flex: 1
    },
    label: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 20
    },
    input: {
        marginTop: 10,
        height: 50,
        borderColor: '#e1e1e1',
        borderWidth: 1,
        borderStyle: 'solid'
    },
    btnSubmit: {
        padding: 10,
        backgroundColor: 'blue',
        marginVertical: 10
    },
    textoSubmit: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    }
})
export default Formulario;
