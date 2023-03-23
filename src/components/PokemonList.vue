<template>
  <div>
    <h1 class="pokemon-header">Pokemon List</h1>
    <div class="card-position">
    <ul class="pokemon-list" v-if="paginatedPokemons.length > 0">
      <li class="pokemon-list-element"  v-for="pokemon in paginatedPokemons" :key="pokemon.id" @click="showDetails(pokemon)" @mouseover="showCard(pokemon)" @mouseleave="hideCard(pokemon)" :class="{ active: pokemon.active }">
        <router-link class="pokemon-name" :to="{ name: 'pokemon-details', params: { id: pokemon.id } }">{{ pokemon.name }}</router-link>
      </li>
    </ul>
    <div class="pokemon-card">
      <pokemon-card v-if="activePokemon" :activePokemon="activePokemon" @hide-card="hideCard" />
    </div>
  </div>
    <div>
    </div>
    <div class="pagination">
      <button :disabled="currentPage === 1" @click="currentPage--">Prev</button>
      <div class="page" v-for="page in pages" :key="page">
        <button :class="{ active: page === currentPage }" @click="currentPage = page">{{ page }}</button>
      </div>
      <button class="next-button" :disabled="currentPage === totalPages" @click="currentPage++">Next</button>
    </div>
  </div>
</template>

<script>
import PokemonCard from './PokemonCard.vue';

import axios from 'axios';

export default {
  components: {
    PokemonCard,
  },
  data() {
    return {
      pokemons: [],
      activePokemon: null,
      currentPage: 1,
      itemsPerPage: 10,
      totalItems: 0,
      totalPages: 0
    };
  },
  async mounted() {
    await this.fetchPokemons();
  },
  computed: {
    paginatedPokemons() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.pokemons.slice(startIndex, endIndex);
    },
    pages() {
      const pages = [];
      for (let i = 1; i <= this.totalPages; i++) {
        if (i === 1 || i === this.totalPages || (i >= this.currentPage - 0 && i <= this.currentPage + 3)) {
          pages.push(i);
        }
      }
      return pages;
    }
  },
  methods: {
    async fetchPokemons() {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1000');
        const pokemons = response.data.results.map(pokemon => ({
          name: pokemon.name,
          id: pokemon.url.split('/')[6],
          active: false
        }));
        this.pokemons = pokemons;
        this.totalItems = pokemons.length;
        this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
      } catch (error) {
        console.error(error);
      }
    },
    showCard(pokemon) {
      this.activePokemon = pokemon;
      this.pokemons.forEach((p) => {
        p.active = p.id === this.activePokemon.id;
      });
    },
    showDetails(pokemon) {
  this.activePokemon = pokemon;
  this.pokemons.forEach((p) => {
    p.active = p.id === this.activePokemon.id;
  });
  this.$router.push({ name: 'pokemon-details', params: { id: this.activePokemon.id } });
},
    hideCard() {
      this.activePokemon = null;
      this.pokemons.forEach((p) => {
        p.active = false;
      });
    }
  },
  watch: {
    currentPage() {
      this.fetchPokemons();
    }
  }
};
</script>

<style>
   .pokemon-list {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  .pokemon-list-element {
    background-color: #f5f5f5;
    width: 300px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    margin-bottom: 5px;
    cursor: pointer;
    background: rgb(212, 61, 86);
  }

  .page{
    width: 50px;
  }

  .pokemon-list-element:hover {
    background-color: #e10a0a;
  }

 .pokemon-name{
  color: white;
  text-decoration: none;
  font-size: 20px;
 }

 .next-button{
  margin-left: 20px;
 }

.card-position{
  display: flex;
  align-items: center;
  justify-content: center;
}

.pokemon-card {
  margin: auto;
}
  
  .pagination button {
  background-color: #f2f2f2;
  color: #333;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.pagination button:hover {
  background-color: #ddd;
}

.pagination button.active {
  background-color: #4CAF50;
  color: white;
}

.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination {
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 500px; 
  margin: 0 auto;
}

.pokemon-header{
  text-align: center;
  color: #000000;
} 
  </style>