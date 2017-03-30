<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button v-on:click="tenWa">抽十张蛙头</button>
    <button v-on:click="oneWa">抽蛙头</button><br/><br/><br/>
    <img  v-for="item in items" v-bind:class='className' v-bind:src="item.url" alt=""/>
  </div>
</template>

<script>
import fetch from 'isomorphic-fetch'
let FLAG = true
function getFgo (self, size) {
  setTimeout(function () {
    fetch('http://localhost:3000/get-fgo', {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(function (response) {
      FLAG = true
      return response.json()
    }).then(function (json) {
      if (!json.success) {
        console.log(json.error)
      } else {
        if (size === 1) {
          self.items = [
            {
              url: json.resDate.img[0]
            }
          ]
          self.iteme
        } else {
          self.items.map((item, index) => {
            item.url = json.resDate.img[index]
          })
        }
        console.log(self.items)
        self.className = 'cardWidth'
      }
    }).catch(function (err) {
      console.log(err)
    })
  }, 2000)
}
export default {
  name: 'hello',
  data () {
    return {
      msg: '立刻抽哇头',
      items: [],
      className: 'cardWidth'
    }
  },
  methods: {
    oneWa: function () {
      if (!FLAG) return false
      FLAG = false
      let self = this
      self.className = 'cardWidth card'
      self.items = [
        {
          url: 'http://localhost:3000/assets/lancer.png'
        }
      ]
      getFgo(self, 1)
    },
    tenWa: function () {
      if (!FLAG) return false
      FLAG = false
      let self = this
      self.className = 'cardWidth card'
      self.items = []
      for (let n = 0; n < 10; n++) {
        self.items[n] = {url: 'http://localhost:3000/assets/lancer.png'}
      }
      getFgo(self, 10)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
.cardWidth { 
  width: 130px;
  height: 130px;
}
.card {
  animation: myfirst 6s;
}
@keyframes myfirst
{
0%   {transform: rotateY(0deg)}
25%  {transform: rotateY(90deg);}
50%  {transform: rotateY(180deg);}
100% {transform: rotateY(360deg);}
}
</style>
