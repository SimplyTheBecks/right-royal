<template>
  <v-row>
    <v-col cols="12">
      <v-row
        align="start"
        justify="center"
        class="grey lighten-5"
      >
        <product-card
          v-for="(product, i) in products"
          :key="i"
        >
          {{product.name}}
        </product-card>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import ProductCard from '../components/ProductCard.vue';
import products from '../api/product';

export default {
  name: 'Shop',
  data: () => ({
    products: [],
  }),
  components: {
    ProductCard,
  },
  mounted() {
    products().then((response) => {
      this.products = response.data;
    });
  },
};
</script>
