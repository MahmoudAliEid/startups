# Extract the schema of Sanity

```shell
npx sanity@latest schema extract --path=./sanity/extract.json
```

## Generate Types

```shell
npx sanity@latest typegen generate
```

### Commands for auto generate

```shell
 "predev": "npm run typegen",
    "prebuild": "npm run typegen",
    "typegen": "sanity schema extract --path=./sanity/extract.json && sanity typegen generate"
```
