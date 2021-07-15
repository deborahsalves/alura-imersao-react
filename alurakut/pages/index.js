import React from 'react';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

const ProfileSidebar = (properties) => {
  return (
    <Box as="aside">
      <img src={`https://github.com/${properties.githubUser}.png`} style={{ borderRadius: '8px'}}/>
      <hr/>
      <p>
        <a className="boxLink" href={`https://github.com/${properties.githubUser}`}>
          @{properties.githubUser}
        </a>
      </p>
      <hr/>

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

const ProfileRelationsBox = (properties) => {
  return (
    <ProfileRelationsBoxWrapper>
    <h2 className="smallTitle">{properties.title} ({properties.items.length})</h2>
    <ul>
      {properties.items.slice(0,6).map((eachItem) => {
        return (
          <li key={eachItem.id}>
            <a href={`${eachItem.url}`} >
              <img src={`${eachItem.avatar_url}`} />
              <span>{eachItem.login}</span>
            </a>  
          </li>
        )
      })}
    </ul>
  </ProfileRelationsBoxWrapper>
  )
}

export default function Home() {
  React.useState();
  const currentUser = 'deborahsalves';
  const [comunidades, setCommunity] = React.useState([{
    id: '0initial',
    title: 'Initial Community',
    image: 'http://placehold.it/300x300',
    url: 'https://github.com/alura-challenges/alurakut/',
  }]);
  const [pessoasFavoritas, setPessoasFavoritas] = React.useState([
    {
      id: 0,
      title: 'juunegreiros',
      avatar_url: 'https://github.com/juunegreiros.png',
      url: 'https://github.com/juunegreiros',
    },
    {
      id: 1,
      title: 'omariosouto',
      avatar_url: 'https://github.com/omariosouto.png',
      url: 'https://github.com/omariosouto',
    },
    {
      id: 2,
      title: 'marcobrunodev',
      avatar_url: 'https://github.com/marcobrunodev.png',
      url: 'https://github.com/marcobrunodev',
    },
    {
      id: 3,
      title: 'im-usb',
      avatar_url: 'https://github.com/im-usb.png',
      url: 'https://github.com/im-usb',
    },
    {
      id: 4,
      title: 'sanramu93',
      avatar_url: 'https://github.com/sanramu93.png',
      url: 'https://github.com/sanramu93',
    },
    {
      id: 5,
      title: 'felipefialho',
      avatar_url: 'https://github.com/felipefialho.png',
      url: 'https://github.com/felipefialho',
    },
    {
      id: 6,
      title: 'rafaballerini',
      avatar_url: 'https://github.com/rafaballerini.png',
      url: 'https://github.com/rafaballerini',
    },
    {
      id: 7,
      title: 'peas',
      avatar_url: 'https://github.com/peas.png',
      url: 'https://github.com/peas',
    },
  ])
  const [seguidores, setSeguidores] = React.useState([]);
  React.useEffect(() => {
    fetch('https://api.github.com/users/deborahsalves/followers')
    .then((serverReply) => {
      return serverReply.json();
    })
    .then((fullReply) => {
      setSeguidores(fullReply);
    })
  }, [])

  return ( 
    <>
      <AlurakutMenu />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={currentUser}/>
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">Bem-vinda(o)</h1>

            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subtitle">O que você deseja fazer</h2>

            <form onSubmit={function handleCreateCommunity(e) {
              e.preventDefault();
              const dataFromForm = new FormData(e.target);

              const community = {
                id: new Date().toISOString(),
                title: dataFromForm.get('title'),
                image: dataFromForm.get('image'),
                url: dataFromForm.get('url')
              }
              
              const updatedCommunities = [...comunidades, community];
              setCommunity(updatedCommunities);
            }}>
              <div>
                <input 
                  placeholder="Qual vai ser o nome da sua comunidade?" 
                  name="title" 
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  type="text" />
              </div>
              <div>
                <input 
                  placeholder="Coloque uma URL da foto para usar de capa" 
                  name="image" 
                  aria-label="Coloque uma URL da foto para usar de capa"
                  type="text" />
              </div>
              <div>
                <input 
                  placeholder="Insira o link da comunidade" 
                  name="url" 
                  aria-label="Insira o link da comunidade"
                  type="text" />
              </div>
              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBox title="Seguidores" items={seguidores}/>
          <ProfileRelationsBox title="FavPpl da Programação" items={pessoasFavoritas}/>
          {/* <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">FavPpl da programação ({pessoasFavoritas.length})</h2>
            <ul>
              {pessoasFavoritas.slice(0,6).map((person) => {
                return (
                  <li key={person}>
                    <a href={`/users/${person}`} >
                      <img src={`https://github.com/${person}.png`} />
                      <span>{person}</span>
                    </a>  
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper> */}
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Comunidades ({comunidades.length})</h2>
            <ul>
              {comunidades.slice(0,6).map((community) => {
                return (
                  <li key={community.id}>
                    <a href={`/users/${community.title}`} >
                    <img src={community.image} />
                      <span>{community.title}</span>
                    </a>  
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
    )
}