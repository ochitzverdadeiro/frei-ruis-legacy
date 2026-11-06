import test from "node:test";
import assert from "node:assert/strict";
import { redes } from "../src/data/redes-sociais.ts";

test("a página inicial oferece as três redes pedidas", () => {
  assert.deepEqual(
    redes.map((rede) => rede.rotulo),
    ["Instagram", "Facebook", "YouTube"],
  );
});

test("cada rede aponta para o endereço oficial informado", () => {
  assert.deepEqual(
    redes.map((rede) => rede.url),
    [
      "https://www.instagram.com/freiruidepineofficial/",
      "https://www.facebook.com/freiruidepineofficial/",
      "https://www.youtube.com/@freiruidepineofficial",
    ],
  );
});

test("nenhum botão fica sem endereço", () => {
  for (const rede of redes) {
    assert.match(rede.url, /^https:\/\/[^\s]+$/);
  }
});
