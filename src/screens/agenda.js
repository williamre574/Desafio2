import React from 'react';
import { Text, StyleSheet, View, TouchableHighlight } from 'react-native';
const Cita = ({ item, eliminarPaciente }) => {
    const dialogoEliminar = id => {
        console.log('eliminando....', id);
        eliminarPaciente(id);
    }
    return (
        <View style={styles.cita}>
          <View style={styles.nombreApellidoContainer}>
            <Text style={styles.nombreApellido}>{item.paciente} {item.propietario}</Text>
          </View>
          <View style={styles.telefonoContainer}>
            <Text style={styles.telefono}>{item.telefono}</Text>
          </View>
          <View style={styles.btnEliminarContainer}>
            <TouchableHighlight
              onPress={() => dialogoEliminar(item.id)}
              style={styles.btnEliminar}
            >
              <Text style={styles.textoEliminar}>Eliminar &times;</Text>
            </TouchableHighlight>
          </View>
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      cita: {
        backgroundColor: '#FFF',
        borderBottomColor: '#e1e1e1',
        borderStyle: 'solid',
        borderBottomWidth: 1,
        paddingVertical: 20,
        paddingHorizontal: 10,
      //  flexDirection: 'row', // Coloca los elementos en una fila
        justifyContent: 'space-between', // Distribuye los elementos uniformemente en horizontal
        alignItems: 'center', // Alinea verticalmente los elementos hijos al centro
      //  alignSelf: 'flex-start'
      },
      nombreApellidoContainer: {
        flexDirection: 'row', // Coloca el nombre y el apellido en una fila
        alignSelf: 'flex-start'
      },
      nombreApellido: {
        fontSize: 18,
        marginRight: 10, // Espacio entre el nombre y el apellido
      },
      telefonoContainer: {
        marginTop: 10, // Espacio entre el teléfono y los elementos anteriores
        flexDirection: 'column',
        alignSelf: 'flex-start'
      },
      telefono: {
        fontSize: 28, // Texto más grande para el teléfono
        flexDirection: 'column'
      },
      btnEliminarContainer: {
        alignSelf: 'flex-end', // Alinea el contenedor de eliminación a la derecha del contenedor principal
      },
      btnEliminar: {
        width: 80, // Ancho del botón (ajusta según tus preferencias)
        height: 30, // Altura del botón
        borderRadius: 25, // Para hacer el botón circular
        backgroundColor: 'red',
        alignItems: 'center', // Alinea el contenido horizontalmente al centro
        justifyContent: 'center', // Alinea el contenido verticalmente al centro
      },
      textoEliminar: {
        color: '#FFF',
        fontWeight: 'bold',
        textAlign: 'center',
      },
    });
export default Cita;