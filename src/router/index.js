import Vue from "vue";
import Router from "vue-router";
import PokemonList from "@/components/PokemonList.vue";
import PokemonDetails from "@/components/PokemonDetails.vue";

Vue.use(Router);

export const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "pokemon-list",
      component: PokemonList,
    },
    {
      path: "/pokemon/:id",
      name: "pokemon-details",
      component: PokemonDetails,
    },
  ],
});
