// En proyectos de back en node el import solia conocerse como require, a continuación se mustra la
// forma en la que solía importarse la librería express dentro del archivo de arranque del back
// const express = require('express');
// La siguiente es una directiva, parece un comentario, pero no, su función es deshabilitar el checkeo
// de tipos en archivos javaScript, los cuales al no ser typeScript no son tipados
// @ts-nocheck
import express from "express";
const app = express(); // A esta variable se le agregan las rutas, los métodos y todo lo necesario
const port = 5000;

// http://localhost:5000/vehiculo: en esta ruta se imprime Hello World! cuando se hace get en la ruta
app.get("/vehiculo", (req, res) => {
  //El arrow function se ejecuta cuando se hace petición get en la ruta
  // res.send(
  //   `<h1>Esta es la respuesta para una petición get en la ruta http://localhost:${port}/vehiculo</h1>`
  // );
  const vehiculos = [// arreglo de objetos javaScript (casi pero no es formato json)
    // el método send del objeto res en express internamente realiza la conversión al formato json
    // por ello en la ruta del navegador se observa este arreglo de objetos en formato json
    { marca: "Toyota", modelo: 2020, gama: "Yaris" },
    { marca: "Toyota", modelo: 2021, gama: "Corolla" },
    { marca: "Toyota", modelo: 2022, gama: "CX30" },
    { marca: "Ford", modelo: 2010, gama: "Fiesta" },
  ];
  res.send(vehiculos);
  //En este punto ya se puede recibir una petición en una ruta partícular y entregar una respuesta en esta ruta
});

// Se prende app de tal forma que escucha todo lo que se encuentra en el puerto 5000
app.listen(port, () => {
  //Por aquí se escucha la petición
  // Esta es la función que se ejecuta en la terminal cuando la app empieza a escuchar
  console.log(`Example app listening on port ${port}`);
});
