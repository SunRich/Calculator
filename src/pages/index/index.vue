<template>
  <div class="container">
    <div id="calculator">
      <input id="screen" type="text" v-model="message"/>
      <div class="buttons">
        <div v-on:click="clear" class="button">{{ message == 0 ? 'AC' : 'C' }}</div>
        <div v-on:click="inverse" class="button">+/-</div>
        <div v-on:click="percentage" class="button">%</div>
        <div v-on:click="operator('divide')" class="button">/</div>
        <div v-on:click="input('7')" class="button">7</div>
        <div v-on:click="input('8')" class="button">8</div>
        <div v-on:click="input('9')" class="button">9</div>
        <div v-on:click="operator('multiply')" class="button">*</div>
        <div v-on:click="input('4')" class="button">4</div>
        <div v-on:click="input('5')" class="button">5</div>
        <div v-on:click="input('6')" class="button">6</div>
        <div v-on:click="operator('subtract')" class="button">-</div>
        <div v-on:click="input('1')" class="button">1</div>
        <div v-on:click="input('2')" class="button">2</div>
        <div v-on:click="input('3')" class="button">3</div>
        <div v-on:click="operator('add')" class="button">+</div>
        <div id="zero" v-on:click="input('0')" class="button">0</div>
        <div v-on:click="point()" class="button">.</div>
        <div v-on:click="equal" class="button">=</div>
      </div>
    </div>
  </div>
</template>

<script>


  export default {
    data() {
      return {
        a: '',
        b: '',
        message: '0',
        isactive: false,
        active: '',
        cal: ''
      }
    },

    methods: {
      calc(a, b, type) {//加减乘除
        /*let r,
         da = this.decNum(a),
         db = decNum(b),
         dsum = da + db,
         dmin = Math.min(da, db),
         dmax = Math.max(da, db);
       dsum += dmax - dmin;
       dsum = Math.pow(10, dsum);
       dmax = Math.pow(10, dmax);
       a = this.int(a);
       b = this.int(b);
       if (da > db) {
         b *= Math.pow(10, da - db);
       } else {
         a *= Math.pow(10, db - da);
       }
       switch (type) {
         case "add":
           r = (a + b) / dmax;
           break;
         case "subtract":
           r = (a - b) / dmax;
           break;
         case "multiply":
           r = (a * b) / dsum;
           break;
         case "divide":
           r = a / b;
           break;
       }
       return r;*/
        a = parseInt(a);
        b = parseInt(b);
        let r = 0;
        switch (type) {
          case "add":
            r = a + b;
            break;
          case "subtract":
            r = a - b;
            break;
          case "multiply":
            r = a * b;
            break;
          case "divide":
            r = a / b;
            break;
        }
        return r;
      },
      point() {
        if (this.message.includes('.')) {
          return
        }
        this.message += '.'
      },
      int(a) {
        return parseInt(a.toString().replace(".", ""));
      },
      decNum(a) {
        let r = 0;
        a = a.toString();
        if (a.indexOf(".") !== -1) r = a.split(".")[1].length;
        return r;
      },

      input: function (num) {
        console.log(num);
        if (this.isactive) {
          this.message = num;
          this.b = this.message;
        } else {
          if (this.message === '0') {
            if (num === '0') {
              return
            } else {
              this.message = num;
            }
          } else {
            this.message += num;
          }
          this.b = this.message;
        }
        this.isactive = false;

      },
      operator: function (opt) {
        console.log(this.a);
        console.log(this.b);
        console.log(this.active);
        if (!this.isactive) {
          if (this.active) {
            this.message = this.calc(this.a, this.b, this.active);
            this.b = '';
          }
        }
        this.active = opt;
        this.a = this.message;
        this.isactive = true;

      },

      clear: function () {
        this.message = '0';
        this.a = '';
        this.b = '';
        this.isactive = false;
        this.active = '';
      },

      percentage: function () {
        this.equation = '';
        this.message = (this.message / 100).toString();
        this.value = this.message;
      },


      inverse: function () {
        if (this.message === 0)
          return false;
        this.equation = '';
        if (this.message[0] === '-')
          this.message = this.message.substr(1);
        else
          this.message = '-' + this.message;
        this.value = this.message;
      },
      equal: function () {
        if (this.active) {
          this.message = this.calc(this.a, this.b, this.active);
          this.a = this.message;
          this.b = '';
          this.active='';
          this.isactive = true;
          return
        } else {
          return
        }

      }
    }

    ,
    mounted() {


    },
    created() {

    }
  }
</script>

<style lang="scss" scoped>
  .container {
    height: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
    #calculator {
      display: flex;
      flex-direction: column;
      width: 200px;
      background-color: #1d1f20;
      #screen {
        padding-top: 45px;
        font-size: 45px;
        text-align: right;
        border: none;
        color: #FFFFFF;
        background-color: #1d1f20;
        border-radius: 0;
      }
      .buttons {
        user-select: none;
        cursor: pointer;
        font-size: 15px;
        display: flex;
        flex-wrap: wrap;
        background-color: #d7d4f0;
        .button {
          width: 25%;
          padding: 15px 0;
          text-align: center;
          border: #343436 1px solid;
          box-sizing: border-box;
          transition: box-shadow 0.3s;
        }
        .button:nth-child(4n), .button:last-child {
          background-color: #d0782a;
        }
        .button:hover {
          filter: opacity(0.8);
        }
        .button:active {
          box-shadow: 2px 2px 10px #666 inset;
        }
        #zero {
          text-align: left;
          padding-left: 2px;
          flex-grow: 2;
        }
      }

    }
  }
</style>
