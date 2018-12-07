import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { Route, Switch } from '../shared/routing/router';
import NotFound from './NotFound';
import ConnectDashboard from './dashboard/Dashboard';
import { ConnectPrivateRoute } from '../shared/routing/private-route/PrivateRoute';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const Home = () => (
  <View style={styles.container}>
    <Switch>
      <ConnectPrivateRoute exact path="/" component={ConnectDashboard} />
      <Route component={NotFound} />
    </Switch>
  </View>
);

export default Home;
