import React, { useEffect, useState } from 'react';
import { TapGestureHandler, RotationGestureHandler } from 'react-native-gesture-handler';
import {
  View,
  TextInput,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Pokemon from './components/Pokemon';
import 'react-native-gesture-handler';

const { width } = Dimensions.get('window');

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

  const getPokemonImage = (pokemonName: string) => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonList.findIndex(
      (pokemon) => pokemon.name === pokemonName
    ) + 1}.png`;
  };

  return (
    <View style={styles.container}>
      {!showPokemon ? (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Pokédex</Text>
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.input}
                onChangeText={handleSearch}
                value={searchText}
                placeholder="Search Pokemon..."
                placeholderTextColor="#ccc"
              />
              <TouchableOpacity>
                <Icon name="magnify" size={30} color="#ccc" style={styles.lensIcon} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ marginBottom: 20 }} />
          {filteredPokemonList && filteredPokemonList.length > 0 ? (
            filteredPokemonList.map((pokemon, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => switchToPokemon(pokemon.name)}
                style={styles.pokemonItem}
              >
                <Image
                  source={{ uri: getPokemonImage(pokemon.name) }}
                  style={styles.pokemonImage}
                />
                <View>
                  <Text style={styles.pokemonText}>
                    #{index + 1} - {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                  </Text>
                </View>
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
    backgroundColor: '#333',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  headerContainer: {
    backgroundColor: '#e3350d',
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  headerText: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 40,
    paddingVertical: 5,
    paddingLeft: 10,
    fontSize: 16,
    color: '#000', 
    width: width - 32,
  },
  lensIcon: {
    marginLeft: 10,
  },
  pokemonItem: {
    marginBottom: 8,
    backgroundColor: '#444',
    borderRadius: 10,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
  },
  pokemonImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  pokemonText: {
    fontSize: 18,
    color: '#fff',
    textShadowColor: '#000',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  text: {
    textAlign: 'center',
    fontSize: 18,
    color: '#fff',
    marginTop: 20,
  },
});
