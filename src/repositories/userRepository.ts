// const { User } = require("../database/index");

export const list = async () => {
  // const { data } = User.list();
  const data = [
    { name: "nombre1", lastname: "apellido1" },
    { name: "nombre2", lastname: "apellido2" },
  ];
  return data;
};

export const create = async () => {
  return "hola";
};
