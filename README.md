After clone this repo, start a local host remote scope:

```shell
# install deps
bit install --log=info
# compile aspect
bit compile --log=info
# start scope server as specified root ui
bit start --log=info` or `bit start my-scope/my-ui-root --log=info
```

After create your bit workspace, modify `teambit.workspace/workspace.defaultScope` as 'my-local-bit-scope'.

And then add local host remote scope with command `bit remote add http://localhost:3000`

So you can create a component and export to local host remote scope(http://localhost:3000)

In http://localhost:3000/graphql, input follow query:

```graphql
query {
  scope {
    components {
      id {
        name,
        version,
        scope,
      },
      displayName,
      packageName,
      mainFile,
      fs,
      getFile(path: "button.tsx"),
    }
  }
  getHost {
    name
  }
}
```

Then you can get your exported component info.
