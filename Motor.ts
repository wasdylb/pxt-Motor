
//% weight=100 color=#ed843d icon="\uf1b9" block="Motor" 
namespace Motor {

    const MOTOR_LEFT = (0x02)
    const MOTOR_RIGHT= (0x04)

    let Motor_I2C_ADDR =  8 // defaut address
    init(Motor_I2C_ADDR)  // init sensor at startup

    // read a Int8LE from reg
    function getInt8LE(reg: number): number {
        pins.i2cWriteNumber(Motor_I2C_ADDR, reg, NumberFormat.UInt8BE);
        return pins.i2cReadNumber(Motor_I2C_ADDR, NumberFormat.Int8LE);
    }

    // read a UInt8LE from reg
    function getUInt8LE(reg: number): number {
        pins.i2cWriteNumber(Motor_I2C_ADDR, reg, NumberFormat.UInt8BE);
        return pins.i2cReadNumber(Motor_I2C_ADDR, NumberFormat.UInt8LE);
    }

    // read a Int16LE from reg
    function getInt16LE(reg: number): number {
        pins.i2cWriteNumber(Motor_I2C_ADDR, reg | 0x80, NumberFormat.UInt8BE);
        return pins.i2cReadNumber(Motor_I2C_ADDR, NumberFormat.Int16LE);
    }

    // read a UInt16LE from reg
    function getUInt16LE(reg: number): number {
        pins.i2cWriteNumber(Motor_I2C_ADDR, reg | 0x80, NumberFormat.UInt8BE);
        return pins.i2cReadNumber(Motor_I2C_ADDR, NumberFormat.UInt16LE);
    }

    // write a Int8LE from reg
    function writeInt8LE(reg: number) {
        pins.i2cWriteNumber(Motor_I2C_ADDR, reg, NumberFormat.UInt8BE);
    }

    // write a UInt8BE from reg
    function writeUInt8BE(reg: number) {
        pins.i2cWriteNumber(Motor_I2C_ADDR, reg, NumberFormat.UInt8BE);
    }

    // write a Int16LE from reg
    function writeInt16LE(reg: number) {
        pins.i2cWriteNumber(Motor_I2C_ADDR, reg, NumberFormat.Int16LE);
    }

    // write a UInt16LE from reg
    function writeUInt16LE(reg: number) {
        pins.i2cWriteNumber(Motor_I2C_ADDR, reg, NumberFormat.UInt16LE);
    }

    /**
     * Init sensor
     */
    //% block="Initialize Motor  address %addr"
    //% addr.defl=8
    export function init(addr: number) {
        Motor_I2C_ADDR = addr
    }

    /**
     * Set Left Motor
     */
    //% block="Set Left Motor  Speed %lspeed"
    //% lspeed.defl=1500
    //% lspeed.min=1000 lspeed.max=2000
    export function setSpeedL(lspeed: number) {
        //set reg
        pins.i2cWriteNumber(Motor_I2C_ADDR, MOTOR_LEFT, NumberFormat.UInt8BE);
        basic.pause(10)
        //set speed
        writeInt16LE(lspeed)
        basic.pause(10)
    }

    /**
     * Set Right Motor
     */
    //% block="Set Right Motor Speed %rspeed"
    //% rspeed.defl=1500
    //% rspeed.min=1000 rspeed.max=2000
    export function setSpeedR(rspeed: number) {
        //set reg
        pins.i2cWriteNumber(Motor_I2C_ADDR, MOTOR_RIGHT, NumberFormat.UInt8BE);
        basic.pause(10)
        //set speed
        writeInt16LE(rspeed)
        basic.pause(10)
    }

    /**
     * Set speed
    */
    //% block="Set speed  left %lspeed right %rspeed"
    //% lspeed.defl=1500
    //% rspeed.defl=1500
    //% lspeed.min=1000 lspeed.max=2000
    //% rspeed.min=1000 rspeed.max=2000
    export function setSpeed(lspeed: number, rspeed: number) {
        //set reg
        pins.i2cWriteNumber(Motor_I2C_ADDR, MOTOR_LEFT, NumberFormat.UInt8BE);
        basic.pause(10)
        //set speed
        let speedbuf = pins.createBuffer(4)
        speedbuf[0] = lspeed & 0xFF
        speedbuf[1] = lspeed >> 8 & 0xFF
        speedbuf[2] = rspeed & 0xFF
        speedbuf[3] = rspeed >> 8 & 0xFF
        pins.i2cWriteBuffer(Motor_I2C_ADDR, speedbuf)
        basic.pause(10)
    }
}
