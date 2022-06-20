import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import Main from './Main'



export const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <Main />
        </Route>
      </Switch>
    </Router>
  )
}
