"use strict";

const { exec } = require("child_process");
const fs = require("fs");
const os = require("os");
const path = require("path");

const platform = os.platform();
const aapt = path.join(__dirname, "bin", platform, "aapt");

if (platform === "linux") {
  fs.chmodSync(aapt, "777");
}

function promistify(cmd, callback) {
  callback = callback || function () {};
  return new Promise((resolve, reject) => {
    exec(cmd, (code, stdout, stderr) => {
      if (code !== null) {
        reject(stderr);
        callback(stderr, null);
      } else {
        resolve(stdout);
        callback(null, stdout);
      }
    });
  });
}

function list(apkfilePath, callback) {
  return promistify(`${aapt} l ${apkfilePath}`, callback);
}

function dump(what, apkfilePath, callback) {
  return promistify(`${aapt} d ${what} ${apkfilePath}`, callback);
}

function packageCmd(command, callback) {
  return promistify(`${aapt} p ${command}`, callback);
}

function remove(apkfilePath, files, callback) {
  if (!Array.isArray(files)) {
    files = [files];
  }
  const removeFiles = files.join(" ");
  return promistify(`${aapt} r ${apkfilePath} ${removeFiles}`, callback);
}

function add(apkfilePath, files, callback) {
  if (!Array.isArray(files)) {
    files = [files];
  }
  const addFiles = files.join(" ");
  return promistify(`${aapt} a ${apkfilePath} ${addFiles}`, callback);
}

function crunch(resource, outputFolder, callback) {
  if (!Array.isArray(resource)) {
    resource = [resource];
  }
  const resourceSources = resource.join(" ");
  return promistify(
    `${aapt} c -S ${resourceSources} -C ${outputFolder}`,
    callback
  );
}

function singleCrunch(inputFile, outputfile, callback) {
  return promistify(`${aapt} s -i ${inputFile} -o ${outputfile}`, callback);
}

function getVersion(callback) {
  return promistify(`${aapt} v`, callback);
}

function getBit(apkfilePath, callback) {
  promistify(`${aapt} d badging ${apkfilePath}`, callback)
    .then((data) => {
      return new Promise((resolve, reject) => {
        if (data) {
          if (data.includes("native-code: ") && data.includes("armeabi-v7a")) {
            resolve(null, "32-bit");
            callback(null, "32-bit");
          } else if (
            data.includes("native-code: ") &&
            data.includes("arm64-v8a")
          ) {
            resolve(null, "64-bit");
            callback(null, "64-bit");
          } else {
            resolve(null, null);
            callback(null, null);
          }
        } else {
          reject("Unable to determine bit version.");
        }
      });
    })
    .catch((error) => {
      reject(error);
    });
}

module.exports = {
  list,
  dump,
  packageCmd,
  remove,
  add,
  crunch,
  singleCrunch,
  getBit,
  getVersion,
};
