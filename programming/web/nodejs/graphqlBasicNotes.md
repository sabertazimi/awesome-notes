# GraphQL Basic Notes

## GraphiQL

- `ctrl+enter`: run query
- `ctrl+space`: auto complete
- `shift+ctrl+p`: prettify

## Basic Syntax

```sql
{
  site {
    id
    siteMetadata {
      author
    }
    host
    port
    pathPrefix
    buildTime
  }
}
```

```json
{
  "data": {
    "site": {
      "id": "Site",
      "siteMetadata": {
        "author": "sabertazimi"
      },
      "host": "localhost",
      "port": "8000",
      "pathPrefix": "/react-blog",
      "buildTime": "2019-03-05T13:40:39.129Z"
    }
  }
}
```
