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
               arrayOfSix: [],
               deadArray: [],
               estados: [],
               familia: [],
               vistaCompleta: undefined
          }
     },

     created(){
          const url = "https://apisimpsons.fly.dev/api/personajes?limit=650";
          fetch(url)
          .then(res => res.json())
          .then(data => {
               this.arrayPersonajes = data.docs 
               const sexo = [...new Set(this.arrayPersonajes.map(personaje => personaje.Genero))]
               this.estados = [...new Set(this.arrayPersonajes.map(personaje => personaje.Estado))]
               this.randomCharacterObject = this.randomCharacter()
               this.arrayOfSix = this.randomSixCharacter()
               this.deadArray = this.deadCharacters()
               this.soloSimpsons()
               this.vistaCompleta = false
          })
          .catch(error => console.error(error))
     },

     methods:{
          randomCharacter(){
               let randomNumber = Math.round(Math.random()*650)
               return this.arrayPersonajes[randomNumber]
          },
          randomSixCharacter(){
               let auxiliarArray = []
               for(let i = 1 ; i < 9 ; i++){
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
          },
          soloSimpsons(){
               let familia = ["Homero Simpson", "Marge Simpson", "Bart Simpson", "Lisa Simpson", "Maggie Simpson"]
               this.familia = (this.arrayPersonajes.filter(personaje => personaje.Nombre.includes("Simpson"))).filter(personaje => familia.includes(personaje.Nombre))
               console.log(this.familia);
          }
     }, 

     computed:{
          filtrarPorInputText(){
               this.filtradosPorNombre = this.arrayPersonajes.filter(personajes => personajes.Nombre.includes(this.nombreIngresado))
               console.log(this.filtradosPorNombre);
          }
     }

} ).mount('#app')