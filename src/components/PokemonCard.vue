<template>
  <div class="card">
    <p class="id">{{ pokemonData.id }}</p>
    <h3>{{ pokemonData.name }}</h3>
    <div class="pokemon-image">
      <img v-if="pokemonData.sprites && pokemonData.sprites.other && pokemonData.sprites.other.dream_world && pokemonData.sprites.other.dream_world.front_default" :src="pokemonData.sprites.other.dream_world.front_default" alt="">
    </div>
    <div class="pokemon-stats">
      <p>Height: {{ pokemonData.height }} m</p>
      <p>Weight: {{ pokemonData.weight }} kg</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'PokemonCard',
  props: {
    activePokemon: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      pokemonData: {}
    }
  },
  watch: {
    activePokemon: {
      handler: function (newValue) {
      if (newValue) {
        this.getPokemonData(newValue.id);
      }
    }, immediate: true 
    }
  },
    
  methods: {
    async getPokemonData(id) {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        this.pokemonData = response.data;
        console.log(this.pokemonData)
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>
  
  <style>
  .card {
  position: relative;
  top: 0;
  width: 300px;
  height: 350px;
  padding: 10px;
  background-color: #ff0101;
  border: 1px solid #000000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  margin: 0 auto;
}

h3 {
  text-align: center;
  color: #ffffff;
  font-size: 25px;
  margin-top: 0px;
}

.id{
  border: 1px orange solid;
  display: block;
  color: white;
  background-color: orange;
  font-size: 20px;
  padding: 10px;
  padding-left: 15px;
  padding-right: 15px;
  width: fit-content;
  margin: 0;
  margin-left: auto;
}

.id p{
  text-align: c;
}

.pokemon-image {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
  margin-bottom: 20px;
 
}

.pokemon-image img {
  max-height: 100%;
  max-width: 100%;
}

.pokemon-stats {
  color: #ffffff;
  text-align: center;
}

.pokemon-stats p {
  margin: 0;
 padding-bottom: 10px;
  font-size: 20px;
}
  </style>