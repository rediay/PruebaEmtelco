import { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert  } from 'react-native';
import { CartContext } from '../context/CartContext';

export default function CartScreen({ route }) {
//   const { cart, setCart } = route.params;

  const { cart, setCart } = useContext(CartContext);

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
      {cart.length === 0 ? (
        <Text style={styles.empty}>El carrito está vacío.</Text>
      ) : (
        <FlatList
          data={cart}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>{item.price}</Text>
                <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => handleRemove(item.id)}
                >
                  <Text style={styles.removeButtonText}>Eliminar</Text>
                </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  empty: { textAlign: 'center', marginTop: 32, color: '#888' },
  item: { flexDirection: 'row', justifyContent: 'space-between', padding: 12, borderBottomWidth: 1, borderBottomColor: '#eee' },
  name: { fontSize: 18 },
  price: { fontSize: 18, color: '#28a745' },
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
});