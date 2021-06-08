import { useMemo } from 'react';
import { Switch, Route, useLocation, Redirect } from 'react-router-dom';
import { otherRoutes } from 'routes/index';
const ChildView = () => {
  const location = useLocation();
  console.log(location);

  const getterRoutes = useMemo(() => {
    const filterRoute = otherRoutes.filter((item) =>
      location.pathname.startsWith(item.to)
    );
    const children = (filterRoute && filterRoute[0]?.children) || [];
    return children;
  }, [location.pathname]);

  return (
    <Switch>
      {getterRoutes.map((route) => {
        return (
          <Route key={route.to} path={route.to} component={route.view}></Route>
        );
      })}
      <Route path="*">
        <Redirect to={getterRoutes[0].to} />
      </Route>
    </Switch>
  );
};

export default ChildView;
