import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  Modal,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';


const App = () => {
  // Estados para el nombre del cliente, fecha de reserva, cantidad de personas, lista de clientes, y visibilidad del modal
  const [nombre, setNombre] = useState('');
  const [fechaReserva, setFechaReserva] = useState(new Date());
  const [cantidadPersonas, setCantidadPersonas] = useState('');
  const [clientes, setClientes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [idCounter, setIdCounter] = useState(1); // Contador para generar IDs correlativos

  // Estados para el datetimepicker
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  // Función para cambiar la fecha seleccionada en el datetimepicker
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date; // Si no se selecciona ninguna fecha, se mantiene la actual
    setShow(false); // Oculta el datetimepicker
    setFechaReserva(currentDate); // Establece la fecha de reserva seleccionada en el estado
  };

  // Función para mostrar el datetimepicker con el modo especificado (date o time)
  const showMode = (currentMode) => {
    setShow(true); // Muestra el datetimepicker
    setMode(currentMode); // Establece el modo del datetimepicker
  };

  // Función para mostrar el datetimepicker en modo fecha
  const showDatepicker = () => {
    showMode('date');
  };

  // Función para agregar un nuevo cliente
  const agregarCliente = () => {
    // Genera un nuevo cliente con un ID único
    const nuevoCliente = { id: idCounter, nombre: nombre, fechaReserva: fechaReserva, cantidadPersonas: cantidadPersonas };
    // Agrega el nuevo cliente a la lista de clientes
    setClientes([...clientes, nuevoCliente]);
    // Incrementa el contador de ID para el siguiente cliente
    setIdCounter(idCounter + 1);
    // Limpia los campos de entrada
    setNombre('');
    setCantidadPersonas('');
    setFechaReserva(new Date());
    // Oculta el modal de agregar cliente
    setModalVisible(false);
  };

  // Función para eliminar un cliente
  const eliminarCliente = (id) => {
    // Filtra la lista de clientes para excluir el cliente con el ID dado
    setClientes(clientes.filter((cliente) => cliente.id !== id));
  };

  // Función para validar que el campo de entrada solo contenga números
  const handleCantidadPersonasChange = (text) => {
    // Elimina cualquier caracter que no sea un número
    const newText = text.replace(/[^0-9]/g, '');
    // Actualiza el estado de cantidadPersonas
    setCantidadPersonas(newText);
  };

  return (
    <View style={styles.container}>
      {/* Botón para abrir el modal de agregar cliente */}
      <View style={styles.button}>
        <Button title="Agregar Cliente" onPress={() => setModalVisible(true)} />
      </View>
      {/* Modal de agregar cliente */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Campo de entrada para el nombre del cliente */}
            <TextInput
              style={styles.input}
              placeholder="Nombre del Cliente"
              value={nombre}
              onChangeText={setNombre}
            />
            {/* Campo de entrada para la cantidad de personas */}
            <TextInput
              style={styles.input}
              placeholder="Cantidad de Personas"
              value={cantidadPersonas}
              onChangeText={handleCantidadPersonasChange} // Validación para permitir solo números
              keyboardType="numeric"
            />
            {/* Botón para mostrar el datetimepicker */}
            <Button title="Seleccionar fecha de Reserva" onPress={showDatepicker} />
            {/* Muestra la fecha seleccionada */}
            <Text>selected: {fechaReserva.toLocaleString()}</Text>
            {/* Muestra el datetimepicker si la variable show es verdadera */}
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={false}
                onChange={onChange}
                locale='es-ES' // Establece el idioma del datetimepicker a español
              />
            )}
            {/* Botón para agregar el cliente */}
            <Button title="Agregar Cliente" onPress={agregarCliente} />
            {/* Botón para cancelar y cerrar el modal */}
            <Button
              title="Cancelar"
              onPress={() => setModalVisible(false)}
              color="red"
            />
          </View>
        </View>
      </Modal>
      {/* Lista de clientes */}
      <FlatList
        data={clientes}
        renderItem={({ item }) => (
          <View style={styles.clienteItem}>
            {/* Muestra el ID, nombre, fecha de reserva y cantidad de personas del cliente */}
            <Text style={styles.clienteNombre}>ID: {item.id}</Text>
            <Text style={styles.clienteNombre}>Nombre: {item.nombre}</Text>
            <Text style={styles.clienteNombre}>Cantidad de Personas: {item.cantidadPersonas}</Text>
            <Text style={styles.clienteFecha}>Fecha de Reserva: {item.fechaReserva.toDateString()}</Text>
            {/* Botón para eliminar el cliente */}
            <Button title="Eliminar" onPress={() => eliminarCliente(item.id)} />
          </View>
        )}
        keyExtractor={(item) => item.id.toString()} // Extrae el ID de cada cliente como clave única
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001222',
    padding: 20,
  },
  button: {
    marginTop: 26,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  clienteItem: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    marginTop: 5
  },
  clienteNombre: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  clienteFecha: {
    fontSize: 16,
  },
});

export default App;
