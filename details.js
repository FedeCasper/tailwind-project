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
               checkedValue: [],
               showCanvas: undefined,
               favoritos: [],
               personaje: {}
          }
     },

     created(){
          const url = "https://apisimpsons.fly.dev/api/personajes?limit=650";
          fetch(url)
          .then(res => res.json())
          .then(data => {
               this.arrayPersonajes = data.docs 
               console.log(this.arrayPersonajes);
               this.correctorApi()

               const x = location.search
               const y = new URLSearchParams(x)
               console.log(y);
               const w = y.get('id')
               console.log(w);

               this.personaje = this.arrayPersonajes.find(personaje => personaje._id == w)
               console.log(this.personaje);
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
                    } else if(personaje.Nombre.includes("Spiro")) {
                         console.log(this.arrayPersonajes.indexOf(personaje));
                         personaje.Historia = "Es el propietario griego de Spiro's."
                         personaje.Nombre = "Spiro"
                         return personaje
                    } else {
                         personaje.Nombre.trim()
                         return personaje
                    }
                    
               })
          }, 
     }
} ).mount('#app')