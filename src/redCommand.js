const i2c = require('i2c-bus');
const fs = require("fs");

// ADRSIRのI2Cアドレス
const ADDR = 0x52

// コマンド群
const R1_MEMO_NO_WRITE = 0x15
const R2_DATA_NUM_READ = 0x25
const R3_DATA_READ = 0x35
const W2_DATA_NUM_WRITE = 0x29
const W3_DATA_WRITE = 0x39
const T1_TRANS_START = 0x59

const redCmd = (filepath) => {
  let ir_str_data = fs.readFileSync(filepath, 'utf-8')

  let ir_data = []
  for (let i = 0; i < ir_str_data.length; i += 2) {
    ir_data.push(parseInt(ir_str_data.substring(i, i + 2), 16))
  }

  const data_length = ir_data.length
  let senddata = [data_length >> 8, data_length & 0xff]
  let writeBuf = new Buffer.alloc(2)
  writeBuf.fill(senddata[0], 0, 1)
  writeBuf.fill(senddata[1], 1, 2)

  const i2c1 = i2c.openSync(1)
  i2c1.writeI2cBlockSync(ADDR, W2_DATA_NUM_WRITE, writeBuf.length, writeBuf)

  for (let i = 0; i < ir_data.length; i += 2) {
    writeBuf = new Buffer.alloc(2)
    writeBuf.fill(ir_data[i], 0, 1)
    writeBuf.fill(ir_data[i + 1], 1, 2)
    i2c1.writeI2cBlockSync(ADDR, W3_DATA_WRITE, writeBuf.length, writeBuf)
  }

  i2c1.writeI2cBlockSync(ADDR, T1_TRANS_START, 1, new Buffer.alloc(1))
}

module.exports = {
  redCmd
};