// Se define la clase LogRiego, sus getters y setters,
//Se tomo como referencia el DER del enunciado del TP


export class LogRiego{
    private _LogRiegoId: number;
    private _apertura: number; 
    private _fecha: Date;
    private _electrovalvulaId: number;

    constructor(LogRiegoId:number,apertura:number,fecha:Date,electrovalvulaId:number){
        this._LogRiegoId=LogRiegoId;
        this._apertura=apertura;
        this._fecha=fecha;
        this._electrovalvulaId=electrovalvulaId;
        
    }

    public get LogRiegoId(): number {
        return this._LogRiegoId;
    }

    public set LogRiegoId(value: number) {
        this._LogRiegoId = value;
    }

    public get apertura(): number {
        return this._apertura;
    }
    public set apertura(value: number) {
        this._apertura = value;
    }

    public get fecha(): Date {
        return this._fecha;
    }
    public set fecha(value: Date) {
        this._fecha = value;
    }
    
    public get electrovalvulaId(): number {
        return this._electrovalvulaId;
    }
    public set electrovalvulaId(value: number) {
        this._electrovalvulaId = value;
    }
}