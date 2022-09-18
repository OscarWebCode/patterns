interface ShippingInterface {
    calculate(): string;
    setStrategy(company: CompanyStrategyInterface): void;
}

interface CompanyStrategyInterface {
    calculate(): string;
}

class DefaultStrategy implements CompanyStrategyInterface {
    constructor() { }
    calculate(): string {
        return '';
    }
}

type UPSPackageType = {
    from: number;
    to: number;
    weight: number;
}

class UPSStrategy implements CompanyStrategyInterface {
    constructor(public data: UPSPackageType) { }
    calculate(): string {
        return `$${(this.data.from - this.data.to) * this.data.weight}`;
    }
}

type FedexPackageType = {
    userId: number;
}

class FedexStrategy implements CompanyStrategyInterface {
    constructor(public data: FedexPackageType) { }
    calculate(): string {
        return `$${this._sendRequest(this.data.userId)}`;
    }
    _sendRequest(userId: number): number {
        return Number(userId.toString().substring(0, 3));
    }
}

class Shipping implements ShippingInterface {
    private _company: CompanyStrategyInterface = new DefaultStrategy();
    constructor() {
    }
    setStrategy(company: CompanyStrategyInterface): void {
        this._company = company;
    }
    calculate() {
        return this._company.calculate();
    }
}

export class ShippingExample {
    private _shipping: Shipping = new Shipping();
    private _calculationsList: string[] = [];
    constructor() {
        this._calculationsList.push(this._shipping.calculate());
        const ups: UPSStrategy = new UPSStrategy({ from: 10, to: 1, weight: 2 });
        this._shipping.setStrategy(ups);
        this._calculationsList.push(this._shipping.calculate());
        const fedex: FedexStrategy = new FedexStrategy({ userId: 293111 });
        this._shipping.setStrategy(fedex);
        this._calculationsList.push(this._shipping.calculate());
        console.log(this._calculationsList);
    }
}

