import { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, Image } from 'react-native';
import { CartContext } from '../context/CartContext';

export default function CartScreen() {
  const { cart, setCart } = useContext(CartContext);
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleRemove = (id, name) => {
    Alert.alert(
      '🗑️ Eliminar Pokémon',
      `¿Estás seguro que deseas eliminar ${name} del carrito?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', style: 'destructive', onPress: () => setCart(prevCart => prevCart.filter(item => item.id !== id)) }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carrito de Compras</Text>
      <Text style={styles.total}>Total: ${total}</Text>
      {cart.length === 0 ? (
        <Text style={styles.empty}>El carrito está vacío.</Text>
      ) : (
        <FlatList
          data={cart}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          renderItem={({ item }) => {
            const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.id}.png`;
            return (
              <View style={styles.item}>
                <View style={styles.row}>
                  <Image source={{ uri: imageUrl }} style={styles.image} />
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.price}>${item.price}</Text>
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => handleRemove(item.id, item.name)}
                  >
                    <Text style={styles.removeButtonText}>Eliminar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />        
      )}
       {/* <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: ${total}</Text>
       </View> */}
    </View>   
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  empty: { textAlign: 'center', marginTop: 32, color: '#888' },
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
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 16,
  },
  name: {
    fontSize: 18,
    textTransform: 'capitalize',
    flex: 1,
  },
  price: {
    fontSize: 16,
    color: '#28a745',
    marginRight: 8,
  },
  removeButton: {
    backgroundColor: '#dc3545',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginLeft: 8,
  },
  removeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  total: {
  fontSize: 20,
  fontWeight: 'bold',
  color: '#287fa7',
  textAlign: 'center',
  marginBottom: 12,
},
});