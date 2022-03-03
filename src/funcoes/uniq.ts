/**
 * Retorna um array com todos os elementos únicos.
 *
 * > Importante: Os parâmetros não devem ter sua estrutura alterada.
 *
 * @param items array com itens de qualquer tipo.
 *
 * @returns somente os itens definidos.
 */
export const uniq = <T>(args: T[]): T[] => {
  return args.filter((argsItem, index, arr) => {
    const slice = arr.slice(0, index);

    return slice.every((sliceItem) => argsItem !== sliceItem);
  });
};
