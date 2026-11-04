import test from "node:test";
import assert from "node:assert/strict";
import { ebook } from "../src/data/ebook.ts";

test("o ebook é vendido por R$ 74,90", () => {
  assert.equal(ebook.preco, 74.9);
});

test("quem compra recebe o ebook por download na página e por e-mail", () => {
  assert.deepEqual([...ebook.entrega], ["download na página", "cópia por e-mail"]);
});

test("os dados oficiais do livro estão corretos", () => {
  assert.equal(ebook.titulo, "Frei Rui");
  assert.equal(ebook.isbn, "978-65-274-1322-6");
  assert.equal(ebook.paginas, 180);
  assert.equal(ebook.autores.length, 5);
});

test("a página lista todos os 24 capítulos do sumário", () => {
  assert.equal(ebook.capitulos.length, 24);
  assert.equal(ebook.capitulosTotal, 24);
  assert.equal(ebook.capitulos[0].titulo, "A Páscoa do Frei Rui");
  assert.equal(ebook.capitulos[23].titulo, "Histórias do Frei Rui");
});
