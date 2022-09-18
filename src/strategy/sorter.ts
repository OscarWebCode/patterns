interface SortStrategy {
    sort(input: number[]): number[];
}

class Sorter {
    private _strategy: SortStrategy = new MediumInsertationSortStrategy();
    setStrategy(strategy: SortStrategy) {
        console.log(strategy);
        this._strategy = strategy;
    }
    sort(input: number[]): number[] {
        return this._strategy.sort(input);
    }

}

class SlowBubbleSortStrategy implements SortStrategy {
    sort(input: number[]): number[] {
        for (let i = 0; i < input.length; i++) {
            for (let j = i + 1; j < input.length; j++) {
                if (input[i] > input[j]) {
                    const tmp = input[i];
                    input[i] = input[j];
                    input[j] = tmp;
                }
            }
        }
        return input;
    }
}

class MediumInsertationSortStrategy implements SortStrategy {
    sort(input: number[]) {
        for (let i = 0; i < input.length - 1; i++) {
            let k = i + 1;
            const nxtVal = input[k];
            while (input[k - 1] > nxtVal) {
                input[k] = input[k - 1];
                k--;
                if (k == 0)
                    break;
            }
            input[k] = nxtVal;
        }
        return input;
    }
}

class FastQuickSortStrategy implements SortStrategy {

    sort(input: number[]): number[] {
        this._sort(input, 0, input.length - 1);
        return input;
    }

    private _sort(input: number[], startIndx: number, endIndx: number) {
        if (startIndx >= endIndx)
            return;
        const pavitVal = input[endIndx];
        while (startIndx <= endIndx) {
            while (input[startIndx] < pavitVal)
                startIndx++;
            while (input[endIndx] > pavitVal)
                endIndx--;
            if (startIndx <= endIndx) {
                const tmp = input[startIndx];
                input[startIndx] = input[endIndx];
                input[endIndx] = tmp;
                startIndx++;
                endIndx--;
            }
        }
    }

}

export class SorterExample {
    private _sorter = new Sorter();
    constructor() {
        const input: number[] = Array.from({ length: 100000 }, () => Math.floor(Math.random() * 40));

        this._sorter.setStrategy(new SlowBubbleSortStrategy());
        this._sort(input);

        this._sorter.setStrategy(new MediumInsertationSortStrategy());
        this._sort(input);

        this._sorter.setStrategy(new FastQuickSortStrategy());
        this._sort(input);
    }

    private _sort(input: number[]): void {
        console.time('StrategyTimer');
        this._sorter.sort(input);
        console.timeEnd('StrategyTimer');
    }
}