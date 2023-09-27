const {createApp} = Vue

createApp( {

     // Vamos a tener las propiedades reactivas
     data(){
          return{
               mensaje: "Hola Bienvenidos",
               arrayPersonajes: [],
               nombreIngresado: "",
               filtradosPorNombre: [],
               generos: [],
               randomCharacterObject: {},
               arrayOfFour: [],
               deadArray: [],
               estados: []
          }
     },

     created(){
          const url = "https://apisimpsons.fly.dev/api/personajes?limit=650";
          fetch(url)
          .then(res => res.json())
          .then(data => {
               console.log(data);
               this.arrayPersonajes = data.docs 
               console.log(this.arrayPersonajes)
               const sexo = [...new Set(this.arrayPersonajes.map(personaje => personaje.Genero))]
               console.log(sexo);
               this.estados = [...new Set(this.arrayPersonajes.map(personaje => personaje.Estado))]
               console.log(this.estados);
               this.randomCharacterObject = this.randomCharacter()
               console.log(this.randomCharacterObject);
               this.arrayOfFour = this.randomFourCharacter()
               this.deadArray = this.deadCharacters()
               console.log(this.deadArray);
          })
          .catch(error => console.error(error))
     },

     methods:{
          randomCharacter(){
               let randomNumber = Math.round(Math.random()*650)
               return this.arrayPersonajes[randomNumber]
          },
          randomFourCharacter(){
               let auxiliarArray = []
               for(let i = 1 ; i < 5 ; i++){
                    let randomNumber = Math.round(Math.random()*650)
                    auxiliarArray.push(this.arrayPersonajes[randomNumber])
               }
               return auxiliarArray
          },
          deadCharacters(){
               let deadArray = this.arrayPersonajes.filter(personaje => personaje.Estado == "Fallecido")
               console.log(deadArray);
               let auxiliarArray = []
               for(let i = 1 ; i < 4 ; i++){
                    let randomNumber = Math.round(Math.random()*56)
                    if(!auxiliarArray.includes(deadArray[randomNumber])){
                         auxiliarArray.push(deadArray[randomNumber])
                    } else {
                         auxiliarArray.push(deadArray[randomNumber + 1])
                    }

               }
               return auxiliarArray
          }
     }, 

     computed:{
          filtrarPorInputText(){
               this.filtradosPorNombre = this.arrayPersonajes.filter(personajes => personajes.Nombre.includes(this.nombreIngresado))
               console.log(this.filtradosPorNombre);
          }
     }

} ).mount('#app')