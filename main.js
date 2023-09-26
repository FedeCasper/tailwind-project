

const {createApp} = Vue

createApp( {

     // Vamos a tener las propiedades reactivas
     data(){
          return{
               mensaje: "Hola Bienvenidos",
               arrayPersonajes: [],
               nombreIngresado: "",
               filtradosPorNombre: [],
               generos: []
          }
     },

     beforeCreate(){
          const url = "https://apisimpsons.fly.dev/api/personajes?limit=25&page=2";
          fetch(url)
          .then(res => res.json())
          .then(data => {
               console.log(data);
               this.arrayPersonajes = data.docs 
               console.log(this.arrayPersonajes)
               this.generos = [...new Set(this.arrayPersonajes.map(personaje => personaje.Genero))]
          })
          .catch(error => console.error(error))
     },

     created(){


     },

     methods:{

     }, 

     computed:{
          filtrarPorInputText(){
               this.filtradosPorNombre = this.arrayPersonajes.filter(personajes => personajes.Nombre.includes(this.nombreIngresado))
               console.log(this.filtradosPorNombre);
          }
     }

} ).mount('#app')