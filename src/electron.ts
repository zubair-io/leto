'use strict';

const electron = require('electron');
const { app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')
const http = require('http');
const fs = require('fs');
const getType = require('mime-types').contentType;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
  // Create the browser window.
 let displays = electron.screen.getAllDisplays()
  let d = displays.find((display) => {
    return { width: display.bounds.width, height: display.bounds.height }
  })
  let minScreenWidth = 650;
  let minScreenHeight = 450;

  mainWindow = new BrowserWindow({
    width: Math.max(minScreenWidth, ~~(d.bounds.width * 0.75)),
    height: Math.max(minScreenHeight, ~~(d.bounds.height * 0.75)),
    minWidth: minScreenWidth,
    minHeight: minScreenHeight,
    title: 'Leto'
  })
 
  mainWindow.loadURL(`file://${ path.join(__dirname,  '../www/index_electron.html')}`)

  // Open the DevTools.
  mainWindow.webContents.openDevTools({mode:'undocked'});

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
});


