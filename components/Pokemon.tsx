import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';

interface PokemonProps {
  pokemonName: string;
  switchToMain: () => void;
}

const Pokemon: React.FC<PokemonProps> = ({ pokemonName, switchToMain }) => {
  const [pokemonData, setPokemonData] = useState<any>(null);
  const [mainSprite, setMainSprite] = useState<string>('');

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then((response) => response.json())
      .then((data) => {
        setPokemonData(data);
        if (data.sprites && data.sprites.front_default) {
          setMainSprite(data.sprites.front_default);
        }
      })
      .catch((error) => console.error('Error fetching Pokemon data:', error));
  }, [pokemonName]);

  if (!pokemonData) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>
          {pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)}
        </Text>
      </View>
      <View style={styles.imageContainer}>
        {mainSprite ? (
          <Image source={{ uri: mainSprite }} style={styles.imageWithBorder} />
        ) : (
          <Text>No image available</Text>
        )}
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.detailsBox}>
          <Text style={styles.detailsText}>ID: {pokemonData.id}</Text>
          <Text style={styles.detailsText}>Height: {pokemonData.height}</Text>
          <Text style={styles.detailsText}>Weight: {pokemonData.weight}</Text>
          <Text style={styles.detailsText}>Abilities:</Text>
          <View>
            {pokemonData.abilities.map((ability: any, index: number) => (
              <Text key={index} style={styles.detailsText}>
                {ability.ability.name}
              </Text>
            ))}
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={switchToMain}>
        <Text style={styles.buttonText}>Back to Main</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
  },
  headerContainer: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 10,
    paddingTop: 50,
    backgroundColor: '#e3350d',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5, 
  },
  headerText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: '#000',
    textShadowOffset: { width: 0, height: 2 },
    textShadowOpacity: 0.8,
    textShadowRadius: 4,
  },
  imageContainer: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 15,
  },
  imageWithBorder: {
    width: 250,
    height: 250,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#666',
    borderRadius: 10,
    backgroundColor: '#444',
  },
  detailsContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  detailsBox: {
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    width: '80%',
    borderWidth: 2,
    borderColor: '#666',
    backgroundColor: '#444',
  },
  detailsText: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
    textShadowColor: '#000',
    textShadowOffset: { width: 0, height: 2 },
    textShadowOpacity: 0.8,
    textShadowRadius: 4,
  },
  button: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#b82e0f',
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5, 
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: '#000',
    textShadowOffset: { width: 0, height: 2 },
    textShadowOpacity: 0.8,
    textShadowRadius: 4,
  },
});

export default Pokemon;
