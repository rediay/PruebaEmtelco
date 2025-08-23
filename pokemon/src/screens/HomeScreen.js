
import React from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

import { getPokemonList } from '../services/api';

export default function HomeScreen() {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const PAGE_SIZE = 20;
  const navigation = useNavigation();

  const fetchPokemon = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const offset = page * PAGE_SIZE;
      const response2 = await getPokemonList(PAGE_SIZE, offset);      
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${PAGE_SIZE}&offset=${offset}`);
      let newResults = response.data.results;
      // Ordenar por nombre
      newResults = newResults.sort((a, b) => a.name.localeCompare(b.name));
      setPokemon(prev => [...prev, ...newResults]);
      setPage(prev => prev + 1);
      if (!response.data.next) setHasMore(false);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemon();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      fetchPokemon();
    }
  };

  if (error) {
    return (
      <View style={styles.center}>
        <Text>Error al cargar los Pokémon</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Pokémon</Text>
      <FlatList
        data={pokemon}
        keyExtractor={item => item.name}
        renderItem={({ item }) => {
          // Extraer el ID del Pokémon desde la URL
          const id = item.url.split('/').filter(Boolean).pop();
          const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
          const price = 1000;//Math.floor(Math.random() * 1000) + 100;
          return (
            <View style={styles.item}>
              <View style={styles.row}>
                    <Image
                    source={{ uri: imageUrl }}
                    style={styles.image}
                    />
                    <Text style={styles.name}>{item.name}</Text>
              </View>
              <Text style={styles.price}>Precio: ${price}</Text>
              <View style={styles.buttonRow}>
                    <TouchableOpacity 
                        style={styles.buttonDetail}
                        onPress={() => navigation.navigate('PokemonDetail', { name: item.name, id })}
                    >
                        <Text style={styles.buttonText}>Detalles</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonBuy}>
                        <Text style={styles.buttonText}>Agregar</Text>
                    </TouchableOpacity>                    
                </View>
            </View>
          );
        }}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <ActivityIndicator size="small" color="#007bff" /> : null}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  item: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    width: 300,
    alignSelf: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 16,
  },
  name: {
    fontSize: 18,
    textTransform: 'capitalize',
  },
  price: {
    fontSize: 16,
    marginVertical: 8,
    color: '#333',
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
buttonDetail: {
  backgroundColor: '#287fa7ff',
  paddingVertical: 8,
  paddingHorizontal: 16,
  borderRadius: 5,
  marginHorizontal: 4,
},
buttonBuy: {
  backgroundColor: '#28a745',
  paddingVertical: 8,
  paddingHorizontal: 16,
  borderRadius: 5,
  marginHorizontal: 4,
},
buttonText: {
  color: '#fff',
  fontWeight: 'bold',
},
});
