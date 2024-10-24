// import logo from './logo.svg';
// import './App.css';
// import { useState } from 'react';

// function Create(props) {
//   return <article>
//     <h1>Create</h1>
//     <form onSubmit={event=> {
//       event.preventDefault();
//       const title = event.target.title.value;
//       const body = event.target.body.value;
//       props.onCreate(title, body);
//     }}>
//       <p><input type="text" name="title" placeholder="title" /></p>
//       <p><textarea name="body" placeholder="body"></textarea></p>
//       <p><input type="submit" value="Create"></input></p>
//     </form>
//   </article>
// }

// function Header(props) {
//   console.log(props);
//   return (
//     <header>
//       <h1>Header!!!</h1>
//     </header>
//   );
// }

// function Link(props) {
//   console.log('props:', props);
//   console.log('props.name:', props.name);

//   return (
//     <p>
//     <a
//       className="App-link"
//       href="https://reactjs.org"
//       target="_blank"
//       rel="noopener noreferrer"
//     >
//       {props.name}
//     </a>
//     </p>
//   );
// }

// function Article(props) {
//   const articlelist = []
//   const header = <h1>{props.title}</h1>;
//   const body = <p>{props.body}</p>;

//   for (let i = 0; i < props.links.length; i++) {
//     let t = props.links[i];
//     articlelist.push(<h1 key={t.title}>{t.title}</h1>);
//     articlelist.push(<p onClick={
//       function(event) {
//         event.preventDefault();
//         // alert(t.body);
//         props.onChanged(t.title);
//       }
//     } key={t.body}>{t.body}</p>);
//   }

//   return articlelist;
// }

// function App() {
//   // const _mode = useState('Welcome');
//   // const mode = _mode[0];
//   // const setMode = _mode[1];
//   const [mode, setMode] = useState('LEARN REACT');
//   const [id, setId] = useState(1);
//   const [nextId, setNextId] = useState(4);
//   var content = '';
//   var optionalTags = null;

//   if (mode === 'LEARN REACT') {
//     content = 'WELCOME REACT';
//   } else if (mode === 'Create') {
//     content = 'Create REACT';
//     optionalTags = <Create onCreate={(_title, _body)=>{
//       const newLinks = [...links];
//       newLinks.push({id: id, title: _title, body: _body});
//       setLinks(newLinks);
//       setNextId(id + 1);
//     }}> </Create>;
//   } else {
//     content = 'BYE REACT';
//   }

//   const [links, setLinks] = useState([
//       {id: 1, title: 'LEARN REACT', body: 'Learn react is blah blah', onChanged: function() { setMode('Bye'); }},
//       {id: 2, title: '리액트 배우기', body: '리액트를 배우는 것은 블라블라', onChanged: function() { setMode('Welcome'); }}
//   ])

//   return (
//     <div className="App">
//       <Header />
//       <Header />
//       <Link name={content} />
//       <Link name="LEARN REACT" />
//       <Link name="리액트 배우기" />
//       <Article links={links} onChanged={(id) => { setMode(id); }} />
//         <a href="/create" onClick={ 
//           function(event) {
//             event.preventDefault();
//             setMode('Create');
//           }
//         }> Create</a>

//       {optionalTags}

//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import logo from './logo.svg';
import './App.css';
import {useState} from 'react';

function Article(props){
  return <article>
    <h2>{props.title}</h2>
    {props.body}
  </article>
}
function Header(props){
  return <header>
    <h1><a href="/" onClick={(event)=>{
      event.preventDefault();
      props.onChangeMode();
    }}>{props.title}</a></h1>
  </header>
}
function Nav(props){
  const lis = []
  for(let i=0; i<props.topics.length; i++){
    let t = props.topics[i];
    lis.push(<li key={t.id}>
      <a id={t.id} href={'/read/'+t.id} onClick={event=>{
        event.preventDefault();
        props.onChangeMode(Number(event.target.id));
      }}>{t.title}</a>
    </li>)
  }
  return <nav>
    <ol>
      {lis}
    </ol>
  </nav>
}
function Create(props){
  return <article>
    <h2>Create</h2>
    <form onSubmit={event=>{
      event.preventDefault();
      const title = event.target.title.value;
      const body = event.target.body.value;
      props.onCreate(title, body);
    }}>
      <p><input type="text" name="title" placeholder="title"/></p>
      <p><textarea name="body" placeholder="body"></textarea></p>
      <p><input type="submit" value="Create"></input></p>
    </form>
  </article>
}
function Update(props){
  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);
  return <article>
    <h2>Update</h2>
    <form onSubmit={event=>{
      event.preventDefault();
      const title = event.target.title.value;
      const body = event.target.body.value;
      props.onUpdate(title, body);
    }}>
      <p><input type="text" name="title" placeholder="title" value={title} onChange={event=>{
        setTitle(event.target.value);
      }}/></p>
      <p><textarea name="body" placeholder="body" value={body} onChange={event=>{
        setBody(event.target.value);
      }}></textarea></p>
      <p><input type="submit" value="Update"></input></p>
    </form>
  </article>
}

function App() {
  const [mode, setMode] = useState('WELCOME');
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4);
  const [topics, setTopics] = useState([
    {id:1, title:'html', body:'html is ...'},
    {id:2, title:'css', body:'css is ...'},
    {id:3, title:'javascript', body:'javascript is ...'}
  ]);
  let content = null;
  let contextControl = null;
  if(mode === 'WELCOME'){
    content = <Article title="Welcome" body="Hello, WEB"></Article>
  } else if(mode === 'READ'){
    let title, body = null;
    for(let i=0; i<topics.length; i++){
      console.log(topics[i].id, id);
      if(topics[i].id === id){
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Article title={title} body={body}></Article>
    contextControl = <li><a href={"/update/" + id} onClick={event=>{
      event.preventDefault();
      console.log('update');
      setMode('UPDATE');
    }}>Update</a></li>
  } else if(mode === 'CREATE'){
    content = <Create onCreate={(_title, _body)=>{
      const newTopic = {id:nextId, title:_title, body:_body}
      const newTopics = [...topics]
      newTopics.push(newTopic);
      setTopics(newTopics);
      setMode('READ');
      setId(nextId);
      setNextId(nextId+1);
    }}></Create>
  } else if(mode==='UPDATE') {
    let title, body = null;
    for(let i=0; i<topics.length; i++){
      console.log(topics[i].id, id);
      if(topics[i].id === id){
        title = topics[i].title;
        body = topics[i].body;
      }
    }

    content = <Update title={title} body={body} onUpdate={event=>{

    }}></Update>
  }
  return (
    <div>
      <Header title="WEB" onChangeMode={()=>{
        setMode('WELCOME');
      }}></Header>
      <Nav topics={topics} onChangeMode={(_id)=>{
        setMode('READ');
        setId(_id);
      }}></Nav>
      {content}
      <ul>
      <li>
      <a href="/create" onClick={event=>{
        event.preventDefault();
        setMode('CREATE');
      }}>Create</a>
      </li>
        {contextControl}
      </ul>
    </div>
  );
}

export default App;
