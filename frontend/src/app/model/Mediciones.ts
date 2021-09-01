//* / Se define la clase Mediciones, sus getters y setters,
//Se tomó como referencia el DER del enunciado del TP
// si bien en el der dice que valor es varchar aca le asigné number */

export class Mediciones{
    private _medicionesId: number;
    private _fecha: Date;
    private _valor: number;
    private _dispositivoId: number;

    constructor(medicionesId,fecha,valor,dispositivoId){
        this._medicionesId = medicionesId;
        this.fecha = fecha;
        this._valor = valor;
        this._dispositivoId = dispositivoId;
    }

    public get medicionesId(): number {
        return this._medicionesId;
    }
    public set medicionesId(value: number) {
        this._medicionesId = value;
    }

    public get fecha(): Date {
        return this._fecha;
    }
    public set fecha(value: Date) {
        this._fecha = value;
    }

    public get valor(): number {
        return this._valor;
    }
    public set valor(value: number) {
        this._valor = value;
    }
    
    public get dispositivoId(): number {
        return this._dispositivoId;
    }
    public set dispositivoId(value: number) {
        this._dispositivoId = value;
    }
}
