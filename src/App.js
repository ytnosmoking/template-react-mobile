
import {
  BrowserRouter as Router,
  // HashRouter as Router,
  // Switch,
  Route,
  Redirect
} from 'react-router-dom'
// import { useMemo } from 'react'
import { routes as baseRoutes, otherRoutes } from 'routes/index'

import { CacheSwitch, CacheRoute } from 'react-router-cache-route';
import 'styles/App.less'





function App() {
  const routes = [...baseRoutes, ...otherRoutes]
  console.log(routes)
  return (
    <Router>
      {/* <Switch> */}
      <CacheSwitch>
        {routes.map((route) => {

          if (route.keepAlive) {
            return <CacheRoute key={route.to} path={route.to} component={route.view} ></CacheRoute>
          } else {
            return <Route key={route.to} path={route.to} component={route.view} ></Route>
          }
        })}
        <Route path="/" exact>
          <Redirect to='/home' />
        </Route>
        <Route render={() => <div>404 Not Found</div>} />


      </CacheSwitch>
      {/* </Switch> */}
    </Router>
  );
}

export default App;
