import React,{useState,useEffect} from 'react';
import Header from './components/Header'
import backgroundimage from './Assets/background.jpg'
import api from './services/api'
import './App.css';


function App(){
    const [projs,setProjs] = useState([]);

    useEffect(()=>{
        api.get('projects').then(response => {
            setProjs(response.data);
        })
    },[]);

    async function handlerAddP(){
        //setProjs([...projs,`Novo projeto ${Date.now()}`]);
        const response = await api.post('projects',{
            title:`Novo projeto ${Date.now()}`,
            owner:"me",
        });

        const project = response.data;
        setProjs([...projs,project])
    }
    return (
        <>
            <Header t='test'/>
            <ul>
                {projs.map(p => <li key={p.id}>{p.title}</li>)}
            </ul>
            <button type="button" onClick={handlerAddP}>Add</button>
        </>
    );
}

export default App;