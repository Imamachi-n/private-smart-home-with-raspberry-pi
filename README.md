# private-smart-home-with-raspberry-pi

以下のライブラリのインポートは、Raspberry Pi上でのみインポート可能。  
MacOS上ではエラーとなるため、デバック時は注意。
```javascript
const i2c = require('i2c-bus');
```