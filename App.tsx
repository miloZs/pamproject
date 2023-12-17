import React, { useEffect, useState } from 'react';
import { View, TextInput, ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Pokemon from './components/Pokemon';

const Stack = createNativeStackNavigator();

export default function App() {
  const [searchText, setSearchText] = useState('');
  const [pokemonList, setPokemonList] = useState<any[]>([]);
  const [filteredPokemonList, setFilteredPokemonList] = useState<any[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState('');
  const [showPokemon, setShowPokemon] = useState(false);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0")
      .then((response) => response.json())
      .then((data) => {
        setPokemonList(data.results);
        setFilteredPokemonList(data.results);
      })
      .catch((error) => console.error('Error fetching Pokemon list:', error));
  }, []);

  const handleSearch = (text: string) => {
    setSearchText(text);
    const filtered = pokemonList.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredPokemonList(filtered);
  };

  const switchToPokemon = (pokemonName: string) => {
    setSelectedPokemon(pokemonName);
    setShowPokemon(true);
  };

  const switchToMain = () => {
    setShowPokemon(false);
  };

  return (
    <View style={styles.container}>
      {!showPokemon ? (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <TextInput
            style={styles.input}
            onChangeText={handleSearch}
            value={searchText}
            placeholder="Search Pokemon..."
          />
          {filteredPokemonList && filteredPokemonList.length > 0 ? (
            filteredPokemonList.map((pokemon, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => switchToPokemon(pokemon.name)}
              >
                <Text style={styles.text}>{pokemon.name}</Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.text}>No results found</Text>
          )}
        </ScrollView>
      ) : (
        <Pokemon pokemonName={selectedPokemon} switchToMain={switchToMain} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50, 
    paddingBottom: 50, 
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
    marginTop: 20,
  },
  text: {
    textAlign: 'center',
    marginBottom: 8,
  },
});
