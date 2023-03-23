<template>
    <div class="pokemon-details">
      <div class="header">
  <router-link to="/">Back to list</router-link>
      </div>
      <ul class="description-list">
        <li class="description-list-element">
          <img v-if="pokemonData.sprites && pokemonData.sprites.other && pokemonData.sprites.other.dream_world && pokemonData.sprites.other.dream_world.front_default" :src="pokemonData.sprites.other.dream_world.front_default" alt="">
        </li>
        <li class="description-list-element">
        <div class="tabs">
          <div class="tabLinks">
            <div class="tab" v-for="(tab, index ) in tabs" :key="index" @click="selectedTabs = tab" :class="{activeTab: selectedTabs === tab}">{{ tab }}</div>
          </div>
          <div class="tabContent" v-show="selectedTabs === 'Pokedex'" >
            <ul class="pokedex-list">
              <li class="pokedex-list-element">
                <h4 class="pokedex-header">Type</h4>
                <ul class="type-list">
                  <li class="type-list-element" v-for="(elem, index) in pokemonData.types" :key="index">{{ elem.type.name }}</li>
                </ul>
              </li>
              <li class="pokedex-list-element">
                <h4 class="pokedex-header">Height</h4>
                <p>{{ pokemonData.height }} yards</p>
              </li>
              <li class="pokedex-list-element">
                <h4 class="pokedex-header">Weight</h4>
                <p>{{ pokemonData.weight }} </p>
              </li>
              <li class="pokedex-list-element">
                <h4 class="pokedex-header">Abilities</h4>
                <ul class="abilities-list">
                  <li class="abilities-list-element" v-for="(elem, index) in pokemonData.abilities" :key="index">{{ elem.ability.name }}</li>
                </ul>
              </li>
            </ul>
          </div>
          <div class="statsContent" v-show="selectedTabs === 'Stats'">
            <ul class="stat-list">
             <li class="stat-list-element" v-for="(elem, index) in pokemonData.stats" :key="index">
              <h4>{{ elem.stat.name }}</h4>
              <div class="stat-description"><p>{{ elem.base_stat }}</p></div>
            </li>
            </ul>
          </div>
          <div class="Evolution-content" v-show="selectedTabs === 'Evolution'">
          </div>
        </div>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  export default {
    name: 'PokemonDetails',
    created() {
      this.getPokemonData(this.$route.params.id)
      this.getPokemonEvolution(this.$route.params.id)
    },
    data() {
    return {
      pokemonData: {},
      pokemonEvolution: [],
      tabs: ["Pokedex", "Stats", 'Evolution'],
      selectedTabs: "Pokedex"
    }
  },
  methods: {
    async getPokemonData(id) {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        this.pokemonData = response.data;
      } catch (error) {
        console.error(error);
      }
    },

    async getPokemonEvolution(id){
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/evolution-chain/${id}`);
        this.pokemonEvolution = response.data;
        console.log(this.pokemonEvolution)
      } catch (error) {
        console.error(error);
      }
    }
  }
  }
  </script>
  
  <style>

  .pokedex-list{
    list-style: none;
  }

  .type-list{
    list-style: none;
    display: flex
  }

  .type-list-element{
    background-color: orange;
    font-size: 15px;
    border-radius: 15px;
    color: white;
    padding: 20px;
    margin: 10px;
  }

  .pokedex-header{
    font-size: 20px;
    margin: 0;
  }

   .tab{
    height: 50px;
    width: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 20px;
    margin-bottom: 30px;
   }

  .pokedex-list-element{
    display: flex;
    background-color: #e10a0a;
    color: white;
    margin-bottom: 10px;
    padding: 15px;
    border: 1px black solid;
    justify-content: space-between;
    align-items: center;
    width: 400px;
  }

  .pokedex-list-element:last-child{
    flex-direction: column;
    align-items: start;
  }


  .description-list{
    list-style: none;
    display: flex;
    align-items: center;
   height: 494px;

  }

  .stat-list-element{
    display: flex;
    background-color: #e10a0a;
    color: white;
    margin-bottom: 10px;
    padding: 15px;
    border: 1px black solid;
    justify-content: space-between;
    align-items: center;
    width: 400px;
  }

  .stat-description{
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    border-radius: 15px;
    background-color: orange;
  }

  .abilities-list{
    display: block;
  }

  .abilities-list-element:first-child{
    margin-top: 10px;
  }


  .header{
    margin-bottom: 100px;
  }


  .description-list-element{
   margin: auto;
  }


  .tabLinks{
    width: 20xp;
    display: flex;
    justify-content: center;
  }

  .activeTab{
    background-color: #4CAF50;
  }
  </style>