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
               vistaCompleta: undefined,
               checkedValue: []
          }
     },

     created(){
          const url = "https://apisimpsons.fly.dev/api/personajes?limit=650";
          fetch(url)
          .then(res => res.json())
          .then(data => {
               this.arrayPersonajes = data.docs 
               const sexo = [...new Set(this.arrayPersonajes.map(personaje => personaje.Genero))]
               this.correctorApi()
               console.log(this.arrayPersonajes);
               this.estados = [...new Set(this.arrayPersonajes.map(personaje => personaje.Estado))]
               this.randomCharacterObject = this.randomCharacter()
               this.arrayOfSix = this.randomSixCharacter()
               this.deadArray = this.deadCharacters()
               this.soloSimpsons()
               this.vistaCompleta = false
               this.filtradosPorNombre = this.arrayPersonajes

          })
          .catch(error => console.error(error))
     },

     methods:{
          correctorApi(){
               this.arrayPersonajes = this.arrayPersonajes.map(personaje => {
                    if(personaje.Estado != "Vivo" && personaje.Estado != "Fallecido" && personaje.Estado != "Divino" && personaje.Estado != "Robot" && personaje.Estado != "Robots" && personaje.Estado != "Ficticio" && personaje.Estado != "Estatua"){
                         personaje.Estado = "Vivo"
                         return personaje
                    }  else if (personaje.Estado == "Divino"){
                         personaje.Estado = "Inmortal"
                         return personaje
                    } else if(personaje.Estado == "Robot" || personaje.Estado == "Robots" || personaje.Estado == "Estatua"){
                         personaje.Estado = "No vivos"
                         return personaje
                    } else {
                         return personaje
                    }
                    
               })
          }, 
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
               this.filtradosPorNombre = this.arrayPersonajes.filter(personaje => this.checkedValue.includes(personaje.Estado))
               if(this.filtradosPorNombre.length){
                    this.filtradosPorNombre = this.filtradosPorNombre.filter(personajes => personajes.Nombre.includes(this.nombreIngresado))
                    console.log(this.filtradosPorNombre);
               } 

          }
     }

} ).mount('#app')