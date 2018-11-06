# React Router Basic Notes

## Router and Route

parent routes are active when child routes are active

### Basic Usage

```jsx
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/tags' render={ () => { return <Redirect to='/tags/all'/> } }/>
          <Route path='/tags/:tagName' component={Tags}/>
          <Route path='/posts/:mdFile' component={Post}/>
          <Route path='/book' component={Book}/>
          <Route component={NotFound}/>
        </Switch>
      </Router>
    );
  }
}
```

### Nested Route

Key Notes: In component of parent route, should render {this.props.children}

```js
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';

render((
    <Router>
        <Route path="/" component={App}>
            <Route path="/repos" component={Repos}>
                <Route path="/reops/:userName/:repoName" component={Repo} />
            </ Route>
        </ Route>
    </ Router>
),document.getElementById('app'));
```

> In App.js: `render() { return (<div>... {this.props.children}</ div>); }`
> In Repos.js: `render() { return (<div>... {this.props.children}</ div>); }`

### URL Params

```js
<Route path="/repos/:userName/:repoName" component={Repo} />
```

```js
// In Repo.js
<div>{this.props.params.userName}</ div>
<div>{this.props.params.repoName}</ div>
```

### IndexRoute

- has no path
- becomes this.props.children of the parent

### Clean URLs

replace hashHistory for browserHistory

### Change Route

- onEnter = { () => store.dispatch(createRouteAction(params))}

## Deployment

### Express Config

```js
app.use(express.static(path.resolve(__dirname, 'build')));

// always serve index.html for any request
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html');
});
```

### Nginx Config

```config
# always serve index.html for any request (react-router for single page application)
root /var/www/blog/html/build;
index index.html;
server_name blog.sabertazimi.cn;

location / {
   try_files $uri /index.html;
}
```

### A Simple React Router

- `<Route>` instances listen to `popstate` event to `forceUpdate`.
- When click `<Link>`/`<Reditect>`, `historyPush` or `historyReplace` get called, `<Route>` instances re-match and re-render.

```jsx
const instances = [];

const register = (comp) => instances.push(comp);
const unregister = (comp) => instances.splice(instances.indexOf(comp), 1);

const historyPush = (path) => {
  history.pushState({}, null, path);
  instances.forEach(instance => instance.forceUpdate());
}

const historyReplace = (path) => {
  history.replaceState({}, null, path);
  instances.forEach(instance => instance.forceUpdate());
}
```

#### Route Component

```jsx
const matchPath = (pathname, options) => {
  const { exact = false, path } = options;

  if (!path) {
    return {
      path: null,
      url: pathname,
      isExact: true,
    };
  }

  const match = new RegExp(`^${path}`).exec(pathname);

  if (!match) {
    // There wasn't a match.
    return null;
  }

  const url = match[0];
  const isExact = pathname === url;

  if (exact && !isExact) {
    // There was a match, but it wasn't
    // an exact match as specified by
    // the exact prop.

    return null;
  }

  return {
    path,
    url,
    isExact,
  };
}

class Route extends Component {
  static propTypes: {
    path: PropTypes.string,
    exact: PropTypes.bool,
    component: PropTypes.func,
    render: PropTypes.func,
  }

  componentWillMount() {
    addEventListener('popstate', this.handlePop);
    register(this);
  }

  componentWillUnmount() {
    removeEventListener('popstate', this.handlePop);
    unregister(this);
  }

  handlePop = () => {
    this.forceUpdate();
  }

  render() {
    const {
      path,
      exact,
      component,
      render,
    } = this.props;

    const match = matchPath(location.pathname, { path, exact });

    if (!match) {
      return null:
    }

    if (component) {
      return React.createElement(component, { match });
    }

    if (render) {
      return render({ match });
    }

    return null;
  }
}
```

#### Link Component

Whenever a `<Link>` is clicked and the location changes,
each `<Route>` will be aware of that and re-match and re-render with `instances`.

```jsx
class Link extends Component {
  static propTypes = {
    to: PropTypes.string.isRequired,
    replace: PropTypes.bool,
  }

  handleClick = (event) => {
    const { replace, to } = this.props;
    event.preventDefault();

    replace ? historyReplace(to) : historyPush(to);
  }

  render() {
    const { to, children} = this.props;

    return (
      <a href={to} onClick={this.handleClick}>
        {children}
      </a>
    );
  }
}
```

#### Redirect Component

```jsx
class Redirect extends Component {
  static defaultProps = {
    push: false
  }

  static propTypes = {
    to: PropTypes.string.isRequired,
    push: PropTypes.bool.isRequired,
  }

  componentDidMount() {
    const { to, push } = this.props;

    push ? historyPush(to) : historyReplace(to);
  }

  render() {
    return null;
  }
}
```
