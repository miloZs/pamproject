import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

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

    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {mainSprite ? (
        <Image source={{ uri: mainSprite }} style={styles.image} />
      ) : (
        <Text>No image available</Text>
      )}
      <Text>Name: {pokemonData.name}</Text>
      <Text>ID: {pokemonData.id}</Text>
      <Text>Height: {pokemonData.height}</Text>
      <Text>Weight: {pokemonData.weight}</Text>
      <Text>Abilities:</Text>
      <View>
        {pokemonData.abilities.map((ability: any, index: number) => (
          <Text key={index}>{ability.ability.name}</Text>
        ))}
      </View>
      <TouchableOpacity style={styles.button} onPress={switchToMain}>
        <Text style={styles.buttonText}>Back to Main</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#DDDDDD',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Pokemon;
