import { globalStyle } from "@/styles/global";
import Logo from "@/assets/img/logo.png";
import Image from "next/image";
import { LeadIdContainer } from "@/styles/pages/Leads/LeadId";
import { useRouter } from "next/router";
import {
  JSXElementConstructor,
  Key,
  PromiseLikeOfReactNode,
  ReactElement,
  ReactNode,
  ReactPortal,
  useEffect,
  useState,
} from "react";

globalStyle();

interface Lead {
  map(
    arg0: (
      objeto: {
        [x: string]:
          | string
          | number
          | boolean
          | ReactElement<any, string | JSXElementConstructor<any>>
          | ReactPortal
          | PromiseLikeOfReactNode
          | Iterable<ReactNode>
          | null
          | undefined;
      },
      index: Key | null | undefined
    ) => import("react").JSX.Element
  ): ReactNode;
  aulas: Record<string, any>;
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  segmento: string;
  colaboradores: string;
  faturamento: string;
}
///api/aula/list/bruno1000@mail.com
interface IQuestion {
  id: string;
  title: string;
  "pergunta 01": string;
  "pergunta 02": string;
}
export const LeadsId = () => {
  const router = useRouter();
  const { email } = router.query; // Acessar a propriedade 'email' da query

  const [data, setData] = useState<Lead | null>(null);

  const [responseQuestion, setResponseQuestion] = useState<Lead | null>(null);

  useEffect(() => {
    if (email) {
      fetch(`/api/relations/email/${email}`)
        .then((response) => response.json())
        .then((data) => {
          setData(data.data);
        })
        .catch((error) =>
          console.error("Erro ao buscar os detalhes do lead:", error)
        );
    }
  }, [email]);

  useEffect(() => {
    if (email) {
      fetch(`/api/aula/list/${email}`)
        .then((response) => response.json())
        .then((data) => {
          setResponseQuestion(data.data);
        })
        .catch((error) =>
          console.error("Erro ao buscar os detalhes do lead:", error)
        );
    }
  }, [email]);

  return (
    <LeadIdContainer>
      <Image className="logo" src={Logo} alt="logotipo da empresa" />

      <section>
        {data ? (
          <>
            <h1>Nome do lead: {data.name}</h1>
            <p>Email: {data.email}</p>
            <p>Whatsapp: {data.whatsapp}</p>
            <p>Segmento: {data.segmento}</p>
            <p>Colaboradores: {data.colaboradores}</p>
            <p>Faturamento: {data.faturamento}</p>
            <h2>Perguntas e respostas</h2>
            <div>
              {responseQuestion ? (
                responseQuestion.map(
                  (
                    objeto: {
                      [x: string]:
                        | string
                        | number
                        | boolean
                        | ReactElement<any, string | JSXElementConstructor<any>>
                        | Iterable<ReactNode>
                        | ReactPortal
                        | PromiseLikeOfReactNode
                        | null
                        | undefined;
                    },
                    index: Key | null | undefined
                  ) => (
                    <div key={index}>
                      {Object.keys(objeto).map((chave) => (
                        <div key={chave}>
                          <strong>{chave}:</strong> {objeto[chave]}
                        </div>
                      ))}
                    </div>
                  )
                )
              ) : (
                <p>Carregando...</p>
              )}
            </div>
          </>
        ) : (
          <p>Carregando...</p>
        )}
      </section>
    </LeadIdContainer>
  );
};

export default LeadsId;
