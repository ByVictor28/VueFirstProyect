<template>
  <h2>{{customTitle}}</h2>
  <p >{{counter}} <sup>2</sup> = {{counter*counter}}</p>
  <p data-testid="counter">{{counter}}</p>
  <hr>
  
  <div>
      <button @click="increase">+1</button>
      <button @click="decrease">-1</button> 
  </div>
</template>

<script>
export default {
    props: {
        title:String,
        start:{
            type:Number,
            required:true,
            default:1,
            validator(value){
                return value > 100
            }
        },
    },
    
    name:"Counter",
    data(){
        return {
            counter:this.start
        }
    },
    methods:{
        getSquereValue(){
            return this.counter * this.counter
        },
        increase(){
            this.counter = this.counter+1
        },
        decrease(){
            this.counter = this.counter-1
        }
    },
    computed:{
        squareCounter(){
            return this.counter * this.counter
        },
        customTitle(){
            return this.title || "Counter"
        }
    }
}
</script>

<style>
    button{
        background: #64bb87;
        margin: 0 5px;
        border-radius: 5px;
        color: white;
        padding: 5px 16px;
    }
    button:hover{
        background: #5aa67b;
        cursor: pointer;
    }
</style>