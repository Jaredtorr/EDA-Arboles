import Clothe from "../models/Clothe.js";
import { bst } from "./dependencies.js";

document.addEventListener("DOMContentLoaded", () => {
    let btn = document.getElementById("clothes-btn");
    let searchBtn = document.getElementById("search-btn");
    let minBtn = document.getElementById("min-btn");
    let maxBtn = document.getElementById("max-btn");
    let showAllBtn = document.getElementById("show-all-btn");

    btn.addEventListener("click", () => {
        let marcaClothe = document.getElementById("marcaClothe").value;
        let tallaClothe = document.getElementById("tallaClothe").value;
        let idClothe = document.getElementById("idClothe").value;
        let precioClothe = document.getElementById("precioClothe").value;
        let cantidadClothe = document.getElementById("cantidadClothe").value;
        let fechaClothe = document.getElementById("fechaClothe").value;

        console.log('Button Clicked');
        if (marcaClothe && tallaClothe && idClothe && precioClothe && cantidadClothe && fechaClothe) {
            let clothe = new Clothe(marcaClothe, tallaClothe, idClothe, parseFloat(precioClothe), parseInt(cantidadClothe), fechaClothe);
            console.log('Clothe Object:', clothe);
            let data = bst.add(clothe);
            console.log('BST Add Result:', data);
            if (data) {
                Swal.fire({
                    icon: "success",
                    title: "Éxito...",
                    text: "Producto agregado correctamente",
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "El producto ya existe",
                });
            }
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Por favor, complete todos los campos",
            });
        }
    });

    searchBtn.addEventListener("click", () => {
        let precioBuscar = parseFloat(document.getElementById("buscar").value);

        if (!isNaN(precioBuscar)) {
            let clotheNode = bst.search(precioBuscar);
            console.log('Search Result:', clotheNode);

            if (clotheNode) {
                Swal.fire({
                    title: 'Producto Encontrado',
                    html: `
                        <strong>Marca:</strong> ${clotheNode.value.marcaClothe} <br>
                        <strong>Talla:</strong> ${clotheNode.value.tallaClothe} <br>
                        <strong>ID:</strong> ${clotheNode.value.idClothe} <br>
                        <strong>Precio:</strong> ${clotheNode.value.precioClothe} <br>
                        <strong>Cantidad:</strong> ${clotheNode.value.cantidadClothe} <br>
                        <strong>Fecha:</strong> ${clotheNode.value.fechaClothe}
                    `,
                    icon: 'info'
                });
                displayDataInTable([clotheNode.value]);
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "El producto no existe",
                });
            }
        } else {
            Swal.fire({
                icon: "warning",
                title: "Oops...",
                text: "Por favor, ingrese un precio válido para buscar",
            });
        }
    });

    minBtn.addEventListener("click", () => {
        let minNode = bst.min();
        console.log('Min Node:', minNode);
        if (minNode) {
            Swal.fire("Valor mínimo encontrado", `Precio mínimo: ${minNode.value.precioClothe}`);
        } else {
            Swal.fire("El árbol está vacío");
        }
    });

    maxBtn.addEventListener("click", () => {
        let maxNode = bst.max();
        console.log('Max Node:', maxNode);
        if (maxNode) {
            Swal.fire("Valor máximo encontrado", `Precio máximo: ${maxNode.value.precioClothe}`);
        } else {
            Swal.fire("El árbol está vacío");
        }
    });

    showAllBtn.addEventListener("click", () => {
        let allClothes = [];
        bst.inOrderTraverse((clothe) => allClothes.push(clothe));
        console.log('All Clothes:', allClothes);
        if (allClothes.length > 0) {
            displayDataInTable(allClothes);
        } else {
            Swal.fire({
                icon: "info",
                title: "Vacío",
                text: "No hay productos en el árbol",
            });
        }
    });

    function displayDataInTable(data) {
        let tbody = document.querySelector("table tbody");
        tbody.innerHTML = "";
        data.forEach(clothe => {
            let row = document.createElement("tr");
            row.innerHTML = `
                <td>${clothe.marcaClothe}</td>
                <td>${clothe.tallaClothe}</td>
                <td>${clothe.idClothe}</td>
                <td>${clothe.precioClothe}</td>
                <td>${clothe.cantidadClothe}</td>
                <td>${clothe.fechaClothe}</td>
            `;
            tbody.appendChild(row);
        });
    }
});