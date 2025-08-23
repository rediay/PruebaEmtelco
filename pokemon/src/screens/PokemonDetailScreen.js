import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function PokemonDetailScreen({ route }) {
  const { name, id } = route.params;
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name}</Text>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <Text>ID: {id}</Text>
      {/* Aquí puedes agregar más detalles si lo deseas */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    textTransform: 'capitalize',
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 16,
  },
});