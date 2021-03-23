var eventBus = new Vue()

Vue.component('todo',{

    props:{
        type: Array,
        required: false
    },
    template:`

        <div>
        <addToTodo></addToTodo>

    <div class="list"> 
    <h1>TODO</h1>

        <ul>
            <li v-if="!list.todoList.length" > No tienes nada por haceer</li>
            <li v-else v-for="(value, todoList) in list.todoList">{{ value }} <button v-on:click="moveToDoing(value)">Move to Doing </button></li>
            
        </ul>
        </div>

        <div class="list">
        <h1>DOING</h1>

        <ul>
            <li v-if="!list.doingList.length" > No estás haciendo nada ahora mismo </li>
            <li v-else v-for="(value, doingList) in list.doingList">{{ value }}  <button v-on:click="moveToDone(value)"> Move to Done </button> </li>
            
        </ul>
        </div>

        <div class="list">
        <h1>DONE</h1>

        <ul>
            <li v-if="!list.doneList.length" > Aún no has terminado nada, ánimos </li>
            <li v-for="(value, doneList) in list.doneList">{{ value }}</li>
            
        </ul>
        </div>
                        
        </div>

    `,
    data(){

        return{

        
        list: {

            todoList: [],
            doingList: [],
            doneList: []
            
            }
            
        }
    },

    methods: {
        moveToDoing: function(task){

            this.list.doingList.push(task);

            for( var i = 0; i < this.list.todoList.length ; i++){     
                if (this.list.todoList[i] == task) {             
                    this.list.todoList.splice(i, 1); 
                }            
            }

        },
        moveToDone: function(task){

            this.list.doneList.push(task);

            for( var i = 0; i < this.list.doingList.length ; i++){     
                if (this.list.doingList[i] == task) {             
                    this.list.doingList.splice(i, 1); 
                }            
            }

        }
    },

    mounted() {
        eventBus.$on('task-submitted', newTask=>{
            this.list.todoList.push(newTask);
        })
        

    },
})

Vue.component('addToTodo',{

        props:{
            type: String,
            required: false
        },
        template: `

 <div>
        <form @submit.prevent="onSubmit">  
        
        <label for="task" >New Task:</label>
        <input id="task" v-model="task" placeholder="New Task" required>
        <input type="submit" value="Add Task">  
        </form>
</div>
        
        `,
        data(){

            return{

                task: null,
                erros:[]

            }

        },

        methods:{
            onSubmit(){
                if(this.task){

                    newTask = this.task;
                    eventBus.$emit('task-submitted', newTask)
                    this.task = null;

                }else{

                    if(!this.task) this.errors.push("Task required.")
                }
            },
           
        }
})

var app = new Vue({

    el:'#app',
})