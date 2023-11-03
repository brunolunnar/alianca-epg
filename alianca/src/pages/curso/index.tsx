import { globalStyle } from "@/styles/global";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import jwt, { JwtPayload } from "jsonwebtoken";

globalStyle();
export const Curso = () => {
  const [clear, setClear] = useState<any[]>([]);

  const router = useRouter();

  
  const handleRouter = (id: any) => {
  
      return router.push(`/curso/${id}`);

  };

  useEffect(() => {
    const token = localStorage.getItem("@TOKEN");
    const decodeToken = jwt.decode(token as string) as JwtPayload;
    fetch(`api/relations/user/${decodeToken.id}`)
      .then((response) => response.json())
      .then((data) => {
        const clearData = data.aulas;
        setClear(clearData);
        console.log(clearData)
      })
      .catch((error) => console.error("Erro ao buscar os cursos", error));
  }, []);
  return (
    <div>
      <h1>Logo</h1>
      <h1>Lista de cursos</h1>
      <ul>
        {clear.map((aula) => (
          <li key={aula.id}>
            <h3>{aula.title}</h3>
            <button onClick={() => handleRouter(aula.url)}>Acessar aula</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Curso;
