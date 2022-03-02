import { writeFile, readFile } from "fs";
import { resolve } from "path";

const ARQUIVO_DE_FILA = `${resolve(".")}/files/fila.txt`;

/**
 * Os métodos escritos abaixo implementam uma fila de mensagens escritas em
 * arquivo de texto, presente na pasta "files". A cada mensagem escrita nesta fila,
 * (através do método `escreveNaFila`) o código escreve a frase ao final do arquivo.
 * O método `consumirDafila` retira a primeira mensagem escrita no arquivo e a retorna.
 *
 * As funções abaixo estão todas escritas utilizando callbacks como soluções
 * para a manipulação dos arquvos.
 *
 * Tranforme a solução escrita abaixo em um código válido utilizando promises ou
 * async/await.
 */

export function zerarAquivo(): Promise<void> {
  return escreveArquivo("");
}

export function leArquivo(): Promise<string> {
  let resultado = new Promise<string>((resolve, reject) => {
    readFile(ARQUIVO_DE_FILA, "utf8", (err, conteudo) => {
      if (err) {
        reject(err);
      } else {
        resolve(conteudo);
      }
    });
  });

  // reste return está presente somente para cumprir a saída de Promise<string>
  return resultado;
}

export function escreveArquivo(texto: string): Promise<void> {
  let resultado = new Promise<void>((resolve, reject) => {
    writeFile(ARQUIVO_DE_FILA, texto, "utf8", function (err) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });

  return resultado;
}

export function escreveNaFila(texto: string): Promise<void> {
  return leArquivo()
    .then((textoAtual) => {
      const novoTexto = textoAtual ? `${textoAtual}\n${texto}` : texto;

      console.log("texto encontrado anteriormente no arquivo", textoAtual);

      return escreveArquivo(novoTexto);
    })
    .then(() => console.log("texto escrito no arquivo"))
    .catch(console.log);
}

export function consumirDaFila(): Promise<string | void> {
  return leArquivo()
    .then((textoAtual) => {
      const [linhaConsumida, ...linhas] = textoAtual.split("\n");

      console.log("texto encontrado anteriormente no arquivo", textoAtual);
      console.log("======== linha consumida", linhaConsumida);

      return escreveArquivo(linhas.join("\n"));
    })
    .then(() => console.log("texto escrito no arquivo"))
    .catch(console.log);
}
