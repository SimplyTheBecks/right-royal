<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
      <v-list dense>
        <v-list-item
          v-for="navBarButton in navBarButtons"
          :key="navBarButton.key"
          :to="navBarButton.to"
          link
        >
          <v-list-item-action>
            <v-icon>{{navBarButton.icon}}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{navBarButton.title}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      clipped-left
    >
      <v-toolbar-title>RIGHT ROYAL</v-toolbar-title>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-btn v-on:click="switchLocale" fab small dark>
        <country-flag v-if="currentLocale === 'en'" country="gb" size="normal" />
        <country-flag v-else-if="currentLocale === 'ru'" country="ru" size="normal" />
      </v-btn>
      <v-badge
        color="green"
        :content="userMessageCount"
        overlap
      >
        <v-btn icon>
          <v-icon>mdi-email</v-icon>
        </v-btn>
      </v-badge>
      <v-badge
        color="red"
        :content="userNotificationCount"
        overlap
      >
        <v-btn icon>
          <v-icon>mdi-alarm-light</v-icon>
        </v-btn>
      </v-badge>
      <v-avatar color="mx-5 grey lighten-2">
        <span class="black--text headline">TT</span>
      </v-avatar>
      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container
        class="fill-height grey lighten-5"
        fluid
      >
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import userMessageCount from './api/user-message';
import userNotificationCount from './api/user-notification';
import eventHub from './utils/eventhub';

export default {
  name: 'App',
  props: {
    source: String,
  },
  data: () => ({
    drawer: true,
    navBarButtons: [],
    userMessageCount: 0,
    userNotificationCount: 0,
  }),
  methods: {
    getNavBarButtons() {
      return [
        {
          key: 'dashboard',
          to: '/dashboard',
          icon: 'mdi-view-dashboard',
          title: this.$vuetify.lang.t('$vuetify.dashboard'),
        },
        {
          key: 'applications',
          to: '/applications',
          icon: 'mdi-application',
          title: this.$vuetify.lang.t('$vuetify.applications'),
        },
        {
          key: 'shop',
          to: '/shop',
          icon: 'mdi-shopping',
          title: this.$vuetify.lang.t('$vuetify.shop'),
        },
        {
          key: 'support',
          to: '/support',
          icon: 'mdi-account-supervisor',
          title: this.$vuetify.lang.t('$vuetify.support'),
        },
      ];
    },
    switchLocale() {
      if (this.currentLocale === 'en') {
        this.$store.commit('setCurrentLocale', 'ru');
      } else if (this.currentLocale === 'ru') {
        this.$store.commit('setCurrentLocale', 'en');
      }
      this.$vuetify.lang.current = this.currentLocale;
      Object.values(this.navBarButtons).forEach((value, i) => {
        this.navBarButtons[i].title = this.$vuetify.lang.t(`$vuetify.${value.key}`);
      });
      this.changeDocumentTitle();
    },
    changeDocumentTitle() {
      document.title = `${this.$vuetify.lang.t(`$vuetify.${this.routeName}`)} - Right Royal` || 'Right Royal';
    },
    onRequestEvents() {
      eventHub.$on('before-request', () => this.$isLoading(true));
      eventHub.$on('request-error', () => this.$isLoading(false));
      eventHub.$on('after-response', () => this.$isLoading(false));
      eventHub.$on('response-error', () => this.$isLoading(false));
    },
    offRequestEvents() {
      eventHub.$off('before-request', () => this.$isLoading(true));
      eventHub.$off('request-error', () => this.$isLoading(false));
      eventHub.$off('after-response', () => this.$isLoading(false));
      eventHub.$off('response-error', () => this.$isLoading(false));
    },
  },
  created() {
    this.$vuetify.theme.dark = true;
    this.navBarButtons = this.getNavBarButtons();
    this.onRequestEvents();
  },
  beforeDestroy() {
    this.offRequestEvents();
  },
  mounted() {
    userMessageCount().then((response) => {
      this.userMessageCount = response.data.count;
    });
    userNotificationCount().then((response) => {
      this.userNotificationCount = response.data.count;
    });
  },
  watch: {
    $route(to) {
      this.$store.commit('setRouteName', to.name);
      this.changeDocumentTitle();
    },
  },
  computed: {
    currentLocale() {
      return this.$store.state.currentLocale;
    },
    routeName() {
      return this.$store.state.routeName;
    },
  },
};
</script>
