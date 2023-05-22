import s from "./index.module.scss"
function SearchInput({onChange,title}) {
    return ( 
        <input onChange={(e)=>onChange(e.target.value)} title={title} type="text" className={s.input} placeholder="Tìm kiếm" spellCheck={false}/>
     );
}

export default SearchInput;