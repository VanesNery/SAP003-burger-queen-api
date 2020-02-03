"use strict";
module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      "products",
      [
        {
          name: "Café Americano",
          price: 5,
          type: "Breakfast",
          isextras: false,
          hasoptions: "",
        },
        {
          name: "Café com leite",
          price: 7,
          type: "Breakfast",
          isextras: false,
          hasoptions: "",
        },
        {
          name: "Misto Quente",
          price: 10,
          type: "Breakfast",
          isextras: false,
          hasoptions: "",
        },
        {
          name: "Suco Natural",
          price: 7,
          type: "Breakfast",
          isextras: false,
          hasoptions: "",
        },
        {
          name: "Hambúrguer Simples",
          price: 10,
          type: "Lunch",
          isextras: false,
          hasoptions: "",
        },
        {
          name: "Hambúrguer Duplo",
          price: 15,
          type: "Lunch",
          isextras: false,
          hasoptions: "",
        },
        {
          name: "Batata Frita",
          price: 5,
          type: "Lunch",
          isextras: false,
          hasoptions: "",
        },
        {
          name: "Anéis de cebola",
          price: 5,
          type: "Lunch",
          isextras: false,
          hasoptions: "",
        },
        {
          name: "Água 500ml",
          price: 5,
          type: "Lunch",
          isextras: false,
          hasoptions: "",
        },
        {
          name: "Água 750ml",
          price: 7,
          type: "Lunch",
          isextras: false,
          hasoptions: "",
        },
        {
          name: "Refrigerante 500ml",
          price: 7,
          type: "Lunch",
          isextras: false,
          hasoptions: "",
        },
        {
          name: "Refrigerante 750ml",
          price: 10,
          type: "Lunch",
          isextras: false,
          hasoptions: "",
        },
        {
          name: "Ovo",
          price: 1,
          type: "Lunch",
          isextras: true,
          hasoptions: "",
        },
        {
          name: "Queijo",
          price: 1,
          type: "Lunch",
          isextras: true,
          hasoptions: "",
        }
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete("products", null, {});
  }
};
