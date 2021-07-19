# GraphQL Basic Notes

## Better REST

- No OverFetching
- No UnderFetching (need multiple RESTful request)
- Flexible (clients can specify their exact data requirements)
- strong `Schema` and `Type System` (just like database)

## GraphQL Client

- `ctrl+enter`: run query
- `ctrl+space`: auto complete in `()` or `{}`
- `shift+ctrl+p`: prettify

## Basic Query Syntax

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

```sql
query {
  allFile(filter: {sourceInstanceName: {eq: "posts"}}) {
    edges {
      node {
        relativePath
        prettySize
        root
        dir
        name
        ext
        internal {
          mediaType
        }
        publicURL
      }
    }
  }
}
```

```json
{
  "data": {
    "allFile": {
      "edges": [
        {
          "node": {
            "relativePath": "gitBasicNotes.md",
            "prettySize": "28.1 kB",
            "root": "D:/",
            "dir": "D:/Work/Source/react-blog/gatsby/_posts",
            "name": "gitBasicNotes",
            "ext": ".md",
            "internal": {
              "mediaType": "text/markdown"
            },
            "publicURL": "/static/gitBasicNotes-f4bad03605183759bb31c2db3ba69e53.md"
          }
        },
        {
          "node": {
            "relativePath": "reactjsBasicNotes.md",
            "prettySize": "5.87 kB",
            "root": "D:/",
            "dir": "D:/Work/Source/react-blog/gatsby/_posts",
            "name": "reactjsBasicNotes",
            "ext": ".md",
            "internal": {
              "mediaType": "text/markdown"
            },
            "publicURL": "/static/reactjsBasicNotes-a1d04d35063f3e13e6e7302aa40ef1ce.md"
          }
        }
      ]
    }
  }
}
```
