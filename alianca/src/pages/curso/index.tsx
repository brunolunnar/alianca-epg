import { globalStyle } from "@/styles/global";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

globalStyle();
export const Curso = () => {
  const [curso, setCurso] = useState<any[]>([]);
  const [aula, setAula] = useState<any[]>([]);
  const router = useRouter()
  useEffect(() => {
    fetch("api/curso/list")
      .then((response) => response.json())
      .then((data) => {
        const cursoData = data.data;
        setCurso(cursoData);
      })
      .catch((error) => console.error("Erro ao buscar os cursos", error));
  });
  const handleRouter = (id:any)=>{
    return router.push(`/curso/${id}`)
  }


  return (
    <div>
      <h1>Logo</h1>
      <h1>Lista de cursos</h1>
      <ul>
      {curso.map((aula)=>(
        <li key={aula.id}>
            <h3>{aula.title}</h3>
            <button onClick={()=>handleRouter(aula.id)}>Acessar aula</button>
        </li>
      ))}
      </ul>
    </div>
  );
};
export default Curso