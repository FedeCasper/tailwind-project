const {createApp} = Vue;

const app = createApp({
     data(){
          return{
               mensaje: "Conociendo los ciclos de vida de Vue"
          }
     },
     beforeCreate(){
          console.log("Before Create");
     },
     // Todavía no accede al DOM, se crean los métodos y eventos.
     created(){
          console.log("Created");
     },
     // Se ejecuta antes de insertar el DOM
     beforeMount(){
          console.log("Before Mount");
     },
     // Se ejecuta al insertar el DOM
     mounted(){
          console.log("Mounted");
     },
     // Se ejecuta al detectar un cambio
     beforeUpdate(){
          console.log("Before Update");
     },
     // Se ejecuta al realizar un cambio
     updated(){
          console.log("Updated");
     },
     // Se ejecuta antes de desmontar la app
     beforeUnmount(){
          console.log("Before Unmount");
     },
     // Se ejecuta cuando se desmonta la app
     unmounted(){
          console.log("Unmounted");
     },

     methods:{
          desmontar(){
               app.unmount('#app')
          }
     }
})

app.mount('#app')
