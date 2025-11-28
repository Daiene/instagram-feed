# Como rodar o projeto

Siga os passos abaixo para executar o projeto após fazer o clone do repositório.


### Instalar dependências

Após clonar o projeto, acesse a pasta e instale as dependências:

```bash
npm install
```

ou

```bash
yarn
```


### Configurar o BASE_URL

O projeto utiliza uma API mockada com json-server, e a URL base da API é lida a partir de um arquivo `.env`.

Crie um arquivo `.env` na raiz do projeto e defina a variável:

`BASE_URL=http://SEU_IP:3000`

> [!WARNING]
> O localhost que você pode ver no código está apenas como exemplo.
> Em dispositivos físicos ou ao rodar pelo Expo, o localhost normalmente não funciona, então é necessário usar o IP real da sua máquina conectada na mesma rede Wi-Fi.

Para descobrir seu IP:
`Windows: ipconfig`
`Mac/Linux: ifconfig`


### Rodar o JSON Server
Antes de iniciar o app, suba o servidor fake:

```bash
npx json-server db.json
```


### Rodar o projeto com Expo
Agora inicie o app:

```bash
npx expo start
```

Abra o QR Code com o Expo Go no celular ou rode em um emulador.


## Visão Geral da Arquitetura

<img width="1893" height="7467" alt="simple-list" src="https://github.com/user-attachments/assets/1aeb1549-3676-49a0-ae48-b62652f4fedb" />
<img width="1935" height="2831" alt="virtual-list" src="https://github.com/user-attachments/assets/a115894f-0913-4da1-b7f2-f42b536dd04a" />
<img width="3007" height="1981" alt="recyclable-list" src="https://github.com/user-attachments/assets/bf07f02a-3a78-42b3-bea2-a42e9678a2f6" />
<img width="3053" height="3772" alt="old-structure-with-context-API" src="https://github.com/user-attachments/assets/fddfcf41-af79-4683-a14d-cb053e48c14d" />
<img width="9182" height="18882" alt="old-structure" src="https://github.com/user-attachments/assets/565fa366-8e9f-406a-87a3-83044a148e1f" />
<img width="6811" height="18882" alt="new-structure" src="https://github.com/user-attachments/assets/99fd7b68-7d88-4dcc-8bf0-ced3255c7b7b" />
