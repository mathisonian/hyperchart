# hyperchart
charts for hyperterm. built on [hyperterm-window](https://github.com/mathisonian/hyperterm-window)

![hyperchart](https://cloud.githubusercontent.com/assets/1074773/17677176/9e821b4c-62ff-11e6-926a-6c0d8a914118.gif)

## install

```
$ npm install -g hyperchart
```

to get the command line tool and then add `hyperchart` to your `plugins` array in `~/.hyperterm.js`. You'll see a notification popup once the plugin installation happens successfully (give it a few seconds for `npm install` to finish)  


## usage

```
hyperchart <filename> --<chart-type>
```

Valid chart types are: `line`, `scatter`.


### data formatting:

Data is passed directly to [victory react components](https://formidable.com/open-source/victory/). In general it should be json like:

```json
[{"x": "val", "y": "val"}, ...]
```
