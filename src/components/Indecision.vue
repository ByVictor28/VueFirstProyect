<template>
  <img :src="image" alt="background meme">
  
  <div class="bg-dark"></div>

  <div class="container">
    <input type="text" placeholder="Ask me something" v-model="question">
    <p>Remember finish your question with a (?)</p>

    <div v-if="isValidQuestion">
      <h2>{{question}}</h2>
      <h1>{{answer}}</h1>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      question:null,
      answer:null,
      image:"https://via.placeholder.com/250",
      isValidQuestion:false
    }
  },
  methods:{
    async getAnswer(){
      try{
          
        this.answer = "Thinking ..."
        const {answer,image} = await fetch("https://yesno.wtf/api").then(res => res.json() )

        this.answer = answer
        this.image = image
      }catch (e){
        this.answer="Error"
        this.image=null
      }
    }
  },
  watch:{
    
    question(val,oldVal){
      this.isValidQuestion=false
      console.log(val)
      if(!val.includes("?")) return
      this.isValidQuestion=true
      this.getAnswer()
    }
  }

}
</script>

<style scoped>

    img, .bg-dark {
        height: 100vh;
        left: 0px;
        max-height: 100%;
        max-width: 100%;
        position: fixed;
        top: 0px;
        width: 100vw;
    }

    .bg-dark {
        background-color: rgba(0, 0, 0, 0.4);
    }

    .container {
        position: relative;
        z-index: 99;
    }
    
    input {
        width: 250px;
        padding: 10px 15px;
        border-radius: 5px;
        border: none;
    }
    input:focus {
        outline: none;
    }

    p {
        color: white;
        font-size: 20px;
        margin-top: 0px;
    }

    h1, h2 {
        color: white;
    }
    
    h2 {
        margin-top: 150px;
    }

</style>