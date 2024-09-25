import React, { useContext, useMemo, useState } from 'react'
import TodoItem from './TodoItem';
import { TodoStateContext } from '../App';

const TodoList = () => {
  const {todo} = useContext(TodoStateContext);

  const analyzeTodo = useMemo(()=>{
    const totalCount = todo.length;
    const doneCount = todo.filter((it)=> it.isDone).length;
    const notDoneCount = totalCount - doneCount;
    return {
      totalCount,
      doneCount,
      notDoneCount,
    };
  }, [todo]);
  const { totalCount, doneCount, notDoneCount } = analyzeTodo;

  const [search, setSearch] = useState('');
  const onChangeSearch = (e)=>{
    setSearch(e.target.value);
  };

  const getSearchResult = ()=>{
    return search === ""
      ? todo
      : todo.filter((it)=> 
        it.content.toLowerCase().includes(search.toLowerCase()));
  }

  return (
    <div className='TodoList'>
      <h4>Todo List 📑</h4>
      <div className='analyzeTodo'>
        <p>✨총개수 : {totalCount}</p>
        <p>😊완료된 일 : {doneCount}</p>
        <p>😂아직 완료되지 못한 일 : {notDoneCount}</p>
      </div>
      <input value={search} onChange={onChangeSearch} 
      className='searchbar' placeholder='검색어를 입력하세요.'/>
      <div className='list_wrapper'>
        {getSearchResult().map((it)=>(
          <TodoItem key={it.id} {...it} />
        ))}
      </div>
    </div>
  );
};

export default TodoList;