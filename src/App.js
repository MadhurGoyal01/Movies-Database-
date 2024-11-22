import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Home from './components/Home'
import MovieDetails from './components/MovieDetails'
// import NotFound from './components/NotFound'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/movie/:id" component={MovieDetails} />
    </Switch>
  </BrowserRouter>
)

export default App
