import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  StyleSheet,
  Text,
  View,
} from "react-native";

import * as Location from "expo-location";

export default function HomeScreen() {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const obtenerUbicacion = async () => {
    try {
      setLoading(true);

      // 1. Pedimos permiso para acceder a la ubicación
      const { status } = await Location.requestForegroundPermissionsAsync();

      // 2. Verificamos si aceptó
      if (status !== "granted") {
        Alert.alert(
          "Permiso denegado",
          "Necesitamos permiso para acceder a tu ubicación.",
        );

        return;
      }

      // 3. Obtenemos la ubicación actual
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      // 4. Guardamos latitud y longitud
      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);
    } catch (error) {
      console.error(error);

      Alert.alert("Error", "No se pudo obtener la ubicación.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mi ubicación</Text>

      <Button title="Obtener ubicación" onPress={obtenerUbicacion} />

      {loading && <ActivityIndicator size="large" style={styles.loading} />}

      {latitude !== null && longitude !== null && (
        <View style={styles.resultado}>
          <Text style={styles.label}>Latitud:</Text>

          <Text style={styles.valor}>{latitude}</Text>

          <Text style={styles.label}>Longitud:</Text>

          <Text style={styles.valor}>{longitude}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },

  loading: {
    marginTop: 30,
  },

  resultado: {
    marginTop: 30,
    gap: 8,
  },

  label: {
    fontSize: 16,
    fontWeight: "bold",
  },

  valor: {
    fontSize: 18,
    marginBottom: 15,
  },
});
