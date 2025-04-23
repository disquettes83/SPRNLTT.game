// Funzioni di utilità per il calcolo delle combinazioni

/**
 * Calcola il fattoriale di un numero
 * @param n - Il numero di cui calcolare il fattoriale
 * @returns Il fattoriale di n
 */
export function factorial(n: number): number {
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
  }
  
  /**
   * Calcola il coefficiente binomiale C(n,k) - numero di combinazioni di n elementi presi k alla volta
   * @param n - Numero totale di elementi
   * @param k - Dimensione della combinazione
   * @returns Il numero di combinazioni possibili
   */
  export function binomialCoefficient(n: number, k: number): number {
    if (k < 0 || k > n) return 0;
    if (k === 0 || k === n) return 1;
    
    // Utilizziamo una formula più efficiente per numeri grandi
    let result = 1;
    for (let i = 1; i <= k; i++) {
      result *= (n - (k - i));
      result /= i;
    }
    
    return Math.round(result);
  }
  
  /**
   * Calcola il numero di combinazioni possibili per un certo numero di elementi selezionati
   * @param numSelectedNumbers - Numero di elementi selezionati
   * @returns Il numero di combinazioni di 6 numeri che si possono formare
   */
  export function calculateCombinations(numSelectedNumbers: number): number {
    // Calcola C(n,6) - combinazioni di n elementi presi 6 alla volta
    if (numSelectedNumbers < 6) return 0;
    if (numSelectedNumbers === 6) return 1;
    
    return binomialCoefficient(numSelectedNumbers, 6);
  }
  
  /**
   * Genera tutte le possibili combinazioni di k elementi da un array
   * @param array - Array di elementi
   * @param k - Dimensione di ogni combinazione
   * @returns Array di tutte le possibili combinazioni
   */
  export function generateAllCombinations<T>(array: T[], k: number): T[][] {
    const result: T[][] = [];
    
    function backtrack(start: number, current: T[]) {
      if (current.length === k) {
        result.push([...current]);
        return;
      }
      
      for (let i = start; i < array.length; i++) {
        current.push(array[i]);
        backtrack(i + 1, current);
        current.pop();
      }
    }
    
    backtrack(0, []);
    return result;
  }
  
  /**
   * Dati due array di numeri, determina quanti elementi del primo sono contenuti nel secondo
   * @param combinationNumbers - Array di numeri da controllare
   * @param drawnNumbers - Array di numeri estratti
   * @returns Il numero di elementi in comune
   */
  export function countMatches(combinationNumbers: number[], drawnNumbers: number[]): number {
    return combinationNumbers.filter(num => drawnNumbers.includes(num)).length;
  }
  
  // Tabella delle combinazioni e costi
  export const COMBINATIONS_TABLE = [
    { numeri: 6, combinazioni: 1, costo: 1.00 },
    { numeri: 7, combinazioni: 7, costo: 7.00 },
    { numeri: 8, combinazioni: 28, costo: 28.00 },
    { numeri: 9, combinazioni: 84, costo: 84.00 },
    { numeri: 10, combinazioni: 210, costo: 210.00 },
    { numeri: 11, combinazioni: 462, costo: 462.00 },
    { numeri: 12, combinazioni: 924, costo: 924.00 },
    { numeri: 13, combinazioni: 1716, costo: 1716.00 },
    { numeri: 14, combinazioni: 3003, costo: 3003.00 },
    { numeri: 15, combinazioni: 5005, costo: 5005.00 },
    { numeri: 16, combinazioni: 8008, costo: 8008.00 },
    { numeri: 17, combinazioni: 12376, costo: 12376.00 },
    { numeri: 18, combinazioni: 18564, costo: 18564.00 },
    { numeri: 19, combinazioni: 27132, costo: 27132.00 }
  ];
  
  /**
   * Ottiene le informazioni sulle combinazioni e costo per un certo numero di selezioni
   * @param selections - Numero di selezioni
   * @returns Oggetto con informazioni sulle combinazioni e costo
   */
  export function getCombinationsInfo(selections: number): { combinations: number, cost: number } {
    const data = COMBINATIONS_TABLE.find(d => d.numeri === selections);
    if (!data) {
      return { combinations: 1, cost: 1.00 };
    }
    return {
      combinations: data.combinazioni,
      cost: data.costo
    };
  }