import { globalStyle } from "@/styles/global";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import jwt, { JwtPayload } from "jsonwebtoken";

globalStyle();
export const Curso = () => {
  const [clear, setClear] = useState<any[]>([]);

  const router = useRouter();

  const canAccessAula = (aula: any, curso: any[]) => {
    const aulaIndex = curso.findIndex((item) => item.id === aula.id);

    if (aulaIndex === -1) {
      return false;
    }

    if (aulaIndex === 0) {
      // A primeira aula pode sempre ser acessada.
      return true;
    }

    for (let i = 0; i < aulaIndex; i++) {
      if (curso[i].title !== `aula 0${i + 1}` || !curso[i].clear) {
        return false;
      }
    }

    return true;
  };
  const handleRouter = (id: any) => {
    const aula = clear.find((item) => item.id === id);

    if (aula && canAccessAula(aula, clear)) {
      return router.push(`/curso/${id}`);
    } else {
      alert("Por favor conclua as aulas anteriores para ter acesso a esta aula.");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("@TOKEN");
    const decodeToken = jwt.decode(token as string) as JwtPayload;
    fetch(`api/relations/user/${decodeToken.id}`)
      .then((response) => response.json())
      .then((data) => {
        const clearData = data.aulas;
        setClear(clearData);
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
            <button onClick={() => handleRouter(aula.id)}>Acessar aula</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Curso;
