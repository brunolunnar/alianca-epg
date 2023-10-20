import React from 'react';
import Select from 'react-select';
import { globalStyle } from '@/styles/global';
import { RegisterContainer } from '@/styles/pages/Register';
import LogoImg from '@/assets/img/logo.png'
import Image from 'next/image'
import { useRouter } from 'next/router';
import { Button } from '@/components/button';
import { register } from 'module';
globalStyle();

export const Register = () => {
  const router = useRouter();
  const handleConfirm = () => {
    router.push('/alianca');
  }

  const segmentoOptions = [
    { value: 'segmento01', label: 'Segmento 01' },
    { value: 'segmento02', label: 'Segmento 02' },
    { value: 'segmento03', label: 'Segmento 03' },
  ];

  const outraOpcaoOptions = [
    { value: 'opcao01', label: 'Opção 01' },
    { value: 'opcao02', label: 'Opção 02' },
    { value: 'opcao03', label: 'Opção 03' },
  ];

  // Estilos personalizados
  const customStyles = {
    control: (base: any) => ({
      ...base,
      background: 'black', // Cor de fundo do controle
      border: 'solid 3px #DA8A51', // Estilo da borda
      padding: '11px', // Preenchimento
      borderRadius: '30px', // Raio de borda
    }),
    option: (styles: any, { isFocused, isSelected }: any) => ({
      ...styles,
      background: isFocused ? '#DA8A51' : 'black', // Cor de fundo das opções quando em foco
      color: isFocused || isSelected ? 'white' : '$textOption', // Cor do texto das opções
      padding: '20px', // Preenchimento das opções
      border:'none'
    }),
  };

  return (
    <RegisterContainer>
      <Image src={LogoImg} alt={'Logotipo da empresa'}></Image>
      <h1>Responda para receber acesso</h1>
      <form>
        <input type="text" placeholder="Nome" />
        <input type="email" placeholder="Seu melhor e-mail" />
        <input type="number" placeholder="Número" />

        <div className='select-box'>
          <Select
            options={segmentoOptions}
            placeholder='Segmento'
            styles={customStyles} // Aplicação dos estilos personalizados
          />

          <input type="number" placeholder='Numero de Colaboradores' />

          <Select
            options={outraOpcaoOptions}
            placeholder='Outra Opção'
            styles={customStyles} // Aplicação dos estilos personalizados
          />
        </div>
      </form>
      <Button OnClick={handleConfirm}></Button>
    </RegisterContainer>
  );
};
export default Register