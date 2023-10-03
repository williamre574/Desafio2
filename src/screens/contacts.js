import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  TouchableHighlight,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  Platform,
} from "react-native";
import Cita from "./agenda";
import Formulario from "./formulario";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";
const Contacts = () => {
  const [citas, setCitas] = useState([]);
  const [mostrarForm, guardarMostrarForm] = useState(false);
  useEffect(() => {
    const obtenerCitasStorage = async () => {
      try {
        const citasStorage = await AsyncStorage.getItem("citas");
        if (citasStorage) {
          setCitas(JSON.parse(citasStorage));
        }
      } catch (error) {
        console.log(error);
      }
      console.log(error);
    };
    obtenerCitasStorage();
  }, []);
  //Elimina los pacientes del state
  const eliminarPaciente = (id) => {
    const citasFiltradas = citas.filter((cita) => cita.id != id);
    setCitas(citasFiltradas);
    guardarCitasStorage(JSON.stringify(citasFiltradas));
  };

  //muestra u oculta el formulario
  const mostrarFormulario = () => {
    guardarMostrarForm(!mostrarForm);
  };
  //ocultar el teclado
  const cerrarTeclado = () => {
    Keyboard.dismiss();
  };
  //Almacenar las citas en el storage
  const guardarCitasStorage = async (citasJSON) => {
    try {
      await AsyncStorage.setItem("citas", citasJSON);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TouchableWithoutFeedback>
      <View style={styles.contenedor}>
    
        {/* <View>
          <TouchableHighlight
            onPress={() => mostrarFormulario()}
            style={styles.btnMostrarForm}
          >
            <Text style={styles.textoMostrarForm}>
              {mostrarForm ? "Cancelar Crear Cita" : "Registrarse"}
            </Text>

           
          </TouchableHighlight>
        </View> */}

        <View style={styles.contenido}>
          {mostrarForm ? (
            <>
              <Text style={styles.titulo}>Agregar contacto</Text>
              <Formulario
                citas={citas}
                setCitas={setCitas}
                guardarMostrarForm={guardarMostrarForm}
                guardarCitasStorage={guardarCitasStorage}
              />
            </>
          ) : (
            <>
              <Text style={styles.titulo}>
                {citas.length > 0
                  ? "Agenda"
                  : "Agenda vacia, crea una"}
              </Text>
              <FlatList
                style={styles.listado}
                data={citas}
                renderItem={({ item }) => (
                  <Cita item={item} eliminarPaciente={eliminarPaciente} />
                )}
                keyExtractor={(cita) => cita.id}
              ></FlatList>
            </>
          )}
        </View>
     
      <TouchableHighlight style={styles.botonCircular}>
        <Icon
          onPress={() => mostrarFormulario()}
          name={mostrarForm ? "times" : "plus"}
          size={30}
          color="white"
        />
      </TouchableHighlight>
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  contenedor: {
    //  backgroundColor: Colors.PRIMARY_COLOR,
    flex: 1,
  },
  titulo: {
    color: "white",
    backgroundColor:'blue',
    marginTop: Platform.OS === "ios" ? 40 : 20,
    marginBottom: 20,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    height: 50
  },
  contenido: {
    flex: 1,
    marginHorizontal: "2.5%",
  },
  listado: {
    flex: 1,
  },
  btnMostrarForm: {
    padding: 10,
    // backgroundColor: Colors.BUTTON_COLOR,
    marginVertical: 10,
  },
  textoMostrarForm: {
    color: "#000",
    fontWeight: "bold",
    textAlign: "center",
  },
  botonCircular: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "blue", // Cambia el color de fondo según tus preferencias
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Contacts;
