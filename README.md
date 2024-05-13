# aapt-js

> aapt-js is cloned from shenzhim's [aaptjs](https://github.com/shenzhim/aaptjs) project.

aapt-js is a node wraper for aapt. You can get information about `.apk` file which you provide, eg: bit version(32-bit or 64-bit), version and so on.  

## Install

```
npm install @litecase/aapt-js --save
```

## Example

```js
const { list }  = require('aapt-js')

aaptJs.list('/path/to/your/ExampleApp.apk', (err, data) => {
  if (!err) {
    console.log(data)
  } else {
    // something went wrong 
  }
})
```

## Some Methods

- list(apkfilePath: string, callback?: (err: Error|null, data: string) => void): Promise<string>

- dump(what: string, apkfilePath: string, callback?: (err: Error|null, data: string) => void): Promise<string>

- packageCmd(command: string, callback?: (err: Error|null, data: string) => void): Promise<string>

- remove(apkfilePath: string, files: string|string[], callback?: (err: Error|null, data: string) => void): Promise<string>

- add(apkfilePath: string, files: string|string[], callback?: (err: Error|null, data: string) => void): Promise<string>

- crunch(resource: string|string[], outputFolder: string, callback?: (err: Error|null, data: string) => void): Promise<string>

- singleCrunch(inputFile: string, outputfile: string, callback?: (err: Error|null, data: string) => void): Promise<string>

- getVersion(callback?: (err: Error|null, data: string) => void): Promise<string>

- getBit(callback?: (err: Error|null, data: string) => void): Promise<string>