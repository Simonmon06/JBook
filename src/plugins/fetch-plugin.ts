import * as esbuild from "esbuild-wasm";
import axios from "axios";
import localForage from "localforage";

// creation of file cache
const fileCache = localForage.createInstance({
  name: "filecache",
});

export const fetchPlugin = (inputCode: string) => {
  return {
    name: "fetch-plugin",
    setup(build: esbuild.PluginBuild) {
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log("onLoad", args);

        if (args.path === "index.js") {
          return {
            loader: "jsx",
            contents: inputCode,
          };
        }
        // Check to see if we have already fetched this file

        const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(
          args.path
        );
        // and if it is in the cache return it immediately
        if (cachedResult) {
          return cachedResult;
        }

        const { data, request } = await axios.get(args.path);
        console.log("request", request);

        const result: esbuild.OnLoadResult = {
          loader: "jsx",
          contents: data,
          // resolveDir provides a dirtory for the current file.
          resolveDir: new URL("./", request.responseURL).pathname,
        };
        await fileCache.setItem(args.path, result);
        return result;
      });
    },
  };
};