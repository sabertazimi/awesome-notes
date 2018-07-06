# React Router Basic Notes

## Router and Route

parent routes are active when child routes are active

### Nested Route

Key Notes: In component of parent route, should render {this.props.children}

```js
import {
    Router,
    Route,
    hashHistory
} from 'react-router';

render((
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <Route path="/repos" component={Repos}>
                <Route path="/reops/:userName/:repoName" component={Repo} />
            </ Route>
        </ Route>
    </ Router>
),document.getElementById('app'));
```

> In App.js: render() { return (<div>... {this.props.children}</ div>); }

> In Repos.js: render() { return (<div>... {this.props.children}</ div>); }

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

-   has no path
-   becomes this.props.children of the parent

### Clean URLs

replace hashHistory for browserHistory

### Change Route

*   onEnter = { () => store.dispatch(createRouteAction(params))}

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

```
# always serve index.html for any request (react-router for single page application)
root /var/www/blog/html/build;
index index.html;
server_name blog.sabertazimi.cn;

location / {
   try_files $uri /index.html;
}
```
