class Vector{
    #x
    #y
    constructor(x,y){
        this.#x = x
        this.#y = y
    }
    static create(x,y){
        return Object.preventExtensions( new Vector(x,y))
    }
    get x(){
        return this.#x
    }
    setX(x){
        this.#x = x
    }
    get y(){
        return this.#y
    }
     setY(y){
        this.#y = y
    }
     get len(){
        return sqrt(this.#x**2 + this.#y**2)
    }
     get angle(){
        return atan2(this.#y,this.#x)*180/PI
    }
     setAngle(ang){
         let len = this.len
         this.#x = cos(ang * PI/180) * len
         this.#y = sin(ang * PI/180) * len
    }
    setLen(len){
         let ang = this.angle
         this.#x = cos(ang) * len
         this.#y = sin(ang) * len
    }
    add(other){
        this.#x += other.#x
        this.#y += other.#y
    }
    sub(other){
        this.#x -= other.#x
        this.#y -= other.#y
    }
    mult(val){
        this.#x *= val
        this.#y *= val
    }
    div(val){
        this.#x /= val
        this.#y /= val
    }
    addTo(other){
        return Vector.create(this.#x + other.#x, this.#y + other.#y)
    }
    subFrom(other){
        return Vector.create(this.#x - other.#x, this.#y - other.#y)
    }
    multBy(scalar){
        return Vector.create(this.#x * scalar, this.#y * scalar)
    }
    divBy(scalar){
        return Vector.create(this.#x / scalar, this.#y / scalar)
    }
}